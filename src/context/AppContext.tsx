// App Context Provider
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { subscribeToAuthChanges, getCurrentUser } from '../services/auth';
import { Brand, Influencer, Campaign } from '../services/database';
import { AIProvider } from '../services/ai-service';
import { APP_SETTINGS } from '../config/app-settings';
import { db } from '../config/firebase';

// Context interface
interface AppContextType {
  // Authentication
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Data
  brands: Brand[];
  influencers: Influencer[];
  campaigns: Campaign[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  setInfluencers: React.Dispatch<React.SetStateAction<Influencer[]>>;
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  
  // AI Settings
  aiProvider: AIProvider;
  setAiProvider: React.Dispatch<React.SetStateAction<AIProvider>>;
  
  // UI Settings
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Refresh data
  refreshData: () => Promise<void>;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  // Authentication
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  
  // Data
  brands: [],
  influencers: [],
  campaigns: [],
  setBrands: () => {},
  setInfluencers: () => {},
  setCampaigns: () => {},
  
  // AI Settings
  aiProvider: 'openai',
  setAiProvider: () => {},
  
  // UI Settings
  darkMode: true,
  toggleDarkMode: () => {},
  
  // Refresh data
  refreshData: async () => {},
});

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Data state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  // AI Settings
  const [aiProvider, setAiProvider] = useState<AIProvider>('openai');
  
  // UI Settings
  const [darkMode, setDarkMode] = useState<boolean>(APP_SETTINGS.ui.theme.darkMode);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Refresh data function
  const refreshData = async () => {
    try {
      // Récupérer les données depuis Firebase
      const brandsRef = collection(db, 'brands');
      const brandsSnapshot = await getDocs(brandsRef);
      const brandsData = brandsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Brand[];
      setBrands(brandsData);
      
      const influencersRef = collection(db, 'influencers');
      const influencersSnapshot = await getDocs(influencersRef);
      const influencersData = influencersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Influencer[];
      setInfluencers(influencersData);
      
      const campaignsRef = collection(db, 'campaigns');
      const campaignsSnapshot = await getDocs(campaignsRef);
      const campaignsData = campaignsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Campaign[];
      setCampaigns(campaignsData);
      
      console.log('Données rafraîchies avec succès');
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des données:', error);
    }
  };
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  // The value to be provided to consumers
  const contextValue: AppContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    brands,
    influencers,
    campaigns,
    setBrands,
    setInfluencers,
    setCampaigns,
    aiProvider,
    setAiProvider,
    darkMode,
    toggleDarkMode,
    refreshData,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

export default AppContext;