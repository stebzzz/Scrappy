// Mistral AI API Service
import axios from 'axios';

const MISTRAL_API_KEY = 'mistral_api_key_placeholder'; // À remplacer par une vraie clé
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

/**
 * Generate content using Mistral AI's models
 * @param prompt The prompt to send to Mistral AI
 * @param model The model to use (default: mistral-large-latest)
 * @param temperature The temperature parameter (default: 0.7)
 * @returns The generated content
 */
export const generateMistralContent = async (
  prompt: string,
  model: string = 'mistral-large-latest',
  temperature: number = 0.7
): Promise<string> => {
  try {
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with Mistral AI:', error);
    throw new Error('Failed to generate content with Mistral AI');
  }
};

/**
 * Generate a personalized outreach strategy
 * @param targetInfo Information about the target (brand or influencer)
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
  }
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

  return generateMistralContent(prompt, 'mistral-large-latest', 0.7);
};

/**
 * Generate a social media content calendar
 * @param campaignInfo Information about the campaign
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
  }
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

  return generateMistralContent(prompt, 'mistral-large-latest', 0.8);
};