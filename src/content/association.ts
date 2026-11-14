import type { Localized } from "./types";
const L = (en: string, fr: string): Localized => ({ en, fr });

export const site = {
  name: "DigiPass:Europe",
  shortName: "DIGIPASS:EUROPE",
  domain: "digipass-europe.eu",
  url: "https://digipass-europe.eu",
  email: "info@digipass-europe.eu",
  membershipEmail: "membership@digipass-europe.eu",
  pressEmail: "press@digipass-europe.eu",
  seat: "Wiener Neustadt, Austria",
  legalForm: L("Non-profit technical-scientific association (Verein) under Austrian law", "Association technico-scientifique à but non lucratif (Verein) de droit autrichien"),
  address: "[Street address to be completed]",
  register: "[ZVR number to be completed]",
};

export const mission = {
  headline: L("Shaping the Future of Digital Product Passports in Europe", "Façonner l’avenir du passeport numérique des produits en Europe"),
  alt: L("Connecting Europe’s Digital Product Passport Ecosystem", "Connecter l’écosystème européen du passeport numérique des produits"),
  supporting: L(
    "DigiPass:Europe brings together industry, technology providers, researchers, policymakers and other stakeholders to accelerate the development, adoption and interoperability of Digital Product Passports across Europe.",
    "DigiPass:Europe réunit l’industrie, les fournisseurs de technologies, les chercheurs, les décideurs et les autres parties prenantes pour accélérer le développement, l’adoption et l’interopérabilité des passeports numériques des produits en Europe."),
  // § 2 a–b verbatim in substance
  purpose: L(
    "DigiPass:Europe is a non-profit technical-scientific association for digitalisation and the Digital Product Passport. Its purpose is to promote all areas of digitalisation and the Digital Product Passport, from education and training through research and innovation to industrial application (statutes § 2 a).",
    "DigiPass:Europe est une association technico-scientifique à but non lucratif pour la numérisation et le passeport numérique des produits. Son objet est de promouvoir tous les domaines de la numérisation et du passeport numérique des produits, de la formation à l’application industrielle en passant par la recherche et l’innovation (statuts § 2 a)."),
  role: L(
    "The association is the European networking hub for digitalisation and the Digital Product Passport, and the interface to the European Commission, national and international initiatives and standardisation bodies (statutes § 2 b).",
    "L’association est le pôle européen de mise en réseau pour la numérisation et le passeport numérique des produits, et l’interface avec la Commission européenne, les initiatives nationales et internationales et les organismes de normalisation (statuts § 2 b)."),
  scope: L("Worldwide scope of activity, with a particular focus on Europe; branch offices without separate legal personality are provided for (§ 1 b).", "Champ d’activité mondial, avec un accent particulier sur l’Europe ; des antennes sans personnalité juridique propre sont prévues (§ 1 b)."),
};

// § 3 a — non-material means (selection shown publicly)
export const activities: Localized[] = [
  L("Working groups on fundamental topics of digitalisation and the Digital Product Passport.", "Groupes de travail sur les thèmes fondamentaux de la numérisation et du passeport numérique des produits."),
  L("Technical-scientific and popular-scientific events, lectures and courses.", "Événements, conférences et cours technico-scientifiques et de vulgarisation."),
  L("Education and further training in the field.", "Formation initiale et continue dans le domaine."),
  L("Promotion of young persons active in the relevant scientific and technical fields.", "Promotion des jeunes actifs dans les domaines scientifiques et techniques concernés."),
  L("Technical-scientific communication: newsletters, publications, participation in standards committees, contacts with international associations.", "Communication technico-scientifique : lettres d’information, publications, participation aux comités de normalisation, contacts avec les associations internationales."),
  L("Preparation, management or supervision of national and international projects and contracts.", "Préparation, gestion ou supervision de projets et contrats nationaux et internationaux."),
  L("Provision or brokerage of technical-scientific consulting services.", "Prestation ou mise en relation de services de conseil technico-scientifique."),
  L("Awarding of prizes and scholarships.", "Attribution de prix et de bourses."),
  L("Development and/or operation of a digital platform for the creation of Digital Product Passports.", "Développement et/ou exploitation d’une plateforme numérique de création de passeports numériques des produits."),
];

export const whyDpp: { title: Localized; text: Localized }[] = [
  { title: L("It is becoming law", "Cela devient la loi"), text: L("Under the Ecodesign for Sustainable Products Regulation, product groups will progressively require a Digital Product Passport before they can be placed on the EU market.", "En vertu du règlement sur l’écoconception des produits durables, les groupes de produits devront progressivement disposer d’un passeport numérique avant d’être mis sur le marché de l’UE.") },
  { title: L("It makes circularity operational", "Il rend la circularité opérationnelle"), text: L("Repairers, refurbishers and recyclers can only act on information they can reach. The passport carries it with the product.", "Réparateurs, reconditionneurs et recycleurs ne peuvent agir que sur l’information qu’ils atteignent. Le passeport la porte avec le produit.") },
  { title: L("It only works if it interoperates", "Il ne fonctionne que s’il est interopérable"), text: L("Thousands of issuers, one reading experience. That requires shared identifiers, data models, carriers and trust rules, agreed across sectors and borders.", "Des milliers d’émetteurs, une seule expérience de lecture. Cela exige des identifiants, modèles de données, supports et règles de confiance partagés, convenus entre secteurs et pays.") },
  { title: L("Europe sets the pace", "L’Europe donne le rythme"), text: L("The DPP is a European instrument with global supply-chain reach. Getting the standards right here shapes how products are documented everywhere.", "Le DPP est un instrument européen à portée mondiale sur les chaînes d’approvisionnement. Bien fixer les normes ici détermine la manière dont les produits seront documentés partout.") },
];
