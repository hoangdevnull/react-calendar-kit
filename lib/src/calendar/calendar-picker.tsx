import React, { ElementRef, useCallback, useEffect, useRef } from 'react';
import { CalendarDate } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';
import type { PressEvent } from '@react-types/shared';
import debounce from 'lodash.debounce';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import { ElementProps } from '../types/common.types';
import { cn, getMonthRange, getYearRange, mergeStyles } from '../utils';
import Button from './button';
import { useCalendarContext } from './calendar-context';

type ItemsRefMap = Map<number, HTMLElement>;
type CalendarPickerListType = 'months' | 'years';

const SCROLL_DEBOUNCE_TIME = 200;

/**
 * Checks if two DOMRect objects intersect each other.
 *
 * @param rect1 - The first DOMRect object.
 * @param rect2 - The second DOMRect object.
 * @returns A boolean indicating whether the two DOMRect objects intersect.
 */
function areRectsIntersecting(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1 &&
    rect2 &&
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

interface Props extends ElementProps<'div'> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarPicker = (props: Props) => {
  const { date, currentMonth, className, style, ...etc } = props;

  const { state, isPickerExpanded, headerRef, setPickerExpanded, pickerEmptyItem, classNames, styles } =
    useCalendarContext();

  const highlightRef = useRef<ElementRef<'div'>>(null);
  const yearsListRef = useRef<ElementRef<'div'>>(null);
  const monthsListRef = useRef<ElementRef<'div'>>(null);

  const monthsItemsRef = useRef<ItemsRefMap>();
  const yearsItemsRef = useRef<ItemsRefMap>();

  const monthDateFormatter = useDateFormatter({
    month: 'long',
    era: currentMonth.calendar.identifier === 'gregory' && currentMonth.era === 'BC' ? 'short' : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
  });

  const yearDateFormatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });

  const years = getYearRange(state.minValue, state.maxValue)?.map((y) => ({
    value: y.year,
    label: yearDateFormatter.format(y.toDate(state.timeZone)),
  }));

  const months = getMonthRange(date).map((m) => ({
    value: m.month,
    label: monthDateFormatter.format(m.toDate(state.timeZone)),
  }));

  function getItemsRefMap(itemsRef: React.MutableRefObject<ItemsRefMap | undefined>) {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }

    return itemsRef.current;
  }

  function getItemRef(node: HTMLElement | null, value: number, list: CalendarPickerListType) {
    const map = getItemsRefMap(list === 'months' ? monthsItemsRef : yearsItemsRef);

    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }

  const handleListScroll = useCallback(
    (e: Event, highlightEl: HTMLElement | null, list: CalendarPickerListType) => {
      if (!(e.target instanceof HTMLElement)) return;

      const map = getItemsRefMap(list === 'months' ? monthsItemsRef : yearsItemsRef);

      const items = Array.from(map.values());

      const item = items.find((itemEl) => {
        const rect1 = itemEl.getBoundingClientRect();
        const rect2 = highlightEl?.getBoundingClientRect();

        if (!rect2) {
          return false;
        }

        return areRectsIntersecting(rect1, rect2);
      });

      const itemValue = Number(item?.getAttribute('data-value'));

      if (!itemValue) return;

      let date = state.focusedDate.set(list === 'months' ? { month: itemValue } : { year: itemValue });

      state.setFocusedDate(date);
    },
    [state, isPickerExpanded]
  );

  // scroll to the selected month/year when the component is mounted/opened/closed
  useEffect(() => {
    scrollIntoView(date.month, 'months', false);
    scrollIntoView(date.year, 'years', false);
  }, [isPickerExpanded]);

  useEffect(() => {
    // add scroll event listener to monthsListRef
    const monthsList = monthsListRef.current;
    const yearsList = yearsListRef.current;
    const highlightEl = highlightRef.current;

    if (!highlightEl) return;

    const debouncedHandleMonthsScroll = debounce(
      (e: Event) => handleListScroll(e, highlightEl, 'months'),
      SCROLL_DEBOUNCE_TIME
    );
    const debouncedHandleYearsScroll = debounce(
      (e: Event) => handleListScroll(e, highlightEl, 'years'),
      SCROLL_DEBOUNCE_TIME
    );

    monthsList?.addEventListener('scroll', debouncedHandleMonthsScroll);
    yearsList?.addEventListener('scroll', debouncedHandleYearsScroll);

    return () => {
      if (debouncedHandleMonthsScroll) {
        monthsList?.removeEventListener('scroll', debouncedHandleMonthsScroll);
      }
      if (debouncedHandleYearsScroll) {
        yearsList?.removeEventListener('scroll', debouncedHandleYearsScroll);
      }
    };
  }, [handleListScroll]);

  function scrollIntoView(value: number, list: CalendarPickerListType, smooth = true) {
    const mapListRef = list === 'months' ? monthsItemsRef : yearsItemsRef;
    const listRef = list === 'months' ? monthsListRef : yearsListRef;

    const map = getItemsRefMap(mapListRef);

    const node = map.get(value);

    if (!node) return;

    // scroll picker list to the selected item
    scrollIntoViewIfNeeded(node, {
      scrollMode: 'always',
      behavior: smooth ? 'smooth' : 'auto',
      boundary: listRef.current,
    });
  }

  const onPickerItemPressed = useCallback(
    (e: PressEvent, list: CalendarPickerListType) => {
      const target = e.target as HTMLElement;
      const value = Number(target.getAttribute('data-value'));
      if (!value) return;
      scrollIntoView(value, list);
    },
    [state]
  );

  const onPickerItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number, list: CalendarPickerListType) => {
      const map = getItemsRefMap(list === 'months' ? monthsItemsRef : yearsItemsRef);

      const node = map.get(value);

      if (!node) return;

      let nextValue = value;

      switch (e.key) {
        case 'ArrowDown':
          nextValue = value + 1;
          break;
        case 'ArrowUp':
          nextValue = value - 1;
          break;
        case 'Home':
          nextValue = 0;
          break;
        case 'End':
          nextValue = months.length - 1;
          break;
        case 'PageUp':
          nextValue = value - 3;
          break;
        case 'PageDown':
          nextValue = value + 3;
          break;
        case 'Escape':
        case 'Enter':
        case ' ':
          setPickerExpanded?.(false);
          headerRef?.current?.focus();
          return;
      }
      const nextItem = map.get(nextValue);
      nextItem?.focus();
    },
    [state]
  );

  return (
    <div
      {...etc}
      className={cn(classNames?.picker?.root, className)}
      style={mergeStyles(style, styles?.picker?.root)}
      role="picker-root"
      data-expanded={isPickerExpanded}
      // makes the browser ignore the element and its children when tabbing
      // @ts-ignore
      inert={isPickerExpanded ? true : undefined}
    >
      <div
        ref={highlightRef}
        className={classNames?.picker?.highlight}
        style={styles?.picker?.highlight}
        role="picker-highlight"
      />
      <div
        ref={monthsListRef}
        className={cn(classNames?.picker?.list, classNames?.picker?.monthList)}
        style={mergeStyles(styles?.picker?.list, styles?.picker?.monthList)}
        role="picker-month-list"
      >
        <>
          <EmptySlot
            total={pickerEmptyItem}
            className={cn(classNames?.picker?.item, classNames?.picker?.monthItem)}
            style={mergeStyles(styles?.picker?.item, styles?.picker?.monthItem)}
          />
          {months.map((month) => (
            <Button
              key={`picker-month-${month.value}`}
              ref={(node) => getItemRef(node, month.value, 'months')}
              className={cn(classNames?.picker?.item, classNames?.picker?.monthItem)}
              style={mergeStyles(styles?.picker?.item, styles?.picker?.monthItem)}
              data-value={month.value}
              tabIndex={!isPickerExpanded || state.focusedDate?.month !== month.value ? -1 : 0}
              onKeyDown={(e) => onPickerItemKeyDown(e, month.value, 'months')}
              onPress={(e) => onPickerItemPressed(e, 'months')}
            >
              {month.label}
            </Button>
          ))}
          <EmptySlot total={pickerEmptyItem} className={cn(classNames?.picker?.item, classNames?.picker?.monthItem)} />
        </>
      </div>
      <div
        ref={yearsListRef}
        className={cn(classNames?.picker?.list, classNames?.picker?.yearList)}
        style={mergeStyles(styles?.picker?.list, styles?.picker?.yearList)}
        role="picker-year-list"
      >
        <>
          <EmptySlot
            total={pickerEmptyItem}
            className={cn(classNames?.picker?.item, classNames?.picker?.yearItem)}
            style={mergeStyles(styles?.picker?.item, styles?.picker?.yearItem)}
          />
          {years.map((year) => (
            <Button
              key={`picker-year-${year.value}`}
              ref={(node) => getItemRef(node, year.value, 'years')}
              className={cn(classNames?.picker?.item, classNames?.picker?.yearItem)}
              data-value={year.value}
              tabIndex={!isPickerExpanded || state.focusedDate?.year !== year.value ? -1 : 0}
              onKeyDown={(e) => onPickerItemKeyDown(e, year.value, 'years')}
              onPress={(e) => onPickerItemPressed(e, 'years')}
            >
              {year.label}
            </Button>
          ))}
          <EmptySlot
            total={pickerEmptyItem}
            className={cn(classNames?.picker?.item, classNames?.picker?.yearItem)}
            style={mergeStyles(styles?.picker?.item, styles?.picker?.yearItem)}
          />
        </>
      </div>
    </div>
  );
};

export default CalendarPicker;

const EmptySlot = ({ className, total, ...props }: ElementProps<'div'> & { total: number }) => {
  return (
    <>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} aria-hidden="true" className={className} role="picker-item-empty" tabIndex={-1} {...props}>
          &nbsp;
        </div>
      ))}
    </>
  );
};
