import React, { forwardRef, Fragment, memo, type ForwardedRef, type ReactNode } from 'react';
import { type CalendarAria } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { cn, mergeStyles, withAttr } from '../utils';
import Button from './button';
import { type CalendarHeaderLayout } from './calendar';
import { useCalendarContext } from './calendar-context';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';
import ChevronLeftIcon from './icons/chevron-left-icon';
import ChevronRightIcon from './icons/chevron-right-icon';
import CalendarPicker from './picker/calendar-picker';

export interface CalendarRootProps extends CalendarAria {
  headerLayout?: CalendarHeaderLayout;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

const CalendarRoot = forwardRef((props: CalendarRootProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { calendarProps, headerLayout = 'apart', className, prevButtonProps, nextButtonProps, header, footer } = props;
  const { state, visibleMonths, classNames, withPicker, pickerHeight, isPickerExpanded, styles } = useCalendarContext();
  const { direction: rtlDirection } = useLocale();

  const currentMonth = state.visibleRange.start;
  const isRtl = rtlDirection === 'rtl';

  const headers = [];
  const calendars = [];

  for (let i = 0; i < visibleMonths; i++) {
    let date = currentMonth.add({ months: i });

    const apartLayout = (
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
        <CalendarHeader data-layout={headerLayout} currentMonth={currentMonth} date={date} />
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

    const buttonGroup = (
      <div className={classNames.navGroup} style={styles?.navGroup}>
        <Button {...prevButtonProps} className={cn(classNames.nav, classNames.nextButton)} role="next-button">
          <ChevronLeftIcon />
        </Button>
        <Button {...nextButtonProps} className={cn(classNames.nav, classNames.previousButton)} role="previous-button">
          <ChevronRightIcon />
        </Button>
      </div>
    );

    const leftOrRightLayout = (
      <Fragment key={`calendar-header-${i}`}>
        {headerLayout === 'left' ? buttonGroup : null}
        <CalendarHeader data-layout={headerLayout} currentMonth={currentMonth} date={date} />
        {headerLayout === 'right' ? buttonGroup : null}
      </Fragment>
    );
    headers.push(headerLayout === 'apart' ? apartLayout : leftOrRightLayout);

    const calendarMonthContent = withPicker ? (
      <div key={`calendar-month-${i}`} className={classNames.gridGroup} role="calendar-month-group">
        <CalendarPicker key={`calendar-picker-${i}`} data-index={i} currentMonth={currentMonth} date={date} />
        <CalendarGrid {...props} key={`calendar-grid-${i}`} currentMonth={currentMonth.month} startDate={date} />
      </div>
    ) : (
      <div key={`calendar-month-${i}`} className={classNames.gridGroup} role="calendar-month-group">
        <CalendarGrid {...props} key={`calendar-grid-${i}`} currentMonth={currentMonth.month} startDate={date} />
      </div>
    );
    calendars.push(calendarMonthContent);
  }

  return (
    <div
      {...mergeProps(calendarProps)}
      style={mergeStyles(
        { '--picker-height': `${pickerHeight}px` } as React.CSSProperties,
        calendarProps?.style,
        styles?.root
      )}
      data-picker-expanded={withAttr(isPickerExpanded)}
      className={cn(className, classNames.root)}
      ref={ref}
    >
      {header}
      <VisuallyHidden>
        <h2>{calendarProps['aria-label']}</h2>
      </VisuallyHidden>
      <div className={classNames.container} style={styles?.container}>
        <div className={classNames.header} style={styles?.header}>
          {headers}
        </div>
        <div
          className={classNames.gridWrapper}
          // * Lock the grid height when the picker is expanded
          style={mergeStyles(
            withPicker && isPickerExpanded
              ? { minHeight: 'var(--picker-height)', maxHeight: 'var(--picker-height)', overflowY: 'hidden' }
              : {},
            styles?.gridWrapper
          )}
        >
          {calendars}
        </div>
      </div>
      <VisuallyHidden>
        <button
          aria-label={nextButtonProps['aria-label']}
          disabled={nextButtonProps.isDisabled}
          tabIndex={-1}
          onClick={() => state.focusNextPage()}
        />
      </VisuallyHidden>
      {isPickerExpanded ? null : footer}
    </div>
  );
});

export default memo(CalendarRoot);
