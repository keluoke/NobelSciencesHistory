import { CompleteArchiveEntry } from '../types';

export interface CriteriaExplanation {
  level: number;
  title: string;
  badge: string;
  description: string;
  examples: string[];
}

export const CRITERIA_EXPLANATIONS: CriteriaExplanation[] = [
  {
    level: 1,
    title: '划时代范式更替 (Paradigm Shift)',
    badge: '★ 范式更替',
    description: '完全推翻或重塑了人类对宇宙、物质、时空或生命本质的核心认知体系，终结了旧时代的物理/化学/生物学基础教条，开辟了全新的大科学分支。',
    examples: [
      '物理：普朗克量子假说 (1918)、爱因斯坦光电效应 (1921)、德布罗意物质波 (1929)、量子力学创立 (1932/1933)、LIGO引力波 (2017)',
      '化学：鲍林化学键本质 (1954)、CRISPR基因剪刀 (2020)、AlphaFold蛋白质三维结构预测 (2024)',
      '医学：青霉素抗生素神药 (1945)、DNA双螺旋立体结构 (1962)、mRNA疫苗碱基修饰 (2023)'
    ]
  },
  {
    level: 2,
    title: '重大突破与平台级技术 (Universal Breakthrough & Platform Tech)',
    badge: '● 重大突破',
    description: '发明或发现了具备普适赋能能力的重大技术、核心实验仪器或生命科学通用研究平台，成为全球数以万计实验室或高新产业不可或缺的底层支柱。',
    examples: [
      '物理：半导体晶体管 (1956)、激光技术 (1964)、扫描隧道显微镜STM (1986)、单层石墨烯 (2010)',
      '化学：哈伯合成氨 (1918)、PCR聚合酶链反应 (1993)、高能锂离子电池 (2019)',
      '医学：胰岛素治疗糖尿病 (1923)、抗疟疾特效药青蒿素 (2015)、肿瘤免疫检查点PD-1阻断 (2018)'
    ]
  },
  {
    level: 3,
    title: '学科前沿先锋与精密解析 (Specialized Frontier & Precision)',
    badge: '▲ 前沿先锋',
    description: '在特定精细物理分支、高难度分子化学全合成或人体某一专门代谢信号通路中完成决定性攻坚，解决长期未解的具体机理争议。',
    examples: [
      '阿秒超快光脉冲 (2023物理)、不对称有机催化 (2021化学)、细胞自噬循环机制 (2016医学)'
    ]
  }
];

export const VACANT_YEARS_HISTORICAL_ANALYSIS = [
  {
    period: '一战浩劫时期 (1914 - 1918)',
    affected: '1916年物理、化学、医学奖全线停发；1917年化学与医学停发',
    reason: '第一次世界大战爆发导致欧洲主要参战国学者之间学术交流完全阻断，国际通讯与提名受阻。中立国瑞典评审委员会决定根据《诺贝尔基金会章程》第4条暂缓评奖，奖金留入特别基金。'
  },
  {
    period: '两次大战间歇的严苛标准与争议 (1920s - 1930s)',
    affected: '1921物理奖推迟、1924化学奖停发、1925医学奖空缺、1931/1934物理奖空缺',
    reason: '评委会曾因提名成果不够成熟或评委内部对相对论等颠覆性理论发生激烈学术争鸣，导致无人获过半数赞成票。依照章程，若当选成果未达绝对重大标准，该年奖金顺延一年或保留。'
  },
  {
    period: '二战与纳粹铁蹄阴云 (1939 - 1943)',
    affected: '1940、1941、1942年物理、化学、生理医学三大自然科学奖项全部空缺停发',
    reason: '纳粹德国入侵挪威和丹麦，战争阴影笼罩斯堪的纳维亚半岛。希特勒曾因异见人士获和平奖而下令全面禁止德国学者接受诺贝尔奖。瑞典在重重战争封锁中无法获得全球提名信件，诺贝尔基金会依法将未颁奖金归入基金本金。'
  }
];

export const COMPLETE_ARCHIVE_DATA: CompleteArchiveEntry[] = [
  // 1901
  {
    year: 1901,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['威廉·康拉德·伦琴 (Wilhelm Röntgen)'],
    discoveryTitle: '发现X射线 (伦琴射线)',
    citationBrief: '首届物理学奖。发现非凡的X射线，开启近现代医学透视与晶体衍射探测。',
    milestoneLevel: 1,
    deepAwardId: '1901-rontgen'
  },
  {
    year: 1901,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['雅各布斯·范特霍夫 (Jacobus Henricus van \'t Hoff)'],
    discoveryTitle: '化学动力学法则与溶液渗透压定律',
    citationBrief: '首届化学奖。确立物理化学学科基石，发现渗透压等价于理想气体状态方程。',
    milestoneLevel: 1,
    deepAwardId: '1901-van-t-hoff'
  },
  {
    year: 1901,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['埃米尔·冯·贝林 (Emil von Behring)'],
    discoveryTitle: '白喉血清抗毒素疗法',
    citationBrief: '首届医学奖。发现抗体特异性中和毒素原理，开创被动免疫治疗白喉。',
    milestoneLevel: 1,
    deepAwardId: '1901-behring'
  },

  // 1902
  {
    year: 1902,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['亨德里克·洛伦兹 (Hendrik Lorentz)', '彼得·塞曼 (Pieter Zeeman)'],
    discoveryTitle: '磁场对辐射现象的影响 (塞曼效应)',
    citationBrief: '研究磁场使光谱线分裂的塞曼效应，证实电子在原子内部振动发光。',
    milestoneLevel: 2
  },
  {
    year: 1902,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['赫尔曼·埃米尔·费歇尔 (Emil Fischer)'],
    discoveryTitle: '糖类与嘌呤衍生物的合成研究',
    citationBrief: '有机合成大师，人工全合成葡萄糖、果糖及咖啡因，开创立体化学与锁钥学说。',
    milestoneLevel: 2
  },
  {
    year: 1902,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['罗纳德·罗斯 (Ronald Ross)'],
    discoveryTitle: '发现疟原虫经按蚊叮咬传播途径',
    citationBrief: '阐明疟疾经由蚊虫叮咬进入人体的生活史，为阻断热带疟疾奠定防蚊基石。',
    milestoneLevel: 2
  },

  // 1903
  {
    year: 1903,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['亨利·贝克勒尔', '皮埃尔·居里', '玛丽·居里'],
    discoveryTitle: '天然放射性的发现与镭、钋元素的分离',
    citationBrief: '居里夫人成为首位女性诺奖得主，证实原子核可自发衰变释放能量。',
    milestoneLevel: 1,
    deepAwardId: '1903-becquerel-curie'
  },
  {
    year: 1903,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['斯万特·阿伦尼乌斯 (Svante Arrhenius)'],
    discoveryTitle: '电解质电离理论',
    citationBrief: '提出盐类溶于水离解为正负离子，创立阿伦尼乌斯化学反应活化能方程。',
    milestoneLevel: 1
  },
  {
    year: 1903,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['尼尔斯·芬森 (Niels Finsen)'],
    discoveryTitle: '聚光光线疗法治疗寻常狼疮等皮肤病',
    citationBrief: '利用浓缩紫外光线治疗顽固细菌性皮肤结核，开启现代光动力疗法。',
    milestoneLevel: 3
  },

  // 1905
  {
    year: 1905,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['菲利普·莱纳德 (Philipp Lenard)'],
    discoveryTitle: '阴极射线的研究',
    citationBrief: '制备莱纳德薄铝窗使阴极射线引出管外，观测光电效应微观特征。',
    milestoneLevel: 2
  },
  {
    year: 1905,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['阿道夫·冯·拜尔 (Adolf von Baeyer)'],
    discoveryTitle: '有机染料与芳香族化合物合成',
    citationBrief: '全合成植物靛蓝染料与荧光素，发展张力学说，开启近代煤焦油化工。',
    milestoneLevel: 2
  },
  {
    year: 1905,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['罗伯特·科赫 (Robert Koch)'],
    discoveryTitle: '结核病病原菌的发现与科赫法则',
    citationBrief: '现代细菌学之父。分离鉴定出结核杆菌与霍乱弧菌，创立病原微生物科赫法则。',
    milestoneLevel: 1
  },

  // 1908
  {
    year: 1908,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['欧内斯特·卢瑟福 (Ernest Rutherford)'],
    discoveryTitle: '元素蜕变假说与放射性化学',
    citationBrief: '近代核物理之父却获化学奖！阐明放射性衰变系α与β粒子释放，证明元素可自发转变为新元素。',
    milestoneLevel: 1
  },
  {
    year: 1908,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['伊利亚·梅契尼科夫 (Élie Metchnikov)', '保罗·埃尔利希 (Paul Ehrlich)'],
    discoveryTitle: '免疫机制研究（细胞吞噬学说与体液侧链抗体理论）',
    citationBrief: '确立现代免疫学双柱：巨噬细胞吞噬异物学说与特异性抗体受体侧链假说。',
    milestoneLevel: 1
  },

  // 1911
  {
    year: 1911,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['威廉·维恩 (Wilhelm Wien)'],
    discoveryTitle: '热辐射位移定律 (维恩位移定律)',
    citationBrief: '导出黑体辐射峰值波长与绝对温度反比关系 λmax·T = b，为量子假说铺平道路。',
    milestoneLevel: 2
  },
  {
    year: 1911,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['玛丽·居里 (Marie Curie)'],
    discoveryTitle: '分离出纯金属单质镭与钋的化学性质研究',
    citationBrief: '人类历史上唯一在物理与化学两个不同自然科学领域均斩获诺奖的科学巨人！',
    milestoneLevel: 1,
    deepAwardId: '1911-curie-chem'
  },
  {
    year: 1911,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['阿尔瓦·古尔斯特兰德 (Allvar Gullstrand)'],
    discoveryTitle: '眼屈光学与眼内光线折射研究',
    citationBrief: '精确阐明人眼角膜和晶状体复杂光学屈光系统，发明裂隙灯显微镜。',
    milestoneLevel: 3
  },

  // 1914-1918 一战年份
  {
    year: 1914,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['马克斯·冯·劳厄 (Max von Laue)'],
    discoveryTitle: '晶体对X射线的衍射现象',
    citationBrief: '证实X射线是超短波长电磁波，同时证实晶体内部原子的周期性三维点阵排列。',
    milestoneLevel: 1
  },
  {
    year: 1915,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['威廉·亨利·布拉格', '威廉·劳伦斯·布拉格 (布拉格父子)'],
    discoveryTitle: '用X射线分析晶体结构 (布拉格方程)',
    citationBrief: '父子同台获奖（儿子年仅25岁创史上纪录）。建立X射线晶体结构解析几何学。',
    milestoneLevel: 1
  },
  {
    year: 1915,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '一战爆发导致战火纷飞，根据《诺贝尔基金会章程》第4条暂缓评奖，奖金留入该奖项特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战战火阻断评选',
    citationBrief: '根据章程暂缓授奖。'
  },
  {
    year: 1916,
    discipline: 'physics',
    isAwarded: false,
    unawardedReason: '第一次世界大战激战正酣，中立国瑞典无法正常展开国际提名与学术评审，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战凡尔登战役与索姆河战役爆发',
    citationBrief: '一战期间全欧洲学术界割裂。'
  },
  {
    year: 1916,
    discipline: 'chemistry',
    isAwarded: false,
    unawardedReason: '一战期间全欧战火弥漫，各国提名信件阻绝，按章程停发留入特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战期间停发',
    citationBrief: '根据章程暂缓授奖。'
  },
  {
    year: 1916,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '一战战火波及全球，卡罗琳医学院无法获取全面提名，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战期间停发',
    citationBrief: '根据章程暂缓授奖。'
  },
  {
    year: 1917,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['查尔斯·巴克拉 (Charles Barkla)'],
    discoveryTitle: '发现元素的特征X射线辐射',
    citationBrief: '发现各化学元素受激发时产生独特的特征X射线K系与L系，印证原子核外电子层。',
    milestoneLevel: 2
  },
  {
    year: 1917,
    discipline: 'chemistry',
    isAwarded: false,
    unawardedReason: '一战期间提名成果不足，根据章程第4条奖金保留至特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战战火期间保留',
    citationBrief: '根据章程保留。'
  },
  {
    year: 1917,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '一战期间欧洲战况焦灼，卡罗琳医学院无法完成国际评审，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】一战战火期间保留',
    citationBrief: '根据章程保留。'
  },

  // 1918
  {
    year: 1918,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['马克斯·普朗克 (Max Planck)'],
    discoveryTitle: '能量量子假说与普朗克常数',
    citationBrief: '打破能量连续性经典信条，创立量子论 E = hν，开启量子物理新纪元。',
    milestoneLevel: 1,
    deepAwardId: '1918-planck'
  },
  {
    year: 1918,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['弗里茨·哈伯 (Fritz Haber)'],
    discoveryTitle: '高压催化合成氨工艺 (哈伯法)',
    citationBrief: '“空气中提炼化肥与炸药”，破解惰性氮气三键，养活全球数十亿人口。',
    milestoneLevel: 1,
    deepAwardId: '1918-haber'
  },

  // 1921 & 1922
  {
    year: 1921,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['阿尔伯特·爱因斯坦 (Albert Einstein)'],
    discoveryTitle: '光电效应定律与光量子假说',
    citationBrief: '因评委会争议过大在1921年暂缓授奖，于1922年补颁。赋予光以光子粒子性。',
    milestoneLevel: 1,
    deepAwardId: '1921-einstein'
  },
  {
    year: 1921,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['弗雷德里克·索迪 (Frederick Soddy)'],
    discoveryTitle: '同位素概念与放射性元素起源',
    citationBrief: '证实同一化学元素可存在质子数相同但原子量不同的同位素（Isotope）。',
    milestoneLevel: 2
  },
  {
    year: 1921,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '当年无候选人达到章程要求的绝对突破水准，奖金保留至特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】未达章程严苛门槛',
    citationBrief: '根据章程第4条奖金留入特别基金。'
  },
  {
    year: 1922,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['尼尔斯·玻尔 (Niels Bohr)'],
    discoveryTitle: '玻尔原子模型与量子化跃迁理论',
    citationBrief: '角动量量子化 L = nħ，跃迁发射单光子，完美破解氢原子线状光谱。',
    milestoneLevel: 1,
    deepAwardId: '1922-bohr'
  },
  {
    year: 1922,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['弗朗西斯·阿斯顿 (Francis W. Aston)'],
    discoveryTitle: '质谱仪发明与非放射性同位素发现',
    citationBrief: '发明同位素质谱仪，测量微小质量亏损，发现整齐的整数定则。',
    milestoneLevel: 2
  },
  {
    year: 1922,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['阿奇博尔德·希尔 (Archibald Hill)', '奥托·迈尔霍夫 (Otto Meyerhof)'],
    discoveryTitle: '肌肉产热与乳酸糖代谢机制',
    citationBrief: '揭示骨骼肌收缩能量热力学与糖酵解乳酸生成转换通路（迈尔霍夫途径）。',
    milestoneLevel: 2
  },

  // 1923
  {
    year: 1923,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['弗雷德里克·班廷', '约翰·麦克劳德'],
    discoveryTitle: '发现胰岛素并治疗糖尿病',
    citationBrief: '班廷以32岁创医学奖史上最年轻纪录！终结1型糖尿病等同死刑的绝望历史。',
    milestoneLevel: 1,
    deepAwardId: '1923-banting-macleod'
  },

  // 1929
  {
    year: 1929,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['路易·德布罗意 (Louis de Broglie)'],
    discoveryTitle: '实物粒子物质波假说 λ = h/p',
    citationBrief: '证实电子具备波动性，开启微观波粒二象性与现代电子显微镜物理。',
    milestoneLevel: 1,
    deepAwardId: '1929-de-broglie'
  },
  {
    year: 1929,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['克里斯蒂安·艾克曼', '弗雷德里克·霍普金斯'],
    discoveryTitle: '发现抗神经炎维生素（维生素B1）与必需生长素',
    citationBrief: '从米糠提取物证实脚气病系微量营养素缺乏，奠定现代维生素学说。',
    milestoneLevel: 2
  },

  // 1932-1935 量子黄金与中子
  {
    year: 1932,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['维尔纳·海森堡 (Werner Heisenberg)'],
    discoveryTitle: '创立矩阵力学与不确定性原理',
    citationBrief: '终结经典决定论宇宙观：位置与动量不可同时精确测量 Δx·Δp ≥ ħ/2。',
    milestoneLevel: 1,
    deepAwardId: '1932-heisenberg'
  },
  {
    year: 1933,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['埃尔温·薛定谔', '保罗·狄拉克'],
    discoveryTitle: '薛定谔波动方程与狄拉克相对论方程（预言反物质）',
    citationBrief: '薛定谔方程成为微观牛顿定律，狄拉克方程神奇预言正电子反物质。',
    milestoneLevel: 1,
    deepAwardId: '1933-schrodinger-dirac'
  },
  {
    year: 1935,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['詹姆斯·查德威克 (James Chadwick)'],
    discoveryTitle: '发现中子（原子核结构大门的钥匙）',
    citationBrief: '发现不带电荷的重亚原子中子，彻底破解核结构，为人工核裂变扫清障碍。',
    milestoneLevel: 1,
    deepAwardId: '1935-chadwick'
  },
  {
    year: 1935,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['弗雷德里克·约里奥-居里', '伊雷娜·约里奥-居里 (小居里夫妇)'],
    discoveryTitle: '合成人工放射性同位素',
    citationBrief: '居里家族第二代诺奖得主！α射线轰击铝靶合成放射性磷-30，开辟人工核素医疗。',
    milestoneLevel: 1
  },

  // 1940-1942 二战至暗全面停发
  {
    year: 1940,
    discipline: 'physics',
    isAwarded: false,
    unawardedReason: '二战全面爆发，挪威被纳粹德军占领，瑞典周边局势极其险恶，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战爆发与北欧战事封锁',
    citationBrief: '二战期间三大科学奖项全面停发。'
  },
  {
    year: 1940,
    discipline: 'chemistry',
    isAwarded: false,
    unawardedReason: '二战期间交通与学术联络断绝，按章程停发留入特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战爆发全面停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1940,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '二战期间战火封锁，卡罗琳医学院按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战爆发全面停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1941,
    discipline: 'physics',
    isAwarded: false,
    unawardedReason: '二战苏德战场与太平洋战争全面爆发，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战战火严苛封锁',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1941,
    discipline: 'chemistry',
    isAwarded: false,
    unawardedReason: '二战战局险恶，按章程第4条奖金保留归入基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战期间停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1941,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '二战战况白热化，按章程第4条停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战期间停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1942,
    discipline: 'physics',
    isAwarded: false,
    unawardedReason: '二战斯大林格勒战役与中途岛战役交战正烈，国际评审彻底瘫痪，按章程停发。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战最高潮期间停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1942,
    discipline: 'chemistry',
    isAwarded: false,
    unawardedReason: '二战期间停发，奖金留入特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战最高潮期间停发',
    citationBrief: '二战期间停发。'
  },
  {
    year: 1942,
    discipline: 'medicine',
    isAwarded: false,
    unawardedReason: '二战期间停发，奖金留入特别基金。',
    laureates: [],
    discoveryTitle: '【该年未颁奖】二战最高潮期间停发',
    citationBrief: '二战期间停发。'
  },

  // 1945
  {
    year: 1945,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['亚历山大·弗莱明', '恩斯特·钱恩', '霍华德·弗洛里'],
    discoveryTitle: '青霉素的发现及其对细菌感染的临床治愈效应',
    citationBrief: '现代抗生素时代的诞生！二战与战后拯救以亿计的重症细菌感染患者。',
    milestoneLevel: 1,
    deepAwardId: '1945-fleming-penicillin'
  },
  {
    year: 1945,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['沃尔夫冈·泡利 (Wolfgang Pauli)'],
    discoveryTitle: '泡利不相容原理',
    citationBrief: '微观全同费米子不能处于同一量子态，解释了元素周期律与恒星白矮星简并压。',
    milestoneLevel: 1
  },

  // 1950s
  {
    year: 1953,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['赫尔曼·施陶丁格 (Hermann Staudinger)'],
    discoveryTitle: '高分子聚合物概念的确立',
    citationBrief: '高分子科学之父。证明塑料和橡胶由共价键连接的长链大分子构成，点燃高分子工业。',
    milestoneLevel: 1
  },
  {
    year: 1954,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['莱纳斯·鲍林 (Linus Pauling)'],
    discoveryTitle: '化学键本质与杂化轨道理论',
    citationBrief: '结构化学奠基人。将量子力学成功引入分子化学，解释碳原子四面体杂化与α-螺旋。',
    milestoneLevel: 1,
    deepAwardId: '1954-pauling'
  },
  {
    year: 1956,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['肖克利', '巴丁', '布拉顿'],
    discoveryTitle: '半导体效应与晶体管的发明',
    citationBrief: '第三次工业革命基石。取代笨重真空管，引爆微电子集成电路与硅谷诞生。',
    milestoneLevel: 1,
    deepAwardId: '1956-transistor'
  },
  {
    year: 1957,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['李政道', '杨振宁'],
    discoveryTitle: '弱相互作用中宇称不守恒定律',
    citationBrief: '首批华人诺奖得主！推翻镜面对称教条，由吴健雄钴-60实验彻底确证。',
    milestoneLevel: 1,
    deepAwardId: '1957-lee-yang'
  },
  {
    year: 1958,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['弗雷德里克·桑格 (Frederick Sanger)'],
    discoveryTitle: '测定蛋白质（胰岛素）一级氨基酸完整序列',
    citationBrief: '桑格第一次获诺贝尔奖！首次证明蛋白质具有固定的一级分子化学序列。',
    milestoneLevel: 1
  },

  // 1962 DNA
  {
    year: 1962,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['沃森', '克里克', '威尔金斯'],
    discoveryTitle: 'DNA 分子双螺旋立体结构',
    citationBrief: '20世纪生命科学最伟大圣杯！碱基互补配对（A=T, G≡C）揭开生命遗传复制机制。',
    milestoneLevel: 1,
    deepAwardId: '1962-watson-crick-dna'
  },

  // 1964-1972
  {
    year: 1964,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['查尔斯·汤斯', '尼古拉·巴索夫', '亚历山大·普罗霍罗夫'],
    discoveryTitle: '量子电子学与激光 (LASER) 的发明',
    citationBrief: '“最亮的光、最准的尺”，实现受激辐射粒子数反转，催生现代光纤互联网。',
    milestoneLevel: 1,
    deepAwardId: '1964-townes-laser'
  },
  {
    year: 1965,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['理查德·费曼', '朱利安·施温格', '朝永振雄'],
    discoveryTitle: '量子电动力学 (QED) 与重整化理论',
    citationBrief: '人类物理学史上预言精度最高的理论（小数点后12位），发明直观易懂的费曼图。',
    milestoneLevel: 1,
    deepAwardId: '1965-feynman-qed'
  },
  {
    year: 1972,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['约翰·巴丁', '利昂·库珀', '约翰·施里弗'],
    discoveryTitle: 'BCS 超导微观量子理论',
    citationBrief: '巴丁成为史上唯一两次获得物理学奖的学者！揭示电子声子库珀对宏观凝聚机制。',
    milestoneLevel: 1,
    deepAwardId: '1972-bardeen-bcs'
  },

  // 1978-1993
  {
    year: 1978,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['阿诺·彭齐亚斯', '罗伯特·威尔逊', '彼得·卡皮察'],
    discoveryTitle: '发现宇宙微波背景辐射 (大爆炸余晖)',
    citationBrief: '确凿实证宇宙起源大爆炸理论，测得全天弥漫的约2.7K绝对黑体辐射。',
    milestoneLevel: 1,
    deepAwardId: '1978-penzias-wilson-cmb'
  },
  {
    year: 1980,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['保罗·伯格', '沃尔特·吉尔伯特', '弗雷德里克·桑格'],
    discoveryTitle: '重组DNA技术与核酸DNA快速测序方法',
    citationBrief: '桑格第二次荣获化学奖！开创双脱氧链终止法（桑格测序法），拉开人类基因组计划序幕。',
    milestoneLevel: 1
  },
  {
    year: 1986,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['恩斯特·鲁斯卡', '格尔德·宾尼希', '海因里希·罗雷尔'],
    discoveryTitle: '扫描隧道显微镜 (STM) 与电子光学显微镜',
    citationBrief: '利用量子隧穿效应，使人类历史上第一次能够实时“看见”并移动单个原子。',
    milestoneLevel: 1,
    deepAwardId: '1986-ruska-binnig-stm'
  },
  {
    year: 1993,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['凯利·穆利斯', '迈克尔·史密斯'],
    discoveryTitle: '发明聚合酶链式反应 (PCR 核酸分子复印机)',
    citationBrief: '数小时内将痕量DNA倍增数百万倍，彻底重塑现代分子诊断、刑侦法医与病毒检测。',
    milestoneLevel: 1,
    deepAwardId: '1993-mullis-pcr'
  },

  // 2000 - 至今 现代前沿
  {
    year: 2010,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['安德烈·海姆', '康斯坦丁·诺沃肖洛夫'],
    discoveryTitle: '剥离制备二维单原子层材料：石墨烯',
    citationBrief: '透明胶带法创造材料奇迹，展现零有效质量狄拉克费米子相对论电输运行为。',
    milestoneLevel: 2,
    deepAwardId: '2010-geim-graphene'
  },
  {
    year: 2013,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['彼得·希格斯', '弗朗索瓦·恩格勒'],
    discoveryTitle: '希格斯玻色子理论预测与实验发现',
    citationBrief: '解开万物质量起源谜团，大型强子对撞机在125 GeV处以5σ证实上帝粒子。',
    milestoneLevel: 1,
    deepAwardId: '2013-higgs-englert'
  },
  {
    year: 2015,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['屠呦呦', '威廉·坎贝尔', '大村智'],
    discoveryTitle: '发现抗疟疾新型特效药物：青蒿素',
    citationBrief: '首位中国本土女性科学家获诺奖！乙醚低温冷萃淬炼中药精华，拯救全球数百万疟疾患者。',
    milestoneLevel: 1,
    deepAwardId: '2015-tu-youyou-artemisinin'
  },
  {
    year: 2017,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['雷纳·韦斯', '巴里·巴里什', '基普·索恩'],
    discoveryTitle: 'LIGO 激光干涉仪直接探测到引力波',
    citationBrief: '爱因斯坦百年预言成真！在质子直径万分之一尺度上测出双黑洞并合时空涟漪。',
    milestoneLevel: 1,
    deepAwardId: '2017-ligo-gravitational-waves'
  },
  {
    year: 2018,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['詹姆斯·艾利森', '本庶佑'],
    discoveryTitle: '免疫检查点阻断肿瘤免疫疗法 (PD-1 / CTLA-4)',
    citationBrief: '肿瘤治疗第四次革命。解除免疫T细胞分子刹车，让自身免疫系统消灭晚期恶性肿瘤。',
    milestoneLevel: 1,
    deepAwardId: '2018-allison-honjo-immunotherapy'
  },
  {
    year: 2019,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['约翰·古迪纳夫', '斯坦利·惠廷厄姆', '吉野彰'],
    discoveryTitle: '发明高能量密度锂离子电池',
    citationBrief: '古迪纳夫以97岁创最年长纪录！打造可充电无线便携世界，赋能新能源汽车与移动互联。',
    milestoneLevel: 1,
    deepAwardId: '2019-goodenough-battery'
  },
  {
    year: 2020,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['埃马纽埃尔·沙尔庞捷', '珍妮弗·道德纳'],
    discoveryTitle: 'CRISPR-Cas9 基因组精确定点编辑方法 (基因剪刀)',
    citationBrief: '首个全女性组合获奖。以单碱基精度在活细胞重写DNA，彻底改变遗传病治疗。',
    milestoneLevel: 1,
    deepAwardId: '2020-doudna-crispr'
  },
  {
    year: 2020,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['罗杰·彭罗斯', '莱因哈德·根策尔', '安德烈娅·盖兹'],
    discoveryTitle: '黑洞形成的坚实广义相对论证明与银心超大质量黑洞',
    citationBrief: '彭罗斯奇点定理确立黑洞物理实在，自适应光学测定银心人马座A*黑洞轨道。',
    milestoneLevel: 1,
    deepAwardId: '2020-penrose-blackhole'
  },
  {
    year: 2022,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['阿兰·阿斯佩', '约翰·克劳泽', '安东·塞林格'],
    discoveryTitle: '纠缠光子实验、证实贝尔不等式破缺与量子信息',
    citationBrief: '确证“鬼魅般的超距作用”，证伪定域实在论，奠定量子隐形传态与量子计算根基。',
    milestoneLevel: 1,
    deepAwardId: '2022-quantum-entanglement'
  },
  {
    year: 2023,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['皮埃尔·阿戈斯蒂尼', '费伦茨·克劳斯', '安妮·吕利耶'],
    discoveryTitle: '阿秒光脉冲 (10⁻¹⁸秒) 捕捉电子超快运动',
    citationBrief: '创造人类迄今最狭窄的相干光频脉冲，打造抓拍原子内部电子瞬态跃迁的超高速闪光灯。',
    milestoneLevel: 2,
    deepAwardId: '2023-attosecond'
  },
  {
    year: 2023,
    discipline: 'medicine',
    isAwarded: true,
    laureates: ['卡塔林·考里科', '德鲁·韦斯曼'],
    discoveryTitle: '核苷酸碱基修饰与有效 mRNA 疫苗技术',
    citationBrief: '假尿嘧啶(Ψ)替换消除自杀性排异炎症，成就新冠mRNA疫苗并开创体内蛋白质药物新纪元。',
    milestoneLevel: 1,
    deepAwardId: '2023-kariko-weissman-mrna'
  },
  {
    year: 2024,
    discipline: 'physics',
    isAwarded: true,
    laureates: ['约翰·霍普菲尔德', '杰弗里·辛顿'],
    discoveryTitle: '人工神经网络与机器学习的统计物理学基础',
    citationBrief: '物理学与AI世纪会师！将磁性自旋玻璃伊辛模型与玻尔兹曼能量分布移植至深度学习大模型。',
    milestoneLevel: 1,
    deepAwardId: '2024-physics-ai'
  },
  {
    year: 2024,
    discipline: 'chemistry',
    isAwarded: true,
    laureates: ['戴维·贝克', '德米斯·哈萨比斯', '约翰·江珀'],
    discoveryTitle: '计算蛋白质设计与 AlphaFold 蛋白质三维结构预测',
    citationBrief: '攻克50年折叠圣杯！端到端AI注意力网络直接从氨基酸序列预测2亿已知蛋白质立体构型。',
    milestoneLevel: 1,
    deepAwardId: '2024-baker-hassabis-alphafold'
  }
];
