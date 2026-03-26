import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NODES, PHASES, START_NODE, getNextNodeId } from './data/tree.js'
import { generateReport } from './utils/diagnose.js'
import Welcome from './components/Welcome.jsx'
import PhaseIntro from './components/PhaseIntro.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import ResultsScreen from './components/results/ResultsScreen.jsx'

const ESTIMATED_TOTAL = 30

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [path, setPath] = useState([START_NODE])
  const [answers, setAnswers] = useState({})
  const [pendingPhase, setPendingPhase] = useState(null)
  const [direction, setDirection] = useState(1)
  const [report, setReport] = useState(null)

  // Ref siempre actualizado de answers
  const answersRef = useRef({})

  const currentNodeId = path[path.length - 1]
  const currentNode = NODES[currentNodeId]
  const currentAnswer = answers[currentNodeId]
  const progress = Math.min(Math.round((path.length / ESTIMATED_TOTAL) * 100), 95)

  // ─── NAVEGACIÓN ───────────────────────────────────────────────────────────
  function goToNext(node, value) {
    const nextId = getNextNodeId(node, value)
    setDirection(1)

    if (!nextId) {
      setReport(generateReport({ ...answersRef.current }))
      setScreen('results')
      return
    }

    const nextNode = NODES[nextId]
    const nextPhase = nextNode?.phase

    if (nextPhase && nextPhase !== node.phase && PHASES[nextPhase]?.showIntro) {
      setPendingPhase(nextPhase)
      setPath(prev => [...prev, nextId])
      setScreen('phase-intro')
    } else {
      setPath(prev => [...prev, nextId])
    }
  }

  // ─── INICIO ───────────────────────────────────────────────────────────────
  function handleStart() {
    setScreen('question')
  }

  // ─── PHASE INTRO ──────────────────────────────────────────────────────────
  function handlePhaseIntroContinue() {
    setScreen('question')
  }

  // ─── GUARDAR RESPUESTA ────────────────────────────────────────────────────
  function handleChange(nodeId, node, value) {
    const newAnswers = { ...answersRef.current, [nodeId]: value }
    answersRef.current = newAnswers
    setAnswers(newAnswers)

    if (node.type === 'single') {
      goToNext(node, value)
    }
  }

  // ─── SIGUIENTE (preguntas multi) ──────────────────────────────────────────
  function handleNext() {
    goToNext(currentNode, answersRef.current[currentNodeId])
  }

  // ─── ATRÁS ────────────────────────────────────────────────────────────────
  function handleBack() {
    setDirection(-1)
    if (path.length <= 1) {
      setScreen('welcome')
      return
    }
    setPath(prev => prev.slice(0, -1))
    setScreen('question')
  }

  // ─── REINICIAR ────────────────────────────────────────────────────────────
  function handleRestart() {
    answersRef.current = {}
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
                  node={currentNode}
                  nodeId={currentNodeId}
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
