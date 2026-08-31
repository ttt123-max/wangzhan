import { QuizRunner } from '@/components/quiz/QuizRunner';

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14213d]">答题中心</h1>
      <p className="mt-2 text-slate-500">完成网信普法小问答，答对得分，积分可解锁拓展案例专题。</p>
      <div className="mt-6">
        <QuizRunner />
      </div>
    </div>
  );
}
