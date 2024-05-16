import React from 'react';
import { Roboto } from 'next/font/google';

import { Primitives } from './components/primitives';

const fontSans = Roboto({ subsets: ['latin'], weight: ['300', '400', '500'] });

const Page = () => {
  return (
    <div className={fontSans.className}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
        <div className="flex flex-col gap-4">
          <Primitives.DateInput label="Date Input" />
          <Primitives.TimeInput label="Time Input" />
        </div>
      </div>
    </div>
  );
};

export default Page;
