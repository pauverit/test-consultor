import { useState } from 'react'
import { motion } from 'framer-motion'
import ScoreSection from './ScoreSection.jsx'
import LeaksList from './LeaksList.jsx'
import ModuleCards from './ModuleCards.jsx'
import { exportPDF } from '../../utils/pdfExport.js'

const SECTOR_LABELS = {
  reformas: 'construcción y reformas',
  comercio: 'comercio y distribución',
  tecnologia: 'tecnología y soporte técnico',
  hosteleria: 'hostelería y restauración',
  servicios: 'servicios profesionales',
  industria: 'industria y fabricación',
}

const EMPLEADOS_LABELS = {
  solo: 'solo tú',
  '2a5': '2 a 5 personas',
  '6a15': '6 a 15 personas',
  '16a50': '16 a 50 personas',
  mas50: 'más de 50 personas',
}

const FACTURACION_LABELS = {
  menos100k: 'menos de 100.000 €',
  '100a500k': 'entre 100.000 y 500.000 €',
  '500a2m': 'entre 500.000 y 2.000.000 €',
  mas2m: 'más de 2.000.000 €',
}

function getPersonalizedIntro(report) {
  const sector = SECTOR_LABELS[report.sector] || 'tu sector'
  const empleados = EMPLEADOS_LABELS[report.answers?.common_empleados]
  const facturacion = FACTURACION_LABELS[report.answers?.common_facturacion_anual]
  const criticalAreas = report.areas
    .filter(a => a.score !== null && a.score < 50)
    .map(a => a.label.toLowerCase())

  let intro = `Tu empresa de ${sector}`
  if (empleados) intro += ` con ${empleados}`
  if (facturacion) intro += ` y facturación de ${facturacion}`
  intro += ` ha obtenido una puntuación de ${report.globalScore}/100.`

  if (report.leaks.length === 0) {
    intro += ' El diagnóstico no detecta fugas significativas — tu operación está bien gestionada.'
  } else if (report.globalScore < 40) {
    intro += ` Hemos detectado ${report.leaks.length} fugas activas que están drenando rentabilidad y tiempo de forma silenciosa.`
  } else {
    intro += ` Hemos encontrado ${report.leaks.length} áreas de mejora con impacto directo en tu negocio.`
  }

  if (criticalAreas.length > 0) {
    intro += ` Las áreas más críticas son ${criticalAreas.slice(0, 3).join(', ')}.`
  }

  return intro
}

const TABS = [
  { id: 'resumen', label: '📊 Resumen', desc: 'Puntuación global' },
  { id: 'fugas', label: '🚨 Fugas', desc: 'Problemas detectados' },
  { id: 'modulos', label: '🛠️ Soluciones', desc: 'Software recomendado' },
]

export default function ResultsScreen({ report, onRestart }) {
  const [activeTab, setActiveTab] = useState('resumen')
  const [companyName, setCompanyName] = useState('')
  const [exporting, setExporting] = useState(false)

  async function handleExport() {
    setExporting(true)
    try {
      exportPDF(report, companyName)
    } finally {
      setTimeout(() => setExporting(false), 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Diagnóstico Completado</h1>
              <p className="text-slate-400 text-sm">{report.generatedAt}</p>
            </div>
            <button
              onClick={onRestart}
              className="btn-secondary text-sm px-4 py-2"
            >
              ↺ Nuevo diagnóstico
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-slate-100 p-1 rounded-xl">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-150 ${activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              {/* Intro personalizado */}
              <div className="bg-white rounded-2xl border-l-4 border-brand-500 shadow-sm px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">🎯</span>
                  <p className="text-slate-700 leading-relaxed text-sm">{getPersonalizedIntro(report)}</p>
                </div>
              </div>

              <ScoreSection globalScore={report.globalScore} areas={report.areas} />

              {/* Resumen rápido */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card text-center">
                  <div className="text-3xl font-bold text-red-500 mb-1">{report.leaks.length}</div>
                  <div className="text-slate-500 text-sm">Fugas detectadas</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-1">{report.modules.length}</div>
                  <div className="text-slate-500 text-sm">Módulos recomendados</div>
                </div>
              </div>

              {/* Coste de ineficiencia */}
              {(report.totalMinLoss > 0) && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center mb-6">
                  <h3 className="text-red-800 font-bold mb-1">Costo Estimado de Ineficiencias</h3>
                  <p className="text-red-600 text-sm mb-2">Según promedios del sector, estas fugas te están costando al año aprox:</p>
                  <div className="text-3xl font-black text-red-600">
                    {report.totalMinLoss.toLocaleString('es-ES')}€ - {report.totalMaxLoss.toLocaleString('es-ES')}€
                  </div>
                </div>
              )}

              {/* Quick Wins */}
              {report.quickWins && report.quickWins.length > 0 && (
                <div className="card bg-emerald-50 border border-emerald-100 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">⚡</span>
                    <h3 className="font-bold text-emerald-800 text-lg">Plan de Acción Inmediato (Quick Wins)</h3>
                  </div>
                  <ul className="space-y-3 mt-2">
                    {report.quickWins.map((win, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-emerald-700 leading-relaxed">
                        <span className="mt-0.5 text-emerald-500">▶</span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA exportar */}
              <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border-0 text-white">
                <h3 className="font-bold text-lg mb-2">📄 Exporta tu informe en PDF</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Descarga el diagnóstico completo para compartir con tu equipo o consultor.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="Nombre de la empresa (opcional)"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-brand-400 text-sm"
                  />
                  <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="btn-primary bg-brand-500 hover:bg-brand-400 px-6 py-2 text-sm whitespace-nowrap"
                  >
                    {exporting ? 'Generando...' : '⬇️ Descargar PDF'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fugas' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Fugas detectadas</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Ordenadas por impacto. Las críticas requieren atención inmediata.
                </p>
              </div>
              <LeaksList leaks={report.leaks} />
            </div>
          )}

          {activeTab === 'modulos' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Software recomendado</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Módulos de SaaS a medida ordenados por prioridad para tu empresa.
                </p>
              </div>
              <ModuleCards modules={report.modules} />

              {/* CTA final */}
              <div className="mt-8 card bg-brand-50 border border-brand-100 text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-slate-900 mb-2">¿Listo para digitalizar tu empresa?</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Estos módulos se pueden desarrollar de forma personalizada para tu negocio,
                  adaptados exactamente a cómo trabajáis.
                </p>
                <button
                  onClick={handleExport}
                  className="btn-primary"
                >
                  ⬇️ Descargar informe completo en PDF
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
