import React, { useState, useEffect } from 'react';
import { Campaign, Brand, Influencer } from '../../services/database';
import { Calendar, Clock, Building2, Users, DollarSign, Target, FileText, Tag } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<Campaign>;
  brands: Brand[];
  influencers: Influencer[];
  isLoading?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  brands,
  influencers,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    brandId: '',
    influencerIds: [],
    startDate: undefined,
    endDate: undefined,
    budget: undefined,
    goals: [],
    description: '',
    status: 'draft',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedGoal, setSelectedGoal] = useState('');

  // Convertir les dates pour l'affichage dans le formulaire
  useEffect(() => {
    if (initialData?.startDate) {
      const startDate = initialData.startDate instanceof Date 
        ? initialData.startDate 
        : initialData.startDate.toDate();
      
      setFormData(prev => ({
        ...prev,
        startDate: formatDateForInput(startDate)
      }));
    }
    
    if (initialData?.endDate) {
      const endDate = initialData.endDate instanceof Date 
        ? initialData.endDate 
        : initialData.endDate.toDate();
      
      setFormData(prev => ({
        ...prev,
        endDate: formatDateForInput(endDate)
      }));
    }
  }, [initialData]);

  // Formater la date pour l'input date
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur si le champ est rempli
    if (errors[name] && value) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Gérer les changements de sélection multiple (influenceurs)
  const handleInfluencerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, influencerIds: selectedOptions }));
    
    // Effacer l'erreur si au moins un influenceur est sélectionné
    if (errors.influencerIds && selectedOptions.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.influencerIds;
        return newErrors;
      });
    }
  };

  // Ajouter un objectif à la liste
  const handleAddGoal = () => {
    if (selectedGoal && !formData.goals?.includes(selectedGoal)) {
      setFormData(prev => ({
        ...prev,
        goals: [...(prev.goals || []), selectedGoal]
      }));
      setSelectedGoal('');
    }
  };

  // Supprimer un objectif de la liste
  const handleRemoveGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals?.filter(g => g !== goal) || []
    }));
  };

  // Valider le formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Le nom de la campagne est requis';
    }
    
    if (!formData.brandId) {
      newErrors.brandId = 'Veuillez sélectionner une marque';
    }
    
    if (!formData.influencerIds || formData.influencerIds.length === 0) {
      newErrors.influencerIds = 'Veuillez sélectionner au moins un influenceur';
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
    
    try {
      // Convertir les dates en objets Date
      const campaignData: Omit<Campaign, 'id'> = {
        ...formData as Omit<Campaign, 'id'>,
        startDate: formData.startDate ? new Date(formData.startDate as string) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate as string) : undefined,
        budget: formData.budget ? Number(formData.budget) : undefined
      };
      
      await onSubmit(campaignData);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-6">
        {initialData?.id ? 'Modifier la campagne' : 'Nouvelle campagne'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nom de la campagne */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Nom de la campagne</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${errors.name ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'}`}
                placeholder="Nom de la campagne"
              />
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>

          {/* Marque */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Marque</label>
            <div className="relative">
              <select
                name="brandId"
                value={formData.brandId || ''}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${errors.brandId ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'}`}
              >
                <option value="">Sélectionner une marque</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {errors.brandId && <p className="text-red-500 text-xs mt-1">{errors.brandId}</p>}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Budget</label>
            <div className="relative">
              <input
                type="number"
                name="budget"
                value={formData.budget || ''}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Budget en €"
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Date de début</label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${errors.startDate ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'}`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Date de fin</label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ''}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${errors.endDate ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'}`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
          </div>
          
          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Statut</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status || 'draft'}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="draft">Brouillon</option>
                <option value="active">Active</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          {/* Influenceurs */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Influenceurs</label>
            <div className="relative">
              <select
                multiple
                name="influencerIds"
                value={formData.influencerIds || []}
                onChange={handleInfluencerChange}
                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${errors.influencerIds ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'}`}
                size={4}
              >
                {influencers.map(influencer => (
                  <option key={influencer.id} value={influencer.id}>
                    {influencer.name} ({influencer.platform} - {influencer.followers} followers)
                  </option>
                ))}
              </select>
              <Users className="absolute left-3 top-6 text-gray-400 w-5 h-5" />
              {errors.influencerIds && <p className="text-red-500 text-xs mt-1">{errors.influencerIds}</p>}
              <p className="text-xs text-gray-400 mt-1">Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs influenceurs</p>
            </div>
          </div>
          
          {/* Objectifs */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Objectifs</label>
            <div className="relative">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ajouter un objectif"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.goals?.map((goal) => (
                  <div key={goal} className="flex items-center bg-gray-700 px-3 py-1 rounded-lg">
                    <span className="mr-2">{goal}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(goal)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <FileText className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Description de la campagne"
                rows={4}
              />
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">◌</span>
                Traitement...
              </>
            ) : (
              initialData?.id ? 'Mettre à jour' : 'Créer la campagne'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
