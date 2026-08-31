import type { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 1,
    slug: 'network-security',
    title: '网络安全基础',
    summary: '认识账号、密码与网络入口，筑牢网络安全的第一道防线。',
    category: '网络安全',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'blue',
    order: 1
  },
  {
    id: 2,
    slug: 'personal-info',
    title: '个人信息保护',
    summary: '识别个人信息被过度收集的场景，掌握同意与撤回的边界。',
    category: '个人信息保护',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'teal',
    order: 2
  },
  {
    id: 3,
    slug: 'data-security',
    title: '数据安全',
    summary: '数据分类分级与风险意识，理解数据安全是共同的义务。',
    category: '数据安全',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'blue',
    order: 3
  },
  {
    id: 4,
    slug: 'minor-protection',
    title: '未成年人网络保护',
    summary: '游戏、社交、直播中的风险识别，守护未成年人健康成长。',
    category: '未成年人保护',
    caseType: '案例',
    isPremium: false,
    premiumPoints: 0,
    accent: 'teal',
    order: 4
  },
  {
    id: 5,
    slug: 'rumor-governance',
    title: '网络谣言与信息内容治理',
    summary: '辨别谣言与虚假信息，理解“谁发布、谁负责”的规则。',
    category: '信息内容治理',
    caseType: '案例',
    isPremium: false,
    premiumPoints: 0,
    accent: 'gold',
    order: 5
  },
  {
    id: 6,
    slug: 'anti-fraud',
    title: '网络反诈',
    summary: '识别刷单、冒充、虚假理财等骗局，守住自己的钱袋。',
    category: '网络反诈',
    caseType: '案例',
    isPremium: false,
    premiumPoints: 0,
    accent: 'gold',
    order: 6
  },
  {
    id: 7,
    slug: 'rights-protection',
    title: '网络侵权与维权',
    summary: '被网暴、被冒用、被泄露？掌握证据与依法维权路径。',
    category: '网络侵权',
    caseType: '答疑',
    isPremium: true,
    premiumPoints: 30,
    accent: 'teal',
    order: 7
  },
  {
    id: 8,
    slug: 'ecology-governance',
    title: '清朗生态治理',
    summary: '理解平台治理与内容生态，做理性、友善的网络参与者。',
    category: '综合',
    caseType: '科普',
    isPremium: true,
    premiumPoints: 40,
    accent: 'blue',
    order: 8
  }
];
