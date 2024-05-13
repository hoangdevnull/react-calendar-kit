import React, { forwardRef, type ForwardedRef, type ReactElement, type Ref } from 'react';
import { createCalendar, type Calendar as CalendarType, type DateValue } from '@internationalized/date';
import { AriaCalendarGridProps, useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { AriaCalendarProps } from '@react-types/calendar';

import { SupportedCalendars } from '../../dist/types/common.types';
import { CalendarProvider } from './calendar-context';
import CalendarRoot from './calendar-root';

interface Props<T extends DateValue> extends AriaCalendarProps<T> {
  createCalendar?: (calendar: SupportedCalendars) => CalendarType | null;
  weekdayStyle?: AriaCalendarGridProps['weekdayStyle'];
  visibleMonths?: number;
  className?: string;
  classNames?: {
    root?: string;
    cell?: string;
    grid?: string;
    header?: string;
    headerRow?: string;
    headerCell?: string;
    weekday?: string;
  };
}

function Calendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    minValue,
    maxValue,
    className,
    classNames = {},
    visibleMonths = 1,
    weekdayStyle = 'narrow',
    createCalendar: createCalendarProp,
  } = props;

  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    minValue,
    maxValue,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== 'function'
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title, errorMessageProps } = useCalendar(props, state);

  return (
    <CalendarProvider
      value={{
        state,
        visibleMonths,
        weekdayStyle,
        classNames,
      }}
    >
      <CalendarRoot
        ref={ref}
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

Calendar.displayName = 'Calendar';

export type CalendarProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(Calendar) as <T extends DateValue>(props: CalendarProps<T>) => ReactElement;
