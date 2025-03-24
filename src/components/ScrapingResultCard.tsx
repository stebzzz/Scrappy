import React from 'react';
import { ExternalLink, Flag, Link2, Mail, Phone, Calendar, Clock } from 'lucide-react';

interface ScrapingResultProps {
  result: {
    id: string;
    url: string;
    type: string;
    timestamp: Date;
    data: any;
  };
}

export const ScrapingResultCard: React.FC<ScrapingResultProps> = ({ result }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'profile':
        return 'bg-blue-900/30 text-blue-400 border-blue-700/40';
      case 'contact':
        return 'bg-green-900/30 text-green-400 border-green-700/40';
      case 'news':
        return 'bg-purple-900/30 text-purple-400 border-purple-700/40';
      case 'custom':
        return 'bg-amber-900/30 text-amber-400 border-amber-700/40';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700/40';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'profile':
        return <Flag size={14} className="mr-1" />;
      case 'contact':
        return <Phone size={14} className="mr-1" />;
      case 'news':
        return <Calendar size={14} className="mr-1" />;
      case 'custom':
        return <Link2 size={14} className="mr-1" />;
      default:
        return <Link2 size={14} className="mr-1" />;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:bg-gray-750 transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-white text-base truncate max-w-xs">
          {result.data?.title || new URL(result.url).hostname}
        </h3>
        <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getTypeColor(result.type)}`}>
          {getTypeIcon(result.type)}
          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {truncateText(result.data?.description || result.url, 120)}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {result.data?.keywords?.slice(0, 3).map((keyword: string, index: number) => (
          <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
            {keyword}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center">
          <Clock size={12} className="mr-1" />
          {formatDate(result.timestamp)}
        </div>
        <a 
          href={result.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 flex items-center"
        >
          Voir
          <ExternalLink size={12} className="ml-1" />
        </a>
      </div>
    </div>
  );
}; 