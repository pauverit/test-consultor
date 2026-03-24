import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

// Elimina emojis del inicio de la etiqueta para evitar sesgo visual
// (✅ = buena, ❌ = mala, ⚡ = intermedia, etc.)
function stripEmojis(str) {
  return str.replace(/\p{Extended_Pictographic}\uFE0F?\s*/gu, '').trim()
}

// Shuffle de Fisher-Yates — se ejecuta una vez por montaje del componente
function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuestionCard({ node, nodeId, value, onChange, onNext, onBack, direction = 1, isFirst }) {
  const [localMulti, setLocalMulti] = useState(
    node.type === 'multi' ? (Array.isArray(value) ? value : []) : []
  )

  // Barajar opciones aleatoriamente al montar la pregunta.
  // Depende de nodeId para que sea estable si el padre re-renderiza
  // sin cambiar de pregunta.
  const shuffledOptions = useMemo(
    () => shuffleArray(node.options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeId]
  )

  function handleSingle(optVal) {
    onChange(nodeId, node, optVal)
  }

  function toggleMulti(optVal) {
    setLocalMulti(prev => {
      const next = prev.includes(optVal)
        ? prev.filter(v => v !== optVal)
        : [...prev, optVal]
      onChange(nodeId, node, next)
      return next
    })
  }

  const canProceedMulti = localMulti.length > 0

  return (
    <motion.div
      key={nodeId}
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
          {node.question}
        </h2>
        {node.hint && (
          <p className="text-slate-500 text-sm">{node.hint}</p>
        )}
        {node.type === 'multi' && (
          <p className="text-brand-600 text-sm font-medium mt-1">
            Puedes seleccionar varias opciones
          </p>
        )}
      </div>

      {/* Opciones single */}
      {node.type === 'single' && (
        <div className="space-y-3">
          {shuffledOptions.map(opt => (
            <button
              key={opt.value}
              className={`option-btn ${value === opt.value ? 'selected' : ''}`}
              onClick={() => handleSingle(opt.value)}
            >
              <span className="flex items-center gap-3">
                {value === opt.value ? (
                  <span className="w-5 h-5 rounded-full border-2 border-brand-500 flex items-center justify-center flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                )}
                {stripEmojis(opt.label)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Opciones multi */}
      {node.type === 'multi' && (
        <div className="space-y-3">
          {shuffledOptions.map(opt => {
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
                  {stripEmojis(opt.label)}
                </span>
              </button>
            )
          })}

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
      {node.type === 'single' && !isFirst && (
        <div className="mt-6">
          <button onClick={onBack} className="btn-secondary text-sm">
            ← Pregunta anterior
          </button>
        </div>
      )}
    </motion.div>
  )
}
