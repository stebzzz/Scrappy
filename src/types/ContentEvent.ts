export interface ContentEvent {
  id: string;
  title: string;
  type: 'post' | 'story' | 'reel' | 'video' | 'meeting';
  platform: 'instagram' | 'tiktok' | 'youtube' | 'other';
  date: string;
  time: string;
  description?: string;
  campaign?: {
    id: string;
    name: string;
    brand: string;
  } | null;
  status: 'draft' | 'scheduled' | 'published' | 'completed';
  tags?: string[];
} 