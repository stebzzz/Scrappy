// Application Settings

// AI Service Settings
export const AI_SETTINGS = {
  // Default AI provider for different tasks
  defaultProviders: {
    emailGeneration: 'openai',
    marketAnalysis: 'claude',
    contentStrategy: 'claude',
    contentCalendar: 'mistral',
    competitiveAnalysis: 'gemini',
    seoContent: 'gemini',
    outreachStrategy: 'mistral',
  },
  
  // Model settings for each provider
  modelSettings: {
    openai: {
      defaultModel: 'gpt-4',
      alternativeModels: ['gpt-3.5-turbo'],
      defaultTemperature: 0.7,
    },
    claude: {
      defaultModel: 'claude-3-opus-20240229',
      alternativeModels: ['claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
      defaultTemperature: 0.7,
    },
    gemini: {
      defaultTemperature: 0.7,
    },
    mistral: {
      defaultModel: 'mistral-large-latest',
      alternativeModels: ['mistral-medium-latest', 'mistral-small-latest'],
      defaultTemperature: 0.7,
    },
  },
};

// Scraping Settings
export const SCRAPING_SETTINGS = {
  // Default settings for scraping jobs
  defaultSettings: {
    javascript: true,
    waitTime: 2000, // ms to wait between polling for results
    maxRetries: 3,
  },
  
  // Common selectors for different platforms
  selectors: {
    instagram: {
      username: 'header h2',
      fullName: 'header h1',
      bio: 'header > section > div:nth-child(3)',
      postsCount: 'header li:nth-child(1) span',
      followersCount: 'header li:nth-child(2) span',
      followingCount: 'header li:nth-child(3) span',
    },
    tiktok: {
      username: 'h1[data-e2e="user-title"]',
      bio: 'h2[data-e2e="user-bio"]',
      followersCount: 'strong[data-e2e="followers-count"]',
      followingCount: 'strong[data-e2e="following-count"]',
      likesCount: 'strong[data-e2e="likes-count"]',
    },
    youtube: {
      channelName: '#channel-name',
      subscriberCount: '#subscriber-count',
      description: '#description',
    },
    twitter: {
      name: '[data-testid="UserName"]',
      bio: '[data-testid="UserDescription"]',
      followersCount: '[data-testid="UserProfileHeader_Items"] span span',
      tweetsCount: '[data-testid="UserProfileHeader_Items"] span span',
    },
  },
  
  // Common paths for brand websites
  brandWebsitePaths: {
    news: ['/news', '/press', '/press-releases', '/blog', '/media', '/about/news'],
    contact: ['/contact', '/contact-us', '/about/contact', '/get-in-touch'],
    about: ['/about', '/about-us', '/company', '/who-we-are'],
  },
};

// Firebase Settings
export const FIREBASE_SETTINGS = {
  // Collection names
  collections: {
    brands: 'brands',
    influencers: 'influencers',
    campaigns: 'campaigns',
    messages: 'messages',
    scrapingJobs: 'scrapingJobs',
    aiGenerations: 'aiGenerations',
    users: 'users',
  },
  
  // Default query limits
  queryLimits: {
    brands: 50,
    influencers: 50,
    campaigns: 20,
    messages: 100,
  },
};

// Application UI Settings
export const UI_SETTINGS = {
  // Theme settings
  theme: {
    darkMode: true,
    primaryColor: 'blue',
    accentColor: 'purple',
  },
  
  // Dashboard settings
  dashboard: {
    refreshInterval: 300000, // 5 minutes in ms
    defaultTimeRange: '7d', // 7 days
  },
  
  // Table settings
  table: {
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
  },
};

// Export all settings as a single object
export const APP_SETTINGS = {
  ai: AI_SETTINGS,
  scraping: SCRAPING_SETTINGS,
  firebase: FIREBASE_SETTINGS,
  ui: UI_SETTINGS,
};