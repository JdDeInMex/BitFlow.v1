// Arquivo de integração das funcionalidades Web3 com a interface do BitFlow

import React, { useState, useEffect } from 'react';
import { useWallet, useStaking, usePresale } from '../hooks/web3Hooks';

// Componente de integração Web3
const Web3Integration: React.FC = () => {
  // Estados para gerenciar a conexão da carteira
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks Web3
  const { connectWallet, checkConnection, disconnectWallet, formatAddress } = useWallet();
  const stakingHooks = useStaking(provider, walletAddress);
  const presaleHooks = usePresale(provider, walletAddress);
  
  // Verificar conexão existente ao carregar o componente
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const connection = await checkConnection();
        if (connection) {
          setIsConnected(true);
          setWalletAddress(connection.address);
          setProvider(connection.provider);
        }
      } catch (err) {
        console.error('Erro ao verificar conexão existente:', err);
      }
    };
    
    checkExistingConnection();
  }, []);
  
  // Função para conectar carteira
  const handleConnect = async (walletType: 'metamask' | 'bestwallet' | 'bybit') => {
    try {
      setError(null);
      const connection = await connectWallet(walletType);
      setIsConnected(true);
      setWalletAddress(connection.address);
      setProvider(connection.provider);
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar carteira');
      console.error('Erro ao conectar carteira:', err);
    }
  };
  
  // Função para desconectar carteira
  const handleDisconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    setWalletAddress(null);
    setProvider(null);
  };
  
  // Função para fazer stake
  const handleStake = async (amount: string) => {
    try {
      setError(null);
      await stakingHooks.stakeTokens(amount);
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer stake');
      console.error('Erro ao fazer stake:', err);
      return false;
    }
  };
  
  // Função para fazer unstake
  const handleUnstake = async () => {
    try {
      setError(null);
      await stakingHooks.unstakeTokens();
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer unstake');
      console.error('Erro ao fazer unstake:', err);
      return false;
    }
  };
  
  // Função para reivindicar recompensas
  const handleClaimRewards = async () => {
    try {
      setError(null);
      await stakingHooks.claimRewards();
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao reivindicar recompensas');
      console.error('Erro ao reivindicar recompensas:', err);
      return false;
    }
  };
  
  // Função para comprar tokens
  const handleBuyTokens = async (amount: string, paymentMethod: string) => {
    try {
      setError(null);
      await presaleHooks.buyTokens(amount, paymentMethod);
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao comprar tokens');
      console.error('Erro ao comprar tokens:', err);
      return false;
    }
  };
  
  // Função para estimar tokens
  const handleEstimateTokens = async (amount: string) => {
    try {
      return await presaleHooks.estimateTokens(amount);
    } catch (err) {
      console.error('Erro ao estimar tokens:', err);
      return '0';
    }
  };
  
  return {
    // Estado da conexão
    isConnected,
    walletAddress,
    provider,
    error,
    
    // Funções de carteira
    connectWallet: handleConnect,
    disconnectWallet: handleDisconnect,
    formatAddress,
    
    // Funções de staking
    stakeTokens: handleStake,
    unstakeTokens: handleUnstake,
    claimRewards: handleClaimRewards,
    getStakedAmount: stakingHooks.getStakedAmount,
    getRewards: stakingHooks.getRewards,
    getCurrentAPY: stakingHooks.getCurrentAPY,
    
    // Funções de pré-venda
    buyTokens: handleBuyTokens,
    getTokenPrice: presaleHooks.getTokenPrice,
    getMinimumPurchase: presaleHooks.getMinimumPurchase,
    estimateTokens: handleEstimateTokens
  };
};

export default Web3Integration;
