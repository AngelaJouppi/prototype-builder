import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PROJECT_STORAGE, type Project } from '../config/platform';

interface ProjectContextType {
  projects: Record<string, Project>;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | null;
  exportAllProjects: () => void;
  importProjects: (file: File) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Record<string, Project>>(
    PROJECT_STORAGE.getAllProjects()
  );

  // Update local state when projects change
  const refreshProjects = () => {
    setProjects({ ...PROJECT_STORAGE.getAllProjects() });
  };

  const addProject = (project: Project) => {
    PROJECT_STORAGE.saveProject(project);
    refreshProjects();
  };

  const updateProject = (project: Project) => {
    PROJECT_STORAGE.saveProject(project);
    refreshProjects();
  };

  const deleteProject = (id: string) => {
    PROJECT_STORAGE.deleteProject(id);
    refreshProjects();
  };

  const getProject = (id: string): Project | null => {
    return PROJECT_STORAGE.getProject(id);
  };

  const exportAllProjects = () => {
    PROJECT_STORAGE.constructor.downloadAllProjects(projects);
  };

  const importProjects = async (file: File) => {
    try {
      const project = await PROJECT_STORAGE.constructor.uploadProjectFile(file);
      addProject(project);
    } catch (error) {
      console.error('Failed to import project:', error);
      throw error;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        exportAllProjects,
        importProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
