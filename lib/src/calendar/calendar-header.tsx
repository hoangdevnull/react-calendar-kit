import React, { useCallback } from 'react';
import { CalendarDate } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

import { ElementProps } from '../types/common.types';
import { withAttr } from '../utils';
import Button from './button';
import { useCalendarContext } from './calendar-context';
import ChevronDownIcon from './icons/chevron-down-icon';

export interface CalendarHeaderProps extends ElementProps<'div'> {
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { date, currentMonth } = props;

  const { state, headerRef, withPicker, classNames, styles, isPickerExpanded, setPickerExpanded } =
    useCalendarContext();

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
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setPickerExpanded?.(false);
      }
    },
    [setPickerExpanded]
  );

  return withPicker ? (
    <div className={classNames.month} style={styles?.month} ref={headerRef}>
      <Button
        onPress={() => setPickerExpanded(!isPickerExpanded)}
        onKeyDown={handleKeyDown}
        className={classNames?.picker?.button}
        style={styles?.picker?.button}
        ref={headerRef}
        data-expanded={withAttr(isPickerExpanded)}
      >
        <span key={currentMonth.month} aria-hidden={true}>
          {monthDateContent}
        </span>
        {
          <ChevronDownIcon
            role="chevron-down"
            className={classNames?.picker?.buttonIcon}
            style={styles?.picker?.buttonIcon}
          />
        }
      </Button>
    </div>
  ) : (
    <div className={classNames.month} style={styles?.month} ref={headerRef}>
      <span key={currentMonth.month} aria-hidden={true}>
        {monthDateContent}
      </span>
    </div>
  );
};

export default CalendarHeader;
