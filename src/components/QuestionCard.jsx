import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function QuestionCard({ question, value, onChange, onNext, onBack, direction = 1, isFirst }) {
  const [localMulti, setLocalMulti] = useState(
    question.type === 'multi' ? (Array.isArray(value) ? value : []) : []
  )

  function handleSingle(optVal) {
    // Solo actualizamos la respuesta — el auto-avance lo gestiona App.jsx via useEffect
    onChange(optVal)
  }

  function toggleMulti(optVal) {
    setLocalMulti(prev => {
      const next = prev.includes(optVal)
        ? prev.filter(v => v !== optVal)
        : [...prev, optVal]
      onChange(next)
      return next
    })
  }

  const canProceedMulti = localMulti.length > 0

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full"
    >
      {/* Pregunta */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-snug">
          {question.question}
        </h2>
        {question.hint && (
          <p className="text-slate-500 text-sm">{question.hint}</p>
        )}
        {question.type === 'multi' && (
          <p className="text-brand-600 text-sm font-medium mt-1">
            Puedes seleccionar varias opciones
          </p>
        )}
      </div>

      {/* Opciones */}
      {question.type === 'single' && (
        <div className="space-y-3">
          {question.options.map(opt => (
            <button
              key={opt.value}
              className={`option-btn ${value === opt.value ? 'selected' : ''}`}
              onClick={() => handleSingle(opt.value)}
            >
              <span className="flex items-center gap-3">
                {value === opt.value && (
                  <span className="w-5 h-5 rounded-full border-2 border-brand-500 flex items-center justify-center flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  </span>
                )}
                {value !== opt.value && (
                  <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                )}
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {question.type === 'multi' && (
        <div className="space-y-3">
          {question.options.map(opt => {
            const selected = localMulti.includes(opt.value)
            return (
              <button
                key={opt.value}
                className={`option-btn-multi ${selected ? 'selected' : ''}`}
                onClick={() => toggleMulti(opt.value)}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                    selected ? 'bg-brand-500 border-brand-500' : 'border-slate-300'
                  }`}>
                    {selected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </span>
              </button>
            )
          })}

          {/* Botón continuar para multi */}
          <div className="pt-4 flex gap-3">
            {!isFirst && (
              <button onClick={onBack} className="btn-secondary">
                ← Atrás
              </button>
            )}
            <button
              onClick={onNext}
              disabled={!canProceedMulti}
              className={`btn-primary flex-1 ${!canProceedMulti ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Botón atrás para single */}
      {question.type === 'single' && !isFirst && (
        <div className="mt-6">
          <button onClick={onBack} className="btn-secondary text-sm">
            ← Pregunta anterior
          </button>
        </div>
      )}
    </motion.div>
  )
}
