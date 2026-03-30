
export type Gender = 'male' | 'female';
export type ReplacementFluid = 'albumin' | 'pfc';
export type SessionFrequency = 'consecutive' | 'alternate';
export type MachineType = 'Prismaflex' | 'Amplya' | 'Fresenius' | 'Manual/Otro';

export interface ExchangeData {
  patientName: string;
  indication: string;
  weight: number;
  hct: number;
  sessions: number;
  sessionFrequency: SessionFrequency;
  exchangeMultiplier: number;
  targetConcentration: number; 
  replacementFluid: ReplacementFluid;
  machineType: MachineType;
}

export interface CalculationResults {
  tbv: number;
  epv: number;
  exchangeVolume: number;
  vialsPerLiter: number;
  totalVials: number;
  totalSaline: number;
  totalPfc: number;
  replacementFluid: ReplacementFluid;
  finalConcentration: number;
  vialVolume: number;
  patientName?: string;
  indication?: string;
  sessions?: number;
  sessionFrequency?: SessionFrequency;
  machineType?: MachineType;
}
