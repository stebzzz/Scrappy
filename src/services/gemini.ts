// Gemini API Service
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDuvz1kqwn_RX1cUtwwtgzCGsl0SZTmWYs'; // Using Firebase API key as placeholder
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Generate content using Google's Gemini model
 * @param prompt The prompt to send to Gemini
 * @param temperature The temperature parameter (default: 0.7)
 * @returns The generated content
 */
export const generateGeminiContent = async (
  prompt: string,
  temperature: number = 0.7
): Promise<string> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature,
          maxOutputTokens: 2048,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content with Gemini');
  }
};

/**
 * Generate SEO content for a brand or influencer
 * @param info Information about the brand or influencer
 * @returns The generated SEO content
 */
export const generateSEOContent = async (
  info: {
    name: string;
    type: 'brand' | 'influencer';
    industry?: string;
    niche?: string;
    keywords?: string[];
  }
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

  return generateGeminiContent(prompt, 0.7);
};

/**
 * Generate a competitive analysis for a brand
 * @param brandInfo Information about the brand
 * @param competitors Information about competitors
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
  }>
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

  return generateGeminiContent(prompt, 0.7);
};