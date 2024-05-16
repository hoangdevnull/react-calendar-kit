import type { ReactElement, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import type { DOMAttributes, GroupDOMAttributes } from '@react-types/shared';

import { ElementProps } from '../types/common.types';
import type { InputClassNames, InputStyles } from '../types/theme.types';
import { cn, mergeStyles } from '../utils';

export interface DateInputGroupProps extends ElementProps<'div'> {
  children?: ReactNode;
  label?: ReactNode;
  groupProps?: GroupDOMAttributes;
  labelProps?: DOMAttributes;
  startContent?: ReactElement | ReactElement[];
  endContent?: ReactElement | ReactElement[];
  classNames?: Pick<InputClassNames, 'root' | 'group' | 'label'>;
  styles?: Pick<InputStyles, 'root' | 'group' | 'label'>;
}

const DateInputGroup = forwardRef<HTMLDivElement, DateInputGroupProps>((props, ref) => {
  const {
    label: labelProp,
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

  const label = labelProps?.children ?? labelProp;

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
