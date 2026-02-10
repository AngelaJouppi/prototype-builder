import { Folder, Calendar, Tag, ArrowRight, Award, FileText, Sparkles, Plus, HelpCircle, Shield, Download, Upload, Bug, Settings, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PROJECT_STORAGE, PLATFORM_CONFIG } from '../config/platform';
import { ProjectCreationWizard } from './ProjectCreationWizard';
import { PlatformGuideModal } from './PlatformGuideModal';
import { AdminPanel } from './AdminPanel';
import { DebugPanel } from './DebugPanel';
import { UtilitiesMenu } from './UtilitiesMenu';
import { ProjectStorage } from '../utils/project-storage';
import type { Page } from '../App';

interface PlatformHomeProps {
  onSelectProject: (projectId: string) => void;
}

export function PlatformHome({ onSelectProject }: PlatformHomeProps) {
  console.log('🏠 PlatformHome rendering...');
  
  const [showWizard, setShowWizard] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [projects, setProjects] = useState(PROJECT_STORAGE.getAllProjects());
  const projectList = Object.values(projects);
  
  console.log('📊 Projects loaded:', projectList.length);

  // Refresh projects list when wizard closes
  const handleProjectCreated = (projectData: any) => {
    PROJECT_STORAGE.saveProject(projectData);
    setProjects(PROJECT_STORAGE.getAllProjects());
    setShowWizard(false);
  };

  // Export all projects as JSON
  const handleExport = () => {
    ProjectStorage.downloadAllProjects(projects);
  };

  // Import projects from JSON file
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const project = await ProjectStorage.uploadProjectFile(file);
      PROJECT_STORAGE.saveProject(project);
      setProjects(PROJECT_STORAGE.getAllProjects());
      alert(`Project "${project.name}" imported successfully!`);
    } catch (error) {
      alert('Failed to import project. Please check the file format.');
    }
  };

  const statusColors = {
    draft: 'bg-muted text-muted-foreground border-muted',
    'in-review': 'bg-accent/10 text-accent border-accent/30',
    approved: 'bg-[#00A651]/10 text-[#00A651] border-[#00A651]/30',
    development: 'bg-primary/10 text-primary border-primary/30',
    complete: 'bg-[#00A651]/10 text-[#00A651] border-[#00A651]/30',
  };

  const statusLabels = {
    draft: 'Draft',
    'in-review': 'In Review',
    approved: 'Approved',
    development: 'Development',
    complete: 'Complete',
  };

  return (
    <div className="platform-ui min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Platform Header */}
        <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-[1400px] mx-auto px-8 py-12">
            <div className="flex items-start gap-6 mb-6">
              {/* Rainbow gradient icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse" style={{ animationDuration: '3s' }}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: '\'Proxima Nova\', sans-serif', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Personal UX Lab
                  </span>
                </div>
                <h1 className="mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent" style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.2' }}>
                  Your Prototype Hub ✨
                </h1>
                <p className="text-gray-400 max-w-[700px]" style={{ fontSize: 'var(--text-lg)' }}>
                  Build research-backed prototypes with your CUPABU design system, backed by Baymard insights
                </p>
              </div>
            </div>

            {/* Quick stats - condensed */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all group">
                <div className="text-2xl mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  {projectList.length}
                </div>
                <div className="text-gray-400 text-sm">Active Project{projectList.length !== 1 ? 's' : ''}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all group">
                <div className="text-2xl mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                  {Object.values(projects).reduce((acc, project) => 
                    acc + project.deliverables.reduce((sum, d) => sum + (d.flows?.length || 0), 0), 0
                  )}
                </div>
                <div className="text-gray-400 text-sm">User Flows</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-all group">
                <div className="text-2xl mb-1 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                  {Object.values(projects).reduce((acc, project) => acc + project.researchLibrary.length, 0)}
                </div>
                <div className="text-gray-400 text-sm">Research Citations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2 text-white text-2xl font-semibold">Projects</h2>
              <p className="text-gray-400">
                Your research-backed prototypes and deliverables
              </p>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 gap-6">
            {projectList.map((project) => {
              const totalFlows = project.deliverables.reduce((sum, d) => sum + (d.flows?.length || 0), 0);
              const totalResearch = project.researchLibrary.length;
              
              return (
                <div
                  key={project.id}
                  className="bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all overflow-hidden backdrop-blur-sm hover:bg-white/10 group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Project Icon */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Folder className="w-10 h-10 text-purple-300" />
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl text-white font-semibold">{project.name}</h3>
                          {project.taskLink?.platform && (
                            <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-xs font-semibold text-gray-300">
                              {project.taskLink.platform}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 border rounded text-xs font-semibold ${statusColors[project.status as keyof typeof statusColors] || 'bg-white/10 text-gray-300'}`}>
                            {statusLabels[project.status as keyof typeof statusLabels] || project.status}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-4">
                          {project.description}
                        </p>

                        {/* Project Meta */}
                        <div className="flex items-center gap-6 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{project.requirementsDoc?.author || 'Product Team'}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 5 && (
                              <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-gray-400">
                                +{project.tags.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quick Stats & Actions */}
                      <div className="flex flex-col gap-4 flex-shrink-0">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3 pb-4 border-b border-white/10">
                          <div className="text-center">
                            <div className="text-white text-xl font-bold">{project.deliverables.length}</div>
                            <div className="text-gray-500 uppercase tracking-wide text-[10px]">Deliverable{project.deliverables.length !== 1 ? 's' : ''}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white text-xl font-bold">{totalFlows}</div>
                            <div className="text-gray-500 uppercase tracking-wide text-[10px]">Flow{totalFlows !== 1 ? 's' : ''}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white text-xl font-bold">{totalResearch}</div>
                            <div className="text-gray-500 uppercase tracking-wide text-[10px]">Research</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => onSelectProject(project.id)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap font-semibold hover:scale-105"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Open Project</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {projectList.length === 0 && (
            <div className="mt-8 p-12 bg-white/5 border border-dashed border-white/20 rounded-2xl text-center backdrop-blur-sm">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg mb-2">No projects yet</p>
              <p className="text-gray-500 text-sm">
                Click the "New Prototype" button to create your first research-backed prototype
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Creation Wizard */}
      {showWizard && (
        <ProjectCreationWizard
          onClose={() => setShowWizard(false)}
          onCreateProject={handleProjectCreated}
        />
      )}

      {/* Platform Guide Modal */}
      {showGuide && (
        <PlatformGuideModal
          onClose={() => setShowGuide(false)}
        />
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* Debug Panel */}
      {showDebug && (
        <DebugPanel
          onClose={() => setShowDebug(false)}
        />
      )}

      {/* Primary Action: New Prototype Button */}
      <button
        onClick={() => setShowWizard(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-2xl px-8 py-4 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105 transition-all duration-200 flex items-center gap-3 z-50 group font-semibold"
        style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite' }}
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
        <span className="text-[1.0625rem]">New Prototype</span>
      </button>

      {/* Utilities Menu */}
      <UtilitiesMenu
        onOpenHelp={() => setShowGuide(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenDebug={() => setShowDebug(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
