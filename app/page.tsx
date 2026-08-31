import { Hero } from '@/components/home/Hero';
import { ValueProps } from '@/components/home/ValueProps';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TopicShowcase } from '@/components/home/TopicShowcase';
import { Cta } from '@/components/home/Cta';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <TopicShowcase />
      <Cta />
    </>
  );
}
