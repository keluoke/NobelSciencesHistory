import { LineageNode } from '../types';

export const LINEAGE_NODES: LineageNode[] = [
  // 物理基石
  {
    id: '1901-rontgen',
    year: 1901,
    discipline: 'physics',
    name: '伦琴',
    label: '发现X射线与晶体衍射基础',
    category: 'optics_photonics',
    dependsOn: [],
    impactSummary: '穿透高能射线直接奠定近现代医学影像透视，并成为后来解析DNA双螺旋与晶体结构的必备实验光学探针。'
  },
  {
    id: '1918-planck',
    year: 1918,
    discipline: 'physics',
    name: '马克斯·普朗克',
    label: '能量量子假说 E=hν',
    category: 'quantum',
    dependsOn: [],
    impactSummary: '打破经典连续性教条，引入量子常数 h，启发了爱因斯坦光子说与近代结构化学。'
  },
  {
    id: '1921-einstein',
    year: 1921,
    discipline: 'physics',
    name: '爱因斯坦',
    label: '光电效应与光量子假说',
    category: 'quantum',
    dependsOn: ['1918-planck'],
    impactSummary: '确立光的粒子性，开启微观波粒二象性与现代光子化学。'
  },

  // 化学与结构革命
  {
    id: '1954-pauling',
    year: 1954,
    discipline: 'chemistry',
    name: '莱纳斯·鲍林',
    label: '化学键本质与杂化轨道',
    category: 'physical_chemistry',
    dependsOn: ['1918-planck', '1921-einstein'],
    impactSummary: '将量子力学成功引入分子化学，解释碳原子四面体杂化与蛋白质α-螺旋构型。'
  },
  {
    id: '1956-transistor',
    year: 1956,
    discipline: 'physics',
    name: '肖克利 / 巴丁 / 布拉顿',
    label: '半导体晶体管',
    category: 'condensed_matter',
    dependsOn: ['1921-einstein'],
    impactSummary: '点燃微电子信息时代，为日后高通量基因测序仪与生物AI超级算力提供硬件基石。'
  },

  // 生命科学跨界核心
  {
    id: '1962-watson-crick-dna',
    year: 1962,
    discipline: 'medicine',
    name: '沃森 & 克里克',
    label: 'DNA 双螺旋三维立体结构',
    category: 'genetics_dna',
    dependsOn: ['1901-rontgen', '1954-pauling'],
    impactSummary: '生命科学的绝对圣杯：碱基互补配对（A-T, G-C）揭开生命遗传复制机制。'
  },
  {
    id: '1993-mullis-pcr',
    year: 1993,
    discipline: 'chemistry',
    name: '凯利·穆利斯',
    label: 'PCR 聚合酶链反应扩增技术',
    category: 'biochemistry_molecular',
    dependsOn: ['1962-watson-crick-dna'],
    impactSummary: '分子生物学复印机，能在数小时内倍增微量基因十亿倍，支撑现代核酸诊断与法医检测。'
  },
  {
    id: '2020-doudna-crispr',
    year: 2020,
    discipline: 'chemistry',
    name: '道德纳 & 沙尔庞捷',
    label: 'CRISPR-Cas9 基因编辑剪刀',
    category: 'biochemistry_molecular',
    dependsOn: ['1962-watson-crick-dna'],
    impactSummary: '以单碱基精度在活细胞重写DNA，彻底改变遗传病治疗与农业动植物改良。'
  },
  {
    id: '2023-kariko-weissman-mrna',
    year: 2023,
    discipline: 'medicine',
    name: '考里科 & 韦斯曼',
    label: '假尿嘧啶修饰与 mRNA 疫苗',
    category: 'immunology_vaccines',
    dependsOn: ['1962-watson-crick-dna'],
    impactSummary: '破解外源RNA自噬排异难题，让人体细胞安全翻译抗原蛋白质，战胜全球大流行。'
  },
  {
    id: '2024-baker-hassabis-alphafold',
    year: 2024,
    discipline: 'chemistry',
    name: '哈萨比斯 / 江珀 / 贝克',
    label: 'AlphaFold 蛋白质三维结构预测',
    category: 'computational_ai_chemistry',
    dependsOn: ['1956-transistor', '1954-pauling', '1962-watson-crick-dna'],
    impactSummary: '物理芯片算力 + 深度注意力机制求解50年生物折叠难题，破译2亿已知蛋白质构型。'
  }
];
