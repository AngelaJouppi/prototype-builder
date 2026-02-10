import type { Page } from '../App';

interface EasyViewRosterStubProps {
  onNavigate: (page: Page, designId?: string, jobId?: string, flow?: string) => void;
  returnContext?: 'dashboard' | 'job-details';
  contextId?: string;
}

export function EasyViewRosterStub({ onNavigate, returnContext = 'dashboard', contextId }: EasyViewRosterStubProps) {
  const goBack = () => {
    if (returnContext === 'job-details' && contextId) return onNavigate('job-details', undefined, contextId);
    onNavigate('dashboard');
  };

  return <button onClick={goBack}>Return from EasyView Roster</button>;
}
