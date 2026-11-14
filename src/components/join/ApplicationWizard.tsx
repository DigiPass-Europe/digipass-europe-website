"use client";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { feeTiers, workingGroups, orgTypeLabels } from "@/content";
import { applicantSchema, organisationSchema, requiresVat } from "@/lib/validation/application";
import { tx, fmtEur } from "@/lib/locale";
import { Button } from "@/components/ui/Button";

const field = "focus-ring mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm";
const TOTAL = 8;

type Applicant = { firstName: string; lastName: string; email: string; position: string; organisation: string; country: string; profile: string; interests: string[] };
type Org = { name: string; website: string; type: string; employees: "1-9" | "10-49" | "50-249" | "250+"; country: string; vat: string; mainContact: string; representatives: string; description: string; logoName: string };

export function ApplicationWizard({ initialTier }: { initialTier?: string }) {
  const t = useTranslations("join"); const locale = useLocale();
  const [step, setStep] = useState(initialTier ? 2 : 1);
  const [tier, setTier] = useState(initialTier ?? "");
  const [applicant, setApplicant] = useState<Applicant>({ firstName: "", lastName: "", email: "", position: "", organisation: "", country: "", profile: "", interests: [] });
  const [org, setOrg] = useState<Org>({ name: "", website: "", type: "sme", employees: "10-49", country: "", vat: "", mainContact: "", representatives: "", description: "", logoName: "" });
  const [wgs, setWgs] = useState<string[]>([]);
  const [lead, setLead] = useState(false);
  const [consents, setConsents] = useState({ conditions: false, privacy: false, statutes: false });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<"demo" | "live" | "error" | null>(null);
  const [busy, setBusy] = useState(false);

  const tierObj = feeTiers.find((f) => f.id === tier);
  const kind = tierObj?.kind ?? "individual";
  const isOrg = kind === "organisational";
  const steps = t.raw("steps") as string[];

  function validateStep(): boolean {
    setError(null);
    if (step === 1 && !tier) { setError(t("errors.required")); return false; }
    if (step === 2) { const r = applicantSchema.safeParse({ ...applicant, country: applicant.country.toUpperCase() }); if (!r.success) { setError(t("errors.required")); return false; } }
    if (step === 3 && isOrg) {
      const r = organisationSchema.safeParse({ ...org, country: org.country.toUpperCase() });
      if (!r.success) { setError(t("errors.required")); return false; }
      if (requiresVat(org.country) && !org.vat.trim()) { setError(t("errors.vat")); return false; }
    }
    if (step === 5 && !(consents.conditions && consents.privacy && consents.statutes)) { setError(t("errors.required")); return false; }
    return true;
  }
  function next() { if (validateStep()) setStep((s) => Math.min(s + 1, TOTAL)); }
  async function submit() {
    setBusy(true); setError(null);
    const body = { tier, kind, applicant: { ...applicant, country: applicant.country.toUpperCase(), interests: lead ? [...applicant.interests, "leadership"] : applicant.interests }, organisation: isOrg ? { ...org, country: org.country.toUpperCase() } : undefined, workingGroups: wgs, consents };
    const res = await fetch("/api/applications", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(json?.issues ? t("errors.required") : t("done.error")); return; }
    setResult(json.stored ? "live" : "demo"); setStep(7);
  }
  const vatNeeded = useMemo(() => isOrg && requiresVat(org.country), [isOrg, org.country]);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="flex gap-2 overflow-x-auto lg:col-span-3 lg:flex-col lg:gap-0" aria-label={t("title")}>
        {steps.map((s, i) => { const n = i + 1; const state = n < step ? "done" : n === step ? "current" : "todo"; return (
          <li key={s} className={`flex flex-none items-center gap-3 border-l-2 py-2 pl-4 text-sm lg:py-3 ${state === "current" ? "border-blue font-semibold" : state === "done" ? "border-green text-ink-soft" : "border-line text-ink-soft"}`} aria-current={state === "current" ? "step" : undefined}>
            <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs ${state === "done" ? "bg-green text-white" : state === "current" ? "bg-blue text-white" : "bg-paper"}`}>{state === "done" ? "✓" : n}</span>{s}</li>); })}
      </ol>

      <div className="lg:col-span-9">
        <p className="text-xs uppercase tracking-wider text-ink-soft">{t("stepOf", { n: step, total: TOTAL })}</p>

        {step === 1 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s1.title")}</h2><p className="mt-2 text-sm text-ink-soft">{t("s1.text")}</p>
          {(["individual", "organisational", "supporter"] as const).map((k) => <fieldset key={k} className="mt-6"><legend className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{t(`s1.${k}`)}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">{feeTiers.filter((f) => f.kind === k).map((f) => <label key={f.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${tier === f.id ? "border-blue bg-blue/[0.04]" : "border-line hover:border-ink/40"}`}><input type="radio" name="tier" value={f.id} checked={tier === f.id} onChange={() => setTier(f.id)} className="mt-1" /><span><span className="block text-sm font-medium">{tx(f.name, locale)}</span><span className="block text-sm text-ink-soft">{fmtEur(f.fee, locale)} / {locale === "fr" ? "an" : "year"} · <span className="text-[#5a4a00]">{locale === "fr" ? "proposé" : "proposed"}</span></span><span className="mt-1 block text-xs text-ink-soft">{tx(f.statutoryCategory, locale)}</span></span></label>)}</div></fieldset>)}
        </section>}

        {step === 2 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s2.title")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {([["firstName", "s2.firstName"], ["lastName", "s2.lastName"], ["email", "s2.email"], ["position", "s2.position"], ["organisation", "s2.organisation"], ["country", "s2.country"]] as const).map(([k, l]) => <label key={k} className="text-sm font-medium">{t(l)}<input value={applicant[k] as string} onChange={(e) => setApplicant({ ...applicant, [k]: e.target.value })} type={k === "email" ? "email" : "text"} maxLength={k === "country" ? 2 : undefined} className={field} required={k !== "organisation"} /></label>)}
            <label className="text-sm font-medium sm:col-span-2">{t("s2.profile")}<textarea value={applicant.profile} onChange={(e) => setApplicant({ ...applicant, profile: e.target.value })} rows={5} className={field} /><span className="mt-1 block text-xs font-normal text-ink-soft">{t("s2.profileHint")}</span></label>
            <fieldset className="sm:col-span-2"><legend className="text-sm font-medium">{t("s2.interests")}</legend><div className="mt-2 flex flex-wrap gap-2">{workingGroups.map((w) => <label key={w.id} className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${applicant.interests.includes(w.id) ? "border-blue bg-blue text-white" : "border-line"}`}><input type="checkbox" className="sr-only" checked={applicant.interests.includes(w.id)} onChange={(e) => setApplicant({ ...applicant, interests: e.target.checked ? [...applicant.interests, w.id] : applicant.interests.filter((x) => x !== w.id) })} />{w.code}</label>)}</div></fieldset>
          </div></section>}

        {step === 3 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s3.title")}</h2>
          {!isOrg ? <p className="mt-4 rounded-lg bg-paper p-5 text-sm text-ink-soft">{t("s3.skip")}</p> : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">{t("s3.name")}<input value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} className={field} /></label>
              <label className="text-sm font-medium">{t("s3.website")}<input value={org.website} onChange={(e) => setOrg({ ...org, website: e.target.value })} placeholder="https://" className={field} /></label>
              <label className="text-sm font-medium">{t("s3.type")}<select value={org.type} onChange={(e) => setOrg({ ...org, type: e.target.value })} className={field}>{Object.keys(orgTypeLabels).map((k) => <option key={k} value={k}>{tx(orgTypeLabels[k], locale)}</option>)}</select></label>
              <label className="text-sm font-medium">{t("s3.employees")}<select value={org.employees} onChange={(e) => setOrg({ ...org, employees: e.target.value as Org["employees"] })} className={field}>{["1-9", "10-49", "50-249", "250+"].map((v) => <option key={v}>{v}</option>)}</select></label>
              <label className="text-sm font-medium">{t("s3.country")}<input value={org.country} maxLength={2} onChange={(e) => setOrg({ ...org, country: e.target.value.toUpperCase() })} className={field} /></label>
              <label className="text-sm font-medium">{t("s3.vat")}{vatNeeded && <span className="text-red-700"> *</span>}<input value={org.vat} onChange={(e) => setOrg({ ...org, vat: e.target.value })} className={field} aria-required={vatNeeded} /><span className="mt-1 block text-xs font-normal text-ink-soft">{t("s3.vatHint")}</span></label>
              <label className="text-sm font-medium">{t("s3.mainContact")}<input value={org.mainContact} onChange={(e) => setOrg({ ...org, mainContact: e.target.value })} className={field} /></label>
              <label className="text-sm font-medium">{t("s3.logo")}<input type="file" accept="image/*,.svg" onChange={(e) => setOrg({ ...org, logoName: e.target.files?.[0]?.name ?? "" })} className={`${field} file:mr-3 file:rounded file:border-0 file:bg-paper file:px-3 file:py-1`} /><span className="mt-1 block text-xs font-normal text-ink-soft">{t("s3.logoHint")}</span></label>
              <label className="text-sm font-medium sm:col-span-2">{t("s3.representatives")}<textarea value={org.representatives} onChange={(e) => setOrg({ ...org, representatives: e.target.value })} rows={3} className={field} /></label>
              <label className="text-sm font-medium sm:col-span-2">{t("s3.description")}<textarea value={org.description} onChange={(e) => setOrg({ ...org, description: e.target.value })} rows={4} className={field} /></label>
            </div>)}
        </section>}

        {step === 4 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s4.title")}</h2><p className="mt-2 text-sm text-ink-soft">{t("s4.text")}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">{workingGroups.map((w) => <li key={w.id}><label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${wgs.includes(w.id) ? "border-blue bg-blue/[0.04]" : "border-line"}`}><input type="checkbox" className="mt-1" checked={wgs.includes(w.id)} onChange={(e) => setWgs(e.target.checked ? [...wgs, w.id] : wgs.filter((x) => x !== w.id))} /><span><span className="block text-xs font-semibold text-green">{w.code}</span><span className="block text-sm font-medium">{tx(w.name, locale)}</span></span></label></li>)}</ul>
          <label className="mt-6 flex items-center gap-2 text-sm"><input type="checkbox" checked={lead} onChange={(e) => setLead(e.target.checked)} />{t("s4.lead")}</label></section>}

        {step === 5 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s5.title")}</h2>
          <div className="mt-6 space-y-4">{(["conditions", "privacy", "statutes"] as const).map((k) => <label key={k} className="flex items-start gap-3 rounded-lg border border-line p-4 text-sm"><input type="checkbox" className="mt-1" checked={consents[k]} onChange={(e) => setConsents({ ...consents, [k]: e.target.checked })} />{t(`s5.${k}`)}</label>)}</div></section>}

        {step === 6 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s6.title")}</h2><p className="mt-2 text-sm text-ink-soft">{t("s6.text")}</p>
          <dl className="mt-6 divide-y divide-line rounded-lg border border-line text-sm">
            <div className="grid gap-1 p-4 sm:grid-cols-3"><dt className="text-ink-soft">{t("s6.summaryTier")}</dt><dd className="sm:col-span-2">{tierObj && `${tx(tierObj.name, locale)} · ${fmtEur(tierObj.fee, locale)}`}</dd></div>
            <div className="grid gap-1 p-4 sm:grid-cols-3"><dt className="text-ink-soft">{t("s2.title")}</dt><dd className="sm:col-span-2">{applicant.firstName} {applicant.lastName} · {applicant.email} · {applicant.position}{applicant.organisation && ` · ${applicant.organisation}`} · {applicant.country.toUpperCase()}</dd></div>
            {isOrg && <div className="grid gap-1 p-4 sm:grid-cols-3"><dt className="text-ink-soft">{t("s3.title")}</dt><dd className="sm:col-span-2">{org.name} · {tx(orgTypeLabels[org.type], locale)} · {org.employees} · {org.country}{org.vat && ` · ${org.vat}`}</dd></div>}
            <div className="grid gap-1 p-4 sm:grid-cols-3"><dt className="text-ink-soft">{t("s6.summaryWg")}</dt><dd className="sm:col-span-2">{wgs.length ? wgs.map((id) => workingGroups.find((w) => w.id === id)?.code).join(", ") : "—"}{lead && ` · ${t("s4.lead")}`}</dd></div>
          </dl></section>}

        {step === 7 && <section><h2 className="mt-2 text-2xl font-semibold">{result ? t("done.title") : t("s7.title")}</h2>
          {result === "demo" && <p role="status" className="mt-4 rounded-lg border border-gold bg-gold/10 p-4 text-sm text-[#4a3d00]">{t("done.demo")}</p>}
          {result === "live" && <p role="status" className="mt-4 rounded-lg border border-green bg-green/10 p-4 text-sm text-green-deep">{t("done.live", { email: applicant.email })}</p>}
          <p className="mt-6 text-sm leading-relaxed text-ink-soft">{t("s7.text")}</p></section>}

        {step === 8 && <section><h2 className="mt-2 text-2xl font-semibold">{t("s8.title")}</h2><p className="mt-4 text-sm leading-relaxed text-ink-soft">{t("s8.text")}</p></section>}

        {error && <p role="alert" className="mt-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
        <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
          {step > 1 && step < 7 && <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>{t("back")}</Button>}
          {step < 6 && <Button type="button" onClick={next}>{t("next")}</Button>}
          {step === 6 && <Button type="button" variant="green" onClick={submit} disabled={busy}>{t("submit")}</Button>}
          {step === 7 && <Button type="button" variant="outline" onClick={() => setStep(8)}>{t("next")}</Button>}
        </div>
      </div>
    </div>
  );
}
