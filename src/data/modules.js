// Módulos SaaS y condiciones para recomendarlos
export const SAAS_MODULES = [
  {
    id: 'crm',
    name: 'CRM y Gestión de Clientes',
    icon: '🤝',
    description: 'Centraliza todos tus contactos, oportunidades y seguimiento de presupuestos en un solo lugar. Nunca más pierdas una venta por falta de seguimiento.',
    beneficios: [
      'Seguimiento automático de presupuestos',
      'Historial completo de cada cliente',
      'Alertas de seguimiento programadas',
      'Tasa de conversión visible en tiempo real',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.crm === 'no_registro' ||
      ans.crm === 'excel_agenda' ||
      ans.seguimiento_presupuestos === 'casi_nunca' ||
      ans.seguimiento_presupuestos === 'a_veces',
  },
  {
    id: 'presupuestador',
    name: 'Presupuestador Automático',
    icon: '📄',
    description: 'Genera presupuestos profesionales en minutos con una biblioteca de productos y servicios. Cada presupuesto enviado queda registrado y con seguimiento automático.',
    beneficios: [
      'Presupuestos en menos de 5 minutos',
      'Catálogo de productos y precios integrado',
      'Cálculo automático de márgenes',
      'Envío digital con firma electrónica',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.como_presupuestos === 'excel_word' ||
      ans.como_presupuestos === 'manual' ||
      ans.tiempo_presupuesto === 'mas2h' ||
      ans.tiempo_presupuesto === '30a2h',
  },
  {
    id: 'gestion_proyectos',
    name: 'Gestión de Trabajos y Proyectos',
    icon: '⚙️',
    description: 'Planifica, asigna y sigue el estado de cada trabajo o proyecto. Tu equipo sabe qué hacer en cada momento sin necesitar preguntarte.',
    beneficios: [
      'Panel visual de todos los trabajos activos',
      'Asignación de tareas y responsables',
      'Control de tiempos por proyecto',
      'Rentabilidad real por trabajo',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.planificacion_trabajos === 'cabeza' ||
      ans.planificacion_trabajos === 'agenda' ||
      ans.margen_trabajo === 'no' ||
      ans.asignacion_tareas === 'whatsapp' ||
      ans.info_parada === 'frecuente',
  },
  {
    id: 'inventario',
    name: 'Control de Inventario y Compras',
    icon: '📦',
    description: 'Gestiona tu stock en tiempo real, recibe alertas de mínimos y compara proveedores. Evita roturas de stock que paran tus trabajos.',
    beneficios: [
      'Stock actualizado en tiempo real',
      'Alertas automáticas de stock mínimo',
      'Comparativa de precios entre proveedores',
      'Histórico de compras y costes',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.control_stock === 'no' ||
      ans.control_stock === 'excel' ||
      ans.stock_real === 'no' ||
      ans.alertas_stock === 'no' ||
      ans.rotura_stock === 'frecuente',
  },
  {
    id: 'facturacion',
    name: 'Facturación Automática',
    icon: '💶',
    description: 'Factura con un clic cuando terminas un trabajo. Integra con presupuestos y proyectos para que ningún trabajo se quede sin facturar.',
    beneficios: [
      'Facturación en segundos desde el pedido',
      'Cero olvidos, todo queda registrado',
      'Envío automático al cliente',
      'Compatible con Verifactu / SII',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.como_facturas === 'excel' ||
      ans.olvido_factura === 'si_ha_pasado' ||
      ans.olvido_factura === 'alguna_vez' ||
      ans.tiempo_factura === 'mas_semana',
  },
  {
    id: 'cobros',
    name: 'Portal de Cobros y Control de Pagos',
    icon: '💰',
    description: 'Ten siempre visible qué facturas están pendientes, cuáles vencen pronto y cuáles llevan meses sin cobrar. Automatiza los recordatorios de pago.',
    beneficios: [
      'Dashboard de cobros pendientes',
      'Recordatorios automáticos por email/SMS',
      'Alertas de facturas vencidas',
      'Informe de morosidad mensual',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.control_cobros === 'no' ||
      ans.impagos === 'si_varios' ||
      ans.impagos === 'alguno' ||
      ans.recordatorios_pago === 'no',
  },
  {
    id: 'dashboard',
    name: 'Panel de Control y KPIs',
    icon: '📊',
    description: 'Un cuadro de mando con los indicadores clave de tu negocio actualizados en tiempo real. Toma decisiones basadas en datos, no en intuición.',
    beneficios: [
      'Facturación, margen y cobros en tiempo real',
      'Ranking de clientes por rentabilidad',
      'Comparativa mes a mes',
      'Alertas cuando algo va mal',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.panel_kpi === 'no' ||
      ans.panel_kpi === 'si_no_miro' ||
      ans.frecuencia_numeros === 'nunca' ||
      ans.cliente_rentable === 'no',
  },
  {
    id: 'portal_empleado',
    name: 'Portal del Empleado y Automatizaciones',
    icon: '👥',
    description: 'Libera al empresario del cuello de botella. El equipo puede consultar tareas, registrar horas, acceder a información y resolver dudas sin interrumpirte.',
    beneficios: [
      'Acceso a tareas y documentación',
      'Fichaje y control horario digital',
      'Comunicación interna centralizada',
      'Flujos de trabajo automatizados',
    ],
    priority: 0,
    trigger: (ans) =>
      ans.interrupciones === 'constantemente' ||
      ans.tareas_solo_yo === 'muchas' ||
      ans.vacaciones === 'no_puedo' ||
      ans.asignacion_tareas === 'whatsapp',
  },
]

export function getRecommendedModules(answers) {
  const modules = SAAS_MODULES
    .filter(m => m.trigger(answers))
    .map((m, idx) => ({ ...m, priority: idx + 1 }))
  return modules
}
