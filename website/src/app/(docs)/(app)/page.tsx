import React from 'react';
import { Icons } from '@/assets/icons';

import { Button } from '@/components/ui/button';
import BackgroundBeams from '@/components/background-beams';
import { HStack } from '@/components/h-stack';
import { container, subtitle } from '@/components/primitives';
import { VStack } from '@/components/v-stack';

import NpmBox from './components/NpmBox';

const LandingPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <div className={container({ size: 'sm' })}>
        <BackgroundBeams className="z-[-1]" />
        <VStack spacing={24} align="center">
          <h1 className="bg-gradient-text bg-clip-text font-mono text-3xl uppercase text-transparent md:text-4xl lg:text-6xl">
            React Calendar KIT
          </h1>
          <div className={subtitle()}>Accessible and Customizable Calendar Components</div>

          <HStack>
            <Button>Documents</Button>
            <Button variant="secondary">
              <Icons.github />
              Github
            </Button>
          </HStack>

          <NpmBox />

          <div className="text-center text-sm">
            React Calendar Kit is a powerful and flexible library for building accessible and highly customizable
            calendar and date/time picker components in your React applications. Built on top of the robust
            accessibility features of the @react-aria library, React Calendar Kit provides a solid foundation for
            creating inclusive user experiences.
          </div>
        </VStack>
      </div>
    </section>
  );
};

export default LandingPage;
