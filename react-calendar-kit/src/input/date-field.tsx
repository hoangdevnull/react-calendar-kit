import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { mergeProps } from '@react-aria/utils';
import { type DateFieldState, type DateSegment } from '@react-stately/datepicker';
import { type GroupDOMAttributes } from '@react-types/shared';

import { type ElementProps } from '../types/common.types';
import type { InputClassNames, InputStyles } from '../types/theme.types';
import { cn, mergeStyles } from '../utils';
import { DateInputSegment, type DateInputSegmentProps } from './date-input-segment';

export interface DateFieldProps extends ElementProps<'div', keyof GroupDOMAttributes> {
  /** State for the date field. */
  state: DateFieldState;
  /** Props for the hidden input element for HTML form submission. */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  fieldProps?: GroupDOMAttributes;
  segmentProps?: DateInputSegmentProps;
  formatSegment?: (segments: DateSegment[]) => DateSegment[];
  classNames?: Pick<InputClassNames, 'segmentWrapper' | 'segment'>;
  styles?: Pick<InputStyles, 'segmentWrapper' | 'segment'>;
}
const DateField = forwardRef<HTMLDivElement, DateFieldProps>((props, ref) => {
  const {
    state,
    classNames,
    styles,
    inputProps = {},
    fieldProps = {},
    segmentProps: { className: segmentClassName = '', style: segmentStyle = {}, ...segmentProps } = {},
    formatSegment = (segments) => segments,
    ...etc
  } = props;

  return (
    <div
      {...mergeProps(fieldProps, etc)}
      data-disabled={state.isDisabled}
      data-invalid={state.isInvalid}
      className={cn(classNames.segmentWrapper)}
      style={styles?.segmentWrapper}
      ref={ref}
    >
      {formatSegment(state.segments).map((segment, i) => (
        <DateInputSegment
          key={i}
          className={cn(classNames.segment, segmentClassName)}
          style={mergeStyles(styles?.segment, segmentStyle)}
          segment={segment}
          state={state}
          {...segmentProps}
        />
      ))}
      <input {...inputProps} />
    </div>
  );
});

export default DateField;
