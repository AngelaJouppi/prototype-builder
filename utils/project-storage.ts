// Project Export/Import System
// Works in both Figma Make (localStorage) and Replit (can extend to DB)

export interface ExportedProject {
  version: string;
  exportedAt: string;
  project: any;
}

export class ProjectStorage {
  private static STORAGE_KEY = 'cupabu-platform-projects';
  private static VERSION = '1.0.0';
  private projects: Record<string, any>;
  private defaultProjects: Record<string, any>;

  constructor(defaultProjects: Record<string, any> = {}) {
    this.defaultProjects = defaultProjects;
    this.projects = this.loadFromLocalStorage() || { ...defaultProjects };
  }

  // Get all projects
  getAllProjects(): Record<string, any> {
    return this.projects;
  }

  // Get single project
  getProject(id: string): any | null {
    return this.projects[id] || null;
  }

  // Add or update project
  saveProject(project: any): void {
    this.projects[project.id] = project;
    this.saveToLocalStorage();
  }

  // Delete project
  deleteProject(id: string): void {
    delete this.projects[id];
    this.saveToLocalStorage();
  }

  // Count projects
  getProjectCount(): number {
    return Object.keys(this.projects).length;
  }

  // Export single project as JSON
  static exportProject(project: any): string {
    const exported: ExportedProject = {
      version: this.VERSION,
      exportedAt: new Date().toISOString(),
      project
    };
    return JSON.stringify(exported, null, 2);
  }

  // Export all projects
  static exportAllProjects(projects: Record<string, any>): string {
    const exported = {
      version: this.VERSION,
      exportedAt: new Date().toISOString(),
      projects: Object.values(projects)
    };
    return JSON.stringify(exported, null, 2);
  }

  // Import project from JSON
  static importProject(jsonString: string): any {
    try {
      const data = JSON.parse(jsonString) as ExportedProject;
      
      // Version check
      if (data.version !== this.VERSION) {
        console.warn(`Version mismatch: ${data.version} vs ${this.VERSION}`);
      }

      return data.project;
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error('Invalid project file');
    }
  }

  // Save to localStorage (Figma Make)
  private saveToLocalStorage(): void {
    try {
      const json = ProjectStorage.exportAllProjects(this.projects);
      localStorage.setItem(ProjectStorage.STORAGE_KEY, json);
      console.log('Projects saved to localStorage');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  // Load from localStorage (Figma Make)
  private loadFromLocalStorage(): Record<string, any> | null {
    try {
      const json = localStorage.getItem(ProjectStorage.STORAGE_KEY);
      if (!json) return null;

      const data = JSON.parse(json);
      const projects: Record<string, any> = {};
      
      data.projects.forEach((project: any) => {
        projects[project.id] = project;
      });

      console.log('Projects loaded from localStorage');
      return projects;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  // Download as file
  static downloadProjectFile(project: any, filename?: string): void {
    const json = ProjectStorage.exportProject(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `${project.id}-export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Download all projects
  static downloadAllProjects(projects: Record<string, any>): void {
    const json = ProjectStorage.exportAllProjects(projects);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cupabu-platform-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Upload from file
  static uploadProjectFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = e.target?.result as string;
          const project = ProjectStorage.importProject(json);
          resolve(project);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  // For Replit: Prepare for database storage
  static toDatabaseFormat(project: any): any {
    return {
      id: project.id,
      data: JSON.stringify(project),
      version: ProjectStorage.VERSION,
      created_at: project.created,
      updated_at: project.lastUpdated
    };
  }

  // For Replit: Convert from database format
  static fromDatabaseFormat(dbRecord: any): any {
    return JSON.parse(dbRecord.data);
  }
}

// Auto-save functionality
export class AutoSave {
  private static INTERVAL = 30000; // 30 seconds
  private static intervalId: number | null = null;

  static start(saveCallback: () => void): void {
    if (this.intervalId !== null) return;
    
    this.intervalId = window.setInterval(() => {
      saveCallback();
    }, this.INTERVAL);
    
    console.log('Auto-save enabled (every 30s)');
  }

  static stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Auto-save disabled');
    }
  }
}
