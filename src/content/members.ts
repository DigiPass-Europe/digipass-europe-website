import type { MemberOrg, Localized } from "./types";
const L = (en: string, fr: string): Localized => ({ en, fr });

// Illustrative organisations only. Names are generic placeholders, not real companies.
export const memberOrgs: MemberOrg[] = [
  { id: "m1", name: "[Battery manufacturer, AT]", country: "AT", type: "large-enterprise", website: "#", tier: "large", published: true, illustrative: true,
    description: L("Illustrative profile of a large battery manufacturer.", "Profil illustratif d’un grand fabricant de batteries."), expertise: ["battery passport", "supply chain data"], sectors: ["batteries", "automotive"], workingGroups: ["wg4", "wg2"] },
  { id: "m2", name: "[Textile SME, PT]", country: "PT", type: "sme", website: "#", tier: "sme-small", published: true, illustrative: true,
    description: L("Illustrative profile of a textile SME preparing for the textile delegated act.", "Profil illustratif d’une PME textile se préparant à l’acte délégué textile."), expertise: ["traceability", "fibre composition"], sectors: ["textiles"], workingGroups: ["wg4", "wg7"] },
  { id: "m3", name: "[Technical university, DE]", country: "DE", type: "university", website: "#", tier: "university", published: true, illustrative: true,
    description: L("Illustrative profile of a technical university with a product-lifecycle research group.", "Profil illustratif d’une université technique avec un groupe de recherche sur le cycle de vie des produits."), expertise: ["ontologies", "digital twins"], sectors: ["machinery", "electronics"], workingGroups: ["wg3", "wg8"] },
  { id: "m4", name: "[DPP software provider, NL]", country: "NL", type: "technology-provider", website: "#", tier: "sme-medium", published: true, illustrative: true,
    description: L("Illustrative profile of a passport platform provider.", "Profil illustratif d’un fournisseur de plateforme de passeports."), expertise: ["resolvers", "APIs", "verifiable credentials"], sectors: ["electronics", "textiles"], workingGroups: ["wg2", "wg5", "wg10"] },
  { id: "m5", name: "[Recycling operator, FR]", country: "FR", type: "sme", website: "#", tier: "sme-medium", published: true, illustrative: true,
    description: L("Illustrative profile of an electronics recycling operator.", "Profil illustratif d’un opérateur de recyclage électronique."), expertise: ["end-of-life data", "material recovery"], sectors: ["electronics"], workingGroups: ["wg6"] },
  { id: "m6", name: "[Standards institute, BE]", country: "BE", type: "non-profit", website: "#", tier: "non-profit", published: true, illustrative: true,
    description: L("Illustrative profile of a standardisation body liaison.", "Profil illustratif d’une liaison avec un organisme de normalisation."), expertise: ["standardisation", "conformity"], sectors: ["construction", "chemicals"], workingGroups: ["wg1", "wg3"] },
  { id: "m7", name: "[Research centre, IT]", country: "IT", type: "research-centre", website: "#", tier: "university", published: true, illustrative: true,
    description: L("Illustrative profile of an applied research centre.", "Profil illustratif d’un centre de recherche appliquée."), expertise: ["AI data extraction", "LCA"], sectors: ["furniture", "construction"], workingGroups: ["wg8", "wg6"] },
  { id: "m8", name: "[Industry start-up, ES]", country: "ES", type: "startup", website: "#", tier: "startup", published: true, illustrative: true,
    description: L("Illustrative profile of a start-up building QR-based data carriers.", "Profil illustratif d’une start-up développant des supports de données par QR."), expertise: ["data carriers", "GS1 Digital Link"], sectors: ["textiles", "furniture"], workingGroups: ["wg2", "wg7"] },
  { id: "m9", name: "[Public agency, SE]", country: "SE", type: "public", website: "#", tier: "non-profit", published: true, illustrative: true,
    description: L("Illustrative profile of a national environmental agency.", "Profil illustratif d’une agence nationale de l’environnement."), expertise: ["policy", "market surveillance"], sectors: ["batteries", "electronics"], workingGroups: ["wg1"] },
  { id: "m10", name: "[Unpublished member]", country: "PL", type: "sme", website: "#", tier: "sme-small", published: false, illustrative: true,
    description: L("This member has chosen not to be listed.", "Ce membre a choisi de ne pas être listé."), expertise: [], sectors: ["machinery"], workingGroups: ["wg4"] },
];

export const countries: Record<string, Localized> = {
  AT: L("Austria", "Autriche"), BE: L("Belgium", "Belgique"), DE: L("Germany", "Allemagne"), ES: L("Spain", "Espagne"), FR: L("France", "France"),
  IT: L("Italy", "Italie"), NL: L("Netherlands", "Pays-Bas"), PL: L("Poland", "Pologne"), PT: L("Portugal", "Portugal"), SE: L("Sweden", "Suède"),
};
export const orgTypeLabels: Record<string, Localized> = {
  startup: L("Start-up", "Start-up"), sme: L("SME", "PME"), "large-enterprise": L("Large enterprise", "Grande entreprise"), university: L("University", "Université"),
  "research-centre": L("Research centre", "Centre de recherche"), "non-profit": L("Non-profit", "Sans but lucratif"), public: L("Public institution", "Institution publique"),
  "technology-provider": L("Technology provider", "Fournisseur de technologie"), association: L("Association", "Association"),
};
