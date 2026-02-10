export function DemoLandingPage({ onStartFlow }: { onStartFlow: (flowId: string) => void }) {
  return <button onClick={() => onStartFlow('flow-a')}>Start demo flow</button>;
}
