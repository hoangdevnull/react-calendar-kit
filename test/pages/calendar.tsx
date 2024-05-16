import React from 'react';
import { Roboto } from 'next/font/google';
import { parseDate } from '@internationalized/date';

import { Primitives } from './components/primitives';

const fontSans = Roboto({ subsets: ['latin'], weight: ['300', '400', '500'] });

const Page = () => {
  return (
    <div className={fontSans.className}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
        <div className="flex flex-col gap-4">
          <Primitives.Calendar
            visibleMonths={1}
            weekdayStyle="short"
            defaultValue={parseDate('2020-02-03')}
            withPicker
          />

          <div className="mt-20">
            <Primitives.RangeCalendar className="text-white" visibleMonths={1} weekdayStyle="short" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
