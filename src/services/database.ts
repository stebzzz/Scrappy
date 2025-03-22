// Firebase Database Service
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Type definitions
export interface Brand {
  id?: string;
  name: string;
  industry: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: Record<string, string>;
  news?: string;
  lastUpdated?: Timestamp | Date;
  status?: 'active' | 'inactive' | 'pending';
  notes?: string;
}

export interface Influencer {
  id?: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'other';
  followers: number | string;
  engagement?: number;
  niche: string;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  location?: string;
  lastUpdated?: Timestamp | Date;
  status?: 'active' | 'contacted' | 'negotiating' | 'collaborating' | 'completed' | 'rejected';
  notes?: string;
}

export interface Campaign {
  id?: string;
  name: string;
  brandId: string;
  influencerIds: string[];
  startDate?: Timestamp | Date;
  endDate?: Timestamp | Date;
  budget?: number;
  goals?: string[];
  description?: string;
  status?: 'draft' | 'active' | 'completed' | 'cancelled';
  metrics?: {
    impressions?: number;
    engagement?: number;
    clicks?: number;
    conversions?: number;
    roi?: number;
  };
  content?: {
    type: string;
    url: string;
    description?: string;
  }[];
  notes?: string;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

export interface Message {
  id?: string;
  campaignId?: string;
  brandId?: string;
  influencerId?: string;
  subject?: string;
  content: string;
  type: 'email' | 'direct' | 'note';
  status: 'draft' | 'sent' | 'received' | 'read';
  sentAt?: Timestamp | Date;
  createdAt: Timestamp | Date;
}

// Helper function to convert Firestore document to typed object
const convertDoc = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  return { id: doc.id, ...doc.data() } as T;
};

// Brand operations
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const brandsRef = collection(db, 'brands');
    const q = query(brandsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Brand>(doc));
  } catch (error) {
    console.error('Error getting brands:', error);
    throw error;
  }
};

export const getBrand = async (id: string): Promise<Brand | null> => {
  try {
    const docRef = doc(db, 'brands', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Brand;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting brand:', error);
    throw error;
  }
};

export const addBrand = async (brand: Brand): Promise<string> => {
  try {
    const brandsRef = collection(db, 'brands');
    const now = new Date();
    const brandWithTimestamp = {
      ...brand,
      lastUpdated: now,
      status: brand.status || 'active',
    };
    
    const docRef = await addDoc(brandsRef, brandWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error adding brand:', error);
    throw error;
  }
};

export const updateBrand = async (id: string, brand: Partial<Brand>): Promise<void> => {
  try {
    const docRef = doc(db, 'brands', id);
    const now = new Date();
    const brandWithTimestamp = {
      ...brand,
      lastUpdated: now,
    };
    
    await updateDoc(docRef, brandWithTimestamp);
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

export const deleteBrand = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'brands', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};

// Influencer operations
export const getInfluencers = async (): Promise<Influencer[]> => {
  try {
    const influencersRef = collection(db, 'influencers');
    const q = query(influencersRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Influencer>(doc));
  } catch (error) {
    console.error('Error getting influencers:', error);
    throw error;
  }
};

export const getInfluencer = async (id: string): Promise<Influencer | null> => {
  try {
    const docRef = doc(db, 'influencers', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Influencer;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting influencer:', error);
    throw error;
  }
};

export const addInfluencer = async (influencer: Influencer): Promise<string> => {
  try {
    const influencersRef = collection(db, 'influencers');
    const now = new Date();
    const influencerWithTimestamp = {
      ...influencer,
      lastUpdated: now,
      status: influencer.status || 'active',
    };
    
    const docRef = await addDoc(influencersRef, influencerWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error adding influencer:', error);
    throw error;
  }
};

export const updateInfluencer = async (id: string, influencer: Partial<Influencer>): Promise<void> => {
  try {
    const docRef = doc(db, 'influencers', id);
    const now = new Date();
    const influencerWithTimestamp = {
      ...influencer,
      lastUpdated: now,
    };
    
    await updateDoc(docRef, influencerWithTimestamp);
  } catch (error) {
    console.error('Error updating influencer:', error);
    throw error;
  }
};

export const deleteInfluencer = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'influencers', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting influencer:', error);
    throw error;
  }
};

// Campaign operations
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const q = query(campaignsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Campaign>(doc));
  } catch (error) {
    console.error('Error getting campaigns:', error);
    throw error;
  }
};

export const getCampaign = async (id: string): Promise<Campaign | null> => {
  try {
    const docRef = doc(db, 'campaigns', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Campaign;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting campaign:', error);
    throw error;
  }
};

export const addCampaign = async (campaign: Campaign): Promise<string> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const now = new Date();
    const campaignWithTimestamp = {
      ...campaign,
      createdAt: now,
      updatedAt: now,
      status: campaign.status || 'draft',
    };
    
    const docRef = await addDoc(campaignsRef, campaignWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error adding campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<void> => {
  try {
    const docRef = doc(db, 'campaigns', id);
    const now = new Date();
    const campaignWithTimestamp = {
      ...campaign,
      updatedAt: now,
    };
    
    await updateDoc(docRef, campaignWithTimestamp);
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'campaigns', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};

// Message operations
export const getMessages = async (campaignId?: string): Promise<Message[]> => {
  try {
    const messagesRef = collection(db, 'messages');
    let q;
    
    if (campaignId) {
      q = query(
        messagesRef, 
        where('campaignId', '==', campaignId),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(messagesRef, orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Message>(doc));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

export const addMessage = async (message: Message): Promise<string> => {
  try {
    const messagesRef = collection(db, 'messages');
    const now = new Date();
    const messageWithTimestamp = {
      ...message,
      createdAt: now,
      sentAt: message.status === 'sent' ? now : null,
    };
    
    const docRef = await addDoc(messagesRef, messageWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

export const updateMessageStatus = async (id: string, status: Message['status']): Promise<void> => {
  try {
    const docRef = doc(db, 'messages', id);
    const updates: Partial<Message> = { status };
    
    if (status === 'sent') {
      updates.sentAt = new Date();
    }
    
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

// Advanced queries
export const getBrandsByIndustry = async (industry: string): Promise<Brand[]> => {
  try {
    const brandsRef = collection(db, 'brands');
    const q = query(brandsRef, where('industry', '==', industry), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Brand>(doc));
  } catch (error) {
    console.error('Error getting brands by industry:', error);
    throw error;
  }
};

export const getInfluencersByNiche = async (niche: string): Promise<Influencer[]> => {
  try {
    const influencersRef = collection(db, 'influencers');
    const q = query(influencersRef, where('niche', '==', niche), orderBy('followers', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Influencer>(doc));
  } catch (error) {
    console.error('Error getting influencers by niche:', error);
    throw error;
  }
};

export const getActiveCampaigns = async (): Promise<Campaign[]> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const q = query(campaignsRef, where('status', '==', 'active'), orderBy('startDate'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Campaign>(doc));
  } catch (error) {
    console.error('Error getting active campaigns:', error);
    throw error;
  }
};

export const getCampaignsByBrand = async (brandId: string): Promise<Campaign[]> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const q = query(campaignsRef, where('brandId', '==', brandId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Campaign>(doc));
  } catch (error) {
    console.error('Error getting campaigns by brand:', error);
    throw error;
  }
};

export const getCampaignsByInfluencer = async (influencerId: string): Promise<Campaign[]> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const q = query(campaignsRef, where('influencerIds', 'array-contains', influencerId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Campaign>(doc));
  } catch (error) {
    console.error('Error getting campaigns by influencer:', error);
    throw error;
  }
};

// Settings interface and operations
export interface ScrapingSettings {
  id?: string;
  waitTime: number;
  maxRetries: number;
  javascript: boolean;
  useProxy: boolean;
  proxyUrl?: string;
  frequency: 'daily' | 'weekly' | 'manual';
  sources: {
    firecrawl: boolean;
    mediaWatch: boolean;
    apollo: boolean;
    linkedin: boolean;
  };
  airtableSync: boolean;
  lastUpdated?: Timestamp | Date;
}

// Get scraping settings
export const getScrapingSettings = async (): Promise<ScrapingSettings | null> => {
  try {
    const settingsRef = collection(db, 'settings');
    const q = query(settingsRef, where('type', '==', 'scraping'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as ScrapingSettings;
  } catch (error) {
    console.error('Error getting scraping settings:', error);
    throw error;
  }
};

// Save scraping settings
export const saveScrapingSettings = async (settings: ScrapingSettings): Promise<string> => {
  try {
    const settingsRef = collection(db, 'settings');
    const now = new Date();
    const settingsWithTimestamp = {
      ...settings,
      type: 'scraping', // Add type to identify in the settings collection
      lastUpdated: now,
    };
    
    // Check if settings already exist
    if (settings.id) {
      const docRef = doc(db, 'settings', settings.id);
      await updateDoc(docRef, settingsWithTimestamp);
      return settings.id;
    } else {
      // Create new settings
      const docRef = await addDoc(settingsRef, settingsWithTimestamp);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error saving scraping settings:', error);
    throw error;
  }
};