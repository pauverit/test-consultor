import { motion } from 'framer-motion'
import { PHASES, PHASE_DESCRIPTIONS } from '../data/tree.js'

export default function PhaseIntro({ phaseId, onContinue }) {
  const phase = PHASES[phaseId]
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
