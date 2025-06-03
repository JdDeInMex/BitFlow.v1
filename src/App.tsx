import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { AppKitProvider } from './components/AppKitProvider';
import Architecture from './components/Architecture/Architecture';
import UseCases from './components/UseCases/UseCases';
import Roadmap from './components/Roadmap/Roadmap';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Home from './components/home/Home';

type Page = 'home' | 'about' | 'architecture' | 'use-cases' | 'roadmap' | 'docs';

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
      '/architecture': 'architecture',
      '/use-cases': 'use-cases',
      '/roadmap': 'roadmap',
      '/docs': 'docs'
    };
    
    const page = pageMap[path] || 'home';
    setCurrentPage(page);
  }, []);
  
  // Estados para gerenciar a conexão da carteira
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [currentAPY, setCurrentAPY] = useState<number>(1500);

  // Função para lidar com a conexão da carteira (fixed signature to match Home component)
  const handleConnect = () => {
    // This will be called when wallet connection is successful
    // The actual connection logic should be handled by the wallet provider/AppKit
    console.log('Connect initiated from Home component');
  };

  // Updated function to handle wallet connection with parameters
  const handleWalletConnected = (address: string, providerInstance: any) => {
    setIsConnected(true);
    setWalletAddress(address);
    setProvider(providerInstance);
    
    // Save connection to localStorage
    localStorage.setItem('wallet_connected', 'true');
    localStorage.setItem('wallet_address', address);
    
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
    
    console.log('Wallet disconnected');
  };

  // Função para lidar com a redução do APY após o término do temporizador
  const handleCountdownComplete = () => {
    setCurrentAPY(prev => Math.max(prev - 10, 0));
    console.log('Presale countdown completed, new APY:', currentAPY - 10);
  };

  // Função para lidar com compras
  const handlePurchase = (method: 'card' | 'crypto', amount: number, currency: string) => {
    console.log(`Purchase completed:`, { method, amount, currency });
    
    // Aqui você implementaria a lógica real de compra
    if (method === 'card') {
      // Integração com processador de pagamento (Stripe, PayPal, etc.)
      console.log('Processing card payment...');
      
      // Simular sucesso do pagamento
      setTimeout(() => {
        console.log('Card payment successful');
        // Aqui você atualizaria o estado do usuário
      }, 2000);
      
    } else {
      // Integração com Web3 para pagamento crypto
      console.log('Processing crypto payment...');
      
      // A transação já foi processada no componente Home
      // Aqui você pode adicionar lógica adicional se necessário
    }
  };

  // Check for existing wallet connection on app load
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const wasConnected = localStorage.getItem('wallet_connected');
        const savedAddress = localStorage.getItem('wallet_address');
        
        if (wasConnected && savedAddress) {
          // Try to reconnect automatically with AppKit/Wagmi
          // The Header component will handle auto-reconnection through Wagmi
          console.log('Previous connection found, AppKit will handle reconnection');
        }
      } catch (error) {
        console.log('Could not check previous connection:', error);
        handleDisconnect();
      }
    };

    // Small delay to ensure everything is loaded
    const timer = setTimeout(checkExistingConnection, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Função para navegar entre páginas (fixed to accept string and convert to Page)
  const navigateToPage = (page: string) => {
    // Validate that the page is a valid Page type
    const validPages: Page[] = ['home', 'about', 'architecture', 'use-cases', 'roadmap', 'docs'];
    const validatedPage: Page = validPages.includes(page as Page) ? (page as Page) : 'home';
    
    setCurrentPage(validatedPage);
    
    // Atualizar URL sem recarregar a página
    const urlMap: Record<Page, string> = {
      'home': '/',
      'about': '/about',
      'architecture': '/architecture',
      'use-cases': '/use-cases',
      'roadmap': '/roadmap',
      'docs': '/docs'
    };
    
    const newUrl = urlMap[validatedPage];
    window.history.pushState({ page: validatedPage }, '', newUrl);
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  // Lidar com navegação do browser (botão voltar/avançar)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'home';
      setCurrentPage(page);
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

  // Show connection status in console for debugging
  useEffect(() => {
    console.log('App state:', {
      isConnected,
      walletAddress,
      currentAPY,
      currentPage
    });
  }, [isConnected, walletAddress, currentAPY, currentPage]);

  // Função para renderizar o conteúdo baseado na página atual
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            isConnected={isConnected}
            walletAddress={walletAddress}
            provider={provider}
            currentAPY={currentAPY}
            onCountdownComplete={handleCountdownComplete}
            onConnect={handleConnect} // Now matches expected signature
            onPurchase={handlePurchase}
          />
        );
      case 'about':
        return <About />;
      case 'architecture':
        return <Architecture />;
      case 'use-cases':
        return <UseCases />;
      case 'roadmap':
        return <Roadmap />;
      default:
        return (
          <Home 
            isConnected={isConnected}
            walletAddress={walletAddress}
            provider={provider}
            currentAPY={currentAPY}
            onCountdownComplete={handleCountdownComplete}
            onConnect={handleConnect}
            onPurchase={handlePurchase}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header 
        onConnect={handleWalletConnected} // Use the function that accepts parameters
        onDisconnect={handleDisconnect}
        isConnected={isConnected}
        walletAddress={walletAddress}
        navigateToPage={navigateToPage} // Now accepts string parameter
        currentPage={currentPage}
      />
      
      <main className="main-content">
        {renderPageContent()}
      </main>
      
      <Footer />
    </div>
  );
};

// Main App Component with AppKit Provider
const App: React.FC = () => {
  return (
    <AppKitProvider>
      <AppContent />
    </AppKitProvider>
  );
};

export default App;