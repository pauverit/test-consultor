import { NODES } from '../data/tree.js'
import { getRecommendedModules } from '../data/modules.js'

export const AREAS = [
  { id: 'ventas_crm',      label: 'Ventas y Clientes',    icon: '🤝' },
  { id: 'presupuestacion', label: 'Presupuestación',      icon: '📄' },
  { id: 'operaciones',     label: 'Operaciones',          icon: '⚙️' },
  { id: 'inventario',      label: 'Inventario y Compras', icon: '📦' },
  { id: 'equipo',          label: 'Equipo y Procesos',    icon: '👥' },
  { id: 'facturacion',     label: 'Facturación y Cobros', icon: '💶' },
  { id: 'tiempo',          label: 'Gestión del Tiempo',   icon: '⏱️' },
  { id: 'metricas',        label: 'Datos y Métricas',     icon: '📊' },
]

const LEAK_RULES = [
  {
    id: 'sin_seguimiento',
    title: 'Presupuestos enviados sin seguimiento',
    description: 'La mayoría de ventas se cierran después del 5º contacto. Sin seguimiento sistemático, se pierde dinero sobre la mesa.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Pérdida estimada: 30-40% de presupuestos sin cerrar por falta de seguimiento',
    trigger: (ans) => ans.reformas_seguimiento === 'nunca' || ans.reformas_seguimiento === 'a_veces',
  },
  {
    id: 'sin_crm',
    title: 'Clientes y oportunidades sin registrar',
    description: 'Sin registro de clientes y presupuestos no hay historial, seguimiento ni fidelización posible.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Pérdida estimada: 10-20% de ventas potenciales no cerradas por falta de control',
    trigger: (ans) => ans.reformas_crm === 'no',
  },
  {
    id: 'sin_contratos_mant',
    title: 'Sin contratos de mantenimiento recurrente',
    description: 'Los contratos de mantenimiento son ingresos predecibles y fidelización garantizada. Sin ellos cada mes se empieza de cero.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Oportunidad perdida: facturación recurrente estable con margen alto',
    trigger: (ans) => ans.tech_hw_contratos === 'no',
  },
  {
    id: 'perdida_renovaciones',
    title: 'Pérdida de renovaciones por falta de control',
    description: 'Si las licencias y contratos vencen sin avisar al cliente a tiempo, se pierden renovaciones que eran ventas seguras.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Pérdida directa: importe de cada renovación no gestionada a tiempo',
    trigger: (ans) => ans.tech_sw_renovaciones === 'frecuente' || ans.tech_sw_renovaciones === 'a_veces',
  },
  {
    id: 'sin_fidelizacion',
    title: 'Sin base de datos ni fidelización de clientes',
    description: 'Sin fidelización se depende siempre de clientes nuevos. Retener cuesta 5 veces menos que captar.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Coste de oportunidad: clientes que compran una vez y no vuelven',
    trigger: (ans) => ans.comercio_fidelizacion === 'no',
  },
  {
    id: 'presupuestos_lentos',
    title: 'Tiempo excesivo elaborando presupuestos',
    description: 'Hacer presupuestos desde cero en Excel o a mano consume horas que podrían invertirse en producir o vender.',
    impact: 'medio', area: 'presupuestacion',
    euros: 'Coste estimado: 2-8 horas por presupuesto × volumen mensual',
    trigger: (ans) =>
      ans.reformas_presupuesto_como === 'manual' ||
      (ans.reformas_presupuesto_como === 'excel' && ans.reformas_tiempo_presupuesto !== 'menos2h') ||
      ans.reformas_tiempo_presupuesto === 'mas1dia',
  },
  {
    id: 'sin_margen',
    title: 'Trabajos sin calcular su rentabilidad real',
    description: 'Sin conocer el margen real por trabajo es imposible saber si se gana o pierde dinero en cada proyecto.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: trabajos que en realidad generan pérdidas sin que nadie lo sepa',
    trigger: (ans) =>
      ans.reformas_margen_obra === 'no' ||
      ans.comercio_dist_margen === 'no' ||
      ans.ind_costes_produccion === 'no',
  },
  {
    id: 'sin_control_costes',
    title: 'Sin control de costes reales vs. presupuestados',
    description: 'Presupuestar bien pero no controlar los costes durante la ejecución es igual de peligroso. Las desviaciones se acumulan.',
    impact: 'alto', area: 'operaciones',
    euros: 'Pérdida oculta: desviaciones de coste que reducen el margen sin que nadie las detecte',
    trigger: (ans) => ans.reformas_costes_materiales === 'no',
  },
  {
    id: 'sin_base_conocimiento',
    title: 'El conocimiento técnico está solo en la cabeza del técnico',
    description: 'Si el saber-hacer no está documentado, el negocio depende de una persona. Si se va, el problema se va con ella.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: dependencia total de personas clave para resolver incidencias',
    trigger: (ans) => ans.tech_hw_base_conocimiento === 'no',
  },
  {
    id: 'sin_tickets',
    title: 'Gestión de incidencias sin sistema de tickets',
    description: 'Sin tickets no hay priorización, no hay trazabilidad de tiempos de resolución y los clientes no tienen visibilidad de sus incidencias.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: SLA incumplidos, clientes insatisfechos, sin datos para mejorar',
    trigger: (ans) => ans.tech_hw_tickets === 'whatsapp' || ans.tech_hw_tickets === 'no',
  },
  {
    id: 'sin_escandallos',
    title: 'Sin escandallos: coste real de cada plato desconocido',
    description: 'Sin saber el coste real de cada plato es imposible poner precios correctos ni detectar platos con margen negativo.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: platos vendidos por debajo de su coste real sin saberlo',
    trigger: (ans) => ans.hoste_escandallos === 'no',
  },
  {
    id: 'stock_descontrolado',
    title: 'Inventario sin control real',
    description: 'Sin control de stock el inventario no es fiable. Se compra de más, se pierde material y se producen roturas de stock.',
    impact: 'alto', area: 'inventario',
    euros: 'Pérdida estimada: 5-15% del valor del inventario anual en material perdido o inmovilizado',
    trigger: (ans) =>
      ans.comercio_stock_fisico === 'no' ||
      ans.comercio_dist_stock === 'no' ||
      ans.tech_hw_stock_piezas === 'no',
  },
  {
    id: 'roturas_stock',
    title: 'Roturas de stock que generan pérdida de ventas',
    description: 'Cada vez que no puedes servir un pedido por falta de stock pierdes la venta y dañas la imagen ante el cliente.',
    impact: 'alto', area: 'inventario',
    euros: 'Pérdida directa: ventas perdidas + daño a la fidelización del cliente',
    trigger: (ans) => ans.comercio_dist_rotura === 'frecuente',
  },
  {
    id: 'facturas_olvidadas',
    title: 'Trabajos realizados sin facturar',
    description: 'Si alguna vez se olvidó facturar un trabajo, ese dinero está perdido. Son ingresos ganados que nunca se cobrarán.',
    impact: 'critico', area: 'facturacion',
    euros: 'Pérdida directa: 100% del importe de los trabajos no facturados',
    trigger: (ans) =>
      ans.common_olvido_factura === 'si_ha_pasado' ||
      ans.common_olvido_factura === 'alguna_vez',
  },
  {
    id: 'impagos_sin_gestionar',
    title: 'Impagados acumulados sin reclamar',
    description: 'Facturas emitidas que nadie está cobrando. Es dinero que ya debería estar en la cuenta.',
    impact: 'critico', area: 'facturacion',
    euros: 'Pérdida directa: suma total de facturas impagadas sin gestionar',
    trigger: (ans) => ans.common_impagos === 'si_varios',
  },
  {
    id: 'facturacion_lenta',
    title: 'Facturación tardía que retrasa el cobro',
    description: 'Cada semana entre terminar un trabajo y emitir la factura es una semana más de retraso en el cobro.',
    impact: 'medio', area: 'facturacion',
    euros: 'Impacto en tesorería: retrasos acumulados mes a mes',
    trigger: (ans) => ans.common_tiempo_factura === 'mas_semana',
  },
  {
    id: 'obras_al_final',
    title: 'Obras grandes financiadas sin anticipos ni hitos',
    description: 'Financiar obras sin pedir certificaciones o anticipos es prestar dinero gratis al cliente durante meses.',
    impact: 'alto', area: 'facturacion',
    euros: 'Coste financiero: materiales y mano de obra financiados sin cobrar',
    trigger: (ans) => ans.reformas_facturacion_hitos === 'al_final',
  },
  {
    id: 'credito_sin_control',
    title: 'Crédito concedido sin control de riesgo',
    description: 'Dar crédito sin límites formales es la causa número uno de impagados en distribución.',
    impact: 'alto', area: 'facturacion',
    euros: 'Riesgo: impagados de clientes a los que se ha dado más crédito del que pueden pagar',
    trigger: (ans) => ans.comercio_dist_credito === 'si_sin_control',
  },
  {
    id: 'cuello_botella',
    title: 'El empresario como cuello de botella del negocio',
    description: 'Si el negocio depende de tu presencia para funcionar, no puedes crecer más rápido que tu tiempo disponible.',
    impact: 'alto', area: 'tiempo',
    euros: 'Limitación de crecimiento: el negocio no puede escalar más rápido que el tiempo del dueño',
    trigger: (ans) =>
      ans.common_vacaciones === 'no_puedo' ||
      ans.common_cuello_botella === 'muchas',
  },
  {
    id: 'exceso_admin',
    title: 'Demasiado tiempo en tareas administrativas',
    description: 'Más de 3 horas al día en burocracia significa que el empresario no está haciendo lo que más valor aporta.',
    impact: 'alto', area: 'tiempo',
    euros: 'Coste de oportunidad: horas de alto valor ocupadas en tareas automatizables',
    trigger: (ans) => ans.common_horas_admin === '3a5' || ans.common_horas_admin === 'mas5',
  },
  {
    id: 'sin_metricas',
    title: 'Toma de decisiones sin datos objetivos',
    description: 'Gestionar un negocio sin indicadores es como conducir con los ojos cerrados. Se decide por intuición en lugar de por datos.',
    impact: 'alto', area: 'metricas',
    euros: 'Riesgo: decisiones erróneas con impacto económico difícil de cuantificar',
    trigger: (ans) => ans.common_panel_kpi === 'no' || ans.common_frecuencia_numeros === 'nunca',
  },
  {
    id: 'clientes_no_rentables',
    title: 'Clientes no rentables sin detectar',
    description: 'Si no sabes cuáles clientes te dan dinero y cuáles te lo quitan, estás trabajando para algunos que te cuestan más de lo que pagan.',
    impact: 'medio', area: 'metricas',
    euros: 'Pérdida oculta: clientes que generan costes superiores a sus ingresos',
    trigger: (ans) => ans.common_cliente_rentable === 'no',
  },
  // ── HOSTELERÍA ──────────────────────────────────────────────────────────────
  {
    id: 'hoste_mermas_sin_control',
    title: 'Mermas de producto sin controlar',
    description: 'Sin controlar caducidades y desperdicios, el coste de producto real puede ser un 20-30% más alto que el teórico de los escandallos.',
    impact: 'alto', area: 'inventario',
    euros: 'Pérdida estimada: 8-20% del coste de producto en mermas no registradas',
    trigger: (ans) => ans.sector === 'hosteleria' && ans.hoste_mermas === 'no',
  },
  {
    id: 'hoste_tpv_ineficiente',
    title: 'TPV básico: sin control de mesas, cocina ni turnos',
    description: 'Un TPV que solo cobra no gestiona mesas, no manda comandas a cocina y no permite analizar ventas por producto o turno.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: errores de comanda, servicio más lento y sin datos de rentabilidad por plato',
    trigger: (ans) => ans.sector === 'hosteleria' && (ans.hoste_tpv === 'basico' || ans.hoste_tpv === 'manual'),
  },
  {
    id: 'hoste_personal_oral',
    title: 'Turnos del personal gestionados de palabra o WhatsApp',
    description: 'Sin cuadrante digital los errores de turno, los cambios de última hora y los conflictos de horario son inevitables.',
    impact: 'medio', area: 'tiempo',
    euros: 'Coste oculto: horas de gestión de horarios + conflictos y errores de turno evitables',
    trigger: (ans) => ans.sector === 'hosteleria' && ans.hoste_personal === 'oral',
  },
  // ── SERVICIOS PROFESIONALES ─────────────────────────────────────────────────
  {
    id: 'serv_expedientes_papel',
    title: 'Expedientes en papel o carpetas del PC: información dispersa',
    description: 'Sin software de gestión documental cada búsqueda de un expediente cuesta minutos. Con cientos de clientes, eso son horas a la semana.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste estimado: 15-30 min por búsqueda × volumen de clientes activos',
    trigger: (ans) => ans.serv_expedientes === 'papel' || ans.serv_expedientes === 'carpetas_pc',
  },
  {
    id: 'serv_clientes_llaman',
    title: 'Clientes que llaman para saber el estado de sus gestiones',
    description: 'Si los clientes necesitan llamar para saber cómo va su expediente, tu equipo pierde tiempo en llamadas que un portal de cliente automatizaría.',
    impact: 'medio', area: 'operaciones',
    euros: 'Coste estimado: 10-20 min por llamada × número de consultas de estado al mes',
    trigger: (ans) => ans.serv_comunicacion_estado === 'esperan',
  },
  {
    id: 'serv_sin_agenda_online',
    title: 'Sin agenda online: citas solo por teléfono',
    description: 'Gestionar citas por teléfono consume tiempo y limita la captación a horario de oficina. Los clientes esperan poder reservar 24/7.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Citas perdidas fuera de horario + tiempo de personal en gestión de agenda',
    trigger: (ans) =>
      (ans.sector === 'servicios' && ans.serv_agenda === 'si_manual') ||
      ans.serv_agenda_clinica === 'manual',
  },
  {
    id: 'serv_sin_recordatorios_cita',
    title: 'Sin recordatorios automáticos: no-shows que cuestan dinero',
    description: 'Las citas olvidadas generan huecos vacíos en la agenda. Un recordatorio automático reduce los no-shows hasta un 70%.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Pérdida estimada: 15-30% de citas perdidas por olvido que podrían cubrirse con otra cita',
    trigger: (ans) => ans.serv_recordatorios_cita === 'no',
  },
  // ── INDUSTRIA ───────────────────────────────────────────────────────────────
  {
    id: 'ind_sin_costes_produccion',
    title: 'Fabricación sin conocer el coste real por pedido',
    description: 'Fabricar sin calcular el coste exacto de cada pedido hace imposible saber si cada trabajo genera margen positivo o negativo.',
    impact: 'critico', area: 'operaciones',
    euros: 'Riesgo directo: pedidos que se fabrican generando pérdidas sin que nadie lo detecte',
    trigger: (ans) => ans.sector === 'industria' && ans.ind_costes_produccion === 'no',
  },
  {
    id: 'ind_planificacion_informal',
    title: 'Producción planificada de cabeza: retrasos inevitables',
    description: 'Sin sistema de planificación de producción, los recursos se solapan, los retrasos se acumulan y la capacidad real de la planta se desconoce.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: retrasos de entrega, penalizaciones contractuales y coste de urgencias',
    trigger: (ans) => ans.sector === 'industria' && ans.ind_planificacion === 'memoria',
  },
  {
    id: 'ind_calidad_informal',
    title: 'Control de calidad solo por revisión visual: rechazos y reclamaciones',
    description: 'Sin proceso formal de calidad los defectos se detectan tarde, los rechazos de clientes aumentan y es imposible analizar las causas raíz.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste directo: material rechazado + reclamaciones + pérdida de imagen',
    trigger: (ans) => ans.sector === 'industria' && ans.ind_control_calidad === 'informal',
  },
  // ── EQUIPO Y PROCESOS ────────────────────────────────────────────────────────
  {
    id: 'equipo_sin_herramienta',
    title: 'Gestión de tareas por WhatsApp o de palabra',
    description: 'Sin herramienta de gestión de tareas, las responsabilidades se pierden, se duplica trabajo y es imposible ver la carga real del equipo.',
    impact: 'alto', area: 'equipo',
    euros: 'Coste oculto: tareas olvidadas, duplicadas o mal asignadas que consumen horas y generan errores',
    trigger: (ans) => ans.common_herramienta_tareas === 'whatsapp',
  },
  {
    id: 'coordinacion_informal',
    title: 'Coordinación de proyectos sin panel centralizado',
    description: 'Sin visión global de todos los proyectos activos, los recursos se solapan y los cuellos de botella no se detectan hasta que ya hay un problema.',
    impact: 'medio', area: 'equipo',
    euros: 'Impacto: retrasos, solapamiento de recursos y decisiones tomadas sin información completa',
    trigger: (ans) => ans.common_coordinacion_equipo === 'informal',
  },
  {
    id: 'comunicacion_whatsapp',
    title: 'Comunicación interna por WhatsApp personal: riesgo y pérdida de información',
    description: 'WhatsApp no está diseñado para uso empresarial: no hay archivo histórico fiable, mezcla personal y profesional, y no permite control ni búsqueda eficiente.',
    impact: 'medio', area: 'equipo',
    euros: 'Riesgo: información crítica perdida en chats, sin posibilidad de auditoría',
    trigger: (ans) => ans.common_comunicacion_interna === 'whatsapp',
  },
  {
    id: 'procesos_sin_documentar',
    title: 'Procesos clave solo en la cabeza de las personas',
    description: 'Si los procesos no están documentados, cada incorporación requiere formación larga, los errores se repiten y el negocio depende de personas específicas.',
    impact: 'alto', area: 'equipo',
    euros: 'Coste de dependencia: tiempo de formación + errores evitables + riesgo si una persona clave se va',
    trigger: (ans) => ans.common_procesos_documentados === 'no',
  },
  {
    id: 'equipo_sin_autonomia',
    title: 'Equipo sin autonomía: el empresario resuelve todo',
    description: 'Si el equipo no puede actuar sin consultarte, no puedes delegar realmente. Cada interrupción rompe el flujo del responsable más valioso del negocio.',
    impact: 'alto', area: 'equipo',
    euros: 'Coste directo: el tiempo del empresario es el más caro — no puede dedicarse a hacer crecer el negocio',
    trigger: (ans) => ans.common_autonomia_equipo === 'no_siempre',
  },
  {
    id: 'interrupciones_continuas',
    title: 'Interrupciones constantes que bloquean al responsable',
    description: 'Más de 6 interrupciones al día son más de 1 hora perdida en cambios de contexto. El trabajo de alto valor queda aplazado indefinidamente.',
    impact: 'alto', area: 'tiempo',
    euros: 'Coste estimado: +1-2 horas diarias de trabajo de alto valor bloqueado por interrupciones',
    trigger: (ans) => ans.common_interrupciones === 'muchas',
  },
  {
    id: 'tarea_clave_manual',
    title: 'Tarea de alto volumen sin automatizar',
    description: 'La tarea que más tiempo consume es candidata principal a automatización. Reducir su tiempo a la mitad libera horas semanales para lo que realmente importa.',
    impact: 'medio', area: 'tiempo',
    euros: 'Oportunidad: automatizar la principal tarea repetitiva puede liberar 3-8 horas semanales',
    trigger: (ans) =>
      ans.common_tarea_repetida === 'admin_burocracia' ||
      ans.common_tarea_repetida === 'buscar_docs' ||
      ans.common_tarea_repetida === 'coordinacion',
  },
  {
    id: 'sin_coste_captacion',
    title: 'Sin medir cuánto cuesta captar un cliente',
    description: 'Si no sabes cuánto cuesta captar un cliente, no puedes saber si tu inversión en marketing y ventas es rentable ni dónde optimizarla.',
    impact: 'medio', area: 'metricas',
    euros: 'Riesgo: inversión en captación sin retorno medido — puede costar más que el margen del cliente',
    trigger: (ans) => ans.common_coste_captacion === 'no',
  },
  // ── COMÚN A TODOS ────────────────────────────────────────────────────────────
  {
    id: 'facturacion_en_excel',
    title: 'Facturación en Excel: riesgo de errores y sin control de numeración',
    description: 'Facturar en Excel genera errores en numeración, dificulta el control de series y no permite integración con banco ni automatización de cobros.',
    impact: 'medio', area: 'facturacion',
    euros: 'Riesgo: errores en facturas, problemas con Hacienda y tiempo perdido en cierres contables',
    trigger: (ans) => ans.common_facturacion_como === 'excel',
  },
]

function calcAreaScores(answers) {
  const areaData = {}
  Object.values(NODES).forEach(node => {
    if (!node.area || !node.scoreMap) return
    const val = answers[node.id]
    if (!val || Array.isArray(val)) return
    const score = node.scoreMap[val]
    if (score === undefined) return
    if (!areaData[node.area]) areaData[node.area] = { total: 0, count: 0 }
    areaData[node.area].total += score
    areaData[node.area].count++
  })
  const result = {}
  Object.entries(areaData).forEach(([area, data]) => {
    result[area] = data.count > 0 ? Math.round((data.total / (data.count * 3)) * 100) : null
  })
  return result
}

function calcGlobalScore(areaScores) {
  const values = Object.values(areaScores).filter(v => v !== null)
  if (!values.length) return 0
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

export function generateReport(answers) {
  const areaScores  = calcAreaScores(answers)
  const globalScore = calcGlobalScore(areaScores)

  const leaks = LEAK_RULES
    .filter(r => r.trigger(answers))
    .sort((a, b) => ({ critico: 0, alto: 1, medio: 2 }[a.impact] - { critico: 0, alto: 1, medio: 2 }[b.impact]))

  const modules = getRecommendedModules(answers)
  const areas   = AREAS.map(a => ({ ...a, score: areaScores[a.id] })).filter(a => a.score !== null)

  return {
    globalScore, areas, leaks, modules, answers,
    sector: answers.sector,
    generatedAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
  }
}

export function getScoreLabel(score) {
  if (score >= 75) return { label: 'Bueno',     color: 'text-emerald-600', bg: 'bg-emerald-100', bar: 'bg-emerald-500' }
  if (score >= 50) return { label: 'Mejorable', color: 'text-amber-600',   bg: 'bg-amber-100',   bar: 'bg-amber-500' }
  if (score >= 25) return { label: 'Problema',  color: 'text-orange-600',  bg: 'bg-orange-100',  bar: 'bg-orange-500' }
  return                  { label: 'Crítico',   color: 'text-red-600',     bg: 'bg-red-100',     bar: 'bg-red-500' }
}

export function getGlobalLabel(score) {
  if (score >= 75) return { label: 'Negocio bien gestionado',         emoji: '✅', color: 'text-emerald-600' }
  if (score >= 50) return { label: 'Con margen de mejora claro',      emoji: '⚡', color: 'text-amber-600' }
  if (score >= 25) return { label: 'Fugas importantes detectadas',    emoji: '⚠️', color: 'text-orange-600' }
  return                  { label: 'Situación crítica — actúa ahora', emoji: '🚨', color: 'text-red-600' }
}
