import React, { useRef } from 'react';
import { useDateSegment } from '@react-aria/datepicker';
import { type DateFieldState, type DateSegment } from '@react-stately/datepicker';

import { type ElementProps } from '../types/common.types';

export interface DateInputSegmentProps extends ElementProps<'div'> {
  state: DateFieldState;
  segment: DateSegment;
}

export const DateInputSegment: React.FC<DateInputSegmentProps> = ({ state, segment, ...etc }) => {
  const ref = useRef(null);

  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      {...etc}
      ref={ref}
      data-editable={segment.isEditable}
      data-invalid={state.isInvalid}
      data-placeholder={segment.isPlaceholder}
      data-type={segment.type}
      style={{ ...segmentProps.style }}
    >
      {segment.text}
    </div>
  );
};
