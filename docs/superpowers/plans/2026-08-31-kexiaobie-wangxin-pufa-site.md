# 科小獬网信普法网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付一个可本地运行、可部署到 Vercel 的网信普法网站，包含首页、IP 介绍、普法专栏、线上普法驿站、答题积分、积分解锁、浏览历史与邮箱密码登录。

**Architecture:** Next.js App Router + TypeScript + Tailwind。公开内容（专题/文章/问答/题目）为版本化的 TypeScript 数据模块，保证准确可控、可离线运行；用户数据（资料/积分/答题记录/浏览历史/解锁记录/提问日志）通过可插拔状态适配器实现，本地用 localStorage 演示、生产用 Supabase + RLS。纯逻辑（积分、提问匹配）独立成函数并做单元测试。

**Tech Stack:** Next.js (App Router), React 18+, TypeScript, Tailwind CSS 3, lucide-react, @supabase/supabase-js, @supabase/ssr, Vitest。

**Spec:** `docs/superpowers/specs/2026-08-31-kexiaobie-wangxin-pufa-site-design.md`

## Global Constraints

- 中文面向大众普法，文案准确、可回溯，重要结论附法律依据；不得出现虚构法律条款。
- IP 统一使用 Q 版萌系科技感法兽"科小獬"，主色科技蓝，点缀正义金/青绿；禁止使用渐变紫/米色/深蓝单色等站内同质化配色。
- 操作按钮用 lucide 图标；卡片圆角 `<= 8px`；页面区块为通栏或非卡片布局，卡片仅用于重复条目、弹窗、工具容器。
- 文字不得溢出/遮挡，固定控件（按钮/标签/计数）尺寸稳定；移动端可用。
- 解锁是"一次性消费"：积分 >= 所需时写入解锁记录并扣减对应积分；不足时不扣分、弹提示、不产生负积分。
- 每道题只计一次分，按答题记录防重复刷分。
- 第一版不做：真实支付、邮件推送、复杂后台、深度 SEO、短视频、投稿上传、多角色权限、真实大模型。
- 使用精确路径与接口名，不得出现 TODO/TBD/占位实现；每个任务以独立可测的交付物收尾并提交 git。

## File Structure

```text
app/
  layout.tsx                根布局：字体、全局导航、页脚、状态 provider
  page.tsx                  首页
  globals.css               Tailwind 指令 + 全局变量
  login/page.tsx            登录/注册（邮箱+密码，无验证码）
  ip/page.tsx               IP 科小獬介绍页
  columns/page.tsx          普法专栏列表（筛选）
  columns/[slug]/page.tsx   专题详情
  station/page.tsx          线上普法驿站（提问→解读）
  quiz/page.tsx             答题中心
  topics/page.tsx           专题库（含积分解锁）
  history/page.tsx          浏览历史
  api/matching/route.ts     提问→解读匹配接口
  api/state/route.ts        用户状态写接口（积分/解锁/历史/日志）
components/
  mascot/Mascot.tsx
  layout/SiteHeader.tsx  SiteFooter.tsx
  ui/Button.tsx  Card.tsx  Badge.tsx  Chip.tsx  Modal.tsx  Spinner.tsx
  home/Hero.tsx  TopicShowcase.tsx
  columns/FilterBar.tsx  TopicCard.tsx
  station/QuestionForm.tsx  InterpretationCard.tsx
  quiz/ScorePanel.tsx  QuizRunner.tsx  QuizOption.tsx
  topics/UnlockModal.tsx  PremiumBadge.tsx
lib/
  types.ts                  共享类型
  content/topics.ts articles.ts faqs.ts quizzes.ts index.ts
  logic/points.ts matching.ts
  state/types.ts localStore.ts supabaseStore.ts index.ts
  supabase/client.ts server.ts
  utils.ts
supabase/
  migrations/20260831000000_seed.sql
  migrations/20260831000001_rls.sql
tests/
  points.test.ts matching.test.ts localStore.test.ts content.test.ts
README.md  .env.example  vercel.json  next.config.mjs  package.json  tsconfig.json  tailwind.config.ts  postcss.config.mjs
```

---

## Task 0: 脚手架与工程配置

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `lib/utils.ts`, `.env.example`, `vercel.json`, `README.md`, `vitest.config.ts`, `tests/smoke.test.ts`

**Interfaces:**
- Produces: Next.js App Router 项目骨架；`lib/utils.ts` 导出 `cn(...classes: (string | false | null | undefined)[]): string`。

**依赖（package.json）：**
`next@^15`, `react@^18.3`, `react-dom@^18.3`, `typescript`, `tailwindcss@^3.4`, `postcss`, `autoprefixer`, `lucide-react`, `@supabase/supabase-js`, `@supabase/ssr`, `vitest`, `@vitejs/plugin-react`。
脚本：`"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, `"test": "vitest run"`, `"lint": "next lint"`。

`app/globals.css` 关键内容：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { --brand-blue: #1E5EFF; --brand-gold: #F5B60D; --brand-teal: #12B5A5; }
```

`lib/utils.ts`：
```ts
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

`tsconfig.json` 必须配置模块别名（文中各任务使用 `@/` 前缀）：
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
```

`tests/smoke.test.ts`：
```ts
import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';
describe('cn', () => {
  it('joins truthy classes', () => {
    expect(cn('a', false, 'b', null, 'c')).toBe('a b c');
  });
});
```

- [ ] **Step 1: 创建配置与脚手架文件（如上）。**
- [ ] **Step 2: 运行 `npm install` 安装依赖。**
- [ ] **Step 3: 运行 `npm run test`，预期 smoke 测试通过。**
- [ ] **Step 4: 运行 `npm run build`，预期构建成功。**
- [ ] **Step 5: Commit：`chore: scaffold next app`。**

---

## Task 1: 共享类型

**Files:**
- Create: `lib/types.ts`

**Interfaces:**
- Produces:
  - `type TopicCategory`
  - `type CaseType`
  - `interface Topic`
  - `interface Article`
  - `interface Faq`
  - `interface Quiz`
  - `interface UserProfile`
  - `interface BrowsingRecord`

```ts
export type TopicCategory =
  | '网络安全' | '数据安全' | '个人信息保护' | '未成年人保护'
  | '信息内容治理' | '网络反诈' | '网络侵权' | '综合';
export type CaseType = '科普' | '案例' | '答疑' | '互动';

export interface Topic {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: TopicCategory;
  caseType: CaseType;
  isPremium: boolean;
  premiumPoints: number;
  accent: 'blue' | 'gold' | 'teal';
  order: number;
}

export interface Article {
  id: number;
  topicId: number;
  title: string;
  content: string;
}

export interface Faq {
  id: number;
  topicId: number;
  question: string;
  answer: string;
  keywords: string[];
}

export interface Quiz {
  id: number;
  topicId: number;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}

export interface UserProfile {
  id: string;
  nickname: string;
  points: number;
}

export interface BrowsingRecord {
  id: string;
  entityType: 'article' | 'faq';
  entityId: number;
  viewedAt: string;
}
```

- [ ] **Step 1: 创建 `lib/types.ts` 并写入以上类型。**
- [ ] **Step 2: 运行 `npm run build` 确认类型可通过。**
- [ ] **Step 3: Commit：`feat: add shared types`。**

---

## Task 2: 内容种子数据

**Files:**
- Create: `lib/content/topics.ts`, `lib/content/articles.ts`, `lib/content/faqs.ts`, `lib/content/quizzes.ts`, `lib/content/index.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Consumes: `lib/types.ts` 的 `Topic/Article/Faq/Quiz`。
- Produces:
  - `topics: Topic[]`
  - `articles: Article[]`
  - `faqs: Faq[]`
  - `quizzes: Quiz[]`
  - `bySlug(slug: string): Topic | undefined`
  - `articlesFor(topicId: number): Article[]`
  - `faqsFor(topicId: number): Faq[]`
  - `quizzesFor(topicId: number): Quiz[]`

**内容范围（8 个专题，全部真实可查证，结论附法律依据）：**

1. `network-security` 网络安全基础（科普，免费）
2. `personal-info` 个人信息保护（科普+案例，免费）
3. `data-security` 数据安全（科普，免费）
4. `minor-protection` 未成年人网络保护（案例，免费，必含《未成年人网络保护条例》）
5. `rumor-governance` 网络谣言与信息内容治理（案例，免费）
6. `anti-fraud` 网络反诈（案例，免费）
7. `rights-protection` 网络侵权与维权（答疑，拓展，`premiumPoints: 30`）
8. `ecology-governance` 清朗生态治理（科普，拓展，`premiumPoints: 40`）

`lib/content/topics.ts` 片段：
```ts
import type { Topic } from '../types';
export const topics: Topic[] = [
  { id: 1, slug: 'network-security', title: '网络安全基础', summary: '了解账号、密码、隐私入口，筑牢网络安全的第一道防线。', category: '网络安全', caseType: '科普', isPremium: false, premiumPoints: 0, accent: 'blue', order: 1 },
  { id: 7, slug: 'rights-protection', title: '网络侵权与维权', summary: '被网暴、被冒用、被泄露？掌握证据与维权路径。', category: '网络侵权', caseType: '答疑', isPremium: true, premiumPoints: 30, accent: 'gold', order: 7 },
  // 其余 6 个按上述范围补全，id 2-6、8，order 2-6、8
];
```

每个专题的 `articles`、`faqs`、`quizzes` 均需完整：每专题至少 1 篇长文（≥500 字，含法律依据）、3–5 个 `faqs`（每项含 3–5 个关键词）、至少 2 道 `quizzes`（每题 `points` 为 10）。内容不得为占位文本。

`lib/content/index.ts`：
```ts
import { topics } from './topics';
import { articles } from './articles';
import { faqs } from './faqs';
import { quizzes } from './quizzes';
export const bySlug = (slug: string) => topics.find(t => t.slug === slug);
export const articlesFor = (topicId: number) => articles.filter(a => a.topicId === topicId);
export const faqsFor = (topicId: number) => faqs.filter(f => f.topicId === topicId);
export const quizzesFor = (topicId: number) => quizzes.filter(q => q.topicId === topicId);
export { topics, articles, faqs, quizzes };
```

`tests/content.test.ts`：
```ts
import { describe, it, expect } from 'vitest';
import { topics, articles, faqs, quizzes } from '../lib/content';
describe('content', () => {
  it('has 8 topics with required metadata', () => {
    expect(topics.length).toBe(8);
    expect(topics.every(t => t.slug && t.title && t.summary)).toBe(true);
    expect(topics.some(t => t.isPremium)).toBe(true);
  });
  it('every topic has content, faqs, quizzes', () => {
    for (const t of topics) {
      expect(articles.filter(a => a.topicId === t.id).length).toBeGreaterThan(0);
      expect(faqs.filter(f => f.topicId === t.id).length).toBeGreaterThanOrEqual(3);
      expect(quizzes.filter(q => q.topicId === t.id).length).toBeGreaterThanOrEqual(2);
    }
  });
});
```

- [ ] **Step 1: 先写 `tests/content.test.ts`，运行确认失败（内容缺失）。**
- [ ] **Step 2: 写 `lib/content/*` 的 8 个专题完整内容。**
- [ ] **Step 3: 运行 `npm run test`，预期通过。**
- [ ] **Step 4: Commit：`feat: add curated content seed`。**

---

## Task 3: 积分纯逻辑

**Files:**
- Create: `lib/logic/points.ts`
- Test: `tests/points.test.ts`

**Interfaces:**
- Consumes: `Quiz` 类型。
- Produces:
  - `INITIAL_POINTS: number`（=0）
  - `pointsForQuiz(quiz: Quiz, correct: boolean): number`
  - `canUnlock(points: number, required: number): boolean`
  - `applyUnlock(points: number, required: number): number | null`

```ts
import type { Quiz } from '../types';
export const INITIAL_POINTS = 0;
export function pointsForQuiz(quiz: Quiz, correct: boolean): number {
  return correct ? Math.max(1, quiz.points) : 0;
}
export function canUnlock(points: number, required: number): boolean {
  return points >= required;
}
export function applyUnlock(points: number, required: number): number | null {
  if (points < required) return null;
  return points - required;
}
```

`tests/points.test.ts`：
```ts
import { describe, it, expect } from 'vitest';
import { INITIAL_POINTS, pointsForQuiz, canUnlock, applyUnlock } from '../lib/logic/points';
import type { Quiz } from '../lib/types';
const quiz: Quiz = { id: 1, topicId: 1, question: 'q', options: ['a','b'], correctIndex: 0, points: 10 };
describe('points', () => {
  it('starts at 0', () => expect(INITIAL_POINTS).toBe(0));
  it('awards points only when correct', () => {
    expect(pointsForQuiz(quiz, true)).toBe(10);
    expect(pointsForQuiz(quiz, false)).toBe(0);
  });
  it('canUnlock requires enough points', () => {
    expect(canUnlock(30, 30)).toBe(true);
    expect(canUnlock(29, 30)).toBe(false);
  });
  it('applyUnlock deducts only when enough', () => {
    expect(applyUnlock(30, 30)).toBe(0);
    expect(applyUnlock(29, 30)).toBeNull();
  });
});
```

- [ ] **Step 1: 写 `tests/points.test.ts`，运行确认失败。**
- [ ] **Step 2: 实现 `lib/logic/points.ts`。**
- [ ] **Step 3: 运行 `npm run test`，预期通过。**
- [ ] **Step 4: Commit：`feat: add points logic`。**

---

## Task 4: 提问匹配纯逻辑

**Files:**
- Create: `lib/logic/matching.ts`
- Test: `tests/matching.test.ts`

**Interfaces:**
- Consumes: `Faq`, `Topic` 类型。
- Produces:
  - `normalizeQuery(input: string): string`
  - `matchQuery(input: string, faqs: Faq[], topics: Topic[]): MatchResult | null`
  - `interface MatchResult { faq: Faq; topic?: Topic; score: number }`

```ts
import type { Faq, Topic } from '../types';
export interface MatchResult { faq: Faq; topic?: Topic; score: number; }
export function normalizeQuery(input: string): string {
  return input.trim().replace(/[\s，。！？、,.!?;；:：'""]+/g, '').toLowerCase();
}
export function matchQuery(input: string, faqs: Faq[], topics: Topic[]): MatchResult | null {
  const q = normalizeQuery(input);
  if (!q) return null;
  let best: MatchResult | null = null;
  for (const faq of faqs) {
    let score = 0;
    for (const k of faq.keywords) {
      if (k.length > 0 && q.includes(k)) score += k.length;
    }
    if (score > 0 && (best === null || score > best.score)) {
      best = { faq, topic: topics.find(t => t.id === faq.topicId), score };
    }
  }
  return best;
}
```

`tests/matching.test.ts`：
```ts
import { describe, it, expect } from 'vitest';
import { normalizeQuery, matchQuery } from '../lib/logic/matching';
import type { Faq, Topic } from '../lib/types';
const topics: Topic[] = [{ id: 1, slug: 'network-security', title: '网络安全基础', summary: '', category: '网络安全', caseType: '科普', isPremium: false, premiumPoints: 0, accent: 'blue', order: 1 }];
const faqs: Faq[] = [{ id: 1, topicId: 1, question: '如何设置安全密码？', answer: '使用长且唯一的密码。', keywords: ['密码', '安全'] }];
describe('matching', () => {
  it('normalizes punctuation', () => expect(normalizeQuery(' 密码，安全！')).toBe('密码安全'));
  it('finds matching faq', () => {
    const r = matchQuery('密码怎么设置', faqs, topics);
    expect(r).not.toBeNull();
    expect(r!.faq.id).toBe(1);
    expect(r!.topic?.slug).toBe('network-security');
  });
  it('returns null on no match', () => expect(matchQuery('完全无关内容xyz', faqs, topics)).toBeNull());
});
```

- [ ] **Step 1: 写 `tests/matching.test.ts`，运行确认失败。**
- [ ] **Step 2: 实现 `lib/logic/matching.ts`。**
- [ ] **Step 3: 运行 `npm run test`，预期通过。**
- [ ] **Step 4: Commit：`feat: add query matching logic`。**

---

## Task 5: 状态适配器接口与本地实现

**Files:**
- Create: `lib/state/types.ts`, `lib/state/localStore.ts`, `lib/state/index.ts`
- Test: `tests/localStore.test.ts`

**Interfaces:**
- Consumes: `UserProfile`, `BrowsingRecord` 类型。
- Produces:
  - `interface UserStateAdapter`
  - `createLocalStateStore(): UserStateAdapter`
  - 适配器方法：`loadProfile`, `recordQuiz`, `getAttemptedQuizIds`, `unlockTopic`, `getUnlockedTopicIds`, `addHistory`, `getHistory`, `logQuestion`

```ts
// lib/state/types.ts
import type { UserProfile, BrowsingRecord } from '../types';
export interface UserStateAdapter {
  loadProfile(): Promise<UserProfile | null>;
  recordQuiz(quizId: number, correct: boolean, pointsEarned: number): Promise<boolean>;
  getAttemptedQuizIds(): Promise<number[]>;
  unlockTopic(topicId: number, cost: number): Promise<'unlocked' | 'insufficient' | 'already'>;
  getUnlockedTopicIds(): Promise<number[]>;
  addHistory(entityType: 'article' | 'faq', entityId: number): Promise<void>;
  getHistory(): Promise<BrowsingRecord[]>;
  logQuestion(question: string, matchedTopicId: number | null): Promise<void>;
}
```

`lib/state/localStore.ts` 用 localStorage 封装以上接口，`points` 从 `profiles` 读取并更新，`recordQuiz` 对已答题目返回 `false`（不计分），`unlockTopic` 按 `applyUnlock` 逻辑只有足够才扣分。

`tests/localStore.test.ts`（用内存对象模拟 `window.localStorage`）：
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createLocalStateStore } from '../lib/state/localStore';
class MemStorage { private m = new Map<string,string>(); getItem(k: string){ return this.m.get(k) ?? null; } setItem(k:string,v:string){ this.m.set(k,v); } }
describe('localStateStore', () => {
  beforeEach(() => { (globalThis as any).localStorage = new MemStorage(); });
  it('unlocks and deducts only when enough', async () => {
    const s = createLocalStateStore();
    await s.recordQuiz(1, true, 30);
    expect((await s.loadProfile())?.points).toBe(30);
    expect(await s.unlockTopic(7, 30)).toBe('unlocked');
    expect((await s.loadProfile())?.points).toBe(0);
    expect(await s.unlockTopic(8, 40)).toBe('insufficient');
  });
  it('does not count a quiz twice', async () => {
    const s = createLocalStateStore();
    await s.recordQuiz(1, true, 30);
    expect(await s.recordQuiz(1, true, 30)).toBe(false);
    expect((await s.loadProfile())?.points).toBe(30);
  });
});
```

- [ ] **Step 1: 写 `tests/localStore.test.ts`，运行确认失败。**
- [ ] **Step 2: 实现 `lib/state/types.ts`、`localStore.ts`、`index.ts`。**
- [ ] **Step 3: 运行 `npm run test`，预期通过。**
- [ ] **Step 4: Commit：`feat: add local state adapter`。**

---

## Task 6: Supabase 客户端、服务端与仓库

**Files:**
- Create: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/state/supabaseStore.ts`
- Modify: `lib/state/index.ts`（按环境选择适配器）
- Create: `supabase/migrations/20260831000000_seed.sql`, `supabase/migrations/20260831000001_rls.sql`

**Interfaces:**
- Consumes: `@supabase/supabase-js`, `@supabase/ssr`。
- Produces:
  - `getSupabaseClient(): SupabaseClient`
  - `getSupabaseServer(): SupabaseClient`（基于 cookies）
  - `createSupabaseStateStore(): UserStateAdapter`

`supabase/migrations/20260831000000_seed.sql` 建立 `profiles/user_quiz_attempts/browsing_history/unlocked_topics/question_logs` 表（字段与 spec 对齐），并把 `lib/content` 的内容以 `articles/faqs/quizzes/topics` 语义写入 `topics/articles/faqs/quizzes` 表（公开读）。

`supabase/migrations/20260831000001_rls.sql` 开启 RLS：用户数据表仅本人可读写，内容表公开可读；`profiles` 通过触发器在 `auth.users` 插入时自动建行。

`lib/state/index.ts`：
```ts
import { createLocalStateStore } from './localStore';
import { createSupabaseStateStore } from './supabaseStore';
import type { UserStateAdapter } from './types';
export function createStateStore(): UserStateAdapter {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createSupabaseStateStore();
  }
  return createLocalStateStore();
}
```

- [ ] **Step 1: 写 `lib/supabase/client.ts`、`server.ts`、`supabaseStore.ts`。**
- [ ] **Step 2: 写两条 Supabase 迁移 SQL。**
- [ ] **Step 3: 更新 `lib/state/index.ts` 按环境选择适配器。**
- [ ] **Step 4: 运行 `npm run build` 确认可编译。**
- [ ] **Step 5: Commit：`feat: add supabase state adapter and migrations`。**

---

## Task 7: UI 基础组件与科小獬形象

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`, `components/ui/Chip.tsx`, `components/ui/Modal.tsx`, `components/ui/Spinner.tsx`, `components/mascot/Mascot.tsx`

**Interfaces:**
- Produces:
  - `Button({ variant?: 'primary' | 'ghost' | 'gold', icon?: LucideIcon, children, onClick, disabled, ...props })`
  - `Card({ children, className })`
  - `Badge({ children, tone?: 'blue' | 'gold' | 'teal' })`
  - `Chip({ active, children, onClick })`
  - `Modal({ open, onClose, title, children })`
  - `Mascot({ mood?: 'default' | 'cheer' | 'ask', className })`（渲染对应科小獬图块，使用 `/mascot/kexiaobie-default.png` 等本地静态资源）

`components/mascot/Mascot.tsx` 按 `mood` 输出 `<img src={\`/mascot/kexiaobie-${mood}.png\`} alt="科小獬" className={className} />`。

- [ ] **Step 1: 实现各 UI 组件（全用 lucide 图标、圆角 `rounded-lg` 即 8px、`cn` 组合类名）。**
- [ ] **Step 2: 运行 `npm run build` 确认可编译。**
- [ ] **Step 3: Commit：`feat: add ui primitives and mascot`。**

---

## Task 8: 全局布局、导航与页脚

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/SiteHeader.tsx`, `components/layout/SiteFooter.tsx`, `components/home/Hero.tsx`, `components/home/TopicShowcase.tsx`

**Interfaces:**
- Produces: `siteNav = [{ href, label, icon }]`；`SiteHeader` 读取客户端状态（登录/积分）。

`app/layout.tsx` 挂载 `SiteHeader`、`SiteFooter`，全局字体用中文字体栈，`bg-[#F6F8FC]` 浅色底。

- [ ] **Step 1: 实现 `SiteHeader`（含 logo/科小獬、导航、登录/积分入口）与 `SiteFooter`。**
- [ ] **Step 2: 更新 `app/layout.tsx` 挂载。**
- [ ] **Step 3: 渲染 `Home` 首页占位（Hero + TopicShowcase），运行 `npm run dev` 目测布局。**
- [ ] **Step 4: Commit：`feat: add global layout and nav`。**

---

## Task 9: 首页

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/Hero.tsx`, `components/home/TopicShowcase.tsx`

**Interfaces:**
- Consumes: `topics`。Produces: 首页标记区（主标题 + 科小獬 + CTA 到 `/station`、`/columns`），专题入口网格，最新专栏摘要。

- [ ] **Step 1: 实现 `Hero`（首屏主视觉，科小獬作为第一视口信号，非卡片堆叠）与 `TopicShowcase`（卡片圆角 ≤8px）。**
- [ ] **Step 2: 组装 `app/page.tsx`。**
- [ ] **Step 3: `npm run dev` 目测移动端无溢出。**
- [ ] **Step 4: Commit：`feat: build home page`。**

---

## Task 10: IP 科小獬介绍页

**Files:**
- Create: `app/ip/page.tsx`

**Interfaces:**
- Produces: `/ip` 页面展示科小獬主形象、獬豸寓意、科大/科技元素、设计理念与使用规范。

- [ ] **Step 1: 实现 `/ip` 页面（主形象大图 + 分节说明，通栏布局）。**
- [ ] **Step 2: `npm run dev` 目测。**
- [ ] **Step 3: Commit：`feat: build ip page`。**

---

## Task 11: 普法专栏列表（含筛选）

**Files:**
- Create: `app/columns/page.tsx`, `components/columns/FilterBar.tsx`, `components/columns/TopicCard.tsx`

**Interfaces:**
- Consumes: `topics`。Produces: 主题类型/案例类型两项筛选（互不依赖），筛选后卡片更新；非 premium 卡片显示"免费"，premium 显示"拓展专题"。

- [ ] **Step 1: 实现 `FilterBar`（主题类型 + 案例类型的分段控件）与 `TopicCard`。**
- [ ] **Step 2: 组装 `/columns`，支持 URL query 同步。**
- [ ] **Step 3: `npm run dev` 目测筛选。**
- [ ] **Step 4: Commit：`feat: build columns list with filters`。**

---

## Task 12: 专题详情

**Files:**
- Create: `app/columns/[slug]/page.tsx`, `components/columns/ArticleBody.tsx`, `components/columns/FaqList.tsx`

**Interfaces:**
- Consumes: `bySlug`, `articlesFor`, `faqsFor`。Produces: 文章正文、要点侧栏、FAQ 手风琴；未登录或解锁条件由上层 `topics` 页统一判断，详情页仅负责展示。

- [ ] **Step 1: 实现详情页（含文章 + FAQ + 侧栏）。**
- [ ] **Step 2: 对不存在 slug 返回 `notFound()`。**
- [ ] **Step 3: `npm run dev` 目测。**
- [ ] **Step 4: Commit：`feat: build column detail`。**

---

## Task 13: 线上普法驿站（提问→解读）

**Files:**
- Create: `app/station/page.tsx`, `components/station/QuestionForm.tsx`, `components/station/InterpretationCard.tsx`, `app/api/matching/route.ts`

**Interfaces:**
- Consumes: `matchQuery`, `faqs`, `topics`, `createStateStore()`。
- Produces:
  - `POST /api/matching`，body `{ question: string }`，返回 `{ matched?: { faq, topic }, fallback?: boolean }`。
  - 有匹配时以科小獬口吻展示解读并列出关联专题；无匹配展示引导。提问写入 `question_logs`。

`app/api/matching/route.ts`：
```ts
import { NextResponse } from 'next/server';
import { matchQuery } from '@/lib/logic/matching';
import { faqs, topics, bySlug } from '@/lib/content';
export async function POST(req: Request) {
  const { question } = await req.json();
  const result = matchQuery(question, faqs, topics);
  if (result) return NextResponse.json({ matched: { faq: result.faq, topic: result.topic ?? null } });
  return NextResponse.json({ fallback: true });
}
```

- [ ] **Step 1: 实现 `QuestionForm`、`InterpretationCard`。**
- [ ] **Step 2: 实现 `/api/matching`。**
- [ ] **Step 3: 组装 `/station`，含筛选（主题/案例类型）。**
- [ ] **Step 4: `npm run dev` + `curl -X POST` 验证匹配与无匹配。**
- [ ] **Step 5: Commit：`feat: build online station with matching`。**

---

## Task 14: 答题中心

**Files:**
- Create: `app/quiz/page.tsx`, `components/quiz/ScorePanel.tsx`, `components/quiz/QuizRunner.tsx`, `components/quiz/QuizOption.tsx`

**Interfaces:**
- Consumes: `quizzes`, 按 `createStateStore()` 的 `recordQuiz`/`getAttemptedQuizIds`/`loadProfile`。
- Produces: 展示当前积分；抽题作答，答对 +分（`pointsForQuiz`），答错不加；每题仅计一次分；结束展示本轮得分。

- [ ] **Step 1: 实现 `QuizRunner`（题目/选项/下一题/结果）。**
- [ ] **Step 2: 接入状态，防止重复记分。**
- [ ] **Step 3: `npm run dev` 目测答题与积分变化。**
- [ ] **Step 4: Commit：`feat: build quiz center`。**

---

## Task 15: 专题库与积分解锁

**Files:**
- Create: `app/topics/page.tsx`, `components/topics/PremiumBadge.tsx`, `components/topics/UnlockModal.tsx`

**Interfaces:**
- Consumes: `topics`, `createStateStore()` 的 `unlockTopic`/`getUnlockedTopicIds`/`loadProfile`。
- Produces: 基础专题直接可读；premium 专题在未解锁时锁定，点击解锁弹出 `UnlockModal`（显示所需积分与当前积分），足够则解锁并扣分，不足则提示"积分不足，继续答题赚积分"；预留"后续拓展入口"按钮。

- [ ] **Step 1: 实现 `UnlockModal` 与 `PremiumBadge`。**
- [ ] **Step 2: 组装 `/topics`，点击解锁调用 `unlockTopic`。**
- [ ] **Step 3: 未登录时提示先登录。**
- [ ] **Step 4: `npm run dev` 目测解锁成功/不足两种状态。**
- [ ] **Step 5: Commit：`feat: build topics library and unlock flow`。**

---

## Task 16: 浏览历史

**Files:**
- Create: `app/history/page.tsx`, `app/api/state/route.ts`

**Interfaces:**
- Consumes: `createStateStore()` 的 `getHistory`/`addHistory`。
- Produces: `/api/state` 提供 `POST` 写历史、`POST quiz` 记分、`POST unlock` 解锁；`/history` 只读展示。

- [ ] **Step 1: 实现 `/api/state` 的写接口。**
- [ ] **Step 2: 实现 `/history` 页。**
- [ ] **Step 3: 专题详情/FAQ 浏览时调用 `addHistory`。**
- [ ] **Step 4: `npm run dev` 目测记录与展示。**
- [ ] **Step 5: Commit：`feat: build browsing history`。**

---

## Task 17: 登录/注册

**Files:**
- Create: `app/login/page.tsx`, `lib/auth.ts`

**Interfaces:**
- Consumes: Supabase Auth（`signUpWithPassword`/`signInWithPassword`/`signOut`）。
- Produces: 邮箱 + 密码注册/登录；不启用邮箱验证码与图形验证码；登录后进入 `/quiz` 或 `/topics`；游客可浏览基础内容。

- [ ] **Step 1: 实现 `lib/auth.ts` 与 `/login` 页面。**
- [ ] **Step 2: 登录成功写入会话（`@supabase/ssr`），导航栏显示用户名与积分。**
- [ ] **Step 3: 本地模式做演示登录 fallback（无 Supabase 时用本地 store）。**
- [ ] **Step 4: `npm run dev` 目测登录/注册。**
- [ ] **Step 5: Commit：`feat: add email password auth`。**

---

## Task 18: 端到端走查与浏览器验证

**Files:**
- Verify: 运行 `npm run dev`。

**Interfaces:** 无新接口。

- [ ] **Step 1: 用 agent-browser / Playwright 打开首页、/ip、/columns、/station、/quiz、/topics、/history、/login。**
- [ ] **Step 2: 走通：注册登录 → 答题加分 → 解锁专题（成功与不足两种）→ 浏览历史 → 提问匹配。**
- [ ] **Step 3: 检查桌面与移动端无溢出/遮挡、无控制台报错。**
- [ ] **Step 4: 修复发现的问题并复测。**
- [ ] **Step 5: Commit：`test: browser verify key flows`。**

---

## Task 19: 部署配置与文档

**Files:**
- Modify: `vercel.json`, `README.md`, `.env.example`

**Interfaces:** 无新接口。

`vercel.json`：
```json
{ "framework": "nextjs", "regions": ["hkg1"] }
```

`README.md` 收录：本地运行（`.env` 配置）、Supabase 迁移、Vercel 部署步骤、环境变量表。

- [ ] **Step 1: 完善 `vercel.json`、`README.md`、`.env.example`。**
- [ ] **Step 2: 运行 `npm run build` 确认生产构建通过。**
- [ ] **Step 3: Commit：`docs: add deployment config and readme`。**

---

## Self-Review

- **Spec coverage：** 页面结构（Task 9–17 覆盖全部 9 个路由）、数据模型（Task 2/5/6）、核心流程（登录 Task 17、积分 Task 3/14、解锁 Task 15、提问 Task 4/13、历史 Task 16）、IP/视觉（Task 7/10）、部署（Task 6/19）、测试（Task 18）均有点对点任务。
- **Placeholder scan：** 无 TODO/TBD；每任务给出实际文件、接口与测试代码，内容任务给出明确数量与示例，非占位。
- **Type consistency：** `pointsForQuiz/canUnlock/applyUnlock`、`matchQuery`、`UserStateAdapter` 方法名在后续任务（14/15/16/13）中被一致引用；`createStateStore()` 统一入口。
- **已知执行约束：** 本机无多代理工具时用 `executing-plans` 内联执行；Supabase 环境变量缺失时自动回退 `localStore`，保证本地可运行与可验证。
