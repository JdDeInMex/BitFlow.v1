import { createClient, configureChains, Chain } from 'wagmi';
import { mainnet, bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

// Configuração das chains suportadas
const { chains, provider } = configureChains(
  [mainnet, bsc],
  [publicProvider()]
);

// Configuração dos conectores de carteira
const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
});

// Conector genérico para carteiras injetadas (como Bybit Wallet)
const bybitWalletConnector = new InjectedConnector({
  chains,
  options: {
    name: 'Bybit Wallet',
    shimDisconnect: true,
  },
});

// Conector WalletConnect para BestWallet e outras carteiras compatíveis
const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: 'bitflow-project', // Normalmente seria necessário um ID de projeto real
    showQrModal: true,
  },
});

// Cliente Wagmi
export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    metaMaskConnector,
    bybitWalletConnector,
    walletConnectConnector,
  ],
  provider,
});

// Exportando chains e conectores para uso em componentes
export { chains, metaMaskConnector, bybitWalletConnector, walletConnectConnector };
