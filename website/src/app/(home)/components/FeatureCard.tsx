import { cn } from '@/lib/utils';
import { HStack } from '@/components/h-stack';
import { paragraph } from '@/components/primitives';

interface Props {
  head: string;
  content: string;
}
export const FeatureCard = ({ head, content }: Props) => {
  return (
    <div className={cn(['bg-gradient-featured flex min-h-[135px] flex-col rounded-lg p-1'])}>
      <HStack noWrap className="w-full p-2" pos="apart">
        <div className={paragraph({ className: 'font-mono', color: 'default' })}>{head}</div>
        <svg width="39" height="11" viewBox="0 0 39 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5.5" cy="5.5" r="5" fill="#EC6A5E" />
          <circle cx="5.5" cy="5.5" r="4.6875" stroke="white" strokeOpacity="0.1" strokeWidth="0.625" />
          <circle cx="19.5" cy="5.5" r="5" fill="#F4BF4F" />
          <circle cx="19.5" cy="5.5" r="4.6875" stroke="white" strokeOpacity="0.1" strokeWidth="0.625" />
          <circle cx="33.5" cy="5.5" r="5" fill="#61C654" />
          <circle cx="33.5" cy="5.5" r="4.6875" stroke="white" strokeOpacity="0.1" strokeWidth="0.625" />
        </svg>
      </HStack>

      <div className={cn('shadow-featured-card flex-1 rounded-md bg-black/50 p-2')}>
        <span className={paragraph({ size: 'sm' })}>{content}</span>
      </div>
    </div>
  );
};
