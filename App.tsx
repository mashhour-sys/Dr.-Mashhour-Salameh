
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import IntelligenceDashboard from './components/IntelligenceDashboard';
import StrategicAnalysisView from './components/StrategicAnalysisView';
import ActorsView from './components/ActorsView';
import ReportExportView from './components/ReportExportView';
import OSINTView from './components/OSINTView';
import StrategicBlueprintView from './components/StrategicBlueprintView';
import MediaStudioView from './components/MediaStudioView';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <IntelligenceDashboard />;
      case AppTab.STRATEGIC:
        return <StrategicAnalysisView />;
      case AppTab.ACTORS:
        return <ActorsView />;
      case AppTab.EXPORT:
        return <ReportExportView />;
      case AppTab.OSINT:
        return <OSINTView />;
      case AppTab.MAP:
        return <StrategicBlueprintView />;
      case AppTab.MEDIA_STUDIO:
        return <MediaStudioView />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <p className="text-xl mb-4">هذه الميزة قيد التطوير في المرحلة الثانية</p>
              <p className="text-sm">المخطط الكامل (4-9 أشهر)</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 overflow-x-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 mr-64 min-h-screen flex flex-col transition-all print:mr-0">
        <div className="print:hidden">
          <TopBar />
        </div>
        
        <div className="flex-1">
          {renderContent()}
        </div>

        <footer className="p-6 border-t border-slate-900 bg-slate-950/80 text-center print:hidden">
          <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            نظام التحليل الاستراتيجي الوطني | الإصدار 4.0.1 | د. مشهور | 2026
          </p>
        </footer>
      </main>

      {/* Persistent Call-to-Action / Status */}
      <div className="fixed bottom-6 left-6 z-50 print:hidden">
        <div className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-red-600/40 flex items-center gap-3 text-sm font-black animate-pulse cursor-pointer border border-white/20">
          <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
          تنبيه استراتيجي: خرق أمني مرصود في القطاع الشرقي
        </div>
      </div>
    </div>
  );
};

export default App;
