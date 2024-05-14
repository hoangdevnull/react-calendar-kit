import React, { useCallback } from 'react';
import { CalendarDate } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

import { ElementProps } from '../types/common.types';
import Button from './button';
import { useCalendarContext } from './calendar-context';
import CalendarPicker from './calendar-picker';
import ChevronDownIcon from './chevron-down-icon';

export interface CalendarHeaderProps extends ElementProps<'div'> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { date, currentMonth } = props;

  const { state, headerRef, withPicker, classNames, setPickerExpanded } = useCalendarContext();

  const monthAndYearDateFormatter = useDateFormatter({
    month: 'long',
    era: currentMonth.calendar.identifier === 'gregory' && currentMonth.era === 'BC' ? 'short' : undefined,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
    year: 'numeric',
  });

  const monthDateContent = monthAndYearDateFormatter.format(date.toDate(state.timeZone));

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Close the month and year pickers
        setPickerExpanded?.(false);
      }
    },
    [setPickerExpanded]
  );

  return withPicker ? (
    <div className={classNames.month} ref={headerRef}>
      <Button onKeyDown={handleKeyDown} className={classNames?.picker?.button} ref={headerRef}>
        <span key={currentMonth.month} aria-hidden={true}>
          {monthDateContent}
        </span>
        {<ChevronDownIcon role="chevron-down" className={classNames?.picker?.buttonIcon} />}
      </Button>
    </div>
  ) : (
    <div className={classNames.month} ref={headerRef}>
      <span key={currentMonth.month} aria-hidden={true}>
        {monthDateContent}
      </span>
    </div>
  );
};

export default CalendarHeader;
