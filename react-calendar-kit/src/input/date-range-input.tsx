import React, {
  forwardRef,
  type CSSProperties,
  type ElementRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { type DateValue } from '@react-aria/datepicker';
import { mergeProps } from '@react-aria/utils';
import { type DateRangePickerState } from '@react-stately/datepicker';

import type { InputClassNames, InputStyles } from '../types/theme.types';
import DateInputGroup, { type DateInputGroupProps } from './date-input-group';
import DateRangeField, { type DateRangeFieldProps } from './date-range-field';

interface Props<T extends DateValue = DateValue>
  extends Pick<DateInputGroupProps, 'children' | 'startContent' | 'endContent' | 'labelProps' | 'groupProps'> {
  state: DateRangePickerState;
  getStartDateFieldProps: DateRangeFieldProps<T>;
  getEndDateFieldProps: DateRangeFieldProps<T>;
  className?: string;
  classNames?: InputClassNames;
  styles?: InputStyles;
  style?: CSSProperties;
  label?: ReactNode;
  separator?: ReactNode;
}

const DateRangeInput = <T extends DateValue = DateValue>(props: Props<T>, ref: Ref<ElementRef<'div'>>) => {
  const {
    state,
    label,
    groupProps = {},
    labelProps = {},
    className,
    classNames = {},
    separator = <span className={classNames?.separator}>-</span>,
    styles = {} as InputStyles,
    style,
    startContent,
    endContent,
    children,
    getStartDateFieldProps,
    getEndDateFieldProps,
  } = props;

  return (
    <DateInputGroup
      data-disabled={state.isInvalid}
      data-invalid={state.isInvalid}
      className={className}
      classNames={classNames}
      styles={styles}
      style={style}
      labelProps={mergeProps(labelProps)}
      startContent={startContent}
      endContent={endContent}
      label={label}
      ref={ref}
      {...groupProps}
    >
      <div className={classNames.rangeGroup}>
        <DateRangeField {...getStartDateFieldProps} classNames={classNames} styles={styles} />
        {separator}
        <DateRangeField {...getEndDateFieldProps} classNames={classNames} styles={styles} />
      </div>
      {children}
    </DateInputGroup>
  );
};

DateRangeInput.displayName = 'DateRangeInput';

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export type DateRangeInputProps<T extends DateValue = DateValue> = Props<T> & { ref?: Ref<HTMLElement> };
export default forwardRef(DateRangeInput) as <T extends DateValue>(props: DateRangeInputProps<T>) => ReactElement;
