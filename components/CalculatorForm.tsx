
import React from 'react';
import { ExchangeData, ReplacementFluid, SessionFrequency, MachineType } from '../types';
import { ASFA_PATHOLOGIES, MACHINES } from '../constants';

interface Props {
  data: ExchangeData;
  onChange: (newData: ExchangeData) => void;
}

export const CalculatorForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: (name === 'patientName' || name === 'indication' || name === 'replacementFluid' || name === 'sessionFrequency' || name === 'machineType') ? value : (parseFloat(value) || 0),
    });
  };

  const setMultiplier = (val: number) => onChange({ ...data, exchangeMultiplier: val });
  const setConcentration = (val: number) => onChange({ ...data, targetConcentration: val });
  const setFluid = (fluid: ReplacementFluid) => onChange({ ...data, replacementFluid: fluid });
  const setFrequency = (freq: SessionFrequency) => onChange({ ...data, sessionFrequency: freq });
  const setMachine = (machine: MachineType) => onChange({ ...data, machineType: machine });

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8">
      <h2 className="text-lg font-black flex items-center gap-2 text-slate-800 uppercase tracking-tight">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Entrada de Datos
      </h2>

      <div className="space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2">Nombre del Paciente</label>
          <input 
            type="text" 
            name="patientName" 
            value={data.patientName} 
            onChange={handleChange} 
            placeholder="Apellido y Nombre"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-800 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2">Indicación (ASFA)</label>
          <div className="relative">
            <select
              name="indication"
              value={data.indication}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-bold text-slate-800 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="">Seleccione una patología...</option>
              {ASFA_PATHOLOGIES.map((pathology) => (
                <option key={pathology} value={pathology}>
                  {pathology}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 11.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2">Peso (kg)</label>
            <input 
              type="number" 
              name="weight" 
              value={data.weight === 0 ? '' : data.weight} 
              onChange={handleChange} 
              placeholder="0"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-black text-slate-800 transition-all text-center text-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2">Hto (%)</label>
            <input 
              type="number" 
              name="hct" 
              value={data.hct === 0 ? '' : data.hct} 
              onChange={handleChange} 
              placeholder="0"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-black text-slate-800 transition-all text-center text-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2">Sesiones y Frecuencia</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="number" 
                  name="sessions" 
                  value={data.sessions === 0 ? '' : data.sessions} 
                  onChange={handleChange} 
                  placeholder="1"
                  className="w-24 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none font-black text-slate-800 transition-all text-center text-xl"
                />
                <div className="flex-1 flex bg-slate-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setFrequency('consecutive')}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${data.sessionFrequency === 'consecutive' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
                  >
                    Seguidos
                  </button>
                  <button
                    onClick={() => setFrequency('alternate')}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${data.sessionFrequency === 'alternate' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
                  >
                    Alternos
                  </button>
                </div>
              </div>
           </div>
        </div>

        {/* Selector de Máquina */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2 mb-3">Máquina de Aféresis</label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
            {MACHINES.map(m => (
              <button
                key={m}
                onClick={() => setMachine(m)}
                className={`py-3 rounded-xl text-[9px] font-black uppercase transition-all ${data.machineType === m ? 'bg-white text-sky-700 shadow-md' : 'text-slate-500'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Fluido de Reposición */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block pl-2 mb-3">Fluido de Reposición</label>
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setFluid('albumin')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${data.replacementFluid === 'albumin' ? 'bg-white text-sky-700 shadow-md' : 'text-slate-500'}`}
            >
              Albúmina 20%
            </button>
            <button
              onClick={() => setFluid('pfc')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${data.replacementFluid === 'pfc' ? 'bg-white text-indigo-700 shadow-md' : 'text-slate-500'}`}
            >
              Plasma Fresco (PFC)
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 space-y-8">
        <div>
          <label className="text-xs font-black uppercase tracking-widest flex justify-between items-center mb-4">
            <span className="text-sky-700">Intercambio (VPE)</span>
            <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-black">{data.exchangeMultiplier.toFixed(1)}x</span>
          </label>
          <div className="flex gap-2 mb-4">
            {[1.0, 1.2, 1.5].map(val => (
              <button
                key={val}
                onClick={() => setMultiplier(val)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${data.exchangeMultiplier === val ? 'bg-sky-700 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {val.toFixed(1)}x
              </button>
            ))}
          </div>
        </div>

        {data.replacementFluid === 'albumin' && (
          <div>
            <label className="text-xs font-black uppercase tracking-widest flex justify-between items-center mb-4">
              <span className="text-sky-700">Concentración de Albúmina</span>
              <span className="bg-sky-600 px-3 py-1 rounded-full text-white text-xs font-black">{data.targetConcentration.toFixed(1)}%</span>
            </label>
            <div className="flex gap-2 mb-4">
              {[3.5, 4.0, 5.0].map(val => (
                <button
                  key={val}
                  onClick={() => setConcentration(val)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${data.targetConcentration === val ? 'bg-sky-700 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {val.toFixed(1)}%
                </button>
              ))}
            </div>
            <input 
              type="range" 
              name="targetConcentration" 
              min="1" 
              max="5" 
              step="0.5" 
              value={data.targetConcentration} 
              onChange={handleChange} 
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600" 
            />
          </div>
        )}

        {data.replacementFluid === 'pfc' && (
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Nota PFC</p>
            <p className="text-[11px] font-medium text-indigo-600/80 leading-relaxed">
              La reposición con Plasma Fresco Congelado se realiza a volumen total de recambio (1:1). Recomendado para PTT o pacientes con riesgo hemorrágico.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
