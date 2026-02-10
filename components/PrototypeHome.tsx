import { Play, Presentation, Users, FileCheck, ShoppingCart, Package, ArrowUpRight, BookOpen, ExternalLink, FileText, Code, Clock } from 'lucide-react';
import type { Page } from '../App';
import { REQUIREMENTS_DOCS, AUTHOR } from '../config/requirements';
import { useState } from 'react';
import { DeveloperHandoff } from './DeveloperHandoff';
import { PROJECT_STORAGE } from '../config/platform';
import type { Flow } from '../config/platform';

interface PrototypeHomeProps {
  projectId: string;
  onNavigate: (page: Page, designId?: string, jobId?: string, flow?: string) => void;
}

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, React.ElementType> = {
  Package,
  ShoppingCart,
  Users,
  FileCheck,
  Presentation,
  Play,
  BookOpen,
  Code,
};

export function PrototypeHome({ projectId, onNavigate }: PrototypeHomeProps) {
  const [showHandoff, setShowHandoff] = useState(false);
  
  // Get project data from storage
  const project = PROJECT_STORAGE.getProject(projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4">Project Not Found</h1>
          <p className="text-muted-foreground">The project "{projectId}" could not be found.</p>
        </div>
      </div>
    );
  }

  // Get flows from the first deliverable (for MVP, we default to first deliverable)
  const firstDeliverable = project.deliverables?.[0];
  const flows = firstDeliverable?.flows || [];
  const deliverableName = firstDeliverable?.name || 'Interactive Prototype';

  const startFlow = (flow: Flow) => {
    onNavigate(flow.startPage, flow.startDesignId, flow.startJobId, flow.id);
  };

  return (
    <div className="platform-ui min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="flex items-start justify-between gap-8 mb-6">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full uppercase tracking-wider text-accent font-[--font-weight-semibold] mb-4" style={{ fontSize: 'var(--text-xs)' }}>
                {project.taskLink?.platform ? `${project.taskLink.platform} • ` : ''}{project.id.toUpperCase()} • {deliverableName}
              </div>
              <h1 className="mb-4 text-[2.5rem] leading-[1.2]">
                {project.name}
              </h1>
              <p className="text-[1.125rem] text-muted-foreground max-w-[700px]">
                {project.description}
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-[--radius-button] hover:border-accent hover:bg-card/80 transition-all"
            >
              <span className="font-[--font-weight-semibold]">Skip to Dashboard</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Key Features Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-background/60 border border-border/60 rounded-[--radius] p-4">
              <div className="uppercase tracking-wider text-muted-foreground mb-2 font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-xs)' }}>Design System</div>
              <div className="text-foreground font-[--font-weight-semibold]">CUPABU Variables</div>
            </div>
            <div className="bg-background/60 border border-border/60 rounded-[--radius] p-4">
              <div className="uppercase tracking-wider text-muted-foreground mb-2 font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-xs)' }}>Purpose</div>
              <div className="text-foreground font-[--font-weight-semibold]">Review & Demo</div>
            </div>
            <div className="bg-background/60 border border-border/60 rounded-[--radius] p-4">
              <div className="uppercase tracking-wider text-muted-foreground mb-2 font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-xs)' }}>Status</div>
              <div className="text-foreground font-[--font-weight-semibold] capitalize">{project.status.replace('-', ' ')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Concept Goals */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-3">
            <span>Concept Goals</span>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-[--radius] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[--radius] bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[1rem] mb-2">Job & Roster Grouping</h3>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Make Team Builder artwork easier to find and understand with grouped views by Job and Roster.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-[--radius] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[--radius] bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[1rem] mb-2">Dual Detail Views</h3>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Clearly separate Design Details vs Job Details to show both individual design and team/roster context.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-[--radius] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[--radius] bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[1rem] mb-2">Enhanced Cart Experience</h3>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Support Team Builder grouped line items and roster matrices without breaking existing cart UX.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-[--radius] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[--radius] bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[1rem] mb-2">Streamlined Reordering</h3>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Fast reorder entry points from Dashboard, Job Details, and Order History.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Flows */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-3">
              <span>Demo Flows</span>
              <span className="h-px w-32 bg-gradient-to-r from-border to-transparent"></span>
            </h2>
            <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {flows.length} {flows.length === 1 ? 'flow' : 'flows'} available
            </div>
          </div>
          
          {flows.length === 0 ? (
            <div className="bg-muted/30 border border-border rounded-[--radius] p-8 text-center">
              <p className="text-muted-foreground">No flows configured for this project yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {flows.map((flow) => {
                const Icon = flow.icon ? ICON_MAP[flow.icon] : Package;
                return (
                  <div
                    key={flow.id}
                    className={`border rounded-[--radius] p-6 transition-all ${flow.color || 'bg-card/50 border-border hover:border-primary/40'}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-[--radius] bg-card border border-border flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3>Flow {flow.id.split('-')[1]?.toUpperCase() || flow.id}: {flow.name}</h3>
                          {flow.estimatedMinutes && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-muted/60 border border-border rounded text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              <Clock className="w-3 h-3" />
                              ~{flow.estimatedMinutes} min
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{flow.description}</p>
                      </div>
                      <button
                        onClick={() => startFlow(flow)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0 shadow-sm"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span className="font-[--font-weight-semibold]">Start Demo</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Requirements Documentation */}
        <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 border-2 border-accent/30 rounded-[--radius] p-8">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-[--radius] bg-accent/20 border-2 border-accent/40 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="mb-3 flex items-center gap-3">
                Requirements Documentation
                <span className="px-2 py-0.5 bg-accent/20 border border-accent/30 rounded uppercase tracking-wider font-[--font-weight-semibold] text-accent" style={{ fontSize: 'var(--text-xs)' }}>
                  Draft Specs
                </span>
              </h2>
              <p className="text-muted-foreground mb-6">
                View the complete requirements specification for PMOR-44, authored by <span className="text-foreground font-[--font-weight-semibold]">{AUTHOR.name}</span>. 
                Reference this document for detailed functional requirements, data models, and screen specifications.
              </p>
              
              {/* Main Document Link */}
              <a
                href={REQUIREMENTS_DOCS.mainDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-[--radius-button] hover:opacity-90 transition-opacity mb-6 shadow-sm font-[--font-weight-semibold]"
              >
                <FileText className="w-4 h-4" />
                View Full Requirements Doc
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Quick Links to Sections */}
              <div>
                <div className="uppercase tracking-wider text-muted-foreground mb-3 font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-xs)' }}>
                  Quick Links to Sections
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={REQUIREMENTS_DOCS.sections.dataModel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Data Model</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.screensFlows}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Screens & Flows</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.designDetails}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Design Details Spec</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.jobDetails}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Job Details Spec</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.cartBehavior}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Cart Behavior</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.reorderFlows}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Reorder Flows</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.easyViewLTE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">EasyView LTE Integration</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                  <a
                    href={REQUIREMENTS_DOCS.sections.prototypeSpecs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-[--radius] hover:border-accent hover:bg-card/80 transition-all"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <span className="text-foreground">Prototype Specs</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Handoff */}
        <div className="bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 border-2 border-accent/30 rounded-[--radius] p-8">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-[--radius] bg-accent/20 border-2 border-accent/40 flex items-center justify-center flex-shrink-0">
              <Code className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="mb-3 flex items-center gap-3">
                Developer Handoff
                <span className="px-2 py-0.5 bg-accent/20 border border-accent/30 rounded uppercase tracking-wider font-[--font-weight-semibold] text-accent" style={{ fontSize: 'var(--text-xs)' }}>
                  Code & Assets
                </span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Access the code and assets for this prototype to facilitate development and integration.
              </p>
              
              {/* Main Document Link */}
              <button
                onClick={() => setShowHandoff(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-[--radius-button] hover:opacity-90 transition-opacity mb-6 shadow-sm font-[--font-weight-semibold]"
              >
                <Code className="w-4 h-4" />
                View Developer Handoff
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Handoff Modal */}
      {showHandoff && (
        <DeveloperHandoff onClose={() => setShowHandoff(false)} />
      )}
    </div>
  );
}
