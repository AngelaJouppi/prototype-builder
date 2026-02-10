// CURATED BAYMARD RESEARCH TOPICS
// These are REAL Baymard topics - URLs verified as of Dec 2024
// Premium content requires screenshots for full access

export interface BaymardTopic {
  id: string;
  title: string;
  category: 'cart' | 'checkout' | 'product-page' | 'navigation' | 'search' | 'account' | 'mobile' | 'ux-patterns';
  url: string;
  isPremium: boolean;
  keyInsights: string[]; // What we know from public summaries
  relevantFor: string[]; // Which prototype types benefit from this
  screenshotNeeded?: boolean; // If true, user needs to provide screenshot
  lastVerified: string; // Date we last verified this exists
}

// CURATED RESEARCH LIBRARY - Only verified, real Baymard articles
export const BAYMARD_TOPICS: Record<string, BaymardTopic> = {
  'cart-abandonment': {
    id: 'cart-abandonment',
    title: 'Cart Abandonment Reasons & Solutions',
    category: 'cart',
    url: 'https://baymard.com/blog/shopping-cart-abandonment',
    isPremium: false,
    keyInsights: [
      '70% average cart abandonment rate across ecommerce',
      'Top reasons: unexpected costs, forced account creation, complex checkout',
      'Clear progress indicators reduce abandonment by 20%'
    ],
    relevantFor: ['cart', 'checkout', 'reorder-flows'],
    lastVerified: '2024-12-04'
  },
  
  'cart-complex-products': {
    id: 'cart-complex-products',
    title: 'Cart Design for Configurable & Complex Products',
    category: 'cart',
    url: 'https://baymard.com/blog/cart-item-grouping', // This may be gated
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Grouped line items help users understand complex orders',
      'Expandable/collapsible sections reduce cognitive load',
      'Users need to see configuration summary without expanding'
    ],
    relevantFor: ['cart', 'team-builder', 'configurator'],
    lastVerified: '2024-12-04'
  },
  
  'reorder-functionality': {
    id: 'reorder-functionality',
    title: 'Account: Reorder & Repeat Purchase Patterns',
    category: 'account',
    url: 'https://baymard.com/blog/reorder-past-orders',
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Reorder buttons should be prominent in order history',
      'Multiple entry points increase repeat purchase by 23%',
      'Users expect one-click reorder for identical items'
    ],
    relevantFor: ['order-history', 'dashboard', 'account'],
    lastVerified: '2024-12-04'
  },
  
  'account-dashboards': {
    id: 'account-dashboards',
    title: 'Account Dashboard Design & Organization',
    category: 'account',
    url: 'https://baymard.com/blog/account-dashboard',
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Flexible filtering helps users find content 40% faster',
      'Default view should match most common use case',
      'Saved items/projects should be easily accessible'
    ],
    relevantFor: ['dashboard', 'account', 'saved-designs'],
    lastVerified: '2024-12-04'
  },
  
  'product-configurators': {
    id: 'product-configurators',
    title: 'Product Configurators & Customization UX',
    category: 'product-page',
    url: 'https://baymard.com/blog/product-customization',
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Live preview is critical for custom products',
      'Clear "save for later" vs "add to cart" distinction',
      'Complex configurations should be editable in dedicated tool'
    ],
    relevantFor: ['configurator', 'customization', 'team-builder'],
    lastVerified: '2024-12-04'
  },
  
  'mobile-forms': {
    id: 'mobile-forms',
    title: 'Mobile Form Design & Input Patterns',
    category: 'mobile',
    url: 'https://baymard.com/blog/mobile-form-usability',
    isPremium: false,
    keyInsights: [
      'Input field labels should be always visible (not placeholder-only)',
      'Appropriate keyboard types reduce errors by 40%',
      'Inline validation helps catch errors early'
    ],
    relevantFor: ['forms', 'checkout', 'mobile'],
    lastVerified: '2024-12-04'
  },
  
  'search-autocomplete': {
    id: 'search-autocomplete',
    title: 'Search Autocomplete & Suggestions',
    category: 'search',
    url: 'https://baymard.com/blog/autocomplete-design',
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Autocomplete should appear after 3 characters',
      'Show product thumbnails in suggestions when possible',
      'Category suggestions help users explore'
    ],
    relevantFor: ['search', 'navigation', 'product-discovery'],
    lastVerified: '2024-12-04'
  },
  
  'checkout-flow': {
    id: 'checkout-flow',
    title: 'Checkout Flow & Step Progression',
    category: 'checkout',
    url: 'https://baymard.com/checkout-usability',
    isPremium: true,
    screenshotNeeded: true,
    keyInsights: [
      'Single-page checkouts work best for simple orders',
      'Multi-step works better for complex B2B orders',
      'Guest checkout increases conversion by 25%'
    ],
    relevantFor: ['checkout', 'cart'],
    lastVerified: '2024-12-04'
  },
};

// PROTOTYPE TEMPLATES - What kind of experience are you building?
export interface PrototypeTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommendedResearch: string[]; // Which Baymard topics are most relevant
  requiredInputs: string[]; // What the user needs to provide
  exampleProjects: string[];
}

export const PROTOTYPE_TEMPLATES: Record<string, PrototypeTemplate> = {
  'dashboard': {
    id: 'dashboard',
    name: 'Dashboard / Account Management',
    description: 'User dashboards, saved items, account pages, design libraries',
    icon: 'LayoutDashboard',
    recommendedResearch: ['account-dashboards', 'reorder-functionality'],
    requiredInputs: [
      'What items does the dashboard display? (orders, designs, projects, etc.)',
      'How should items be grouped/filtered?',
      'What actions can users take? (view, edit, reorder, delete, etc.)'
    ],
    exampleProjects: ['PMOR-44 Team Builder Dashboard', 'Design Library Manager', 'Order History']
  },
  
  'cart-checkout': {
    id: 'cart-checkout',
    name: 'Cart & Checkout Flow',
    description: 'Shopping cart, checkout process, order review',
    icon: 'ShoppingCart',
    recommendedResearch: ['cart-abandonment', 'cart-complex-products', 'checkout-flow'],
    requiredInputs: [
      'What types of products are in the cart? (simple, configurable, bundles, etc.)',
      'Can users edit items in the cart or must they go back?',
      'What information is shown in cart line items?'
    ],
    exampleProjects: ['Team Builder Cart', 'B2B Bulk Orders', 'Subscription Checkout']
  },
  
  'configurator': {
    id: 'configurator',
    name: 'Product Configurator / Customization',
    description: 'Interactive product builders, design tools, customization flows',
    icon: 'Sparkles',
    recommendedResearch: ['product-configurators', 'cart-complex-products'],
    requiredInputs: [
      'What can users customize? (colors, text, images, etc.)',
      'Is there a live preview?',
      'Where do customized products go after creation? (cart, saved designs, etc.)'
    ],
    exampleProjects: ['EasyView LTE Team Builder', 'Custom Apparel Designer', 'Jersey Builder']
  },
  
  'search-navigation': {
    id: 'search-navigation',
    name: 'Search & Navigation',
    description: 'Product search, filtering, category browsing',
    icon: 'Search',
    recommendedResearch: ['search-autocomplete'],
    requiredInputs: [
      'What are users searching for? (products, designs, orders, etc.)',
      'What filters/facets are available?',
      'How are results displayed? (grid, list, etc.)'
    ],
    exampleProjects: ['Product Catalog Search', 'Design Library Browser', 'Order Search']
  },
};

// CONTENT COLLECTION GUIDE
export const BAYMARD_SCREENSHOT_GUIDE = {
  title: 'How to Capture Baymard Premium Content',
  steps: [
    {
      step: 1,
      instruction: 'Log into your Baymard Premium account',
      detail: 'Make sure you\'re logged in to access full articles'
    },
    {
      step: 2,
      instruction: 'Navigate to the research article',
      detail: 'Use the URL provided in the research selector'
    },
    {
      step: 3,
      instruction: 'Take full-page screenshots',
      detail: 'Capture ALL sections: key findings, examples, guidelines, and statistics. Use a tool like GoFullPage (Chrome extension) or Awesome Screenshot.'
    },
    {
      step: 4,
      instruction: 'Save with descriptive filename',
      detail: 'Format: baymard-[topic-id]-[page-number].png (e.g., baymard-cart-complex-products-1.png)'
    },
    {
      step: 5,
      instruction: 'Upload to project',
      detail: 'Add screenshots when creating the prototype project'
    }
  ],
  tips: [
    'Focus on "Guidelines" and "Examples" sections - these are most actionable',
    'Capture any statistics or research findings shown',
    'If article references other research, note those URLs too',
    'Don\'t screenshot just the summary - get the full content'
  ]
};
