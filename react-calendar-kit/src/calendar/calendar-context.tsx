import { type CSSProperties, type RefObject } from 'react';
import { type AriaCalendarGridProps } from '@react-aria/calendar';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { createSafeContext } from '../utils/create-safe-context';

export type CalendarClassNames = {
  nav?: string | undefined;
  navGroup?: string | undefined;
  nextButton?: string | undefined;
  previousButton?: string | undefined;
  month?: string | undefined;
  root?: string | undefined;
  container?: string | undefined;
  gridWrapper?: string | undefined;
  gridGroup?: string | undefined;
  header?: string | undefined;
  grid?: string | undefined;
  gridHead?: string | undefined;
  gridHeadRow?: string | undefined;
  gridHeadCell?: string | undefined;
  gridBody?: string | undefined;
  gridBodyRow?: string | undefined;
  gridBodyCell?: string | undefined;
  cellButton?: string | undefined;

  picker?: {
    root?: string | undefined;
    button?: string | undefined;
    buttonIcon?: string | undefined;
    highlight?: string | undefined;
    list?: string | undefined;
    monthList?: string | undefined;
    yearList?: string | undefined;
    item?: string | undefined;
    monthItem?: string | undefined;
    yearItem?: string | undefined;
  };
};

type BaseClassKeys = Exclude<keyof CalendarClassNames, 'picker'>;

export type CalendarStyles = Partial<
  Record<BaseClassKeys, CSSProperties> & {
    picker?: Record<keyof CalendarClassNames['picker'], CSSProperties>;
  }
>;
export type ContextType<T extends CalendarState | RangeCalendarState> = {
  state: T;
  headerRef?: RefObject<any>;
  isPickerExpanded: boolean;
  setPickerExpanded: (isExpanded: boolean) => void;
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
   * Use pixel unit
   */
  pickerHeight?: number;

  /**
   * Number of empty item to display in the month picker to force list scrollable
   */
  pickerEmptyItem?: number;
};

export const [CalendarProvider, useCalendarContext] = createSafeContext<
  ContextType<CalendarState | RangeCalendarState>
>('Calendar component was not found in tree');
