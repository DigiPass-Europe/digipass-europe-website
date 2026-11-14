import type { WorkingGroup, Localized } from "./types";

const L = (en: string, fr: string): Localized => ({ en, fr });
const open = [{ role: "chair", status: "open" }, { role: "vice-chair", status: "open" }] as const;

export const workingGroups: WorkingGroup[] = [
  {
    id: "wg1", code: "WG1", slug: "regulatory-framework-european-policy",
    name: L("Regulatory Framework & European Policy", "Cadre réglementaire et politique européenne"),
    tagline: L("Reading the rules before they are written.", "Lire les règles avant qu’elles ne soient écrites."),
    mission: L(
      "Follow, interpret and influence the European legal framework for the Digital Product Passport, from the Ecodesign for Sustainable Products Regulation to the delegated acts that will decide what each sector must disclose.",
      "Suivre, interpréter et influencer le cadre juridique européen du passeport numérique des produits, du règlement sur l’écoconception des produits durables jusqu’aux actes délégués qui détermineront ce que chaque secteur devra publier."),
    objectives: [
      L("Monitor European DPP legislation and regulatory developments.", "Suivre la législation européenne sur le DPP et son évolution réglementaire."),
      L("Analyse the Ecodesign for Sustainable Products Regulation (ESPR).", "Analyser le règlement sur l’écoconception des produits durables (ESPR)."),
      L("Monitor delegated acts and sector-specific requirements.", "Suivre les actes délégués et les exigences sectorielles."),
      L("Develop industry recommendations.", "Élaborer des recommandations pour l’industrie."),
      L("Facilitate dialogue between industry and policymakers.", "Faciliter le dialogue entre l’industrie et les décideurs."),
      L("Publish regulatory briefings.", "Publier des notes réglementaires."),
    ],
    activities: [
      L("Monthly regulatory watch call.", "Réunion mensuelle de veille réglementaire."),
      L("Responses to Commission consultations.", "Réponses aux consultations de la Commission."),
      L("Annual policy roundtable with European institutions.", "Table ronde politique annuelle avec les institutions européennes."),
    ],
    deliverables: [
      L("European DPP regulatory tracker.", "Tableau de suivi réglementaire européen du DPP."),
      L("Policy position papers.", "Prises de position."),
      L("Regulatory impact analyses.", "Analyses d’impact réglementaire."),
      L("Recommendations to European institutions.", "Recommandations aux institutions européennes."),
    ],
    leadership: [...open],
    projects: [
      { title: L("ESPR delegated acts tracker (2026–2027 work plan)", "Suivi des actes délégués ESPR (plan de travail 2026–2027)"), status: "active", illustrative: true },
      { title: L("Position paper on data access rights for recyclers", "Prise de position sur les droits d’accès aux données des recycleurs"), status: "planned", illustrative: true },
    ],
    meetings: [{ date: "2026-12-09T14:00:00+01:00", title: L("Regulatory watch — December", "Veille réglementaire — décembre"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg2", code: "WG2", slug: "technical-architecture-interoperability",
    name: L("Technical Architecture & Interoperability", "Architecture technique et interopérabilité"),
    tagline: L("One passport, many systems.", "Un passeport, de nombreux systèmes."),
    mission: L(
      "Make Digital Product Passport systems talk to each other: identifiers, data carriers, resolvers, APIs and the architectural patterns that let a passport issued by one system be read by any other.",
      "Faire dialoguer les systèmes de passeport numérique : identifiants, supports de données, résolveurs, API et modèles d’architecture permettant à un passeport émis par un système d’être lu par tout autre."),
    objectives: [
      L("Explore DPP system architectures.", "Explorer les architectures de systèmes DPP."),
      L("Promote interoperability between digital passport systems.", "Promouvoir l’interopérabilité entre systèmes de passeport numérique."),
      L("Analyse data exchange mechanisms.", "Analyser les mécanismes d’échange de données."),
      L("Examine APIs, data carriers and identification systems.", "Étudier les API, supports de données et systèmes d’identification."),
      L("Encourage alignment between technical solutions.", "Encourager l’alignement des solutions techniques."),
    ],
    activities: [
      L("Architecture review sessions with technology providers.", "Séances de revue d’architecture avec les fournisseurs de technologies."),
      L("Liaison with CEN/CENELEC JTC 24 work items.", "Liaison avec les travaux du CEN/CENELEC JTC 24."),
      L("Joint sessions with WG10 on interoperability testing.", "Séances conjointes avec le WG10 sur les tests d’interopérabilité."),
    ],
    deliverables: [
      L("Technical architecture recommendations.", "Recommandations d’architecture technique."),
      L("Interoperability guidelines.", "Lignes directrices d’interopérabilité."),
      L("Technical reports.", "Rapports techniques."),
      L("Best-practice documentation.", "Documentation de bonnes pratiques."),
    ],
    leadership: [...open],
    projects: [{ title: L("Reference architecture map: identifiers, carriers, resolvers", "Cartographie d’architecture de référence : identifiants, supports, résolveurs"), status: "active", illustrative: true }],
    meetings: [{ date: "2026-12-16T10:00:00+01:00", title: L("Architecture review #4", "Revue d’architecture n° 4"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg3", code: "WG3", slug: "data-standards-semantics-governance",
    name: L("Data Standards, Semantics & Governance", "Normes de données, sémantique et gouvernance"),
    tagline: L("Meaning that survives the exchange.", "Un sens qui survit à l’échange."),
    mission: L(
      "Ensure that the data inside a passport means the same thing to every reader: harmonised structures, shared vocabularies, quality rules and governance arrangements that keep data trustworthy across its lifetime.",
      "Garantir que les données d’un passeport ont le même sens pour tous : structures harmonisées, vocabulaires partagés, règles de qualité et gouvernance qui maintiennent la fiabilité des données tout au long de leur vie."),
    objectives: [
      L("Promote harmonised data structures.", "Promouvoir des structures de données harmonisées."),
      L("Explore ontologies and semantic interoperability.", "Explorer les ontologies et l’interopérabilité sémantique."),
      L("Encourage data quality and consistency.", "Encourager la qualité et la cohérence des données."),
      L("Define approaches to data governance.", "Définir des approches de gouvernance des données."),
      L("Support FAIR data principles where relevant.", "Soutenir les principes FAIR lorsque pertinent."),
    ],
    activities: [
      L("Glossary editorial board.", "Comité éditorial du glossaire."),
      L("Semantic alignment workshops with sector groups.", "Ateliers d’alignement sémantique avec les groupes sectoriels."),
    ],
    deliverables: [
      L("Data models.", "Modèles de données."),
      L("Semantic frameworks.", "Cadres sémantiques."),
      L("Data governance recommendations.", "Recommandations de gouvernance des données."),
      L("Common terminology and glossaries.", "Terminologie commune et glossaires."),
    ],
    leadership: [...open],
    projects: [{ title: L("European DPP glossary, edition 1", "Glossaire européen du DPP, édition 1"), status: "active", illustrative: true }],
    meetings: [{ date: "2027-01-13T14:00:00+01:00", title: L("Glossary editorial meeting", "Réunion éditoriale du glossaire"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg4", code: "WG4", slug: "industrial-adoption-sectoral-implementation",
    name: L("Industrial Adoption & Sectoral Implementation", "Adoption industrielle et mise en œuvre sectorielle"),
    tagline: L("From regulation to the factory floor.", "De la réglementation à l’atelier."),
    mission: L(
      "Translate the DPP into sector reality: implementation guides, case studies and roadmaps for the product groups the regulation reaches first.",
      "Traduire le DPP en réalité sectorielle : guides de mise en œuvre, études de cas et feuilles de route pour les groupes de produits concernés en premier par la réglementation."),
    objectives: [
      L("Develop sector-specific DPP initiatives.", "Développer des initiatives DPP sectorielles."),
      L("Identify sector-specific data requirements and sources.", "Identifier les exigences et sources de données propres à chaque secteur."),
      L("Document implementation challenges and workable solutions.", "Documenter les difficultés de mise en œuvre et les solutions praticables."),
    ],
    activities: [
      L("Sector sub-groups with their own meeting cycle.", "Sous-groupes sectoriels avec leur propre cycle de réunions."),
      L("Site visits and industrial demonstrations with WG10.", "Visites de sites et démonstrations industrielles avec le WG10."),
    ],
    deliverables: [
      L("Sector-specific implementation guides.", "Guides de mise en œuvre sectoriels."),
      L("Industrial case studies.", "Études de cas industrielles."),
      L("Adoption roadmaps.", "Feuilles de route d’adoption."),
      L("Identification of implementation challenges.", "Identification des difficultés de mise en œuvre."),
    ],
    sectors: [L("Batteries", "Batteries"), L("Textiles", "Textiles"), L("Electronics", "Électronique"), L("Construction products", "Produits de construction"), L("Chemicals", "Chimie"), L("Automotive", "Automobile"), L("Furniture", "Ameublement"), L("Machinery", "Machines")],
    leadership: [...open],
    projects: [
      { title: L("Battery passport readiness guide for component suppliers", "Guide de préparation au passeport batterie pour les fournisseurs de composants"), status: "active", illustrative: true },
      { title: L("Textile DPP pilot cohort", "Cohorte pilote DPP textile"), status: "planned", illustrative: true },
    ],
    meetings: [{ date: "2026-12-03T09:30:00+01:00", title: L("Sector sub-group: batteries", "Sous-groupe sectoriel : batteries"), mode: "hybrid", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg5", code: "WG5", slug: "digital-identity-security-trust",
    name: L("Digital Identity, Security & Trust", "Identité numérique, sécurité et confiance"),
    tagline: L("A passport is only as good as its seal.", "Un passeport ne vaut que par son sceau."),
    mission: L(
      "Define how a passport proves what it says: identities for products and actors, verifiable credentials, access rights, confidentiality and the security architecture that makes trusted exchange possible.",
      "Définir comment un passeport prouve ce qu’il affirme : identités des produits et des acteurs, attestations vérifiables, droits d’accès, confidentialité et architecture de sécurité rendant l’échange de confiance possible."),
    objectives: [
      L("Explore digital identities and credentials.", "Explorer les identités numériques et les attestations."),
      L("Examine cybersecurity and data protection.", "Étudier la cybersécurité et la protection des données."),
      L("Address authenticity and verification.", "Traiter l’authenticité et la vérification."),
      L("Explore access rights and data confidentiality.", "Explorer les droits d’accès et la confidentialité des données."),
      L("Investigate trusted information exchange.", "Étudier l’échange d’informations de confiance."),
    ],
    activities: [
      L("Threat-modelling workshops on DPP architectures.", "Ateliers de modélisation des menaces sur les architectures DPP."),
      L("Liaison with the EU Digital Identity Wallet ecosystem.", "Liaison avec l’écosystème du portefeuille européen d’identité numérique."),
    ],
    deliverables: [
      L("Security recommendations.", "Recommandations de sécurité."),
      L("Trust frameworks.", "Cadres de confiance."),
      L("Identity management guidelines.", "Lignes directrices de gestion des identités."),
      L("Best-practice reports.", "Rapports de bonnes pratiques."),
    ],
    leadership: [...open],
    projects: [{ title: L("Access-rights matrix by actor and lifecycle stage", "Matrice des droits d’accès par acteur et étape du cycle de vie"), status: "active", illustrative: true }],
    meetings: [{ date: "2027-01-20T15:00:00+01:00", title: L("Trust framework drafting session", "Séance de rédaction du cadre de confiance"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg6", code: "WG6", slug: "circular-economy-sustainability",
    name: L("Circular Economy & Sustainability", "Économie circulaire et durabilité"),
    tagline: L("The data that keeps products in use.", "Les données qui maintiennent les produits en usage."),
    mission: L(
      "Connect the passport to its purpose: repair, reuse, remanufacturing and recycling, and the environmental information that lets markets reward better products.",
      "Relier le passeport à sa finalité : réparation, réemploi, refabrication et recyclage, et l’information environnementale qui permet aux marchés de récompenser les meilleurs produits."),
    objectives: [
      L("Connect DPPs with circular economy strategies.", "Relier les DPP aux stratégies d’économie circulaire."),
      L("Improve product lifecycle information.", "Améliorer l’information sur le cycle de vie des produits."),
      L("Facilitate repair, reuse and recycling.", "Faciliter la réparation, le réemploi et le recyclage."),
      L("Support sustainability transparency.", "Soutenir la transparence en matière de durabilité."),
      L("Explore environmental information and product footprints.", "Explorer l’information environnementale et les empreintes produits."),
    ],
    activities: [
      L("Dialogue with repairers, refurbishers and recyclers.", "Dialogue avec les réparateurs, reconditionneurs et recycleurs."),
      L("Alignment with PEF and lifecycle-assessment practice.", "Alignement avec la pratique PEF et l’analyse du cycle de vie."),
    ],
    deliverables: [
      L("Circularity indicators.", "Indicateurs de circularité."),
      L("Lifecycle information guidelines.", "Lignes directrices sur l’information du cycle de vie."),
      L("Sustainability data recommendations.", "Recommandations sur les données de durabilité."),
      L("Industry case studies.", "Études de cas industrielles."),
    ],
    leadership: [...open],
    projects: [{ title: L("Minimum circularity data set for repair operators", "Jeu de données minimal de circularité pour les opérateurs de réparation"), status: "planned", illustrative: true }],
    meetings: [{ date: "2026-12-11T11:00:00+01:00", title: L("Circularity indicators — scoping", "Indicateurs de circularité — cadrage"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg7", code: "WG7", slug: "smes-implementation-business-models",
    name: L("SMEs, Implementation & Business Models", "PME, mise en œuvre et modèles économiques"),
    tagline: L("Compliance that a ten-person company can afford.", "Une conformité à la portée d’une entreprise de dix personnes."),
    mission: L(
      "Make the DPP workable for small and medium-sized enterprises: plain-language requirements, affordable tools, realistic roadmaps and the business case for doing it well.",
      "Rendre le DPP praticable pour les PME : exigences en langage clair, outils abordables, feuilles de route réalistes et argumentaire économique."),
    objectives: [
      L("Help SMEs understand and implement DPP requirements.", "Aider les PME à comprendre et à mettre en œuvre les exigences DPP."),
      L("Identify affordable technological solutions.", "Identifier des solutions technologiques abordables."),
      L("Develop implementation roadmaps.", "Élaborer des feuilles de route de mise en œuvre."),
      L("Explore business models and economic opportunities.", "Explorer les modèles économiques et les opportunités."),
      L("Facilitate access to expertise and funding.", "Faciliter l’accès à l’expertise et aux financements."),
    ],
    activities: [
      L("SME clinics: short, practical question-and-answer sessions.", "Cliniques PME : courtes séances pratiques de questions-réponses."),
      L("Cooperation with chambers of commerce and clusters.", "Coopération avec les chambres de commerce et les clusters."),
    ],
    deliverables: [
      L("SME implementation toolkit.", "Boîte à outils de mise en œuvre pour les PME."),
      L("DPP readiness assessment.", "Autoévaluation de maturité DPP."),
      L("Cost and maturity assessment frameworks.", "Cadres d’évaluation des coûts et de la maturité."),
      L("Practical implementation guides.", "Guides pratiques de mise en œuvre."),
    ],
    leadership: [...open],
    projects: [{ title: L("DPP readiness self-assessment, version 1", "Autoévaluation de maturité DPP, version 1"), status: "active", illustrative: true }],
    meetings: [{ date: "2026-12-17T16:00:00+01:00", title: L("SME clinic #3", "Clinique PME n° 3"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg8", code: "WG8", slug: "research-innovation-emerging-technologies",
    name: L("Research, Innovation & Emerging Technologies", "Recherche, innovation et technologies émergentes"),
    tagline: L("What the passport becomes next.", "Ce que le passeport deviendra."),
    mission: L(
      "Connect research with implementation: AI for data extraction and validation, digital twins, distributed architectures and the collaborative projects that turn them into practice.",
      "Relier la recherche à la mise en œuvre : IA pour l’extraction et la validation des données, jumeaux numériques, architectures distribuées et projets collaboratifs qui les concrétisent."),
    objectives: [
      L("Explore AI applications for DPPs.", "Explorer les applications de l’IA au DPP."),
      L("Investigate digital twins and product lifecycle systems.", "Étudier les jumeaux numériques et les systèmes de cycle de vie."),
      L("Explore distributed architectures.", "Explorer les architectures distribuées."),
      L("Connect research institutions with industry.", "Relier les institutions de recherche à l’industrie."),
      L("Identify collaborative research opportunities.", "Identifier les opportunités de recherche collaborative."),
    ],
    activities: [
      L("Research seminar series.", "Cycle de séminaires de recherche."),
      L("Consortium-building sessions ahead of Horizon Europe calls.", "Séances de constitution de consortiums avant les appels Horizon Europe."),
    ],
    deliverables: [
      L("Research reports.", "Rapports de recherche."),
      L("Technology roadmaps.", "Feuilles de route technologiques."),
      L("Innovation workshops.", "Ateliers d’innovation."),
      L("Collaborative project proposals.", "Propositions de projets collaboratifs."),
    ],
    leadership: [...open],
    projects: [{ title: L("Technology landscape: DPP software and services in Europe", "Panorama technologique : logiciels et services DPP en Europe"), status: "active", illustrative: true }],
    meetings: [{ date: "2027-01-27T14:00:00+01:00", title: L("Research seminar: AI-assisted data validation", "Séminaire de recherche : validation des données assistée par IA"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg9", code: "WG9", slug: "skills-education-training",
    name: L("Skills, Education & Training", "Compétences, éducation et formation"),
    tagline: L("The people who will run the passports.", "Les personnes qui feront vivre les passeports."),
    mission: L(
      "Build the competences Europe needs to issue, read and use product passports, from vocational training to postgraduate programmes.",
      "Construire les compétences dont l’Europe a besoin pour émettre, lire et utiliser les passeports produits, de la formation professionnelle aux programmes de troisième cycle."),
    objectives: [
      L("Develop DPP educational programmes.", "Développer des programmes éducatifs DPP."),
      L("Organise training sessions.", "Organiser des sessions de formation."),
      L("Create professional learning resources.", "Créer des ressources d’apprentissage professionnel."),
      L("Connect universities and industry.", "Relier universités et industrie."),
      L("Develop competency frameworks.", "Développer des référentiels de compétences."),
    ],
    activities: [
      L("Curriculum working sessions with universities of applied sciences.", "Séances de travail sur les cursus avec les hautes écoles spécialisées."),
      L("Promotion of young professionals (statutes § 3 a 4).", "Promotion des jeunes professionnels (statuts § 3 a 4)."),
    ],
    deliverables: [
      L("Training programmes.", "Programmes de formation."),
      L("Webinars and masterclasses.", "Webinaires et masterclasses."),
      L("Educational resources.", "Ressources pédagogiques."),
      L("DPP competency framework.", "Référentiel de compétences DPP."),
    ],
    leadership: [...open],
    projects: [{ title: L("DPP competency framework, consultation draft", "Référentiel de compétences DPP, projet pour consultation"), status: "planned", illustrative: true }],
    meetings: [{ date: "2027-02-03T10:00:00+01:00", title: L("Curriculum session", "Séance cursus"), mode: "online", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
  {
    id: "wg10", code: "WG10", slug: "testing-pilots-demonstrators",
    name: L("Testing, Pilots & Demonstrators", "Tests, pilotes et démonstrateurs"),
    tagline: L("Proof, not slides.", "Des preuves, pas des diapositives."),
    mission: L(
      "Put passports to the test: collaborative pilots, live demonstrators and interoperability plugfests where different implementations meet real products, and publish what breaks.",
      "Mettre les passeports à l’épreuve : pilotes collaboratifs, démonstrateurs réels et plugfests d’interopérabilité où différentes implémentations rencontrent de vrais produits, et publier ce qui casse."),
    objectives: [
      L("Organise collaborative DPP pilot projects.", "Organiser des projets pilotes DPP collaboratifs."),
      L("Create demonstrators.", "Créer des démonstrateurs."),
      L("Test interoperability.", "Tester l’interopérabilité."),
      L("Compare implementation approaches.", "Comparer les approches de mise en œuvre."),
      L("Identify practical obstacles.", "Identifier les obstacles pratiques."),
      L("Publish lessons learned.", "Publier les enseignements tirés."),
    ],
    activities: [
      L("Twice-yearly interoperability plugfest.", "Plugfest d’interopérabilité semestriel."),
      L("Open demonstrator days hosted by member organisations.", "Journées démonstrateurs ouvertes accueillies par des organisations membres."),
    ],
    deliverables: [
      L("Demonstrator projects.", "Projets de démonstrateurs."),
      L("Pilot reports.", "Rapports de pilotes."),
      L("Technical evaluation frameworks.", "Cadres d’évaluation technique."),
      L("Implementation recommendations.", "Recommandations de mise en œuvre."),
    ],
    leadership: [...open],
    projects: [
      { title: L("Plugfest 2027: cross-vendor passport resolution", "Plugfest 2027 : résolution de passeports inter-fournisseurs"), status: "planned", illustrative: true },
      { title: L("Demonstrator: one product, three passport systems", "Démonstrateur : un produit, trois systèmes de passeport"), status: "active", illustrative: true },
    ],
    meetings: [{ date: "2027-03-10T09:00:00+01:00", title: L("Plugfest planning", "Préparation du plugfest"), mode: "hybrid", illustrative: true }],
    memberCount: 0, illustrativeStats: true,
  },
];

export const getWorkingGroup = (idOrSlug: string) =>
  workingGroups.find((w) => w.id === idOrSlug || w.slug === idOrSlug);
