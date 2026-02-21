
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Rss, Twitter, Youtube, Globe, Search, Loader2, Link as LinkIcon, 
  RefreshCw, AlertCircle, Cpu, Database, Activity, Terminal, 
  Trash2, Play, Pause, ChevronDown, CheckCircle, ExternalLink,
  Zap, Share2, Network, Radio, HardDrive, Wifi, Layers
} from 'lucide-react';
import { OSINT_KEYWORDS, LINKED_PROJECTS, NETWORK_NODES } from '../constants';

interface FeedItem {
  id: string;
  platform: 'X' | 'YouTube' | 'Web' | 'Telegram';
  title: string;
  keyword: string;
  time: string;
  status: 'Live' | 'Archive' | 'Pending';
  confidence: number;
}

const FEED_TEMPLATES = [
  { platform: 'X', title: 'رصد تحركات آليات عسكرية بالقرب من معبر التنف', keyword: 'عسكري' },
  { platform: 'Web', title: 'تحليل اقتصادي: تذبذب سعر الصرف في أسواق دمشق', keyword: 'البنك المركزي' },
  { platform: 'YouTube', title: 'بث مباشر: افتتاح مركز تدريب مهني في حلب', keyword: 'سوريا' },
  { platform: 'Telegram', title: 'تنسيق محلي: مظاهرات مرتقبة في السويداء الجمعة', keyword: 'مظاهرات' },
  { platform: 'X', title: 'تحديث: انخفاض منسوب مياه نهر الفرات', keyword: 'الفرات' },
  { platform: 'Web', title: 'تقرير الخارجية السورية حول العلاقات العربية', keyword: 'الخارجية السورية' },
];

const OSINTView: React.FC = () => {
  const [isCrawling, setIsCrawling] = useState(false);
  const [activeNodes, setActiveNodes] = useState(NETWORK_NODES);
  const [feeds, setFeeds] = useState<FeedItem[]>([
    { id: '1', platform: 'X', title: 'رصد نشاط متزايد حول "مخيمات خربة جوز"', keyword: 'مخيمات', time: 'منذ دقيقتين', status: 'Live', confidence: 92 },
    { id: '2', platform: 'Web', title: 'تحليل مقال من "عنب بلدي" حول الوضع في درعا', keyword: 'درعا', time: 'منذ 10 دقائق', status: 'Archive', confidence: 85 },
    { id: '3', platform: 'YouTube', title: 'فيديو بث مباشر من جسر الشغور - نهر العاصي', keyword: 'العاصي', time: 'Live', status: 'Live', confidence: 98 },
    { id: '4', platform: 'X', title: 'تغريدات عن "استخبارات سوريا" في السويداء', keyword: 'السويداء', time: 'منذ 15 دقيقة', status: 'Live', confidence: 89 },
  ]);
  const [crawlerStats, setCrawlerStats] = useState({ hits: 3840, activeKeywords: 42, dataProcessed: '4.8 GB' });
  const [log, setLog] = useState<string[]>(["[SYSTEM]: Harvester Initialized.", "[AUTH]: Secured connection (Proxy SY-10).", "[NET]: Linking with Google Studio Projects..."]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLog(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString('ar-SA')}] ${msg}`]);
  };

  const generateNewFeed = useCallback(() => {
    const template = FEED_TEMPLATES[Math.floor(Math.random() * FEED_TEMPLATES.length)];
    const newItem: FeedItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...template,
      time: 'الآن',
      status: 'Live',
      confidence: Math.floor(Math.random() * 15) + 85,
    } as FeedItem;
    
    setFeeds(prev => [newItem, ...prev.slice(0, 19)]);
    setCrawlerStats(prev => ({ ...prev, hits: prev.hits + 1 }));
    addLog(`قطف معلومات: ${newItem.platform} -> ${newItem.keyword} (تشبيك مباشر)`);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isCrawling) {
      interval = setInterval(generateNewFeed, 1500);
    }
    return () => clearInterval(interval);
  }, [isCrawling, generateNewFeed]);

  const toggleCrawl = () => {
    setIsCrawling(!isCrawling);
    addLog(isCrawling ? "Harvesting paused." : "Harvesting engine active. SY-WEB-LIVE protocol initiated.");
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      {/* Dynamic Connectivity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {activeNodes.map((node) => (
          <div key={node.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden group hover:border-red-600/40 transition-all shadow-xl">
            <div className={`absolute top-0 right-0 w-1 h-full ${node.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-red-500 transition-colors">
                <HardDrive size={16} />
              </div>
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${node.status === 'Active' ? 'bg-green-900/20 text-green-500' : 'bg-yellow-900/20 text-yellow-500'}`}>
                {node.status}
              </span>
            </div>
            <h4 className="text-xs font-black text-white mb-1 truncate">{node.name}</h4>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-1000 ${node.load > 80 ? 'bg-red-600' : 'bg-blue-600'}`} style={{ width: `${node.load}%` }}></div>
            </div>
            <p className="text-[8px] text-slate-600 font-bold mt-1 uppercase tracking-tighter">الحمل: {node.load}%</p>
          </div>
        ))}
      </div>

      {/* Main Command & Networking Sync Panel */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
        <div className="flex-1 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-black opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 blur-3xl rounded-full"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${isCrawling ? 'bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] rotate-3' : 'bg-slate-800 border border-slate-700'}`}>
               <Layers className={`${isCrawling ? 'text-white animate-pulse' : 'text-slate-500'}`} size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white flex items-center gap-4 tracking-tighter">
                بوابة قطف وتشبيك المعلومات (Network Hub 105)
              </h2>
              <p className="text-slate-400 mt-2 font-bold flex items-center gap-3">
                <Wifi size={18} className="text-green-500" />
                تكامل مباشر مع Google Studio وقنوات التواصل الاجتماعي (X, YouTube, Telegram)
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={toggleCrawl}
            className={`px-12 rounded-3xl font-black flex flex-col items-center justify-center gap-1 transition-all shadow-xl transform active:scale-95 text-xl min-w-[220px] ${
              isCrawling 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30' 
                : 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/30'
            }`}
          >
            {isCrawling ? <Pause size={32} /> : <Play size={32} />}
            <span className="text-xs uppercase tracking-widest">{isCrawling ? 'إيقاف القطف' : 'بدء التشبيك الحي'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Networking & Project Sync */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <h3 className="text-[11px] font-black text-slate-500 uppercase mb-6 tracking-widest flex items-center gap-2">
              <Share2 size={16} className="text-blue-500" /> تشبيك Google Studio
            </h3>
            <div className="space-y-4">
               {LINKED_PROJECTS.map(proj => (
                 <div key={proj.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800 group hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${proj.status === 'متصل' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                       <span className="text-xs font-black text-white">{proj.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{proj.sync}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-black border border-slate-800 rounded-3xl p-6 shadow-xl h-[350px] flex flex-col relative overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Terminal size={14} className="text-green-500" /> سجل التشبيك المباشر
            </h3>
            <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 custom-scrollbar text-green-400 opacity-90 scroll-smooth" ref={scrollRef}>
              {log.map((line, i) => (
                <div key={i} className="flex gap-2 group">
                  <span className="text-slate-700 font-bold">{i}</span>
                  <span className="group-hover:text-white transition-colors">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Integrated Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[750px]">
            <div className="p-6 bg-slate-800/40 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20 shadow-inner">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">قطف المعلومات اللحظي (Web-Live Feed)</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    متصل مع خوارزميات الدكتور مشهور (SY-105)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 custom-scrollbar bg-slate-950/20">
              {feeds.map((feed, idx) => (
                <div key={feed.id} className={`p-6 hover:bg-slate-800/40 transition-all group border-r-4 ${idx === 0 && isCrawling ? 'border-red-600 bg-red-600/5' : 'border-transparent'}`}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-6 flex-1">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 shrink-0 ${
                        feed.platform === 'X' ? 'bg-black text-white border border-slate-700' :
                        feed.platform === 'YouTube' ? 'bg-red-600 text-white shadow-red-600/20' :
                        feed.platform === 'Telegram' ? 'bg-blue-500 text-white shadow-blue-500/20' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {feed.platform === 'X' ? <Twitter size={30} /> : 
                         feed.platform === 'YouTube' ? <Youtube size={30} /> : 
                         feed.platform === 'Telegram' ? <Play size={30} /> : <Globe size={30} />}
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-black text-white group-hover:text-red-500 transition-colors">{feed.title}</h4>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                            feed.status === 'Live' ? 'bg-green-600 text-white shadow-lg animate-pulse' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {feed.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 text-[12px] font-black">
                           <div className="flex items-center gap-2">
                             <span className="text-slate-500 uppercase tracking-tighter">الوسم:</span>
                             <span className="text-red-500">#{feed.keyword}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-slate-500 uppercase tracking-tighter">الموثوقية:</span>
                             <span className="text-green-500">{feed.confidence}%</span>
                           </div>
                           <span className="text-slate-600 font-mono italic mr-auto">{feed.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all shadow-lg border border-slate-700">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {isCrawling && (
                <div className="p-16 text-center bg-slate-900/80 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Radio size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <p className="mt-6 text-lg font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">جاري قطف المعلومات من قنوات الويب المباشرة...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CrawlStat = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all group">
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-6 rounded-full ${color} shadow-lg shadow-current`}></div>
      <span className="text-xs text-slate-400 font-black tracking-tight">{label}</span>
    </div>
    <span className="text-lg font-black text-white font-mono group-hover:scale-110 transition-transform">{value}</span>
  </div>
);

export default OSINTView;
