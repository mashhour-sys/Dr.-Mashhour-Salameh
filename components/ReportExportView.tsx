
import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Loader2, 
  Calendar,
  Filter,
  Shield,
  Table as TableIcon,
  Search,
  ExternalLink,
  X,
  FileDown
} from 'lucide-react';
import { MOCK_EVENTS, APP_VERSION, APP_DATE, APP_ORG, APP_UNIT } from '../constants';
import { EventCategory } from '../types';

const ReportExportView: React.FC = () => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtering logic that affects both the preview and the PDF export
  const filteredEvents = MOCK_EVENTS.filter(e => {
    const matchesCategory = selectedCategory === 'الكل' || e.category === selectedCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExportCSV = () => {
    setIsExporting('csv');
    setTimeout(() => {
      const headers = ['ID', 'Timestamp', 'Title', 'Category', 'Region', 'Confidence', 'Source', 'Details'];
      const csvRows = [
        headers.join(','),
        ...filteredEvents.map(e => [
          e.id,
          e.timestamp,
          `"${e.title.replace(/"/g, '""')}"`,
          `"${e.category}"`,
          `"${e.region}"`,
          `${e.confidence}%`,
          `"${e.source}"`,
          `"${e.details.replace(/"/g, '""')}"`
        ].join(','))
      ];

      const csvContent = "\uFEFF" + csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `SY_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(null);
    }, 1000);
  };

  const handleExportPDF = () => {
    setIsExporting('pdf');
    // We use the browser's print functionality which is styled via CSS media queries for PDF export
    setTimeout(() => {
      window.print();
      setIsExporting(null);
    }, 500);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header section (Hidden during print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-700/40 border border-red-500/30">
            <FileDown className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white leading-tight">مركز تصدير التقارير</h2>
            <p className="text-slate-400 font-bold">توليد مستندات PDF رسمية وجداول بيانات استراتيجية</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex flex-col items-end shadow-inner">
           <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">معرف الوحدة</span>
           <span className="text-lg text-white font-mono font-bold">{APP_VERSION}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:hidden">
        {/* Filters Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:col-span-1 shadow-2xl">
          <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
            <Filter size={20} className="text-red-500" />
            تخصيص التقرير
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest">تصفية حسب التصنيف</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 rounded-xl text-sm text-slate-200 py-4 px-4 outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold"
              >
                <option value="الكل">كافة التصنيفات</option>
                {Object.values(EventCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="pt-4">
              <div className="flex items-start gap-4 p-5 bg-red-900/10 border border-red-900/20 rounded-2xl">
                <Shield size={24} className="text-red-500 shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-black text-red-200 mb-1">الأمان الرقمي</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    يتم تضمين ختم إلكتروني مشفر في كل تقرير PDF لضمان عدم التلاعب بالبيانات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ExportCard 
            title="تصدير كـ PDF" 
            description="وثيقة رسمية منسقة بجدول بيانات كامل وتفاصيل استخباراتية، جاهزة للطباعة والارشفة."
            icon={FileText}
            color="text-red-500"
            isLoading={isExporting === 'pdf'}
            onClick={handleExportPDF}
          />
          <ExportCard 
            title="تصدير كـ Excel/CSV" 
            description="تفريغ كافة الأحداث في جدول بيانات مرن يدعم التحليل الإحصائي والربط البرمجي."
            icon={FileSpreadsheet}
            color="text-green-500"
            isLoading={isExporting === 'csv'}
            onClick={handleExportCSV}
          />
        </div>
      </div>

      {/* Interactive Preview & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl print:hidden">
        <div className="p-8 border-b border-slate-800 bg-slate-800/30">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div className="flex items-center gap-3">
               <TableIcon className="text-red-600" size={24} />
               <h3 className="text-xl font-black text-white">معاينة الأحداث المختارة للتقرير</h3>
            </div>
            
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                <Search size={18} />
              </div>
              <input 
                type="text"
                placeholder="بحث في العناوين أو التفاصيل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pr-11 pl-10 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-600/50 transition-all font-bold placeholder:text-slate-600"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase border border-slate-700 px-3 py-1 rounded-lg">
                عدد السجلات: {filteredEvents.length}
              </span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-right border-collapse min-w-[1000px]">
            <thead className="bg-slate-800/80">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">التوقيت</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">العنوان</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">التصنيف</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">المنطقة</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">المصدر</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-700/50">الثقة</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">التفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-5 text-[10px] text-slate-400 font-mono">{new Date(event.timestamp).toLocaleString('ar-SA')}</td>
                  <td className="px-6 py-5 text-sm font-black text-white">{event.title}</td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">{event.category}</td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">{event.region}</td>
                  <td className="px-6 py-5 text-xs font-bold text-blue-400 italic">{event.source}</td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-black text-green-500 font-mono">{event.confidence}%</span>
                  </td>
                  <td className="px-6 py-5 text-[11px] text-slate-500 leading-relaxed max-w-[300px] truncate" title={event.details}>
                    {event.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OFFICIAL PDF PRINT TEMPLATE (Hidden in Web UI, Visible in Print) */}
      <div className="hidden print:block bg-white text-slate-950 p-0 m-0 font-amiri min-h-screen">
        <div className="p-10 border-[1px] border-slate-300 min-h-screen relative">
          {/* Official Letterhead */}
          <div className="flex justify-between items-start border-b-4 border-slate-900 pb-6 mb-8">
            <div className="text-right space-y-1">
              <h1 className="text-2xl font-bold">{APP_ORG}</h1>
              <p className="text-lg font-bold">{APP_UNIT}</p>
              <p className="text-sm font-bold">دائرة الرصد والمتابعة (OSINT)</p>
            </div>
            <div className="text-left font-mono text-[10px] space-y-1">
              <p className="font-bold">المعرف: {APP_VERSION}</p>
              <p className="font-bold">تاريخ الإصدار: {new Date().toLocaleDateString('ar-SA')}</p>
              <p className="font-bold text-red-700 underline uppercase tracking-widest">سري ومحدود التداول</p>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl font-bold underline underline-offset-8">تقرير الرصد الموحد للأحداث الاستراتيجية</h2>
            <p className="mt-4 text-slate-600 text-xs">
              التصنيف المختار: {selectedCategory} | الكلمات المفتاحية: {searchTerm || 'بدون تصفية'}
            </p>
          </div>

          {/* PDF FORMATTED TABLE */}
          <table className="w-full text-right border-collapse border border-slate-950 mb-10">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[12%]">التوقيت</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[18%]">العنوان</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[12%]">التصنيف</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[10%]">المنطقة</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[8%]">الثقة</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold w-[10%]">المصدر</th>
                <th className="border border-slate-950 px-2 py-2 text-[10px] font-bold">التفاصيل التحليلية</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((e) => (
                <tr key={e.id} className="break-inside-avoid">
                  <td className="border border-slate-950 px-2 py-2 text-[9px] font-sans">
                    {new Date(e.timestamp).toLocaleString('ar-SA')}
                  </td>
                  <td className="border border-slate-950 px-2 py-2 text-[10px] font-bold">{e.title}</td>
                  <td className="border border-slate-950 px-2 py-2 text-[9px]">{e.category}</td>
                  <td className="border border-slate-950 px-2 py-2 text-[9px]">{e.region}</td>
                  <td className="border border-slate-950 px-2 py-2 text-[9px] font-bold text-center">{e.confidence}%</td>
                  <td className="border border-slate-950 px-2 py-2 text-[9px] italic">{e.source}</td>
                  <td className="border border-slate-950 px-2 py-2 text-[9px] leading-relaxed text-justify">{e.details}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signatures and Seals */}
          <div className="mt-16 flex justify-between items-end px-4">
            <div className="text-center">
              <p className="text-xs font-bold border-t border-slate-950 pt-2 w-48">ختم التوثيق الرقمي</p>
              <div className="mt-4 w-16 h-16 bg-slate-50 border border-slate-300 mx-auto flex items-center justify-center text-[7px] text-slate-400 rotate-45 border-dashed">
                DM-SECURED
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold underline underline-offset-4">المصادقة الرسمية</p>
              <p className="text-md font-bold">رئيس وحدة الاعلام الرقمي</p>
              <p className="text-xs font-bold text-slate-500 italic">الدكتور مشهور</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-10 right-10 flex justify-between text-[8px] text-slate-500 font-sans border-t border-slate-200 pt-4">
            <p>تم استخراج هذا التقرير آلياً عبر نظام التحليل الوطني الموحد.</p>
            <p>سرية البيانات مكفولة بموجب البروتوكول الاستراتيجي DM-105.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExportCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick: () => void;
  isLoading?: boolean;
}

const ExportCard: React.FC<ExportCardProps> = ({ title, description, icon: Icon, color, onClick, isLoading }) => (
  <button 
    onClick={onClick}
    disabled={isLoading}
    className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-right hover:border-red-600/50 hover:bg-slate-800/50 transition-all group flex flex-col justify-between shadow-xl relative overflow-hidden h-full"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-red-600/10 transition-all"></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-5 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl ${color} group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300`}>
        {isLoading ? <Loader2 className="animate-spin" size={32} /> : <Icon size={32} />}
      </div>
      <ExternalLink size={20} className="text-slate-700 group-hover:text-slate-400" />
    </div>
    <div className="relative z-10">
      <h4 className="text-xl font-black text-white mb-3 group-hover:text-red-500 transition-colors">{title}</h4>
      <p className="text-xs text-slate-400 font-bold leading-relaxed">{description}</p>
    </div>
  </button>
);

export default ReportExportView;
