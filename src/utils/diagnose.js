import { QUESTIONS, PHASES, getVisibleQuestions } from '../data/questions.js'
import { getRecommendedModules } from '../data/modules.js'

// ─── ÁREAS DE DIAGNÓSTICO ─────────────────────────────────────────────────────
export const AREAS = [
  { id: 'ventas_crm',    label: 'Ventas y CRM',         icon: '🤝', phase: 'ventas' },
  { id: 'presupuestacion', label: 'Presupuestación',    icon: '📄', phase: 'ventas' },
  { id: 'operaciones',   label: 'Operaciones',           icon: '⚙️', phase: 'operaciones' },
  { id: 'inventario',    label: 'Inventario y Compras',  icon: '📦', phase: 'inventario' },
  { id: 'facturacion',   label: 'Facturación y Cobros',  icon: '💶', phase: 'facturacion' },
  { id: 'tiempo',        label: 'Gestión del Tiempo',    icon: '⏱️', phase: 'tiempo' },
  { id: 'metricas',      label: 'Datos y Métricas',      icon: '📊', phase: 'metricas' },
]

// ─── FUGAS POSIBLES ────────────────────────────────────────────────────────────
const LEAK_RULES = [
  {
    id: 'sin_crm',
    title: 'Clientes y oportunidades sin registrar',
    description: 'No tener un sistema de registro de clientes significa que se pierden oportunidades de venta y no hay historial para fidelizar.',
    impact: 'alto',
    area: 'ventas_crm',
    trigger: (ans) => ans.crm === 'no_registro',
    euros: 'Pérdida estimada: 10-20% de ventas potenciales no cerradas',
  },
  {
    id: 'sin_seguimiento',
    title: 'Presupuestos enviados sin seguimiento',
    description: 'La mayoría de ventas se cierran después del 5º contacto. Si no se hace seguimiento, se pierde dinero sobre la mesa.',
    impact: 'alto',
    area: 'ventas_crm',
    trigger: (ans) => ans.seguimiento_presupuestos === 'casi_nunca' || ans.seguimiento_presupuestos === 'a_veces',
    euros: 'Pérdida estimada: 30-40% de presupuestos no cerrados por falta de seguimiento',
  },
  {
    id: 'presupuestos_lentos',
    title: 'Tiempo excesivo en elaborar presupuestos',
    description: 'Hacer presupuestos a mano o en Excel cada vez desde cero consume horas que podrían invertirse en vender o producir.',
    impact: 'medio',
    area: 'presupuestacion',
    trigger: (ans) => ans.tiempo_presupuesto === 'mas2h' || (ans.tiempo_presupuesto === '30a2h' && ans.como_presupuestos !== 'software'),
    euros: 'Coste estimado: 1-3 horas por presupuesto multiplicado por todos los que haces al mes',
  },
  {
    id: 'sin_margen',
    title: 'Trabajos sin calcular rentabilidad',
    description: 'Sin conocer el margen real por trabajo, es imposible saber si la empresa gana o pierde dinero en cada proyecto.',
    impact: 'alto',
    area: 'operaciones',
    trigger: (ans) => ans.margen_trabajo === 'no',
    euros: 'Riesgo: trabajos aparentemente activos que en realidad generan pérdidas',
  },
  {
    id: 'horas_sin_control',
    title: 'Horas de trabajadores sin controlar',
    description: 'Sin control de horas es imposible medir productividad, calcular costes reales ni detectar ineficiencias en el equipo.',
    impact: 'medio',
    area: 'operaciones',
    trigger: (ans) => ans.control_horas === 'no' && ans.empleados !== 'solo',
    euros: 'Coste oculto: horas improductivas no detectadas',
  },
  {
    id: 'stock_descontrolado',
    title: 'Inventario sin control real',
    description: 'La diferencia entre el stock del sistema y el real genera compras innecesarias, roturas de stock y pérdida de material.',
    impact: 'alto',
    area: 'inventario',
    trigger: (ans) => ans.control_stock === 'no' || ans.stock_real === 'no',
    euros: 'Pérdida estimada: 5-15% del valor del inventario anual',
  },
  {
    id: 'rotura_stock',
    title: 'Roturas de stock que paran los trabajos',
    description: 'Cada parada por falta de material tiene un coste directo en horas de personal y retrasos que dañan la imagen ante el cliente.',
    impact: 'alto',
    area: 'inventario',
    trigger: (ans) => ans.rotura_stock === 'frecuente',
    euros: 'Coste directo: horas paradas + penalizaciones + pérdida de clientes',
  },
  {
    id: 'facturas_olvidadas',
    title: 'Trabajos realizados sin facturar',
    description: 'Si alguna vez se ha olvidado facturar un trabajo, el dinero está literalmente tirado. Son ingresos que ya se ganaron pero nunca se cobraron.',
    impact: 'critico',
    area: 'facturacion',
    trigger: (ans) => ans.olvido_factura === 'si_ha_pasado' || ans.olvido_factura === 'alguna_vez',
    euros: 'Pérdida directa: 100% del importe de los trabajos no facturados',
  },
  {
    id: 'impagos_sin_gestionar',
    title: 'Impagos sin reclamar',
    description: 'Facturas emitidas que nunca se cobraron y nadie está reclamando. Dinero perdido que ya debería estar en la cuenta.',
    impact: 'critico',
    area: 'facturacion',
    trigger: (ans) => ans.impagos === 'si_varios',
    euros: 'Pérdida directa: suma de todas las facturas impagadas acumuladas',
  },
  {
    id: 'facturacion_lenta',
    title: 'Facturación tardía que retrasa el cobro',
    description: 'Cuanto más tarde en emitir la factura, más tarde cobras. El retraso acumulado puede generar tensiones de tesorería innecesarias.',
    impact: 'medio',
    area: 'facturacion',
    trigger: (ans) => ans.tiempo_factura === 'mas_semana',
    euros: 'Impacto en tesorería: retrasos de cobro innecesarios',
  },
  {
    id: 'empresario_cuello_botella',
    title: 'El empresario como cuello de botella',
    description: 'Si el negocio depende de que estés presente para funcionar, no tienes un negocio: tienes un trabajo muy costoso. Esto limita el crecimiento.',
    impact: 'alto',
    area: 'tiempo',
    trigger: (ans) => ans.vacaciones === 'no_puedo' || ans.tareas_solo_yo === 'muchas',
    euros: 'Limitación de crecimiento: el negocio no puede escalar contigo como cuello de botella',
  },
  {
    id: 'exceso_admin',
    title: 'Demasiado tiempo en tareas administrativas',
    description: 'Más de 3 horas al día en tareas administrativas significa que el empresario no está haciendo lo que más valor aporta.',
    impact: 'alto',
    area: 'tiempo',
    trigger: (ans) => ans.horas_admin === '3a5' || ans.horas_admin === 'mas5',
    euros: 'Coste de oportunidad: horas que podrías dedicar a vender o crecer',
  },
  {
    id: 'sin_metricas',
    title: 'Toma de decisiones sin datos',
    description: 'Gestionar un negocio sin indicadores es como conducir con los ojos cerrados. Las decisiones importantes se toman por intuición en lugar de por datos.',
    impact: 'alto',
    area: 'metricas',
    trigger: (ans) => ans.panel_kpi === 'no' || ans.frecuencia_numeros === 'nunca',
    euros: 'Riesgo: decisiones erróneas con impacto económico difícil de cuantificar',
  },
  {
    id: 'clientes_no_rentables',
    title: 'Clientes no rentables sin detectar',
    description: 'Si no sabes qué clientes te dan dinero y cuáles te lo quitan, estás trabajando para algunos que te cuestan más de lo que te pagan.',
    impact: 'medio',
    area: 'metricas',
    trigger: (ans) => ans.cliente_rentable === 'no',
    euros: 'Pérdida oculta: clientes que generan costes superiores a sus ingresos',
  },
  {
    id: 'interrupciones',
    title: 'Equipo dependiente del empresario para todo',
    description: 'Si tu equipo te interrumpe constantemente, es porque no tienen las herramientas, la información o los procesos para ser autónomos.',
    impact: 'medio',
    area: 'tiempo',
    trigger: (ans) => ans.interrupciones === 'constantemente',
    euros: 'Coste: fragmentación del tiempo = baja productividad del empresario',
  },
]

// ─── CALCULAR SCORE POR ÁREA ───────────────────────────────────────────────────
function calcAreaScores(answers) {
  const visible = getVisibleQuestions(answers)
  const areaData = {}

  AREAS.forEach(area => {
    const qs = visible.filter(q => q.area === area.id && q.scoreMap)
    if (qs.length === 0) {
      areaData[area.id] = null // no aplica
      return
    }
    let total = 0
    let count = 0
    qs.forEach(q => {
      const val = answers[q.id]
      if (val && q.scoreMap[val] !== undefined) {
        total += q.scoreMap[val]
        count++
      }
    })
    const score = count > 0 ? Math.round((total / (count * 3)) * 100) : null
    areaData[area.id] = score
  })
  return areaData
}

// ─── SCORE GLOBAL ─────────────────────────────────────────────────────────────
function calcGlobalScore(areaScores) {
  const values = Object.values(areaScores).filter(v => v !== null)
  if (!values.length) return 0
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

// ─── FUNCIÓN PRINCIPAL ────────────────────────────────────────────────────────
export function generateReport(answers) {
  const areaScores = calcAreaScores(answers)
  const globalScore = calcGlobalScore(areaScores)

  const leaks = LEAK_RULES
    .filter(r => r.trigger(answers))
    .sort((a, b) => {
      const order = { critico: 0, alto: 1, medio: 2 }
      return order[a.impact] - order[b.impact]
    })

  const modules = getRecommendedModules(answers)

  const areas = AREAS.map(area => ({
    ...area,
    score: areaScores[area.id],
  })).filter(a => a.score !== null)

  return {
    globalScore,
    areas,
    leaks,
    modules,
    answers,
    generatedAt: new Date().toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric',
    }),
  }
}

export function getScoreLabel(score) {
  if (score >= 75) return { label: 'Bueno', color: 'text-emerald-600', bg: 'bg-emerald-100', bar: 'bg-emerald-500' }
  if (score >= 50) return { label: 'Mejorable', color: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500' }
  if (score >= 25) return { label: 'Problema', color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500' }
  return { label: 'Crítico', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' }
}

export function getGlobalLabel(score) {
  if (score >= 75) return { label: 'Negocio bien gestionado', emoji: '✅', color: 'text-emerald-600' }
  if (score >= 50) return { label: 'Con margen de mejora', emoji: '⚡', color: 'text-amber-600' }
  if (score >= 25) return { label: 'Fugas importantes detectadas', emoji: '⚠️', color: 'text-orange-600' }
  return { label: 'Situación crítica — actúa ahora', emoji: '🚨', color: 'text-red-600' }
}
