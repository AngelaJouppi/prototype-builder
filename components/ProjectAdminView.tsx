export function ProjectAdminView({ projectId, onBack, onViewFlow }: { projectId: string | null; onBack: () => void; onViewFlow: (flowId: string, deliverableId?: string) => void }) {
  return (
    <div>
      <h2>Project Admin: {projectId}</h2>
      <button onClick={() => onViewFlow('flow-a', 'deliverable-1')}>Open flow-a</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
