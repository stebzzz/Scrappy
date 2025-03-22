// Unified AI Service
import { generateContent as generateOpenAIContent } from './openai';
import { generateClaudeContent } from './claude';
import { generateGeminiContent } from './gemini';
import { generateMistralContent } from './mistral';

// AI Provider types
export type AIProvider = 'openai' | 'claude' | 'gemini' | 'mistral';

/**
 * Generate content using the specified AI provider
 * @param prompt The prompt to send to the AI
 * @param provider The AI provider to use
 * @param options Additional options for the AI provider
 * @returns The generated content
 */
export const generateContent = async (
  prompt: string,
  provider: AIProvider = 'openai',
  options: {
    model?: string;
    temperature?: number;
  } = {}
): Promise<string> => {
  try {
    switch (provider) {
      case 'openai':
        return await generateOpenAIContent(
          prompt,
          options.model || 'gpt-4',
          options.temperature || 0.7
        );
      case 'claude':
        return await generateClaudeContent(
          prompt,
          options.model || 'claude-3-opus-20240229',
          options.temperature || 0.7
        );
      case 'gemini':
        return await generateGeminiContent(
          prompt,
          options.temperature || 0.7
        );
      case 'mistral':
        return await generateMistralContent(
          prompt,
          options.model || 'mistral-large-latest',
          options.temperature || 0.7
        );
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Error generating content with ${provider}:`, error);
    throw error;
  }
};

/**
 * Generate an email for influencer outreach using the best AI provider
 * @param brandInfo Information about the brand
 * @param influencerInfo Information about the influencer
 * @param preferredProvider Preferred AI provider
 * @returns The generated email
 */
export const generateInfluencerEmail = async (
  brandInfo: {
    name: string;
    industry: string;
    news?: string;
  },
  influencerInfo: {
    name: string;
    handle: string;
    followers: string;
    niche: string;
  },
  preferredProvider: AIProvider = 'openai'
): Promise<string> => {
  const prompt = `
    Generate a professional and personalized email to contact a brand for an influencer collaboration.
    
    Brand information:
    - Name: ${brandInfo.name}
    - Industry: ${brandInfo.industry}
    ${brandInfo.news ? `- Recent news: ${brandInfo.news}` : ''}
    
    Influencer information:
    - Name: ${influencerInfo.name}
    - Social media handle: ${influencerInfo.handle}
    - Followers: ${influencerInfo.followers}
    - Niche: ${influencerInfo.niche}
    
    The email should be professional, concise, and highlight the potential value of the collaboration.
    Include a clear call to action at the end.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate a market analysis for a brand or industry
 * @param brandInfo Information about the brand or industry
 * @param preferredProvider Preferred AI provider
 * @returns The generated market analysis
 */
export const generateMarketAnalysis = async (
  brandInfo: {
    name: string;
    industry: string;
    competitors?: string[];
    targetAudience?: string;
  },
  preferredProvider: AIProvider = 'claude'
): Promise<string> => {
  const prompt = `
    Generate a detailed market analysis for the following brand or industry:
    
    Brand information:
    - Name: ${brandInfo.name}
    - Industry: ${brandInfo.industry}
    ${brandInfo.competitors ? `- Competitors: ${brandInfo.competitors.join(', ')}` : ''}
    ${brandInfo.targetAudience ? `- Target audience: ${brandInfo.targetAudience}` : ''}
    
    The analysis should include:
    1. Current market trends in the industry
    2. Potential growth opportunities
    3. Challenges and threats in the market
    4. Recommendations for marketing strategy
    5. Potential influencer marketing opportunities
    
    Make the analysis data-driven, insightful, and actionable.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate a content strategy for an influencer campaign
 * @param campaignInfo Information about the campaign
 * @param preferredProvider Preferred AI provider
 * @returns The generated content strategy
 */
export const generateContentStrategy = async (
  campaignInfo: {
    brandName: string;
    industry: string;
    influencerName: string;
    influencerNiche: string;
    campaignGoals: string[];
    targetAudience: string;
    budget?: string;
    timeline?: string;
  },
  preferredProvider: AIProvider = 'claude'
): Promise<string> => {
  const prompt = `
    Generate a comprehensive content strategy for an influencer marketing campaign with the following details:
    
    Campaign information:
    - Brand: ${campaignInfo.brandName}
    - Industry: ${campaignInfo.industry}
    - Influencer: ${campaignInfo.influencerName}
    - Influencer niche: ${campaignInfo.influencerNiche}
    - Campaign goals: ${campaignInfo.campaignGoals.join(', ')}
    - Target audience: ${campaignInfo.targetAudience}
    ${campaignInfo.budget ? `- Budget: ${campaignInfo.budget}` : ''}
    ${campaignInfo.timeline ? `- Timeline: ${campaignInfo.timeline}` : ''}
    
    The content strategy should include:
    1. Content themes and key messages
    2. Content formats (video, images, stories, etc.)
    3. Content calendar with posting frequency
    4. Performance metrics to track
    5. Ideas for engagement and audience interaction
    
    Make the strategy creative, aligned with both the brand and influencer's style, and focused on achieving the campaign goals.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate a competitive analysis for a brand
 * @param brandInfo Information about the brand
 * @param competitors Information about competitors
 * @param preferredProvider Preferred AI provider
 * @returns The generated competitive analysis
 */
export const generateCompetitiveAnalysis = async (
  brandInfo: {
    name: string;
    industry: string;
    strengths?: string[];
    weaknesses?: string[];
  },
  competitors: Array<{
    name: string;
    strengths?: string[];
    weaknesses?: string[];
  }>,
  preferredProvider: AIProvider = 'gemini'
): Promise<string> => {
  const prompt = `
    Generate a detailed competitive analysis for the following brand:
    
    Brand information:
    - Name: ${brandInfo.name}
    - Industry: ${brandInfo.industry}
    ${brandInfo.strengths ? `- Strengths: ${brandInfo.strengths.join(', ')}` : ''}
    ${brandInfo.weaknesses ? `- Weaknesses: ${brandInfo.weaknesses.join(', ')}` : ''}
    
    Competitors:
    ${competitors.map(comp => `- ${comp.name}
      ${comp.strengths ? `Strengths: ${comp.strengths.join(', ')}` : ''}
      ${comp.weaknesses ? `Weaknesses: ${comp.weaknesses.join(', ')}` : ''}`).join('\n')}
    
    The analysis should include:
    1. Market positioning comparison
    2. SWOT analysis for the brand
    3. Competitive advantages and disadvantages
    4. Opportunities for differentiation
    5. Recommendations for marketing strategy
    
    Make the analysis data-driven, insightful, and actionable.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate SEO content for a brand or influencer
 * @param info Information about the brand or influencer
 * @param preferredProvider Preferred AI provider
 * @returns The generated SEO content
 */
export const generateSEOContent = async (
  info: {
    name: string;
    type: 'brand' | 'influencer';
    industry?: string;
    niche?: string;
    keywords?: string[];
  },
  preferredProvider: AIProvider = 'gemini'
): Promise<string> => {
  const prompt = `
    Generate SEO-optimized content for ${info.type === 'brand' ? 'a brand' : 'an influencer'} with the following details:
    
    ${info.type === 'brand' ? 'Brand' : 'Influencer'} information:
    - Name: ${info.name}
    ${info.industry ? `- Industry: ${info.industry}` : ''}
    ${info.niche ? `- Niche: ${info.niche}` : ''}
    ${info.keywords ? `- Keywords: ${info.keywords.join(', ')}` : ''}
    
    The content should include:
    1. A compelling headline
    2. Meta description (under 160 characters)
    3. Three social media post ideas
    4. Five relevant hashtags
    5. Three content marketing ideas
    
    Make the content engaging, keyword-rich, and optimized for search engines.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate a personalized outreach strategy
 * @param targetInfo Information about the target (brand or influencer)
 * @param preferredProvider Preferred AI provider
 * @returns The generated outreach strategy
 */
export const generateOutreachStrategy = async (
  targetInfo: {
    name: string;
    type: 'brand' | 'influencer';
    industry?: string;
    niche?: string;
    recentActivities?: string[];
    communicationStyle?: string;
  },
  preferredProvider: AIProvider = 'mistral'
): Promise<string> => {
  const prompt = `
    Generate a personalized outreach strategy for the following ${targetInfo.type}:
    
    ${targetInfo.type === 'brand' ? 'Brand' : 'Influencer'} information:
    - Name: ${targetInfo.name}
    ${targetInfo.industry ? `- Industry: ${targetInfo.industry}` : ''}
    ${targetInfo.niche ? `- Niche: ${targetInfo.niche}` : ''}
    ${targetInfo.recentActivities ? `- Recent activities: ${targetInfo.recentActivities.join(', ')}` : ''}
    ${targetInfo.communicationStyle ? `- Communication style: ${targetInfo.communicationStyle}` : ''}
    
    The strategy should include:
    1. Best channels for initial contact
    2. Timing recommendations
    3. Messaging approach and tone
    4. Follow-up strategy
    5. Potential objections and how to address them
    
    Make the strategy personalized, actionable, and based on best practices for ${targetInfo.type} outreach.
  `;

  return generateContent(prompt, preferredProvider);
};

/**
 * Generate a social media content calendar
 * @param campaignInfo Information about the campaign
 * @param preferredProvider Preferred AI provider
 * @returns The generated content calendar
 */
export const generateContentCalendar = async (
  campaignInfo: {
    brandName: string;
    influencerName: string;
    campaignDuration: string;
    platform: string;
    goals: string[];
    contentThemes?: string[];
  },
  preferredProvider: AIProvider = 'mistral'
): Promise<string> => {
  const prompt = `
    Generate a detailed social media content calendar for a collaboration between a brand and an influencer:
    
    Campaign information:
    - Brand: ${campaignInfo.brandName}
    - Influencer: ${campaignInfo.influencerName}
    - Duration: ${campaignInfo.campaignDuration}
    - Platform: ${campaignInfo.platform}
    - Goals: ${campaignInfo.goals.join(', ')}
    ${campaignInfo.contentThemes ? `- Content themes: ${campaignInfo.contentThemes.join(', ')}` : ''}
    
    The content calendar should include:
    1. Week-by-week breakdown of content
    2. Content types for each post (photo, video, story, etc.)
    3. Key messaging for each post
    4. Hashtags and mentions
    5. Posting schedule (days and times)
    6. Call-to-actions
    
    Make the calendar strategic, aligned with the campaign goals, and optimized for the platform.
  `;

  return generateContent(prompt, preferredProvider);
};