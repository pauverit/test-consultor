import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PHASES, getVisibleQuestions } from './data/questions.js'
import { generateReport } from './utils/diagnose.js'
import Welcome from './components/Welcome.jsx'
import PhaseIntro from './components/PhaseIntro.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import ResultsScreen from './components/results/ResultsScreen.jsx'

// Estado de la app
// screen: 'welcome' | 'phase-intro' | 'question' | 'results'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [answers, setAnswers] = useState({})
  const [questionIndex, setQuestionIndex] = useState(0)    // índice dentro de visibleQuestions
  const [phaseIntroId, setPhaseIntroId] = useState(null)
  const [direction, setDirection] = useState(1)
  const [report, setReport] = useState(null)

  // Preguntas visibles según respuestas actuales
  const visibleQuestions = getVisibleQuestions(answers)
  const totalQuestions = visibleQuestions.length

  // Pregunta actual
  const currentQuestion = visibleQuestions[questionIndex]

  // Progreso global
  const progress = Math.round(((questionIndex) / totalQuestions) * 100)

  // ─── INICIO ─────────────────────────────────────────────────────────────────
  function handleStart() {
    setScreen('phase-intro')
    setPhaseIntroId(PHASES[0].id)
  }

  // ─── CONTINUAR DESDE PHASE INTRO ────────────────────────────────────────────
  function handlePhaseIntroContinue() {
    setScreen('question')
  }

  // ─── RESPONDER ───────────────────────────────────────────────────────────────
  function handleChange(value) {
    if (!currentQuestion) return
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  // ─── SIGUIENTE ───────────────────────────────────────────────────────────────
  function handleNext() {
    if (!currentQuestion) return

    const nextIndex = questionIndex + 1

    // Recalcular visibles con las respuestas actualizadas
    const updatedVisible = getVisibleQuestions(answers)

    if (nextIndex >= updatedVisible.length) {
      // FIN DEL TEST
      const r = generateReport(answers)
      setReport(r)
      setScreen('results')
      return
    }

    const nextQuestion = updatedVisible[nextIndex]
    const currentPhaseId = currentQuestion.phase
    const nextPhaseId = nextQuestion.phase

    setDirection(1)

    // ¿Cambia de fase?
    if (nextPhaseId !== currentPhaseId) {
      setQuestionIndex(nextIndex)
      setPhaseIntroId(nextPhaseId)
      setScreen('phase-intro')
    } else {
      setQuestionIndex(nextIndex)
    }
  }

  // ─── ATRÁS ───────────────────────────────────────────────────────────────────
  function handleBack() {
    if (questionIndex === 0) {
      setScreen('welcome')
      return
    }
    setDirection(-1)
    setQuestionIndex(i => i - 1)
  }

  // ─── REINICIAR ───────────────────────────────────────────────────────────────
  function handleRestart() {
    setScreen('welcome')
    setAnswers({})
    setQuestionIndex(0)
    setReport(null)
    setDirection(1)
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <Welcome key="welcome" onStart={handleStart} />
        )}

        {screen === 'phase-intro' && (
          <PhaseIntro
            key={`intro-${phaseIntroId}`}
            phaseId={phaseIntroId}
            onContinue={handlePhaseIntroContinue}
          />
        )}

        {screen === 'question' && currentQuestion && (
          <motion.div
            key="question-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-12 px-6"
          >
            <ProgressBar
              currentPhase={currentQuestion.phase}
              progress={progress}
              questionNum={questionIndex + 1}
              totalQuestions={totalQuestions}
            />

            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  value={answers[currentQuestion.id]}
                  onChange={handleChange}
                  onNext={handleNext}
                  onBack={handleBack}
                  direction={direction}
                  isFirst={questionIndex === 0}
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
