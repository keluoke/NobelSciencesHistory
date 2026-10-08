import { QuizQuestion } from '../types';

export const NOBEL_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    discipline: 'physics',
    title: '爱因斯坦的诺奖之谜',
    question: '阿尔伯特·爱因斯坦获得1921年诺贝尔物理学奖的主要获奖成就究竟是哪一项？',
    options: [
      '狭义相对论 (质能方程 E=mc²)',
      '广义相对论 (引力弯曲时空)',
      '发现光电效应定律与光量子假说',
      '布朗运动的统计物理学理论'
    ],
    correctIndex: 2,
    explanation: '许多人误以为爱因斯坦是因相对论获奖。事实上，当时诺贝尔委员会对相对论的实验检验仍心存疑虑且争议巨大，因此在1922年补颁1921年奖项时，明确指定授予其“对理论物理学的贡献，特别是发现了光电效应定律”。',
    relatedYear: 1921,
    relatedDiscipline: 'physics'
  },
  {
    id: 'q2',
    discipline: 'chemistry',
    title: '跨越双奖的女性科学传奇',
    question: '历史上哪位科学家在两个不同的自然科学领域（物理学与化学）均荣获诺贝尔奖？',
    options: [
      '珍妮弗·道德纳 (Jennifer Doudna)',
      '玛丽·居里 (Marie Curie)',
      '罗莎琳德·富兰克林 (Rosalind Franklin)',
      '卡塔林·考里科 (Katalin Karikó)'
    ],
    correctIndex: 1,
    explanation: '居里夫人分别于1903年荣获诺贝尔物理学奖（发现天然放射性与钋、镭），以及1911年荣获诺贝尔化学奖（分离纯金属单质镭），是人类历史上唯一一位在物理和化学两大科学领域均斩获诺贝尔奖的科学巨人！',
    relatedYear: 1911,
    relatedDiscipline: 'chemistry'
  },
  {
    id: 'q3',
    discipline: 'medicine',
    title: '青蒿素提取的关键灵感',
    question: '中国科学家屠呦呦在研制抗疟疾特效药青蒿素时，使有效成分提取率获得决定性突破的实验关键是什么？',
    options: [
      '改用100℃长时间高温浓缩煎煮中药材',
      '受古医籍启发，改用低沸点乙醚在约35℃低温浸润冷萃',
      '使用高能伽马射线进行核辐射诱变',
      '在青蒿汁中加入大量高浓度强硫酸沉淀'
    ],
    correctIndex: 1,
    explanation: '屠呦呦翻阅东晋葛洪《肘后备急方》中“青蒿一握以水二升渍绞取汁”的记载，敏锐意识到传统高温煎煮破坏了青蒿素中脆弱的特殊过氧桥结构。她改用沸点仅约35℃的乙醚低温浸提，使抗疟抑制率一跃达到100%！',
    relatedYear: 2015,
    relatedDiscipline: 'medicine'
  },
  {
    id: 'q4',
    discipline: 'chemistry',
    title: 'CRISPR 基因剪刀的向导机制',
    question: '在 2020 年获诺贝尔化学奖的 CRISPR-Cas9 基因编辑系统中，负责精准引导 Cas9 蛋白定位到特定基因组靶点的是什么分子？',
    options: [
      '一段人工设计的长双链质粒DNA',
      '单链向导 RNA (sgRNA，含有与靶标互补的约20个碱基)',
      '一种高纯度抗体免疫球蛋白',
      '金属锌指结构蛋白结构域'
    ],
    correctIndex: 1,
    explanation: 'CRISPR 系统的革命性在于其极致的可编程性：研究人员不需要费力重新合成复杂蛋白质，只需设计一条短单链向导 RNA (sgRNA)，就能通过碱基互补配对引导 Cas9 内切酶精准切开目标 DNA 双链。',
    relatedYear: 2020,
    relatedDiscipline: 'chemistry'
  },
  {
    id: 'q5',
    discipline: 'medicine',
    title: 'mRNA 疫苗的破局神笔',
    question: '2023年诺贝尔生理学或医学奖得主考里科与韦斯曼的核心发现是什么？',
    options: [
      '彻底消除了核糖体对蛋白质的翻译能力',
      '用假尿嘧啶 (Pseudouridine Ψ) 修饰 mRNA 碱基，规避细胞致命排异炎症并大幅提升抗原翻译效率',
      '直接向人体血液注射活减毒冠状病毒颗粒',
      '将 mRNA 永久整合进人类细胞核染色体 DNA 中'
    ],
    correctIndex: 1,
    explanation: '未经修饰的体外转录 mRNA 会激活细胞膜上的 Toll 样受体 (TLR7/8)，引起严重的自身免疫炎症反应并被迅速降解。考里科等人发现将尿嘧啶替换为假尿嘧啶，可神奇地躲过免疫受体识别，使抗原蛋白安全高效表达，成就了现代 mRNA 疫苗。',
    relatedYear: 2023,
    relatedDiscipline: 'medicine'
  },
  {
    id: 'q6',
    discipline: 'chemistry',
    title: '2024 年化学奖与 AI 蛋白质折叠',
    question: '2024年诺贝尔化学奖颁发给 AlphaFold 开发者哈萨比斯、江珀以及戴维·贝克，他们攻克的“蛋白质折叠难题”本质是什么？',
    options: [
      '人工制造出不需要氨基酸构成的生物体',
      '仅根据一维氨基酸序列直接精确预测出蛋白质的原子级三维立体空间构型',
      '彻底消除了所有细菌抗药性突变',
      '让人类细胞停止进行有丝分裂'
    ],
    correctIndex: 1,
    explanation: '蛋白质必须折叠成精密的三维空间立体构型才能行使生物学功能。半个世纪以来，从一维序列计算空间构型被视为生命科学的至高难题。AlphaFold 借助深度学习注意力网络在几分钟内即可预测以往耗时数年的复杂构型，极大加速了靶向新药研发。',
    relatedYear: 2024,
    relatedDiscipline: 'chemistry'
  }
];
