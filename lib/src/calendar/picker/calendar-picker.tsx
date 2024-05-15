import React, { ElementRef, memo, useMemo, useRef } from 'react';
import { CalendarDate } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

import { ElementProps } from '../../types/common.types';
import { cn, getMonthRange, getYearRange, mergeStyles, withAttr } from '../../utils';
import { useCalendarContext } from '../calendar-context';
import CalendarPickerList from './calendar-picker-list';

interface Props extends ElementProps<'div'> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarPicker = (props: Props) => {
  const { date, currentMonth, className, style, ...etc } = props;

  const { state, isPickerExpanded, classNames, styles } = useCalendarContext();

  const highlightRef = useRef<ElementRef<'div'>>(null);

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

  const years = useMemo(() => {
    return getYearRange(state.minValue, state.maxValue)?.map((y) => ({
      value: y.year,
      label: yearDateFormatter.format(y.toDate(state.timeZone)),
    }));
  }, [state.minValue, state.maxValue, yearDateFormatter, state.timeZone]);

  const months = useMemo(() => {
    return getMonthRange(date).map((m) => ({
      value: m.month,
      label: monthDateFormatter.format(m.toDate(state.timeZone)),
    }));
  }, [state.minValue, state.maxValue, monthDateFormatter, state.timeZone]);

  return (
    <div
      {...etc}
      data-expanded={withAttr(isPickerExpanded)}
      className={cn(classNames?.picker?.root, className)}
      // * Lock the height so it not going to fill the parent container
      style={mergeStyles({ height: 'var(--picker-height)' }, style, styles?.picker?.root)}
      role="picker-root"
    >
      <div
        ref={highlightRef}
        className={classNames?.picker?.highlight}
        style={styles?.picker?.highlight}
        role="picker-highlight"
      />
      <CalendarPickerList
        highlightRef={highlightRef}
        options={months}
        listClassName={cn(classNames?.picker?.list, classNames?.picker?.monthList)}
        listStyle={mergeStyles(styles?.picker?.list, styles?.picker?.monthList)}
        itemClassName={cn(classNames?.picker?.item, classNames?.picker?.monthItem)}
        itemStyle={mergeStyles(styles?.picker?.item, styles?.picker?.monthItem)}
        initialDate={date}
        listType="month"
      />

      <CalendarPickerList
        highlightRef={highlightRef}
        options={years}
        listClassName={cn(classNames?.picker?.list, classNames?.picker?.yearList)}
        listStyle={mergeStyles(styles?.picker?.list, styles?.picker?.yearList)}
        itemClassName={cn(classNames?.picker?.item, classNames?.picker?.yearItem)}
        itemStyle={mergeStyles(styles?.picker?.item, styles?.picker?.yearItem)}
        initialDate={date}
        listType="year"
      />
    </div>
  );
};

export default memo(CalendarPicker);
