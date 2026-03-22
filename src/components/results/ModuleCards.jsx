export default function ModuleCards({ modules }) {
  if (!modules.length) {
    return (
      <div className="card text-center py-10">
        <div className="text-4xl mb-3">✅</div>
        <p className="text-slate-600 font-medium">Tu empresa ya utiliza herramientas digitales en las áreas clave.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {modules.map((mod, i) => (
        <div
          key={mod.id}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{mod.icon}</span>
              <div>
                <div className="text-xs font-semibold text-brand-200 uppercase tracking-wide">
                  Módulo #{i + 1}
                </div>
                <div className="text-white font-bold text-base leading-tight">{mod.name}</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{mod.description}</p>

            <div className="space-y-2">
              {mod.beneficios.map((b, j) => (
                <div key={j} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-600 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
