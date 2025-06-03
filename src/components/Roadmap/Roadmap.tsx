import React, { useState, useEffect, useRef } from 'react';
import './Roadmap.css';

interface Milestone {
  id: string;
  text: string;
  status: 'completed' | 'in-progress' | 'planned';
}

interface Phase {
  id: string;
  title: string;
  date: string;
  quarter: string;
  description: string;
  milestones: Milestone[];
  progress: number;
  isActive: boolean;
}

const Roadmap: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(5);
  const [visiblePhases, setVisiblePhases] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const phases: Phase[] = [
    {
      id: 'phase-0',
      title: 'Fase 0: Fundações',
      date: 'Q1-Q2 2023',
      quarter: 'Jan - Jun 2023',
      description: 'Desenvolvimento inicial e lançamento da testnet do protocolo BitFlow',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm0-1', text: 'Deploy do protocolo BitFlow na testnet Stacks', status: 'completed' },
        { id: 'm0-2', text: 'Desenvolvimento da interface front-end', status: 'completed' },
        { id: 'm0-3', text: 'Primeira auditoria dos smart contracts', status: 'completed' },
        { id: 'm0-4', text: 'Deploy na mainnet Stacks', status: 'completed' },
        { id: 'm0-5', text: 'Início da fase beta privada', status: 'completed' },
        { id: 'm0-6', text: 'Integração com Magic Protocol para swaps BTC <-> xBTC', status: 'completed' }
      ]
    },
    {
      id: 'phase-1',
      title: 'Fase 1: Expansão e Pontes',
      date: 'Q3-Q4 2023',
      quarter: 'Jul - Dez 2023',
      description: 'Lançamento dos primeiros pools de liquidez e desenvolvimento de pontes',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm1-1', text: 'Primeiro pool de liquidez na mainnet Stacks', status: 'completed' },
        { id: 'm1-2', text: 'Anúncio da Rootstock Bridge (Smart BTC e Sovryn Dollar)', status: 'completed' },
        { id: 'm1-3', text: 'Conclusão da fase beta privada', status: 'completed' },
        { id: 'm1-4', text: 'Auditoria completa com Coinfabrik', status: 'completed' },
        { id: 'm1-5', text: 'Par de trading stSTX <> STX para StackingDAO', status: 'completed' },
        { id: 'm1-6', text: 'Lançamento Beta Privado do Bitflow AMM DEX', status: 'completed' }
      ]
    },
    {
      id: 'phase-2',
      title: 'Fase 2: Lançamento Público',
      date: 'Q1-Q2 2024',
      quarter: 'Jan - Jun 2024',
      description: 'Lançamento público do DEX e expansão de pools de liquidez',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm2-1', text: 'Lançamento público do Bitflow AMM DEX', status: 'completed' },
        { id: 'm2-2', text: 'Pool StackingDAO stSTX <> STX', status: 'completed' },
        { id: 'm2-3', text: 'Pool aBTC-xBTC', status: 'completed' },
        { id: 'm2-4', text: 'Pool Arkadiko USDA-aeUSDC', status: 'completed' },
        { id: 'm2-5', text: 'Pool AllBridge aeUSDC-sUSDT', status: 'completed' },
        { id: 'm2-6', text: 'Sistema de Pontos Bitflow - Programa de Recompensas', status: 'completed' },
        { id: 'm2-7', text: 'Multi-Hop Swaps e novas rotas stSTX', status: 'completed' },
        { id: 'm2-8', text: 'Pools STX-aeUSDC (estilo Uniswap V2)', status: 'completed' },
        { id: 'm2-9', text: 'Auditoria Clarity Alliance (XYK Pools)', status: 'completed' },
        { id: 'm2-10', text: 'Recompensas $DIKO nos pools USDA', status: 'completed' }
      ]
    },
    {
      id: 'phase-3',
      title: 'Fase 3: Agregador e Governança',
      date: 'Q3-Q4 2024',
      quarter: 'Jul - Dez 2024',
      description: 'DEX Aggregator, integrações de carteiras e lançamento do token de governança',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm3-1', text: 'Bitflow DEX Aggregator (Alex, Velar, Arkadiko)', status: 'completed' },
        { id: 'm3-2', text: 'Bitflow Swaps SDK', status: 'completed' },
        { id: 'm3-3', text: 'Auditoria do módulo Stableswap Staking', status: 'completed' },
        { id: 'm3-4', text: 'Integração Leather Wallet (In-App Swaps)', status: 'completed' },
        { id: 'm3-5', text: 'Integração Xverse Wallet (In-App Swaps)', status: 'completed' },
        { id: 'm3-6', text: 'Pool Hermetica USDh-aeUSDC', status: 'completed' },
        { id: 'm3-7', text: 'Integração Pontis BTC<>Stacks Bridge', status: 'completed' },
        { id: 'm3-8', text: 'Sistema de governança descentralizada', status: 'completed' }
      ]
    },
    {
      id: 'phase-4',
      title: 'Fase 4: Bitcoin DeFi Preparação',
      date: 'Q4 2024 - Q1 2025',
      quarter: 'Out 2024 - Mar 2025',
      description: 'Preparação da infraestrutura para DeFi nativo em Bitcoin',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm4-1', text: 'Runes AMM na Stacks L2', status: 'completed' },
        { id: 'm4-2', text: 'Infraestrutura base para Bitcoin DeFi', status: 'completed' },
        { id: 'm4-3', text: 'Pesquisa e desenvolvimento de protocolos', status: 'completed' },
        { id: 'm4-4', text: 'Parcerias estratégicas estabelecidas', status: 'completed' }
      ]
    },
    {
      id: 'phase-5',
      title: 'Fase 5: Bitcoin DeFi & L2',
      date: 'Q2-Q3 2025',
      quarter: 'Abr - Set 2025',
      description: 'Implementação completa do DeFi Bitcoin e desenvolvimento da Layer 2',
      progress: 25,
      isActive: true,
      milestones: [
        { id: 'm5-1', text: 'BRC20/Runes L1 Swaps', status: 'in-progress' },
        { id: 'm5-2', text: 'Pools de liquidez sBTC', status: 'in-progress' },
        { id: 'm5-3', text: 'Native BTC Swaps', status: 'planned' },
        { id: 'm5-4', text: 'Bitcoin Swaps: BTC Futures', status: 'planned' },
        { id: 'm5-5', text: 'Bitcoin Swaps: Limit Orders', status: 'planned' },
        { id: 'm5-6', text: 'Governance, $BFF Launch, Token Emissions', status: 'planned' },
        { id: 'm5-7', text: 'BTC Loans: Empréstimos 0% usando stSTX como colateral', status: 'planned' },
        { id: 'm5-8', text: 'Implementação do BitFlow Sequencer', status: 'in-progress' },
        { id: 'm5-9', text: 'Canais de Estado otimizados', status: 'planned' },
        { id: 'm5-10', text: 'Sistema de provas ZK-STARK inicial', status: 'planned' }
      ]
    },
    {
      id: 'phase-6',
      title: 'Fase 6: Mainnet L2 & Expansão',
      date: 'Q4 2025 - Q1 2026',
      quarter: 'Out 2025 - Mar 2026',
      description: 'Lançamento da mainnet Layer 2 e expansão do ecossistema',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm6-1', text: 'Testnet da Layer 2', status: 'planned' },
        { id: 'm6-2', text: 'SDK e ferramentas para desenvolvedores L2', status: 'planned' },
        { id: 'm6-3', text: 'Mainnet Layer 2 em produção', status: 'planned' },
        { id: 'm6-4', text: 'Smart contracts complexos e EVM-compatível', status: 'planned' },
        { id: 'm6-5', text: 'Sistema ZK-STARK completo', status: 'planned' },
        { id: 'm6-6', text: 'Ponte bidirecional Bitcoin <-> L2', status: 'planned' },
        { id: 'm6-7', text: 'Integrações com principais protocolos DeFi', status: 'planned' }
      ]
    },
    {
      id: 'phase-7',
      title: 'Fase 7: Ecossistema Completo',
      date: 'Q2-Q4 2026',
      quarter: 'Abr - Dez 2026',
      description: 'Expansão completa com metaverso, RWA e ecossistema maduro',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm7-1', text: 'NFTs e GameFi nativo em Bitcoin', status: 'planned' },
        { id: 'm7-2', text: 'Integração com metaversos e mundos virtuais', status: 'planned' },
        { id: 'm7-3', text: 'Tokenização de ativos do mundo real (RWA)', status: 'planned' },
        { id: 'm7-4', text: 'Pontes cross-chain para múltiplos ecossistemas', status: 'planned' },
        { id: 'm7-5', text: 'DAO completa e governança descentralizada', status: 'planned' },
        { id: 'm7-6', text: 'Programa de incentivos e grants para desenvolvedores', status: 'planned' }
      ]
    }
  ];

  // Atualizar botões de navegação baseado no scroll
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      
      // Scroll inicial para a fase atual
      setTimeout(() => {
        const phaseWidth = 400; // largura aproximada de cada fase
        const scrollPosition = phaseWidth * currentPhaseIndex - (scrollContainer.clientWidth / 2) + (phaseWidth / 2);
        scrollContainer.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }, 100);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, [currentPhaseIndex]);

  const getOverallProgress = () => {
    const totalMilestones = phases.reduce((total, phase) => total + phase.milestones.length, 0);
    const completedMilestones = phases.reduce(
      (total, phase) => total + phase.milestones.filter(m => m.status === 'completed').length,
      0
    );
    return Math.round((completedMilestones / totalMilestones) * 100);
  };

  const getMilestoneIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      default:
        return '○';
    }
  };

  const scrollToPhase = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const getStatusText = (phase: Phase) => {
    if (phase.progress === 100) return 'Concluída';
    if (phase.isActive) return 'Em Andamento';
    return 'Planejada';
  };

  const getStatusClass = (phase: Phase) => {
    if (phase.progress === 100) return 'completed';
    if (phase.isActive) return 'active';
    return 'planned';
  };

  return (
    <section className="roadmap-section">
      <div className="section-header">
        <div className="header-content">
          <h2>BitFlow: 3 Anos Construindo o Futuro</h2>
          <p className="section-subtitle">
            De uma ideia em 2023 ao maior e mais completo protocolo em Bitcoin
          </p>
                    <p className="section-subtitle">
            Nossa jornada completa
          </p>
          
          <div className="overall-progress">
            <div className="progress-info">
              <span className="progress-label">Progresso Geral</span>
              <span className="progress-percentage">{getOverallProgress()}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${getOverallProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini navegação das fases */}
      <div className="phase-dots-navigation">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`phase-dot-item ${index === currentPhaseIndex ? 'active' : ''} ${phase.isActive ? 'current' : ''} ${phase.progress === 100 ? 'completed' : ''}`}
            onClick={() => {
              setCurrentPhaseIndex(index);
              if (scrollContainerRef.current) {
                const phaseElement = document.getElementById(phase.id);
                if (phaseElement) {
                  phaseElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
              }
            }}
            title={phase.title}
          >
            <span className="phase-dot-number">{index + 1}</span>
            <span className="phase-dot-title">{phase.title.split(':')[0]}</span>
          </div>
        ))}
      </div>
      
      {/* Container do Timeline com Scroll Horizontal */}
      <div className="roadmap-carousel-container">
        <button 
          className={`carousel-nav-button prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => scrollToPhase('left')}
          disabled={!canScrollLeft}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="roadmap-scroll-container" ref={scrollContainerRef}>
          <div className="roadmap-track">
            <div 
              className="roadmap-progress-line" 
              style={{ width: `${(getOverallProgress() / 100) * phases.length * 400}px` }}
            />
            
            <div className="phases-wrapper">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  id={phase.id}
                  className={`phase-card ${phase.isActive ? 'active' : ''} ${phase.progress === 100 ? 'completed' : ''} ${index === currentPhaseIndex ? 'selected' : ''}`}
                >
                  {/* Badge de status posicionado corretamente */}
                  <div className={`phase-status-badge ${getStatusClass(phase)}`}>
                    {getStatusText(phase)}
                  </div>

                  <div className="phase-card-header">
                    <div className="phase-number-circle">
                      <span>{index + 1}</span>
                    </div>
                    <div className="phase-info">
                      <h3>{phase.title}</h3>
                      <span className="phase-period">{phase.quarter}</span>
                    </div>
                  </div>
                  
                  <p className="phase-description">{phase.description}</p>
                  
                  {phase.progress > 0 && (
                    <div className="phase-progress-section">
                      <div className="phase-progress-header">
                        <span>Progresso</span>
                        <span className="progress-value">{phase.progress}%</span>
                      </div>
                      <div className="phase-progress-bar">
                        <div 
                          className="phase-progress-fill" 
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="phase-milestones-section">
                    <h4>Marcos</h4>
                    <ul className="phase-milestones-list">
                      {/* Mostrar TODOS os marcos */}
                      {phase.milestones.map((milestone) => (
                        <li key={milestone.id} className={milestone.status}>
                          <span className="milestone-status-icon">
                            {getMilestoneIcon(milestone.status)}
                          </span>
                          <span className="milestone-text">{milestone.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          className={`carousel-nav-button next ${!canScrollRight ? 'disabled' : ''}`}
          onClick={() => scrollToPhase('right')}
          disabled={!canScrollRight}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="roadmap-legend">
        <div className="legend-item">
          <span className="legend-marker completed"></span>
          <span className="legend-text">Concluído</span>
        </div>
        
        <div className="legend-item">
          <span className="legend-marker in-progress"></span>
          <span className="legend-text">Em Progresso</span>
        </div>
        
        <div className="legend-item">
          <span className="legend-marker planned"></span>
          <span className="legend-text">Planejado</span>
        </div>
      </div>
       </section>
  );
};

export default Roadmap;