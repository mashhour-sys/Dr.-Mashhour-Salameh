
import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Flag, Network, Wifi, Globe } from 'lucide-react';
import { APP_VERSION, APP_DATE, APP_ORG, APP_UNIT } from '../constants';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [networkHealth, setNetworkHealth] = useState(98);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const healthTimer = setInterval(() => setNetworkHealth(Math.floor(Math.random() * 5) + 95), 5000);
    return () => {
      clearInterval(timer);
      clearInterval(healthTimer);
    };
  }, []);

  return (
    <header className="h-32 bg-slate-900 border-b-2 border-red-900/40 flex items-center justify-between px-10 sticky top-0 z-40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Official Syrian Flag Strip */}
      <div className="absolute top-0 left-0 w-full h-1.5 flex shadow-lg">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 bg-green-600 rounded-full shadow-sm"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full shadow-sm"></div>
        </div>
        <div className="flex-1 bg-black"></div>
      </div>

      <div className="flex items-center gap-14">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="w-18 h-18 bg-gradient-to-br from-red-700 to-black rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 border-2 border-red-500/40 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 relative overflow-hidden">
            <Flag className="text-white relative z-10" size={40} />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"></div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black text-white leading-none mb-1 tracking-tighter flex items-center gap-2">
              {APP_ORG}
            </h1>
            <p className="text-lg font-black text-red-500 uppercase tracking-tighter flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-75"></span>
              </span>
              {APP_UNIT}
            </p>
          </div>
        </div>
        
        <div className="h-16 w-px bg-slate-800 hidden xl:block shadow-inner"></div>
        
        <div className="hidden lg:flex flex-col items-start gap-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">الإصدار الاستراتيجي</span>
            <span className="text-xs font-black text-red-600 font-mono bg-red-600/10 px-3 py-1 rounded-lg border border-red-900/30 shadow-inner">{APP_VERSION}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">تاريخ القطف</span>
            <span className="text-xs font-black text-slate-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{APP_DATE}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-12">
        {/* Network & Live Status */}
        <div className="hidden xl:flex items-center gap-8 bg-slate-800/40 px-6 py-3 rounded-3xl border border-slate-800 shadow-inner">
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 text-green-500">
               <Wifi size={14} className="animate-pulse" />
               <span className="text-xs font-black font-mono">{networkHealth}%</span>
             </div>
             <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-0.5">صحة الشبكة</span>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
               <p className="text-2xl font-black text-white font-mono tracking-tighter">{time.toLocaleTimeString('ar-SA')}</p>
             </div>
             <div className="flex items-center gap-2 text-[9px] text-blue-500 font-black uppercase tracking-widest mt-1">
               <Network size={10} />
               تشبيك ويب مباشر فعال
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-700 hover:border-red-600 hover:bg-slate-700 transition-all text-slate-400 hover:text-red-500 group shadow-2xl">
            <Bell size={28} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-slate-800 animate-pulse shadow-lg shadow-red-600/40"></span>
          </button>
          
          <div className="flex items-center gap-5 pr-8 border-r border-slate-800">
            <div className="text-left hidden sm:block">
              <p className="text-md font-black text-white tracking-tight">إدمن الوحدة الاستراتيجي</p>
              <div className="flex items-center gap-2 text-[10px] text-green-500 font-black uppercase bg-green-500/10 px-3 py-1 rounded-full border border-green-900/30 mt-1">
                <ShieldCheck size={12} />
                مصرح بالوصول (S1)
              </div>
            </div>
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(220,38,38,0.3)] text-xl border-2 border-white/10 group cursor-pointer hover:rotate-6 transition-all">
              SY
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
