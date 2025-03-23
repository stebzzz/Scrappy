import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Calendar, 
  Users, 
  Building2, 
  DollarSign, 
  AlertCircle,
  Plus,
  Trash2,
  Link as LinkIcon,
  Hash,
  MessageSquare
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { getCampaignById, saveCampaign, Campaign } from '../../services/database';
import { useAppContext } from '../../context/AppContext';

interface CampaignFormProps {
  initialData?: Partial<Campaign>;
  isEditing?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { brands, influencers } = useAppContext();
  
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    brandId: '',
    influencerIds: [],
    startDate: null,
    endDate: null,
    budget: undefined,
    status: 'draft',
    platforms: [],
    objectives: '',
    deliverables: '',
    notes: '',
    ...initialData
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>(formData.influencerIds || []);
  
  // Formatage de date pour les inputs
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Charger les données de la campagne si on est en mode édition
  useEffect(() => {
    if (isEditing && id) {
      const fetchCampaign = async () => {
        try {
          const campaign = await getCampaignById(id);
          if (campaign) {
            setFormData(campaign);
            setSelectedInfluencers(campaign.influencerIds || []);
            
            // Convertir les dates pour l'input
            if (campaign.startDate) {
              const startDate = campaign.startDate instanceof Timestamp 
                ? campaign.startDate.toDate() 
                : campaign.startDate;
              
              setFormData(prev => ({
                ...prev,
                startDate: formatDateForInput(startDate)
              }));
            }
            
            if (campaign.endDate) {
              const endDate = campaign.endDate instanceof Timestamp 
                ? campaign.endDate.toDate() 
                : campaign.endDate;
              
              setFormData(prev => ({
                ...prev,
                endDate: formatDateForInput(endDate)
              }));
            }
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la campagne:', error);
        }
      };
      
      fetchCampaign();
    }
  }, [isEditing, id]);
  
  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Gérer la sélection/désélection des influenceurs
  const toggleInfluencer = (influencerId: string) => {
    setSelectedInfluencers(prev => {
      if (prev.includes(influencerId)) {
        return prev.filter(id => id !== influencerId);
      } else {
        return [...prev, influencerId];
      }
    });
    
    setFormData(prev => ({
      ...prev,
      influencerIds: selectedInfluencers.includes(influencerId)
        ? selectedInfluencers.filter(id => id !== influencerId)
        : [...selectedInfluencers, influencerId]
    }));
  };
  
  // Valider le formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Le nom de la campagne est requis';
    }
    
    if (!formData.brandId) {
      newErrors.brandId = 'Veuillez sélectionner une marque';
    }
    
    if (!selectedInfluencers.length) {
      newErrors.influencerIds = 'Sélectionnez au moins un influenceur';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate as string) > new Date(formData.endDate as string)) {
      newErrors.endDate = 'La date de fin doit être postérieure à la date de début';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const campaignData: Omit<Campaign, 'id'> = {
        ...formData as Omit<Campaign, 'id'>,
        startDate: formData.startDate ? new Date(formData.startDate as string) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate as string) : undefined,
        budget: formData.budget ? Number(formData.budget) : undefined
      };
      
      // Si nous sommes en mode édition, inclure l'ID
      const saveData = isEditing && id ? { ...campaignData, id } : campaignData;
      
      // Sauvegarder la campagne
      await saveCampaign(saveData);
      
      // Rediriger vers la liste des campagnes
      navigate('/campaigns');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la campagne:', error);
      setErrors({ submit: 'Une erreur est survenue lors de la sauvegarde de la campagne' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/campaigns')}
          className="text-blue-400 hover:text-blue-300 flex items-center"
        >
          <ChevronLeft size={20} className="mr-1" />
          Retour aux campagnes
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? 'Modifier la campagne' : 'Nouvelle campagne'}
          </h1>
          <p className="text-gray-400">
            {isEditing 
              ? 'Modifiez les détails de votre campagne' 
              : 'Remplissez le formulaire pour créer une nouvelle campagne'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start">
              <AlertCircle size={20} className="text-red-400 mr-2 mt-0.5" />
              <p className="text-red-300">{errors.submit}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Nom de la campagne */}
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Nom de la campagne*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="Ex: Lancement Collection Été 2024"
                  className={`pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg ${
                    errors.name ? 'border border-red-500' : 'border border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
            </div>
            
            {/* Marque */}
            <div>
              <label htmlFor="brandId" className="block text-gray-300 mb-2">
                Marque*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 size={18} className="text-gray-400" />
                </div>
                <select
                  id="brandId"
                  name="brandId"
                  value={formData.brandId || ''}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg ${
                    errors.brandId ? 'border border-red-500' : 'border border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Sélectionner une marque</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.brandId && <p className="mt-1 text-red-400 text-sm">{errors.brandId}</p>}
            </div>
            
            {/* Date de début */}
            <div>
              <label htmlFor="startDate" className="block text-gray-300 mb-2">
                Date de début*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate || ''}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg ${
                    errors.startDate ? 'border border-red-500' : 'border border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.startDate && <p className="mt-1 text-red-400 text-sm">{errors.startDate}</p>}
            </div>
            
            {/* Date de fin */}
            <div>
              <label htmlFor="endDate" className="block text-gray-300 mb-2">
                Date de fin*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg ${
                    errors.endDate ? 'border border-red-500' : 'border border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.endDate && <p className="mt-1 text-red-400 text-sm">{errors.endDate}</p>}
            </div>
            
            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-gray-300 mb-2">
                Budget (€)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={18} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget || ''}
                  onChange={handleChange}
                  placeholder="5000"
                  className="pl-10 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Statut */}
            <div>
              <label htmlFor="status" className="block text-gray-300 mb-2">
                Statut
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status || 'draft'}
                  onChange={handleChange}
                  className="pl-4 pr-4 py-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Brouillon</option>
                  <option value="active">Actif</option>
                  <option value="inactive">En pause</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Plateformes */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              Plateformes
            </label>
            <div className="flex flex-wrap gap-2">
              {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter', 'LinkedIn', 'Snapchat', 'Pinterest'].map(platform => (
                <label key={platform} className="inline-flex items-center bg-gray-700 px-3 py-2 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                    checked={(formData.platforms || []).includes(platform)}
                    onChange={() => {
                      const updatedPlatforms = formData.platforms || [];
                      if (updatedPlatforms.includes(platform)) {
                        setFormData({
                          ...formData,
                          platforms: updatedPlatforms.filter(p => p !== platform)
                        });
                      } else {
                        setFormData({
                          ...formData,
                          platforms: [...updatedPlatforms, platform]
                        });
                      }
                    }}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>
          
          {/* Sélection des influenceurs */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              Sélectionner les influenceurs*
            </label>
            {errors.influencerIds && (
              <p className="mb-2 text-red-400 text-sm">{errors.influencerIds}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {influencers.map(influencer => (
                <div 
                  key={influencer.id}
                  onClick={() => toggleInfluencer(influencer.id || '')}
                  className={`p-3 rounded-lg border ${
                    selectedInfluencers.includes(influencer.id || '')
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-700'
                  } cursor-pointer transition-all hover:border-blue-500`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3 text-white font-bold">
                      {influencer.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{influencer.name}</h4>
                      <p className="text-gray-400 text-sm flex items-center">
                        <Users size={12} className="mr-1" />
                        {influencer.followers || '0'} abonnés
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Objectifs et livrables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="objectives" className="block text-gray-300 mb-2">
                Objectifs
              </label>
              <textarea
                id="objectives"
                name="objectives"
                value={formData.objectives || ''}
                onChange={handleChange}
                rows={4}
                placeholder="Objectifs principaux de cette campagne..."
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="deliverables" className="block text-gray-300 mb-2">
                Livrables attendus
              </label>
              <textarea
                id="deliverables"
                name="deliverables"
                value={formData.deliverables || ''}
                onChange={handleChange}
                rows={4}
                placeholder="Livrables attendus des influenceurs..."
                className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          
          {/* Notes */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-300 mb-2">
              Notes additionnelles
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Notes internes sur cette campagne..."
              className="p-3 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/campaigns')}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {isEditing ? 'Mettre à jour' : 'Créer la campagne'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
