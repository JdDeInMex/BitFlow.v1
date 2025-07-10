import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Home.css';
import { 
  switchToNetwork, 
  getWalletBalance, 
  getTokenBalance,
  sendNativeTransaction,
  sendTokenTransaction,
  getProviderErrorMessage,
  analyzeProvider
} from '../../utils/providerUtils';

// CountdownTimer Component - Enhanced with better animations and urgency
interface CountdownTimerProps {
  initialHours: number;
  onComplete: () => void;
  currentAPY: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialHours, 
  onComplete, 
  currentAPY 
}) => {
  const initialSeconds = initialHours * 60 * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  
  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete();
      return;
    }
    
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeRemaining, onComplete]);
  
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  const progressPercentage = 100 - (timeRemaining / initialSeconds * 100);
  const isUrgent = timeRemaining <= 3600; // Last hour
  const isCritical = timeRemaining <= 600; // Last 10 minutes
  
  return (
    <div className={`countdown-timer-wrapper ${isUrgent ? 'countdown-urgent' : ''} ${isCritical ? 'countdown-critical' : ''}`}>
      <div className="countdown-display-main">
        <div className="time-segment">
          <div className="time-value">{formattedHours}</div>
          <div className="time-label">Hours</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedMinutes}</div>
          <div className="time-label">Min</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedSeconds}</div>
          <div className="time-label">Sec</div>
        </div>
      </div>
      
      <div className="progress-container-compact">
        <div 
          className="progress-bar-compact" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="apy-info-compact">
        <span className="apy-current">Current APY: <strong>{currentAPY}%</strong></span>
        <span className="apy-warning">Available until Batch 2</span>
      </div>
      
      {isCritical && (
        <div className="critical-badge">
          <span className="critical-icon">🚨</span>
          <span className="critical-text">FINAL MINUTES!</span>
        </div>
      )}
      
      {isUrgent && !isCritical && (
        <div className="urgent-badge">
          <span className="urgent-icon">⚡</span>
          <span className="urgent-text">FINAL HOURS!</span>
        </div>
      )}
    </div>
  );
};

// Enhanced Types with better organization
interface HomeProps {
  isConnected: boolean;
  walletAddress: string | null;
  provider: any;
  currentAPY: number;
  onCountdownComplete: () => void;
  onConnect: () => void;
  onPurchase: (method: 'card' | 'crypto', amount: number, currency: string) => void;
}

interface UserInvestment {
  totalTokens: number;
  totalInvested: number;
  totalBonusTokens: number;
  averageBuyPrice: number;
  stakingActive: boolean;
  stakingRewards: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  tokens: number;
  bonusTokens: number;
  timestamp: number;
  txHash?: string;
  network: string;
  withStaking: boolean;
  batchNumber: number;
  tier: BonusStructure;
  usdValue: number;
}

interface Network {
  chainId: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  icon: string;
  color: string;
  isTestnet?: boolean;
}

interface Currency {
  symbol: string;
  name: string;
  decimals: number;
  address?: Record<string, string>;
  icon: string;
  networks: string[];
  color: string;
  isPrimary?: boolean;
}

interface BonusStructure {
  minUSD: number;
  bonusPercent: number;
  label: string;
  icon: string;
  color: string;
  description: string;
}

interface CurrentBatch {
  batchNumber: number;
  priceUSD: number;
  phase: string;
  basePrice: number;
  tokensTotal: number;
  tokensSold: number;
  daysElapsed: number;
  maxBonus: number;
  apyRate: number;
  nextBatchPrice: number;
  endDate: Date;
}

// Enhanced Constants with better organization
const MIN_PURCHASE_USD = 5;
const DAILY_PRICE_INCREASE = 0.00001;
const STAKING_MIN_PERIOD_DAYS = 30;
const MAX_SLIPPAGE_PERCENT = 3;

// Enhanced Bonus structure with more visual appeal - CORRECTED & SUSTAINABLE
const BONUS_STRUCTURE: BonusStructure[] = [
  { 
    minUSD: 50000, 
    bonusPercent: 100, 
    label: "Blue Whale Tier", 
    icon: "🐋", 
    color: "#1E40AF",
    description: "Institutional level - Maximum rewards"
  },
  { 
    minUSD: 25000, 
    bonusPercent: 80, 
    label: "Orca Tier", 
    icon: "🐋", 
    color: "#2563EB",
    description: "High-volume investor benefits"
  },
  { 
    minUSD: 10000, 
    bonusPercent: 60, 
    label: "Whale Tier", 
    icon: "🐋", 
    color: "#3B82F6",
    description: "Premium investor package"
  },
  { 
    minUSD: 5000, 
    bonusPercent: 45, 
    label: "Shark Tier", 
    icon: "🦈", 
    color: "#10B981",
    description: "Advanced investor level"
  },
  { 
    minUSD: 2000, 
    bonusPercent: 30, 
    label: "Dolphin Tier", 
    icon: "🐬", 
    color: "#059669",
    description: "Standard bonus package"
  },
  { 
    minUSD: 500, 
    bonusPercent: 15, 
    label: "Fish Tier", 
    icon: "🐟", 
    color: "#0D9488",
    description: "Entry level bonus"
  },
  { 
    minUSD: 0, 
    bonusPercent: 5, 
    label: "Shrimp Tier", 
    icon: "🦐", 
    color: "#6B7280",
    description: "Starter bonus"
  }
];

// Enhanced function to get bonus with better logic
const getBonusForAmount = (usdAmount: number): BonusStructure => {
  for (const tier of BONUS_STRUCTURE) {
    if (usdAmount >= tier.minUSD) {
      return tier;
    }
  }
  return BONUS_STRUCTURE[BONUS_STRUCTURE.length - 1];
};

// Enhanced batch data with real current values - CORRECTED FOR SUSTAINABILITY
const INITIAL_BATCH_DATA: CurrentBatch = {
  batchNumber: 1,
  priceUSD: 0.0090000,
  phase: "Early Innovation",
  basePrice: 0.0090000,
  tokensTotal: 200000000, // Reduced from 400M for better distribution
  tokensSold: 1100, // Real tokens sold
  daysElapsed: 1, // Days since start
  maxBonus: 100, // Reduced from 150% to sustainable 100%
  apyRate: 1000,
  nextBatchPrice: 0.0150000, // Next batch price (Batch 2)
  endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days remaining
};

// Enhanced constants for HyperLayer0
const PRESALE_WALLET_ADDRESS = '0x40481B31361888073592B329E73Ac2EFe07fB071';
const PRESALE_BTC_ADDRESS = 'bc1q3rcakxca9c5nlzaqkfsdw2ppvlwy2evyx9vsz0';
const WHATSAPP_NUMBER = '5531998203013';
const TELEGRAM_BOT_URL = 'https://t.me/HyperLayer0Bot';

// Enhanced Networks configuration with colors and better organization
const NETWORKS: Record<string, Network> = {
  ethereum: {
    chainId: '0x1',
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorer: 'https://etherscan.io',
    icon: '🔷',
    color: '#627EEA'
  },
  bsc: {
    chainId: '0x38',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorer: 'https://bscscan.com',
    icon: '🟡',
    color: '#F3BA2F'
  },
  polygon: {
    chainId: '0x89',
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    icon: '🟣',
    color: '#8247E5'
  },
  arbitrum: {
    chainId: '0xa4b1',
    name: 'Arbitrum One',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    icon: '🔵',
    color: '#28A0F0'
  },
  optimism: {
    chainId: '0xa',
    name: 'Optimism',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    icon: '🔴',
    color: '#FF0420'
  },
  bitcoin: {
    chainId: '0x0',
    name: 'Bitcoin',
    symbol: 'BTC',
    rpcUrl: '',
    blockExplorer: 'https://blockstream.info',
    icon: '₿',
    color: '#F7931A'
  }
};

// Enhanced Currencies configuration
const CURRENCIES: Record<string, Currency> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    icon: '🔷',
    networks: ['ethereum', 'arbitrum', 'optimism'],
    color: '#627EEA',
    isPrimary: true
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    decimals: 8,
    icon: '₿',
    networks: ['bitcoin'],
    color: '#F7931A',
    isPrimary: true
  },
  MATIC: {
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    icon: '🟣',
    networks: ['polygon'],
    color: '#8247E5',
    isPrimary: true
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    icon: '🟡',
    networks: ['bsc'],
    color: '#F3BA2F',
    isPrimary: true
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    icon: '💲',
    address: {
      ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      bsc: '0x55d398326f99059fF775485246999027B3197955',
      arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      optimism: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58'
    },
    networks: ['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism'],
    color: '#26A17B'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    icon: '🔵',
    address: {
      ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      bsc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      arbitrum: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'
    },
    networks: ['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism'],
    color: '#2775CA'
  },
  DAI: {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    icon: '📀',
    address: {
      ethereum: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      optimism: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
    },
    networks: ['ethereum', 'polygon', 'arbitrum', 'optimism'],
    color: '#F5AC37'
  }
};

// Enhanced price feeds with real-time simulation
const getPrice = (symbol: string): number => {
  const basePrices: Record<string, number> = {
    ETH: 3500,
    BTC: 65000,
    MATIC: 0.85,
    BNB: 650,
    USDT: 1.00,
    USDC: 1.00,
    DAI: 1.00
  };
  
  // Add small random fluctuation to simulate real-time prices
  const price = basePrices[symbol] || 1;
  const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% fluctuation
  return price * (1 + fluctuation);
};

// Enhanced utility functions
const formatNumber = (num: number) => num.toString().padStart(2, '0');
const formatTokens = (tokens: number) => tokens.toLocaleString('en-US', { 
  maximumFractionDigits: 2,
  minimumFractionDigits: 0
});
const formatCurrency = (amount: number, currency: string) => 
  `${amount.toLocaleString('en-US', { 
    maximumFractionDigits: currency === 'BTC' ? 8 : 6,
    minimumFractionDigits: 0
  })} ${currency}`;

const formatUSD = (amount: number, precision?: number) => {
  // For very small values (smaller than $0.01), use up to 7 decimal places
  const defaultPrecision = amount < 0.01 ? 7 : 2;
  const fractionDigits = precision !== undefined ? precision : defaultPrecision;
  
  return `$${amount.toLocaleString('en-US', { 
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: amount < 0.01 ? 5 : 2
  })}`;
};

// Calculate current batch price with daily increases
const getCurrentBatchPrice = (batch: CurrentBatch): number => {
  return batch.basePrice + (batch.daysElapsed * DAILY_PRICE_INCREASE);
};

// Enhanced WhatsApp notification with better formatting
const sendWhatsAppNotification = async (
  walletAddress: string, 
  amount: number, 
  currency: string, 
  tokens: number,
  bonusTokens: number,
  tier: BonusStructure,
  withStaking: boolean, 
  batchNumber: number,
  usdValue: number,
  txHash?: string
) => {
  const shortWallet = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  
  const message = `🚀 *NEW HYPERLAYER0 PURCHASE* 🚀

💼 *Wallet:* ${shortWallet}
💰 *Amount:* ${formatCurrency(amount, currency)}
💵 *USD Value:* ${formatUSD(usdValue)}
🪙 *Base Tokens:* ${formatTokens(tokens - bonusTokens)} HL0
🎁 *Bonus Tokens:* ${formatTokens(bonusTokens)} HL0 (${tier.bonusPercent}%)
🏆 *Total HL0:* ${formatTokens(tokens)} HL0
📈 *Tier:* ${tier.icon} ${tier.label}
📦 *Batch:* ${batchNumber} (${INITIAL_BATCH_DATA.phase})
${withStaking ? '🔒 *WITH STAKING ACTIVATED (1000% APR)*' : '💫 *WITHOUT STAKING*'}
🌐 *Network:* ${NETWORKS[Object.keys(NETWORKS).find(k => CURRENCIES[currency]?.networks.includes(k)) || 'ethereum']?.name}
${txHash ? `🔗 *TX Hash:* ${txHash.slice(0, 10)}...${txHash.slice(-8)}` : ''}

💡 *CURRENT PRICE:* ${formatUSD(getCurrentBatchPrice(INITIAL_BATCH_DATA), 7)}
📈 *NEXT BATCH:* ${formatUSD(INITIAL_BATCH_DATA.nextBatchPrice, 3)}
🚀 *LAUNCH TARGET:* $1.20 (133x from current)
⏰ *Daily increase:* +$0.00001

⏰ *Time:* ${timestamp}

#HyperLayer0 #Web3 #Layer0 #PureUtility #${tier.label.replace(' ', '')}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

// Enhanced local storage helpers with better error handling
const getStoredInvestments = (address: string): UserInvestment => {
  if (!address) return { 
    totalTokens: 0, 
    totalInvested: 0, 
    totalBonusTokens: 0,
    averageBuyPrice: 0,
    stakingActive: false,
    stakingRewards: 0,
    transactions: [] 
  };
  
  try {
    const stored = localStorage.getItem(`hl0_investments_${address.toLowerCase()}`);
    if (!stored) return { 
      totalTokens: 0, 
      totalInvested: 0, 
      totalBonusTokens: 0,
      averageBuyPrice: 0,
      stakingActive: false,
      stakingRewards: 0,
      transactions: [] 
    };
    
    const parsed = JSON.parse(stored);
    
    // Migrate old data structure if needed
    if (!parsed.totalBonusTokens) {
      parsed.totalBonusTokens = 0;
      parsed.averageBuyPrice = parsed.totalInvested > 0 ? parsed.totalInvested / parsed.totalTokens : 0;
      parsed.stakingActive = false;
      parsed.stakingRewards = 0;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading stored investments:', error);
    return { 
      totalTokens: 0, 
      totalInvested: 0, 
      totalBonusTokens: 0,
      averageBuyPrice: 0,
      stakingActive: false,
      stakingRewards: 0,
      transactions: [] 
    };
  }
};

const saveInvestments = (address: string, investments: UserInvestment) => {
  if (!address) return;
  try {
    localStorage.setItem(`hl0_investments_${address.toLowerCase()}`, JSON.stringify(investments));
  } catch (error) {
    console.error('Error saving investments:', error);
  }
};

// Enhanced Main Component
const Home: React.FC<HomeProps> = ({
  isConnected,
  walletAddress,
  provider,
  currentAPY,
  onCountdownComplete,
  onConnect,
  onPurchase
}) => {
  // Enhanced State Management
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('crypto');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [userInvestments, setUserInvestments] = useState<UserInvestment>({
    totalTokens: 0,
    totalInvested: 0,
    totalBonusTokens: 0,
    averageBuyPrice: 0,
    stakingActive: false,
    stakingRewards: 0,
    transactions: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [showBitcoinInstructions, setShowBitcoinInstructions] = useState(false);
  const [withStaking, setWithStaking] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(INITIAL_BATCH_DATA);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [slippageTolerance, setSlippageTolerance] = useState(1);
  const [notifications, setNotifications] = useState<Array<{id: string, type: 'success' | 'error' | 'info', message: string, timestamp: number}>>([]);

  // Enhanced price updates with real-time simulation
  useEffect(() => {
    const updatePrices = () => {
      const newPrices: Record<string, number> = {};
      Object.keys(CURRENCIES).forEach(symbol => {
        newPrices[symbol] = getPrice(symbol);
      });
      setPrices(newPrices);
    };

    updatePrices();
    const interval = setInterval(updatePrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Enhanced batch price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update batch sold tokens with more realistic increment
      setCurrentBatch(prev => ({
        ...prev,
        priceUSD: getCurrentBatchPrice(prev),
        tokensSold: prev.tokensSold + Math.floor(Math.random() * 100) + 50 // More realistic sales simulation
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message, timestamp: Date.now() }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  // Get current chain ID with enhanced error handling
  useEffect(() => {
    const getChainId = async () => {
      if (!provider) return;
      
      try {
        const chainId = await provider.request({ method: 'eth_chainId' });
        setCurrentChainId(chainId);
        
        const networkEntry = Object.entries(NETWORKS).find(([_, network]) => 
          network.chainId === chainId
        );
        
        if (networkEntry) {
          setSelectedNetwork(networkEntry[0]);
          addNotification('info', `Connected to ${networkEntry[1].name}`);
        } else {
          addNotification('error', 'Unsupported network detected');
        }
      } catch (err) {
        console.error('Error getting chain ID:', err);
        addNotification('error', 'Failed to detect network');
      }
    };

    if (isConnected && provider) {
      getChainId();
      
      const handleChainChanged = (chainId: string) => {
        setCurrentChainId(chainId);
        const networkEntry = Object.entries(NETWORKS).find(([_, network]) => 
          network.chainId === chainId
        );
        if (networkEntry) {
          setSelectedNetwork(networkEntry[0]);
          addNotification('info', `Switched to ${networkEntry[1].name}`);
        }
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          addNotification('info', 'Wallet disconnected');
        }
      };

      if (provider.on) {
        provider.on('chainChanged', handleChainChanged);
        provider.on('accountsChanged', handleAccountsChanged);
        
        return () => {
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('accountsChanged', handleAccountsChanged);
        };
      }
    }
  }, [provider, isConnected, addNotification]);

  // Enhanced balance loading with better error handling and retry logic
  const loadBalances = useCallback(async (retryCount = 0) => {
    if (!provider || !walletAddress || selectedNetwork === 'bitcoin') return;
    
    setIsLoadingBalances(true);
    try {
      const newBalances: Record<string, number> = {};

      // Load native token balance
      try {
        const nativeBalance = await getWalletBalance(provider, walletAddress);
        const nativeToken = NETWORKS[selectedNetwork]?.symbol;
        if (nativeToken) {
          newBalances[nativeToken] = parseFloat(nativeBalance);
        }
      } catch (err) {
        console.error('Error loading native balance:', err);
        if (retryCount < 2) {
          setTimeout(() => loadBalances(retryCount + 1), 2000);
          return;
        }
      }

      // Load token balances
      for (const [symbol, currency] of Object.entries(CURRENCIES)) {
        if (currency.address?.[selectedNetwork]) {
          try {
            const tokenBalance = await getTokenBalance(
              provider,
              currency.address[selectedNetwork],
              walletAddress,
              currency.decimals
            );
            newBalances[symbol] = parseFloat(tokenBalance);
          } catch (err) {
            console.error(`Error loading ${symbol} balance:`, err);
            newBalances[symbol] = 0;
          }
        }
      }

      setBalances(newBalances);
      addNotification('success', 'Balances updated');
    } catch (err) {
      console.error('Error loading balances:', err);
      addNotification('error', 'Failed to load balances');
      
      if (retryCount < 2) {
        setTimeout(() => loadBalances(retryCount + 1), 2000);
      }
    } finally {
      setIsLoadingBalances(false);
    }
  }, [provider, walletAddress, selectedNetwork, addNotification]);

  // Load user investments when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      const investments = getStoredInvestments(walletAddress);
      setUserInvestments(investments);
      loadBalances();
    } else {
      setUserInvestments({
        totalTokens: 0,
        totalInvested: 0,
        totalBonusTokens: 0,
        averageBuyPrice: 0,
        stakingActive: false,
        stakingRewards: 0,
        transactions: []
      });
      setBalances({});
    }
  }, [isConnected, walletAddress, loadBalances]);

  // Enhanced network switching with better error handling
  const switchNetwork = useCallback(async (networkKey: string) => {
    if (networkKey === 'bitcoin') {
      setSelectedNetwork(networkKey);
      setSelectedCurrency('BTC');
      addNotification('info', 'Bitcoin selected - Manual payment required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const network = NETWORKS[networkKey];

      if (!window.ethereum) {
        throw new Error('No Web3 Provider found');
      }

      const currentChainId = await (window.ethereum as any).request({ 
        method: 'eth_chainId' 
      });

      if (currentChainId !== network.chainId) {
        await switchToNetwork(network.chainId, network);
        setSelectedNetwork(networkKey);
        
        const nativeSymbol = network.symbol;
        if (CURRENCIES[nativeSymbol]) {
          setSelectedCurrency(nativeSymbol);
        }
        
        await loadBalances();
        addNotification('success', `Switched to ${network.name}`);
      } else {
        setSelectedNetwork(networkKey);
        addNotification('info', `Already on ${network.name}`);
      }

    } catch (err: any) {
      console.error('Network switch failed:', err);
      const errorMessage = err.code === 4001 
        ? 'User rejected network switch'
        : (err.message || 'Failed to switch network');
      setError(errorMessage);
      addNotification('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadBalances, addNotification]);

  // Enhanced tokens calculation with better bonus logic
  const tokensToReceive = useMemo(() => {
    if (!amount || parseFloat(amount) <= 0) {
      return { 
        base: 0, 
        bonus: 0, 
        total: 0, 
        tier: BONUS_STRUCTURE[BONUS_STRUCTURE.length - 1],
        usdValue: 0
      };
    }
    
    const amountNum = parseFloat(amount);
    const currencyPrice = prices[selectedCurrency] || getPrice(selectedCurrency);
    const usdValue = amountNum * currencyPrice;
    
    if (usdValue < MIN_PURCHASE_USD) {
      return { 
        base: 0, 
        bonus: 0, 
        total: 0, 
        tier: BONUS_STRUCTURE[BONUS_STRUCTURE.length - 1],
        usdValue
      };
    }
    
    const baseTokens = usdValue / currentBatch.priceUSD;
    const tier = getBonusForAmount(usdValue);
    const bonusTokens = (baseTokens * tier.bonusPercent) / 100;
    
    return {
      base: baseTokens,
      bonus: bonusTokens,
      total: baseTokens + bonusTokens,
      tier: tier,
      usdValue
    };
  }, [amount, selectedCurrency, currentBatch.priceUSD, prices]);

  // Available currencies for selected network
  const availableCurrencies = useMemo(() => {
    return Object.entries(CURRENCIES).filter(([_, currency]) => 
      currency.networks.includes(selectedNetwork)
    );
  }, [selectedNetwork]);

  // Auto-select appropriate currency when network changes
  useEffect(() => {
    const currentCurrencyAvailable = availableCurrencies.some(([symbol]) => symbol === selectedCurrency);
    
    if (!currentCurrencyAvailable) {
      const nativeSymbol = NETWORKS[selectedNetwork]?.symbol;
      const nativeCurrency = availableCurrencies.find(([symbol]) => symbol === nativeSymbol);
      
      if (nativeCurrency) {
        setSelectedCurrency(nativeCurrency[0]);
      } else if (availableCurrencies.length > 0) {
        setSelectedCurrency(availableCurrencies[0][0]);
      }
    }
  }, [selectedNetwork, availableCurrencies, selectedCurrency]);

  // Enhanced purchase handler with better validation and error handling
  const handlePurchase = useCallback(async (stakingOption: boolean = false) => {
    if (!isConnected || !walletAddress || !provider) {
      onConnect();
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amount || amountNum <= 0) {
      const message = 'Please enter a valid amount.';
      setError(message);
      addNotification('error', message);
      return;
    }

    // Enhanced validation
    const currencyPrice = prices[selectedCurrency] || getPrice(selectedCurrency);
    const usdValue = amountNum * currencyPrice;

    if (usdValue < MIN_PURCHASE_USD) {
      const message = `Minimum purchase is ${formatUSD(MIN_PURCHASE_USD)}`;
      setError(message);
      addNotification('error', message);
      return;
    }

    const currentBalance = balances[selectedCurrency] || 0;
    const isNativeToken = !CURRENCIES[selectedCurrency]?.address;
    const gasBuffer = isNativeToken ? 0.009 : 0;
    const requiredBalance = amountNum + (isNativeToken ? gasBuffer : 0);

    if (requiredBalance > currentBalance) {
      const message = `Insufficient balance. You have ${formatCurrency(currentBalance, selectedCurrency)}${
        isNativeToken ? ' (need extra for gas fees)' : ''
      }`;
      setError(message);
      addNotification('error', message);
      return;
    }

    // Check if batch has enough tokens
    const tokensNeeded = tokensToReceive.total;
    const tokensRemaining = currentBatch.tokensTotal - currentBatch.tokensSold;
    
    if (tokensNeeded > tokensRemaining) {
      const message = `Not enough tokens remaining in this batch. Only ${formatTokens(tokensRemaining)} HL0 available.`;
      setError(message);
      addNotification('error', message);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const currency = CURRENCIES[selectedCurrency];
      let txHash = '';

      if (selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin') {
        setWithStaking(stakingOption);
        setShowBitcoinInstructions(true);
        setIsLoading(false);
        return;
      }

      addNotification('info', 'Processing transaction...');

      // Send transaction
      if (currency.address && currency.address[selectedNetwork]) {
        txHash = await sendTokenTransaction(
          provider,
          currency.address[selectedNetwork],
          PRESALE_WALLET_ADDRESS,
          amount,
          currency.decimals
        );
      } else {
        txHash = await sendNativeTransaction(
          provider,
          PRESALE_WALLET_ADDRESS,
          amount
        );
      }

      // Calculate values
      const tier = tokensToReceive.tier;
      const baseTokens = tokensToReceive.base;
      const bonusTokens = tokensToReceive.bonus;
      const totalTokens = tokensToReceive.total;

      // Create enhanced transaction record
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: amountNum,
        currency: selectedCurrency,
        tokens: totalTokens,
        bonusTokens: bonusTokens,
        timestamp: Date.now(),
        txHash,
        network: selectedNetwork,
        withStaking: stakingOption,
        batchNumber: currentBatch.batchNumber,
        tier: tier,
        usdValue: usdValue
      };

      // Update user investments with enhanced calculations
      const newTotalTokens = userInvestments.totalTokens + totalTokens;
      const newTotalInvested = userInvestments.totalInvested + usdValue;
      const newTotalBonusTokens = userInvestments.totalBonusTokens + bonusTokens;
      
      const updatedInvestments: UserInvestment = {
        totalTokens: newTotalTokens,
        totalInvested: newTotalInvested,
        totalBonusTokens: newTotalBonusTokens,
        averageBuyPrice: newTotalInvested / newTotalTokens,
        stakingActive: userInvestments.stakingActive || stakingOption,
        stakingRewards: userInvestments.stakingRewards,
        transactions: [...userInvestments.transactions, newTransaction]
      };

      setUserInvestments(updatedInvestments);
      saveInvestments(walletAddress, updatedInvestments);

      // Send enhanced WhatsApp notification
      await sendWhatsAppNotification(
        walletAddress, 
        amountNum, 
        selectedCurrency, 
        totalTokens,
        bonusTokens,
        tier,
        stakingOption, 
        currentBatch.batchNumber,
        usdValue,
        txHash
      );

      const successMessage = `Successfully purchased ${formatTokens(totalTokens)} HL0 tokens! 🚀`;
      setSuccess(successMessage);
      addNotification('success', successMessage);
      setAmount('');
      
      // Update batch sold tokens
      setCurrentBatch(prev => ({
        ...prev,
        tokensSold: prev.tokensSold + totalTokens
      }));
      
      setTimeout(() => loadBalances(), 2000);
      onPurchase(paymentMethod, amountNum, selectedCurrency);

    } catch (err: any) {
      console.error('Purchase error:', err);
      const errorMessage = getProviderErrorMessage(err);
      setError(errorMessage);
      addNotification('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    isConnected,
    walletAddress,
    provider,
    amount,
    selectedCurrency,
    selectedNetwork,
    tokensToReceive,
    userInvestments,
    paymentMethod,
    currentBatch,
    onConnect,
    onPurchase,
    loadBalances,
    balances,
    prices,
    addNotification
  ]);

  // Enhanced Bitcoin confirmation handler
  const handleBitcoinConfirmation = useCallback(async () => {
    if (!amount || !walletAddress) return;

    try {
      const amountNum = parseFloat(amount);
      const currencyPrice = prices['BTC'] || getPrice('BTC');
      const usdValue = amountNum * currencyPrice;
      const tier = tokensToReceive.tier;
      const baseTokens = tokensToReceive.base;
      const bonusTokens = tokensToReceive.bonus;
      const totalTokens = tokensToReceive.total;

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: amountNum,
        currency: 'BTC',
        tokens: totalTokens,
        bonusTokens: bonusTokens,
        timestamp: Date.now(),
        network: 'bitcoin',
        withStaking,
        batchNumber: currentBatch.batchNumber,
        tier: tier,
        usdValue: usdValue
      };

      const newTotalTokens = userInvestments.totalTokens + totalTokens;
      const newTotalInvested = userInvestments.totalInvested + usdValue;
      const newTotalBonusTokens = userInvestments.totalBonusTokens + bonusTokens;

      const updatedInvestments: UserInvestment = {
        totalTokens: newTotalTokens,
        totalInvested: newTotalInvested,
        totalBonusTokens: newTotalBonusTokens,
        averageBuyPrice: newTotalInvested / newTotalTokens,
        stakingActive: userInvestments.stakingActive || withStaking,
        stakingRewards: userInvestments.stakingRewards,
        transactions: [...userInvestments.transactions, newTransaction]
      };

      setUserInvestments(updatedInvestments);
      saveInvestments(walletAddress, updatedInvestments);

      await sendWhatsAppNotification(
        walletAddress, 
        amountNum, 
        'BTC', 
        totalTokens,
        bonusTokens,
        tier,
        withStaking,
        currentBatch.batchNumber,
        usdValue
      );

      const successMessage = `Successfully purchased ${formatTokens(totalTokens)} HL0 with Bitcoin! 🚀`;
      setSuccess(successMessage);
      addNotification('success', successMessage);
      setAmount('');
      setShowBitcoinInstructions(false);
      setWithStaking(false);

      // Update batch sold tokens
      setCurrentBatch(prev => ({
        ...prev,
        tokensSold: prev.tokensSold + totalTokens
      }));

      onPurchase(paymentMethod, amountNum, 'BTC');
    } catch (error) {
      console.error('Bitcoin confirmation error:', error);
      addNotification('error', 'Failed to confirm Bitcoin purchase');
    }
  }, [amount, walletAddress, tokensToReceive, userInvestments, paymentMethod, onPurchase, withStaking, currentBatch, prices, addNotification]);

  // Current balance for selected currency
  const currentBalance = balances[selectedCurrency] || 0;
  const isCorrectNetwork = currentChainId === NETWORKS[selectedNetwork]?.chainId;
  const currentPrice = prices[selectedCurrency] || getPrice(selectedCurrency);

  // Calculate portfolio value
  const portfolioValue = useMemo(() => {
    const currentTokenPrice = getCurrentBatchPrice(currentBatch);
    const tokensValue = userInvestments.totalTokens * currentTokenPrice;
    const profitLoss = tokensValue - userInvestments.totalInvested;
    const profitLossPercent = userInvestments.totalInvested > 0 
      ? (profitLoss / userInvestments.totalInvested) * 100 
      : 0;

    return {
      tokensValue,
      profitLoss,
      profitLossPercent,
      stakingValue: userInvestments.stakingRewards * currentTokenPrice
    };
  }, [userInvestments, currentBatch]);

  // Calculate time until next price increase
  const getNextPriceIncreaseTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilNextIncrease = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeUntilNextIncrease / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilNextIncrease % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <main className="main-purchase-section">
      {/* Enhanced Notifications */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification notification-${notification.type}`}
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          >
            <span className="notification-message">{notification.message}</span>
            <button className="notification-close">×</button>
          </div>
        ))}
      </div>

      <div className="purchase-container">
        <div className="main-layout">
          {/* Left Side - Enhanced Text Content */}
          <div className="text-side">
            {/* Enhanced Guaranteed Returns Banner */}
            <div className="guaranteed-returns-banner enhanced">
              <div className="banner-content">
                <div className="banner-icon animated">💰</div>
                <div className="banner-text">
                  <span className="banner-title">10000%+ GUARANTEED!</span>
                  <span className="banner-subtitle">
                    {formatUSD(0.0090000, 7)} → {formatUSD(1.20)} Launch • 100x Minimum Guaranteed
                  </span>
                </div>
                <div className="banner-stats">
                  <div className="stat-item">
                    <span className="stat-number">{formatTokens(currentBatch.tokensSold)}</span>
                    <span className="stat-label">Tokens Sold</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{currentBatch.maxBonus}%</span>
                    <span className="stat-label">Max Bonus</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h1>
              The Future of <span className="highlight">Pure Utility</span> Infrastructure
            </h1>
            
            <p>
              <strong>HyperLayer0</strong> introduces the revolutionary "Pure Utility" model - 
              the first Layer 0 with ZERO burns on everything. Your tokens, your choice, forever. 
              Value through genuine utility, not artificial scarcity.
            </p>

            <div className="features-grid enhanced">
              <div className="feature-item">
                <div className="feature-icon">🆓</div>
                <div className="feature-text">
                  <h4>Zero Burns Forever</h4>
                  <p>No transaction burns, no bridge burns, no staking penalties - never!</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">💎</div>
                <div className="feature-text">
                  <h4>Your Tokens = Eternal</h4>
                  <p>9.9B tokens forever - no artificial scarcity, just pure utility</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h4>Infinite Freedom</h4>
                  <p>Use, trade, bridge, stake or hold - zero pressure, maximum choice</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h4>Value = Utility</h4>
                  <p>Price grows with real adoption and genuine ecosystem value</p>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="stats-section enhanced">
              <div className="stat">
                <div className="stat-number">0%</div>
                <div className="stat-label">Total Burns</div>
              </div>
              <div className="stat">
                <div className="stat-number">9.9B</div>
                <div className="stat-label">Eternal Supply</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">User Freedom</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Possibilities</div>
              </div>
            </div>

            {/* Enhanced Bonus Structure Section */}
            <div className="bonus-structure-section enhanced">
              <h3>🎁 Bonus Structure - Batch {currentBatch.batchNumber}</h3>
              <p className="bonus-subtitle">Higher investment = Higher bonus percentage</p>
              
              <div className="bonus-tiers enhanced">
                {BONUS_STRUCTURE.map((tier, index) => (
                  <div key={index} className="bonus-tier" style={{ borderLeftColor: tier.color }}>
                    <div className="tier-icon" style={{ color: tier.color }}>{tier.icon}</div>
                    <div className="tier-info">
                      <div className="tier-name" style={{ color: tier.color }}>{tier.label}</div>
                      <div className="tier-requirement">
                        {tier.minUSD > 0 ? `${formatUSD(tier.minUSD)}+` : 'Any amount'}
                      </div>
                      <div className="tier-bonus">+{tier.bonusPercent}% Bonus</div>
                      <div className="tier-description">{tier.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bonus-example enhanced">
                <h4>💡 Return Examples:</h4>
                <div className="example-grid enhanced">
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(50000)}</span>
                    <span className="example-bonus">🐋 +100% = 2.0x tokens</span>
                    <span className="example-roi">ROI: +19,900%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(25000)}</span>
                    <span className="example-bonus">🐋 +80% = 1.8x tokens</span>
                    <span className="example-roi">ROI: +17,900%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(10000)}</span>
                    <span className="example-bonus">🐋 +60% = 1.6x tokens</span>
                    <span className="example-roi">ROI: +15,900%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(5000)}</span>
                    <span className="example-bonus">🦈 +45% = 1.45x tokens</span>
                    <span className="example-roi">ROI: +14,400%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(2000)}</span>
                    <span className="example-bonus">🐬 +30% = 1.3x tokens</span>
                    <span className="example-roi">ROI: +12,900%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(500)}</span>
                    <span className="example-bonus">🐟 +15% = 1.15x tokens</span>
                    <span className="example-roi">ROI: +11,400%</span>
                  </div>
                  <div className="example-item">
                    <span className="example-amount">{formatUSD(100)}</span>
                    <span className="example-bonus">🦐 +5% = 1.05x tokens</span>
                    <span className="example-roi">ROI: +10,400%</span>
                  </div>
                </div>
                <div className="guarantee-note">
                  <strong>🎯 GUARANTEE:</strong> All values assume minimum launch price of $1.20
                </div>
              </div>
            </div>

            {/* Enhanced Portfolio Section for Connected Users */}
            {isConnected && userInvestments.totalTokens > 0 && (
              <div className="portfolio-section">
                <h3>📊 Your HyperLayer0 Portfolio</h3>
                <div className="portfolio-stats">
                  <div className="portfolio-stat">
                    <span className="stat-label">HL0 Tokens</span>
                    <span className="stat-value">{formatTokens(userInvestments.totalTokens)}</span>
                    <span className="stat-detail">
                      {formatTokens(userInvestments.totalBonusTokens)} bonus
                    </span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Current Value</span>
                    <span className="stat-value">{formatUSD(portfolioValue.tokensValue)}</span>
                    <span className={`stat-detail ${portfolioValue.profitLoss >= 0 ? 'profit' : 'loss'}`}>
                      {portfolioValue.profitLoss >= 0 ? '+' : ''}{formatUSD(portfolioValue.profitLoss)} 
                      ({portfolioValue.profitLossPercent >= 0 ? '+' : ''}{portfolioValue.profitLossPercent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Average Price</span>
                    <span className="stat-value">{formatUSD(userInvestments.averageBuyPrice)}</span>
                    <span className="stat-detail">vs {formatUSD(getCurrentBatchPrice(currentBatch))} current</span>
                  </div>
                  {userInvestments.stakingActive && (
                    <div className="portfolio-stat">
                      <span className="stat-label">Staking Rewards</span>
                      <span className="stat-value">{formatTokens(userInvestments.stakingRewards)}</span>
                      <span className="stat-detail">🔒 {currentAPY}% APR</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Enhanced Purchase Widget */}
          <div className="card-side">
            <div className="purchase-widget enhanced">
              {/* Enhanced Countdown and Batch Info */}
              <div className="countdown-section enhanced">
                <div className="batch-header">
                  <h2>🎯 Batch {currentBatch.batchNumber} - {currentBatch.phase}</h2>
                  <div className="price-display">
                    <span className="current-price">{formatUSD(currentBatch.priceUSD, 7)}</span>
                  </div>
                </div>
                
                <div className="countdown-timer-container">
                  <h3>📈 Next Price Increase In:</h3>
                  <CountdownTimer 
                    initialHours={24}
                    onComplete={onCountdownComplete}
                    currentAPY={currentBatch.apyRate}
                  />
                  <div className="price-increase-info">
                    <div className="price-info-item">
                      <span>Tomorrow:</span>
                      <strong>{formatUSD(0.0090120, 7)}</strong>
                    </div>
                    <div className="price-info-item">
                      <span>Batch 2 Price:</span>
                      <strong>{formatUSD(0.015, 3)}</strong>
                    </div>
                    <div className="price-info-item">
                      <span>APR remains:</span>
                      <strong>{currentBatch.apyRate}%</strong>
                    </div>
                  </div>
                </div>

                <div className="batch-quick-info">
                  <div className="quick-stat">
                    <span className="stat-icon">🎁</span>
                    <span>Max Bonus: <strong>{currentBatch.maxBonus}% 🐋</strong></span>
                  </div>
                  <div className="quick-stat">
                    <span className="stat-icon">🔮</span>
                    <span>Current APY: <strong>{currentBatch.apyRate}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Section */}
              <div className="progress-section enhanced">
                <div className="raised-amount">
                  <span className="batch-info">
                    Batch {currentBatch.batchNumber}: {formatTokens(currentBatch.tokensSold)} / {formatTokens(currentBatch.tokensTotal)} tokens
                  </span>
                  <span className="usd-raised">
                    {formatUSD(currentBatch.tokensSold * currentBatch.priceUSD)} raised
                  </span>
                </div>
                <div className="progress-bar enhanced">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${Math.min((currentBatch.tokensSold / currentBatch.tokensTotal) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span>{((currentBatch.tokensSold / currentBatch.tokensTotal) * 100).toFixed(2)}% Complete</span>
                  <span>{formatTokens(Math.max(0, currentBatch.tokensTotal - currentBatch.tokensSold))} Remaining</span>
                </div>
                
                {/* Enhanced Next Batch Alert */}
                <div className="next-batch-info enhanced">
                  <div className="next-batch-alert">
                    <span className="alert-icon">⚡</span>
                    <div className="alert-content">
                      <div className="batch-warning-line">
                        <strong>Batch 2:</strong> Price jumps to <strong>{formatUSD(0.015, 3)}</strong> (+67% increase!)
                      </div>
                      <div className="batch-warning-line">
                        APY reduces to <strong>900%</strong> • Max bonus reduces to <strong>90%</strong>
                      </div>
                      <div className="batch-warning-line">
                        <strong>Final Launch:</strong> Target price <strong>{formatUSD(1.20)}</strong> (133x from Batch 1)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced User Stats */}
              {isConnected && (
                <div className="user-section enhanced">
                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-label">Your HL0 Tokens</span>
                      <span className="stat-value">{formatTokens(userInvestments.totalTokens)} HL0</span>
                      <span className="stat-subvalue">
                        {userInvestments.totalBonusTokens > 0 && 
                          `+${formatTokens(userInvestments.totalBonusTokens)} bonus`
                        }
                      </span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Total Invested</span>
                      <span className="stat-value">{formatUSD(userInvestments.totalInvested)}</span>
                      <span className="stat-subvalue">
                        Current value: {formatUSD(portfolioValue.tokensValue)}
                      </span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Potential APR</span>
                      <span className="stat-value">1500% - {currentBatch.apyRate}%</span>
                      <span className="stat-subvalue">
                        {userInvestments.stakingActive ? '🔒 Staking Active' : '💫 No Staking'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Purchase Form */}
              <div className="form-section enhanced">
                <div className="form-group">
                  <label>Payment Method</label>
                  <div className="payment-methods">
                    <button 
                      className={`payment-method ${paymentMethod === 'crypto' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('crypto')}
                    >
                      💰 Crypto
                    </button>
                    <button 
                      className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                      disabled
                    >
                      💳 Card (coming soon)
                    </button>
                  </div>
                </div>

                {paymentMethod === 'crypto' && (
                  <>
                    <div className="form-group">
                      <label>Blockchain Network</label>
                      <div className="network-selector enhanced">
                        {Object.entries(NETWORKS).map(([key, network]) => (
                          <button
                            key={key}
                            className={`network-option ${selectedNetwork === key ? 'active' : ''}`}
                            onClick={() => switchNetwork(key)}
                            disabled={isLoading}
                            style={{ borderColor: selectedNetwork === key ? network.color : 'transparent' }}
                          >
                            <span className="network-icon" style={{ color: network.color }}>
                              {network.icon}
                            </span>
                            <div className="network-details">
                              <span className="network-name">{network.name}</span>
                              {selectedNetwork === key && (
                                <span className="network-status">✓ Connected</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {!isCorrectNetwork && selectedNetwork !== 'bitcoin' && isConnected && (
                        <div className="network-warning">
                          ⚠️ Please switch to {NETWORKS[selectedNetwork]?.name} network
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        Currency
                        {selectedCurrency && (
                          <span className="current-price-label">
                            {formatUSD(currentPrice)}
                          </span>
                        )}
                      </label>
                      <select 
                        value={selectedCurrency} 
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="currency-select enhanced"
                        disabled={isLoading}
                      >
                        {availableCurrencies.map(([symbol, currency]) => (
                          <option key={symbol} value={symbol}>
                            {currency.icon} {symbol} - {currency.name}
                          </option>
                        ))}
                      </select>
                      {isConnected && (
                        <div className="balance-info enhanced">
                          {isLoadingBalances ? (
                            <span className="loading-balance">
                              ⏳ Loading balance...
                            </span>
                          ) : currentBalance > 0 ? (
                            <span className="balance-amount">
                              Balance: {formatCurrency(currentBalance, selectedCurrency)}
                              <span className="balance-usd">
                                ≈ {formatUSD(currentBalance * currentPrice)}
                              </span>
                            </span>
                          ) : (
                            <span className="no-balance">
                              No balance available
                            </span>
                          )}
                          <button 
                            className="refresh-balance"
                            onClick={() => loadBalances()}
                            disabled={isLoadingBalances}
                            title="Refresh balance"
                          >
                            🔄
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>
                    Amount {paymentMethod === 'crypto' ? `(${selectedCurrency})` : '(USD)'}
                    {amount && tokensToReceive.usdValue >= MIN_PURCHASE_USD && (
                      <span className="usd-equivalent-label">
                        ≈ {formatUSD(tokensToReceive.usdValue)}
                      </span>
                    )}
                  </label>
                  <div className="amount-input-group enhanced">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={selectedCurrency === 'BTC' ? '0.00000000' : '0.00'}
                      className="amount-input"
                      disabled={isLoading}
                      max={currentBalance}
                      step={selectedCurrency === 'BTC' ? '0.00000001' : '0.000001'}
                      min="0"
                    />
                    <div className="input-actions">
                      {currentBalance > 0 && (
                        <>
                          <button 
                            onClick={() => setAmount((currentBalance * 0.25).toString())}
                            disabled={isLoading}
                            className="quick-amount-btn"
                          >
                            25%
                          </button>
                          <button 
                            onClick={() => setAmount((currentBalance * 0.50).toString())}
                            disabled={isLoading}
                            className="quick-amount-btn"
                          >
                            50%
                          </button>
                          <button 
                            onClick={() => setAmount((currentBalance * 0.75).toString())}
                            disabled={isLoading}
                            className="quick-amount-btn"
                          >
                            75%
                          </button>
                          <button 
                            onClick={() => {
                              const isNative = !CURRENCIES[selectedCurrency]?.address;
                              const buffer = isNative ? 0.009 : 0;
                              setAmount(Math.max(0, currentBalance - buffer).toString());
                            }}
                            disabled={isLoading}
                            className="max-btn"
                          >
                            MAX
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced Quick Amount Suggestions */}
                  {!amount && (
                    <div className="quick-amounts-suggestions">
                      <span className="suggestions-label">Suggested amounts:</span>
                      <div className="suggestions-grid">
                        {selectedCurrency === 'BTC' ? (
                          <>
                            <button onClick={() => setAmount('0.001')} className="suggestion-btn">0.001 BTC</button>
                            <button onClick={() => setAmount('0.005')} className="suggestion-btn">0.005 BTC</button>
                            <button onClick={() => setAmount('0.01')} className="suggestion-btn">0.01 BTC</button>
                            <button onClick={() => setAmount('0.1')} className="suggestion-btn">0.1 BTC</button>
                          </>
                        ) : selectedCurrency === 'ETH' ? (
                          <>
                            <button onClick={() => setAmount('0.1')} className="suggestion-btn">0.1 ETH</button>
                            <button onClick={() => setAmount('0.5')} className="suggestion-btn">0.5 ETH</button>
                            <button onClick={() => setAmount('1')} className="suggestion-btn">1 ETH</button>
                            <button onClick={() => setAmount('5')} className="suggestion-btn">5 ETH</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setAmount('100')} className="suggestion-btn">100 {selectedCurrency}</button>
                            <button onClick={() => setAmount('500')} className="suggestion-btn">500 {selectedCurrency}</button>
                            <button onClick={() => setAmount('1000')} className="suggestion-btn">1K {selectedCurrency}</button>
                            <button onClick={() => setAmount('5000')} className="suggestion-btn">5K {selectedCurrency}</button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Tokens Received Display */}
                  {amount && tokensToReceive.total > 0 && tokensToReceive.usdValue >= MIN_PURCHASE_USD && (
                    <div className="tokens-received enhanced">
                      <div className="tokens-calculation">
                        <div className="tier-badge enhanced" style={{ backgroundColor: tokensToReceive.tier.color }}>
                          <span className="tier-icon">{tokensToReceive.tier.icon}</span>
                          <span className="tier-text">
                            {tokensToReceive.tier.label} - {tokensToReceive.tier.bonusPercent}% Bonus
                          </span>
                        </div>
                        <div className="tokens-breakdown enhanced">
                          <div className="token-line">
                            <span>Base tokens:</span>
                            <span><strong>{formatTokens(tokensToReceive.base)} HL0</strong></span>
                          </div>
                          {tokensToReceive.bonus > 0 && (
                            <div className="token-line bonus-line">
                              <span>Bonus tokens:</span>
                              <span><strong>+{formatTokens(tokensToReceive.bonus)} HL0</strong></span>
                            </div>
                          )}
                          <div className="token-line total-line">
                            <span>Total you receive:</span>
                            <span><strong>{formatTokens(tokensToReceive.total)} HL0</strong></span>
                          </div>
                          <div className="token-line value-line">
                            <span>Investment value:</span>
                            <span><strong>{formatUSD(tokensToReceive.usdValue)}</strong></span>
                          </div>
                        </div>
                        
                        <div className="roi-projection">
                          <h5>📈 Guaranteed Return Projection (Launch at $1.20):</h5>
                          <div className="roi-banner">
                            <span className="roi-guarantee">🎯 MINIMUM 10000% GUARANTEED!</span>
                          </div>
                          <div className="roi-stats">
                            <div className="roi-stat">
                              <span className="roi-label">Value at Launch:</span>
                              <span className="roi-value profit">
                                {formatUSD(tokensToReceive.total * 1.20)}
                              </span>
                            </div>
                            <div className="roi-stat">
                              <span className="roi-label">Minimum ROI:</span>
                              <span className="roi-value profit">
                                +{Math.max(10000, Math.round(((tokensToReceive.total * 1.20) / tokensToReceive.usdValue - 1) * 100)).toLocaleString()}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Minimum Purchase Warning */}
                  {amount && tokensToReceive.usdValue > 0 && tokensToReceive.usdValue < MIN_PURCHASE_USD && (
                    <div className="min-purchase-warning">
                      ⚠️ Minimum purchase: {formatUSD(MIN_PURCHASE_USD)}
                      <br/>Current amount: {formatUSD(tokensToReceive.usdValue)}
                    </div>
                  )}
                </div>

                {/* Error and Success Messages */}
                {error && (
                  <div className="error-message enhanced">
                    <span className="message-icon">❌</span>
                    <span className="message-text">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="success-message enhanced">
                    <span className="message-icon">✅</span>
                    <span className="message-text">{success}</span>
                  </div>
                )}

                {/* Enhanced Purchase Buttons */}
                <div className="purchase-buttons">
                  <button 
                    className="purchase-btn primary"
                    onClick={() => handlePurchase(false)}
                    disabled={
                      !amount || 
                      parseFloat(amount) <= 0 || 
                      isLoading || 
                      (!isConnected && paymentMethod === 'crypto') ||
                      (tokensToReceive.usdValue > 0 && tokensToReceive.usdValue < MIN_PURCHASE_USD)
                    }
                  >
                    {isLoading ? (
                      <span className="loading-content">
                        <span className="loading-spinner">⏳</span>
                        Processing...
                      </span>
                    ) : !isConnected && paymentMethod === 'crypto' ? (
                      <span className="button-content">
                        <span className="button-icon">🔗</span>
                        Connect Wallet
                      </span>
                    ) : selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin' ? (
                      <span className="button-content">
                        <span className="button-icon">₿</span>
                        Pay {amount} BTC
                      </span>
                    ) : (
                      <span className="button-content">
                        <span className="button-icon">💰</span>
                        Buy {formatTokens(tokensToReceive.total)} HL0
                      </span>
                    )}
                  </button>

                  <button 
                    className="purchase-btn staking"
                    onClick={() => handlePurchase(true)}
                    disabled={
                      !amount || 
                      parseFloat(amount) <= 0 || 
                      isLoading || 
                      (!isConnected && paymentMethod === 'crypto') ||
                      (tokensToReceive.usdValue > 0 && tokensToReceive.usdValue < MIN_PURCHASE_USD)
                    }
                  >
                    {isLoading ? (
                      <span className="loading-content">
                        <span className="loading-spinner">⏳</span>
                        Processing...
                      </span>
                    ) : !isConnected && paymentMethod === 'crypto' ? (
                      <span className="button-content">
                        <span className="button-icon">🔗</span>
                        Connect Wallet
                      </span>
                    ) : selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin' ? (
                      <span className="button-content">
                        <span className="button-icon">🔒</span>
                        Pay {amount} BTC + Staking
                      </span>
                    ) : (
                      <span className="button-content">
                        <span className="button-icon">🔒</span>
                        Buy {formatTokens(tokensToReceive.total)} HL0 + Staking
                      </span>
                    )}
                  </button>
                </div>

                {/* Enhanced Staking Info */}
                <div className="staking-info enhanced">
                  <div className="staking-benefit">
                    <span className="staking-icon">🔒</span>
                    <div className="staking-text">
                      <div className="staking-title">
                        <strong>Pure Choice Staking:</strong>
                      </div>
                      <div className="staking-description">
                        Lock your tokens and earn {currentBatch.apyRate}% APR based on your batch!
                        <br/>
                        <strong>Zero Pressure:</strong> Your tokens remain yours forever - 
                        stake only if you want extra rewards. No penalties, ever!
                      </div>
                      <div className="staking-benefits-list">
                        <div className="benefit-item">
                          <span className="benefit-icon">💰</span>
                          <span>Current APR: {currentBatch.apyRate}%</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🔓</span>
                          <span>No minimum lock period</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🎁</span>
                          <span>Automatic compound rewards</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                {showAdvancedOptions && (
                  <div className="advanced-options">
                    <h4>⚙️ Advanced Options</h4>
                    <div className="option-group">
                      <label>Slippage Tolerance (%)</label>
                      <select 
                        value={slippageTolerance}
                        onChange={(e) => setSlippageTolerance(Number(e.target.value))}
                        className="slippage-select"
                      >
                        <option value={0.1}>0.1%</option>
                        <option value={0.5}>0.5%</option>
                        <option value={1}>1.0%</option>
                        <option value={3}>3.0%</option>
                        <option value={5}>5.0%</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Enhanced Bitcoin Payment Instructions Modal */}
                {showBitcoinInstructions && (
                  <div className="bitcoin-modal-overlay enhanced" onClick={() => setShowBitcoinInstructions(false)}>
                    <div className="bitcoin-modal enhanced" onClick={(e) => e.stopPropagation()}>
                      <div className="bitcoin-modal-header">
                        <h3>₿ Bitcoin Payment Instructions</h3>
                        <button 
                          className="close-modal-btn"
                          onClick={() => setShowBitcoinInstructions(false)}
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="bitcoin-modal-content">
                        <div className="payment-details enhanced">
                          <div className="detail-row">
                            <span className="detail-label">Amount to Send:</span>
                            <span className="detail-value">{amount} BTC</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">USD Value:</span>
                            <span className="detail-value">
                              {formatUSD(parseFloat(amount || '0') * (prices.BTC || getPrice('BTC')))}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">HL0 Tokens:</span>
                            <span className="detail-value">{formatTokens(tokensToReceive.total)} HL0</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Bonus Tier:</span>
                            <span className="detail-value">
                              {tokensToReceive.tier.icon} {tokensToReceive.tier.label} (+{tokensToReceive.tier.bonusPercent}%)
                            </span>
                          </div>
                          {withStaking && (
                            <div className="detail-row staking-row">
                              <span className="detail-label">🔒 Staking:</span>
                              <span className="detail-value">Activated ({currentBatch.apyRate}% APR)</span>
                            </div>
                          )}
                        </div>

                        <div className="bitcoin-address-section enhanced">
                          <div className="address-label">Bitcoin Address:</div>
                          <div className="bitcoin-address-display">
                            <code>{PRESALE_BTC_ADDRESS}</code>
                            <button 
                              className="copy-address-btn"
                              onClick={() => {
                                navigator.clipboard.writeText(PRESALE_BTC_ADDRESS);
                                const btn = document.querySelector('.copy-address-btn');
                                if (btn) {
                                  const originalText = btn.textContent;
                                  btn.textContent = '✓ Copied';
                                  setTimeout(() => {
                                    btn.textContent = originalText;
                                  }, 2000);
                                }
                                addNotification('success', 'Address copied!');
                              }}
                              title="Copy address"
                            >
                              📋 Copy
                            </button>
                          </div>
                        </div>

                        <div className="bitcoin-instructions enhanced">
                          <h4>📋 Steps to Complete Payment:</h4>
                          <ol>
                            <li>Copy the Bitcoin address above</li>
                            <li>Open your Bitcoin wallet</li>
                            <li>Send exactly <strong>{amount} BTC</strong> to the address</li>
                            <li>Wait for transaction confirmation</li>
                            <li>Click "Confirm Payment" below</li>
                          </ol>
                        </div>

                        <div className="bitcoin-warning enhanced">
                          ⚠️ <strong>Important:</strong> Only send Bitcoin (BTC) to this address. 
                          Sending other cryptocurrencies may result in permanent loss.
                        </div>

                        <div className="bitcoin-modal-actions">
                          <button 
                            className="confirm-bitcoin-btn"
                            onClick={handleBitcoinConfirmation}
                          >
                            ✅ I Sent Bitcoin - Confirm Payment
                          </button>
                          <button 
                            className="cancel-bitcoin-btn"
                            onClick={() => setShowBitcoinInstructions(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Transaction History */}
              {isConnected && userInvestments.transactions.length > 0 && (
                <div className="transaction-history enhanced">
                  <div className="history-header">
                    <h3>📊 Purchase History</h3>
                    <span className="transaction-count">
                      {userInvestments.transactions.length} transaction{userInvestments.transactions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="transactions-list">
                    {userInvestments.transactions.slice(-5).reverse().map((tx) => (
                      <div key={tx.id} className="transaction-item enhanced">
                        <div className="tx-header">
                          <div className="tx-main-info">
                            <span className="tx-amount">
                              {formatCurrency(tx.amount, tx.currency)}
                            </span>
                            <span className="tx-arrow">→</span>
                            <span className="tx-tokens">
                              {formatTokens(tx.tokens)} HL0
                            </span>
                          </div>
                          <div className="tx-badges">
                            <span className="tx-batch">Batch {tx.batchNumber}</span>
                            {tx.withStaking && <span className="tx-staking">🔒</span>}
                            <span className="tx-tier" style={{ backgroundColor: tx.tier.color }}>
                              {tx.tier.icon}
                            </span>
                          </div>
                        </div>
                        
                        <div className="tx-details">
                          <div className="tx-detail">
                            <span className="detail-label">Bonus:</span>
                            <span className="detail-value">
                              +{formatTokens(tx.bonusTokens)} HL0 ({tx.tier.bonusPercent}%)
                            </span>
                          </div>
                          <div className="tx-detail">
                            <span className="detail-label">USD Value:</span>
                            <span className="detail-value">{formatUSD(tx.usdValue)}</span>
                          </div>
                          <div className="tx-detail">
                            <span className="detail-label">Network:</span>
                            <span className="detail-value">
                              {NETWORKS[tx.network]?.icon} {NETWORKS[tx.network]?.name}
                            </span>
                          </div>
                        </div>

                        <div className="tx-meta">
                          <span className="tx-date">
                            {new Date(tx.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {tx.txHash && tx.network !== 'bitcoin' && (
                            <a 
                              href={`${NETWORKS[tx.network]?.blockExplorer}/tx/${tx.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tx-link"
                            >
                              View Transaction ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {userInvestments.transactions.length > 5 && (
                    <div className="view-all-transactions">
                      <button className="view-all-btn">
                        View All {userInvestments.transactions.length} Transactions
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Help & Support Section */}
              <div className="help-section">
                <h4>💬 Need Help?</h4>
                <div className="help-buttons">
                  <button 
                    className="help-btn"
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                  >
                    <span className="help-icon">📱</span>
                    WhatsApp Support
                  </button>
                  <button 
                    className="help-btn"
                    onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                  >
                    <span className="help-icon">✈️</span>
                    Telegram Bot
                  </button>
                </div>
                <div className="help-info">
                  <p>
                    24/7 support available to help with your purchase. 
                    Response in less than 5 minutes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;