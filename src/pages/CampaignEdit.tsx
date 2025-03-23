import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CampaignForm from '../components/campaigns/CampaignForm';
import { getCampaignById, Campaign } from '../services/database';

const CampaignEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;
      
      try {
        const data = await getCampaignById(id);
        setCampaign(data);
      } catch (err) {
        console.error('Erreur lors du chargement de la campagne:', err);
        setError('Impossible de charger les données de la campagne');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
        {error}
      </div>
    );
  }

  return <CampaignForm initialData={campaign} isEditing={true} />;
};

export default CampaignEdit; 