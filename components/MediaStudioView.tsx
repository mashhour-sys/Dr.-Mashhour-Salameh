
import React, { useState } from 'react';
// Added missing Share2 import
import { Image as ImageIcon, Sparkles, Loader2, Download, Send, Layers, PieChart, Map as MapIcon, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { APP_VERSION, NEWS_DISTRIBUTION } from '../constants';

const MediaStudioView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationType, setGenerationType] = useState<'infographic' | 'symbolic'>('infographic');

  const generateMedia = async (type: 'infographic' | 'symbolic') => {
    setLoading(true);
    setGenerationType(type);
    try {
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let prompt = "";
      if (type === 'infographic') {
        prompt = `
          High-quality strategic infographic titled "سوريا في 3 أيام: أرقام وأحداث" (Syria in 3 days: Numbers and Events). 
          Date: 18 February 2026. 
          Display a data visualization (Bar or Pie chart) showing news distribution: 31% Security (أمني), 14% International (دولي), 11% Humanitarian (إنساني).
          Include icons: Syrian Flag, Tank (for security), Aid box (for humanitarian).
          Include a timeline of events: US withdrawal from Shaddadi, Israeli incursions in Quneitra, protests in Deir ez-Zor, aid convoy to Suwayda.
          Colors: Professional blue, green, and red. Clean fonts, high-end design for a national intelligence unit.
          Bottom caption: "وكالات – 18 شباط 2026".
        `;
      } else {
        prompt = `
          Expressive symbolic strategic image of Syria. 
          Background: A subtle map of Syria with glowing light points in Daraa, Quneitra, and Deir ez-Zor. 
          Foreground: Three integrated scenes: 
          1. South: An Israeli military patrol with a dog (Incursions) with the Arabic text "توغلات يومية". 
          2. East: Oil refinery fires and protesters (Deir ez-Zor protests). 
          3. Damascus: An Islamic Unity conference with a speaker on a podium. 
          In the bottom corner: "سوريا – 18 شباط 2026". 
          Artistic realistic style with misty, tense atmospheric lighting. 
          Cinematic intelligence unit aesthetic.
        `;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
      });

      // Iterate through candidates and parts to find the image part
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Image Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <ImageIcon className="text-red-500" size={36} />
            استوديو الإنتاج الإعلامي الاستراتيجي
          </h2>
          <p className="text-slate-400 mt-2 font-bold italic">توليد المحتوى البصري والإنفوغرافيك للتقارير الوطنية</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Version Control: {APP_VERSION}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <Sparkles className="text-yellow-500" size={24} />
              خيارات التوليد الآلي
            </h3>
            <div className="space-y-4">
              <button 
                onClick={() => generateMedia('infographic')}
                disabled={loading}
                className={`w-full p-6 rounded-2xl border transition-all flex items-center gap-5 text-right group ${
                  generationType === 'infographic' && generatedImage ? 'bg-red-600/10 border-red-600 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-red-500'
                }`}
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <PieChart size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-lg">إنفوغرافيك إحصائي</p>
                  <p className="text-[10px] font-bold opacity-60">توزيع الأحداث (16-18 فبراير)</p>
                </div>
              </button>

              <button 
                onClick={() => generateMedia('symbolic')}
                disabled={loading}
                className={`w-full p-6 rounded-2xl border transition-all flex items-center gap-5 text-right group ${
                  generationType === 'symbolic' && generatedImage ? 'bg-red-600/10 border-red-600 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-red-500'
                }`}
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <MapIcon size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-lg">صورة تعبيرية رمزية</p>
                  <p className="text-[10px] font-bold opacity-60">مشاهد استراتيجية موحدة</p>
                </div>
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
                <p className="text-[10px] text-slate-500 font-black uppercase mb-2">المعايير التقنية</p>
                <ul className="text-[11px] text-slate-400 space-y-2 font-bold">
                  <li className="flex items-center gap-2">• الدقة: 2K High Definition</li>
                  <li className="flex items-center gap-2">• النمط: استراتيجي/واقعي</li>
                  <li className="flex items-center gap-2">• المحرك: Gemini 2.5 Flash Image</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-1 shadow-2xl overflow-hidden min-h-[600px] flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {loading ? (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mx-auto"></div>
                  <Sparkles className="absolute inset-0 m-auto text-red-600 animate-pulse" size={32} />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-black text-white animate-pulse">جاري المعالجة البصرية...</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">تطبيق الخوارزميات الوطنية SY-105</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="w-full h-full p-4 space-y-6 flex flex-col items-center">
                <div className="relative group w-full flex-1 flex items-center justify-center">
                  <img src={generatedImage} alt="Generated Content" className="max-w-full max-h-[500px] rounded-2xl shadow-2xl border border-slate-800 group-hover:scale-[1.01] transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-2xl">
                     <button className="bg-white text-black px-6 py-2 rounded-full font-black flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-xl">
                       <Download size={20} /> حفظ الصورة
                     </button>
                  </div>
                </div>
                <div className="w-full bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex justify-between items-center">
                   <div>
                     <p className="text-sm font-black text-white">
                       {generationType === 'infographic' ? 'تقرير إنفوغرافيك 18 فبراير' : 'مشهد استراتيجي موحد'}
                     </p>
                     <p className="text-[10px] text-slate-500 font-bold">تم التوليد في: {new Date().toLocaleTimeString('ar-SA')}</p>
                   </div>
                   <div className="flex gap-3">
                     <button className="p-3 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all">
                       <Layers size={20} />
                     </button>
                     <button className="p-3 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all">
                       <Share2 size={20} />
                     </button>
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center opacity-30 select-none">
                <ImageIcon size={120} className="mx-auto mb-6" />
                <p className="text-2xl font-black uppercase tracking-widest">انتظار التوجيه البصري</p>
                <p className="mt-2 font-bold">اختر نوع المحتوى من القائمة الجانبية للبدء</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStudioView;
