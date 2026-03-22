import { getScoreLabel, getGlobalLabel } from '../../utils/diagnose.js'

function ScoreBar({ score }) {
  const meta = getScoreLabel(score)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold ${meta.color}`}>{meta.label}</span>
        <span className="text-xs font-bold text-slate-700">{score}/100</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${meta.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export default function ScoreSection({ globalScore, areas }) {
  const globalMeta = getGlobalLabel(globalScore)

  return (
    <div className="space-y-6">
      {/* Score global */}
      <div className="card bg-gradient-to-br from-brand-600 to-brand-700 text-white border-0">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-6xl font-extrabold leading-none">{globalScore}</div>
            <div className="text-brand-200 text-sm font-medium">/100</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">
              {globalMeta.emoji} {globalMeta.label}
            </div>
            <div className="text-brand-200 text-sm">
              Puntuación global del diagnóstico
            </div>
          </div>
        </div>
      </div>

      {/* Por áreas */}
      <div className="card">
        <h3 className="font-bold text-slate-800 mb-5 text-base">Detalle por área</h3>
        <div className="space-y-5">
          {areas.map(area => (
            <div key={area.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{area.icon}</span>
                <span className="text-sm font-semibold text-slate-700">{area.label}</span>
              </div>
              <ScoreBar score={area.score} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
