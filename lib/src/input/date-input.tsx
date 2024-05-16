import React, { forwardRef, useRef, type CSSProperties, type ElementRef, type ReactElement, type Ref } from 'react';
import { CalendarDate, createCalendar, type Calendar } from '@internationalized/date';
import { useDateField, type AriaDateFieldProps, type DateValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useDateFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { type SupportedCalendars } from '../types/common.types';
import type { InputClassNames, InputStyles } from '../types/theme.types';
import DateField, { type DateFieldProps } from './date-field';
import DateInputGroup, { type DateInputGroupProps } from './date-input-group';

interface Props<T extends DateValue>
  extends AriaDateFieldProps<T>,
    Pick<DateFieldProps, 'inputProps' | 'fieldProps' | 'segmentProps' | 'formatSegment'>,
    Pick<DateInputGroupProps, 'children' | 'startContent' | 'endContent' | 'labelProps' | 'groupProps'> {
  className?: string;
  style?: CSSProperties;
  classNames?: InputClassNames;
  styles?: InputStyles;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
}

const DateInput = <T extends DateValue>(props: Props<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    groupProps: groupPropsProp = {},
    labelProps: labelPropsProp = {},
    inputProps: inputPropsProp = {},
    fieldProps: fieldPropsProp = {},
    className,
    classNames = {},
    styles = {} as InputStyles,
    style,
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
  const { labelProps, fieldProps, inputProps } = useDateField({ ...props, shouldForceLeadingZeros }, state, ref);

  return (
    <DateInputGroup
      data-disabled={state.isDisabled}
      data-invalid={state.isInvalid}
      className={className}
      classNames={classNames}
      styles={styles}
      style={style}
      ref={composedRef}
      labelProps={mergeProps(labelProps, labelPropsProp)}
      startContent={startContent}
      endContent={endContent}
      label={props.label}
      {...mergeProps(groupPropsProp, filterDOMProps(etc))}
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
export type DateInputProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(DateInput) as <T extends DateValue>(props: DateInputProps<T>) => ReactElement;
