import type { CSSProperties, ReactElement, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import type { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';

import { ElementProps } from '../types/common.types';
import { cn, mergeStyles } from '../utils';

type DateInputGroupClassNames = {
  root?: string;
  group?: string;
  label?: string;
};
type DateInputGroupClasses = keyof DateInputGroupClassNames;
type DateInputGroupStyles = Record<DateInputGroupClasses, CSSProperties>;

export interface DateInputGroupProps extends ElementProps<'div'> {
  children?: ReactNode;
  groupProps?: GroupDOMAttributes;
  labelProps?: DOMAttributes;
  label?: ReactNode;
  startContent?: ReactElement | ReactElement[];
  endContent?: ReactElement | ReactElement[];
  classNames?: DateInputGroupClassNames;
  styles?: DateInputGroupStyles;
}

const DateInputGroup = forwardRef<HTMLDivElement, DateInputGroupProps>((props, ref) => {
  const {
    label,
    labelProps,
    children,
    groupProps,
    className,
    style,
    classNames,
    styles,
    startContent,
    endContent,
    ...otherProps
  } = props;

  return (
    <div
      {...groupProps}
      {...otherProps}
      className={cn(classNames?.root, className)}
      style={mergeStyles(styles?.root, style)}
    >
      {label ? (
        <label {...labelProps} className={classNames?.label} style={styles?.label}>
          {label}
        </label>
      ) : null}
      <div className={classNames?.group} style={styles?.group} ref={ref}>
        {startContent}
        {children}
        {endContent}
      </div>
    </div>
  );
});

DateInputGroup.displayName = 'DateInputGroup';
export default DateInputGroup;
