export type Localized = { en: string; fr: string };

export type WorkingGroup = {
  id: string; // wg1..wg10
  code: string; // WG1
  slug: string;
  name: Localized;
  tagline: Localized;
  mission: Localized;
  objectives: Localized[];
  activities: Localized[];
  deliverables: Localized[];
  sectors?: Localized[];
  leadership: { role: "chair" | "vice-chair"; status: "open" }[];
  projects: { title: Localized; status: "planned" | "active"; illustrative: true }[];
  meetings: { date: string; title: Localized; mode: "online" | "hybrid" | "onsite"; illustrative: true }[];
  memberCount?: number;
  illustrativeStats: true;
};

export type FeeTier = {
  id: string;
  kind: "individual" | "organisational" | "supporter";
  name: Localized;
  fee: number; // EUR per year, 0 = free
  statutoryCategory: Localized; // § reference
  feeCategory?: "small" | "medium" | "large";
  votes: Localized;
  status: "proposed";
  note?: Localized;
};

export type BenefitRow = {
  benefit: Localized;
  all: boolean;
  fullIndividual: boolean;
  organisational: boolean;
  strategic: boolean;
  governance?: boolean; // true if this is a governance right under the statutes
};

export type Service = {
  id: string;
  code: string; // A..J
  name: Localized;
  summary: Localized;
  features: Localized[];
  access: "public" | "members" | "mixed";
};

export type ExtraService = {
  id: string;
  name: Localized;
  what: Localized;
  who: Localized;
  value: Localized;
  how: Localized;
  access: "free" | "members" | "freemium";
  priority: 1 | 2 | 3;
};

export type EventType =
  | "webinar"
  | "workshop"
  | "conference"
  | "wg-meeting"
  | "demonstration"
  | "networking"
  | "roundtable";

export type AssociationEvent = {
  slug: string;
  type: EventType;
  title: Localized;
  summary: Localized;
  description: Localized;
  start: string; // ISO
  end?: string;
  location: Localized;
  online: boolean;
  speakers: { name: string; role: Localized; illustrative: true }[];
  audience: Localized;
  pricing: { members: number; nonMembers: number } | null;
  workingGroups: string[];
  illustrative: true;
};

export type NewsCategory =
  | "regulation"
  | "industry"
  | "technical"
  | "research"
  | "association"
  | "working-groups"
  | "opportunities";

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  title: Localized;
  excerpt: Localized;
  body: Localized[]; // paragraphs
  date: string;
  author: Localized;
  tags: string[];
  related?: string[]; // resource ids
  illustrative: true;
};

export type ResourceType =
  | "report"
  | "regulatory-analysis"
  | "publication"
  | "guide"
  | "toolkit"
  | "case-study"
  | "presentation"
  | "recording";

export type Resource = {
  id: string;
  type: ResourceType;
  title: Localized;
  summary: Localized;
  date: string;
  workingGroup?: string;
  sectors?: string[];
  membersOnly: boolean;
  illustrative: true;
};

export type OrgType =
  | "startup"
  | "sme"
  | "large-enterprise"
  | "university"
  | "research-centre"
  | "non-profit"
  | "public"
  | "technology-provider"
  | "association";

export type MemberOrg = {
  id: string;
  name: string;
  country: string; // ISO-2
  type: OrgType;
  website: string;
  description: Localized;
  expertise: string[];
  sectors: string[];
  workingGroups: string[];
  tier: string; // FeeTier id
  published: boolean;
  illustrative: true;
};
