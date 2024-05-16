import { type CSSProperties } from 'react';

export type InputClassNames = {
  root?: string;
  group?: string;
  label?: string;
  container?: string;
  segmentWrapper?: string;
  segment?: string;
  separator?: string;
};

export type InputClasses = keyof InputClassNames;
export type InputStyles = Record<InputClasses, CSSProperties>;
