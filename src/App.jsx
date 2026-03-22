import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NODES, PHASES, START_NODE, getNextNodeId } from './data/tree.js'
import { generateReport } from './utils/diagnose.js'
import Welcome from './components/Welcome.jsx'
import PhaseIntro from './components/PhaseIntro.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import ResultsScreen from './components/results/ResultsScreen.jsx'

// Estimación de preguntas totales por camino (para la barra de progreso)
const ESTIMATED_TOTAL = 28

export default function App() {
  const [screen, setScreen]           = useState('welcome')    // 'welcome' | 'phase-intro' | 'question' | 'results'
  const [path, setPath]               = useState([START_NODE]) // historial de IDs visitados
  const [answers, setAnswers]         = useState({})
  const [pendingPhase, setPendingPhase] = useState(null)       // fase que vamos a mostrar en intro
  const [direction, setDirection]     = useState(1)
  const [report, setReport]           = useState(null)

  const currentNodeId  = path[path.length - 1]
  const currentNode    = NODES[currentNodeId]
  const currentAnswer  = answers[currentNodeId]
  const progress       = Math.min(Math.round((path.length / ESTIMATED_TOTAL) * 100), 95)

  // ─── INICIO ─────────────────────────────────────────────────────────────────
  function handleStart() {
    const firstPhase = PHASES[currentNode.phase]
    if (firstPhase?.showIntro) {
      setPendingPhase(currentNode.phase)
      setScreen('phase-intro')
    } else {
      setScreen('question')
    }
  }

  // ─── CONTINUAR DESDE PHASE INTRO ────────────────────────────────────────────
  function handlePhaseIntroContinue() {
    setScreen('question')
  }

  // ─── GUARDAR RESPUESTA ───────────────────────────────────────────────────────
  function handleChange(value) {
    setAnswers(prev => ({ ...prev, [currentNodeId]: value }))
  }

  // ─── SIGUIENTE ───────────────────────────────────────────────────────────────
  function handleNext(valueOverride) {
    const value     = valueOverride ?? answers[currentNodeId]
    const nextId    = getNextNodeId(currentNode, value)

    setDirection(1)

    // FIN DEL ÁRBOL
    if (!nextId) {
      // Incluimos la última respuesta que aún no está en el estado (closure obsoleta)
      const finalAnswers = valueOverride
        ? { ...answers, [currentNodeId]: valueOverride }
        : { ...answers }
      const r = generateReport(finalAnswers)
      setReport(r)
      setScreen('results')
      return
    }

    const nextNode      = NODES[nextId]
    const currentPhase  = currentNode.phase
    const nextPhase     = nextNode?.phase

    // ¿Cambia de fase?
    if (nextPhase && nextPhase !== currentPhase && PHASES[nextPhase]?.showIntro) {
      setPendingPhase(nextPhase)
      setPath(prev => [...prev, nextId])
      setScreen('phase-intro')
    } else {
      setPath(prev => [...prev, nextId])
    }
  }

  // ─── ATRÁS ───────────────────────────────────────────────────────────────────
  function handleBack() {
    setDirection(-1)

    if (path.length <= 1) {
      setScreen('welcome')
      return
    }

    // Quitar el nodo actual del path
    const newPath = path.slice(0, -1)
    setPath(newPath)

    // Si volvemos a una pantalla con phase-intro, simplemente mostramos la pregunta anterior
    // (no volvemos a mostrar el phase-intro al ir atrás)
    setScreen('question')
  }

  // ─── REINICIAR ───────────────────────────────────────────────────────────────
  function handleRestart() {
    setScreen('welcome')
    setPath([START_NODE])
    setAnswers({})
    setReport(null)
    setDirection(1)
    setPendingPhase(null)
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">

        {screen === 'welcome' && (
          <Welcome key="welcome" onStart={handleStart} />
        )}

        {screen === 'phase-intro' && pendingPhase && (
          <PhaseIntro
            key={`intro-${pendingPhase}`}
            phaseId={pendingPhase}
            onContinue={handlePhaseIntroContinue}
          />
        )}

        {screen === 'question' && currentNode && (
          <motion.div
            key="question-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-28 pb-16 px-6"
          >
            <ProgressBar
              currentPhase={currentNode.phase}
              progress={progress}
              questionNum={path.length}
              estimatedTotal={ESTIMATED_TOTAL}
            />

            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <QuestionCard
                  key={currentNodeId}
                  question={currentNode}
                  value={currentAnswer}
                  onChange={handleChange}
                  onNext={handleNext}
                  onBack={handleBack}
                  direction={direction}
                  isFirst={path.length === 1}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {screen === 'results' && report && (
          <ResultsScreen
            key="results"
            report={report}
            onRestart={handleRestart}
          />
        )}

      </AnimatePresence>
    </div>
  )
}
