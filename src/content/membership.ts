import type { FeeTier, BenefitRow, Localized } from "./types";

const L = (en: string, fr: string): Localized => ({ en, fr });

/**
 * Fee tiers are PROPOSALS for the Board and General Assembly (statutes § 4 g, § 10 c 8).
 * They never create new membership categories: each maps onto a category defined in § 4.
 */
export const feeTiers: FeeTier[] = [
  // Individuals
  { id: "student", kind: "individual", fee: 0, status: "proposed",
    name: L("Student / PhD", "Étudiant·e / doctorant·e"),
    statutoryCategory: L("Extraordinary member — § 4 c (students and pupils of higher educational institutions)", "Membre extraordinaire — § 4 c (étudiant·es et élèves d’établissements supérieurs)"),
    votes: L("No vote; may attend the General Assembly (§ 5 a)", "Pas de droit de vote ; peut assister à l’Assemblée générale (§ 5 a)") },
  { id: "supporter", kind: "supporter", fee: 75, status: "proposed",
    name: L("Supporter (subscription)", "Sympathisant·e (abonnement)"),
    statutoryCategory: L("Not a membership: a paid subscription to publications and open events (§ 5 e)", "Pas une adhésion : abonnement payant aux publications et événements ouverts (§ 5 e)"),
    votes: L("None", "Aucun"),
    note: L("The brief’s “Associate Individual” has no statutory category with reduced rights, so it is offered as a subscription.", "L’« adhérent associé » du brief n’a pas de catégorie statutaire à droits réduits ; il est proposé sous forme d’abonnement.") },
  { id: "full-individual", kind: "individual", fee: 150, status: "proposed", feeCategory: "small",
    name: L("Full Individual", "Membre individuel"),
    statutoryCategory: L("Ordinary member — § 4 b 2 (qualifying education or ≥ 4 years’ relevant experience)", "Membre ordinaire — § 4 b 2 (formation qualifiante ou ≥ 4 ans d’expérience pertinente)"),
    votes: L("One vote (§ 10 g); eligible for the Board (§ 5 b)", "Une voix (§ 10 g) ; éligible au Conseil (§ 5 b)") },
  { id: "expert", kind: "individual", fee: 250, status: "proposed", feeCategory: "medium",
    name: L("Expert / Supporting Member", "Membre expert / de soutien"),
    statutoryCategory: L("Ordinary member — § 4 b 2, higher voluntary contribution", "Membre ordinaire — § 4 b 2, cotisation volontaire majorée"),
    votes: L("One vote (§ 10 g) — identical to Full Individual", "Une voix (§ 10 g) — identique au membre individuel") },
  // Organisations
  { id: "startup", kind: "organisational", fee: 400, status: "proposed", feeCategory: "small",
    name: L("Start-up / Micro-enterprise", "Start-up / micro-entreprise"),
    statutoryCategory: L("Ordinary member — § 4 b 1 (legal entity)", "Membre ordinaire — § 4 b 1 (personne morale)"),
    votes: L("2 votes (§ 10 g, small fee category)", "2 voix (§ 10 g, catégorie de cotisation « petite »)") },
  { id: "sme-small", kind: "organisational", fee: 750, status: "proposed", feeCategory: "small",
    name: L("SME (under 50 employees)", "PME (moins de 50 salariés)"),
    statutoryCategory: L("Ordinary member — § 4 b 1", "Membre ordinaire — § 4 b 1"),
    votes: L("2 votes (§ 10 g)", "2 voix (§ 10 g)") },
  { id: "sme-medium", kind: "organisational", fee: 1500, status: "proposed", feeCategory: "medium",
    name: L("SME (50–249 employees)", "PME (50–249 salariés)"),
    statutoryCategory: L("Ordinary member — § 4 b 1", "Membre ordinaire — § 4 b 1"),
    votes: L("3 votes (§ 10 g, medium fee category)", "3 voix (§ 10 g, catégorie « moyenne »)") },
  { id: "large", kind: "organisational", fee: 3000, status: "proposed", feeCategory: "large",
    name: L("Large Enterprise", "Grande entreprise"),
    statutoryCategory: L("Ordinary member — § 4 b 1", "Membre ordinaire — § 4 b 1"),
    votes: L("4 votes (§ 10 g, large fee category)", "4 voix (§ 10 g, catégorie « grande »)") },
  { id: "university", kind: "organisational", fee: 900, status: "proposed", feeCategory: "medium",
    name: L("University / Research Centre", "Université / centre de recherche"),
    statutoryCategory: L("Ordinary member — § 4 b 1", "Membre ordinaire — § 4 b 1"),
    votes: L("3 votes (§ 10 g)", "3 voix (§ 10 g)") },
  { id: "non-profit", kind: "organisational", fee: 600, status: "proposed", feeCategory: "small",
    name: L("Non-profit / Public Institution", "Organisme sans but lucratif / institution publique"),
    statutoryCategory: L("Ordinary member — § 4 b 1 (authorities and corporations included)", "Membre ordinaire — § 4 b 1 (autorités et collectivités comprises)"),
    votes: L("2 votes (§ 10 g)", "2 voix (§ 10 g)") },
  { id: "strategic", kind: "organisational", fee: 5000, status: "proposed", feeCategory: "large",
    name: L("Strategic / Founding Partner", "Partenaire stratégique / fondateur"),
    statutoryCategory: L("Ordinary member — § 4 b 1. Partnership adds visibility, never governance rights.", "Membre ordinaire — § 4 b 1. Le partenariat apporte de la visibilité, jamais des droits de gouvernance."),
    votes: L("4 votes maximum (§ 10 g) — the statutory ceiling, same as Large Enterprise", "4 voix au maximum (§ 10 g) — plafond statutaire, identique à la grande entreprise") },
];

export const benefits: BenefitRow[] = [
  { benefit: L("Access to the DigiPass:Europe community", "Accès à la communauté DigiPass:Europe"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Newsletter and DPP regulatory updates", "Lettre d’information et veille réglementaire DPP"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Participation in open webinars", "Participation aux webinaires ouverts"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Access to selected publications", "Accès à une sélection de publications"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Invitations to networking events", "Invitations aux événements de réseautage"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Participation in eligible working groups", "Participation aux groupes de travail éligibles"), all: true, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Full participation in all working groups", "Participation pleine à tous les groupes de travail"), all: false, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Access to exclusive technical resources", "Accès aux ressources techniques exclusives"), all: false, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Ability to propose initiatives and motions (§ 5 a)", "Possibilité de proposer des initiatives et motions (§ 5 a)"), all: false, fullIndividual: true, organisational: true, strategic: true, governance: true },
  { benefit: L("Voting rights at the General Assembly (§ 10 g)", "Droit de vote à l’Assemblée générale (§ 10 g)"), all: false, fullIndividual: true, organisational: true, strategic: true, governance: true },
  { benefit: L("Eligibility for the Board (§ 5 b)", "Éligibilité au Conseil (§ 5 b)"), all: false, fullIndividual: true, organisational: true, strategic: true, governance: true },
  { benefit: L("Preferential event registration", "Inscription prioritaire aux événements"), all: false, fullIndividual: true, organisational: true, strategic: true },
  { benefit: L("Organisation profile in the members directory", "Profil d’organisation dans l’annuaire"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Multiple employee accounts according to tier (1–3 free event seats, § 5 c)", "Plusieurs comptes salariés selon le niveau (1 à 3 places gratuites, § 5 c)"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Initial information and advice on digitalisation and the DPP (§ 5 c)", "Information et conseil initiaux sur la numérisation et le DPP (§ 5 c)"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Visibility through association communications", "Visibilité dans les communications de l’association"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Opportunities to present use cases and projects", "Possibilité de présenter des cas d’usage et projets"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Preferential rates for conferences and workshops", "Tarifs préférentiels pour conférences et ateliers"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Access to collaborative project opportunities", "Accès aux opportunités de projets collaboratifs"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Participation in industry consultations, recommendations and roadmaps", "Participation aux consultations, recommandations et feuilles de route"), all: false, fullIndividual: false, organisational: true, strategic: true },
  { benefit: L("Enhanced institutional visibility and organisation profile", "Visibilité institutionnelle et profil renforcés"), all: false, fullIndividual: false, organisational: false, strategic: true },
  { benefit: L("Opportunities to sponsor events", "Possibilité de parrainer des événements"), all: false, fullIndividual: false, organisational: false, strategic: true },
  { benefit: L("Participation in strategic roundtables", "Participation aux tables rondes stratégiques"), all: false, fullIndividual: false, organisational: false, strategic: true },
  { benefit: L("Priority to contribute to flagship initiatives", "Priorité pour contribuer aux initiatives phares"), all: false, fullIndividual: false, organisational: false, strategic: true },
  { benefit: L("Opportunities to host working group meetings", "Possibilité d’accueillir des réunions de groupes de travail"), all: false, fullIndividual: false, organisational: false, strategic: true },
];

export const admissionSteps: Localized[] = [
  L("Application in text form to the Board (§ 4 f).", "Demande en forme écrite adressée au Conseil (§ 4 f)."),
  L("Endorsement by at least two members, one of them a Board member (§ 4 f).", "Parrainage par au moins deux membres, dont un membre du Conseil (§ 4 f)."),
  L("Board decision on admission and fee category, with reasons (§ 4 f–g).", "Décision motivée du Conseil sur l’admission et la catégorie de cotisation (§ 4 f–g)."),
  L("Pro-rata fee for the remaining association year (§ 6 a).", "Cotisation au prorata pour le reste de l’exercice (§ 6 a)."),
];
