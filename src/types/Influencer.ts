export interface Influencer {
  id: string;
  name: string;
  email: string;
  handle?: string;
  niche?: string;
  bio?: string;
  avatar?: string;
  platforms: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  stats: {
    followers: number;
    engagement: number;
    reach: number;
  };
  status: 'active' | 'pending' | 'rejected';
  tags?: string[];
  pricing?: {
    post?: number;
    story?: number;
    reel?: number;
    video?: number;
  };
} 