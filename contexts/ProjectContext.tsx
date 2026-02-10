import { createContext, useContext, type ReactNode } from 'react';

const ProjectContext = createContext<Record<string, unknown>>({});

export function ProjectProvider({ children }: { children: ReactNode }) {
  return <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>;
}

export function useProjectContext() {
  return useContext(ProjectContext);
}
