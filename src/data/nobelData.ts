import { NobelAward, PrizeDiscipline } from '../types';

export const DISCIPLINE_LABELS: Record<PrizeDiscipline, { label: string; short: string; desc: string; color: string; badge: string }> = {
  physics: {
    label: '诺贝尔物理学奖',
    short: '物理学',
    desc: '从微观量子到时空引力的终极法则',
    color: 'text-amber-400',
    badge: 'border-amber-500/40 text-amber-300 bg-amber-500/10'
  },
  chemistry: {
    label: '诺贝尔化学奖',
    short: '化学',
    desc: '分子合成、化学键本质与生命分子机器',
    color: 'text-emerald-400',
    badge: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
  },
  medicine: {
    label: '生理学或医学奖',
    short: '生理或医学',
    desc: 'DNA遗传密码、免疫防线与疾病攻克',
    color: 'text-rose-400',
    badge: 'border-rose-500/40 text-rose-300 bg-rose-500/10'
  }
};

export const CATEGORY_LABELS: Record<string, { label: string; desc: string; color: string; bgBadge: string }> = {
  // 物理学
  quantum: {
    label: '量子物理',
    desc: '波粒二象性、量子力学、量子场论与纠缠态',
    color: 'text-cyan-400',
    bgBadge: 'border-cyan-500/30 text-cyan-300'
  },
  relativity_astronomy: {
    label: '相对论与天体宇宙',
    desc: '黑洞、引力波、大爆炸微波背景与星系结构',
    color: 'text-amber-400',
    bgBadge: 'border-amber-500/30 text-amber-300'
  },
  particle_high_energy: {
    label: '粒子与高能物理',
    desc: '宇称不守恒、夸克、标准模型与希格斯机制',
    color: 'text-violet-400',
    bgBadge: 'border-violet-500/30 text-violet-300'
  },
  condensed_matter: {
    label: '凝聚态与材料物理',
    desc: '晶体管、超导理论、石墨烯、显微术与AI物理',
    color: 'text-emerald-400',
    bgBadge: 'border-emerald-500/30 text-emerald-300'
  },
  optics_photonics: {
    label: '光学与激光物理',
    desc: 'X射线、激光技术、光电效应与阿秒脉冲',
    color: 'text-rose-400',
    bgBadge: 'border-rose-500/30 text-rose-300'
  },
  atomic_nuclear: {
    label: '原子与核物理',
    desc: '放射性、电子、中子、玻尔原子结构',
    color: 'text-blue-400',
    bgBadge: 'border-blue-500/30 text-blue-300'
  },

  // 化学
  organic_chemistry: {
    label: '有机合成与天然产物',
    desc: '复杂分子构建、不对称催化与合成方法学',
    color: 'text-teal-400',
    bgBadge: 'border-teal-500/30 text-teal-300'
  },
  biochemistry_molecular: {
    label: '生物化学与基因工具',
    desc: 'CRISPR基因剪刀、DNA测序与分子生物学反应',
    color: 'text-emerald-400',
    bgBadge: 'border-emerald-500/30 text-emerald-300'
  },
  physical_chemistry: {
    label: '物理化学与动力学',
    desc: '化学键本质、渗透压、活化能与催化动力学',
    color: 'text-sky-400',
    bgBadge: 'border-sky-500/30 text-sky-300'
  },
  inorganic_materials: {
    label: '材料化学与能源存储',
    desc: '锂离子电池、导电高分子与超分子自组装',
    color: 'text-yellow-400',
    bgBadge: 'border-yellow-500/30 text-yellow-300'
  },
  computational_ai_chemistry: {
    label: '计算化学与AI生命设计',
    desc: 'AlphaFold蛋白质三维结构预测与计算蛋白质设计',
    color: 'text-indigo-400',
    bgBadge: 'border-indigo-500/30 text-indigo-300'
  },
  analytical_instrumental: {
    label: '分析化学与谱学',
    desc: '质谱、色谱与超高分辨率荧光显微成像',
    color: 'text-lime-400',
    bgBadge: 'border-lime-500/30 text-lime-300'
  },

  // 生理学或医学
  genetics_dna: {
    label: '遗传学与分子医学',
    desc: 'DNA双螺旋、染色体端粒与基因表达调控',
    color: 'text-rose-400',
    bgBadge: 'border-rose-500/30 text-rose-300'
  },
  immunology_vaccines: {
    label: '免疫学与疫苗技术',
    desc: 'mRNA疫苗、抗体特异性与免疫检查点肿瘤阻断',
    color: 'text-fuchsia-400',
    bgBadge: 'border-fuchsia-500/30 text-fuchsia-300'
  },
  neuroscience: {
    label: '神经科学与认知',
    desc: '动作电位离子通道、突触传递与大脑空间定位系统',
    color: 'text-purple-400',
    bgBadge: 'border-purple-500/30 text-purple-300'
  },
  infectious_antibiotics: {
    label: '传染病与药物发现',
    desc: '青霉素、青蒿素、抗寄生虫与病原体杀灭',
    color: 'text-pink-400',
    bgBadge: 'border-pink-500/30 text-pink-300'
  },
  cellular_metabolism: {
    label: '细胞生物与代谢机理',
    desc: '细胞自噬循环、程序性凋亡、三羧酸循环与缺氧感知',
    color: 'text-orange-400',
    bgBadge: 'border-orange-500/30 text-orange-300'
  },
  diagnostic_imaging: {
    label: '生理诊断与影像技术',
    desc: '核磁共振成像 (MRI)、心电图与CT断层成像',
    color: 'text-cyan-400',
    bgBadge: 'border-cyan-500/30 text-cyan-300'
  }
};

export const ERA_LABELS: Record<string, { title: string; subtitle: string; range: string }> = {
  '1901-1920': {
    title: '经典迈向近代',
    subtitle: 'X射线、原子蜕变、抗毒素血清与渗透压',
    range: '1901 - 1920'
  },
  '1921-1945': {
    title: '量子革命与抗生素黎明',
    subtitle: '光电效应、波粒二象性、胰岛素与青霉素神药',
    range: '1921 - 1945'
  },
  '1946-1970': {
    title: '分子生物与电子时代',
    subtitle: '晶体管、DNA双螺旋结构、化学键与动作电位',
    range: '1946 - 1970'
  },
  '1971-1999': {
    title: '基因重组与微观深空',
    subtitle: 'DNA快速测序、PCR聚合酶链反应与宇宙微波背景',
    range: '1971 - 1999'
  },
  '2000-now': {
    title: '极端前沿、基因剪刀与AI革命',
    subtitle: 'CRISPR、mRNA疫苗、引力波、锂电池与AlphaFold',
    range: '2000 - 至今'
  }
};

export const NOBEL_AWARDS: NobelAward[] = [
  // ==================== 物理学奖 (PHYSICS) ====================
  {
    id: '1901-rontgen',
    year: 1901,
    discipline: 'physics',
    discoveryTitle: '发现X射线 (伦琴射线)',
    laureates: [
      {
        name: '威廉·康拉德·伦琴',
        nativeName: 'Wilhelm Conrad Röntgen',
        country: '德国',
        birthDeath: '1845 - 1923',
        affiliation: '慕尼黑大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他在发现后来以他的名字命名的非凡射线所作出的杰出贡献。',
    citationEn: 'In recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him.',
    category: 'optics_photonics',
    era: '1901-1920',
    summary: '首届诺贝尔物理学奖。穿透黑纸与人体的神秘电磁波，拉开近现代医学影像透视与微观晶体衍射探测的序幕。',
    historicalContext: '19世纪末放电管实验普及，多人观察到底片偶发感光，唯有伦琴彻底封阻光线深入探究其不可见的穿透本性。',
    breakthroughMethod: '用黑纸板彻底罩住克鲁克斯放电管，发现一米外的荧光屏依然发光，并拍下了历史上第一张清晰显现骨骼的手部X光片。',
    modernApplication: '医疗X光透视、CT计算机断层扫描、DNA双螺旋晶体学衍射验证、机场安检探伤。',
    keyFormula: {
      latex: 'E = h\\nu = hc/\\lambda',
      label: '高能光子波长与能量公式',
      explanation: 'X射线波长仅在0.01~10纳米，单光子能量极高足以穿透软组织。'
    },
    trivia: '伦琴坚决拒绝为X射线申请任何专利，并放弃全部奖金，认为这项发现应无偿献给全人类。',
    milestoneLevel: 1,
    tags: ['X射线', '医学成像', '电磁辐射', '首届诺奖']
  },
  {
    id: '1903-becquerel-curie',
    year: 1903,
    discipline: 'physics',
    discoveryTitle: '天然放射性的发现与镭、钋元素的分离',
    laureates: [
      {
        name: '亨利·贝克勒尔',
        nativeName: 'Henri Becquerel',
        country: '法国',
        birthDeath: '1852 - 1908',
        affiliation: '巴黎综合理工学院',
        share: '1/2'
      },
      {
        name: '皮埃尔·居里',
        nativeName: 'Pierre Curie',
        country: '法国',
        birthDeath: '1859 - 1906',
        affiliation: '巴黎大学',
        share: '1/4'
      },
      {
        name: '玛丽·居里',
        nativeName: 'Marie Curie',
        country: '法国 / 波兰',
        birthDeath: '1867 - 1934',
        affiliation: '巴黎大学',
        share: '1/4'
      }
    ],
    citationZh: '表彰贝克勒尔发现自发放射性，以及居里夫妇在深入研究放射性辐射现象方面作出的杰出贡献。',
    citationEn: 'In recognition of the extraordinary services rendered by his discovery of spontaneous radioactivity, and of the joint services rendered by Pierre and Marie Curie.',
    category: 'atomic_nuclear',
    era: '1901-1920',
    summary: '揭开原子自发衰变能量的神秘面纱。居里夫人成为史上首位女性诺奖得主，打破了“原子永恒不可分割”的神话。',
    historicalContext: '经典物理视原子为不可变化的坚硬小球，贝克勒尔偶然发现铀盐即使不见日光也能使底片黑化。',
    breakthroughMethod: '在漏风简陋木棚中用压电石英静电计测试微弱电离，手工提炼数吨沥青矿渣分离出镭与钋。',
    modernApplication: '核能发电、肿瘤放射治疗、碳-14考古年代测定。',
    milestoneLevel: 1,
    tags: ['居里夫人', '放射性', '原子核', '首位女得主']
  },
  {
    id: '1918-planck',
    year: 1918,
    discipline: 'physics',
    discoveryTitle: '能量量子假说与普朗克常数',
    laureates: [
      {
        name: '马克斯·普朗克',
        nativeName: 'Max Planck',
        country: '德国',
        birthDeath: '1858 - 1947',
        affiliation: '柏林大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他发现能量量子，从而对物理学的进步作出了重大贡献。',
    citationEn: 'In recognition of the services he rendered to the advancement of Physics by his discovery of energy quanta.',
    category: 'quantum',
    era: '1901-1920',
    summary: '量子力学诞生日（1900年12月）。打破能量连续变化假设，引入普朗克常数 h，开启微观物理学新纪元。',
    historicalContext: '19世纪末经典黑体辐射理论预测高频处能量发散（“紫外灾难”）。',
    breakthroughMethod: '为了完美拟合实验黑体辐射谱线，假设能量由不可分割的单份量子 ε = hν 构成。',
    modernApplication: '半导体芯片、光电传感器、量子计算、激光通信。',
    keyFormula: {
      latex: 'E = n \\cdot h \\nu \\quad (h \\approx 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s})',
      label: '普朗克能量量子公式',
      explanation: '辐射能量是以离散基本包为单位吸收和发射的。'
    },
    milestoneLevel: 1,
    tags: ['普朗克常数', '能量量子', '黑体辐射', '量子之父']
  },
  {
    id: '1921-einstein',
    year: 1921,
    discipline: 'physics',
    discoveryTitle: '光电效应定律与光量子假说',
    laureates: [
      {
        name: '阿尔伯特·爱因斯坦',
        nativeName: 'Albert Einstein',
        country: '德国 / 瑞士',
        birthDeath: '1879 - 1955',
        affiliation: '柏林威廉皇帝物理研究所',
        share: '1/1'
      }
    ],
    citationZh: '表彰他对理论物理学的贡献，特别是发现了光电效应定律。',
    citationEn: 'For his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect.',
    category: 'quantum',
    era: '1921-1945',
    summary: '爱因斯坦并未因相对论直接获诺奖，而是凭光电效应获此殊荣。他赋予光以粒子实体（光子），奠定波粒二象性基石。',
    historicalContext: '经典波动说认为强光持续照耀必然能击出电子，然而实验证明若光频低于截止阈值，哪怕强光照几天也没有丝毫电流。',
    breakthroughMethod: '提出光本身在空间中以局域光量子（光子）传播，单电子瞬时吸收单光子：Ek = hν - W0。',
    modernApplication: '数码相机CMOS感光芯片、太阳能光伏发电板、夜视仪、扫码枪。',
    keyFormula: {
      latex: 'E_k = h\\nu - W_0 = e \\cdot V_{\\text{stop}}',
      label: '爱因斯坦光电效应方程',
      explanation: '光电子最大初动能等于单光子能量减去金属材料逸出功。'
    },
    interactiveSimulationId: 'photoelectric',
    milestoneLevel: 1,
    tags: ['光电效应', '光量子', '爱因斯坦', '波粒二象性']
  },
  {
    id: '1922-bohr',
    year: 1922,
    discipline: 'physics',
    discoveryTitle: '玻尔原子模型与量子化跃迁理论',
    laureates: [
      {
        name: '尼尔斯·玻尔',
        nativeName: 'Niels Bohr',
        country: '丹麦',
        birthDeath: '1885 - 1962',
        affiliation: '哥本哈根大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他对原子结构和从原子发出的辐射的研究。',
    citationEn: 'For his services in the investigation of the structure of atoms and of the radiation emanating from them.',
    category: 'atomic_nuclear',
    era: '1921-1945',
    summary: '提出玻尔原子模型：定态轨道电子不辐射能量，跃迁发射特定频率单光子，完美解释氢原子光谱线。',
    historicalContext: '经典电动力学认为绕核旋转的加速带电电子会在微秒内辐射尽能量坠入原子核，无法解释原子稳定性。',
    breakthroughMethod: '引入角动量量子化 L = nħ，结合跃迁假设 ΔE = hν 算出分立氢原子能级。',
    modernApplication: '激光器受激辐射、天体光谱分析、荧光显微术、LED发光器件。',
    keyFormula: {
      latex: 'E_n = -\\frac{13.6\\text{ eV}}{n^2}, \\quad h\\nu = E_i - E_f',
      label: '玻尔能级与辐射跃迁公式',
      explanation: '主量子数决定轨道能级，跃迁能量差决定释放光子的波长。'
    },
    interactiveSimulationId: 'bohr_atom',
    milestoneLevel: 1,
    tags: ['玻尔模型', '原子能级', '光谱线', '哥本哈根学派']
  },
  {
    id: '1929-de-broglie',
    year: 1929,
    discipline: 'physics',
    discoveryTitle: '物质波与实物粒子的波粒二象性',
    laureates: [
      {
        name: '路易·德布罗意',
        nativeName: 'Louis de Broglie',
        country: '法国',
        birthDeath: '1892 - 1987',
        affiliation: '巴黎大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他发现了电子的波动性。',
    citationEn: 'For his discovery of the wave nature of electrons.',
    category: 'quantum',
    era: '1921-1945',
    summary: '“一切实物粒子皆有波长”。将光的波粒二象性对称拓展到电子乃至所有宏观物体，引爆波动力学。',
    historicalContext: '经典物理严格割裂粒子与波动；光具备动量后，电子等实物粒子是否也能展现干涉衍射？',
    breakthroughMethod: '在博士论文中推导公式 λ = h/p；戴维孙-革末实验证实了电子晶格衍射斑点。',
    modernApplication: '透射电子显微镜（TEM，分辨率达原子级）、中子衍射晶体学。',
    keyFormula: {
      latex: '\\lambda = \\frac{h}{p} = \\frac{h}{m \\cdot v}',
      label: '德布罗意物质波波长',
      explanation: '物质波波长反比于其动量，质量微小的电子波长显著表现为波动衍射。'
    },
    interactiveSimulationId: 'double_slit',
    milestoneLevel: 1,
    tags: ['物质波', '德布罗意', '波粒二象性', '电子显微镜']
  },
  {
    id: '1956-transistor',
    year: 1956,
    discipline: 'physics',
    discoveryTitle: '半导体效应与晶体管的发明',
    laureates: [
      {
        name: '威廉·肖克利',
        nativeName: 'William Shockley',
        country: '美国',
        birthDeath: '1910 - 1989',
        affiliation: '贝尔实验室',
        share: '1/3'
      },
      {
        name: '约翰·巴丁',
        nativeName: 'John Bardeen',
        country: '美国',
        birthDeath: '1908 - 1991',
        affiliation: '伊利诺伊大学 / 贝尔实验室',
        share: '1/3'
      },
      {
        name: '沃尔特·布拉顿',
        nativeName: 'Walter Brattain',
        country: '美国',
        birthDeath: '1902 - 1987',
        affiliation: '贝尔实验室',
        share: '1/3'
      }
    ],
    citationZh: '表彰他们对半导体的研究以及对晶体管效应的发现。',
    citationEn: 'For their researches on semiconductors and their discovery of the transistor effect.',
    category: 'condensed_matter',
    era: '1946-1970',
    summary: '第三次工业信息革命基石。取代笨重发热的真空电子管，引爆硅谷诞生与集成电路芯片时代。',
    historicalContext: '早期计算机如ENIAC依赖近2万只易损真空管，占满整屋且故障频频，亟需固态电子开关。',
    breakthroughMethod: '在锗晶体上利用金箔微触点实现电流放大，肖克利提出PN结少数载流子注入机理。',
    modernApplication: '所有CPU/GPU微芯片（单颗容纳数百亿晶体管）、计算机内存、智能手机。',
    milestoneLevel: 1,
    tags: ['晶体管', '半导体', '芯片革命', '硅谷诞生']
  },
  {
    id: '2013-higgs-englert',
    year: 2013,
    discipline: 'physics',
    discoveryTitle: '希格斯机制与“上帝粒子”的发现',
    laureates: [
      {
        name: '弗朗索瓦·恩格勒',
        nativeName: 'François Englert',
        country: '比利时',
        birthDeath: '1932 - ',
        affiliation: '布鲁塞尔自由大学',
        share: '1/2'
      },
      {
        name: '彼得·希格斯',
        nativeName: 'Peter Higgs',
        country: '英国',
        birthDeath: '1929 - 2024',
        affiliation: '爱丁堡大学',
        share: '1/2'
      }
    ],
    citationZh: '表彰他们在理论上发现了一种有助于我们理解亚原子粒子质量起源的机制，最近欧洲核子研究中心大型强子对撞机证实了该机制。',
    citationEn: 'For the theoretical discovery of a mechanism that contributes to our understanding of the origin of mass of subatomic particles.',
    category: 'particle_high_energy',
    era: '2000-now',
    summary: '基本粒子质量起源的物理答案。粒子穿梭在自发破缺的希格斯场中获得惯性质量。',
    historicalContext: '标准模型规范对称性要求粒子静止质量必须为零，无法解释弱玻色子与夸克真实质量。',
    breakthroughMethod: '1964年预言希格斯机制；2012年CERN大型强子对撞机以5σ在125 GeV处确凿探测到希格斯玻色子。',
    modernApplication: '电弱统一机制深层解析、早期宇宙暴胀相变模型。',
    interactiveSimulationId: 'lhc_higgs',
    milestoneLevel: 1,
    tags: ['希格斯粒子', '上帝粒子', 'LHC', '标准模型']
  },
  {
    id: '2017-ligo-gravitational-waves',
    year: 2017,
    discipline: 'physics',
    discoveryTitle: 'LIGO 激光干涉仪直接探测到引力波',
    laureates: [
      {
        name: '雷纳·韦斯',
        nativeName: 'Rainer Weiss',
        country: '美国',
        birthDeath: '1932 - ',
        affiliation: '麻省理工学院',
        share: '1/2'
      },
      {
        name: '巴里·巴里什',
        nativeName: 'Barry C. Barish',
        country: '美国',
        birthDeath: '1936 - ',
        affiliation: '加州理工学院',
        share: '1/4'
      },
      {
        name: '基普·索恩',
        nativeName: 'Kip S. Thorne',
        country: '美国',
        birthDeath: '1940 - ',
        affiliation: '加州理工学院',
        share: '1/4'
      }
    ],
    citationZh: '表彰他们对LIGO探测器和引力波观测做出的决定性贡献。',
    citationEn: 'For decisive contributions to the LIGO detector and the observation of gravitational waves.',
    category: 'relativity_astronomy',
    era: '2000-now',
    summary: '爱因斯坦百年预言成真！捕捉13亿年前双黑洞并合激荡的时空涟漪，开创引力波天文学。',
    historicalContext: '爱因斯坦1916年预言引力波，但其空间形变极度微弱（仅10⁻²¹），曾被认为人类无法测得。',
    breakthroughMethod: '建造4公里超高精迈克尔逊激光干涉仪，在质子直径万分之一尺度上测出时空形变。',
    modernApplication: '多信使天文学巡天、双中子星并合与宇宙黄金铂金重元素起源。',
    interactiveSimulationId: 'gravitational_waves',
    milestoneLevel: 1,
    tags: ['引力波', 'LIGO', '双黑洞碰撞', '广义相对论']
  },

  // ==================== 化学奖 (CHEMISTRY) ====================
  {
    id: '1901-van-t-hoff',
    year: 1901,
    discipline: 'chemistry',
    discoveryTitle: '化学动力学与溶液渗透压定律',
    laureates: [
      {
        name: '雅各布斯·范特霍夫',
        nativeName: 'Jacobus Henricus van \'t Hoff',
        country: '荷兰',
        birthDeath: '1852 - 1911',
        affiliation: '柏林大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他发现了化学动力学法则和溶液渗透压定律所作出的卓越贡献。',
    citationEn: 'In recognition of the extraordinary services he has rendered by the discovery of the laws of chemical dynamics and of the osmotic pressure in solutions.',
    category: 'physical_chemistry',
    era: '1901-1920',
    summary: '首届诺贝尔化学奖。确立物理化学学科基石，发现稀溶液渗透压与理想气体状态方程具有高度一致的数学形式。',
    historicalContext: '19世纪化学主要是定性经验描述，缺乏严谨热力学和分子动力学定量方程。',
    breakthroughMethod: '建立半透膜渗透压测量模型，将热力学第二定律系统应用于化学平衡与反应速率。',
    modernApplication: '海水反渗透淡化、医用静脉生理盐水配制、药物缓释膜技术。',
    keyFormula: {
      latex: '\\Pi = c \\cdot R \\cdot T',
      label: '范特霍夫渗透压公式',
      explanation: '稀溶液渗透压与溶质摩尔浓度及绝对温度成正比，形式等价于理想气体状态方程。'
    },
    milestoneLevel: 1,
    tags: ['首届化学奖', '渗透压', '物理化学', '化学平衡']
  },
  {
    id: '1911-curie-chem',
    year: 1911,
    discipline: 'chemistry',
    discoveryTitle: '分离出纯金属镭与钋的化学性质研究',
    laureates: [
      {
        name: '玛丽·居里',
        nativeName: 'Marie Curie',
        country: '法国 / 波兰',
        birthDeath: '1867 - 1934',
        affiliation: '索邦大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰她发现镭和钋元素，分离出镭并研究了这种非凡元素的性质及其化合物，从而促进了化学的发展。',
    citationEn: 'In recognition of her services to the advancement of chemistry by the discovery of the elements radium and polonium, by the isolation of radium and the study of the nature and compounds of this remarkable element.',
    category: 'inorganic_materials',
    era: '1901-1920',
    summary: '历史上首位且唯一一位在两个不同自然科学领域（物理学与化学）均荣获诺贝尔奖的科学巨人！',
    historicalContext: '1903年获奖后，怀疑者认为镭可能只是钡的含杂化合物，居里夫人决心提炼出纯金属状态的单质镭。',
    breakthroughMethod: '通过汞齐电解法与分步分级结晶，成功制得纯金属镭，并精确测定其原子量为226。',
    modernApplication: '医用近距离放疗放射源、工业放射性探伤、核化学。',
    trivia: '居里夫人在一战期间自费改装了20辆配备X射线机的“小居里（Petites Curies）”救护车，亲自开往一战前线拯救了上百万伤兵。',
    milestoneLevel: 1,
    tags: ['居里夫人', '双诺奖', '金属镭', '核化学传奇']
  },
  {
    id: '1918-haber',
    year: 1918,
    discipline: 'chemistry',
    discoveryTitle: '高压催化合成氨工艺 (哈伯法)',
    laureates: [
      {
        name: '弗里茨·哈伯',
        nativeName: 'Fritz Haber',
        country: '德国',
        birthDeath: '1868 - 1934',
        affiliation: '柏林威廉皇帝物理化学学会',
        share: '1/1'
      }
    ],
    citationZh: '表彰他对从单质气体中合成氨的研究。',
    citationEn: 'For the synthesis of ammonia from its elements.',
    category: 'physical_chemistry',
    era: '1901-1920',
    summary: '“从空气中提炼面包与炸药”。破解氮气三键极高化学惰性，制造合成化肥，养活了全球近半数现代人口。',
    historicalContext: '天然智利硝石资源面临枯竭，人类面临全球粮食饥荒风险，空气中占78%的氮气分子由于键能过高难以转化为可吸收态。',
    breakthroughMethod: '利用铁系催化剂在高压（200个大气压）与中高温（450℃）下逆转平衡速率折衷，实现工业化连续流 N2 + 3H2 ⇌ 2NH3。',
    modernApplication: '现代氮肥（尿素、硝铵）、合成纤维化纤工业、绿色氨氢能存储载体。',
    keyFormula: {
      latex: '\\text{N}_2 + 3\\text{H}_2 \\xrightleftharpoons[450^\\circ\\text{C},\\, 20\\text{MPa}]{\\text{Fe}} 2\\text{NH}_3, \\quad \\Delta H = -92.4\\text{ kJ/mol}',
      label: '哈伯-博施合成氨热化学反应',
      explanation: '放热体积缩小反应，高压有利于平衡右移，催化剂大幅降低极高活化能壁垒。'
    },
    milestoneLevel: 1,
    tags: ['合成氨', '化肥革命', '工业催化', '哈伯法']
  },
  {
    id: '1954-pauling',
    year: 1954,
    discipline: 'chemistry',
    discoveryTitle: '化学键本质与杂化轨道理论',
    laureates: [
      {
        name: '莱纳斯·鲍林',
        nativeName: 'Linus Pauling',
        country: '美国',
        birthDeath: '1901 - 1994',
        affiliation: '加州理工学院',
        share: '1/1'
      }
    ],
    citationZh: '表彰他对化学键本质的研究及其在阐明复杂物质结构方面的应用。',
    citationEn: 'For his research into the nature of the chemical bond and its application to the elucidation of the structure of complex substances.',
    category: 'physical_chemistry',
    era: '1946-1970',
    summary: '现代结构化学奠基人。将量子力学成功引入分子化学，提出sp3杂化轨道与电负性标度，后来又荣获诺贝尔和平奖。',
    historicalContext: '经典路易斯共价键无法解释碳原子的四面体等价立体空间构型及共轭分子的超强稳定性。',
    breakthroughMethod: '量子波函数线性叠加原理构建杂化轨道（Hybrid Orbitals）与共振论（Resonance），预测蛋白质α螺旋结构。',
    modernApplication: '药物分子构效三维设计、合成材料分子骨架解析、超分子化学。',
    milestoneLevel: 1,
    tags: ['化学键', '杂化轨道', '鲍林', '结构化学']
  },
  {
    id: '1993-mullis-pcr',
    year: 1993,
    discipline: 'chemistry',
    discoveryTitle: '发明聚合酶链式反应 (PCR 核酸分子复印机)',
    laureates: [
      {
        name: '凯利·穆利斯',
        nativeName: 'Kary B. Mullis',
        country: '美国',
        birthDeath: '1944 - 2019',
        affiliation: 'Cetus 公司',
        share: '1/2'
      },
      {
        name: '迈克尔·史密斯',
        nativeName: 'Michael Smith',
        country: '加拿大',
        birthDeath: '1932 - 2000',
        affiliation: '不列颠哥伦比亚大学',
        share: '1/2'
      }
    ],
    citationZh: '表彰他们为以DNA为基础的化学方法发展所作的贡献，特别是穆利斯发明了聚合酶链式反应（PCR）方法。',
    citationEn: 'For his invention of the polymerase chain reaction (PCR) method.',
    category: 'biochemistry_molecular',
    era: '1971-1999',
    summary: '分子生物学的“复印机”。能够在几小时内将单分子痕量 DNA 扩增数百万倍，彻底改变了现代分子医学与刑侦法医学。',
    historicalContext: '以前要克隆放大特定微量基因片段，需费时数周在宿主细菌质粒中培养筛选，效率极低且无法用于法医微量样本。',
    breakthroughMethod: '设计热循环方案：高温变性（94℃解链）→ 低温退火（引物结合）→ 中温延伸（耐热Taq酶复制），2^n 指数级倍增。',
    modernApplication: '核酸病毒快速检测、法医DNA亲子鉴定与现场物证分析、古生物化石古DNA提取、基因测序建库。',
    keyFormula: {
      latex: 'N_n = N_0 \\times 2^n \\quad (n \\approx 30\\text{ cycles} \\implies \\sim 10^9\\text{-fold increase})',
      label: 'PCR 扩增产物指数增长公式',
      explanation: '经过30个循环的反复热循环扩增，初始微量模板DNA放大逾十亿倍。'
    },
    milestoneLevel: 1,
    tags: ['PCR', '核酸扩增', '法医物证', '分子生物学']
  },
  {
    id: '2019-goodenough-battery',
    year: 2019,
    discipline: 'chemistry',
    discoveryTitle: '发明高能量密度锂离子电池',
    laureates: [
      {
        name: '约翰·B·古迪纳夫',
        nativeName: 'John B. Goodenough',
        country: '美国',
        birthDeath: '1922 - 2023',
        affiliation: '德克萨斯大学奥斯汀分校',
        share: '1/3'
      },
      {
        name: 'M·斯坦利·惠廷厄姆',
        nativeName: 'M. Stanley Whittingham',
        country: '英国 / 美国',
        birthDeath: '1941 - ',
        affiliation: '纽约州立大学宾汉姆顿分校',
        share: '1/3'
      },
      {
        name: '吉野彰',
        nativeName: 'Akira Yoshino',
        country: '日本',
        birthDeath: '1948 - ',
        affiliation: '旭化成公司 / 名城大学',
        share: '1/3'
      }
    ],
    citationZh: '表彰他们在锂离子电池研发方面作出的卓越贡献。',
    citationEn: 'For the development of lithium-ion batteries.',
    category: 'inorganic_materials',
    era: '2000-now',
    summary: '创造可充电便携世界的动力核心。摆脱化石燃料电缆束缚，赋能全球智能手机、笔记本电脑与新能源电动汽车。',
    historicalContext: '早期金属锂电池在充放电循环中极易生长锂枝晶刺破隔膜，发生短路起火爆炸；铅酸与镍镉电池能量密度极低且污染沉重。',
    breakthroughMethod: '惠廷厄姆开创二硫化钛层状嵌入正极；古迪纳夫在97岁高龄前发明钴酸锂与磷酸铁锂正极；吉野彰引入石油焦碳负极解决安全性。',
    modernApplication: '新能源电动汽车（特斯拉/比亚迪）、便携智能消费电子、风电太阳能大规模电网储能。',
    keyFormula: {
      latex: '\\text{LiCoO}_2 + \\text{C}_6 \\xrightleftharpoons[\\text{放电}]{\\text{充电}} \\text{Li}_{1-x}\\text{CoO}_2 + \\text{Li}_x\\text{C}_6',
      label: '摇椅式锂离子电池电化学充放电方程',
      explanation: '锂离子在正负极层状晶格间可逆脱嵌穿梭，避免金属锂结晶析出。'
    },
    trivia: '古迪纳夫以97岁高龄获奖，成为诺贝尔奖历史上最年长的获奖者。他生前常说：“不要太早退休！人类必须找到摆脱化石能源的洁净方案。”',
    milestoneLevel: 1,
    tags: ['锂电池', '新能源', '古迪纳夫', '储能革命']
  },
  {
    id: '2020-doudna-crispr',
    year: 2020,
    discipline: 'chemistry',
    discoveryTitle: 'CRISPR-Cas9 基因组精确定点编辑方法 (基因剪刀)',
    laureates: [
      {
        name: '埃马纽埃尔·沙尔庞捷',
        nativeName: 'Emmanuelle Charpentier',
        country: '法国',
        birthDeath: '1968 - ',
        affiliation: '马克斯·普朗克病原学研究所',
        share: '1/2'
      },
      {
        name: '珍妮弗·道德纳',
        nativeName: 'Jennifer A. Doudna',
        country: '美国',
        birthDeath: '1964 - ',
        affiliation: '加州大学伯克利分校',
        share: '1/2'
      }
    ],
    citationZh: '表彰她们开发了一种基因组编辑方法。',
    citationEn: 'For the development of a method for genome editing.',
    category: 'biochemistry_molecular',
    era: '2000-now',
    summary: '历史上首个全女性获奖组合。重写生命之书的终极剪刀：以近乎单碱基精度在活细胞 DNA 任意指定位点实施剪切、敲除与修复。',
    historicalContext: '此前锌指核酸酶（ZFN）和TALEN设计周期长、成本高昂且脱靶率大，生命科学急需一种廉价、可编程的分子手术刀。',
    breakthroughMethod: '利用细菌古老适应性免疫防御机制，人工合成为一条单向导RNA（sgRNA），引导 Cas9 核酸内切酶精准定位到目标 DNA 产生双链断裂。',
    modernApplication: '遗传性疾病治疗（地中海贫血、镰刀型贫血症首个CRISPR药物获批）、农作物高产抗旱基因改良、癌症CAR-T细胞基因编辑。',
    interactiveSimulationId: 'dna_crispr',
    milestoneLevel: 1,
    tags: ['CRISPR', '基因编辑', '道德纳', '基因剪刀']
  },
  {
    id: '2024-baker-hassabis-alphafold',
    year: 2024,
    discipline: 'chemistry',
    discoveryTitle: '计算蛋白质设计与 AlphaFold 蛋白质三维结构预测',
    laureates: [
      {
        name: '戴维·贝克',
        nativeName: 'David Baker',
        country: '美国',
        birthDeath: '1962 - ',
        affiliation: '华盛顿大学',
        share: '1/2'
      },
      {
        name: '德米斯·哈萨比斯',
        nativeName: 'Demis Hassabis',
        country: '英国',
        birthDeath: '1976 - ',
        affiliation: 'Google DeepMind',
        share: '1/4'
      },
      {
        name: '约翰·江珀',
        nativeName: 'John M. Jumper',
        country: '美国',
        birthDeath: '1985 - ',
        affiliation: 'Google DeepMind',
        share: '1/4'
      }
    ],
    citationZh: '表彰贝克在计算蛋白质设计方面的贡献；表彰哈萨比斯和江珀在蛋白质三维结构预测方面的贡献。',
    citationEn: 'For computational protein design, and for protein structure prediction with AlphaFold.',
    category: 'computational_ai_chemistry',
    era: '2000-now',
    summary: '解决生命科学长达50年的“蛋白质折叠难题”！AI直接从一维氨基酸序列精确预测几乎所有2亿种已知蛋白质的原子级三维构型。',
    historicalContext: '传统冷冻电镜（Cryo-EM）或X射线晶体学解析一个蛋白质结构需耗时数年甚至数十年，数十万未知生命分子难以解析。',
    breakthroughMethod: '引入 Evoformer 深度注意力神经网络，结合多序列比对（MSA）协同进化信息与不变点注意力（IPA）进行空间几何端到端优化。',
    modernApplication: '靶向药物虚拟筛选与抗癌分子设计、人工酶降解白色塑料污染、新型疫苗免疫原快速设计。',
    interactiveSimulationId: 'protein_folding',
    milestoneLevel: 1,
    tags: ['AlphaFold', '人工智能', '蛋白质折叠', 'DeepMind', 'AI化学']
  },

  // ==================== 生理学或医学奖 (MEDICINE) ====================
  {
    id: '1901-behring',
    year: 1901,
    discipline: 'medicine',
    discoveryTitle: '白喉血清抗毒素疗法 (被动免疫之父)',
    laureates: [
      {
        name: '埃米尔·冯·贝林',
        nativeName: 'Emil von Behring',
        country: '德国',
        birthDeath: '1854 - 1917',
        affiliation: '马尔堡大学',
        share: '1/1'
      }
    ],
    citationZh: '表彰他在血清疗法特别是治疗白喉方面的贡献，他通过这些工作在医学科学领域开辟了一条新道路，并为医生提供了一种战胜疾病和死亡的强有力武器。',
    citationEn: 'For his work on serum therapy, especially its application against diphtheria.',
    category: 'immunology_vaccines',
    era: '1901-1920',
    summary: '首届诺贝尔生理学或医学奖。发现血液中抗体特异性中和毒素原理，将白喉儿童死亡率从50%直降至低危水平。',
    historicalContext: '19世纪末白喉被称为“儿童扼杀者”，无数婴儿喉部形成假膜窒息死亡，传统医学无药可救。',
    breakthroughMethod: '利用马匹接种减毒白喉外毒素产生抗体，提取高纯血清抗毒素注射给患病儿童实施被动免疫。',
    modernApplication: '蛇毒抗毒血清抢救、破伤风抗毒素、狂犬病免疫球蛋白治疗。',
    milestoneLevel: 1,
    tags: ['首届医学奖', '血清疗法', '抗毒素', '被动免疫']
  },
  {
    id: '1923-banting-macleod',
    year: 1923,
    discipline: 'medicine',
    discoveryTitle: '发现胰岛素并用于治疗糖尿病',
    laureates: [
      {
        name: '弗雷德里克·班廷',
        nativeName: 'Frederick Banting',
        country: '加拿大',
        birthDeath: '1891 - 1941',
        affiliation: '多伦多大学',
        share: '1/2'
      },
      {
        name: '约翰·麦克劳德',
        nativeName: 'John J.R. Macleod',
        country: '英国 / 加拿大',
        birthDeath: '1876 - 1935',
        affiliation: '多伦多大学',
        share: '1/2'
      }
    ],
    citationZh: '表彰他们发现了胰岛素。',
    citationEn: 'For the discovery of insulin.',
    category: 'cellular_metabolism',
    era: '1921-1945',
    summary: '医学史上最奇迹的救赎之一。彻底终结1型糖尿病等同于死刑的绝望历史，班廷成为史上最年轻的生理学奖得主（32岁）。',
    historicalContext: '1920年代以前1型糖尿病患儿寿命仅数月，只能依靠近乎残酷的极端饥饿疗法苟延残喘。',
    breakthroughMethod: '结扎狗胰导管萎缩外分泌腺，成功分离出降血糖激素提取物，经生化学家贝斯特与科利普纯化后注入昏迷垂危病童体内获得康复。',
    modernApplication: '重组人胰岛素、长效胰岛素类似物、胰岛素泵智能闭环人工胰腺。',
    trivia: '班廷将专利以象征性的“1美元”卖给多伦多大学，他说：“胰岛素不属于我，它属于全人类。”',
    milestoneLevel: 1,
    tags: ['胰岛素', '糖尿病', '班廷', '医学救赎']
  },
  {
    id: '1945-fleming-penicillin',
    year: 1945,
    discipline: 'medicine',
    discoveryTitle: '青霉素的发现及其对传染病的治愈效应',
    laureates: [
      {
        name: '亚历山大·弗莱明',
        nativeName: 'Alexander Fleming',
        country: '英国',
        birthDeath: '1881 - 1955',
        affiliation: '伦敦大学圣玛丽医院',
        share: '1/3'
      },
      {
        name: '恩斯特·钱恩',
        nativeName: 'Ernst B. Chain',
        country: '英国 / 德国',
        birthDeath: '1906 - 1979',
        affiliation: '牛津大学',
        share: '1/3'
      },
      {
        name: '霍华德·弗洛里',
        nativeName: 'Howard Florey',
        country: '澳大利亚 / 英国',
        birthDeath: '1898 - 1968',
        affiliation: '牛津大学',
        share: '1/3'
      }
    ],
    citationZh: '表彰他们发现了青霉素及其对各种传染病的治愈效应。',
    citationEn: 'For the discovery of penicillin and its curative effect in various infectious diseases.',
    category: 'infectious_antibiotics',
    era: '1921-1945',
    summary: '现代抗生素时代的诞生！终结细菌感染微小伤口即可致死的人类宿命，在二战战场与战后拯救了数以亿计的生命。',
    historicalContext: '人类数千年来受肺炎、败血症、梅毒与伤口化脓折磨，细菌感染致死率居高不下。',
    breakthroughMethod: '度假归来的培养皿中偶然发现青霉菌周围葡萄球菌溶解圈；钱恩与弗洛里攻克纯化工艺并实现深层发酵大工业生产。',
    modernApplication: '现代广谱抗生素（头孢、碳青霉烯类）、外科大型手术感染预防防护。',
    milestoneLevel: 1,
    tags: ['青霉素', '抗生素', '细菌感染', '二战神药']
  },
  {
    id: '1962-watson-crick-dna',
    year: 1962,
    discipline: 'medicine',
    discoveryTitle: 'DNA 分子双螺旋三维结构与遗传信息复制传递',
    laureates: [
      {
        name: '詹姆斯·沃森',
        nativeName: 'James Watson',
        country: '美国',
        birthDeath: '1928 - ',
        affiliation: '哈佛大学',
        share: '1/3'
      },
      {
        name: '弗朗西斯·克里克',
        nativeName: 'Francis Crick',
        country: '英国',
        birthDeath: '1916 - 2004',
        affiliation: '剑桥大学分子生物学实验室 (LMB)',
        share: '1/3'
      },
      {
        name: '莫里斯·威尔金斯',
        nativeName: 'Maurice Wilkins',
        country: '英国 / 新西兰',
        birthDeath: '1916 - 2004',
        affiliation: '伦敦大学国王学院',
        share: '1/3'
      }
    ],
    citationZh: '表彰他们关于核酸分子结构及其在生物物质信息传递中意义的发现。',
    citationEn: 'For their discoveries concerning the molecular structure of nucleic acids and its significance for information transfer in living material.',
    category: 'genetics_dna',
    era: '1946-1970',
    summary: '20世纪生命科学最伟大圣杯！揭晓遗传密码的物理化学机制：碱基互补配对（A=T, G≡C）构成了生命世代繁衍的自我复制蓝图。',
    historicalContext: '薛定谔在《生命是什么》中提出“非周期性晶体密码”，但生命的遗传分子究竟如何编码并在分裂时忠实复制？',
    breakthroughMethod: '基于罗莎琳德·富兰克林拍摄的51号X射线晶体衍射照片，结合查戈夫碱基比例法则，搭建出反向平行双螺旋空间模型。',
    modernApplication: '人类基因组计划（HGP）、重组DNA生物技术、基因治疗、合成生物学。',
    interactiveSimulationId: 'dna_crispr',
    milestoneLevel: 1,
    tags: ['DNA双螺旋', '分子生物学', '遗传密码', '沃森克里克']
  },
  {
    id: '2015-tu-youyou-artemisinin',
    year: 2015,
    discipline: 'medicine',
    discoveryTitle: '发现抗疟疾新型特效药物：青蒿素',
    laureates: [
      {
        name: '屠呦呦',
        nativeName: 'Youyou Tu',
        country: '中国',
        birthDeath: '1930 - ',
        affiliation: '中国中医科学院',
        share: '1/2'
      },
      {
        name: '威廉·C·坎贝尔',
        nativeName: 'William C. Campbell',
        country: '爱尔兰 / 美国',
        birthDeath: '1930 - ',
        affiliation: '德鲁大学',
        share: '1/4'
      },
      {
        name: '大村智',
        nativeName: 'Satoshi Ōmura',
        country: '日本',
        birthDeath: '1935 - ',
        affiliation: '北里大学',
        share: '1/4'
      }
    ],
    citationZh: '表彰屠呦呦发现了治疗疟疾的新疗法；表彰坎贝尔和大村智发现了治疗线虫寄生虫感染的新疗法。',
    citationEn: 'For her discoveries concerning a novel therapy against Malaria, and for therapies against infections caused by roundworm parasites.',
    category: 'infectious_antibiotics',
    era: '2000-now',
    summary: '首位荣获诺贝尔科学奖项的中国本土女性科学家！从传统中医药典籍中淬炼出现代特效抗疟药，挽救了全球数百万热带疟疾患者生命。',
    historicalContext: '恶性疟疾对传统奎宁和氯喹产生严重抗药性，年致死数百万人；常规高温中药煎煮法完全破坏了有效活性成分。',
    breakthroughMethod: '受东晋葛洪《肘后备急方》“青蒿一握以水二升渍绞取汁”启迪，改用低沸点乙醚低温冷萃法，成功分离出具有过氧桥结构的青蒿素单体。',
    modernApplication: '世界卫生组织（WHO）一线抗疟联合疗法（ACT）、红斑狼疮等自身免疫性疾病新药拓展。',
    keyFormula: {
      latex: '\\text{C}_{15}\\text{H}_{22}\\text{O}_5 \\quad (\\text{含特殊过氧桥结构 } -\\text{O}-\\text{O}-)',
      label: '青蒿素分子式与活性过氧桥',
      explanation: '分子内过氧桥在亚铁离子作用下裂解释放自由基，特异性破坏疟原虫膜系统。'
    },
    trivia: '在临床试验最关键阶段，为了证明青蒿素对人体的安全性，屠呦呦与科研团队成员带头亲身试毒口服提取物。',
    milestoneLevel: 1,
    tags: ['屠呦呦', '青蒿素', '抗疟疾', '中医药智慧', '中国女科学家']
  },
  {
    id: '2018-allison-honjo-immunotherapy',
    year: 2018,
    discipline: 'medicine',
    discoveryTitle: '免疫检查点阻断肿瘤免疫疗法 (PD-1 / CTLA-4)',
    laureates: [
      {
        name: '詹姆斯·艾利森',
        nativeName: 'James P. Allison',
        country: '美国',
        birthDeath: '1948 - ',
        affiliation: 'MD安德森癌症中心',
        share: '1/2'
      },
      {
        name: '本庶佑',
        nativeName: 'Tasuku Honjo',
        country: '日本',
        birthDeath: '1942 - ',
        affiliation: '京都大学',
        share: '1/2'
      }
    ],
    citationZh: '表彰他们通过抑制负免疫调节发现癌症治疗方法。',
    citationEn: 'For their discovery of cancer therapy by inhibition of negative immune regulation.',
    category: 'immunology_vaccines',
    era: '2000-now',
    summary: '肿瘤治疗的第四次革命。不再直接用毒性药物毒杀癌细胞，而是解除人体自身免疫T细胞的“刹车踏板”，让免疫系统重新识别吞噬肿瘤。',
    historicalContext: '传统化疗放疗对正常细胞杀伤极大，肿瘤细胞通过表达PD-L1等配体让免疫杀手T细胞陷入休眠耐受。',
    breakthroughMethod: '分别发现CTLA-4和PD-1作为T细胞表面的抑制性检查点，研发单克隆抗体阻断分子刹车重新激活抗肿瘤免疫。',
    modernApplication: 'K药 (Keytruda)、O药 (Opdivo) 等广谱抗癌单抗，晚期黑色素瘤与肺癌长期生存率飞跃。',
    milestoneLevel: 1,
    tags: ['免疫疗法', 'PD-1', '癌症治疗', '肿瘤检查点']
  },
  {
    id: '2023-kariko-weissman-mrna',
    year: 2023,
    discipline: 'medicine',
    discoveryTitle: '核苷酸碱基修饰与有效 mRNA 疫苗技术',
    laureates: [
      {
        name: '卡塔林·考里科',
        nativeName: 'Katalin Karikó',
        country: '匈牙利 / 美国',
        birthDeath: '1955 - ',
        affiliation: '塞格德大学 / 宾夕法尼亚大学',
        share: '1/2'
      },
      {
        name: '德鲁·韦斯曼',
        nativeName: 'Drew Weissman',
        country: '美国',
        birthDeath: '1959 - ',
        affiliation: '宾夕法尼亚大学',
        share: '1/2'
      }
    ],
    citationZh: '表彰他们在核苷碱基修饰方面的发现，这些发现使得开发针对COVID-19的有效mRNA疫苗成为可能。',
    citationEn: 'For their discoveries concerning nucleoside base modifications that enabled the development of effective mRNA vaccines against COVID-19.',
    category: 'immunology_vaccines',
    era: '2000-now',
    summary: '挽救数以千万计生命的分子修饰。将天然尿嘧啶替换为假尿嘧啶，消除了外源mRNA诱发的自杀性致命炎症，让mRNA疫苗得以在人体安全翻译。',
    historicalContext: '未经修饰的体外转录mRNA注入哺乳动物细胞时，会立刻激活TLR受体引发强烈破坏性先天炎症风暴，并在翻译抗原前被细胞迅速降解。',
    breakthroughMethod: '发现将mRNA中的尿嘧啶（Uridine）替换为假尿嘧啶（Pseudouridine Ψ），巧妙绕过细胞天然免疫监测，使蛋白质翻译表达效率暴增千倍。',
    modernApplication: '辉瑞-BioNTech与Moderna新冠mRNA疫苗、个性化肿瘤mRNA疫苗、呼吸道合胞病毒RSV与流感mRNA联合疫苗。',
    interactiveSimulationId: 'mrna_vaccine',
    trivia: '考里科曾因常年坚持无人问津的mRNA研究而在宾夕法尼亚大学被降职减薪，多次面临科研经费枯竭，却以钢铁般的毅力默默坚持了三十年。',
    milestoneLevel: 1,
    tags: ['mRNA疫苗', '假尿嘧啶', '考里科', 'COVID-19抗疫']
  }
];
