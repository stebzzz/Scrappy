import React from 'react';
import { ShoppingBag, Clock, CheckCircle, X, Camera, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Campaign {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  status: 'active' | 'completed' | 'pending' | 'declined';
  dueDate: string;
  payment: number;
  contentType: 'photo' | 'video' | 'story' | 'reel';
}

interface CampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaigns, isLoading }) => {
  const getStatusBadge = (status: Campaign['status']) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 bg-blue-900/30 text-blue-500 rounded text-xs">En cours</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 rounded text-xs">Terminée</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-900/30 text-amber-500 rounded text-xs">En attente</span>;
      case 'declined':
        return <span className="px-2 py-1 bg-red-900/30 text-red-500 rounded text-xs">Refusée</span>;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: Campaign['status']) => {
    switch(status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'declined':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Mes Campagnes</h3>
        <Link to="/influencer/campaigns" className="text-pink-500 text-sm hover:text-pink-400 transition-colors">
          Voir toutes
        </Link>
      </div>
      
      {isLoading ? (
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-700 rounded"></div>
          </div>
        </div>
      ) : (
        <div>
          {campaigns.map((campaign) => (
            <Link 
              key={campaign.id} 
              to={`/influencer/campaigns/${campaign.id}`}
              className="block border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{campaign.brand}</div>
                      <div className="text-xs text-gray-400">{campaign.title}</div>
                    </div>
                  </div>
                  {getStatusBadge(campaign.status)}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-gray-700 rounded-full mr-2">
                      {getStatusIcon(campaign.status)}
                    </div>
                    <span className="text-gray-300">Échéance: {campaign.dueDate}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-500 font-medium mr-2">{campaign.payment}€</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsList; 