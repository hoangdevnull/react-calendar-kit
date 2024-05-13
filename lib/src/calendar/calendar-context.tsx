import { RefObject } from 'react';
import { AriaCalendarGridProps } from '@react-aria/calendar';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { createSafeContext } from '../utils/create-safe-context';

export type ContextType<T extends CalendarState | RangeCalendarState> = {
  state: T;
  visibleMonths: number;
  headerRef?: RefObject<any>;
  weekdayStyle?: AriaCalendarGridProps['weekdayStyle'];
  isHeaderExpanded?: boolean;

  classNames?: {
    root?: string;
    cell?: string;
    grid?: string;
    header?: string;
    headerRow?: string;
    headerCell?: string;
    weekday?: string;
  };
};

export const [CalendarProvider, useCalendarContext] = createSafeContext<
  ContextType<CalendarState | RangeCalendarState>
>('Calendar component was not found in tree');
