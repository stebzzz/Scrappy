// Service de scraping utilisant du vrai scraping web
import axios from 'axios';
import { doc, setDoc, getDoc, Timestamp, getFirestore } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDJ8r5TxMZf3NQAOI_UcDCn5T3N4qDcMZ0",
  authDomain: "scrappy-30e8a.firebaseapp.com",
  projectId: "scrappy-30e8a",
  storageBucket: "scrappy-30e8a.appspot.com",
  messagingSenderId: "848022508482",
  appId: "1:848022508482:web:16cb3f1b7e8ab92dbc96c1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// La clé API de ScrapingBee
const SCRAPING_BEE_API_KEY = "3ERV3PI012DRZ1FQO6DX8J5WKH1PNGLKHGE1UGOCH3RUT5VYVB5I3PMTRU47HMS8RWAGNA9820WI73PW";

// Liste de proxies CORS comme backup si ScrapingBee échoue
const CORS_PROXIES = [
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?'
];

/**
 * Analyse le contenu d'une page web pour en extraire des informations pertinentes
 */
export const analyzePage = (html: string, url: string): any => {
  try {
    // Créer un DOM à partir du HTML
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    
    // Extraire les métadonnées de base
    const metaData = extractMetadata(dom);
    
    // Essayer de détecter le type de page
    const pageType = detectPageType(dom, url);
    
    // Extraire le contenu principal
    const mainContent = extractMainContent(dom);
    
    // Analyser la structure de la page
    const pageStructure = analyzePageStructure(dom);
    
    // Détecter les technologies utilisées
    const technologies = detectTechnologies(html);
    
    // Extraire les mots-clés
    const keywords = extractKeywords(mainContent);
    
    // Récupérer les liens externes
    const externalLinks = extractExternalLinks(dom, url);
    
    // Construire les résultats
    const results = {
      url,
      title: metaData.title || '',
      description: metaData.description || '',
      pageType,
      mainContent: mainContent.substring(0, 500) + '...',
      keywordsSummary: keywords.slice(0, 5),
      externalLinksSummary: externalLinks.slice(0, 5).map(link => link.href),
      technologies: technologies.slice(0, 3),
      metadata: metaData,
      insights: generateInsights(dom, mainContent, url, pageType)
    };
    
    return results;
  } catch (error) {
    console.error(`Erreur lors de l'analyse de la page ${url}:`, error);
    return {
      url,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      status: 'error'
    };
  }
};

/**
 * Extrait les mots-clés les plus pertinents d'un texte
 */
function extractKeywords(text: string): string[] {
  // Liste de mots à ignorer (stopwords en français)
  const stopwords = [
    'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'à', 'en', 'est', 'pour',
    'ce', 'cette', 'ces', 'que', 'qui', 'dans', 'par', 'sur', 'avec', 'sans', 'vous',
    'nous', 'ils', 'elles', 'elle', 'il', 'son', 'sa', 'ses', 'leur', 'leurs', 'votre',
    'vos', 'notre', 'nos', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'au', 'aux', 'donc',
    'mais', 'ou', 'où', 'car', 'si', 'quand', 'comment', 'pourquoi', 'dont', 'pas', 'plus'
  ];

  // Nettoyer le texte et extraire les mots
  const words = text.toLowerCase()
    .replace(/[^\w\sàáâãäåçèéêëìíîïñòóôõöùúûüýÿ]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopwords.includes(word));

  // Compter les occurrences
  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  // Trier par fréquence
  return Object.entries(wordCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10)
    .map(entry => entry[0]);
}

/**
 * Fonction principale pour analyser une URL avec ScrapingBee
 */
export const analyzeBrand = async (url: string, type: 'profile' | 'contact' | 'news' = 'profile') => {
  if (!url) return null;
  
  console.log(`🚀 SCRAPING DE ${url} (TYPE: ${type}) AVEC SCRAPINGBEE`);
  
  try {
    // Construire l'URL de l'API ScrapingBee avec les options
    const params = new URLSearchParams({
      'api_key': SCRAPING_BEE_API_KEY,
      'url': url,
      'render_js': 'true',        // Activer le rendu JavaScript
      'premium_proxy': 'true',    // Utiliser les proxies premium
      'country_code': 'fr'        // Proxy français
    });
    
    console.log(`⏳ Envoi de la requête ScrapingBee...`);
    
    // Faire la requête à ScrapingBee
    const response = await fetch(`https://app.scrapingbee.com/api/v1/?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`ScrapingBee a retourné ${response.status}`);
    }
    
    // Récupérer le HTML
    const html = await response.text();
    console.log(`✅ HTML récupéré avec ScrapingBee (${html.length} caractères)`);
    
    // Analyser le HTML
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    
    // Extraire les informations selon le type demandé
    let result;
    switch (type) {
      case 'profile':
        result = extractProfileInformation(dom, url, html);
        break;
      case 'contact':
        result = extractContactInformation(dom, url, html);
        break;
      case 'news':
        result = extractNewsInformation(dom, url, html);
        break;
      default:
        result = extractProfileInformation(dom, url, html);
    }
    
    console.log(`📊 Résultats d'extraction (${type}):`, result);
    return result;
    
  } catch (error) {
    console.error(`❌ Erreur avec ScrapingBee:`, error);
    // Utiliser les proxies CORS comme fallback
    return await tryWithCorsproxies(url, type);
  }
};

/**
 * Fonction pour essayer les proxies CORS si ScrapingBee échoue
 */
async function tryWithCorsproxies(url: string, type: 'profile' | 'contact' | 'news') {
  // Essayer tous les proxies disponibles
  let html = '';
  let proxySuccess = false;
  
  for (const proxy of CORS_PROXIES) {
    try {
      console.log(`Tentative avec le proxy: ${proxy}`);
      
      const response = await fetch(`${proxy}${encodeURIComponent(url)}`, {
  headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        console.log(`Échec avec le proxy ${proxy}: ${response.status}`);
        continue;
      }
      
      html = await response.text();
      proxySuccess = true;
      console.log(`Succès avec le proxy ${proxy}, ${html.length} caractères récupérés`);
      break;
    } catch (e) {
      console.log(`Erreur avec le proxy ${proxy}:`, e);
    }
  }
  
  // Si tous les proxies ont échoué, utiliser l'extraction basique
  if (!proxySuccess) {
    console.log("Tous les proxies ont échoué, utilisation de l'extraction basique");
    return extractBasicInfo(url, type);
  }
  
  try {
    // Analyser le HTML récupéré
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    
    // Extraire les informations selon le type demandé
    switch (type) {
      case 'profile':
        return extractProfileInformation(dom, url, html);
      case 'contact':
        return extractContactInformation(dom, url, html);
      case 'news':
        return extractNewsInformation(dom, url, html);
      default:
        return extractProfileInformation(dom, url, html);
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse du HTML:", error);
    return extractBasicInfo(url, type);
  }
}

/**
 * Extraction dynamique des informations de profil
 */
function extractProfileInformation(dom: Document, url: string, html: string) {
  console.log("Extraction des informations de profil...");
  
  // Extraire le titre et la méta description
  const title = dom.querySelector('title')?.textContent?.trim() || '';
  const metaDescription = dom.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Extraire le nom de la marque
  let brandName = '';
  
  // Essayer d'extraire depuis les microdata ou JSON-LD
  const jsonLdScripts = dom.querySelectorAll('script[type="application/ld+json"]');
  for (const script of jsonLdScripts) {
    try {
      const data = JSON.parse(script.textContent || '{}');
      
      // Chercher les attributs pertinents
      if (data.name) {
        brandName = data.name;
        break;
      } else if (data.brand?.name) {
        brandName = data.brand.name;
        break;
      } else if (data.publisher?.name) {
        brandName = data.publisher.name;
        break;
      }
    } catch (e) {
      console.log("Erreur lors de l'analyse JSON-LD:", e);
    }
  }
  
  // Si aucun nom trouvé dans JSON-LD, chercher dans le titre ou les métadonnées
  if (!brandName) {
    // Extraire du titre
    brandName = title.split(' - ')[0] || title.split(' | ')[0] || title;
    
    // Chercher des logos ou des classes spécifiques
    const logoAlt = dom.querySelector('img[alt*="logo"], .logo img, header img')?.getAttribute('alt');
    if (logoAlt) {
      brandName = logoAlt.replace('logo', '').replace('Logo', '').trim();
    }
  }
  
  // Nettoyer le nom de marque
  brandName = brandName.replace(/Accueil/i, '').replace(/Home/i, '').trim();
  
  // Extraire la description
  let description = metaDescription;
  if (!description) {
    // Chercher dans les paragraphes d'introduction
    const introText = dom.querySelector('.intro, .about, .description, [class*="intro"], [class*="about"], [class*="description"]')?.textContent?.trim();
    if (introText) {
      description = introText;
    } else {
      // Prendre le premier paragraphe significatif
      const paragraphs = dom.querySelectorAll('p');
      for (const p of paragraphs) {
        const text = p.textContent?.trim();
        if (text && text.length > 50) {
          description = text;
          break;
        }
      }
    }
  }
  
  // Extraire l'industrie en analysant le contenu de la page
  const industry = detectIndustryFromContent(dom, url);
  
  // Extraire les réseaux sociaux
  const socialLinks = extractSocialMedia(dom, url);
  
  // Analyser les sections principales pour les produits/services
  const productsAndServices = extractProductsAndServices(dom);
  
  // Générer des insights basés sur ce qui a été trouvé
  const insights = [];
  
  if (!brandName || brandName === title) {
    insights.push({
      type: 'Nom de marque',
      priority: 'medium',
      message: 'Nom de marque difficile à identifier automatiquement'
    });
  }
  
  if (socialLinks.length === 0) {
    insights.push({
      type: 'Réseaux sociaux',
      priority: 'medium',
      message: 'Aucun réseau social détecté sur la page'
    });
  } else {
    insights.push({
      type: 'Réseaux sociaux',
      priority: 'info',
      message: `${socialLinks.length} réseaux sociaux trouvés`
    });
  }
  
  if (productsAndServices.length > 0) {
    insights.push({
      type: 'Offre',
      priority: 'info',
      message: `${productsAndServices.length} produits/services identifiés`
    });
  }
  
  // Résultat final
  return {
    name: brandName,
    description: description,
    industry: industry,
    website: url,
    socialLinks: socialLinks,
    products: productsAndServices,
    scrapedAt: new Date(),
    insights: insights
  };
}

/**
 * Extraction dynamique des informations de contact
 */
function extractContactInformation(dom: Document, url: string, html: string) {
  console.log("Extraction des informations de contact...");
  
  // Extraire le profil de base
  const baseInfo = extractProfileInformation(dom, url, html);
  
  // Rechercher les emails
  const emails = findContactEmails(dom, html);
  const primaryEmail = emails.length > 0 ? emails[0] : null;
  
  // Rechercher les numéros de téléphone
  const phoneRegex = /(?:\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
  const phones = html.match(phoneRegex) || [];
  const primaryPhone = phones.length > 0 ? phones[0] : null;
  
  // Extraire l'adresse physique
  let address = '';
  const addressElements = dom.querySelectorAll('[itemprop="address"], .address, [class*="address"]');
  if (addressElements.length > 0) {
    address = addressElements[0].textContent?.trim() || '';
  }
  
  // Ajouter des insights basés sur les informations de contact
  const insights = [
    ...baseInfo.insights || [],
    {
      type: 'Contact',
      priority: emails.length > 0 ? 'info' : 'medium',
      message: emails.length > 0 
        ? `${emails.length} email(s) trouvé(s)` 
        : 'Aucun email trouvé, envisagez un autre moyen de contact'
    }
  ];
  
  if (emails.length > 1) {
    insights.push({
      type: 'Email',
      priority: 'info',
      message: `Email principal: ${primaryEmail}, alternatives: ${emails.slice(1, 3).join(', ')}`
    });
  }
  
  return {
    ...baseInfo,
    contactEmail: primaryEmail,
    allEmails: emails,
    contactPhone: primaryPhone,
    allPhones: phones,
    address,
    insights
  };
}

/**
 * Extraction dynamique des actualités
 */
function extractNewsInformation(dom: Document, url: string, html: string) {
  console.log("Extraction des actualités...");
  
  // Extraire le profil de base
  const baseInfo = extractProfileInformation(dom, url, html);
  
  // Initialiser le tableau d'actualités
  const newsItems = [];
  
  // 1. Chercher des sections d'actualités par sélecteurs spécifiques
  const newsSections = [
    ...Array.from(dom.querySelectorAll('.news, .blog, .article, [class*="news"], [class*="blog"], [class*="article"]')),
    ...Array.from(dom.querySelectorAll('section, div, article')).filter(el => {
      const text = el.textContent?.toLowerCase() || '';
      return (
        text.includes('actualité') || 
        text.includes('news') || 
        text.includes('blog') || 
        text.includes('press release')
      );
    })
  ];
  
  // 2. Extraire les articles individuels
  const newsArticles = [
    ...Array.from(dom.querySelectorAll('article')),
    ...Array.from(dom.querySelectorAll('.news-item, .blog-post, .article, .post'))
  ];
  
  // 3. Extraire à partir des sections d'actualités
  if (newsSections.length > 0) {
    for (const section of newsSections) {
      const articles = section.querySelectorAll('article, .item, li, .card');
      
      if (articles.length > 0) {
        // Si on trouve des articles individuels
        for (const article of articles) {
          const titleEl = article.querySelector('h1, h2, h3, h4, .title');
          const title = titleEl?.textContent?.trim() || 'Actualité';
          
          const dateEl = article.querySelector('time, .date, [class*="date"], [datetime]');
          let date = dateEl?.textContent?.trim() || '';
          if (!date && dateEl?.getAttribute('datetime')) {
            date = new Date(dateEl.getAttribute('datetime') || '').toLocaleDateString('fr-FR');
          }
          
          const contentEl = article.querySelector('p, .excerpt, .content, .description');
          const content = contentEl?.textContent?.trim() || '';
          
          if (title) {
            newsItems.push({
              newsTitle: title,
              newsDate: date || new Date().toLocaleDateString('fr-FR'),
              newsContent: content.substring(0, 500),
              newsUrl: extractLinkFromElement(article, url)
            });
          }
          
          if (newsItems.length >= 5) break;
        }
      } else {
        // Si pas d'articles individuels, extraire de la section entière
        const title = section.querySelector('h1, h2, h3')?.textContent?.trim() || 'Actualité';
        const content = section.textContent?.trim() || '';
        
        newsItems.push({
          newsTitle: title,
          newsContent: content.substring(0, 500),
          newsDate: new Date().toLocaleDateString('fr-FR')
        });
      }
      
      if (newsItems.length >= 5) break;
    }
  } 
  // 4. Utiliser les articles individuels si aucune section trouvée
  else if (newsArticles.length > 0) {
    for (const article of newsArticles) {
      const titleEl = article.querySelector('h1, h2, h3, h4, .title');
      const title = titleEl?.textContent?.trim() || 'Actualité';
      
      const dateEl = article.querySelector('time, .date, [class*="date"], [datetime]');
      let date = dateEl?.textContent?.trim() || '';
      if (!date && dateEl?.getAttribute('datetime')) {
        date = new Date(dateEl.getAttribute('datetime') || '').toLocaleDateString('fr-FR');
      }
      
      const contentEl = article.querySelector('p, .excerpt, .content, .description');
      const content = contentEl?.textContent?.trim() || '';
      
      newsItems.push({
        newsTitle: title,
        newsDate: date || new Date().toLocaleDateString('fr-FR'),
        newsContent: content.substring(0, 500),
        newsUrl: extractLinkFromElement(article, url)
      });
      
      if (newsItems.length >= 5) break;
    }
  }
  
  // 5. Regarder dans les flux RSS s'ils existent
  const rssLink = dom.querySelector('link[type="application/rss+xml"]');
  if (rssLink && newsItems.length === 0) {
    const rssUrl = new URL(rssLink.getAttribute('href') || '', url).href;
    console.log(`Flux RSS détecté: ${rssUrl} - Vous pourriez parser ce flux pour des actualités plus précises`);
  }
  
  // Ajouter des insights
  const insights = [
    ...baseInfo.insights || [],
    {
      type: 'News',
      priority: newsItems.length > 0 ? 'info' : 'medium',
      message: newsItems.length > 0 
        ? `${newsItems.length} actualités trouvées` 
        : 'Aucune actualité trouvée automatiquement'
    }
  ];
  
  // Extraire les mots-clés des actualités pour analyse
  const keywords = extractKeywordsFromNews(newsItems);
  if (keywords.length > 0) {
    insights.push({
      type: 'Keywords',
      priority: 'info',
      message: `Mots-clés principaux: ${keywords.slice(0, 5).join(', ')}`
    });
  }
  
  return {
    ...baseInfo,
    newsItems,
    keywords,
    insights
  };
}

// Fonction utilitaire pour extraire un lien depuis un élément
function extractLinkFromElement(element: Element, baseUrl: string): string {
  const linkEl = element.querySelector('a[href]');
  if (!linkEl) return '';
  
  const href = linkEl.getAttribute('href') || '';
  if (!href) return '';
  
  // Construire l'URL complète
  try {
    return new URL(href, baseUrl).href;
  } catch (e) {
    return href;
  }
}

// Fonction pour extraire les mots-clés des actualités
function extractKeywordsFromNews(newsItems: any[]): string[] {
  // Fusionner tous les titres et contenus
  const allText = newsItems.map(item => 
    `${item.newsTitle} ${item.newsContent}`
  ).join(' ');
  
  // Enlever les mots vides (stopwords)
  const stopwords = ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'à', 'de', 'pour', 'en', 'sur'];
  
  // Tokeniser et compter les occurrences
  const words = allText.toLowerCase()
    .replace(/[^\w\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopwords.includes(word));
  
  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Trier par fréquence
  return Object.entries(wordCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10)
    .map(entry => entry[0]);
}

/**
 * Extraire des informations basiques à partir de l'URL si le scraping échoue
 */
function extractBasicInfo(url: string, type: 'profile' | 'contact' | 'news') {
  console.log("Extraction basique des informations à partir de l'URL");
  
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    const domainParts = domain.split('.');
    
    // Extraire le nom de marque du domaine
    let brandName = domainParts[0];
    
    // Améliorer la présentation du nom
    brandName = brandName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    
    // Déterminer l'industrie à partir de l'URL
    const industry = detectIndustryFromUrl(url);
    
    // Préparer le résultat de base
    const result = {
      name: brandName,
      industry: industry,
      website: url,
      description: `Site web de ${brandName}`,
      socialLinks: [],
      scrapedAt: new Date(),
      insights: [
        {
          type: 'Extraction',
          priority: 'medium',
          message: 'Extraction limitée aux informations de l\'URL'
        }
      ]
    };
    
    // Ajouter des informations spécifiques selon le type
    if (type === 'contact') {
      return {
        ...result,
        contactEmail: '',
        contactPhone: '',
        address: '',
        insights: [
          ...result.insights,
          {
            type: 'Contact',
            priority: 'high',
            message: 'Impossible de récupérer les informations de contact'
          }
        ]
      };
    }
    
    if (type === 'news') {
      return {
        ...result,
        newsItems: [],
        insights: [
          ...result.insights,
          {
            type: 'News',
            priority: 'medium',
            message: 'Impossible de récupérer les actualités'
          }
        ]
      };
    }
    
    return result;
    
  } catch (error) {
    console.error('Erreur lors de l\'extraction depuis l\'URL:', error);
    
    // Retourner un résultat minimal en cas d'erreur
    return {
      name: 'Site inconnu',
      industry: 'Autre',
      website: url,
      error: 'Impossible d\'analyser cette URL',
      scrapedAt: new Date(),
      insights: [
        {
          type: 'Erreur',
          priority: 'high',
          message: 'Échec complet de l\'analyse'
        }
      ]
    };
  }
}

/**
 * Extraire les réseaux sociaux
 */
function extractSocialMedia(dom: Document, url: string) {
  const socialLinks = [];
  
  // Liste des réseaux sociaux connus
  const socialNetworks = [
    { name: 'Facebook', patterns: ['facebook.com', 'fb.com'] },
    { name: 'Instagram', patterns: ['instagram.com', 'insta'] },
    { name: 'Twitter', patterns: ['twitter.com', 'x.com'] },
    { name: 'LinkedIn', patterns: ['linkedin.com'] },
    { name: 'YouTube', patterns: ['youtube.com', 'youtu.be'] },
    { name: 'Pinterest', patterns: ['pinterest.com'] },
    { name: 'TikTok', patterns: ['tiktok.com'] }
  ];
  
  // Chercher les liens vers des réseaux sociaux
  const links = dom.querySelectorAll('a[href]');
  
  for (const link of links) {
    const href = link.getAttribute('href');
    if (!href) continue;
    
    // URL complète
    const fullUrl = href.startsWith('http') ? href : new URL(href, url).href;
    
    // Vérifier si l'URL correspond à un réseau social
    for (const network of socialNetworks) {
      if (network.patterns.some(pattern => fullUrl.includes(pattern))) {
        socialLinks.push({
          platform: network.name,
          url: fullUrl
        });
      break;
      }
    }
    
    // Vérifier aussi les classes et le contenu pour les icônes de réseaux sociaux
    const linkText = link.textContent?.toLowerCase() || '';
    const linkClasses = link.className.toLowerCase();
    
    for (const network of socialNetworks) {
      const networkLower = network.name.toLowerCase();
      if (
        linkText.includes(networkLower) || 
        linkClasses.includes(networkLower) || 
        linkClasses.includes('social') || 
        link.querySelector(`[class*="${networkLower}"], [class*="social"]`)
      ) {
        // Vérifier que ce lien n'a pas déjà été ajouté
        const alreadyAdded = socialLinks.some(sl => sl.url === fullUrl);
        if (!alreadyAdded) {
          socialLinks.push({
            platform: network.name,
            url: fullUrl
          });
        }
      break;
      }
    }
  }
  
  // Filtrer les doublons
  const uniqueLinks = [];
  const urlSet = new Set();
  
  for (const link of socialLinks) {
    if (!urlSet.has(link.url)) {
      urlSet.add(link.url);
      uniqueLinks.push(link);
    }
  }
  
  return uniqueLinks;
}

/**
 * Extraire les produits et services
 */
function extractProductsAndServices(dom: Document) {
  const products = [];
  
  // Chercher des éléments qui pourraient contenir des produits
  const productElements = dom.querySelectorAll(
    '.product, [class*="product"], .item, [class*="item"], .card, [class*="card"]'
  );
  
  for (const element of productElements) {
    // Ignorer les éléments trop petits ou qui ne semblent pas être des produits
    if (element.textContent && element.textContent.length < 20) continue;
    
    // Extraire le nom
    const nameElement = element.querySelector('h2, h3, h4, .name, .title, [class*="name"], [class*="title"]');
    const name = nameElement?.textContent?.trim();
    
    if (!name) continue;
    
    // Extraire le prix
    let price = '';
    const priceElement = element.querySelector('.price, [class*="price"]');
    if (priceElement) {
      price = priceElement.textContent?.trim() || '';
    }
    
    // Extraire la description
    let description = '';
    const descElement = element.querySelector('p, .description, [class*="description"]');
    if (descElement) {
      description = descElement.textContent?.trim() || '';
    }
    
    // Extraire l'image si disponible
    let imageUrl = '';
    const imgElement = element.querySelector('img');
    if (imgElement) {
      imageUrl = imgElement.getAttribute('src') || '';
    }
    
    // Ajouter le produit à la liste
    products.push({
      name,
      price,
      description,
      imageUrl
    });
    
    // Limiter à 10 produits
    if (products.length >= 10) break;
  }
  
  return products;
}

/**
 * Détecter l'industrie à partir du contenu
 */
function detectIndustryFromContent(dom: Document, url: string) {
  // L'ensemble du texte de la page
  const pageText = (dom.body.textContent || '').toLowerCase();
  
  // Mapping de mots-clés vers des industries
  interface IndustryKeywords {
    [key: string]: string[];
  }
  
  const industryKeywords: IndustryKeywords = {
    Technologie: ['tech', 'digital', 'logiciel', 'saas', 'informatique'],
    Ecommerce: ['boutique', 'shop', 'store', 'achat', 'buy', 'panier', 'cart', 'produit', 'product', 'prix', 'price'],
    BeautéCosmétiques: ['beauté', 'beauty', 'cosmétique', 'cosmetic', 'makeup', 'maquillage', 'soin', 'skin', 'parfum'],
    ModeHabillement: ['mode', 'fashion', 'vêtement', 'clothing', 'habits', 'chaussure', 'shoe', 'accessoire'],
    Alimentation: ['food', 'alimentation', 'restaurant', 'cuisine', 'recette', 'recipe', 'gastronomie'],
    Santé: ['santé', 'health', 'médical', 'medical', 'pharmacie', 'pharmacy', 'bien-être', 'wellness'],
    Finance: ['finance', 'banque', 'bank', 'assurance', 'insurance', 'crédit', 'credit', 'investissement', 'investment'],
    Immobilier: ['immobilier', 'real estate', 'property', 'appartement', 'maison', 'house', 'location', 'rent'],
    TourismeVoyage: ['tourisme', 'tourism', 'voyage', 'travel', 'hôtel', 'hotel', 'vacances', 'vacation']
  };
  
  // Définir l'interface pour les scores
  interface IndustryScores {
    [key: string]: number;
  }
  
  // Initialiser les scores avec le type correct
  const scores: IndustryScores = {};
  
  Object.keys(industryKeywords).forEach(industry => {
    scores[industry] = 0;
  });
  
  // Calculer les scores basés sur le contenu
  for (const industry in industryKeywords) {
    for (const keyword of industryKeywords[industry]) {
      const regex = new RegExp(keyword, 'gi');
      const matches = pageText.match(regex) || [];
      scores[industry] += matches.length;
      
      // Donner un bonus pour les mots-clés dans l'URL
      if (url.toLowerCase().includes(keyword)) {
        scores[industry] += 5;
      }
      
      // Donner un bonus pour les mots-clés dans les métadonnées
      const metaDescription = dom.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      if (metaDescription.toLowerCase().includes(keyword)) {
        scores[industry] += 3;
      }
    }
  }
  
  // Trouver l'industrie avec le score le plus élevé
  let bestIndustry = '';
  let bestScore = 0;
  
  for (const [industry, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIndustry = industry;
    }
  }
  
  return bestScore > 0 ? bestIndustry : 'Autre';
}

/**
 * Détecter l'industrie à partir de l'URL
 */
function detectIndustryFromUrl(url: string) {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('beauty') || urlLower.includes('beaute') || urlLower.includes('cosmetic') || urlLower.includes('loreal')) {
    return 'Beauté & Cosmétiques';
  } else if (urlLower.includes('tech') || urlLower.includes('software') || urlLower.includes('digital')) {
    return 'Technologie';
  } else if (urlLower.includes('shop') || urlLower.includes('store') || urlLower.includes('boutique')) {
    return 'E-commerce';
  } else if (urlLower.includes('food') || urlLower.includes('restaurant') || urlLower.includes('cuisine')) {
    return 'Alimentation';
  } else if (urlLower.includes('fashion') || urlLower.includes('mode') || urlLower.includes('clothing')) {
    return 'Mode & Habillement';
  } else if (urlLower.includes('travel') || urlLower.includes('voyage') || urlLower.includes('hotel')) {
    return 'Tourisme & Voyage';
  }
  
  return 'Autre';
}

/**
 * Fonction pour créer un job de scraping
 */
export const createScrapingJob = async (url: string, type: 'profile' | 'contact' | 'news') => {
  if (!url) {
    throw new Error('URL is required');
  }
  
  try {
    console.log(`Création d'un job de scraping pour ${url} de type ${type}`);
    
    // Extraire le nom de domaine pour l'ID
    const domain = new URL(url).hostname;
    const timestamp = Date.now();
    const jobId = `job_${domain.replace(/\./g, '_')}_${timestamp}`;
    
    // Créer le job dans la base de données
    const jobDoc = doc(firestore, 'scrapingJobs', jobId);
    await setDoc(jobDoc, {
      url,
      type,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    // Exécuter le scraping
    const result = await analyzeBrand(url, type);
    
    // Mettre à jour le job avec les résultats
    await setDoc(jobDoc, {
      status: 'completed',
      result,
      updatedAt: Timestamp.now()
    }, { merge: true });
    
    return {
      jobId,
      status: 'completed',
      result
    };
  } catch (error) {
    console.error(`Erreur lors de la création du job de scraping pour ${url}:`, error);
    throw error;
  }
};

/**
 * Fonctions spécifiques pour chaque type de scraping
 */
export const scrapeBrandContactInfo = async (url: string) => {
  return await analyzeBrand(url, 'contact');
};

export const scrapeBrandNews = async (url: string) => {
  return await analyzeBrand(url, 'news');
};

export const scrapeBrandProfile = async (url: string) => {
  return await analyzeBrand(url, 'profile');
};

export const scrapeInfluencerProfile = async (url: string, platform: string = 'unknown') => {
  const result = await analyzeBrand(url, 'profile');
  return {
    ...result,
      platform,
    type: 'influencer'
  };
};

/**
 * Autres fonctions nécessaires exportées
 */
export const generateBrandInsights = async (brandData: any) => {
  const insights = [];
  
  // Analyser les données disponibles et générer des insights
  if (!brandData.name || brandData.name === '') {
    insights.push({
      type: 'Profil',
      priority: 'high',
      message: 'Le nom de la marque est manquant'
    });
  }
  
  if (!brandData.contactEmail && !brandData.contactPhone) {
    insights.push({
      type: 'Contact',
      priority: 'medium',
      message: 'Aucune information de contact trouvée'
    });
  }
  
  return {
    insights,
    analysisDate: new Date()
  };
};

export const getScrapingRecommendations = async (url: string) => {
  const domain = new URL(url).hostname;
  return {
    recommendations: [
      {
        type: 'profile',
        message: `Effectuez un scraping de profil pour ${domain}`,
        priority: 'high'
      },
      {
        type: 'contact',
        message: `Obtenez des informations de contact pour ${domain}`,
        priority: 'medium'
      }
    ]
  };
};

export const getScrapingJobStatus = async (jobId: string) => {
  try {
    const jobDoc = doc(firestore, 'scrapingJobs', jobId);
    const jobSnapshot = await getDoc(jobDoc);
    
    if (!jobSnapshot.exists()) {
      throw new Error('Job not found');
    }
    
    return {
      jobId,
      ...jobSnapshot.data()
    };
  } catch (error) {
    console.error(`Erreur lors de la vérification du job ${jobId}:`, error);
    throw error;
  }
};

/**
 * Recherche avancée d'emails et de contacts dans une page
 */
function findContactEmails(dom: Document, html: string): string[] {
  const emails: string[] = [];
  
  // 1. Recherche par regex dans tout le HTML
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const htmlEmails = html.match(emailRegex) || [];
  
  // 2. Recherche dans les attributs mailto
  const mailtoLinks = dom.querySelectorAll('a[href^="mailto:"]');
  const mailtoEmails = Array.from(mailtoLinks).map(link => {
    const href = link.getAttribute('href') || '';
    return href.replace('mailto:', '').split('?')[0].trim();
  });
  
  // 3. Recherche dans les sections de contact
  const contactSections = dom.querySelectorAll('.contact, #contact, [class*="contact"], [id*="contact"]');
  let contactSectionEmails: string[] = [];
  
  contactSections.forEach(section => {
    const sectionHtml = section.innerHTML;
    const sectionEmailMatches = sectionHtml.match(emailRegex) || [];
    contactSectionEmails = [...contactSectionEmails, ...sectionEmailMatches];
  });
  
  // 4. Fusion et déduplication
  const allEmails = [...new Set([...htmlEmails, ...mailtoEmails, ...contactSectionEmails])];
  
  // 5. Filtrage des emails pertinents (marketing, communication, etc.)
  const relevantEmails = allEmails.filter(email => {
    const lowerEmail = email.toLowerCase();
    return (
      lowerEmail.includes('market') ||
      lowerEmail.includes('comm') || 
      lowerEmail.includes('pr@') ||
      lowerEmail.includes('press') ||
      lowerEmail.includes('media') ||
      lowerEmail.includes('contact') ||
      lowerEmail.includes('info') ||
      lowerEmail.includes('collab') ||
      lowerEmail.includes('partner') ||
      lowerEmail.includes('influenc')
    );
  });
  
  // Si on a des emails pertinents, les retourner en priorité
  if (relevantEmails.length > 0) {
    return relevantEmails;
  }
  
  // Sinon retourner tous les emails trouvés
  return allEmails;
}