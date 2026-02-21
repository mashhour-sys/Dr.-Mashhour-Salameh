
import React from 'react';
import { Target, Zap, Layout, Shield, ChevronRight, Star, Share2, Network, Radio, Link as LinkIcon } from 'lucide-react';
import { STRATEGIC_GOLDEN_POINTS, LINKED_PROJECTS } from '../constants';

const StrategicBlueprintView: React.FC = () => {
  return (
    <div className="p-8 space-y-10 animate-in slide-in-from-bottom duration-700 max-w-[1600px] mx-auto">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-black uppercase tracking-[0.3em] shadow-inner">
          <Star size={16} className="fill-red-600" />
          مخطط التشبيك الاستراتيجي والقطف اللحظي
        </div>
        <h2 className="text-5xl font-black text-white leading-tight tracking-tighter">تنمية مشروع الرصد ومتابعة المصادر المفتوحة</h2>
        <p className="text-slate-400 text-xl font-bold italic">خارطة الطريق التقنية لوحدة الاعلام الرقمي - د. مشهور (2026)</p>
      </div>

      {/* Connectivity Visualization */}
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
          <Network className="text-blue-500" size={32} />
          خارطة التشبيك مع مشاريع Google Studio
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {LINKED_PROJECTS.map((proj) => (
            <div key={proj.id} className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 hover:border-red-600 transition-all group cursor-pointer shadow-xl">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-2xl">
                    <LinkIcon size={28} />
                 </div>
                 <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${proj.status === 'متصل' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white animate-pulse'}`}>
                   {proj.status}
                 </div>
               </div>
               <h4 className="text-lg font-black text-white mb-2 group-hover:text-red-500 transition-colors">{proj.name}</h4>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">تزامن: {proj.sync}</p>
            </div>
          ))}
        </div>

        {/* Connection Lines (Visual Decor) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STRATEGIC_GOLDEN_POINTS.map((point) => (
          <div key={point.id} className="relative bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:border-red-600/50 transition-all group overflow-hidden shadow-2xl flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-red-600/15 transition-all"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 mb-8 border border-slate-700 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all shadow-xl">
                <Radio size={28} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-red-500 transition-colors">{point.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 font-bold">{point.description}</p>
            </div>
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-800">
              <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-xl shadow-lg ${
                point.status === 'مكتمل' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                point.status === 'قيد التشغيل' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {point.status}
              </span>
              <ChevronRight className="text-slate-700 group-hover:text-white transition-all transform group-hover:translate-x-1" size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-600 via-red-800 to-black rounded-[3rem] p-12 text-white shadow-[0_30px_60px_rgba(220,38,38,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group-hover:scale-110 transition-transform duration-[10s]"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-right">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <Zap className="fill-white" size={32} />
              تفعيل الواجهة الخلفية (Backend) الموحدة
            </h3>
            <p className="text-red-100 text-lg leading-relaxed font-bold opacity-90">
              تم دمج كافة الأكواد لتعمل كقاعدة تغذية أساسية (Core Feed) لكافة مشاريع Google Studio الوطنية. النظام الآن مجهز بمحركات "القطف الذكي" التي تضمن جودة البيانات المجمعة وتحليلها الفوري، مما يسمح بنمو المشروع ليشمل كامل اللوحات القيادية بمرونة مطلقة.
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl min-w-[300px]">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.4em] mb-3 text-white/80">نسبة تكامل المخطط</p>
              <div className="text-7xl font-black font-mono tracking-tighter">92%</div>
              <div className="w-full h-3 bg-white/20 rounded-full mt-6 overflow-hidden shadow-inner">
                <div className="h-full bg-white w-[92%] shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-white/60">حالة الربط: تشبيك مباشر فعال</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicBlueprintView;
