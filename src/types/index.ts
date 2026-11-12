export type CareType = 'rawat_jalan' | 'rawat_inap' | 'rehabilitasi';

export type DisabilityType = 
  | 'skizofrenia' 
  | 'bipolar' 
  | 'depresi' 
  | 'kecemasan' 
  | 'autisme_perkembangan' 
  | 'lainnya';

export type IndependenceLevel = 'mandiri' | 'didampingi_sebagian' | 'dibantu_penuh';

export type MoodBehaviorStatus = 
  | 'tenang' 
  | 'agitasi_pramenstruasi' 
  | 'menolak_pembalut' 
  | 'gelisah_bingung' 
  | 'disorientasi';

export type InfectionSign = 
  | 'none' 
  | 'keputihan_abnormal' 
  | 'ruam_gatal' 
  | 'nyeri_panggul' 
  | 'demam_ringan';

export interface FamilyContact {
  name: string;
  relationship: string; // e.g. 'Ibu Kandung', 'Suami', 'Kakak Perempuan', 'Wali / Pengasuh'
  phoneNumber: string; // e.g. '+62 812-4910-3821'
  address: string;
  isPrimaryCaregiver: boolean;
  preferredContactHours: string; // e.g. '08:00 - 17:00 WIB'
}

export interface PatientMessage {
  id: string;
  sender: 'nurse' | 'family';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Patient {
  id: string;
  name: string;
  medicalRecordNo: string;
  age: number;
  careType: CareType;
  disabilityType: DisabilityType;
  medicationRegimen: string; // e.g. "Risperidone 2mg 2x1, Trihexyphenidyl 2mg"
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLengthDays: number; // e.g. 28
  periodDurationDays: number; // e.g. 5
  isCurrentlyMenstruating: boolean;
  cycleDelayDays: number; // >0 means delayed
  dailyPadRequirement: number; // default ~4-6
  hygieneIndependence: IndependenceLevel;
  lastHygieneChangeTime?: string;
  moodBehavior: MoodBehaviorStatus;
  infectionSigns: InfectionSign;
  notes: string;
  familyContact: FamilyContact;
  messages?: PatientMessage[];
}

export interface EducationModule {
  id: string;
  title: string;
  category: 'Modul Dasar' | 'Video' | 'Panduan' | 'Infografis';
  targetAudience: string; // e.g., "Perawat & Pengasuh"
  durationMinutes: number;
  completed: boolean;
  summary: string;
  learningPoints: string[];
  protocolSteps: string[];
  dignityChecklist: string[];
}

export interface LogisticsItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  projectedNeed: number;
  safetyThreshold: number;
  status: 'aman' | 'menipis' | 'kritis';
  costPerUnit: number; // IDR
}

export interface HospitalPartner {
  id: string;
  name: string;
  status: 'Pilot' | 'Aktif' | 'Onboarding' | 'Potensial';
  complianceRate: number; // percentage 0 - 100
  province: string;
  bedCapacity: number;
  activePatientsTracked: number;
  notes: string;
}

export interface SectorPartner {
  id: string;
  name: string;
  contributionType: string;
  status: 'Aktif' | 'Negosiasi' | 'Dalam Penjajakan';
  category: 'CSR Korporasi' | 'Pemerintah / Dinas' | 'Yayasan / NGO';
  description: string;
  impactMetric: string;
}

export type ActiveTab = 
  | 'ringkasan' 
  | 'pemantauan_klinis' 
  | 'edukasi' 
  | 'logistik_jit' 
  | 'lintas_sektor';
