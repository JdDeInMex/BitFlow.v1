import React, { useState, useEffect } from 'react';
import './StakingDashboard.css';

interface StakingDashboardProps {
  isConnected: boolean;
  walletAddress: string | null;
  provider: any;
}

const StakingDashboard: React.FC<StakingDashboardProps> = ({
  isConnected,
  walletAddress,
  provider
}) => {
  // Estados
  const [stakedAmount, setStakedAmount] = useState<string>('0');
  const [stakingRewards, setStakingRewards] = useState<string>('0');
  const [currentAPY, setCurrentAPY] = useState<number>(1500);
  const [amountToStake, setAmountToStake] = useState<string>('');
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(172800); // 48 horas em segundos

  // Efeito para simular a obtenção de dados de staking quando conectado
  useEffect(() => {
    if (isConnected && walletAddress) {
      // Simulação de dados de staking
      setStakedAmount('1000');
      setStakingRewards('150');
      
      // Atualizar recompensas a cada 10 segundos (simulação)
      const interval = setInterval(() => {
        setStakingRewards(prev => {
          const current = parseFloat(prev);
          return (current + 0.01).toFixed(2);
        });
      }, 10000);
      
      return () => clearInterval(interval);
    } else {
      // Resetar estados quando desconectado
      setStakedAmount('0');
      setStakingRewards('0');
    }
  }, [isConnected, walletAddress]);

  // Efeito para simular a contagem regressiva
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Quando o tempo acabar, reduzir o APY em 10% e resetar o timer
      setCurrentAPY(prev => Math.max(prev - 10, 0));
      setTimeRemaining(172800); // Resetar para 48 horas
    }
  }, [timeRemaining]);

  // Função para formatar o tempo restante
  const formatTimeRemaining = (): string => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Função para fazer stake
  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError('Por favor, conecte sua carteira primeiro');
      return;
    }
    
    if (!amountToStake || parseFloat(amountToStake) <= 0) {
      setError('Por favor, insira um valor válido para stake');
      return;
    }
    
    setError(null);
    setIsStaking(true);
    
    try {
      // Simulação de stake (aqui seria a chamada real ao contrato)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar valores após stake bem-sucedido
      setStakedAmount(prev => {
        const current = parseFloat(prev);
        const toAdd = parseFloat(amountToStake);
        return (current + toAdd).toString();
      });
      
      setAmountToStake('');
      setIsStaking(false);
      
    } catch (err: any) {
      console.error('Erro ao fazer stake:', err);
      setError(err.message || 'Erro ao processar o stake');
      setIsStaking(false);
    }
  };

  // Função para fazer unstake
  const handleUnstake = async () => {
    if (!isConnected) {
      setError('Por favor, conecte sua carteira primeiro');
      return;
    }
    
    if (parseFloat(stakedAmount) <= 0) {
      setError('Você não tem tokens em stake para retirar');
      return;
    }
    
    setError(null);
    setIsStaking(true);
    
    try {
      // Simulação de unstake (aqui seria a chamada real ao contrato)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar valores após unstake bem-sucedido
      setStakedAmount('0');
      setStakingRewards('0');
      setIsStaking(false);
      
    } catch (err: any) {
      console.error('Erro ao fazer unstake:', err);
      setError(err.message || 'Erro ao processar o unstake');
      setIsStaking(false);
    }
  };

  // Função para reivindicar recompensas
  const handleClaimRewards = async () => {
    if (!isConnected) {
      setError('Por favor, conecte sua carteira primeiro');
      return;
    }
    
    if (parseFloat(stakingRewards) <= 0) {
      setError('Você não tem recompensas para reivindicar');
      return;
    }
    
    setError(null);
    setIsStaking(true);
    
    try {
      // Simulação de claim (aqui seria a chamada real ao contrato)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar valores após claim bem-sucedido
      setStakingRewards('0');
      setIsStaking(false);
      
    } catch (err: any) {
      console.error('Erro ao reivindicar recompensas:', err);
      setError(err.message || 'Erro ao reivindicar recompensas');
      setIsStaking(false);
    }
  };

  return (
    <div className="staking-dashboard">
      <div className="staking-header">
        <h2>Dashboard de Staking</h2>
        <div className="apy-info">
          <span className="apy-label">APY Atual:</span>
          <span className="apy-value">{currentAPY}%</span>
        </div>
      </div>
      
      <div className="countdown-timer">
        <h3>Próxima redução de APY em:</h3>
        <div className="timer">{formatTimeRemaining()}</div>
        <p className="timer-info">O APY será reduzido em 10% a cada 48 horas</p>
      </div>
      
      {!isConnected ? (
        <div className="connect-prompt">
          <p>Conecte sua carteira para acessar o staking</p>
        </div>
      ) : (
        <div className="staking-content">
          <div className="staking-stats">
            <div className="stat-card">
              <h4>Total em Stake</h4>
              <p className="stat-value">{stakedAmount} <span className="token-symbol">BITFLOW</span></p>
            </div>
            
            <div className="stat-card">
              <h4>Recompensas Acumuladas</h4>
              <p className="stat-value">{stakingRewards} <span className="token-symbol">BITFLOW</span></p>
            </div>
          </div>
          
          <form className="stake-form" onSubmit={handleStake}>
            <div className="input-group">
              <label htmlFor="stake-amount">Quantidade para Stake</label>
              <input
                id="stake-amount"
                type="number"
                placeholder="0.00"
                value={amountToStake}
                onChange={(e) => setAmountToStake(e.target.value)}
                disabled={isStaking}
              />
              <span className="token-symbol">BITFLOW</span>
            </div>
            
            <div className="staking-actions">
              <button 
                type="submit" 
                className="stake-button"
                disabled={isStaking || !amountToStake}
              >
                {isStaking ? 'Processando...' : 'Fazer Stake'}
              </button>
              
              <button 
                type="button" 
                className="unstake-button"
                onClick={handleUnstake}
                disabled={isStaking || parseFloat(stakedAmount) <= 0}
              >
                Retirar Stake
              </button>
              
              <button 
                type="button" 
                className="claim-button"
                onClick={handleClaimRewards}
                disabled={isStaking || parseFloat(stakingRewards) <= 0}
              >
                Reivindicar Recompensas
              </button>
            </div>
          </form>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="staking-info">
            <h4>Informações de Staking</h4>
            <ul>
              <li>Período mínimo de staking: 30 dias</li>
              <li>Recompensas distribuídas diariamente</li>
              <li>Taxa de saída antecipada: 10%</li>
              <li>APY atual: {currentAPY}%</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakingDashboard;
