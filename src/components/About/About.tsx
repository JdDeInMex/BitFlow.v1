import React, { useState, useEffect, useRef } from 'react';
import './About.css';

// TypeScript Interfaces
interface Innovation {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'ready' | 'in-progress' | 'planned';
  impact: string;
}

interface TeamStat {
  value: string;
  label: string;
  suffix?: string;
}

interface Capability {
  name: string;
  level: number;
}

// Data Constants
const INNOVATIONS: Innovation[] = [
  {
    id: 'ai-contracts',
    number: '01',
    icon: '🧠',
    title: 'Self-Optimizing AI Contracts',
    description: 'Smart contracts that automatically adapt and optimize based on real-time data from network conditions, market dynamics, and usage patterns.',
    techStack: [
      'Oracle integration (Chainlink, Supra)',
      'Off-chain AI execution + on-chain results',
      'Modular proxy patterns for updates'
    ],
    status: 'ready',
    impact: 'Reduces gas costs by 40% through intelligent optimization'
  },
  {
    id: 'zero-gas',
    number: '02',
    icon: '⚡',
    title: 'True Zero Gas for Users',
    description: 'End users never pay gas fees. Transactions are sponsored automatically through institutional staking and enterprise fee pools.',
    techStack: [
      'EIP-2771 meta-transactions',
      'Institutional gas sponsorship',
      'Fee abstraction architecture'
    ],
    status: 'ready',
    impact: 'Removes the #1 barrier to Web3 adoption'
  },
  {
    id: 'universal-layer',
    number: '03',
    icon: '🌐',
    title: 'Universal Layer 0 (Multi-VM)',
    description: 'Real interoperability between ALL blockchains - EVM, Solana, Bitcoin, TON, and future chains. Not just bridges, but native connectivity.',
    techStack: [
      'Light client cross-chain validation',
      'State mirror technology',
      'Universal VM adapters'
    ],
    status: 'ready',
    impact: 'Connects $2T+ in siloed blockchain value'
  },
  {
    id: 'quantum-safe',
    number: '04',
    icon: '🔐',
    title: 'Post-Quantum Security Native',
    description: 'Built from day one to resist quantum computer attacks. Not a patch or upgrade - quantum resistance is in our DNA.',
    techStack: [
      'NIST PQC algorithms (Dilithium, Kyber)',
      'Hybrid signatures (ECDSA + PQC)',
      'Open Quantum Safe libraries'
    ],
    status: 'ready',
    impact: 'Future-proofs against $4.5B quantum threat by 2030'
  },
  {
    id: 'carbon-negative',
    number: '05',
    icon: '🌱',
    title: 'Carbon Negative Infrastructure',
    description: 'Our infrastructure actively removes CO₂ from the atmosphere using 100% renewable energy - integrated photovoltaic and wind power.',
    techStack: [
      '100% photovoltaic and wind energy',
    ],
    status: 'ready',
    impact: 'Removes 100 tons CO₂/year with 100% renewable energy'
  },
  {
    id: 'pure-utility',
    number: '06',
    icon: '💎',
    title: 'Pure Utility Model',
    description: 'Zero burns, zero inflation. Value comes only from real usage - enterprise fees, infrastructure demand, and genuine adoption.',
    techStack: [
      'No destructive tokenomics',
      'Value from infrastructure usage',
      'Enterprise staking models'
    ],
    status: 'ready',
    impact: 'Sustainable value growth without manipulation'
  },
  {
    id: 'learning-contracts',
    number: '07',
    icon: '🔄',
    title: 'Contracts That Learn',
    description: 'Smart contracts that evolve and improve over time based on historical patterns and machine learning feedback loops.',
    techStack: [
      'Off-chain ML processing',
      'On-chain policy updates',
      'Validated learning loops'
    ],
    status: 'ready',
    impact: 'Reduces failures by 90% through predictive optimization'
  }
];

const TEAM_STATS: TeamStat[] = [
  { value: '100', label: 'Years Combined Experience', suffix: '+' },
  { value: '9', label: 'Blockchain Specialists' },
  { value: '1', label: 'PhD Quantum Computing' }
];

const CAPABILITIES: Capability[] = [
  { name: 'Smart Contract Architecture', level: 95 },
  { name: 'Distributed Systems', level: 90 },
  { name: 'Cryptography', level: 88 },
  { name: 'Machine Learning', level: 85 },
  { name: 'Quantum Algorithms', level: 82 },
  { name: 'Network Theory', level: 87 },
  { name: 'Carbon Markets', level: 75 },
  { name: 'DeFi Protocols', level: 92 }
];

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting] as const;
};

// Components
// Modal Component for Innovation Details
const InnovationModal: React.FC<{ 
  innovation: Innovation | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onJoinRevolution: () => void;
  onNavigate: (target: string) => void;
}> = ({ innovation, isOpen, onClose, onJoinRevolution, onNavigate }) => {
  if (!innovation || !isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-number">{innovation.number}</div>
          <div className="modal-icon">
            <span>{innovation.icon}</span>
          </div>
          <h2>{innovation.title}</h2>
        </div>

        <div className="modal-body">
          <p className="modal-description">{innovation.description}</p>
          
          <div className="modal-tech-section">
            <h3>How it Works</h3>
            <ul className="modal-tech-list">
              {innovation.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="modal-impact">
            <h3>Impact</h3>
            <p>{innovation.impact}</p>
          </div>

          <div className="modal-status">
            <div className={`status-badge ${innovation.status}`}>
              <span className="status-dot"></span>
              100% Feasible
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="join-revolution-btn" onClick={onJoinRevolution}>
            <span className="btn-icon">🚀</span>
            <span className="btn-text">Join the Revolution</span>
          </button>
          
          <div className="modal-buttons-group">
            <button className="secondary-modal-btn" onClick={() => onNavigate('architecture')}>
              <span className="btn-icon">🏗️</span>
              <span className="btn-text">Understand Architecture</span>
            </button>
            
            <button className="secondary-modal-btn" onClick={() => onNavigate('use-cases')}>
              <span className="btn-icon">💼</span>
              <span className="btn-text">View Use Cases</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InnovationCard: React.FC<{ 
  innovation: Innovation; 
  index: number; 
  onClick: () => void; 
}> = ({ innovation, index, onClick }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`innovation-card clickable ${isVisible ? 'fade-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="card-header">
        <div className="card-number">{innovation.number}</div>
        <div className={`card-icon ${isHovered ? 'pulse' : ''}`}>
          <div className={`icon-wrapper ${innovation.id}`}>
            <span className="icon-emoji">{innovation.icon}</span>
          </div>
        </div>
      </div>

      <h3 className="card-title">{innovation.title}</h3>
      
      <div className="card-content">
        <p className="card-description">{innovation.description}</p>

        <div className="impact-section">
          <div className="impact-metric">
            <span className="impact-label">Impact</span>
            <span className="impact-value">{innovation.impact}</span>
          </div>
          <div className={`status-badge ${innovation.status}`}>
            <span className="status-dot"></span>
            100% Feasible
          </div>
        </div>

        <div className="click-hint">
          <span>Click to learn more</span>
        </div>
      </div>
    </div>
  );
};

const TeamStatCard: React.FC<{ stat: TeamStat; index: number }> = ({ stat, index }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [count, setCount] = useState(0);
  const target = parseInt(stat.value);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <div 
      ref={ref}
      className="expertise-card"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="expertise-number">
        {count}{stat.suffix || ''}
      </div>
      <div className="expertise-label">{stat.label}</div>
    </div>
  );
};

const CapabilityBar: React.FC<{ capability: Capability; index: number }> = ({ capability, index }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setWidth(capability.level), index * 100);
    }
  }, [isVisible, capability.level, index]);

  return (
    <div ref={ref} className="capability-item">
      <div className="capability-header">
        <span className="capability-name">{capability.name}</span>
        <span className="capability-percentage">{capability.level}%</span>
      </div>
      <div className="capability-bar">
        <div 
          className="capability-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle innovation card click
  const handleInnovationClick = (innovation: Innovation) => {
    setSelectedInnovation(innovation);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInnovation(null);
  };

  // Handle "Join the Revolution" click
  const handleJoinRevolution = () => {
    navigate('');
    handleModalClose();
  };

  // Handle navigation to other pages
  const handleNavigateFromModal = (target: string) => {
    navigate(target);
    handleModalClose();
  };
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.className.split(' ')[0]);
        }
      });

      // Parallax effects
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const speed = (el as HTMLElement).dataset.speed || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (target: string) => {
    if (window.location.pathname === '/') {
      const event = new CustomEvent('navigate', { detail: target });
      window.dispatchEvent(event);
    } else {
      window.location.href = `/${target}`;
    }
  };

  return (
    <div className="about-page">
      {/* Innovation Modal */}
      <InnovationModal
        innovation={selectedInnovation}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onJoinRevolution={handleJoinRevolution}
        onNavigate={handleNavigateFromModal}
      />

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {['hero', 'innovations', 'impact', 'foundation', 'team', 'cta'].map(section => (
          <div 
            key={section}
            className={`progress-dot ${activeSection.includes(section) ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="grid-pattern"></div>
          <div className="gradient-overlay"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">Revolutionary Infrastructure</div>
            <h1 className="hero-title">
              About <span className="highlight">HyperLayer0</span>
            </h1>
            <p className="hero-subtitle">
              The first Layer 0 infrastructure delivering real solutions that don't exist yet. 
              No sci-fi, just pure innovation with "Zero Burns, Maximum Freedom" philosophy.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-icon">🚀</span>
                <span className="stat-text">7 World-First Solutions</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <span className="stat-text">100% Technically Feasible</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🌍</span>
                <span className="stat-text">True Web3 Revolution</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="element element-1 parallax" data-speed="0.3"></div>
              <div className="element element-2 parallax" data-speed="0.5"></div>
              <div className="element element-3 parallax" data-speed="0.7"></div>
              <div className="central-orb">
                <div className="orb-inner"></div>
                <div className="orb-ring ring-1"></div>
                <div className="orb-ring ring-2"></div>
                <div className="orb-ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="mouse-icon">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Core Innovation Section */}
      <section className="core-innovation-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Innovation Suite</div>
            <h2>7 Revolutionary Solutions</h2>
            <p>
              We're not just another blockchain. We're solving problems that nobody 
              has fully solved yet - with technology that's possible today.
            </p>
          </div>

          <div className="innovations-grid">
            {INNOVATIONS.map((innovation, index) => (
              <InnovationCard 
                key={innovation.id} 
                innovation={innovation} 
                index={index}
                onClick={() => handleInnovationClick(innovation)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Matters Section */}
      <section className="why-matters-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">Real Impact</div>
            <h2>Why This Matters</h2>
            <p>
              Every feature we promise is technically possible today. 
              The difference? Nobody has integrated all of them into a cohesive infrastructure.
            </p>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <div className="icon-glow"></div>
                <span>🚀</span>
              </div>
              <h3>First-Mover Advantage</h3>
              <p>
                While others promise sci-fi dreams, we deliver real solutions 
                using proven technology in innovative ways.
              </p>
              <div className="impact-metric">
                <span className="metric-value">6-12 months</span>
                <span className="metric-label">ahead of competition</span>
              </div>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <div className="icon-glow"></div>
                <span>🔧</span>
              </div>
              <h3>Practical Innovation</h3>
              <p>
                Everything is built with existing technology: oracles, meta-transactions, 
                PQC algorithms and proven infrastructure patterns.
              </p>
              <div className="impact-metric">
                <span className="metric-value">100%</span>
                <span className="metric-label">deliverable today</span>
              </div>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <div className="icon-glow"></div>
                <span>🌍</span>
              </div>
              <h3>Real World Impact</h3>
              <p>
                From carbon-negative transactions to quantum-safe security, 
                we're solving problems that matter for the future.
              </p>
              <div className="impact-metric">
                <span className="metric-value">$2T+</span>
                <span className="metric-label">addressable market</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Foundation */}
      <section className="technical-foundation">
        <div className="section-container">
          <div className="foundation-content">
            <div className="foundation-header">
              <div className="section-badge">Technical Excellence</div>
              <h2>Built on Solid Foundation</h2>
              <p>
                HyperLayer0 isn't sci-fi. It's serious engineering 
                combining the best of existing technologies in ways nobody 
                has done before.
              </p>
            </div>

            <div className="foundation-grid">
              <div className="foundation-card">
                <div className="card-icon">
                  <span>⚙️</span>
                </div>
                <h3>Proven Infrastructure</h3>
                <p>Built with EVM compatibility</p>
                <ul className="tech-list">
                  <li>Battle-tested consensus</li>
                  <li>High throughput (5000+ TPS)</li>
                  <li>Established ecosystem</li>
                </ul>
              </div>

              <div className="foundation-card">
                <div className="card-icon">
                  <span>🔗</span>
                </div>
                <h3>Industry Standards</h3>
                <p>Using established protocols and standards</p>
                <ul className="tech-list">
                  <li>EIP-2771 (Meta-transactions)</li>
                  <li>EIP-4337 (Account abstraction)</li>
                  <li>OpenZeppelin standards</li>
                </ul>
              </div>

              <div className="foundation-card">
                <div className="card-icon">
                  <span>🛡️</span>
                </div>
                <h3>Security First</h3>
                <p>NIST-approved quantum algorithms from day one</p>
                <ul className="tech-list">
                  <li>Dilithium signatures</li>
                  <li>Kyber cryptography</li>
                  <li>Hybrid cryptography</li>
                </ul>
              </div>

              <div className="foundation-card">
                <div className="card-icon">
                  <span>🌉</span>
                </div>
                <h3>Real Interoperability</h3>
                <p>Advanced bridging beyond current solutions</p>
                <ul className="tech-list">
                  <li>LayerZero architecture</li>
                  <li>Axelar validation</li>
                  <li>Custom VM adapters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="team-content">
            <div className="section-badge">World-Class Team</div>
            <h2>The Team to Deliver</h2>
            <p>
              Building this requires serious expertise. Our team combines 
              decades of experience in blockchain, AI, quantum computing 
              and distributed systems.
            </p>

            <div className="expertise-highlights">
              {TEAM_STATS.map((stat, index) => (
                <TeamStatCard key={index} stat={stat} index={index} />
              ))}
            </div>


            <div className="team-quote">
              <blockquote>
                "We're not building another blockchain. We're building the infrastructure 
                that makes all blockchains work together as a unified system."
              </blockquote>
              <cite>— HyperLayer0 Core Team</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-particles"></div>
        </div>
        
        <div className="section-container">
          <div className="cta-content">
            <div className="cta-badge">Join the Revolution</div>
            <h2>Be Part of the Real Revolution</h2>
            <p>
              No hype. No impossible promises. Just real solutions to real problems 
              using technology that works today.
            </p>
            
            <div className="cta-features">
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>100% Technically Feasible</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>Experienced Team</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>Clear Roadmap</span>
              </div>
            </div>
            
            <div className="cta-buttons">
              <button 
                className="primary-button large"
                onClick={() => navigate('')}
              >
                <span className="button-text">Join Pre-Sale</span>
                <span className="button-icon">→</span>
              </button>
              <button 
                className="secondary-button large"
                onClick={() => navigate('roadmap')}
              >
                <span className="button-text">Technical Roadmap</span>
                <span className="button-icon">📋</span>
              </button>
            </div>
            
            <div className="cta-timer">
              <span className="timer-label">Pre-Sale Round 1 Ends In:</span>
              <div className="timer-display">
                <div className="time-unit">
                  <span className="time-value">14</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-unit">
                  <span className="time-value">08</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-unit">
                  <span className="time-value">32</span>
                  <span className="time-label">Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;