export const SAAS_MODULES = [
  {
    id: 'crm',
    name: 'CRM y Gestión de Clientes',
    icon: '🤝',
    description: 'Centraliza todos tus contactos, oportunidades y seguimiento de presupuestos. Nunca más pierdas una venta por falta de seguimiento.',
    beneficios: [
      'Seguimiento automático de presupuestos enviados',
      'Historial completo de cada cliente y obra',
      'Alertas de seguimiento programadas',
      'Tasa de conversión visible en tiempo real',
    ],
    trigger: (ans) =>
      ans.reformas_crm === 'no' ||
      ans.reformas_crm === 'excel_agenda' ||
      ans.reformas_seguimiento === 'casi_nunca' ||
      ans.reformas_seguimiento === 'nunca' ||
      ans.reformas_seguimiento === 'a_veces' ||
      ans.comercio_fidelizacion === 'no' ||
      ans.serv_agenda === 'si_manual',
  },
  {
    id: 'presupuestador',
    name: 'Presupuestador Automático',
    icon: '📄',
    description: 'Genera presupuestos profesionales en minutos con una biblioteca de productos, precios y márgenes. Cada presupuesto queda registrado con seguimiento automático.',
    beneficios: [
      'Presupuestos en menos de 10 minutos',
      'Catálogo de productos y precios integrado',
      'Cálculo automático de márgenes y costes',
      'Envío digital con firma y seguimiento de estado',
    ],
    trigger: (ans) =>
      ans.reformas_presupuesto_como === 'excel' ||
      ans.reformas_presupuesto_como === 'manual' ||
      ans.reformas_tiempo_presupuesto === 'mas1dia' ||
      ans.reformas_tiempo_presupuesto === '2a8h',
  },
  {
    id: 'gestion_obras',
    name: 'Gestión de Obras y Proyectos',
    icon: '🔨',
    description: 'Planifica, controla costes y sigue el estado de cada obra en tiempo real. Sabe exactamente cuánto ganas en cada trabajo.',
    beneficios: [
      'Control de costes de materiales y mano de obra por obra',
      'Partes de trabajo digitales desde móvil',
      'Control de horas reales vs. presupuestadas',
      'Rentabilidad real por obra al instante',
    ],
    trigger: (ans) =>
      ans.sector === 'reformas' && (
        ans.reformas_costes_materiales === 'no' ||
        ans.reformas_partes_trabajo === 'papel' ||
        ans.reformas_partes_trabajo === 'nada' ||
        ans.reformas_margen_obra === 'no'
      ),
  },
  {
    id: 'helpdesk',
    name: 'Sistema de Tickets e Incidencias',
    icon: '🎫',
    description: 'Gestiona todas las incidencias de soporte con tickets, prioridades, SLA y base de conocimiento. Tu equipo técnico organizado y los clientes informados.',
    beneficios: [
      'Tickets con prioridad, estado y asignación',
      'Control automático de tiempos de SLA',
      'Base de conocimiento para resolución rápida',
      'Portal del cliente para ver el estado de sus incidencias',
    ],
    trigger: (ans) =>
      ans.sector === 'tecnologia' && (
        ans.tech_hw_tickets === 'email' ||
        ans.tech_hw_tickets === 'whatsapp' ||
        ans.tech_hw_tickets === 'no' ||
        ans.tech_hw_base_conocimiento === 'no'
      ),
  },
  {
    id: 'contratos_mantenimiento',
    name: 'Gestión de Contratos y Mantenimientos',
    icon: '📋',
    description: 'Centraliza los contratos de mantenimiento, licencias y garantías. Alertas automáticas de renovación para no perder ningún contrato.',
    beneficios: [
      'Control de contratos por cliente y fecha de vencimiento',
      'Alertas automáticas de renovación con antelación',
      'Control de garantías de equipos vendidos',
      'Facturación recurrente automatizada',
    ],
    trigger: (ans) =>
      ans.tech_hw_contratos === 'no' ||
      ans.tech_hw_contratos === 'si_pocos' ||
      ans.tech_sw_renovaciones === 'frecuente' ||
      ans.tech_sw_renovaciones === 'a_veces' ||
      ans.tech_hw_garantias === 'no',
  },
  {
    id: 'inventario',
    name: 'Control de Inventario y Almacén',
    icon: '📦',
    description: 'Gestiona tu stock en tiempo real con alertas de mínimos, trazabilidad de movimientos y control de piezas de repuesto.',
    beneficios: [
      'Stock actualizado en tiempo real tras cada movimiento',
      'Alertas automáticas de stock mínimo',
      'Trazabilidad completa de entradas y salidas',
      'Histórico de compras y valoración del almacén',
    ],
    trigger: (ans) =>
      ans.comercio_stock_fisico === 'no' ||
      ans.comercio_stock_fisico === 'excel' ||
      ans.comercio_dist_stock === 'no' ||
      ans.comercio_dist_stock === 'excel' ||
      ans.tech_hw_stock_piezas === 'no' ||
      ans.tech_hw_stock_piezas === 'si_excel' ||
      ans.comercio_alertas_stock === 'no' ||
      ans.comercio_dist_rotura === 'frecuente',
  },
  {
    id: 'tpv_hosteleria',
    name: 'TPV y Gestión de Restaurante',
    icon: '🍽️',
    description: 'Sistema completo de gestión para hostelería: mesas, comandas, cocina, escandallos y control de proveedores integrado.',
    beneficios: [
      'Gestión de mesas y comandas desde tablet',
      'Pantalla de cocina digital',
      'Escandallos y control de costes por plato',
      'Pedidos automáticos a proveedores según stock',
    ],
    trigger: (ans) =>
      ans.sector === 'hosteleria' && (
        ans.hoste_tpv === 'basico' ||
        ans.hoste_tpv === 'manual' ||
        ans.hoste_escandallos === 'no' ||
        ans.hoste_mermas === 'no'
      ),
  },
  {
    id: 'portal_b2b',
    name: 'Portal de Pedidos B2B para Clientes',
    icon: '🌐',
    description: 'Tus clientes distribuidores piden online, ven su historial, sus tarifas personalizadas y el estado de sus pedidos sin necesitar llamar.',
    beneficios: [
      'Pedidos online 24/7 para clientes B2B',
      'Tarifas personalizadas por cliente automáticas',
      'Historial de pedidos y facturas disponible',
      'Reducción drástica de llamadas y emails para pedir',
    ],
    trigger: (ans) =>
      ans.sector === 'comercio' &&
      ans.comercio_canal === 'distribucion' && (
        ans.comercio_dist_pedidos?.includes('telefono') ||
        ans.comercio_dist_pedidos?.includes('email') ||
        ans.comercio_dist_tarifas === 'si_manual' ||
        ans.comercio_dist_tarifas === 'no'
      ),
  },
  {
    id: 'facturacion_auto',
    name: 'Facturación Automática',
    icon: '💶',
    description: 'Factura con un clic cuando terminas un trabajo. Integrado con presupuestos y proyectos para que ningún trabajo quede sin facturar.',
    beneficios: [
      'Facturación en segundos desde el pedido o proyecto',
      'Cero olvidos — todo queda registrado y pendiente',
      'Envío automático al cliente',
      'Compatible con Verifactu / SII',
    ],
    trigger: (ans) =>
      ans.common_facturacion_como === 'excel' ||
      ans.common_olvido_factura === 'si_ha_pasado' ||
      ans.common_olvido_factura === 'alguna_vez' ||
      ans.common_tiempo_factura === 'mas_semana',
  },
  {
    id: 'cobros',
    name: 'Control de Cobros y Gestión de Pagos',
    icon: '💰',
    description: 'Ten siempre visible qué facturas están pendientes, cuáles vencen pronto y cuáles llevan meses sin cobrar. Recordatorios automáticos.',
    beneficios: [
      'Dashboard de cobros pendientes en tiempo real',
      'Recordatorios automáticos por email o WhatsApp',
      'Alertas de facturas vencidas con antigüedad',
      'Informe de morosidad mensual por cliente',
    ],
    trigger: (ans) =>
      ans.common_cobros === 'no' ||
      ans.common_impagos === 'si_varios' ||
      ans.common_impagos === 'alguno',
  },
  {
    id: 'dashboard',
    name: 'Panel de Control y KPIs',
    icon: '📊',
    description: 'Un cuadro de mando con los indicadores clave del negocio actualizados en tiempo real. Toma decisiones basadas en datos, no en intuición.',
    beneficios: [
      'Facturación, margen y cobros en tiempo real',
      'Ranking de clientes por rentabilidad',
      'Comparativa mes a mes automática',
      'Alertas cuando algo se desvía del objetivo',
    ],
    trigger: (ans) =>
      ans.common_panel_kpi === 'no' ||
      ans.common_panel_kpi === 'si_no_miro' ||
      ans.common_frecuencia_numeros === 'nunca' ||
      ans.common_cliente_rentable === 'no',
  },
  {
    id: 'gestion_expedientes',
    name: 'Gestión de Expedientes y Clientes',
    icon: '📁',
    description: 'Centraliza todos los expedientes, documentación y comunicaciones de cada cliente. El equipo accede a todo sin interrumpirte.',
    beneficios: [
      'Expedientes digitales por cliente organizados',
      'Portal cliente para ver el estado de sus gestiones',
      'Flujos de trabajo automáticos por tipo de expediente',
      'Alertas de plazos y vencimientos',
    ],
    trigger: (ans) =>
      (ans.sector === 'servicios') && (
        ans.serv_expedientes === 'carpetas_pc' ||
        ans.serv_expedientes === 'papel' ||
        ans.serv_comunicacion_estado === 'esperan'
      ),
  },
]

export function getRecommendedModules(answers) {
  return SAAS_MODULES
    .filter(m => m.trigger(answers))
    .map((m, i) => ({ ...m, priority: i + 1 }))
}
