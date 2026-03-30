
import React, { useState, useMemo } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ClinicalIndications } from './components/ClinicalIndications';
import { ComplicationsView } from './components/ComplicationsView';
import { InstructionModal } from './components/InstructionModal';
import { AiAssistant } from './components/AiAssistant';
import { UtiLogo } from './components/UtiLogo';
import { ExchangeData, CalculationResults } from './types';
import { DEFAULT_EXCHANGE_DATA, ALB_20_CONC, VIAL_VOL, SALINE_UNIT, EBV_STANDARD } from './constants';
import { generatePrescriptionPDF } from './services/pdfService';
import { exportToCsv } from './services/csvService';

type MainTab = 'calculator' | 'guides' | 'complications';

function App() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('calculator');
  const [exchangeData, setExchangeData] = useState<ExchangeData>(DEFAULT_EXCHANGE_DATA);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const results = useMemo((): CalculationResults => {
    const { 
      patientName, 
      indication, 
      weight, 
      hct, 
      sessions, 
      sessionFrequency, 
      exchangeMultiplier, 
      targetConcentration, 
      replacementFluid, 
      machineType 
    } = exchangeData;
    
    // Cálculo de volumen base
    const tbvMl = weight * EBV_STANDARD;
    const epvMl = tbvMl * (1 - hct / 100);
    const exchangeVolume = epvMl * exchangeMultiplier;

    const baseResult = {
      tbv: tbvMl,
      epv: epvMl,
      exchangeVolume,
      patientName,
      indication,
      sessions,
      sessionFrequency,
      replacementFluid,
      machineType
    };

    if (replacementFluid === 'albumin') {
      const Ct = targetConcentration / 100; 
      const Ca = ALB_20_CONC / 100; 

      // Volumen de albúmina pura necesaria para alcanzar Ct en un volumen final exchangeVolume
      const totalVolAlb = exchangeVolume * (Ct / Ca);
      const totalVials = totalVolAlb / VIAL_VOL;
      const totalSaline = exchangeVolume - totalVolAlb;
      const vialsPerLiter = (Ct * SALINE_UNIT) / (VIAL_VOL * (Ca - Ct));

      return {
        ...baseResult,
        vialsPerLiter,
        totalVials,
        totalSaline,
        totalPfc: 0,
        finalConcentration: targetConcentration,
        vialVolume: VIAL_VOL,
      };
    } else {
      // Reposición con PFC (100% del volumen de recambio)
      return {
        ...baseResult,
        vialsPerLiter: 0,
        totalVials: 0,
        totalSaline: 0,
        totalPfc: exchangeVolume,
        finalConcentration: 0,
        vialVolume: 0,
      };
    }
  }, [exchangeData]);

  const handleDownloadPdf = () => {
    generatePrescriptionPDF(results);
  };

  const handleExportToGoogleSheets = async () => {
    // Para conveniencia de uso inmediato, exportamos un CSV optimizado para Google Sheets
    exportToCsv(results);
    
    // Además, logueamos para integraciones futuras con Apps Script
    const payload = {
      paciente: results.patientName,
      indicacion: results.indication,
      maquina: results.machineType,
      volRecambio: results.exchangeVolume,
      albViales: results.totalVials || 0,
      timestamp: new Date().toISOString()
    };
    console.log("Datos para Google Sheets:", payload);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      <InstructionModal isOpen={isInstructionsOpen} onClose={() => setIsInstructionsOpen(false)} />

      {/* Header Institucional - Hospital Privado Universitario de Córdoba */}
      <header className="bg-white border-b-4 border-blue-800 no-print shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-2xl md:text-3xl font-black text-blue-900 tracking-tighter leading-none">HOSPITAL PRIVADO</span>
                    <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mt-1">Universitario de Córdoba</span>
                  </div>
                </div>
                
                <div className="hidden sm:block h-14 w-px bg-slate-200"></div>
                
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <UtiLogo className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">Unidad de</span>
                    <span className="text-[10px] md:text-xs font-black text-slate-700 leading-tight">
                      Terapia Intensiva (UTI)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                    Plasma<span className="text-blue-700">Calc</span>
                  </h1>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Aféresis Terapéutica • Protocolo Institucional</p>
                </div>
                <button 
                  onClick={() => setIsInstructionsOpen(true)}
                  className="w-12 h-12 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center font-black italic text-2xl hover:scale-105 active:scale-95"
                  title="Ayuda y Protocolos"
                >
                  i
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-4">
              <nav className="inline-flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200 shadow-inner w-full lg:w-auto overflow-x-auto">
                <button 
                  onClick={() => setActiveMainTab('calculator')}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded-[1.6rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeMainTab === 'calculator' ? 'bg-white text-blue-700 shadow-md ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Calculadora
                </button>
                <button 
                  onClick={() => setActiveMainTab('guides')}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded-[1.6rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeMainTab === 'guides' ? 'bg-white text-indigo-700 shadow-md ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Indicaciones
                </button>
                <button 
                  onClick={() => setActiveMainTab('complications')}
                  className={`flex-1 sm:flex-none px-8 py-3 rounded-[1.6rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeMainTab === 'complications' ? 'bg-white text-rose-700 shadow-md ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Complicaciones
                </button>
              </nav>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <button 
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-600 text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-rose-700 transition-all shadow-lg active:scale-95 group"
                  title="Descargar Prescripción PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Prescripción PDF
                </button>

                <button 
                  onClick={handleExportToGoogleSheets}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-[1.6rem] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-emerald-700 transition-all shadow-lg active:scale-95 group"
                  title="Exportar a Google Sheets"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportar Sheets
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        
        {activeMainTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="lg:col-span-4 space-y-8 no-print">
              <CalculatorForm data={exchangeData} onChange={setExchangeData} />
              <AiAssistant />
            </section>

            <section className="lg:col-span-8 space-y-10">
              <ResultsDisplay results={results} />
              
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden no-print border border-white/5">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
                  <div className="flex flex-col">
                    <h4 className="font-black text-blue-400 flex items-center gap-4 text-sm uppercase tracking-[0.3em] mb-1">
                      <span className="w-10 h-px bg-blue-500/30"></span>
                      Preparación: {results.replacementFluid === 'albumin' ? 'Albúmina 20%' : 'Plasma Fresco (PFC)'}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-14">Reposición Hospital Privado</p>
                  </div>
                  <div className="bg-white/10 px-6 py-2.5 rounded-full border border-white/5 inline-flex items-center gap-3">
                    <span className="text-[11px] font-black text-blue-300 uppercase tracking-widest">Procedimiento:</span>
                    <span className="text-base font-black text-white">{results.sessions || 1} SESIÓN/ES ({results.sessionFrequency === 'consecutive' ? 'Días Seguidos' : 'Días Alternos'})</span>
                  </div>
                </div>

                {results.replacementFluid === 'albumin' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                      <p className="text-[11px] text-white/40 mb-4 uppercase font-black tracking-widest">Relación por 1 Litro de SF</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-7xl font-black text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                          {results.vialsPerLiter.toFixed(1)}
                        </span>
                        <span className="text-2xl font-bold text-white/80">viales</span>
                      </div>
                      <p className="text-[11px] text-white/50 font-bold uppercase mt-6 tracking-widest leading-relaxed">
                        Añadir viales de 50cc (Alb 20%) por cada 1000ml de SF 0.9%
                      </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                      <p className="text-[11px] text-white/40 mb-4 uppercase font-black tracking-widest">Preparación Total Sesión</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                           <span className="text-sm font-medium text-white/60">Sol. Fisiológica 0.9%</span>
                           <span className="text-2xl font-black text-blue-400">{results.totalSaline.toFixed(0)} ml</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                           <span className="text-sm font-medium text-white/60">Albúmina Humana 20%</span>
                           <span className="text-2xl font-black text-rose-500">{results.totalVials.toFixed(1)} viales</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div>
                        <p className="text-[11px] text-white/40 mb-4 uppercase font-black tracking-widest">Volumen de Reposición PFC</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-7xl font-black text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.4)]">
                            {results.totalPfc.toFixed(0)}
                          </span>
                          <span className="text-3xl font-bold text-white/80">ml</span>
                        </div>
                        <p className="text-[11px] text-white/50 font-bold uppercase mt-6 tracking-widest leading-relaxed">
                          Suministrar Plasma Fresco Congelado isovolumétrico (1:1).
                        </p>
                      </div>
                      <div className="w-full md:w-px h-px md:h-32 bg-white/10"></div>
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.2em] mb-2">Unidades Aproximadas</p>
                        <p className="text-4xl font-black text-white tracking-wider">
                          ~{(results.totalPfc / 250).toFixed(1)} <span className="text-sm text-slate-500">U.</span>
                        </p>
                        <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Base: 250ml por unidad</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-12 p-6 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/10 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <UtiLogo className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Estandarización UTI</p>
                      <p className="text-[11px] font-black text-white/60 uppercase tracking-widest">HOSPITAL PRIVADO</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end">
                    <p className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.2em] mb-1">Máquina: <span className="text-white">{results.machineType}</span></p>
                    <div className="text-center sm:text-right">
                      <p className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.2em] mb-1">Volumen Total Tratamiento</p>
                      <p className="text-xl font-black text-blue-400 tracking-wider">
                        {(results.exchangeVolume * (results.sessions || 1)).toFixed(0)} ml
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeMainTab === 'guides' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ClinicalIndications />
          </div>
        )}

        {activeMainTab === 'complications' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComplicationsView />
          </div>
        )}
      </main>

      <footer className="mt-32 text-center px-6 pb-24 border-t border-slate-200 pt-20 no-print bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="text-center">
                <p className="text-2xl font-black text-slate-800">HOSPITAL</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Córdoba</p>
             </div>
             <div className="hidden md:block">
                <UtiLogo className="h-24 w-24 opacity-60" />
             </div>
             <div className="text-center">
                <p className="text-2xl font-black text-slate-800">UTI</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Aféresis</p>
             </div>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.5em] leading-relaxed">
              Hospital Privado Universitario de Córdoba
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Unidad de Terapia Intensiva • Sección de Aféresis • Córdoba, Argentina
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
