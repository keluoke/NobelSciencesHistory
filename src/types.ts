export type PrizeDiscipline = 'physics' | 'chemistry' | 'medicine';

export type PhysicsCategory =
  | 'quantum'
  | 'relativity_astronomy'
  | 'particle_high_energy'
  | 'condensed_matter'
  | 'optics_photonics'
  | 'atomic_nuclear';

export type ChemistryCategory =
  | 'organic_chemistry'
  | 'biochemistry_molecular'
  | 'physical_chemistry'
  | 'inorganic_materials'
  | 'computational_ai_chemistry'
  | 'analytical_instrumental';

export type MedicineCategory =
  | 'genetics_dna'
  | 'immunology_vaccines'
  | 'neuroscience'
  | 'infectious_antibiotics'
  | 'cellular_metabolism'
  | 'diagnostic_imaging';

export type AwardCategory = PhysicsCategory | ChemistryCategory | MedicineCategory;

export type HistoricalEra =
  | '1901-1920'
  | '1921-1945'
  | '1946-1970'
  | '1971-1999'
  | '2000-now';

export interface Laureate {
  name: string;
  nativeName?: string;
  country: string;
  birthDeath: string;
  affiliation?: string;
  share: string;
}

export interface KeyFormula {
  latex: string;
  label: string;
  explanation: string;
}

export type SimulationId =
  | 'photoelectric'
  | 'bohr_atom'
  | 'double_slit'
  | 'gravitational_waves'
  | 'lhc_higgs'
  | 'dna_crispr'
  | 'mrna_vaccine'
  | 'protein_folding';

export interface NobelAward {
  id: string;
  year: number;
  discipline: PrizeDiscipline;
  discoveryTitle: string;
  laureates: Laureate[];
  citationZh: string;
  citationEn: string;
  category: AwardCategory;
  era: HistoricalEra;
  summary: string;
  historicalContext: string;
  breakthroughMethod: string;
  modernApplication: string;
  keyFormula?: KeyFormula;
  interactiveSimulationId?: SimulationId;
  trivia?: string;
  milestoneLevel: 1 | 2 | 3; // 1: 划时代范式更替, 2: 重大突破, 3: 专门领域先锋
  tags: string[];
}

export interface LineageNode {
  id: string;
  year: number;
  discipline: PrizeDiscipline;
  name: string;
  label: string;
  category: AwardCategory;
  dependsOn: string[];
  impactSummary: string;
}

export interface CompleteArchiveEntry {
  year: number;
  discipline: PrizeDiscipline;
  isAwarded: boolean;
  unawardedReason?: string;
  laureates: string[];
  discoveryTitle: string;
  citationBrief: string;
  milestoneLevel?: 1 | 2 | 3;
  deepAwardId?: string; // Links to deep detail modal if available
}

export interface QuizQuestion {
  id: string;
  discipline: PrizeDiscipline;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedYear: number;
  relatedDiscipline: PrizeDiscipline;
}
