
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Loader2, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateStrategicAnalysis } from '../services/geminiService';
import { StrategicAnalysis } from '../types';
import { MOCK_EVENTS } from '../constants';

const StrategicAnalysisView: React.FC = () => {
  const [analysis, setAnalysis] = useState<StrategicAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const performAnalysis = async () => {
    setLoading(true);
    const eventsText = MOCK_EVENTS.map(e => `- ${e.title} (${e.category}) في ${e.region}`).join('\n');
    const result = await generateStrategicAnalysis(eventsText);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    performAnalysis();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-left duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="text-red-500" size={28} />
            التحليل الاستراتيجي الوطني
          </h2>
          <p className="text-slate-400 mt-1">مدعوم بالذكاء الاصطناعي التوليدي والبيانات المجمعة</p>
        </div>
        <button 
          onClick={performAnalysis}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
          تحديث التحليل الآني
        </button>
      </div>

      {!analysis && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <BrainCircuit size={64} className="mb-4 opacity-20" />
          <p>اضغط على "تحديث التحليل" لبدء المعالجة الاستراتيجية</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-800 rounded-xl animate-pulse"></div>
          ))}
        </div>
      )}

      {analysis && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" />
                الملخص التنفيذي للموقف
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                {analysis.summary}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" />
                التوصيات الاستراتيجية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.recommendations.map((rec, i) => (
                  <div key={i} className="bg-slate-800 p-4 rounded-lg border-r-4 border-green-500">
                    <p className="text-slate-200 text-sm font-semibold">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-500" />
                التهديدات المرصودة
              </h3>
              <ul className="space-y-4">
                {analysis.threats.map((threat, i) => (
                  <li key={i} className="flex items-start gap-3 bg-red-900/10 p-4 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-red-200 text-sm">{threat}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-red-900/20 border border-red-900/30 rounded-xl p-8 text-center">
              <p className="text-sm text-slate-400 mb-2 uppercase tracking-widest">مؤشر الثقة العام</p>
              <div className="text-6xl font-black text-white mb-4">{analysis.confidenceScore}%</div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                  style={{ width: `${analysis.confidenceScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicAnalysisView;
