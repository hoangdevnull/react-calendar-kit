import React, { forwardRef, useRef, type CSSProperties, type ElementRef, type ReactElement, type Ref } from 'react';
import { CalendarDate, createCalendar, type Calendar } from '@internationalized/date';
import { useDateField, type AriaDateFieldProps, type DateValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useDateFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import type { SupportedCalendars } from '../types/common.types';
import type { InputClassNames, InputStyles } from '../types/theme.types';
import DateField, { type DateFieldProps } from './date-field';

type DateRangeFieldStyles = Pick<InputStyles, 'segmentWrapper' | 'segment'>;

interface Props<T extends DateValue>
  extends AriaDateFieldProps<T>,
    Pick<DateFieldProps, 'inputProps' | 'fieldProps' | 'segmentProps' | 'formatSegment'> {
  className?: string;
  classNames?: Pick<InputClassNames, 'segmentWrapper' | 'segment'>;
  styles?: DateRangeFieldStyles;
  style?: CSSProperties;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  ref?: Ref<HTMLElement>;
}

const DateRangeField = <T extends DateValue>(props: Props<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    fieldProps: userFieldProps = {},
    inputProps: userInputProps = {},
    classNames = {},
    styles = {} as DateRangeFieldStyles,
    shouldForceLeadingZeros = true,
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp,
    segmentProps,
    formatSegment,
    ...etc
  } = props;

  const { locale } = useLocale();

  let state = useDateFieldState<T>({
    ...props,
    locale,
    minValue,
    maxValue,
    shouldForceLeadingZeros,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== 'function'
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMergeRefs(ref, inputRef);
  const { fieldProps, inputProps } = useDateField({ ...props, shouldForceLeadingZeros }, state, ref);

  return (
    <div data-disabled={state.isDisabled} data-invalid={state.isInvalid} ref={composedRef} {...filterDOMProps(etc)}>
      <DateField
        fieldProps={mergeProps(fieldProps, userFieldProps)}
        inputProps={mergeProps(inputProps, userInputProps)}
        state={state}
        classNames={classNames}
        segmentProps={segmentProps}
        formatSegment={formatSegment}
        styles={styles}
      />
    </div>
  );
};

DateRangeField.displayName = 'DateRangeField';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export type DateRangeFieldProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(DateRangeField) as <T extends DateValue>(props: DateRangeFieldProps<T>) => ReactElement;
