import { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Info, 
  Award, 
  AlertCircle, 
  ExternalLink, 
  Upload, 
  FileText, 
  CheckCircle2,
  LayoutDashboard,
  ShoppingCart,
  Search,
  Layers,
  Monitor,
  Smartphone,
  Plus,
  Trash2
} from 'lucide-react';
import { BAYMARD_TOPICS, PROTOTYPE_TEMPLATES, BAYMARD_SCREENSHOT_GUIDE, type BaymardTopic } from '../config/baymard-topics';
import { DESIGN_THINKING_STAGES, DESIGN_THINKING_STAGES_ARRAY, FIDELITY_LEVELS, FIDELITY_LEVELS_ARRAY, type DesignThinkingStage } from '../config/design-thinking';

interface ProjectCreationWizardProps {
  onClose: () => void;
  onCreateProject: (projectData: any) => void;
}

interface DemoFlow {
  id: string;
  name: string;
  description: string;
  fidelity: 'low' | 'mid' | 'high';
  device: 'desktop' | 'mobile' | 'tablet' | 'responsive';
  status: 'draft' | 'ready' | 'published';
  userType?: string;
  createdAt: string;
  lastUpdated: string;
}

type Step = 'design-thinking' | 'template' | 'basics' | 'research' | 'documentation' | 'flows' | 'review';

export function ProjectCreationWizard({ onClose, onCreateProject }: ProjectCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('design-thinking');
  const [designThinkingStage, setDesignThinkingStage] = useState<DesignThinkingStage>('prototype');
  const [fidelityLevel, setFidelityLevel] = useState<'wireframe' | 'standard' | 'polished'>('standard');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [jiraTicket, setJiraTicket] = useState('');
  const [selectedResearch, setSelectedResearch] = useState<string[]>([]);
  const [notionUrl, setNotionUrl] = useState('');
  const [researchNotes, setResearchNotes] = useState('');
  const [flows, setFlows] = useState<DemoFlow[]>([]);
  
  const steps: Step[] = ['design-thinking', 'template', 'basics', 'research', 'documentation', 'flows', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const template = selectedTemplate ? PROTOTYPE_TEMPLATES[selectedTemplate] : null;
  const selectedTopics = selectedResearch.map(id => BAYMARD_TOPICS[id]).filter(Boolean);
  const premiumTopics = selectedTopics.filter(t => t.isPremium);

  const canProceed = () => {
    if (currentStep === 'design-thinking') return true;
    if (currentStep === 'template') return selectedTemplate !== '';
    if (currentStep === 'basics') return projectName.trim() !== '' && projectDescription.trim() !== '';
    if (currentStep === 'research') return selectedResearch.length > 0;
    return true;
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleCreate = () => {
    const projectData = {
      id: `project-${Date.now()}`,
      template: selectedTemplate,
      name: projectName,
      description: projectDescription,
      jiraTicket,
      research: selectedResearch,
      notionUrl,
      researchNotes,
      designThinkingStage,
      fidelityLevel,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'draft' as const,
      author: {
        name: 'You',
        email: 'designer@stahls.com'
      },
      tags: [],
      flows: flows.map(flow => ({
        ...flow,
        id: `flow-${Date.now()}-${flow.name.replace(/\s+/g, '-').toLowerCase()}`,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }))
    };
    onCreateProject(projectData);
  };

  const iconMap: Record<string, any> = {
    LayoutDashboard,
    ShoppingCart,
    Sparkles,
    Search,
    Layers,
    Monitor,
    Smartphone,
    Plus,
    Trash2
  };

  return (
    <div className="platform-ui fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/20 rounded-2xl max-w-[900px] w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-purple-500/20 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                  Create New Prototype
                </h2>
              </div>
              <p className="text-gray-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Build a research-backed, interactive prototype using the CUPABU design system
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-3 mt-6">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    index < currentStepIndex 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                      : index === currentStepIndex
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-4 ring-purple-500/30 shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 text-gray-400 border border-white/20'
                  }`} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                    {index < currentStepIndex ? '✓' : index + 1}
                  </div>
                  <span className={`capitalize ${
                    index === currentStepIndex ? 'text-white' : 'text-gray-400'
                  }`} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-colors ${
                    index < currentStepIndex ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Step 1: Design Thinking */}
          {currentStep === 'design-thinking' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Design Thinking Stage
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Choose the stage of the design thinking process you're focusing on.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {DESIGN_THINKING_STAGES_ARRAY.map((stage) => {
                  const Icon = iconMap[stage.icon] || Sparkles;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setDesignThinkingStage(stage.id)}
                      className={`p-5 border rounded-xl text-left transition-all ${
                        designThinkingStage === stage.id
                          ? 'border-pink-500/50 bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-2 ring-pink-500/40 shadow-lg shadow-pink-500/30'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          designThinkingStage === stage.id ? 'bg-pink-500/30 border border-pink-500/30' : 'bg-white/10 border border-white/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            designThinkingStage === stage.id ? 'text-pink-300' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={designThinkingStage === stage.id ? 'text-white' : 'text-gray-200'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                            {stage.name}
                          </h4>
                          <p className={designThinkingStage === stage.id ? 'text-gray-200' : 'text-gray-400'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {stage.description}
                          </p>
                        </div>
                      </div>
                      {designThinkingStage === stage.id && (
                        <div className="mt-3 pt-3 border-t border-pink-500/30">
                          <p className="text-gray-200 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            Key activities:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {stage.activities.slice(0, 3).map((activity) => (
                              <span key={activity} className="px-2 py-0.5 bg-pink-500/20 rounded-lg text-pink-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-white mt-6 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Fidelity Level
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Choose the level of detail for your prototype.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {FIDELITY_LEVELS_ARRAY.map((level) => {
                  const Icon = iconMap[level.icon] || Sparkles;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setFidelityLevel(level.id)}
                      className={`p-5 border rounded-xl text-left transition-all ${
                        fidelityLevel === level.id
                          ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/30'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          fidelityLevel === level.id ? 'bg-purple-500/30' : 'bg-white/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            fidelityLevel === level.id ? 'text-purple-300' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={fidelityLevel === level.id ? 'text-white' : 'text-gray-200'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                            {level.name}
                          </h4>
                          <p className={fidelityLevel === level.id ? 'text-gray-200' : 'text-gray-400'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {level.description}
                          </p>
                        </div>
                      </div>
                      {fidelityLevel === level.id && (
                        <div className="mt-3 pt-3 border-t border-purple-500/30">
                          <p className="text-gray-200 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            Use when:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {level.useWhen.slice(0, 2).map((use) => (
                              <span key={use} className="px-2 py-0.5 bg-purple-500/20 rounded-lg text-purple-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Template Selection */}
          {currentStep === 'template' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Choose a Prototype Template
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Select the type of experience you're building. This determines recommended research and required inputs.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {Object.values(PROTOTYPE_TEMPLATES).map((tmpl) => {
                  const Icon = iconMap[tmpl.icon] || Sparkles;
                  return (
                    <button
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-5 border rounded-xl text-left transition-all ${
                        selectedTemplate === tmpl.id
                          ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/30'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedTemplate === tmpl.id ? 'bg-blue-500/30' : 'bg-white/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            selectedTemplate === tmpl.id ? 'text-blue-300' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={selectedTemplate === tmpl.id ? 'text-white' : 'text-gray-200'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                            {tmpl.name}
                          </h4>
                          <p className={selectedTemplate === tmpl.id ? 'text-gray-200' : 'text-gray-400'} style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {tmpl.description}
                          </p>
                        </div>
                      </div>
                      {selectedTemplate === tmpl.id && (
                        <div className="mt-3 pt-3 border-t border-blue-500/30">
                          <p className="text-gray-200 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            Example projects:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {tmpl.exampleProjects.map((ex) => (
                              <span key={ex} className="px-2 py-0.5 bg-blue-500/20 rounded-lg text-blue-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Basic Info */}
          {currentStep === 'basics' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Project Details
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Provide basic information about your prototype project.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Project Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Team Builder Dashboard & Reorder UX"
                    className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-gray-500"
                    style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Brief description of the experience and what problem it solves..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none placeholder:text-gray-500"
                    style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    JIRA Ticket (Optional)
                  </label>
                  <input
                    type="text"
                    value={jiraTicket}
                    onChange={(e) => setJiraTicket(e.target.value)}
                    placeholder="e.g., PMOR-44"
                    className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-gray-500"
                    style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                  />
                </div>

                {template && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-blue-300 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                          Template: {template.name}
                        </p>
                        <p className="text-gray-300 mb-3" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                          Consider these questions as you define your project:
                        </p>
                        <ul className="space-y-1.5">
                          {template.requiredInputs.map((input, index) => (
                            <li key={index} className="text-gray-200 flex items-start gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                              <span className="text-blue-400 mt-0.5">•</span>
                              <span>{input}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Research Selection */}
          {currentStep === 'research' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Select Research Citations
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Choose Baymard research to back your design decisions. Premium content will require screenshots.
              </p>

              {template && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-purple-300 mb-1" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Recommended for {template.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {template.recommendedResearch.map((topicId) => {
                          const topic = BAYMARD_TOPICS[topicId];
                          return topic ? (
                            <button
                              key={topicId}
                              onClick={() => {
                                if (!selectedResearch.includes(topicId)) {
                                  setSelectedResearch([...selectedResearch, topicId]);
                                }
                              }}
                              className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
                              style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}
                            >
                              + {topic.title}
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {Object.values(BAYMARD_TOPICS).map((topic) => {
                  const isSelected = selectedResearch.includes(topic.id);
                  return (
                    <div
                      key={topic.id}
                      className={`p-4 border rounded-xl transition-all ${
                        isSelected
                          ? 'border-green-500/50 bg-green-500/10 ring-2 ring-green-500/30'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedResearch([...selectedResearch, topic.id]);
                            } else {
                              setSelectedResearch(selectedResearch.filter(id => id !== topic.id));
                            }
                          }}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500/50"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {topic.title}
                            </h4>
                            {topic.isPremium && (
                              <span className="px-1.5 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg uppercase" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                                Premium
                              </span>
                            )}
                            {topic.screenshotNeeded && (
                              <span className="px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg uppercase" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Screenshot Needed
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {topic.category}
                          </p>
                          <ul className="space-y-1">
                            {topic.keyInsights.map((insight, index) => (
                              <li key={index} className="text-gray-300 flex items-start gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                                <span className="text-green-400 mt-0.5">✓</span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                          <a
                            href={topic.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline mt-2"
                            style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}
                          >
                            View on Baymard
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {premiumTopics.length > 0 && (
                <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-300 mb-1" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {premiumTopics.length} Premium Article{premiumTopics.length > 1 ? 's' : ''} Selected
                      </p>
                      <p className="text-gray-300 mb-3" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                        You'll need to capture screenshots of these articles in the next step.
                      </p>
                      <div className="space-y-1">
                        {premiumTopics.map(topic => (
                          <div key={topic.id} className="text-gray-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            • {topic.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Documentation */}
          {currentStep === 'documentation' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Documentation & Research Notes
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Provide additional context to ensure accurate prototype generation.
              </p>

              <div className="space-y-6">
                {/* Notion Integration */}
                <div>
                  <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Notion Documentation URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={notionUrl}
                    onChange={(e) => setNotionUrl(e.target.value)}
                    placeholder="https://notion.so/your-workspace/your-doc"
                    className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-gray-500"
                    style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                  />
                  <p className="text-gray-400 mt-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                    Link to your Notion requirements doc. You can also export as PDF and paste key sections below.
                  </p>
                </div>

                {/* Baymard Screenshot Guide */}
                {premiumTopics.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Upload className="w-5 h-5 text-purple-400" />
                      <h4 className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Baymard Screenshot Instructions
                      </h4>
                    </div>
                    
                    <p className="text-gray-300 mb-4" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                      Follow these steps to capture premium Baymard content:
                    </p>

                    <div className="space-y-3 mb-4">
                      {BAYMARD_SCREENSHOT_GUIDE.steps.map((step) => (
                        <div key={step.step} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                            {step.step}
                          </div>
                          <div>
                            <p className="text-white mb-0.5" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {step.instruction}
                            </p>
                            <p className="text-gray-300" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <p className="text-cyan-300 mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Pro Tips:
                      </p>
                      <ul className="space-y-1">
                        {BAYMARD_SCREENSHOT_GUIDE.tips.map((tip, index) => (
                          <li key={index} className="text-gray-200 flex items-start gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Research Notes */}
                <div>
                  <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Additional Research Notes
                  </label>
                  <textarea
                    value={researchNotes}
                    onChange={(e) => setResearchNotes(e.target.value)}
                    placeholder="Paste key findings from Baymard screenshots, internal research, or other sources..."
                    rows={8}
                    className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none font-mono placeholder:text-gray-500"
                    style={{ fontSize: 'var(--text-xs)' }}
                  />
                  <p className="text-gray-400 mt-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                    Paste relevant excerpts from research articles here. This ensures the prototype references real data.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Flows */}
          {currentStep === 'flows' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Define Demo Flows
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Add demo flows to your prototype to showcase different user interactions.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <Layers className="w-4 h-4" />
                    Add New Flow
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Flow Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={flows[flows.length - 1]?.name || ''}
                        onChange={(e) => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows[newFlows.length - 1].name = e.target.value;
                          } else {
                            newFlows.push({
                              id: `flow-${Date.now()}`,
                              name: e.target.value,
                              description: '',
                              fidelity: 'mid',
                              device: 'responsive',
                              status: 'draft',
                              createdAt: new Date().toISOString(),
                              lastUpdated: new Date().toISOString()
                            });
                          }
                          setFlows(newFlows);
                        }}
                        placeholder="e.g., User Onboarding Flow"
                        className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-gray-500"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Description <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        value={flows[flows.length - 1]?.description || ''}
                        onChange={(e) => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows[newFlows.length - 1].description = e.target.value;
                          }
                          setFlows(newFlows);
                        }}
                        placeholder="Brief description of the flow and its purpose..."
                        rows={4}
                        className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none placeholder:text-gray-500"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Fidelity Level
                      </label>
                      <select
                        value={flows[flows.length - 1]?.fidelity || 'mid'}
                        onChange={(e) => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows[newFlows.length - 1].fidelity = e.target.value as 'low' | 'mid' | 'high';
                          }
                          setFlows(newFlows);
                        }}
                        className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                      >
                        <option value="low" className="bg-gray-900 text-white">Low Fidelity</option>
                        <option value="mid" className="bg-gray-900 text-white">Mid Fidelity</option>
                        <option value="high" className="bg-gray-900 text-white">High Fidelity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Device Type
                      </label>
                      <select
                        value={flows[flows.length - 1]?.device || 'responsive'}
                        onChange={(e) => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows[newFlows.length - 1].device = e.target.value as 'desktop' | 'mobile' | 'tablet' | 'responsive';
                          }
                          setFlows(newFlows);
                        }}
                        className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                      >
                        <option value="desktop" className="bg-gray-900 text-white">Desktop</option>
                        <option value="mobile" className="bg-gray-900 text-white">Mobile</option>
                        <option value="tablet" className="bg-gray-900 text-white">Tablet</option>
                        <option value="responsive" className="bg-gray-900 text-white">Responsive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        User Type (Optional)
                      </label>
                      <input
                        type="text"
                        value={flows[flows.length - 1]?.userType || ''}
                        onChange={(e) => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows[newFlows.length - 1].userType = e.target.value;
                          }
                          setFlows(newFlows);
                        }}
                        placeholder="e.g., Admin, Guest"
                        className="w-full px-4 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-gray-500"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          const newFlows = [...flows];
                          if (newFlows.length > 0) {
                            newFlows.pop();
                          }
                          setFlows(newFlows);
                        }}
                        disabled={flows.length < 2}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 border border-red-500/30 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Flow
                      </button>

                      <button
                        onClick={() => {
                          const newFlows = [...flows];
                          newFlows.push({
                            id: `flow-${Date.now()}`,
                            name: '',
                            description: '',
                            fidelity: 'mid',
                            device: 'responsive',
                            status: 'draft',
                            createdAt: new Date().toISOString(),
                            lastUpdated: new Date().toISOString()
                          });
                          setFlows(newFlows);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
                        style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Flow
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <Layers className="w-4 h-4" />
                    Flows Summary
                  </h4>
                  <div className="space-y-2">
                    {flows.map(flow => (
                      <div key={flow.id} className="flex items-center justify-between">
                        <span className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                          {flow.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded-lg" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {flow.fidelity}
                          </span>
                          <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded-lg" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {flow.device}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 'review' && (
            <div>
              <h3 className="text-white mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Review & Create
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>
                Review your prototype configuration before creating the project.
              </p>

              <div className="space-y-4">
                {/* Design Thinking & Fidelity */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <Sparkles className="w-4 h-4" />
                    Design Approach
                  </h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                        Design Thinking Stage
                      </dt>
                      <dd className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {DESIGN_THINKING_STAGES[designThinkingStage].name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                        Fidelity Level
                      </dt>
                      <dd className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {FIDELITY_LEVELS[fidelityLevel].name}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Project Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <FileText className="w-4 h-4" />
                    Project Details
                  </h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>Name</dt>
                      <dd className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{projectName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>Description</dt>
                      <dd className="text-gray-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>{projectDescription}</dd>
                    </div>
                    {jiraTicket && (
                      <div>
                        <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>JIRA Ticket</dt>
                        <dd className="text-white font-mono" style={{ fontSize: 'var(--text-sm)' }}>{jiraTicket}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-gray-400" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>Template</dt>
                      <dd className="text-gray-200" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>{template?.name}</dd>
                    </div>
                  </dl>
                </div>

                {/* Research Citations */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <Award className="w-4 h-4" />
                    Research Citations ({selectedTopics.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedTopics.map(topic => (
                      <div key={topic.id} className="flex items-center justify-between">
                        <span className="text-white" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}>{topic.title}</span>
                        <div className="flex items-center gap-2">
                          {topic.isPremium && (
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-lg" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                              Premium
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded-lg" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documentation & Notes */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="text-white mb-3 flex items-center gap-2" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    <FileText className="w-4 h-4" />
                    Documentation & Research
                  </h4>
                  <dl className="space-y-3">
                    {notionUrl && (
                      <div>
                        <dt className="text-gray-400 mb-1" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>Notion Requirements Doc</dt>
                        <dd>
                          <a 
                            href={notionUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                            style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-sm)' }}
                          >
                            {notionUrl}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </dd>
                      </div>
                    )}
                    {researchNotes && (
                      <div>
                        <dt className="text-gray-400 mb-1" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>Research Notes</dt>
                        <dd className="bg-white/5 text-gray-200 p-3 rounded-lg font-mono max-h-32 overflow-y-auto" style={{ fontSize: 'var(--text-xs)' }}>
                          {researchNotes}
                        </dd>
                      </div>
                    )}
                    {!notionUrl && !researchNotes && (
                      <p className="text-gray-400 italic" style={{ fontFamily: "'Proxima Nova', sans-serif", fontSize: 'var(--text-xs)' }}>No additional documentation provided</p>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-xs">
              {currentStep !== 'design-thinking' && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back
                </button>
              )}
            </div>
            <button
              onClick={currentStep === 'review' ? handleCreate : handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[--radius-button] font-[--font-weight-semibold] transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 'review' ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create Prototype
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
