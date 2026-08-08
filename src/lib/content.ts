export type Locale = "es" | "en";

export const content = {
  es: {
    meta: {
      title: "D2LE2 Law — Marketplace legal bilingüe",
      description:
        "Ayuda migratoria y leads calificados en un solo lugar. Clientes gratis. Abogados pagan solo al desbloquear. Marketplace tecnológico — no somos un bufete.",
      ogTitle: "D2LE2 Law — Marketplace legal bilingüe",
      ogDescription:
        "Elige tu camino: inicia tu caso o recibe clientes en tiempo real como abogado.",
    },
    header: {
      ticker: [
        "24/7 Disponible",
        "Cliente gratis",
        "Leads verificados",
        "Pay-per-lead para abogados",
      ],
      speakLang: "Hablamos español",
      nav: [
        { label: "Inicio", href: "#inicio" },
        { label: "Cómo funciona", href: "#como-funciona" },
        { label: "Beneficios", href: "#beneficios", children: true },
        { label: "Precios", href: "#precios" },
        { label: "Recursos", href: "#recursos" },
        { label: "Contacto", href: "#contacto" },
      ],
      benefitLinks: [
        { label: "Clientes reales", href: "#beneficios" },
        { label: "Panel en tiempo real", href: "#panel" },
        { label: "Soporte bilingüe", href: "#soporte" },
      ],
      phoneSub: "Disponible 24/7",
      ctaClient: "Soy cliente",
      ctaLawyer: "Soy abogado",
      menuOpen: "Abrir menú",
      langEs: "ES",
      langEn: "EN",
    },
    hero: {
      label: "Marketplace legal · Clientes y profesionales",
      title: "Ayuda migratoria y leads calificados,",
      titleAccent: "en un solo lugar.",
      subtitle:
        "Elige tu camino: inicia tu caso gratis o recibe clientes en tiempo real como abogado. Tú decides.",
      clientCta: "Soy cliente — iniciar caso",
      lawyerCta: "Soy abogado — registro gratis",
      callCta: "Llamar ahora 24/7",
      ratingLabel: "Trustpilot",
      ratingScore: "4.9",
      ratingCount: "| 2,500+ Reseñas",
      stats: [
        { value: 15000, prefix: "+", suffix: "", label: "Clientes conectados", labelShort: "Clientes\nconectados" },
        { value: 2500, prefix: "+", suffix: "", label: "Abogados activos", labelShort: "Abogados\nactivos" },
        { value: 98, prefix: "", suffix: "%", label: "Satisfacción", labelShort: "Tasa de\nsatisfacción" },
        { value: 20, prefix: "", suffix: "+", label: "Áreas de práctica", labelShort: "Áreas de\npráctica" },
      ],
      imageAlt: "Abogado de inmigración frente al skyline nocturno de la ciudad",
    },
    trust: {
      tagline: "Conecta. Ayuda. Haz crecer tu práctica.",
      items: [
        { lines: ["Sin riesgos", "Sin compromisos"] },
        { lines: ["Leads", "verificados"] },
        { lines: ["Panel inteligente", "en tiempo real"] },
        { lines: ["Soporte", "ES / EN 24/7"] },
        { lines: ["Cliente", "siempre gratis"] },
      ],
    },
    audience: {
      id: "caminos",
      clientLabel: "Para clientes",
      clientTitle: "Tu caso, guiado paso a paso",
      clientSub:
        "Inmigración y más áreas legales en EE.UU. — con asistencia y profesionales verificados. Sin costo para ti.",
      clientCta: "Iniciar mi caso",
      clientCards: [
        { title: "Describe tu caso", text: "Cuéntanos qué necesitas en minutos." },
        { title: "Matching rápido", text: "Te emparejamos con un profesional verificado." },
        { title: "100% gratis", text: "El cliente nunca paga por usar la plataforma." },
        { title: "Seguro y privado", text: "Datos protegidos. Proceso transparente." },
      ],
      lawyerLabel: "Para abogados",
      lawyerTitle: "Más clientes. Más control.",
      lawyerSub:
        "Recibe leads calificados, revisa el caso anonimizado y desbloquea solo los que quieres.",
      lawyerCta: "Crear cuenta profesional",
      lawyerCards: [
        { title: "Leads en vivo", text: "Clientes migratorios y legales en tiempo real." },
        { title: "Tú decides", text: "Acepta solo los casos que te interesan." },
        { title: "Pay-per-lead", text: "Paga solo al desbloquear el contacto." },
        { title: "Panel pro", text: "Feed, billetera y soporte dedicado." },
      ],
    },
    how: {
      label: "Cómo funciona",
      title: "Simple para ambos lados",
      tabClient: "Cliente",
      tabLawyer: "Abogado",
      clientSteps: [
        {
          n: "01",
          title: "Describe tu caso",
          text: "Cuéntanos tu situación migratoria o legal en lenguaje sencillo.",
        },
        {
          n: "02",
          title: "Te emparejamos",
          text: "Encontramos profesionales verificados listos para ayudarte.",
        },
        {
          n: "03",
          title: "Recibe ayuda",
          text: "Conecta y avanza tu trámite. El servicio es gratis para ti.",
        },
      ],
      lawyerSteps: [
        {
          n: "01",
          title: "Crea tu perfil",
          text: "Regístrate gratis y cuéntanos tus áreas de práctica y estados.",
        },
        {
          n: "02",
          title: "Revisa leads en vivo",
          text: "Ves solicitudes anonimizadas en tu panel, en tiempo real.",
        },
        {
          n: "03",
          title: "Desbloquea y contacta",
          text: "Paga el lead con créditos, habla con el cliente y acepta o rechaza.",
        },
      ],
      panels: [
        {
          t: "Panel inteligente",
          d: "Filtra casos por estado, idioma y tipo de trámite.",
        },
        {
          t: "Casos verificados",
          d: "Validamos cada solicitud antes de mostrarla.",
        },
        {
          t: "Soporte dedicado",
          d: "Un equipo bilingüe acompaña tu operación 24/7.",
        },
      ],
    },
    benefits: {
      title: "Más clientes.",
      titleLine2: "Más casos.",
      text: "Marketplace diseñado para clientes que necesitan ayuda y abogados que quieren crecer su práctica.",
      items: [
        {
          title: "Clientes reales",
          text: "Personas buscando ayuda migratoria y legal ahora.",
        },
        {
          title: "Tú decides",
          text: "Revisa el caso anonimizado antes de desbloquear.",
        },
        {
          title: "Sin compromiso",
          text: "Habla con el cliente; acepta o rechaza en tu ventana.",
        },
        {
          title: "Haz crecer tu práctica",
          text: "Más leads calificados, más resultados.",
        },
      ],
      partnersLabel: "Con la confianza de",
      partners: ["Abogados de todo USA", "Lawyers.com", "Avvo", "Martindale-Hubbell", "Justia"],
    },
    pricing: {
      label: "Precios",
      title: "Cliente gratis. Abogado paga por lead.",
      plans: [
        {
          name: "Cliente",
          price: "$0",
          note: "siempre gratis",
          features: [
            "Crear caso sin costo",
            "Matching con profesionales",
            "Soporte ES / EN",
          ],
          cta: "Iniciar mi caso",
          featured: false,
          role: "client" as const,
        },
        {
          name: "Abogado",
          price: "Créditos",
          note: "paga solo al desbloquear",
          features: [
            "Perfil verificado",
            "Feed de leads en tiempo real",
            "Pay-per-lead sin cuota fija",
            "Soporte 24/7 bilingüe",
          ],
          cta: "Registro profesional",
          featured: true,
          role: "lawyer" as const,
        },
        {
          name: "Firma",
          price: "A medida",
          note: "equipos y bufetes",
          features: [
            "Múltiples abogados",
            "Billetera compartida",
            "Gerente de cuenta",
            "Integraciones",
          ],
          cta: "Hablar con ventas",
          featured: false,
          role: "lawyer" as const,
        },
      ],
      popular: "Popular",
    },
    resources: {
      label: "Recursos",
      title: "Material para tu práctica",
      download: "Descargar →",
      items: [
        { tag: "Guía", title: "Cómo calificar un caso migratorio en 5 minutos" },
        { tag: "Plantilla", title: "Checklist de documentos para asilo" },
        { tag: "Webinar", title: "Convierte consultas en clientes que pagan" },
      ],
    },
    contact: {
      label: "Registro",
      title: "Empieza gratis en minutos",
      text: "Sin cuotas iniciales. Elige tu rol y nuestro equipo te acompaña en español o inglés.",
      roleClient: "Cliente",
      roleLawyer: "Abogado",
      fields: {
        name: "Nombre",
        namePh: "Nombre y apellido",
        email: "Correo",
        emailPh: "tu@correo.com",
        phone: "Teléfono",
        phonePh: "(305) 000-0000",
        state: "Estado",
        statePh: "Florida",
        message: "Mensaje",
        messagePh: "Cuéntanos sobre tu caso o tu práctica",
      },
      submitClient: "Iniciar mi caso",
      submitLawyer: "Crear cuenta profesional",
    },
    footer: {
      blurb:
        "Marketplace legal bilingüe que conecta clientes con abogados verificados. Cliente gratis. Abogados pagan por lead.",
      cols: [
        {
          title: "Plataforma",
          links: [
            { label: "Cómo funciona", href: "#como-funciona" },
            { label: "Beneficios", href: "#beneficios" },
            { label: "Precios", href: "#precios" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Aviso legal", href: "#aviso-legal" },
            { label: "Contacto", href: "#contacto" },
            { label: "Recursos", href: "#recursos" },
          ],
        },
      ],
      disclaimer:
        "D2LE2 Law es un marketplace tecnológico. No prestamos asesoría legal ni somos un bufete. No establecemos relación abogado-cliente.",
      copyright: "D2LE2 Law. Marketplace legal. Todos los derechos reservados.",
    },
    chat: {
      online: "En línea",
      minimize: "Minimizar chat",
      open: "Abrir chat",
      close: "Cerrar chat",
      placeholder: "Escribe tu mensaje...",
      attach: "Adjuntar",
      send: "Enviar mensaje",
      messages: [
        {
          from: "bot" as const,
          text: "¡Hola! ¿Eres cliente buscando ayuda o abogado buscando leads?",
          time: "10:30 AM",
        },
        {
          from: "me" as const,
          text: "Quiero saber cómo funciona la plataforma.",
          time: "10:31 AM",
        },
        {
          from: "bot" as const,
          text: "Los clientes inician su caso gratis. Los abogados revisan leads anonimizados y pagan solo al desbloquear el contacto.",
          time: "10:32 AM",
        },
      ],
    },
    phone: "(305) 987-0000",
    phoneHref: "tel:+13059870000",
  },
  en: {
    meta: {
      title: "D2LE2 Law — Bilingual legal marketplace",
      description:
        "Immigration help and qualified leads in one place. Free for clients. Lawyers pay only to unlock. Technology marketplace — we are not a law firm.",
      ogTitle: "D2LE2 Law — Bilingual legal marketplace",
      ogDescription:
        "Choose your path: start your case or get live leads as an attorney.",
    },
    header: {
      ticker: [
        "Available 24/7",
        "Free for clients",
        "Verified leads",
        "Pay-per-lead for lawyers",
      ],
      speakLang: "We speak Spanish",
      nav: [
        { label: "Home", href: "#inicio" },
        { label: "How it works", href: "#como-funciona" },
        { label: "Benefits", href: "#beneficios", children: true },
        { label: "Pricing", href: "#precios" },
        { label: "Resources", href: "#recursos" },
        { label: "Contact", href: "#contacto" },
      ],
      benefitLinks: [
        { label: "Real clients", href: "#beneficios" },
        { label: "Live dashboard", href: "#panel" },
        { label: "Bilingual support", href: "#soporte" },
      ],
      phoneSub: "Available 24/7",
      ctaClient: "I'm a client",
      ctaLawyer: "I'm a lawyer",
      menuOpen: "Open menu",
      langEs: "ES",
      langEn: "EN",
    },
    hero: {
      label: "Legal marketplace · Clients & professionals",
      title: "Immigration help and qualified leads,",
      titleAccent: "in one place.",
      subtitle:
        "Choose your path: start your case for free or get live clients as an attorney. You decide.",
      clientCta: "I'm a client — start case",
      lawyerCta: "I'm a lawyer — free signup",
      callCta: "Call now 24/7",
      ratingLabel: "Trustpilot",
      ratingScore: "4.9",
      ratingCount: "| 2,500+ Reviews",
      stats: [
        { value: 15000, prefix: "+", suffix: "", label: "Clients connected", labelShort: "Clients\nconnected" },
        { value: 2500, prefix: "+", suffix: "", label: "Active lawyers", labelShort: "Active\nlawyers" },
        { value: 98, prefix: "", suffix: "%", label: "Satisfaction", labelShort: "Success\nrate" },
        { value: 20, prefix: "", suffix: "+", label: "Practice areas", labelShort: "Practice\nareas" },
      ],
      imageAlt: "Immigration attorney in front of a night city skyline",
    },
    trust: {
      tagline: "Connect. Help. Grow your practice.",
      items: [
        { lines: ["Risk free", "No commitment"] },
        { lines: ["Verified", "leads"] },
        { lines: ["Smart dashboard", "in real time"] },
        { lines: ["Support", "ES / EN 24/7"] },
        { lines: ["Always free", "for clients"] },
      ],
    },
    audience: {
      id: "caminos",
      clientLabel: "For clients",
      clientTitle: "Your case, guided step by step",
      clientSub:
        "Immigration and more US legal areas — with assistance and verified professionals. Free for you.",
      clientCta: "Start my case",
      clientCards: [
        { title: "Describe your case", text: "Tell us what you need in minutes." },
        { title: "Fast matching", text: "We pair you with a verified professional." },
        { title: "100% free", text: "Clients never pay to use the platform." },
        { title: "Secure & private", text: "Protected data. Transparent process." },
      ],
      lawyerLabel: "For lawyers",
      lawyerTitle: "More clients. More control.",
      lawyerSub:
        "Get qualified leads, review anonymized cases, and unlock only the ones you want.",
      lawyerCta: "Create professional account",
      lawyerCards: [
        { title: "Live leads", text: "Immigration and legal clients in real time." },
        { title: "You decide", text: "Accept only the cases you want." },
        { title: "Pay-per-lead", text: "Pay only when you unlock contact." },
        { title: "Pro dashboard", text: "Feed, wallet, and dedicated support." },
      ],
    },
    how: {
      label: "How it works",
      title: "Simple on both sides",
      tabClient: "Client",
      tabLawyer: "Lawyer",
      clientSteps: [
        {
          n: "01",
          title: "Describe your case",
          text: "Tell us your immigration or legal situation in plain language.",
        },
        {
          n: "02",
          title: "We match you",
          text: "We find verified professionals ready to help.",
        },
        {
          n: "03",
          title: "Get help",
          text: "Connect and move your case forward. Free for you.",
        },
      ],
      lawyerSteps: [
        {
          n: "01",
          title: "Create your profile",
          text: "Sign up free and share your practice areas and states.",
        },
        {
          n: "02",
          title: "Review live leads",
          text: "See anonymized requests on your dashboard in real time.",
        },
        {
          n: "03",
          title: "Unlock and contact",
          text: "Pay for the lead with credits, talk to the client, accept or reject.",
        },
      ],
      panels: [
        {
          t: "Smart dashboard",
          d: "Filter cases by state, language, and matter type.",
        },
        {
          t: "Verified cases",
          d: "We validate each request before it appears.",
        },
        {
          t: "Dedicated support",
          d: "A bilingual team supports your operation 24/7.",
        },
      ],
    },
    benefits: {
      title: "More clients.",
      titleLine2: "More cases.",
      text: "A marketplace built for clients who need help and lawyers who want to grow.",
      items: [
        {
          title: "Real clients",
          text: "People seeking immigration and legal help now.",
        },
        {
          title: "You decide",
          text: "Review the anonymized case before unlocking.",
        },
        {
          title: "No commitment",
          text: "Talk to the client; accept or reject in your window.",
        },
        {
          title: "Grow your practice",
          text: "More qualified leads, better results.",
        },
      ],
      partnersLabel: "Trusted by",
      partners: ["Attorneys across the USA", "Lawyers.com", "Avvo", "Martindale-Hubbell", "Justia"],
    },
    pricing: {
      label: "Pricing",
      title: "Free for clients. Lawyers pay per lead.",
      plans: [
        {
          name: "Client",
          price: "$0",
          note: "always free",
          features: [
            "Create a case at no cost",
            "Match with professionals",
            "ES / EN support",
          ],
          cta: "Start my case",
          featured: false,
          role: "client" as const,
        },
        {
          name: "Lawyer",
          price: "Credits",
          note: "pay only to unlock",
          features: [
            "Verified profile",
            "Live lead feed",
            "Pay-per-lead, no fixed fee",
            "24/7 bilingual support",
          ],
          cta: "Professional signup",
          featured: true,
          role: "lawyer" as const,
        },
        {
          name: "Firm",
          price: "Custom",
          note: "teams and firms",
          features: [
            "Multiple attorneys",
            "Shared wallet",
            "Account manager",
            "Integrations",
          ],
          cta: "Talk to sales",
          featured: false,
          role: "lawyer" as const,
        },
      ],
      popular: "Popular",
    },
    resources: {
      label: "Resources",
      title: "Material for your practice",
      download: "Download →",
      items: [
        { tag: "Guide", title: "How to qualify an immigration case in 5 minutes" },
        { tag: "Template", title: "Asylum document checklist" },
        { tag: "Webinar", title: "Turn consultations into paying clients" },
      ],
    },
    contact: {
      label: "Sign up",
      title: "Get started free in minutes",
      text: "No upfront fees. Choose your role and our team supports you in Spanish or English.",
      roleClient: "Client",
      roleLawyer: "Lawyer",
      fields: {
        name: "Name",
        namePh: "Full name",
        email: "Email",
        emailPh: "you@email.com",
        phone: "Phone",
        phonePh: "(305) 000-0000",
        state: "State",
        statePh: "Florida",
        message: "Message",
        messagePh: "Tell us about your case or practice",
      },
      submitClient: "Start my case",
      submitLawyer: "Create professional account",
    },
    footer: {
      blurb:
        "Bilingual legal marketplace connecting clients with verified attorneys. Free for clients. Lawyers pay per lead.",
      cols: [
        {
          title: "Platform",
          links: [
            { label: "How it works", href: "#como-funciona" },
            { label: "Benefits", href: "#beneficios" },
            { label: "Pricing", href: "#precios" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Legal notice", href: "#aviso-legal" },
            { label: "Contact", href: "#contacto" },
            { label: "Resources", href: "#recursos" },
          ],
        },
      ],
      disclaimer:
        "D2LE2 Law is a technology marketplace. We do not provide legal advice and we are not a law firm. We do not create an attorney-client relationship.",
      copyright: "D2LE2 Law. Legal marketplace. All rights reserved.",
    },
    chat: {
      online: "Online",
      minimize: "Minimize chat",
      open: "Open chat",
      close: "Close chat",
      placeholder: "Type your message...",
      attach: "Attach",
      send: "Send message",
      messages: [
        {
          from: "bot" as const,
          text: "Hi! Are you a client seeking help or a lawyer looking for leads?",
          time: "10:30 AM",
        },
        {
          from: "me" as const,
          text: "I want to know how the platform works.",
          time: "10:31 AM",
        },
        {
          from: "bot" as const,
          text: "Clients start their case for free. Lawyers review anonymized leads and pay only when unlocking contact.",
          time: "10:32 AM",
        },
      ],
    },
    phone: "(305) 987-0000",
    phoneHref: "tel:+13059870000",
  },
} as const;

export type Content = (typeof content)[Locale];
