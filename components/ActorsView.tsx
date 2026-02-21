
import React from 'react';
import { Users, Shield, MapPin, Search } from 'lucide-react';

const actors = [
  { name: 'الحكومة السورية', type: 'قرار استراتيجي', level: 'Level 1', region: 'دمشق', status: 'نشط' },
  { name: 'وزارة الدفاع السورية', type: 'تنفيذي', level: 'Level 2', region: 'دمشق', status: 'نشط' },
  { name: 'قوات سوريا الديمقراطية', type: 'قرار استراتيجي', level: 'Level 1', region: 'الحسكة', status: 'مراقب' },
  { name: 'العشائر العربية', type: 'تأثير محلي', level: 'Level 3', region: 'دير الزور', status: 'متفاعل' },
  { name: 'الاستخبارات الروسية', type: 'تنفيذي', level: 'Level 2', region: 'اللاذقية', status: 'نشط' },
  { name: 'الحكومة التركية', type: 'قرار استراتيجي', level: 'Level 1', region: 'الشمال', status: 'مراقب' },
];

const ActorsView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="text-blue-500" size={28} />
            خارطة الفاعلين والكيانات (18 فاعلاً)
          </h2>
          <p className="text-slate-400 mt-1">تصنيف هرمي وتحليل لشبكات التأثير</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-700">تصدير الأسماء</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">إضافة كيان جديد</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actors.map((actor, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-500">
                <Shield size={24} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                actor.level === 'Level 1' ? 'bg-red-900/20 text-red-500' :
                actor.level === 'Level 2' ? 'bg-blue-900/20 text-blue-500' : 'bg-green-900/20 text-green-500'
              }`}>
                {actor.level}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{actor.name}</h4>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                نوع الدور: {actor.type}
              </p>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <MapPin size={14} className="text-slate-500" />
                نطاق النفوذ: {actor.region}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                الحالة: {actor.status}
              </span>
              <button className="text-xs text-blue-400 hover:underline">عرض الخريطة الشبكية</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorsView;
