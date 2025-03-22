// Custom hook for campaign management
import { useState, useEffect } from 'react';
import { 
  Campaign, 
  getCampaigns, 
  getCampaign, 
  addCampaign, 
  updateCampaign, 
  deleteCampaign 
} from '../services/database';

interface UseCampaignsReturn {
  campaigns: Campaign[];
  isLoading: boolean;
  error: string | null;
  refreshCampaigns: () => Promise<void>;
  getCampaignById: (id: string) => Promise<Campaign | null>;
  createCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<string>;
  updateCampaignById: (id: string, campaign: Partial<Campaign>) => Promise<void>;
  deleteCampaignById: (id: string) => Promise<void>;
}

export const useCampaigns = (): UseCampaignsReturn => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les campagnes au montage du composant
  useEffect(() => {
    refreshCampaigns();
  }, []);

  // Fonction pour rafraîchir la liste des campagnes
  const refreshCampaigns = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des campagnes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer une campagne par son ID
  const getCampaignById = async (id: string): Promise<Campaign | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const campaign = await getCampaign(id);
      return campaign;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la récupération de la campagne ${id}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer une nouvelle campagne
  const createCampaign = async (campaign: Omit<Campaign, 'id'>): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const campaignId = await addCampaign(campaign);
      await refreshCampaigns(); // Rafraîchir la liste après l'ajout
      return campaignId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors de la création de la campagne:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour une campagne
  const updateCampaignById = async (id: string, campaignData: Partial<Campaign>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await updateCampaign(id, campaignData);
      await refreshCampaigns(); // Rafraîchir la liste après la mise à jour
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la mise à jour de la campagne ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer une campagne
  const deleteCampaignById = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteCampaign(id);
      await refreshCampaigns(); // Rafraîchir la liste après la suppression
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la suppression de la campagne ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    campaigns,
    isLoading,
    error,
    refreshCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaignById,
    deleteCampaignById
  };
};