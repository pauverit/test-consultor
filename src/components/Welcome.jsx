import { motion } from 'framer-motion'

export default function Welcome({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Logo / Icono */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-brand-600 rounded-2xl shadow-lg"
        >
          <span className="text-4xl">🔍</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight"
        >
          Diagnóstico Empresarial
          <span className="block text-brand-600">para Pymes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-slate-500 mb-6 leading-relaxed"
        >
          En <strong className="text-slate-700">10 minutos</strong> descubriremos
          dónde pierde tiempo y dinero tu empresa y qué soluciones necesitas.
        </motion.p>

        {/* Pasos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: '💬', title: 'Adaptado a tu sector', desc: 'Preguntas específicas para tu tipo de negocio' },
            { icon: '🔎', title: 'Diagnóstico real', desc: 'Detectamos tus fugas de tiempo y dinero' },
            { icon: '📋', title: 'Plan de acción', desc: 'Con módulos de software a medida' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-left">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
              <div className="text-slate-500 text-sm mt-1">{item.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="btn-primary text-lg px-12 py-4 shadow-lg"
        >
          Empezar el diagnóstico →
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-sm text-slate-400"
        >
          Sin registro · Completamente gratuito · Informe en PDF al finalizar
        </motion.p>
      </div>
    </motion.div>
  )
}
