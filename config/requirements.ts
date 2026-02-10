// PMOR-44 Requirements Documentation Links
// Update these URLs to point to your actual Notion documentation

export const REQUIREMENTS_DOCS = {
  // Main documentation hub
  mainDoc: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44', // UPDATE THIS URL
  
  // Specific requirement sections
  sections: {
    dataModel: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#data-model', // UPDATE THIS URL
    screensFlows: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#screens-flows', // UPDATE THIS URL
    designDetails: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#design-details', // UPDATE THIS URL
    jobDetails: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#job-details', // UPDATE THIS URL
    cartBehavior: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#cart-behavior', // UPDATE THIS URL
    reorderFlows: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#reorder-flows', // UPDATE THIS URL
    easyViewLTE: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#easyview-lte', // UPDATE THIS URL
    prototypeSpecs: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#prototype-specs', // UPDATE THIS URL
  },
  
  // Specific requirements you want to reference
  // Update these with your actual Notion block IDs or anchor links
  requirements: {
    jobGrouping: { 
      id: 'REQ-001', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-job-grouping',
      description: 'Group Team Builder designs by Job Name and Roster'
    },
    rosterMatrix: { 
      id: 'REQ-002', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-roster-matrix',
      description: 'Display roster matrix in cart with editable quantities'
    },
    dualViews: { 
      id: 'REQ-003', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-dual-views',
      description: 'Separate Design Details vs Job Details views'
    },
    cartLineItems: { 
      id: 'REQ-004', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-cart-line-items',
      description: 'Team Builder cart line items match Team Perfect pattern'
    },
    reorderEntryPoints: { 
      id: 'REQ-005', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-reorder-entry-points',
      description: 'Multiple reorder entry points across screens'
    },
    sidEasyViewBoundary: { 
      id: 'REQ-006', 
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-sid-easyview-boundary',
      description: 'Clear boundaries between SID and EasyView LTE'
    },
    viewByFilter: {
      id: 'REQ-007',
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-view-by-filter',
      description: 'View by filter (Individual designs, Job name, Roster)'
    },
    jobMetadata: {
      id: 'REQ-008',
      url: 'https://notion.so/YOUR_NOTION_WORKSPACE/PMOR-44#req-job-metadata',
      description: 'Surface Job and Roster metadata on tiles'
    },
  }
};

export const AUTHOR = {
  name: 'Rick Smith',
  role: 'Product Manager'
};
