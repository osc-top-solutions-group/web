// Industry landing page data — sourced from Deck Comercial OSC 2026

export interface IndustrySolution {
  category: string;
  capabilities: string[];
}

export interface IndustryValueProp {
  title: string;
  description: string;
}

export interface IndustryCaseStudy {
  location: string;
  headline: string;
  description: string;
  metric?: string;
}

export interface IndustryPainStat {
  value: string;
  label: string;
  context: string;
}

export interface IndustrySegment {
  segment: string;
  stat: string;
  statLabel: string;
  description: string;
  challenges: string[];
}

export interface IndustryResource {
  title: string;
  description: string;
  type: "whitepaper" | "guia" | "reporte";
  tag: string;
  href?: string; // optional internal link — when set, card navigates to this page instead of selecting for download
}

export interface IndustryData {
  slug: string;
  name: string;
  sector: string;
  color: string;
  colorAlt: string;

  hero: {
    headline: string;
    subheadline: string;
    stats: { value: string; label: string }[];
  };

  challenge: {
    quote: string;
    context: string;
  };

  painStats: IndustryPainStat[];

  priority: {
    label: string;
    headline: string;
    description: string;
  };

  segmentation: IndustrySegment[];

  valueProps: IndustryValueProp[];

  solutions: IndustrySolution[];

  caseStudies: IndustryCaseStudy[];

  resources: IndustryResource[];
}

export const industries: IndustryData[] = [
  /* ─────────────────────── POWER UTILITIES ─────────────────────── */
  {
    slug: "power-utilities",
    name: "Power Utilities",
    sector: "Sector Eléctrico",
    color: "#FF0057",
    colorAlt: "#0F172A",

    hero: {
      headline: "Resiliencia para el corazón de la infraestructura nacional",
      subheadline:
        "Garantizamos la continuidad del suministro eléctrico con visibilidad total de activos, comunicaciones de misión crítica y ciberseguridad convergente OT/IT.",
      stats: [
        { value: "99.99%", label: "Uptime de red garantizado" },
        { value: "24/7", label: "Monitoreo NOC activo" },
        { value: "30+", label: "Años en infraestructura crítica" },
      ],
    },

    challenge: {
      quote:
        "La falta de visibilidad y control sobre activos críticos no es solo una deficiencia técnica; representa un impacto directo en la estabilidad del sistema nacional, el cumplimiento regulatorio y la seguridad de las personas.",
      context:
        "Las distribuidoras y generadoras eléctricas operan bajo presión regulatoria permanente. Cada evento no detectado a tiempo puede escalar a cortes masivos, multas y pérdida de concesiones. La brecha entre los sistemas OT y IT tradicionales deja puntos ciegos que los actores maliciosos explotan.",
    },

    painStats: [
      {
        value: "60%",
        label: "de utilities en LATAM reportaron al menos 1 incidente OT/IT crítico en 2024",
        context: "Brecha OT/IT sin resolver",
      },
      {
        value: "$2.8M",
        label: "costo promedio por corte no planificado, incluyendo multas regulatorias",
        context: "Impacto financiero directo",
      },
      {
        value: "43%",
        label: "de los ataques a infraestructura crítica en LATAM apuntan al sector energético",
        context: "Exposición cibernética",
      },
    ],

    priority: {
      label: "Prioridad OSC",
      headline: "Resiliencia de Infraestructura Crítica",
      description:
        "Aseguramos la continuidad del servicio y la capacidad de respuesta inmediata ante eventos críticos, optimizando las operaciones de red eléctrica con visibilidad end-to-end.",
    },

    segmentation: [
      {
        segment: "Generadoras",
        stat: "99.99%",
        statLabel: "disponibilidad requerida bajo SLA regulatorio",
        description:
          "Las plantas de generación operan bajo compromisos contractuales exigentes. Un evento de ciberseguridad o fallo de comunicación puede costar millones en penalidades y pérdida de despacho.",
        challenges: [
          "Visibilidad de activos de generación en tiempo real con analítica predictiva",
          "Protección de SCADA, DCS y sistemas de control industrial",
          "Comunicaciones de backup entre plantas y centro nacional de despacho",
        ],
      },
      {
        segment: "Distribuidoras",
        stat: "30+",
        statLabel: "indicadores regulatorios a gestionar (SAIDI, SAIFI, CAIDI)",
        description:
          "Sin trazabilidad total de la red de distribución, el cumplimiento regulatorio se vuelve imposible. Los sistemas heredados no dan visibilidad de subestaciones ni última milla.",
        challenges: [
          "Monitoreo automático de subestaciones y líneas de media/baja tensión",
          "Smart metering y telemedición AMI con integración MDMS",
          "Reducción de pérdidas técnicas y comerciales mediante detección temprana",
        ],
      },
      {
        segment: "Transmisoras",
        stat: "0",
        statLabel: "tolerancia a interrupciones en interconexión nacional",
        description:
          "Las líneas de transmisión interconectan subestaciones críticas de alto voltaje. La ausencia de backhaul resiliente y ciberseguridad convergente representa riesgo sistémico.",
        challenges: [
          "Backhaul microondas/fibra resiliente entre subestaciones de transmisión",
          "Protección de sistemas de protección y control (IEC 61850)",
          "Monitoreo de activos en líneas de larga distancia con geo-referenciación",
        ],
      },
    ],

    valueProps: [
      {
        title: "Visibilidad Total de Subestaciones",
        description:
          "Plataformas SISE que detectan eventos anómalos en subestaciones y líneas de distribución antes de que escalen a incidentes mayores.",
      },
      {
        title: "Smart Grid y Smart Metering",
        description:
          "IoT de alta disponibilidad para medición inteligente y control distribuido de activos eléctricos en tiempo real.",
      },
      {
        title: "Ciberseguridad OT/IT Convergente",
        description:
          "Defensa activa contra amenazas que podrían comprometer el suministro eléctrico, sin interrumpir las operaciones en curso.",
      },
      {
        title: "Comunicaciones de Misión Crítica",
        description:
          "Redes privadas LTE/5G con baja latencia para equipos de campo en zonas remotas y conectividad de backup entre subestaciones.",
      },
    ],

    solutions: [
      {
        category: "Sistemas Inteligentes (SISE)",
        capabilities: [
          "Visibilidad en subestaciones y líneas para detectar eventos anómalos.",
          "Integración con sistemas SCADA y analítica de video en tiempo real.",
          "Detección temprana de incidentes antes de que escalen a cortes masivos.",
        ],
      },
      {
        category: "Conectividad IoT de alta disponibilidad",
        capabilities: [
          "Medición inteligente y control de activos distribuidos (Smart Grid).",
          "Telemedición AMI y control remoto de activos eléctricos.",
          "Conectividad de alta disponibilidad para activos en zonas remotas.",
        ],
      },
      {
        category: "Transporte inalámbrico para infraestructura",
        capabilities: [
          "Respaldo de conectividad para interconectar subestaciones.",
          "Backhaul microondas resiliente ante fallos de fibra.",
          "Redes de alta disponibilidad en entornos sin infraestructura fija.",
        ],
      },
      {
        category: "Infraestructura fija de datos",
        capabilities: [
          "Comunicaciones críticas entre activos eléctricos y centros de operación.",
          "Redes IP/MPLS con QoS garantizado para tráfico crítico.",
          "Fibra óptica troncal y de acceso para operaciones distribuidas.",
        ],
      },
      {
        category: "Ciberseguridad para entornos críticos",
        capabilities: [
          "Defensa contra amenazas que comprometan el suministro eléctrico.",
          "Zero Trust para redes OT/IT convergentes sin interrumpir operaciones.",
          "Protección de SCADA y sistemas de control industrial.",
        ],
      },
      {
        category: "Plataformas Operativas para misión crítica",
        capabilities: [
          "Respuesta rápida basada en información confiable de campo.",
          "Dashboards unificados de gestión de incidentes y cumplimiento regulatorio.",
          "Centros NOC/SOC con visibilidad end-to-end de la red eléctrica.",
        ],
      },
      {
        category: "Redes móviles privadas y de misión crítica",
        capabilities: [
          "Comunicaciones de baja latencia para entornos remotos.",
          "Redes LTE/5G privadas para equipos de campo en zonas sin cobertura.",
          "PTT/PTV para coordinación operativa segura entre activos.",
        ],
      },
    ],

    caseStudies: [
      {
        location: "Colombia",
        headline: "Plataforma OT/IT convergente para distribuidora eléctrica nacional",
        description:
          "Implementamos una plataforma de monitoreo convergente para una de las principales distribuidoras eléctricas de Colombia, integrando subestaciones, centros de despacho y sistemas SCADA con visibilidad unificada y ciberseguridad activa.",
        metric: "99.99% uptime garantizado",
      },
      {
        location: "Perú",
        headline: "Red LTE privada para comunicaciones de campo en zona remota",
        description:
          "Diseñamos e implementamos una red LTE privada para garantizar comunicaciones de misión crítica entre subestaciones y equipos de campo en una zona sin cobertura comercial, reduciendo los tiempos de respuesta ante eventos eléctricos críticos.",
        metric: "100% cobertura zona sin red",
      },
    ],

    resources: [
      {
        title: "Ciberseguridad Convergente OT/IT para Utilities Eléctricas",
        description:
          "Framework práctico para implementar arquitecturas Zero Trust en entornos SCADA/ICS sin interrumpir operaciones de suministro eléctrico.",
        type: "guia",
        tag: "Ciberseguridad OT",
        href: "/guias/ciberseguridad-convergente-ot-it-utilities",
      },
      {
        title: "Smart Grid y Conectividad IoT en LATAM",
        description:
          "Análisis técnico de tecnologías de telemetría, AMI y comunicaciones para redes de distribución modernas en América Latina.",
        type: "whitepaper",
        tag: "Smart Grid",
        href: "/guias/smart-grid-conectividad-iot-latam",
      },
    ],
  },

  /* ─────────────────────── ENERGÍA & MINERÍA ─────────────────────── */
  {
    slug: "energia-mineria",
    name: "Energía & Minería",
    sector: "Recursos Naturales",
    color: "#FF0057",
    colorAlt: "#0F172A",

    hero: {
      headline: "Seguridad y productividad autónoma en los entornos más hostiles",
      subheadline:
        "Conectamos y protegemos operaciones mineras y energéticas en geografías remotas con redes privadas LTE/5G, inteligencia de video y automatización predictiva.",
      stats: [
        { value: "12+", label: "Redes LTE/5G implementadas en LATAM" },
        { value: "100%", label: "Cobertura en zonas sin infraestructura" },
        { value: "24/7", label: "Monitoreo de activos remotos" },
      ],
    },

    challenge: {
      quote:
        "En entornos geográficos adversos, la falta de comunicación puede generar riesgos significativos y tiempos de inactividad no planificados que impactan negativamente el EBITDA.",
      context:
        "Las operaciones mineras y de oil & gas enfrentan el triple desafío de la seguridad del personal, la continuidad operativa y la productividad en zonas remotas. La ausencia de conectividad confiable obliga a decisiones con información incompleta, multiplicando los riesgos y los costos.",
    },

    painStats: [
      {
        value: "23%",
        label: "del tiempo no planificado en minas se origina en fallos de conectividad",
        context: "Impacto directo en producción",
      },
      {
        value: "$180K",
        label: "costo estimado por hora de parada en una operación a cielo abierto",
        context: "EBITDA en riesgo",
      },
      {
        value: "65%",
        label: "de operaciones mineras en LATAM sin telemetría de activos en tiempo real",
        context: "Punto ciego operativo",
      },
    ],

    priority: {
      label: "Prioridad OSC",
      headline: "Seguridad y Productividad Autónoma",
      description:
        "Garantizamos la seguridad total del personal y maximizamos la productividad de los activos mediante una resiliencia tecnológica fortalecida, incluso en las geografías más adversas de la región.",
    },

    segmentation: [
      {
        segment: "Minas a Cielo Abierto",
        stat: "5km+",
        statLabel: "radio de cobertura típico sin infraestructura fija",
        description:
          "Las operaciones a cielo abierto requieren cobertura inalámbrica total para maquinaria pesada, personal y sistemas de control distribuidos en extensiones de varios kilómetros.",
        challenges: [
          "Cobertura LTE/5G privada en todo el perímetro operativo sin puntos muertos",
          "Videovigilancia con IA para seguridad de personal y detección de intrusiones",
          "Control remoto de maquinaria pesada con baja latencia garantizada",
        ],
      },
      {
        segment: "Operaciones Subterráneas",
        stat: "0s",
        statLabel: "latencia máxima aceptable en comunicaciones de emergencia",
        description:
          "En entornos subterráneos, la comunicación es una cuestión de vida o muerte. Los sistemas heredados de radio analógico no ofrecen la resiliencia ni la funcionalidad que las operaciones modernas requieren.",
        challenges: [
          "Cobertura indoor y en túneles con señal garantizada en todos los niveles",
          "PTT/PTV para comunicaciones de emergencia con redundancia incorporada",
          "Tracking de personal en tiempo real con alertas automáticas de zona de riesgo",
        ],
      },
      {
        segment: "Oil & Gas",
        stat: "200+",
        statLabel: "sitios remotos típicos sin infraestructura fija de comunicaciones",
        description:
          "Las operaciones de extracción y transporte de hidrocarburos requieren conectividad confiable en localizaciones sin infraestructura previa, a menudo en zonas climáticamente extremas.",
        challenges: [
          "Conectividad satelital multi-órbita en pozos y estaciones de bombeo remotas",
          "Monitoreo predictivo de ductos, válvulas y activos de producción con IoT",
          "Seguridad perimetral y detección de intrusiones en zonas de exclusión",
        ],
      },
    ],

    valueProps: [
      {
        title: "Seguridad del Personal en Campo",
        description:
          "Videovigilancia con IA e inteligencia visual para detectar eventos de riesgo en tiempo real, desde derrumbes hasta intrusiones en zonas de exclusión.",
      },
      {
        title: "Conectividad sin Compromisos",
        description:
          "Redes microondas y LTE/5G privadas que garantizan comunicación en geografías sin fibra, ya sea en minas a cielo abierto o en operaciones subterráneas.",
      },
      {
        title: "Mantenimiento Predictivo",
        description:
          "IoT de alta disponibilidad para monitoreo continuo de activos y mantenimiento predictivo, reduciendo paradas no planificadas que afectan el EBITDA.",
      },
      {
        title: "Ciberseguridad sin Interrupciones",
        description:
          "Detección de anomalías y protección de sistemas OT sin interrumpir las operaciones críticas, con visibilidad completa del estado de seguridad.",
      },
    ],

    solutions: [
      {
        category: "Sistemas Inteligentes (SISE)",
        capabilities: [
          "Video e inteligencia visual para detectar eventos de riesgo.",
          "Monitoreo de perímetros en operaciones a cielo abierto y subterráneas.",
          "Seguimiento de personal y detección de intrusiones en zonas de exclusión.",
        ],
      },
      {
        category: "Conectividad IoT de alta disponibilidad",
        capabilities: [
          "Monitoreo de activos y mantenimiento predictivo.",
          "Sensores IoT para condiciones ambientales y estructurales en tiempo real.",
          "Plataformas de gestión de datos operativos integradas con ERP.",
        ],
      },
      {
        category: "Transporte inalámbrico para infraestructura",
        capabilities: [
          "Enlaces confiables en geografías hostiles sin fibra.",
          "Backhaul microondas con bandas licenciadas y libres según requerimiento.",
          "Alta disponibilidad con redundancia automática en terrenos adversos.",
        ],
      },
      {
        category: "Infraestructura fija de datos",
        capabilities: [
          "Redes de datos robustas para soporte de operación crítica.",
          "IP/MPLS para integración de sistemas de control y ERP minero.",
          "Fibra óptica en campamentos y centros de procesamiento.",
        ],
      },
      {
        category: "Ciberseguridad para entornos críticos",
        capabilities: [
          "Detección de anomalías sin interrumpir la operación.",
          "Segmentación de redes corporativas y de control OT.",
          "Protección de sistemas SCADA mineros y de extracción.",
        ],
      },
      {
        category: "Plataformas Operativas para misión crítica",
        capabilities: [
          "Unificación de datos para anticipar fallas.",
          "Gemelos digitales de activos críticos para optimización de producción.",
          "Centros de operación remota con visibilidad total de la operación.",
        ],
      },
      {
        category: "Redes móviles privadas y de misión crítica",
        capabilities: [
          "Redes privadas de baja latencia para minas cielo abierto y subterráneas.",
          "PTT/PTV para comunicaciones operativas de seguridad en campo.",
          "Control remoto de maquinaria pesada con baja latencia garantizada.",
        ],
      },
    ],

    caseStudies: [
      {
        location: "Perú",
        headline: "Red LTE privada para mina de cobre a cielo abierto",
        description:
          "Implementamos una red LTE privada que cubre la totalidad de una mina de cobre a cielo abierto en Perú, habilitando control remoto de maquinaria pesada, tracking de personal en tiempo real y videovigilancia con IA en todas las zonas operativas.",
        metric: "100% cobertura del perímetro",
      },
      {
        location: "Chile",
        headline: "Plataforma IoT de mantenimiento predictivo para operación minera",
        description:
          "Desplegamos sensores IoT industriales y plataformas de analítica predictiva en activos críticos de una operación minera en Chile, reduciendo paradas no planificadas mediante alertas tempranas y análisis de patrones de falla.",
        metric: "23% reducción en downtime",
      },
    ],

    resources: [
      {
        title: "Redes LTE/5G Privadas para Minería 4.0",
        description:
          "Comparativa técnica de tecnologías de conectividad para operaciones mineras: LTE privado, microondas, satelital y arquitecturas híbridas con casos reales en LATAM.",
        type: "whitepaper",
        tag: "Conectividad Minera",
        href: "/guias/redes-lte5g-privadas-mineria",
      },
      {
        title: "Mantenimiento Predictivo con IoT en Entornos Industriales",
        description:
          "Guía de implementación de sensores IoT, plataformas de datos y analítica predictiva para reducir paradas no planificadas en operaciones extractivas.",
        type: "guia",
        tag: "IoT Industrial",
        href: "/guias/mantenimiento-predictivo-iot",
      },
      {
        title: "Ciberseguridad en Minería LATAM 2025",
        description:
          "Análisis de las principales vulnerabilidades en sistemas SCADA mineros y estrategias de mitigación probadas en operaciones reales de la región.",
        type: "reporte",
        tag: "Ciberseguridad",
        href: "/guias/ciberseguridad-mineria-latam",
      },
    ],
  },

  /* ─────────────────────── PUERTOS ─────────────────────── */
  {
    slug: "puertos",
    name: "Puertos",
    sector: "Logística & Comercio Exterior",
    color: "#FF0057",
    colorAlt: "#0F172A",

    hero: {
      headline: "Fluidez operativa y trazabilidad total en cada movimiento portuario",
      subheadline:
        "Digitalizamos la cadena logística portuaria con trazabilidad en tiempo real, video analítica y redes privadas para reducir tiempos de rotación y maximizar la competitividad.",
      stats: [
        { value: "100%", label: "Trazabilidad de activos en movimiento" },
        { value: "4G LTE", label: "Redes privadas implementadas en puertos" },
        { value: "16", label: "Países con presencia operativa" },
      ],
    },

    challenge: {
      quote:
        "Cada minuto de falla en la coordinación de muelles y patios se traduce en costos adicionales, congestión y pérdida de competitividad en el comercio exterior.",
      context:
        "Los puertos modernos son ecosistemas de alta complejidad donde convergen múltiples actores, sistemas y flujos logísticos. La falta de visibilidad en tiempo real y la desconexión entre terminales, grúas, vehículos y sistemas TOS genera cuellos de botella que erosionan la competitividad y elevan los costos operativos.",
    },

    painStats: [
      {
        value: "8h+",
        label: "tiempo promedio de espera por embarcación antes de digitalizar operaciones",
        context: "Eficiencia portuaria",
      },
      {
        value: "$50K",
        label: "costo diario estimado por congestión en terminales sin trazabilidad en tiempo real",
        context: "Impacto financiero",
      },
      {
        value: "35%",
        label: "de ineficiencias logísticas generadas por falta de visibilidad de activos",
        context: "Pérdida operativa",
      },
    ],

    priority: {
      label: "Prioridad OSC",
      headline: "Eficiencia Logística y Operaciones Portuarias",
      description:
        "Logramos la fluidez operativa y la reducción de tiempos de rotación mediante trazabilidad completa en tiempo real de contenedores, vehículos, grúas y personal en toda la terminal.",
    },

    segmentation: [
      {
        segment: "Terminales de Contenedores",
        stat: "100%",
        statLabel: "trazabilidad de activos requerida para competir",
        description:
          "Los terminales de contenedores compiten por eficiencia de escala. La trazabilidad total y la automatización de patios son factores diferenciadores que definen la competitividad regional.",
        challenges: [
          "Seguimiento en tiempo real de contenedores y equipos portuarios con RFID/GPS",
          "Integración bidireccional con TOS (Terminal Operating System) y ERP corporativo",
          "Video analítica para optimización de espacios y detección de incidentes en patio",
        ],
      },
      {
        segment: "Terminales de Granel",
        stat: "40%",
        statLabel: "del tiempo perdido en coordinación manual de equipos",
        description:
          "La carga y descarga de granel requiere coordinación precisa entre cintas transportadoras, grúas y vehículos. Sin automatización integrada, la eficiencia se degrada significativamente.",
        challenges: [
          "Automatización de procesos de carga y descarga con comunicaciones de alta disponibilidad",
          "Control de inventario, pesaje y calidad en tiempo real integrado al ERP",
          "Comunicaciones LTE para operadores de equipos pesados y grúas pórtico",
        ],
      },
      {
        segment: "Operadores Logísticos",
        stat: "16",
        statLabel: "países donde OSC tiene presencia operativa activa",
        description:
          "Los operadores logísticos multimodales necesitan integrar sistemas de múltiples terminales, aduanas y modos de transporte en una plataforma unificada de visibilidad.",
        challenges: [
          "Interoperabilidad entre terminales, agencias aduanales y sistemas de comercio exterior",
          "Visibilidad end-to-end de la cadena logística desde origen hasta destino final",
          "Ciberseguridad para plataformas de integración de comercio exterior",
        ],
      },
    ],

    valueProps: [
      {
        title: "Trazabilidad de Contenedores y Activos",
        description:
          "IoT de alta disponibilidad para seguimiento en tiempo real de contenedores, vehículos y equipos portuarios, integrado con sistemas TOS y ERP.",
      },
      {
        title: "Video Analítica para Patios y Muelles",
        description:
          "Inteligencia visual SISE para monitoreo de patios, muelles y flujos de vehículos, con detección automática de incidentes y optimización de espacios.",
      },
      {
        title: "Comunicaciones para Grúas y Equipos Móviles",
        description:
          "Redes LTE privadas que garantizan comunicación segura y de baja latencia para operadores de grúas y equipos móviles en toda la terminal.",
      },
      {
        title: "Backbone Digital de Comercio Exterior",
        description:
          "Infraestructura IP MPLS que conecta terminales, agencias aduanales y sistemas de comercio exterior con alta disponibilidad y QoS garantizado.",
      },
    ],

    solutions: [
      {
        category: "Sistemas Inteligentes (SISE)",
        capabilities: [
          "Inteligencia visual para monitorear patios, muelles y optimizar flujos.",
          "Reconocimiento automático de matrículas y contenedores.",
          "Detección de incidentes y anomalías en operaciones portuarias.",
        ],
      },
      {
        category: "Conectividad IoT de alta disponibilidad",
        capabilities: [
          "Seguimiento de contenedores y trazabilidad de activos.",
          "Sensores IoT para control de temperatura e inventario en tiempo real.",
          "Integración con TOS (Terminal Operating System) y ERP.",
        ],
      },
      {
        category: "Transporte inalámbrico para infraestructura",
        capabilities: [
          "Interconexión flexible de áreas operativas y muelles sin fibra.",
          "Backhaul de alta capacidad para video y datos operativos.",
          "Redes resilientes con failover automático entre zonas.",
        ],
      },
      {
        category: "Infraestructura fija de datos",
        capabilities: [
          "Soporte para sistemas operativos y automatización de alto volumen.",
          "Backbone IP MPLS para digitalizar la logística del comercio exterior.",
          "Conectividad de alta disponibilidad entre terminales, aduanas y operadores.",
        ],
      },
      {
        category: "Ciberseguridad para entornos críticos",
        capabilities: [
          "Protección contra amenazas que afecten el comercio y la integración.",
          "Seguridad de sistemas de automatización y control portuario.",
          "Monitoreo continuo de eventos de seguridad en la terminal.",
        ],
      },
      {
        category: "Plataformas Operativas para misión crítica",
        capabilities: [
          "Coordinación entre terminales, logística y seguridad.",
          "Centro de comando con visibilidad total de operaciones portuarias.",
          "Dashboards en tiempo real para supervisores de turno.",
        ],
      },
      {
        category: "Redes móviles privadas y de misión crítica",
        capabilities: [
          "Comunicaciones seguras para grúas y equipos móviles en terminales.",
          "PTT/PTV para coordinación operativa entre zonas de la terminal.",
          "Cobertura total del área portuaria con redundancia garantizada.",
        ],
      },
    ],

    caseStudies: [
      {
        location: "América Latina",
        headline: "Redes 4G LTE privadas para optimizar logística portuaria",
        description:
          "Implementamos redes privadas 4G LTE en terminales portuarias para digitalizar la trazabilidad de contenedores y optimizar la coordinación de equipos móviles, reduciendo significativamente los tiempos de rotación y mejorando el throughput del terminal.",
        metric: "100% trazabilidad de activos",
      },
      {
        location: "Backbone Regional",
        headline: "Digitalización del backbone logístico con IP MPLS",
        description:
          "Diseñamos e implementamos la infraestructura IP MPLS que conecta el backbone logístico portuario de la región, integrando múltiples terminales y operadores de comercio exterior con alta disponibilidad y QoS garantizado.",
        metric: "Alta disponibilidad garantizada",
      },
    ],

    resources: [
      {
        title: "Digitalización Portuaria con IoT y LTE Privado",
        description:
          "Framework de implementación para modernizar operaciones portuarias con conectividad privada, trazabilidad de activos e integración con sistemas TOS.",
        type: "guia",
        tag: "Digitalización Portuaria",
        href: "/guias/digitalizacion-portuaria-iot-lte-privado",
      },
      {
        title: "Benchmarks de Eficiencia en Terminales Portuarios LATAM",
        description:
          "Métricas de productividad y eficiencia de los principales puertos de América Latina, con análisis de inversiones tecnológicas y ROI comprobado.",
        type: "reporte",
        tag: "Benchmarks",
        href: "/guias/benchmarks-eficiencia-terminales-portuarios-latam",
      },
    ],
  },

  /* ─────────────────────── GOBIERNO ─────────────────────── */
  {
    slug: "gobierno",
    name: "Gobierno",
    sector: "Seguridad Pública & Servicios Esenciales",
    color: "#FF0057",
    colorAlt: "#0F172A",

    hero: {
      headline: "Seguridad ciudadana y gobernabilidad con tecnología de misión crítica",
      subheadline:
        "Dotamos a los gobiernos de las capacidades tecnológicas para garantizar la seguridad ciudadana, la continuidad de servicios esenciales y la respuesta eficaz ante emergencias.",
      stats: [
        { value: "C4/C5", label: "Centros de mando unificados" },
        { value: "1,800km", label: "Fibra óptica desplegada en Bolivia" },
        { value: "45%", label: "Reducción en tiempos de respuesta" },
      ],
    },

    challenge: {
      quote:
        "La ausencia de evidencia y la incapacidad de responder a las crisis causa erosión institucional y genera fallas en los servicios esenciales para los ciudadanos.",
      context:
        "Los gobiernos enfrentan la presión de garantizar seguridad ciudadana con recursos limitados y sistemas heredados fragmentados. La falta de integración entre cámaras, comunicaciones, bases de datos y centros de mando impide una respuesta oportuna y evidenciada, erosionando la confianza institucional.",
    },

    painStats: [
      {
        value: "45%",
        label: "reducción en tiempos de respuesta con centros C4/C5 integrados (caso Ibarra)",
        context: "Impacto comprobado en campo",
      },
      {
        value: "73%",
        label: "de los ataques a sistemas gubernamentales explotan infraestructura sin parches",
        context: "Vulnerabilidad sistémica",
      },
      {
        value: "1,800km",
        label: "de fibra óptica soberana desplegada por OSC en Bolivia",
        context: "Infraestructura crítica nacional",
      },
    ],

    priority: {
      label: "Prioridad OSC",
      headline: "Seguridad Ciudadana y Gobernabilidad",
      description:
        "Logramos un impacto directo en la seguridad de los ciudadanos y la transparencia institucional mediante la continuidad operativa del Estado, integrando video analítica, comunicaciones de emergencia y centros de mando unificados.",
    },

    segmentation: [
      {
        segment: "Seguridad Pública",
        stat: "C4/C5",
        statLabel: "mando unificado que integra todas las agencias",
        description:
          "Las fuerzas de seguridad requieren un centro de mando que unifique video, comunicaciones y despacho para una respuesta coordinada, oportuna y completamente evidenciada ante incidentes críticos.",
        challenges: [
          "Integración de cámaras, bases de datos y sistemas de despacho en un único centro de mando",
          "Comunicaciones de misión crítica con autonomía institucional independiente de operadores comerciales",
          "Análisis forense de video e inteligencia operativa para investigación de incidentes",
        ],
      },
      {
        segment: "Ciudades Inteligentes",
        stat: "18",
        statLabel: "servicios urbanos conectables en una plataforma unificada",
        description:
          "Los municipios buscan integrar sensores, cámaras, iluminación inteligente y movilidad en una plataforma unificada de gestión urbana que mejore la calidad de vida de los ciudadanos.",
        challenges: [
          "IoT para gestión de servicios urbanos: iluminación, tráfico, residuos, calidad del aire",
          "Conectividad resiliente en infraestructura pública con alta disponibilidad",
          "Plataformas de analítica para toma de decisiones de política pública",
        ],
      },
      {
        segment: "Gestión de Emergencias",
        stat: "0",
        statLabel: "tolerancia a fallos de comunicación en emergencias",
        description:
          "Los servicios de emergencia — bomberos, ambulancias, defensa civil — necesitan comunicaciones que funcionen cuando la infraestructura comercial está comprometida o saturada.",
        challenges: [
          "Redes LTE/5G institucionales con autonomía total y sin dependencia de operadores privados",
          "PTT seguro y confiable entre agencias y primeros respondedores en toda la región",
          "Sistemas de despacho integrados con geolocalización y mapas en tiempo real",
        ],
      },
    ],

    valueProps: [
      {
        title: "Centros de Mando Unificados (C4/C5)",
        description:
          "Plataformas operativas que integran video analítica, comunicaciones de emergencia, bases de datos y sistemas de despacho en un único centro de comando para respuesta coordinada.",
      },
      {
        title: "Video Analítica para Prevención Urbana",
        description:
          "Sistemas SISE con IA para monitoreo urbano preventivo: detección de comportamientos anómalos, reconocimiento facial, análisis de multitudes y alertas automáticas.",
      },
      {
        title: "Comunicaciones de Emergencia Autónomas",
        description:
          "Redes LTE/5G privadas con autonomía institucional que garantizan las comunicaciones de emergencia independientemente de los operadores comerciales.",
      },
      {
        title: "Infraestructura Crítica Nacional",
        description:
          "Fibra óptica y redes IP para conectar oficinas gubernamentales, ministerios y sistemas de emergencia con alta disponibilidad y redundancia garantizada.",
      },
    ],

    solutions: [
      {
        category: "Sistemas Inteligentes (SISE)",
        capabilities: [
          "Video analítica e inteligencia visual para el monitoreo urbano y prevención.",
          "Plataformas C4i/C5 con reconocimiento facial y detección de comportamientos anómalos.",
          "Integración de cámaras, bases de datos y sistemas de despacho en un único centro de mando.",
        ],
      },
      {
        category: "Conectividad IoT de alta disponibilidad",
        capabilities: [
          "Monitoreo de infraestructura urbana y servicios públicos.",
          "Sensores ambientales y de tráfico para ciudad inteligente.",
          "Control inteligente de servicios esenciales con datos en tiempo real.",
        ],
      },
      {
        category: "Transporte inalámbrico para infraestructura",
        capabilities: [
          "Interconexión de sedes y sistemas en escenarios de emergencia.",
          "Backhaul resiliente para sistemas de misión crítica gubernamental.",
          "Conectividad de respaldo ante desastres naturales o contingencias.",
        ],
      },
      {
        category: "Infraestructura fija de datos",
        capabilities: [
          "Redes robustas para centros de comando y comunicaciones institucionales.",
          "Fibra óptica conectando organismos gubernamentales y sistemas de emergencia.",
          "IP/MPLS para integración de sistemas de seguridad pública.",
        ],
      },
      {
        category: "Ciberseguridad para entornos críticos",
        capabilities: [
          "Protección de datos ciudadanos y servicios estratégicos.",
          "Seguridad de sistemas de emergencia y misión crítica del Estado.",
          "Cumplimiento de marcos regulatorios de ciberseguridad gubernamental.",
        ],
      },
      {
        category: "Plataformas Operativas para misión crítica",
        capabilities: [
          "Unificación de información de seguridad y emergencias (C4/C5).",
          "Sistemas de despacho y coordinación de primeros respondedores.",
          "Análisis forense de video e inteligencia operativa institucional.",
        ],
      },
      {
        category: "Redes móviles privadas y de misión crítica",
        capabilities: [
          "Comunicaciones de misión crítica con autonomía institucional.",
          "Redes LTE/5G privadas para fuerzas de seguridad pública.",
          "PTT/PTV seguro para coordinación entre agencias gubernamentales.",
        ],
      },
    ],

    caseStudies: [
      {
        location: "Ibarra, Ecuador",
        headline: "Ecosistema de seguridad ciudadana que reduce tiempos de respuesta en 45%",
        description:
          "Implementamos un ecosistema tecnológico integral de seguridad ciudadana en Ibarra, integrando video analítica, comunicaciones de emergencia y un centro de mando unificado que redujo en 45% los tiempos de respuesta a incidentes críticos.",
        metric: "45% reducción en respuesta",
      },
      {
        location: "Bolivia",
        headline: "1,800 km de fibra óptica soberana conectando Bolivia",
        description:
          "Desplegamos 1,800 kilómetros de fibra óptica que conectó a Bolivia con Brasil y Perú, dotando al país de infraestructura digital soberana y de alta capacidad para el desarrollo de servicios gubernamentales y ciudadanos.",
        metric: "1,800 km desplegados",
      },
    ],

    resources: [
      {
        title: "Centros de Mando C4/C5 para Seguridad Ciudadana",
        description:
          "Arquitectura tecnológica y casos de implementación de centros de comando integrados para ciudades medianas y grandes en América Latina.",
        type: "whitepaper",
        tag: "Seguridad Ciudadana",
        href: "/guias/centros-mando-c4c5-seguridad-ciudadana",
      },
      {
        title: "Ciudades Inteligentes: Marco de Referencia para Gobiernos Locales",
        description:
          "Metodología para evaluar, priorizar e implementar tecnología de ciudad inteligente con enfoque en ROI, sostenibilidad y capacidad fiscal.",
        type: "guia",
        tag: "Smart City",
        href: "/guias/ciudades-inteligentes-marco-referencia-gobiernos-locales",
      },
      {
        title: "Ciberseguridad en Infraestructura Gubernamental LATAM",
        description:
          "Estado actual de las vulnerabilidades en sistemas gubernamentales y estrategias de protección para infraestructura crítica del Estado.",
        type: "reporte",
        tag: "Ciberseguridad Gov",
        href: "/guias/ciberseguridad-infraestructura-gubernamental-latam",
      },
    ],
  },

  /* ─────────────────────── TELECOMS ─────────────────────── */
  {
    slug: "telecoms",
    name: "Telecoms",
    sector: "Operadores & Proveedores de Red",
    color: "#FF0057",
    colorAlt: "#0F172A",

    hero: {
      headline: "Disponibilidad, escalabilidad y time-to-market para operadores líderes",
      subheadline:
        "Somos el partner end-to-end de los operadores de telecomunicaciones: desplegamos, operamos y auditamos redes 4G/5G con el SLA más exigente del mercado.",
      stats: [
        { value: "130K+", label: "Actividades NOC anuales (ISO 9001)" },
        { value: "5G SA", label: "Primera red Stand Alone en LATAM" },
        { value: "145+", label: "Sitios urbanos y rurales conectados" },
      ],
    },

    challenge: {
      quote:
        "El incumplimiento de SLAs y el lento time-to-market impactan directamente los ingresos y la reputación de marca frente a la competencia.",
      context:
        "Los operadores de telecomunicaciones enfrentan la presión de expandir cobertura, mejorar calidad y reducir OPEX al mismo tiempo. El crecimiento exponencial del tráfico exige redes más eficientes, mientras que la competencia por el mercado 5G requiere time-to-market acelerado sin comprometer la calidad ni el cumplimiento regulatorio.",
    },

    painStats: [
      {
        value: "35%",
        label: "reducción de OPEX comprobada con NOC gestionado vs operación in-house",
        context: "Eficiencia operativa",
      },
      {
        value: "130K+",
        label: "actividades anuales gestionadas por el NOC de OSC bajo certificación ISO 9001",
        context: "Escala y calidad comprobada",
      },
      {
        value: "18 meses",
        label: "ahorro promedio en time-to-market con un partner end-to-end especializado",
        context: "Velocidad al mercado",
      },
    ],

    priority: {
      label: "Prioridad OSC",
      headline: "Disponibilidad, Calidad y Escalabilidad",
      description:
        "Garantizamos la calidad de servicio (QoS), la escalabilidad rápida y la eficiencia en costos operativos (OPEX), siendo el único punto de responsabilidad para la continuidad de las operaciones de red.",
    },

    segmentation: [
      {
        segment: "Operadores Nacionales",
        stat: "#1",
        statLabel: "primera red 5G SA implementada en América Latina",
        description:
          "Los operadores nacionales necesitan un partner capaz de ejecutar despliegues end-to-end de 5G SA: RAN, CORE, BSS, ciberseguridad y cumplimiento regulatorio total, sin comprometer la calidad.",
        challenges: [
          "Despliegue acelerado de RAN 4G/5G con fabricantes Ericsson y otros líderes del mercado",
          "NOC 24/7 con SLAs contractuales garantizados y gestión de +130K actividades anuales",
          "Auditoría y optimización continua de calidad de red en zonas urbanas y rurales",
        ],
      },
      {
        segment: "Operadores Regionales",
        stat: "145+",
        statLabel: "sitios urbanos y rurales conectados con cobertura garantizada",
        description:
          "Los operadores regionales enfrentan presión de cobertura y calidad con OPEX limitado. El backhaul flexible y la gestión de red como servicio son críticos para su competitividad.",
        challenges: [
          "Backhaul microondas de alta capacidad donde la fibra no llega o no es viable económicamente",
          "Gestión de NOC como servicio con SLAs garantizados y escalabilidad bajo demanda",
          "Viabilidad técnica y estudios de sitio para expansión eficiente de cobertura 4G/5G",
        ],
      },
      {
        segment: "MVNOs y Wholesale",
        stat: "30+",
        statLabel: "años de integración con fabricantes de telecomunicaciones líderes",
        description:
          "Los operadores virtuales y mayoristas necesitan capacidad técnica sin la complejidad operativa. OSC provee la infraestructura técnica que les permite escalar sin inversión de capital.",
        challenges: [
          "Infraestructura técnica como servicio con escalabilidad garantizada y bajo modelo OPEX",
          "Conectividad satelital multi-órbita para cobertura en zonas de difícil acceso",
          "Plataformas y capacidades para servicios de valor agregado sobre la red existente",
        ],
      },
    ],

    valueProps: [
      {
        title: "NOC 24/7 con SLA Garantizado",
        description:
          "Centro de operaciones de red con gestión de más de 130,000 actividades anuales bajo certificación ISO 9001, con tiempos de respuesta y resolución contractualmente garantizados.",
      },
      {
        title: "Despliegue Acelerado 4G/5G",
        description:
          "Implementación end-to-end de redes 4G/5G Stand Alone (RAN, CORE, BSS, ciberseguridad y cumplimiento regulatorio), con track record comprobado en la región.",
      },
      {
        title: "Backhaul Flexible y Escalable",
        description:
          "Redes microondas de alta capacidad como alternativa o complemento a fibra donde la infraestructura física no llega, con escalabilidad bajo demanda.",
      },
      {
        title: "Auditoría y Optimización de Red",
        description:
          "Servicios de auditoría de calidad 4G/5G, pruebas de rendimiento, optimización de cobertura y capacidad para maximizar la eficiencia del OPEX.",
      },
    ],

    solutions: [
      {
        category: "Sistemas Inteligentes (SISE)",
        capabilities: [
          "Visibilidad física de sitios críticos (torres/data centers) para reducir tiempos de atención.",
          "Monitoreo ambiental y de seguridad de instalaciones remotas.",
          "Reducción de tiempos de respuesta ante eventos en sitio.",
        ],
      },
      {
        category: "Conectividad IoT de alta disponibilidad",
        capabilities: [
          "Plataformas para monetizar servicios y medición inteligente.",
          "Smart metering y conectividad masiva para clientes empresariales.",
          "Infraestructura para servicios de valor agregado sobre red existente.",
        ],
      },
      {
        category: "Transporte inalámbrico para infraestructura",
        capabilities: [
          "Backhaul flexible de alta capacidad donde no hay fibra.",
          "Bandas con licencia y libres para máxima flexibilidad operativa.",
          "Integración con redes microondas de los mayores operadores regionales.",
        ],
      },
      {
        category: "Infraestructura fija de datos",
        capabilities: [
          "Backbones IP y ópticos resilientes para soportar crecimiento de tráfico.",
          "DWDM/OTN para transmisión de alta capacidad entre nodos troncales.",
          "Diseño de redes de acceso y transporte para expansión 4G/5G.",
        ],
      },
      {
        category: "Ciberseguridad para entornos críticos",
        capabilities: [
          "Protección de la disponibilidad y los datos de clientes.",
          "Seguridad de infraestructura core y RAN.",
          "Cumplimiento de marcos regulatorios de telecomunicaciones.",
        ],
      },
      {
        category: "Plataformas Operativas para misión crítica",
        capabilities: [
          "Monitoreo y operación eficiente de la red (NOC).",
          "NOC 24/7 gestionando +130,000 actividades anuales con certificación ISO 9001.",
          "PMO para gestión de proyectos de despliegue y expansión de red.",
        ],
      },
      {
        category: "Redes móviles privadas y de misión crítica",
        capabilities: [
          "Ampliación de cobertura y despliegue acelerado de 4G y 5G.",
          "Primera red 5G Stand Alone en LATAM (RAN, CORE, BSS, ciberseguridad).",
          "Despliegue en zonas urbanas y rurales con tecnología Ericsson y fabricantes líderes.",
        ],
      },
    ],

    caseStudies: [
      {
        location: "Colombia",
        headline: "Primera red 5G Stand Alone de América Latina",
        description:
          "Implementamos la primera red 5G Stand Alone de la región con alcance completo: RAN, CORE, BSS, ciberseguridad y cumplimiento regulatorio total. Adicionalmente, operamos el NOC que gestiona más de 130,000 actividades anuales bajo certificación ISO 9001.",
        metric: "Primera 5G SA en LATAM",
      },
      {
        location: "México",
        headline: "Integración de redes microondas para el mayor operador wholesale",
        description:
          "Integramos las redes de microondas del mayor operador wholesale de México y desplegamos la red LTE para el proyecto CFE-TEIT, expandiendo la cobertura a zonas rurales y sin infraestructura previa.",
        metric: "Cobertura nacional expandida",
      },
      {
        location: "Estados Unidos",
        headline: "Despliegue 5G/4G con tecnología Ericsson en bandas estratégicas",
        description:
          "Ejecutamos despliegues de redes 5G y 4G con tecnología Ericsson en bandas estratégicas del mercado estadounidense, demostrando capacidad de operación en el mercado más exigente del continente.",
        metric: "Mercado US certificado",
      },
    ],

    resources: [
      {
        title: "NOC como Servicio: Modelos de Gestión para Operadores en LATAM",
        description:
          "Comparativa técnica y financiera entre gestión in-house vs NOC gestionado, con casos de implementación en operadores nacionales y regionales de la región.",
        type: "whitepaper",
        tag: "NOC as a Service",
        href: "/guias/noc-como-servicio-modelos-gestion-operadores-latam",
      },
      {
        title: "Guía Técnica: Despliegue 5G SA en América Latina",
        description:
          "Requisitos técnicos, consideraciones regulatorias y arquitectura de referencia para el despliegue de redes 5G Stand Alone en mercados LATAM.",
        type: "guia",
        tag: "5G SA",
        href: "/guias/despliegue-5g-sa-america-latina",
      },
      {
        title: "Estado de las Redes Privadas LTE/5G en LATAM 2025",
        description:
          "Análisis del mercado de redes privadas en América Latina: crecimiento, verticales líderes, tecnologías dominantes y proyecciones para 2026.",
        type: "reporte",
        tag: "Redes Privadas",
        href: "/guias/estado-redes-privadas-lte5g-latam-2025",
      },
    ],
  },
];

export function getIndustry(slug: string): IndustryData | undefined {
  return industries.find((i) => i.slug === slug);
}
