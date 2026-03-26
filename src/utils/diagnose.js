import { NODES } from '../data/tree.js'
import { getRecommendedModules } from '../data/modules.js'

export const AREAS = [
  { id: 'ventas_crm', label: 'Ventas y Clientes', icon: '🤝' },
  { id: 'presupuestacion', label: 'Presupuestación', icon: '📄' },
  { id: 'operaciones', label: 'Operaciones', icon: '⚙️' },
  { id: 'inventario', label: 'Inventario y Compras', icon: '📦' },
  { id: 'equipo', label: 'Equipo y Procesos', icon: '👥' },
  { id: 'facturacion', label: 'Facturación y Cobros', icon: '💶' },
  { id: 'tiempo', label: 'Gestión del Tiempo', icon: '⏱️' },
  { id: 'metricas', label: 'Datos y Métricas', icon: '📊' },
]

const LEAK_RULES = [
  {
    id: 'sin_seguimiento',
    title: 'Presupuestos enviados sin seguimiento',
    description: 'Solo el 2% de las ventas se cierran en el primer contacto — la mayoría después del 5º. Sin seguimiento sistemático se pierde dinero sobre la mesa.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Pérdida estimada: 30-40% de presupuestos enviados que se cierran con un simple recordatorio',
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
    description: 'Si alguna vez se olvidó facturar un trabajo, ese dinero está perdido. El 31% de las PYMEs paga incluso facturas duplicadas por falta de control (ITUser).',
    impact: 'critico', area: 'facturacion',
    euros: 'Pérdida directa: 100% del importe de los trabajos no facturados',
    trigger: (ans) =>
      ans.common_olvido_factura === 'si_ha_pasado' ||
      ans.common_olvido_factura === 'alguna_vez',
  },
  {
    id: 'impagos_sin_gestionar',
    title: 'Impagados acumulados sin reclamar',
    description: 'Facturas emitidas que nadie está cobrando. El periodo medio de cobro en PYMEs españolas es de ~80 días (CEPYME). Sin gestión activa ese plazo se alarga indefinidamente.',
    impact: 'critico', area: 'facturacion',
    euros: 'Pérdida directa: suma total de facturas impagadas + coste financiero de financiar al cliente',
    trigger: (ans) => ans.common_impagos === 'si_varios',
  },
  {
    id: 'facturacion_lenta',
    title: 'Facturación tardía que retrasa el cobro',
    description: 'Cada semana entre terminar un trabajo y emitir la factura es una semana más de retraso en el cobro. Las PYMEs dedican de media 10,5h/mes solo a gestión manual de facturas (ITUser).',
    impact: 'medio', area: 'facturacion',
    euros: 'Impacto en tesorería: retrasos acumulados + horas de gestión manual evitables',
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
  // ── PELUQUERÍA Y ESTÉTICA ────────────────────────────────────────────────────
  {
    id: 'peluq_noshows_alto',
    title: 'No-shows sin recordatorio: horas y dinero perdidos cada mes',
    description: 'El 46% de autónomos en servicios de belleza pierde más de 5h/mes por citas no presentadas. Un recordatorio automático las reduce hasta un 70% (Autónomos y Emprendedor).',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Estimado: 10+ no-shows/mes × precio medio servicio = 200-500€/mes de ingreso no recuperado',
    trigger: (ans) => ans.sector === 'peluqueria' && (ans.peluq_noshows === 'muchos' || (ans.peluq_noshows === 'algunos' && ans.peluq_recordatorios === 'no')),
  },
  {
    id: 'peluq_sin_recordatorios',
    title: 'Sin recordatorios automáticos de cita',
    description: 'Sin recordatorios automáticos cada no-show es una hora bloqueada que no se puede recuperar ni ofrecer a otro cliente.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Coste directo: horas vacías en agenda × precio medio del servicio',
    trigger: (ans) => ans.sector === 'peluqueria' && ans.peluq_recordatorios === 'no',
  },
  {
    id: 'peluq_sin_ficha',
    title: 'Sin ficha de cliente: fidelización y ventas cruzadas imposibles',
    description: 'Sin historial de servicios y preferencias no puedes personalizar el servicio, recomendar productos ni lanzar campañas de fidelización por fecha de última visita.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Oportunidad perdida: clientes que repiten mucho menos al no sentirse reconocidos ni recordados',
    trigger: (ans) => ans.sector === 'peluqueria' && ans.peluq_ficha === 'no',
  },
  {
    id: 'peluq_margen_desconocido',
    title: 'Coste real por servicio desconocido: precios mal ajustados',
    description: 'Sin calcular el coste de productos + tiempo de personal por servicio, algunos tratamientos pueden venderse con margen negativo sin saberlo.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: servicios que generan pérdida real al incluir el coste de producto + tiempo',
    trigger: (ans) => ans.sector === 'peluqueria' && ans.peluq_margen === 'no',
  },
  // ── TALLER Y REPARACIÓN ──────────────────────────────────────────────────────
  {
    id: 'taller_sin_ordenes',
    title: 'Sin órdenes de trabajo digitales: pérdida de control total',
    description: 'Sin órdenes de trabajo no hay trazabilidad de qué piezas se usaron, cuánto tardó cada reparación ni si el coste real encaja con el presupuesto.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: trabajos facturados por debajo del coste real + disputas con clientes sin respaldo documental',
    trigger: (ans) => ans.sector === 'taller' && ans.taller_ordenes === 'no',
  },
  {
    id: 'taller_horas_sin_controlar',
    title: 'Horas reales vs. presupuestadas sin controlar',
    description: 'Las desviaciones entre tiempo presupuestado y real son la principal fuga de margen en talleres. Sin medirlo es imposible mejorar los presupuestos ni detectar trabajos deficitarios.',
    impact: 'alto', area: 'operaciones',
    euros: 'Pérdida oculta: trabajos que duran el doble de lo presupuestado reducen el margen a la mitad',
    trigger: (ans) => ans.sector === 'taller' && ans.taller_horas === 'no',
  },
  {
    id: 'taller_margen_desconocido',
    title: 'Margen real por reparación desconocido',
    description: 'Facturar sin saber si cada reparación es rentable es gestionar a ciegas. Los trabajos "baratos" pueden ser los que más tiempo consumen y menos dejan.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: reparaciones que generan pérdida real al sumar piezas + horas de trabajo',
    trigger: (ans) => ans.sector === 'taller' && ans.taller_margen === 'no',
  },
  {
    id: 'taller_presupuestos_sin_seguimiento',
    title: 'Presupuestos de taller enviados sin seguimiento',
    description: 'Un cliente que no responde al presupuesto puede estar esperando que le llamen. Una llamada a los 2-3 días recupera entre el 20-30% de los presupuestos no contestados.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Estimado: 20-30% de los presupuestos "perdidos" se recuperan con un simple seguimiento',
    trigger: (ans) => ans.sector === 'taller' && ans.taller_presupuestos === 'no',
  },
  // ── MÉTRICAS ─────────────────────────────────────────────────────────────────
  {
    id: 'sin_tasa_conversion',
    title: 'Tasa de conversión de presupuestos no medida',
    description: 'Sin medir cuántos presupuestos se convierten en venta, es imposible saber si el problema es de precio, de seguimiento o de la competencia. Es el KPI más ignorado y más accionable.',
    impact: 'medio', area: 'metricas',
    euros: 'Oportunidad: mejorar la tasa de conversión un 10% puede suponer un 10-20% más de facturación sin más clientes',
    trigger: (ans) => ans.common_conversion_presupuestos === 'no',
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
  // ── ROTULACIÓN E IMPRESIÓN GRAN FORMATO ─────────────────────────────────────
  {
    id: 'rotul_sin_crm_erp',
    title: 'Presupuestos de rotulación sin seguimiento: leads perdidos',
    description: 'Sin CRM o ERP, hasta el 20% de los leads quedan sin seguimiento. En rotulación, una cotización sin respuesta puede ser un trabajo de 1.000–5.000€ que se va a la competencia.',
    impact: 'critico', area: 'ventas_crm',
    euros: 'Pérdida estimada: 15-20% de presupuestos no cerrados por falta de seguimiento sistemático',
    trigger: (ans) => ans.sector === 'rotulacion' && (ans.rotul_crm_pedidos === 'excel_email' || ans.rotul_crm_pedidos === 'nada'),
  },
  {
    id: 'rotul_archivos_defectuosos',
    title: 'Tiempo perdido en corrección de archivos defectuosos de clientes',
    description: 'Cada revisión extra añade 1–2 días al plazo y 100–200€ de coste no facturado en tiempo de diseño. Con alto volumen de proyectos este coste se multiplica.',
    impact: 'alto', area: 'operaciones',
    euros: 'Estimado: 100–200€/proyecto en tiempo de corrección de archivos × volumen mensual',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_archivos_cliente === 'frecuentes',
  },
  {
    id: 'rotul_sin_nesting',
    title: 'Desperdicio de material por falta de nesting automático',
    description: 'Sin nesting automático el desperdicio supera el 15–20% del material. Con 500 m²/mes a 50€/m² son 3.750€/mes en material malgastado que podría ahorrarse con software.',
    impact: 'critico', area: 'inventario',
    euros: 'Ahorro potencial: 20–30% del coste de material según volumen de producción mensual',
    trigger: (ans) => ans.sector === 'rotulacion' && (ans.rotul_nesting === 'no' || ans.rotul_nesting === 'manual'),
  },
  {
    id: 'rotul_maquinaria_reactiva',
    title: 'Paradas de plotter por falta de mantenimiento preventivo',
    description: 'Una parada de 8h por avería en plotter equivale a 1.000–3.000€ de capacidad productiva perdida. El mantenimiento reactivo cuesta 3 veces más que el preventivo.',
    impact: 'critico', area: 'operaciones',
    euros: 'Pérdida estimada: 500–1.500€/mes en capacidad productiva por paradas no planificadas',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_mantenimiento === 'reactivo',
  },
  {
    id: 'rotul_alta_tasa_reprocesos',
    title: 'Alta tasa de reimpresiones: material y tiempo tirados',
    description: 'Más del 8% de reprocesos supone pérdida directa de material y tiempo. Cada reimpresión cuesta el 100% del coste de producción original sin generar ingreso adicional.',
    impact: 'alto', area: 'operaciones',
    euros: 'Estimado: 300–800€/mes en material y tiempo de reimpresiones innecesarias',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_reprocesos === 'frecuente',
  },
  {
    id: 'rotul_sin_icc',
    title: 'Sin perfiles ICC estandarizados: color inconsistente entre trabajos',
    description: 'Sin perfiles de color calibrados por sustrato e impresora, el color varía entre trabajos del mismo cliente. Cada reclamación de color es un reproceso evitable.',
    impact: 'medio', area: 'operaciones',
    euros: 'Coste directo: reimpresiones por desviación de color + tiempo de ajuste manual en cada trabajo',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_icc_perfiles === 'no',
  },
  {
    id: 'rotul_manipulacion_sin_control',
    title: 'Acabados y manipulación sin checklist: errores y reprocesos evitables',
    description: 'Sin checklist por tipo de producto (ojelar lona, montar vinilo, enmarcado...) cada operario trabaja a su criterio. Un error en confección descubre el problema cuando ya está en el cliente.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste oculto: reprocesos de manipulación + tiempo de técnico desplazado para corregir en cliente',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_manipulacion_checklist === 'criterio_operario',
  },
  {
    id: 'rotul_tiempos_sin_medir',
    title: 'Tiempos de manipulación no medidos: presupuestos que pierden margen',
    description: 'Presupuestar acabados "a ojo" sin tiempos estándar provoca que trabajos con mucha manipulación (lona tensada, cajas de luz, wrapping) se vendan a precio de impresión simple.',
    impact: 'alto', area: 'operaciones',
    euros: 'Pérdida oculta: trabajos con alta manipulación cuyo precio no cubre el tiempo real de confección',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_tiempos_estandar === 'no',
  },
  {
    id: 'rotul_sin_hoja_ruta',
    title: 'Sin hoja de ruta por trabajo: información solo en la cabeza del jefe',
    description: 'Sin orden de trabajo por fases, cualquier cambio de turno o duda detiene la producción. El jefe se convierte en el único que sabe qué hay que hacer en cada trabajo.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste de dependencia: paradas de producción + errores por instrucciones verbales malinterpretadas',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_hoja_ruta === 'verbal',
  },
  {
    id: 'rotul_sin_planificacion',
    title: 'Sin planificación de producción: cuellos de botella invisibles',
    description: 'Sin visibilidad de la cola de trabajos, los cuellos de botella aparecen tarde, los plazos se incumplen y los recursos se solapan. Los retrasos dañan la confianza del cliente.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: retrasos, horas extra y deterioro de la relación con el cliente por incumplimiento de plazos',
    trigger: (ans) => ans.sector === 'rotulacion' && ans.rotul_planificacion === 'no',
  },
  // ── FONTANERÍA ───────────────────────────────────────────────────────────────
  {
    id: 'font_sin_partes',
    title: 'Intervenciones sin parte de trabajo: sin trazabilidad ni defensa ante disputas',
    description: 'Sin parte firmado por el cliente no hay forma de acreditar qué se hizo, qué materiales se usaron ni cuánto tardó cada intervención. Cada disputa se convierte en "yo digo vs. tú dices".',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: materiales no facturados + disputas sin respaldo + coste real de cada trabajo desconocido',
    trigger: (ans) => ans.sector === 'fontaneria' && (ans.font_partes_trabajo === 'no' || ans.font_partes_trabajo === 'a_veces'),
  },
  {
    id: 'font_stock_sin_control',
    title: 'Material en furgoneta sin control: pérdidas y compras duplicadas',
    description: 'Sin control del stock en furgoneta los técnicos compran por su cuenta, el material desaparece sin imputarse a ningún trabajo y el coste real de cada intervención es imposible de calcular.',
    impact: 'alto', area: 'inventario',
    euros: 'Pérdida estimada: 5-15% del coste de materiales por falta de control y compras no imputadas',
    trigger: (ans) => ans.sector === 'fontaneria' && (ans.font_stock_furgoneta === 'mental' || ans.font_stock_furgoneta === 'no'),
  },
  {
    id: 'font_materiales_no_imputados',
    title: 'Materiales no imputados por trabajo: margen real desconocido',
    description: 'Si los materiales no se registran por trabajo, es imposible saber si cada intervención fue rentable. Los trabajos con mucho material pueden venderse con margen negativo sin saberlo.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: trabajos donde el coste de material supera el precio facturado sin que nadie lo detecte',
    trigger: (ans) => ans.sector === 'fontaneria' && ans.font_imputacion_materiales === 'no',
  },
  {
    id: 'font_sin_contratos',
    title: 'Sin contratos de mantenimiento: cada mes empezas de cero',
    description: 'Los contratos de mantenimiento de calderas, comunidades o climatización son ingresos recurrentes predecibles. Sin ellos toda la facturación depende de averías impredecibles.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Oportunidad perdida: facturación recurrente mensual con margen alto y baja dependencia de captación',
    trigger: (ans) => ans.sector === 'fontaneria' && ans.font_contratos_mantenimiento === 'no',
  },
  {
    id: 'font_presupuestos_sin_seguimiento',
    title: 'Presupuestos enviados sin seguimiento: clientes que esperan un recordatorio',
    description: 'Un cliente que no responde al presupuesto puede estar comparando o esperando que le llamen. Sin seguimiento sistemático se pierde entre el 20-30% de los trabajos que podrían cerrarse.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Estimado: 20-30% de los presupuestos sin respuesta se recuperan con un simple recordatorio',
    trigger: (ans) => ans.sector === 'fontaneria' && ans.font_seguimiento_presupuesto === 'nunca',
  },
  {
    id: 'font_cobros_sin_control',
    title: 'Cobros en campo sin registro: efectivo que no llega o trabajos sin cobrar',
    description: 'Cobrar en efectivo sin albarán ni registro digital genera descuadres en caja, trabajos olvidados sin facturar y riesgo de disputas con el cliente sobre lo acordado.',
    impact: 'alto', area: 'facturacion',
    euros: 'Riesgo directo: trabajos fiados o sin cobrar + efectivo que no se liquida correctamente',
    trigger: (ans) => ans.sector === 'fontaneria' && (ans.font_cobros === 'efectivo_sin' || ans.font_cobros === 'fiado'),
  },
  // ── ELECTRICIDAD ─────────────────────────────────────────────────────────────
  {
    id: 'elec_sin_partes',
    title: 'Instalaciones sin parte de trabajo: sin trazabilidad técnica ni legal',
    description: 'Sin parte de trabajo firmado es imposible acreditar qué se instaló, qué materiales se usaron y cuántas horas se emplearon. Ante una reclamación o inspección, no hay respaldo documental.',
    impact: 'alto', area: 'operaciones',
    euros: 'Impacto: trabajos no cobrados correctamente + riesgo legal sin documentación de la instalación',
    trigger: (ans) => ans.sector === 'electricidad' && (ans.elec_partes === 'no' || ans.elec_partes === 'solo_grandes'),
  },
  {
    id: 'elec_materiales_no_imputados',
    title: 'Materiales eléctricos no imputados: margen real de instalaciones desconocido',
    description: 'Cable, mecanismos, cuadros y protecciones son una parte significativa del coste de cada instalación. Sin imputarlos correctamente, los proyectos aparentan más margen del que realmente tienen.',
    impact: 'alto', area: 'operaciones',
    euros: 'Riesgo: instalaciones cuyo coste real de material supera el presupuestado sin que se detecte',
    trigger: (ans) => ans.sector === 'electricidad' && ans.elec_imputacion === 'no',
  },
  {
    id: 'elec_documentacion_pendiente',
    title: 'Boletines y documentación técnica pendiente: riesgo legal y clientes bloqueados',
    description: 'Un cliente que no puede legalizar su instalación por falta del boletín genera reclamaciones, bloquea la facturación final y expone a la empresa a responsabilidades legales.',
    impact: 'critico', area: 'operaciones',
    euros: 'Riesgo directo: trabajos no cobrados + reclamaciones + responsabilidad legal por instalaciones sin legalizar',
    trigger: (ans) => ans.sector === 'electricidad' && ans.elec_documentacion === 'pendiente',
  },
  {
    id: 'elec_sin_contratos_mant',
    title: 'Sin contratos de mantenimiento eléctrico: dependencia total de la demanda espontánea',
    description: 'Las revisiones periódicas de instalaciones eléctricas en industria, empresas y comunidades son ingresos recurrentes con margen alto. Sin esta cartera, cada mes hay que empezar de cero.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Oportunidad perdida: facturación mensual estable con bajo coste de captación',
    trigger: (ans) => ans.sector === 'electricidad' && ans.elec_contratos_mant === 'no',
  },
  {
    id: 'elec_presupuestos_sin_seguimiento',
    title: 'Presupuestos de instalación enviados sin seguimiento',
    description: 'Las instalaciones eléctricas tienen tickets elevados. Un presupuesto de 5.000-20.000€ sin seguimiento puede perderse por no hacer una simple llamada de seguimiento a tiempo.',
    impact: 'alto', area: 'ventas_crm',
    euros: 'Pérdida estimada: instalaciones de alto valor que se van a la competencia por falta de seguimiento',
    trigger: (ans) => ans.sector === 'electricidad' && ans.elec_seguimiento === 'nunca',
  },
  {
    id: 'elec_stock_sin_control',
    title: 'Material eléctrico sin control en furgoneta y almacén',
    description: 'Sin control de stock, los técnicos compran material de emergencia a precio de mostrador, el inventario no cuadra y los costes reales por instalación se disparan.',
    impact: 'medio', area: 'inventario',
    euros: 'Pérdida estimada: sobrecoste de compras urgentes + material no imputado a instalaciones',
    trigger: (ans) => ans.sector === 'electricidad' && (ans.elec_stock_materiales === 'mental' || ans.elec_stock_materiales === 'no'),
  },
  // ── AUTOVENTA ────────────────────────────────────────────────────────────────
  {
    id: 'auto_stock_descontrolado',
    title: 'Stock de furgoneta sin control: desfase entre inventario real y sistema',
    description: 'Sin control del stock en furgoneta en tiempo real, el inventario central no refleja la realidad. El resultado: roturas de stock, producto perdido y mermas ocultas que nadie detecta.',
    impact: 'critico', area: 'inventario',
    euros: 'Pérdida estimada: 3-8% del valor del stock en diferencias no justificadas entre furgonetas y almacén',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_stock_furgoneta === 'periodico' || ans.auto_stock_furgoneta === 'no'),
  },
  {
    id: 'auto_albaranes_papel',
    title: 'Albaranes en papel: retrasos en facturación y errores de transcripción',
    description: 'Cada albarán en papel que alguien pica al final del día es un punto de error. Los retrasos en picar acumulan días de facturación pendiente y el cash flow se resiente.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste operativo: 15-30 min/día en picar albaranes + errores de transcripción que generan facturas incorrectas',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_pedidos_albaranes === 'papel_trae' || ans.auto_pedidos_albaranes === 'whatsapp_foto' || ans.auto_pedidos_albaranes === 'no_registro'),
  },
  {
    id: 'auto_cobros_sin_control',
    title: 'Cobros en ruta sin control: efectivo que no cuadra y clientes con deuda oculta',
    description: 'Sin liquidación rigurosa del efectivo cobrado en ruta, los descuadres de caja son inevitables. Los clientes que "quedan pendientes" acumulan deuda que después es difícil de cobrar.',
    impact: 'critico', area: 'facturacion',
    euros: 'Riesgo directo: efectivo no contabilizado + deuda de clientes no registrada que crece sin control',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_cobros_ruta === 'efectivo_sin' || ans.auto_cobros_ruta === 'fiado'),
  },
  {
    id: 'auto_devoluciones_sin_registrar',
    title: 'Devoluciones no registradas: stock que desaparece sin rastro',
    description: 'Cada devolución sin albarán formal es producto que vuelve sin actualizarse en el inventario. El stock del sistema no coincide con el real, y la empresa no puede reclamar al proveedor correctamente.',
    impact: 'alto', area: 'operaciones',
    euros: 'Pérdida oculta: producto devuelto que no se abona, no se reintegra al stock ni se analiza su causa',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_devoluciones === 'verbal' || ans.auto_devoluciones === 'sin_control'),
  },
  {
    id: 'auto_sin_objetivos_ruta',
    title: 'Sin objetivos ni seguimiento por ruta: vendedores sin brújula',
    description: 'Sin KPIs por ruta y vendedor, es imposible saber quién rinde, en qué zonas hay oportunidades y dónde se están perdiendo clientes. El equipo de ventas opera sin feedback.',
    impact: 'alto', area: 'metricas',
    euros: 'Coste de oportunidad: rutas con ventas por debajo del potencial que nadie detecta ni corrige',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_objetivos === 'informales' || ans.auto_objetivos === 'no'),
  },
  {
    id: 'auto_caja_negra',
    title: 'Rutas como caja negra: el responsable solo se entera cuando hay un problema',
    description: 'Sin visibilidad en tiempo real sobre las rutas, las incidencias se gestionan tarde, los clientes sin visitar pasan desapercibidos y las oportunidades de venta se pierden ese mismo día.',
    impact: 'alto', area: 'metricas',
    euros: 'Impacto: visitas no realizadas que no se recuperan + incidencias que escalan por falta de supervisión',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_visibilidad === 'reunion' || ans.auto_visibilidad === 'no'),
  },
  {
    id: 'auto_sincronizacion_manual',
    title: 'Sincronización manual entre ruta y ERP: cuellos de botella diarios',
    description: 'Picar albaranes a mano o esperar al volcado nocturno retrasa la visibilidad del stock, ralentiza la facturación y genera errores acumulativos que son muy costosos de corregir.',
    impact: 'alto', area: 'inventario',
    euros: 'Coste operativo: horas diarias de entrada manual de datos + errores acumulados que requieren auditorías',
    trigger: (ans) => ans.sector === 'autoventa' && (ans.auto_sincronizacion === 'manual_picar' || ans.auto_sincronizacion === 'no_erp'),
  },
  // ── PANADERÍA Y OBRADOR ──────────────────────────────────────────────────────
  {
    id: 'pana_sin_escandallos',
    title: 'Sin escandallo de costes: precios puestos sin saber si generan margen',
    description: 'Poner el precio del pan o la bollería sin calcular el coste real de harina, mantequilla, energía y mano de obra por unidad es gestionar a ciegas. Algunos productos pueden venderse con pérdida sin saberlo.',
    impact: 'critico', area: 'operaciones',
    euros: 'Riesgo directo: productos vendidos por debajo de su coste real — las subidas de materias primas no se trasladan al precio',
    trigger: (ans) => ans.sector === 'panaderia' && (ans.pana_escandallos === 'estimados' || ans.pana_escandallos === 'no'),
  },
  {
    id: 'pana_mermas_sin_control',
    title: 'Mermas no registradas: el coste real de producción es mayor del que parece',
    description: 'Pan sobrante, bollería caducada y recortes de pastelería son costes reales que no aparecen en ningún sitio. Sin medirlos, el margen calculado es siempre mejor que el real.',
    impact: 'alto', area: 'inventario',
    euros: 'Pérdida estimada: 8-20% del coste de producción en mermas no registradas que distorsionan el margen',
    trigger: (ans) => ans.sector === 'panaderia' && ans.pana_mermas === 'no',
  },
  {
    id: 'pana_produccion_por_inercia',
    title: 'Producción por inercia: sobreproducción o roturas de stock evitables',
    description: 'Producir siempre la misma cantidad sin ajustar a pedidos y demanda real genera dos problemas: días con mucho sobrante (merma) y días con roturas que hacen perder ventas.',
    impact: 'alto', area: 'operaciones',
    euros: 'Coste doble: mermas en días de sobreproducción + ventas perdidas en días de rotura de stock',
    trigger: (ans) => ans.sector === 'panaderia' && (ans.pana_planificacion_hornadas === 'inercia' || ans.pana_planificacion_hornadas === 'responsable'),
  },
  {
    id: 'pana_pedidos_clientes_informales',
    title: 'Pedidos de hostelería por WhatsApp: errores, olvidos y clientes insatisfechos',
    description: 'Gestionar los pedidos de bares, hoteles y restaurantes por WhatsApp o teléfono genera errores de cantidad, pedidos olvidados y retrasos. Un solo fallo repercute en el servicio del cliente a sus propios clientes.',
    impact: 'medio', area: 'ventas_crm',
    euros: 'Impacto: pedidos erróneos + pérdida de clientes de hostelería que son los de mayor ticket recurrente',
    trigger: (ans) => ans.sector === 'panaderia' && (ans.pana_pedidos_clientes === 'whatsapp_hora' || ans.pana_pedidos_clientes === 'fijos'),
  },
  {
    id: 'pana_alergenos_sin_control',
    title: 'Sin control de alérgenos: riesgo legal y sanitario',
    description: 'La normativa obliga a informar sobre los 14 alérgenos de obligatoria declaración. Sin sistema formal, una inspección puede resultar en sanción, y un incidente con un cliente alérgico en responsabilidad civil.',
    impact: 'critico', area: 'operaciones',
    euros: 'Riesgo legal: sanciones por incumplimiento normativo + responsabilidad civil en caso de incidente con alérgenos',
    trigger: (ans) => ans.sector === 'panaderia' && (ans.pana_trazabilidad_alergenos === 'parcial' || ans.pana_trazabilidad_alergenos === 'no'),
  },
  {
    id: 'pana_reparto_sin_control',
    title: 'Reparto sin control: albaranes perdidos y clientes que no reciben lo correcto',
    description: 'Sin hoja de ruta digital y albaranes firmados, es imposible verificar que cada cliente recibió exactamente lo pedido. Las discrepancias generan abonos y pérdida de confianza.',
    impact: 'medio', area: 'operaciones',
    euros: 'Coste directo: errores de reparto + abonos no justificados + tiempo de gestión de reclamaciones',
    trigger: (ans) => ans.sector === 'panaderia' && ans.pana_reparto === 'sin_control',
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
  {
    id: 'marketing_sin_roi',
    title: 'Inversión en marketing sin medir el ROI',
    description: 'Vender a través de marketing sin medir el Retorno de Inversión significa que estás gastando a ciegas. Podrías estar perdiendo dinero en ciertos canales sin saberlo.',
    impact: 'alto', area: 'metricas',
    euros: 'Pérdida oculta: inversión en campañas o canales que no generan clientes rentables',
    trigger: (ans) => ans.common_marketing_roi === 'no' || ans.common_marketing_roi === 'aprox',
  },
  {
    id: 'riesgo_caja',
    title: 'Desconocimiento del break-even y riesgo de liquidez',
    description: 'No saber qué facturación mínima necesitas para cubrir costes y cuánto runway (caja) tienes es el mayor riesgo. La mayoría de empresas cierran por falta de caja, no por falta de ventas.',
    impact: 'critico', area: 'facturacion',
    euros: 'Riesgo inminente: tensión de tesorería y posibles bloqueos de pagos',
    trigger: (ans) => ans.common_finanzas_caja === 'no_caja' || ans.common_finanzas_caja === 'aprox',
  },
  {
    id: 'fuga_talento',
    title: 'Rotación o falta de fidelización del talento clave',
    description: 'Reemplazar a una pieza clave del equipo cuesta de media entre el 50% y el 200% de su salario anual en tiempos de contratación, onboarding y curva de aprendizaje.',
    impact: 'alto', area: 'equipo',
    euros: 'Coste estimado: miles de euros ocultos en productividad perdida por cada baja y nueva contratación',
    trigger: (ans) => ans.common_talento_rotacion === 'alta_rotacion' || ans.common_talento_rotacion === 'algunos',
  },
]

export function getLossAndWins(leak) {
  let min = 1000, max = 3000, wins = []
  if (leak.impact === 'critico') { min = 5000; max = 15000; }
  if (leak.impact === 'alto') { min = 2000; max = 8000; }

  // Quick Wins genéricos por área
  if (leak.area === 'ventas_crm') wins.push(`Comercial: Llama hoy mismo a 3 presupuestos de alto valor enviados la semana pasada.`)
  if (leak.area === 'facturacion') wins.push(`Cobros: Envía un recordatorio de impago por WhatsApp a los 3 mayores deudores.`)
  if (leak.area === 'operaciones') wins.push(`Operaciones: Reúnete 15 min con tu equipo y documenten el proceso de mayor fricción.`)
  if (leak.area === 'inventario') wins.push(`Stock: Haz un inventario rápido hoy de los 5 productos más críticos de tu almacén.`)
  if (leak.area === 'tiempo') wins.push(`Tiempo: Bloquea 2 horas en tu agenda mañana por la mañana para trabajo estratégico sin interrupciones.`)
  if (leak.area === 'equipo') wins.push(`Equipo: Delega una decisión repetitiva de bajo riesgo documentando el protocolo hoy mismo.`)
  if (leak.area === 'metricas') wins.push(`Métricas: Calcula hoy tu coste real de adquisición de cliente (CAC) del mes pasado.`)

  // Quick Wins específicos
  if (leak.id === 'sin_seguimiento') wins = ['Anota en un excel los 10 últimos presupuestos recibidos y llama a 5 de ellos hoy.']
  if (leak.id === 'impagos_sin_gestionar') wins = ['Crea un mensaje tipo y enviáselo a los 3 mayores deudores hoy mismo.']
  if (leak.id === 'facturas_olvidadas') wins = ['Revisa tu agenda u obras de hace 2 semanas para asegurar que todos los trabajos se facturaron.']
  if (leak.id === 'interrupciones_continuas') wins = ['Silencia las notificaciones de WhatsApp del móvil durante las próximas 2 horas.']
  if (leak.id === 'riesgo_caja') wins = ['Suma todos tus costes fijos de este mes para saber tu ingreso mínimo necesario (Break-even).']
  if (leak.id === 'fuga_talento') wins = ['Pregunta hoy individualmente a 2 miembros de tu equipo: "¿Qué te frustra más de tu rutina diaria de trabajo?".']

  return { minLoss: min, maxLoss: max, quickWins: wins }
}

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
  const areaScores = calcAreaScores(answers)
  const globalScore = calcGlobalScore(areaScores)

  const leaks = LEAK_RULES
    .filter(r => r.trigger(answers))
    .sort((a, b) => ({ critico: 0, alto: 1, medio: 2 }[a.impact] - { critico: 0, alto: 1, medio: 2 }[b.impact]))
    .map(leak => ({ ...leak, ...getLossAndWins(leak) }))

  let totalMinLoss = 0;
  let totalMaxLoss = 0;
  let allQuickWins = [];

  leaks.forEach(l => {
    totalMinLoss += l.minLoss || 0;
    totalMaxLoss += l.maxLoss || 0;
    if (l.quickWins) allQuickWins.push(...l.quickWins);
  });

  // Unique quick wins limited to top 3
  allQuickWins = [...new Set(allQuickWins)].slice(0, 3);

  const modules = getRecommendedModules(answers)
  const areas = AREAS.map(a => ({ ...a, score: areaScores[a.id] })).filter(a => a.score !== null && a.score !== undefined)

  return {
    globalScore, areas, leaks, modules, answers,
    totalMinLoss,
    totalMaxLoss,
    quickWins: allQuickWins,
    sector: answers.sector,
    generatedAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
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
  if (score >= 50) return { label: 'Con margen de mejora claro', emoji: '⚡', color: 'text-amber-600' }
  if (score >= 25) return { label: 'Fugas importantes detectadas', emoji: '⚠️', color: 'text-orange-600' }
  return { label: 'Situación crítica — actúa ahora', emoji: '🚨', color: 'text-red-600' }
}
