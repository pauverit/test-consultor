import { PHASES } from '../data/questions.js'

export default function ProgressBar({ currentPhase, progress, questionNum, totalQuestions }) {
  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase)
  const phase = PHASES[phaseIndex]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{phase?.icon}</span>
            <span className="font-semibold text-slate-700 text-sm">{phase?.label}</span>
          </div>
          <span className="text-sm text-slate-400 font-medium">
            {questionNum} / {totalQuestions}
          </span>
        </div>
        {/* Barra general */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-brand-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Fases como dots */}
        <div className="flex items-center justify-between mt-2">
          {PHASES.map((p, i) => (
            <div
              key={p.id}
              className={`h-1.5 flex-1 rounded-full mx-0.5 transition-all duration-300 ${
                i < phaseIndex
                  ? 'bg-brand-500'
                  : i === phaseIndex
                  ? 'bg-brand-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
