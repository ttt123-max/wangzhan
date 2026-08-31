'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export function QuestionForm({ onSubmit }: { onSubmit: (q: string) => void }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const q = value.trim();
    if (!q || loading) return;
    setLoading(true);
    await onSubmit(q);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void submit();
        }}
        placeholder="输入你关心的网络法律问题，例如：密码怎么设置更安全？"
        className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
      />
      <Button onClick={() => void submit()} icon={Send} disabled={loading || !value.trim()}>
        {loading ? <Spinner className="h-4 w-4 border-white" /> : '问科小獬'}
      </Button>
    </div>
  );
}
