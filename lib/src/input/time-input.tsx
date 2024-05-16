import React, { forwardRef, useRef, type CSSProperties, type ElementRef, type ReactElement, type Ref } from 'react';
import { useTimeField, type AriaTimeFieldProps, type TimeValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useTimeFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import type { InputClassNames, InputStyles } from '../types/theme.types';
import DateField, { type DateFieldProps } from './date-field';
import DateInputGroup, { type DateInputGroupProps } from './date-input-group';

interface Props<T extends TimeValue>
  extends AriaTimeFieldProps<T>,
    Pick<DateFieldProps, 'inputProps' | 'fieldProps' | 'segmentProps' | 'formatSegment'>,
    Pick<DateInputGroupProps, 'children' | 'startContent' | 'endContent' | 'labelProps' | 'groupProps'> {
  className?: string;
  classNames?: InputClassNames;
  styles?: InputStyles;
  style?: CSSProperties;
}

const TimeInput = <T extends TimeValue>(props: Props<T>, inputRef: Ref<ElementRef<'div'>>) => {
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
    minValue,
    maxValue,
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
    locale,
    minValue,
    maxValue,
    shouldForceLeadingZeros,
  });

  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMergeRefs(ref, inputRef);
  const { labelProps, fieldProps, inputProps } = useTimeField({ ...props, shouldForceLeadingZeros }, state, ref);

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

TimeInput.displayName = 'TimeInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export type TimeInputProps<T extends TimeValue = TimeValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(TimeInput) as <T extends TimeValue>(props: TimeInputProps<T>) => ReactElement;
