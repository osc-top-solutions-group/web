// Solution landing page data — OSC Top Solutions 2026
// 5 pillars: Cross Protection · Smart Solutions · Connectivity · Telecom Services · Managed Services

export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionPainPoint {
  title: string;
  description: string;
}

export interface SolutionValueProp {
  number: string;
  title: string;
  description: string;
}

export interface SolutionService {
  name: string;
  description: string;
  tags?: string[];
}

export interface SolutionGroup {
  groupName?: string;
  services: SolutionService[];
}

export interface SolutionData {
  slug: string;
  category: string;
  sector: string;
  color: string;

  hero: {
    headline: string;
    subheadline: string;
    stats: SolutionStat[];
    previewItems: string[];
  };

  challenge: {
    statement: string;
    painPoints: SolutionPainPoint[];
  };

  valueProps: SolutionValueProp[];

  services: SolutionGroup[];

  cta: {
    headline: string;
    description: string;
  };
}

export const solutionsData: SolutionData[] = [
  /* ─────────────────── CROSS PROTECTION ─────────────────── */
  {
    slug: "critical-infrastructure-security",
    category: "Critical Infrastructure Security",
    sector: "Ciberseguridad Convergente OT/IT",
    color: "#FF0057",

    hero: {
      headline: "Seguridad convergente que nunca interrumpe tu operación",
      subheadline:
        "Protegemos infraestructuras OT/IT críticas con una arquitectura de defensa activa que neutraliza amenazas antes de que afecten la continuidad operativa — sin detener la producción.",
      stats: [
        { value: "Zero Trust", label: "Arquitectura de acceso" },
        { value: "OT + IT", label: "Convergencia protegida" },
        { value: "24/7 SOC", label: "Monitoreo activo continuo" },
      ],
      previewItems: [
        "Gestión de terminales (TI/OT)",
        "Protección básica 4G/5G",
        "Zero Trust y Gestión de acceso",
        "Seguridad Perimetral (TI/OT)",
        "Red Automatizada de Monitoreo",
      ],
    },

    challenge: {
      statement:
        "El 78% de las brechas en infraestructura crítica se originan en entornos OT que nunca fueron diseñados para estar conectados — y la convergencia forzada los expone sin defensa.",
      painPoints: [
        {
          title: "Convergencia sin defensa",
          description:
            "OT e IT se integran por necesidad operativa, creando vectores de ataque que ninguno de los dos equipos tiene mandato de proteger.",
        },
        {
          title: "Amenazas invisibles en OT",
          description:
            "Los sistemas industriales heredados son puntos ciegos ante ataques APT que los SIEM tradicionales no fueron diseñados para detectar.",
        },
        {
          title: "Cumplimiento que paraliza",
          description:
            "Los marcos regulatorios de ciberseguridad evolucionan más rápido que la capacidad de respuesta interna, generando exposición legal y operativa.",
        },
        {
          title: "Parches que detienen la operación",
          description:
            "Cualquier intervención de seguridad en entornos críticos puede generar tiempos de inactividad no planificados con impacto directo en el EBITDA.",
        },
      ],
    },

    valueProps: [
      {
        number: "01",
        title: "Zero Trust sin fricción operativa",
        description:
          "Acceso basado en identidad verificada y contexto de sesión, sin impactar la usabilidad de los equipos de campo ni los sistemas de control industrial.",
      },
      {
        number: "02",
        title: "Visibilidad OT/IT unificada",
        description:
          "Una consola de gestión que integra endpoints, tráfico de red, aplicaciones corporativas y sistemas SCADA en un único panel de visibilidad y respuesta.",
      },
      {
        number: "03",
        title: "Contención automatizada",
        description:
          "Respuesta orquestada ante amenazas en segundos, con playbooks definidos que contienen incidentes sin requerir intervención manual ni detener la operación.",
      },
    ],

    services: [
      {
        services: [
          {
            name: "Gestión de terminales (TI/OT)",
            description:
              "Control centralizado de dispositivos corporativos e industriales con visibilidad de estado, cumplimiento y respuesta ante comportamientos anómalos.",
            tags: ["EDR", "MDM", "OT Security"],
          },
          {
            name: "Protección básica 4G/5G",
            description:
              "Defensa nativa sobre redes móviles privadas: inspección de tráfico, segmentación y detección de amenazas en el core de la red celular.",
            tags: ["Mobile Security", "Core Protection"],
          },
          {
            name: "Zero Trust y Gestión de acceso",
            description:
              "Arquitectura de acceso mínimo privilegiado con autenticación multifactor, microsegmentación y control granular basado en identidad y contexto.",
            tags: ["ZTA", "IAM", "MFA"],
          },
          {
            name: "Seguridad Perimetral (TI/OT)",
            description:
              "Firewalls de próxima generación, IDS/IPS y sistemas de inspección profunda de paquetes diseñados para entornos convergentes de alta criticidad.",
            tags: ["NGFW", "IDS/IPS", "DPI"],
          },
          {
            name: "Red Automatizada de Monitoreo",
            description:
              "Centro de operaciones de seguridad (SOC) 24/7 con detección de amenazas basada en comportamiento, correlación de eventos y respuesta orquestada.",
            tags: ["SOC 24/7", "SIEM", "SOAR"],
          },
        ],
      },
    ],

    cta: {
      headline: "¿Tu infraestructura crítica está realmente protegida?",
      description:
        "Realizamos una evaluación de madurez de ciberseguridad OT/IT sin costo para identificar brechas reales antes de que lo haga un atacante.",
    },
  },

  /* ─────────────────── SMART SOLUTIONS ─────────────────── */
  {
    slug: "ai-powered-operations",
    category: "AI-Powered Operations",
    sector: "Inteligencia Operativa y Video Analítica",
    color: "#FF0057",

    hero: {
      headline: "Inteligencia visual y operativa que previene, no solo registra",
      subheadline:
        "Convertimos cámaras, sensores y activos físicos en fuentes de inteligencia accionable mediante plataformas SISE que unifican visibilidad, analítica con IA y respuesta operativa en tiempo real.",
      stats: [
        { value: "SISE", label: "Plataforma de inteligencia integrada" },
        { value: "Real-time", label: "Detección y respuesta" },
        { value: "AI-powered", label: "Analítica avanzada" },
      ],
      previewItems: [
        "Videovigilancia con IA",
        "Control de Acceso",
        "Gemelos Digitales",
        "Seguimiento de Activos",
        "Comunicaciones PTT/PTV",
        "Análisis de Video Avanzado",
        "Plataformas de Seguridad Ciudadana",
        "Monitoreo de personal en campo",
      ],
    },

    challenge: {
      statement:
        "Las operaciones críticas generan volúmenes de datos que ningún equipo humano puede procesar manualmente — y cada evento no detectado tiene un costo medible en seguridad, productividad o vidas.",
      painPoints: [
        {
          title: "Cámaras que solo graban",
          description:
            "Video instalado que solo sirve para investigar después del incidente, no para prevenirlo. La reactividad tiene un costo operativo y de reputación inaceptable.",
        },
        {
          title: "Datos sin análisis útil",
          description:
            "Sensores e IoT que generan terabytes de datos que nadie analiza en tiempo real, perdiendo la oportunidad de intervención temprana.",
        },
        {
          title: "Activos sin trazabilidad",
          description:
            "Personal, vehículos y equipos que desaparecen del radar operativo en campo, imposibilitando la gestión proactiva de recursos.",
        },
        {
          title: "Centros de mando fragmentados",
          description:
            "Múltiples sistemas de video, comunicaciones y despacho que no se integran, obligando a operadores a trabajar en silos que retrasan la respuesta.",
        },
      ],
    },

    valueProps: [
      {
        number: "01",
        title: "Video analítico con IA en tiempo real",
        description:
          "Detección automática de eventos: intrusiones, comportamientos anómalos, reconocimiento de matrículas y análisis de multitudes sin revisar horas de grabación.",
      },
      {
        number: "02",
        title: "Gemelos digitales de activos críticos",
        description:
          "Representación digital en tiempo real de activos físicos para optimización continua, mantenimiento predictivo y simulación de escenarios sin interrumpir la operación.",
      },
      {
        number: "03",
        title: "Centro de comando unificado",
        description:
          "Un único punto de control que integra video, IoT, comunicaciones PTT/PTV y despacho, eliminando los silos que retrasan la respuesta ante eventos críticos.",
      },
    ],

    services: [
      {
        services: [
          {
            name: "Videovigilancia inteligente",
            description:
              "Sistemas de cámaras con analítica embebida para detección de eventos, reconocimiento facial, análisis de multitudes y alertas automáticas en tiempo real.",
            tags: ["AI Video", "Analytics", "CCTV"],
          },
          {
            name: "Control de Acceso",
            description:
              "Gestión de acceso físico y digital integrada: biometría, tarjetas inteligentes, control de visitas y trazabilidad de movimientos en instalaciones críticas.",
            tags: ["Biometría", "PACS", "Integración"],
          },
          {
            name: "Gemelos Digitales",
            description:
              "Réplicas digitales de activos e instalaciones para monitoreo continuo, optimización de procesos y planificación de mantenimiento sin interrupciones operativas.",
            tags: ["Digital Twin", "IoT", "Simulación"],
          },
          {
            name: "Seguimiento de Activos",
            description:
              "Trazabilidad en tiempo real de equipos, vehículos y personal mediante IoT, RFID y redes privadas, integrado con sistemas ERP y plataformas de gestión.",
            tags: ["RTLS", "IoT", "GPS"],
          },
          {
            name: "Comunicaciones Operativas (PTT/PTV)",
            description:
              "Comunicaciones push-to-talk y push-to-video sobre redes LTE/5G privadas para coordinación operativa segura entre equipos de campo y centros de mando.",
            tags: ["PTT", "PTV", "MCPTT"],
          },
          {
            name: "Optimización del tráfico IP",
            description:
              "Gestión inteligente del ancho de banda para priorizar tráfico crítico de video y comunicaciones sobre redes convergentes.",
            tags: ["QoS", "SD-WAN", "Traffic Shaping"],
          },
          {
            name: "Plataformas de Seguridad Ciudadana",
            description:
              "Ecosistemas C4i/C5 que integran video analítica, bases de datos policiales, comunicaciones de emergencia y despacho en un único centro de mando.",
            tags: ["C4i", "C5", "PSAP"],
          },
          {
            name: "Centros de datos modulares",
            description:
              "Infraestructura de cómputo desplegable en campo para procesamiento de datos en el edge, ideal para ubicaciones remotas sin conectividad garantizada.",
            tags: ["Edge Computing", "Modular DC"],
          },
          {
            name: "Monitoreo del personal de campo",
            description:
              "Soluciones de telemetría personal con dispositivos wearable para seguimiento de posición, detección de caídas y comunicación de emergencia en zonas de riesgo.",
            tags: ["Wearable", "Personal Safety", "IoT"],
          },
        ],
      },
    ],

    cta: {
      headline: "Tu operación ya genera los datos. Solo falta la inteligencia.",
      description:
        "Evaluamos tu infraestructura actual de video y datos para identificar cómo activar analítica real sin reemplazar lo que ya tienes.",
    },
  },

  /* ─────────────────── CONNECTIVITY SOLUTIONS ─────────────────── */
  {
    slug: "connectivity-solutions",
    category: "Connectivity Solutions",
    sector: "Redes Críticas Multi-Tecnología",
    color: "#FF0057",

    hero: {
      headline: "Conectividad garantizada donde la fibra no llega",
      subheadline:
        "Diseñamos, desplegamos y operamos redes de telecomunicaciones que conectan infraestructuras críticas en cualquier entorno geográfico, con redundancia automática y alta disponibilidad contractualmente garantizada.",
      stats: [
        { value: "99.99%", label: "Uptime garantizado" },
        { value: "16 países", label: "Presencia operativa LATAM" },
        { value: "Multi-tech", label: "4G/5G · microondas · satélite · fibra" },
      ],
      previewItems: [
        "Redes 4G y 5G Privadas",
        "Microondas (licenciado y libre)",
        "IP / MPLS / Segment Routing",
        "Tránsito IP y Transporte de Datos",
        "IoT Celular",
        "Redes ópticas (DWDM/OTN)",
        "Ethernet Industrial",
        "Conectividad Satelital Multi-Órbita",
      ],
    },

    challenge: {
      statement:
        "La conectividad ya no es infraestructura de soporte — es el sistema nervioso de cada operación crítica. Cuando falla, todo falla: producción, seguridad, datos y comunicaciones.",
      painPoints: [
        {
          title: "Zonas sin cobertura comercial",
          description:
            "Operaciones en geografías remotas o adversas donde ningún operador comercial llega, obligando a soluciones costosas e ineficientes.",
        },
        {
          title: "Dependencia de un solo proveedor",
          description:
            "Una única tecnología de transporte equivale a un único punto de falla. La resiliencia exige múltiples caminos y tecnologías desde el diseño.",
        },
        {
          title: "Latencia inaceptable",
          description:
            "Aplicaciones críticas de control, video y comunicaciones que no toleran demoras de milisegundos ni variaciones de jitter.",
        },
        {
          title: "Escalabilidad reactiva",
          description:
            "Infraestructura que crece en respuesta a crisis en lugar de anticipar la demanda, generando costos de emergencia y riesgos operativos.",
        },
      ],
    },

    valueProps: [
      {
        number: "01",
        title: "Multi-tecnología desde el diseño",
        description:
          "Integramos 4G/5G, microondas, satélite, fibra óptica y MPLS en una única arquitectura de red resiliente, con failover automático entre tecnologías sin intervención manual.",
      },
      {
        number: "02",
        title: "Alta disponibilidad garantizada",
        description:
          "Diseño con redundancia N+1 y failover en segundos entre tecnologías de transporte. SLA de 99.99% respaldado por nuestros centros NOC 24/7 en la región.",
      },
      {
        number: "03",
        title: "Cobertura sin límites geográficos",
        description:
          "Presencia operativa en 16 países de LATAM con capacidad de despliegue en zonas remotas, minas, puertos, fronteras y entornos industriales sin infraestructura previa.",
      },
    ],

    services: [
      {
        services: [
          {
            name: "Redes 4G y 5G Privadas",
            description:
              "Redes móviles privadas LTE/5G Stand Alone con cobertura de sitio, con total autonomía de la red pública y SLA garantizado para comunicaciones críticas.",
            tags: ["LTE", "5G SA", "CBRS"],
          },
          {
            name: "Redes de microondas (licenciadas y libres)",
            description:
              "Backhaul microondas de alta capacidad en bandas licenciadas y libres para interconexión de sitios remotos donde la fibra no es viable económica o técnicamente.",
            tags: ["MW", "E-band", "70/80 GHz"],
          },
          {
            name: "Redes IP / MPLS / Segment Routing",
            description:
              "Backbone de transporte con QoS garantizado por clase de servicio, soporte para VPNs empresariales y gestión centralizada de tráfico con alta disponibilidad.",
            tags: ["MPLS", "SR-MPLS", "BGP"],
          },
          {
            name: "Tránsito IP y Transporte de Datos",
            description:
              "Servicios de tránsito IP de alta capacidad y baja latencia, con peering regional estratégico para garantizar la mejor ruta hacia Internet y nubes públicas.",
            tags: ["IX", "Peering", "CDN"],
          },
          {
            name: "IoT Celular",
            description:
              "Conectividad masiva para dispositivos IoT mediante NB-IoT, LTE-M y 5G, con gestión centralizada de SIMs, consumo y diagnóstico desde una plataforma única.",
            tags: ["NB-IoT", "LTE-M", "eSIM"],
          },
          {
            name: "Redes ópticas (DWDM/OTN)",
            description:
              "Transmisión de altísima capacidad en fibra óptica para backbone troncal, con multiplexación DWDM y gestión OTN para máxima eficiencia espectral.",
            tags: ["DWDM", "OTN", "C-band"],
          },
          {
            name: "Ethernet Industrial",
            description:
              "Redes Ethernet robustas para entornos industriales con soporte de temperatura extendida, redundancia de enlace y compatibilidad con protocolos ICS/SCADA.",
            tags: ["IIoT", "PROFINET", "EtherNet/IP"],
          },
          {
            name: "Conectividad Satelital Multi-Órbita",
            description:
              "Soluciones satelitales LEO, MEO y GEO para garantizar conectividad de respaldo o primaria en ubicaciones sin otra alternativa de transporte viable.",
            tags: ["LEO", "Starlink", "VSAT"],
          },
        ],
      },
    ],

    cta: {
      headline: "Ninguna geografía debería limitar tu operación crítica.",
      description:
        "Evaluamos tu arquitectura actual de conectividad e identificamos brechas de resiliencia antes de que se conviertan en incidentes operativos.",
    },
  },

  /* ─────────────────── TELECOM SERVICES ─────────────────── */
  {
    slug: "telecom-services",
    category: "Telecom Services",
    sector: "Ingeniería y Operación de Redes",
    color: "#FF0057",

    hero: {
      headline: "Del diseño al uptime: el ciclo completo de tu red",
      subheadline:
        "Acompañamos a operadores e infraestructuras críticas en cada etapa del ciclo de vida de su red — diseño, ingeniería de detalle, despliegue, auditoría y operación continua con un único punto de responsabilidad.",
      stats: [
        { value: "130K+", label: "Actividades NOC anuales" },
        { value: "ISO 9001", label: "Certificación de calidad" },
        { value: "End-to-end", label: "Del diseño a la operación" },
      ],
      previewItems: [
        "Operación de red (NOC)",
        "Diseño de red",
        "Ingeniería de Detalle",
        "Adecuaciones civiles",
        "Auditorías de proyectos",
        "Documentación As-Built",
        "Viabilidad y estudios de sitio",
        "Auditoría de Calidad 4G/5G",
        "Instalación HW/SW especializado",
        "Despliegue Fibra óptica (Troncal & Acceso)",
      ],
    },

    challenge: {
      statement:
        "Un despliegue sin un integrador end-to-end responsable es un SLA incumplido esperando ocurrir. El time-to-market perdido en telecomunicaciones no regresa — y la competencia no espera.",
      painPoints: [
        {
          title: "Proyectos sin responsable único",
          description:
            "Cuando el diseño, el despliegue y la operación son de distintos proveedores, los errores generan disputas interminables sin que nadie asuma la responsabilidad total.",
        },
        {
          title: "Calidad sin medición continua",
          description:
            "Redes desplegadas sin auditoría posterior que degradan la experiencia silenciosamente hasta que el churn ya es un hecho consumado.",
        },
        {
          title: "NOC interno insostenible",
          description:
            "Centros de operaciones internos que consumen recursos desproporcionados e incapaces de escalar ante picos de demanda o expansión de red.",
        },
        {
          title: "Infraestructura sin documentación",
          description:
            "Redes sin as-built actualizado que convierten cada mantenimiento en exploración, multiplicando los tiempos de resolución y el riesgo de incidentes.",
        },
      ],
    },

    valueProps: [
      {
        number: "01",
        title: "Un único punto de responsabilidad",
        description:
          "Diseñamos, desplegamos, auditamos y operamos tu red. Si algo falla, un solo partner responde — sin excusas de interfaz entre proveedores ni brechas contractuales.",
      },
      {
        number: "02",
        title: "NOC 24/7 certificado ISO 9001",
        description:
          "Centro de operaciones de red con gestión de más de 130,000 actividades anuales, tiempos de respuesta contractualmente garantizados y dashboard de estado en tiempo real.",
      },
      {
        number: "03",
        title: "Auditoría y mejora continua",
        description:
          "Pruebas de rendimiento, auditoría de calidad 4G/5G, análisis de KPIs de red y planes de optimización continua para maximizar el retorno de la infraestructura desplegada.",
      },
    ],

    services: [
      {
        groupName: "Planificación y Diseño",
        services: [
          {
            name: "Diseño de red",
            description:
              "Arquitectura técnica de redes de acceso, transporte y core, dimensionada para los objetivos de cobertura, capacidad y SLA del cliente.",
            tags: ["RF Design", "Transmission", "Core Planning"],
          },
          {
            name: "Ingeniería de Detalle",
            description:
              "Ingeniería civil y electromecánica de detalle para sitios de telecomunicaciones, con planos, memorias de cálculo y especificaciones de materiales.",
            tags: ["Civil", "Electromecánica", "Estructural"],
          },
          {
            name: "Viabilidad y estudios de sitio",
            description:
              "Evaluación de candidatos de sitio, estudios de viabilidad técnica, levantamiento topográfico y análisis de interferencias para nuevos despliegues.",
            tags: ["Site Survey", "RF Scan", "Topo"],
          },
        ],
      },
      {
        groupName: "Despliegue y Construcción",
        services: [
          {
            name: "Instalación de HW/SW especializado",
            description:
              "Integración y puesta en marcha de equipos activos de radio, transmisión, core y seguridad de los principales fabricantes del mercado.",
            tags: ["Ericsson", "Nokia", "Huawei", "Cisco"],
          },
          {
            name: "Adecuaciones civiles",
            description:
              "Construcción y adecuación de infraestructura pasiva: torres, shelters, sistemas de energía, aire acondicionado y puesta a tierra.",
            tags: ["Torres", "Shelter", "Energía"],
          },
          {
            name: "Despliegue de Fibra óptica (Troncal & Acceso)",
            description:
              "Tendido de fibra óptica aérea, subterránea y de acceso con fusiones, certificación OTDR y documentación as-built completa.",
            tags: ["FTTH", "FTTO", "FTTB", "OTDR"],
          },
        ],
      },
      {
        groupName: "Operación y Aseguramiento",
        services: [
          {
            name: "Operación de la red (NOC)",
            description:
              "Centro de operaciones 24/7 con monitoreo proactivo, gestión de incidentes, cambios y problemas bajo estándares ITIL y certificación ISO 9001.",
            tags: ["NOC 24/7", "ITIL", "ISO 9001"],
          },
          {
            name: "Auditorías de proyectos",
            description:
              "Revisión independiente de calidad de despliegues: verificación de cumplimiento de especificaciones, KPIs de red y condiciones contractuales.",
            tags: ["QA", "Drive Test", "Walktest"],
          },
          {
            name: "Auditoría de Calidad 4G/5G y Pruebas de rendimiento",
            description:
              "Medición de KPIs de red, drive tests, pruebas de throughput y latencia, análisis de interferencias y recomendaciones de optimización.",
            tags: ["KPI", "TEMS", "NetScope"],
          },
          {
            name: "Documentación As-Built",
            description:
              "Generación y actualización de documentación técnica de toda la infraestructura desplegada, incluyendo planos, inventario y configuraciones de red.",
            tags: ["GIS", "BIM", "CMDB"],
          },
        ],
      },
    ],

    cta: {
      headline: "¿Quién responde cuando tu red falla a las 3 AM?",
      description:
        "Diseñamos el modelo de operación y soporte que tu infraestructura necesita — con SLA que se cumplen y un NOC que nunca duerme.",
    },
  },

  /* ─────────────────── MANAGED SERVICES ─────────────────── */
  {
    slug: "managed-operations",
    category: "Managed Operations",
    sector: "BPO · Workforce · Operaciones Gestionadas",
    color: "#FF0057",

    hero: {
      headline: "Escala tu operación sin escalar tu equipo",
      subheadline:
        "Transformamos la complejidad de gestionar talento especializado y operaciones técnicas en ventaja competitiva — con servicios administrados que se adaptan a tu demanda sin carga administrativa.",
      stats: [
        { value: "NOC + SOC", label: "Operaciones críticas gestionadas" },
        { value: "BPO + WFM", label: "Servicios de talento y procesos" },
        { value: "On-demand", label: "Escalabilidad inmediata" },
      ],
      previewItems: [
        "Gestión Integral de Talento",
        "Personal Técnico Especializado",
        "NOC y SOC como servicio",
        "PMO (Gestión de Proyectos)",
        "Soporte TI y Smart Support",
        "Contact Center as a Service",
        "Logística y logística inversa",
        "Administración de nómina",
      ],
    },

    challenge: {
      statement:
        "La escasez de talento técnico especializado en telecomunicaciones e infraestructura crítica no es una crisis temporal — es el nuevo estado normal, y el costo de gestionarlo internamente crece cada año.",
      painPoints: [
        {
          title: "Talento técnico escaso y costoso",
          description:
            "Perfiles de ingeniería de red, ciberseguridad y sistemas críticos que tardan meses en encontrar, incorporar y retener — con rotación que destruye el know-how acumulado.",
        },
        {
          title: "Costos fijos para demanda variable",
          description:
            "Nóminas diseñadas para el pico máximo que generan ineficiencia estructural en temporadas bajas, con rigidez que impide la adaptación al mercado.",
        },
        {
          title: "NOC/SOC imposibles de sostener",
          description:
            "Centros de operaciones internos que consumen infraestructura, herramientas y personal especializado 24/7 — con un costo que raramente justifica la escala.",
        },
        {
          title: "Proyectos sin gestión profesional",
          description:
            "Despliegues críticos gestionados sin PMO estructurada que acumulan retrasos, sobrecostos y entregables incompletos que nadie documenta ni audita.",
        },
      ],
    },

    valueProps: [
      {
        number: "01",
        title: "Workforce on-demand sin carga administrativa",
        description:
          "Personal técnico especializado activado según tu demanda real, con incorporación, gestión de desempeño y administración de nómina completamente externalizadas.",
      },
      {
        number: "02",
        title: "BPO operacional con SLA garantizado",
        description:
          "NOC, SOC, PMO, Mesa de Ayuda y soporte TI como servicio gestionado, con KPIs contractuales, reportería continua y un solo punto de contacto para toda la operación.",
      },
      {
        number: "03",
        title: "Transformación sin disrupción",
        description:
          "Transición ordenada hacia modelo de operación gestionada con plan de transferencia de conocimiento, período de estabilización y continuidad total del servicio.",
      },
    ],

    services: [
      {
        groupName: "Workforce Management",
        services: [
          {
            name: "Gestión Integral de Talento",
            description:
              "Selección, contratación, incorporación, evaluación de desempeño y desvinculación de perfiles técnicos especializados con total cobertura administrativa.",
            tags: ["Reclutamiento", "Onboarding", "Performance"],
          },
          {
            name: "Personal Técnico Especializado",
            description:
              "Provisión de ingenieros de red, técnicos de campo, analistas de seguridad y perfiles TI por proyecto, tiempo parcial o dedicación completa.",
            tags: ["Staff Augmentation", "Nearshore", "Field Tech"],
          },
          {
            name: "Administración de personal",
            description:
              "Gestión completa de nómina, beneficios, cumplimiento laboral y coordinación con el área de RRHH del cliente sin carga operativa interna.",
            tags: ["Payroll", "Compliance", "RRHH"],
          },
        ],
      },
      {
        groupName: "BPO Services",
        services: [
          {
            name: "Centros de Operaciones (NOC y SOC)",
            description:
              "Tercerización completa de NOC (monitoreo de red) y SOC (seguridad), con Mesa de Ayuda integrada y gestión de incidentes bajo ITIL.",
            tags: ["NOC", "SOC", "Help Desk"],
          },
          {
            name: "Gestión de Proyectos (PMO)",
            description:
              "Oficina de gestión de proyectos con planificación, seguimiento, reportería ejecutiva, auditorías de servicio y supervisión de nodos en campo.",
            tags: ["PMO", "Agile", "PMP"],
          },
          {
            name: "Soporte TI y Smart Support",
            description:
              "Soporte técnico de primer, segundo y tercer nivel con base de conocimiento, gestión de activos y desarrollo de software a medida.",
            tags: ["L1/L2/L3", "ITSM", "Dev"],
          },
          {
            name: "Operaciones en Sitio",
            description:
              "Servicios de logística directa e inversa, gestión de almacén, entrega de equipos y administración de acceso a sitios de telecomunicaciones.",
            tags: ["Logística", "Reverse Logistics", "Site Access"],
          },
          {
            name: "Servicios Corporativos",
            description:
              "Contact Center como Servicio (CCaaS) y gestión de gastos corporativos de tecnología con reporting de consumo y optimización de costos.",
            tags: ["CCaaS", "Expense Mgmt"],
          },
        ],
      },
    ],

    cta: {
      headline: "Opera más con menos fricción interna.",
      description:
        "Evaluamos tu modelo operativo actual y diseñamos el esquema de servicios gestionados que libera a tu equipo para enfocarse en lo estratégico.",
    },
  },
];

export function getSolution(slug: string): SolutionData | undefined {
  return solutionsData.find((s) => s.slug === slug);
}
