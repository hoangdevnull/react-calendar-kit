import React, { forwardRef, useRef } from 'react';
import { useButton, type AriaButtonProps } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { useMergeRefs } from '../hooks/useMergeRefs';

export interface ButtonProps extends AriaButtonProps {}

const Button = forwardRef<'button', ButtonProps>((props, buttonRef) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const mergeRef = useMergeRefs(ref, buttonRef);

  return (
    <button ref={mergeRef} data-focus={isFocusVisible} {...mergeProps(buttonProps, focusProps)}>
      {props.children}
    </button>
  );
});

Button.displayName = 'NextUI.Button';

export default Button;
