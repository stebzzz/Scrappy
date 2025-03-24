// Ajoutez une gestion des erreurs d'image
const handleImageError = (e) => {
  // Remplacer par une image par défaut locale quand l'image externe ne charge pas
  e.target.src = '/assets/default-profile.png'; 
  // Assurez-vous que cette image existe dans votre dossier public/assets
};

// Dans le rendu:
<img 
  src={influencer.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(influencer.name)}
  alt={influencer.name}
  onError={handleImageError}
  className="rounded-full h-12 w-12 object-cover"
/> 