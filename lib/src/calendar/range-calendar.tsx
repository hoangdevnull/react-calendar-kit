import React, { ElementRef, forwardRef, useMemo, useRef, type ForwardedRef, type ReactElement, type Ref } from 'react';
import { CalendarDate, createCalendar, type Calendar as CalendarType, type DateValue } from '@internationalized/date';
import { AriaCalendarGridProps, useRangeCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useRangeCalendarState } from '@react-stately/calendar';
import { AriaRangeCalendarProps } from '@react-types/calendar';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { SupportedCalendars } from '../types/common.types';
import { CalendarClassNames, CalendarProvider } from './calendar-context';
import CalendarRoot from './calendar-root';

interface Props<T extends DateValue> extends AriaRangeCalendarProps<T> {
  createCalendar?: (calendar: SupportedCalendars) => CalendarType | null;
  weekdayStyle?: AriaCalendarGridProps['weekdayStyle'];
  visibleMonths?: number;
  className?: string;
  classNames?: CalendarClassNames;
}

function RangeCalendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    className,
    classNames = {},
    visibleMonths: visibleMonthsProp = 1,
    weekdayStyle = 'short',
    createCalendar: createCalendarProp,
  } = props;
  const { locale } = useLocale();
  const visibleMonths = Math.max(1, Math.min(visibleMonthsProp, 3));
  const visibleDuration = useMemo(() => ({ months: visibleMonths }), [visibleMonths]);

  const state = useRangeCalendarState({
    ...props,
    locale,
    minValue,
    maxValue,
    visibleDuration,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== 'function'
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const domRef = useRef<ElementRef<'div'>>(null);

  const { calendarProps, prevButtonProps, nextButtonProps, title, errorMessageProps } = useRangeCalendar(
    props,
    state,
    domRef
  );

  const mergedRef = useMergeRefs(domRef, ref);

  return (
    <CalendarProvider value={{ state, visibleMonths, weekdayStyle, withPicker: false, classNames }}>
      <CalendarRoot
        ref={mergedRef}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        title={title}
        errorMessageProps={errorMessageProps}
        className={className}
      />
    </CalendarProvider>
  );
}

RangeCalendar.displayName = 'Calendar';

export type RangeCalendarProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(RangeCalendar) as <T extends DateValue>(props: RangeCalendarProps<T>) => ReactElement;
