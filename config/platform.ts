// Platform Configuration
// This file manages all projects in the CUPABU Prototype Platform

import { ProjectStorage } from '../utils/project-storage';
import type { Page } from '../App';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ProjectAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface TaskLink {
  platform?: string; // e.g., "Jira", "Airtable", "Linear"
  url: string;
}

export interface RequirementsDoc {
  author: string; // PM who created the requirements
  url: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  source: 'baymard' | 'custom';
  url: string;
  summary?: string;
  tags?: string[]; // e.g., ['checkout', 'cart', 'mobile']
  usedIn: Array<{
    type: 'project' | 'deliverable' | 'flow';
    id: string;
  }>;
}

export interface ShareSettings {
  enabled: boolean;
  password?: string;
  showResearch: boolean;
  showDevNotes: boolean;
}

export interface FlowStep {
  page: Page;
  label: string;
  description: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  startPage: Page;
  startDesignId?: string;
  startJobId?: string;
  icon?: string; // Icon name from lucide-react
  color?: string; // Tailwind color classes
  estimatedMinutes?: number;
  researchKeys?: string[]; // IDs from project's researchLibrary
  shareSettings?: ShareSettings;
  devNotes?: string; // Markdown-formatted developer notes
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  actor?: string; // User persona (e.g., "Decorator", "Team Admin")
  screenshot?: string; // URL or path
  linkedScreen?: {
    deliverableId: string;
    flowId?: string;
    page?: string;
  };
  researchKeys?: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  type: 'prototype' | 'user-journey';
  fidelityLevel?: 'wireframe' | 'standard' | 'polished';
  created: string;
  lastUpdated: string;
  description?: string;
  referencedDeliverables?: string[]; // IDs of other deliverables used as reference
  
  // For prototype type
  flows?: Flow[];
  
  // For user-journey type
  journeySteps?: JourneyStep[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  taskLink?: TaskLink;
  requirementsDoc?: RequirementsDoc;
  created: string;
  lastUpdated: string;
  status: 'draft' | 'in-review' | 'approved' | 'development' | 'complete';
  tags: string[];
  
  // Research Library (master for entire project)
  researchLibrary: ResearchItem[];
  
  // Deliverables (can be multiple per project)
  deliverables: Deliverable[];
}

export interface PlatformConfig {
  name: string;
  version: string;
  description: string;
  designSystem?: string;
}

// ============================================================================
// PLATFORM CONFIGURATION
// ============================================================================

export const PLATFORM_CONFIG: PlatformConfig = {
  name: 'CUPABU Prototype Platform',
  version: '2.0.0',
  description: 'Research-backed prototype documentation system for STAHLS.com',
  designSystem: 'CUPABU Design System'
};

// ============================================================================
// DEFAULT PROJECTS
// ============================================================================

const DEFAULT_PROJECTS: Record<string, Project> = {
  'pmor-44': {
    id: 'pmor-44',
    name: 'Team Builder Dashboard & Reorder UX',
    description: 'Updated artwork management experience with job/roster grouping, enhanced detail views, and streamlined reorder flows for Team Builder designs.',
    taskLink: {
      platform: 'Jira',
      url: 'https://stahls.atlassian.net/browse/PMOR-44'
    },
    requirementsDoc: {
      author: 'Rick Smith',
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44' // UPDATE THIS
    },
    status: 'in-review',
    created: '2024-12-01',
    lastUpdated: '2024-12-04',
    tags: ['Team Builder', 'Dashboard', 'Reorder', 'SID', 'EasyView'],
    
    // Research Library for PMOR-44
    researchLibrary: [
      {
        id: 'baymard-checkout-flow',
        title: 'Checkout Flow & Cart Usability',
        source: 'baymard',
        url: 'https://baymard.com/blog/checkout-flow-average-form-fields',
        summary: 'Our checkout usability study reveals that 69% of users abandon their cart due to complex checkout flows. Key findings: reduce form fields, show clear progress indicators, and provide guest checkout options. Team Builder cart implementation should minimize steps while showing roster details clearly.',
        tags: ['checkout', 'cart', 'conversion', 'usability'],
        usedIn: [
          { type: 'flow', id: 'flow-a' },
          { type: 'flow', id: 'flow-c' }
        ]
      },
      {
        id: 'baymard-product-page',
        title: 'Product Page Design & Imagery Best Practices',
        source: 'baymard',
        url: 'https://baymard.com/blog/product-page-design',
        summary: 'Product page research shows users need high-quality imagery, clear product specifications, and contextual information. For Team Builder designs, displaying job name, roster details, and design source (EasyView LTE) helps users make confident ordering decisions. 37% of users cite insufficient product information as a reason for abandonment.',
        tags: ['product-page', 'imagery', 'details', 'information-architecture'],
        usedIn: [
          { type: 'flow', id: 'flow-a' }
        ]
      },
      {
        id: 'baymard-reorder-flow',
        title: 'Reorder & Repeat Purchase Optimization',
        source: 'baymard',
        url: 'https://baymard.com/blog/reorder-repeat-purchase',
        summary: 'Testing shows that 42% of e-commerce users make repeat purchases. Optimizing reorder flows with one-click actions, clear order history, and preserved configurations significantly improves conversion. Team Builder quick reorder from dashboard tiles should maintain all design attributes while allowing quantity adjustments.',
        tags: ['reorder', 'repeat-purchase', 'order-history', 'efficiency'],
        usedIn: [
          { type: 'flow', id: 'flow-b' },
          { type: 'flow', id: 'flow-d' }
        ]
      },
      {
        id: 'baymard-bulk-actions',
        title: 'Bulk Selection & Multi-Item Actions',
        source: 'baymard',
        url: 'https://baymard.com/blog/bulk-actions-checkboxes',
        summary: 'Bulk action patterns must provide clear feedback on selected items, easy select/deselect all options, and visible action buttons. For Team Builder job details, users need to efficiently select individual roster players or order all players with clear visual confirmation of their selections before adding to cart.',
        tags: ['bulk-actions', 'selection', 'multi-select', 'patterns'],
        usedIn: [
          { type: 'flow', id: 'flow-c' }
        ]
      },
      {
        id: 'baymard-order-history',
        title: 'Order History & Account Management UX',
        source: 'baymard',
        url: 'https://baymard.com/blog/order-history-reorder',
        summary: 'Comprehensive order history with filtering, search, and one-click reorder capabilities is critical for B2B and repeat customers. 67% of users expect to easily find and reorder from past purchases. Team Builder order history should clearly distinguish team orders with roster information and provide direct reorder paths.',
        tags: ['order-history', 'account', 'reorder', 'B2B'],
        usedIn: [
          { type: 'flow', id: 'flow-d' }
        ]
      },
      {
        id: 'baymard-cross-system-navigation',
        title: 'Cross-System Navigation & Wayfinding',
        source: 'baymard',
        url: 'https://baymard.com/blog/cross-system-navigation',
        summary: 'When users navigate between related systems (EasyView LTE ↔ SID Dashboard), clear wayfinding, context preservation, and explicit navigation cues reduce confusion. 54% of users abandon tasks when they lose context during system transitions. Breadcrumbs, consistent headers, and "Edit in EasyView" links maintain user confidence.',
        tags: ['navigation', 'cross-system', 'wayfinding', 'context'],
        usedIn: [
          { type: 'flow', id: 'flow-a' },
          { type: 'flow', id: 'flow-c' }
        ]
      }
    ],
    
    // Deliverables for PMOR-44
    deliverables: [
      {
        id: 'deliverable-1',
        name: 'Interactive Prototype',
        type: 'prototype',
        fidelityLevel: 'standard',
        created: '2024-12-01',
        lastUpdated: '2024-12-04',
        description: 'Fully interactive prototype demonstrating all 5 user flows for the Team Builder Dashboard & Reorder experience.',
        
        flows: [
          {
            id: 'flow-a',
            name: 'New Team Builder job from Easy View → Checkout',
            description: 'Show how a new Team Builder job appears in SID, is reviewed, and becomes an order.',
            startPage: 'easyview-enhanced',
            icon: 'Package',
            color: 'bg-[#0066CC]/10 border-[#0066CC]/20 hover:border-[#0066CC]/40',
            estimatedMinutes: 5,
            researchKeys: ['baymard-checkout-flow', 'baymard-product-page'],
            shareSettings: {
              enabled: true,
              showResearch: true,
              showDevNotes: true
            },
            devNotes: `## Flow A: New Team Builder Job

**Key Requirements:**
- REQ-10: EasyView LTE is the source of truth for roster/design editing
- REQ-11: Submitting session creates individual designs in SID
- REQ-1: Group Team Builder designs by Job Name and Roster
- REQ-5: Order Now should route to Team Builder cart line item

**Technical Notes:**
- EasyView LTE submits via API to create multiple SID design records
- Each design should maintain tbParentId for job grouping
- Cart component must recognize Team Builder line items and render roster matrix`
          },
          {
            id: 'flow-b',
            name: 'Reorder from Dashboard tile',
            description: 'Show quick repeat ordering from the Team Builder Art tab.',
            startPage: 'dashboard',
            icon: 'ShoppingCart',
            color: 'bg-[#00A651]/10 border-[#00A651]/20 hover:border-[#00A651]/40',
            estimatedMinutes: 3,
            researchKeys: ['baymard-reorder-flow'],
            shareSettings: {
              enabled: true,
              showResearch: true,
              showDevNotes: true
            },
            devNotes: `## Flow B: Quick Reorder from Dashboard

**Key Requirements:**
- REQ-2: Surface Job and Roster metadata on individual tiles
- Quick reorder button on each design tile
- Preserve all design attributes (size, service type, etc.)

**Technical Notes:**
- "Quick Reorder" should duplicate design and add to cart immediately
- Maintain quantity = 1 as default for quick reorders`
          },
          {
            id: 'flow-c',
            name: 'Reorder from Job Details (All players / single row)',
            description: 'Show how grouped jobs and rosters support reordering.',
            startPage: 'dashboard',
            icon: 'Users',
            color: 'bg-[#FF6B00]/10 border-[#FF6B00]/20 hover:border-[#FF6B00]/40',
            estimatedMinutes: 4,
            researchKeys: ['baymard-bulk-actions'],
            shareSettings: {
              enabled: true,
              showResearch: true,
              showDevNotes: true
            },
            devNotes: `## Flow C: Reorder from Job Details

**Key Requirements:**
- REQ-1: Show roster table with all players for a Job
- REQ-6: Support ordering all players or individual players
- REQ-9: Expanded Details shows roster matrix with editable quantities

**Technical Notes:**
- Job Details page must display all players in roster table
- Support multi-select for batch "Order Selected" action
- "Order All Players" should add entire roster to cart as Team Builder line item`
          },
          {
            id: 'flow-d',
            name: 'Reorder from Order History',
            description: 'Show how a decorator can quickly repeat a past Team Builder order.',
            startPage: 'order-history',
            icon: 'FileCheck',
            color: 'bg-[#9333EA]/10 border-[#9333EA]/20 hover:border-[#9333EA]/40',
            estimatedMinutes: 3,
            researchKeys: ['baymard-order-history'],
            shareSettings: {
              enabled: true,
              showResearch: true,
              showDevNotes: true
            },
            devNotes: `## Flow D: Reorder from Order History

**Key Requirements:**
- REQ-12: Reorder from Order History populates Team Builder cart
- Display past orders with Team Builder line items clearly identified
- One-click reorder functionality

**Technical Notes:**
- Order History API should return isTeamBuilder flag on line items
- Reorder action should reconstruct roster matrix in cart
- Preserve all original design specifications`
          },
          {
            id: 'flow-e',
            name: 'SID ↔ Easy View LTE boundaries',
            description: 'Show how we keep editing in Easy View while SID focuses on order flows.',
            startPage: 'job-details',
            startJobId: 'TB001',
            icon: 'Presentation',
            color: 'bg-[#DC2626]/10 border-[#DC2626]/20 hover:border-[#DC2626]/40',
            estimatedMinutes: 4,
            researchKeys: ['baymard-cross-system-navigation'],
            shareSettings: {
              enabled: true,
              showResearch: true,
              showDevNotes: true
            },
            devNotes: `## Flow E: System Boundaries

**Key Requirements:**
- REQ-7: Add/Edit Player routes to EasyView LTE (not SID)
- REQ-10: EasyView LTE is the source of truth for roster/design editing
- Clear navigation between SID and EasyView LTE

**Technical Notes:**
- "Add Player" and "Edit Design" buttons should deep-link to EasyView LTE
- Pass tbParentId and rosterId in URL params to EasyView
- EasyView should have "Return to SID" navigation after edits`
          }
        ]
      }
    ]
  },
  
  // Future projects will be added here by the wizard
};

// ============================================================================
// EXPORTS
// ============================================================================

// Initialize ProjectStorage with default projects
export const PROJECT_STORAGE = new ProjectStorage(DEFAULT_PROJECTS);

// Export PROJECTS as a getter that always returns current state
export const PROJECTS = PROJECT_STORAGE.getAllProjects();
