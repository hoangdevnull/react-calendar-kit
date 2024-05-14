import { CSSProperties, RefObject } from 'react';
import { AriaCalendarGridProps } from '@react-aria/calendar';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { createSafeContext } from '../utils/create-safe-context';

export type CalendarClassNames = {
  nav?: string;
  nextButton?: string;
  previousButton?: string;
  month?: string;
  root?: string;
  container?: string;
  gridWrapper?: string;
  gridGroup?: string;
  header?: string;
  grid?: string;
  gridHead?: string;
  gridHeadRow?: string;
  gridHeadCell?: string;
  gridBody?: string;
  gridBodyRow?: string;
  gridBodyCell?: string;
  cellButton?: string;

  picker?: {
    root?: string;
    button?: string;
    buttonIcon?: string;
    highlight?: string;
    list?: string;
    monthList?: string;
    yearList?: string;
    item?: string;
    monthItem?: string;
    yearItem?: string;
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
