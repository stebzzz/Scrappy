import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Save,
  X
} from 'lucide-react';
import { useBrands } from '../../hooks/useBrands';

interface BrandFormData {
  name: string;
  industry: string;
  description?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  status?: 'active' | 'inactive' | 'pending';
  notes?: string;
}

const BrandForm: React.FC = () => {
  const navigate = useNavigate();
  const { createBrand } = useBrands();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BrandFormData>({
    name: '',
    industry: '',
    description: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    status: 'active',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Gestion des champs imbriqués (socialLinks)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BrandFormData] as object,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'L\'industrie est requise';
    }
    
    if (formData.website && !formData.website.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
      newErrors.website = 'URL invalide';
    }
    
    if (formData.contactEmail && !formData.contactEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.contactEmail = 'Email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Nettoyage des liens sociaux vides
      const socialLinks = Object.entries(formData.socialLinks || {}).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);
      
      const brandData = {
        ...formData,
        socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined
      };
      
      await createBrand(brandData);
      navigate('/brands');
    } catch (error) {
      console.error('Erreur lors de la création de la marque:', error);
      setErrors({
        submit: 'Une erreur est survenue lors de la création de la marque'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold flex items-center mb-8">
        <Building2 className="w-6 h-6 mr-2 text-blue-400" />
        Nouvelle Marque
      </h1>
      
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nom de la marque *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border border-red-500' : 'border border-gray-600'
                }`}
                placeholder="Ex: Nike, Adidas..."
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Industrie *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.industry ? 'border border-red-500' : 'border border-gray-600'
                }`}
              >
                <option value="">Sélectionner une industrie</option>
                <option value="Mode">Mode</option>
                <option value="Beauté">Beauté</option>
                <option value="Technologie">Technologie</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Fitness">Fitness</option>
                <option value="Voyage">Voyage</option>
                <option value="Luxe">Luxe</option>
                <option value="Automobile">Automobile</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Site web
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.website ? 'border border-red-500' : 'border border-gray-600'
                  }`}
                  placeholder="https://www.exemple.com"
                />
              </div>
              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email de contact
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactEmail ? 'border border-red-500' : 'border border-gray-600'
                  }`}
                  placeholder="contact@exemple.com"
                />
              </div>
              {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
              >
                <option value="active">Actif</option>
                <option value="inactive">En pause</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Réseaux sociaux
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks?.instagram || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="Instagram: @marque ou URL"
                />
              </div>
              
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  name="socialLinks.facebook"
                  value={formData.socialLinks?.facebook || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="Facebook: URL"
                />
              </div>
              
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={formData.socialLinks?.twitter || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="Twitter: @marque ou URL"
                />
              </div>
              
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  type="text"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks?.linkedin || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  placeholder="LinkedIn: URL"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
              placeholder="Description de la marque..."
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Notes additionnelles
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
              placeholder="Notes internes sur la marque..."
            ></textarea>
          </div>
          
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200">
              {errors.submit}
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/brands')}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandForm; 