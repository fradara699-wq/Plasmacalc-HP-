
import { CalculationResults } from '../types';

export const exportToCsv = (results: CalculationResults) => {
  const date = new Date().toLocaleString('es-AR');
  const freqText = results.sessionFrequency === 'consecutive' ? 'Días Seguidos' : 'Días Alternos';
  
  // Headers
  const headers = [
    'Fecha de Reporte',
    'Paciente',
    'Indicación',
    'Máquina',
    'Sesiones',
    'Frecuencia',
    'Fluido de Reposición',
    'Volumen de Recambio (ml)',
    'Albúmina 20% (viales)',
    'SF 0.9% (ml)',
    'PFC Total (ml)'
  ];

  const row = [
    date,
    results.patientName || 'N/A',
    results.indication || 'N/A',
    results.machineType || 'N/A',
    results.sessions || 1,
    freqText,
    results.replacementFluid === 'albumin' ? 'Albúmina' : 'PFC',
    results.exchangeVolume.toFixed(0),
    results.replacementFluid === 'albumin' ? results.totalVials.toFixed(1) : '0',
    results.replacementFluid === 'albumin' ? results.totalSaline.toFixed(0) : '0',
    results.replacementFluid === 'pfc' ? results.totalPfc.toFixed(0) : '0'
  ];

  const csvContent = [
    headers.join(','),
    row.join(',')
  ].join('\n');

  // Use BOM for Excel/Sheets Spanish compatibility
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fileName = `Reporte_PlasmaCalc_${results.patientName?.replace(/\s+/g, '_') || 'Paciente'}_${new Date().getTime()}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
