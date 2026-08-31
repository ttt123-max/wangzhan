# 法治先锋 · 科小獬

以 IP 形象“科小獬”为核心的全场景网信普法网站。围绕獬豸法治神兽 + 科大/科技元素，提供普法专栏、线上普法驿站、答题赚积分、积分解锁拓展案例专题，以及浏览历史与邮箱密码登录。

## 技术栈

- Next.js（App Router）+ React + TypeScript
- Tailwind CSS + lucide-react
- Supabase（Postgres + Auth + RLS）
- Vitest（单元测试）
- 部署：Vercel

## 本地运行

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

默认情况下（未配置 Supabase 环境变量）会进入**本地演示模式**：公开内容来自版本化的 `lib/content`，用户数据（积分、答题记录、浏览历史、解锁）保存在浏览器 `localStorage`，登录/注册为本地演示会话。无需任何外部服务即可体验全部页面与流程。

配置了 `SUPABASE_URL` / `SUPABASE_ANON_KEY` 后，自动切换到 Supabase 数据与认证。

## Supabase 配置

1. 在 Supabase 创建一个项目。
2. 在 SQL Editor 依次执行：
   - `supabase/migrations/20260831000000_seed.sql`
   - `supabase/migrations/20260831000001_rls.sql`
3. 在 `.env.local` 填入：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon public key
```

迁移会创建用户数据表、`add_points` 函数、自动建 profile 的触发器，并开启 RLS。

## 部署到 Vercel

1. 将仓库推送到 GitHub 并导入 Vercel。
2. 配置环境变量：

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |

3. 部署即可；`vercel.json` 已指定 Next.js 框架与区域。

## 测试

```bash
pnpm test
```

单元测试覆盖：积分计算、防重复计分、解锁扣分/积分不足、提问匹配、内容完整性、本地状态存储。

## 内容编辑

普法专题、文章、常见问题与小问答集中在 `lib/content/`，均为真实可查证的普法内容，重要结论附法律依据。如需调整，直接编辑对应数据文件。

## 免责声明

本站内容为公益普法参考，不构成法律意见。具体个案请咨询专业法律人士或向主管部门核实。
