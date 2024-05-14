import React from 'react';
import { Roboto } from 'next/font/google';
import { parseDate } from '@internationalized/date';
import { Calendar, DateInput, RangeCalendar, TimeInput } from 'calendar-kit';

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
              container: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
              segmentWrapper: 'flex gap-1 items-center w-fit',
              segment:
                'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-800 focus:text-white text-white data-[type=literal]:text-gray-500',
            }}
            label="Date Input"
          />
          <TimeInput
            classNames={{
              root: 'text-sm',
              label: 'text-sm text-gray-200 mb-1.5 block',
              container: 'flex gap-1 items-center border border-gray-400 w-fit px-3 py-2 rounded-md',
              segmentWrapper: 'flex gap-1 items-center w-fit',
              segment:
                'data-[placeholder=true]:text-gray-500 outline-none px-0.5 rounded-sm focus:bg-gray-400 focus:text-white text-white data-[type=literal]:text-gray-500',
            }}
            label="Time Input"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
