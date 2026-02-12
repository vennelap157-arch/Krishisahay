
export enum AppView {
  HOME = 'home',
  CROP_ADVISOR = 'crop_advisor',
  PEST_DOCTOR = 'pest_doctor',
  FERTILIZER = 'fertilizer',
  MARKET = 'market'
}

export type Language = 'English' | 'Hindi' | 'Telugu';

export interface FarmState {
  soilType: string;
  region: string;
  waterSource: string;
  currentCrop?: string;
}

export interface DiagnosticResult {
  disease: string;
  confidence: number;
  description: string;
  remedy: string[];
  prevention: string[];
}
