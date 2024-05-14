import React, { useMemo } from 'react';
import { CalendarDate, endOfMonth, getWeeksInMonth } from '@internationalized/date';
import { useCalendarGrid } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { CalendarPropsBase } from '@react-types/calendar';

import { ElementProps } from '../types/common.types';
import { cn, mergeStyles, withAttr } from '../utils';
import { CalendarCell } from './calendar-cell';
import { useCalendarContext } from './calendar-context';

export interface CalendarGridProps extends ElementProps<'table'>, CalendarPropsBase {
  startDate: CalendarDate;
  currentMonth: number;
}

const CalendarGrid = (props: CalendarGridProps) => {
  const { startDate, currentMonth, ...etc } = props;

  const { state, weekdayStyle, isPickerExpanded: isHeaderExpanded, classNames, styles } = useCalendarContext();
  const { locale } = useLocale();
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      ...etc,
      weekdayStyle,
      endDate: endOfMonth(startDate),
    },
    state
  );

  const bodyContent = [...new Array(weeksInMonth).keys()].map((weekIndex) => (
    <tr
      className={classNames.gridBodyRow}
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
              state={state}
              currentMonth={startDate}
              date={date}
              isPickerVisible={isHeaderExpanded}
              classNames={classNames}
              styles={styles}
            />
          ) : (
            <td key={i} />
          )
        )}
    </tr>
  ));

  return (
    <table
      {...gridProps}
      role="grid"
      className={cn(classNames.grid, gridProps.className)}
      aria-hidden={withAttr(isHeaderExpanded)}
      tabIndex={-1}
    >
      <thead
        {...headerProps}
        className={cn(classNames.gridHead, headerProps.className)}
        style={mergeStyles(headerProps.style, styles?.gridHead)}
        role="grid-header"
      >
        <tr className={classNames.gridHeadRow} style={styles?.gridHeadRow} role="grid-header-row">
          {weekDays.map((day, index) => (
            <th key={index} role="grid-header-cell" className={classNames.gridHeadCell} style={styles?.gridHeadCell}>
              <span>{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody key={currentMonth} className={classNames.gridBody} style={styles?.gridBody} role="grid-body">
        {bodyContent}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
