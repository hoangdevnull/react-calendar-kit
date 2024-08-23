import React from 'react';
import { useDateRangePicker, type UseDateRangePickerProps } from 'react-calendar-kit';

import CalendarButton from './calendar-button';
import { CK } from './calendar-primitives';

const DateRangePickerWithTime = (props: UseDateRangePickerProps) => {
  const { ref, state, getCalendarProps, getDateRangeProps, getDialogProps, getTriggerProps, getTimeInputRangeProps } =
    useDateRangePicker({
      granularity: 'minute',
      ...props,
    });

  return (
    <div>
      <CK.DateRangeInput {...getDateRangeProps} ref={ref} endContent={<CalendarButton {...getTriggerProps} />} />

      {state.isOpen ? (
        <div {...getDialogProps}>
          <CK.RangeCalendar
            visibleMonths={2}
            {...getCalendarProps}
            footer={
              <div className="flex w-full justify-between px-6 pb-4">
                <CK.TimeInput {...getTimeInputRangeProps.getStartTimeInputProps} />
                <CK.TimeInput {...getTimeInputRangeProps.getEndTimeInputProps} />
              </div>
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default DateRangePickerWithTime;
