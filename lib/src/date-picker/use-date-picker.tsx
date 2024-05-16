import React, { MutableRefObject, useRef } from 'react';
import { CalendarDate } from '@internationalized/date';
import type { AriaButtonProps } from '@react-aria/button';
import { useDatePicker as useAriaDatePicker, type AriaDatePickerProps, type DateValue } from '@react-aria/datepicker';
import { mergeProps } from '@react-aria/utils';
import { DatePickerState, useDatePickerState } from '@react-stately/datepicker';
import type { CalendarProps } from '@react-types/calendar';
import type { AriaDialogProps } from '@react-types/dialog';
import type { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';

import type { TimeInputProps } from '../input/time-input';
import type { ElementProps } from '../types/common.types';
import { withAttr } from '../utils';

export interface UseDatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  dateInputProps?: CalendarProps<T>;
  calendarProps?: CalendarProps<T>;
  timeInputProps?: TimeInputProps;
}

type GetDateInputProps<T extends DateValue> = AriaDatePickerProps<T> & {
  groupProps: GroupDOMAttributes;
  labelProps: DOMAttributes;
};

type UseDatePickerReturn<T extends DateValue> = {
  ref: MutableRefObject<HTMLDivElement>;
  state: DatePickerState;
  getTriggerProps: ElementProps<'button'>;
  getAriaTriggerProps: AriaButtonProps<'button'>;
  getDateInputProps: GetDateInputProps<T>;
  getTimeInputProps: TimeInputProps;
  getCalendarProps: CalendarProps<T>;
  getDialogProps: AriaDialogProps;
};

export const useDatePicker = <T extends DateValue>(props = {} as UseDatePickerProps<T>): UseDatePickerReturn<T> => {
  const {
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    timeInputProps: userTimeInputProps = {},
    dateInputProps: userDateInputProps = {},
    calendarProps: userCalendarProps = {},
    ...etc
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const state = useDatePickerState<T>({
    ...etc,
    minValue,
    maxValue,
    shouldCloseOnSelect: () => !state.hasTime,
  }) as DatePickerState;

  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } = useAriaDatePicker<T>(
    { ...etc, minValue, maxValue },
    state,
    ref
  );
  // Time field values
  const timeGranularity =
    state.granularity === 'hour' || state.granularity === 'minute' || state.granularity === 'second'
      ? state.granularity
      : null;
  const withTimeInput = !!timeGranularity;

  const { onPress, isDisabled, ...baseTriggerProps } = buttonProps;

  const getTriggerProps = {
    ...baseTriggerProps,
    onClick: () => state.toggle(),
    'data-disabled': withAttr(isDisabled),
  } as ElementProps<'button'>;
  const getDateInputProps = {
    ...fieldProps,
    groupProps,
    labelProps,
    granularity: timeGranularity,
    label: props.label,
  } as GetDateInputProps<T>;

  const timeMinValue = minValue && 'hour' in minValue ? minValue : null;
  const timeMaxValue = maxValue && 'hour' in maxValue ? maxValue : null;

  const getTimeInputProps = (
    withTimeInput
      ? {
          ...userTimeInputProps,
          value: state.timeValue,
          onChange: state.setTimeValue,
          granularity: timeGranularity,
          minValue: timeMinValue ?? undefined,
          maxValue: timeMaxValue ?? undefined,
        }
      : {}
  ) as TimeInputProps;

  return {
    ref,
    state,
    getTriggerProps,
    getAriaTriggerProps: buttonProps,
    getTimeInputProps: mergeProps(getTimeInputProps, userTimeInputProps),
    getDateInputProps: mergeProps(getDateInputProps, userDateInputProps),
    getCalendarProps: mergeProps(calendarProps, userCalendarProps) as CalendarProps<T>,
    getDialogProps: dialogProps,
  };
};
