import { useState } from 'react';
import { Home, ArrowRight, BookOpen, Code, X, Award, Link, Calendar, CheckCircle, ExternalLink, Menu, ChevronRight, FileText, Sparkles, Eye } from 'lucide-react';
import type { Page } from '../App';
import { PROJECT_STORAGE, ResearchItem, Flow } from '../config/platform';
import React from 'react';

// Research Citation Card Component - APP UI STYLED (Dark Rainbow)
interface ResearchCitationCardProps {
  item: ResearchItem;
  currentFlowData: Flow | null;
}

function ResearchCitationCard({ item, currentFlowData }: ResearchCitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const appliedToText = currentFlowData ? `Flow: ${currentFlowData.name}` : 'This Flow';
  const keyInsight = item.summary ? item.summary.split('.')[0] + '.' : '';
  const fullDescription = item.summary || '';
  const shouldTruncate = fullDescription.length > 150;
  const displayDescription = !isExpanded && shouldTruncate 
    ? fullDescription.substring(0, 150) + '...' 
    : fullDescription;
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:border-purple-500/30">
      {/* Key Insight Callout - Purple Gradient */}
      <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border-b border-purple-500/20 px-4 py-3">
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
          <div>
            <div className="uppercase tracking-wider text-purple-300 mb-1" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
              Key Insight
            </div>
            <p className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', lineHeight: '1.4' }}>
              {keyInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Header with Baymard badge */}
        <div className="flex items-start gap-2 mb-3">
          <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-xs text-yellow-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 'var(--font-weight-semibold)' }}>
            Baymard Institute
          </div>
          <div className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 'var(--font-weight-semibold)' }}>
            UX Guideline
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', lineHeight: '1.4' }}>
          {item.title}
        </h3>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-white/10 border border-white/20 rounded-lg text-gray-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 mb-3" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
          {displayDescription}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-300 hover:text-purple-200 hover:underline mb-3 transition-colors" 
            style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Applied To */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Link className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
              Applied To
            </span>
          </div>
          <p className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
            {appliedToText}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
              Updated Nov 2024
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
              Directly applies
            </span>
          </div>
        </div>

        {/* CTA */}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
            style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
          >
            <ExternalLink className="w-4 h-4" />
            View Full Research on Baymard
          </a>
        )}
      </div>
    </div>
  );
}

interface PrototypeNavProps {
  currentPage: Page;
  currentFlow?: string;
  onNavigate: (page: Page, designId?: string, jobId?: string, flow?: string) => void;
  currentProject?: string | null;
  onShowHandoff?: () => void;
  showResearchPanel?: boolean;
  setShowResearchPanel?: (show: boolean) => void;
  isShareMode?: boolean;
}

interface FlowStep {
  page: Page;
  label: string;
  description: string;
  nextAction?: string;
}

const flowSteps: Record<string, FlowStep[]> = {
  'flow-a': [
    { 
      page: 'easyview-enhanced', 
      label: 'Create Session', 
      description: 'EasyView LTE - Create Team Builder Session',
      nextAction: 'Switch to "2 Review" tab, then click "Submit to SID" button'
    },
    { 
      page: 'dashboard', 
      label: 'View Designs', 
      description: 'Dashboard - View Team Builder Designs',
      nextAction: 'Click any design tile from the "Eagles 2024 Uniforms" job'
    },
    { 
      page: 'design-details', 
      label: 'Design Details', 
      description: 'Review Individual Design',
      nextAction: 'Click "Order Now" button to add to cart'
    },
    { 
      page: 'cart', 
      label: 'Review Cart', 
      description: 'Cart - Team Builder Line Item',
      nextAction: 'Review the roster details, then click "Checkout"'
    },
    { 
      page: 'checkout', 
      label: 'Checkout', 
      description: 'Complete Order',
      nextAction: 'Flow complete! Return to start or explore other flows'
    },
  ],
  'flow-b': [
    { 
      page: 'dashboard', 
      label: 'Dashboard', 
      description: 'Individual Designs View',
      nextAction: 'Click "Quick Reorder" on any design tile'
    },
    { 
      page: 'cart', 
      label: 'Cart', 
      description: 'Quick Reorder',
      nextAction: 'Review cart, then click "Checkout"'
    },
    { 
      page: 'checkout', 
      label: 'Checkout', 
      description: 'Complete Reorder',
      nextAction: 'Flow complete!'
    },
  ],
  'flow-c': [
    { 
      page: 'dashboard', 
      label: 'Dashboard', 
      description: 'Grouped by Job Name',
      nextAction: 'Change view to "Job name", then click "View Job Details"'
    },
    { 
      page: 'job-details', 
      label: 'Job Details', 
      description: 'View All Players in Roster',
      nextAction: 'Click "Order All Players" or select individuals'
    },
    { 
      page: 'cart', 
      label: 'Cart', 
      description: 'Order Players',
      nextAction: 'Review roster, then click "Checkout"'
    },
    { 
      page: 'checkout', 
      label: 'Checkout', 
      description: 'Complete Order',
      nextAction: 'Flow complete!'
    },
  ],
  'flow-d': [
    { 
      page: 'order-history', 
      label: 'Order History', 
      description: 'View Past Orders',
      nextAction: 'Click "Reorder" on any Team Builder order'
    },
    { 
      page: 'cart', 
      label: 'Cart', 
      description: 'Reorder from History',
      nextAction: 'Review cart, then click "Checkout"'
    },
    { 
      page: 'checkout', 
      label: 'Checkout', 
      description: 'Complete Reorder',
      nextAction: 'Flow complete!'
    },
  ],
  'flow-e': [
    { 
      page: 'job-details', 
      label: 'Job Details', 
      description: 'View Roster',
      nextAction: 'Click "Edit Roster" to manage players'
    },
    { 
      page: 'easyview-roster', 
      label: 'Edit Roster', 
      description: 'EasyView LTE - Roster Management',
      nextAction: 'Add/edit players, then return to Job Details'
    },
    { 
      page: 'job-details', 
      label: 'Review Changes', 
      description: 'Job Details - Updated Roster',
      nextAction: 'Click "Order All Players" to proceed'
    },
    { 
      page: 'cart', 
      label: 'Cart', 
      description: 'Order with Updated Roster',
      nextAction: 'Review and checkout'
    },
  ],
};

const getPageLabel = (page: Page): string => {
  const labels: Record<Page, string> = {
    'dashboard': 'Dashboard',
    'design-details': 'Design Details',
    'job-details': 'Job Details',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout',
    'easyview-enhanced': 'EasyView Enhanced',
    'easyview-roster': 'Roster Management',
    'order-history': 'Order History',
    'prototype-home': 'Prototype Home',
    'project-admin': 'Project Admin',
    'platform-home': 'Platform Home',
    'demo-landing': 'Demo Landing',
  };
  return labels[page] || page;
};

export function PrototypeNav({ 
  currentPage, 
  currentFlow, 
  onNavigate, 
  currentProject, 
  showResearchPanel, 
  setShowResearchPanel, 
  isShareMode 
}: PrototypeNavProps) {
  const [showContextDrawer, setShowContextDrawer] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'research' | 'devnotes'>('research');

  const currentFlowSteps = currentFlow && flowSteps[currentFlow] ? flowSteps[currentFlow] : [];
  const currentStepIndex = currentFlowSteps.findIndex(step => step.page === currentPage);
  const currentStep = currentStepIndex >= 0 ? currentFlowSteps[currentStepIndex] : null;

  // Get project data
  const project = currentProject ? PROJECT_STORAGE.getProject(currentProject) : null;
  let currentFlowData: Flow | null = null;
  
  if (project && currentFlow) {
    for (const d of project.deliverables) {
      const f = d.flows?.find(f => f.id === currentFlow);
      if (f) {
        currentFlowData = f;
        break;
      }
    }
  }

  // Get research and dev notes
  const flowResearch = project?.researchLibrary.filter(item => 
    item.usedIn.some(usage => usage.id === currentFlow)
  ) || [];
  const devNotes = currentFlowData?.devNotes || '';
  const hasResearch = flowResearch.length > 0;
  const hasDevNotes = devNotes.length > 0;
  const hasContext = hasResearch || hasDevNotes;

  // Don't show nav for non-prototype pages
  if (currentPage === 'prototype-home' || currentPage === 'project-admin' || currentPage === 'platform-home' || currentPage === 'demo-landing') {
    return null;
  }

  return (
    <>
      {/* Top Navigation Bar - APP UI Dark Mode */}
      <div className="platform-ui bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-white/10 shadow-lg sticky top-0 z-40 backdrop-blur-xl">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Flow Progress */}
            <div className="flex items-center gap-4">
              {/* Home Button */}
              {!isShareMode && (
                <button
                  onClick={() => onNavigate('prototype-home')}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors group"
                  title="Return to Prototype Home"
                >
                  <Home className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Home
                  </span>
                </button>
              )}

              {/* Flow Progress Pills */}
              {currentFlowSteps.length > 0 && (
                <>
                  <div className="w-px h-5 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    {currentFlowSteps.map((step, index) => {
                      const isActive = index === currentStepIndex;
                      const isComplete = index < currentStepIndex;
                      
                      return (
                        <React.Fragment key={step.page}>
                          <button
                            onClick={() => onNavigate(step.page)}
                            className={`
                              relative px-3 py-1.5 rounded-full transition-all
                              ${isActive 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 ring-2 ring-purple-500/30' 
                                : isComplete
                                ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/20'
                              }
                            `}
                            style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}
                          >
                            {step.label}
                          </button>
                          {index < currentFlowSteps.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-gray-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {currentStepIndex + 1} of {currentFlowSteps.length}
                    </span>
                  </div>
                </>
              )}

              {/* No Flow Mode */}
              {currentFlowSteps.length === 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span className="text-purple-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Free Exploration
                  </span>
                </div>
              )}
            </div>

            {/* Right: Context Menu */}
            {hasContext && (
              <button
                onClick={() => setShowContextDrawer(!showContextDrawer)}
                className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all
                  ${showContextDrawer 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }
                `}
                style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
              >
                <Menu className="w-4 h-4" />
                <span>Context</span>
                {(hasResearch || hasDevNotes) && (
                  <span className={`px-1.5 py-0.5 rounded-full ${showContextDrawer ? 'bg-white/20' : 'bg-purple-500/30 text-purple-200'}`} style={{ fontSize: 'var(--text-xs)' }}>
                    {hasResearch && hasDevNotes ? '2' : '1'}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Next Step Banner - Orange Gradient for high visibility */}
        {currentStep?.nextAction && (
          <div className="bg-gradient-to-r from-orange-500/20 via-orange-500/30 to-orange-500/20 border-t border-orange-500/30 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0 shadow-lg shadow-orange-500/50">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-orange-300 uppercase tracking-wide" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                  Next Step
                </p>
                <p className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginTop: '2px' }}>
                  {currentStep.nextAction}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Context Drawer - Slide in from right - APP UI Dark Mode */}
      {showContextDrawer && hasContext && (
        <div className="platform-ui fixed inset-0 z-50 flex items-start justify-end pointer-events-none">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity"
            onClick={() => setShowContextDrawer(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="pointer-events-auto w-[480px] h-full bg-gradient-to-b from-gray-900 via-gray-950 to-black border-l border-white/10 shadow-2xl flex flex-col animate-slide-in-right relative">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/40 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-300" />
                </div>
                <h2 className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                  Flow Context
                </h2>
              </div>
              <button
                onClick={() => setShowContextDrawer(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-black/40 border-b border-white/10 px-6 flex gap-2">
              {hasResearch && (
                <button
                  onClick={() => setActiveDrawerTab('research')}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 transition-all
                    ${activeDrawerTab === 'research'
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                    }
                  `}
                  style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Research</span>
                  <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30" style={{ fontSize: 'var(--text-xs)' }}>
                    {flowResearch.length}
                  </span>
                </button>
              )}
              {hasDevNotes && (
                <button
                  onClick={() => setActiveDrawerTab('devnotes')}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 transition-all
                    ${activeDrawerTab === 'devnotes'
                      ? 'border-cyan-500 text-cyan-300'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                    }
                  `}
                  style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
                >
                  <Code className="w-4 h-4" />
                  <span>Dev Notes</span>
                </button>
              )}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-transparent to-black/20">
              {/* Research Tab */}
              {activeDrawerTab === 'research' && hasResearch && (
                <div className="space-y-4">
                  {flowResearch.map((item) => (
                    <ResearchCitationCard key={item.id} item={item} currentFlowData={currentFlowData} />
                  ))}
                </div>
              )}

              {/* Dev Notes Tab */}
              {activeDrawerTab === 'devnotes' && hasDevNotes && (
                <div className="space-y-4">
                  <div 
                    className="text-gray-200 markdown-content"
                    style={{ 
                      fontFamily: "'Proxima Nova', sans-serif",
                      fontSize: 'var(--text-sm)',
                      lineHeight: '1.6'
                    }}
                  >
                    {/* Render markdown as formatted HTML */}
                    {devNotes.split('\n').map((line, index) => {
                      // Heading 2
                      if (line.startsWith('## ')) {
                        return (
                          <h2 
                            key={index}
                            className="text-white mt-6 mb-3 pb-2 border-b border-white/10"
                            style={{ 
                              fontFamily: "'Proxima Nova', sans-serif",
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-bold)',
                              lineHeight: '1.4'
                            }}
                          >
                            {line.replace('## ', '')}
                          </h2>
                        );
                      }
                      // Heading 3
                      if (line.startsWith('### ')) {
                        return (
                          <h3 
                            key={index}
                            className="text-white mt-4 mb-2"
                            style={{ 
                              fontFamily: "'Proxima Nova', sans-serif",
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              lineHeight: '1.4'
                            }}
                          >
                            {line.replace('### ', '')}
                          </h3>
                        );
                      }
                      // Bold text
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <p 
                            key={index}
                            className="text-white mb-2"
                            style={{ 
                              fontFamily: "'Proxima Nova', sans-serif",
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              lineHeight: '1.6'
                            }}
                          >
                            {line.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      // Bullet points
                      if (line.startsWith('- ')) {
                        return (
                          <li 
                            key={index}
                            className="text-gray-300 ml-4 mb-1"
                            style={{ 
                              fontFamily: "'Proxima Nova', sans-serif",
                              fontSize: 'var(--text-sm)',
                              lineHeight: '1.6'
                            }}
                          >
                            {line.replace('- ', '')}
                          </li>
                        );
                      }
                      // Code blocks
                      if (line.startsWith('```')) {
                        return null; // Skip code fence markers
                      }
                      // Empty lines
                      if (line.trim() === '') {
                        return <div key={index} className="h-3"></div>;
                      }
                      // Regular paragraphs
                      return (
                        <p 
                          key={index}
                          className="text-gray-300 mb-2"
                          style={{ 
                            fontFamily: "'Proxima Nova', sans-serif",
                            fontSize: 'var(--text-sm)',
                            lineHeight: '1.6'
                          }}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
