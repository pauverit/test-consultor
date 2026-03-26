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
      ans.serv_agenda === 'si_manual' ||
      (ans.sector === 'fontaneria' && ans.font_seguimiento_presupuesto === 'nunca') ||
      (ans.sector === 'electricidad' && ans.elec_seguimiento === 'nunca') ||
      (ans.sector === 'fontaneria' && ans.font_contratos_mantenimiento === 'no') ||
      (ans.sector === 'electricidad' && ans.elec_contratos_mant === 'no'),
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
      ans.reformas_tiempo_presupuesto === '2a8h' ||
      (ans.sector === 'fontaneria' && (ans.font_presupuesto === 'excel' || ans.font_presupuesto === 'manual' || ans.font_presupuesto === 'de_palabra')) ||
      (ans.sector === 'electricidad' && (ans.elec_presupuesto === 'excel' || ans.elec_presupuesto === 'manual' || ans.elec_presupuesto === 'de_palabra')),
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
      ans.comercio_dist_rotura === 'frecuente' ||
      (ans.sector === 'peluqueria' && ans.peluq_stock !== 'software') ||
      (ans.sector === 'taller' && ans.taller_stock === 'sin_control') ||
      (ans.sector === 'fontaneria' && (ans.font_stock_furgoneta === 'mental' || ans.font_stock_furgoneta === 'no')) ||
      (ans.sector === 'electricidad' && (ans.elec_stock_materiales === 'mental' || ans.elec_stock_materiales === 'no')) ||
      (ans.sector === 'autoventa' && (ans.auto_stock_furgoneta === 'periodico' || ans.auto_stock_furgoneta === 'no')) ||
      (ans.sector === 'panaderia' && (ans.pana_pedidos_proveedores === 'whatsapp_tel' || ans.pana_pedidos_proveedores === 'falta')),
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
    id: 'agenda_citas',
    name: 'Agenda Digital y Recordatorios Automáticos',
    icon: '📅',
    description: 'Reserva online 24/7, confirmaciones y recordatorios automáticos por WhatsApp/SMS. Elimina los no-shows y libera al personal de gestionar la agenda por teléfono.',
    beneficios: [
      'Reserva online 24/7 — el cliente reserva solo sin llamar',
      'Recordatorios automáticos que reducen no-shows hasta un 70%',
      'Ficha de cliente con historial completo de servicios',
      'Gestión de turnos y disponibilidad por trabajador',
    ],
    trigger: (ans) =>
      (ans.sector === 'peluqueria' && (ans.peluq_agenda !== 'app_online' || ans.peluq_recordatorios === 'no')) ||
      (ans.sector === 'servicios' && ans.serv_agenda === 'si_manual') ||
      ans.serv_recordatorios_cita === 'no' ||
      ans.serv_agenda_clinica === 'manual',
  },
  {
    id: 'gestion_taller',
    name: 'Gestión de Taller y Reparaciones',
    icon: '🔧',
    description: 'Órdenes de trabajo digitales, control de horas reales vs. presupuestadas, stock de recambios y rentabilidad por trabajo. Todo en una sola plataforma desde tablet o móvil.',
    beneficios: [
      'Órdenes de trabajo digitales con piezas y horas',
      'Control de horas reales vs. presupuestadas por trabajo',
      'Stock de recambios con alertas de mínimos',
      'Rentabilidad real de cada reparación al instante',
    ],
    trigger: (ans) =>
      ans.sector === 'taller' && (
        ans.taller_ordenes !== 'software' ||
        ans.taller_horas === 'no' ||
        ans.taller_stock === 'sin_control' ||
        ans.taller_margen === 'no'
      ),
  },
  {
    id: 'erp_rotulacion',
    name: 'ERP Integral para Rotulación e Impresión',
    icon: '🖥️',
    description: 'Gestiona todo el flujo desde el presupuesto hasta la factura: pedido, diseño, producción, instalación y cobro en una sola plataforma. Sin datos duplicados ni información dispersa entre herramientas.',
    beneficios: [
      'Flujo completo integrado sin reintroducción de datos',
      'Conversión automática presupuesto → orden de producción',
      'Estado del proyecto visible para todo el equipo en tiempo real',
      'Facturación automática al cerrar el trabajo',
    ],
    trigger: (ans) =>
      ans.sector === 'rotulacion' && (
        ans.rotul_crm_pedidos === 'excel_email' ||
        ans.rotul_crm_pedidos === 'nada' ||
        ans.rotul_crm_pedidos === 'crm_solo_ventas'
      ),
  },
  {
    id: 'nesting_software',
    name: 'Software de Nesting y Optimización de Material',
    icon: '📐',
    description: 'Maximiza el aprovechamiento de cada rollo o plancha con nesting automático. Ahorra un 20–30% en material y envía los trabajos directamente al plotter o cortadora.',
    beneficios: [
      'Ahorro de hasta un 30% en material de impresión',
      'Optimización automática por sustrato y formato',
      'Integración directa con plotters de corte y laminadoras',
      'Cálculo de coste real de material por trabajo al instante',
    ],
    trigger: (ans) =>
      ans.sector === 'rotulacion' && (
        ans.rotul_nesting === 'no' ||
        ans.rotul_nesting === 'manual'
      ),
  },
  {
    id: 'mantenimiento_maquinaria',
    name: 'Mantenimiento Preventivo de Maquinaria (CMMS)',
    icon: '🔩',
    description: 'Planifica el mantenimiento de plotters, laminadoras y equipos de corte. Alertas antes del fallo, historial de intervenciones y reducción drástica de paradas no planificadas.',
    beneficios: [
      'Calendario de mantenimiento preventivo por máquina',
      'Alertas automáticas antes de que se produzcan fallos',
      'Historial de intervenciones y costes por equipo',
      'Reducción de paradas inesperadas hasta un 70%',
    ],
    trigger: (ans) =>
      ans.sector === 'rotulacion' && ans.rotul_mantenimiento === 'reactivo',
  },
  {
    id: 'orden_trabajo_fases',
    name: 'Órdenes de Trabajo por Fases de Producción',
    icon: '📋',
    description: 'Cada pedido tiene su hoja de ruta digital con todas las fases: diseño, preimpresión, impresión, manipulación/acabados e instalación. Cada operario sabe exactamente qué tiene que hacer, cuándo y cómo.',
    beneficios: [
      'Hoja de ruta digital por trabajo visible en tablet en el taller',
      'Checklist de acabados por tipo de producto (lona, vinilo, caja de luz...)',
      'Tiempos estándar por operación para presupuestar con precisión',
      'Trazabilidad completa: quién hizo qué y cuándo en cada fase',
    ],
    trigger: (ans) =>
      ans.sector === 'rotulacion' && (
        ans.rotul_manipulacion_checklist === 'criterio_operario' ||
        ans.rotul_hoja_ruta === 'verbal' ||
        ans.rotul_tiempos_estandar === 'no'
      ),
  },
  {
    id: 'planificacion_produccion_rotul',
    name: 'Planificación de Producción y Cola de Trabajos',
    icon: '📅',
    description: 'Visualiza la cola de trabajos, asigna plotters y operarios, y detecta cuellos de botella antes de que ocurran. Entregas puntuales y sin sorpresas para el cliente.',
    beneficios: [
      'Gantt de producción en tiempo real',
      'Asignación de máquinas y operarios por trabajo',
      'Alertas de cuellos de botella antes de que ocurran',
      'Control de plazos de entrega comprometidos por cliente',
    ],
    trigger: (ans) =>
      ans.sector === 'rotulacion' && (
        ans.rotul_planificacion === 'no' ||
        ans.rotul_planificacion === 'hoja'
      ),
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
  {
    id: 'partes_trabajo_movil',
    name: 'Partes de Trabajo Digitales desde Móvil',
    icon: '📱',
    description: 'El técnico registra cada intervención desde el móvil: materiales usados, horas, fotos y firma del cliente. La oficina ve el parte en tiempo real y puede facturar el mismo día.',
    beneficios: [
      'Parte digital con firma del cliente en el momento',
      'Registro de materiales usados imputados al trabajo',
      'Fotos del trabajo antes y después adjuntas',
      'Facturación automática al cerrar el parte',
    ],
    trigger: (ans) =>
      (ans.sector === 'fontaneria' && (ans.font_partes_trabajo === 'papel' || ans.font_partes_trabajo === 'a_veces' || ans.font_partes_trabajo === 'no')) ||
      (ans.sector === 'electricidad' && (ans.elec_partes === 'papel' || ans.elec_partes === 'solo_grandes' || ans.elec_partes === 'no')),
  },
  {
    id: 'contratos_mant_campo',
    name: 'Gestión de Contratos de Mantenimiento Recurrente',
    icon: '🔄',
    description: 'Crea una cartera de contratos de mantenimiento con facturación automática mensual. Programa las visitas preventivas y controla el historial de intervenciones por cliente.',
    beneficios: [
      'Facturación recurrente automática cada mes',
      'Agenda de revisiones preventivas con alertas',
      'Historial de cada instalación por cliente',
      'Recordatorio de renovación antes del vencimiento',
    ],
    trigger: (ans) =>
      (ans.sector === 'fontaneria' && (ans.font_contratos_mantenimiento === 'no' || ans.font_contratos_mantenimiento === 'alguno')) ||
      (ans.sector === 'electricidad' && (ans.elec_contratos_mant === 'no' || ans.elec_contratos_mant === 'alguno')),
  },
  {
    id: 'app_autoventa',
    name: 'App de Autoventa y Gestión de Rutas',
    icon: '🚐',
    description: 'El vendedor gestiona toda la ruta desde el móvil: hoja de ruta optimizada, albaranes digitales, cobros con datáfono y stock de furgoneta en tiempo real. La oficina ve todo sin esperar.',
    beneficios: [
      'Hoja de ruta optimizada con visitas y objetivos del día',
      'Albarán digital con firma del cliente en el momento',
      'Stock de furgoneta actualizado con cada venta',
      'Liquidación automática de cobros al final de jornada',
    ],
    trigger: (ans) =>
      ans.sector === 'autoventa' && (
        ans.auto_hoja_ruta === 'papel' ||
        ans.auto_hoja_ruta === 'criterio_propio' ||
        ans.auto_pedidos_albaranes === 'papel_trae' ||
        ans.auto_pedidos_albaranes === 'whatsapp_foto' ||
        ans.auto_pedidos_albaranes === 'no_registro' ||
        ans.auto_cobros_ruta === 'efectivo_sin' ||
        ans.auto_cobros_ruta === 'fiado'
      ),
  },
  {
    id: 'erp_autoventa',
    name: 'ERP con Módulo de Distribución y Autoventa',
    icon: '🏭',
    description: 'Integra el almacén central, las furgonetas y la facturación en una sola plataforma. Sincronización automática al final de jornada, control de rutas y rentabilidad por vendedor.',
    beneficios: [
      'Sincronización automática furgoneta ↔ almacén',
      'Rentabilidad real por ruta y por vendedor',
      'Control de devoluciones con stock automático',
      'Dashboard de ventas en tiempo real por responsable',
    ],
    trigger: (ans) =>
      ans.sector === 'autoventa' && (
        ans.auto_sincronizacion === 'manual_picar' ||
        ans.auto_sincronizacion === 'no_erp' ||
        ans.auto_objetivos === 'no' ||
        ans.auto_visibilidad === 'no' ||
        ans.auto_visibilidad === 'reunion'
      ),
  },
  {
    id: 'gestion_obrador',
    name: 'Software de Gestión para Panadería y Obrador',
    icon: '🍞',
    description: 'Planifica la producción según los pedidos del día, controla el coste por receta con escandallos automáticos y gestiona el reparto a clientes de hostelería desde una sola herramienta.',
    beneficios: [
      'Planificación de hornadas cruzada con pedidos del día',
      'Escandallo automático: coste real por producto',
      'Control de mermas y ajuste automático de producción',
      'Gestión de pedidos de hostelería con albarán digital',
    ],
    trigger: (ans) =>
      ans.sector === 'panaderia' && (
        ans.pana_planificacion_hornadas === 'inercia' ||
        ans.pana_planificacion_hornadas === 'responsable' ||
        ans.pana_escandallos === 'estimados' ||
        ans.pana_escandallos === 'no' ||
        ans.pana_mermas === 'no'
      ),
  },
  {
    id: 'trazabilidad_alergenos',
    name: 'Trazabilidad y Control de Alérgenos',
    icon: '⚠️',
    description: 'Cumple con la normativa de alérgenos: fichas de producto actualizadas, trazabilidad de lotes y etiquetado automático. Evita sanciones y protege a tus clientes.',
    beneficios: [
      'Fichas de alérgenos por producto actualizadas automáticamente',
      'Trazabilidad de lote de materias primas',
      'Etiquetado automático conforme a normativa',
      'Registro de auditorías de higiene alimentaria',
    ],
    trigger: (ans) =>
      ans.sector === 'panaderia' && (
        ans.pana_trazabilidad_alergenos === 'parcial' ||
        ans.pana_trazabilidad_alergenos === 'no'
      ),
  },
]

export function getImplementationGuide(moduleId, moduleName) {
  const guides = {
    crm: {
      timeToImplement: '2 a 4 Semanas', difficulty: 'Media (Requiere cambio de hábitos)',
      features: ['Embudo de ventas visual (Kanban)', 'Sincronización automatizada de correos', 'Automatización de alertas de seguimiento a comerciales', 'Dashboard global de ratios de conversión'],
      steps: [
        'Fase 1 - Diseño del Pipeline: Plasmar y trazar teóricamente las fases exactas de venta (Lead, Cita, Visita técnica, Oferta, Cierre).',
        'Fase 2 - Migración y Setup: Saneamiento de la BBDD actual en Excel, volcado al nuevo software y jerarquía de permisos por comercial.',
        'Fase 3 - Reglas de Negocio Automatizadas: Programar crono-avisos y seguimientos por falta de feedback tras "X" días.',
        'Fase 4 - Despliegue de Rutinas: Prohibición de uso del sistema manual antiguo. Asignación total de leads vía la nueva app.',
      ]
    },
    presupuestador: {
      timeToImplement: '3 a 5 Semanas', difficulty: 'Alta (Homogeneiza las tarifas de la empresa)',
      features: ['Calculadora multi-capa parametrizable (Mano de obra, Costo Base, Márgenes)', 'Catálogo en base de datos unificada', 'Generación ágil de ofertas en plantilla PDF nativa con firma digital', 'Histórico de control de versiones de presupuestos'],
      steps: [
        'Fase 1 - Auditoría de Tarifas: Analítica y volcado de precios directos de proveedores.',
        'Fase 2 - Ingeniería de Formulas y Escandallos: Volcar los escandallos al motor automatizado para blindar el margen de contribución de cada línea de producto.',
        'Fase 3 - UI/UX Reporte: Códificación de la plantilla que verá el cliente corporativo (Logo, estética, legales, términos).',
        'Fase 4 - Flujo y Testing Integrado: Validar conversión presupuesto -> pedido/obra. Generar y contrastar contra históricos.',
      ]
    },
    gestion_obras: {
      timeToImplement: '4 a 6 Semanas', difficulty: 'Alta (Afecta directamente el entorno móvil de la jornada de instalación)',
      features: ['Imputación de partes de trabajo nativo-móvil para la plantilla técnica', 'Comparativa global (Presupuestado horas vs Ejecutado real)', 'Alertas tempranas de riesgo de sobrecoste antes del cierre', 'Gestión de certificaciones vinculada al avance'],
      steps: [
        'Fase 1 - Estructura WBS de Proyecto: Dividir funcionalmente tipos de obras, certificaciones capitulares, etc.',
        'Fase 2 - Pantalla Móvil de Terreno: Diseño UX para que los operarios registren horas o dietas sin ir a oficina.',
        'Fase 3 - Conciliación Analítica: Matchear ingresos de obra y gastos con proveedores en la macro del proyecto.',
        'Fase 4 - Formación a Jefatura de Obra: Enseñanza en lectura del dashboard direccional (Rentabilidad y desviaciones).',
      ]
    },
    inventario: {
      timeToImplement: '3 a 6 Semanas', difficulty: 'Media/Alta',
      features: ['Gestión multi-ubicación real', 'Cálculos y notificaciones por Punto de Pedido / Stock de Seguridad', 'Agilidad con lectura de SKU por formatos de Códigos de Barras / QR', 'Valorización contable FIFO/LIFO integrada'],
      steps: [
        'Fase 1 - Modelado del Catálogo: Establecer el catálogo maestro y KPIs de inventario mínimo y máximo por producto.',
        'Fase 2 - Regularización o Inventario "0": Ejecución en equipo físico en fábrica para arrancar un conteo inicial perfecto.',
        'Fase 3 - Procesos Tácticos Inbound: Entradas logísticas — recepciones y cotejo contra pedidos de compra a través de tablets PDA.',
        'Fase 4 - Procesos Tácticos Outbound: Expediciones — descuentos por asignación de salidas, facturas o cesiones inter-almacén.',
      ]
    },
    facturacion_auto: {
      timeToImplement: '1 a 3 Semanas', difficulty: 'Baja (Alta ganancia administrativa)',
      features: ['Facturación recurrente o programada masiva partiendo del cierre comercial', 'Gestión fiscal de automatización de series contables', 'Integración y adaptaciones compliance local (TicketBAI, Face o estándar)', 'Envío al cliente automático y trazabilidad de lecturas'],
      steps: [
        'Fase 1 - Parametrización Contable ERP: Establecimiento de series, vencimientos, cuentas mayores, IVA/IGIC/IRPF correspondientes.',
        'Fase 2 - Motores de Disparo: Conectar la logística (Albarán Completado) o los Proyectos (Obra Cerrada) para que salte y genere factura transparente.',
        'Fase 3 - Plantillas PDF Oficiales: Diseño formal, logos e IBAN de cobro según la entidad del cliente destinatario.',
        'Fase 4 - Go-Live: Fase de facturas simuladas y testeo vía Enlace Contable para confirmar cierre del proceso administrativo.',
      ]
    },
    cobros: {
      timeToImplement: '1 a 2 Semanas', difficulty: 'Baja (Retorno de Inversión (ROI) Inmediato)',
      features: ['Dashboard piramidal de alerta de riesgo por envejecimiento de la deuda', 'Comunicaciones omnicanal nativas para gestión de impagados o recordatorios', 'Gestor documental para integrar cobros fraccionados o pasarelas online de liquidación', 'Modelado automático de proyecciones a corto de ingresos'],
      steps: [
        'Fase 1 - Traspaso Cartera Viva: Incorporar libro contable o listado de facturas actualmente pendientes en la calle y clasificarlas.',
        'Fase 2 - Reglas Temporales: Establecer alertas cronológicas (E.g. cortesía post-vencimiento en Día 1, tensión extrema administrativa en Día 45).',
        'Fase 3 - Motor Operativo: Levantar canalizador automático de mensajes y plantillas (WhatsApp, SMS, Email con copia CCO administrativa).',
        'Fase 4 - Conciliaciones Bancarias: Sincronizar norma XML del banco para cruces automáticos de lo pagado. Reducir errores diarios.',
      ]
    },
    dashboard: {
      timeToImplement: '2 a 4 Semanas', difficulty: 'Media (Normalización de los orígenes de datos locales/heredados)',
      features: ['Control Room en la nube sobre ventas, cash y rentabilidad analítica', 'Actualizado sin recargos, instantáneo o en ventanas horarias preconfiguradas', 'Accesibilidad 100% Mobile y envíos automatizados PDF a inversores o CEO', 'Capacidad Cross-Join: cruce logístico frente a comercial nativo'],
      steps: [
        'Fase 1 - Mapping de las Preguntas Estratégicas: Consultoría directiva definiendo métricas estrellas OMTD (One Metric That Matters).',
        'Fase 2 - Data Lake Connections: Desarrollo técnico y API de canalización desde silos externos (SAGE, Google Analytics, Excel interno...).',
        'Fase 3 - Cubos Analíticos y BI: Modelación estructural de PowerBI o Metabase y programación de representaciones visuales claras.',
        'Fase 4 - Testing & Calibration: Limpieza algorítmica y gestión de anomalías informativas y adopción por comité de la gerencia.',
      ]
    }
  }

  if (guides[moduleId]) return guides[moduleId]

  // Fallback Genérico Operacional (trazabilidad, reservas, portales B2B, mantenimiento, etc.)
  let time = '3 a 6 Semanas'
  let diff = 'Media / Alta'
  let features = [
    `Digitalización operativa total vinculada a los procesos de ${moduleName.toLowerCase()}`,
    'Arquitectura en la nube y sincronización interdepartamental completa asíncrona',
    'Cuadro de mando analítico general orientado a trazabilidad operacional inmediata',
    'Formatos escalables con API propia para escalar o integrarse con legados del ecosistema vigente'
  ]
  let steps = [
    `Fase 1 - Relevamiento Táctico y Toma de Requerimientos: Consultoría de alto perfil mapeando y documentando cómo rinde la gestión manual (Papel, Email o Excel) de ${moduleName.toLowerCase()}.`,
    `Fase 2 - Software Architecture: Creación técnica de un Modelo de Datos Relacional y UX adaptada a los flujos únicos que exige la idiosincrasia de la empresa operativa en este frente.`,
    `Fase 3 - Setup (Minimum Viable Framework): Despliegue en staging o servidores seguros del software a la medida final de la organización corporativa y configuración granular de usuarios base por su rol local y responsabilidades de manipulación.`,
    `Fase 4 - Shadow Testing Parallelo: Equipos de élite designados utilizarán esta suite nueva junto a los canales manuales por 7 días como red de seguridad (Beta Feedback). Captura de incidencias o casos de borde (edge cases) del estrés real operativo de campo.`,
    `Fase 5 - Integración y Extremos Go-Live: Apagón radical de herramientas previas paralizantes con asistencia técnica local in-house directa al núcleo resolutivo.`,
  ]

  if (moduleId.includes('tpv') || moduleId.includes('autoventa') || moduleId.includes('taller')) { time = '4 a 6 Semanas'; diff = 'Alta (Operación en primera línea crítica sin margen de error temporal)'; }
  if (moduleId.includes('mantenimiento') || moduleId.includes('portal') || moduleId.includes('nesting')) { time = '4 a 8 Semanas'; diff = 'Media (Requiere validaciones o testeos industriales profundos)'; }

  return { timeToImplement: time, difficulty: diff, features, steps }
}

export function getRecommendedModules(answers) {
  return SAAS_MODULES
    .filter(m => m.trigger(answers))
    .map((m, i) => {
      const guide = getImplementationGuide(m.id, m.name)
      return {
        ...m,
        priority: i + 1,
        features: guide.features,
        steps: guide.steps,
        timeToImplement: guide.timeToImplement,
        difficulty: guide.difficulty
      }
    })
}
