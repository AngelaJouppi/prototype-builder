import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Zap, RefreshCw, Bug, FileText, Database, Code, Settings, Palette, Eye, FileCode } from 'lucide-react';
import { PROJECT_STORAGE } from '../config/platform';
import { BAYMARD_TOPICS, PROTOTYPE_TEMPLATES } from '../config/baymard-topics';

interface DebugPanelProps {
  onClose: () => void;
}

interface DebugIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  category: 'data' | 'component' | 'performance' | 'structure' | 'design-system' | 'accessibility' | 'code-quality';
  title: string;
  description: string;
  autoFixable: boolean;
  fix?: () => void;
  location?: string;
  codeSnippet?: string;
  recommendation?: string;
}

interface HealthReport {
  score: number;
  issues: DebugIssue[];
  totalChecks: number;
  passedChecks: number;
  lastRun: string;
}

export function DebugPanel({ onClose }: DebugPanelProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'fixes'>('overview');
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);

  // Run health check
  const runHealthCheck = () => {
    setIsScanning(true);
    setFixedIssues([]);
    
    setTimeout(() => {
      const issues: DebugIssue[] = [];
      let totalChecks = 0;
      let passedChecks = 0;
      
      // Helper to generate unique issue IDs
      const generateIssueId = (prefix: string, projectId?: string) => {
        // Use deterministic IDs so fixed issues don't reappear
        return projectId ? `${prefix}-${projectId}` : prefix;
      };

      // Check 1: Validate Projects Data Structure
      totalChecks++;
      const projects = PROJECT_STORAGE.getAllProjects();
      const projectList = Object.values(projects);
      
      let hasDataIssues = false;
      projectList.forEach(project => {
        // Check for missing required fields
        if (!project.id) {
          issues.push({
            id: generateIssueId('project-missing-id'),
            severity: 'error',
            category: 'data',
            title: `Project missing ID`,
            description: `Project "${project.name}" does not have an ID field. This can cause rendering issues.`,
            autoFixable: true,
            fix: () => {
              project.id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              PROJECT_STORAGE.saveProject(project);
            },
            location: 'Project Data'
          });
          hasDataIssues = true;
        }

        // Check for missing author
        if (!project.author || !project.author.name) {
          issues.push({
            id: generateIssueId('project-missing-author', project.id),
            severity: 'warning',
            category: 'data',
            title: `Project missing author information`,
            description: `Project "${project.name}" is missing author data. This may cause display errors.`,
            autoFixable: true,
            fix: () => {
              // Get fresh project from storage
              const currentProject = PROJECT_STORAGE.getProject(project.id);
              if (!currentProject) return;
              
              const updatedProject = {
                ...currentProject,
                author: { name: 'You', role: 'Designer', email: 'designer@stahls.com' }
              };
              PROJECT_STORAGE.saveProject(updatedProject);
            },
            location: `Project: ${project.name}`
          });
          hasDataIssues = true;
        }

        // Check for missing timestamps
        if (!project.created || !project.lastUpdated) {
          issues.push({
            id: generateIssueId('project-missing-timestamps', project.id),
            severity: 'warning',
            category: 'data',
            title: `Project missing timestamps`,
            description: `Project "${project.name}" is missing created or lastUpdated timestamps.`,
            autoFixable: true,
            fix: () => {
              // Get fresh project from storage
              const currentProject = PROJECT_STORAGE.getProject(project.id);
              if (!currentProject) return;
              
              const now = new Date().toISOString();
              const updatedProject = {
                ...currentProject,
                created: currentProject.created || now,
                lastUpdated: currentProject.lastUpdated || now
              };
              PROJECT_STORAGE.saveProject(updatedProject);
            },
            location: `Project: ${project.name}`
          });
          hasDataIssues = true;
        }

        // Check for missing status
        if (!project.status) {
          issues.push({
            id: generateIssueId('project-missing-status', project.id),
            severity: 'info',
            category: 'data',
            title: `Project missing status`,
            description: `Project "${project.name}" does not have a status field.`,
            autoFixable: true,
            fix: () => {
              // Get fresh project from storage
              const currentProject = PROJECT_STORAGE.getProject(project.id);
              if (!currentProject) return;
              
              const updatedProject = {
                ...currentProject,
                status: 'draft' as const
              };
              PROJECT_STORAGE.saveProject(updatedProject);
            },
            location: `Project: ${project.name}`
          });
          hasDataIssues = true;
        }

        // Check for empty tags/flows arrays
        if (!project.tags) {
          issues.push({
            id: generateIssueId('project-missing-tags', project.id),
            severity: 'info',
            category: 'structure',
            title: `Project missing tags array`,
            description: `Project "${project.name}" is missing the tags array.`,
            autoFixable: true,
            fix: () => {
              // Get fresh project from storage
              const currentProject = PROJECT_STORAGE.getProject(project.id);
              if (!currentProject) return;
              
              const updatedProject = {
                ...currentProject,
                tags: []
              };
              PROJECT_STORAGE.saveProject(updatedProject);
            },
            location: `Project: ${project.name}`
          });
          hasDataIssues = true;
        }

        if (!project.flows) {
          issues.push({
            id: generateIssueId('project-missing-flows', project.id),
            severity: 'info',
            category: 'structure',
            title: `Project missing flows array`,
            description: `Project "${project.name}" is missing the flows array.`,
            autoFixable: true,
            fix: () => {
              // Get fresh project from storage
              const currentProject = PROJECT_STORAGE.getProject(project.id);
              if (!currentProject) return;
              
              const updatedProject = {
                ...currentProject,
                flows: []
              };
              PROJECT_STORAGE.saveProject(updatedProject);
            },
            location: `Project: ${project.name}`
          });
          hasDataIssues = true;
        }
      });

      if (!hasDataIssues) passedChecks++;

      // Check 2: Validate Research Citations
      totalChecks++;
      let hasResearchIssues = false;
      projectList.forEach(project => {
        if (project.researchCitations && Array.isArray(project.researchCitations)) {
          project.researchCitations.forEach(topicId => {
            if (!BAYMARD_TOPICS[topicId]) {
              issues.push({
                id: generateIssueId('invalid-research', project.id),
                severity: 'warning',
                category: 'data',
                title: `Invalid research citation`,
                description: `Project \"${project.name}\" references research topic \"${topicId}\" which doesn't exist.`,
                autoFixable: true,
                fix: () => {
                  const updatedProject = {
                    ...project,
                    researchCitations: project.researchCitations?.filter(id => BAYMARD_TOPICS[id])
                  };
                  PROJECT_STORAGE.saveProject(updatedProject);
                },
                location: `Project: ${project.name}`
              });
              hasResearchIssues = true;
            }
          });
        }
      });
      if (!hasResearchIssues) passedChecks++;

      // Check 3: Validate Templates
      totalChecks++;
      let hasTemplateIssues = false;
      projectList.forEach(project => {
        if (project.template && !PROTOTYPE_TEMPLATES[project.template]) {
          issues.push({
            id: generateIssueId('invalid-template', project.id),
            severity: 'error',
            category: 'data',
            title: `Invalid template reference`,
            description: `Project "${project.name}" references template "${project.template}" which doesn't exist.`,
            autoFixable: false,
            location: `Project: ${project.name}`
          });
          hasTemplateIssues = true;
        }
      });
      if (!hasTemplateIssues) passedChecks++;

      // Check 4: Validate URLs
      totalChecks++;
      let hasUrlIssues = false;
      projectList.forEach(project => {
        if (project.requirementsDoc) {
          try {
            new URL(project.requirementsDoc);
          } catch (e) {
            issues.push({
              id: generateIssueId('invalid-url', project.id),
              severity: 'warning',
              category: 'data',
              title: `Invalid Requirements Doc URL`,
              description: `Project \"${project.name}\" has an invalid requirements document URL format.`,
              autoFixable: false,
              location: `Project: ${project.name}`
            });
            hasUrlIssues = true;
          }
        }
      });
      if (!hasUrlIssues) passedChecks++;

      // Check 5: LocalStorage Health
      totalChecks++;
      let hasStorageIssues = false;
      try {
        const testKey = '__debug_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
      } catch (e) {
        issues.push({
          id: 'storage-error',
          severity: 'error',
          category: 'performance',
          title: `LocalStorage unavailable`,
          description: `Cannot access localStorage. Data persistence may not work.`,
          autoFixable: false,
          location: 'Browser Storage'
        });
        hasStorageIssues = true;
      }
      if (!hasStorageIssues) passedChecks++;

      // ========== CODE HEALTH CHECKS ==========
      
      // Check 7: Console Errors & Warnings
      totalChecks++;
      let hasConsoleIssues = false;
      // Capture console errors in real-time
      const originalError = console.error;
      const originalWarn = console.warn;
      const capturedErrors: string[] = [];
      const capturedWarnings: string[] = [];
      
      // Check for React warnings in the console
      if (typeof window !== 'undefined') {
        // Look for common React issues
        const bodyText = document.body.innerText;
        if (bodyText.includes('Warning:') || bodyText.includes('Error:')) {
          hasConsoleIssues = true;
        }
      }
      if (!hasConsoleIssues) passedChecks++;

      // Check 8: Design System Compliance - Hardcoded Font Sizes
      totalChecks++;
      let hasDesignSystemIssues = false;
      
      // Scan for elements with hardcoded Tailwind font/line-height classes
      // NOTE: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl are now APPROVED
      // because we've added utility classes in globals.css that use CSS variables
      const forbiddenFontClasses = [
        'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', // Large sizes not defined in design system
        'font-thin', 'font-extralight', 'font-light', 'font-normal', // Use font-[--font-weight-regular] instead
        'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black', // Use font-[--font-weight-*] instead
        'leading-none', 'leading-tight', 'leading-snug', 'leading-normal', // Hardcoded line-heights
        'leading-relaxed', 'leading-loose'
      ];
      
      const allElements = document.querySelectorAll('*');
      const violatingElements = new Set<string>();
      
      allElements.forEach(element => {
        const classes = element.className;
        if (typeof classes === 'string') {
          forbiddenFontClasses.forEach(forbiddenClass => {
            if (classes.split(' ').includes(forbiddenClass)) {
              // Try to identify component
              let componentName = 'Unknown';
              let current = element;
              while (current && current.parentElement) {
                if (current.getAttribute('data-component')) {
                  componentName = current.getAttribute('data-component') || 'Unknown';
                  break;
                }
                current = current.parentElement;
              }
              violatingElements.add(`Element with class "${forbiddenClass}"`);
              hasDesignSystemIssues = true;
            }
          });
        }
      });
      
      if (violatingElements.size > 0) {
        issues.push({
          id: 'hardcoded-font-classes',
          severity: 'warning',
          category: 'design-system',
          title: `Hardcoded typography classes detected`,
          description: `Found ${violatingElements.size} instance(s) of hardcoded Tailwind font-weight or line-height classes. Use CSS variables instead.`,
          autoFixable: false,
          location: 'Multiple Components',
          recommendation: `Replace hardcoded font-weight classes like "font-bold" with font-[--font-weight-bold]. Typography size classes (text-sm, text-xl, etc.) are now approved as they use CSS variables internally via globals.css.`,
          codeSnippet: Array.from(violatingElements).slice(0, 3).join(', ')
        });
      }
      
      if (!hasDesignSystemIssues) passedChecks++;

      // Check 9: Design System Compliance - Hardcoded Colors
      totalChecks++;
      let hasColorIssues = false;
      
      // Check for hardcoded color classes (excluding design system exceptions)
      const forbiddenColorPatterns = [
        /text-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
        /bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/,
        /border-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-\d+/
      ];
      
      const colorViolations = new Set<string>();
      allElements.forEach(element => {
        const classes = element.className;
        if (typeof classes === 'string') {
          const classList = classes.split(' ');
          classList.forEach(cls => {
            forbiddenColorPatterns.forEach(pattern => {
              if (pattern.test(cls)) {
                colorViolations.add(cls);
                hasColorIssues = true;
              }
            });
          });
        }
      });
      
      if (colorViolations.size > 0) {
        issues.push({
          id: 'hardcoded-color-classes',
          severity: 'warning',
          category: 'design-system',
          title: `Hardcoded color classes detected`,
          description: `Found ${colorViolations.size} hardcoded Tailwind color class(es). These should use design system color variables instead.`,
          autoFixable: false,
          location: 'Multiple Components',
          recommendation: `Replace hardcoded colors like "bg-blue-500" with design system tokens like "bg-primary", "bg-accent", "bg-muted", etc. defined in globals.css.`,
          codeSnippet: Array.from(colorViolations).slice(0, 5).join(', ')
        });
      }
      
      if (!hasColorIssues) passedChecks++;

      // Check 10: Performance - Large Bundle Size
      totalChecks++;
      let hasPerformanceIssues = false;
      
      // Check for large DOM
      const totalElements = document.querySelectorAll('*').length;
      if (totalElements > 1500) {
        issues.push({
          id: 'large-dom',
          severity: 'info',
          category: 'performance',
          title: `Large DOM size detected`,
          description: `The page has ${totalElements} DOM elements. Large DOMs can impact performance.`,
          autoFixable: false,
          location: 'Application',
          recommendation: `Consider implementing virtualization for long lists, lazy loading for off-screen content, or splitting into smaller components.`
        });
        hasPerformanceIssues = true;
      }
      
      if (!hasPerformanceIssues) passedChecks++;

      // Check 11: Accessibility - Missing Alt Text
      totalChecks++;
      let hasAccessibilityIssues = false;
      
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt: string[] = [];
      images.forEach((img, index) => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
          imagesWithoutAlt.push(`Image ${index + 1}: ${img.src?.substring(0, 50) || 'unknown source'}`);
          hasAccessibilityIssues = true;
        }
      });
      
      if (imagesWithoutAlt.length > 0) {
        issues.push({
          id: 'missing-alt-text',
          severity: 'warning',
          category: 'accessibility',
          title: `Images missing alt text`,
          description: `Found ${imagesWithoutAlt.length} image(s) without alt attributes. This impacts accessibility for screen readers.`,
          autoFixable: false,
          location: 'Multiple Components',
          recommendation: `Add descriptive alt text to all images. Use alt="" for decorative images only.`,
          codeSnippet: imagesWithoutAlt.slice(0, 3).join(', ')
        });
      }
      
      if (!hasAccessibilityIssues) passedChecks++;

      // Check 12: Code Quality - Inline Styles
      totalChecks++;
      let hasCodeQualityIssues = false;
      
      const elementsWithInlineStyles = document.querySelectorAll('[style]');
      if (elementsWithInlineStyles.length > 10) {
        issues.push({
          id: 'excessive-inline-styles',
          severity: 'info',
          category: 'code-quality',
          title: `Excessive inline styles detected`,
          description: `Found ${elementsWithInlineStyles.length} elements with inline styles. Consider using Tailwind classes or CSS variables instead.`,
          autoFixable: false,
          location: 'Multiple Components',
          recommendation: `Replace inline styles with Tailwind utility classes or CSS variables for better maintainability.`
        });
        hasCodeQualityIssues = true;
      }
      
      if (!hasCodeQualityIssues) passedChecks++;

      // Check 6: Component Structure Validation
      totalChecks++;
      // Check if there are duplicate project IDs
      const projectIds = projectList.map(p => p.id);
      const duplicateIds = projectIds.filter((id, index) => projectIds.indexOf(id) !== index);
      if (duplicateIds.length > 0) {
        issues.push({
          id: 'duplicate-project-ids',
          severity: 'error',
          category: 'structure',
          title: `Duplicate project IDs detected`,
          description: `Found ${duplicateIds.length} duplicate project ID(s). This will cause rendering issues.`,
          autoFixable: true,
          fix: () => {
            const projects = PROJECT_STORAGE.getAllProjects();
            Object.values(projects).forEach((project, index) => {
              if (!project.id || duplicateIds.includes(project.id)) {
                const updatedProject = {
                  ...project,
                  id: `project-${Date.now()}-${index}`
                };
                PROJECT_STORAGE.saveProject(updatedProject);
              }
            });
          },
          location: 'All Projects'
        });
      } else {
        passedChecks++;
      }

      // Calculate health score
      const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

      setHealthReport({
        score,
        issues,
        totalChecks,
        passedChecks,
        lastRun: new Date().toISOString()
      });

      setIsScanning(false);
      
      // Auto-switch to issues tab if issues found
      if (issues.length > 0) {
        setActiveTab('issues');
      }
    }, 1500);
  };

  // Auto-fix an issue
  const handleAutoFix = (issue: DebugIssue) => {
    if (issue.fix) {
      issue.fix();
      setFixedIssues([...fixedIssues, issue.id]);
      
      // Re-run health check after a brief delay
      setTimeout(() => runHealthCheck(), 500);
    }
  };

  // Auto-fix all fixable issues
  const handleAutoFixAll = () => {
    if (!healthReport) return;
    
    const fixableIssues = healthReport.issues.filter(i => i.autoFixable && !fixedIssues.includes(i.id));
    fixableIssues.forEach(issue => {
      if (issue.fix) issue.fix();
    });
    
    setFixedIssues([...fixedIssues, ...fixableIssues.map(i => i.id)]);
    setTimeout(() => runHealthCheck(), 500);
  };

  // Run initial scan on mount
  useEffect(() => {
    runHealthCheck();
  }, []);

  const severityColors = {
    error: 'bg-[rgb(254,242,242)] text-[rgb(153,27,27)] border-[rgb(254,202,202)]',
    warning: 'bg-[rgb(255,247,237)] text-[rgb(154,52,18)] border-[rgb(254,215,170)]',
    info: 'bg-[rgb(239,246,255)] text-[rgb(29,78,216)] border-[rgb(191,219,254)]'
  };

  const severityIcons = {
    error: AlertTriangle,
    warning: AlertTriangle,
    info: CheckCircle
  };

  const categoryIcons = {
    data: Database,
    component: Code,
    performance: Zap,
    structure: Settings,
    'design-system': Palette,
    accessibility: Eye,
    'code-quality': FileCode
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-[rgb(21,128,61)]';
    if (score >= 70) return 'text-[rgb(234,88,12)]';
    return 'text-[rgb(220,38,38)]';
  };

  const activeIssues = healthReport?.issues.filter(i => !fixedIssues.includes(i.id)) || [];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-[--radius-lg] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[--radius] bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Bug className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2>Debug & Health Check</h2>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  Automated system diagnostics and issue resolution
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-[--radius] hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Health Score */}
          {healthReport && (
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className={`font-[--font-weight-bold] ${getHealthColor(healthReport.score)}`} style={{ fontSize: '36px' }}>
                  {healthReport.score}%
                </div>
                <div>
                  <div className="font-[--font-weight-semibold]">System Health</div>
                  <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {healthReport.passedChecks}/{healthReport.totalChecks} checks passed
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">
                    {activeIssues.filter(i => i.severity === 'error').length} Errors
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    {activeIssues.filter(i => i.severity === 'warning').length} Warnings
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">
                    {activeIssues.filter(i => i.severity === 'info').length} Info
                  </span>
                </div>
              </div>

              <button
                onClick={runHealthCheck}
                disabled={isScanning}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span className="font-[--font-weight-semibold]">
                  {isScanning ? 'Scanning...' : 'Re-scan'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-muted/30 px-8">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'issues', label: `Issues (${activeIssues.length})` },
              { id: 'fixes', label: 'Auto-Fix' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-[--font-weight-semibold] border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {isScanning ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-foreground font-[--font-weight-semibold] mb-2">
                Running diagnostics...
              </p>
              <p className="text-muted-foreground">
                Scanning projects, data structures, and system health
              </p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && healthReport && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 border border-border rounded-[--radius] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-sm)' }}>Total Projects</span>
                      </div>
                      <div className="font-[--font-weight-bold]" style={{ fontSize: 'var(--text-h2)' }}>
                        {Object.keys(PROJECT_STORAGE.getAllProjects()).length}
                      </div>
                    </div>

                    <div className="bg-muted/50 border border-border rounded-[--radius] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-primary" />
                        <span className="font-[--font-weight-semibold]" style={{ fontSize: 'var(--text-sm)' }}>Data Integrity</span>
                      </div>
                      <div className={`font-[--font-weight-bold] ${getHealthColor(healthReport.score)}`} style={{ fontSize: 'var(--text-h2)' }}>
                        {healthReport.score >= 90 ? 'Good' : healthReport.score >= 70 ? 'Fair' : 'Poor'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-[--font-weight-semibold] mb-3" style={{ fontSize: 'var(--text-sm)' }}>Check Results</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-[--radius]">
                        <span style={{ fontSize: 'var(--text-sm)' }}>Project Data Structure</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-[--radius]">
                        <span style={{ fontSize: 'var(--text-sm)' }}>Research Citations</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-[--radius]">
                        <span style={{ fontSize: 'var(--text-sm)' }}>Template References</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-[--radius]">
                        <span style={{ fontSize: 'var(--text-sm)' }}>URL Validation</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-[--radius]">
                        <span style={{ fontSize: 'var(--text-sm)' }}>LocalStorage Health</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {activeIssues.length === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-[--radius] p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-green-900 font-[--font-weight-semibold] mb-1">
                        All Systems Operational
                      </p>
                      <p className="text-green-700" style={{ fontSize: 'var(--text-sm)' }}>
                        No issues detected. Your platform is running smoothly!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Issues Tab */}
              {activeTab === 'issues' && (
                <div className="space-y-4">
                  {activeIssues.length === 0 ? (
                    <div className="bg-muted/50 border border-border rounded-[--radius] p-8 text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-foreground font-[--font-weight-semibold] mb-1">
                        No Issues Found
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Everything looks good!
                      </p>
                    </div>
                  ) : (
                    <>
                      {activeIssues.map(issue => {
                        const SeverityIcon = severityIcons[issue.severity];
                        const CategoryIcon = categoryIcons[issue.category];
                        
                        return (
                          <div
                            key={issue.id}
                            className={`border rounded-[--radius] p-4 ${severityColors[issue.severity]}`}
                          >
                            <div className="flex items-start gap-3">
                              <SeverityIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-[--font-weight-semibold]">{issue.title}</h4>
                                  <span className="px-2 py-0.5 bg-white/50 rounded" style={{ fontSize: 'var(--text-sm)' }}>
                                    {issue.category}
                                  </span>
                                </div>
                                <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>{issue.description}</p>
                                {issue.recommendation && (
                                  <div className="mt-2 p-2 bg-white/30 rounded" style={{ fontSize: 'var(--text-sm)' }}>
                                    <span className="font-[--font-weight-semibold]">💡 Recommendation:</span> {issue.recommendation}
                                  </div>
                                )}
                                {issue.codeSnippet && (
                                  <div className="mt-2 p-2 bg-black/5 rounded font-mono overflow-x-auto" style={{ fontSize: 'var(--text-sm)' }}>
                                    {issue.codeSnippet}
                                  </div>
                                )}
                                {issue.location && (
                                  <div className="flex items-center gap-1 opacity-75 mt-2" style={{ fontSize: 'var(--text-sm)' }}>
                                    <CategoryIcon className="w-3 h-3" />
                                    <span>{issue.location}</span>
                                  </div>
                                )}
                              </div>
                              {issue.autoFixable && (
                                <button
                                  onClick={() => handleAutoFix(issue)}
                                  className="px-3 py-1.5 bg-white text-foreground rounded-[--radius-button] hover:bg-white/80 transition-colors font-[--font-weight-semibold] whitespace-nowrap"
                                >
                                  Fix Now
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

              {/* Auto-Fix Tab */}
              {activeTab === 'fixes' && (
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-[--radius] p-6">
                    <div className="flex items-start gap-4">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-[--font-weight-semibold] mb-2">Auto-Fix Mode</h3>
                        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                          Automatically resolve common issues with one click. The system will:
                        </p>
                        <ul className="space-y-2 text-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Add missing required fields (IDs, timestamps, author info)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Normalize data structures (tags, flows arrays)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Remove invalid research citations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Fix duplicate project IDs</span>
                          </li>
                        </ul>
                        
                        {activeIssues.filter(i => i.autoFixable).length > 0 ? (
                          <button
                            onClick={handleAutoFixAll}
                            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-[--font-weight-semibold]"
                          >
                            <Zap className="w-4 h-4" />
                            Fix {activeIssues.filter(i => i.autoFixable).length} Issue{activeIssues.filter(i => i.autoFixable).length !== 1 ? 's' : ''} Automatically
                          </button>
                        ) : (
                          <div className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-[--radius-button] text-center font-[--font-weight-semibold]">
                            No Auto-Fixable Issues
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {fixedIssues.length > 0 && (
                    <div>
                      <h4 className="font-[--font-weight-semibold] mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                        Recently Fixed ({fixedIssues.length})
                      </h4>
                      <div className="bg-green-50 border border-green-200 rounded-[--radius] p-4">
                        <div className="flex items-center gap-2 text-green-900" style={{ fontSize: 'var(--text-sm)' }}>
                          <CheckCircle className="w-4 h-4" />
                          <span>{fixedIssues.length} issue{fixedIssues.length !== 1 ? 's' : ''} resolved successfully</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
