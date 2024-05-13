import React, { useCallback } from 'react';
import { CalendarDate } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

import { ElementProps } from '../../dist/types/common.types';
import { useCalendarContext } from './calendar-context';

export interface CalendarHeaderProps extends ElementProps<'div'> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { date, currentMonth } = props;

  const { state, headerRef, isHeaderExpanded } = useCalendarContext();

  const monthAndYearDateFormatter = useDateFormatter({
    month: 'long',
    era: currentMonth.calendar.identifier === 'gregory' && currentMonth.era === 'BC' ? 'short' : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
    year: 'numeric',
  });

  const monthDateContent = monthAndYearDateFormatter.format(date.toDate(state.timeZone));

  const headerTitle = (
    <>
      <span key={currentMonth.month} aria-hidden={true}>
        {monthDateContent}
      </span>
    </>
  );

  return <div ref={headerRef}>{headerTitle}</div>;
};

export default CalendarHeader;
