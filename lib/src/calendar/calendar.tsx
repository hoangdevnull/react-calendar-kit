import React, { forwardRef, useMemo, type ForwardedRef, type ReactElement, type Ref } from 'react';
import { CalendarDate, createCalendar, type Calendar as CalendarType, type DateValue } from '@internationalized/date';
import { AriaCalendarGridProps, useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useCalendarState } from '@react-stately/calendar';
import { AriaCalendarProps } from '@react-types/calendar';

import { useControllableState } from '../hooks/useControlableState';
import { SupportedCalendars } from '../types/common.types';
import { CalendarClassNames, CalendarProvider, CalendarStyles } from './calendar-context';
import CalendarRoot from './calendar-root';

interface Props<T extends DateValue> extends AriaCalendarProps<T> {
  createCalendar?: (calendar: SupportedCalendars) => CalendarType | null;
  /**
   * The style of the weekday labels.
   */
  weekdayStyle?: AriaCalendarGridProps['weekdayStyle'];
  /**
   * The number of months grid to display. Max 3 and min 1
   */
  visibleMonths?: number;
  /**
   * Root className for calendar
   */
  className?: string;
  /**
   * className for each components in the calendar
   */
  classNames?: CalendarClassNames;

  /**
   * styles for each components in the calendar
   */
  styles?: CalendarStyles;
  /**
   * Using month year picker instead on basic label
   */
  withPicker?: boolean;

  /**
   * Lock the calendar height when the calendar picker is open.
   * Prefer choose minimum height when the calendar picker is not open
   */
  pickerHeight?: number;

  /**
   * Number of empty item to display in the month picker to force list scrollable
   */
  pickerEmptyItem?: number;

  /**
   * Open the calendar picker for default - uncontrolled style
   */
  defaultPickerOpen?: boolean;
  /**
   * Open the calendar picker controlled style
   */
  pickerOpen?: boolean;
  /**
   * Trigger when pickerOpen State Change
   */
  onPickerOpenChange?: (open: boolean) => void;
}

function Calendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    className,
    classNames = {},
    styles = {} as CalendarStyles,
    visibleMonths: visibleMonthsProp = 1,
    weekdayStyle = 'short',
    createCalendar: createCalendarProp,
    withPicker = false,
    pickerHeight = 287,
    pickerEmptyItem = 4,
    pickerOpen,
    defaultPickerOpen = false,
    onPickerOpenChange,
  } = props;

  const { locale } = useLocale();
  const visibleMonths = Math.max(1, Math.min(visibleMonthsProp, 4));
  const visibleDuration = useMemo(() => ({ months: visibleMonths }), [visibleMonths]);

  const state = useCalendarState({
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

  const [isPickerExpanded, setPickerExpanded] = useControllableState({
    prop: pickerOpen,
    defaultProp: defaultPickerOpen,
    onChange: onPickerOpenChange,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title, errorMessageProps } = useCalendar(props, state);

  return (
    <CalendarProvider
      value={{
        state,
        visibleMonths,
        weekdayStyle,
        withPicker,
        pickerHeight,
        pickerEmptyItem,
        isPickerExpanded,
        setPickerExpanded,
        classNames,
        styles,
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
