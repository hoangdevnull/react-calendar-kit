import React, { ForwardedRef, forwardRef, Fragment, useMemo } from 'react';
import { CalendarAria } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';

import { cn } from '../utils';
import Button from './button';
import { useCalendarContext } from './calendar-context';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';
import CalendarPicker from './calendar-picker';
import ChevronLeftIcon from './chevron-left-icon';
import ChevronRightIcon from './chevron-right-icon';

interface Props extends CalendarAria {
  className?: string;
}

const CalendarRoot = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { calendarProps, className, prevButtonProps, nextButtonProps } = props;

  const { state, visibleMonths, classNames, withPicker, pickerHeight, pickerExpanded } = useCalendarContext();

  const currentMonth = state.visibleRange.start;
  const { direction: rtlDirection } = useLocale();

  const isRtl = rtlDirection === 'rtl';

  const content = useMemo(() => {
    const headers = [];
    const calendars = [];

    for (let i = 0; i < visibleMonths; i++) {
      let date = currentMonth.add({ months: i });

      headers.push(
        <Fragment key={`calendar-header-${i}`}>
          {i === 0 && (
            <Button
              {...prevButtonProps}
              className={cn(classNames.nav, isRtl ? classNames.nextButton : classNames.previousButton)}
              role={isRtl ? 'next-button' : 'previous-button'}
            >
              {isRtl ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </Button>
          )}
          <CalendarHeader currentMonth={currentMonth} date={date} />
          {i === visibleMonths - 1 && (
            <Button
              {...nextButtonProps}
              className={cn(classNames.nav, isRtl ? classNames.previousButton : classNames.nextButton)}
              role={isRtl ? 'previous-button' : 'next-button'}
            >
              {isRtl ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
          )}
        </Fragment>
      );

      const calendarMonthContent = withPicker ? (
        <div key={`calendar-month-${i}`} className={classNames.gridGroup} role="calendar-month-group">
          <CalendarPicker date={date} key={`calendar-picker-${i}`} data-index={i} currentMonth={currentMonth} />
          <CalendarGrid {...props} key={`calendar-grid-${i}`} currentMonth={currentMonth.month} startDate={date} />
        </div>
      ) : (
        <div key={`calendar-month-${i}`} className={classNames.gridGroup} role="calendar-month-group">
          <CalendarGrid {...props} key={`calendar-grid-${i}`} currentMonth={currentMonth.month} startDate={date} />
        </div>
      );
      calendars.push(calendarMonthContent);
    }

    return { headers, calendars };
  }, [visibleMonths, props, withPicker, currentMonth, prevButtonProps, nextButtonProps, classNames, isRtl]);

  return (
    <div
      {...calendarProps}
      style={{ '--picker-height': `${pickerHeight}px`, ...calendarProps.style } as React.CSSProperties}
      className={cn(className, classNames.root)}
      ref={ref}
    >
      <div className={classNames.container}>
        <div className={classNames.header}>{content.headers}</div>
        <div className={classNames.gridWrapper}>{content.calendars}</div>
      </div>
    </div>
  );
});

export default CalendarRoot;
