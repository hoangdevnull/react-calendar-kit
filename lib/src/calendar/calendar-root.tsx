import React, { ForwardedRef, forwardRef, Fragment } from 'react';
import { CalendarAria } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';

import { cn } from '../utils';
import Button from './button';
import { useCalendarContext } from './calendar-context';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';
import ChevronLeftIcon from './chevron-left-icon';
import ChevronRightIcon from './chevron-right-icon';

interface Props extends CalendarAria {
  className?: string;
}

const CalendarRoot = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { state, visibleMonths, classNames } = useCalendarContext();
  const currentMonth = state.visibleRange.start;
  const { calendarProps, className, prevButtonProps, nextButtonProps, title, errorMessageProps } = props;

  const { direction: rtlDirection } = useLocale();

  const headers = [];
  const calendars = [];

  for (let i = 0; i < visibleMonths; i++) {
    let d = currentMonth.add({ months: i });

    headers.push(
      <Fragment key={`calendar-header-${i}`}>
        {i === 0 && (
          <Button {...prevButtonProps}>{rtlDirection === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</Button>
        )}
        <CalendarHeader currentMonth={currentMonth} date={d} />
        {i === visibleMonths - 1 && (
          <Button {...nextButtonProps}>{rtlDirection === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</Button>
        )}
      </Fragment>
    );

    const calendarMonthContent = (
      <CalendarGrid {...props} key={`calendar-month-${i}`} currentMonth={currentMonth.month} startDate={d} />
    );
    calendars.push(calendarMonthContent);
  }

  const calendarContent = (
    <>
      <div key="header-wrapper">{headers}</div>
      <div key="grid-wrapper">{calendars}</div>
    </>
  );

  return (
    <div {...calendarProps} className={cn(className, classNames.root)} ref={ref}>
      {calendarContent}
    </div>
  );
});

export default CalendarRoot;
