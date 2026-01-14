import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, Navigation, Languages, CreditCard, 
  CheckCircle, Clock, Thermometer, Plane, ShoppingBag, 
  Trash2, Plus, ArrowRight, ExternalLink, MessageSquare, Info,
  ChevronRight, Camera, Wallet, Map, Settings, Phone, AlertTriangle,
  Image as ImageIcon, X, RefreshCw, Sun, Copy
} from 'lucide-react';

const THEMES = {
  classic: { name: "經典白", panelBg: "#f5f5f7", cardBg: "#ffffff", text: "#1c1c1e", sub: "#666666", accent: "#007aff", border: "#d1d1d6", summaryBg: "#e5e5ea", statusBg: "#f2f2f7", statusBorder: "#e5e5ea", stepper: { passed: "#007aff", urgent: "#d32f2f", done: "#34c759" } },
  morandiOat: { name: "奶油暖沙", panelBg: "#E8E2D6", cardBg: "#FFFFFF", text: "#524A40", sub: "#8C8375", accent: "#A68B6D", border: "#D4C8B8", summaryBg: "#DED3C1", statusBg: "#F7F5F2", statusBorder: "#DED3C1", stepper: { passed: "#A68B6D", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiSage: { name: "鼠尾草綠", panelBg: "#D4D9D0", cardBg: "#F2F4F0", text: "#3E453F", sub: "#717D73", accent: "#7B8E7E", border: "#BCC4BA", summaryBg: "#C4CCC1", statusBg: "#FFFFFF", statusBorder: "#BCC4BA", stepper: { passed: "#7B8E7E", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiFog: { name: "煙雨霧藍", panelBg: "#D6DBE0", cardBg: "#F0F2F5", text: "#3A454D", sub: "#687580", accent: "#748A9D", border: "#BEC7D1", summaryBg: "#C4CDD6", statusBg: "#FFFFFF", statusBorder: "#BEC7D1", stepper: { passed: "#748A9D", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiRose: { name: "煙粉玫瑰", panelBg: "#E5D5D5", cardBg: "#F9F4F4", text: "#5A4444", sub: "#8E7272", accent: "#B5838D", border: "#D6C2C2", summaryBg: "#DBC6C6", statusBg: "#FFF9F9", statusBorder: "#DBC6C6", stepper: { passed: "#B5838D", urgent: "#C9ADA7", done: "#8A9A8C" } },
  morandiClay: { name: "陶土大地", panelBg: "#D9C5B2", cardBg: "#F2E8DF", text: "#4A3F35", sub: "#7D6B5D", accent: "#8C6A5D", border: "#C4B2A3", summaryBg: "#CBB6A4", statusBg: "#FFFFFF", statusBorder: "#C4B2A3", stepper: { passed: "#8C6A5D", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiMatcha: { name: "靜謐抹綠", panelBg: "#BFC9B3", cardBg: "#E8EDDF", text: "#353D2F", sub: "#646D5B", accent: "#5F6D4E", border: "#A7B399", summaryBg: "#A9B49C", statusBg: "#FFFFFF", statusBorder: "#A7B399", stepper: { passed: "#5F6D4E", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiLavender: { name: "灰調薰紫", panelBg: "#D1CCD9", cardBg: "#F0EDF2", text: "#46414D", sub: "#746E7D", accent: "#7D758C", border: "#B9B2C4", summaryBg: "#BCB6C7", statusBg: "#FFFFFF", statusBorder: "#B9B2C4", stepper: { passed: "#7D758C", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiSeaSalt: { name: "海鹽蘇打", panelBg: "#C6D8D3", cardBg: "#EBF2F0", text: "#2F3D39", sub: "#5F706B", accent: "#5B8C85", border: "#A9BBB6", summaryBg: "#B0C4BE", statusBg: "#FFFFFF", statusBorder: "#A9BBB6", stepper: { passed: "#5B8C85", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiMustard: { name: "秋日芥黃", panelBg: "#E3D5B0", cardBg: "#F7F2E3", text: "#4D4530", sub: "#82785D", accent: "#A68B3E", border: "#D1C299", summaryBg: "#D9C9A1", statusBg: "#FFFFFF", statusBorder: "#D1C299", stepper: { passed: "#A68B3E", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiStone: { name: "灰泥石紋", panelBg: "#D1D1D1", cardBg: "#EAEAEA", text: "#333333", sub: "#666666", accent: "#555555", border: "#BBBBBB", summaryBg: "#C2C2C2", statusBg: "#F5F5F5", statusBorder: "#BBBBBB", stepper: { passed: "#555555", urgent: "#B5838D", done: "#8A9A8C" } },
  morandiCharcoal: { name: "冷調炭灰", panelBg: "#373E40", cardBg: "#4A5459", text: "#E0E0E0", sub: "#A0AAB0", accent: "#7EA1A5", border: "#5C6B73", summaryBg: "#2C3335", statusBg: "#5C6B73", statusBorder: "#2C3335", stepper: { passed: "#7EA1A5", urgent: "#B5838D", done: "#8A9A8C" } },
};

const ITINERARY = {
  '04-14': { date: '4/14', weekday: '週二', items: [{ name: "高雄小港 (KHH)", time: "06:55", type: "transport", note: "CI164 前往仁川", address: "高雄市小港區中山四路2號" }, { name: "仁川機場 (ICN)", time: "10:45", type: "transport", note: "入境後包車前往弘大", address: "인천광역시 중구 공항로 271" }, { name: "T-Luggage 弘大", time: "12:30", type: "service", note: "寄放行李", address: "서울특별시 마포구 양화로 188" }, { name: "風川鰻魚", time: "13:30", type: "food", note: "弘大 2 號出口步行 400m", address: "서울특별시 마포구 동교로 27길 39" }, { name: "KTX 首爾 → 釜山", time: "19:35", type: "transport", note: "抵達後搭計程車至飯店", address: "서울특별시 용산구 한강대로 405" }] },
  '04-15': { date: '4/15', weekday: '週三', items: [{ name: "甘川洞文化村", time: "10:00", type: "activity", note: "韓服體驗與拍照", address: "부산광역시 사하구 감내2로 203" }, { name: "松島海上纜車", time: "14:00", type: "activity", note: "跨海纜車體驗", address: "부산광역시 서구 송도해변로 171" }, { name: "白淺灘文化村", time: "16:00", type: "activity", note: "影島海景步道", address: "부산 영도구 영선동4가 605-3" }, { name: "姨母家烤貝", time: "18:30", type: "food", note: "影島海鮮特色", address: "부산광역시 영도구 감지해변길 98" }] },
  '04-16': { date: '4/16', weekday: '週四', items: [{ name: "海雲台鮑魚粥", time: "09:30", type: "food", note: "海邊鮮甜早餐", address: "부산광역시 해운代구 달맞이길62번길 7" }, { name: "膠囊列車 (尾浦)", time: "14:00", type: "activity", note: "需提前預約", address: "부산 해운대구 중동 948-1" }, { name: "味贊王鹽烤肉", time: "18:00", type: "food", note: "海雲台店", address: "부산광역시 해운대구 해운대로608번길 46" }] },
  '04-17': { date: '4/17', weekday: '週五', items: [{ name: "All Sunday Bagels", time: "10:30", type: "food", note: "西面熱門排隊店", address: "부산 부산진구 중앙대로680번길 19" }, { name: "田浦咖啡街", time: "13:30", type: "activity", note: "文青巷弄探索", address: "부산시 부산진구 동성로39번길 28" }, { name: "李在模披薩 (西面)", time: "16:30", type: "food", note: "釜山靈魂披薩", address: "부산 부산진구 전포대로 209번길 21" }] },
  '04-18': { date: '4/18', weekday: '週六', items: [{ name: "機張末家鮑魚粥", time: "11:30", type: "food", note: "附帶豐富小菜", address: "부산 기장군 기장읍 기장해안로 895" }, { name: "廣安里海灘", time: "16:00", type: "activity", note: "跨海大橋日落", address: "부산 수영구 광안해변로 219" }, { name: "熟成道烤肉", time: "19:00", type: "food", note: "廣安里人氣店", address: "부산 수영구 광안해변로 289" }] },
  '04-19': { date: '4/19', weekday: '週日', items: [{ name: "密陽豬肉湯飯", time: "09:00", type: "food", note: "草梁站 1 號出口", address: "부산 동구 중앙대로231번길 5" }, { name: "金海機場 (PUS)", time: "12:30", type: "transport", note: "14:25 起飛回高雄", address: "부산광역시 강서구 공항진입로 108" }] }
};

const apiKey = "AIzaSyDBgHTvNZ-PWZIBitw_6cz6IhIJMpzCdB4"; 

const App = () => {
  const [currentThemeKey, setCurrentThemeKey] = useState('classic');
  const [activeTab, setActiveTab] = useState('04-14');
  const theme = THEMES[currentThemeKey];
  const [modal, setModal] = useState(null);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('pusan_expenses') || '[]'));
  const [newExpense, setNewExpense] = useState({ item: '', amount: '', category: '飲食' });
  const [transInput, setTransInput] = useState("");
  const [transResult, setTransResult] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => { localStorage.setItem('pusan_expenses', JSON.stringify(expenses)); }, [expenses]);

  const weather = { temp: 18, high: 23, low: 9, status: "晴朗", advice: "早晚溫差大，注意保暖" };
  const exchangeRate = 0.024;
  const totalTWD = useMemo(() => Math.round(expenses.reduce((s, e) => s + (parseFloat(e.amount) * exchangeRate), 0)), [expenses]);

  const handleTranslate = async (text) => {
    const input = text || transInput;
    if (!input) return;
    setIsTranslating(true); setTransResult("正在翻譯中..."); setModal('translator'); 
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: `Translate this for a traveler to show to a local/driver: "${input}". Output ONLY the Korean translation in very large font.` }] }] })
      });
      const data = await res.json();
      setTransResult(data.candidates?.[0]?.content?.parts?.[0]?.text || "翻譯失敗");
    } catch (e) { setTransResult("連線異常"); }
    setIsTranslating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback("已複製地址！");
    setTimeout(() => setCopyFeedback(""), 2000);
  };

  return (
    <div style={{ backgroundColor: theme.panelBg, color: theme.text }} className="min-h-screen font-sans transition-colors duration-500 pb-20">
      <header className="sticky top-0 z-40 bg-inherit border-b px-4 py-3" style={{ borderColor: theme.border }}>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-black">2026 PUSAN<span style={{ color: theme.accent }}>.</span></h1>
          <div className="flex gap-2">
            {[{ id: 'notes', icon: AlertTriangle, label: '須知' }, { id: 'expenses', icon: Wallet, label: '記帳' }, { id: 'settings', icon: Settings, label: '設定' }].map(btn => (
              <button key={btn.id} onClick={() => setModal(btn.id)} className="flex flex-col items-center p-1.5 rounded-xl bg-black/5 min-w-[44px]">
                <btn.icon size={16} /><span className="text-[8px] font-bold mt-0.5">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {Object.entries(ITINERARY).map(([key, data]) => (
            <button key={key} onClick={() => setActiveTab(key)} 
              style={activeTab === key ? { backgroundColor: theme.accent, color: '#fff' } : { backgroundColor: theme.cardBg, color: theme.sub }}
              className={`flex-shrink-0 flex flex-col items-center min-w-[62px] p-2 rounded-2xl border transition-all ${activeTab === key ? 'shadow-md scale-105' : ''}`}>
              <span className="text-[9px] font-bold">{data.weekday}</span>
              <span className="text-base font-black">{data.date}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 space-y-4">
        {copyFeedback && <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-4 py-2 rounded-full z-50">{copyFeedback}</div>}
        {ITINERARY[activeTab].items.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: theme.cardBg, borderColor: theme.border }} className="rounded-[1.5rem] p-5 border shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-black/5">{item.time}</span>
              <div className="flex gap-2">
                {item.address && <>
                  <button onClick={() => copyToClipboard(item.address)} className="p-2.5 rounded-full bg-black/5"><Copy size={16} /></button>
                  <button onClick={() => handleTranslate(`請載我到：${item.name}\n${item.address}`)} className="p-2.5 rounded-full bg-black/5"><Languages size={16} /></button>
                  <button onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(item.address)}`)} className="p-2.5 rounded-full bg-black/5"><Navigation size={16} className="rotate-45" /></button>
                </>}
              </div>
            </div>
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-xs opacity-70 mb-2">{item.note}</p>
            {item.address && <div className="text-[9px] opacity-40 flex items-center gap-1 border-t pt-2 truncate"><MapPin size={10} /> {item.address}</div>}
          </div>
        ))}
      </main>

      <button onClick={() => setModal('translator')} style={{ backgroundColor: theme.accent, color: '#fff' }} className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-30"><Languages size={24} /></button>

      {/* 彈窗部分保持原樣 */}
      {modal === 'expenses' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div style={{ backgroundColor: theme.panelBg }} className="w-full max-w-lg rounded-t-[2rem] p-6 h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black">個人記帳本</h2><button onClick={() => setModal(null)} className="p-2 bg-black/5 rounded-full"><X size={18} /></button></div>
            <div style={{ backgroundColor: theme.accent, color: '#fff' }} className="p-6 rounded-2xl mb-6 shadow-lg">
              <div className="text-4xl font-black">NT$ {totalTWD.toLocaleString()}</div>
              <div className="text-[10px] opacity-60 mt-1">1 KRW ≈ {exchangeRate} TWD</div>
            </div>
            <div className="flex gap-2 mb-4">
              <input placeholder="項目" className="flex-grow p-3 bg-black/5 rounded-xl text-sm" value={newExpense.item} onChange={e => setNewExpense({...newExpense, item: e.target.value})} />
              <input type="number" placeholder="KRW" className="w-1/3 p-3 bg-black/5 rounded-xl text-sm" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} />
              <button onClick={() => { if(!newExpense.item || !newExpense.amount) return; setExpenses([...expenses, { ...newExpense, id: Date.now() }]); setNewExpense({ item: '', amount: '', category: '飲食' }); }} style={{ backgroundColor: theme.accent, color: '#fff' }} className="p-3 rounded-xl"><Plus size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
              {expenses.slice().reverse().map(e => (
                <div key={e.id} className="flex justify-between items-center p-4 bg-black/5 rounded-xl">
                  <div><div className="font-bold text-sm">{e.item}</div><div className="text-[10px] opacity-50">{parseInt(e.amount).toLocaleString()} KRW</div></div>
                  <div className="text-right"><div className="font-bold text-sm" style={{ color: theme.accent }}>NT$ {Math.round(e.amount * exchangeRate)}</div><button onClick={() => setExpenses(expenses.filter(ex => ex.id !== e.id))} className="text-red-400 text-[10px] font-bold">刪除</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {modal === 'settings' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div style={{ backgroundColor: theme.panelBg }} className="w-full max-w-lg rounded-t-[2rem] p-6 h-[70vh] flex flex-col">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black">網頁設定</h2><button onClick={() => setModal(null)} className="p-2 bg-black/5 rounded-full"><X size={18} /></button></div>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-8">
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => setCurrentThemeKey(key)} style={{ backgroundColor: t.cardBg, borderColor: currentThemeKey === key ? t.accent : 'transparent' }} className="flex flex-col items-center p-4 rounded-2xl border-2 shadow-sm">
                  <div className="w-6 h-6 rounded-full mb-2" style={{ backgroundColor: t.panelBg, border: `2px solid ${t.accent}` }} />
                  <span className="text-[10px] font-bold" style={{ color: t.text }}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modal === 'translator' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-4">
          <div style={{ backgroundColor: theme.panelBg }} className="w-full max-w-lg rounded-[2rem] p-6 h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black">即時翻譯助理</h2><button onClick={() => { setModal(null); setTransResult(""); }} className="p-2 bg-black/5 rounded-full"><X size={18} /></button></div>
            <textarea placeholder="請輸入中文..." className="w-full h-32 p-4 bg-black/5 rounded-2xl outline-none text-sm mb-4" value={transInput} onChange={e => setTransInput(e.target.value)} />
            <button onClick={() => handleTranslate()} disabled={isTranslating} style={{ backgroundColor: theme.accent, color: '#fff' }} className="w-full py-4 rounded-2xl font-bold mb-6 disabled:opacity-50">
              {isTranslating ? '正在生成韓文...' : '開始翻譯'}
            </button>
            {transResult && <div className="p-8 rounded-3xl bg-black/5 border text-center overflow-y-auto max-h-[300px]"><div className="text-3xl font-black leading-tight">{transResult}</div></div>}
          </div>
        </div>
      )}

      {modal === 'notes' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div style={{ backgroundColor: theme.panelBg }} className="w-full max-w-lg rounded-t-[2rem] p-6 h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-black">2026 注意事項</h2><button onClick={() => setModal(null)} className="p-2 bg-black/5 rounded-full"><X size={18} /></button></div>
            <div className="overflow-y-auto space-y-6 pb-8">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2"><Info size={16}/> 入境必讀</h3>
                <p className="text-xs text-amber-700 mt-2">持台灣護照免簽 90 天。建議出發前完成電子入境卡（Q-Code）。</p>
              </div>
              {[{ cat: "證件通訊", items: ["護照正影本", "eSIM (具通話號碼)"] }, { cat: "電器生活", items: ["220V 圓孔轉接頭", "牙刷組", "春季外套"] }].map(g => (
                <div key={g.cat}><p className="text-[10px] font-bold opacity-40 mb-2 uppercase">{g.cat}</p>
                  <div className="space-y-2">{g.items.map(i => <label key={i} className="flex items-center gap-3 p-3 bg-black/5 rounded-xl text-sm font-medium"><input type="checkbox" className="w-4 h-4" />{i}</label>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
