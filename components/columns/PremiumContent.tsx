'use client';

import { useEffect, useState } from 'react';
import { LockKeyhole, Sparkles } from 'lucide-react';
import type { Article, Faq, Topic, UserProfile } from '@/lib/types';
import { createStateStore } from '@/lib/state';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArticleBody } from './ArticleBody';
import { FaqList } from './FaqList';

export function PremiumContent({
  topic,
  article,
  faqs
}: {
  topic: Topic;
  article: Article;
  faqs: Faq[];
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    createStateStore()
      .getUnlockedTopicIds()
      .then((ids) => setUnlocked(ids.includes(topic.id)))
      .catch(() => setUnlocked(false));
    createStateStore()
      .loadProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [topic.id]);

  if (unlocked) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <ArticleBody article={article} />
        <aside>
          <h2 className="mb-3 font-semibold text-[#14213d]">常见问题</h2>
          <FaqList faqs={faqs} />
        </aside>
      </div>
    );
  }

  const onUnlock = async () => {
    const store = createStateStore();
    const result = await store.unlockTopic(topic.id, topic.premiumPoints);
    if (result === 'unlocked') {
      setUnlocked(true);
      setMessage('');
      setProfile(await store.loadProfile());
    } else if (result === 'insufficient') {
      setMessage('积分不足，继续在答题中心赚积分吧。');
    } else if (result === 'already') {
      setUnlocked(true);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
      <LockKeyhole className="mx-auto h-10 w-10 text-brand-gold" />
      <h2 className="mt-3 text-lg font-bold text-[#14213d]">拓展案例专题</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        「{topic.title}」是拓展案例专题，需要 {topic.premiumPoints} 积分解锁。
        {profile ? ` 当前积分：${profile.points}` : ' 请先登录后再解锁。'}
      </p>
      {message ? (
        <p className="mt-3 text-sm font-medium text-amber-600">{message}</p>
      ) : null}
      <div className="mt-5 flex justify-center gap-3">
        <Button onClick={onUnlock} icon={Sparkles} disabled={!profile}>
          解锁专题
        </Button>
        {!profile ? (
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-blue/30 px-3 py-2 text-sm text-brand-blue"
          >
            去登录
          </a>
        ) : null}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        <Badge tone="gold">后续拓展入口</Badge>
      </p>
    </div>
  );
}
