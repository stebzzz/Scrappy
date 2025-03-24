import React, { useState } from 'react';
import { Camera, Instagram, Video, Youtube, MessageSquare, FileText, Clock, CheckCircle, Plus, ChevronLeft, ChevronRight, X, Edit, Trash, Tag } from 'lucide-react';
import { ContentEvent } from '../../types/ContentEvent';
import InfluencerHeader from './InfluencerHeader';
import InfluencerSidebar from './InfluencerSidebar';

const InfluencerCalendar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<ContentEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ContentEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventData, setNewEventData] = useState<ContentEvent>({
    id: '',
    title: '',
    type: 'post',
    platform: 'instagram',
    date: '',
    time: '',
    status: 'draft',
    description: '',
    campaign: null,
    tags: []
  });

  const getEventTypeIcon = (type: ContentEvent['type']) => {
    switch(type) {
      case 'post':
        return <Camera className="h-4 w-4 text-pink-400" />;
      case 'story':
        return <Instagram className="h-4 w-4 text-purple-400" />;
      case 'reel':
        return <Video className="h-4 w-4 text-blue-400" />;
      case 'video':
        return <Youtube className="h-4 w-4 text-red-400" />;
      case 'meeting':
        return <MessageSquare className="h-4 w-4 text-amber-400" />;
      default:
        return null;
    }
  };
  
  const getPlatformIcon = (platform: ContentEvent['platform']) => {
    switch(platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'tiktok':
        return <TikTok className="h-4 w-4 text-teal-500" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: ContentEvent['status']) => {
    switch(status) {
      case 'draft':
        return (
          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded-full flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            Brouillon
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-2 py-1 text-xs bg-blue-900/30 text-blue-500 rounded-full flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Programmé
          </span>
        );
      case 'published':
        return (
          <span className="px-2 py-1 text-xs bg-amber-900/30 text-amber-500 rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Publié
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs bg-emerald-900/30 text-emerald-500 rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terminé
          </span>
        );
      default:
        return null;
    }
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      1
    ).getDay();
    
    // Ajuster pour commencer le calendrier par lundi (0) au lieu de dimanche (6)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const calendarDays = [];
    
    // Remplir les jours du mois précédent
    const prevMonthDays = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      0
    ).getDate();
    
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      calendarDays.push(
        <div key={`prev-${i}`} className="bg-gray-800 min-h-[100px] p-2 border border-gray-700 opacity-50">
          <span className="text-xs font-semibold text-gray-500">{prevMonthDays - i}</span>
        </div>
      );
    }
    
    // Remplir les jours du mois actuel
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = new Date().toDateString() === date.toDateString();
      
      // Filtrer les événements pour cette journée
      const dayEvents = events.filter(event => event.date === dateStr);
      
      calendarDays.push(
        <div 
          key={`current-${day}`} 
          className={`bg-gray-800 min-h-[100px] p-2 border border-gray-700 ${
            isToday ? 'ring-2 ring-indigo-500' : ''
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs font-semibold ${
              isToday ? 'text-indigo-400' : 'text-white'
            }`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <button 
                className="p-1 hover:bg-gray-700 rounded-full"
                onClick={() => {
                  // Action pour ajouter un événement à cette date
                  setNewEventData(prev => ({ ...prev, date: dateStr }));
                  setShowEventModal(true);
                }}
              >
                <Plus className="h-3 w-3 text-gray-400" />
              </button>
            )}
          </div>
          
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="text-xs p-1 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer truncate flex items-center"
              >
                {getEventTypeIcon(event.type)}
                <span className="ml-1 truncate">{event.title}</span>
              </div>
            ))}
            
            {dayEvents.length === 0 && (
              <button 
                onClick={() => {
                  setNewEventData(prev => ({ ...prev, date: dateStr }));
                  setShowEventModal(true);
                }}
                className="w-full text-xs p-1 rounded border border-dashed border-gray-700 hover:border-indigo-500 text-gray-500 hover:text-indigo-400"
              >
                + Ajouter
              </button>
            )}
          </div>
        </div>
      );
    }
    
    // Remplir les jours du mois suivant
    const remainingDays = 42 - calendarDays.length; // 6 semaines de 7 jours
    
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="bg-gray-800 min-h-[100px] p-2 border border-gray-700 opacity-50">
          <span className="text-xs font-semibold text-gray-500">{i}</span>
        </div>
      );
    }
    
    return calendarDays;
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  return (
    <div className="min-h-screen bg-gray-900">
      <InfluencerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <InfluencerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Calendrier de contenu</h1>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setView('month')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    view === 'month' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Mois
                </button>
                <button 
                  onClick={() => setView('week')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    view === 'week' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Semaine
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    view === 'list' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Liste
                </button>
              </div>
              
              <button 
                onClick={() => setShowEventModal(true)}
                className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau contenu
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg mb-6">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </button>
                <h2 className="text-lg font-medium text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button 
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              
              <button 
                onClick={() => {
                  setCurrentDate(new Date());
                }}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm transition-colors"
              >
                Aujourd'hui
              </button>
            </div>
            
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <>
                  {view === 'month' && (
                    <>
                      {/* En-têtes des jours de la semaine */}
                      <div className="grid grid-cols-7 mb-2">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                          <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Grille du calendrier */}
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendarDays()}
                      </div>
                    </>
                  )}
                  
                  {view === 'list' && (
                    <div className="space-y-3">
                      {events.length > 0 ? (
                        events
                          .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime())
                          .map(event => (
                            <div 
                              key={event.id}
                              className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                  <div className="p-2 bg-gray-600 rounded-md mr-3">
                                    {getEventTypeIcon(event.type)}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-white">{event.title}</h3>
                                    <div className="flex items-center mt-1 space-x-2">
                                      <span className="text-xs text-gray-400">
                                        {new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} à {event.time}
                                      </span>
                                      {getPlatformIcon(event.platform) && (
                                        <span className="flex items-center text-xs text-gray-400">
                                          {getPlatformIcon(event.platform)}
                                        </span>
                                      )}
                                      {event.campaign && (
                                        <span className="text-xs text-gray-400">
                                          {event.campaign.brand}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {getStatusBadge(event.status)}
                                </div>
                              </div>
                              {event.description && (
                                <p className="text-sm text-gray-300 mt-2 ml-12">
                                  {event.description}
                                </p>
                              )}
                              {event.tags && event.tags.length > 0 && (
                                <div className="flex items-center mt-2 ml-12 space-x-1">
                                  {event.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-gray-600 text-gray-300 rounded text-xs flex items-center">
                                      <Tag className="h-3 w-3 mr-1" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <CalendarIcon className="h-12 w-12 text-gray-500 mb-4" />
                          <h3 className="text-lg font-medium text-white mb-2">Aucun événement planifié</h3>
                          <p className="text-gray-400 max-w-md mb-4">
                            Vous n'avez pas encore d'événements dans votre calendrier. Créez votre premier contenu en cliquant sur le bouton ci-dessous.
                          </p>
                          <button 
                            onClick={() => setShowEventModal(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                          >
                            Ajouter du contenu
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal de détail d'événement */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-start p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">{selectedEvent.title}</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-700 rounded-md mr-3">
                  {getEventTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">
                      {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} à {selectedEvent.time}
                    </span>
                    {getStatusBadge(selectedEvent.status)}
                  </div>
                  {selectedEvent.platform && (
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      {getPlatformIcon(selectedEvent.platform)}
                      <span className="ml-1 capitalize">{selectedEvent.platform}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedEvent.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                  <p className="text-sm text-white bg-gray-700 p-3 rounded-md">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
              
              {selectedEvent.campaign && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Campagne</h3>
                  <div className="text-sm text-white bg-gray-700 p-3 rounded-md">
                    <div className="font-medium">{selectedEvent.campaign.name}</div>
                    <div className="text-gray-400">{selectedEvent.campaign.brand}</div>
                  </div>
                </div>
              )}
              
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-700 px-4 py-3 flex justify-end space-x-3">
              <button
                onClick={() => {
                  // Fonction pour modifier l'événement
                  setSelectedEvent(null);
                }}
                className="px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-600 transition-colors"
              >
                <Edit className="h-4 w-4 inline mr-1" />
                Modifier
              </button>
              <button
                onClick={() => {
                  // Fonction pour supprimer l'événement
                  setSelectedEvent(null);
                }}
                className="px-3 py-1.5 border border-red-800 text-red-400 rounded-md text-sm hover:bg-red-900/50 transition-colors"
              >
                <Trash className="h-4 w-4 inline mr-1" />
                Supprimer
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal d'ajout d'événement */}
      {showEventModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-start p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Nouveau contenu</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowEventModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Titre
                </label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Titre du contenu"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Type
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="post">Publication</option>
                    <option value="story">Story</option>
                    <option value="reel">Reel</option>
                    <option value="video">Vidéo</option>
                    <option value="meeting">Réunion</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Plateforme
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date
                  </label>
                  <input 
                    type="date"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={newEventData.date}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Heure
                  </label>
                  <input 
                    type="time"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={newEventData.time}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-20"
                  placeholder="Description du contenu..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campagne (optionnel)
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Aucune</option>
                  <option value="1">Éco Beauté - Lancement gamme soins bio</option>
                  <option value="2">FitnessPro - Challenge sportif 30 jours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags (séparés par des virgules)
                </label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="beauté, soins, bio"
                />
              </div>
            </div>
            
            <div className="bg-gray-700 px-4 py-3 flex justify-end">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-600 transition-colors mr-3"
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerCalendar; 