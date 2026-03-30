
import React, { useState } from 'react';
import { getClinicalInsight } from '../services/geminiService';

export const AiAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (customQuery?: string) => {
    const activeQuery = customQuery || query;
    if (!activeQuery.trim()) return;
    setLoading(true);
    const result = await getClinicalInsight(activeQuery);
    setResponse(result || 'No se obtuvo respuesta.');
    setLoading(false);
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResponse('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl shadow-xl text-white border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Asistente Clínico
        </h2>
        <span className="text-[10px] font-black bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/40 uppercase tracking-tighter">
          Guías ASFA 2023
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Consulte categorías ASFA, protocolos..."
            className="w-full p-4 pr-12 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-white/30 text-sm"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>

        {response && query.trim() && (
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-h-80 overflow-y-auto custom-scrollbar border-l-2 border-l-indigo-500 animate-in fade-in zoom-in-95 duration-200">
            <div className="prose prose-invert prose-sm">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-200">{response}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {['Categorías ASFA', 'Indicación PTT', 'Miastenia Gravis', 'Categoría Guillain-Barré'].map((tag) => (
            <button
              key={tag}
              onClick={() => { handleInputChange(tag); handleAsk(tag); }}
              className="text-[10px] font-bold px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all uppercase tracking-wider text-slate-400 hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
