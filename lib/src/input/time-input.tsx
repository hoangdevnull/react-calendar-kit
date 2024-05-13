import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useRef,
  type ElementRef,
  type ReactElement,
  type Ref,
} from 'react';
import { createCalendar, type Calendar } from '@internationalized/date';
import { useTimeField, type AriaTimeFieldProps, type TimeValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { DateSegment, useTimeFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { SupportedCalendars } from '../types/common.types';
import { cn } from '../utils';
import { DateInputSegment, type DateInputSegmentProps } from './date-input-segment';

type TimeInputClassNames = {
  root?: string;
  label?: string;
  wrapper?: string;
  segment?: string;
};
type TimeInputClasses = keyof TimeInputClassNames;
type TimeInputStyles = Record<TimeInputClasses, CSSProperties>;
export interface TimeInputProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  className?: string;
  classNames?: TimeInputClassNames;
  styles?: TimeInputStyles;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  segmentProps?: DateInputSegmentProps;
  formatSegment?: (segments: DateSegment[]) => DateSegment[];
  children?: ReactNode | string;
}

const TimeInput = <T extends TimeValue>(props: TimeInputProps<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    className,
    classNames = {},
    styles = {} as TimeInputStyles,
    label,
    formatSegment = (segments) => segments,
    validationBehavior,
    shouldForceLeadingZeros = true,
    minValue,
    maxValue,
    createCalendar: createCalendarProp,
    isInvalid: isInvalidProp,
    segmentProps: { className: segmentClassName = '', style: segmentStyle = {}, ...segmentProps } = {},
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
    validationBehavior,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros,
  });

  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMergeRefs(ref, inputRef);
  const { labelProps, fieldProps } = useTimeField(etc, state, ref);

  return (
    <div data-disabled={state.isDisabled} data-invalid={state.isInvalid} className={cn(classNames.root, className)}>
      {label ? (
        <label className={cn(classNames.label)} style={styles.label} {...labelProps}>
          {label}
        </label>
      ) : null}

      <div {...fieldProps} ref={composedRef} className={cn(classNames.wrapper)} style={styles.wrapper}>
        {formatSegment(state.segments).map((segment, i) => (
          <DateInputSegment
            key={i}
            className={cn(classNames.segment, segmentClassName)}
            style={{ ...styles.segment, ...segmentStyle }}
            segment={segment}
            state={state}
            {...segmentProps}
          />
        ))}
        {children}
      </div>
    </div>
  );
};

TimeInput.displayName = 'TimeInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(TimeInput) as <T extends TimeValue>(props: TimeInputProps<T>) => ReactElement;
