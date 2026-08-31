'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, ShieldCheck, UserPlus } from 'lucide-react';
import { signIn, signUp } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Mascot } from '@/components/mascot/Mascot';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }
    setError('');
    setLoading(true);
    const res =
      mode === 'login' ? await signIn(email, password) : await signUp(nickname || email.split('@')[0], email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? '操作失败，请重试');
      return;
    }
    router.push('/account');
  };

  return (
    <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2">
      <div className="hidden lg:block">
        <Badge tone="blue">欢迎来到法治先锋</Badge>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground">
          登录后，和科小獬一起
          <br />
          守护你的网络权益
        </h1>
        <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted">
          登录后可累计积分、记录浏览历史、解锁拓展案例专题。本版使用邮箱密码，无需验证码。
        </p>
        <Mascot mood="default" className="mt-8 h-48 w-48" />
      </div>

      <div className="rounded-lg border border-border bg-surface p-6 shadow-lift sm:p-8">
        <div className="mb-5 lg:hidden">
          <div className="mb-3 flex items-center gap-2">
            <Mascot mood="default" className="h-10 w-10" />
            <span className="font-semibold text-foreground">法治先锋 · 科小獬</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground">{mode === 'login' ? '登录账户' : '注册账户'}</h2>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={
                mode === m
                  ? 'rounded-lg bg-surface py-2 text-sm font-medium text-brand-blue shadow-soft'
                  : 'py-2 text-sm text-muted'
              }
            >
              {m === 'login' ? '登录' : '注册'}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {mode === 'signup' ? (
            <div>
              <label className="mb-1 block text-sm text-foreground-soft">昵称</label>
              <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="你的昵称" />
            </div>
          ) : null}
          <div>
            <label className="mb-1 block text-sm text-foreground-soft">邮箱</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-foreground-soft">密码</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void submit();
              }}
              placeholder="请输入密码"
            />
          </div>
        </div>

        {error ? <p className="mt-3 text-sm font-medium text-brand-danger">{error}</p> : null}

        <Button className="mt-5 w-full" onClick={() => void submit()} loading={loading} icon={mode === 'login' ? LogIn : UserPlus}>
          {mode === 'login' ? '登录' : '注册并登录'}
        </Button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-teal" />
          本版不使用邮箱验证码
        </p>
      </div>
    </div>
  );
}
