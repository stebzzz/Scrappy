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

// Ajouter cette fonction à authService.ts
export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  // Cette fonction devrait normalement configurer un écouteur d'événements pour les changements d'authentification
  // Par exemple, si vous utilisez Firebase, cela serait onAuthStateChanged
  
  // Pour notre implémentation simplifiée, nous allons vérifier l'utilisateur actuel et appeler le callback immédiatement
  const checkAuthState = async () => {
    try {
      const response = await fetchCurrentUser();
      callback(response.success ? response.user : null);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état d\'authentification:', error);
      callback(null);
    }
  };
  
  // Appeler immédiatement pour obtenir l'état actuel
  checkAuthState();
  
  // Dans une implémentation réelle, nous retournerions une fonction pour se désabonner
  return () => {
    // Nettoyage si nécessaire
  };
};

// Ajouter cette fonction pour compatibilité avec le code existant
export const getCurrentUser = async () => {
  const response = await fetchCurrentUser();
  return response.success ? response.user : null;
};

// Ajouter ces fonctions pour la connexion

export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Vérification simplifiée des identifiants
  if (email === 'admin@scrappypro.com' && password === 'admin123') {
    localStorage.setItem('authToken', 'fake-admin-token');
    localStorage.setItem('userType', 'admin');
    
    return {
      success: true,
      message: 'Connexion réussie',
      user: {
        id: 'admin1',
        email: 'admin@scrappypro.com',
        name: 'Admin Principal',
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      token: 'fake-admin-token'
    };
  } else if (email === 'manager@agence.com' && password === 'manager123') {
    localStorage.setItem('authToken', 'fake-manager-token');
    localStorage.setItem('userType', 'manager');
    
    return {
      success: true,
      message: 'Connexion réussie',
      user: {
        id: 'manager1',
        email: 'manager@agence.com',
        name: 'Thomas Martin',
        role: 'manager',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      token: 'fake-manager-token'
    };
  } else if (email === 'influencer@exemple.com' && password === 'influencer123') {
    localStorage.setItem('authToken', 'fake-influencer-token');
    localStorage.setItem('userType', 'influencer');
    
    return {
      success: true,
      message: 'Connexion réussie',
      user: {
        id: 'influencer1',
        email: 'influencer@exemple.com',
        name: 'Sophie Durand',
        role: 'influencer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      token: 'fake-influencer-token'
    };
  } else {
    return {
      success: false,
      message: 'Email ou mot de passe incorrect'
    };
  }
};

export const googleSignIn = async (): Promise<AuthResponse> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dans une vraie application, on utiliserait l'API Google pour l'authentification
  localStorage.setItem('authToken', 'fake-google-token');
  localStorage.setItem('userType', 'manager'); // Par défaut on met un compte manager
  
  return {
    success: true,
    message: 'Connexion Google réussie',
    user: {
      id: 'google1',
      email: 'user@gmail.com',
      name: 'Utilisateur Google',
      role: 'manager',
      avatar: 'https://randomuser.me/api/portraits/men/66.jpg'
    },
    token: 'fake-google-token'
  };
};

export const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dans une vraie application, on vérifierait si l'email existe déjà, etc.
  localStorage.setItem('authToken', 'fake-new-user-token');
  localStorage.setItem('userType', 'manager'); // Par défaut on crée un compte manager
  
  return {
    success: true,
    message: 'Inscription réussie',
    user: {
      id: 'new1',
      email,
      name,
      role: 'manager'
    },
    token: 'fake-new-user-token'
  };
};

export const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulons que l'email a été envoyé
  return {
    success: true,
    message: 'Instructions de réinitialisation envoyées à votre email'
  };
};

// Ajout d'un alias pour la fonction resetPassword
export const sendPasswordResetEmail = resetPassword;

// Ajout d'un alias pour la fonction signUp
export const signUpWithEmail = signUp; 