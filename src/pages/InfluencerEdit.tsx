import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfluencerForm from '../components/influencers/InfluencerForm';
import { getInfluencerById, Influencer } from '../services/database';

const InfluencerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfluencer = async () => {
      if (!id) return;
      
      try {
        const data = await getInfluencerById(id);
        setInfluencer(data);
      } catch (err) {
        console.error("Erreur lors du chargement de l'influenceur:", err);
        setError("Impossible de charger les données de l'influenceur");
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencer();
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

  return <InfluencerForm initialData={influencer} isEditing={true} />;
};

export default InfluencerEdit; 