import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{
      padding: '2rem', 
      textAlign: 'center', 
      backgroundColor: '#1f2937', 
      color: '#e5e7eb',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '2.5rem', 
        marginBottom: '1.5rem', 
        color: '#f9fafb',
        fontWeight: 'bold'
      }}>
        Page de Test - Mode Sombre
      </h1>
      <p style={{fontSize: '1.125rem', maxWidth: '600px'}}>
        Si vous voyez ce message avec un fond sombre et un texte clair, le rendu fonctionne correctement en mode sombre.
      </p>
      
      <div style={{
        marginTop: '2rem',
        backgroundColor: '#374151',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        border: '1px solid #4b5563',
        maxWidth: '500px'
      }}>
        <h2 style={{color: '#d1d5db', marginBottom: '0.75rem', fontSize: '1.25rem'}}>
          Statut du Système
        </h2>
        <p style={{color: '#9ca3af'}}>
          Tous les composants fonctionnent normalement
        </p>
      </div>
    </div>
  );
};

export default TestPage; 