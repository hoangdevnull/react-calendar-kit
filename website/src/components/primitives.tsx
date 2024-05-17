import React, { forwardRef, type ElementRef } from 'react';
import { cn } from '@/utils';
import {
  Calendar as KitCalendar,
  DateInput as KitDateInput,
  DateRangeInput as KitDateRangeInput,
  RangeCalendar as KitRangeCalendar,
  TimeInput as KitTimeInput,
  type CalendarProps,
  type DateInputProps,
  type DateRangeInputProps,
  type RangeCalendarProps,
  type TimeInputProps,
} from 'calendar-kit';

const Calendar = forwardRef<ElementRef<typeof KitCalendar>, CalendarProps>((props, ref) => (
  <KitCalendar
    ref={ref}
    classNames={{
      root: 'bg-gray-950 rounded-lg w-fit',
      gridWrapper: 'flex justify-between',
      gridGroup: 'relative w-full h-full py-4',
      header: 'relative p-4 flex items-center justify-between gap-2  [&_.chevron-icon]:flex-none',
      nav: 'min-w-10 aspect-square h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800 absolute top-1/2 -translate-y-1/2',
      nextButton: 'right-3',
      previousButton: 'left-3',
      month: 'w-full flex items-center justify-center',

      gridHead: '',
      gridHeadRow: 'px-4 pb-2 flex justify-center text-default-400',
      gridHeadCell: 'flex w-10 justify-center items-center font-normal text-sm',

      gridBodyRow:
        'flex justify-center items-center data-[picker-expanded=true]:pointer-events-none pointer-events-auto',
      gridBodyCell: 'py-0.5 px-0',

      cellButton: cn([
        // Base
        'tap-highlight-transparent box-border flex h-10 w-10 origin-center select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-sm font-normal text-white subpixel-antialiased shadow-none outline-none transition-[transform,background-color,color] duration-100',

        // Disabled state
        'data-[disabled=true]:cursor-default data-[readonly=true]:cursor-default data-[unavailable=true]:cursor-default data-[disabled=true]:text-gray-500 data-[unavailable=true]:text-gray-500 data-[unavailable=true]:line-through data-[disabled=true]:transition-none',

        // Focus state
        'data-[focus-visible=true]:outline-focus data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2',

        // Selected
        'data-[hover=true]:bg-gray-800 data-[selected=true]:bg-blue-600 data-[selected=true]:data-[hover=true]:bg-blue-600 data-[hover=true]:text-white data-[selected=true]:data-[hover=true]:text-blue-50 data-[selected=true]:text-white data-[selected=true]:shadow-none',

        // Click state
        'scale-100 data-[pressed=true]:scale-90 data-[pressed=true]:bg-blue-600 data-[pressed=true]:text-white',
      ]),

      picker: {
        root: cn([
          '!duration-250 absolute inset-x-0 top-0 z-20 flex w-full justify-center rounded-lg bg-gray-950 transition-opacity',
          // Opened state
          'pointer-events-none opacity-0 data-[expanded=true]:pointer-events-auto data-[expanded=true]:opacity-100',
        ]),

        button:
          'flex justify-between items-center gap-2 px-4 py-2 bg-gray-900 rounded-full shadow-sm outline-none data-[pressed=true]:scale-90 scale-100 transition-transform !duration-250 group',
        buttonIcon: 'group-data-[expanded=true]:rotate-180 transition-transform duration-250',
        highlight:
          'h-10 border-y border-gray-600 absolute w-[calc(100%_-_16px)] z-0 top-1/2 -translate-y-1/2 pointer-events-none',
        list: cn(
          'scrollbar-hide flex snap-y snap-mandatory flex-col items-center overflow-y-scroll px-4 [--scroll-shadow-size:100px] [mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]'
        ),
        item: 'w-full flex text-foreground items-center h-10 min-h-10 snap-center text-base z-20 data-[pressed=true]:opacity-50 outline-none data-[focus-visible=true]:z-20 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-opacity',
      },
    }}
    className="text-white"
    visibleMonths={1}
    weekdayStyle="short"
    withPicker
    {...props}
  />
));
const RangeCalendar = forwardRef<ElementRef<typeof KitRangeCalendar>, RangeCalendarProps>((props, ref) => (
  <KitRangeCalendar
    ref={ref}
    classNames={{
      root: 'bg-gray-950 rounded-lg',
      gridWrapper: 'flex justify-between pb-4',
      gridGroup: 'relative w-full h-full',
      header: 'relative p-4 flex items-center justify-between gap-2  [&_.chevron-icon]:flex-none',
      nav: 'min-w-10 aspect-square h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800 absolute top-1/2 -translate-y-1/2',
      nextButton: 'right-3',
      previousButton: 'left-3',
      month: 'w-full flex items-center justify-center',

      gridHead: '',
      gridHeadRow: 'px-4 pb-2 flex justify-center text-default-400',
      gridHeadCell: 'flex w-10 justify-center items-center font-normal text-sm',

      gridBodyRow: 'flex justify-center items-center',
      gridBodyCell: 'py-0.5 px-0',

      cellButton: cn([
        // Base
        'tap-highlight-transparent relative z-10 box-border flex h-10 w-10 origin-center select-none appearance-none items-center justify-center overflow-visible whitespace-nowrap rounded-full text-sm font-normal text-white subpixel-antialiased shadow-none outline-none transition-[transform,background-color,color] duration-100',

        // Disabled state
        'data-[disabled=true]:cursor-default data-[readonly=true]:cursor-default data-[unavailable=true]:cursor-default data-[disabled=true]:text-gray-500 data-[unavailable=true]:text-gray-500 data-[unavailable=true]:line-through data-[disabled=true]:transition-none',

        // Focus state
        'data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2',

        // Hovered
        'data-[hover=true]:bg-gray-800 data-[hover=true]:text-white data-[selected=true]:data-[hover=true]:text-blue-50',

        // Click state
        'scale-100 data-[pressed=true]:scale-90 data-[pressed=true]:bg-blue-600 data-[pressed=true]:text-white',

        // Range state using pseudo elements
        "before:absolute before:inset-0 before:z-[-2] before:rounded-none before:content-['']",
        "after:absolute after:inset-0 after:z-[-1] after:rounded-full after:content-['']",

        // Range select but outside month
        'data-[outside-month=true]:before:hidden',
        'data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:bg-transparent',
        'data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-gray-500',

        // Range selection middle
        'data-[range-start=true]:before:rounded-l-full data-[selection-start=true]:before:rounded-l-full',
        'data-[range-end=true]:before:rounded-r-full data-[selection-end=true]:before:rounded-r-full',
        'data-[selected=true]:data-[range-selection=true]:before:bg-gray-800',
        'data-[selected=true]:data-[range-selection=true]:text-white',

        // Range selection start and end shape
        'data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-full',
        'data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-full',
        'data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:after:bg-blue-600',
        'data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:after:bg-blue-600',
        'data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-white',
        'data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-white',
      ]),
    }}
    className="text-white"
    visibleMonths={1}
    weekdayStyle="short"
    {...props}
  />
));

const DateRangeInput = forwardRef<ElementRef<typeof KitDateRangeInput>, DateRangeInputProps>((props, ref) => (
  <KitDateRangeInput
    ref={ref}
    classNames={{
      root: 'text-sm text-gray-200',
      group: 'flex gap-0.5 items-center border border-gray-400 w-fit px-3 py-2x rounded-md',
      separator: 'mx-2',
      label: 'text-sm text-gray-200 mb-1.5 block',
      segmentWrapper: 'flex gap-0.5 items-center w-fit',
      segment:
        'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
    }}
    {...props}
  />
));

const DateInput = forwardRef<ElementRef<typeof KitDateInput>, DateInputProps>((props, ref) => (
  <KitDateInput
    ref={ref}
    classNames={{
      root: 'text-sm text-gray-200',
      group: 'flex gap-0.5 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
      label: 'text-sm text-gray-200 mb-1.5 block',
      segmentWrapper: 'flex gap-0.5 items-center w-fit',
      segment:
        'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
    }}
    {...props}
  />
));

const TimeInput = forwardRef<ElementRef<typeof KitTimeInput>, TimeInputProps>((props, ref) => (
  <KitTimeInput
    ref={ref}
    classNames={{
      root: 'text-sm',
      group: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
      label: 'text-sm text-gray-200 mb-1.5 block',
      segmentWrapper: 'flex gap-1 items-center w-fit',
      segment:
        'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
    }}
    {...props}
  />
));

export const Primitives = {
  RangeCalendar,
  Calendar,
  DateInput,
  TimeInput,
  DateRangeInput,
};