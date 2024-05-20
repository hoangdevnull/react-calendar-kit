import { forwardRef, type ElementRef } from 'react';
import { Calendar, type CalendarProps } from 'react-calendar-kit';

import { cn } from '@/lib/utils';

export const CalendarMain = forwardRef<ElementRef<typeof Calendar>, CalendarProps>((props, ref) => (
  <Calendar
    ref={ref}
    classNames={{
      root: 'bg-gray-950 rounded-lg w-fit',
      gridWrapper: 'flex justify-between',
      gridGroup: 'relative w-full h-full pb-4',
      header: 'relative p-4 flex items-center justify-between gap-2',
      navGroup: 'flex items-center gap-2',
      nav: 'min-w-10 aspect-square h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-800',
      month: cn([
        'flex w-full items-center justify-center',

        // Position for each layout
        'data-[layout=apart]:justify-center',
        'data-[layout=left]:justify-end data-[layout=left]:pr-2',
        'data-[layout=right]:justify-start data-[layout=right]:pl-2',
      ]),
      gridHead: '',
      gridHeadRow: 'text-default-400 flex justify-center px-4 pb-2',
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
        'data-[selected=true]:bg-primary data-[selected=true]:data-[hover=true]:bg-primary data-[hover=true]:bg-gray-800 data-[hover=true]:text-white data-[selected=true]:data-[hover=true]:text-blue-50 data-[selected=true]:text-white data-[selected=true]:shadow-none',

        // Click state
        'data-[pressed=true]:bg-primary scale-100 data-[pressed=true]:scale-90 data-[pressed=true]:text-white',
      ]),
      // Styles for month/year picker
      picker: {
        root: cn([
          '!duration-250 absolute inset-x-0 top-0 z-20 flex w-full justify-center rounded-lg bg-gray-950 transition-opacity',
          // Opened state
          'pointer-events-none opacity-0 data-[expanded=true]:pointer-events-auto data-[expanded=true]:opacity-100',
        ]),

        button: cn([
          'flex items-center justify-between gap-2 rounded-full !bg-gray-900 px-4 py-2 ',
          '!duration-250 group scale-100 shadow-sm outline-none transition-transform data-[pressed=true]:scale-90',
        ]),
        buttonIcon: 'group-data-[expanded=true]:rotate-180 transition-transform duration-250',
        highlight:
          'h-10 border-y border-gray-600 absolute w-[calc(100%_-_16px)] z-0 top-1/2 -translate-y-1/2 pointer-events-none',
        list: cn([
          'scrollbar-hide flex snap-y snap-mandatory flex-col items-center overflow-y-scroll px-4 ',
          '[--scroll-shadow-size:100px] [mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        ]),
        item: cn([
          'text-foreground z-20 flex h-10 min-h-10 w-full snap-center items-center text-base transition-opacity',
          'data-[focus-visible=true]:outline-focus outline-none data-[focus-visible=true]:z-20 data-[pressed=true]:opacity-50 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 ',
        ]),
      },
    }}
    {...props}
  />
));
