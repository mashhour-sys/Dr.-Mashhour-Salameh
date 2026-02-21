
import { EventCategory, IntelligenceEvent } from './types';

// Updated date and version based on administrative directives
export const APP_VERSION = "Dr.Mash/sy/105";
export const APP_DATE = "9 شباط 2026";
export const APP_ORG = "الجمهورية العربية السورية";
export const APP_UNIT = "وحدة الاعلام الرقمي";

export const NEWS_DISTRIBUTION = [
  { name: 'أمني', value: 26, color: '#ef4444' },
  { name: 'دولي', value: 12, color: '#3b82f6' },
  { name: 'إنساني', value: 9, color: '#10b981' },
  { name: 'سياسي', value: 8, color: '#8b5cf6' },
  { name: 'اقتصادي', value: 7, color: '#f59e0b' },
  { name: 'خدمي', value: 5, color: '#06b6d4' },
  { name: 'منوع', value: 5, color: '#64748b' },
  { name: 'اجتماعي', value: 4, color: '#ec4899' },
  { name: 'ديني', value: 3, color: '#14b8a6' },
  { name: 'إعلامي', value: 3, color: '#f97316' },
  { name: 'ثقافي', value: 2, color: '#a855f7' },
];

export const OSINT_KEYWORDS = [
  "سوريا", "ادلب", "الحسكة", "الاكراد", "امني", "عسكري", "درعا", "حدود",
  "تهريب", "لبنان", "تركيا", "الشدادي", "القنيطرة", "مخيم روج",
  "استخبارات سوريا", "تهديد", "مظاهرات", "اعتصام", "نقد",
  "غرق", "مخيمات", "خربة جوز", "دروكيش", "العاصي",
  "حماة", "اللاذقية", "نهر كبير", "حوران", "دروز", "السويداء",
  "الفرات", "التنف", "الخارجية السورية", "البنك المركزي"
];

export const NETWORK_NODES = [
  { id: 'Node-01', name: 'خادم زحف X (تويتر)', status: 'Active', load: 88, type: 'Social' },
  { id: 'Node-02', name: 'بوابة Google Studio 1', status: 'Active', load: 45, type: 'Integration' },
  { id: 'Node-03', name: 'رادار الويب المباشر (Web-Live)', status: 'Active', load: 72, type: 'Crawler' },
  { id: 'Node-04', name: 'خادم تليجرام الإقليمي', status: 'Standby', load: 15, type: 'Social' },
  { id: 'Node-05', name: 'مركز تحليل دمشق (Local)', status: 'Active', load: 30, type: 'Analysis' },
];

export const LINKED_PROJECTS = [
  { id: 'GS-01', name: 'مشروع تحليل الميول - Google Studio', status: 'متصل', sync: 'Live', type: 'رصد جغرافي' },
  { id: 'GS-02', name: 'لوحة القيادة الاقتصادية 2026', status: 'متصل', sync: 'Live', type: 'تحليل مالي' },
  { id: 'GS-03', name: 'نظام تتبع الحدود الرقمي', status: 'جاري الربط', sync: 'Pending', type: 'OSINT حدودي' },
  { id: 'GS-04', name: 'قاعدة بيانات الفاعلين المشتركة', status: 'متصل', sync: 'Hourly', type: 'استخبارات' }
];

export const STRATEGIC_GOLDEN_POINTS = [
  { 
    id: 1, 
    title: "تشبيك البيانات العابر للمنصات", 
    description: "بناء جسور رقمية تربط بين منصة X، فيسبوك، والمواقع الإخبارية لضمان تدفق شامل للمعلومة في وقتها الحقيقي.", 
    status: "مكتمل" 
  },
  { 
    id: 2, 
    title: "محركات قطف البيانات اللحظية", 
    description: "تطوير خوارزميات 'القطف الذكي' التي تستخلص المعلومات الحساسة من البث المباشر والمنشورات فور صدورها.", 
    status: "قيد التشغيل" 
  },
  { 
    id: 3, 
    title: "الربط مع مشاريع Google Studio", 
    description: "مزامنة لوحات القيادة الحالية مع مشاريع Google Studio السابقة لخلق شبكة استخباراتية موحدة.", 
    status: "نشط" 
  },
  { 
    id: 4, 
    title: "واجهة الويب لايف (Web Live)", 
    description: "واجهة تفاعلية تسمح بمتابعة 'الزحف الرقمي' بشكل مباشر مع إمكانية التدخل اليدوي للتصحيح.", 
    status: "مكتمل" 
  }
];

export const MOCK_EVENTS: IntelligenceEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-02-09T14:20:00Z",
    title: "انسحاب أمريكي من قاعدة الشدادي وتسليمها للحكومة",
    category: EventCategory.SECURITY,
    region: "الحسكة",
    confidence: 98,
    source: "رصد ميداني - ويب لايف",
    details: "تم رصد انسحاب القوات الأمريكية وتمركز وحدات من الجيش العربي السوري في المواقع المخلاة."
  },
  {
    id: "evt-002",
    timestamp: "2026-02-09T09:00:00Z",
    title: "توغلات إسرائيلية يومية متعددة في القنيطرة",
    category: EventCategory.SECURITY,
    region: "القنيطرة",
    confidence: 94,
    source: "رصد حدودي",
    details: "رصد تحركات آليات عسكرية إسرائيلية خلف خط فض الاشتباك مع استنفار في القرى الحدودية وتوغلات يومية."
  },
  {
    id: "evt-003",
    timestamp: "2026-02-08T16:30:00Z",
    title: "احتجاجات عنيفة في دير الزور بسبب حرق حراقات النفط",
    category: EventCategory.SECURITY,
    region: "دير الزور",
    confidence: 91,
    source: "منصة X - قطف لحظي",
    details: "اندلاع احتجاجات شعبية رفضاً لسياسات حرق حراقات النفط البدائية وتأثيرها البيئي والصحي، ترافق ذلك مع حرائق واسعة."
  },
  {
    id: "evt-004",
    timestamp: "2026-02-07T12:00:00Z",
    title: "عودة 34 أسترالياً إلى مخيم روج بعد إفراج فاشل",
    category: EventCategory.HUMANITARIAN,
    region: "الحسكة",
    confidence: 89,
    source: "مصادر دولية",
    details: "إعادة مجموعة من الرعايا الأستراليين إلى مخيم روج بعد تعثر إجراءات الإخلاء الأولية."
  },
  {
    id: "evt-005",
    timestamp: "2026-02-07T08:00:00Z",
    title: "قافلة مساعدات كبيرة إلى السويداء (30 شاحنة)",
    category: EventCategory.HUMANITARIAN,
    region: "السويداء",
    confidence: 97,
    source: "Google Studio - إنساني",
    details: "وصول قافلة إغاثية ضخمة تضم 30 شاحنة بالتنسيق مع الهلال الأحمر لتقديم الدعم الغذائي والطبي."
  },
  {
    id: "evt-006",
    timestamp: "2026-02-09T09:00:00Z",
    title: "مؤتمر وحدة الخطاب الإسلامي في دمشق",
    category: EventCategory.RELIGIOUS,
    region: "دمشق",
    confidence: 100,
    source: "سانا",
    details: "انطلاق أعمال مؤتمر وحدة الخطاب الإسلامي بمشاركة واسعة من علماء الدين لمناقشة التحديات الراهنة."
  }
];
