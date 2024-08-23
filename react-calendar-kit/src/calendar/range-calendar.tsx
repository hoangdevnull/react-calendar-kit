import React, {
  forwardRef,
  useMemo,
  useRef,
  type ElementRef,
  type ForwardedRef,
  type ReactElement,
  type Ref,
} from 'react';
import { CalendarDate, createCalendar, type Calendar as CalendarType, type DateValue } from '@internationalized/date';
import { useRangeCalendar, type AriaCalendarGridProps } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { useRangeCalendarState } from '@react-stately/calendar';
import { type AriaRangeCalendarProps } from '@react-types/calendar';
import { useControllableState } from 'src/hooks/useControlableState';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { type SupportedCalendars } from '../types/common.types';
import { CalendarProvider, type CalendarClassNames, type CalendarStyles } from './calendar-context';
import CalendarRoot, { type CalendarRootProps } from './calendar-root';

interface Props<T extends DateValue> extends AriaRangeCalendarProps<T>, Pick<CalendarRootProps, 'header' | 'footer'> {
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

function RangeCalendar<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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
    pickerHeight = 278,
    pickerEmptyItem = 3,
    pickerOpen,
    defaultPickerOpen = false,
    onPickerOpenChange,
    ...etc
  } = props;
  const { locale } = useLocale();
  const visibleMonths = withPicker ? 1 : Math.max(1, Math.min(visibleMonthsProp, 3));
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

  const [isPickerExpanded, setPickerExpanded] = useControllableState({
    prop: pickerOpen,
    defaultProp: defaultPickerOpen,
    onChange: onPickerOpenChange,
  });

  const mergedRef = useMergeRefs(domRef, ref);

  return (
    <CalendarProvider
      value={{
        state,
        visibleMonths,
        weekdayStyle,
        classNames,
        styles,
        withPicker,
        pickerHeight,
        pickerEmptyItem,
        isPickerExpanded,
        setPickerExpanded,
      }}
    >
      <CalendarRoot
        ref={mergedRef}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        title={title}
        errorMessageProps={errorMessageProps}
        className={className}
        {...etc}
      />
    </CalendarProvider>
  );
}

RangeCalendar.displayName = 'RangeCalendar';

export type RangeCalendarProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(RangeCalendar) as <T extends DateValue>(props: RangeCalendarProps<T>) => ReactElement;
