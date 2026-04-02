import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      "nav": {
        "project": "Projet",
        "objectives": "Objectifs",
        "technology": "Technologie",
        "news": "Actualités",
        "contact": "Contactez-nous",
        "feedback": "Donner votre avis"
      },
      "hero": {
        "tagline": "Traçabilité Minière Intelligente",
        "title": "L'avenir des ressources minérales en RDC.",
        "desc": "MinTrack RDC utilise la blockchain et l'IoT pour garantir une transparence totale, de l'extraction à l'exportation.",
        "cta_verify": "Vérifier un lot",
        "cta_partner": "Rejoindre nos partenaires"
      },
      "journey": {
        "title": "Le Parcours du Minerai",
        "extraction": "Extraction",
        "extraction_desc": "Enregistrement à la source avec identifiants uniques.",
        "certification": "Certification",
        "certification_desc": "Validation de conformité aux normes OCDE/ISO.",
        "transport": "Transport",
        "transport_desc": "Suivi GPS et RFID en temps réel des cargaisons.",
        "exportation": "Exportation",
        "exportation_desc": "Déclaration douanière et scellage numérique.",
        "audit": "Audit",
        "audit_desc": "Contrôle indépendant et immuable via Blockchain."
      },
      "verification": {
        "title": "Vérification de Certificat",
        "placeholder": "Entrez le code du lot (ex: MT-RDC-2026-X)",
        "verify": "Vérifier",
        "verifying": "Vérification...",
        "success": "Certificat Authentique : Lot MT-9928-K valide.",
        "error": "Code Invalide ou Certificat Expiré."
      },
      "impact": {
        "tagline": "Nos Engagements",
        "title": "Un impact durable pour la RDC.",
        "desc": "MinTrack RDC n’est pas seulement une solution technologique, c’est un engagement pour un avenir minier transparent, durable et équitable.",
        "transparency": "Transparence",
        "transparency_desc": "Données accessibles en temps réel pour tous les acteurs autorisés.",
        "trust": "Confiance",
        "trust_desc": "Renforcement de la crédibilité de la RDC sur le marché mondial.",
        "sustainability": "Durabilité",
        "sustainability_desc": "Promotion de pratiques minières responsables et éthiques.",
        "sovereignty": "Souveraineté",
        "sovereignty_desc": "Valorisation des ressources nationales via une solution locale."
      },
      "video": {
        "tagline": "Présentation Vidéo",
        "title": "Découvrez MinTrack RDC en 2 minutes.",
        "how_it_works": "Comment ça marche ?",
        "sub": "Le fonctionnement de la traçabilité minière en RDC."
      },
      "partners": {
        "tagline": "Ils nous font confiance & Références Réglementaires",
        "oecd": "NORME OCDE",
        "iso": "CERTIFICATION ISO 9001",
        "itie": "CONFORMITÉ ITIE",
        "ue": "RÈGLEMENT UE 2017/821"
      },
      "faq": {
        "title": "Questions Fréquentes",
        "q1": "Qu'est-ce que MinTrack RDC ?",
        "a1": "MinTrack RDC est une plateforme technologique utilisant la blockchain pour assurer la traçabilité des minerais en République Démocratique du Congo.",
        "q2": "Comment garantissez-vous l'immuabilité des données ?",
        "a2": "Grâce à la technologie Blockchain, chaque transaction ou mouvement de minerai est enregistré de manière permanente et ne peut être modifié rétroactivement.",
        "q3": "Quels minerais sont suivis ?",
        "a3": "Actuellement, nous nous concentrons sur le cobalt, le cuivre et les minerais 3T (Étain, Tantale, Tungstène), mais la solution est extensible à d'autres ressources.",
        "q4": "Qui peut accéder aux données ?",
        "a4": "L'accès est segmenté : les régulateurs ont une vue d'ensemble, les entreprises minières voient leurs propres flux, et les acheteurs finaux peuvent vérifier l'origine de leurs lots."
      },
      "tech": {
        "tagline": "Technologie",
        "title": "Innovation au service de la transparence.",
        "blockchain": "Blockchain",
        "blockchain_desc": "Registre décentralisé garantissant l’immuabilité des données de traçabilité.",
        "iot": "RFID & GPS",
        "iot_desc": "Suivi physique et électronique des minerais à chaque étape du transport.",
        "audit": "Audit Numérique",
        "audit_desc": "Contrôle automatisé et permanent de la conformité aux normes internationales.",
        "dashboards": "Tableaux de Bord",
        "dashboards_desc": "Visualisation interactive des flux pour une prise de décision éclairée."
      },
      "news": {
        "title": "Actualités",
        "read_more": "Lire la suite"
      },
      "footer": {
        "desc": "La plateforme de référence pour la traçabilité et la gestion intelligente des ressources minérales en République Démocratique du Congo.",
        "nav": "Navigation",
        "contact": "Contact",
        "rights": "© 2026 Mintrack RDC Project. Tous droits réservés.",
        "presentation": "Présentation",
        "objectives": "Objectifs",
        "logistics": "Logistique",
        "technology": "Technologie",
        "feedback": "Donner votre avis"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "project": "Project",
        "objectives": "Objectives",
        "technology": "Technology",
        "news": "News",
        "contact": "Contact Us",
        "feedback": "Give Feedback"
      },
      "hero": {
        "tagline": "Smart Mineral Traceability",
        "title": "The future of mineral resources in DRC.",
        "desc": "MinTrack RDC uses blockchain and IoT to ensure total transparency, from extraction to exportation.",
        "cta_verify": "Verify a batch",
        "cta_partner": "Join our partners"
      },
      "journey": {
        "title": "Mineral Journey",
        "extraction": "Extraction",
        "extraction_desc": "Source registration with unique identifiers.",
        "certification": "Certification",
        "certification_desc": "Compliance validation with OECD/ISO standards.",
        "transport": "Transport",
        "transport_desc": "Real-time GPS and RFID tracking of shipments.",
        "exportation": "Exportation",
        "exportation_desc": "Customs declaration and digital sealing.",
        "audit": "Audit",
        "audit_desc": "Independent and immutable control via Blockchain."
      },
      "verification": {
        "title": "Certificate Verification",
        "placeholder": "Enter batch code (e.g., MT-RDC-2026-X)",
        "verify": "Verify",
        "verifying": "Verifying...",
        "success": "Authentic Certificate: Batch MT-9928-K valid.",
        "error": "Invalid Code or Expired Certificate."
      },
      "impact": {
        "tagline": "Our Commitments",
        "title": "A sustainable impact for DRC.",
        "desc": "MinTrack RDC is not just a technological solution, it is a commitment to a transparent, sustainable, and equitable mining future.",
        "transparency": "Transparency",
        "transparency_desc": "Data accessible in real-time for all authorized actors.",
        "trust": "Trust",
        "trust_desc": "Strengthening DRC's credibility on the global market.",
        "sustainability": "Sustainability",
        "sustainability_desc": "Promotion of responsible and ethical mining practices.",
        "sovereignty": "Sovereignty",
        "sovereignty_desc": "Valorization of national resources via a local solution."
      },
      "video": {
        "tagline": "Video Presentation",
        "title": "Discover MinTrack RDC in 2 minutes.",
        "how_it_works": "How it works?",
        "sub": "The operation of mining traceability in DRC."
      },
      "partners": {
        "tagline": "They trust us & Regulatory References",
        "oecd": "OECD STANDARD",
        "iso": "ISO 9001 CERTIFICATION",
        "itie": "EITI COMPLIANCE",
        "ue": "EU REGULATION 2017/821"
      },
      "faq": {
        "title": "Frequently Asked Questions",
        "q1": "What is MinTrack RDC?",
        "a1": "MinTrack RDC is a technological platform using blockchain to ensure the traceability of minerals in the Democratic Republic of Congo.",
        "q2": "How do you guarantee data immutability?",
        "a2": "Thanks to Blockchain technology, each transaction or mineral movement is permanently recorded and cannot be retroactively modified.",
        "q3": "Which minerals are tracked?",
        "a3": "Currently, we focus on cobalt, copper, and 3T minerals (Tin, Tantalum, Tungsten), but the solution is expandable to other resources.",
        "q4": "Who can access the data?",
        "a4": "Access is segmented: regulators have an overview, mining companies see their own flows, and end buyers can verify the origin of their batches."
      },
      "tech": {
        "tagline": "Technology",
        "title": "Innovation at the service of transparency.",
        "blockchain": "Blockchain",
        "blockchain_desc": "Decentralized ledger guaranteeing the immutability of traceability data.",
        "iot": "RFID & GPS",
        "iot_desc": "Physical and electronic tracking of minerals at each stage of transport.",
        "audit": "Digital Audit",
        "audit_desc": "Automated and permanent control of compliance with international standards.",
        "dashboards": "Dashboards",
        "dashboards_desc": "Interactive visualization of flows for informed decision-making."
      },
      "news": {
        "title": "News",
        "read_more": "Read more"
      },
      "footer": {
        "desc": "The reference platform for traceability and smart management of mineral resources in the Democratic Republic of Congo.",
        "nav": "Navigation",
        "contact": "Contact",
        "rights": "© 2026 Mintrack RDC Project. All rights reserved.",
        "presentation": "Presentation",
        "objectives": "Objectives",
        "logistics": "Logistics",
        "technology": "Technology",
        "feedback": "Give feedback"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
