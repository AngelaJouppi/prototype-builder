export function DesignTile({ design, onNavigate }: { design: any; onNavigate: (...args: any[]) => void }) {
  return (
    <button className="w-full text-left border border-border rounded-[--radius] p-3" onClick={() => onNavigate('design-details', design.designId, design.tbParentId)}>
      <div>{design.designId}</div>
      <div className="text-sm text-muted-foreground">{design.playerName || design.jobName}</div>
    </button>
  );
}
