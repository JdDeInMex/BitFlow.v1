import React from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMaskConnector, bybitWalletConnector, walletConnectConnector } from '../lib/web3Config';

// Ícones para as carteiras (placeholders)
const MetaMaskIcon = () => <div className="wallet-icon metamask">MetaMask</div>;
const BybitWalletIcon = () => <div className="wallet-icon bybit">Bybit</div>;
const BestWalletIcon = () => <div className="wallet-icon bestwallet">BestWallet</div>;

const WalletConnect = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Função para formatar o endereço da carteira
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Renderiza o botão de conexão ou o endereço conectado
  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="address">{formatAddress(address)}</div>
        <button 
          onClick={() => disconnect()}
          className="disconnect-button"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect-container">
      <h2>Conecte sua carteira</h2>
      <p>Conecte sua carteira para participar da pré-venda do BitFlow</p>
      
      <div className="wallets-grid">
        {/* MetaMask */}
        <button
          disabled={!metaMaskConnector.ready}
          onClick={() => connect({ connector: metaMaskConnector })}
          className="wallet-button metamask"
        >
          <MetaMaskIcon />
          <span>MetaMask</span>
          {isLoading && pendingConnector?.id === metaMaskConnector.id && ' (conectando...)'}
        </button>

        {/* Bybit Wallet */}
        <button
          onClick={() => connect({ connector: bybitWalletConnector })}
          className="wallet-button bybit"
        >
          <BybitWalletIcon />
          <span>Bybit Wallet</span>
          {isLoading && pendingConnector?.id === bybitWalletConnector.id && ' (conectando...)'}
        </button>

        {/* BestWallet via WalletConnect */}
        <button
          onClick={() => connect({ connector: walletConnectConnector })}
          className="wallet-button bestwallet"
        >
          <BestWalletIcon />
          <span>BestWallet</span>
          {isLoading && pendingConnector?.id === walletConnectConnector.id && ' (conectando...)'}
        </button>
      </div>

      {error && <div className="connect-error">{error.message}</div>}
    </div>
  );
};

export default WalletConnect;
