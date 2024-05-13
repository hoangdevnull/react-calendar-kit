import React from 'react';
import { Calendar, DateInput, TimeInput } from 'calendar-kit';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="flex flex-col gap-4">
        <DateInput
          classNames={{
            root: 'text-sm',
            label: 'text-sm text-gray-200 mb-1.5 block',
            wrapper: 'flex gap-1 items-center border border-gray-600 w-fit px-3 py-2 rounded-md',
            segment:
              'data-[placeholder=true]:text-gray-600 outline-none px-0.5 rounded-sm focus:bg-gray-400 focus:text-white text-white data-[type=literal]:text-gray-600',
          }}
          label="Date Input"
        />

        <TimeInput
          classNames={{
            root: 'text-sm',
            label: 'text-sm text-gray-200 mb-1.5 block',
            wrapper: 'flex gap-1 items-center border border-gray-600 w-fit px-3 py-2 rounded-md',
            segment:
              'data-[placeholder=true]:text-gray-600 outline-none px-0.5 rounded-sm focus:bg-gray-400 focus:text-white text-white data-[type=literal]:text-gray-600',
          }}
          label="Date Input"
        />

        <Calendar className="text-white" visibleMonths={2} />
      </div>
    </div>
  );
};

export default Page;
