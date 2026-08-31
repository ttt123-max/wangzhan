import type { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    topicId: 1,
    question: '以下哪种密码设置方式最安全？',
    options: ['用生日', '用手机号', '12 位以上含大小写字母与符号', '同一个密码全平台通用'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 2,
    topicId: 1,
    question: '收到陌生链接要求输入账号密码，正确的做法是？',
    options: ['直接填写', '先核验域名再决定', '转发给朋友一起点', '先输入密码试试'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 3,
    topicId: 2,
    question: '商家以“必须授权”为由收集与你无关的信息，是否合法？',
    options: ['合法，用户只能接受', '不合法，构成捆绑授权', '只要免费就合法', '看商家心情'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 4,
    topicId: 2,
    question: '关于个人信息授权，以下说法正确的是？',
    options: ['授权后永远不能撤回', '只能同意不能删除', '可以查阅、撤回并删除', '个人信息不属于本人'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 5,
    topicId: 3,
    question: '对他人数据进行“买卖、代查”行为，正确的是？',
    options: ['只是赚零花钱，没风险', '合法合理', '违法，可能构成犯罪', '只要不公开就没事'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 6,
    topicId: 3,
    question: '数据分类分级的目的是什么？',
    options: ['增加存储成本', '便于宣传', '根据重要性和危害程度实施差异化保护', '限制所有数据使用'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 7,
    topicId: 4,
    question: '未成年人网络保护，基于哪部行政法规？',
    options: ['《网络安全法》', '《未成年人网络保护条例》', '《民法典》', '《数据安全法》'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 8,
    topicId: 4,
    question: '孩子被网暴后，第一步应做什么？',
    options: ['先和孩子对骂', '立即固定证据并平台举报', '忽略不管', '把账号注销就没人知道'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 9,
    topicId: 5,
    question: '“转发一下”未经证实的谣言，会有风险吗？',
    options: ['没有风险', '可能违法', '只要删了就没事', '只有自己写的才算'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 10,
    topicId: 5,
    question: '辨别谣言，以下哪种做法更可靠？',
    options: ['看标题是否震惊', '核实权威来源', '看点赞数', '看是否配图'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 11,
    topicId: 6,
    question: '“垫资做任务返利”的网络推广，本质通常是？',
    options: ['正经兼职', '诈骗', '合法理财', '电商促销'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 12,
    topicId: 6,
    question: '接到自称公检法并要求转账的电话，应如何对待？',
    options: ['按要求保密转账', '立即挂断并核实，不转账', '把验证码告诉对方', '相信对方是安全的'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 13,
    topicId: 7,
    question: '遭遇网络侵权，最关键的第一步是？',
    options: ['先和对方理论', '尽快固定完整证据', '注销账号', '删除所有记录'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 14,
    topicId: 7,
    question: '他人盗用你的照片并公开传播，属于侵犯你的什么权利？',
    options: ['仅著作权', '肖像权/人格权等', '只是名誉问题', '什么都不算'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 15,
    topicId: 8,
    question: '普通网民对网络不良信息，应采取什么态度？',
    options: ['与我无关', '主动举报并理性表达', '跟着围观', '转发扩散'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 16,
    topicId: 8,
    question: '网络生态治理强调的内容生态方向是？',
    options: ['鼓励负面炒作', '传播正能量、依法治理', '放任自流', '只限制用户'],
    correctIndex: 1,
    points: 10
  }
];
