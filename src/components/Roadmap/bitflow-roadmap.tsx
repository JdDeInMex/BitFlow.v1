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
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-4');
  const [visiblePhases, setVisiblePhases] = useState<Set<string>>(new Set());
  const phaseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
        { id: 'm3-8', text: 'Lançamento $BFF e sistema de governança', status: 'completed' }
      ]
    },
    {
      id: 'phase-4',
      title: 'Fase 4: Bitcoin DeFi',
      date: 'Q4 2024 - Q1 2025',
      quarter: 'Out 2024 - Mar 2025',
      description: 'Expansão para DeFi nativo em Bitcoin com Runes, futuros e empréstimos',
      progress: 85,
      isActive: true,
      milestones: [
        { id: 'm4-1', text: 'Runes AMM na Stacks L2', status: 'completed' },
        { id: 'm4-2', text: 'BRC20/Runes L1 Swaps', status: 'completed' },
        { id: 'm4-3', text: 'Pools de liquidez sBTC', status: 'completed' },
        { id: 'm4-4', text: 'Native BTC Swaps', status: 'completed' },
        { id: 'm4-5', text: 'Bitcoin Swaps: BTC Futures', status: 'completed' },
        { id: 'm4-6', text: 'Bitcoin Swaps: Limit Orders', status: 'completed' },
        { id: 'm4-7', text: 'BTC Loans: Empréstimos 0% usando stSTX como colateral', status: 'in-progress' },
        { id: 'm4-8', text: 'Expansão completa do ecossistema Bitcoin DeFi', status: 'in-progress' }
      ]
    },
    {
      id: 'phase-5',
      title: 'Fase 5: Arquitetura L2',
      date: 'Q2-Q3 2025',
      quarter: 'Abr - Set 2025',
      description: 'Desenvolvimento e lançamento da Layer 2 com BitFlow Sequencer',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm5-1', text: 'Implementação do BitFlow Sequencer', status: 'planned' },
        { id: 'm5-2', text: 'Canais de Estado otimizados', status: 'planned' },
        { id: 'm5-3', text: 'Sistema de provas ZK-STARK inicial', status: 'planned' },
        { id: 'm5-4', text: 'Testnet da Layer 2', status: 'planned' },
        { id: 'm5-5', text: 'SDK e ferramentas para desenvolvedores L2', status: 'planned' }
      ]
    },
    {
      id: 'phase-6',
      title: 'Fase 6: Mainnet L2',
      date: 'Q4 2025 - Q1 2026',
      quarter: 'Out 2025 - Mar 2026',
      description: 'Lançamento da mainnet Layer 2 com recursos avançados',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm6-1', text: 'Mainnet Layer 2 em produção', status: 'planned' },
        { id: 'm6-2', text: 'Smart contracts complexos e EVM-compatível', status: 'planned' },
        { id: 'm6-3', text: 'Sistema ZK-STARK completo', status: 'planned' },
        { id: 'm6-4', text: 'Ponte bidirecional Bitcoin <-> L2', status: 'planned' },
        { id: 'm6-5', text: 'Integrações com principais protocolos DeFi', status: 'planned' }
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

  // Intersection Observer para animações de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const phaseId = entry.target.getAttribute('data-phase-id');
            if (phaseId) {
              setVisiblePhases(prev => new Set(prev).add(phaseId));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(phaseRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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

  const handlePhaseClick = (phaseId: string) => {
    setSelectedPhase(phaseId);
    phaseRefs.current[phaseId]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  return (
    <section className="roadmap-section">
      <div className="section-header">
        <div className="header-content">
          <h2>BitFlow: 3 Anos Construindo o Futuro do Bitcoin DeFi</h2>
          <p className="section-subtitle">
            De uma ideia em 2023 ao maior protocolo DeFi em Bitcoin - nossa jornada completa
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

      {/* Navegação das Fases */}
      <div className="phase-navigation">
        {phases.map((phase) => (
          <button
            key={phase.id}
            className={`phase-nav-item ${selectedPhase === phase.id ? 'active' : ''} ${phase.isActive ? 'current' : ''}`}
            onClick={() => handlePhaseClick(phase.id)}
          >
            <span className="phase-nav-title">{phase.title}</span>
            <span className="phase-nav-date">{phase.date}</span>
          </button>
        ))}
      </div>
      
      <div className="roadmap-timeline">
        <div className="timeline-track">
          <div className="timeline-progress" style={{ width: `${getOverallProgress()}%` }}></div>
        </div>
        
        <div className="timeline-phases">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              ref={(el) => phaseRefs.current[phase.id] = el}
              data-phase-id={phase.id}
              className={`phase-item ${phase.isActive ? 'current' : ''} ${selectedPhase === phase.id ? 'selected' : ''} ${visiblePhases.has(phase.id) ? 'visible' : ''}`}
              onClick={() => setSelectedPhase(phase.id)}
            >
              <div className="phase-marker">
                <span className="phase-number">{index + 1}</span>
              </div>
              
              <div className="phase-content">
                <div className="phase-header">
                  <div className="phase-title-group">
                    <h3>{phase.title}</h3>
                    <span className="phase-quarter">{phase.quarter}</span>
                  </div>
                  <span className="phase-date">{phase.date}</span>
                </div>
                
                <p className="phase-description">{phase.description}</p>
                
                {phase.progress > 0 && (
                  <div className="phase-progress">
                    <div className="phase-progress-info">
                      <span>Progresso</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <div className="phase-progress-bar">
                      <div 
                        className="phase-progress-fill" 
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <ul className="phase-milestones">
                  {phase.milestones.map((milestone) => (
                    <li key={milestone.id} className={milestone.status}>
                      <span className="milestone-icon">
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
      
      <div className="cta-container">
        <div className="cta-content">
          <h3>Junte-se à Revolução BitFlow Hoje</h3>
          <p>Não perca a oportunidade de fazer parte da próxima evolução do Bitcoin. Conecte-se conosco e acompanhe nosso progresso em tempo real.</p>
          
          <div className="cta-buttons">
            <button className="primary-button">
              <span>Conectar Carteira</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="secondary-button">
              <span>Explorar Documentação</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="cta-stats">
          <div className="stat-item">
            <span className="stat-number">{phases.reduce((total, phase) => total + phase.milestones.filter(m => m.status === 'completed').length, 0)}</span>
            <span className="stat-label">Marcos Concluídos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{phases.reduce((total, phase) => total + phase.milestones.filter(m => m.status === 'in-progress').length, 0)}</span>
            <span className="stat-label">Em Desenvolvimento</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{phases.filter(p => p.progress === 100).length}/{phases.length}</span>
            <span className="stat-label">Fases Concluídas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;