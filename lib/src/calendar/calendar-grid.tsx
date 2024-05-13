import React from 'react';
import { CalendarDate, endOfMonth, getWeeksInMonth } from '@internationalized/date';
import { useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarPropsBase } from '@react-types/calendar';

import { ElementProps } from '../../dist/types/common.types';
import { withAttr } from '../utils';
import { CalendarCell } from './calendar-cell';
import { useCalendarContext } from './calendar-context';

export interface CalendarGridProps extends ElementProps<'table'>, CalendarPropsBase {
  startDate: CalendarDate;
  currentMonth: number;
}

const CalendarGrid = (props: CalendarGridProps) => {
  const { startDate, currentMonth, ...etc } = props;

  const { state, weekdayStyle, isHeaderExpanded } = useCalendarContext();

  const { locale } = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      ...props,
      weekdayStyle,
      endDate: endOfMonth(startDate),
    },
    state
  );

  const bodyContent = [...new Array(weeksInMonth).keys()].map((weekIndex) => (
    <tr
      key={weekIndex}
      // makes the browser ignore the element and its children when tabbing
      // @ts-ignore
      inert={isHeaderExpanded ? true : undefined}
    >
      {state
        .getDatesInWeek(weekIndex, startDate)
        .map((date, i) =>
          date ? (
            <CalendarCell
              key={i}
              currentMonth={startDate}
              date={date}
              isPickerVisible={isHeaderExpanded}
              state={state}
            />
          ) : (
            <td key={i} />
          )
        )}
    </tr>
  ));

  return (
    <table {...gridProps} aria-hidden={withAttr(isHeaderExpanded)} tabIndex={-1}>
      <thead {...headerProps} data-slot="grid-header">
        <tr data-slot="grid-header-row">
          {weekDays.map((day, index) => (
            <th key={index} data-slot="grid-header-cell">
              <span>{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody key={currentMonth} data-slot="grid-body">
        {bodyContent}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
