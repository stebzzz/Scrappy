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
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  niche?: string;
  niches?: string[];
  followers: number;
  profileImage?: string;
  coverImage?: string;
  socialProfiles?: Record<string, string>;
  stats?: {
    engagement: number;
    averageLikes?: number;
    averageComments?: number;
  };
  status: 'active' | 'inactive' | 'pending';
  lastActive?: Date;
  lastUpdated?: Date;
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
    // Traiter les champs qui pourraient être undefined
    const cleanBrand = { ...brand };
    
    // S'assurer que socialLinks n'est jamais undefined
    if (cleanBrand.socialLinks === undefined) {
      cleanBrand.socialLinks = {}; // Utiliser un objet vide à la place
    }
    
    // Vérifier d'autres champs potentiellement undefined
    Object.keys(cleanBrand).forEach(key => {
      if (cleanBrand[key] === undefined) {
        cleanBrand[key] = null; // Remplacer undefined par null
      }
    });
    
    const brandsRef = collection(db, 'brands');
    const docRef = await addDoc(brandsRef, cleanBrand);
    
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
    const q = query(collection(db, 'influencers'), orderBy('lastUpdated', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Influencer[];
  } catch (error) {
    console.error('Erreur lors de la récupération des influenceurs:', error);
    return [];
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
    await deleteDoc(doc(db, 'influencers', id));
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw new Error('Échec de la suppression de l\'influenceur');
  }
};

// Campaign operations
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const q = query(campaignsRef, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDoc<Campaign>(doc));
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    return [];
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
    await deleteDoc(doc(db, 'campaigns', id));
  } catch (error) {
    console.error('Erreur lors de la suppression de la campagne:', error);
    throw new Error('Échec de la suppression de la campagne');
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

// Service pour gérer les interactions avec la base de données Firebase
import { firestore } from './firebase';
import { collection, addDoc, query, getDocs, orderBy, limit, Timestamp, where } from 'firebase/firestore';

/**
 * Stocke les résultats de scraping dans Firestore
 */
export const saveScrapingResult = async (
  type: 'contact' | 'news' | 'profile',
  url: string,
  data: any
) => {
  try {
    const scrapingCollection = collection(firestore, 'scrapingResults');
    
    const docData = {
      type,
      url,
      data,
      timestamp: Timestamp.now()
    };
    
    const docRef = await addDoc(scrapingCollection, docData);
    console.log(`Résultats de scraping sauvegardés avec l'ID: ${docRef.id}`);
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des résultats de scraping:', error);
    throw error;
  }
};

/**
 * Récupère les derniers résultats de scraping par type
 */
export const getLatestScrapingResults = async (type?: 'contact' | 'news' | 'profile' | 'custom', maxResults = 20) => {
  try {
    const scrapingCollection = collection(firestore, 'scrapingResults');
    
    let queryConstraints = [];
    if (type) {
      queryConstraints.push(where('type', '==', type));
    }
    
    queryConstraints.push(orderBy('timestamp', 'desc'));
    queryConstraints.push(limit(maxResults));
    
    const q = query(scrapingCollection, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const results: Array<{
      id: string;
      type: string;
      url: string;
      timestamp: any;
      data: any;
    }> = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        type: doc.data().type,
        url: doc.data().url,
        timestamp: doc.data().timestamp.toDate(),
        data: doc.data().data
      });
    });
    
    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats de scraping:', error);
    throw error;
  }
};

/**
 * Récupère les derniers résultats de scraping par URL
 */
export const getScrapingResultsByUrl = async (url: string) => {
  try {
    const scrapingCollection = collection(firestore, 'scrapingResults');
    const q = query(
      scrapingCollection,
      where('url', '==', url),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats par URL:', error);
    throw error;
  }
};

/**
 * Récupère des statistiques sur les marques dans la base de données
 */
export const getBrandStatistics = async () => {
  try {
    const brandsCollection = collection(firestore, 'brands');
    const brandsSnapshot = await getDocs(brandsCollection);
    
    const stats = {
      totalBrands: 0,
      brandsByIndustry: {} as Record<string, number>,
      contactStats: {
        withEmail: 0,
        withPhone: 0,
        withBoth: 0,
        withNone: 0
      },
      socialMediaStats: {
        Facebook: 0,
        Twitter: 0,
        Instagram: 0,
        LinkedIn: 0,
        YouTube: 0,
        TikTok: 0,
        Pinterest: 0,
        Other: 0
      },
      updatedInLastMonth: 0
    };
    
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    brandsSnapshot.forEach((doc) => {
      const brand = { id: doc.id, ...doc.data() } as Brand;
      stats.totalBrands++;
      
      // Par industrie
      stats.brandsByIndustry[brand.industry] = (stats.brandsByIndustry[brand.industry] || 0) + 1;
      
      // Statistiques de contact
      const hasEmail = !!brand.contactEmail;
      const hasPhone = !!brand.contactPhone;
      
      if (hasEmail && hasPhone) stats.contactStats.withBoth++;
      else if (hasEmail) stats.contactStats.withEmail++;
      else if (hasPhone) stats.contactStats.withPhone++;
      else stats.contactStats.withNone++;
      
      // Statistiques de réseaux sociaux
      if (brand.socialLinks) {
        Object.keys(brand.socialLinks).forEach(platform => {
          const key = detectSocialMediaPlatform(platform);
          stats.socialMediaStats[key] = (stats.socialMediaStats[key] || 0) + 1;
        });
      }
      
      // Mises à jour récentes
      if (brand.lastUpdated) {
        const lastUpdated = brand.lastUpdated instanceof Date 
          ? brand.lastUpdated 
          : brand.lastUpdated.toDate();
          
        if (lastUpdated > oneMonthAgo) {
          stats.updatedInLastMonth++;
        }
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

/**
 * Détecte la plateforme de média social à partir d'une URL ou d'un nom
 */
const detectSocialMediaPlatform = (socialLink: string): string => {
  const link = socialLink.toLowerCase();
  
  if (link.includes('facebook') || link === 'fb') return 'Facebook';
  if (link.includes('instagram') || link === 'ig' || link === 'insta') return 'Instagram';
  if (link.includes('twitter') || link.includes('x.com') || link === 'x') return 'Twitter';
  if (link.includes('linkedin')) return 'LinkedIn';
  if (link.includes('youtube') || link === 'yt') return 'YouTube';
  if (link.includes('tiktok') || link === 'tt') return 'TikTok';
  if (link.includes('pinterest') || link === 'pin') return 'Pinterest';
  if (link.includes('snapchat') || link === 'snap') return 'Snapchat';
  
  return 'Other';
};

/**
 * Récupère les statistiques de scraping agrégées par date
 */
export const getScrapingTrends = async (days = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const scrapingCollection = collection(firestore, 'scrapingResults');
    const q = query(
      scrapingCollection,
      where('timestamp', '>=', startDate),
      orderBy('timestamp', 'asc')
    );
    
    const snapshot = await getDocs(q);
    
    // Regrouper par jour
    const trendsByDay: Record<string, number> = {};
    const trendsByType: Record<string, Record<string, number>> = {};
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.timestamp.toDate().toISOString().split('T')[0];
      const type = data.type || 'unknown';
      
      // Par jour
      trendsByDay[date] = (trendsByDay[date] || 0) + 1;
      
      // Par type
      if (!trendsByType[type]) {
        trendsByType[type] = {};
      }
      
      trendsByType[type][date] = (trendsByType[type][date] || 0) + 1;
    });
    
    // Convertir en tableaux pour les graphiques
    const dailyTrends = Object.entries(trendsByDay).map(([date, count]) => ({
      date,
      count
    }));
    
    const typesTrends: Record<string, Array<{date: string, count: number}>> = {};
    Object.entries(trendsByType).forEach(([type, dateCounts]) => {
      typesTrends[type] = Object.entries(dateCounts).map(([date, count]) => ({
        date,
        count
      }));
    });
    
    return {
      dailyTrends,
      typesTrends
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des tendances:', error);
    throw error;
  }
};

/**
 * Analyse les données scrapées pour extraire des insights
 */
export const analyzeScrapingData = async () => {
  try {
    // Récupérer les statistiques générales
    const brandStats = await getBrandStatistics();
    
    // Récupérer les tendances récentes
    const trends = await getScrapingTrends(30);
    
    // Calculer des métriques supplémentaires
    const totalScrapes = trends.dailyTrends.reduce((sum, day) => sum + day.count, 0);
    const averageScrapePerDay = totalScrapes / trends.dailyTrends.length;
    
    // Identifier les industries avec peu de données
    const underrepresentedIndustries = Object.entries(brandStats.brandsByIndustry)
      .filter(([_, count]) => count < 3)
      .map(([industry]) => industry);
    
    // Identifier les marques sans actualités
    const brandsWithoutNews = await getBrandsWithoutNews();
    
    return {
      totalBrands: brandStats.totalBrands,
      totalScrapes,
      averageScrapePerDay,
      contactCompleteness: calculateContactCompleteness(brandStats.contactStats),
      mostCommonIndustry: findMostCommon(brandStats.brandsByIndustry),
      mostCommonSocialMedia: findMostCommon(brandStats.socialMediaStats),
      underrepresentedIndustries,
      brandsWithoutNews: brandsWithoutNews.length,
      updatedInLastMonth: brandStats.updatedInLastMonth,
      recommendations: generateRecommendations(brandStats, trends, brandsWithoutNews)
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse des données:', error);
    throw error;
  }
};

/**
 * Calcule le pourcentage de complétion des données de contact
 */
const calculateContactCompleteness = (contactStats: {
  withEmail: number;
  withPhone: number;
  withBoth: number;
  withNone: number;
}) => {
  const total = contactStats.withEmail + contactStats.withPhone + contactStats.withBoth + contactStats.withNone;
  if (total === 0) return 0;
  
  // Pondération: email = 1 point, téléphone = 1 point, les deux = 2 points, aucun = 0 point
  const points = contactStats.withEmail + contactStats.withPhone + (contactStats.withBoth * 2);
  const maxPoints = total * 2; // Si toutes les marques avaient les deux infos
  
  return (points / maxPoints) * 100;
};

/**
 * Trouve la clé avec la valeur la plus élevée dans un objet
 */
const findMostCommon = (obj: Record<string, number>): { key: string; value: number } => {
  if (!obj || Object.keys(obj).length === 0) {
    return { key: '', value: 0 };
  }
  
  return Object.entries(obj).reduce(
    (max, [key, value]) => value > max.value ? { key, value } : max, 
    { key: '', value: 0 }
  );
};

/**
 * Récupère les marques sans publications d'actualité récentes
 */
export const getBrandsWithoutNews = async (): Promise<Brand[]> => {
  try {
    const brandsCollection = collection(firestore, 'brands');
    
    // Requête pour les marques sans actualités ou avec des actualités datant de plus de 30 jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const q = query(
      brandsCollection,
      where('news', '==', null),
      limit(10)
    );
    
    const snapshot = await getDocs(q);
    
    const brands: Brand[] = [];
    snapshot.forEach((doc) => {
      brands.push({ id: doc.id, ...doc.data() } as Brand);
    });
    
    return brands;
  } catch (error) {
    console.error('Erreur lors de la récupération des marques sans actualités:', error);
    return [];
  }
};

/**
 * Génère des recommandations basées sur l'analyse des données
 */
const generateRecommendations = (brandStats, trends, brandsWithoutNews) => {
  const recommendations = [];
  
  // Recommandations basées sur les données de contact
  if (brandStats.contactStats.withNone > 3) {
    recommendations.push({
      type: 'contact',
      priority: 'high',
      message: `${brandStats.contactStats.withNone} marques n'ont aucune information de contact. Concentrez vos efforts de scraping sur ces marques.`
    });
  }
  
  // Recommandations basées sur les industries
  const underrepresentedCount = Object.values(brandStats.brandsByIndustry).filter(count => count < 3).length;
  if (underrepresentedCount > 0) {
    recommendations.push({
      type: 'industry',
      priority: 'medium',
      message: `${underrepresentedCount} industries ont moins de 3 marques. Diversifiez votre base de données en ajoutant plus de marques dans ces catégories.`
    });
  }
  
  // Recommandations basées sur les actualités
  if (brandsWithoutNews.length > 5) {
    recommendations.push({
      type: 'news',
      priority: 'medium',
      message: `${brandsWithoutNews.length} marques n'ont pas d'actualités récentes. Utilisez le scraping d'actualités pour enrichir ces profils.`
    });
  }
  
  // Recommandations basées sur les tendances
  const recentDays = trends.dailyTrends.slice(-7);
  const recentActivity = recentDays.reduce((sum, day) => sum + day.count, 0);
  
  if (recentActivity < 7) { // Moins d'un scraping par jour en moyenne
    recommendations.push({
      type: 'activity',
      priority: 'low',
      message: 'L\'activité de scraping a été faible ces 7 derniers jours. Envisagez d\'augmenter la fréquence pour maintenir vos données à jour.'
    });
  }
  
  return recommendations;
};

/**
 * Récupère et analyse tous les résultats de scraping
 */
export const getScrapingInsights = async () => {
  try {
    // Récupérer tous les résultats de scraping récents
    const history = await getLatestScrapingResults(null, 500);
    
    // Analyser les données
    const insightsByType = {
      contact: [],
      news: [],
      profile: [],
      custom: []
    };
    
    // Pour chaque résultat de scraping, extraire les insights
    history.forEach(item => {
      if (item.data?.insights?.length > 0) {
        const itemType = item.type || 'custom';
        if (!insightsByType[itemType]) {
          insightsByType[itemType] = [];
        }
        
        item.data.insights.forEach(insight => {
          insightsByType[itemType].push({
            ...insight,
            url: item.url,
            timestamp: item.timestamp
          });
        });
      }
    });
    
    // Trouver les insights les plus courants
    const commonInsights = {};
    Object.values(insightsByType).flat().forEach(insight => {
      const key = `${insight.type}:${insight.message}`;
      commonInsights[key] = (commonInsights[key] || 0) + 1;
    });
    
    // Trier les insights par fréquence
    const sortedInsights = Object.entries(commonInsights)
      .map(([key, count]) => {
        const [type, ...messageParts] = key.split(':');
        return {
          type,
          message: messageParts.join(':'),
          count
        };
      })
      .sort((a, b) => b.count - a.count);
    
    return {
      insightsByType,
      commonInsights: sortedInsights.slice(0, 10),
      totalInsightsCount: Object.values(insightsByType).flat().length
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des insights:', error);
    throw error;
  }
};

/**
 * Sauvegarde les données d'une marque dans Firestore
 */
export const saveBrandData = async (brandData: {
  name: string;
  industry: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  status?: 'active' | 'pending' | 'inactive';
  notes?: string;
}): Promise<string> => {
  try {
    // Normaliser les données
    const cleanBrand = { ...brandData };
    
    // Ajouter la date de création/mise à jour
    cleanBrand.lastUpdated = Timestamp.now();
    
    // Vérifier d'autres champs potentiellement undefined
    Object.keys(cleanBrand).forEach(key => {
      if (cleanBrand[key as keyof typeof cleanBrand] === undefined) {
        (cleanBrand as any)[key] = null; // Remplacer undefined par null
      }
    });
    
    // Ajouter à la collection brands
    const brandsCollection = collection(firestore, 'brands');
    const docRef = await addDoc(brandsCollection, cleanBrand);
    
    console.log('Marque sauvegardée avec succès', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la marque:', error);
    throw error;
  }
};

export const getInfluencerById = async (id: string): Promise<Influencer> => {
  const docRef = doc(firestore, 'influencers', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Influenceur non trouvé');
  }
  
  return { id: docSnap.id, ...docSnap.data() } as Influencer;
};

export const saveInfluencer = async (influencer: Partial<Influencer>): Promise<string> => {
  try {
    if (influencer.id) {
      // Mise à jour
      const influencerRef = doc(firestore, 'influencers', influencer.id);
      await updateDoc(influencerRef, { 
        ...influencer,
        lastUpdated: new Date() 
      });
      return influencer.id;
    } else {
      // Création
      const newInfluencerRef = await addDoc(collection(firestore, 'influencers'), {
        ...influencer,
        createdAt: new Date(),
        lastUpdated: new Date()
      });
      return newInfluencerRef.id;
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    throw new Error('Échec de la sauvegarde de l\'influenceur');
  }
};

export const getInfluencersByIds = async (ids: string[]): Promise<Influencer[]> => {
  if (!ids.length) return [];
  
  try {
    const influencers: Influencer[] = [];
    
    for (const id of ids) {
      try {
        const influencer = await getInfluencerById(id);
        influencers.push(influencer);
      } catch (err) {
        console.error(`Erreur lors de la récupération de l'influenceur ${id}:`, err);
      }
    }
    
    return influencers;
  } catch (error) {
    console.error('Erreur lors de la récupération des influenceurs:', error);
    return [];
  }
};

/**
 * Récupère une campagne par son ID
 */
export const getCampaignById = async (id: string): Promise<Campaign | null> => {
  try {
    const docRef = doc(db, 'campaigns', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Campaign;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la campagne:', error);
    throw error;
  }
};

/**
 * Sauvegarde une campagne (création ou mise à jour)
 */
export const saveCampaign = async (campaign: Partial<Campaign>): Promise<string> => {
  try {
    if (campaign.id) {
      // Mise à jour
      const campaignRef = doc(db, 'campaigns', campaign.id);
      await updateDoc(campaignRef, { 
        ...campaign,
        updatedAt: Timestamp.now() 
      });
      return campaign.id;
    } else {
      // Création
      const campaignsRef = collection(db, 'campaigns');
      const newCampaign = {
        ...campaign,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      const docRef = await addDoc(campaignsRef, newCampaign);
      return docRef.id;
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la campagne:', error);
    throw new Error('Échec de la sauvegarde de la campagne');
  }
};