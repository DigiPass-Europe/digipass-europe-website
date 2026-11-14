// Fetches every public route in every locale from a running server and asserts HTTP 200.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const locales = ["en", "fr"];
const routes = (process.env.ROUTES ?? "/,/about,/contact,/membership,/working-groups,/working-groups/regulatory-framework-european-policy,/activities,/events,/events/european-dpp-conference-2027,/knowledge-hub,/news,/news/regulatory-tracker-first-edition,/members,/join,/login,/privacy,/imprint").split(",");
let failed = 0;
for (const l of locales) for (const r of routes) {
  const url = `${base}/${l}${r === "/" ? "" : r}`;
  const res = await fetch(url, { redirect: "manual" });
  const ok = res.status === 200;
  if (!ok) failed++;
  console.log(`${ok ? "OK " : "FAIL"} ${res.status} ${url}`);
}
if (failed) { console.error(`${failed} route(s) failed`); process.exit(1); }
console.log("All routes OK");
