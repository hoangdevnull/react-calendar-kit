import React, { CSSProperties, forwardRef, useRef, type ElementRef, type ReactElement, type Ref } from 'react';
import { CalendarDate, createCalendar, type Calendar } from '@internationalized/date';
import { useDateField, type AriaDateFieldProps, type DateValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useDateFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { SupportedCalendars } from '../types/common.types';
import DateField, { DateFieldProps } from './date-field';
import DateInputGroup, { DateInputGroupProps } from './date-input-group';

type DateInputClassNames = {
  root?: string;
  group?: string;
  label?: string;
  container?: string;
  segmentWrapper?: string;
  segment?: string;
};
type DateInputClasses = keyof DateInputClassNames;
type DateInputStyles = Record<DateInputClasses, CSSProperties>;

export interface DateInputProps<T extends DateValue>
  extends AriaDateFieldProps<T>,
    Pick<DateFieldProps, 'inputProps' | 'fieldProps' | 'segmentProps' | 'formatSegment'>,
    Pick<DateInputGroupProps, 'children' | 'startContent' | 'endContent' | 'labelProps' | 'groupProps'> {
  className?: string;
  classNames?: DateInputClassNames;
  styles?: DateInputStyles;
  style?: CSSProperties;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
}

const DateInput = <T extends DateValue>(props: DateInputProps<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    groupProps: groupPropsProp = {},
    labelProps: labelPropsProp = {},
    inputProps: inputPropsProp = {},
    fieldProps: fieldPropsProp = {},
    className,
    classNames = {},
    styles = {} as DateInputStyles,
    style,
    label,
    shouldForceLeadingZeros = true,
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp,
    segmentProps,
    formatSegment,
    startContent,
    endContent,
    children,
    ...etc
  } = props;

  const { locale } = useLocale();

  let state = useDateFieldState<T>({
    ...props,
    label,
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
  const { labelProps, fieldProps, inputProps } = useDateField({ ...props, label, shouldForceLeadingZeros }, state, ref);

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

DateInput.displayName = 'DateInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateInput) as <T extends DateValue>(props: DateInputProps<T>) => ReactElement;
