import React, { useState, useEffect } from 'react';
import './Architecture.css';

const Architecture: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [visibleSection, setVisibleSection] = useState<string>('overview');

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll('.arch-layer, .interactive-card, .metric-card, .zero-burns-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle component selection
  const handleComponentClick = (componentId: string) => {
    setActiveComponent(activeComponent === componentId ? null : componentId);
  };

  // Component details data
  const componentDetails = {
    hyperspeed: {
      title: "HyperSpeed Engine",
      description: "Parallel processing with 1M+ simultaneous threads, achieving truly infinite scalability.",
      stats: [
        { label: "Threads", value: "1M+" },
        { label: "Latency", value: "<1ms" },
        { label: "TPS", value: "∞" }
      ],
      features: [
        "1,000,000+ parallel threads",
        "AI-optimized routing",
        "Zero-knowledge proofs",
        "Quantum entanglement sync"
      ]
    },
    neural: {
      title: "Neural Consensus (NeuCon)",
      description: "AI-driven consensus that predicts and optimizes network performance in real-time.",
      stats: [
        { label: "Accuracy", value: "99.9%" },
        { label: "Response", value: "<10ms" },
        { label: "Learning", value: "24/7" }
      ],
      features: [
        "AI-driven validation",
        "Predictive consensus",
        "Self-healing protocol",
        "Energy harvesting"
      ]
    },
    quantum: {
      title: "Quantum-Safe Security",
      description: "Post-quantum cryptography with multidimensional signatures that resist quantum computers.",
      stats: [
        { label: "Security", value: "Quantum" },
        { label: "Signatures", value: "5D" },
        { label: "Resistance", value: "100%" }
      ],
      features: [
        "Lattice-based cryptography",
        "Multi-dimensional signatures",
        "Homomorphic encryption",
        "Temporal key rotation"
      ]
    },
    bridge: {
      title: "Universal Bridge Protocol",
      description: "Connects any blockchain without modifications, enabling true interoperability.",
      stats: [
        { label: "Chains", value: "All" },
        { label: "Speed", value: "Instant" },
        { label: "Security", value: "Inherited" }
      ],
      features: [
        "Zero-modification integration",
        "Cross-chain messaging",
        "Liquidity bridging",
        "Asset portability"
      ]
    },
    contracts: {
      title: "Smart Contracts 3.0",
      description: "Self-evolving contracts with integrated AI that learn and optimize automatically.",
      stats: [
        { label: "Evolution", value: "Auto" },
        { label: "Learning", value: "Real-time" },
        { label: "Efficiency", value: "+1000%" }
      ],
      features: [
        "AI-powered evolution",
        "Automatic optimization",
        "Pattern learning",
        "Efficiency maximization"
      ]
    },
    carbon: {
      title: "Carbon Negative Infrastructure",
      description: "Infrastructure that removes 100 tons of CO₂ per year through renewable energy.",
      stats: [
        { label: "CO₂ Removed", value: "-100T" },
        { label: "Energy", value: "100% Green" },
        { label: "Impact", value: "Positive" }
      ],
      features: [
        "Proof of Green consensus",
        "Energy recycling",
        "Solar mining integration",
        "Automated reforestation"
      ]
    }
  };

  return (
    <div className="architecture-page">
      {/* Hero Section */}
      <section className="architecture-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Revolutionary <span className="highlight">Layer 0</span> Architecture
            </h1>
            <p className="hero-subtitle">
              Explore the groundbreaking architecture that powers HyperLayer0 - 
              the first Layer 0 infrastructure with Pure Utility model and zero burns forever.
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-diagram">
              <div className="central-core">
                <span>HyperLayer0</span>
                <div className="pulse-ring"></div>
              </div>
              <div className="orbit-layer layer-1">
                <div className="orbit-item">Quantum Mesh</div>
              </div>
              <div className="orbit-layer layer-2">
                <div className="orbit-item">Neural Consensus</div>
              </div>
              <div className="orbit-layer layer-3">
                <div className="orbit-item">Universal Bridge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="overview-section">
        <div className="section-container">
          <h2>Multi-Dimensional Architecture</h2>
          <p className="section-subtitle">
            HyperLayer0 operates as the connective fabric of the blockchain universe, 
            unifying all networks while maintaining their independence and enhancing their capabilities.
          </p>
          
          <div className="architecture-stack">
            {/* Applications Layer */}
            <div className="arch-layer layer-applications">
              <div className="layer-header">
                <h3>🚀 Applications & dApps</h3>
                <span className="layer-badge">User Interface Layer</span>
              </div>
              <div className="layer-components">
                <div className="layer-component">
                  <div className="component-icon dapps">🎮</div>
                  <span>GameFi & Metaverse</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">💰</div>
                  <span>DeFi Protocols</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">🎨</div>
                  <span>NFT Platforms</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">🏥</div>
                  <span>Real World Apps</span>
                </div>
              </div>
            </div>

            {/* Smart Contracts Layer */}
            <div className="arch-layer layer-contracts">
              <div className="layer-header">
                <h3>🧠 Smart Contracts 3.0</h3>
                <span className="layer-badge">Intelligence Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'contracts' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('contracts')}
                >
                  <div className="component-icon smart-contracts">🤖</div>
                  <span>AI-Driven Contracts</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">🔄</div>
                  <span>Self-Evolving Logic</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">🔐</div>
                  <span>Zero-Knowledge Proofs</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">⚙️</div>
                  <span>Auto-Optimization</span>
                </div>
              </div>
            </div>

            {/* HyperLayer0 Protocol */}
            <div className="arch-layer layer-hyperlayer0">
              <div className="layer-header">
                <h3>⚡ HyperLayer0 Protocol</h3>
                <span className="layer-badge">Core Infrastructure</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'hyperspeed' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('hyperspeed')}
                >
                  <div className="component-icon hyperspeed">🚄</div>
                  <span>HyperSpeed Engine</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon hyperspeed">🔗</div>
                  <span>Dynamic Sharding</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon hyperspeed">💡</div>
                  <span>State Channels Matrix</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon hyperspeed">🌊</div>
                  <span>Plasma++ Networks</span>
                </div>
              </div>
            </div>

            {/* Quantum Mesh Network */}
            <div className="arch-layer layer-quantum">
              <div className="layer-header">
                <h3>🔬 Quantum Mesh Network (QMN)</h3>
                <span className="layer-badge">Synchronization Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'neural' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('neural')}
                >
                  <div className="component-icon neural">🧬</div>
                  <span>Neural Consensus</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className={`layer-component interactive ${activeComponent === 'quantum' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('quantum')}
                >
                  <div className="component-icon quantum">⚛️</div>
                  <span>Quantum Entanglement</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon neural">🔮</div>
                  <span>Predictive Validation</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon quantum">🛡️</div>
                  <span>Self-Healing Protocol</span>
                </div>
              </div>
            </div>

            {/* Universal Bridge Protocol */}
            <div className="arch-layer layer-bridge">
              <div className="layer-header">
                <h3>🌉 Universal Bridge Protocol</h3>
                <span className="layer-badge">Interoperability Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'bridge' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('bridge')}
                >
                  <div className="component-icon universal">🔄</div>
                  <span>Cross-Chain Messaging</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">💧</div>
                  <span>Liquidity Bridging</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">🎯</div>
                  <span>Asset Portability</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">🔒</div>
                  <span>Security Inheritance</span>
                </div>
              </div>
            </div>

            {/* Blockchains Layer */}
            <div className="arch-layer layer-blockchains">
              <div className="layer-header">
                <h3>⛓️ Connected Blockchains</h3>
                <span className="layer-badge">Foundation Layer</span>
              </div>
              <div className="layer-components">
                <div className="layer-component">
                  <div className="component-icon bitcoin">₿</div>
                  <span>Bitcoin</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon ethereum">Ξ</div>
                  <span>Ethereum</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon cosmos">⚛️</div>
                  <span>Cosmos</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon ethereum">∞</div>
                  <span>All Chains</span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Details Panel */}
          {activeComponent && componentDetails[activeComponent as keyof typeof componentDetails] && (
            <div className="component-details visible">
              <div className="detail-content">
                <h3>{componentDetails[activeComponent as keyof typeof componentDetails].title}</h3>
                <p>{componentDetails[activeComponent as keyof typeof componentDetails].description}</p>
                
                <div className="detail-stats">
                  {componentDetails[activeComponent as keyof typeof componentDetails].stats.map((stat, index) => (
                    <div key={index} className="stat">
                      <span className="stat-number">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
                
                <ul className="detail-features">
                  {componentDetails[activeComponent as keyof typeof componentDetails].features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Revolutionary Technologies */}
      <section className="interactive-components">
        <div className="section-container">
          <h2>Revolutionary Technologies</h2>
          <p className="section-subtitle">
            Dive deep into the groundbreaking technologies that make HyperLayer0 
            the most advanced blockchain infrastructure ever created.
          </p>
          
          <div className="components-grid">
            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon hyperspeed">⚡</div>
                <div className="card-content">
                  <h3>HyperSpeed Engine</h3>
                </div>
              </div>
              <p className="card-description">
                Parallel processing with 1M+ simultaneous threads, achieving truly infinite scalability.
              </p>
              <ul className="card-features">
                <li>1,000,000+ parallel threads</li>
                <li>AI-optimized routing</li>
                <li>Zero-knowledge proofs</li>
                <li>Quantum entanglement sync</li>
              </ul>
            </div>

            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon neural">🧠</div>
                <div className="card-content">
                  <h3>Neural Consensus (NeuCon)</h3>
                </div>
              </div>
              <p className="card-description">
                AI-driven consensus that predicts and optimizes network performance in real-time.
              </p>
              <ul className="card-features">
                <li>AI-driven validation</li>
                <li>Predictive consensus</li>
                <li>Self-healing protocol</li>
                <li>Energy harvesting</li>
              </ul>
            </div>

            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon quantum">🔬</div>
                <div className="card-content">
                  <h3>Quantum-Safe Security</h3>
                </div>
              </div>
              <p className="card-description">
                Post-quantum cryptography with multidimensional signatures that resist quantum computers.
              </p>
              <ul className="card-features">
                <li>Lattice-based cryptography</li>
                <li>Multi-dimensional signatures</li>
                <li>Homomorphic encryption</li>
                <li>Temporal key rotation</li>
              </ul>
            </div>

            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon universal">🌉</div>
                <div className="card-content">
                  <h3>Universal Bridge Protocol</h3>
                </div>
              </div>
              <p className="card-description">
                Connects any blockchain without modifications, enabling true interoperability.
              </p>
              <ul className="card-features">
                <li>Zero-modification integration</li>
                <li>Cross-chain messaging</li>
                <li>Liquidity bridging</li>
                <li>Asset portability</li>
              </ul>
            </div>

            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon smart-contracts">🤖</div>
                <div className="card-content">
                  <h3>Smart Contracts 3.0</h3>
                </div>
              </div>
              <p className="card-description">
                Self-evolving contracts with integrated AI that learn and optimize automatically.
              </p>
              <ul className="card-features">
                <li>AI-powered evolution</li>
                <li>Automatic optimization</li>
                <li>Pattern learning</li>
                <li>Efficiency maximization</li>
              </ul>
            </div>

            <div className="interactive-card">
              <div className="card-header">
                <div className="card-icon dapps">🌱</div>
                <div className="card-content">
                  <h3>Carbon Negative Infrastructure</h3>
                </div>
              </div>
              <p className="card-description">
                Infrastructure that removes 100 tons of CO₂ per year through renewable energy.
              </p>
              <ul className="card-features">
                <li>Proof of Green consensus</li>
                <li>Energy recycling</li>
                <li>Solar mining integration</li>
                <li>Automated reforestation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="performance-section">
        <div className="section-container">
          <h2>Performance Excellence</h2>
          <p className="section-subtitle">
            Numbers that demonstrate HyperLayer0's revolutionary performance and efficiency.
          </p>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon tps">⚡</div>
              <div className="metric-value">∞</div>
              <div className="metric-label">Transactions per Second</div>
              <div className="metric-comparison">
                Truly infinite scalability through <span className="improvement">dynamic sharding</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon cost">💰</div>
              <div className="metric-value">$0.00001</div>
              <div className="metric-label">Cost per Transaction</div>
              <div className="metric-comparison">
                <span className="improvement">99.999%</span> cheaper than traditional blockchains
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon finality">⏱️</div>
              <div className="metric-value">&lt;0.001s</div>
              <div className="metric-label">Finality Time</div>
              <div className="metric-comparison">
                Sub-millisecond <span className="improvement">instant finality</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon energy">🌱</div>
              <div className="metric-value">-100</div>
              <div className="metric-label">Tons CO₂ Removed/Year</div>
              <div className="metric-comparison">
                <span className="improvement">Carbon negative</span> infrastructure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Burns Section */}
      <section className="zero-burns-section">
        <div className="section-container">
          <h2>Pure Utility Model</h2>
          <p className="section-subtitle">
            HyperLayer0 introduces the revolutionary "Pure Utility" model - 
            ZERO burns on everything, maximum freedom for users.
          </p>
          
          <div className="zero-burns-grid">
            <div className="zero-burns-card">
              <div className="burns-icon">🔄</div>
              <div className="burns-value">0%</div>
              <div className="burns-label">Transaction Burns</div>
              <div className="burns-description">
                Free transactions forever - your tokens stay yours
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">🌉</div>
              <div className="burns-value">0%</div>
              <div className="burns-label">Bridge Burns</div>
              <div className="burns-description">
                Free cross-chain transfers without any penalties
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">🔒</div>
              <div className="burns-value">0%</div>
              <div className="burns-label">Staking Penalties</div>
              <div className="burns-description">
                Stake only if you want - no pressure, no burns
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">💎</div>
              <div className="burns-value">9.9B</div>
              <div className="burns-label">Forever Supply</div>
              <div className="burns-description">
                Stable token supply - value through utility, not scarcity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="architecture-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Experience the Future</h2>
            <p>
              Join the revolution and be part of building the infrastructure 
              that will power the next era of human civilization.
            </p>
            <div className="cta-buttons">
              <button 
                className="primary-button"
                onClick={() => {
                  if (window.location.pathname === '/') {
                    const event = new CustomEvent('navigate', { detail: 'home' });
                    window.dispatchEvent(event);
                  } else {
                    window.location.href = '/';
                  }
                }}
              >
                Join the Presale
              </button>
              <button 
                className="secondary-button"
                onClick={() => {
                  const event = new CustomEvent('navigate', { detail: 'whitepaper' });
                  window.dispatchEvent(event);
                }}
              >
                Read Whitepaper
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;