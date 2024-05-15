import React, { CSSProperties, ElementRef, memo, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { CalendarDate, DateFields } from '@internationalized/date';
import type { PressEvent } from '@react-types/shared';
import debounce from 'lodash.debounce';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

import useListRefs from '../../hooks/useListRefs';
import { ElementProps } from '../../types/common.types';
import { mergeStyles } from '../../utils';
import { areRectsIntersecting } from '../../utils/are-rects-intersecting';
import Button from '../button';
import { useCalendarContext } from '../calendar-context';
import PickerItemEmpty from './calendar-picker-item-empty';

const SCROLL_DEBOUNCE_TIME = 200;

interface Props extends ElementProps<'div'> {
  initialDate: CalendarDate;
  options?: {
    label: string;
    value: number;
  }[];
  listClassName?: string;
  itemClassName?: string;
  listStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  listType?: keyof DateFields;
  highlightRef: MutableRefObject<HTMLDivElement>;
}

const CalendarPickerList = (props: Props) => {
  const {
    initialDate,
    options = [],
    className,
    style,
    listClassName,
    itemClassName,
    listStyle,
    itemStyle,
    listType = 'month',
    highlightRef,
    ...etc
  } = props;

  const listRef = useRef<ElementRef<'div'>>(null);
  const [bindItemsRef, getItemsRef] = useListRefs<HTMLButtonElement>();

  const { state, isPickerExpanded, headerRef, setPickerExpanded, pickerEmptyItem } = useCalendarContext();

  const handleListScroll = useCallback(
    (e: Event, highlightEl: HTMLElement | null) => {
      if (!(e.target instanceof HTMLElement)) return;

      const itemRefs = getItemsRef();
      const items = Array.from(itemRefs.values());

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
      const selectedDate = state.focusedDate.set({ [listType]: itemValue });
      state.setFocusedDate(selectedDate);
    },
    [state, listType, isPickerExpanded]
  );

  // scroll to the selected month/year when the component is mounted/opened/closed
  useEffect(() => {
    scrollIntoView(initialDate[listType] as number, false);
  }, [isPickerExpanded, listType]);

  // add scroll event listener to listRef
  useEffect(() => {
    const currentRef = listRef.current;
    const highlightEl = highlightRef.current;

    if (!highlightEl) return;

    const debouncedHandleScroll = debounce((e: Event) => handleListScroll(e, highlightEl), SCROLL_DEBOUNCE_TIME);

    currentRef?.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      if (debouncedHandleScroll) {
        currentRef?.removeEventListener('scroll', debouncedHandleScroll);
      }
    };
  }, [handleListScroll]);

  function scrollIntoView(value: number, smooth = true) {
    const itemsRef = getItemsRef();
    const node = itemsRef.get(value);

    if (!node) return;

    // scroll picker list to the selected item
    scrollIntoViewIfNeeded(node, {
      scrollMode: 'always',
      behavior: smooth ? 'smooth' : 'auto',
      boundary: listRef.current,
    });
  }

  const onPickerItemPressed = useCallback(
    (e: PressEvent) => {
      const target = e.target as HTMLElement;
      const value = Number(target.getAttribute('data-value'));
      if (!value) return;
      scrollIntoView(value);
    },
    [state]
  );

  const onPickerItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, value: number) => {
      const itemRefs = getItemsRef();
      const node = itemRefs.get(value);

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
          nextValue = options.length - 1;
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
      itemRefs.get(nextValue)?.focus();
    },
    [state, options]
  );

  return (
    <div
      ref={listRef}
      className={listClassName}
      style={mergeStyles({ overflowY: 'scroll' }, listStyle)}
      role={`picker-${listType}-list`}
      {...etc}
    >
      <PickerItemEmpty total={pickerEmptyItem} className={itemClassName} style={itemStyle} />
      {options.map((item) => (
        <Button
          role={`picker-${listType}-item`}
          key={`picker-${listType}-${item.value}`}
          ref={(node) => bindItemsRef(node, item.value)}
          className={itemClassName}
          style={itemStyle}
          data-value={item.value}
          tabIndex={!isPickerExpanded || state.focusedDate?.[listType] !== item.value ? -1 : 0}
          onKeyDown={(e) => onPickerItemKeyDown(e, item.value)}
          onPress={(e) => onPickerItemPressed(e)}
        >
          {item.label}
        </Button>
      ))}
      <PickerItemEmpty total={pickerEmptyItem} className={itemClassName} />
    </div>
  );
};

export default memo(CalendarPickerList);
