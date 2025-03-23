import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Save, Instagram, Video, Youtube, Twitter, 
  Facebook, Linkedin, Users, Tag, Plus, Trash2, Check, X, User, Globe, Zap, Upload, AlertCircle
} from 'lucide-react';
import { getInfluencerById, saveInfluencer, Influencer } from '../../services/database';

interface InfluencerFormProps {
  initialData?: Partial<Influencer>;
  isEditing?: boolean;
}

// Composant TikTok personnalisé
const TikTok: React.FC<{ size?: number, className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InfluencerForm: React.FC<InfluencerFormProps> = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<Partial<Influencer>>({
    name: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    niche: '',
    niches: [],
    followers: 0,
    profileImage: '',
    coverImage: '',
    socialProfiles: {},
    status: 'active',
    notes: '',
    ...initialData
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [tempNiche, setTempNiche] = useState<string>('');
  const [socialPlatform, setSocialPlatform] = useState<string>('');
  const [socialUrl, setSocialUrl] = useState<string>('');
  
  // État pour la prévisualisation de l'image
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [avatarError, setAvatarError] = useState<boolean>(false);
  
  // Charger les données de l'influenceur si on est en mode édition
  useEffect(() => {
    if (isEditing && id) {
      const fetchInfluencer = async () => {
        try {
          const influencer = await getInfluencerById(id);
          if (influencer) {
            setFormData(influencer);
            if (influencer.avatar) setAvatarPreview(influencer.avatar);
          }
        } catch (error) {
          console.error("Erreur lors du chargement de l'influenceur:", error);
          setErrors({ general: "Erreur lors du chargement des données" });
        }
      };
      
      fetchInfluencer();
    }
  }, [isEditing, id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convertir en nombre pour certains champs
    if (name === 'followers') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Effacer l'erreur si le champ est rempli
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const addNiche = () => {
    if (!tempNiche.trim()) return;
    
    const niches = formData.niches || [];
    if (!niches.includes(tempNiche.trim())) {
      setFormData({
        ...formData,
        niches: [...niches, tempNiche.trim()]
      });
    }
    setTempNiche('');
  };
  
  const removeNiche = (niche: string) => {
    const niches = formData.niches || [];
    setFormData({
      ...formData,
      niches: niches.filter(n => n !== niche)
    });
  };
  
  const addSocialProfile = () => {
    if (!socialPlatform || !socialUrl.trim()) return;
    
    const socialProfiles = formData.socialProfiles || {};
    setFormData({
      ...formData,
      socialProfiles: {
        ...socialProfiles,
        [socialPlatform]: socialUrl.trim()
      }
    });
    
    setSocialPlatform('');
    setSocialUrl('');
  };
  
  const removeSocialProfile = (platform: string) => {
    const socialProfiles = { ...formData.socialProfiles } || {};
    delete socialProfiles[platform];
    
    setFormData({
      ...formData,
      socialProfiles
    });
  };
  
  // Gérer les changements de l'URL de l'avatar
  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, avatar: url });
    setAvatarPreview(url);
    setAvatarError(false);
  };
  
  // Gérer les erreurs de chargement d'image
  const handleImageError = () => {
    setAvatarError(true);
  };
  
  // Vider l'URL de l'avatar
  const handleClearAvatar = () => {
    setFormData({ ...formData, avatar: '' });
    setAvatarPreview('');
    setAvatarError(false);
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (formData.followers && formData.followers < 0) {
      newErrors.followers = "Le nombre d'abonnés ne peut pas être négatif";
    }
    
    if (formData.avatar && !formData.avatar.match(/^https?:\/\/.+/i)) {
      newErrors.avatar = "L'URL de l'avatar doit commencer par http:// ou https://";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Ajouter/mettre à jour la date de dernière modification
      const data = {
        ...formData,
        lastUpdated: new Date()
      };
      
      // Si c'est un nouvel influenceur, ajouter la date de création
      if (!isEditing) {
        data.createdAt = new Date();
      }
      
      // Sauvegarder l'influenceur
      const savedId = await saveInfluencer(data, id);
      
      setLoading(false);
      navigate(isEditing ? `/influencer/${id}` : `/influencer/${savedId}`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setErrors({ general: "Erreur lors de la sauvegarde de l'influenceur" });
      setLoading(false);
    }
  };
  
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={18} className="text-pink-400" />;
      case 'tiktok':
        return <Video size={18} className="text-teal-400" />;
      case 'youtube':
        return <Youtube size={18} className="text-red-400" />;
      case 'twitter':
        return <Twitter size={18} className="text-blue-400" />;
      case 'facebook':
        return <Facebook size={18} className="text-blue-600" />;
      case 'linkedin':
        return <Linkedin size={18} className="text-blue-700" />;
      default:
        return <Users size={18} className="text-gray-400" />;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/influencers')}
          className="mr-4 p-2 hover:bg-gray-700 rounded-lg"
        >
          <ChevronLeft size={20} className="text-gray-400" />
        </button>
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? "Modifier l'influenceur" : "Nouvel influenceur"}
        </h1>
      </div>
      
      {errors.general && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 mb-6">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Informations de base</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Nom de l'influenceur"
                className={`p-3 w-full bg-gray-700 text-white rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="email@exemple.com"
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="followers" className="block text-gray-300 mb-2">
                Nombre d'abonnés
              </label>
              <input
                id="followers"
                name="followers"
                type="number"
                value={formData.followers || ''}
                onChange={handleChange}
                placeholder="10000"
                className={`p-3 w-full bg-gray-700 text-white rounded-lg border ${
                  errors.followers ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.followers && (
                <p className="text-red-400 text-sm mt-1">{errors.followers}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-gray-300 mb-2">
                Localisation
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="Paris, France"
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="description" className="block text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Description de l'influenceur..."
              className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Niches</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tempNiche}
              onChange={(e) => setTempNiche(e.target.value)}
              placeholder="Ajouter une niche..."
              className="p-3 flex-grow bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addNiche}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(formData.niches || []).map((niche, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full"
              >
                <Tag size={14} className="text-blue-400" />
                <span className="text-gray-300">{niche}</span>
                <button
                  type="button"
                  onClick={() => removeNiche(niche)}
                  className="p-1 text-gray-400 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {(formData.niches || []).length === 0 && (
              <p className="text-gray-400 text-sm">Aucune niche ajoutée</p>
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Profils sociaux</h2>
          
          <div className="flex gap-2 mb-4">
            <select
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className="p-3 w-1/3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner...</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="other">Autre</option>
            </select>
            
            <input
              type="text"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              placeholder="URL du profil..."
              className="p-3 flex-grow bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              type="button"
              onClick={addSocialProfile}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-2">
            {Object.entries(formData.socialProfiles || {}).map(([platform, url]) => (
              <div 
                key={platform}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {renderSocialIcon(platform)}
                  <span className="text-gray-300 capitalize">{platform}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <a 
                    href={url.startsWith('http') ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    {url}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeSocialProfile(platform)}
                    className="p-1 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {Object.keys(formData.socialProfiles || {}).length === 0 && (
              <p className="text-gray-400 text-sm">Aucun profil social ajouté</p>
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="profileImage" className="block text-gray-300 mb-2">
                URL de l'image de profil
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="text"
                value={formData.profileImage || ''}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.profileImage && (
                <div className="mt-2 p-2 bg-gray-700 rounded-lg">
                  <img 
                    src={formData.profileImage} 
                    alt="Prévisualisation du profil" 
                    className="h-16 w-16 object-cover rounded-full mx-auto"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="coverImage" className="block text-gray-300 mb-2">
                URL de l'image de couverture
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="text"
                value={formData.coverImage || ''}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.coverImage && (
                <div className="mt-2 p-2 bg-gray-700 rounded-lg">
                  <img 
                    src={formData.coverImage} 
                    alt="Prévisualisation de la couverture" 
                    className="h-16 w-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Notes</h2>
          
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            rows={4}
            placeholder="Notes internes à propos de cet influenceur..."
            className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Photo de profil</h2>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-40 h-40 rounded-xl bg-gray-700 overflow-hidden relative">
              {avatarPreview ? (
                <>
                  <img 
                    src={avatarPreview}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  {avatarError && (
                    <div className="absolute inset-0 bg-gray-800/80 flex flex-col items-center justify-center p-2 text-center">
                      <AlertCircle size={24} className="text-red-400 mb-2" />
                      <p className="text-xs text-red-300">Impossible de charger l'image</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleClearAvatar}
                    className="absolute top-2 right-2 w-8 h-8 bg-gray-800/70 hover:bg-red-600/70 rounded-full flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <User size={48} />
                </div>
              )}
            </div>
            
            <div className="w-full">
              <label className="block text-gray-400 mb-1">URL de l'image</label>
              <div className="flex">
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar || ''}
                  onChange={handleAvatarUrlChange}
                  className={`flex-1 p-3 bg-gray-700 rounded-l-lg border ${errors.avatar ? 'border-red-500' : 'border-gray-600'}`}
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>
              {errors.avatar && <p className="mt-1 text-red-400 text-sm">{errors.avatar}</p>}
              <p className="mt-1 text-gray-500 text-xs">
                Collez l'URL d'une image en ligne
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Statut</h2>
          
          <div>
            <label className="block text-gray-400 mb-1">Statut de l'influenceur</label>
            <select
              name="status"
              value={formData.status || 'active'}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600"
            >
              <option value="active">Actif</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/influencers')}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save size={18} className="mr-2" />
            {isEditing ? "Mettre à jour" : "Créer l'influenceur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerForm; 