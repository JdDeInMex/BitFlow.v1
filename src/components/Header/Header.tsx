import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, polygon, bsc } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import './Header.css';

// Constants
const PROJECT_ID = '9b890db3767b4ddae3e99351d516e9a1';

// Singleton QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (garbage collection time)
    },
  },
});

// App metadata - UPDATED FOR HYPERLAYER0
const METADATA = {
  name: 'HyperLayer0',
  description: 'The Future of Pure Utility Infrastructure',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: [`${typeof window !== 'undefined' ? window.location.origin : ''}/favicon.ico`]
};

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum, polygon, bsc],
  projectId: PROJECT_ID,
  ssr: false
});

// Create modal with HyperLayer0 theme
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum, polygon, bsc],
  projectId: PROJECT_ID,
  metadata: METADATA,
  features: {
    analytics: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#00ff88', // HyperLayer0 green
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#00ff88',
    '--w3m-border-radius-master': '8px',
  }
});

// Types
interface HeaderProps {
  onConnect: (address: string, provider: any) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  walletAddress: string | null;
  navigateToPage?: (page: string) => void;
  currentPage?: string;
}

interface NavigationItem {
  key: string;
  label: string;
  icon?: string;
}

// Navigation items - UPDATED WITH TOKENOMICS
const NAVIGATION_ITEMS: NavigationItem[] = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'about', label: 'About', icon: 'ℹ️' },
  { key: 'tokenomics', label: 'Tokenomics', icon: '💎' }, // NOVA ABA
  { key: 'architecture', label: 'Architecture', icon: '🏗️' },
  { key: 'use-cases', label: 'Use Cases', icon: '💡' },
  { key: 'roadmap', label: 'Roadmap', icon: '🗺️' }
];

// Wallet icons mapping
const WALLET_ICONS: Record<string, string> = {
  'MetaMask': '🦊',
  'WalletConnect': '🔗',
  'Coinbase Wallet': '🔵',
  'Trust Wallet': '🛡️',
  'Rainbow': '🌈',
  'Injected': '💳',
  'WalletConnect V2': '🔗',
  'Coinbase': '🔵',
  'Trust': '🛡️',
  'Ledger': '📱',
  'Phantom': '👻',
  'OKX Wallet': '🟢',
  'Brave Wallet': '🦁'
};

// Utility functions
const formatAddress = (address: string): string => 
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const formatBalance = (balance: any): string => {
  if (!balance) return '';
  const formatted = parseFloat(balance.formatted).toFixed(4);
  return `${formatted} ${balance.symbol}`;
};

// Logo component - UPDATED FOR HYPERLAYER0
const Logo: React.FC<{ onClick: () => void }> = React.memo(({ onClick }) => (
  <div className="header-logo" onClick={onClick}>
    <div className="logo-icon">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="50%" stopColor="#00ccff" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#logoGradient)" />
        <path 
          d="M10 12 L16 8 L22 12 L16 16 Z" 
          fill="white" 
          opacity="0.9"
        />
        <path 
          d="M10 16 L16 12 L22 16 L16 20 Z" 
          fill="white" 
          opacity="0.7"
        />
        <path 
          d="M10 20 L16 16 L22 20 L16 24 Z" 
          fill="white" 
          opacity="0.5"
        />
      </svg>
    </div>
    <span className="logo-text">HyperLayer0</span>
  </div>
));

Logo.displayName = 'Logo';

// Navigation component
const Navigation: React.FC<{ 
  onNavigate: (page: string) => void;
  currentPage?: string;
}> = React.memo(({ onNavigate, currentPage }) => (
  <nav className="header-nav desktop-nav">
    {NAVIGATION_ITEMS.map(({ key, label }) => (
      <button 
        key={key}
        className={`nav-item ${currentPage === key ? 'active' : ''}`}
        onClick={() => onNavigate(key)}
        type="button"
      >
        {label}
      </button>
    ))}
  </nav>
));

Navigation.displayName = 'Navigation';

// Mobile navigation component
const MobileNavigation: React.FC<{
  isOpen: boolean;
  onNavigate: (page: string) => void;
  onClose: () => void;
  currentPage?: string;
  walletInfo?: {
    address: string;
    balance: any;
    icon: string;
  };
}> = React.memo(({ isOpen, onNavigate, onClose, currentPage, walletInfo }) => (
  <>
    <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
      <div className="mobile-nav-content">
        {NAVIGATION_ITEMS.map(({ key, label, icon }) => (
          <button 
            key={key}
            className={`mobile-nav-item ${currentPage === key ? 'active' : ''}`}
            onClick={() => {
              onNavigate(key);
              onClose();
            }}
            type="button"
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
        
        {walletInfo && (
          <div className="mobile-wallet-info">
            <div className="mobile-wallet-details">
              <span>{walletInfo.icon}</span>
              <div>
                <div>{formatAddress(walletInfo.address)}</div>
                {walletInfo.balance && (
                  <div className="mobile-balance">
                    {formatBalance(walletInfo.balance)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>

    {isOpen && (
      <div 
        className="mobile-overlay"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      />
    )}
  </>
));

MobileNavigation.displayName = 'MobileNavigation';

// Wallet connection button
const ConnectWalletButton: React.FC<{ onClick: () => void }> = React.memo(({ onClick }) => (
  <button 
    className="connect-wallet-btn"
    onClick={onClick}
    type="button"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path 
        d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 12H8M16 12L13 9M16 12L13 15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
    <span>Connect Wallet</span>
  </button>
));

ConnectWalletButton.displayName = 'ConnectWalletButton';

// Connected wallet info
const WalletInfo: React.FC<{
  address: string;
  balance: any;
  connectorName?: string;
  onDisconnect: () => void;
}> = React.memo(({ address, balance, connectorName, onDisconnect }) => {
  const walletIcon = WALLET_ICONS[connectorName || ''] || '💳';

  return (
    <div className="wallet-connected">
      <div className="wallet-info">
        <div className="wallet-header">
          <span className="wallet-icon">{walletIcon}</span>
          <div className="wallet-details">
            <div className="wallet-address">
              {formatAddress(address)}
            </div>
            {balance && (
              <div className="wallet-balance">
                {formatBalance(balance)}
              </div>
            )}
          </div>
        </div>
        <div className="connection-status">
          <div className="status-dot"></div>
          Connected via {connectorName || 'Wallet'}
        </div>
      </div>
      <button 
        className="disconnect-btn"
        onClick={onDisconnect}
        title="Disconnect Wallet"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path 
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
});

WalletInfo.displayName = 'WalletInfo';

// Main header content component
const HeaderContent: React.FC<HeaderProps> = ({
  onConnect,
  onDisconnect,
  isConnected,
  walletAddress,
  navigateToPage,
  currentPage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { address, isConnected: wagmiConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  
  // Fetch ETH balance
  const { data: balance } = useBalance({
    address: address,
  });

  // Handle scroll effect
  useEffect(() => {
    let timeoutId: number;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setScrolled(window.scrollY > 20);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Sync with Wagmi state
  useEffect(() => {
    if (wagmiConnected && address) {
      console.log('Connected with:', connector?.name, 'Address:', address);
      if (!isConnected) {
        onConnect(address, connector);
      }
    } else if (!wagmiConnected && isConnected) {
      onDisconnect();
    }
  }, [wagmiConnected, address, isConnected, onConnect, onDisconnect, connector]);

  // Handle navigation
  const handleNavigate = useCallback((page: string) => {
    if (navigateToPage) {
      navigateToPage(page);
    } else {
      window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
    }
  }, [navigateToPage]);

  // Handle wallet connection
  const handleConnectWallet = useCallback(async () => {
    try {
      await open();
    } catch (error) {
      console.error('Error opening wallet selection modal:', error);
    }
  }, [open]);

  // Handle wallet disconnection
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
    onDisconnect();
  }, [disconnect, onDisconnect]);

  // Handle mobile menu toggle
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoized wallet info for mobile
  const mobileWalletInfo = useMemo(() => {
    if (!wagmiConnected || !address) return undefined;
    
    return {
      address: address,
      balance,
      icon: WALLET_ICONS[connector?.name || ''] || '💳'
    };
  }, [wagmiConnected, address, balance, connector?.name]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Logo onClick={() => handleNavigate('home')} />
        
        <Navigation onNavigate={handleNavigate} currentPage={currentPage} />

        <div className="header-actions">
          {wagmiConnected && address ? (
            <WalletInfo
              address={address}
              balance={balance}
              connectorName={connector?.name}
              onDisconnect={handleDisconnectWallet}
            />
          ) : (
            <ConnectWalletButton onClick={handleConnectWallet} />
          )}

          <button 
            className="mobile-menu-btn"
            onClick={handleMenuToggle}
            type="button"
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <MobileNavigation
        isOpen={isMenuOpen}
        onNavigate={handleNavigate}
        onClose={handleMenuClose}
        currentPage={currentPage}
        walletInfo={mobileWalletInfo}
      />
    </header>
  );
};

// Main Header component with providers
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <HeaderContent {...props} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Header;