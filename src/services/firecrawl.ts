// Firecrawl API Service
import axios from 'axios';

const FIRECRAWL_API_KEY = 'fc-0fcf6d06ed044a72a9787cadc483d10c';
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1';

/**
 * Base Firecrawl API client
 */
const firecrawlClient = axios.create({
  baseURL: FIRECRAWL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
  },
});

/**
 * Interface for scraping job parameters
 */
interface ScrapingJobParams {
  url: string;
  selectors?: Record<string, string>;
  pagination?: {
    selector: string;
    maxPages?: number;
  };
  waitFor?: string;
  javascript?: boolean;
  proxy?: string;
}

/**
 * Interface for scraping job result
 */
interface ScrapingJobResult {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data?: any;
  error?: string;
}

/**
 * Create a new scraping job
 * @param params The scraping job parameters
 * @returns The scraping job result
 */
export const createScrapingJob = async (params: ScrapingJobParams): Promise<ScrapingJobResult> => {
  try {
    const response = await firecrawlClient.post('/scrape', params);
    return response.data;
  } catch (error) {
    console.error('Error creating scraping job:', error);
    throw new Error('Failed to create scraping job');
  }
};

/**
 * Get the status and result of a scraping job
 * @param jobId The ID of the scraping job
 * @returns The scraping job result
 */
export const getScrapingJobResult = async (jobId: string): Promise<ScrapingJobResult> => {
  try {
    const response = await firecrawlClient.get(`/scrape/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting scraping job result:', error);
    throw new Error('Failed to get scraping job result');
  }
};

/**
 * Scrape a brand's website for contact information
 * @param brandUrl The URL of the brand's website
 * @returns The scraped contact information
 */
export const scrapeBrandContactInfo = async (brandUrl: string): Promise<any> => {
  const selectors = {
    'contactEmail': 'a[href^="mailto:"]',
    'contactPhone': 'a[href^="tel:"]',
    'contactForm': 'form',
    'socialLinks': 'a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"], a[href*="linkedin.com"]',
  };

  const job = await createScrapingJob({
    url: brandUrl,
    selectors,
    javascript: true,
  });

  // Poll for results
  let result: ScrapingJobResult = { jobId: job.jobId, status: 'pending' };
  while (result.status === 'pending' || result.status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    result = await getScrapingJobResult(job.jobId);
  }

  return result.data;
};

/**
 * Scrape a brand's recent news or press releases
 * @param brandUrl The URL of the brand's website
 * @returns The scraped news information
 */
export const scrapeBrandNews = async (brandUrl: string): Promise<any> => {
  // Try common paths for news/press pages
  const possibleNewsPaths = [
    '/news',
    '/press',
    '/press-releases',
    '/blog',
    '/media',
    '/about/news',
  ];

  const baseUrl = new URL(brandUrl).origin;
  
  for (const path of possibleNewsPaths) {
    try {
      const newsUrl = `${baseUrl}${path}`;
      const selectors = {
        'newsItems': 'article, .news-item, .press-release, .blog-post',
        'newsTitle': 'h1, h2, h3, .title',
        'newsDate': 'time, .date, .published-date',
        'newsContent': 'p, .content, .description',
      };

      const job = await createScrapingJob({
        url: newsUrl,
        selectors,
        javascript: true,
      });

      // Poll for results
      let result: ScrapingJobResult = { jobId: job.jobId, status: 'pending' };
      while (result.status === 'pending' || result.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        result = await getScrapingJobResult(job.jobId);
      }

      if (result.status === 'completed' && result.data) {
        return result.data;
      }
    } catch (error) {
      console.warn(`Failed to scrape news from ${path}:`, error);
      // Continue to next path
    }
  }

  throw new Error('Could not find news content on the brand website');
};

/**
 * Scrape influencer information from social media profiles
 * @param profileUrl The URL of the influencer's social media profile
 * @returns The scraped influencer information
 */
export const scrapeInfluencerProfile = async (profileUrl: string): Promise<any> => {
  // Determine platform from URL
  const platform = profileUrl.includes('instagram.com') ? 'instagram' :
                  profileUrl.includes('tiktok.com') ? 'tiktok' :
                  profileUrl.includes('youtube.com') ? 'youtube' :
                  profileUrl.includes('twitter.com') ? 'twitter' :
                  'unknown';
  
  let selectors: Record<string, string> = {};
  
  switch (platform) {
    case 'instagram':
      selectors = {
        'username': 'header h2',
        'fullName': 'header h1',
        'bio': 'header > section > div:nth-child(3)',
        'postsCount': 'header li:nth-child(1) span',
        'followersCount': 'header li:nth-child(2) span',
        'followingCount': 'header li:nth-child(3) span',
        'recentPosts': 'article img',
      };
      break;
    case 'tiktok':
      selectors = {
        'username': 'h1[data-e2e="user-title"]',
        'bio': 'h2[data-e2e="user-bio"]',
        'followersCount': 'strong[data-e2e="followers-count"]',
        'followingCount': 'strong[data-e2e="following-count"]',
        'likesCount': 'strong[data-e2e="likes-count"]',
      };
      break;
    case 'youtube':
      selectors = {
        'channelName': '#channel-name',
        'subscriberCount': '#subscriber-count',
        'description': '#description',
      };
      break;
    case 'twitter':
      selectors = {
        'name': '[data-testid="UserName"]',
        'bio': '[data-testid="UserDescription"]',
        'followersCount': '[data-testid="UserProfileHeader_Items"] span span',
        'tweetsCount': '[data-testid="UserProfileHeader_Items"] span span',
      };
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }

  const job = await createScrapingJob({
    url: profileUrl,
    selectors,
    javascript: true,
  });

  // Poll for results
  let result: ScrapingJobResult = { jobId: job.jobId, status: 'pending' };
  while (result.status === 'pending' || result.status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    result = await getScrapingJobResult(job.jobId);
  }

  if (result.status === 'completed') {
    return {
      ...result.data,
      platform,
    };
  } else {
    throw new Error(`Failed to scrape influencer profile: ${result.error || 'Unknown error'}`);
  }
};