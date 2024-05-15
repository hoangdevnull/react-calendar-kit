import React, { CSSProperties, forwardRef, useRef, type ElementRef, type ReactElement, type Ref } from 'react';
import { type Calendar } from '@internationalized/date';
import { useTimeField, type AriaTimeFieldProps, type TimeValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useTimeFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { SupportedCalendars } from '../types/common.types';
import DateField, { DateFieldProps } from './date-field';
import DateInputGroup, { DateInputGroupProps } from './date-input-group';

type TimeInputClassNames = {
  root?: string;
  group?: string;
  label?: string;
  segmentWrapper?: string;
  segment?: string;
};
type TimeInputClasses = keyof TimeInputClassNames;
type TimeInputStyles = Record<TimeInputClasses, CSSProperties>;
export interface TimeInputProps<T extends TimeValue>
  extends AriaTimeFieldProps<T>,
    Pick<DateFieldProps, 'inputProps' | 'fieldProps' | 'segmentProps' | 'formatSegment'>,
    Pick<DateInputGroupProps, 'children' | 'startContent' | 'endContent' | 'labelProps' | 'groupProps'> {
  className?: string;
  classNames?: TimeInputClassNames;
  styles?: TimeInputStyles;
  style?: CSSProperties;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
}

const TimeInput = <T extends TimeValue>(props: TimeInputProps<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    groupProps: groupPropsProp = {},
    labelProps: labelPropsProp = {},
    inputProps: inputPropsProp = {},
    fieldProps: fieldPropsProp = {},
    className,
    classNames = {},
    styles = {} as TimeInputStyles,
    style,
    label,
    shouldForceLeadingZeros = true,
    minValue,
    maxValue,
    createCalendar: createCalendarProp,
    segmentProps,
    formatSegment,
    startContent,
    endContent,
    children,
    ...etc
  } = props;

  const { locale } = useLocale();

  let state = useTimeFieldState<T>({
    ...props,
    label,
    locale,
    minValue,
    maxValue,
    shouldForceLeadingZeros,
  });

  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMergeRefs(ref, inputRef);
  const { labelProps, fieldProps, inputProps } = useTimeField({ ...props, label, shouldForceLeadingZeros }, state, ref);

  return (
    <DateInputGroup
      data-disabled={state.isDisabled}
      data-invalid={state.isInvalid}
      className={className}
      classNames={classNames}
      styles={styles}
      style={style}
      ref={composedRef}
      label={label}
      labelProps={mergeProps(labelProps, labelPropsProp)}
      startContent={startContent}
      endContent={endContent}
      {...filterDOMProps(etc)}
    >
      <DateField
        fieldProps={mergeProps(fieldProps, fieldPropsProp)}
        inputProps={mergeProps(inputProps, inputPropsProp)}
        state={state}
        classNames={classNames}
        segmentProps={segmentProps}
        formatSegment={formatSegment}
        styles={styles}
      />
      {children}
    </DateInputGroup>
  );
};

TimeInput.displayName = 'TimeInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(TimeInput) as <T extends TimeValue>(props: TimeInputProps<T>) => ReactElement;
