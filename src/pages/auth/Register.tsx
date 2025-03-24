import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, AlertCircle, Zap, Phone, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    website: '',
    niche: '',
    bio: '',
    inviteCode: '',
    acceptTerms: false,
    profilePicture: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setError(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profilePicture: e.target.files![0] }));
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
        return false;
      }
      
      if (formData.password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.');
        return false;
      }
    }
    
    if (step === 2) {
      if (!formData.instagram && !formData.tiktok && !formData.youtube) {
        setError('Veuillez indiquer au moins un réseau social.');
        return false;
      }
      
      if (!formData.niche) {
        setError('Veuillez sélectionner votre niche principale.');
        return false;
      }
    }
    
    if (step === 3) {
      if (!formData.inviteCode) {
        setError('Le code d\'invitation est requis.');
        return false;
      }
      
      if (!formData.acceptTerms) {
        setError('Vous devez accepter les conditions d\'utilisation.');
        return false;
      }
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      // Simulation d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérifier le code d'invitation (simulé)
      if (formData.inviteCode !== 'SCRAPPY2023') {
        setError('Code d\'invitation invalide. Veuillez contacter votre manager.');
        setIsLoading(false);
        return;
      }
      
      setSuccess('Inscription réussie! Votre compte est en attente d\'approbation par un administrateur.');
      
      // Redirection après 3 secondes
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="bg-indigo-900/50 p-3 rounded-lg">
              <Zap className="h-12 w-12 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Rejoindre Scrappy Pro</h1>
          <p className="text-gray-400">Créez votre compte influenceur</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/50 border border-red-800 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3 bg-emerald-900/50 border border-emerald-800 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">{success}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Étape 1: Informations personnelles */}
            {step === 1 && (
              <>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      Prénom*
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Prénom"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Nom*
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Nom"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Adresse email*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+33 6 12 34 56 78"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Mot de passe*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Minimum 8 caractères"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-300 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirmer le mot de passe*
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Confirmez votre mot de passe"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
            
            {/* Étape 2: Informations de profil */}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-300 mb-1">
                    Photo de profil
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                      {formData.profilePicture ? (
                        <img 
                          src={URL.createObjectURL(formData.profilePicture)} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <label className="cursor-pointer bg-gray-700 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-600 transition-colors border border-gray-600">
                      Téléverser une photo
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                    Biographie
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Parlez-nous un peu de vous et de votre contenu..."
                    disabled={isLoading}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="niche" className="block text-sm font-medium text-gray-300 mb-1">
                    Niche principale*
                  </label>
                  <select
                    id="niche"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={isLoading}
                    required
                  >
                    <option value="">Sélectionnez votre niche</option>
                    <option value="beauty">Beauté & Cosmétiques</option>
                    <option value="fashion">Mode & Style</option>
                    <option value="fitness">Fitness & Bien-être</option>
                    <option value="food">Cuisine & Gastronomie</option>
                    <option value="travel">Voyage & Aventure</option>
                    <option value="tech">Technologie & Gadgets</option>
                    <option value="gaming">Gaming & eSports</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="parenting">Parentalité</option>
                    <option value="business">Business & Entrepreneuriat</option>
                    <option value="education">Éducation & Développement personnel</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">
                      Instagram
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="@votre_compte"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tiktok" className="block text-sm font-medium text-gray-300 mb-1">
                      TikTok
                    </label>
                    <input
                      id="tiktok"
                      name="tiktok"
                      type="text"
                      value={formData.tiktok}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="@votre_compte"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="youtube" className="block text-sm font-medium text-gray-300 mb-1">
                      YouTube
                    </label>
                    <input
                      id="youtube"
                      name="youtube"
                      type="text"
                      value={formData.youtube}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="VotreChaine"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                      Site web
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://www.votresite.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Étape 3: Finalisation */}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-300 mb-1">
                    Code d'invitation*
                  </label>
                  <input
                    id="inviteCode"
                    name="inviteCode"
                    type="text"
                    required
                    value={formData.inviteCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Entrez votre code d'invitation"
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Code fourni par votre manager ou l'agence partenaire
                  </p>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium mb-2">Résumé de votre compte</h3>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p><span className="text-gray-400">Nom:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="text-gray-400">Email:</span> {formData.email}</p>
                    <p><span className="text-gray-400">Niche:</span> {formData.niche || 'Non spécifiée'}</p>
                    <p>
                      <span className="text-gray-400">Réseaux sociaux:</span> 
                      {[
                        formData.instagram && `Instagram (${formData.instagram})`,
                        formData.tiktok && `TikTok (${formData.tiktok})`,
                        formData.youtube && `YouTube (${formData.youtube})`
                      ].filter(Boolean).join(', ') || 'Aucun spécifié'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-300">
                    J'accepte les <a href="#" className="text-indigo-400 hover:text-indigo-300">conditions d'utilisation</a> et la <a href="#" className="text-indigo-400 hover:text-indigo-300">politique de confidentialité</a> de Scrappy Pro.
                  </label>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-gray-700 px-6 py-4 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-600 transition-colors"
                disabled={isLoading}
              >
                Précédent
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                disabled={isLoading}
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors flex items-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            )}
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Vous avez déjà un compte? </span>
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Se connecter
          </Link>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2023 Scrappy Pro. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default Register; 