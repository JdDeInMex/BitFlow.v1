import React from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, polygon, bsc } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import type { AppKitNetwork } from '@reown/appkit/networks';

// Setup queryClient
const queryClient = new QueryClient();

// Constants
const PROJECT_ID = '9b890db3767b4ddae3e99351d516e9a1';

// Create a metadata object
const metadata = {
  name: 'BitFlow',
  description: 'The Future of Bitcoin DeFi',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://bitflow.finance',
  icons: [`${typeof window !== 'undefined' ? window.location.origin : ''}/favicon.ico`]
};

// Set the networks with proper typing
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum, polygon, bsc];

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: PROJECT_ID,
  ssr: false
});

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId: PROJECT_ID,
  metadata,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#f7931a',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#f7931a',
    // Removed '--w3m-background' as it's not a valid theme variable
    '--w3m-border-radius-master': '8px',
    '--w3m-font-family': 'Montserrat, sans-serif'
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369', // Rainbow
    'c286eebc742a537cd1d6818363e9dc53b21759a1e8e5d9b263d0c03ec7703576'  // Uniswap Wallet
  ],
  features: {
    analytics: false
  }
});

// AppKit Provider Component
export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}