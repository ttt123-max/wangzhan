import { QuizRunner } from '@/components/quiz/QuizRunner';

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">答题中心</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">用几道题，检验你的网络法律常识</h1>
        <p className="mt-3 text-pretty text-sm text-muted">答对得分，积分可解锁拓展案例专题。每道题只计一次分，防重复刷分。</p>
      </div>
      <QuizRunner />
    </div>
  );
}
