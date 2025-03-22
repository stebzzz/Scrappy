import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Campaign } from '../../services/database';
import CampaignForm from './CampaignForm';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
  brands: any[];
  influencers: any[];
  isLoading?: boolean;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  brands,
  influencers,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (campaign: Omit<Campaign, 'id'>) => {
    await onSubmit(campaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl shadow-xl">
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Créer une nouvelle campagne</h2>
          
          <CampaignForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            brands={brands}
            influencers={influencers}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;