import type { Page } from '../App';

interface EasyViewDesignerStubProps {
  onNavigate: (page: Page, designId?: string, jobId?: string, flow?: string) => void;
  returnContext?: 'dashboard' | 'design-details' | 'job-details';
  contextId?: string;
}

export function EasyViewDesignerStub({ onNavigate, returnContext = 'dashboard', contextId }: EasyViewDesignerStubProps) {
  const goBack = () => {
    if (returnContext === 'design-details' && contextId) return onNavigate('design-details', contextId);
    if (returnContext === 'job-details' && contextId) return onNavigate('job-details', undefined, contextId);
    onNavigate('dashboard');
  };

  return <button onClick={goBack}>Return from EasyView Designer</button>;
}
