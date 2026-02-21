
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Activity, AlertTriangle, Users, Globe, TrendingUp, Info, LayoutGrid, Server, Share2, ExternalLink, Zap, Network, Radio, Database } from 'lucide-react';
import { MOCK_EVENTS, APP_VERSION, NEWS_DISTRIBUTION, LINKED_PROJECTS } from '../constants';

const timeData = [
  { name: '15 فبر', events: 22 },
  { name: '16 فبر', events: 35 },
  { name: '17 فبر', events: 28 },
  { name: '18 فبر', events: 45 },
];

const IntelligenceDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="الأحداث المرصودة" value="83" subtitle="تقرير 16-18 فبراير" icon={Activity} color="text-red-500" />
        <StatCard title="مصادر الويب لايف" value="2,842" subtitle="تشبيك X وتليجرام" icon={Radio} color="text-blue-500" />
        <StatCard title="المشاريع المرتبطة" value="4" subtitle="Google Studio Sync" icon={Share2} color="text-green-500" />
        <StatCard title="مؤشر الثقة" value="92%" subtitle="دقة القطف الآلي" icon={Zap} color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart - Time Distribution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30"></div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <TrendingUp className="text-red-500" size={28} />
                كثافة التدفق المعلوماتي (16-18 فبراير)
              </h3>
              <div className="flex items-center gap-3">
                 <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-950/30 px-3 py-1.5 rounded-full border border-green-900/30">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   ويب لايف مباشر
                 </span>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="events" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorEvents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Integration Network Map */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 relative z-10">
              <Network className="text-blue-500" size={24} />
              منصة التشبيك الاستراتيجي (Google Studio Integrator)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
               {LINKED_PROJECTS.map((proj, idx) => (
                 <div key={idx} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                          <LayoutGrid size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white flex items-center gap-2">
                            {proj.name}
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 tracking-tighter">
                            {proj.type} | مزامنة {proj.sync}
                          </p>
                       </div>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${
                      proj.status === 'متصل' ? 'bg-green-900/20 text-green-500 border-green-500/20' : 
                      proj.status === 'متصل' ? 'bg-blue-900/20 text-blue-500 border-blue-500/20' : 'bg-slate-900 text-slate-700 border-slate-800'
                    }`}>
                      {proj.status}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Pie Chart / Distribution (From Python Data) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <Database className="text-yellow-500" size={24} />
              تحليل تصنيف الأخبار (Python Extract)
            </h3>
            <div className="h-[300px] flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={NEWS_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    stroke="none"
                    dataKey="value"
                  >
                    {NEWS_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 w-full mt-6 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                {NEWS_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 bg-slate-800/30 p-1.5 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[10px] font-black text-slate-400">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backend Status / Harvesting Nodes */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3">
               <Zap className="text-yellow-500 opacity-20" size={40} />
             </div>
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">البنية التحتية لقطف المعلومات</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold">Node: SY-WEB-LIVE-GATEWAY</span>
                     <span className="text-green-500 font-black">ACTIVE [98%]</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 w-[98%] animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold">Node: SY-STUDIO-INTEGRATOR</span>
                     <span className="text-green-500 font-black">SYNCING [85%]</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-red-600 w-[85%] animate-pulse"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                   <span className="text-[10px] text-slate-600 font-black">إصدار النظام</span>
                   <span className="text-[10px] text-slate-500 font-mono">{APP_VERSION}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Events Table (Integrated Stream) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <div className="flex items-center gap-3">
            <Server className="text-red-500" size={24} />
            <h3 className="text-xl font-black text-white">سجل القطف والتشبيك الموحد (Integrated Stream)</h3>
          </div>
          <button className="text-xs font-black text-red-500 bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
            تحديث القطف المباشر
          </button>
        </div>
        <div className="overflow-x-auto pr-2 custom-scrollbar">
          <table className="w-full text-right">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">التوقيت</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">الحدث الاستراتيجي</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">المنطقة</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">مصدر القطف</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">دقة البيانات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_EVENTS.map((event) => (
                <tr key={event.id} className="hover:bg-red-900/5 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 text-sm text-slate-400 whitespace-nowrap font-mono group-hover:text-white transition-colors">
                    {new Date(event.timestamp).toLocaleString('ar-SA')}
                  </td>
                  <td className="px-8 py-6 text-md font-black text-white group-hover:text-red-500 transition-colors">{event.title}</td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-bold">{event.region}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-blue-400 border border-slate-700">
                      {event.source}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-green-500 font-mono">{event.confidence}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; subtitle: string; icon: any; color: string }> = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-red-600/10 transition-all group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-red-600 transition-all duration-500"></div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{title}</p>
        <h3 className="text-4xl font-black text-white mb-2">{value}</h3>
        <p className="text-xs text-slate-500 font-bold">{subtitle}</p>
      </div>
      <div className={`p-5 rounded-2xl bg-slate-800 border border-slate-700 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-xl ${color}`}>
        <Icon size={32} />
      </div>
    </div>
  </div>
);

export default IntelligenceDashboard;
