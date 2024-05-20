# react-calendar-kit

## Getting Started

React Calendar Kit is a powerful and flexible library for building accessible and highly customizable calendar and date/time picker components in your React applications. React Calendar Kit provides a solid foundation for creating inclusive user experiences.

React Calendar Kit includes several libraries, which you can choose depending on your use-case.

- [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html) is a collection of unstyled React components and hooks that helps you build accessible, high quality UI components for your own application or design system. If you're building a component library for the web from scratch with your own styling, start here.
- [React Stately](https://react-spectrum.adobe.com/react-stately/getting-started.html) is a library of state management hooks for use in your component library. If you're using React Aria, you'll likely also use React Stately, but it can also be used independently (e.g. on other platforms like React Native).

## Documentation

Visit [https://react-calendar-kit.vercel.app](https://react-calendar-kit.vercel.app) to view the full documentation.

## Install

This package includes two peer dependencies, namely `@internationalized/date` and `@react-aria/i18n`, which are necessary for parsing the date as a value of the kit.

```sh
npm install -D react-calendar-kit
```

```sh
yarn add -D react-calendar-kit
```

```sh
pnpm i -D react-calendar-kit
```

## Add Core components to your app

It can be placed anywhere, even in server components such as `ui/primitives.tsx`.

```tsx copy
import React, { forwardRef, type ElementRef } from 'react';
import {
  CalendarKit,
  type CalendarProps,
  type DateInputProps,
  type DateRangeInputProps,
  type RangeCalendarProps,
  type TimeInputProps,
} from 'react-calendar-kit';

import { cn } from '../../utils';

const Calendar = forwardRef<ElementRef<typeof CalendarKit.Calendar>, CalendarProps>((props, ref) => (
  <CalendarKit.Calendar ref={ref} {...props} />
));
const RangeCalendar = forwardRef<ElementRef<typeof CalendarKit.RangeCalendar>, RangeCalendarProps>((props, ref) => (
  <CalendarKit.RangeCalendar ref={ref} {...props} />
));

const DateRangeInput = forwardRef<ElementRef<typeof CalendarKit.DateRangeInput>, DateRangeInputProps>((props, ref) => (
  <CalendarKit.DateRangeInput ref={ref} {...props} />
));

const DateInput = forwardRef<ElementRef<typeof CalendarKit.DateInput>, DateInputProps>((props, ref) => (
  <CalendarKit.DateInput ref={ref} {...props} />
));

const TimeInput = forwardRef<ElementRef<typeof CalendarKit.TimeInput>, TimeInputProps>((props, ref) => (
  <CalendarKit.TimeInput ref={ref} {...props} />
));

export const CK = {
  RangeCalendar,
  Calendar,
  DateInput,
  TimeInput,
  DateRangeInput,
};
```

### Customize Component Styles

React Calendar Kit components are intentionally unstyled by default. This design choice gives you the freedom to apply your own styles and seamlessly integrate the calendar into the aesthetic of your application.
