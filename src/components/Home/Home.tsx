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

// CountdownTimer Component
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
  const isUrgent = timeRemaining <= 3600;
  
  return (
    <div className={`countdown-timer-wrapper ${isUrgent ? 'countdown-urgent' : ''}`}>
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
      
      {isUrgent && (
        <div className="urgent-badge">
          <span className="urgent-icon">⚡</span>
          <span className="urgent-text">FINAL HOURS!</span>
        </div>
      )}
    </div>
  );
};

// Types
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
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  tokens: number;
  timestamp: number;
  txHash?: string;
  network: string;
  withStaking: boolean;
  batchNumber: number;
}

interface Network {
  chainId: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  icon: string;
}

interface Currency {
  symbol: string;
  name: string;
  decimals: number;
  address?: Record<string, string>;
  icon: string;
  networks: string[];
}

interface BonusStructure {
  minUSD: number;
  bonusPercent: number;
  label: string;
  icon: string;
}

interface CurrentBatch {
  batchNumber: number;
  priceUSD: number;
  phase: string;
  basePrice: number; // Preço inicial do batch
  tokensTotal: number; // Total de tokens no batch
  tokensSold: number; // Tokens já vendidos
  daysElapsed: number; // Dias passados desde o início do batch
}

// Constants
const MIN_PURCHASE_USD = 5; // Mínimo de $5 USD
const DAILY_PRICE_INCREASE = 0.00001; // +$0.00001 por dia

// Bonus structure by purchase amount (USD)
const BONUS_STRUCTURE: BonusStructure[] = [
  { minUSD: 10000, bonusPercent: 100, label: "Whale Tier", icon: "🐋" },
  { minUSD: 5000, bonusPercent: 50, label: "Shark Tier", icon: "🦈" },
  { minUSD: 1000, bonusPercent: 10, label: "Dolphin Tier", icon: "🐬" },
  { minUSD: 0, bonusPercent: 0, label: "Fish Tier", icon: "🐟" }
];

// Get bonus based on USD amount
const getBonusForAmount = (usdAmount: number): BonusStructure => {
  for (const tier of BONUS_STRUCTURE) {
    if (usdAmount >= tier.minUSD) {
      return tier;
    }
  }
  return BONUS_STRUCTURE[BONUS_STRUCTURE.length - 1];
};

// Current batch data with daily price increases
const INITIAL_BATCH_DATA: CurrentBatch = {
  batchNumber: 1,
  priceUSD: 0.009,
  phase: "Early Innovation",
  basePrice: 0.009,
  tokensTotal: 400000000, // 400M tokens no Batch 1
  tokensSold: 287000000, // 287M já vendidos (71.75%)
  daysElapsed: 12 // 12 dias desde o início
};

// Constants for HyperLayer0
const PRESALE_WALLET_ADDRESS = '0x40481B31361888073592B329E73Ac2EFe07fB071';
const PRESALE_BTC_ADDRESS = 'bc1q3rcakxca9c5nlzaqkfsdw2ppvlwy2evyx9vsz0';
const WHATSAPP_NUMBER = '5531998203013';

// Networks configuration
const NETWORKS: Record<string, Network> = {
  ethereum: {
    chainId: '0x1',
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorer: 'https://etherscan.io',
    icon: '🔷'
  },
  bsc: {
    chainId: '0x38',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorer: 'https://bscscan.com',
    icon: '🟡'
  },
  polygon: {
    chainId: '0x89',
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    icon: '🟣'
  },
  arbitrum: {
    chainId: '0xa4b1',
    name: 'Arbitrum One',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    icon: '🔵'
  },
  bitcoin: {
    chainId: '0x0',
    name: 'Bitcoin',
    symbol: 'BTC',
    rpcUrl: '',
    blockExplorer: 'https://blockstream.info',
    icon: '₿'
  }
};

// Currencies configuration
const CURRENCIES: Record<string, Currency> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    icon: '🔷',
    networks: ['ethereum', 'arbitrum']
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    decimals: 8,
    icon: '₿',
    networks: ['bitcoin']
  },
  MATIC: {
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    icon: '🟣',
    networks: ['polygon']
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    icon: '🟡',
    networks: ['bsc']
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    decimals: 6,
    icon: '💲',
    address: {
      ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      bsc: '0x55d398326f99059fF775485246999027B3197955',
      arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
    },
    networks: ['ethereum', 'polygon', 'bsc', 'arbitrum']
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
      arbitrum: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    },
    networks: ['ethereum', 'polygon', 'bsc', 'arbitrum']
  }
};

// Price feeds
const PRICE_FEEDS: Record<string, number> = {
  ETH: 3500,
  BTC: 65000,
  MATIC: 0.85,
  BNB: 650,
  USDT: 1,
  USDC: 1
};

// Utility functions
const formatNumber = (num: number) => num.toString().padStart(2, '0');
const formatTokens = (tokens: number) => tokens.toLocaleString('en-US', { maximumFractionDigits: 2 });
const formatCurrency = (amount: number, currency: string) => 
  `${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${currency}`;

// Calculate current batch price with daily increases
const getCurrentBatchPrice = (batch: CurrentBatch): number => {
  return batch.basePrice + (batch.daysElapsed * DAILY_PRICE_INCREASE);
};

// WhatsApp notification function
const sendWhatsAppNotification = async (
  walletAddress: string, 
  amount: number, 
  currency: string, 
  tokens: number, 
  withStaking: boolean, 
  batchNumber: number,
  txHash?: string
) => {
  const shortWallet = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  const usdValue = amount * (PRICE_FEEDS[currency] || 1);
  const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  
  const message = `🚀 *NOVA COMPRA HYPERLAYER0* 🚀

💼 *Carteira:* ${shortWallet}
💰 *Valor:* ${amount.toFixed(8)} ${currency}
💵 *Valor USD:* $${usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
🪙 *Tokens HL0:* ${formatTokens(tokens)}
📦 *Lote:* ${batchNumber} (Early Innovation)
🎁 *Bônus:* Baseado no valor investido
${withStaking ? '🔒 *COM STAKING ATIVADO (100-1000% APR)*' : '💫 *SEM STAKING*'}
🌐 *Rede:* ${currency}
${txHash ? `🔗 *TX Hash:* ${txHash.slice(0, 10)}...${txHash.slice(-8)}` : ''}

💡 *PREÇO ATUAL:* $${getCurrentBatchPrice(INITIAL_BATCH_DATA).toFixed(6)}
📈 *AUMENTA:* +$0.00001 a cada 24h!

⏰ *Horário:* ${timestamp}

#HyperLayer0 #Web3 #Layer0 #PureUtility`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

// Local storage helpers
const getStoredInvestments = (address: string): UserInvestment => {
  if (!address) return { totalTokens: 0, totalInvested: 0, transactions: [] };
  const stored = localStorage.getItem(`hl0_investments_${address.toLowerCase()}`);
  return stored ? JSON.parse(stored) : { totalTokens: 0, totalInvested: 0, transactions: [] };
};

const saveInvestments = (address: string, investments: UserInvestment) => {
  if (!address) return;
  localStorage.setItem(`hl0_investments_${address.toLowerCase()}`, JSON.stringify(investments));
};

const Home: React.FC<HomeProps> = ({
  isConnected,
  walletAddress,
  provider,
  currentAPY,
  onCountdownComplete,
  onConnect,
  onPurchase
}) => {
  // State
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('crypto');
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [userInvestments, setUserInvestments] = useState<UserInvestment>({
    totalTokens: 0,
    totalInvested: 0,
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

  // Update current batch price every second to simulate daily increases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatch(prev => ({
        ...prev,
        priceUSD: getCurrentBatchPrice(prev)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get current chain ID
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
        }
      } catch (err) {
        console.error('Error getting chain ID:', err);
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
        }
      };

      if (provider.on) {
        provider.on('chainChanged', handleChainChanged);
        return () => {
          provider.removeListener('chainChanged', handleChainChanged);
        };
      }
    }
  }, [provider, isConnected]);

  // Load wallet balances
  const loadBalances = useCallback(async () => {
    if (!provider || !walletAddress) return;
    
    setIsLoadingBalances(true);
    try {
      const newBalances: Record<string, number> = {};

      if (selectedNetwork !== 'bitcoin') {
        try {
          const nativeBalance = await getWalletBalance(provider, walletAddress);
          const nativeToken = NETWORKS[selectedNetwork]?.symbol;
          if (nativeToken) {
            newBalances[nativeToken] = parseFloat(nativeBalance);
          }
        } catch (err) {
          console.error('Error loading native balance:', err);
        }
      }

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
    } catch (err) {
      console.error('Error loading balances:', err);
    } finally {
      setIsLoadingBalances(false);
    }
  }, [provider, walletAddress, selectedNetwork]);

  // Load user investments when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      const investments = getStoredInvestments(walletAddress);
      setUserInvestments(investments);
      loadBalances();
    } else {
      setUserInvestments({ totalTokens: 0, totalInvested: 0, transactions: [] });
      setBalances({});
    }
  }, [isConnected, walletAddress, loadBalances]);

  // Switch network
  const switchNetwork = useCallback(async (networkKey: string) => {
    if (networkKey === 'bitcoin') {
      setSelectedNetwork(networkKey);
      setSelectedCurrency('BTC');
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
        setSuccess(`Switched to ${network.name}`);
      }

    } catch (err: any) {
      console.error('Network switch failed:', err);
      const errorMessage = err.code === 4001 
        ? 'User rejected network switch'
        : (err.message || 'Failed to switch network');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadBalances]);

  // Calculate tokens to receive with tier-based bonus
  const tokensToReceive = useMemo(() => {
    if (!amount || parseFloat(amount) <= 0) return { base: 0, bonus: 0, total: 0, tier: BONUS_STRUCTURE[3] };
    
    const amountNum = parseFloat(amount);
    const currencyPrice = PRICE_FEEDS[selectedCurrency] || 1;
    const usdValue = amountNum * currencyPrice;
    const baseTokens = usdValue / currentBatch.priceUSD;
    
    const tier = getBonusForAmount(usdValue);
    const bonusTokens = (baseTokens * tier.bonusPercent) / 100;
    
    return {
      base: baseTokens,
      bonus: bonusTokens,
      total: baseTokens + bonusTokens,
      tier: tier
    };
  }, [amount, selectedCurrency, currentBatch.priceUSD]);

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

  // Handle purchase
  const handlePurchase = useCallback(async (stakingOption: boolean = false) => {
    if (!isConnected || !walletAddress || !provider) {
      onConnect();
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amount || amountNum <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Check minimum purchase in USD
    const currencyPrice = PRICE_FEEDS[selectedCurrency] || 1;
    const usdValue = amountNum * currencyPrice;

    if (usdValue < MIN_PURCHASE_USD) {
      setError(`Minimum purchase is $${MIN_PURCHASE_USD} USD`);
      return;
    }

    const currentBalance = balances[selectedCurrency] || 0;
    const isNativeToken = !CURRENCIES[selectedCurrency]?.address;
    const gasBuffer = isNativeToken ? 0.01 : 0;

    if (amountNum > (currentBalance * (1 - gasBuffer))) {
      setError(`Insufficient balance. You have ${currentBalance.toFixed(6)} ${selectedCurrency}${
        isNativeToken ? ' (need extra for gas fees)' : ''
      }`);
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
      const tokens = tokensToReceive.total;

      // Create transaction record
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: amountNum,
        currency: selectedCurrency,
        tokens,
        timestamp: Date.now(),
        txHash,
        network: selectedNetwork,
        withStaking: stakingOption,
        batchNumber: currentBatch.batchNumber
      };

      // Update user investments
      const updatedInvestments: UserInvestment = {
        totalTokens: userInvestments.totalTokens + tokens,
        totalInvested: userInvestments.totalInvested + usdValue,
        transactions: [...userInvestments.transactions, newTransaction]
      };

      setUserInvestments(updatedInvestments);
      saveInvestments(walletAddress, updatedInvestments);

      // Send WhatsApp notification
      await sendWhatsAppNotification(
        walletAddress, 
        amountNum, 
        selectedCurrency, 
        tokens, 
        stakingOption, 
        currentBatch.batchNumber,
        txHash
      );

      setSuccess(`Successfully purchased ${formatTokens(tokens)} HL0 tokens! 🚀`);
      setAmount('');
      
      setTimeout(() => loadBalances(), 2000);
      onPurchase(paymentMethod, amountNum, selectedCurrency);

    } catch (err: any) {
      console.error('Purchase error:', err);
      setError(getProviderErrorMessage(err));
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
    balances
  ]);

  // Handle Bitcoin confirmation
  const handleBitcoinConfirmation = useCallback(async () => {
    if (!amount || !walletAddress) return;

    const amountNum = parseFloat(amount);
    const currencyPrice = PRICE_FEEDS['BTC'] || 65000;
    const usdValue = amountNum * currencyPrice;
    const tokens = tokensToReceive.total;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: amountNum,
      currency: 'BTC',
      tokens,
      timestamp: Date.now(),
      network: 'bitcoin',
      withStaking,
      batchNumber: currentBatch.batchNumber
    };

    const updatedInvestments: UserInvestment = {
      totalTokens: userInvestments.totalTokens + tokens,
      totalInvested: userInvestments.totalInvested + usdValue,
      transactions: [...userInvestments.transactions, newTransaction]
    };

    setUserInvestments(updatedInvestments);
    saveInvestments(walletAddress, updatedInvestments);

    await sendWhatsAppNotification(
      walletAddress, 
      amountNum, 
      'BTC', 
      tokens, 
      withStaking,
      currentBatch.batchNumber
    );

    setSuccess(`Successfully purchased ${formatTokens(tokens)} HL0 with Bitcoin! 🚀`);
    setAmount('');
    setShowBitcoinInstructions(false);
    setWithStaking(false);

    onPurchase(paymentMethod, amountNum, 'BTC');
  }, [amount, walletAddress, tokensToReceive, userInvestments, paymentMethod, onPurchase, withStaking, currentBatch]);

  // Current balance for selected currency
  const currentBalance = balances[selectedCurrency] || 0;
  const isCorrectNetwork = currentChainId === NETWORKS[selectedNetwork]?.chainId;

  // Calculate next price increase time
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
      <div className="purchase-container">
        <div className="main-layout">
          {/* Left Side - Text Content */}
          <div className="text-side">
            <div className="guaranteed-returns-banner">
              <div className="banner-content">
                <div className="banner-icon">💰</div>
                <div className="banner-text">
                  <span className="banner-title">10,000%+ GUARANTEED!</span>
                  <span className="banner-subtitle">${currentBatch.priceUSD.toFixed(6)} → $0.90 Launch • 100x Presale Only</span>
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

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🆓</div>
                <div className="feature-text">
                  <h4>Zero Burns Forever</h4>
                  <p>No transaction burns, no bridge burns, no staking penalties - ever!</p>
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

            <div className="stats-section">
              <div className="stat">
                <div className="stat-number">0%</div>
                <div className="stat-label">Total Burns</div>
              </div>
              <div className="stat">
                <div className="stat-number">9.9B</div>
                <div className="stat-label">Forever Supply</div>
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

            {/* Bonus Structure Section */}
            <div className="bonus-structure-section">
              <h3>🎁 Bonus Structure - Batch {currentBatch.batchNumber}</h3>
              <p className="bonus-subtitle">Higher investment = Higher bonus percentage</p>
              
              <div className="bonus-tiers">
                {BONUS_STRUCTURE.map((tier, index) => (
                  <div key={index} className="bonus-tier">
                    <div className="tier-icon">{tier.icon}</div>
                    <div className="tier-info">
                      <div className="tier-name">{tier.label}</div>
                      <div className="tier-requirement">
                        {tier.minUSD > 0 ? `$${tier.minUSD.toLocaleString()}+` : 'Any amount'}
                      </div>
                      <div className="tier-bonus">+{tier.bonusPercent}% Bonus</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bonus-example">
                <h4>💡 Example:</h4>
                <p>
                  Buy $10,000 worth → Get 🐋 <strong>100% bonus</strong><br/>
                  Buy $5,000 worth → Get 🦈 <strong>50% bonus</strong><br/>
                  Buy $1,000 worth → Get 🐬 <strong>10% bonus</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Purchase Widget */}
          <div className="card-side">
            <div className="purchase-widget">
              {/* Countdown and Batch Info Combined */}
              <div className="countdown-section">
                <div className="batch-header">
                  <h2>🎯 Batch {currentBatch.batchNumber} - {currentBatch.phase}</h2>
                  <span className="current-price-display">${currentBatch.priceUSD.toFixed(6)}</span>
                </div>
                
                <div className="countdown-timer-container">
                  <h3>📈 Next Price Increase In:</h3>
                  <CountdownTimer 
                    initialHours={24}
                    onComplete={onCountdownComplete}
                    currentAPY={1000} // Batch 2 APY
                  />
                  <div className="price-increase-info">
                    <span>Tomorrow: <strong>${(currentBatch.priceUSD + DAILY_PRICE_INCREASE).toFixed(6)}</strong></span>
                    <span className="increase-note">APY stays 1000%</span>
                  </div>
                </div>

                <div className="batch-quick-info">
                  <div className="quick-stat">
                    <span className="stat-icon">🎁</span>
                    <span>Max Bonus: <strong>100% 🐋</strong></span>
                  </div>
                  <div className="quick-stat">
                    <span className="stat-icon">🔮</span>
                    <span>Current APY: <strong>1000%</strong></span>
                  </div>
                </div>
              </div>

              {/* Batch Progress with Next Batch Info */}
              <div className="progress-section">
                <div className="raised-amount">
                  Batch {currentBatch.batchNumber}: {currentBatch.tokensSold.toLocaleString()} / {currentBatch.tokensTotal.toLocaleString()} tokens
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(currentBatch.tokensSold / currentBatch.tokensTotal) * 100}%` }}></div>
                </div>
                <div className="progress-stats">
                  <span>{((currentBatch.tokensSold / currentBatch.tokensTotal) * 100).toFixed(2)}% Complete</span>
                  <span>{(currentBatch.tokensTotal - currentBatch.tokensSold).toLocaleString()} Remaining</span>
                </div>
                
                <div className="next-batch-info">
                  <div className="next-batch-alert">
                    <span className="alert-icon">⚡</span>
                    <div className="alert-content">
                      <div className="batch-warning-line"><strong>Batch 2:</strong> Price jumps directly to <strong>$0.015</strong></div>
                      <div className="batch-warning-line">APY drops to <strong>966%</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              {isConnected && (
                <div className="user-section">
                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-label">Your HL0 Tokens</span>
                      <span className="stat-value">{formatTokens(userInvestments.totalTokens)} HL0</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Total Invested</span>
                      <span className="stat-value">${userInvestments.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Potential APR</span>
                      <span className="stat-value">{currentAPY}% - 1000%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Purchase Form */}
              <div className="form-section">
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
                      💳 Card (soon)
                    </button>
                  </div>
                </div>

                {paymentMethod === 'crypto' && (
                  <>
                    <div className="form-group">
                      <label>Network</label>
                      <div className="network-selector">
                        {Object.entries(NETWORKS).map(([key, network]) => (
                          <button
                            key={key}
                            className={`network-option ${selectedNetwork === key ? 'active' : ''}`}
                            onClick={() => switchNetwork(key)}
                            disabled={isLoading}
                          >
                            <span className="network-icon">{network.icon}</span>
                            <span className="network-name">{network.name}</span>
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
                      <label>Currency</label>
                      <select 
                        value={selectedCurrency} 
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="currency-select"
                        disabled={isLoading}
                      >
                        {availableCurrencies.map(([symbol, currency]) => (
                          <option key={symbol} value={symbol}>
                            {currency.icon} {symbol} - {currency.name}
                          </option>
                        ))}
                      </select>
                      {isConnected && currentBalance > 0 && (
                        <div className="balance-info">
                          {isLoadingBalances ? (
                            '⏳ Loading balance...'
                          ) : (
                            `Balance: ${formatCurrency(currentBalance, selectedCurrency)}`
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Amount {paymentMethod === 'crypto' ? `(${selectedCurrency})` : '(USD)'}</label>
                  <div className="amount-input-group">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={selectedCurrency === 'BTC' ? '0.00000000' : '0.00'}
                      className="amount-input"
                      disabled={isLoading}
                      max={currentBalance}
                      step={selectedCurrency === 'BTC' ? '0.00000001' : '0.000001'}
                    />
                    <div className="quick-amounts">
                      {currentBalance > 0 && (
                        <button 
                          onClick={() => setAmount(currentBalance.toString())}
                          disabled={isLoading}
                          className="max-btn"
                        >
                          MAX
                        </button>
                      )}
                    </div>
                  </div>
                  {amount && tokensToReceive.total > 0 && (
                    <div className="tokens-received">
                      <div className="tokens-calculation">
                        <div className="tier-badge">
                          {tokensToReceive.tier.icon} {tokensToReceive.tier.label} - {tokensToReceive.tier.bonusPercent}% Bonus
                        </div>
                        <div className="tokens-breakdown">
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
                        </div>
                      </div>
                      {paymentMethod === 'crypto' && (
                        <div className="usd-equivalent">
                          Purchase value: ${(parseFloat(amount) * (PRICE_FEEDS[selectedCurrency] || 1)).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="error-message">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="success-message">
                    ✅ {success}
                  </div>
                )}

                <button 
                  className="purchase-btn"
                  onClick={() => handlePurchase(false)}
                  disabled={!amount || parseFloat(amount) <= 0 || isLoading || (!isConnected && paymentMethod === 'crypto')}
                >
                  {isLoading ? (
                    '⏳ Processing...'
                  ) : !isConnected && paymentMethod === 'crypto' ? (
                    '🔗 Connect Wallet'
                  ) : selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin' ? (
                    `₿ Pay ${amount} BTC`
                  ) : (
                    `💰 Buy ${formatTokens(tokensToReceive.total)} HL0`
                  )}
                </button>

                <button 
                  className="purchase-btn staking-btn"
                  onClick={() => handlePurchase(true)}
                  disabled={!amount || parseFloat(amount) <= 0 || isLoading || (!isConnected && paymentMethod === 'crypto')}
                >
                  {isLoading ? (
                    '⏳ Processing...'
                  ) : !isConnected && paymentMethod === 'crypto' ? (
                    '🔗 Connect Wallet'
                  ) : selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin' ? (
                    `🔒 Pay ${amount} BTC + Staking`
                  ) : (
                    `🔒 Buy ${formatTokens(tokensToReceive.total)} HL0 + Staking`
                  )}
                </button>

                <div className="staking-info">
                  <div className="staking-benefit">
                    <span className="staking-icon">🔒</span>
                    <div className="staking-text">
                      <strong>Pure Choice Staking:</strong> Lock tokens and earn 100-1000% APR based on your batch! 
                      <br/><strong>Zero Pressure:</strong> Your tokens remain yours forever - stake only if you want extra rewards. No penalties, ever!
                    </div>
                  </div>
                </div>

                {/* Bitcoin Payment Instructions Modal */}
                {showBitcoinInstructions && (
                  <div className="bitcoin-modal-overlay" onClick={() => setShowBitcoinInstructions(false)}>
                    <div className="bitcoin-modal" onClick={(e) => e.stopPropagation()}>
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
                        <div className="payment-details">
                          <div className="detail-row">
                            <span className="detail-label">Amount to Send:</span>
                            <span className="detail-value">{amount} BTC</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">USD Value:</span>
                            <span className="detail-value">${(parseFloat(amount || '0') * PRICE_FEEDS.BTC).toLocaleString()}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">HL0 Tokens:</span>
                            <span className="detail-value">{formatTokens(tokensToReceive.total)} HL0</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Bonus Tier:</span>
                            <span className="detail-value">{tokensToReceive.tier.icon} {tokensToReceive.tier.label} (+{tokensToReceive.tier.bonusPercent}%)</span>
                          </div>
                          {withStaking && (
                            <div className="detail-row staking-row">
                              <span className="detail-label">🔒 Staking:</span>
                              <span className="detail-value">Enabled (100-1000% APR)</span>
                            </div>
                          )}
                        </div>

                        <div className="bitcoin-address-section">
                          <div className="address-label">Bitcoin Address:</div>
                          <div className="bitcoin-address-display">
                            <code>{PRESALE_BTC_ADDRESS}</code>
                            <button 
                              className="copy-address-btn"
                              onClick={() => {
                                navigator.clipboard.writeText(PRESALE_BTC_ADDRESS);
                                const btn = document.querySelector('.copy-address-btn');
                                if (btn) {
                                  btn.textContent = '✓ Copied';
                                  setTimeout(() => {
                                    btn.textContent = '📋 Copy';
                                  }, 2000);
                                }
                              }}
                              title="Copy address"
                            >
                              📋 Copy
                            </button>
                          </div>
                        </div>

                        <div className="bitcoin-instructions">
                          <h4>📋 Steps to Complete Payment:</h4>
                          <ol>
                            <li>Copy the Bitcoin address above</li>
                            <li>Open your Bitcoin wallet</li>
                            <li>Send exactly <strong>{amount} BTC</strong> to the address</li>
                            <li>Wait for transaction confirmation</li>
                            <li>Click "Confirm Payment" below</li>
                          </ol>
                        </div>

                        <div className="bitcoin-warning">
                          ⚠️ <strong>Important:</strong> Only send Bitcoin (BTC) to this address. 
                          Sending other cryptocurrencies may result in permanent loss.
                        </div>

                        <div className="bitcoin-modal-actions">
                          <button 
                            className="confirm-bitcoin-btn"
                            onClick={handleBitcoinConfirmation}
                          >
                            ✅ I've Sent the Bitcoin - Confirm Payment
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

              {/* Transaction History */}
              {isConnected && userInvestments.transactions.length > 0 && (
                <div className="transaction-history">
                  <h3>Your Purchase History</h3>
                  <div className="transactions-list">
                    {userInvestments.transactions.slice(-5).reverse().map((tx) => (
                      <div key={tx.id} className="transaction-item">
                        <div className="tx-info">
                          <span className="tx-amount">
                            {formatCurrency(tx.amount, tx.currency)}
                          </span>
                          <span className="tx-tokens">
                            → {formatTokens(tx.tokens)} HL0
                          </span>
                          <span className="tx-batch">Batch {tx.batchNumber}</span>
                          {tx.withStaking && <span className="tx-staking">🔒</span>}
                        </div>
                        <div className="tx-meta">
                          <span className="tx-network">
                            {NETWORKS[tx.network]?.icon} {NETWORKS[tx.network]?.name}
                          </span>
                          <span className="tx-date">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </span>
                        </div>
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
