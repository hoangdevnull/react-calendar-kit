import React from 'react';

import { BackgroundBeams } from '@/components/background-beams';
import { subtitle } from '@/components/primitives';
import { VStack } from '@/components/v-stack';

const LandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <BackgroundBeams className="z-[-1]" />
      <VStack spacing={24} align="center">
        <h1 className="bg-gradient-text bg-clip-text font-mono text-3xl uppercase text-transparent md:text-4xl lg:text-6xl">
          React Calendar KIT
        </h1>
        <div className={subtitle()}>Accessible and Customizable Calendar Components</div>
      </VStack>
    </main>
  );
};

export default LandingPage;
