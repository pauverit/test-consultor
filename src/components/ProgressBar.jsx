import { PHASES } from '../data/tree.js'

// Orden de fases para la barra de progreso (excluyendo perfil que no tiene intro)
const PHASE_ORDER = ['reformas','comercio','tecnologia','hosteleria','servicios','industria','datos_empresa','facturacion','tiempo','metricas']

export default function ProgressBar({ currentPhase, progress, questionNum, estimatedTotal }) {
  const phase = PHASES[currentPhase]

  // Para los segmentos: solo mostramos las 4 fases comunes finales siempre visibles
  const commonPhases = ['facturacion','tiempo','metricas']
  const phaseIdx = commonPhases.indexOf(currentPhase)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {phase && (
              <>
                <span className="text-lg">{phase.icon}</span>
                <span className="font-semibold text-slate-700 text-sm">{phase.label}</span>
              </>
            )}
          </div>
          <span className="text-sm text-slate-400 font-medium">
            Pregunta {questionNum} · ~{Math.max(0, estimatedTotal - questionNum)} restantes
          </span>
        </div>
        {/* Barra general */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-brand-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
