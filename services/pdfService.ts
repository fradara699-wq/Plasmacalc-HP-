
import { jsPDF } from 'jspdf';
import { CalculationResults } from '../types';

export const generatePrescriptionPDF = (results: CalculationResults) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header background
  doc.setFillColor(30, 64, 175); 
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('HOSPITAL PRIVADO UNIVERSITARIO DE CÓRDOBA', margin, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('UNIDAD DE TERAPIA INTENSIVA (UTI) - SECCIÓN AFÉRESIS', margin, 28);
  doc.text('PROTOCOLO DE REPOSICIÓN DE ALBÚMINA 20%', margin, 33);

  y = 55;
  
  doc.setTextColor(225, 29, 72); 
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PRESCRIPCIÓN DE PLASMAFÉRESIS (TPE)', margin, y);
  y += 15;

  // Patient Card
  doc.setFillColor(248, 250, 252); 
  doc.rect(margin, y - 5, pageWidth - (margin * 2), 40, 'F');
  doc.setDrawColor(226, 232, 240); 
  doc.rect(margin, y - 5, pageWidth - (margin * 2), 40, 'S');

  doc.setTextColor(100, 116, 139); 
  doc.setFontSize(9);
  doc.text('PACIENTE:', margin + 5, y + 2);
  doc.setTextColor(15, 23, 42); 
  doc.setFontSize(14);
  doc.text(results.patientName?.toUpperCase() || 'NO ESPECIFICADO', margin + 5, y + 11);
  
  doc.setTextColor(100, 116, 139);
  doc.text('PATOLOGÍA / INDICACIÓN:', margin + 5, y + 19);
  doc.setTextColor(30, 64, 175); 
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const indicationText = results.indication || 'NO ESPECIFICADA';
  const splitIndication = doc.splitTextToSize(indicationText, pageWidth - (margin * 2) - 15);
  doc.text(splitIndication, margin + 5, y + 27);

  y += 50;

  // Parameters
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. PARÁMETROS DEL PROCEDIMIENTO', margin, y);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Volumen de Reemplazo Total:', margin + 5, y);
  doc.setFont('helvetica', 'bold');
  doc.text(`${results.exchangeVolume.toFixed(0)} ml`, margin + 80, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('Fluido de Reposición:', margin + 5, y);
  doc.setFont('helvetica', 'bold');
  doc.text(results.replacementFluid === 'albumin' ? `Albúmina al ${results.finalConcentration}%` : 'Plasma Fresco Congelado (PFC)', margin + 80, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('Máquina a Utilizar:', margin + 5, y);
  doc.setFont('helvetica', 'bold');
  doc.text(`${results.machineType || 'No especificada'}`, margin + 80, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('Total Sesiones:', margin + 5, y);
  doc.setFont('helvetica', 'bold');
  const freqText = results.sessionFrequency === 'consecutive' ? 'Días Seguidos' : 'Días Alternos';
  doc.text(`${results.sessions || 1} sesiones (${freqText})`, margin + 80, y);
  y += 15;

  // Preparation
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. INDICACIONES DE PREPARACIÓN', margin, y);
  y += 12;

  doc.setFillColor(240, 249, 255); 
  doc.rect(margin, y - 6, pageWidth - (margin * 2), 22, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 64, 175);
  
  if (results.replacementFluid === 'albumin') {
    doc.text('POR CADA 1000 ml DE SF 0.9%, ADICIONAR:', margin + 5, y + 5);
    doc.setFontSize(15);
    doc.text(`${results.vialsPerLiter.toFixed(1)} VIALES DE ALBÚMINA 20% (50cc)`, margin + 5, y + 13);
  } else {
    doc.text('SUMINISTRAR PLASMA FRESCO CONGELADO (PFC):', margin + 5, y + 5);
    doc.setFontSize(15);
    doc.text(`${results.totalPfc.toFixed(0)} ml DE REPOSICIÓN TOTAL`, margin + 5, y + 13);
  }
  
  y += 40;

  // Footer / Signatures
  doc.setDrawColor(100, 116, 139);
  doc.line(margin, y, margin + 60, y);
  doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('FIRMA ENFERMERÍA', margin + 15, y + 5);
  doc.text('FIRMA MÉDICO UTI', pageWidth - margin - 45, y + 5);

  const dateStr = new Date().toISOString().split('T')[0];
  doc.save(`Prescripcion_${results.patientName || 'Paciente'}_${dateStr}.pdf`);
};
