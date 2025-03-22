import React, { useState } from 'react';
import { 
  Database as DatabaseIcon, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  RefreshCw,
  Table,
  Users,
  Building2,
  BarChart,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  FileText,
  AlertCircle
} from 'lucide-react';

interface DataTable {
  id: string;
  name: string;
  type: 'influencers' | 'brands' | 'campaigns' | 'analytics';
  recordCount: number;
  lastUpdated: string;
  size: string;
  status: 'active' | 'processing' | 'error';
}

interface DataRecord {
  id: number;
  name: string;
  type: string;
  data: {
    [key: string]: string | number;
  };
}

const Database = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'tables' | 'records'>('tables');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Données fictives pour les tables
  const mockTables: DataTable[] = [
    {
      id: 'influencers',
      name: 'Influenceurs',
      type: 'influencers',
      recordCount: 1458,
      lastUpdated: '15/05/2023',
      size: '24.5 MB',
      status: 'active'
    },
    {
      id: 'brands',
      name: 'Marques',
      type: 'brands',
      recordCount: 342,
      lastUpdated: '10/05/2023',
      size: '8.2 MB',
      status: 'active'
    },
    {
      id: 'campaigns',
      name: 'Campagnes',
      type: 'campaigns',
      recordCount: 87,
      lastUpdated: '18/05/2023',
      size: '12.1 MB',
      status: 'active'
    },
    {
      id: 'campaign_analytics',
      name: 'Analytique des campagnes',
      type: 'analytics',
      recordCount: 1245,
      lastUpdated: '18/05/2023',
      size: '32.7 MB',
      status: 'active'
    },
    {
      id: 'influencer_metrics',
      name: 'Métriques des influenceurs',
      type: 'analytics',
      recordCount: 5842,
      lastUpdated: '17/05/2023',
      size: '45.3 MB',
      status: 'active'
    },
    {
      id: 'content_performance',
      name: 'Performance des contenus',
      type: 'analytics',
      recordCount: 3621,
      lastUpdated: '16/05/2023',
      size: '28.9 MB',
      status: 'processing'
    },
    {
      id: 'audience_demographics',
      name: 'Démographie des audiences',
      type: 'analytics',
      recordCount: 2145,
      lastUpdated: '12/05/2023',
      size: '18.4 MB',
      status: 'error'
    }
  ];

  // Données fictives pour les enregistrements
  const mockRecords: { [key: string]: DataRecord[] } = {
    'influencers': [
      {
        id: 1,
        name: 'Marfitfrance',
        type: 'Fitness',
        data: {
          followers: 245000,
          engagement: '4.2%',
          location: 'Paris, France',
          platforms: 'Instagram, TikTok',
          email: 'contact@marfitfrance.com'
        }
      },
      {
        id: 2,
        name: 'Louska',
        type: 'Lifestyle',
        data: {
          followers: 320000,
          engagement: '3.8%',
          location: 'Lyon, France',
          platforms: 'Instagram, YouTube',
          email: 'louska.contact@gmail.com'
        }
      },
      {
        id: 3,
        name: 'SuperBoomJ',
        type: 'Gaming',
        data: {
          followers: 510000,
          engagement: '5.1%',
          location: 'Marseille, France',
          platforms: 'Twitch, YouTube, TikTok',
          email: 'superboomj@gaming.fr'
        }
      },
      {
        id: 4,
        name: 'TheWingzer',
        type: 'Tech',
        data: {
          followers: 180000,
          engagement: '4.5%',
          location: 'Bordeaux, France',
          platforms: 'YouTube, Instagram',
          email: 'contact@wingzer.tech'
        }
      },
      {
        id: 5,
        name: 'Grandingo',
        type: 'Voyage',
        data: {
          followers: 290000,
          engagement: '4.8%',
          location: 'Nice, France',
          platforms: 'Instagram, TikTok, YouTube',
          email: 'grandingo.voyage@gmail.com'
        }
      }
    ],
    'brands': [
      {
        id: 1,
        name: "L'Oréal Paris",
        type: 'Beauté',
        data: {
          website: 'loreal-paris.fr',
          campaigns: 12,
          budget: '€250,000',
          contact: 'marketing@loreal.fr'
        }
      },
      {
        id: 2,
        name: 'Sephora France',
        type: 'Beauté',
        data: {
          website: 'sephora.fr',
          campaigns: 8,
          budget: '€180,000',
          contact: 'influencers@sephora.fr'
        }
      },
      {
        id: 3,
        name: 'Nike France',
        type: 'Sport',
        data: {
          website: 'nike.fr',
          campaigns: 6,
          budget: '€320,000',
          contact: 'marketing.fr@nike.com'
        }
      }
    ],
    'campaigns': [
      {
        id: 1,
        name: 'Collection Été 2025',
        type: 'Beauté',
        data: {
          brand: "L'Oréal Paris",
          startDate: '15/05/2025',
          endDate: '15/07/2025',
          budget: '€45,000',
          status: 'En cours'
        }
      },
      {
        id: 2,
        name: 'Nouveau Parfum',
        type: 'Beauté',
        data: {
          brand: 'Dior',
          startDate: '01/04/2025',
          endDate: '30/04/2025',
          budget: '€60,000',
          status: 'Complétée'
        }
      },
      {
        id: 3,
        name: 'Essentiels Printemps',
        type: 'Beauté',
        data: {
          brand: 'Sephora France',
          startDate: '01/03/2025',
          endDate: '15/05/2025',
          budget: '€35,000',
          status: 'En cours'
        }
      }
    ]
  };

  // Filtrer les tables
  const filteredTables = mockTables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === null || table.type === filterType;
    return matchesSearch && matchesType;
  });

  // Trier les tables
  const sortedTables = [...filteredTables].sort((a, b) => {
    const fieldA = a[sortField as keyof DataTable];
    const fieldB = b[sortField as keyof DataTable];
    
    if (sortDirection === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  // Gérer le tri
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Obtenir l'icône de type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'influencers':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'brands':
        return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'campaigns':
        return <FileText className="w-5 h-5 text-green-400" />;
      case 'analytics':
        return <BarChart className="w-5 h-5 text-amber-400" />;
      default:
        return <Table className="w-5 h-5 text-gray-400" />;
    }
  };

  // Obtenir la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-900 text-emerald-300';
      case 'processing':
        return 'bg-blue-900 text-blue-300';
      case 'error':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  // Obtenir l'icône de statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>;
      case 'processing':
        return <RefreshCw className="w-4 h-4 mr-1 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <DatabaseIcon className="w-6 h-6 mr-2 text-blue-400" />
          Base de données
        </h1>
        <div className="flex space-x-2">
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle table
          </button>
          <button className="btn-secondary flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </button>
          <button className="btn-outline flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une table ou un enregistrement..."
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${filterType === null ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilterType(null)}
            >
              Toutes
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${filterType === 'influencers' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilterType('influencers')}
            >
              Influenceurs
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${filterType === 'brands' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilterType('brands')}
            >
              Marques
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${filterType === 'campaigns' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilterType('campaigns')}
            >
              Campagnes
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${filterType === 'analytics' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilterType('analytics')}
            >
              Analytique
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`btn-icon ${viewMode === 'tables' ? 'bg-gray-600' : 'bg-gray-700'}`}
              onClick={() => setViewMode('tables')}
            >
              <Table className="w-5 h-5" />
            </button>
            <button 
              className={`btn-icon ${viewMode === 'records' ? 'bg-gray-600' : 'bg-gray-700'}`}
              onClick={() => {
                setViewMode('records');
                if (!activeTable && mockTables.length > 0) {
                  setActiveTable(mockTables[0].id);
                }
              }}
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'tables' ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Nom de la table</span>
                      {sortField === 'name' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('recordCount')}
                  >
                    <div className="flex items-center">
                      <span>Enregistrements</span>
                      {sortField === 'recordCount' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <div className="flex items-center">
                      <span>Dernière mise à jour</span>
                      {sortField === 'lastUpdated' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('size')}
                  >
                    <div className="flex items-center">
                      <span>Taille</span>
                      {sortField === 'size' ? (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      ) : (
                        <ArrowUpDown className="w-4 h-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTables.length > 0 ? (
                  sortedTables.map((table) => (
                    <tr key={table.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium">{table.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {getTypeIcon(table.type)}
                          <span className="ml-2">{
                            table.type === 'influencers' ? 'Influenceurs' :
                            table.type === 'brands' ? 'Marques' :
                            table.type === 'campaigns' ? 'Campagnes' : 'Analytique'
                          }</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{table.recordCount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-400">{table.lastUpdated}</td>
                      <td className="px-4 py-3">{table.size}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${getStatusColor(table.status)}`}>
                          {getStatusIcon(table.status)}
                          {table.status === 'active' ? 'Actif' : 
                           table.status === 'processing' ? 'En traitement' : 'Erreur'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                              setActiveTable(table.id);
                              setViewMode('records');
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      <DatabaseIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Aucune table trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <select 
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                value={activeTable || ''}
                onChange={(e) => setActiveTable(e.target.value)}
              >
                {mockTables.map(table => (
                  <option key={table.id} value={table.id}>{table.name}</option>
                ))}
              </select>
              <span className="mx-4 text-gray-400">|</span>
              <span className="text-gray-400">
                {activeTable && mockRecords[activeTable] ? 
                  `${mockRecords[activeTable].length} enregistrements` : 
                  '0 enregistrement'}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="btn-outline-sm flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </button>
              <button className="btn-outline-sm flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
              <button className="btn-primary-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {activeTable && mockRecords[activeTable] ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Nom</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    {mockRecords[activeTable][0] && Object.keys(mockRecords[activeTable][0].data).map(key => (
                      <th key={key} className="px-4 py-3 text-left capitalize">{key}</th>
                    ))}
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecords[activeTable].map((record) => (
                    <tr key={record.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 text-gray-400">#{record.id}</td>
                      <td className="px-4 py-3 font-medium">{record.name}</td>
                      <td className="px-4 py-3">{record.type}</td>
                      {Object.entries(record.data).map(([key, value]) => (
                        <td key={key} className="px-4 py-3">{value}</td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <DatabaseIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Sélectionnez une table pour voir les enregistrements</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <div>Affichage de {sortedTables.length} sur {mockTables.length} tables</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50" disabled>Précédent</button>
          <button className="px-3 py-1 bg-gray-600 rounded-md text-white">1</button>
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">2</button>
          <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default Database; 