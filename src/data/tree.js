// ─────────────────────────────────────────────────────────────────────────────
// ÁRBOL DE DECISIONES — Sistema de diagnóstico empresarial
//
// Cada nodo puede tener:
//   next:   'nodeId'           → siguiente nodo fijo (no hay bifurcación)
//   routes: { value: 'nodeId' }→ siguiente nodo según la respuesta
//   next: null                 → fin del diagnóstico (mostrar resultados)
// ─────────────────────────────────────────────────────────────────────────────

export const PHASES = {
  perfil:       { id: 'perfil',       label: 'Tu Empresa',                icon: '🏢', color: 'from-slate-500 to-slate-700', showIntro: false },
  reformas:     { id: 'reformas',     label: 'Reformas y Obras',          icon: '🔨', color: 'from-orange-500 to-amber-600', showIntro: true },
  comercio:     { id: 'comercio',     label: 'Comercio y Distribución',   icon: '🛒', color: 'from-emerald-500 to-teal-600', showIntro: true },
  tecnologia:   { id: 'tecnologia',   label: 'Tecnología y Soporte',      icon: '💻', color: 'from-violet-500 to-purple-600', showIntro: true },
  hosteleria:   { id: 'hosteleria',   label: 'Hostelería',                icon: '🍽️', color: 'from-rose-500 to-pink-600', showIntro: true },
  servicios:    { id: 'servicios',    label: 'Servicios Profesionales',   icon: '📋', color: 'from-blue-500 to-indigo-600', showIntro: true },
  industria:    { id: 'industria',    label: 'Industria y Fabricación',   icon: '🏭', color: 'from-slate-600 to-slate-800', showIntro: true },
  peluqueria:   { id: 'peluqueria',   label: 'Peluquería y Estética',     icon: '✂️', color: 'from-pink-500 to-fuchsia-600', showIntro: true },
  taller:       { id: 'taller',       label: 'Taller y Reparación',       icon: '🔧', color: 'from-zinc-600 to-zinc-800',   showIntro: true },
  rotulacion:   { id: 'rotulacion',   label: 'Rotulación e Impresión',    icon: '🖨️', color: 'from-cyan-600 to-teal-700',   showIntro: true },
  datos_empresa:{ id: 'datos_empresa',label: 'Datos de la Empresa',       icon: '📊', color: 'from-slate-400 to-slate-600', showIntro: true },
  equipo:       { id: 'equipo',       label: 'Equipo y Procesos',         icon: '👥', color: 'from-indigo-500 to-blue-600', showIntro: true },
  facturacion:  { id: 'facturacion',  label: 'Facturación y Cobros',      icon: '💶', color: 'from-rose-500 to-pink-600', showIntro: true },
  tiempo:       { id: 'tiempo',       label: 'Tu Tiempo',                 icon: '⏱️', color: 'from-sky-500 to-cyan-600', showIntro: true },
  metricas:     { id: 'metricas',     label: 'Datos y Métricas',          icon: '📊', color: 'from-slate-700 to-slate-900', showIntro: true },
}

export const PHASE_DESCRIPTIONS = {
  reformas:      'Analizaremos cómo funciona tu negocio de obras: cómo consigues clientes, cómo presupuestas y cómo gestionas cada obra.',
  comercio:      'Vamos a ver cómo funciona tu operación comercial: ventas, stock, proveedores y gestión de clientes.',
  tecnologia:    'Analizaremos tu proceso de soporte, contratos, inventario técnico y gestión de clientes.',
  hosteleria:    'Revisaremos la operación del establecimiento: TPV, escandallos, reservas y proveedores.',
  servicios:     'Analizaremos cómo gestionas los expedientes, citas, clientes y la facturación de tus servicios.',
  industria:     'Veremos la planificación de producción, costes, calidad y materiales.',
  peluqueria:    'Analizaremos la gestión de citas, los no-shows, la ficha de cliente, el stock de productos y los márgenes por servicio.',
  taller:        'Revisaremos las órdenes de trabajo, el control de horas, el stock de recambios y la rentabilidad real de cada reparación.',
  rotulacion:    'Analizaremos el flujo de pedidos, la preparación de archivos, el uso del material con nesting, el mantenimiento de maquinaria y la tasa de reprocesos.',
  datos_empresa: 'Unas preguntas básicas sobre el tamaño y madurez de la empresa para contextualizar el diagnóstico.',
  equipo:        'Cómo funciona el equipo por dentro: coordinación, comunicación interna, autonomía y los procesos del día a día.',
  facturacion:   'Ahora revisaremos el proceso de facturación y el control de cobros — una de las áreas con más fugas ocultas.',
  tiempo:        'El tiempo del empresario es el recurso más escaso. Veamos dónde se está yendo.',
  metricas:      'Por último, comprobaremos si el negocio se gestiona con datos reales o por intuición.',
}

// ─────────────────────────────────────────────────────────────────────────────
// NODOS DEL ÁRBOL
// ─────────────────────────────────────────────────────────────────────────────
export const NODES = {

  // ══════════════════════════════════════════════════════════════
  // INICIO — Pregunta de sector
  // ══════════════════════════════════════════════════════════════
  sector: {
    id: 'sector', phase: 'perfil', area: null,
    question: '¿En qué sector opera tu empresa?',
    hint: 'Selecciona el que mejor describe tu actividad principal',
    type: 'single',
    options: [
      { value: 'reformas',   label: '🔨 Construcción y Reformas' },
      { value: 'comercio',   label: '🛒 Comercio y Distribución' },
      { value: 'tecnologia', label: '💻 Tecnología y Soporte Técnico' },
      { value: 'hosteleria', label: '🍽️ Hostelería y Restauración' },
      { value: 'servicios',  label: '📋 Servicios Profesionales' },
      { value: 'industria',  label: '🏭 Industria y Fabricación' },
      { value: 'peluqueria', label: '✂️ Peluquería, Barbería y Estética' },
      { value: 'taller',     label: '🔧 Taller y Reparación' },
      { value: 'rotulacion', label: '🖨️ Rotulación e Impresión Gran Formato' },
    ],
    scoreMap: null,
    routes: {
      reformas:   'reformas_tipo_cliente',
      comercio:   'comercio_canal',
      tecnologia: 'tech_tipo',
      hosteleria: 'hoste_tipo',
      servicios:  'serv_tipo',
      industria:  'ind_tipo',
      peluqueria: 'peluq_agenda',
      taller:     'taller_ordenes',
      rotulacion: 'rotul_crm_pedidos',
    },
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: REFORMAS Y CONSTRUCCIÓN
  // ══════════════════════════════════════════════════════════════
  reformas_tipo_cliente: {
    id: 'reformas_tipo_cliente', phase: 'reformas', area: null,
    question: '¿A qué tipo de cliente realizáis principalmente las obras?',
    hint: null, type: 'single',
    options: [
      { value: 'particular', label: '🏠 Particulares (viviendas, locales)' },
      { value: 'empresa',    label: '🏢 Empresas, promotoras o administraciones' },
      { value: 'ambos',      label: '🔄 Ambos tipos de cliente' },
    ],
    scoreMap: null,
    routes: {
      particular: 'reformas_ticket_obra',
      empresa:    'reformas_tipo_empresa',
      ambos:      'reformas_ticket_obra',
    },
  },

  reformas_tipo_empresa: {
    id: 'reformas_tipo_empresa', phase: 'reformas', area: null,
    question: '¿Qué tipo de clientes empresa tenéis principalmente?',
    hint: 'Puedes marcar varios', type: 'multi',
    options: [
      { value: 'promotoras',  label: '🏗️ Promotoras inmobiliarias' },
      { value: 'seguros',     label: '🛡️ Compañías de seguros' },
      { value: 'comunidades', label: '🏘️ Comunidades de vecinos' },
      { value: 'hosteleria',  label: '🍽️ Hostelería y restaurantes' },
      { value: 'industria',   label: '🏭 Industria y naves' },
      { value: 'otros',       label: '🔹 Otros' },
    ],
    scoreMap: null,
    next: 'reformas_ticket_obra',
  },

  reformas_ticket_obra: {
    id: 'reformas_ticket_obra', phase: 'reformas', area: null,
    question: '¿Cuál es el importe medio de vuestras obras?',
    hint: null, type: 'single',
    options: [
      { value: 'pequeno', label: '💰 Menos de 5.000 €' },
      { value: 'mediano', label: '💰 Entre 5.000 € y 50.000 €' },
      { value: 'grande',  label: '💰 Más de 50.000 €' },
    ],
    scoreMap: null,
    next: 'reformas_captacion',
  },

  reformas_captacion: {
    id: 'reformas_captacion', phase: 'reformas', area: 'ventas_crm',
    question: '¿Cómo conseguís los clientes y las obras?',
    hint: 'Puedes marcar varias opciones', type: 'multi',
    options: [
      { value: 'boca_boca',   label: '🗣️ Boca a boca / recomendaciones' },
      { value: 'plataformas', label: '🌐 Plataformas (Habitissimo, Houzz...)' },
      { value: 'google',      label: '🔍 Google / web propia' },
      { value: 'redes',       label: '📱 Redes sociales' },
      { value: 'directo',     label: '🤝 Cartera propia / contacto directo' },
    ],
    scoreMap: null,
    next: 'reformas_crm',
  },

  reformas_crm: {
    id: 'reformas_crm', phase: 'reformas', area: 'ventas_crm',
    question: '¿Tenéis algún sistema para registrar y hacer seguimiento de los presupuestos enviados?',
    hint: null, type: 'single',
    options: [
      { value: 'crm_software',  label: '✅ Sí, software de gestión / CRM' },
      { value: 'excel_agenda',  label: '📄 Excel o agenda' },
      { value: 'no',            label: '❌ No registramos los presupuestos' },
    ],
    scoreMap: { crm_software: 3, excel_agenda: 1, no: 0 },
    next: 'reformas_seguimiento',
  },

  reformas_seguimiento: {
    id: 'reformas_seguimiento', phase: 'reformas', area: 'ventas_crm',
    question: '¿Se hace seguimiento de los presupuestos enviados sin respuesta?',
    hint: 'Llamadas, emails de recordatorio...', type: 'single',
    options: [
      { value: 'siempre',    label: '✅ Sí, siempre y de forma organizada' },
      { value: 'a_veces',    label: '⚡ A veces, cuando nos acordamos' },
      { value: 'nunca',      label: '❌ No solemos hacer seguimiento' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, nunca: 0 },
    next: 'reformas_presupuesto_como',
  },

  reformas_presupuesto_como: {
    id: 'reformas_presupuesto_como', phase: 'reformas', area: 'presupuestacion',
    question: '¿Cómo elaboráis los presupuestos de obra?',
    hint: null, type: 'single',
    options: [
      { value: 'software_obra', label: '✅ Software específico de presupuestación de obras (Presto, Arquímedes...)' },
      { value: 'excel',         label: '📄 Excel o Word' },
      { value: 'manual',        label: '✏️ A mano o sin formato estándar' },
    ],
    scoreMap: { software_obra: 3, excel: 1, manual: 0 },
    next: 'reformas_tiempo_presupuesto',
  },

  reformas_tiempo_presupuesto: {
    id: 'reformas_tiempo_presupuesto', phase: 'reformas', area: 'presupuestacion',
    question: '¿Cuánto tiempo tarda elaborar un presupuesto de obra típico?',
    hint: null, type: 'single',
    options: [
      { value: 'menos2h', label: '⚡ Menos de 2 horas' },
      { value: '2a8h',    label: '🕐 Entre 2 y 8 horas' },
      { value: 'mas1dia', label: '⏳ Más de un día de trabajo' },
    ],
    scoreMap: { menos2h: 3, '2a8h': 1, mas1dia: 0 },
    next: 'reformas_costes_materiales',
  },

  reformas_costes_materiales: {
    id: 'reformas_costes_materiales', phase: 'reformas', area: 'operaciones',
    question: '¿Controlas los costes reales de materiales de cada obra vs. lo presupuestado?',
    hint: null, type: 'single',
    options: [
      { value: 'siempre',  label: '✅ Sí, obra por obra con detalle' },
      { value: 'a_veces',  label: '⚡ Solo en las obras más grandes' },
      { value: 'no',       label: '❌ No llevamos ese control' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, no: 0 },
    next: 'reformas_subcontratistas',
  },

  reformas_subcontratistas: {
    id: 'reformas_subcontratistas', phase: 'reformas', area: 'operaciones',
    question: '¿Trabajáis con subcontratistas o industriales externos?',
    hint: 'Fontaneros, electricistas, pintores, escayolistas...', type: 'single',
    options: [
      { value: 'si_muchos', label: '🔧 Sí, frecuentemente' },
      { value: 'si_pocos',  label: '⚡ Ocasionalmente' },
      { value: 'no',        label: '✅ No, todo es personal propio' },
    ],
    scoreMap: null,
    routes: {
      si_muchos: 'reformas_gestion_subcontrata',
      si_pocos:  'reformas_gestion_subcontrata',
      no:        'reformas_partes_trabajo',
    },
  },

  reformas_gestion_subcontrata: {
    id: 'reformas_gestion_subcontrata', phase: 'reformas', area: 'operaciones',
    question: '¿Cómo gestionáis los subcontratistas y sus partes de trabajo?',
    hint: null, type: 'single',
    options: [
      { value: 'software',  label: '✅ Integrado en el software de gestión de obra' },
      { value: 'excel',     label: '📄 Excel o email' },
      { value: 'whatsapp',  label: '📱 WhatsApp y teléfono únicamente' },
    ],
    scoreMap: { software: 3, excel: 1, whatsapp: 0 },
    next: 'reformas_partes_trabajo',
  },

  reformas_partes_trabajo: {
    id: 'reformas_partes_trabajo', phase: 'reformas', area: 'operaciones',
    question: '¿Cómo gestionáis los partes de trabajo diarios?',
    hint: 'Qué ha hecho cada operario en cada obra cada día', type: 'single',
    options: [
      { value: 'app',   label: '✅ App o software de partes de obra' },
      { value: 'papel', label: '📝 Papel / parte físico' },
      { value: 'nada',  label: '❌ No llevamos partes de trabajo' },
    ],
    scoreMap: { app: 3, papel: 1, nada: 0 },
    next: 'reformas_margen_obra',
  },

  reformas_margen_obra: {
    id: 'reformas_margen_obra', phase: 'reformas', area: 'operaciones',
    question: '¿Sabes el margen real de cada obra una vez terminada?',
    hint: '¿Sabes exactamente cuánto has ganado o perdido en cada trabajo?', type: 'single',
    options: [
      { value: 'siempre',  label: '✅ Sí, calculo el margen de cada obra' },
      { value: 'a_veces',  label: '⚡ A veces, en las más grandes' },
      { value: 'no',       label: '❌ No tengo ese dato' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, no: 0 },
    next: 'reformas_postventa',
  },

  reformas_postventa: {
    id: 'reformas_postventa', phase: 'reformas', area: 'ventas_crm',
    question: '¿Cómo gestionáis las garantías y reclamaciones postventa?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Registradas en software con seguimiento' },
      { value: 'excel',    label: '📄 En Excel o correo electrónico' },
      { value: 'memoria',  label: '❌ De memoria / sin sistema' },
    ],
    scoreMap: { software: 3, excel: 1, memoria: 0 },
    next: 'reformas_facturacion_hitos',
  },

  reformas_facturacion_hitos: {
    id: 'reformas_facturacion_hitos', phase: 'reformas', area: 'facturacion',
    question: '¿Cómo facturáis las obras?',
    hint: null, type: 'single',
    options: [
      { value: 'hitos',          label: '📊 Por hitos o certificaciones de avance de obra' },
      { value: 'adelanto_final', label: '⚡ Adelanto + factura final al terminar' },
      { value: 'al_final',       label: '⏳ Solo al terminar la obra completa' },
    ],
    scoreMap: { hitos: 3, adelanto_final: 2, al_final: 0 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: COMERCIO Y DISTRIBUCIÓN
  // ══════════════════════════════════════════════════════════════
  comercio_canal: {
    id: 'comercio_canal', phase: 'comercio', area: null,
    question: '¿Cómo vende principalmente tu empresa?',
    hint: null, type: 'single',
    options: [
      { value: 'tienda_fisica', label: '🏪 Tienda física (B2C)' },
      { value: 'online',        label: '🌐 Tienda online / e-commerce' },
      { value: 'distribucion',  label: '🚚 Distribución o venta a otras empresas (B2B)' },
      { value: 'mixto',         label: '🔄 Varios canales combinados' },
    ],
    scoreMap: null,
    routes: {
      tienda_fisica: 'comercio_tpv',
      online:        'comercio_online_plataforma',
      distribucion:  'comercio_dist_pedidos',
      mixto:         'comercio_tpv',
    },
  },

  // ── TIENDA FÍSICA ──────────────────────────────────────────────
  comercio_tpv: {
    id: 'comercio_tpv', phase: 'comercio', area: 'operaciones',
    question: '¿El TPV está integrado con el control de stock en tiempo real?',
    hint: 'Cada venta descuenta automáticamente del inventario', type: 'single',
    options: [
      { value: 'si_integrado', label: '✅ Sí, completamente integrado' },
      { value: 'si_manual',    label: '⚡ Tenemos TPV pero el stock es manual' },
      { value: 'no',           label: '❌ Sin TPV o gestión de caja manual' },
    ],
    scoreMap: { si_integrado: 3, si_manual: 1, no: 0 },
    next: 'comercio_fidelizacion',
  },

  comercio_fidelizacion: {
    id: 'comercio_fidelizacion', phase: 'comercio', area: 'ventas_crm',
    question: '¿Tenéis sistema de fidelización o base de datos de clientes?',
    hint: 'Tarjeta de puntos, CRM, email marketing...', type: 'single',
    options: [
      { value: 'si_activo', label: '✅ Sí, activo y lo explotamos' },
      { value: 'tenemos',   label: '⚡ Algo tenemos pero no lo usamos bien' },
      { value: 'no',        label: '❌ No tenemos base de clientes' },
    ],
    scoreMap: { si_activo: 3, tenemos: 1, no: 0 },
    next: 'comercio_stock_fisico',
  },

  comercio_stock_fisico: {
    id: 'comercio_stock_fisico', phase: 'comercio', area: 'inventario',
    question: '¿Cómo gestionáis el inventario y el stock?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Software de gestión de stock' },
      { value: 'excel',    label: '📄 Excel o manual' },
      { value: 'no',       label: '❌ Sin control de stock' },
    ],
    scoreMap: { software: 3, excel: 1, no: 0 },
    next: 'comercio_alertas_stock',
  },

  comercio_alertas_stock: {
    id: 'comercio_alertas_stock', phase: 'comercio', area: 'inventario',
    question: '¿Tenéis alertas automáticas cuando un producto llega a stock mínimo?',
    hint: null, type: 'single',
    options: [
      { value: 'si',     label: '✅ Sí, automáticas' },
      { value: 'manual', label: '👀 Las reviso manualmente' },
      { value: 'no',     label: '❌ No tenemos alertas' },
    ],
    scoreMap: { si: 3, manual: 1, no: 0 },
    next: 'comercio_proveedores',
  },

  comercio_proveedores: {
    id: 'comercio_proveedores', phase: 'comercio', area: 'inventario',
    question: '¿Cómo realizáis los pedidos a proveedores?',
    hint: null, type: 'single',
    options: [
      { value: 'automatico', label: '✅ Automático desde el sistema de gestión' },
      { value: 'excel',      label: '📄 Email manual o Excel' },
      { value: 'telefono',   label: '📱 Teléfono o visita del comercial' },
    ],
    scoreMap: { automatico: 3, excel: 1, telefono: 1 },
    next: 'comercio_devoluciones',
  },

  comercio_devoluciones: {
    id: 'comercio_devoluciones', phase: 'comercio', area: 'operaciones',
    question: '¿Cómo gestionáis las devoluciones de clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'software',   label: '✅ Registradas en sistema con trazabilidad' },
      { value: 'manual',     label: '📄 Papel o manual' },
      { value: 'no_sistema', label: '❌ Sin proceso definido' },
    ],
    scoreMap: { software: 3, manual: 1, no_sistema: 0 },
    next: 'common_empleados',
  },

  // ── DISTRIBUCIÓN MAYORISTA / B2B ───────────────────────────────
  comercio_dist_pedidos: {
    id: 'comercio_dist_pedidos', phase: 'comercio', area: 'ventas_crm',
    question: '¿Cómo realizan los pedidos vuestros clientes?',
    hint: 'Puedes marcar varias opciones', type: 'multi',
    options: [
      { value: 'portal_b2b',   label: '🌐 Portal web B2B propio' },
      { value: 'comerciales',  label: '🤝 Comerciales / visitadores' },
      { value: 'telefono',     label: '📞 Teléfono o WhatsApp' },
      { value: 'email',        label: '📧 Email' },
      { value: 'edi',          label: '🔗 EDI / integración automática' },
    ],
    scoreMap: null,
    next: 'comercio_dist_rutas',
  },

  comercio_dist_rutas: {
    id: 'comercio_dist_rutas', phase: 'comercio', area: 'operaciones',
    question: '¿Tenéis rutas de reparto propias?',
    hint: null, type: 'single',
    options: [
      { value: 'si_software', label: '✅ Sí, con software de optimización de rutas' },
      { value: 'si_manual',   label: '⚡ Sí, pero planificadas manualmente' },
      { value: 'agencia',     label: '🚚 Todo mediante agencia de transporte' },
    ],
    scoreMap: { si_software: 3, si_manual: 1, agencia: 2 },
    next: 'comercio_dist_credito',
  },

  comercio_dist_credito: {
    id: 'comercio_dist_credito', phase: 'comercio', area: 'facturacion',
    question: '¿Concedéis crédito o plazos de pago a los clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'si_controlado',   label: '✅ Sí, con control de riesgo y límites formales' },
      { value: 'si_sin_control',  label: '⚡ Sí, pero sin control formal de riesgo' },
      { value: 'no',              label: '❌ No, siempre al contado' },
    ],
    scoreMap: { si_controlado: 3, si_sin_control: 0, no: 2 },
    next: 'comercio_dist_tarifas',
  },

  comercio_dist_tarifas: {
    id: 'comercio_dist_tarifas', phase: 'comercio', area: 'ventas_crm',
    question: '¿Tenéis tarifas o precios diferenciados por tipo de cliente?',
    hint: 'Descuentos por volumen, tarifas por canal, precios especiales...', type: 'single',
    options: [
      { value: 'si_auto',   label: '✅ Sí, gestionadas automáticamente en el sistema' },
      { value: 'si_manual', label: '📄 Sí, pero las aplicamos manualmente' },
      { value: 'no',        label: '❌ Mismo precio para todos los clientes' },
    ],
    scoreMap: { si_auto: 3, si_manual: 1, no: 1 },
    next: 'comercio_dist_stock',
  },

  comercio_dist_stock: {
    id: 'comercio_dist_stock', phase: 'comercio', area: 'inventario',
    question: '¿Cómo gestionáis el stock del almacén?',
    hint: null, type: 'single',
    options: [
      { value: 'erp',   label: '✅ ERP / software de almacén en tiempo real' },
      { value: 'excel', label: '📄 Excel actualizado manualmente' },
      { value: 'no',    label: '❌ Sin control formalizado' },
    ],
    scoreMap: { erp: 3, excel: 1, no: 0 },
    next: 'comercio_dist_rotura',
  },

  comercio_dist_rotura: {
    id: 'comercio_dist_rotura', phase: 'comercio', area: 'inventario',
    question: '¿Con qué frecuencia os quedáis sin stock de un producto pedido por un cliente?',
    hint: null, type: 'single',
    options: [
      { value: 'frecuente',  label: '🚨 Frecuentemente — perdemos ventas por ello' },
      { value: 'a_veces',    label: '⚡ Alguna vez al mes' },
      { value: 'raramente',  label: '✅ Rara vez, lo tenemos controlado' },
    ],
    scoreMap: { frecuente: 0, a_veces: 1, raramente: 3 },
    next: 'comercio_dist_margen',
  },

  comercio_dist_margen: {
    id: 'comercio_dist_margen', phase: 'comercio', area: 'operaciones',
    question: '¿Conocéis el margen real por producto y por cliente?',
    hint: null, type: 'single',
    options: [
      { value: 'si_detallado', label: '✅ Sí, con detalle por producto y cliente' },
      { value: 'global',       label: '⚡ Solo el margen global del negocio' },
      { value: 'no',           label: '❌ No lo calculamos' },
    ],
    scoreMap: { si_detallado: 3, global: 1, no: 0 },
    next: 'common_empleados',
  },

  // ── TIENDA ONLINE ──────────────────────────────────────────────
  comercio_online_plataforma: {
    id: 'comercio_online_plataforma', phase: 'comercio', area: null,
    question: '¿En qué plataforma está vuestra tienda online?',
    hint: null, type: 'single',
    options: [
      { value: 'shopify',     label: '🛍️ Shopify' },
      { value: 'woocommerce', label: '🛒 WooCommerce / WordPress' },
      { value: 'amazon',      label: '📦 Amazon / marketplaces externos' },
      { value: 'propia',      label: '💻 Plataforma propia desarrollada' },
      { value: 'mixto',       label: '🔄 Varios canales a la vez' },
    ],
    scoreMap: null,
    next: 'comercio_online_logistica',
  },

  comercio_online_logistica: {
    id: 'comercio_online_logistica', phase: 'comercio', area: 'operaciones',
    question: '¿Cómo gestionáis el envío de pedidos?',
    hint: null, type: 'single',
    options: [
      { value: 'propio',       label: '✅ Almacén propio con gestión automatizada' },
      { value: 'outsourcing',  label: '🏭 3PL / Fulfillment externalizado' },
      { value: 'dropshipping', label: '📦 Dropshipping (el proveedor envía directamente)' },
      { value: 'manual',       label: '📦 Empaquetamos y enviamos nosotros manualmente' },
    ],
    scoreMap: { propio: 3, outsourcing: 2, dropshipping: 2, manual: 1 },
    next: 'comercio_online_carritos',
  },

  comercio_online_carritos: {
    id: 'comercio_online_carritos', phase: 'comercio', area: 'ventas_crm',
    question: '¿Tenéis configurados emails o SMS de carrito abandonado?',
    hint: 'Para recuperar clientes que no terminaron la compra', type: 'single',
    options: [
      { value: 'si',  label: '✅ Sí, automáticos y funcionando' },
      { value: 'no',  label: '❌ No tenemos eso configurado' },
    ],
    scoreMap: { si: 3, no: 0 },
    next: 'comercio_online_analytics',
  },

  comercio_online_analytics: {
    id: 'comercio_online_analytics', phase: 'comercio', area: 'metricas',
    question: '¿Controlas las métricas clave de la tienda online?',
    hint: 'Tasa de conversión, ticket medio, coste por venta, devoluciones...', type: 'single',
    options: [
      { value: 'si_dashboard', label: '✅ Sí, tengo un dashboard actualizado y lo reviso' },
      { value: 'si_basico',    label: '⚡ Miro lo básico de Google Analytics' },
      { value: 'no',           label: '❌ No controlo bien los datos' },
    ],
    scoreMap: { si_dashboard: 3, si_basico: 1, no: 0 },
    next: 'comercio_alertas_stock',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: TECNOLOGÍA Y SOPORTE TÉCNICO
  // ══════════════════════════════════════════════════════════════
  tech_tipo: {
    id: 'tech_tipo', phase: 'tecnologia', area: null,
    question: '¿Cuál es tu actividad principal en tecnología?',
    hint: null, type: 'single',
    options: [
      { value: 'hardware_soporte', label: '🖨️ Venta y soporte de hardware (equipos, plotters, impresoras...)' },
      { value: 'software',         label: '💻 Desarrollo o venta de software / licencias' },
      { value: 'it_general',       label: '🔧 Servicios IT generales (redes, servidores, mantenimiento...)' },
      { value: 'mixto',            label: '🔄 Combinación de varias actividades' },
    ],
    scoreMap: null,
    routes: {
      hardware_soporte: 'tech_hw_tickets',
      software:         'tech_sw_licencias',
      it_general:       'tech_hw_tickets',
      mixto:            'tech_hw_tickets',
    },
  },

  // ── HARDWARE + SOPORTE ─────────────────────────────────────────
  tech_hw_tickets: {
    id: 'tech_hw_tickets', phase: 'tecnologia', area: 'operaciones',
    question: '¿Tenéis un sistema de gestión de incidencias y tickets de soporte?',
    hint: null, type: 'single',
    options: [
      { value: 'helpdesk',  label: '✅ Sí, helpdesk o software de tickets (Freshdesk, Zendesk, propio...)' },
      { value: 'email',     label: '📧 Gestionamos las incidencias por email' },
      { value: 'whatsapp',  label: '📱 Por WhatsApp o teléfono únicamente' },
      { value: 'no',        label: '❌ Sin sistema formal' },
    ],
    scoreMap: { helpdesk: 3, email: 1, whatsapp: 0, no: 0 },
    next: 'tech_hw_sla',
  },

  tech_hw_sla: {
    id: 'tech_hw_sla', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Tenéis SLA (acuerdos de nivel de servicio) firmados con los clientes?',
    hint: 'Tiempos máximos de respuesta y resolución garantizados', type: 'single',
    options: [
      { value: 'si_medido',      label: '✅ Sí, y los monitorizamos activamente' },
      { value: 'si_no_medido',   label: '⚡ Sí, pero no los medimos' },
      { value: 'informalmente',  label: '📝 Solo compromisos verbales' },
      { value: 'no',             label: '❌ No tenemos SLA definidos' },
    ],
    scoreMap: { si_medido: 3, si_no_medido: 1, informalmente: 1, no: 0 },
    next: 'tech_hw_contratos',
  },

  tech_hw_contratos: {
    id: 'tech_hw_contratos', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Tenéis contratos de mantenimiento o soporte recurrente con los clientes?',
    hint: 'Cuota mensual/anual por soporte preventivo y correctivo', type: 'single',
    options: [
      { value: 'si_muchos', label: '✅ Sí, es una parte importante de nuestros ingresos' },
      { value: 'si_pocos',  label: '⚡ Algunos, pero podríamos tener muchos más' },
      { value: 'no',        label: '❌ Solo trabajamos por avería o proyecto puntual' },
    ],
    scoreMap: { si_muchos: 3, si_pocos: 1, no: 0 },
    next: 'tech_hw_stock_piezas',
  },

  tech_hw_stock_piezas: {
    id: 'tech_hw_stock_piezas', phase: 'tecnologia', area: 'inventario',
    question: '¿Controlás el stock de piezas de recambio y consumibles?',
    hint: 'Cartuchos, cabezales, rodillos, piezas de repuesto...', type: 'single',
    options: [
      { value: 'si_software', label: '✅ Sí, con software de almacén' },
      { value: 'si_excel',    label: '📄 Sí, en Excel' },
      { value: 'no',          label: '❌ Sin control formalizado' },
    ],
    scoreMap: { si_software: 3, si_excel: 1, no: 0 },
    next: 'tech_hw_base_conocimiento',
  },

  tech_hw_base_conocimiento: {
    id: 'tech_hw_base_conocimiento', phase: 'tecnologia', area: 'operaciones',
    question: '¿Tenéis una base de conocimiento técnico interna?',
    hint: 'Guías de resolución de errores comunes, procedimientos, manuales...', type: 'single',
    options: [
      { value: 'si_actualizada',    label: '✅ Sí, actualizada y el equipo la usa' },
      { value: 'si_desactualizada', label: '⚡ Algo tenemos pero está desactualizado' },
      { value: 'no',               label: '❌ El conocimiento está en la cabeza del técnico' },
    ],
    scoreMap: { si_actualizada: 3, si_desactualizada: 1, no: 0 },
    next: 'tech_hw_garantias',
  },

  tech_hw_garantias: {
    id: 'tech_hw_garantias', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Gestionáis el control de garantías de los equipos vendidos?',
    hint: 'Fechas de garantía, reclamaciones a fabricante, equipos en garantía activos', type: 'single',
    options: [
      { value: 'si_sistema', label: '✅ Sí, con sistema y alertas de vencimiento' },
      { value: 'si_excel',   label: '📄 Sí, en Excel o similar' },
      { value: 'no',         label: '❌ No llevamos control de garantías' },
    ],
    scoreMap: { si_sistema: 3, si_excel: 1, no: 0 },
    next: 'common_empleados',
  },

  // ── SOFTWARE / LICENCIAS ───────────────────────────────────────
  tech_sw_licencias: {
    id: 'tech_sw_licencias', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Cómo gestionáis las licencias de software vendidas a los clientes?',
    hint: 'Fechas de renovación, número de puestos, versiones activas...', type: 'single',
    options: [
      { value: 'sistema', label: '✅ Sistema automatizado con alertas de renovación' },
      { value: 'excel',   label: '📄 En Excel' },
      { value: 'no',      label: '❌ Sin control formal' },
    ],
    scoreMap: { sistema: 3, excel: 1, no: 0 },
    next: 'tech_sw_renovaciones',
  },

  tech_sw_renovaciones: {
    id: 'tech_sw_renovaciones', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Perdéis renovaciones de licencias o contratos por no avisar a tiempo?',
    hint: null, type: 'single',
    options: [
      { value: 'nunca',     label: '✅ No, tenemos alertas anticipadas automáticas' },
      { value: 'a_veces',   label: '⚡ Alguna se nos escapa' },
      { value: 'frecuente', label: '🚨 Sí, perdemos renovaciones con frecuencia' },
    ],
    scoreMap: { nunca: 3, a_veces: 1, frecuente: 0 },
    next: 'tech_sw_soporte',
  },

  tech_sw_soporte: {
    id: 'tech_sw_soporte', phase: 'tecnologia', area: 'operaciones',
    question: '¿Cómo gestionáis el soporte a los usuarios del software?',
    hint: null, type: 'single',
    options: [
      { value: 'helpdesk', label: '✅ Helpdesk con tickets y base de conocimiento' },
      { value: 'email',    label: '📧 Soporte por email o formulario' },
      { value: 'no',       label: '❌ Solo llamadas o sin proceso' },
    ],
    scoreMap: { helpdesk: 3, email: 1, no: 0 },
    next: 'tech_sw_recurrente',
  },

  tech_sw_recurrente: {
    id: 'tech_sw_recurrente', phase: 'tecnologia', area: 'ventas_crm',
    question: '¿Tu modelo de negocio es mayoritariamente recurrente (SaaS/subscripción) o por proyecto?',
    hint: null, type: 'single',
    options: [
      { value: 'recurrente', label: '🔄 Recurrente — subscripción mensual o anual' },
      { value: 'proyecto',   label: '📦 Por proyecto o licencia perpetua' },
      { value: 'mixto',      label: '⚡ Mixto entre ambos' },
    ],
    scoreMap: { recurrente: 3, proyecto: 2, mixto: 2 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: HOSTELERÍA
  // ══════════════════════════════════════════════════════════════
  hoste_tipo: {
    id: 'hoste_tipo', phase: 'hosteleria', area: null,
    question: '¿Qué tipo de establecimiento de hostelería tienes?',
    hint: null, type: 'single',
    options: [
      { value: 'restaurante', label: '🍽️ Restaurante' },
      { value: 'cafeteria',   label: '☕ Cafetería / bar' },
      { value: 'catering',    label: '🎪 Catering o eventos' },
      { value: 'hotel',       label: '🏨 Hotel o alojamiento' },
    ],
    scoreMap: null,
    routes: {
      restaurante: 'hoste_tpv',
      cafeteria:   'hoste_tpv',
      catering:    'hoste_catering_agenda',
      hotel:       'hoste_tpv',
    },
  },

  hoste_tpv: {
    id: 'hoste_tpv', phase: 'hosteleria', area: 'operaciones',
    question: '¿Qué sistema de gestión de sala / TPV utilizáis?',
    hint: null, type: 'single',
    options: [
      { value: 'completo', label: '✅ Sistema completo (comandas, mesas, cocina, caja integrada)' },
      { value: 'basico',   label: '⚡ TPV básico solo para cobrar' },
      { value: 'manual',   label: '❌ Bolígrafo y papel / caja registradora simple' },
    ],
    scoreMap: { completo: 3, basico: 1, manual: 0 },
    next: 'hoste_reservas',
  },

  hoste_reservas: {
    id: 'hoste_reservas', phase: 'hosteleria', area: 'ventas_crm',
    question: '¿Cómo gestionáis las reservas?',
    hint: null, type: 'single',
    options: [
      { value: 'online',    label: '✅ Plataforma online (ElTenedor, Cover, web propia...)' },
      { value: 'telefono',  label: '📞 Solo por teléfono o WhatsApp' },
      { value: 'no',        label: '🚶 No gestionamos reservas' },
    ],
    scoreMap: { online: 3, telefono: 1, no: 2 },
    next: 'hoste_escandallos',
  },

  hoste_escandallos: {
    id: 'hoste_escandallos', phase: 'hosteleria', area: 'operaciones',
    question: '¿Tenéis calculado el coste exacto de cada plato (escandallo)?',
    hint: 'Coste de ingredientes por ración incluyendo merma', type: 'single',
    options: [
      { value: 'si_todos',       label: '✅ Sí, todos los platos de la carta' },
      { value: 'si_principales', label: '⚡ Solo los platos más vendidos' },
      { value: 'no',             label: '❌ No tenemos escandallos' },
    ],
    scoreMap: { si_todos: 3, si_principales: 1, no: 0 },
    next: 'hoste_mermas',
  },

  hoste_mermas: {
    id: 'hoste_mermas', phase: 'hosteleria', area: 'inventario',
    question: '¿Controlas las mermas y pérdidas de producto?',
    hint: 'Caducidades, desperdicios, consumo interno no registrado...', type: 'single',
    options: [
      { value: 'si',    label: '✅ Sí, con control riguroso' },
      { value: 'aprox', label: '⚡ Aproximadamente' },
      { value: 'no',    label: '❌ No lo controlamos' },
    ],
    scoreMap: { si: 3, aprox: 1, no: 0 },
    next: 'hoste_proveedores',
  },

  hoste_proveedores: {
    id: 'hoste_proveedores', phase: 'hosteleria', area: 'inventario',
    question: '¿Cómo hacéis los pedidos a proveedores (fruterías, carnicerías, bodegas...)?',
    hint: null, type: 'single',
    options: [
      { value: 'sistema',  label: '✅ Sistema integrado o app del proveedor' },
      { value: 'whatsapp', label: '📱 WhatsApp o teléfono al proveedor' },
      { value: 'visita',   label: '🤝 Cuando pasa el comercial' },
    ],
    scoreMap: { sistema: 3, whatsapp: 1, visita: 0 },
    next: 'hoste_personal',
  },

  hoste_personal: {
    id: 'hoste_personal', phase: 'hosteleria', area: 'tiempo',
    question: '¿Cómo gestionáis los horarios y turnos del personal?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Software de planificación de turnos' },
      { value: 'excel',    label: '📄 Excel o cuadrante manual' },
      { value: 'oral',     label: '❌ De palabra / WhatsApp' },
    ],
    scoreMap: { software: 3, excel: 1, oral: 0 },
    next: 'common_empleados',
  },

  hoste_catering_agenda: {
    id: 'hoste_catering_agenda', phase: 'hosteleria', area: 'operaciones',
    question: '¿Cómo gestionáis la agenda de eventos y los presupuestos de catering?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Software especializado en eventos / catering' },
      { value: 'excel',    label: '📄 Excel y correo electrónico' },
      { value: 'manual',   label: '📝 Libreta / manual' },
    ],
    scoreMap: { software: 3, excel: 1, manual: 0 },
    next: 'hoste_escandallos',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: SERVICIOS PROFESIONALES
  // ══════════════════════════════════════════════════════════════
  serv_tipo: {
    id: 'serv_tipo', phase: 'servicios', area: null,
    question: '¿Qué tipo de servicio profesional ofrecéis?',
    hint: null, type: 'single',
    options: [
      { value: 'asesoria',  label: '📊 Asesoría, gestoría o consultoría' },
      { value: 'clinica',   label: '🏥 Clínica o salud (médico, fisio, dentista...)' },
      { value: 'formacion', label: '🎓 Formación / academia' },
      { value: 'limpieza',  label: '🧹 Limpieza o mantenimiento de instalaciones' },
      { value: 'otro',      label: '🔹 Otro servicio profesional' },
    ],
    scoreMap: null,
    routes: {
      asesoria:  'serv_expedientes',
      clinica:   'serv_historial',
      formacion: 'serv_alumnos',
      limpieza:  'serv_contratos_serv',
      otro:      'serv_captacion',
    },
  },

  serv_expedientes: {
    id: 'serv_expedientes', phase: 'servicios', area: 'operaciones',
    question: '¿Cómo gestionáis los expedientes y documentación de cada cliente?',
    hint: null, type: 'single',
    options: [
      { value: 'software_gestion', label: '✅ Software especializado (A3, Wolters, Sage Despachos...)' },
      { value: 'carpetas_pc',      label: '📁 Carpetas en el PC o servidor compartido' },
      { value: 'papel',            label: '📄 Papel / archivador físico' },
    ],
    scoreMap: { software_gestion: 3, carpetas_pc: 1, papel: 0 },
    next: 'serv_agenda',
  },

  serv_agenda: {
    id: 'serv_agenda', phase: 'servicios', area: 'ventas_crm',
    question: '¿Los clientes pueden pedir cita o reunión online?',
    hint: null, type: 'single',
    options: [
      { value: 'si_online',  label: '✅ Sí, agenda online en la web' },
      { value: 'si_manual',  label: '📞 Solo por teléfono o email' },
      { value: 'sin_citas',  label: '🚶 No gestionamos citas' },
    ],
    scoreMap: { si_online: 3, si_manual: 1, sin_citas: 2 },
    next: 'serv_comunicacion_estado',
  },

  serv_comunicacion_estado: {
    id: 'serv_comunicacion_estado', phase: 'servicios', area: 'ventas_crm',
    question: '¿Cómo informáis a los clientes del estado de sus gestiones o expedientes?',
    hint: null, type: 'single',
    options: [
      { value: 'portal',     label: '✅ Portal cliente donde ven el estado en tiempo real' },
      { value: 'proactivo',  label: '⚡ Llamamos o enviamos email proactivamente' },
      { value: 'esperan',    label: '📞 Solo cuando el cliente llama a preguntar' },
    ],
    scoreMap: { portal: 3, proactivo: 2, esperan: 0 },
    next: 'serv_facturacion_modelo',
  },

  serv_facturacion_modelo: {
    id: 'serv_facturacion_modelo', phase: 'servicios', area: 'facturacion',
    question: '¿Cómo facturáis a los clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'recurrente',  label: '🔄 Cuota fija mensual o anual (retainer)' },
      { value: 'por_servicio', label: '📋 Por servicio o gestión realizada' },
      { value: 'horas',       label: '⏱️ Por horas trabajadas' },
      { value: 'mixto',       label: '🔄 Mixto' },
    ],
    scoreMap: { recurrente: 3, por_servicio: 2, horas: 2, mixto: 2 },
    next: 'common_empleados',
  },

  serv_historial: {
    id: 'serv_historial', phase: 'servicios', area: 'operaciones',
    question: '¿Cómo gestionáis los historiales clínicos de los pacientes?',
    hint: null, type: 'single',
    options: [
      { value: 'software_clinico', label: '✅ Software de gestión clínica completo' },
      { value: 'fichas_pc',        label: '📁 Fichas en el ordenador (Word, Excel)' },
      { value: 'papel',            label: '📄 Fichas en papel' },
    ],
    scoreMap: { software_clinico: 3, fichas_pc: 1, papel: 0 },
    next: 'serv_agenda_clinica',
  },

  serv_agenda_clinica: {
    id: 'serv_agenda_clinica', phase: 'servicios', area: 'ventas_crm',
    question: '¿Cómo gestionáis la agenda de citas?',
    hint: null, type: 'single',
    options: [
      { value: 'online',   label: '✅ Plataforma online con confirmación automática' },
      { value: 'software', label: '⚡ Software de clínica con agenda integrada' },
      { value: 'manual',   label: '📞 Solo teléfono / agenda en papel' },
    ],
    scoreMap: { online: 3, software: 2, manual: 0 },
    next: 'serv_recordatorios_cita',
  },

  serv_recordatorios_cita: {
    id: 'serv_recordatorios_cita', phase: 'servicios', area: 'ventas_crm',
    question: '¿Enviáis recordatorios automáticos de cita a los pacientes?',
    hint: 'Por SMS, WhatsApp o email', type: 'single',
    options: [
      { value: 'automatico', label: '✅ Sí, automáticos' },
      { value: 'manual',     label: '📞 Llamamos nosotros manualmente' },
      { value: 'no',         label: '❌ No enviamos recordatorios' },
    ],
    scoreMap: { automatico: 3, manual: 1, no: 0 },
    next: 'common_empleados',
  },

  serv_alumnos: {
    id: 'serv_alumnos', phase: 'servicios', area: 'operaciones',
    question: '¿Cómo gestionáis la matrícula y el seguimiento de alumnos?',
    hint: null, type: 'single',
    options: [
      { value: 'lms',      label: '✅ Plataforma LMS (Moodle, Teachable, Hotmart...)' },
      { value: 'software', label: '⚡ Software de gestión de academia' },
      { value: 'manual',   label: '📄 Excel o manual' },
    ],
    scoreMap: { lms: 3, software: 2, manual: 0 },
    next: 'serv_comunicacion_estado',
  },

  serv_contratos_serv: {
    id: 'serv_contratos_serv', phase: 'servicios', area: 'ventas_crm',
    question: '¿Cómo gestionáis los contratos de servicio y las visitas programadas?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Software de field service o SAT' },
      { value: 'excel',    label: '📄 Excel o agenda' },
      { value: 'memoria',  label: '🧠 De memoria / sin sistema' },
    ],
    scoreMap: { software: 3, excel: 1, memoria: 0 },
    next: 'serv_captacion',
  },

  serv_captacion: {
    id: 'serv_captacion', phase: 'servicios', area: 'ventas_crm',
    question: '¿Cómo conseguís nuevos clientes?',
    hint: 'Puedes marcar varias opciones', type: 'multi',
    options: [
      { value: 'boca_boca',  label: '🗣️ Boca a boca / recomendaciones' },
      { value: 'google',     label: '🔍 Google / SEO' },
      { value: 'redes',      label: '📱 Redes sociales' },
      { value: 'convenios',  label: '🤝 Convenios o derivaciones' },
      { value: 'publicidad', label: '📢 Publicidad de pago' },
    ],
    scoreMap: null,
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: INDUSTRIA Y FABRICACIÓN
  // ══════════════════════════════════════════════════════════════
  ind_tipo: {
    id: 'ind_tipo', phase: 'industria', area: null,
    question: '¿Qué tipo de actividad industrial realizáis?',
    hint: null, type: 'single',
    options: [
      { value: 'por_pedido', label: '🔩 Fabricación por pedido (a medida)' },
      { value: 'en_serie',   label: '🏭 Fabricación en serie (producción continua)' },
      { value: 'taller',     label: '🔧 Taller de reparación o transformación' },
      { value: 'mixto',      label: '🔄 Mixto' },
    ],
    scoreMap: null,
    routes: {
      por_pedido: 'ind_planificacion',
      en_serie:   'ind_oee',
      taller:     'ind_planificacion',
      mixto:      'ind_planificacion',
    },
  },

  ind_planificacion: {
    id: 'ind_planificacion', phase: 'industria', area: 'operaciones',
    question: '¿Cómo planificáis la producción o los trabajos del taller?',
    hint: null, type: 'single',
    options: [
      { value: 'erp_mrp', label: '✅ ERP / MRP de producción' },
      { value: 'excel',   label: '📄 Excel o tablón de obra' },
      { value: 'memoria', label: '🧠 De cabeza / sin sistema formal' },
    ],
    scoreMap: { erp_mrp: 3, excel: 1, memoria: 0 },
    next: 'ind_costes_produccion',
  },

  ind_oee: {
    id: 'ind_oee', phase: 'industria', area: 'operaciones',
    question: '¿Medís la eficiencia real de la maquinaria (OEE)?',
    hint: 'OEE = Disponibilidad × Rendimiento × Calidad de cada máquina', type: 'single',
    options: [
      { value: 'si',    label: '✅ Sí, lo medimos y usamos para mejorar' },
      { value: 'aprox', label: '⚡ Aproximadamente, sin sistema formal' },
      { value: 'no',    label: '❌ No lo medimos' },
    ],
    scoreMap: { si: 3, aprox: 1, no: 0 },
    next: 'ind_costes_produccion',
  },

  ind_costes_produccion: {
    id: 'ind_costes_produccion', phase: 'industria', area: 'operaciones',
    question: '¿Calculáis el coste real de fabricación por pedido o lote?',
    hint: 'Material + mano de obra + mermas + energía', type: 'single',
    options: [
      { value: 'si_detallado', label: '✅ Sí, con desglose completo' },
      { value: 'si_global',    label: '⚡ Solo el coste aproximado total' },
      { value: 'no',           label: '❌ No lo calculamos' },
    ],
    scoreMap: { si_detallado: 3, si_global: 1, no: 0 },
    next: 'ind_control_calidad',
  },

  ind_control_calidad: {
    id: 'ind_control_calidad', phase: 'industria', area: 'operaciones',
    question: '¿Tenéis un proceso formal de control de calidad?',
    hint: null, type: 'single',
    options: [
      { value: 'certificado', label: '✅ Sí, con certificación (ISO 9001, etc.)' },
      { value: 'proceso',     label: '⚡ Sí, proceso interno sin certificación' },
      { value: 'informal',    label: '❌ Solo revisión visual informal' },
    ],
    scoreMap: { certificado: 3, proceso: 2, informal: 0 },
    next: 'ind_materiales',
  },

  ind_materiales: {
    id: 'ind_materiales', phase: 'industria', area: 'inventario',
    question: '¿Gestionáis la lista de materiales (BOM) necesaria para cada producción?',
    hint: 'Bill of Materials: qué materiales y qué cantidades exactas necesita cada producto', type: 'single',
    options: [
      { value: 'erp',   label: '✅ Sí, en el ERP / software de producción' },
      { value: 'excel', label: '📄 Sí, en Excel' },
      { value: 'no',    label: '❌ No de forma sistemática' },
    ],
    scoreMap: { erp: 3, excel: 1, no: 0 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: PELUQUERÍA, BARBERÍA Y ESTÉTICA
  // ══════════════════════════════════════════════════════════════
  peluq_agenda: {
    id: 'peluq_agenda', phase: 'peluqueria', area: 'ventas_crm',
    question: '¿Cómo gestionáis las citas con los clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'app_online',          label: '✅ App con reserva online 24/7 (cliente reserva solo)' },
      { value: 'telefono_whatsapp',   label: '📱 Por teléfono o WhatsApp' },
      { value: 'agenda_papel',        label: '📓 Agenda en papel o libreta' },
    ],
    scoreMap: { app_online: 3, telefono_whatsapp: 1, agenda_papel: 0 },
    next: 'peluq_recordatorios',
  },

  peluq_recordatorios: {
    id: 'peluq_recordatorios', phase: 'peluqueria', area: 'ventas_crm',
    question: '¿Enviáis recordatorios automáticos de cita a los clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'si_auto',   label: '✅ Sí, automáticos por SMS o WhatsApp' },
      { value: 'si_manual', label: '⚡ Los mandamos manualmente a veces' },
      { value: 'no',        label: '❌ No enviamos recordatorios' },
    ],
    scoreMap: { si_auto: 3, si_manual: 1, no: 0 },
    next: 'peluq_noshows',
  },

  peluq_noshows: {
    id: 'peluq_noshows', phase: 'peluqueria', area: 'ventas_crm',
    question: '¿Cuántos clientes no aparecen a su cita sin avisar al mes (no-shows)?',
    hint: 'Citas reservadas que simplemente no vienen', type: 'single',
    options: [
      { value: 'pocos',   label: '✅ Menos de 3 al mes' },
      { value: 'algunos', label: '⚡ Entre 4 y 10 al mes' },
      { value: 'muchos',  label: '🚨 Más de 10 al mes' },
    ],
    scoreMap: { pocos: 3, algunos: 1, muchos: 0 },
    next: 'peluq_ficha',
  },

  peluq_ficha: {
    id: 'peluq_ficha', phase: 'peluqueria', area: 'ventas_crm',
    question: '¿Tenéis ficha digital de cada cliente con su historial de servicios y preferencias?',
    hint: 'Qué servicios ha recibido, qué productos usa, observaciones...', type: 'single',
    options: [
      { value: 'si_completa', label: '✅ Sí, ficha completa con historial y preferencias' },
      { value: 'si_basica',   label: '⚡ Solo datos básicos (nombre y teléfono)' },
      { value: 'no',          label: '❌ No llevamos ficha de cliente' },
    ],
    scoreMap: { si_completa: 3, si_basica: 1, no: 0 },
    next: 'peluq_stock',
  },

  peluq_stock: {
    id: 'peluq_stock', phase: 'peluqueria', area: 'inventario',
    question: '¿Controlais el stock de productos (tintes, tratamientos, cosmética de venta)?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Sí, con software o app' },
      { value: 'manual',   label: '⚡ Manualmente o en papel' },
      { value: 'no',       label: '❌ No, pedimos cuando se acaba' },
    ],
    scoreMap: { software: 3, manual: 1, no: 0 },
    next: 'peluq_margen',
  },

  peluq_margen: {
    id: 'peluq_margen', phase: 'peluqueria', area: 'operaciones',
    question: '¿Sabéis el coste real y el margen de cada servicio (coloración, tratamientos, etc.)?',
    hint: 'Coste de productos + tiempo de personal vs. precio cobrado', type: 'single',
    options: [
      { value: 'si',    label: '✅ Sí, tenemos los costes calculados' },
      { value: 'aprox', label: '⚡ Aproximadamente sí' },
      { value: 'no',    label: '❌ No, los precios son por referencia del mercado' },
    ],
    scoreMap: { si: 3, aprox: 1, no: 0 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: TALLER Y REPARACIÓN
  // ══════════════════════════════════════════════════════════════
  taller_ordenes: {
    id: 'taller_ordenes', phase: 'taller', area: 'operaciones',
    question: '¿Usáis órdenes de trabajo digitales para cada reparación o intervención?',
    hint: 'Con descripción del trabajo, piezas usadas y horas', type: 'single',
    options: [
      { value: 'software', label: '✅ Sí, con software específico de taller' },
      { value: 'papel',    label: '⚡ Sí, en papel o formulario manual' },
      { value: 'no',       label: '❌ No, todo de palabra o por WhatsApp' },
    ],
    scoreMap: { software: 3, papel: 1, no: 0 },
    next: 'taller_horas',
  },

  taller_horas: {
    id: 'taller_horas', phase: 'taller', area: 'operaciones',
    question: '¿Registráis las horas reales de cada trabajo vs. las horas que presupuestasteis?',
    hint: null, type: 'single',
    options: [
      { value: 'siempre',  label: '✅ Sí, controlamos siempre las desviaciones' },
      { value: 'a_veces',  label: '⚡ A veces, en los trabajos más grandes' },
      { value: 'no',       label: '❌ No controlamos las horas reales' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, no: 0 },
    next: 'taller_stock',
  },

  taller_stock: {
    id: 'taller_stock', phase: 'taller', area: 'inventario',
    question: '¿Cómo gestionáis el stock de recambios y piezas?',
    hint: null, type: 'single',
    options: [
      { value: 'software',     label: '✅ Con software de almacén' },
      { value: 'excel_manual', label: '⚡ Con Excel o lista en papel' },
      { value: 'sin_control',  label: '❌ Sin control formal — pedimos cuando hace falta' },
    ],
    scoreMap: { software: 3, excel_manual: 1, sin_control: 0 },
    next: 'taller_presupuestos',
  },

  taller_presupuestos: {
    id: 'taller_presupuestos', phase: 'taller', area: 'ventas_crm',
    question: '¿Hacéis seguimiento de los presupuestos enviados que no han sido aceptados?',
    hint: null, type: 'single',
    options: [
      { value: 'siempre',  label: '✅ Sí, llamamos y hacemos seguimiento' },
      { value: 'a_veces',  label: '⚡ A veces, cuando nos acordamos' },
      { value: 'no',       label: '❌ No, si no responden lo damos por perdido' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, no: 0 },
    next: 'taller_margen',
  },

  taller_margen: {
    id: 'taller_margen', phase: 'taller', area: 'operaciones',
    question: '¿Conocéis el margen real de cada reparación (piezas + mano de obra vs. precio cobrado)?',
    hint: null, type: 'single',
    options: [
      { value: 'siempre', label: '✅ Sí, calculamos el coste real en cada trabajo' },
      { value: 'aprox',   label: '⚡ Aproximadamente sí' },
      { value: 'no',      label: '❌ No, confiamos en que hay margen suficiente' },
    ],
    scoreMap: { siempre: 3, aprox: 1, no: 0 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // SECTOR: ROTULACIÓN E IMPRESIÓN GRAN FORMATO
  // ══════════════════════════════════════════════════════════════
  rotul_crm_pedidos: {
    id: 'rotul_crm_pedidos', phase: 'rotulacion', area: 'ventas_crm',
    question: '¿Cómo gestionáis los presupuestos y pedidos de clientes?',
    hint: null, type: 'single',
    options: [
      { value: 'software_erp',     label: '✅ ERP/CRM integrado con el flujo de producción' },
      { value: 'crm_solo_ventas',  label: '⚡ CRM para ventas, pero sin conexión a producción' },
      { value: 'excel_email',      label: '📄 Excel o email (sin sistema específico)' },
      { value: 'nada',             label: '❌ Sin registro formal' },
    ],
    scoreMap: { software_erp: 3, crm_solo_ventas: 1, excel_email: 0, nada: 0 },
    next: 'rotul_tipos_producto',
  },

  rotul_tipos_producto: {
    id: 'rotul_tipos_producto', phase: 'rotulacion', area: null,
    question: '¿Qué tipos de producto fabricáis habitualmente?',
    hint: 'Puedes marcar varias opciones', type: 'multi',
    options: [
      { value: 'vinilo_adhesivo',   label: '🎨 Vinilo adhesivo (corte o impreso)' },
      { value: 'lona_ojales',       label: '🏗️ Lona con ojales, perfiles o tensada' },
      { value: 'rotulos_luminosos', label: '💡 Rótulos luminosos (cajas de luz, LED, neón flex)' },
      { value: 'señaletica_rigida', label: '🪧 Señalética rígida (PVC, dibond, metacrilato)' },
      { value: 'wrapping',          label: '🚗 Rotulación de vehículos (wrapping)' },
      { value: 'roll_ups',          label: '📢 Roll-ups, displays y elementos portátiles' },
      { value: 'lienzos',           label: '🖼️ Lienzos, bastidores y fotografía' },
    ],
    scoreMap: null,
    next: 'rotul_archivos_cliente',
  },

  rotul_archivos_cliente: {
    id: 'rotul_archivos_cliente', phase: 'rotulacion', area: 'operaciones',
    question: '¿Los archivos que envían los clientes llegan preparados para imprimir?',
    hint: 'Vectoriales correctos, perfiles de color, resolución adecuada...', type: 'single',
    options: [
      { value: 'siempre',         label: '✅ Sí, generalmente llegan bien preparados' },
      { value: 'a_veces',         label: '⚡ A veces hay ajustes o errores menores' },
      { value: 'frecuentes',      label: '🚨 Con frecuencia hay errores, revisiones y cambios' },
    ],
    scoreMap: { siempre: 3, a_veces: 1, frecuentes: 0 },
    next: 'rotul_icc_perfiles',
  },

  rotul_icc_perfiles: {
    id: 'rotul_icc_perfiles', phase: 'rotulacion', area: 'operaciones',
    question: '¿Usáis perfiles de color (ICC) estandarizados por sustrato e impresora?',
    hint: 'Perfiles calibrados para cada combinación de material y máquina', type: 'single',
    options: [
      { value: 'si_propios',  label: '✅ Sí, perfiles propios por máquina y sustrato' },
      { value: 'genericos',   label: '⚡ Usamos perfiles genéricos del RIP' },
      { value: 'no',          label: '❌ No gestionamos perfiles ICC' },
    ],
    scoreMap: { si_propios: 3, genericos: 1, no: 0 },
    next: 'rotul_nesting',
  },

  rotul_nesting: {
    id: 'rotul_nesting', phase: 'rotulacion', area: 'inventario',
    question: '¿Optimizáis el uso de material con nesting automático?',
    hint: 'Anidado de trabajos para aprovechar al máximo cada rollo o plancha', type: 'single',
    options: [
      { value: 'si_software', label: '✅ Sí, con software de nesting automático' },
      { value: 'manual',      label: '⚡ Lo optimizamos manualmente en Illustrator u otro programa' },
      { value: 'no',          label: '❌ No, imprimimos sin optimizar el material' },
    ],
    scoreMap: { si_software: 3, manual: 1, no: 0 },
    next: 'rotul_planificacion',
  },

  rotul_planificacion: {
    id: 'rotul_planificacion', phase: 'rotulacion', area: 'operaciones',
    question: '¿Tenéis planificación de la cola de producción (Gantt / panel de trabajos)?',
    hint: null, type: 'single',
    options: [
      { value: 'software', label: '✅ Sí, con panel o software digital de producción' },
      { value: 'hoja',     label: '⚡ Sí, en hoja de cálculo o pizarra' },
      { value: 'no',       label: '❌ No, gestionamos los trabajos sobre la marcha' },
    ],
    scoreMap: { software: 3, hoja: 1, no: 0 },
    next: 'rotul_mantenimiento',
  },

  rotul_mantenimiento: {
    id: 'rotul_mantenimiento', phase: 'rotulacion', area: 'operaciones',
    question: '¿Tenéis mantenimiento preventivo programado para plotters y maquinaria?',
    hint: null, type: 'single',
    options: [
      { value: 'si_programado',  label: '✅ Sí, con calendario y registro de intervenciones' },
      { value: 'reactivo',       label: '🚨 Solo intervenimos cuando hay avería' },
      { value: 'no_maquinaria',  label: '⚡ No tenemos maquinaria propia (todo subcontratado)' },
    ],
    scoreMap: { si_programado: 3, reactivo: 0, no_maquinaria: 2 },
    next: 'rotul_reprocesos',
  },

  rotul_reprocesos: {
    id: 'rotul_reprocesos', phase: 'rotulacion', area: 'operaciones',
    question: '¿Con qué frecuencia hay que reimprimir un trabajo por errores de color o producción?',
    hint: null, type: 'single',
    options: [
      { value: 'raro',      label: '✅ Raro — menos del 3% de los trabajos' },
      { value: 'alguna_vez',label: '⚡ Alguna vez — entre el 3% y el 8%' },
      { value: 'frecuente', label: '🚨 Frecuente — más del 8% de los trabajos' },
    ],
    scoreMap: { raro: 3, alguna_vez: 1, frecuente: 0 },
    next: 'rotul_manipulacion_checklist',
  },

  rotul_manipulacion_checklist: {
    id: 'rotul_manipulacion_checklist', phase: 'rotulacion', area: 'operaciones',
    question: '¿Cómo gestionáis los acabados y manipulación tras imprimir?',
    hint: 'Confección de lona, montaje de vinilos, enmarcado, ojelar, perfilar, laminar...', type: 'single',
    options: [
      { value: 'checklist_digital', label: '✅ Checklist digital por tipo de producto y acabado' },
      { value: 'instrucciones',     label: '⚡ Instrucciones en papel o verbales por trabajo' },
      { value: 'criterio_operario', label: '❌ Cada operario lo hace a su criterio' },
    ],
    scoreMap: { checklist_digital: 3, instrucciones: 1, criterio_operario: 0 },
    next: 'rotul_tiempos_estandar',
  },

  rotul_tiempos_estandar: {
    id: 'rotul_tiempos_estandar', phase: 'rotulacion', area: 'operaciones',
    question: '¿Tenéis tiempos estándar definidos por operación de manipulación?',
    hint: 'Tiempo de ojelar lona, montar vinilo, laminar, cortar, montar caja de luz...', type: 'single',
    options: [
      { value: 'si_presupuesto', label: '✅ Sí, y los usamos para calcular el precio de cada trabajo' },
      { value: 'aprox',          label: '⚡ Tiempos aproximados, pero sin registrar ni medir' },
      { value: 'no',             label: '❌ No, presupuestamos a ojo o por experiencia' },
    ],
    scoreMap: { si_presupuesto: 3, aprox: 1, no: 0 },
    next: 'rotul_hoja_ruta',
  },

  rotul_hoja_ruta: {
    id: 'rotul_hoja_ruta', phase: 'rotulacion', area: 'operaciones',
    question: '¿Cada trabajo tiene una hoja de ruta con todas las fases de producción?',
    hint: 'Diseño → Preimpresión → Impresión → Manipulación/Acabados → Instalación', type: 'single',
    options: [
      { value: 'digital',  label: '✅ Sí, hoja de ruta digital que siguen todos los operarios' },
      { value: 'papel',    label: '⚡ Sí, en papel o notas adjuntas al trabajo' },
      { value: 'verbal',   label: '❌ No, los operarios saben de palabra lo que hay que hacer' },
    ],
    scoreMap: { digital: 3, papel: 1, verbal: 0 },
    next: 'rotul_instalacion',
  },

  rotul_instalacion: {
    id: 'rotul_instalacion', phase: 'rotulacion', area: 'operaciones',
    question: '¿Cómo gestionáis las instalaciones en el cliente?',
    hint: null, type: 'single',
    options: [
      { value: 'app_digital',    label: '✅ Con app o plataforma digital (registro, fotos, firma cliente)' },
      { value: 'papel_telefono', label: '⚡ Albaranes en papel o coordinación por teléfono' },
      { value: 'no_instalamos',  label: '— No realizamos instalaciones (solo producimos)' },
    ],
    scoreMap: { app_digital: 3, papel_telefono: 1, no_instalamos: 2 },
    next: 'common_empleados',
  },

  // ══════════════════════════════════════════════════════════════
  // NODOS COMUNES — Todos los sectores terminan aquí
  // ══════════════════════════════════════════════════════════════
  common_empleados: {
    id: 'common_empleados', phase: 'datos_empresa', area: null,
    question: '¿Cuántas personas trabajan en la empresa (incluyéndote a ti)?',
    hint: null, type: 'single',
    options: [
      { value: 'solo',  label: '👤 Solo yo (autónomo)' },
      { value: '2a5',   label: '👥 2 a 5 personas' },
      { value: '6a15',  label: '👥 6 a 15 personas' },
      { value: '16a50', label: '👥 16 a 50 personas' },
      { value: 'mas50', label: '🏢 Más de 50 personas' },
    ],
    scoreMap: null,
    routes: {
      solo:    'common_facturacion_anual_solo',
      '2a5':   'common_facturacion_anual',
      '6a15':  'common_facturacion_anual',
      '16a50': 'common_facturacion_anual',
      'mas50': 'common_facturacion_anual',
    },
  },

  common_facturacion_anual_solo: {
    id: 'common_facturacion_anual_solo', phase: 'datos_empresa', area: null,
    question: '¿Cuál es la facturación anual aproximada?',
    hint: 'No necesita ser exacta, es orientativo', type: 'single',
    options: [
      { value: 'menos100k', label: '💰 Menos de 100.000 €' },
      { value: '100a500k',  label: '💰 100.000 € – 500.000 €' },
      { value: '500a2m',    label: '💰 500.000 € – 2.000.000 €' },
      { value: 'mas2m',     label: '💰 Más de 2.000.000 €' },
    ],
    scoreMap: null,
    next: 'common_facturacion_como',
  },

  common_facturacion_anual: {
    id: 'common_facturacion_anual', phase: 'datos_empresa', area: null,
    question: '¿Cuál es la facturación anual aproximada?',
    hint: 'No necesita ser exacta, es orientativo', type: 'single',
    options: [
      { value: 'menos100k', label: '💰 Menos de 100.000 €' },
      { value: '100a500k',  label: '💰 100.000 € – 500.000 €' },
      { value: '500a2m',    label: '💰 500.000 € – 2.000.000 €' },
      { value: 'mas2m',     label: '💰 Más de 2.000.000 €' },
    ],
    scoreMap: null,
    next: 'common_herramienta_tareas',
  },

  // ══════════════════════════════════════════════════════════════
  // FASE COMÚN: EQUIPO Y PROCESOS
  // ══════════════════════════════════════════════════════════════
  common_herramienta_tareas: {
    id: 'common_herramienta_tareas', phase: 'equipo', area: 'equipo',
    question: '¿Usáis alguna herramienta para gestionar las tareas y la carga de trabajo del equipo?',
    hint: null, type: 'single',
    options: [
      { value: 'software',     label: '✅ Sí, software de gestión de tareas o proyectos' },
      { value: 'excel_lista',  label: '📋 Lista en Excel, papel o pizarra' },
      { value: 'whatsapp',     label: '💬 WhatsApp, llamadas o de palabra' },
    ],
    scoreMap: { software: 3, excel_lista: 1, whatsapp: 0 },
    next: 'common_coordinacion_equipo',
  },

  common_coordinacion_equipo: {
    id: 'common_coordinacion_equipo', phase: 'equipo', area: 'equipo',
    question: '¿Cómo coordinais los trabajos o proyectos activos?',
    hint: null, type: 'single',
    options: [
      { value: 'software',        label: '✅ Panel o software centralizado (todos lo ven)' },
      { value: 'reunion',         label: '📅 Reuniones periódicas + notas o email' },
      { value: 'informal',        label: '💬 De forma informal, según va surgiendo' },
    ],
    scoreMap: { software: 3, reunion: 2, informal: 0 },
    next: 'common_comunicacion_interna',
  },

  common_comunicacion_interna: {
    id: 'common_comunicacion_interna', phase: 'equipo', area: 'equipo',
    question: '¿Por dónde se comunica el equipo principalmente para temas de trabajo?',
    hint: null, type: 'single',
    options: [
      { value: 'app_empresa', label: '✅ App de empresa (Teams, Slack, plataforma interna...)' },
      { value: 'whatsapp',    label: '💬 WhatsApp (grupos personales o de empresa)' },
      { value: 'oral',        label: '🗣️ Presencial o llamadas de teléfono' },
    ],
    scoreMap: { app_empresa: 3, whatsapp: 1, oral: 1 },
    next: 'common_procesos_documentados',
  },

  common_procesos_documentados: {
    id: 'common_procesos_documentados', phase: 'equipo', area: 'equipo',
    question: '¿Disponéis de manuales, checklists o guías internas para que cualquier persona pueda realizar las tareas clave sin preguntarte?',
    hint: 'Onboarding de nuevas personas, procesos de entrega, resolución de incidencias...', type: 'single',
    options: [
      { value: 'si_todos',  label: 'Sí, la mayoría de procesos clave están documentados y actualizados' },
      { value: 'algunos',   label: 'Solo algunos — lo básico, pero falta mucho por documentar' },
      { value: 'no',        label: 'No — el conocimiento está solo en la cabeza de las personas' },
    ],
    scoreMap: { si_todos: 3, algunos: 1, no: 0 },
    next: 'common_autonomia_equipo',
  },

  common_autonomia_equipo: {
    id: 'common_autonomia_equipo', phase: 'equipo', area: 'equipo',
    question: '¿Qué porcentaje de las tareas del equipo está asignado y visible en algún sistema compartido (agenda, gestor de tareas, software)?',
    hint: 'No cuenta el WhatsApp ni comunicarlo de palabra', type: 'single',
    options: [
      { value: 'si_mayoria',  label: 'Más del 75% — casi todo está registrado y asignado' },
      { value: 'depende',     label: 'Entre el 25 y el 75% — lo esencial, pero hay huecos' },
      { value: 'no_siempre',  label: 'Menos del 25% — trabajamos principalmente de forma verbal' },
    ],
    scoreMap: { si_mayoria: 3, depende: 1, no_siempre: 0 },
    next: 'common_facturacion_como',
  },

  common_facturacion_como: {
    id: 'common_facturacion_como', phase: 'facturacion', area: 'facturacion',
    question: '¿Cómo gestionáis la facturación?',
    hint: null, type: 'single',
    options: [
      { value: 'software',  label: '✅ Software de facturación (Holded, Sage, A3, Billin...)' },
      { value: 'excel',     label: '📄 Excel o Word' },
      { value: 'gestoria',  label: '🤝 Lo lleva la gestoría completamente' },
    ],
    scoreMap: { software: 3, excel: 1, gestoria: 1 },
    next: 'common_tiempo_factura',
  },

  common_tiempo_factura: {
    id: 'common_tiempo_factura', phase: 'facturacion', area: 'facturacion',
    question: '¿Cuánto tiempo pasa desde que terminas un trabajo hasta que emites la factura?',
    hint: null, type: 'single',
    options: [
      { value: 'mismo_dia',  label: 'El mismo día o al día siguiente' },
      { value: 'semana',     label: 'Entre 1 y 7 días' },
      { value: 'mes',        label: 'Entre 8 y 30 días' },
      { value: 'mas_semana', label: 'Más de 30 días' },
    ],
    scoreMap: { mismo_dia: 3, semana: 2, mes: 1, mas_semana: 0 },
    next: 'common_olvido_factura',
  },

  common_olvido_factura: {
    id: 'common_olvido_factura', phase: 'facturacion', area: 'facturacion',
    question: '¿Cuántas veces al año descubres trabajos realizados que no se llegaron a facturar o se facturaron tarde por despiste?',
    hint: null, type: 'single',
    options: [
      { value: 'si_ha_pasado', label: 'Más de 2 veces — nos pasa con cierta frecuencia' },
      { value: 'alguna_vez',   label: '1 o 2 veces al año' },
      { value: 'nunca',        label: 'Nunca, tenemos proceso claro para evitarlo' },
    ],
    scoreMap: { si_ha_pasado: 0, alguna_vez: 1, nunca: 3 },
    next: 'common_cobros',
  },

  common_cobros: {
    id: 'common_cobros', phase: 'facturacion', area: 'facturacion',
    question: '¿Tenéis un sistema para registrar qué facturas están pendientes de cobro, su vencimiento y los retrasos?',
    hint: null, type: 'single',
    options: [
      { value: 'software',    label: 'Sí, con software y alertas automáticas de vencimiento' },
      { value: 'manualmente', label: 'Sí, pero lo revisamos de forma manual y periódica' },
      { value: 'no',          label: 'No lo controlamos de forma sistemática' },
    ],
    scoreMap: { software: 3, manualmente: 1, no: 0 },
    next: 'common_impagos',
  },

  common_impagos: {
    id: 'common_impagos', phase: 'facturacion', area: 'facturacion',
    question: '¿Qué porcentaje aproximado de tu facturación mensual se cobra con más de 30 días de retraso respecto al vencimiento?',
    hint: null, type: 'single',
    options: [
      { value: 'si_varios', label: 'Más del 30% — es un problema habitual' },
      { value: 'alguno',    label: 'Entre el 10 y el 30%' },
      { value: 'no',        label: 'Menos del 10% — lo tenemos controlado' },
    ],
    scoreMap: { si_varios: 0, alguno: 1, no: 3 },
    next: 'common_horas_admin',
  },

  common_horas_admin: {
    id: 'common_horas_admin', phase: 'tiempo', area: 'tiempo',
    question: '¿Cuántas horas al día dedicas a tareas administrativas y burocracia?',
    hint: 'Presupuestos, facturas, emails internos, organizar trabajos...', type: 'single',
    options: [
      { value: 'menos1', label: '✅ Menos de 1 hora' },
      { value: '1a3',    label: '⚡ Entre 1 y 3 horas' },
      { value: '3a5',    label: '⏳ Entre 3 y 5 horas' },
      { value: 'mas5',   label: '🚨 Más de 5 horas' },
    ],
    scoreMap: { menos1: 3, '1a3': 2, '3a5': 1, mas5: 0 },
    next: 'common_vacaciones',
  },

  common_vacaciones: {
    id: 'common_vacaciones', phase: 'tiempo', area: 'tiempo',
    question: '¿Cuánto tiempo semanal dedicas a tareas de alto valor — estrategia, mejora del negocio, alianzas, nuevos servicios — frente a tareas operativas urgentes?',
    hint: 'Trabajo estratégico = el que solo tú puedes hacer y que mueve el negocio hacia adelante', type: 'single',
    options: [
      { value: 'si',       label: 'Más del 25% de mi tiempo semanal' },
      { value: 'con_dif',  label: 'Entre el 10 y el 25%' },
      { value: 'no_puedo', label: 'Menos del 10% — casi todo es apagar fuegos' },
    ],
    scoreMap: { si: 3, con_dif: 1, no_puedo: 0 },
    next: 'common_cuello_botella',
  },

  common_cuello_botella: {
    id: 'common_cuello_botella', phase: 'tiempo', area: 'tiempo',
    question: '¿Cuántas decisiones del día a día requieren tu aprobación directa? (descuentos, compras, resolución de incidencias, respuestas a clientes...)',
    hint: null, type: 'single',
    options: [
      { value: 'muchas',    label: 'La mayoría pasan por mí — soy el cuello de botella' },
      { value: 'pocas',     label: 'Varias al día, solo las más importantes' },
      { value: 'casi_nada', label: 'Casi ninguna — el equipo actúa con autonomía' },
    ],
    scoreMap: { muchas: 0, pocas: 1, casi_nada: 3 },
    next: 'common_interrupciones',
  },

  common_interrupciones: {
    id: 'common_interrupciones', phase: 'tiempo', area: 'tiempo',
    question: '¿Cuántas veces al día recibes interrupciones que te sacan de tareas importantes? (llamadas, consultas internas, WhatsApp, urgencias...)',
    hint: null, type: 'single',
    options: [
      { value: 'casi_nunca', label: '0 a 2 veces — puedo trabajar con concentración' },
      { value: 'algunas',    label: '3 a 5 veces al día' },
      { value: 'frecuentes', label: '6 a 10 veces al día' },
      { value: 'muchas',     label: 'Más de 10 — raramente termino algo sin interrupciones' },
    ],
    scoreMap: { casi_nunca: 3, algunas: 2, frecuentes: 1, muchas: 0 },
    next: 'common_tarea_repetida',
  },

  common_tarea_repetida: {
    id: 'common_tarea_repetida', phase: 'tiempo', area: 'tiempo',
    question: '¿Cuál es la tarea que MÁS tiempo te consume cada semana?',
    hint: 'La que más veces repites o más horas te quita personalmente', type: 'single',
    options: [
      { value: 'presupuestos',      label: '📄 Elaborar y revisar presupuestos u ofertas' },
      { value: 'admin_burocracia',  label: '📋 Papeleo, facturas y trámites administrativos' },
      { value: 'coordinacion',      label: '👥 Coordinar y supervisar al equipo' },
      { value: 'atencion_cliente',  label: '📞 Atender consultas y llamadas de clientes' },
      { value: 'buscar_docs',       label: '🔍 Buscar información, documentos o datos' },
    ],
    scoreMap: { presupuestos: 1, admin_burocracia: 1, coordinacion: 0, atencion_cliente: 1, buscar_docs: 0 },
    next: 'common_panel_kpi',
  },

  common_panel_kpi: {
    id: 'common_panel_kpi', phase: 'metricas', area: 'metricas',
    question: '¿Tenéis un panel o cuadro de mando donde veáis de un vistazo las métricas clave del negocio?',
    hint: 'Ventas, margen, cobros pendientes, productividad, clientes nuevos...', type: 'single',
    options: [
      { value: 'si_lo_uso',  label: 'Sí, automatizado y lo consulto cada semana' },
      { value: 'si_no_miro', label: 'Tengo algo montado pero rara vez lo consulto' },
      { value: 'no',         label: 'No, los datos están dispersos y no hay panel centralizado' },
    ],
    scoreMap: { si_lo_uso: 3, si_no_miro: 1, no: 0 },
    next: 'common_frecuencia_numeros',
  },

  common_frecuencia_numeros: {
    id: 'common_frecuencia_numeros', phase: 'metricas', area: 'metricas',
    question: '¿Con qué facilidad puedes saber si este mes estás mejor o peor que el mes pasado en ventas, margen y liquidez?',
    hint: null, type: 'single',
    options: [
      { value: 'diario',  label: 'En pocos minutos — tengo los datos al día' },
      { value: 'semanal', label: 'Con algo de esfuerzo — hay que buscarlo' },
      { value: 'mensual', label: 'Solo al final del mes cuando lo calculo a mano' },
      { value: 'nunca',   label: 'No lo sé con certeza — lo intuyo' },
    ],
    scoreMap: { diario: 3, semanal: 2, mensual: 1, nunca: 0 },
    next: 'common_conversion_presupuestos',
  },

  common_conversion_presupuestos: {
    id: 'common_conversion_presupuestos', phase: 'metricas', area: 'metricas',
    question: '¿Medís la tasa de conversión de presupuestos? (de cada 10 enviados, cuántos se convierten en venta)',
    hint: 'Si envías 10 presupuestos y cierras 4, tu tasa es del 40%', type: 'single',
    options: [
      { value: 'si',    label: 'Sí, la medimos con datos claros y la revisamos periódicamente' },
      { value: 'aprox', label: 'Lo estimamos de memoria pero no hay un registro formal' },
      { value: 'no',    label: 'No la medimos — no sabemos exactamente cuántos cerramos' },
    ],
    scoreMap: { si: 3, aprox: 1, no: 0 },
    next: 'common_cliente_rentable',
  },

  common_cliente_rentable: {
    id: 'common_cliente_rentable', phase: 'metricas', area: 'metricas',
    question: '¿Tienes identificados cuáles son tus clientes o proyectos más rentables y cuáles apenas dejan margen (o generan pérdidas)?',
    hint: null, type: 'single',
    options: [
      { value: 'si_exacto', label: 'Sí, lo tengo calculado con datos reales de margen por cliente' },
      { value: 'aprox',     label: 'Lo intuyo pero no hay un cálculo formal que lo respalde' },
      { value: 'no',        label: 'No lo sé — todos los clientes me parecen similares' },
    ],
    scoreMap: { si_exacto: 3, aprox: 1, no: 0 },
    next: 'common_coste_captacion',
  },

  common_coste_captacion: {
    id: 'common_coste_captacion', phase: 'metricas', area: 'metricas',
    question: '¿Sabéis cuánto os cuesta de media conseguir un nuevo cliente? (inversión en marketing, tiempo de comerciales, descuentos...)',
    hint: null, type: 'single',
    options: [
      { value: 'si_exacto', label: 'Sí, lo tenemos calculado con datos y lo optimizamos' },
      { value: 'aprox',     label: 'Lo estimamos de memoria pero no hay un dato exacto' },
      { value: 'no',        label: 'No lo medimos — no sabemos qué cuesta captar un cliente' },
    ],
    scoreMap: { si_exacto: 3, aprox: 1, no: 0 },
    next: null, // ← FIN → Mostrar resultados
  },
}

// Nodo de inicio
export const START_NODE = 'sector'

// Navegación: obtener siguiente nodo
export function getNextNodeId(node, value) {
  if (node.routes) {
    // Multi: usa el primer valor seleccionado para bifurcar, o el primer route disponible
    if (Array.isArray(value)) {
      for (const v of value) {
        if (node.routes[v]) return node.routes[v]
      }
      return Object.values(node.routes)[0] ?? null
    }
    return node.routes[value] ?? null
  }
  return node.next ?? null
}
