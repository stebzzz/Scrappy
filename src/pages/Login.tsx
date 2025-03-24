import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, Lock, User, AlertCircle, LogIn, UserPlus, 
  ArrowRight, KeyRound, CheckCircle, TrendingUp, 
  Hash, Briefcase, LineChart, Globe, Users,
  Star, Heart, Award, ArrowUpRight, ChevronRight,
  Sparkles, BarChart3, Zap, ShoppingBag, Target
} from 'lucide-react';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  sendPasswordResetEmail,
  googleSignIn
} from '../services/authService';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { FcGoogle } from 'react-icons/fc';

// Styles avancés pour une interface premium
const premiumStyles = `
  @keyframes floating-animation {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(8px); }
    50% { opacity: 1; filter: blur(12px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes rotate-bg {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes scale-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-floating {
    animation: floating-animation 6s ease-in-out infinite;
  }
  
  .animate-fade-up {
    animation: fade-up 0.7s ease-out forwards;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, 
      rgba(255,255,255,0) 0%, 
      rgba(255,255,255,0.1) 50%, 
      rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .animate-rotate-bg {
    animation: rotate-bg 20s linear infinite;
  }
  
  .animate-scale-pulse {
    animation: scale-pulse 3s ease-in-out infinite;
  }
  
  .bg-gradient-premium {
    background: linear-gradient(110deg, #0f172a, #1e293b, #0f172a);
    background-size: 200% 200%;
  }
  
  .bg-hexagon-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20v25L30 55 5 45V15z' fill='none' stroke='%23334155' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E");
  }
  
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(90deg, #8b5cf6, #c084fc, #a855f7);
  }
  
  .glow-effect {
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5), 
                0 0 30px rgba(139, 92, 246, 0.2);
  }
  
  .backdrop-blur-intense {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .premium-input {
    background-color: rgba(17, 24, 39, 0.8);
    border: 1px solid rgba(139, 92, 246, 0.2);
    color: #e5e7eb;
    transition: all 0.3s ease;
  }
  
  .premium-input:focus {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
  }
  
  .premium-button {
    background-image: linear-gradient(to right, #8b5cf6, #a855f7);
    transition: all 0.4s ease;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }
  
  .premium-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #7c3aed, #9333ea);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .premium-button:hover:before {
    opacity: 1;
  }
`;

// Component pour les particules animées
const ParticlesBackground = () => {
  // Utilisez useRef pour manipuler le canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajustement de la taille du canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Configuration des particules
    const particlesArray: any[] = [];
    const numberOfParticles = Math.min(window.innerWidth / 10, 100);
    
    // Classe Particle
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.1})`;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Création des particules
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    // Animation des particules
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connexion entre les particules
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Dessin des lignes entre particules proches
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Component principal de la page de login
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGradientAnimation, setShowGradientAnimation] = useState(true);

  // Effet pour faire disparaître l'animation de gradient après un délai
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGradientAnimation(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email ou mot de passe incorrect');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives échouées. Veuillez réessayer plus tard.');
      } else {
        setError(`Erreur de connexion: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }
    
    try {
      await signUpWithEmail(email, password, name);
      setSuccess('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
      setMode('login');
    } catch (err: any) {
      console.error('Erreur d\'inscription:', err);
      
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé');
      } else {
        setError(`Erreur d'inscription: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(email);
      setSuccess('Email de réinitialisation envoyé. Vérifiez votre boîte de réception.');
    } catch (err: any) {
      console.error('Erreur de réinitialisation:', err);
      
      if (err.code === 'auth/user-not-found') {
        setError('Aucun compte associé à cet email');
      } else {
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch (err: any) {
      console.error('Erreur connexion Google:', err);
      setError(`Erreur de connexion Google: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{premiumStyles}</style>
      <div className="min-h-screen bg-gradient-premium overflow-hidden relative">
        {/* Niveau 1: Éléments décoratifs d'arrière-plan */}
        <div className="absolute inset-0 bg-hexagon-pattern opacity-10"></div>
        <ParticlesBackground />
        
        {/* Orbes lumineux */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-indigo-600/15 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-violet-600/20 animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        
        {/* Étoiles scintillantes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `pulse-glow ${Math.random() * 3 + 2}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Transition d'entrée avec effet de gradient */}
        {showGradientAnimation && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-purple-900 to-indigo-900 animate-fade-up"></div>
          </div>
        )}
        
        {/* Niveau 2: Conteneur principal */}
        <div className="container mx-auto px-4 py-12 h-screen flex items-center justify-center relative z-10">
          <div className="w-full max-w-6xl backdrop-blur-intense rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-purple-500/20 glow-effect">
            
            {/* Section gauche - Branding et fonctionnalités */}
            <div className="w-full lg:w-5/12 bg-gradient-to-br from-purple-900/90 via-violet-900/90 to-indigo-900/90 p-10 lg:p-12 relative hidden lg:flex flex-col">
              {/* Logo et entête */}
              <div className="relative z-10 mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    SCRAPPY<span className="text-purple-400">.</span>
                  </h1>
                </div>
                <p className="text-purple-200/80 text-lg max-w-xs">
                  La plateforme d'influence marketing qui transforme votre approche
                </p>
              </div>
              
              {/* Fonctionnalités principales avec icônes */}
              <div className="space-y-6 mt-6">
                <h3 className="text-white text-lg font-semibold mb-5 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-300" />
                  Solutions d'influence premium
                </h3>
                
                <div className="grid grid-cols-1 gap-5">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex items-start">
                      <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg mr-3">
                        <TrendingUp className="h-6 w-6 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Découverte d'influenceurs</h4>
                        <p className="text-purple-200/80 text-sm">Algorithme IA de matching pour votre marque et vos produits</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex items-start">
                      <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg mr-3">
                        <BarChart3 className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Analytics avancés</h4>
                        <p className="text-purple-200/80 text-sm">Insights détaillés sur performance et ROI en temps réel</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex items-start">
                      <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg mr-3">
                        <Zap className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Automatisation complète</h4>
                        <p className="text-purple-200/80 text-sm">Gestion intégrée des campagnes multi-plateformes en quelques clics</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex items-start">
                      <div className="p-2 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-lg mr-3">
                        <ShoppingBag className="h-6 w-6 text-pink-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Suivi des conversions</h4>
                        <p className="text-purple-200/80 text-sm">Attribution précise et mesure d'impact sur les ventes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section droite - Formulaires */}
            <div className="w-full lg:w-7/12 bg-gray-900/60 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-center relative">
              {/* Mobile logo - Visible uniquement sur mobile */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  SCRAPPY<span className="text-purple-400">.</span>
                </h1>
              </div>
              
              {/* Notifications */}
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start animate-fade-up backdrop-blur">
                  <div className="p-1 bg-red-900/40 rounded-full mr-3 flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg flex items-start animate-fade-up backdrop-blur">
                  <div className="p-1 bg-emerald-900/40 rounded-full mr-3 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-emerald-200 text-sm">{success}</p>
                </div>
              )}
              
              {/* Conteneur des formulaires avec transitions fluides */}
              <div className="form-container relative">
                {/* Formulaire de connexion */}
                {mode === 'login' && (
                  <form onSubmit={handleLogin} className="animate-fade-up">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                          Connexion à votre espace
                        </span>
                      </h2>
                      <p className="text-gray-400">
                        Accédez à vos campagnes et analyses
                      </p>
                    </div>
                    
                    <div className="space-y-5 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email professionnel
                        </label>
                        <div className="relative group">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="votre@entreprise.com"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Mot de passe
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMode('forgot');
                              setError(null);
                              setSuccess(null);
                            }}
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
                          >
                            Mot de passe oublié?
                          </button>
                        </div>
                        <div className="relative group">
                          <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bouton de connexion animé */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                    >
                      {/* Effet d'éclat au survol */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                      
                      {/* Contenu du bouton */}
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <LogIn className="w-5 h-5 mr-2" />
                            <span className="flex items-center">
                              Connexion
                              <span className="ml-1 inline-block w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></span>
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                    
                    {/* Séparateur ou */}
                    <div className="flex items-center my-8">
                      <div className="flex-1 h-px bg-gray-700/60"></div>
                      <div className="px-4 text-sm text-gray-500">ou</div>
                      <div className="flex-1 h-px bg-gray-700/60"></div>
                    </div>
                    
                    {/* Connexion Google */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-3.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg border border-gray-700"
                    >
                      {/* Effet d'éclat au survol */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                      
                      {/* Contenu du bouton */}
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                          <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                          <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                          <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                        </svg>
                        Continuer avec Google
                      </span>
                    </button>
                    
                    {/* Lien vers inscription */}
                    <div className="text-center mt-8">
                      <p className="text-gray-400 text-sm">
                        Nouveau sur Scrappy?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('register');
                            setError(null);
                            setSuccess(null);
                          }}
                          className="text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center group"
                        >
                          <span>Créer un compte</span>
                          <ChevronRight className="w-4 h-4 ml-0.5 transform group-hover:translate-x-1 transition-all" />
                        </button>
                      </p>
                    </div>
                  </form>
                )}
                
                {/* Formulaire d'inscription */}
                {mode === 'register' && (
                  <form onSubmit={handleRegister} className="animate-fade-up">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                          Créer votre espace Scrappy
                        </span>
                      </h2>
                      <p className="text-gray-400">
                        Rejoignez notre communauté de marketeurs d'influence
                      </p>
                    </div>
                    
                    <div className="space-y-5 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Nom complet
                        </label>
                        <div className="relative group">
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="Prénom Nom"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email professionnel
                        </label>
                        <div className="relative group">
                          <input
                            id="registerEmail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="votre@entreprise.com"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Mot de passe
                        </label>
                        <div className="relative group">
                          <input
                            id="registerPassword"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                        <p className="text-gray-500 text-xs mt-1.5 flex items-center">
                          <span className="inline-block w-1 h-1 bg-purple-400 rounded-full mr-1.5"></span>
                          Minimum 6 caractères
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Confirmer le mot de passe
                        </label>
                        <div className="relative group">
                          <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bouton d'inscription */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                    >
                      {/* Effet d'éclat au survol */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                      
                      {/* Contenu du bouton */}
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5 mr-2" />
                            <span className="flex items-center">
                              Créer mon compte
                              <span className="ml-1 inline-block w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></span>
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                    
                    {/* Lien retour connexion */}
                    <div className="text-center mt-8">
                      <p className="text-gray-400 text-sm">
                        Déjà un compte?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('login');
                            setError(null);
                            setSuccess(null);
                          }}
                          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                        >
                          Se connecter
                        </button>
                      </p>
                    </div>
                  </form>
                )}
                
                {/* Formulaire de réinitialisation de mot de passe */}
                {mode === 'forgot' && (
                  <form onSubmit={handleForgotPassword} className="animate-fade-up">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                          Réinitialiser votre mot de passe
                        </span>
                      </h2>
                      <p className="text-gray-400">
                        Nous vous enverrons un lien de réinitialisation
                      </p>
                    </div>
                    
                    <div className="space-y-5 mb-6">
                      <div>
                        <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-300 mb-1.5">
                          Votre email
                        </label>
                        <div className="relative group">
                          <input
                            id="resetEmail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="premium-input w-full rounded-lg py-3.5 px-4 pl-11 focus:outline-none transition-all"
                            placeholder="votre@email.com"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                          </div>
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bouton de réinitialisation */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                    >
                      {/* Effet d'éclat au survol */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                      
                      {/* Contenu du bouton */}
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <KeyRound className="w-5 h-5 mr-2" />
                            <span className="flex items-center">
                              Envoyer le lien
                              <span className="ml-1 inline-block w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></span>
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                    
                    {/* Lien retour connexion */}
                    <div className="text-center mt-8">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setError(null);
                          setSuccess(null);
                        }}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                        Retour à la connexion
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 