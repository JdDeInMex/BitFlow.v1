import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

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
  // Converter horas para segundos
  const initialSeconds = initialHours * 60 * 60;
  
  // Estado para o tempo restante em segundos
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  
  // Efeito para decrementar o contador a cada segundo
  useEffect(() => {
    // Se o tempo acabou, chamar o callback
    if (timeRemaining <= 0) {
      onComplete();
      return;
    }
    
    // Configurar o intervalo para decrementar a cada segundo
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [timeRemaining, onComplete]);
  
  // Calcular horas, minutos e segundos
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  // Formatar os valores com dois dígitos
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  // Calcular a porcentagem de tempo decorrido para a barra de progresso
  const progressPercentage = 100 - (timeRemaining / initialSeconds * 100);
  
  // Determinar se deve mostrar urgência (menos de 1 hora)
  const isUrgent = timeRemaining <= 3600;
  
  return (
    <div className={`countdown-timer-wrapper ${isUrgent ? 'countdown-urgent' : ''}`}>
      
      {/* Display principal do countdown */}
      <div className="countdown-display-main">
        <div className="time-segment">
          <div className="time-value">{formattedHours}</div>
          <div className="time-label">Horas</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedMinutes}</div>
          <div className="time-label">Min</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedSeconds}</div>
          <div className="time-label">Seg</div>
        </div>
      </div>
      
      {/* Barra de progresso compacta */}
      <div className="progress-container-compact">
        <div 
          className="progress-bar-compact" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Informações do APY em layout compacto */}
      <div className="apy-info-compact">
        <span className="apy-current">APY: <strong>{currentAPY}%</strong></span>
        <span className="apy-warning">Reduz 10% ao final</span>
      </div>
      
      {/* Warning de urgência quando necessário */}
      {isUrgent && (
        <div className="urgent-badge">
          <span className="urgent-icon">⚡</span>
          <span className="urgent-text">ÚLTIMAS HORAS!</span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;