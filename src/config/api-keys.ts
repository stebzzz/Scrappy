// API Keys Configuration
// IMPORTANT: This file should be added to .gitignore to prevent exposing API keys

// OpenAI API configuration
export const OPENAI_CONFIG = {
  apiKey: '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',
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  defaultModel: 'gpt-4',
};

// Claude API configuration
export const CLAUDE_CONFIG = {
  apiKey: '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',
  apiUrl: 'https://api.anthropic.com/v1/messages',
  defaultModel: 'claude-3-opus-20240229',
};

// Firecrawl API configuration
export const FIRECRAWL_CONFIG = {
  apiKey: 'fc-0fcf6d06ed044a72a9787cadc483d10c',
  apiUrl: 'https://api.firecrawl.dev/v1',
};

// Gemini API configuration
export const GEMINI_CONFIG = {
  apiKey: 'AIzaSyDuvz1kqwn_RX1cUtwwtgzCGsl0SZTmWYs', // Using Firebase API key as placeholder
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
};

// Mistral API configuration
export const MISTRAL_CONFIG = {
  apiKey: 'mistral_api_key_placeholder', // À remplacer par une vraie clé
  apiUrl: 'https://api.mistral.ai/v1/chat/completions',
  defaultModel: 'mistral-large-latest',
};

// Clés API pour les services externes
// ATTENTION: Ne jamais exposer ces clés dans le code client en production
// Utilisez des variables d'environnement et un backend sécurisé

export const API_KEYS = {
  anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  claude: {
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY || '',
    organizationId: import.meta.env.VITE_CLAUDE_ORG_ID || ''
  },
  openai: import.meta.env.VITE_OPENAI_API_KEY || '',
  firecrawl: FIRECRAWL_CONFIG,
  gemini: GEMINI_CONFIG,
  mistral: MISTRAL_CONFIG,
};

// Fonction pour vérifier que les clés API sont configurées
export const validateApiKeys = (): boolean => {
  const missingKeys = [];
  
  if (!API_KEYS.anthropic && !API_KEYS.claude.apiKey) {
    missingKeys.push('VITE_ANTHROPIC_API_KEY ou VITE_CLAUDE_API_KEY');
  }
  
  if (!API_KEYS.openai) {
    missingKeys.push('VITE_OPENAI_API_KEY');
  }
  
  if (missingKeys.length > 0) {
    console.warn(`⚠️ Les clés API suivantes sont manquantes : ${missingKeys.join(', ')}`);
    return false;
  }
  
  return true;
};

// Pour la production, ajoutez ces variables dans votre fichier .env:
// VITE_ANTHROPIC_API_KEY=sk-ant-...
// VITE_OPENAI_API_KEY=sk-...