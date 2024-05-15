import React, { CSSProperties, forwardRef, InputHTMLAttributes } from 'react';
import { DateFieldState, DateSegment } from '@react-stately/datepicker';
import { GroupDOMAttributes } from '@react-types/shared';

import { ElementProps } from '../types/common.types';
import { cn, mergeStyles } from '../utils';
import { DateInputSegment, DateInputSegmentProps } from './date-input-segment';

type DateFieldClassNames = {
  segmentWrapper?: string;
  segment?: string;
};
type DateFieldClasses = keyof DateFieldClassNames;
type DateFieldStyles = Record<DateFieldClasses, CSSProperties>;

export interface DateFieldProps extends ElementProps<'div', keyof GroupDOMAttributes> {
  /** State for the date field. */
  state: DateFieldState;
  /** Props for the hidden input element for HTML form submission. */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  fieldProps?: GroupDOMAttributes;
  segmentProps?: DateInputSegmentProps;
  formatSegment?: (segments: DateSegment[]) => DateSegment[];
  classNames?: DateFieldClassNames;
  styles?: DateFieldStyles;
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
  } = props;

  return (
    <div
      {...fieldProps}
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
