import { Hero } from '@/components/home/Hero';
import { TopicShowcase } from '@/components/home/TopicShowcase';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Hero />
      <TopicShowcase />
    </div>
  );
}
