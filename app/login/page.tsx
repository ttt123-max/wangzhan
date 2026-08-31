'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { signIn, signUp } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
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
    router.push('/topics');
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12">
      <div className="mb-6 text-center">
        <Mascot mood="default" className="mx-auto h-20 w-20" />
        <h1 className="mt-2 text-xl font-bold text-[#14213d]">
          {mode === 'login' ? '登录法治先锋' : '注册账号'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">登录后可累计积分、记录浏览历史并解锁拓展专题。</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={
              mode === 'login'
                ? 'rounded-md bg-white py-2 text-sm font-medium text-brand-blue shadow-sm'
                : 'py-2 text-sm text-slate-500'
            }
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={
              mode === 'signup'
                ? 'rounded-md bg-white py-2 text-sm font-medium text-brand-blue shadow-sm'
                : 'py-2 text-sm text-slate-500'
            }
          >
            注册
          </button>
        </div>

        {mode === 'signup' ? (
          <label className="mb-3 block">
            <span className="mb-1 block text-sm text-slate-600">昵称</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="你的昵称"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </label>
        ) : null}

        <label className="mb-3 block">
          <span className="mb-1 block text-sm text-slate-600">邮箱</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm text-slate-600">密码</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void submit();
            }}
            placeholder="请输入密码"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
          />
        </label>

        {error ? <p className="mb-3 text-sm font-medium text-red-600">{error}</p> : null}

        <Button className="w-full" onClick={() => void submit()} disabled={loading} icon={mode === 'login' ? LogIn : UserPlus}>
          {loading ? '处理中…' : mode === 'login' ? '登录' : '注册并登录'}
        </Button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-slate-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        本版不使用邮箱验证码。
      </p>
    </div>
  );
}
