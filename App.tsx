import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { DesignDetails } from './components/DesignDetails';
import { JobDetails } from './components/JobDetails';
import { Cart } from './components/Cart';
import { EasyViewDesignerStub } from './components/EasyViewDesignerStub';
import { EasyViewDesignerEnhanced } from './components/EasyViewDesignerEnhanced';
import { EasyViewRosterStub } from './components/EasyViewRosterStub';
import { OrderHistoryStub } from './components/OrderHistoryStub';
import { PrototypeHome } from './components/PrototypeHome';
import { PlatformHome } from './components/PlatformHome';
import { ProjectAdminView } from './components/ProjectAdminView';
import { PrototypeNav } from './components/PrototypeNav';
import { ProductFrame } from './components/ProductFrame';
import { DeveloperHandoff } from './components/DeveloperHandoff';
import { DemoLandingPage } from './components/DemoLandingPage';
import { ProjectProvider } from './contexts/ProjectContext';
import { PROJECT_STORAGE } from './config/platform';

export type Page = 
  | 'platform-home'
  | 'project-admin'
  | 'demo-landing'
  | 'prototype-home'
  | 'dashboard' 
  | 'design-details' 
  | 'job-details' 
  | 'cart'
  | 'checkout'
  | 'easyview-designer'
  | 'easyview-enhanced'
  | 'easyview-roster'
  | 'order-history';

export default function App() {
  console.log('🚀 App component rendering...');
  
  const [currentPage, setCurrentPage] = useState<Page>('platform-home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [currentDeliverable, setCurrentDeliverable] = useState<string | null>(null);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [returnContext, setReturnContext] = useState<string>('dashboard');
  const [currentFlow, setCurrentFlow] = useState<string | undefined>(undefined);
  const [showHandoff, setShowHandoff] = useState(false);
  const [showResearchPanel, setShowResearchPanel] = useState(true);
  const [isLoadingShareUrl, setIsLoadingShareUrl] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isShareMode, setIsShareMode] = useState(false); // NEW: Track if accessed via share URL

  // Handle share URLs on mount
  useEffect(() => {
    try {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      
      console.log('🔍 Checking for share URL...', hash);
      
      if (!hash) {
        console.log('❌ No hash found');
        return;
      }
      
      // Check for demo landing page: #/demo
      if (hash === '#/demo') {
        console.log('✅ Demo landing page detected!');
        setCurrentPage('demo-landing');
        setCurrentProject('pmor-44');
        setIsShareMode(true);
        return;
      }
      
      // Check for share URL pattern: #/share/projectId/deliverableId/flowId
      const shareMatch = hash.match(/^#\/share\/([^\/]+)\/([^\/]+)\/([^\/\?]+)/);
      
      if (shareMatch) {
        setIsLoadingShareUrl(true); // Prevent early returns during load
        const [, projectId, deliverableId, flowId] = shareMatch;
        
        console.log('✅ Share URL detected!', { projectId, deliverableId, flowId });
        
        // Get research panel preference from URL
        const researchParam = params.get('research');
        setShowResearchPanel(researchParam !== 'false');
        
        // Load the project and flow - do everything inline to avoid stale closure issues
        const project = PROJECT_STORAGE.getProject(projectId);
        console.log('📦 Project loaded:', project);
        
        const deliverable = project?.deliverables?.find(d => d.id === deliverableId);
        console.log('📋 Deliverable found:', deliverable);
        
        const flow = deliverable?.flows?.find(f => f.id === flowId);
        console.log('🌊 Flow found:', flow);
        
        if (flow && project) {
          console.log('🚀 Starting flow on page:', flow.startPage);
          // Set all state at once
          setCurrentProject(projectId);
          setCurrentDeliverable(deliverableId);
          setCurrentFlow(flowId);
          setCurrentPage(flow.startPage);
          if (flow.startDesignId) setSelectedDesignId(flow.startDesignId);
          if (flow.startJobId) setSelectedJobId(flow.startJobId);
          setIsLoadingShareUrl(false); // Loading complete
          setIsShareMode(true); // NEW: Set share mode
        } else {
          console.error('❌ Flow or project not found!');
          setIsLoadingShareUrl(false);
        }
      } else {
        console.log('❌ Hash does not match share URL pattern:', hash);
      }
    } catch (error) {
      console.error('❌ Error loading share URL:', error);
      setIsLoadingShareUrl(false);
    }
  }, []);

  const navigateTo = (page: Page, designId?: string, jobId?: string, flow?: string) => {
    // Track return context for EasyView stubs
    if (page === 'easyview-designer' || page === 'easyview-roster' || page === 'easyview-enhanced') {
      if (currentPage === 'design-details') {
        setReturnContext('design-details');
      } else if (currentPage === 'job-details') {
        setReturnContext('job-details');
      } else {
        setReturnContext('dashboard');
      }
    }
    
    setCurrentPage(page);
    if (designId) setSelectedDesignId(designId);
    if (jobId) setSelectedJobId(jobId);
    if (flow !== undefined) setCurrentFlow(flow);
  };

  const selectProject = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentPage('project-admin');
  };

  const viewFlow = (flowId: string, deliverableId?: string) => {
    // Get the flow data to start it properly
    const project = PROJECT_STORAGE.getProject(currentProject || 'pmor-44');
    
    // If deliverableId provided, use it; otherwise default to first deliverable
    const targetDeliverableId = deliverableId || project?.deliverables?.[0]?.id;
    const deliverable = project?.deliverables?.find(d => d.id === targetDeliverableId);
    const flow = deliverable?.flows?.find(f => f.id === flowId);
    
    if (flow && targetDeliverableId) {
      // Set the current deliverable context
      setCurrentDeliverable(targetDeliverableId);
      // Start the flow by navigating to its starting page
      setCurrentFlow(flowId);
      setCurrentPage(flow.startPage);
      if (flow.startDesignId) setSelectedDesignId(flow.startDesignId);
      if (flow.startJobId) setSelectedJobId(flow.startJobId);
    } else {
      // Fallback: just go to prototype home
      setCurrentFlow(flowId);
      setCurrentPage('prototype-home');
    }
  };

  const startDemoFlow = (flowId: string) => {
    // Set project context for demo
    setCurrentProject('pmor-44');
    setIsShareMode(true); // Hide platform navigation
    // Start the flow
    viewFlow(flowId, 'deliverable-1');
  };

  const backToPlatform = () => {
    setCurrentProject(null);
    setCurrentPage('platform-home');
  };

  const backToProjectAdmin = () => {
    setCurrentPage('project-admin');
    setCurrentFlow(undefined);
  };

  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
    navigateTo('cart');
  };

  // Render error boundary
  if (renderError) {
    return (
      <div className="min-h-screen bg-red-500/10 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Render Error</h1>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">{renderError}</pre>
        </div>
      </div>
    );
  }

  // Show platform home if no project selected (but not during share URL loading)
  if (!isLoadingShareUrl && (currentPage === 'platform-home' || !currentProject)) {
    try {
      console.log('📍 Rendering PlatformHome...');
      return (
        <div className="min-h-screen bg-background">
          <PlatformHome onSelectProject={selectProject} />
        </div>
      );
    } catch (error) {
      console.error('❌ PlatformHome render error:', error);
      setRenderError(String(error));
      return null;
    }
  }

  // Show project admin view (behind-the-scenes management)
  if (currentPage === 'project-admin') {
    return (
      <div className="min-h-screen bg-background">
        <ProjectAdminView 
          projectId={currentProject} 
          onBack={backToPlatform}
          onViewFlow={viewFlow}
        />
      </div>
    );
  }

  // Show demo landing page
  if (currentPage === 'demo-landing') {
    return <DemoLandingPage onStartFlow={startDemoFlow} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <PrototypeNav 
        currentPage={currentPage} 
        currentFlow={currentFlow}
        onNavigate={navigateTo}
        currentProject={currentProject}
        onShowHandoff={() => setShowHandoff(true)}
        showResearchPanel={showResearchPanel}
        setShowResearchPanel={setShowResearchPanel}
        isShareMode={isShareMode}
      />
      
      {/* Product screens wrapped in desktop frame */}
      {currentPage === 'prototype-home' ? (
        <PrototypeHome 
          projectId={currentProject || 'pmor-44'}
          onNavigate={navigateTo}
        />
      ) : (
        <ProductFrame>
          {currentPage === 'dashboard' && (
            <Dashboard 
              onNavigate={navigateTo}
              onAddToCart={addToCart}
            />
          )}
          
          {currentPage === 'design-details' && (
            <DesignDetails 
              designId={selectedDesignId!}
              onNavigate={navigateTo}
              onAddToCart={addToCart}
            />
          )}
          
          {currentPage === 'job-details' && (
            <JobDetails 
              jobId={selectedJobId!}
              onNavigate={navigateTo}
              onAddToCart={addToCart}
            />
          )}
          
          {currentPage === 'cart' && (
            <Cart 
              items={cartItems}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'checkout' && (
            <div className="max-w-4xl mx-auto px-6 py-12">
              <div className="bg-card border border-border rounded-[--radius] p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mb-4">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8">Your Team Builder order has been placed successfully.</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90"
                  >
                    Back to Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('order-history')}
                    className="px-6 py-3 border border-border rounded-[--radius-button] hover:bg-muted"
                  >
                    View Order History
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {currentPage === 'easyview-designer' && (
            <EasyViewDesignerStub 
              onNavigate={navigateTo} 
              returnContext={returnContext as any}
              contextId={returnContext === 'design-details' ? selectedDesignId! : returnContext === 'job-details' ? selectedJobId! : undefined}
            />
          )}
          
          {currentPage === 'easyview-enhanced' && (
            <EasyViewDesignerEnhanced 
              onNavigate={navigateTo}
            />
          )}
          
          {currentPage === 'easyview-roster' && (
            <EasyViewRosterStub 
              onNavigate={navigateTo} 
              returnContext={returnContext as any}
              contextId={selectedJobId!}
            />
          )}
          
          {currentPage === 'order-history' && (
            <OrderHistoryStub onNavigate={navigateTo} />
          )}
        </ProductFrame>
      )}
      
      {/* Developer Handoff Modal */}
      {showHandoff && currentProject && (
        <DeveloperHandoff 
          projectId={currentProject} 
          onClose={() => setShowHandoff(false)} 
        />
      )}
    </div>
  );
}