const IMPACT_STYLES = {
  critico: {
    badge: 'bg-red-100 text-red-700 border border-red-200',
    icon: '🚨',
    label: 'CRÍTICO',
    border: 'border-l-4 border-red-400',
  },
  alto: {
    badge: 'bg-orange-100 text-orange-700 border border-orange-200',
    icon: '⚠️',
    label: 'ALTO',
    border: 'border-l-4 border-orange-400',
  },
  medio: {
    badge: 'bg-amber-100 text-amber-700 border border-amber-200',
    icon: '💡',
    label: 'MEDIO',
    border: 'border-l-4 border-amber-400',
  },
}

export default function LeaksList({ leaks }) {
  if (!leaks.length) {
    return (
      <div className="card text-center py-10">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-slate-600 font-medium">No se han detectado fugas importantes.</p>
        <p className="text-slate-400 text-sm mt-1">¡Tu empresa está bien gestionada!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {leaks.map((leak, i) => {
        const style = IMPACT_STYLES[leak.impact]
        return (
          <div
            key={leak.id}
            className={`bg-white rounded-xl shadow-sm p-5 ${style.border}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-xl">{style.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                    {style.label}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-sm">{leak.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-2">{leak.description}</p>
                <p className="text-brand-600 text-xs font-medium">{leak.euros}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
