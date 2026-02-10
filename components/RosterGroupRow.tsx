export function RosterGroupRow({ roster, onNavigate }: { roster: any; onNavigate: (...args: any[]) => void }) {
  return (
    <button className="w-full text-left border border-border rounded-[--radius] p-3" onClick={() => onNavigate('dashboard')}>
      <div>{roster.rosterName}</div>
      <div className="text-sm text-muted-foreground">{roster.count} designs</div>
    </button>
  );
}
