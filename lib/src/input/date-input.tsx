import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useRef,
  type ElementRef,
  type ReactElement,
  type Ref,
} from 'react';
import { CalendarDate, createCalendar, type Calendar } from '@internationalized/date';
import { useDateField, type AriaDateFieldProps, type DateValue } from '@react-aria/datepicker';
import { useLocale } from '@react-aria/i18n';
import { DateSegment, useDateFieldState } from '@react-stately/datepicker';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { SupportedCalendars } from '../types/common.types';
import { cn } from '../utils';
import { DateInputSegment, type DateInputSegmentProps } from './date-input-segment';

type DateInputClassNames = {
  root?: string;
  label?: string;
  wrapper?: string;
  segment?: string;
};
type DateInputClasses = keyof DateInputClassNames;
type DateInputStyles = Record<DateInputClasses, CSSProperties>;
export interface DateInputProps<T extends DateValue> extends AriaDateFieldProps<T> {
  className?: string;
  classNames?: DateInputClassNames;
  styles?: DateInputStyles;
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  segmentProps?: DateInputSegmentProps;
  formatSegment?: (segments: DateSegment[]) => DateSegment[];
  children?: ReactNode | string;
}

const DateInput = <T extends DateValue>(props: DateInputProps<T>, inputRef: Ref<ElementRef<'div'>>) => {
  const {
    className,
    classNames = {},
    styles = {} as DateInputStyles,
    label,
    formatSegment = (segments) => segments,
    validationBehavior,
    shouldForceLeadingZeros = true,
    minValue = new CalendarDate(1900, 1, 1),
    maxValue = new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp,
    isInvalid: isInvalidProp,
    segmentProps: { className: segmentClassName = '', style: segmentStyle = {}, ...segmentProps } = {},
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
    validationBehavior,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== 'function'
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMergeRefs(ref, inputRef);
  const { labelProps, fieldProps } = useDateField(etc, state, ref);

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

DateInput.displayName = 'DateInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateInput) as <T extends DateValue>(props: DateInputProps<T>) => ReactElement;
