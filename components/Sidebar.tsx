
import React from 'react';
import { AppTab } from '../types';
import { 
  LayoutDashboard, 
  Rss, 
  Target, 
  BrainCircuit, 
  Users, 
  Download,
  Image as ImageIcon
} from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'لوحة القيادة الموحدة', icon: LayoutDashboard },
    { id: AppTab.OSINT, label: 'ربط المصادر (Live)', icon: Rss },
    { id: AppTab.MAP, label: 'المخطط الاستراتيجي', icon: Target },
    { id: AppTab.STRATEGIC, label: 'تحليل Gemini AI', icon: BrainCircuit },
    { id: AppTab.MEDIA_STUDIO, label: 'استوديو الإعلام', icon: ImageIcon },
    { id: AppTab.ACTORS, label: 'قاعدة الفاعلين', icon: Users },
    { id: AppTab.EXPORT, label: 'مركز التقارير', icon: Download },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col h-screen fixed right-0 top-0 z-50 shadow-2xl">
      <div className="p-8 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-800">
        <h2 className="text-xl font-black text-white flex items-center gap-3">
          <div className="w-2 h-8 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
          وحدة الرصد
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-widest">Digital Media Unit</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-red-600/10 text-red-500 border-r-4 border-red-600 shadow-inner' 
                : 'text-slate-500 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-red-500' : 'text-slate-600'} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-slate-800 bg-slate-900">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-inner">
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mb-1">رقم المسار الاستراتيجي</p>
          <p className="text-xs font-black text-red-500 font-mono">Dr.Mash/sy/105</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
