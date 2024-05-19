import React from 'react';
import Image from 'next/image';
import { Icons } from '@/assets/icons';

import { Button } from '@/components/ui/button';
import { HStack } from '@/components/h-stack';
import { container, subtitle } from '@/components/primitives';
import { VStack } from '@/components/v-stack';

import { FeatureCard } from './components/FeatureCard';
import NpmBox from './components/NpmBox';

const FEATURES = [
  {
    head: 'Accessibility First',
    content:
      'Built with @react-aria, ensuring your components are accessible to all users, including those with disabilities.',
  },
  {
    head: 'Highly Customizable',
    content: 'Tailor the appearance of your calendar and date/time picker components to your exact specifications.',
  },
  {
    head: 'Easy Integration',
    content: 'Seamlessly integrate the components into your existing React projects.',
  },
  {
    head: 'Comprehends DOCS',
    content: 'Well-documented with clear examples to help you get started quickly.',
  },
] as const;

const HomePage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <Image
        alt="lighting"
        src="/images/lighting.svg"
        width={1440}
        height={270}
        className="inset-x-center pointer-events-none top-0"
      />
      <Image
        alt="lighting"
        src="/images/background_pattern.webp"
        width={1920}
        height={1080}
        className="inset-x-center pointer-events-none top-0 max-h-screen"
      />

      <div className={container({ size: 'sm' })}>
        {/* <BackgroundBeams className="z-[-1]" /> */}
        <VStack spacing={24} align="center">
          <h1 className="bg-gradient-text bg-clip-text pt-12 text-center font-mono text-2xl uppercase text-transparent sm:text-3xl md:text-4xl lg:text-6xl">
            React Calendar KIT
          </h1>
          <div className={subtitle({ className: 'text-center' })}>Accessible and Customizable Calendar Components</div>

          <HStack noWrap={{ initial: false, sm: true }}>
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

      <div className={container({ size: '2xl', className: 'mt-14' })}>
        <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard {...feature} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;