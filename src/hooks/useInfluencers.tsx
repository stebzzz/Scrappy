// Custom hook for influencer management
import { useState, useEffect } from 'react';
import { 
  Influencer, 
  getInfluencers, 
  getInfluencer, 
  addInfluencer, 
  updateInfluencer, 
  deleteInfluencer 
} from '../services/database';

interface UseInfluencersReturn {
  influencers: Influencer[];
  isLoading: boolean;
  error: string | null;
  refreshInfluencers: () => Promise<void>;
  getInfluencerById: (id: string) => Promise<Influencer | null>;
  createInfluencer: (influencer: Omit<Influencer, 'id'>) => Promise<string>;
  updateInfluencerById: (id: string, influencer: Partial<Influencer>) => Promise<void>;
  deleteInfluencerById: (id: string) => Promise<void>;
}

export const useInfluencers = (): UseInfluencersReturn => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les influenceurs au montage du composant
  useEffect(() => {
    refreshInfluencers();
  }, []);

  // Fonction pour rafraîchir la liste des influenceurs
  const refreshInfluencers = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const influencersData = await getInfluencers();
      setInfluencers(influencersData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des influenceurs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer un influenceur par son ID
  const getInfluencerById = async (id: string): Promise<Influencer | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const influencer = await getInfluencer(id);
      return influencer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la récupération de l'influenceur ${id}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer un nouvel influenceur
  const createInfluencer = async (influencer: Omit<Influencer, 'id'>): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const influencerId = await addInfluencer(influencer as Influencer);
      await refreshInfluencers(); // Rafraîchir la liste après l'ajout
      return influencerId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors de la création de l\'influenceur:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour un influenceur
  const updateInfluencerById = async (id: string, influencerData: Partial<Influencer>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await updateInfluencer(id, influencerData);
      await refreshInfluencers(); // Rafraîchir la liste après la mise à jour
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la mise à jour de l'influenceur ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer un influenceur
  const deleteInfluencerById = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteInfluencer(id);
      await refreshInfluencers(); // Rafraîchir la liste après la suppression
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la suppression de l'influenceur ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    influencers,
    isLoading,
    error,
    refreshInfluencers,
    getInfluencerById,
    createInfluencer,
    updateInfluencerById,
    deleteInfluencerById
  };
};