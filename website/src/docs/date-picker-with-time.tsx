import React from 'react';
import { useDatePicker, type UseDatePickerProps } from 'react-calendar-kit';

import CalendarButton from './calendar-button';
import { CK } from './calendar-primitives';

const DatePickerWithTime = (props: UseDatePickerProps) => {
  const { ref, state, getCalendarProps, getTimeInputProps, getDateInputProps, getDialogProps, getTriggerProps } =
    useDatePicker(props);

  return (
    <div>
      <CK.DateInput {...getDateInputProps} ref={ref} endContent={<CalendarButton {...getTriggerProps} />} />
      {state.isOpen ? (
        <div {...getDialogProps}>
          <CK.Calendar
            {...getCalendarProps}
            visibleMonths={1}
            weekdayStyle="short"
            withPicker
            footer={<CK.TimeInput {...getTimeInputProps} />}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerWithTime;
