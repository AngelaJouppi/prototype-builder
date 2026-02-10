import type { Page } from '../App';

export function EasyViewDesignerEnhanced({ onNavigate }: { onNavigate: (page: Page, designId?: string, jobId?: string, flow?: string) => void }) {
  return <button onClick={() => onNavigate('dashboard')}>Enhanced EasyView (stub)</button>;
}
