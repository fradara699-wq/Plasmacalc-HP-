
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Datos del Paciente",
      desc: "Ingrese el peso real en kg y el hematocrito actual del paciente. El sistema calculará el Volumen Plasmático Estimado (VPE) usando el estándar institucional de 70ml/kg.",
      icon: "👤"
    },
    {
      title: "2. Parámetros de Recambio",
      desc: "Ajuste el multiplicador de intercambio (generalmente 1.0 a 1.5 VPE) y la concentración final de Albúmina deseada (protocolo estándar 4%).",
      icon: "⚙️"
    },
    {
      title: "3. Preparación de Mezcla",
      desc: "Observe la 'Guía de Preparación'. Indica cuántos viales de 50cc (Albúmina 20%) debe añadir a cada litro de SF 0.9% para lograr la isovolemia.",
      icon: "🧪"
    },
    {
      title: "4. Seguridad y Guías",
      desc: "Consulte la pestaña 'Complicaciones' para protocolos de seguridad y 'Indicaciones' para categorías ASFA 2023 vigentes.",
      icon: "🛡️"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col relative">
        
        <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">Manual de Operación UTI</h2>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">PlasmaCalc v2.5 • Córdoba</p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar manual"
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img" aria-hidden="true">{step.icon}</span>
                  <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Seguridad del Paciente (UTI)
            </p>
            <p className="text-xs text-blue-700/70 font-medium leading-relaxed">
              Siga estrictamente los protocolos de identificación de paciente y verificación de insumos antes de iniciar la terapia. La reposición isovolumétrica debe ser monitoreada continuamente por el personal de la Unidad de Terapia Intensiva.
            </p>
          </div>
        </div>

        <div className="p-5 md:p-6 bg-blue-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-80 text-center sm:text-left">
            Hospital Privado Universitario de Córdoba
          </p>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-3 bg-white text-blue-800 rounded-xl md:rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
      
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
};
