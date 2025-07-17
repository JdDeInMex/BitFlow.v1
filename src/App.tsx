// src/App.tsx

import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Header from './components/Header/Header';
import { AppKitProvider } from './components/AppKitProvider';
import Architecture from './components/Architecture/Architecture';
import UseCases from './components/UseCases/UseCases';
import Roadmap from './components/Roadmap/Roadmap';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Home from './components/Home/Home';
import Tokenomics from './components/Tokenomics/Tokenomics.tsx';

// Novos imports para SEO
import { SEOHead } from './components/SEO/SEOhead.tsx';
import { SEO_CONFIG } from './config/seoConfig';
import { generateCanonicalUrl } from './utils/seoHelpers';

type Page = 'home' | 'about' | 'tokenomics' | 'architecture' | 'use-cases' | 'roadmap' | 'docs' | 'solutions';

// Simple analytics tracking
const trackEvent = (eventName: string, properties?: any) => {
  // Google Analytics (if loaded)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  
  // Console log for debugging
  console.log('Analytics Event:', eventName, properties);
};

// Main App Content Component (inside providers)
const AppContent: React.FC = () => {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Sincronizar com URL ao carregar
  useEffect(() => {
    const path = window.location.pathname;
    const pageMap: Record<string, Page> = {
      '/': 'home',
      '/about': 'about',
      '/tokenomics': 'tokenomics',
      '/architecture': 'architecture',
      '/use-cases': 'use-cases',
      '/roadmap': 'roadmap',
      '/docs': 'docs',
      '/solutions': 'solutions'
    };
    
    const page = pageMap[path] || 'home';
    setCurrentPage(page);
    
    // Track page view
    trackEvent('page_view', {
      page_title: SEO_CONFIG.pages[page]?.title || document.title,
      page_location: window.location.href,
      page_path: path
    });
    
  }, []);
  
  // Estados para gerenciar a conexão da carteira
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [currentAPY, setCurrentAPY] = useState<number>(1500);

  // Função para lidar com a conexão da carteira
  const handleConnect = () => {
    console.log('Connect initiated from Home component');
    trackEvent('connect_wallet_clicked', {
      event_category: 'wallet',
      event_label: 'connect_attempt'
    });
  };

  // Updated function to handle wallet connection with parameters
  const handleWalletConnected = (address: string, providerInstance: any) => {
    setIsConnected(true);
    setWalletAddress(address);
    setProvider(providerInstance);
    
    // Save connection to localStorage
    localStorage.setItem('wallet_connected', 'true');
    localStorage.setItem('wallet_address', address);
    
    // Track wallet connection
    trackEvent('wallet_connected', {
      event_category: 'wallet',
      event_label: 'connection_success',
      wallet_type: providerInstance?.constructor?.name || 'unknown'
    });
    
    console.log('Wallet connected:', { address, provider: providerInstance });
  };

  // Função para lidar com a desconexão da carteira
  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setProvider(null);
    
    // Clear localStorage
    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_address');
    
    // Track wallet disconnection
    trackEvent('wallet_disconnected', {
      event_category: 'wallet',
      event_label: 'disconnect'
    });
    
    console.log('Wallet disconnected');
  };

  // Função para lidar com a redução do APY após o término do temporizador
  const handleCountdownComplete = () => {
    const newAPY = Math.max(currentAPY - 10, 0);
    setCurrentAPY(newAPY);
    
    // Track APY change
    trackEvent('apy_decreased', {
      event_category: 'presale',
      event_label: 'countdown_complete',
      value: newAPY
    });
    
    console.log('Presale countdown completed, new APY:', newAPY);
  };

  // Função para lidar com compras com tracking
  const handlePurchase = (method: 'card' | 'crypto', amount: number, currency: string) => {
    console.log(`Purchase completed:`, { method, amount, currency });
    
    // Track purchase attempt
    trackEvent('purchase_attempt', {
      event_category: 'ecommerce',
      event_label: `${method}_purchase`,
      value: amount,
      currency: currency
    });
    
    if (method === 'card') {
      console.log('Processing card payment...');
      trackEvent('card_payment_initiated', {
        event_category: 'ecommerce',
        event_label: 'card_payment',
        value: amount
      });
      
      // Simular sucesso do pagamento
      setTimeout(() => {
        console.log('Card payment successful');
        trackEvent('purchase_success', {
          event_category: 'ecommerce',
          event_label: 'card_payment_success',
          value: amount,
          currency: currency
        });
      }, 2000);
      
    } else {
      console.log('Processing crypto payment...');
      trackEvent('crypto_payment_initiated', {
        event_category: 'ecommerce',
        event_label: 'crypto_payment',
        value: amount
      });
      
      // Track crypto payment success
      trackEvent('purchase_success', {
        event_category: 'ecommerce',
        event_label: 'crypto_payment_success',
        value: amount,
        currency: currency
      });
    }
  };

  // Check for existing wallet connection on app load
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const wasConnected = localStorage.getItem('wallet_connected');
        const savedAddress = localStorage.getItem('wallet_address');
        
        if (wasConnected && savedAddress) {
          console.log('Previous connection found, AppKit will handle reconnection');
          trackEvent('wallet_auto_reconnect', {
            event_category: 'wallet',
            event_label: 'auto_reconnect'
          });
        }
      } catch (error) {
        console.log('Could not check previous connection:', error);
        handleDisconnect();
      }
    };

    const timer = setTimeout(checkExistingConnection, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Função para navegar entre páginas
  const navigateToPage = (page: string) => {
    const validPages: Page[] = ['home', 'about', 'tokenomics', 'architecture', 'use-cases', 'roadmap', 'docs', 'solutions'];
    const validatedPage: Page = validPages.includes(page as Page) ? (page as Page) : 'home';
    
    setCurrentPage(validatedPage);
    
    const urlMap: Record<Page, string> = {
      'home': '/',
      'about': '/about',
      'tokenomics': '/tokenomics',
      'architecture': '/architecture',
      'use-cases': '/use-cases',
      'roadmap': '/roadmap',
      'docs': '/docs',
      'solutions': '/solutions'
    };
    
    const newUrl = urlMap[validatedPage];
    window.history.pushState({ page: validatedPage }, '', newUrl);
    
    // Track navigation
    trackEvent('page_navigation', {
      event_category: 'navigation',
      event_label: validatedPage,
      page_location: `${window.location.origin}${newUrl}`
    });
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Lidar com navegação do browser (botão voltar/avançar)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'home';
      setCurrentPage(page);
      
      // Track browser navigation
      trackEvent('browser_navigation', {
        event_category: 'navigation',
        event_label: page,
        page_location: window.location.href
      });
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Adicionar listener para eventos de navegação customizados
  useEffect(() => {
    const handleCustomNavigation = (event: CustomEvent) => {
      const page = event.detail as string;
      navigateToPage(page);
    };

    window.addEventListener('navigate', handleCustomNavigation as EventListener);
    
    return () => {
      window.removeEventListener('navigate', handleCustomNavigation as EventListener);
    };
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    // Replace with your actual Google Analytics ID
    const GA_ID = 'G-XXXXXXXXXX';
    
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      // Add Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      // Add gtag configuration
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true
        });
      `;
      document.head.appendChild(configScript);
    }
  }, []);

  // Função para renderizar o conteúdo baseado na página atual
  const renderPageContent = () => {
    // Get SEO configuration for current page
    const pageConfig = SEO_CONFIG.pages[currentPage] || SEO_CONFIG.pages.home;
    const canonicalUrl = generateCanonicalUrl(currentPage === 'home' ? '/' : `/${currentPage}`);
    
    // Common props for Home component
    const homeProps = {
      isConnected,
      walletAddress,
      provider,
      currentAPY,
      onCountdownComplete: handleCountdownComplete,
      onConnect: handleConnect,
      onPurchase: handlePurchase
    };
    
    return (
      <>
        {/* SEO Component - IMPORTANTE: Adicione isto antes do conteúdo */}
        <SEOHead
          title={pageConfig.title}
          description={pageConfig.description}
          keywords={pageConfig.keywords}
          canonicalUrl={canonicalUrl}
          jsonLd={pageConfig.jsonLd}
        />
        
        {/* Conteúdo da página */}
        {(() => {
          switch (currentPage) {
            case 'home':
              return <Home {...homeProps} />;
            case 'about':
              return <About />;
            case 'tokenomics':
              return <Tokenomics />;
            case 'architecture':
              return <Architecture />;
            case 'use-cases':
              return <UseCases />;
            case 'roadmap':
              return <Roadmap />;
            default:
              return <Home {...homeProps} />;
          }
        })()}
      </>
    );
  };

  return (
    <div className="app">
      <Header 
        onConnect={handleWalletConnected}
        onDisconnect={handleDisconnect}
        isConnected={isConnected}
        walletAddress={walletAddress}
        navigateToPage={navigateToPage}
        currentPage={currentPage}
      />
      
      <main className="main-content">
        {renderPageContent()}
      </main>
      
      <Footer />
    </div>
  );
};

// Main App Component with Providers
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AppKitProvider>
        <AppContent />
      </AppKitProvider>
    </HelmetProvider>
  );
};

export default App;