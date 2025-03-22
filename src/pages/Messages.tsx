import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Image, 
  Smile, 
  Send,
  Users,
  Building2,
  Clock,
  CheckCheck,
  Filter,
  Star,
  StarOff,
  ChevronDown,
  X
} from 'lucide-react';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: 'user' | 'contact';
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    name: string;
    url: string;
  }[];
}

interface Conversation {
  id: number;
  contact: {
    id: number;
    name: string;
    avatar: string;
    type: 'influencer' | 'brand' | 'team';
    status: 'online' | 'offline' | 'away';
    lastSeen?: string;
  };
  messages: Message[];
  unreadCount: number;
  lastMessage: {
    content: string;
    timestamp: string;
  };
  starred: boolean;
  labels?: string[];
}

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Données fictives pour les conversations
  const mockConversations: Conversation[] = [
    {
      id: 1,
      contact: {
        id: 101,
        name: "Marfitfrance",
        avatar: "https://via.placeholder.com/50",
        type: 'influencer',
        status: 'online'
      },
      messages: [
        {
          id: 1001,
          content: "Bonjour ! J'ai bien reçu votre proposition pour la campagne fitness.",
          timestamp: "10:30",
          sender: 'contact',
          read: true
        },
        {
          id: 1002,
          content: "Super ! Qu'en pensez-vous ?",
          timestamp: "10:32",
          sender: 'user',
          read: true
        },
        {
          id: 1003,
          content: "Je suis très intéressée. Pouvez-vous me donner plus de détails sur le calendrier ?",
          timestamp: "10:35",
          sender: 'contact',
          read: true
        },
        {
          id: 1004,
          content: "Bien sûr ! La campagne débuterait le 15 mai et durerait environ 6 semaines.",
          timestamp: "10:38",
          sender: 'user',
          read: true
        },
        {
          id: 1005,
          content: "Parfait, ça correspond à mes disponibilités. Et concernant le contenu à produire ?",
          timestamp: "10:42",
          sender: 'contact',
          read: true,
          attachments: [
            {
              type: 'image',
              name: 'exemple_contenu.jpg',
              url: 'https://via.placeholder.com/300'
            }
          ]
        }
      ],
      unreadCount: 0,
      lastMessage: {
        content: "Parfait, ça correspond à mes disponibilités. Et concernant le contenu à produire ?",
        timestamp: "10:42"
      },
      starred: true,
      labels: ['Campagne Fitness', 'Priorité']
    },
    {
      id: 2,
      contact: {
        id: 102,
        name: "L'Oréal Paris",
        avatar: "https://via.placeholder.com/50",
        type: 'brand',
        status: 'offline',
        lastSeen: "Il y a 35 min"
      },
      messages: [
        {
          id: 2001,
          content: "Bonjour, nous souhaitons lancer une nouvelle campagne pour notre gamme de soins capillaires.",
          timestamp: "Hier",
          sender: 'contact',
          read: true
        },
        {
          id: 2002,
          content: "Bonjour ! C'est une excellente nouvelle. Avez-vous déjà une idée des influenceurs que vous souhaiteriez cibler ?",
          timestamp: "Hier",
          sender: 'user',
          read: true
        },
        {
          id: 2003,
          content: "Nous pensons principalement à des profils beauté et lifestyle, avec une audience féminine 25-40 ans.",
          timestamp: "Hier",
          sender: 'contact',
          read: false
        }
      ],
      unreadCount: 1,
      lastMessage: {
        content: "Nous pensons principalement à des profils beauté et lifestyle, avec une audience féminine 25-40 ans.",
        timestamp: "Hier"
      },
      starred: false,
      labels: ['Beauté', 'Nouveau client']
    },
    {
      id: 3,
      contact: {
        id: 103,
        name: "Louska",
        avatar: "https://via.placeholder.com/50",
        type: 'influencer',
        status: 'away'
      },
      messages: [
        {
          id: 3001,
          content: "Merci pour l'invitation à la campagne Sephora !",
          timestamp: "Lun",
          sender: 'contact',
          read: true
        },
        {
          id: 3002,
          content: "Avec plaisir ! Vous êtes parfaite pour cette collaboration.",
          timestamp: "Lun",
          sender: 'user',
          read: true
        },
        {
          id: 3003,
          content: "J'ai quelques idées créatives pour les publications. Pouvons-nous en discuter ?",
          timestamp: "Lun",
          sender: 'contact',
          read: true
        },
        {
          id: 3004,
          content: "Bien sûr ! Dites-moi quand vous êtes disponible pour un appel.",
          timestamp: "Lun",
          sender: 'user',
          read: true
        }
      ],
      unreadCount: 0,
      lastMessage: {
        content: "Bien sûr ! Dites-moi quand vous êtes disponible pour un appel.",
        timestamp: "Lun"
      },
      starred: true,
      labels: ['Campagne Sephora']
    },
    {
      id: 4,
      contact: {
        id: 104,
        name: "Équipe Marketing",
        avatar: "https://via.placeholder.com/50",
        type: 'team',
        status: 'online'
      },
      messages: [
        {
          id: 4001,
          content: "Réunion de briefing pour la campagne Nike demain à 14h.",
          timestamp: "Mar",
          sender: 'contact',
          read: true
        },
        {
          id: 4002,
          content: "J'y serai ! Avons-nous déjà la liste des influenceurs confirmés ?",
          timestamp: "Mar",
          sender: 'user',
          read: true
        },
        {
          id: 4003,
          content: "Oui, je vous envoie le document avec tous les détails.",
          timestamp: "Mar",
          sender: 'contact',
          read: true,
          attachments: [
            {
              type: 'file',
              name: 'liste_influenceurs_nike.pdf',
              url: '#'
            }
          ]
        }
      ],
      unreadCount: 0,
      lastMessage: {
        content: "Oui, je vous envoie le document avec tous les détails.",
        timestamp: "Mar"
      },
      starred: false,
      labels: ['Interne', 'Campagne Nike']
    },
    {
      id: 5,
      contact: {
        id: 105,
        name: "Grandingo",
        avatar: "https://via.placeholder.com/50",
        type: 'influencer',
        status: 'offline',
        lastSeen: "Il y a 2h"
      },
      messages: [
        {
          id: 5001,
          content: "Salut ! J'ai une question concernant la campagne Samsung.",
          timestamp: "Mer",
          sender: 'contact',
          read: true
        },
        {
          id: 5002,
          content: "Bonjour ! Je vous écoute, comment puis-je vous aider ?",
          timestamp: "Mer",
          sender: 'user',
          read: true
        },
        {
          id: 5003,
          content: "Est-ce que je peux inclure une vidéo de déballage du produit dans ma stratégie de contenu ?",
          timestamp: "Mer",
          sender: 'contact',
          read: false
        }
      ],
      unreadCount: 1,
      lastMessage: {
        content: "Est-ce que je peux inclure une vidéo de déballage du produit dans ma stratégie de contenu ?",
        timestamp: "Mer"
      },
      starred: false,
      labels: ['Tech', 'Campagne Samsung']
    },
    {
      id: 6,
      contact: {
        id: 106,
        name: "Sephora France",
        avatar: "https://via.placeholder.com/50",
        type: 'brand',
        status: 'online'
      },
      messages: [
        {
          id: 6001,
          content: "Nous sommes très satisfaits des résultats de la campagne Printemps !",
          timestamp: "Jeu",
          sender: 'contact',
          read: true
        },
        {
          id: 6002,
          content: "C'est une excellente nouvelle ! Les influenceurs ont vraiment bien performé.",
          timestamp: "Jeu",
          sender: 'user',
          read: true
        },
        {
          id: 6003,
          content: "Absolument. Nous aimerions discuter d'une nouvelle collaboration pour l'été.",
          timestamp: "Jeu",
          sender: 'contact',
          read: true
        }
      ],
      unreadCount: 0,
      lastMessage: {
        content: "Absolument. Nous aimerions discuter d'une nouvelle collaboration pour l'été.",
        timestamp: "Jeu"
      },
      starred: true,
      labels: ['Beauté', 'Client fidèle']
    }
  ];

  // Filtrer les conversations
  const filteredConversations = mockConversations.filter(conversation => {
    const matchesSearch = conversation.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === null || conversation.contact.type === filterType;
    const matchesStarred = !showStarredOnly || conversation.starred;
    return matchesSearch && matchesType && matchesStarred;
  });

  // Trouver la conversation active
  const currentConversation = mockConversations.find(conv => conv.id === activeConversation);

  // Envoyer un nouveau message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Dans une application réelle, vous enverriez ce message à votre backend
    console.log('Message envoyé:', newMessage);
    
    // Réinitialiser le champ de message
    setNewMessage('');
  };

  // Obtenir la couleur de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'offline':
        return 'bg-gray-500';
      case 'away':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Obtenir l'icône de type de contact
  const getContactTypeIcon = (type: string) => {
    switch (type) {
      case 'influencer':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'brand':
        return <Building2 className="w-4 h-4 text-blue-400" />;
      case 'team':
        return <Users className="w-4 h-4 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 text-white h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-green-400" />
          Messages
        </h1>
        <div className="flex space-x-2">
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle conversation
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden bg-gray-800 rounded-xl border border-gray-700">
        {/* Sidebar des conversations */}
        <div className="w-full md:w-80 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <select 
                  className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-xs"
                  onChange={(e) => setFilterType(e.target.value === '' ? null : e.target.value)}
                  value={filterType || ''}
                >
                  <option value="">Tous</option>
                  <option value="influencer">Influenceurs</option>
                  <option value="brand">Marques</option>
                  <option value="team">Équipe</option>
                </select>
                <button 
                  className={`p-1 rounded-lg ${showStarredOnly ? 'bg-amber-600' : 'bg-gray-700'}`}
                  onClick={() => setShowStarredOnly(!showStarredOnly)}
                >
                  {showStarredOnly ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                </button>
              </div>
              <button className="p-1 rounded-lg bg-gray-700">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-700 ${
                    activeConversation === conversation.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex items-start">
                    <div className="relative mr-3">
                      <img 
                        src={conversation.contact.avatar} 
                        alt={conversation.contact.name} 
                        className="w-10 h-10 rounded-full bg-gray-600"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(conversation.contact.status)}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold truncate">{conversation.contact.name}</h3>
                        <span className="text-xs text-gray-400">{conversation.lastMessage.timestamp}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        {getContactTypeIcon(conversation.contact.type)}
                        <span className="ml-1 truncate">{conversation.contact.type === 'influencer' ? 'Influenceur' : conversation.contact.type === 'brand' ? 'Marque' : 'Équipe'}</span>
                      </div>
                      <p className="text-sm truncate text-gray-400">
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-col items-end">
                      {conversation.unreadCount > 0 && (
                        <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                      {conversation.starred && (
                        <Star className="w-4 h-4 text-amber-400 mt-1" />
                      )}
                    </div>
                  </div>
                  {conversation.labels && conversation.labels.length > 0 && (
                    <div className="flex mt-2 flex-wrap gap-1">
                      {conversation.labels.map((label, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-700 rounded text-xs">
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Aucune conversation trouvée</p>
              </div>
            )}
          </div>
        </div>

        {/* Zone de conversation */}
        {currentConversation ? (
          <div className="hidden md:flex flex-1 flex-col">
            {/* En-tête de la conversation */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img 
                    src={currentConversation.contact.avatar} 
                    alt={currentConversation.contact.name} 
                    className="w-10 h-10 rounded-full bg-gray-600"
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(currentConversation.contact.status)}`}></span>
                </div>
                <div>
                  <h3 className="font-semibold">{currentConversation.contact.name}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    {currentConversation.contact.status === 'online' ? (
                      <span>En ligne</span>
                    ) : currentConversation.contact.status === 'away' ? (
                      <span>Absent</span>
                    ) : (
                      <span>{currentConversation.contact.lastSeen}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'contact' && (
                    <img 
                      src={currentConversation.contact.avatar} 
                      alt={currentConversation.contact.name} 
                      className="w-8 h-8 rounded-full mr-2 self-end bg-gray-600"
                    />
                  )}
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700'
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="rounded overflow-hidden">
                            {attachment.type === 'image' ? (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name} 
                                className="max-w-full h-auto rounded"
                              />
                            ) : (
                              <div className="bg-gray-800 p-2 rounded flex items-center">
                                <Paperclip className="w-4 h-4 mr-2" />
                                <span className="text-sm truncate">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-end items-center mt-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.sender === 'user' && (
                        <CheckCheck className={`w-4 h-4 ml-1 ${message.read ? 'text-blue-400' : 'text-gray-400'}`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Zone de saisie */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex items-center bg-gray-700 rounded-lg p-2">
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <Image className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-transparent border-none focus:outline-none px-3 py-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  className={`p-2 rounded-full ${newMessage.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'}`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">Aucune conversation sélectionnée</h3>
              <p className="text-gray-400 mb-6">Sélectionnez une conversation ou commencez-en une nouvelle</p>
              <button className="btn-primary flex items-center mx-auto">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 