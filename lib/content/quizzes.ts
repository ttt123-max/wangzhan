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
  },
  {
    id: 17,
    topicId: 9,
    question: '下列哪种内容更需要核实是否为AI生成？',
    options: ['普通日历', '人物换脸视频', '购物小票', '风景明信片'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 18,
    topicId: 9,
    question: 'AI伪造他人声音、照片并公开，通常侵害的是？',
    options: ['所有权', '人格权/肖像权等', '商标权', '无任何权利'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 19,
    topicId: 9,
    question: '使用AI工具时，更稳妥的做法是？',
    options: ['随意上传他人证件', '上传敏感信息', '不上传他人隐私/敏感信息', '用AI生成虚假新闻'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 20,
    topicId: 10,
    question: '发现网络暴力违法信息，平台应如何处理？',
    options: ['删除、屏蔽并保存记录', '只点赞', '要求用户自行处理', '不处理'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 21,
    topicId: 10,
    question: '人肉搜索并公开他人个人信息，可能？',
    options: ['只是玩笑', '合法行为', '侵权违法', '匿名即可免责'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 22,
    topicId: 10,
    question: '面对网络暴力，更有效的维权路径是？',
    options: ['直接和对方对骂', '固定证据并平台投诉/报警', '注销账号不处理', '转发扩大传播'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 23,
    topicId: 11,
    question: '算法推荐管理规定禁止平台利用算法做什么？',
    options: ['提高搜索效率', '控制热搜、操纵榜单', '推荐权威内容', '保护用户隐私'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 24,
    topicId: 11,
    question: '关于关闭个性化推荐，下列说法正确的是？',
    options: ['无法关闭', '只有会员能关闭', '用户有权关闭且平台应停止', '关闭后仍继续推送'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 25,
    topicId: 11,
    question: '看待算法推送内容，更理性的做法是？',
    options: ['完全相信', '核查权威来源', '只看热度', '随手转发'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 26,
    topicId: 12,
    question: '下列哪种情况属于“数据出境”？',
    options: ['仅境内备份', '把境内数据提供给境外', '删除本地数据', '加密本地文件'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 27,
    topicId: 12,
    question: '重要数据向境外提供前，数据处理者可能需要？',
    options: ['直接上传', '申报安全评估或履行相应程序', '无需任何流程', '只告知同事'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 28,
    topicId: 12,
    question: '用户减少个人数据被跨境传输，可以怎么做？',
    options: ['随意授权', '选择说明存储地点的正规服务', '使用公共设备', '上传敏感证件'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 29,
    topicId: 1,
    question: '《中华人民共和国网络安全法》自什么时候起施行？',
    options: ['2016年11月7日', '2017年6月1日', '2018年6月1日', '2019年6月1日'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 30,
    topicId: 1,
    question: '网络安全保障的是网络数据哪些能力？',
    options: ['仅保密性', '仅完整性', '仅可用性', '完整性、保密性、可用性'],
    correctIndex: 3,
    points: 10
  },
  {
    id: 31,
    topicId: 1,
    question: '国家实行网络安全哪种保护制度？',
    options: ['全面保护制度', '总体保护制度', '等级保护制度', '分级保护制度'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 32,
    topicId: 1,
    question: '办理网络接入服务时，网络运营者应要求用户提供？',
    options: ['家庭住址', '工作单位', '真实身份信息', '身份证复印件'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 33,
    topicId: 1,
    question: '网络运营者不履行网络安全保护义务，情节严重的罚款可能是？',
    options: ['一万元以下', '五万元以上十万元以下', '十万元以上五十万元以下', '一百万元以上'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 34,
    topicId: 1,
    question: '发现账号被盗后，应该怎么做？',
    options: ['等待盗号者离开', '向朋友抱怨', '联系平台客服冻结并找回', '继续使用被盗账号'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 35,
    topicId: 1,
    question: '防火墙的主要作用是？',
    options: ['防止物理火灾', '给电脑降温', '控制网络流量', '提升网速'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 36,
    topicId: 1,
    question: '下列哪种做法最可能带来恶意软件风险？',
    options: ['从正规商店下载应用', '及时更新系统', '从未知网站下载破解软件', '定期备份数据'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 37,
    topicId: 1,
    question: '下列哪个属于常见网络攻击？',
    options: ['数据加密', '防火墙设置', '拒绝服务攻击', '数据备份'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 38,
    topicId: 1,
    question: '使用公共充电桩充电，更安全的做法是？',
    options: ['随意连接', '使用共享充电线', '用正规充电桩并自带充电线', '随意点击屏幕广告'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 39,
    topicId: 1,
    question: '最安全的密码设置方式是？',
    options: ['使用生日', '使用abcdef', '字母数字特殊字符组成的长密码', '使用用户名'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 40,
    topicId: 1,
    question: '关于密码管理，下列错误的是？',
    options: ['定期更换密码', '不同账号使用不同密码', '所有重要账号共用同一个密码', '使用密码管理器'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 41,
    topicId: 1,
    question: '网络安全应急响应的主要目的是？',
    options: ['发生后再处理', '尽快恢复系统并减少损失', '只由技术人员处理', '遇到问题再制定预案'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 42,
    topicId: 2,
    question: '随意连接公共免费WiFi可能导致？',
    options: ['网速更快', '个人信息泄露', '电量增加', '设备性能增强'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 43,
    topicId: 2,
    question: '下列哪项属于个人信息？',
    options: ['公开温度', '身份证号', '商品价格', '城市人口'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 44,
    topicId: 2,
    question: '处理个人信息应当遵循什么原则？',
    options: ['秘密、随意', '公开、透明', '无需告知', '任性处理'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 45,
    topicId: 2,
    question: '处理不满多少周岁的未成年人个人信息，需取得监护人同意？',
    options: ['6周岁', '10周岁', '14周岁', '18周岁'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 46,
    topicId: 2,
    question: '加强个人信息保护，下列行为不应做的是？',
    options: ['妥善保管身份证件', '在社交网络公开详细个人信息', '定期清理缓存', '备份重要数据'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 47,
    topicId: 2,
    question: 'App强制授权通讯录才能使用，这种要求属于？',
    options: ['完全合法', '构成捆绑授权', '商家有权要求', '用户只能接受'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 48,
    topicId: 3,
    question: '根据数据安全法，数据处理者应当建立什么制度？',
    options: ['只看排名', '全流程数据安全管理制度', '无需管理', '只保留原始文件'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 49,
    topicId: 3,
    question: '买卖、代查他人数据的行为？',
    options: ['只是赚零花钱', '完全合法', '违法，可能构成犯罪', '只要不公开就没事'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 50,
    topicId: 3,
    question: '数据分类分级的主要目的是？',
    options: ['增加存储成本', '便于宣传', '按照重要性和危害程度差异化保护', '限制所有数据使用'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 51,
    topicId: 4,
    question: '家长保护儿童网络安全，应该怎么做？',
    options: ['让儿童随意浏览', '引导儿童并设置上网时间和权限', '完全不限制', '不关注网络行为'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 52,
    topicId: 6,
    question: '收到“中大奖需先付手续费”的短信，应该？',
    options: ['立即点击链接填写', '不予理会并删除', '立即转账领奖', '转发给朋友一起参与'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 53,
    topicId: 6,
    question: '下列哪种不属于网络诈骗？',
    options: ['刷单返利', '冒充公检法转账', '通过正规第三方支付平台付款', '虚拟交友后诱导投资'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 54,
    topicId: 5,
    question: '转发未经证实的网络谣言，可能承担？',
    options: ['没有任何风险', '行政或刑事责任', '只要删掉就没事', '只有原创者才担责'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 55,
    topicId: 10,
    question: '遭遇网络暴力，正确的做法是？',
    options: ['直接在评论区对骂', '固定证据并向平台举报', '注销账号不再理会', '转发扩大传播'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 56,
    topicId: 11,
    question: '算法推荐服务提供者不得利用算法做什么？',
    options: ['提高搜索效率', '操纵榜单、控制热搜', '保护用户隐私', '推荐权威内容'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 57,
    topicId: 11,
    question: '用户是否可以选择关闭算法个性化推荐？',
    options: ['不能关闭', '只有会员才能关闭', '可以，且平台应当停止', '关闭后仍然推送'],
    correctIndex: 2,
    points: 10
  },
  {
    id: 58,
    topicId: 12,
    question: '下列哪种情况属于“数据出境”？',
    options: ['仅在境内备份', '把境内产生的数据提供给境外', '删除本地数据', '加密本地文件'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 59,
    topicId: 9,
    question: 'AI生成内容按照相关规定应当？',
    options: ['隐藏来源', '按要求添加标识', '不标注来源', '随意发布'],
    correctIndex: 1,
    points: 10
  },
  {
    id: 60,
    topicId: 9,
    question: '使用AI工具时，不应上传什么？',
    options: ['公开知识', '他人隐私和证件', '普通问题', '英文资料'],
    correctIndex: 1,
    points: 10
  }
];
