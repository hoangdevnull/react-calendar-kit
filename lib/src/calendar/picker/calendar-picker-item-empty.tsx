import React, { memo } from 'react';

import { ElementProps } from '../../types/common.types';

const PickerItemEmpty = ({ className, total, ...props }: ElementProps<'div'> & { total: number }) => {
  return (
    <>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} aria-hidden="true" className={className} role="picker-item-empty" tabIndex={-1} {...props}>
          &nbsp;
        </div>
      ))}
    </>
  );
};

export default memo(PickerItemEmpty);
