import { clsx } from 'clsx';

export const cn = clsx;

export const withAttr = (cond: boolean | undefined) =>
    (cond ? "true" : undefined) as any;

