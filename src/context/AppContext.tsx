// App Context Provider
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { subscribeToAuthChanges, getCurrentUser } from '../services/authService';
import { 
  Brand, 
  Influencer, 
  Campaign, 
  getBrands, 
  getInfluencers, 
  getCampaigns 
} from '../services/database';
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
  
  // User
  user: any;
  setUser: (user: any) => void;
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
  
  // User
  user: null,
  setUser: () => {},
});

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data state
  const [brands, setBrands] = useState<Brand[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  // AI Settings
  const [aiProvider, setAiProvider] = useState<AIProvider>('openai');
  
  // UI Settings
  const [darkMode, setDarkMode] = useState<boolean>(APP_SETTINGS.ui.theme.darkMode);
  
  // User state
  const [user, setUser] = useState(null);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Refresh data function
  const refreshData = async () => {
    try {
      console.log("Chargement des données...");
      const [brandsData, influencersData, campaignsData] = await Promise.all([
        getBrands(),
        getInfluencers(),
        getCampaigns()
      ]);
      
      console.log("Données chargées:", {
        brands: brandsData.length,
        influencers: influencersData.length,
        campaigns: campaignsData.length
      });
      
      setBrands(brandsData);
      setInfluencers(influencersData);
      setCampaigns(campaignsData);
      
      return {
        brands: brandsData,
        influencers: influencersData,
        campaigns: campaignsData
      };
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données:", error);
      throw error;
    }
  };
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setCurrentUser(authUser);
      setIsLoading(false);
      setUser(authUser);
    });
    
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    // Charger les données initiales
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        await refreshData();
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
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
    user,
    setUser,
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

export const AppContextProvider = AppProvider;