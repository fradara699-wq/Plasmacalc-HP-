
import React, { useState, useMemo } from 'react';

interface Indication {
  disease: string;
  category: string;
  grade: string;
  recommendation: string;
  fluid?: string;
}

interface IndicationGroups {
  [key: string]: Indication[];
}

const indicationData: IndicationGroups = {
  neurologia: [
    { disease: "Síndrome de Guillain-Barré", category: "I", grade: "1A", recommendation: "Recambio de 1.0 - 1.5 VPE, 5-6 sesiones." },
    { disease: "Miastenia Gravis (Crisis/Pre-op)", category: "I", grade: "1B", recommendation: "2-5 recambios según respuesta clínica." },
    { disease: "CIDP (Agudo/Mantenimiento)", category: "I", grade: "1B", recommendation: "Recambios periódicos según estabilidad." },
    { disease: "NMOSD (Neuromielitis Óptica)", category: "I", grade: "1B", recommendation: "Tratamiento de ataque en recaídas agudas." },
    { disease: "Encefalitis por Receptores NMDA", category: "I", grade: "1B", recommendation: "Parte de la terapia de primera línea." },
    { disease: "Esclerosis Múltiple (Recaída aguda)", category: "II", grade: "1C", recommendation: "Si falla el tratamiento con esteroides." },
  ],
  renal: [
    { disease: "S. Goodpasture (Anti-GBM)", category: "I", grade: "1B", recommendation: "Diario hasta desaparición de anticuerpos." },
    { disease: "Vasculitis ANCA (RPGN grave)", category: "II", grade: "1C", recommendation: "En presencia de hemorragia alveolar o Cr >5.8." },
    { disease: "GEFS Recurrente (Trasplante)", category: "I", grade: "1B", recommendation: "Inicio precoz post-trasplante." },
    { disease: "Rechazo Humoral (AMR)", category: "I/II", grade: "1B", recommendation: "Combinado con IVIG/Rituximab." },
    { disease: "SHU Atípico (Complemento)", category: "II", grade: "2C", recommendation: "Eculizumab es primera línea; PE si no disponible." },
  ],
  hepatica: [
    { disease: "Falla Hepática Aguda", category: "I/II", grade: "1A", recommendation: "High-volume PE (15% peso) mejora sobrevida." },
    { disease: "Enfermedad de Wilson (Fulminante)", category: "I", grade: "1C", recommendation: "Bridge al trasplante; remoción de cobre libre." },
    { disease: "Prurito por Colestasis", category: "III", grade: "2C", recommendation: "En casos refractarios a tratamiento médico." },
    { disease: "Falla Hepática Crónica agudizada", category: "III", grade: "2B", recommendation: "Soporte temporal según protocolo ACLF." },
  ],
  pfc_reposicion: [
    { disease: "PTT (Púrpura Trombocitopénica Trombótica)", category: "I", grade: "1A", recommendation: "Recambio diario 1.0-1.5 VPE con PFC hasta normalizar plaquetas y LDH.", fluid: "PFC" },
    { disease: "SHU Atípico (si no hay Eculizumab)", category: "II", grade: "2C", recommendation: "Reposición con PFC para aportar factores del complemento faltantes.", fluid: "PFC" },
    { disease: "Falla Hepática con Coagulopatía grave", category: "II", grade: "1A", recommendation: "Uso de PFC para corregir TP/KPTT y factores de coagulación.", fluid: "PFC/Alb" },
    { disease: "Hemorragia Alveolar (Vasculitis + Coagulopatía)", category: "II", grade: "1C", recommendation: "Se prefiere PFC si existe riesgo hemorrágico activo o sangrado.", fluid: "PFC" },
    { disease: "Sobredosis de Warfarina (Sangrado agudo)", category: "III", grade: "2C", recommendation: "Solo si fallan concentrados de complejo protrombínico.", fluid: "PFC" },
  ]
};

const tabLabels: { [key: string]: string } = {
  neurologia: "Neurología",
  renal: "Renal",
  hepatica: "Hepática",
  pfc_reposicion: "Reposición PFC"
};

export const ClinicalIndications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('neurologia');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    const currentList = indicationData[activeTab];
    if (!searchTerm.trim()) return currentList;
    return currentList.filter(item => 
      item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recommendation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-800">Guía de Referencia</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categorías ASFA 2023</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <input 
              type="text"
              placeholder="Buscar patología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap p-1 bg-slate-200/50 rounded-2xl gap-1">
          {Object.keys(indicationData).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
              className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all min-w-[100px] ${
                activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        {filteredData.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">Patología</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Cat.</th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Grado</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">Plan Sugerido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={idx} className={`transition-colors ${activeTab === 'pfc_reposicion' ? 'hover:bg-amber-50/30' : 'hover:bg-indigo-50/30'}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{item.disease}</span>
                      {item.fluid && (
                        <span className="text-[9px] font-black text-amber-600 uppercase mt-1">
                          Reposición: {item.fluid}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                      item.category.includes('I') && !item.category.includes('III') ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      CAT {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-xs font-mono font-bold text-slate-400">{item.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 leading-tight">{item.recommendation}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <p className="text-sm font-bold text-slate-400">No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-indigo-50/50 border-t border-indigo-100 flex items-start gap-3">
        <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-[10px] text-indigo-600 font-bold leading-tight uppercase tracking-tight">
          {activeTab === 'pfc_reposicion' 
            ? "Para PTT y coagulopatías, la reposición se realiza con Plasma Fresco Congelado (PFC) para reponer ADAMTS13 o factores faltantes." 
            : "Recambio estándar: 1.0 - 1.5 VPE. Reposición: Albúmina 4-5% (Isovolumétrica). Categoría I: Primera línea."
          }
        </p>
      </div>
    </div>
  );
};
