import React from 'react';
import { useDateRangePicker, type UseDateRangePickerProps } from 'react-calendar-kit';

import CalendarButton from './calendar-button';
import { CK } from './calendar-primitives';

const DateRangePicker = (props: UseDateRangePickerProps) => {
  const { ref, state, getCalendarProps, getDateRangeProps, getDialogProps, getTriggerProps } =
    useDateRangePicker(props);

  return (
    <div>
      <CK.DateRangeInput {...getDateRangeProps} ref={ref} endContent={<CalendarButton {...getTriggerProps} />} />

      {state.isOpen ? (
        <div {...getDialogProps}>
          <CK.RangeCalendar {...getCalendarProps} />
        </div>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
