import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NODES, PHASES, START_NODE, getNextNodeId } from './data/tree.js'
import { generateReport } from './utils/diagnose.js'
import Welcome from './components/Welcome.jsx'
import PhaseIntro from './components/PhaseIntro.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import ResultsScreen from './components/results/ResultsScreen.jsx'

const ESTIMATED_TOTAL = 28

export default function App() {
  const [screen, setScreen]             = useState('welcome')
  const [path, setPath]                 = useState([START_NODE])
  const [answers, setAnswers]           = useState({})
  const [pendingPhase, setPendingPhase] = useState(null)
  const [direction, setDirection]       = useState(1)
  const [report, setReport]             = useState(null)

  // Ref para el timer de auto-avance (cancelar si el usuario vuelve atrás)
  const navTimerRef = useRef(null)
  // Ref siempre actualizado de answers para acceder al estado más reciente dentro de timers
  const answersRef  = useRef(answers)
  answersRef.current = answers

  const currentNodeId = path[path.length - 1]
  const currentNode   = NODES[currentNodeId]
  const currentAnswer = answers[currentNodeId]
  const progress      = Math.min(Math.round((path.length / ESTIMATED_TOTAL) * 100), 95)

  // ─── NAVEGACIÓN (función central, sin closures problemáticas) ─────────────
  function navigateFrom(node, value) {
    const nextId = getNextNodeId(node, value)
    setDirection(1)

    if (!nextId) {
      const r = generateReport({ ...answersRef.current })
      setReport(r)
      setScreen('results')
      return
    }

    const nextNode     = NODES[nextId]
    const currentPhase = node.phase
    const nextPhase    = nextNode?.phase

    if (nextPhase && nextPhase !== currentPhase && PHASES[nextPhase]?.showIntro) {
      setPendingPhase(nextPhase)
      setPath(prev => [...prev, nextId])
      setScreen('phase-intro')
    } else {
      setPath(prev => [...prev, nextId])
    }
  }

  // ─── INICIO ───────────────────────────────────────────────────────────────
  function handleStart() {
    const firstPhase = PHASES[currentNode.phase]
    if (firstPhase?.showIntro) {
      setPendingPhase(currentNode.phase)
      setScreen('phase-intro')
    } else {
      setScreen('question')
    }
  }

  // ─── PHASE INTRO ──────────────────────────────────────────────────────────
  function handlePhaseIntroContinue() {
    setScreen('question')
  }

  // ─── GUARDAR RESPUESTA ────────────────────────────────────────────────────
  // Para preguntas single: guarda y auto-avanza tras 300ms
  // Para preguntas multi: solo guarda (el usuario pulsa Continuar)
  function handleChange(value) {
    setAnswers(prev => ({ ...prev, [currentNodeId]: value }))
    answersRef.current = { ...answersRef.current, [currentNodeId]: value }

    if (currentNode?.type === 'single') {
      // Capturamos node y value AHORA (valores del render actual, siempre correctos)
      const capturedNode  = currentNode
      const capturedValue = value

      // Cancelar cualquier timer anterior
      if (navTimerRef.current) clearTimeout(navTimerRef.current)

      navTimerRef.current = setTimeout(() => {
        navTimerRef.current = null
        navigateFrom(capturedNode, capturedValue)
      }, 300)
    }
  }

  // ─── SIGUIENTE (preguntas multi) ──────────────────────────────────────────
  function handleNext() {
    if (navTimerRef.current) clearTimeout(navTimerRef.current)
    navigateFrom(currentNode, answers[currentNodeId])
  }

  // ─── ATRÁS ────────────────────────────────────────────────────────────────
  function handleBack() {
    // Cancelar auto-avance si el usuario va atrás antes de los 300ms
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current)
      navTimerRef.current = null
    }

    setDirection(-1)

    if (path.length <= 1) {
      setScreen('welcome')
      return
    }

    setPath(path.slice(0, -1))
    setScreen('question')
  }

  // ─── REINICIAR ────────────────────────────────────────────────────────────
  function handleRestart() {
    if (navTimerRef.current) clearTimeout(navTimerRef.current)
    setScreen('welcome')
    setPath([START_NODE])
    setAnswers({})
    setReport(null)
    setDirection(1)
    setPendingPhase(null)
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
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
