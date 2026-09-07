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
    order: 1,
    officialDocs: [
      { label: '网络安全法（全文）', url: 'https://www.cac.gov.cn/2016-11/07/c_1119867116.htm' }
    ]
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
    order: 2,
    officialDocs: [
      { label: '个人信息保护法（全文）', url: 'http://www.npc.gov.cn/npc/c2/c30834/202108/t20210820_313088.html' }
    ]
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
    order: 3,
    officialDocs: [
      { label: '数据安全法（全文）', url: 'http://www.npc.gov.cn/c2/c30834/202106/t20210610_311888.html' }
    ]
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
    order: 4,
    officialDocs: [
      { label: '未成年人网络保护条例（全文）', url: 'https://www.gov.cn/zhengce/content/202310/content_6911288.htm?zbb=true' }
    ]
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
    order: 5,
    officialDocs: [
      { label: '网络信息内容生态治理规定（全文）', url: 'https://www.cac.gov.cn/2019-12/20/c_1578375159509309.htm' }
    ]
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
    order: 6,
    officialDocs: [
      { label: '反电信网络诈骗法（全文）', url: 'http://www.npc.gov.cn/npc/c2/c30834/202209/t20220902_319186.html' }
    ]
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
    order: 7,
    officialDocs: [
      { label: '民法典（全文）', url: 'https://www.cac.gov.cn/2020-06/01/c_1592561777268319.htm' }
    ]
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
    order: 8,
    officialDocs: [
      { label: '网络信息内容生态治理规定（全文）', url: 'https://www.gov.cn/zhengce/2019-12/20/content_5728944.htm' }
    ]
  },
  {
    id: 9,
    slug: 'ai-content-governance',
    title: '生成式AI与AI内容标识',
    summary: '看清AI生成内容与深度伪造，掌握辨别、标识与维权的常识。',
    category: '人工智能',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'teal',
    order: 9,
    officialDocs: [
      { label: '生成式AI服务管理暂行办法（全文）', url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm' },
      { label: 'AI生成合成内容标识办法（全文）', url: 'https://www.gov.cn/zhengce/zhengceku/202503/content_7014286.htm' }
    ]
  },
  {
    id: 10,
    slug: 'cyber-violence',
    title: '网络暴力信息治理',
    summary: '识别曝光、辱骂、人肉等网暴行为，学会固定证据与依法维权。',
    category: '网络暴力',
    caseType: '案例',
    isPremium: false,
    premiumPoints: 0,
    accent: 'gold',
    order: 10,
    officialDocs: [
      { label: '网络暴力信息治理规定（全文）', url: 'https://www.cac.gov.cn/2024-06/14/c_1720043894161555.htm' }
    ]
  },
  {
    id: 11,
    slug: 'algorithm-governance',
    title: '算法推荐与透明可解释',
    summary: '理解热搜与个性化推荐背后的算法，跳出信息茧房。',
    category: '算法治理',
    caseType: '科普',
    isPremium: false,
    premiumPoints: 0,
    accent: 'blue',
    order: 11,
    officialDocs: [
      { label: '互联网信息服务算法推荐管理规定（全文）', url: 'https://www.gov.cn/zhengce/zhengceku/2022-01/04/content_5666429.htm' }
    ]
  },
  {
    id: 12,
    slug: 'data-export',
    title: '数据出境与跨境合规',
    summary: '了解数据跨境流动规则，保护你的信息不被随意出境。',
    category: '数据安全',
    caseType: '答疑',
    isPremium: false,
    premiumPoints: 0,
    accent: 'teal',
    order: 12,
    officialDocs: [
      { label: '促进和规范数据跨境流动规定（全文）', url: 'https://www.cac.gov.cn/2024-03/22/c_1712776611775634.htm' }
    ]
  }
];
