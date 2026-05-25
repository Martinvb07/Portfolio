export type Bilingual = { es: string; en: string };
export type BilingualList = { es: string[]; en: string[] };
export type CaseStat = { value: string; label: Bilingual };

export type CaseContent = {
  problem: Bilingual;
  approach: Bilingual;
  highlights: BilingualList;
  results: CaseStat[];
  lessons: Bilingual;
};

export type Project = {
  key: string;
  idx: string;
  name: string;
  url: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  sub: Bilingual;
  stack: string;
  type: Bilingual;
  year: string;
  tag: Bilingual;
  status: Bilingual;
  desc: Bilingual;
  role: Bilingual;
  state: Bilingual;
  tags: string[];
  case: CaseContent;
};

export const PROJECTS: Project[] = [
  {
    key: 'reservatucancha', idx: '01', name: 'ReservaTuCancha',
    url: 'reservatucancha.site', liveUrl: 'https://reservatucancha.site/',
    repoUrl: 'https://github.com/Martinvb07/ReservaTuCancha',
    featured: true,
    stack: 'Next.js · NestJS · MongoDB',
    sub: { es: 'Reservas deportivas en tiempo real', en: 'Real-time sports court booking' },
    type: { es: 'App · Reservas', en: 'App · Bookings' }, year: '2025',
    tag: { es: 'FEATURED — 01', en: 'FEATURED — 01' },
    status: { es: 'Online · 2025', en: 'Online · 2025' },
    desc: {
      es: 'Plataforma de reservas deportivas: catálogo de canchas (fútbol, pádel, voley playa), disponibilidad en tiempo real con WebSockets, pagos con Wompi y panel para clubes con analíticas.',
      en: 'Sports court booking platform: court catalog (football, padel, beach volley), real-time availability with WebSockets, Wompi payments and club admin panel with analytics.',
    },
    role: { es: 'Full stack · solo', en: 'Full stack · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB', 'Socket.io', 'Wompi', 'VPS Ubuntu'],
    case: {
      problem: {
        es: 'Los clubes deportivos en Colombia gestionan reservas por WhatsApp, llamadas o agendas en papel. Eso genera dobles reservas, confusión de horarios y pérdida de clientes que se cansan de esperar respuesta. Para los jugadores, encontrar y reservar una cancha disponible es un proceso fragmentado que puede tomar más de una hora.',
        en: 'Sports clubs in Colombia manage bookings through WhatsApp, calls or paper diaries. This creates double bookings, schedule confusion and lost customers tired of waiting for replies. For players, finding and booking an available court is a fragmented process that can take over an hour.',
      },
      approach: {
        es: 'Construí una plataforma SSR con Next.js 14 para SEO local. La API en NestJS maneja disponibilidad con locks para evitar dobles reservas, MongoDB para flexibilidad de schemas, Socket.io para actualizaciones en tiempo real, y Wompi como pasarela porque maneja PSE, Nequi y tarjetas. Tres roles: clientes (sin registro), propietarios y administradores.',
        en: 'Built a Next.js 14 SSR platform for local SEO. NestJS API handles availability with locks to prevent double bookings, MongoDB for schema flexibility, Socket.io for real-time updates, and Wompi as the payment gateway. Three roles: customers (no signup required), owners and admins.',
      },
      highlights: {
        es: [
          'Reserva sin registro: el cliente entra, elige hora, paga y recibe confirmación',
          'Disponibilidad en tiempo real con Socket.io — cero riesgo de doble reserva',
          'Pagos con Wompi (PSE, Nequi, tarjetas) — checkout en menos de 30 segundos',
          'Panel para clubes con métricas por cancha, horarios pico y reservas activas',
          'Emails automáticos de confirmación, recordatorio y reseña post-juego',
          'Sistema de calificaciones para mejorar el servicio del club',
        ],
        en: [
          'Booking without signup: customer enters, picks time, pays and gets confirmation',
          'Real-time availability with Socket.io — zero double-booking risk',
          'Wompi payments (PSE, Nequi, cards) — under 30-second checkout',
          'Club admin panel with per-court metrics, peak hours and active bookings',
          'Automatic confirmation, reminder and post-game review emails',
          'Rating system to help clubs improve service',
        ],
      },
      results: [
        { value: '99.8%', label: { es: 'Uptime últimos 90 días', en: 'Uptime last 90 days' } },
        { value: '<200ms', label: { es: 'Latencia promedio API', en: 'Avg API latency' } },
        { value: '0', label: { es: 'Dobles reservas en producción', en: 'Double bookings in prod' } },
        { value: '+340', label: { es: 'Reservas el primer mes', en: 'Bookings first month' } },
      ],
      lessons: {
        es: 'Aprendí que la fricción mata conversión: cada paso extra es 10% menos reservas, por eso quitamos el registro obligatorio. Los locks pesimistas suenan over-engineered hasta que el primer doble booking te hace ver que no lo son. Y que Wompi sobre Stripe no es opinión, es realidad colombiana.',
        en: 'I learned friction kills conversion: each extra step is 10% fewer bookings, which is why we removed mandatory signup. Pessimistic locks sound over-engineered until the first double booking proves otherwise. And that Wompi over Stripe isn\'t opinion, it\'s Colombian reality.',
      },
    },
  },
  {
    key: 'agromanager', idx: '02', name: 'AgroManager Pro',
    url: 'agromanager.pro', liveUrl: 'https://agromanager.pro/',
    repoUrl: 'https://github.com/Martinvb07/AgroManager',
    stack: 'React · Express · MySQL',
    sub: { es: 'Gestión agrícola SaaS', en: 'Agricultural SaaS dashboard' },
    type: { es: 'SaaS · Dashboard', en: 'SaaS · Dashboard' }, year: '2024',
    tag: { es: 'CASE — 02', en: 'CASE — 02' },
    status: { es: 'Online · 2024 → presente', en: 'Online · 2024 → present' },
    desc: {
      es: 'SaaS de gestión agrícola: control de lotes, cultivos, trabajadores, maquinaria, inventario y finanzas. Dashboard con métricas en tiempo real, alertas por etapa de siembra y exportación a PDF.',
      en: 'Agricultural management SaaS: plots, crops, workers, machinery, inventory and finances. Real-time metrics dashboard, planting-stage alerts and PDF export.',
    },
    role: { es: 'Full stack · solo', en: 'Full stack · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['React', 'Vite', 'TypeScript', 'Express', 'MySQL', 'Tailwind'],
    case: {
      problem: {
        es: 'Pequeños y medianos productores agrícolas en Colombia gestionan cultivos, inventario y trabajadores en cuadernos o Excel. No tienen visibilidad real de costos por lote, no saben qué cultivo les rinde más, y pierden tiempo en reportes manuales desactualizados.',
        en: 'Small and mid-sized farmers in Colombia manage crops, inventory and workers in notebooks or Excel. They have no real visibility on cost per plot and lose time on manual reports that are outdated by the time they\'re printed.',
      },
      approach: {
        es: 'Frontend en React 19 + Vite para SPA rápida con múltiples módulos. Backend Express con MySQL para integridad transaccional en los registros financieros. Arquitectura separada frontend/backend para escalar independientemente. Exportación PDF con jsPDF para reportes presentables a bancos o cooperativas.',
        en: 'React 19 + Vite frontend for fast SPA with multiple modules. Express backend with MySQL for transactional integrity on financial records. Separate frontend/backend architecture for independent scaling. PDF export with jsPDF for reports presentable to banks or cooperatives.',
      },
      highlights: {
        es: [
          'Dashboard multi-módulo: lotes, cultivos, trabajadores, maquinaria, inventario',
          'Control de riego, plagas, semillas y fertilizantes por lote',
          'Finanzas del campo: ingresos, egresos y balance general',
          'Exportación a PDF para presentar a bancos o cooperativas',
          'Notificaciones con SweetAlert2 para alertas y confirmaciones',
          'UI responsive — funciona en celular, tablet y PC',
        ],
        en: [
          'Multi-module dashboard: plots, crops, workers, machinery, inventory',
          'Irrigation, pest, seed and fertilizer tracking per plot',
          'Farm finances: income, expenses and general balance',
          'PDF export for banks or cooperatives',
          'SweetAlert2 notifications for alerts and confirmations',
          'Responsive UI — works on mobile, tablet and PC',
        ],
      },
      results: [
        { value: '120+', label: { es: 'Hectáreas gestionadas', en: 'Hectares managed' } },
        { value: '32', label: { es: 'Productores activos', en: 'Active farmers' } },
        { value: '−65%', label: { es: 'Tiempo en reportes', en: 'Time on reports' } },
        { value: '6', label: { es: 'Módulos de gestión', en: 'Management modules' } },
      ],
      lessons: {
        es: 'Trabajar con un sector no-tech me obligó a hacer el onboarding mucho más simple. La lección: si la primera pantalla no es obvia, perdiste al usuario. También que separar frontend y backend desde el inicio, aunque parezca overkill al principio, facilita escalar cada parte de forma independiente.',
        en: 'Working with a non-tech sector forced me to make onboarding much simpler. The lesson: if the first screen isn\'t obvious, you lost the user. Also that separating frontend and backend from the start, even if it seems overkill, makes scaling each part independently much easier.',
      },
    },
  },
  {
    key: 'mesoft', idx: '03', name: 'MeSoft',
    url: 'mesoft.store', liveUrl: 'https://mesoft.store/',
    repoUrl: 'https://github.com/Martinvb07/Mesoft',
    stack: 'React · Express · MySQL',
    sub: { es: 'SaaS de gestión para restaurantes', en: 'Restaurant management SaaS' },
    type: { es: 'SaaS · Restaurantes', en: 'SaaS · Restaurants' }, year: '2024',
    tag: { es: 'CASE — 03', en: 'CASE — 03' },
    status: { es: 'Online · 2024 → presente', en: 'Online · 2024 → present' },
    desc: {
      es: 'Plataforma SaaS multi-tenant para restaurantes: gestión de mesas en tiempo real, toma de pedidos, panel admin con finanzas, nómina e inventario. Roles para meseros y administradores.',
      en: 'Multi-tenant restaurant SaaS: real-time table management, order taking, admin panel with finances, payroll and inventory. Roles for waiters and administrators.',
    },
    role: { es: 'Full stack · solo', en: 'Full stack · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['React', 'Vite', 'Express', 'MySQL', 'JWT'],
    case: {
      problem: {
        es: 'Los restaurantes pequeños y medianos gestionan mesas y pedidos con papel, cuadernos o apps básicas que no se integran. Los meseros pierden tiempo, los errores de pedido son frecuentes y los dueños no tienen visibilidad real de sus finanzas ni inventario.',
        en: 'Small and mid-sized restaurants manage tables and orders with paper, notebooks or basic apps that don\'t integrate. Waiters waste time, order errors are frequent and owners have no real visibility of finances or inventory.',
      },
      approach: {
        es: 'Frontend React 19 + Vite con SPA separada por roles. Backend Express 5 + MySQL con middleware multi-tenant (X-Restaurant-Id header) para aislar datos por restaurante. JWT para auth, bcrypt para contraseñas, Nodemailer para emails. Dos interfaces completamente distintas: operativa (meseros, mesas) y administrativa (KPIs, finanzas, nómina).',
        en: 'React 19 + Vite frontend with role-separated SPA. Express 5 + MySQL backend with multi-tenant middleware (X-Restaurant-Id header) to isolate data per restaurant. JWT for auth, bcrypt for passwords, Nodemailer for emails. Two completely different interfaces: operational (waiters, tables) and administrative (KPIs, finances, payroll).',
      },
      highlights: {
        es: [
          'Mesas en tiempo real: libre, ocupada, en limpieza — actualización instantánea',
          'Toma de pedidos digital con registro de propinas',
          'Panel admin con KPIs diarios, cierres de caja y reportes',
          'Inventario con movimientos y alertas de stock bajo',
          'Módulo de nómina para gestión de pagos al personal',
          'Multi-tenant: soporta múltiples restaurantes en una sola plataforma',
        ],
        en: [
          'Real-time tables: free, occupied, cleaning — instant update',
          'Digital order taking with tip recording',
          'Admin panel with daily KPIs, cash closings and reports',
          'Inventory with movements and low-stock alerts',
          'Payroll module for staff payment management',
          'Multi-tenant: supports multiple restaurants on one platform',
        ],
      },
      results: [
        { value: '99.9%', label: { es: 'Uptime', en: 'Uptime' } },
        { value: '2', label: { es: 'Roles de usuario', en: 'User roles' } },
        { value: '5+', label: { es: 'Módulos de gestión', en: 'Management modules' } },
        { value: 'Multi', label: { es: 'Tenant — varios restaurantes', en: 'Tenant — multiple restaurants' } },
      ],
      lessons: {
        es: 'Diseñar para dos tipos de usuarios completamente distintos (mesero vs admin) es un reto de UX real. Lo que es intuitivo para uno puede ser confuso para el otro. También que el multi-tenant desde el inicio evita migraciones dolorosas después.',
        en: 'Designing for two completely different user types (waiter vs admin) is a real UX challenge. What\'s intuitive for one can be confusing for the other. Also that multi-tenancy from the start avoids painful migrations later.',
      },
    },
  },
  {
    key: 'honeycol', idx: '04', name: 'HoneyCol',
    url: 'honeycol.co', stack: 'Next.js · Express · MongoDB',
    sub: { es: 'E-commerce pixel-art con 3D viewer', en: 'Pixel-art e-commerce with 3D viewer' },
    type: { es: 'E-commerce', en: 'E-commerce' }, year: '2025',
    tag: { es: 'CASE — 04', en: 'CASE — 04' },
    status: { es: 'En desarrollo · 2025', en: 'Building · 2025' },
    desc: {
      es: 'Tienda de streetwear con estética pixel-art auténtica: visualizador 3D de productos con drag y momentum, checkout en 3 pasos y pagos con Wompi. Degradación elegante si el backend no está disponible.',
      en: 'Streetwear store with authentic pixel-art aesthetic: 3D product viewer with drag and momentum, 3-step checkout and Wompi payments. Graceful degradation if backend is unavailable.',
    },
    role: { es: 'Full stack · solo', en: 'Full stack · solo' },
    state: { es: 'En desarrollo', en: 'Building' },
    tags: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Wompi'],
    case: {
      problem: {
        es: 'Las tiendas de streetwear locales no tienen presencia digital diferenciada. Shopify es genérico y no permite la personalización visual que requiere una marca de nicho con identidad propia.',
        en: 'Local streetwear stores lack differentiated digital presence. Shopify is generic and doesn\'t allow the visual customization a niche brand with its own identity requires.',
      },
      approach: {
        es: 'Next.js 15 para el frontend con estética pixel-art completa (fuente Press Start 2P, scanlines CRT, paleta 8-bit). Visualizador 3D de productos con CSS puro y física de momentum sin librerías pesadas. Backend Express + MongoDB para productos y órdenes. Wompi para pagos locales colombianos.',
        en: 'Next.js 15 frontend with full pixel-art aesthetic (Press Start 2P font, CRT scanlines, 8-bit palette). 3D product viewer with pure CSS and momentum physics, no heavy libraries. Express + MongoDB backend for products and orders. Wompi for Colombian local payments.',
      },
      highlights: {
        es: [
          'Estética 8-bit completa: fuente pixel, scanlines CRT, paleta retro',
          'Visualizador 3D con drag + momentum en mouse y touch',
          'Checkout modal en 3 pasos con validación',
          'Múltiples métodos de pago: Wompi, WhatsApp, efectivo',
          'Degradación elegante: productos estáticos si falla el backend',
          'Rastreo de estado de órdenes (pendiente/pagado/cancelado)',
        ],
        en: [
          'Full 8-bit aesthetic: pixel font, CRT scanlines, retro palette',
          '3D viewer with drag + momentum on mouse and touch',
          '3-step checkout modal with validation',
          'Multiple payment methods: Wompi, WhatsApp, cash',
          'Graceful degradation: static products if backend fails',
          'Order status tracking (pending/paid/cancelled)',
        ],
      },
      results: [
        { value: '0', label: { es: 'Librerías 3D externas', en: '3D external libraries' } },
        { value: '3', label: { es: 'Métodos de pago', en: 'Payment methods' } },
        { value: 'CSS', label: { es: 'Pixel-art puro', en: 'Pure pixel-art' } },
        { value: '100%', label: { es: 'TypeScript end-to-end', en: 'TypeScript end-to-end' } },
      ],
      lessons: {
        es: 'Construir un visualizador 3D sin Three.js o Babylon.js fue el reto principal — solo CSS transforms y JavaScript de physics. Aprendí que las constraints técnicas fuerzan soluciones creativas que terminan siendo más livianas y rápidas que las "soluciones correctas".',
        en: 'Building a 3D viewer without Three.js or Babylon.js was the main challenge — just CSS transforms and physics JavaScript. I learned that technical constraints force creative solutions that end up being lighter and faster than the "correct solutions".',
      },
    },
  },
  {
    key: 'martinhq', idx: '05', name: 'MartinHQ Monitor',
    url: 'monitor.martin.dev', stack: 'Node.js · Next.js · Express',
    sub: { es: 'Monitor de VPS con dashboard Next.js', en: 'VPS monitor with Next.js dashboard' },
    type: { es: 'Tool · VPS Monitor', en: 'Tool · VPS Monitor' }, year: '2025',
    tag: { es: 'CASE — 05', en: 'CASE — 05' },
    status: { es: 'Online · 2025', en: 'Online · 2025' },
    desc: {
      es: 'Dashboard de monitoreo para VPS propios: checks HTTP/SSL/DNS cada 30s, métricas de latencia, logs de Nginx, analytics de visitantes con geolocalización, alertas y panel de deploys con ejecución de scripts.',
      en: 'Monitoring dashboard for personal VPS: HTTP/SSL/DNS checks every 30s, latency metrics, Nginx logs, visitor analytics with geolocation, alerts and deploy panel with script execution.',
    },
    role: { es: 'Full stack · solo', en: 'Full stack · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'JWT', 'Docker'],
    case: {
      problem: {
        es: 'Tengo varios VPS con servicios distintos. Las soluciones existentes (UptimeRobot, etc.) son caras para el nivel de detalle que quería o no permiten ejecutar scripts de deploy directamente. Lo construí a medida.',
        en: 'I have several VPS with different services. Existing solutions (UptimeRobot, etc.) are expensive for the level of detail I wanted or don\'t allow running deploy scripts directly. So I built it.',
      },
      approach: {
        es: 'Backend Express con checks automáticos cada 30s usando Promise.all() para HTTP, SSL y DNS en paralelo. Frontend Next.js 14 con diseño brutalista editorial. Persistencia en JSON para simplicidad. Autenticación JWT con 2FA TOTP. Deploy real desde el dashboard ejecutando scripts bash del VPS.',
        en: 'Express backend with automatic checks every 30s using Promise.all() for parallel HTTP, SSL and DNS. Next.js 14 frontend with brutalist editorial design. JSON persistence for simplicity. JWT auth with TOTP 2FA. Real deploy from dashboard by executing bash scripts on the VPS.',
      },
      highlights: {
        es: [
          'Checks cada 30s: HTTP status, latencia, SSL días, DNS, headers de seguridad',
          'Dashboard en tiempo real con countdown al próximo check',
          'Ejecutar deploys reales desde el browser sin SSH',
          'Analytics de visitantes desde logs de Nginx con geolocalización',
          'Logs de PM2 y Nginx en vivo desde el dashboard',
          '2FA con TOTP (Google Authenticator), PWA instalable',
        ],
        en: [
          'Checks every 30s: HTTP status, latency, SSL days, DNS, security headers',
          'Real-time dashboard with countdown to next check',
          'Execute real deploys from browser without SSH',
          'Visitor analytics from Nginx logs with geolocation',
          'Live PM2 and Nginx logs from dashboard',
          '2FA with TOTP (Google Authenticator), installable PWA',
        ],
      },
      results: [
        { value: '8', label: { es: 'VPS monitoreados', en: 'Servers monitored' } },
        { value: '30s', label: { es: 'Intervalo de checks', en: 'Check interval' } },
        { value: '0', label: { es: 'Veces que abrí SSH desde celular', en: 'Mobile SSH sessions' } },
        { value: '$0', label: { es: 'Costo mensual extra', en: 'Extra monthly cost' } },
      ],
      lessons: {
        es: 'Construir tu propio tooling solo vale la pena si lo usás todos los días — yo lo uso, así que vale. El proyecto más útil que hice no es ningún SaaS para clientes, sino esta herramienta para mí mismo.',
        en: 'Building your own tooling only pays off if you use it daily — I do, so it does. The most useful project I built isn\'t any client-facing SaaS, but this tool for myself.',
      },
    },
  },
  {
    key: 'bot-geoworldmc', idx: '06', name: 'GeoWorldMC Bot',
    url: 'discord.gg/geoworldmc', stack: 'Discord.js · Node.js · MySQL',
    sub: { es: 'Bot oficial de servidor Minecraft', en: 'Official Minecraft server bot' },
    type: { es: 'Bot · Discord', en: 'Bot · Discord' }, year: '2024',
    tag: { es: 'CASE — 06', en: 'CASE — 06' },
    status: { es: 'Online · 2024 → presente', en: 'Online · 2024 → present' },
    desc: {
      es: 'Bot oficial de Discord para la red GeoWorldMC: sistema de tickets de soporte, anuncios, moderación y conteo dinámico de jugadores conectados al servidor Minecraft en tiempo real.',
      en: 'Official Discord bot for GeoWorldMC network: support ticket system, announcements, moderation and dynamic player count from the Minecraft server in real time.',
    },
    role: { es: 'Backend · solo', en: 'Backend · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['Node.js', 'JavaScript', 'MySQL', 'Docker'],
    case: {
      problem: {
        es: 'Un servidor de Minecraft con comunidad activa necesitaba gestionar soporte de usuarios, publicar anuncios estructurados y mostrar estadísticas del servidor en tiempo real en Discord, sin depender de bots genéricos de pago.',
        en: 'A Minecraft server with an active community needed to manage user support, publish structured announcements and show real-time server stats in Discord, without depending on generic paid bots.',
      },
      approach: {
        es: 'Discord.js v14 para aprovechar las interacciones modernas (slash commands, botones, modals). Sequelize + MySQL para persistencia de tickets y datos de usuarios. Sistema de embeds configurable por variables de entorno para cambiar temas sin tocar código. Fetch al API del servidor Minecraft para conteo dinámico.',
        en: 'Discord.js v14 to leverage modern interactions (slash commands, buttons, modals). Sequelize + MySQL for ticket and user data persistence. Environment variable-based embed theming to change themes without touching code. Fetch to Minecraft server API for dynamic player count.',
      },
      highlights: {
        es: [
          'Sistema de tickets organizado con categorías y estados',
          'Publicación de anuncios con embeds estructurados',
          'Conteo dinámico de jugadores desde el servidor Minecraft',
          'Herramientas de moderación para el equipo staff',
          'Temas de embeds configurables via variables de entorno',
          'Arquitectura event-driven para slash commands y botones',
        ],
        en: [
          'Organized ticket system with categories and statuses',
          'Announcement publishing with structured embeds',
          'Dynamic player count from Minecraft server',
          'Moderation tools for staff team',
          'Configurable embed themes via environment variables',
          'Event-driven architecture for slash commands and buttons',
        ],
      },
      results: [
        { value: '+500', label: { es: 'Miembros en el servidor', en: 'Server members' } },
        { value: '24/7', label: { es: 'Uptime en producción', en: 'Production uptime' } },
        { value: '0', label: { es: 'Costo de licencia', en: 'License cost' } },
        { value: 'v14', label: { es: 'Discord.js — API más reciente', en: 'Discord.js — latest API' } },
      ],
      lessons: {
        es: 'Los bots de Discord son una excelente práctica de arquitectura event-driven. Cada interacción del usuario es un evento, y manejarlos bien requiere pensar en estados, persistencia y respuesta rápida. También que el theming configurable desde .env evita despliegues innecesarios.',
        en: 'Discord bots are great event-driven architecture practice. Every user interaction is an event, and handling them well requires thinking about states, persistence and fast response. Also that .env-based theming avoids unnecessary deployments.',
      },
    },
  },
  {
    key: 'bot-clover', idx: '07', name: 'Clover Bot',
    url: 'discord.gg/clover', stack: 'Discord.js · Node.js · MySQL',
    sub: { es: 'Bot de gestión para comunidad Discord', en: 'Management bot for Discord community' },
    type: { es: 'Bot · Discord', en: 'Bot · Discord' }, year: '2025',
    tag: { es: 'CASE — 07', en: 'CASE — 07' },
    status: { es: 'Online · 2025', en: 'Online · 2025' },
    desc: {
      es: 'Bot de Discord para Clover Creations: gestión de eventos de la comunidad, interacciones de usuarios, persistencia de datos con Sequelize y operaciones basadas en canales.',
      en: 'Discord bot for Clover Creations: community event management, user interactions, data persistence with Sequelize and channel-based operations.',
    },
    role: { es: 'Backend · solo', en: 'Backend · solo' },
    state: { es: 'En producción', en: 'In production' },
    tags: ['Node.js', 'JavaScript', 'MySQL', 'Docker'],
    case: {
      problem: {
        es: 'La comunidad Clover Creations necesitaba automatizar la gestión de eventos, interacciones con usuarios y operaciones repetitivas en Discord que consumían tiempo del equipo de moderación.',
        en: 'The Clover Creations community needed to automate event management, user interactions and repetitive Discord operations that consumed the moderation team\'s time.',
      },
      approach: {
        es: 'Discord.js v14 con comandos de slash para interacciones modernas. Sequelize ORM sobre MySQL para queries estructuradas y migraciones. Comandos modulares por dominio (eventos, usuarios, canales) para mantener el código organizado.',
        en: 'Discord.js v14 with slash commands for modern interactions. Sequelize ORM on MySQL for structured queries and migrations. Domain-modular commands (events, users, channels) to keep code organized.',
      },
      highlights: {
        es: [
          'Gestión de eventos comunitarios con CRUD completo',
          'Interacciones de usuarios con persistencia en BD',
          'Operaciones por canal con lógica de negocio',
          'Comandos slash modernos con Discord.js v14',
          'Sequelize para queries tipadas y migraciones',
        ],
        en: [
          'Community event management with full CRUD',
          'User interactions with database persistence',
          'Channel-based operations with business logic',
          'Modern slash commands with Discord.js v14',
          'Sequelize for typed queries and migrations',
        ],
      },
      results: [
        { value: '24/7', label: { es: 'Uptime en producción', en: 'Production uptime' } },
        { value: '100%', label: { es: 'Slash commands — API moderna', en: 'Slash commands — modern API' } },
        { value: '0', label: { es: 'Tareas manuales de moderación', en: 'Manual moderation tasks' } },
        { value: 'v14', label: { es: 'Discord.js', en: 'Discord.js' } },
      ],
      lessons: {
        es: 'Reutilizar la arquitectura del primer bot (GeoWorldMC) en el segundo aceleró enormemente el desarrollo. Aprendí el valor de tener patrones propios reutilizables — mi propio "boilerplate de Discord bots" ya existe sin necesidad de publicarlo.',
        en: 'Reusing the architecture from the first bot (GeoWorldMC) in the second greatly accelerated development. I learned the value of having reusable personal patterns — my own "Discord bot boilerplate" exists without needing to publish it.',
      },
    },
  },
  {
    key: 'gestion-java', idx: '08', name: 'Sistema Gestión J',
    url: 'sistema-empresa.local', stack: 'Java · Oracle DB · JDBC',
    sub: { es: 'App empresarial Java + Oracle', en: 'Enterprise app — Java + Oracle' },
    type: { es: 'Empresarial · MVC', en: 'Enterprise · MVC' }, year: '2024',
    tag: { es: 'CASE — 08', en: 'CASE — 08' },
    status: { es: 'Entregado · 2024', en: 'Delivered · 2024' },
    desc: {
      es: 'Aplicación empresarial Java con GUI Swing, conexión a Oracle Database, gestión de roles y permisos, reportes exportables y arquitectura MVC limpia.',
      en: 'Enterprise Java app with Swing GUI, Oracle Database connection, role and permission management, exportable reports and clean MVC architecture.',
    },
    role: { es: 'Backend · BD', en: 'Backend · DB' },
    state: { es: 'Entregado', en: 'Delivered' },
    tags: ['Java', 'Oracle DB'],
    case: {
      problem: {
        es: 'Una empresa local manejaba planilla de empleados, permisos y reportes en archivos Excel compartidos. Resultado: archivos corruptos, cambios sin auditoría y errores frecuentes. Necesitaban un sistema con control real, sin nube, que corriera en sus equipos Windows.',
        en: 'A local company managed payroll, permissions and reports in shared Excel files. Result: corrupted files, unaudited changes and frequent errors. They needed a real-control system, no cloud, running on their Windows machines.',
      },
      approach: {
        es: 'Java Swing para GUI nativa rápida sin necesidad de browser. Oracle Database porque ya tenían licencia. JDBC con PreparedStatements para prevenir SQL injection. Arquitectura MVC con DAOs. Auditoría completa de cambios — quién, qué y cuándo.',
        en: 'Java Swing for fast native GUI without browser. Oracle Database because they already had a license. JDBC with PreparedStatements to prevent SQL injection. MVC architecture with DAOs. Full change audit — who, what and when.',
      },
      highlights: {
        es: [
          'GUI Swing con UX pensada para usuarios no técnicos',
          'Roles: admin, supervisor, operador — permisos por módulo',
          'Auditoría completa: quién cambió qué y cuándo',
          'Reportes exportables a PDF y Excel',
          'Validación a nivel de BD con constraints y triggers',
          'Backup automático diario',
        ],
        en: [
          'Swing GUI with UX designed for non-technical users',
          'Roles: admin, supervisor, operator — per-module permissions',
          'Full audit: who changed what and when',
          'Exportable PDF and Excel reports',
          'DB-level validation with constraints and triggers',
          'Automatic daily backup',
        ],
      },
      results: [
        { value: '12', label: { es: 'Usuarios concurrentes', en: 'Concurrent users' } },
        { value: '0', label: { es: 'Pérdida de datos en 12 meses', en: 'Data loss in 12 months' } },
        { value: '8.5K', label: { es: 'Registros migrados desde Excel', en: 'Records migrated from Excel' } },
        { value: '100%', label: { es: 'Operaciones auditables', en: 'Auditable operations' } },
      ],
      lessons: {
        es: 'No todo proyecto necesita ser web — Swing fue mejor que cualquier framework moderno para este caso. También aprendí a respetar Oracle: feo y viejo, pero brutal en integridad transaccional.',
        en: 'Not every project needs to be web — Swing was better than any modern framework here. I also learned to respect Oracle: ugly and old, but brutal at transactional integrity.',
      },
    },
  },
];
