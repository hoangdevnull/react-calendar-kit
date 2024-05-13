import React from 'react';
import { Roboto } from 'next/font/google';
import { Calendar, DateInput, TimeInput } from 'calendar-kit';

import { cn } from '../utils';

const fontSans = Roboto({ subsets: ['latin'], weight: ['300', '400', '500'] });

const Page = () => {
  return (
    <div className={fontSans.className}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
        <div className="flex flex-col gap-4">
          <DateInput
            classNames={{
              root: 'text-sm',
              label: 'text-sm text-gray-200 mb-1.5 block',
              wrapper: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
              segment:
                'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
            }}
            label="Date Input"
          />

          <TimeInput
            classNames={{
              root: 'text-sm',
              label: 'text-sm text-gray-200 mb-1.5 block',
              wrapper: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
              segment:
                'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-400 focus:text-white text-white data-[type=literal]:text-gray-500',
            }}
            label="Date Input"
          />

          <Calendar
            classNames={{
              root: 'bg-gray-950 py-4 rounded-lg',
              gridWrapper: 'flex justify-between',
              header: 'relative px-4 mb-4 flex items-center justify-between gap-2  [&_.chevron-icon]:flex-none',
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
                'w-10 h-10 flex items-center text-sm text-white justify-center rounded-full box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none shadow-none origin-center transition-[transform,background-color,color] duration-100',
                // Disabled state
                'data-[disabled=true]:text-gray-500 data-[disabled=true]:cursor-default data-[readonly=true]:cursor-default data-[disabled=true]:transition-none data-[unavailable=true]:text-gray-500 data-[unavailable=true]:cursor-default data-[unavailable=true]:line-through',
                // Focus state
                'data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2',
                // Selected
                'data-[selected=true]:shadow-none data-[selected=true]:bg-purple-600 data-[selected=true]:text-primary-foreground data-[hover=true]:bg-gray-800 data-[hover=true]:text-white data-[selected=true]:data-[hover=true]:bg-purple-600 data-[selected=true]:data-[hover=true]:text-purple-50',
                // Click state
                'active:scale-90 scale-100 active:bg-purple-600 active:text-white',
              ]),
            }}
            className="text-white"
            visibleMonths={1}
            weekdayStyle="short"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
