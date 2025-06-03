import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { stakingContract, tokenContract } from '../lib/contracts';
import Countdown from 'react-countdown';

const StakingComponent = () => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [stakedAmount, setStakedAmount] = useState<string>('0');
  const [expectedReturn, setExpectedReturn] = useState<string>('0');
  const [currentRate, setCurrentRate] = useState<number>(1500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data para o próximo reset do temporizador (48 horas a partir de agora)
  const [nextResetDate, setNextResetDate] = useState<Date>(
    new Date(Date.now() + 48 * 60 * 60 * 1000)
  );

  // Atualiza o valor de retorno esperado quando o usuário altera a quantidade
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    if (value && !isNaN(parseFloat(value))) {
      const returnValue = stakingContract.calculateExpectedReturn(value);
      setExpectedReturn(returnValue);
    } else {
      setExpectedReturn('0');
    }
  };

  // Função para fazer staking de tokens
  const handleStake = async () => {
    if (!isConnected || !address) {
      setError('Por favor, conecte sua carteira primeiro');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Por favor, insira uma quantidade válida');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await stakingContract.stakeTokens(amount);
      
      if (success) {
        setSuccess(true);
        // Atualiza o valor em staking
        const newStakedAmount = await stakingContract.getStakedAmount(address);
        setStakedAmount(newStakedAmount);
        setAmount('');
        setExpectedReturn('0');
      } else {
        setError('Falha na transação. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro ao processar o staking: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega o valor em staking quando o endereço muda
  useEffect(() => {
    const loadStakedAmount = async () => {
      if (isConnected && address) {
        try {
          const amount = await stakingContract.getStakedAmount(address);
          setStakedAmount(amount);
        } catch (err) {
          console.error('Erro ao carregar valor em staking:', err);
        }
      }
    };

    loadStakedAmount();
  }, [address, isConnected]);

  // Função chamada quando o temporizador chega a zero
  const handleTimerComplete = () => {
    // Atualiza a taxa de staking (reduz em 10%)
    const newRate = stakingContract.updateRewardRate();
    setCurrentRate(newRate);
    
    // Reseta o temporizador para mais 48 horas
    setNextResetDate(new Date(Date.now() + 48 * 60 * 60 * 1000));
  };

  // Renderizador do temporizador
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Quando o temporizador chega a zero, ele será reiniciado automaticamente
      return <span>Atualizando taxa...</span>;
    } else {
      // Formato: DD:HH:MM:SS
      return (
        <span className="countdown-timer">
          {days.toString().padStart(2, '0')}:{hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      );
    }
  };

  return (
    <div className="staking-container">
      <h2>Staking BitFlow</h2>
      <p>Faça staking dos seus tokens BitFlow e ganhe recompensas incríveis.</p>
      
      <div className="rate-timer-container">
        <div className="current-rate">
          <h3>Taxa Atual de Staking</h3>
          <div className="rate-value">{currentRate}%</div>
          <p className="rate-info">A taxa será reduzida em 10% a cada 48 horas</p>
        </div>
        
        <div className="timer-container">
          <h3>Próxima Redução em</h3>
          <Countdown 
            date={nextResetDate} 
            renderer={renderer}
            onComplete={handleTimerComplete}
          />
        </div>
      </div>
      
      {!isConnected ? (
        <div className="connect-wallet-message">
          <p>Conecte sua carteira para fazer staking</p>
        </div>
      ) : (
        <div className="stake-form">
          <div className="staked-info">
            <p>Seu saldo em staking: <strong>{stakedAmount} BitFlow</strong></p>
          </div>
          
          <div className="input-group">
            <label htmlFor="stake-amount">Quantidade para staking</label>
            <input
              id="stake-amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Ex: 1000"
              disabled={isLoading}
              min="0"
            />
          </div>
          
          <div className="return-info">
            <p>Retorno esperado: <strong>{expectedReturn} BitFlow</strong></p>
            <p className="rate-info">Taxa atual: {currentRate}%</p>
          </div>
          
          <button 
            className="stake-button"
            onClick={handleStake}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
          >
            {isLoading ? 'Processando...' : 'Fazer Staking'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Staking realizado com sucesso! Seus tokens BitFlow estão rendendo.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StakingComponent;
