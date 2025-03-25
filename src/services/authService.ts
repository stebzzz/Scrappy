// Simuler les appels d'API pour l'authentification

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
  message?: string;
}

// Simuler l'objet auth unique
const authState = {
  currentUser: null
};

// Fonction synchrone pour obtenir l'utilisateur actuel
export const getCurrentUserSync = () => {
  return authState.currentUser;
};

export const login = async (
  email: string, 
  password: string, 
  userType: string
): Promise<AuthResponse> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Validation basique
  if (!email || !password) {
    return {
      success: false,
      message: 'Email et mot de passe requis'
    };
  }
  
  // Simulation de connexion
  if (email === 'admin@scrappypro.com' && password === 'admin123' && userType === 'admin') {
    return {
      success: true,
      token: 'simulated-jwt-token-admin-12345',
      user: {
        id: 'admin1',
        email: 'admin@scrappypro.com',
        name: 'Admin Principal',
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      }
    };
  } else if (email === 'manager@agence.com' && password === 'manager123' && userType === 'manager') {
    return {
      success: true,
      token: 'simulated-jwt-token-manager-67890',
      user: {
        id: 'manager1',
        email: 'manager@agence.com',
        name: 'Thomas Martin',
        role: 'manager',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    };
  } else if (email === 'influencer@exemple.com' && password === 'influencer123' && userType === 'influencer') {
    return {
      success: true,
      token: 'simulated-jwt-token-influencer-54321',
      user: {
        id: 'influencer1',
        email: 'influencer@exemple.com',
        name: 'Sophie Durand',
        role: 'influencer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    };
  }
  
  // Échec de connexion par défaut
  return {
    success: false,
    message: 'Identifiants invalides'
  };
};

export const logout = async (): Promise<void> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Supprimer le token d'authentification
  localStorage.removeItem('authToken');
  localStorage.removeItem('userType');
  
  // Dans une vraie application, on pourrait aussi faire une requête au backend
  console.log('Utilisateur déconnecté');
};

// Version asynchrone qui vérifie le token et retourne les informations complètes
export const fetchCurrentUser = async (): Promise<AuthResponse> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const token = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');
  
  if (!token || !userType) {
    return {
      success: false,
      message: 'Non authentifié'
    };
  }
  
  // Simulation de récupération de l'utilisateur actuel basée sur le userType
  if (userType === 'admin') {
    return {
      success: true,
      user: {
        id: 'admin1',
        email: 'admin@scrappypro.com',
        name: 'Admin Principal',
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      token
    };
  } else if (userType === 'manager') {
    return {
      success: true,
      user: {
        id: 'manager1',
        email: 'manager@agence.com',
        name: 'Thomas Martin',
        role: 'manager',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      token
    };
  } else if (userType === 'influencer') {
    return {
      success: true,
      user: {
        id: 'influencer1',
        email: 'influencer@exemple.com',
        name: 'Sophie Durand',
        role: 'influencer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      token
    };
  }
  
  return {
    success: false,
    message: 'Type d\'utilisateur invalide'
  };
}; 