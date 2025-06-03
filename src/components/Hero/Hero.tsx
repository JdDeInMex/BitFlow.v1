import React from 'react';
import './Hero.css';

interface HeroProps {
  onConnectWallet: () => void;
}

const Hero: React.FC<HeroProps> = ({ onConnectWallet }) => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        {/* Partículas animadas e efeito de fundo */}
        <div className="particles-container"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-logo">
          <span className="logo-letter">B</span>
          <span className="logo-text">BitFlow</span>
        </div>
        
        <h1 className="hero-title">
          A Revolução <span className="highlight">Layer 2</span> para Bitcoin
        </h1>
        
        <p className="hero-subtitle">
          Escalabilidade ilimitada, taxas mínimas e funcionalidades avançadas para o futuro do ecossistema Bitcoin
        </p>
        
        <div className="hero-cta">
          <button className="primary-button connect-button" onClick={onConnectWallet}>
            Conectar Carteira
          </button>
          
          <button className="secondary-button explore-button">
            Explorar BitFlow
          </button>
        </div>
        
        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-value">50,000+</span>
            <span className="metric-label">TPS</span>
          </div>
          
          <div className="metric-item">
            <span className="metric-value">0.001</span>
            <span className="metric-label">Sats/Tx</span>
          </div>
          
          <div className="metric-item">
            <span className="metric-value">&lt;1s</span>
            <span className="metric-label">Finalidade</span>
          </div>
          
          <div className="metric-item">
            <span className="metric-value">100%</span>
            <span className="metric-label">Compatível</span>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll para descobrir</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
