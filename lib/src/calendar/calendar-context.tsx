import { RefObject } from 'react';
import { AriaCalendarGridProps } from '@react-aria/calendar';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { createSafeContext } from '../utils/create-safe-context';

export type CalendarClassNames = {
  nav?: string;
  month?: string;
  root?: string;
  container?: string;
  gridWrapper?: string;
  header?: string;
  grid?: string;
  gridHead?: string;
  gridHeadRow?: string;
  gridHeadCell?: string;
  gridBody?: string;
  gridBodyRow?: string;
  gridBodyCell?: string;
  cellButton?: string;
};

export type ContextType<T extends CalendarState | RangeCalendarState> = {
  state: T;
  visibleMonths: number;
  headerRef?: RefObject<any>;
  weekdayStyle?: AriaCalendarGridProps['weekdayStyle'];
  isHeaderExpanded?: boolean;

  classNames?: CalendarClassNames;
};

export const [CalendarProvider, useCalendarContext] = createSafeContext<
  ContextType<CalendarState | RangeCalendarState>
>('Calendar component was not found in tree');
