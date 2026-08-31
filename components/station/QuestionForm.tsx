'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function QuestionForm({
  onSubmit,
  loading,
  placeholder
}: {
  onSubmit: (q: string) => void;
  loading?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');

  const submit = () => {
    const q = value.trim();
    if (!q || loading) return;
    onSubmit(q);
    setValue('');
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
        placeholder={placeholder ?? '输入你关心的网络法律问题，例如：密码怎么设置更安全？'}
        className="h-12 flex-1"
      />
      <Button onClick={submit} icon={Send} loading={loading} disabled={!value.trim()}>
        问科小獬
      </Button>
    </div>
  );
}
