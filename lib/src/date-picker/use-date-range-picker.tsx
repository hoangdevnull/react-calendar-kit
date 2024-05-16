import React, { MutableRefObject, useRef } from 'react';
import { CalendarDate } from '@internationalized/date';
import type { AriaButtonProps } from '@react-aria/button';
import {
  useDateRangePicker as useAriaDateRangePicker,
  type AriaDatePickerProps,
  type AriaDateRangePickerProps,
  type DateValue,
} from '@react-aria/datepicker';
import { mergeProps } from '@react-aria/utils';
import { DateRangePickerState, useDateRangePickerState } from '@react-stately/datepicker';
import type { CalendarProps } from '@react-types/calendar';
import type { AriaDialogProps } from '@react-types/dialog';
import type { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';

import type { RangeCalendarProps } from '../calendar';
import type { DateRangeFieldProps } from '../input/date-range-field';
import type { TimeInputProps } from '../input/time-input';
import type { ElementProps } from '../types/common.types';
import { withAttr } from '../utils';

export interface UseDateRangePickerProps<T extends DateValue> extends AriaDateRangePickerProps<T> {
  dateInputProps?: CalendarProps<T>;
  calendarProps?: RangeCalendarProps<T>;
  timeInputProps?: TimeInputProps;
}
type UseDateRangePickerReturn<T extends DateValue> = {
  ref: MutableRefObject<HTMLDivElement>;
  state: DateRangePickerState;
  getTriggerProps: ElementProps<'button'>;
  getAriaTriggerProps: AriaButtonProps<'button'>;
  getDateRangeProps: {
    state: DateRangePickerState;
    label?: React.ReactNode;
    groupProps: GroupDOMAttributes;
    labelProps: DOMAttributes;
    getStartDateFieldProps: DateRangeFieldProps<T>;
    getEndDateFieldProps: DateRangeFieldProps<T>;
  };
  getTimeInputRangeProps: {
    getStartTimeInputProps: TimeInputProps;
    getEndTimeInputProps: TimeInputProps;
  };
  getCalendarProps: RangeCalendarProps<T>;
  getDialogProps: AriaDialogProps;
};

export const useDateRangePicker = <T extends DateValue>(
  props = {} as UseDateRangePickerProps<T>
): UseDateRangePickerReturn<T> => {
  const {
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    timeInputProps: userTimeInputProps = {},
    dateInputProps: userDateInputProps = {},
    calendarProps: userCalendarProps = {},
    ...etc
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const state = useDateRangePickerState<T>({
    ...etc,
    minValue,
    maxValue,
    shouldCloseOnSelect: () => !state.hasTime,
  }) as DateRangePickerState;

  const { groupProps, labelProps, startFieldProps, endFieldProps, buttonProps, dialogProps, calendarProps } =
    useAriaDateRangePicker<T>({ ...etc, minValue, maxValue }, state, ref);
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

  const getStartDateFieldProps = {
    ...startFieldProps,
    granularity: timeGranularity,
  } as DateRangeFieldProps<T>;

  const getEndDateFieldProps = {
    ...endFieldProps,
    granularity: timeGranularity,
  } as DateRangeFieldProps<T>;

  const timeMinValue = minValue && 'hour' in minValue ? minValue : null;
  const timeMaxValue = maxValue && 'hour' in maxValue ? maxValue : null;

  const getStartTimeInputProps = (
    withTimeInput
      ? {
          ...userTimeInputProps,
          value: state.timeRange?.start || null,
          onChange: (v) => state.setTime('start', v),
          granularity: timeGranularity,
          minValue: timeMinValue ?? undefined,
          maxValue: timeMaxValue ?? undefined,
        }
      : {}
  ) as TimeInputProps;

  const getEndTimeInputProps = (
    withTimeInput
      ? {
          ...userTimeInputProps,
          value: state.timeRange?.end || null,
          onChange: (v) => state.setTime('end', v),
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
    getDateRangeProps: {
      state,
      label: props.label,
      groupProps,
      labelProps,
      getStartDateFieldProps: mergeProps(getStartDateFieldProps, userTimeInputProps),
      getEndDateFieldProps: mergeProps(getEndDateFieldProps, userTimeInputProps),
    },
    getTimeInputRangeProps: {
      getEndTimeInputProps: mergeProps(getEndTimeInputProps, userDateInputProps),
      getStartTimeInputProps: mergeProps(getStartTimeInputProps, userDateInputProps),
    },
    getCalendarProps: mergeProps(calendarProps, userCalendarProps) as RangeCalendarProps<T>,
    getDialogProps: dialogProps,
  };
};
