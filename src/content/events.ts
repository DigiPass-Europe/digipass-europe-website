import type { AssociationEvent, Localized } from "./types";

const L = (en: string, fr: string): Localized => ({ en, fr });
const SPK = (name: string, en: string, fr: string) => ({ name, role: L(en, fr), illustrative: true as const });

export const events: AssociationEvent[] = [
  {
    slug: "webinar-espr-delegated-acts-what-changes-in-2027", type: "webinar",
    title: L("ESPR delegated acts: what changes for your sector in 2027", "Actes délégués ESPR : ce qui change pour votre secteur en 2027"),
    summary: L("A briefing by WG1 on the delegated acts adopted so far and the sectors next in line.", "Une note d’information du WG1 sur les actes délégués adoptés et les secteurs à venir."),
    description: L("The Commission’s working plan sets the order in which product groups receive passport obligations. This session walks through the adopted and draft delegated acts, the data elements each one requires and the practical timelines for manufacturers, importers and recyclers.", "Le plan de travail de la Commission fixe l’ordre dans lequel les groupes de produits reçoivent leurs obligations de passeport. Cette session passe en revue les actes délégués adoptés et en projet, les éléments de données exigés et les calendriers pratiques pour fabricants, importateurs et recycleurs."),
    start: "2026-12-02T11:00:00+01:00", end: "2026-12-02T12:00:00+01:00",
    location: L("Online", "En ligne"), online: true,
    speakers: [SPK("[Speaker to be confirmed]", "WG1 rapporteur", "Rapporteur du WG1")],
    audience: L("Regulatory and compliance teams, SMEs, trade associations", "Équipes réglementaires et conformité, PME, fédérations"),
    pricing: null, workingGroups: ["wg1"], illustrative: true,
  },
  {
    slug: "workshop-interoperability-identifiers-and-resolvers", type: "workshop",
    title: L("Identifiers and resolvers: making passports findable", "Identifiants et résolveurs : rendre les passeports repérables"),
    summary: L("Hands-on workshop by WG2 on identifier schemes, data carriers and resolver architectures.", "Atelier pratique du WG2 sur les schémas d’identifiants, supports de données et architectures de résolveurs."),
    description: L("Participants bring a real product and leave with a working resolution chain from data carrier to passport record. Three implementation approaches are compared side by side.", "Les participants apportent un produit réel et repartent avec une chaîne de résolution fonctionnelle, du support de données à l’enregistrement du passeport. Trois approches sont comparées."),
    start: "2027-01-21T09:30:00+01:00", end: "2027-01-21T16:30:00+01:00",
    location: L("Wiener Neustadt, Austria (hybrid)", "Wiener Neustadt, Autriche (hybride)"), online: true,
    speakers: [SPK("[Speaker to be confirmed]", "WG2 co-lead", "Co-responsable du WG2"), SPK("[Speaker to be confirmed]", "Technology provider, member organisation", "Fournisseur de technologie, organisation membre")],
    audience: L("Architects, IT leads, technology providers", "Architectes, responsables IT, fournisseurs de technologies"),
    pricing: { members: 0, nonMembers: 190 }, workingGroups: ["wg2", "wg10"], illustrative: true,
  },
  {
    slug: "european-dpp-conference-2027", type: "conference",
    title: L("European DPP Conference 2027", "Conférence européenne du DPP 2027"),
    summary: L("The annual flagship event of DigiPass:Europe: policy, technology, industry demonstrations and the Innovation Awards.", "L’événement phare annuel de DigiPass:Europe : politique, technologie, démonstrations industrielles et prix de l’innovation."),
    description: L("Two days bringing together European institutions, standards bodies, industry, research and technology providers. Keynotes, policy panels, technical tracks, a demonstrator hall run by WG10, working-group meetings and the first European DPP Innovation Awards ceremony.", "Deux jours réunissant institutions européennes, organismes de normalisation, industrie, recherche et fournisseurs. Plénières, panels politiques, sessions techniques, hall des démonstrateurs animé par le WG10, réunions des groupes de travail et première cérémonie des prix européens de l’innovation DPP."),
    start: "2027-06-15T09:00:00+02:00", end: "2027-06-16T17:00:00+02:00",
    location: L("Vienna, Austria", "Vienne, Autriche"), online: false,
    speakers: [SPK("[Keynote to be announced]", "European institution", "Institution européenne"), SPK("[Keynote to be announced]", "Industry", "Industrie")],
    audience: L("All DPP stakeholders", "Toutes les parties prenantes du DPP"),
    pricing: { members: 290, nonMembers: 590 }, workingGroups: ["wg1", "wg2", "wg3", "wg4", "wg5", "wg6", "wg7", "wg8", "wg9", "wg10"], illustrative: true,
  },
  {
    slug: "roundtable-recyclers-data-access", type: "roundtable",
    title: L("Policy roundtable: data access for recyclers and refurbishers", "Table ronde : accès aux données pour les recycleurs et reconditionneurs"),
    summary: L("WG1 and WG6 convene industry and institutions on who may read what, and when.", "Les WG1 et WG6 réunissent industrie et institutions sur qui peut lire quoi, et quand."),
    description: L("A closed-door roundtable under the Chatham House Rule to prepare a position paper on access rights across the product lifecycle.", "Une table ronde à huis clos, selon la règle de Chatham House, pour préparer une prise de position sur les droits d’accès tout au long du cycle de vie."),
    start: "2027-02-24T14:00:00+01:00", end: "2027-02-24T17:00:00+01:00",
    location: L("Brussels, Belgium", "Bruxelles, Belgique"), online: false,
    speakers: [],
    audience: L("Invited members and institutional guests", "Membres invités et invités institutionnels"),
    pricing: null, workingGroups: ["wg1", "wg6"], illustrative: true,
  },
  {
    slug: "webinar-introduction-to-the-digital-product-passport", type: "webinar",
    title: L("Introduction to the Digital Product Passport", "Introduction au passeport numérique des produits"),
    summary: L("The Training Academy’s open entry session: what a DPP is, who must provide one, and where to start.", "La session d’entrée ouverte de l’Académie : ce qu’est un DPP, qui doit en fournir un, et par où commencer."),
    description: L("A one-hour introduction for newcomers, repeated quarterly. Recording available in the Knowledge Hub.", "Une introduction d’une heure pour les nouveaux venus, répétée chaque trimestre. Enregistrement disponible dans le centre de ressources."),
    start: "2026-10-14T11:00:00+02:00", end: "2026-10-14T12:00:00+02:00",
    location: L("Online", "En ligne"), online: true,
    speakers: [SPK("[Speaker to be confirmed]", "Training Academy", "Académie de formation")],
    audience: L("Newcomers to the DPP", "Nouveaux venus au DPP"),
    pricing: null, workingGroups: ["wg9"], illustrative: true,
  },
  {
    slug: "wg-meeting-kick-off-working-groups", type: "wg-meeting",
    title: L("Working groups kick-off", "Lancement des groupes de travail"),
    summary: L("Constitution of the ten working groups and election of chairs and vice-chairs.", "Constitution des dix groupes de travail et élection des président·es et vice-président·es."),
    description: L("Members choose their working groups, candidates for chair and vice-chair present themselves and each group adopts its first-year work plan.", "Les membres choisissent leurs groupes de travail, les candidat·es à la présidence et vice-présidence se présentent et chaque groupe adopte son plan de travail de première année."),
    start: "2026-09-23T13:00:00+02:00", end: "2026-09-23T17:00:00+02:00",
    location: L("Online", "En ligne"), online: true,
    speakers: [],
    audience: L("Members", "Membres"),
    pricing: null, workingGroups: ["wg1", "wg2", "wg3", "wg4", "wg5", "wg6", "wg7", "wg8", "wg9", "wg10"], illustrative: true,
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
