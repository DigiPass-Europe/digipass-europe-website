import type { Resource, Localized } from "./types";
const L = (en: string, fr: string): Localized => ({ en, fr });

export const resources: Resource[] = [
  { id: "r1", type: "regulatory-analysis", date: "2026-10-05", workingGroup: "wg1", membersOnly: true, illustrative: true,
    title: L("European DPP regulatory tracker — edition 1", "Tableau de suivi réglementaire européen du DPP — édition 1"),
    summary: L("Adopted and draft delegated acts, required data elements, application dates.", "Actes délégués adoptés et en projet, éléments de données requis, dates d’application.") },
  { id: "r2", type: "guide", date: "2026-10-20", workingGroup: "wg7", membersOnly: false, illustrative: true,
    title: L("DPP in plain language: a first guide for SMEs", "Le DPP en langage clair : premier guide pour les PME"),
    summary: L("What a passport is, who must provide one and the five questions to answer first.", "Ce qu’est un passeport, qui doit en fournir un et les cinq questions à traiter en premier.") },
  { id: "r3", type: "report", date: "2026-11-02", workingGroup: "wg2", membersOnly: true, illustrative: true,
    title: L("Reference architecture map: identifiers, carriers, resolvers", "Cartographie d’architecture de référence : identifiants, supports, résolveurs"),
    summary: L("A layered view of DPP system components and the standards that apply at each layer.", "Une vue en couches des composants d’un système DPP et des normes applicables à chaque couche.") },
  { id: "r4", type: "case-study", date: "2026-10-28", workingGroup: "wg10", sectors: ["electronics"], membersOnly: false, illustrative: true,
    title: L("Demonstrator brief: one product, three passport systems", "Note de démonstrateur : un produit, trois systèmes de passeport"),
    summary: L("Set-up, participating implementations and the test protocol.", "Mise en place, implémentations participantes et protocole de test.") },
  { id: "r5", type: "recording", date: "2026-10-14", workingGroup: "wg9", membersOnly: false, illustrative: true,
    title: L("Recording: Introduction to the Digital Product Passport", "Enregistrement : Introduction au passeport numérique des produits"),
    summary: L("The Training Academy’s open entry session.", "La session d’entrée ouverte de l’Académie.") },
  { id: "r6", type: "toolkit", date: "2026-11-12", workingGroup: "wg7", membersOnly: true, illustrative: true,
    title: L("DPP readiness self-assessment, version 1", "Autoévaluation de maturité DPP, version 1"),
    summary: L("Questionnaire and scoring rules across data, identifiers, systems, governance and supply chain.", "Questionnaire et règles de notation : données, identifiants, systèmes, gouvernance et chaîne d’approvisionnement.") },
  { id: "r7", type: "publication", date: "2026-09-30", workingGroup: "wg3", membersOnly: false, illustrative: true,
    title: L("European DPP glossary — consultation draft", "Glossaire européen du DPP — projet pour consultation"),
    summary: L("Eighty terms with definitions aligned to ESPR and ongoing standardisation work.", "Quatre-vingts termes définis en cohérence avec l’ESPR et les travaux de normalisation en cours.") },
  { id: "r8", type: "presentation", date: "2026-09-23", membersOnly: true, illustrative: true,
    title: L("Working groups kick-off: slides", "Lancement des groupes de travail : diapositives"),
    summary: L("Work plans adopted by the ten groups.", "Plans de travail adoptés par les dix groupes.") },
];
