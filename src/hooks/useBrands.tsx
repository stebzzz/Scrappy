// Custom hook for brand management
import { useState, useEffect } from 'react';
import { 
  Brand, 
  getBrands, 
  getBrand, 
  addBrand, 
  updateBrand, 
  deleteBrand 
} from '../services/database';

interface UseBrandsReturn {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
  refreshBrands: () => Promise<void>;
  getBrandById: (id: string) => Promise<Brand | null>;
  createBrand: (brand: Omit<Brand, 'id'>) => Promise<string>;
  updateBrandById: (id: string, brand: Partial<Brand>) => Promise<void>;
  deleteBrandById: (id: string) => Promise<void>;
}

export const useBrands = (): UseBrandsReturn => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les marques au montage du composant
  useEffect(() => {
    refreshBrands();
  }, []);

  // Fonction pour rafraîchir la liste des marques
  const refreshBrands = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const brandsData = await getBrands();
      setBrands(brandsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors du chargement des marques:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer une marque par son ID
  const getBrandById = async (id: string): Promise<Brand | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const brand = await getBrand(id);
      return brand;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la récupération de la marque ${id}:`, err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer une nouvelle marque
  const createBrand = async (brand: Omit<Brand, 'id'>): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const brandId = await addBrand(brand as Brand);
      await refreshBrands(); // Rafraîchir la liste après l'ajout
      return brandId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur lors de la création de la marque:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour une marque
  const updateBrandById = async (id: string, brandData: Partial<Brand>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await updateBrand(id, brandData);
      await refreshBrands(); // Rafraîchir la liste après la mise à jour
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la mise à jour de la marque ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer une marque
  const deleteBrandById = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteBrand(id);
      await refreshBrands(); // Rafraîchir la liste après la suppression
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error(`Erreur lors de la suppression de la marque ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    brands,
    isLoading,
    error,
    refreshBrands,
    getBrandById,
    createBrand,
    updateBrandById,
    deleteBrandById
  };
};