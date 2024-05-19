'use client';

import React from 'react';
import { Icons } from '@/assets/icons';

import { useCopy } from '@/hooks/useCopy';

const NpmBox = () => {
  const [isCopied, copy] = useCopy();
  return (
    <div className="gradient-border-gradient-nav gradient-border-DEFAULT bg-background relative flex min-h-14 flex-nowrap items-center gap-6 rounded-2xl px-4 lg:gap-24">
      <div className="flex flex-nowrap items-center gap-2 text-xs md:text-base lg:gap-4">
        <span className="text-secondary ">$</span>npm install react-calendar-kit
      </div>
      <button
        onClick={() => copy('npm install react-calendar-kit')}
        className="gradient-border-gradient-nav  gradient-border-DEFAULT bg-background flex h-8 w-8 items-center justify-center rounded-md"
      >
        {isCopied ? <Icons.check /> : <Icons.copy />}
      </button>
    </div>
  );
};

export default NpmBox;
