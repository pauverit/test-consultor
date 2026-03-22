import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getScoreLabel, getGlobalLabel } from './diagnose.js'

const BRAND_BLUE = [37, 99, 235]
const DARK = [15, 23, 42]
const GRAY = [100, 116, 139]
const LIGHT_GRAY = [248, 250, 252]
const LIGHT_BLUE = [239, 246, 255]

function impactColor(impact) {
  if (impact === 'critico') return [239, 68, 68]
  if (impact === 'alto') return [249, 115, 22]
  return [234, 179, 8]
}

function impactLabel(impact) {
  if (impact === 'critico') return 'CRÍTICO'
  if (impact === 'alto') return 'ALTO'
  return 'MEDIO'
}

export function exportPDF(report, companyName = '') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  let y = 0

  // ── PORTADA ──────────────────────────────────────────────────────────────
  doc.setFillColor(...BRAND_BLUE)
  doc.rect(0, 0, W, 80, 'F')

  doc.setFillColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(255, 255, 255)
  doc.text('DIAGNÓSTICO EMPRESARIAL', W / 2, 30, { align: 'center' })

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Informe de Optimización y Oportunidades', W / 2, 42, { align: 'center' })

  if (companyName) {
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(companyName, W / 2, 60, { align: 'center' })
  }

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generado el ${report.generatedAt}`, W / 2, 73, { align: 'center' })

  y = 95

  // ── SCORE GLOBAL ─────────────────────────────────────────────────────────
  const globalMeta = getGlobalLabel(report.globalScore)

  doc.setFillColor(...LIGHT_BLUE)
  doc.roundedRect(15, y, W - 30, 32, 4, 4, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.setTextColor(...BRAND_BLUE)
  doc.text(`${report.globalScore}`, 40, y + 22)

  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  doc.text('/100', 57, y + 22)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text(globalMeta.emoji + ' ' + globalMeta.label, 80, y + 14)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  doc.text(`Se han detectado ${report.leaks.length} áreas de mejora y ${report.modules.length} módulos recomendados`, 80, y + 23)

  y += 45

  // ── PUNTUACIONES POR ÁREA ────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text('Puntuación por Área', 15, y)
  y += 8

  const areaRows = report.areas.map(area => {
    const meta = getScoreLabel(area.score)
    return [
      area.icon + ' ' + area.label,
      `${area.score}/100`,
      meta.label,
    ]
  })

  autoTable(doc, {
    startY: y,
    head: [['Área', 'Puntuación', 'Estado']],
    body: areaRows,
    theme: 'striped',
    headStyles: { fillColor: BRAND_BLUE, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
    },
    margin: { left: 15, right: 15 },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 2) {
        const score = report.areas[data.row.index]?.score
        if (score !== undefined) {
          const meta = getScoreLabel(score)
          if (meta.label === 'Crítico') data.cell.styles.textColor = [239, 68, 68]
          else if (meta.label === 'Problema') data.cell.styles.textColor = [249, 115, 22]
          else if (meta.label === 'Mejorable') data.cell.styles.textColor = [234, 179, 8]
          else data.cell.styles.textColor = [16, 185, 129]
        }
      }
    },
  })

  y = doc.lastAutoTable.finalY + 15

  // ── NUEVA PÁGINA: FUGAS ───────────────────────────────────────────────────
  if (y > H - 60) { doc.addPage(); y = 20 }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text('Fugas de Tiempo y Dinero Detectadas', 15, y)
  y += 8

  if (report.leaks.length === 0) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...GRAY)
    doc.text('No se han detectado fugas significativas. ¡Buen trabajo!', 15, y)
    y += 15
  } else {
    report.leaks.forEach((leak, i) => {
      if (y > H - 55) { doc.addPage(); y = 20 }

      const impColor = impactColor(leak.impact)

      doc.setFillColor(...LIGHT_GRAY)
      doc.roundedRect(15, y, W - 30, 30, 3, 3, 'F')

      // Badge impacto
      doc.setFillColor(...impColor)
      doc.roundedRect(17, y + 3, 22, 7, 2, 2, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.text(impactLabel(leak.impact), 28, y + 8, { align: 'center' })

      // Número
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...DARK)
      doc.text(`${i + 1}. ${leak.title}`, 42, y + 9)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      const descLines = doc.splitTextToSize(leak.description, W - 60)
      doc.text(descLines, 42, y + 16)

      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.setTextColor(...BRAND_BLUE)
      doc.text(leak.euros, 42, y + 27)

      y += 35
    })
  }

  // ── MÓDULOS SAAS ─────────────────────────────────────────────────────────
  if (y > H - 60) { doc.addPage(); y = 20 }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text('Módulos SaaS Recomendados', 15, y)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  doc.text('Ordenados por impacto prioritario para tu negocio', 15, y + 7)
  y += 18

  report.modules.forEach((mod, i) => {
    if (y > H - 55) { doc.addPage(); y = 20 }

    doc.setFillColor(...LIGHT_BLUE)
    doc.roundedRect(15, y, W - 30, 32, 3, 3, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...BRAND_BLUE)
    doc.text(`${i + 1}. ${mod.icon} ${mod.name}`, 20, y + 10)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...GRAY)
    const descLines = doc.splitTextToSize(mod.description, W - 45)
    doc.text(descLines, 20, y + 18)

    y += 37
  })

  // ── PRÓXIMOS PASOS ────────────────────────────────────────────────────────
  if (y > H - 80) { doc.addPage(); y = 20 }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...DARK)
  doc.text('Próximos Pasos Recomendados', 15, y)
  y += 10

  const steps = [
    '1. Revisad este informe junto con vuestro consultor tecnológico.',
    '2. Priorizad las fugas críticas — son pérdida de dinero real hoy.',
    '3. Empezad por el módulo número 1 de la lista recomendada.',
    '4. Medid el antes y el después para cuantificar el retorno.',
    '5. Revisad el diagnóstico cada 6 meses para detectar nuevas mejoras.',
  ]

  steps.forEach(step => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...DARK)
    doc.text(step, 20, y)
    y += 8
  })

  // ── PIE DE PÁGINA ─────────────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...GRAY)
    doc.text(`Consultor Digital — Diagnóstico Empresarial · Página ${i} de ${pageCount}`, W / 2, H - 8, { align: 'center' })
    doc.setDrawColor(226, 232, 240)
    doc.line(15, H - 13, W - 15, H - 13)
  }

  const fileName = companyName
    ? `diagnostico-${companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`
    : 'diagnostico-empresarial.pdf'

  doc.save(fileName)
}
