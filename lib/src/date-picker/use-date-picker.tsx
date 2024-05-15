import React, { MutableRefObject } from 'react';
import { CalendarDate } from '@internationalized/date';
import type { AriaButtonProps } from '@react-aria/button';
import { useDatePicker as useAriaDatePicker, type AriaDatePickerProps, type DateValue } from '@react-aria/datepicker';
import { filterDOMProps } from '@react-aria/utils';
import { DatePickerState, useDatePickerState } from '@react-stately/datepicker';
import type { CalendarProps } from '@react-types/calendar';
import type { AriaDialogProps } from '@react-types/dialog';
import type { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';

import { ElementProps } from '../types/common.types';
import { withAttr } from '../utils';

export interface UseDatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {}

type GetDateInputProps<T extends DateValue> = AriaDatePickerProps<T> & {
  groupProps: GroupDOMAttributes;
  labelProps: DOMAttributes;
};

export const useDatePicker = <T extends DateValue>(
  props: UseDatePickerProps<T>,
  ref: MutableRefObject<HTMLElement>
): {
  state: DatePickerState;
  getTriggerProps: ElementProps<'button'>;
  getAriaTriggerProps: AriaButtonProps<'button'>;
  getDateInputProps: GetDateInputProps<T>;
  getCalendarProps: CalendarProps<T>;
  getDialogProps: AriaDialogProps;
} => {
  const { minValue = new CalendarDate(1900, 1, 1), maxValue = new CalendarDate(2099, 12, 31), ...etc } = props;

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

  const { onPress, isDisabled, ...baseTriggerProps } = buttonProps;

  const getTriggerProps = {
    ...baseTriggerProps,
    onClick: () => state.open(),
    'data-disabled': withAttr(isDisabled),
  } as ElementProps<'button'>;

  const getDateInputProps = {
    ...fieldProps,
    groupProps,
    labelProps,
  } as GetDateInputProps<T>;

  return {
    state,
    getTriggerProps,
    getAriaTriggerProps: buttonProps,
    getDateInputProps,
    getCalendarProps: calendarProps as CalendarProps<T>,
    getDialogProps: dialogProps,
  };
};
