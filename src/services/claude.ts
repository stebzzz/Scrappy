// Claude API Service
import axios from 'axios';

const CLAUDE_API_KEY = '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';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Generate content using Anthropic's Claude model
 * @param prompt The prompt to send to Claude
 * @param model The model to use (default: claude-3-opus-20240229)
 * @param temperature The temperature parameter (default: 0.7)
 * @returns The generated content
 */
export const generateClaudeContent = async (
  prompt: string,
  model: string = 'claude-3-opus-20240229',
  temperature: number = 0.7
): Promise<string> => {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: 4000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error generating content with Claude:', error);
    throw new Error('Failed to generate content with Claude');
  }
};

/**
 * Generate a detailed market analysis for a brand or industry
 * @param brandInfo Information about the brand or industry
 * @returns The generated market analysis
 */
export const generateMarketAnalysis = async (
  brandInfo: {
    name: string;
    industry: string;
    competitors?: string[];
    targetAudience?: string;
  }
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

  return generateClaudeContent(prompt, 'claude-3-opus-20240229', 0.7);
};

/**
 * Generate a content strategy for an influencer campaign
 * @param campaignInfo Information about the campaign
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
  }
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

  return generateClaudeContent(prompt, 'claude-3-opus-20240229', 0.8);
};