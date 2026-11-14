import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
import { workingGroups } from "@/content";
export default async function ManageWg() {
  const s = await requireAccess("portal/working-groups/manage"); const w = workingGroups[1];
  return (
    <div className="space-y-6"><h1 className="text-2xl font-semibold">{w.code} · Chair tools</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Schedule a meeting"><DemoActionForm mode={s.mode} submitLabel="Schedule"><input type="datetime-local" className="focus-ring block w-full rounded-md border border-line px-3 py-2.5 text-sm" /><input placeholder="Title" className="focus-ring mt-2 block w-full rounded-md border border-line px-3 py-2.5 text-sm" /></DemoActionForm></Panel>
        <Panel title="Publish a deliverable"><DemoActionForm mode={s.mode} submitLabel="Submit for publication"><input placeholder="Title" className="focus-ring block w-full rounded-md border border-line px-3 py-2.5 text-sm" /><select className="focus-ring mt-2 block w-full rounded-md border border-line px-3 py-2.5 text-sm"><option>Public</option><option>Members only</option></select></DemoActionForm></Panel>
        <Panel title="Membership requests"><p className="text-ink-soft">No pending requests (demo).</p></Panel>
        <Panel title="Participants"><p className="text-ink-soft">Participant list appears once the group is constituted.</p></Panel>
      </div>
    </div>
  );
}
