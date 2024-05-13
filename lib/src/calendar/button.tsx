import React, { ElementRef, forwardRef, useRef } from 'react';
import { useButton, type AriaButtonProps } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { useMergeRefs } from '../hooks/useMergeRefs';
import { ElementProps } from '../types/common.types';
import { withAttr } from '../utils';

export interface ButtonProps extends AriaButtonProps, ElementProps<'button', keyof AriaButtonProps> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, buttonRef) => {
  const ref = useRef<ElementRef<'button'>>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const mergeRef = useMergeRefs(ref, buttonRef);

  return (
    <button
      ref={mergeRef}
      data-pressed={withAttr(isPressed)}
      data-focus={withAttr(isFocusVisible)}
      className={props.className}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </button>
  );
});

Button.displayName = 'NextUI.Button';

export default Button;
