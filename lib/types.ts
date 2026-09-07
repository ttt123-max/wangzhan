export type TopicCategory =
  | '网络安全'
  | '数据安全'
  | '个人信息保护'
  | '未成年人保护'
  | '信息内容治理'
  | '网络反诈'
  | '网络侵权'
  | '人工智能'
  | '网络暴力'
  | '算法治理'
  | '综合';

export type CaseType = '科普' | '案例' | '答疑' | '互动';

export interface OfficialDoc {
  label: string;
  url: string;
}

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
  officialDocs?: OfficialDoc[];
}

export interface Article {
  id: number;
  topicId: number;
  title: string;
  content: string;
  lawRef?: string;
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
