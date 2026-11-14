import type { Localized } from "./types";
const L = (en: string, fr: string): Localized => ({ en, fr });

export type Body = { id: string; name: Localized; summary: Localized; points: Localized[] };

// Derived strictly from the statutes (§ 8–15). No names are published until appointed.
export const bodies: Body[] = [
  { id: "board", name: L("Board", "Conseil d’administration"),
    summary: L("The governing body. It conducts the association’s business, implements General Assembly resolutions and consists of at least five natural persons, the founding members, plus members elected for specific areas (§ 9 a–b).", "L’organe de direction. Il conduit les affaires de l’association, met en œuvre les résolutions de l’Assemblée générale et se compose d’au moins cinq personnes physiques, les membres fondateurs, plus des membres élus pour des domaines spécifiques (§ 9 a–b)."),
    points: [
      L("Elects a President, a first Vice-President and, where applicable, a further Vice-President; the General Assembly elects a Finance Officer and a Secretary (§ 9 c).", "Élit un·e Président·e, un·e premier·ère Vice-président·e et, le cas échéant, un·e autre Vice-président·e ; l’Assemblée générale élit un·e trésorier·ère et un·e secrétaire (§ 9 c)."),
      L("Two-year terms; re-election permitted (§ 9 c, f).", "Mandats de deux ans ; réélection possible (§ 9 c, f)."),
      L("The President represents the association externally with sole signing authority (§ 9 d–e).", "Le·la Président·e représente l’association à l’extérieur avec pouvoir de signature individuel (§ 9 d–e)."),
      L("Quorum of more than half; simple majority; casting vote of the President; virtual, hybrid and circular resolutions permitted (§ 9 j–k).", "Quorum de plus de la moitié ; majorité simple ; voix prépondérante du·de la Président·e ; résolutions virtuelles, hybrides et par circulaire autorisées (§ 9 j–k)."),
      L("Board activity in ordinary association matters is honorary (§ 9 g).", "L’activité du Conseil dans les affaires ordinaires est bénévole (§ 9 g)."),
    ] },
  { id: "general-assembly", name: L("General Assembly", "Assemblée générale"),
    summary: L("Convened at least once a year by the Board; extraordinary assemblies on request of the Board or 10 % of members (§ 10 a–b).", "Convoquée au moins une fois par an par le Conseil ; assemblées extraordinaires à la demande du Conseil ou de 10 % des membres (§ 10 a–b)."),
    points: [
      L("Decides on Board elections, auditors, annual accounts, discharge, budget, amendments to the statutes, membership fees and fee categories, companies and participations, honorary membership (§ 10 c).", "Décide des élections au Conseil, des commissaires aux comptes, des comptes annuels, de la décharge, du budget, des modifications statutaires, des cotisations et catégories, des sociétés et participations, de l’adhésion d’honneur (§ 10 c)."),
      L("Voting: legal-entity members 2 to 4 votes; individual and honorary members 1 vote; proxies in writing (§ 10 g).", "Vote : membres personnes morales 2 à 4 voix ; membres individuels et d’honneur 1 voix ; procurations écrites (§ 10 g)."),
      L("Quorum regardless of attendance; simple majority; two-thirds for statute amendments or dissolution (§ 10 h).", "Quorum quel que soit le nombre de présents ; majorité simple ; deux tiers pour modifier les statuts ou dissoudre (§ 10 h)."),
      L("Invitations by email at least four weeks ahead with an agenda; virtual and hybrid assemblies with barrier-free access (§ 10 d–e, k).", "Convocations par e-mail au moins quatre semaines à l’avance avec ordre du jour ; assemblées virtuelles et hybrides avec accès sans barrière (§ 10 d–e, k)."),
    ] },
  { id: "auditors", name: L("Auditors", "Commissaires aux comptes"),
    summary: L("Two auditors appointed by the General Assembly for two years examine the financial management and the use of funds in accordance with the statutes (§ 11).", "Deux commissaires aux comptes nommés par l’Assemblée générale pour deux ans examinent la gestion financière et l’emploi des fonds conformément aux statuts (§ 11)."),
    points: [L("They need not be members; if they are, they hold no other office (§ 11 a).", "Ils ne doivent pas nécessairement être membres ; s’ils le sont, ils n’occupent aucune autre fonction (§ 11 a)."), L("Report to the General Assembly, including self-dealing transactions and unusual income or expenditure (§ 11 e).", "Rapport à l’Assemblée générale, y compris sur les opérations avec soi-même et les recettes ou dépenses inhabituelles (§ 11 e).")] },
  { id: "secretariat", name: L("General Secretariat", "Secrétariat général"),
    summary: L("The Board may appoint a General Secretary for the ongoing conduct of activities, bound by the President’s guidelines and the rules of procedure (§ 13).", "Le Conseil peut nommer un·e Secrétaire général·e pour la conduite courante des activités, lié·e par les directives du·de la Président·e et le règlement intérieur (§ 13)."),
    points: [L("Participates in meetings in an advisory capacity; ordinary member by virtue of the function (§ 13 a, c).", "Participe aux réunions à titre consultatif ; membre ordinaire de par sa fonction (§ 13 a, c).")] },
  { id: "arbitration", name: L("Arbitration Tribunal", "Tribunal arbitral"),
    summary: L("Disputes arising from the association relationship are settled internally by a three-person tribunal: one arbitrator named by each party and a jointly chosen chair (§ 14).", "Les litiges nés de la relation associative sont réglés en interne par un tribunal de trois personnes : un arbitre nommé par chaque partie et un·e président·e choisi·e en commun (§ 14)."),
    points: [L("Decides by simple majority after hearing the parties; final within the association (§ 14 e–f).", "Décide à la majorité simple après audition des parties ; décision définitive au sein de l’association (§ 14 e–f).")] },
];

export const transparency: Localized[] = [
  L("Exclusively and directly non-profit purposes within the meaning of §§ 34–47 of the Austrian Federal Fiscal Code (BAO); no distribution of surpluses (§ 2 d, § 3 c).", "Buts exclusivement et directement non lucratifs au sens des §§ 34–47 du Code fiscal fédéral autrichien (BAO) ; aucune distribution d’excédents (§ 2 d, § 3 c)."),
  L("Non-privileged purposes are subordinate and limited to 10 % of total resources (§ 3a a).", "Les objets non privilégiés sont subordonnés et limités à 10 % des ressources totales (§ 3a a)."),
  L("Members receive no financial benefits from association funds outside the purpose or without arm’s-length consideration (§ 3 e).", "Les membres ne reçoivent aucun avantage financier des fonds de l’association en dehors de son objet ou sans contrepartie au prix du marché (§ 3 e)."),
  L("Commercial operations do not compete with taxable businesses beyond what is unavoidable (§ 3a c).", "Les activités commerciales ne concurrencent pas les entreprises imposables au-delà de l’inévitable (§ 3a c)."),
  L("On dissolution, remaining assets go to the Federal Ministry for Innovation, Mobility and Infrastructure for the privileged purposes (§ 15 d).", "En cas de dissolution, l’actif restant revient au ministère fédéral de l’Innovation, de la Mobilité et des Infrastructures pour les buts privilégiés (§ 15 d)."),
];

export const membershipTermination: Localized[] = [
  L("Resignation in writing with three months’ notice (§ 7 a 3).", "Démission par écrit avec un préavis de trois mois (§ 7 a 3)."),
  L("Removal after more than four months in arrears despite two written reminders (§ 7 a 4).", "Radiation après plus de quatre mois d’arriérés malgré deux rappels écrits (§ 7 a 4)."),
  L("Exclusion for good cause by Board resolution, with a right to be heard and appeal to the Arbitration Tribunal (§ 7 a 5).", "Exclusion pour motif grave par décision du Conseil, avec droit d’être entendu et recours devant le tribunal arbitral (§ 7 a 5)."),
];
