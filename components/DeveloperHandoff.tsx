export function DeveloperHandoff({ projectId, onClose }: { projectId?: string; onClose: () => void }) {
  return (
    <div>
      <p>Developer handoff {projectId ? `for ${projectId}` : ''}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
