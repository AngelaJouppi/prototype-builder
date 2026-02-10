import type { Project } from '../config/platform';

export class ProjectStorage {
  static downloadAllProjects(projects: Record<string, Project>) {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prototype-projects.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  static async uploadProjectFile(file: File): Promise<Project> {
    const text = await file.text();
    const parsed = JSON.parse(text) as Project;
    return parsed;
  }
}
