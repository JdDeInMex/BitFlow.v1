/**
 * Presale Configuration
 * Centralized configuration for the Bitflow presale
 */

export const PRESALE_CONFIG = {
  // Wallet address where all crypto payments will be sent
  WALLET_ADDRESS: '0x40481B31361888073592B329E73Ac2EFe07fB071',
  
  // Token information
  TOKEN: {
    SYMBOL: 'BFLOW',
    NAME: 'Bitflow Token',
    PRICE_USD: 0.001742, // Price per token in USD
    DECIMALS: 18
  },
  
  // Presale targets
  TARGETS: {
    TOTAL_RAISE: 5000000, // $5M total target
    CURRENT_RAISED: 3280000, // Current amount raised
    MIN_PURCHASE: 0.001, // Minimum purchase amount
    MAX_PURCHASE: 1000000 // Maximum purchase amount (no limit effectively)
  },
  
  // APY Configuration
  APY: {
    INITIAL: 1500, // 1500% initial APY
    REDUCTION_ON_COUNTDOWN_END: 10 // Reduce by 10% when countdown ends
  },
  
  // Countdown configuration (in seconds from now)
  COUNTDOWN: {
    DURATION: 15 * 24 * 60 * 60 + 8 * 60 * 60 + 42 * 60 + 30, // 15 days, 8 hours, 42 minutes, 30 seconds
    START_TIME: Date.now() // When the countdown started
  },
  
  // Supported networks and their configurations
  NETWORKS: {
    ethereum: {
      name: 'Ethereum',
      chainId: '0x1',
      rpcUrl: 'https://mainnet.infura.io/v3/your-key',
      blockExplorer: 'https://etherscan.io',
      icon: '🔷',
      nativeCurrency: 'ETH'
    },
    polygon: {
      name: 'Polygon',
      chainId: '0x89',
      rpcUrl: 'https://polygon-rpc.com',
      blockExplorer: 'https://polygonscan.com',
      icon: '🟣',
      nativeCurrency: 'MATIC'
    },
    bsc: {
      name: 'BSC',
      chainId: '0x38',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      blockExplorer: 'https://bscscan.com',
      icon: '🟡',
      nativeCurrency: 'BNB'
    },
    arbitrum: {
      name: 'Arbitrum',
      chainId: '0xa4b1',
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      blockExplorer: 'https://arbiscan.io',
      icon: '🔵',
      nativeCurrency: 'ETH'
    }
  },
  
  // Supported currencies with contract addresses
  CURRENCIES: {
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      icon: '🔷',
      networks: ['ethereum', 'arbitrum'],
      isNative: true
    },
    MATIC: {
      symbol: 'MATIC',
      name: 'Polygon',
      decimals: 18,
      icon: '🟣',
      networks: ['polygon'],
      isNative: true
    },
    BNB: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18,
      icon: '🟡',
      networks: ['bsc'],
      isNative: true
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether',
      decimals: 6,
      icon: '💲',
      networks: ['ethereum', 'polygon', 'bsc'],
      isNative: false,
      addresses: {
        ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        bsc: '0x55d398326f99059fF775485246999027B3197955'
      }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      icon: '🔵',
      networks: ['ethereum', 'polygon', 'bsc'],
      isNative: false,
      addresses: {
        ethereum: '0xA0b86a33E6441e58632aCee7F3E5229C93F2A0D5',
        polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        bsc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
      }
    }
  },
  
  // Price feeds (in production, use Chainlink oracles or DEX APIs)
  PRICE_FEEDS: {
    ETH: 3500,
    BTC: 65000,
    MATIC: 0.85,
    BNB: 650,
    USDT: 1,
    USDC: 1
  },
  
  // Quick amount presets
  QUICK_AMOUNTS: {
    crypto: [0.1, 0.5, 1, 5],
    percentages: [25, 50, 75, 100] // Percentages of available balance
  },
  
  // Transaction settings
  TRANSACTION: {
    GAS_LIMIT_NATIVE: 21000,
    GAS_LIMIT_TOKEN: 65000,
    CONFIRMATION_BLOCKS: 1,
    TIMEOUT_SECONDS: 300 // 5 minutes
  },
  
  // UI Messages
  MESSAGES: {
    SUCCESS: {
      PURCHASE: 'Compra realizada com sucesso! Tokens BFLOW creditados.',
      WALLET_CONNECTED: 'Carteira conectada com sucesso!',
      NETWORK_SWITCHED: 'Rede alterada com sucesso!'
    },
    ERROR: {
      INSUFFICIENT_BALANCE: 'Saldo insuficiente para esta transação',
      NETWORK_SWITCH_FAILED: 'Falha ao trocar de rede',
      TRANSACTION_FAILED: 'Transação falhou. Tente novamente.',
      WALLET_NOT_CONNECTED: 'Conecte sua carteira primeiro',
      INVALID_AMOUNT: 'Valor inválido inserido'
    },
    INFO: {
      COUNTDOWN_ENDED: 'Pre-sale finalizada! Tokens disponíveis no mercado secundário.',
      HIGH_RISK_WARNING: 'Esta é uma oferta de investimento de alto risco. Invista apenas o que pode perder.',
      DIRECT_TRANSFER: 'Todas as cryptos são enviadas diretamente para a carteira de presale'
    }
  },
  
  // Feature flags
  FEATURES: {
    ENABLE_CARD_PAYMENTS: false, // Set to true when card integration is ready
    ENABLE_REFERRAL_SYSTEM: false, // Future feature
    ENABLE_BONUS_TOKENS: false, // Future feature
    SHOW_COUNTDOWN: true,
    SHOW_PROGRESS_BAR: true,
    SHOW_TRANSACTION_HISTORY: true,
    SHOW_PRESALE_ADDRESS: true
  },
  
  // Analytics and tracking
  ANALYTICS: {
    TRACK_PURCHASES: true,
    TRACK_WALLET_CONNECTIONS: true,
    TRACK_NETWORK_SWITCHES: true
  }
};

// Helper functions
export const getNetworkConfig = (networkKey: string) => {
  return PRESALE_CONFIG.NETWORKS[networkKey as keyof typeof PRESALE_CONFIG.NETWORKS];
};

export const getCurrencyConfig = (currencyKey: string) => {
  return PRESALE_CONFIG.CURRENCIES[currencyKey as keyof typeof PRESALE_CONFIG.CURRENCIES];
};

export const calculateTokenAmount = (amount: number, currency: string): number => {
  const currencyPrice = PRESALE_CONFIG.PRICE_FEEDS[currency as keyof typeof PRESALE_CONFIG.PRICE_FEEDS] || 1;
  const usdValue = amount * currencyPrice;
  return usdValue / PRESALE_CONFIG.TOKEN.PRICE_USD;
};

export const calculateUSDValue = (amount: number, currency: string): number => {
  const currencyPrice = PRESALE_CONFIG.PRICE_FEEDS[currency as keyof typeof PRESALE_CONFIG.PRICE_FEEDS] || 1;
  return amount * currencyPrice;
};

export const getPresaleProgress = (): number => {
  return (PRESALE_CONFIG.TARGETS.CURRENT_RAISED / PRESALE_CONFIG.TARGETS.TOTAL_RAISE) * 100;
};

export const getRemainingAmount = (): number => {
  return PRESALE_CONFIG.TARGETS.TOTAL_RAISE - PRESALE_CONFIG.TARGETS.CURRENT_RAISED;
};

export const isValidPurchaseAmount = (amount: number): boolean => {
  return amount >= PRESALE_CONFIG.TARGETS.MIN_PURCHASE && amount <= PRESALE_CONFIG.TARGETS.MAX_PURCHASE;
};

// Development vs Production configurations
export const isDevelopment = process.env.NODE_ENV === 'development';

// Export default for easy importing
export default PRESALE_CONFIG;