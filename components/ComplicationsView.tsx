
import React from 'react';

interface Complication {
  name: string;
  frequency: string;
  type: string;
  management: string;
  severity: 'low' | 'medium' | 'high';
}

const complications: Complication[] = [
  { name: "Hipocalcemia (Toxicidad Citrato)", frequency: "Frecuente", type: "Metabólica", severity: "medium", management: "Gluconato de Calcio al 10% (1-2g) lento EV o infusión continua. Monitoreo de síntomas (parestesias)." },
  { name: "Hipotensión Arterial", frequency: "Moderada", type: "Hemodinámica", severity: "high", management: "Bolo de SF 0.9%, reducir flujo de bomba, evaluar trendelenburg. Descartar hipovolemia absoluta." },
  { name: "Reacción Alérgica / Urticaria", frequency: "Variable", type: "Inmunológica", severity: "low", management: "Antihistamínicos (Difenhidramina) +/- Hidrocortisona. Evaluar cambio de solución de reposición." },
  { name: "Coagulopatía por Depleción", frequency: "Recurrente", type: "Hematológica", severity: "medium", management: "Considerar reposición final con PFC si hay riesgo hemorrágico alto o procedimientos invasivos." },
  { name: "Anafilaxia (Albúmina/PFC)", frequency: "Rara", type: "Grave", severity: "high", management: "Adrenalina IM inmediata, suspender procedimiento, soporte ventilatorio y hemodinámico avanzado." },
  { name: "Infección de Catéter (VVC)", frequency: "Tardía", type: "Infecciosa", severity: "high", management: "Técnica aséptica rigurosa, cura de sitio de inserción cada 72hs. Vigilancia de fiebre post-procedimiento." },
  { name: "Embolismo Gaseoso", frequency: "Muy Rara", type: "Mecánica", severity: "high", management: "Posición de Durant (decúbito lateral izquierdo y Trendelenburg), O2 al 100%, suspender bomba." },
];

export const ComplicationsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Prevenir</p>
          <p className="text-sm font-bold text-rose-700">Checklist de seguridad antes de conectar al paciente.</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Monitorear</p>
          <p className="text-sm font-bold text-amber-700">TA cada 15 min. ECG continuo si usa citrato.</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Disponibilidad</p>
          <p className="text-sm font-bold text-emerald-700">Gluconato de Calcio y Adrenalina al pie de cama.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Evento</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Frecuencia</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Gravedad</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Intervención Crítica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complications.map((c, idx) => (
                <tr key={idx} className="hover:bg-rose-50/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="text-sm font-black text-slate-700">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{c.type}</div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-xs font-bold text-slate-500">{c.frequency}</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      c.severity === 'high' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 
                      c.severity === 'medium' ? 'bg-amber-500' : 'bg-slate-300'
                    }`}></span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {c.management}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-900 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-rose-400 mb-1">Nota de Seguridad Crítica</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                En caso de cualquier evento adverso severo, suspenda inmediatamente la bomba de aféresis, mantenga la vía permeable con solución fisiológica y solicite asistencia del equipo de guardia de la UTI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
