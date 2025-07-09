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
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(3); // July 2025 = Phase 3 (Mass Adoption Wave)
  const [visiblePhases, setVisiblePhases] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const phases: Phase[] = [
    {
      id: 'phase-0',
      title: 'Phase 0: Genesis Vision',
      date: '2024',
      quarter: 'Jan - Dec 2024',
      description: 'Conceptual revolution: the world\'s first Pure Utility model. Zero burns forever!',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm0-1', text: 'Revolutionary Pure Utility Model conceptualized', status: 'completed' },
        { id: 'm0-2', text: 'Technical whitepaper "The Internet of Everything"', status: 'completed' },
        { id: 'm0-3', text: 'Multi-dimensional Layer 0 architecture designed', status: 'completed' },
        { id: 'm0-4', text: 'Quantum Mesh Network (QMN) conceptualized', status: 'completed' },
        { id: 'm0-5', text: 'Neural Consensus (NeuCon) fundamental concepts', status: 'completed' },
        { id: 'm0-6', text: 'Universal Bridge Protocol initial specification', status: 'completed' },
        { id: 'm0-7', text: '9.9B HL0 zero-burn tokenomics defined', status: 'completed' },
        { id: 'm0-8', text: 'Visionary global team assembled', status: 'completed' }
      ]
    },
    {
      id: 'phase-1',
      title: 'Phase 1: Core Foundation',
      date: 'Q1-Q2 2025',
      quarter: 'Jan - Jun 2025',
      description: 'Revolutionary core infrastructure development and technological foundation establishment.',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm1-1', text: 'HyperSpeed Engine - functional prototype', status: 'completed' },
        { id: 'm1-2', text: 'Quantum-Safe Security - first implementation', status: 'completed' },
        { id: 'm1-3', text: 'Smart Contracts 3.0 - alpha version', status: 'completed' },
        { id: 'm1-4', text: 'Testnet Alpha - internal environment', status: 'completed' },
        { id: 'm1-5', text: 'Basic SDK for early developers', status: 'completed' },
        { id: 'm1-6', text: 'Initial security audit', status: 'completed' },
        { id: 'm1-7', text: 'Strategic partner identification', status: 'completed' },
        { id: 'm1-8', text: 'Dynamic Sharding Matrix - conceptual testing', status: 'completed' }
      ]
    },
    {
      id: 'phase-2',
      title: 'Phase 2: Market Preparation',
      date: 'Jan - Jul 2025',
      quarter: 'Total Preparation',
      description: 'Complete preparation for public launch: audits, community building, and final infrastructure.',
      progress: 100,
      isActive: false,
      milestones: [
        { id: 'm2-1', text: 'Official website and complete documentation', status: 'completed' },
        { id: 'm2-2', text: 'Presale smart contract developed', status: 'completed' },
        { id: 'm2-3', text: 'Complete security audit (CertiK/Hacken)', status: 'completed' },
        { id: 'm2-4', text: 'Core team KYC certified', status: 'completed' },
        { id: 'm2-5', text: 'Initial community foundation established', status: 'completed' }
      ]
    },
    {
      id: 'phase-3',
      title: 'Phase 3: Mass Adoption Wave',
      date: 'Jul 2025 - Mar 2026',
      quarter: '🔥 PRESALE LIVE - Join Now!',
      description: 'Presale explosion! 20 epic batches, massive global community, and final preparation to dominate the world.',
      progress: 15,
      isActive: true,
      milestones: [
        { id: 'm3-1', text: 'Presale Batches 1-5 ($0.009-$0.045) 🚀', status: 'in-progress' },
        { id: 'm3-2', text: 'Community building - 10K+ early adopters', status: 'in-progress' },
        { id: 'm3-3', text: 'Strategic partnerships established', status: 'in-progress' },
        { id: 'm3-4', text: 'Community scaling - 100K+ members', status: 'planned' },
        { id: 'm3-5', text: 'Presale Batches 6-10 preparation ($0.065-$0.40)', status: 'planned' },
        { id: 'm3-6', text: 'Public Beta Testnet launched', status: 'planned' },
        { id: 'm3-7', text: 'Presale Batches 11-15 ($0.50-$0.70)', status: 'planned' },
        { id: 'm3-8', text: 'DEX listings preparation (Uniswap, PancakeSwap)', status: 'planned' },
        { id: 'm3-9', text: 'Presale Batches 16-20 ($0.80-$0.90)', status: 'planned' },
        { id: 'm3-10', text: 'Tier 2 CEX negotiations (Gate.io, KuCoin)', status: 'planned' },
        { id: 'm3-11', text: 'Explosive community - 500K+ members', status: 'planned' },
        { id: 'm3-12', text: 'Mainnet preparation 100% finalized', status: 'planned' }
      ]
    },
    {
      id: 'phase-4',
      title: 'Phase 4: Mainnet Revolution',
      date: 'Q2-Q3 2026',
      quarter: 'Apr - Sep 2026',
      description: '🚀 EPIC LAUNCH! Mainnet live, universal bridges, insane staking, and major exchange conquest!',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm4-1', text: 'HYPERLAYER0 MAINNET LIVE! 🚀🌍', status: 'planned' },
        { id: 'm4-2', text: 'Universal Bridges: Ethereum, BSC, Polygon, Arbitrum', status: 'planned' },
        { id: 'm4-3', text: 'INSANE Staking Platform: 100-1000% APR', status: 'planned' },
        { id: 'm4-4', text: 'BINANCE & COINBASE listings confirmed', status: 'planned' },
        { id: 'm4-5', text: '$1B Market Cap SMASHED! 💎', status: 'planned' },
        { id: 'm4-6', text: '1M+ transactions/day - lightning speed', status: 'planned' },
        { id: 'm4-7', text: '10+ revolutionary dApps on mainnet', status: 'planned' },
        { id: 'm4-8', text: 'UNIVERSAL cross-chain messaging active', status: 'planned' }
      ]
    },
    {
      id: 'phase-5',
      title: 'Phase 5: DeFi Domination',
      date: 'Q4 2026 - Q3 2027',
      quarter: 'Oct 2026 - Sep 2027',
      description: '💰 DEFI EXPLOSION! Massive ecosystem, global DAO, enterprise solutions, and $5B market cap!',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm5-1', text: 'DAO Governance - 1M+ active voters', status: 'planned' },
        { id: 'm5-2', text: '$50M Developer Grants distributed', status: 'planned' },
        { id: 'm5-3', text: '10+ governments using HyperLayer0', status: 'planned' },
        { id: 'm5-4', text: 'Google, Apple, Microsoft integrated', status: 'planned' },
        { id: 'm5-5', text: 'HLUSD - native stablecoin dominating', status: 'planned' },
        { id: 'm5-6', text: '$5B Market Cap - TOP 15 CRYPTO! 🏆', status: 'planned' },
        { id: 'm5-7', text: 'Native DEX: $10B+ daily volume', status: 'planned' },
        { id: 'm5-8', text: 'Real Estate tokenized lending', status: 'planned' },
        { id: 'm5-9', text: '$10B+ total ecosystem TVL', status: 'planned' },
        { id: 'm5-10', text: '50M transactions/day processed', status: 'planned' }
      ]
    },
    {
      id: 'phase-6',
      title: 'Phase 6: AI & Quantum Era',
      date: 'Q4 2027 - Q3 2028',
      quarter: 'Oct 2027 - Sep 2028',
      description: '🤖 FUTURE LIVE! Fully integrated AI, quantum computing, HyperOS, and $25B market cap!',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm6-1', text: 'HyperOS - WORLD\'S FIRST Web3 OS! 🌍', status: 'planned' },
        { id: 'm6-2', text: 'AI fully integrated - smart contracts', status: 'planned' },
        { id: 'm6-3', text: 'Quantum-resistant ACTIVE - future proof', status: 'planned' },
        { id: 'm6-4', text: '1000+ dApps massive ecosystem', status: 'planned' },
        { id: 'm6-5', text: '100M daily active users', status: 'planned' },
        { id: 'm6-6', text: 'Native mobile apps - 1B downloads', status: 'planned' },
        { id: 'm6-7', text: 'Gaming Platform - $1B+ NFTs sold', status: 'planned' },
        { id: 'm6-8', text: 'Web3 Social Media - 500M users', status: 'planned' },
        { id: 'm6-9', text: '$25B Market Cap - TOP 10 GLOBAL! 👑', status: 'planned' },
        { id: 'm6-10', text: 'Recognized as Layer 0 STANDARD', status: 'planned' }
      ]
    },
    {
      id: 'phase-7',
      title: 'Phase 7: Real World Takeover',
      date: '2029',
      quarter: 'Jan - Dec 2029',
      description: '🌍 REAL WORLD TOKENIZED! Global IoT, healthcare, energy, supply chain - EVERYTHING on HyperLayer0!',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm7-1', text: 'EVERYTHING tokenized: houses, cars, art, commodities', status: 'planned' },
        { id: 'm7-2', text: '1 TRILLION IoT devices connected', status: 'planned' },
        { id: 'm7-3', text: 'Global supply chain 100% transparent', status: 'planned' },
        { id: 'm7-4', text: 'Global healthcare: 2B+ medical records', status: 'planned' },
        { id: 'm7-5', text: 'Energy Trading: 50% of world energy', status: 'planned' },
        { id: 'm7-6', text: '100+ countries using government services', status: 'planned' },
        { id: 'm7-7', text: '10,000+ dApps - infinite ecosystem', status: 'planned' },
        { id: 'm7-8', text: '$75B Market Cap - TOP 5! 🚀', status: 'planned' }
      ]
    },
    {
      id: 'phase-8',
      title: 'Phase 8: Universe Domination',
      date: '2030+',
      quarter: '∞ THE FUTURE IS OURS',
      description: '🌌 INTERNET OF EVERYTHING REALIZED! Billions of humans, trillions of devices, SPACE ECONOMY!',
      progress: 0,
      isActive: false,
      milestones: [
        { id: 'm8-1', text: 'INTERNET OF EVERYTHING 100% ACTIVE! 🌌', status: 'planned' },
        { id: 'm8-2', text: '5B+ humans connected to the network', status: 'planned' },
        { id: 'm8-3', text: '$100B+ Market Cap - TOTAL DOMINATION! 👑', status: 'planned' },
        { id: 'm8-4', text: 'HL0 = UNIVERSAL infrastructure standard', status: 'planned' },
        { id: 'm8-5', text: '1 TRILLION transactions per SECOND', status: 'planned' },
        { id: 'm8-6', text: 'SPACE ECONOMY: Earth-Mars-Moon', status: 'planned' },
        { id: 'm8-7', text: 'Autonomous AI managing 90% of economy', status: 'planned' },
        { id: 'm8-8', text: 'HUMANITY EXPANDED - Type 1 Civilization', status: 'planned' }
      ]
    }
  ];

  // Update navigation buttons based on scroll
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
      
      // Initial scroll to current phase
      setTimeout(() => {
        const phaseWidth = 400;
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
    if (phase.progress === 100) return 'Completed';
    if (phase.isActive) return 'In Progress';
    return 'Planned';
  };

  const getStatusClass = (phase: Phase) => {
    if (phase.progress === 100) return 'completed';
    if (phase.isActive) return 'active';
    return 'planned';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      timeZone: 'America/Sao_Paulo'
    });
  };

  return (
    <section className="roadmap-section">
      <div className="section-header">
        <div className="header-content">
          <h2>🚀 HyperLayer0: The Epic Journey to Universal Domination!</h2>
          <p className="section-subtitle">
            From revolutionary concept to the infrastructure that will connect ALL HUMANITY and beyond! 🌌
          </p>
          <p className="section-subtitle">
            🔥 WE ARE HERE: {getCurrentDate()} - PRESALE EXPLODING! Join the revolution NOW! 💎
          </p>
          
          <div className="overall-progress">
            <div className="progress-info">
              <span className="progress-label">Revolution Progress</span>
              <span className="progress-percentage">{getOverallProgress()}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${getOverallProgress()}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span>🎯 Completed Milestones: {phases.reduce((total, phase) => total + phase.milestones.filter(m => m.status === 'completed').length, 0)}</span>
              <span>⚡ In Progress: {phases.reduce((total, phase) => total + phase.milestones.filter(m => m.status === 'in-progress').length, 0)}</span>
              <span>🚀 Coming Up: {phases.reduce((total, phase) => total + phase.milestones.filter(m => m.status === 'planned').length, 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase mini navigation */}
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
            <span className="phase-dot-number">{index}</span>
            <span className="phase-dot-title">{phase.title.split(':')[1]?.trim() || phase.title}</span>
          </div>
        ))}
      </div>
      
      {/* Timeline container with horizontal scroll */}
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
                  <div className={`phase-status-badge ${getStatusClass(phase)}`}>
                    {getStatusText(phase)}
                  </div>

                  <div className="phase-card-header">
                    <div className="phase-number-circle">
                      <span>{index}</span>
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
                        <span>Progress</span>
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
                    <h4>🎯 Key Milestones</h4>
                    <ul className="phase-milestones-list">
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
          <span className="legend-text">✅ Completed</span>
        </div>
        
        <div className="legend-item">
          <span className="legend-marker in-progress"></span>
          <span className="legend-text">⚡ In Progress</span>
        </div>
        
        <div className="legend-item">
          <span className="legend-marker planned"></span>
          <span className="legend-text">🚀 Planned</span>
        </div>
      </div>

      {/* Final CTA */}
      <div className="roadmap-cta">
        <div className="cta-container">
          <h3>🔥 LAST CHANCE! Join the Revolution BEFORE it's too late!</h3>
          <p>
            The HyperLayer0 presale is EXPLODING! Early batches are selling out fast and you can be 
            one of the lucky few to enter the infrastructure that will dominate the universe. ZERO burns, 
            insane staking, 10,000%+ GUARANTEED potential. This is YOUR chance to be part of history!
          </p>
          <p style={{ color: 'var(--primary-green)', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', margin: '1rem 0' }}>
            💰 GUARANTEED 10,000%+ RETURNS! First batch buyers pay $0.009 → Launch at $0.90+ 🚀
          </p>
          
          <div className="cta-highlight-stats">
            <div className="highlight-stat">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <div className="stat-value">PRESALE EXPLODING!</div>
                <div className="stat-label">Last Chance Batches 1-5</div>
              </div>
            </div>
            <div className="highlight-stat">
              <div className="stat-icon">💎</div>
              <div className="stat-info">
                <div className="stat-value">ZERO Burns Forever</div>
                <div className="stat-label">Your Tokens = Eternal</div>
              </div>
            </div>
            <div className="highlight-stat">
              <div className="stat-icon">🚀</div>
              <div className="stat-info">
                <div className="stat-value">100-1000% APR</div>
                <div className="stat-label">Staking INSANE</div>
              </div>
            </div>
            <div className="highlight-stat">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-value">10,000%+ GUARANTEED</div>
                <div className="stat-label">$0.009 → $0.90+ Launch</div>
              </div>
            </div>
            <div className="highlight-stat">
              <div className="stat-icon">👑</div>
              <div className="stat-info">
                <div className="stat-value">Early Adopter Advantage</div>
                <div className="stat-label">First Batch = Maximum Gains</div>
              </div>
            </div>
          </div>

          <div className="cta-buttons">
            <button 
              className="primary-button large"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'home' });
                window.dispatchEvent(event);
              }}
            >
              🔥 JOIN PRESALE NOW!
            </button>
            <button 
              className="secondary-button large"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'use-cases' });
                window.dispatchEvent(event);
              }}
            >
              💎 See How I'll Get Rich
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;