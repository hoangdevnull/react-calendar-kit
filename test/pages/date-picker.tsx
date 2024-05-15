import React, { useRef } from 'react';
import { Roboto } from 'next/font/google';
import { parseDate } from '@internationalized/date';
import { Calendar, DateInput, useDatePicker } from 'calendar-kit';

import { cn } from '../utils';

const fontSans = Roboto({ subsets: ['latin'], weight: ['300', '400', '500'] });

const DatePicker = () => {
  const ref = useRef(null);
  const { state, getCalendarProps, getDateInputProps, getDialogProps, getTriggerProps } = useDatePicker({}, ref);
  console.log(getDialogProps, state);
  return (
    <div className={fontSans.className}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
        <div className="flex flex-col gap-4">
          <DateInput
            {...getDateInputProps}
            classNames={{
              root: 'text-sm ',
              group: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
              label: 'text-sm text-gray-200 mb-1.5 block',
              segmentWrapper: 'flex gap-1 items-center w-fit',
              segment:
                'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
            }}
            label="Date Input"
            endContent={<button {...getTriggerProps}>OPEN</button>}
          />

          {state.isOpen ? (
            <div>
              <Calendar
                {...getCalendarProps}
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
                    'w-10 h-10 flex items-center text-sm text-white justify-center rounded-full box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none shadow-none origin-center transition-[transform,background-color,color] duration-100',

                    // Disabled state
                    'data-[disabled=true]:text-gray-500 data-[disabled=true]:cursor-default data-[readonly=true]:cursor-default data-[disabled=true]:transition-none data-[unavailable=true]:text-gray-500 data-[unavailable=true]:cursor-default data-[unavailable=true]:line-through',

                    // Focus state
                    'data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2',

                    // Selected
                    'data-[selected=true]:shadow-none data-[selected=true]:bg-blue-600 data-[selected=true]:text-white data-[hover=true]:bg-gray-800 data-[hover=true]:text-white data-[selected=true]:data-[hover=true]:bg-blue-600 data-[selected=true]:data-[hover=true]:text-blue-50',

                    // Click state
                    'data-[pressed=true]:scale-90 scale-100 data-[pressed=true]:bg-blue-600 data-[pressed=true]:text-white',
                  ]),

                  picker: {
                    root: cn([
                      'absolute inset-x-0 top-0 flex w-full justify-center z-20 transition-opacity !duration-250 bg-gray-950 rounded-lg',
                      // Opened state
                      'data-[expanded=true]:pointer-events-auto data-[expanded=true]:opacity-100 opacity-0 pointer-events-none',
                    ]),

                    button:
                      'flex justify-between items-center gap-2 px-4 py-2 bg-gray-900 rounded-full shadow-sm outline-none data-[pressed=true]:scale-90 scale-100 transition-transform !duration-250 group',
                    buttonIcon: 'group-data-[expanded=true]:rotate-180 transition-transform duration-250',
                    highlight:
                      'h-10 border-y border-gray-600 absolute w-[calc(100%_-_16px)] z-0 top-1/2 -translate-y-1/2 pointer-events-none',
                    list: cn(
                      'flex flex-col items-center px-4 overflow-y-scroll scrollbar-hide snap-y snap-mandatory [--scroll-shadow-size:100px] [mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]'
                    ),
                    item: 'w-full flex text-foreground items-center h-10 min-h-10 snap-center text-base z-20 data-[pressed=true]:opacity-50 outline-none data-[focus-visible=true]:z-20 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-opacity',
                  },
                }}
                className="text-white"
                visibleMonths={1}
                weekdayStyle="short"
                defaultValue={parseDate('2020-02-03')}
                withPicker
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
