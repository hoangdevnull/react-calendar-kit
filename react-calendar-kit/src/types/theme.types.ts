import { type CSSProperties } from 'react';

export type InputClassNames = {
  root?: string | undefined;
  group?: string | undefined;
  label?: string | undefined;
  container?: string | undefined;
  segmentWrapper?: string | undefined;
  segment?: string | undefined;
  separator?: string | undefined;
};

export type InputClasses = keyof InputClassNames;
export type InputStyles = Record<InputClasses, CSSProperties>;
