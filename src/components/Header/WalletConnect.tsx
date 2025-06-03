import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

// Types
type WalletType = 'metamask' | 'trustwallet' | 'walletconnect';

interface WalletConnectProps {
  onConnect: (address: string, provider: any) => void;
  onDisconnect: () => void;
  isConnected?: boolean;
  walletAddress?: string | null;
}

interface WalletOption {
  id: WalletType;
  name: string;
  description: string;
  icon: string;
  installed: boolean;
  checkInstalled: () => boolean;
}

// Constants
const PROJECT_ID = '0e4c77fcfecbb83c15fe4fbf96791f8b';

// Global AppKit instance
let appKit: any = null;

// Wallet detection utilities
const walletDetectors = {
  metamask: () => {
    const ethereum = (window as any).ethereum;
    return !!(ethereum && ethereum.isMetaMask && !ethereum.isTrust);
  },
  trustwallet: () => {
    const ethereum = (window as any).ethereum;
    return !!(ethereum && (ethereum.isTrust || ethereum.isTrustWallet));
  },
  walletconnect: () => true // Always available via WalletConnect
};

// Wallet connection handlers
const walletConnectors = {
  metamask: async (): Promise<{ address: string; provider: any }> => {
    if (!walletDetectors.metamask()) {
      window.open('https://metamask.io/download/', '_blank');
      throw new Error('MetaMask not installed');
    }

    try {
      const ethereum = (window as any).ethereum;
      
      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      
      return {
        address: accounts[0],
        provider: provider
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the request');
      }
      throw error;
    }
  },

  trustwallet: async (): Promise<{ address: string; provider: any }> => {
    if (!walletDetectors.trustwallet()) {
      // Try to open Trust Wallet mobile app or redirect to download
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Try to open Trust Wallet app
        window.location.href = 'https://link.trustwallet.com/open_url?coin_id=60&url=' + encodeURIComponent(window.location.href);
        throw new Error('Opening Trust Wallet app...');
      } else {
        window.open('https://trustwallet.com/download', '_blank');
        throw new Error('Trust Wallet not installed');
      }
    }

    try {
      const ethereum = (window as any).ethereum;
      
      // Request account access
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      
      return {
        address: accounts[0],
        provider: provider
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the request');
      }
      throw error;
    }
  },

  walletconnect: async (): Promise<{ address: string; provider: any }> => {
    if (appKit) {
      console.log('🚀 Opening WalletConnect...');
      appKit.open();
      throw new Error('Please scan QR code with your wallet...');
    } else {
      throw new Error('WalletConnect not ready. Please wait and try again.');
    }
  }
};

// AppKit initialization for WalletConnect
const initializeAppKit = async (
  onConnect: (address: string, provider: any) => void,
  onDisconnect: () => void,
  setAppKitReady: (ready: boolean) => void
): Promise<void> => {
  try {
    console.log('🔄 Initializing WalletConnect...');
    
    const [appKitModule, adapterModule, networksModule] = await Promise.all([
      import('@reown/appkit').catch(() => null),
      import('@reown/appkit-adapter-ethers5').catch(() => null),
      import('@reown/appkit/networks').catch(() => null)
    ]);

    if (!appKitModule || !adapterModule || !networksModule) {
      throw new Error('WalletConnect dependencies not found');
    }

    const { createAppKit } = appKitModule;
    const { EthersAdapter } = adapterModule;
    const { mainnet, arbitrum, bsc, polygon } = networksModule;

    const ethersAdapter = new EthersAdapter();

    appKit = createAppKit({
      adapters: [ethersAdapter],
      projectId: PROJECT_ID,
      networks: [mainnet, arbitrum, bsc, polygon],
      metadata: {
        name: 'BitFlow App',
        description: 'BitFlow DeFi Platform',
        url: window.location.origin,
        icons: [`${window.location.origin}/favicon.ico`]
      },
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#f7931a'
      }
    });

    appKit.subscribeAccount((account: any) => {
      console.log('📱 WalletConnect account changed:', account);
      if (account.isConnected && account.address) {
        const provider = ethersAdapter.getWalletProvider();
        onConnect(account.address, provider);
      } else {
        onDisconnect();
      }
    });

    setAppKitReady(true);
    console.log('🎉 WalletConnect initialized successfully!');
    
  } catch (error) {
    console.error('💥 Error initializing WalletConnect:', error);
    setAppKitReady(false);
  }
};

// Utility functions
const formatAddress = (address: string): string => 
  `${address.slice(0, 6)}...${address.slice(-4)}`;

// Main WalletConnect component
const WalletConnect: React.FC<WalletConnectProps> = ({ 
  onConnect, 
  onDisconnect, 
  isConnected = false, 
  walletAddress = null 
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectingWallet, setConnectingWallet] = useState<WalletType | null>(null);
  const [error, setError] = useState<string>('');
  const [appKitReady, setAppKitReady] = useState<boolean>(false);

  // Initialize WalletConnect
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeAppKit(onConnect, onDisconnect, setAppKitReady);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onConnect, onDisconnect]);

  // Check existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check WalletConnect first
        if (appKit?.getAccount()?.isConnected) {
          const account = appKit.getAccount();
          if (account.address && !isConnected) {
            onConnect(account.address, appKit.getProvider());
          }
          return;
        }

        // Check injected wallet (MetaMask/Trust Wallet)
        const ethereum = (window as any).ethereum;
        if (ethereum && !isConnected) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            onConnect(accounts[0], provider);
          }
        }
      } catch (error) {
        console.log('No existing connection found');
      }
    };

    const timer = setTimeout(checkConnection, 1500);
    return () => clearTimeout(timer);
  }, [onConnect, isConnected]);

  // Listen for account changes
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        onDisconnect();
      } else if (accounts[0] !== walletAddress) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        onConnect(accounts[0], provider);
      }
    };

    const handleChainChanged = () => {
      // Reload when chain changes to avoid issues
      window.location.reload();
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [onConnect, onDisconnect, walletAddress]);

  // Wallet options with memoization
  const walletOptions: WalletOption[] = useMemo(() => [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Most popular Ethereum wallet',
      icon: '🦊',
      installed: walletDetectors.metamask(),
      checkInstalled: walletDetectors.metamask
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      description: 'Multi-crypto mobile wallet',
      icon: '🛡️',
      installed: walletDetectors.trustwallet(),
      checkInstalled: walletDetectors.trustwallet
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: appKitReady 
        ? 'Connect any wallet via QR code' 
        : 'Preparing connection...',
      icon: '🔗',
      installed: appKitReady,
      checkInstalled: () => appKitReady
    }
  ], [appKitReady]);

  // Handle wallet connection
  const handleConnect = useCallback(async (walletType: WalletType) => {
    setError('');
    setIsConnecting(true);
    setConnectingWallet(walletType);

    try {
      const { address, provider } = await walletConnectors[walletType]();
      onConnect(address, provider);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message);
      // Don't close modal on error unless it's a redirect
      if (err.message.includes('Opening') || err.message.includes('scan QR')) {
        setIsModalOpen(false);
      }
    } finally {
      setIsConnecting(false);
      setConnectingWallet(null);
    }
  }, [onConnect]);

  // Handle disconnection
  const handleDisconnect = useCallback(() => {
    if (appKit?.getAccount()?.isConnected) {
      appKit.disconnect();
    }
    onDisconnect();
  }, [onDisconnect]);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setError('');
  }, []);

  // Styles object
  const styles = useMemo(() => ({
    container: { display: 'flex', alignItems: 'center' },
    
    button: {
      background: 'linear-gradient(135deg, #f7931a, #ff8c00)',
      border: 'none',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      opacity: isConnecting ? 0.6 : 1,
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontFamily: 'Montserrat, sans-serif',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      boxShadow: '0 4px 15px rgba(247, 147, 26, 0.3)'
    },
    
    walletInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255,255,255,0.1)',
      padding: '8px 16px',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    
    address: {
      fontFamily: 'Roboto Mono, monospace',
      color: 'white',
      fontSize: '14px',
      background: 'rgba(0, 230, 118, 0.1)',
      padding: '4px 8px',
      borderRadius: '6px',
      border: '1px solid rgba(0, 230, 118, 0.3)'
    },
    
    disconnect: {
      background: 'rgba(239,68,68,0.2)',
      border: '1px solid rgba(239,68,68,0.5)',
      color: '#fca5a5',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    
    overlay: {
      position: 'fixed' as const,
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    },
    
    modal: {
      background: 'linear-gradient(135deg, rgba(10, 14, 23, 0.95), rgba(247, 147, 26, 0.1))',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '450px',
      maxHeight: '90vh',
      margin: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      border: '1px solid rgba(247, 147, 26, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)'
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    
    title: { 
      margin: 0, 
      color: 'white', 
      fontSize: '20px', 
      fontWeight: '600',
      fontFamily: 'Montserrat, sans-serif'
    },
    
    close: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 0.7)',
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    
    list: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
      overflowY: 'auto' as const,
      flex: 1
    },
    
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    
    icon: {
      width: '48px',
      height: '48px',
      background: 'rgba(247, 147, 26, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      flexShrink: 0,
      border: '1px solid rgba(247, 147, 26, 0.2)'
    },
    
    details: { flex: 1 },
    
    name: { 
      color: 'white', 
      fontWeight: '600', 
      marginBottom: '4px',
      fontSize: '16px',
      fontFamily: 'Montserrat, sans-serif'
    },
    
    desc: { 
      color: 'rgba(255,255,255,0.7)', 
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif'
    },
    
    loading: { 
      fontSize: '20px', 
      animation: 'spin 1s infinite linear',
      color: 'rgba(255, 255, 255, 0.7)'
    },
    
    badge: {
      background: 'rgba(247, 147, 26, 0.2)',
      color: '#f7931a',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    
    error: {
      margin: '0 24px 24px',
      padding: '16px',
      background: 'rgba(244, 67, 54, 0.1)',
      border: '1px solid rgba(244, 67, 54, 0.3)',
      borderRadius: '12px',
      color: '#F44336',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif'
    }
  }), [isConnecting]);

  return (
    <div style={styles.container}>
      {!isConnected ? (
        <button 
          style={styles.button} 
          onClick={() => setIsModalOpen(true)}
          disabled={isConnecting}
          onMouseEnter={(e) => {
            if (!isConnecting) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(247, 147, 26, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(247, 147, 26, 0.3)';
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div style={styles.walletInfo}>
          <span style={styles.address}>
            {walletAddress ? formatAddress(walletAddress) : 'Connected'}
          </span>
          <button 
            style={styles.disconnect} 
            onClick={handleDisconnect}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.3)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            Disconnect
          </button>
        </div>
      )}

      {isModalOpen && (
        <div style={styles.overlay} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.header}>
              <h3 style={styles.title}>Connect Wallet</h3>
              <button 
                style={styles.close} 
                onClick={handleCloseModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                ×
              </button>
            </div>

            <div style={styles.list}>
              {walletOptions.map(wallet => (
                <button
                  key={wallet.id}
                  style={{
                    ...styles.item,
                    borderStyle: wallet.installed ? 'solid' : 'dashed',
                    opacity: isConnecting ? 0.6 : 1
                  }}
                  onClick={() => handleConnect(wallet.id)}
                  disabled={isConnecting}
                  onMouseEnter={(e) => {
                    if (!isConnecting) {
                      e.currentTarget.style.background = 'rgba(247, 147, 26, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(247, 147, 26, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.icon}>{wallet.icon}</div>
                  <div style={styles.details}>
                    <div style={styles.name}>{wallet.name}</div>
                    <div style={styles.desc}>
                      {wallet.installed ? wallet.description : 'Click to install or connect'}
                    </div>
                  </div>
                  
                  {isConnecting && connectingWallet === wallet.id ? (
                    <div style={styles.loading}>⟳</div>
                  ) : !wallet.installed && wallet.id !== 'walletconnect' ? (
                    <div style={styles.badge}>Install</div>
                  ) : null}
                </button>
              ))}
            </div>

            {error && (
              <div style={styles.error}>
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @media (max-width: 480px) {
          .wallet-modal { 
            margin: 10px !important; 
            max-width: none !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default WalletConnect;