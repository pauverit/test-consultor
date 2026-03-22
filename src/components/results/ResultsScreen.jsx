import { useState } from 'react'
import { motion } from 'framer-motion'
import ScoreSection from './ScoreSection.jsx'
import LeaksList from './LeaksList.jsx'
import ModuleCards from './ModuleCards.jsx'
import { exportPDF } from '../../utils/pdfExport.js'

const TABS = [
  { id: 'resumen',  label: '📊 Resumen',     desc: 'Puntuación global' },
  { id: 'fugas',    label: '🚨 Fugas',        desc: 'Problemas detectados' },
  { id: 'modulos',  label: '🛠️ Soluciones',   desc: 'Software recomendado' },
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
                className={`flex-1 text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-150 ${
                  activeTab === tab.id
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
              <ScoreSection globalScore={report.globalScore} areas={report.areas} />

              {/* Resumen rápido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center">
                  <div className="text-3xl font-bold text-red-500 mb-1">{report.leaks.length}</div>
                  <div className="text-slate-500 text-sm">Fugas detectadas</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-1">{report.modules.length}</div>
                  <div className="text-slate-500 text-sm">Módulos recomendados</div>
                </div>
              </div>

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
