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

// Constants
const BFLOW_PRICE = 0.001742; // Price in USD
const PRESALE_TARGET = 5000000; // $5M target
const PRESALE_INITIAL_RAISED = 3280000; // Initial raised amount
const PRESALE_WALLET_ADDRESS = '0x40481B31361888073592B329E73Ac2EFe07fB071'; // Real presale wallet
const PRESALE_BTC_ADDRESS = 'bc1q3rcakxca9c5nlzaqkfsdw2ppvlwy2evyx9vsz0'; // Bitcoin wallet address
const WHATSAPP_NUMBER = '5531998203013'; // WhatsApp number for notifications

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
    name: 'BSC',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
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
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    icon: '🔵'
  },
  bitcoin: {
    chainId: '0x0', // Bitcoin doesn't use EVM chainId
    name: 'Bitcoin',
    symbol: 'BTC',
    rpcUrl: '', // Bitcoin uses different RPC structure
    blockExplorer: 'https://blockstream.info',
    icon: '₿'
  }
};

// Currencies configuration with correct addresses
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

// Price feeds (in a real app, use Chainlink oracles or DEX APIs)
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

// WhatsApp notification function
const sendWhatsAppNotification = async (
  walletAddress: string, 
  amount: number, 
  currency: string, 
  tokens: number, 
  withStaking: boolean, 
  txHash?: string
) => {
  const shortWallet = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  const usdValue = amount * (PRICE_FEEDS[currency] || 1);
  const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  
  const message = `🚀 *NOVA COMPRA BFLOW* 🚀

💼 *Carteira:* ${shortWallet}
💰 *Valor:* ${amount.toFixed(8)} ${currency}
💵 *Valor USD:* $${usdValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
🪙 *Tokens BFLOW:* ${formatTokens(tokens)}
${withStaking ? '🔒 *COM STAKING ATIVADO*' : '💫 *SEM STAKING*'}
🌐 *Rede:* ${currency}
${txHash ? `🔗 *TX Hash:* ${txHash.slice(0, 10)}...${txHash.slice(-8)}` : ''}

⏰ *Horário:* ${timestamp}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
};

// Local storage helpers
const getStoredInvestments = (address: string): UserInvestment => {
  if (!address) return { totalTokens: 0, totalInvested: 0, transactions: [] };
  const stored = localStorage.getItem(`bflow_investments_${address.toLowerCase()}`);
  return stored ? JSON.parse(stored) : { totalTokens: 0, totalInvested: 0, transactions: [] };
};

const saveInvestments = (address: string, investments: UserInvestment) => {
  if (!address) return;
  localStorage.setItem(`bflow_investments_${address.toLowerCase()}`, JSON.stringify(investments));
};

// Global presale tracking
const getGlobalPresaleData = () => {
  const stored = localStorage.getItem('bflow_global_presale');
  return stored ? JSON.parse(stored) : { totalRaised: PRESALE_INITIAL_RAISED, totalTransactions: 0 };
};

const updateGlobalPresaleData = (additionalAmount: number) => {
  const current = getGlobalPresaleData();
  const updated = {
    totalRaised: current.totalRaised + additionalAmount,
    totalTransactions: current.totalTransactions + 1,
    lastUpdate: Date.now()
  };
  localStorage.setItem('bflow_global_presale', JSON.stringify(updated));
  return updated;
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
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

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
  const [currentPresaleData, setCurrentPresaleData] = useState(() => getGlobalPresaleData());
  const [showBitcoinInstructions, setShowBitcoinInstructions] = useState(false);
  const [withStaking, setWithStaking] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          onCountdownComplete();
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onCountdownComplete]);

  // Get current chain ID
  useEffect(() => {
    const getChainId = async () => {
      if (!provider) return;
      
      try {
        const chainId = await provider.request({ method: 'eth_chainId' });
        setCurrentChainId(chainId);
        
        // Auto-select network based on chain ID
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
      
      // Listen for chain changes
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

    console.log('Loading balances for:', walletAddress, 'Network:', selectedNetwork);

    try {
      const newBalances: Record<string, number> = {};

      // Get native token balance for current network
      try {
        const nativeBalance = await getWalletBalance(provider, walletAddress);
        console.log('Native balance raw:', nativeBalance);
        
        // Handle different native tokens per network
        if (selectedNetwork === 'ethereum' || selectedNetwork === 'arbitrum') {
          newBalances['ETH'] = parseFloat(nativeBalance);
        } else if (selectedNetwork === 'bsc') {
          newBalances['BNB'] = parseFloat(nativeBalance);
        } else if (selectedNetwork === 'polygon') {
          newBalances['MATIC'] = parseFloat(nativeBalance);
        }
        
        console.log('Native balance parsed:', newBalances);
      } catch (err) {
        console.error('Error loading native balance:', err);
      }

      // Get ERC20 token balances
      for (const [symbol, currency] of Object.entries(CURRENCIES)) {
        if (currency.address && currency.address[selectedNetwork]) {
          try {
            const tokenBalance = await getTokenBalance(
              provider,
              currency.address[selectedNetwork],
              walletAddress,
              currency.decimals
            );
            newBalances[symbol] = parseFloat(tokenBalance);
            console.log(`${symbol} balance:`, newBalances[symbol]);
          } catch (err) {
            console.log(`Could not load ${symbol} balance:`, err);
            newBalances[symbol] = 0;
          }
        }
      }

      console.log('All balances loaded:', newBalances);
      setBalances(newBalances);
    } catch (err) {
      console.error('Error loading balances:', err);
    }
  }, [provider, walletAddress, selectedNetwork]);

  // Load user investments and balances when wallet connects
  useEffect(() => {
    if (isConnected && walletAddress) {
      const investments = getStoredInvestments(walletAddress);
      setUserInvestments(investments);
      loadBalances();
      
      // Refresh global presale data
      setCurrentPresaleData(getGlobalPresaleData());
    } else {
      setUserInvestments({ totalTokens: 0, totalInvested: 0, transactions: [] });
      setBalances({});
    }
  }, [isConnected, walletAddress, loadBalances]);

  // Reload balances when network changes
  useEffect(() => {
    if (isConnected && walletAddress) {
      loadBalances();
    }
  }, [selectedNetwork, isConnected, walletAddress, loadBalances]);

  // Switch network
  const switchNetwork = useCallback(async (networkKey: string) => {
    if (!provider) return;

    // Handle Bitcoin network separately
    if (networkKey === 'bitcoin') {
      setSelectedNetwork(networkKey);
      setSelectedCurrency('BTC');
      setError(''); 
      return;
    }

    try {
      setIsLoading(true);
      const network = NETWORKS[networkKey];
      
      await switchToNetwork(provider, network.chainId, {
        chainName: network.name,
        rpcUrls: [network.rpcUrl],
        blockExplorerUrls: [network.blockExplorer],
        nativeCurrency: {
          name: network.name,
          symbol: network.symbol,
          decimals: 18
        }
      });
      
      setSelectedNetwork(networkKey);
      setError('');
      setSuccess('Network switched successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      // Reload balances after network switch
      setTimeout(() => loadBalances(), 1000);
    } catch (err: any) {
      console.error('Error switching network:', err);
      setError(getProviderErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [provider, loadBalances]);

  // Calculate tokens to receive
  const tokensToReceive = useMemo(() => {
    if (!amount || parseFloat(amount) <= 0) return 0;
    const amountNum = parseFloat(amount);
    const currencyPrice = PRICE_FEEDS[selectedCurrency] || 1;
    const usdValue = amountNum * currencyPrice;
    return usdValue / BFLOW_PRICE;
  }, [amount, selectedCurrency]);

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
      // Select native currency of the network or first available
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

    // Check balance
    const currentBalance = balances[selectedCurrency] || 0;
    if (amountNum > currentBalance) {
      setError(`Insufficient balance. You have ${currentBalance.toFixed(6)} ${selectedCurrency}`);
      return;
    }

    // Handle Bitcoin payments
    if (selectedCurrency === 'BTC' && selectedNetwork === 'bitcoin') {
      setWithStaking(stakingOption);
      setShowBitcoinInstructions(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const currency = CURRENCIES[selectedCurrency];
      let txHash = '';

      // Send transaction
      if (currency.address && currency.address[selectedNetwork]) {
        // ERC20 token transfer
        txHash = await sendTokenTransaction(
          provider,
          currency.address[selectedNetwork],
          PRESALE_WALLET_ADDRESS,
          amount,
          currency.decimals
        );
      } else {
        // Native token transfer
        txHash = await sendNativeTransaction(
          provider,
          PRESALE_WALLET_ADDRESS,
          amount
        );
      }

      // Calculate values
      const currencyPrice = PRICE_FEEDS[selectedCurrency] || 1;
      const usdValue = amountNum * currencyPrice;
      const tokens = tokensToReceive;

      // Create transaction record
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount: amountNum,
        currency: selectedCurrency,
        tokens,
        timestamp: Date.now(),
        txHash,
        network: selectedNetwork,
        withStaking: stakingOption
      };

      // Update user investments
      const updatedInvestments: UserInvestment = {
        totalTokens: userInvestments.totalTokens + tokens,
        totalInvested: userInvestments.totalInvested + usdValue,
        transactions: [...userInvestments.transactions, newTransaction]
      };

      setUserInvestments(updatedInvestments);
      saveInvestments(walletAddress, updatedInvestments);

      // Update global presale data
      const updatedPresaleData = updateGlobalPresaleData(usdValue);
      setCurrentPresaleData(updatedPresaleData);

      // Send WhatsApp notification
      await sendWhatsAppNotification(walletAddress, amountNum, selectedCurrency, tokens, stakingOption, txHash);

      // Show success message
      setSuccess(`Successfully purchased ${formatTokens(tokens)} BFLOW!`);
      
      // Reset form
      setAmount('');
      
      // Reload balances
      setTimeout(() => loadBalances(), 2000);

      // Call parent purchase handler
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
    onConnect,
    onPurchase,
    loadBalances,
    balances
  ]);

  // Handle manual Bitcoin confirmation
  const handleBitcoinConfirmation = useCallback(async () => {
    if (!amount || !walletAddress) return;

    const amountNum = parseFloat(amount);
    const currencyPrice = PRICE_FEEDS['BTC'] || 65000;
    const usdValue = amountNum * currencyPrice;
    const tokens = tokensToReceive;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: amountNum,
      currency: 'BTC',
      tokens,
      timestamp: Date.now(),
      network: 'bitcoin',
      withStaking
    };

    const updatedInvestments: UserInvestment = {
      totalTokens: userInvestments.totalTokens + tokens,
      totalInvested: userInvestments.totalInvested + usdValue,
      transactions: [...userInvestments.transactions, newTransaction]
    };

    setUserInvestments(updatedInvestments);
    saveInvestments(walletAddress, updatedInvestments);

    // Update global presale data
    const updatedPresaleData = updateGlobalPresaleData(usdValue);
    setCurrentPresaleData(updatedPresaleData);

    // Send WhatsApp notification
    await sendWhatsAppNotification(walletAddress, amountNum, 'BTC', tokens, withStaking);

    // Show success
    setSuccess(`Successfully purchased ${formatTokens(tokens)} BFLOW with Bitcoin!`);

    // Reset form and close instructions
    setAmount('');
    setShowBitcoinInstructions(false);
    setWithStaking(false);

    // Call parent purchase handler
    onPurchase(paymentMethod, amountNum, 'BTC');
  }, [amount, walletAddress, tokensToReceive, userInvestments, paymentMethod, onPurchase, withStaking]);

  // Current balance for selected currency
  const currentBalance = balances[selectedCurrency] || 0;

  // Check if current network matches selected network
  const isCorrectNetwork = currentChainId === NETWORKS[selectedNetwork]?.chainId;

  return (
    <main className="main-purchase-section">
      <div className="purchase-container">
        <div className="main-layout">
          {/* Left Side - Text Content */}
          <div className="text-side">
            <button className="connect-btn" onClick={onConnect}>
              {isConnected ? '✓ Wallet Connected' : '🔗 Connect Wallet'}
            </button>
            
            <h1>
              The Future of <span className="highlight">Bitcoin DeFi</span> is Here
            </h1>
            
            <p>
              <strong>$BFLOW</strong> is the native token of the Bitflow ecosystem, 
              the first native Bitcoin DEX that allows Bitcoiners 
              to trade, lend and earn real yield with Bitcoin, 
              eliminating malicious intermediaries.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">₿</div>
                <div className="feature-text">
                  <h4>Bitcoin Native</h4>
                  <p>Built specifically for the Bitcoin ecosystem</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <div className="feature-text">
                  <h4>DEX Aggregator</h4>
                  <p>Best swap rates guaranteed on Stacks network</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <div className="feature-text">
                  <h4>Real Yield</h4>
                  <p>Earn real yield derived from trading activity</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h4>Non-Custodial</h4>
                  <p>Your keys, your coins, your yield</p>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <div className="stat">
                <div className="stat-number">$18.7M</div>
                <div className="stat-label">Total Value Locked</div>
              </div>
              <div className="stat">
                <div className="stat-number">$2.4M</div>
                <div className="stat-label">24h Volume</div>
              </div>
              <div className="stat">
                <div className="stat-number">24</div>
                <div className="stat-label">Trading Pairs</div>
              </div>
            </div>
          </div>

          {/* Right Side - Purchase Widget */}
          <div className="card-side">
            <div className="purchase-widget">
              {/* Countdown */}
              <div className="countdown-section">
                <h2>🚀 Pre-Sale Ends In:</h2>
                <div className="countdown-display">
                  <div>
                    <div className="countdown-item">
                      <span className="countdown-number">{formatNumber(timeLeft.days)}</span>
                      <span className="countdown-label">Days</span>
                    </div>
                    <span className="separator">:</span>
                    <div className="countdown-item">
                      <span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
                      <span className="countdown-label">Hours</span>
                    </div>
                    <span className="separator">:</span>
                    <div className="countdown-item">
                      <span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
                      <span className="countdown-label">Min</span>
                    </div>
                    <span className="separator">:</span>
                    <div className="countdown-item">
                      <span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>
                      <span className="countdown-label">Sec</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="progress-section">
                <div className="raised-amount">
                  Raised: ${currentPresaleData.totalRaised.toLocaleString()} / ${PRESALE_TARGET.toLocaleString()}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min((currentPresaleData.totalRaised / PRESALE_TARGET) * 100, 100)}%` }}></div>
                </div>
                <div className="progress-stats">
                  <span>{((currentPresaleData.totalRaised / PRESALE_TARGET) * 100).toFixed(1)}% Complete</span>
                  <span>${(PRESALE_TARGET - currentPresaleData.totalRaised).toLocaleString()} Remaining</span>
                </div>
              </div>

              {/* User Stats */}
              {isConnected && (
                <div className="user-section">
                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-label">Your $BFLOW Tokens</span>
                      <span className="stat-value">{formatTokens(userInvestments.totalTokens)} BFLOW</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Total Invested</span>
                      <span className="stat-value">${userInvestments.totalInvested.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-label">Estimated APY</span>
                      <span className="stat-value">{currentAPY}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Token Price */}
              <div className="price-section">
                <div className="token-price">
                  1 BFLOW = ${BFLOW_PRICE}
                </div>
              </div>

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
                          Balance: {formatCurrency(currentBalance, selectedCurrency)}
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
                  {amount && tokensToReceive > 0 && (
                    <div className="tokens-received">
                      You will receive: {formatTokens(tokensToReceive)} BFLOW
                      {paymentMethod === 'crypto' && (
                        <div className="usd-equivalent">
                          ≈ ${(parseFloat(amount) * (PRICE_FEEDS[selectedCurrency] || 1)).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
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
                    `💰 Buy ${formatTokens(tokensToReceive)} BFLOW`
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
                    `🔒 Buy ${formatTokens(tokensToReceive)} BFLOW + Staking`
                  )}
                </button>

                <div className="staking-info">
                  <div className="staking-benefit">
                    <span className="staking-icon">🔒</span>
                    <div className="staking-text">
                      <strong>Staking Bonus:</strong> Lock your tokens for 12 months and earn {currentAPY}% APY + extra rewards!
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
                            <span className="detail-label">BFLOW Tokens:</span>
                            <span className="detail-value">{formatTokens(tokensToReceive)} BFLOW</span>
                          </div>
                          {withStaking && (
                            <div className="detail-row staking-row">
                              <span className="detail-label">🔒 Staking:</span>
                              <span className="detail-value">Enabled (12 months)</span>
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
                            → {formatTokens(tx.tokens)} BFLOW
                          </span>
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