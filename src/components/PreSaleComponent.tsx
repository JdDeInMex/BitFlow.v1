import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { tokenContract } from '../lib/contracts';
import { ethers } from 'ethers';

const PreSaleComponent = () => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [ethAmount, setEthAmount] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Taxa de conversão fictícia: 1 ETH = 1000 BitFlow
  const conversionRate = 1000;

  // Atualiza o valor em ETH quando o usuário altera a quantidade de tokens
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    // Calcula o valor equivalente em ETH
    if (value && !isNaN(parseFloat(value))) {
      const ethValue = parseFloat(value) / conversionRate;
      setEthAmount(ethValue.toFixed(6));
    } else {
      setEthAmount('0');
    }
  };

  // Função para comprar tokens
  const handleBuy = async () => {
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
      const success = await tokenContract.buyTokens(ethAmount);
      
      if (success) {
        setSuccess(true);
        setAmount('');
        setEthAmount('0');
      } else {
        setError('Falha na transação. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro ao processar a compra: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="presale-container">
      <h2>Pré-venda BitFlow</h2>
      <p>Participe da pré-venda e adquira tokens BitFlow antes do lançamento oficial.</p>
      
      {!isConnected ? (
        <div className="connect-wallet-message">
          <p>Conecte sua carteira para participar da pré-venda</p>
        </div>
      ) : (
        <div className="buy-form">
          <div className="input-group">
            <label htmlFor="token-amount">Quantidade de tokens BitFlow</label>
            <input
              id="token-amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Ex: 1000"
              disabled={isLoading}
              min="0"
            />
          </div>
          
          <div className="conversion-info">
            <p>Você pagará: <strong>{ethAmount} ETH</strong></p>
            <p className="rate-info">Taxa: 1 ETH = {conversionRate} BitFlow</p>
          </div>
          
          <button 
            className="buy-button"
            onClick={handleBuy}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
          >
            {isLoading ? 'Processando...' : 'Comprar Tokens'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Compra realizada com sucesso! Seus tokens BitFlow foram adicionados à sua carteira.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreSaleComponent;
