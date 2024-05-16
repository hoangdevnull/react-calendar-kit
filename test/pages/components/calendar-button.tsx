import React, { type ComponentPropsWithoutRef } from 'react';

const CalendarButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button className="ml-4 flex items-center justify-center text-white" {...props}>
      <svg width={20} height={20} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16.5 18.401c0-2.901 4-2.401 4-.401 0 2.5-4 2.434-4 5h4m-9-6.5H13V23"
        />
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h22m-6-4V4M11 8V4"
        />
      </svg>
    </button>
  );
};

export default CalendarButton;
