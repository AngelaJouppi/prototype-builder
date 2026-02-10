export function UtilitiesMenu({ onOpenHelp, onOpenAdmin, onOpenDebug, onExport, onImport }: { onOpenHelp: () => void; onOpenAdmin: () => void; onOpenDebug: () => void; onExport: () => void; onImport: (file: File) => void }) {
  return (
    <div className="fixed bottom-8 left-8 flex gap-2">
      <button onClick={onOpenHelp}>Guide</button>
      <button onClick={onOpenAdmin}>Admin</button>
      <button onClick={onOpenDebug}>Debug</button>
      <button onClick={onExport}>Export</button>
      <label>
        Import
        <input
          type="file"
          accept="application/json"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onImport(file);
          }}
        />
      </label>
    </div>
  );
}
