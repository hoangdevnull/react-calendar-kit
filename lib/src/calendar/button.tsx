import React, { forwardRef, useRef, type ElementRef } from 'react';
import { useButton, type AriaButtonProps } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { filterDOMProps, mergeProps } from '@react-aria/utils';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { type ElementProps } from '../types/common.types';
import { withAttr } from '../utils';

export interface ButtonProps extends AriaButtonProps, ElementProps<'button', keyof AriaButtonProps> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, buttonRef) => {
  const { children, autoFocus, isDisabled, onKeyDown, ...otherProps } = props;
  const ref = useRef<ElementRef<'button'>>(null);

  const { buttonProps, isPressed } = useButton(
    {
      elementType: 'button',
      isDisabled,
      onKeyDown,
      ...otherProps,
    } as AriaButtonProps,
    ref
  );
  const mergedRef = useMergeRefs(ref, buttonRef);
  const { isFocusVisible, isFocused, focusProps } = useFocusRing({ autoFocus });
  const { isHovered, hoverProps } = useHover({ isDisabled });

  return (
    <button
      ref={mergedRef}
      data-disabled={withAttr(isDisabled)}
      data-focus={withAttr(isFocused)}
      data-focus-visible={withAttr(isFocusVisible)}
      data-hover={withAttr(isHovered)}
      data-pressed={withAttr(isPressed)}
      className={props.className}
      {...mergeProps(focusProps, hoverProps, buttonProps, filterDOMProps(otherProps))}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
