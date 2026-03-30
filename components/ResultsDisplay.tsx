
import React from 'react';
import { CalculationResults } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  results: CalculationResults;
}

export const ResultsDisplay: React.FC<Props> = ({ results }) => {
  const chartData = results.replacementFluid === 'albumin' 
    ? [
        { name: 'Fisiológico', value: results.totalSaline, color: '#0ea5e9' },
        { name: 'Albúmina', value: results.totalVials * 50, color: '#f43f5e' },
      ]
    : [
        { name: 'Plasma Fresco', value: results.totalPfc, color: '#818cf8' }
      ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
        <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3 w-full">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Paciente</p>
            <p className="text-sm font-black text-slate-800 truncate max-w-[400px]">{results.patientName || 'Sin Nombre'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vol. Recambio</span>
              <div className="text-xl font-black text-slate-800">{results.exchangeVolume.toFixed(0)} ml</div>
           </div>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${results.replacementFluid === 'albumin' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.127l-1.312-.328a2 2 0 00-1.017.03l-3.992 1.14a2 2 0 01-1.64-2.053v-4.98c0-.811.483-1.546 1.232-1.859L16.273 2.5a2 2 0 012.18.368l2.546 2.546a2 2 0 01.028 2.856L17 12a2 2 0 00-.586 1.414v1.751c0 .474.165.93.465 1.293l.535.644z" /></svg>
           </div>
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {results.replacementFluid === 'albumin' ? 'Alb 20% (50cc)' : 'Volumen PFC'}
              </span>
              <div className={`text-xl font-black ${results.replacementFluid === 'albumin' ? 'text-rose-600' : 'text-indigo-600'}`}>
                {results.replacementFluid === 'albumin' ? `${results.totalVials.toFixed(1)} vial.` : `${results.totalPfc.toFixed(0)} ml`}
              </div>
           </div>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
           </div>
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesiones</span>
              <div className="text-xl font-black text-blue-600">{results.sessions || 1} ciclo/s</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start no-print">
        <div className="xl:col-span-5 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 h-full">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black text-slate-800 tracking-tight">Composición</h3>
             <div className={`px-4 py-1.5 rounded-2xl text-white text-[10px] font-black shadow-lg ${results.replacementFluid === 'albumin' ? 'bg-blue-600' : 'bg-indigo-600'}`}>
                {results.replacementFluid === 'albumin' ? `ALB ${results.finalConcentration}%` : 'PLASMA FRESCO'}
             </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={8} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                 <span className="text-xl font-black text-slate-800">{results.exchangeVolume.toFixed(0)}ml</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {results.replacementFluid === 'albumin' ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase">SF 0.9%</p>
                    <p className="text-lg font-black text-blue-600">{results.totalSaline.toFixed(0)} ml</p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Alb 20% (50cc)</p>
                    <p className="text-lg font-black text-rose-600">{results.totalVials.toFixed(1)} viales</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-400 uppercase">Plasma Fresco (PFC)</p>
                  <p className="text-lg font-black text-indigo-700">{results.totalPfc.toFixed(0)} ml</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-7 bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
          
          <div className="text-center relative z-10 px-6 py-10">
            <h3 className="text-xl font-black text-blue-400 uppercase tracking-widest mb-4">Aviso de Reposición</h3>
            <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-md mx-auto">
              {results.replacementFluid === 'pfc' 
                ? "La reposición se realiza con Plasma Fresco Congelado. Asegúrese de solicitar las unidades al Servicio de Hemoterapia con anticipación mínima de 60 minutos para el descongelamiento."
                : `La reposición se realiza con Albúmina Humana al 20% (viales de 50cc) diluida en Solución Fisiológica. Mezcla final sugerida por cada litro de SF: ${results.vialsPerLiter.toFixed(1)} viales.`
              }
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Volumen Total</p>
                <p className="text-2xl font-black text-white">{results.exchangeVolume.toFixed(0)} ml</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
