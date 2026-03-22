import { motion } from 'framer-motion'
import { PHASES } from '../data/questions.js'

const PHASE_DESCRIPTIONS = {
  perfil:       'Cuéntanos un poco sobre tu empresa para que podamos adaptar el diagnóstico a tu realidad.',
  ventas:       'Analizaremos cómo entran los clientes y cómo gestionáis las oportunidades de venta.',
  operaciones:  'Veremos cómo planificáis y ejecutáis los trabajos o proyectos del día a día.',
  inventario:   'Examinaremos vuestro control de compras, materiales y proveedores.',
  facturacion:  'Revisaremos el proceso de facturación y el control de cobros.',
  tiempo:       'Una de las áreas con más fugas: el tiempo del empresario y la autonomía del equipo.',
  metricas:     'Por último, comprobaremos si la empresa toma decisiones basadas en datos reales.',
}

export default function PhaseIntro({ phaseId, onContinue }) {
  const phase = PHASES.find(p => p.id === phaseId)
  if (!phase) return null

  return (
    <motion.div
      key={phaseId}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-xl w-full text-center">
        {/* Icono con gradiente */}
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${phase.color} shadow-xl mb-8`}>
          <span className="text-5xl">{phase.icon}</span>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
          {phase.label}
        </h2>

        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          {PHASE_DESCRIPTIONS[phaseId]}
        </p>

        <button
          onClick={onContinue}
          className="btn-primary text-base px-10 py-3"
        >
          Continuar →
        </button>
      </div>
    </motion.div>
  )
}
