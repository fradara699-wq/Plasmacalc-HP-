
import { ExchangeData, MachineType } from './types';

export const ASFA_PATHOLOGIES = [
  "Síndrome de Guillain-Barré",
  "Miastenia Gravis (Crisis/Pre-op)",
  "CIDP (Polirradiculoneuropatía Crónica)",
  "NMOSD (Neuromielitis Óptica)",
  "Encefalitis por Receptores NMDA",
  "Esclerosis Múltiple (Recaída aguda)",
  "S. Goodpasture (Anti-GBM)",
  "Vasculitis ANCA (RPGN grave)",
  "GEFS Recurrente (Trasplante)",
  "Rechazo Humoral (AMR)",
  "SHU Atípico",
  "Falla Hepática Aguda",
  "Enfermedad de Wilson (Fulminante)",
  "Prurito por Colestasis",
  "PTT (Púrpura Trombocitopénica Trombótica)",
  "Hemorragia Alveolar",
  "Mieloma Múltiple / Hiperviscosidad",
  "Sepsis / Falla Multiorgánica",
  "Otro / No especificado"
];

export const MACHINES: MachineType[] = [
  "Prismaflex",
  "Amplya",
  "Fresenius",
  "Manual/Otro"
];

export const DEFAULT_EXCHANGE_DATA: ExchangeData = {
  patientName: '',
  indication: '',
  weight: 0,
  hct: 0,
  sessions: 1,
  sessionFrequency: 'consecutive',
  exchangeMultiplier: 1.0,
  targetConcentration: 4.0,
  replacementFluid: 'albumin',
  machineType: 'Prismaflex'
};

export const ALB_20_CONC = 20; 
export const VIAL_VOL = 50; 
export const SALINE_UNIT = 1000; 

export const EBV_STANDARD = 70;
