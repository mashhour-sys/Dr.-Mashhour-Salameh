
export enum EventCategory {
  SECURITY = 'أمني وعسكري',
  HUMANITARIAN = 'إنساني وبيئي',
  ECONOMIC = 'اقتصادي واستثماري',
  DIPLOMATIC = 'دبلوماسي وسياسي',
  INTERNATIONAL = 'دولي',
  SOCIAL = 'اجتماعي',
  RELIGIOUS = 'ديني',
  MEDIA = 'إعلامي',
  CULTURAL = 'ثقافي',
  JUDICIAL = 'قضائي',
  EDUCATION = 'تعليم',
  ACCIDENTS = 'حوادث',
  SERVICES = 'خدمي',
  GENERAL = 'منوع'
}

export interface IntelligenceEvent {
  id: string;
  timestamp: string;
  title: string;
  category: EventCategory;
  region: string;
  confidence: number;
  source: string;
  details: string;
}

export interface DashboardStats {
  totalEvents: number;
  totalSources: number;
  digitalInteractions: string;
  keyActors: number;
  stabilityIndex: number;
  confidenceLevel: number;
}

export interface StrategicAnalysis {
  summary: string;
  threats: string[];
  recommendations: string[];
  confidenceScore: number;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  OSINT = 'osint',
  MAP = 'map',
  STRATEGIC = 'strategic',
  ACTORS = 'actors',
  EXPORT = 'export',
  MEDIA_STUDIO = 'media_studio'
}
