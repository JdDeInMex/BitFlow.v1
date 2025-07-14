import React, { useState, useEffect } from 'react';
import './Architecture.css';

// Estrutura de dados expandida
interface ComponentDetail {
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  features: string[];
  technicalSpecs?: {
    architecture?: string;
    consensus?: string;
    throughput?: string;
    latency?: string;
    security?: string;
  };
  realWorldApplications?: string[];
  benefits?: string[];
}

const Architecture: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [visibleSection, setVisibleSection] = useState<string>('overview');
  const [activeTab, setActiveTab] = useState<string>('speed');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

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
    const elements = document.querySelectorAll('.arch-layer, .spec-card, .metric-card, .zero-burns-card, .comparison-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Component details data - expandido
  const componentDetails: Record<string, ComponentDetail> = {
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
      ],
      technicalSpecs: {
        architecture: "Multi-dimensional parallel processing",
        throughput: "1TB/s data processing",
        latency: "Global latency <10ms",
        security: "Quantum-resistant encryption"
      },
      realWorldApplications: [
        "High-frequency trading",
        "Real-time gaming",
        "IoT data processing",
        "Global payment systems"
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
      ],
      technicalSpecs: {
        consensus: "AI-optimized Byzantine Fault Tolerance",
        architecture: "Neural network with 100M+ parameters",
        throughput: "Adaptive based on network conditions",
        security: "Self-learning threat detection"
      },
      benefits: [
        "50% reduction in energy consumption",
        "Automatic network optimization",
        "Predictive maintenance",
        "Zero downtime architecture"
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
      ],
      technicalSpecs: {
        security: "NIST post-quantum standards compliant",
        architecture: "5-dimensional signature space",
        consensus: "Quantum-resistant validation",
        latency: "Signature generation <5ms"
      }
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
      ],
      technicalSpecs: {
        architecture: "Universal adapter pattern",
        throughput: "10M+ cross-chain TPS",
        security: "Inherits source chain security",
        latency: "Cross-chain finality <3s"
      }
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
      ],
      technicalSpecs: {
        architecture: "Neural contract engine",
        consensus: "AI-validated execution",
        throughput: "100K+ contract calls/second",
        security: "Self-auditing capabilities"
      },
      realWorldApplications: [
        "Self-optimizing DeFi protocols",
        "Adaptive insurance contracts",
        "Dynamic supply chain management",
        "Intelligent DAOs"
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
      ],
      benefits: [
        "Carbon negative operations",
        "Renewable energy powered",
        "Environmental impact tracking",
        "Sustainable blockchain future"
      ]
    }
  };

  // Componentes secundários
  const secondaryComponents = {
    dynamicSharding: {
      title: "Dynamic Sharding",
      description: "Auto-adjustable shards that scale based on network demand",
      icon: "🔗",
      features: [
        "Automatic shard creation/merging",
        "Load-balanced distribution",
        "Cross-shard communication",
        "State synchronization"
      ]
    },
    stateChannels: {
      title: "State Channels Matrix",
      description: "Multi-dimensional state channels for instant off-chain transactions",
      icon: "💡",
      features: [
        "Instant finality",
        "Zero gas fees",
        "Privacy preservation",
        "Unlimited scalability"
      ]
    },
    plasmaNetworks: {
      title: "Plasma++ Networks",
      description: "Enhanced Plasma implementation with quantum resistance",
      icon: "🌊",
      features: [
        "Child chain security",
        "Mass exit protection",
        "Fraud proof system",
        "Quantum-safe design"
      ]
    },
    predictiveValidation: {
      title: "Predictive Validation",
      description: "AI predicts and pre-validates transactions before execution",
      icon: "🔮",
      features: [
        "Transaction prediction",
        "Pre-validation caching",
        "Conflict resolution",
        "Optimistic execution"
      ]
    },
    selfHealing: {
      title: "Self-Healing Protocol",
      description: "Automatic detection and repair of network issues",
      icon: "🛡️",
      features: [
        "Anomaly detection",
        "Automatic recovery",
        "Network resilience",
        "Zero downtime"
      ]
    }
  };

  // Métricas de performance expandidas
  const performanceMetrics = {
    speed: {
      title: "Transaction Speed",
      metrics: [
        { label: "TPS", value: "∞", description: "Infinite scalability" },
        { label: "Finality", value: "<0.1s", description: "Near-instant confirmation" },
        { label: "Latency", value: "<10ms", description: "Global network latency" },
        { label: "Throughput", value: "1TB/s", description: "Data processing capacity" }
      ],
      comparison: {
        bitcoin: { name: "Bitcoin", tps: "7", finality: "60min", color: "#f7931a" },
        ethereum: { name: "Ethereum", tps: "30", finality: "6min", color: "#627eea" },
        solana: { name: "Solana", tps: "65,000", finality: "0.4s", color: "#00d18c" },
        hyperlayer0: { name: "HyperLayer0", tps: "∞", finality: "0.001s", color: "#00ff88" }
      }
    },
    efficiency: {
      title: "Network Efficiency",
      metrics: [
        { label: "Energy/TX", value: "0.0001kWh", description: "Ultra-low energy usage" },
        { label: "Cost/TX", value: "$0.0002", description: "Fixed low cost " },
        { label: "Carbon", value: "-100T/year", description: "Carbon negative" },
        { label: "Efficiency", value: "99.99%", description: "Network utilization" }
      ]
    },
    security: {
      title: "Security Metrics",
      metrics: [
        { label: "Quantum Safe", value: "100%", description: "Post-quantum security" },
        { label: "Uptime", value: "100%", description: "Network availability" },
        { label: "Attack Resistance", value: "∞", description: "Unhackable design" },
        { label: "Decentralization", value: "100%", description: "Fully distributed" }
      ]
    }
  };

  // Handle component selection
  const handleComponentClick = (componentId: string) => {
    setActiveComponent(activeComponent === componentId ? null : componentId);
  };

  // Handle tooltip
  const handleTooltipEnter = (componentId: string) => {
    setShowTooltip(componentId);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(null);
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
            <div className="floating-diagram orbit-diagram">
              <div className="central-core">
                <span>HyperLayer0</span>
                <div className="pulse-ring"></div>
              </div>
              {/* Orbiting cards */}
              <div className="orbit-card orbit-card-1">
                <div className="orbit-card-content">
                  <span className="orbit-card-icon">🔬</span>
                  <span className="orbit-card-label">Quantum Mesh</span>
                </div>
              </div>
              <div className="orbit-card orbit-card-2">
                <div className="orbit-card-content">
                  <span className="orbit-card-icon">🧠</span>
                  <span className="orbit-card-label">Neural Consensus</span>
                </div>
              </div>
              <div className="orbit-card orbit-card-3">
                <div className="orbit-card-content">
                  <span className="orbit-card-icon">🌉</span>
                  <span className="orbit-card-label">Universal Bridge</span>
                </div>
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
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('dynamicSharding')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">🔗</div>
                  <span>Dynamic Sharding</span>
                  {showTooltip === 'dynamicSharding' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.dynamicSharding.title}</h4>
                      <p>{secondaryComponents.dynamicSharding.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('stateChannels')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">💡</div>
                  <span>State Channels Matrix</span>
                  {showTooltip === 'stateChannels' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.stateChannels.title}</h4>
                      <p>{secondaryComponents.stateChannels.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('plasmaNetworks')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">🌊</div>
                  <span>Plasma++ Networks</span>
                  {showTooltip === 'plasmaNetworks' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.plasmaNetworks.title}</h4>
                      <p>{secondaryComponents.plasmaNetworks.description}</p>
                    </div>
                  )}
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
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('predictiveValidation')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon neural">🔮</div>
                  <span>Predictive Validation</span>
                  {showTooltip === 'predictiveValidation' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.predictiveValidation.title}</h4>
                      <p>{secondaryComponents.predictiveValidation.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('selfHealing')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon quantum">🛡️</div>
                  <span>Self-Healing Protocol</span>
                  {showTooltip === 'selfHealing' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.selfHealing.title}</h4>
                      <p>{secondaryComponents.selfHealing.description}</p>
                    </div>
                  )}
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

                {/* Technical Specs if available */}
                {componentDetails[activeComponent as keyof typeof componentDetails].technicalSpecs && (
                  <div className="technical-specs">
                    <h4>Technical Specifications</h4>
                    <div className="specs-grid">
                      {Object.entries(componentDetails[activeComponent as keyof typeof componentDetails].technicalSpecs || {}).map(([key, value]) => (
                        <div key={key} className="spec-item">
                          <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real World Applications if available */}
                {componentDetails[activeComponent as keyof typeof componentDetails].realWorldApplications && (
                  <div className="applications">
                    <h4>Real World Applications</h4>
                    <div className="applications-list">
                      {componentDetails[activeComponent as keyof typeof componentDetails].realWorldApplications?.map((app, index) => (
                        <span key={index} className="application-tag">{app}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="technical-specifications">
        <div className="section-container">
          <h2>Technical Deep Dive</h2>
          <p className="section-subtitle">
            Explore the cutting-edge technologies and specifications that make HyperLayer0 
            the most advanced blockchain infrastructure ever created.
          </p>

          <div className="specs-tabs">
            <button 
              className={`spec-tab ${expandedSpec === 'hyperspeed' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'hyperspeed' ? null : 'hyperspeed')}
            >
              ⚡ HyperSpeed Engine
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'neucon' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'neucon' ? null : 'neucon')}
            >
              🧠 Neural Consensus
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'quantum' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'quantum' ? null : 'quantum')}
            >
              🔒 Quantum Security
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'bridge' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'bridge' ? null : 'bridge')}
            >
              🌉 Universal Bridge
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'contracts' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'contracts' ? null : 'contracts')}
            >
              🤖 Smart Contracts 3.0
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'carbon' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'carbon' ? null : 'carbon')}
            >
              🌱 Carbon Negative
            </button>
          </div>

          {expandedSpec && (
            <div className="spec-details animate-in">
              {expandedSpec === 'hyperspeed' && (
                <div className="spec-content">
                  <h3>HyperSpeed Engine Technical Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Parallel Processing</h4>
                      <ul>
                        <li>1,000,000+ simultaneous threads</li>
                        <li>Dynamic thread allocation</li>
                        <li>Zero thread collision</li>
                        <li>Quantum-enhanced synchronization</li>
                        <li>AI-optimized routing</li>
                        <li>Predictive caching</li>
                        <li>Multi-dimensional sharding</li>
                        <li>Adaptive resource allocation</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Performance Metrics</h4>
                      <ul>
                        <li>Infinite TPS scalability</li>
                        <li>Sub-millisecond latency</li>
                        <li>1TB/s data throughput</li>
                        <li>99.999% uptime guarantee</li>
                        <li>Global latency &lt;10ms</li>
                        <li>Auto-scaling capabilities</li>
                        <li>Load balancing optimization</li>
                        <li>Real-time performance monitoring</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Architecture</h4>
                      <ul>
                        <li>Multi-dimensional sharding</li>
                        <li>Adaptive load balancing</li>
                        <li>Predictive resource allocation</li>
                        <li>Self-optimizing protocols</li>
                        <li>Quantum mesh networking</li>
                        <li>Elastic compute scaling</li>
                        <li>State channel matrix</li>
                        <li>Plasma++ integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'neucon' && (
                <div className="spec-content">
                  <h3>Neural Consensus (NeuCon) Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>AI Architecture</h4>
                      <ul>
                        <li>100M+ parameter neural network</li>
                        <li>Real-time learning algorithms</li>
                        <li>Predictive validation engine</li>
                        <li>Self-healing protocols</li>
                        <li>Pattern recognition systems</li>
                        <li>Anomaly detection AI</li>
                        <li>Neural optimization engine</li>
                        <li>Adaptive consensus mechanisms</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Consensus Mechanism</h4>
                      <ul>
                        <li>AI-optimized BFT</li>
                        <li>99.9% accuracy rate</li>
                        <li>Adaptive finality</li>
                        <li>Energy-efficient validation</li>
                        <li>Predictive consensus</li>
                        <li>Self-healing protocol</li>
                        <li>Energy harvesting</li>
                        <li>Threat prediction system</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Learning Capabilities</h4>
                      <ul>
                        <li>Pattern recognition</li>
                        <li>Anomaly detection</li>
                        <li>Performance optimization</li>
                        <li>Threat prediction</li>
                        <li>Network behavior analysis</li>
                        <li>Automatic parameter tuning</li>
                        <li>Predictive maintenance</li>
                        <li>Adaptive governance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'quantum' && (
                <div className="spec-content">
                  <h3>Quantum-Safe Security Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Cryptography</h4>
                      <ul>
                        <li>Lattice-based encryption</li>
                        <li>5-dimensional signatures</li>
                        <li>NIST post-quantum compliant</li>
                        <li>Homomorphic computation</li>
                        <li>Quantum key distribution</li>
                        <li>Zero-knowledge proofs</li>
                        <li>Multi-party computation</li>
                        <li>Temporal key rotation</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Security Features</h4>
                      <ul>
                        <li>Quantum attack resistance</li>
                        <li>Temporal key rotation</li>
                        <li>Multi-layer encryption</li>
                        <li>Zero-knowledge proofs</li>
                        <li>Homomorphic encryption</li>
                        <li>Quantum-safe protocols</li>
                        <li>Future-proof architecture</li>
                        <li>Decentralized key management</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Protection Levels</h4>
                      <ul>
                        <li>256-bit quantum security</li>
                        <li>Unhackable by design</li>
                        <li>Future-proof architecture</li>
                        <li>Decentralized key management</li>
                        <li>Multi-signature validation</li>
                        <li>Threshold cryptography</li>
                        <li>Secure multi-party computation</li>
                        <li>Quantum-resistant standards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'bridge' && (
                <div className="spec-content">
                  <h3>Universal Bridge Protocol Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Interoperability</h4>
                      <ul>
                        <li>Zero-modification integration</li>
                        <li>Universal adapter pattern</li>
                        <li>Cross-chain messaging</li>
                        <li>Asset portability</li>
                        <li>Protocol abstraction layer</li>
                        <li>Consensus agnostic design</li>
                        <li>Multi-chain routing</li>
                        <li>Atomic cross-chain swaps</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Performance</h4>
                      <ul>
                        <li>10M+ cross-chain TPS</li>
                        <li>3-second finality</li>
                        <li>Instant liquidity bridging</li>
                        <li>Minimal slippage</li>
                        <li>Optimized gas usage</li>
                        <li>Parallel processing</li>
                        <li>Load balancing</li>
                        <li>Auto-scaling bridges</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Security Model</h4>
                      <ul>
                        <li>Inherits chain security</li>
                        <li>Multi-sig validation</li>
                        <li>Fraud proof system</li>
                        <li>Emergency pause mechanism</li>
                        <li>Slashing conditions</li>
                        <li>Economic security</li>
                        <li>Validator diversity</li>
                        <li>Cross-chain governance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'contracts' && (
                <div className="spec-content">
                  <h3>Smart Contracts 3.0 Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>AI Integration</h4>
                      <ul>
                        <li>Neural network optimization</li>
                        <li>Self-learning algorithms</li>
                        <li>Pattern recognition engine</li>
                        <li>Adaptive execution paths</li>
                        <li>Predictive contract behavior</li>
                        <li>Dynamic parameter adjustment</li>
                        <li>Automated bug detection</li>
                        <li>Performance optimization</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Evolution Engine</h4>
                      <ul>
                        <li>Automatic code optimization</li>
                        <li>Gas efficiency improvement</li>
                        <li>Bug self-correction</li>
                        <li>Performance enhancement</li>
                        <li>Security vulnerability patching</li>
                        <li>Logic optimization</li>
                        <li>Runtime improvements</li>
                        <li>Adaptive resource usage</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Developer Experience</h4>
                      <ul>
                        <li>Natural language coding</li>
                        <li>Visual programming interface</li>
                        <li>Auto-documentation</li>
                        <li>Real-time debugging</li>
                        <li>Code generation from specs</li>
                        <li>Automated testing</li>
                        <li>Version control integration</li>
                        <li>Collaborative development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'carbon' && (
                <div className="spec-content">
                  <h3>Carbon Negative Infrastructure Specifications</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Green Consensus</h4>
                      <ul>
                        <li>Proof of Green validation</li>
                        <li>Energy recycling protocols</li>
                        <li>Solar-powered nodes</li>
                        <li>Wind energy integration</li>
                        <li>Hydro power utilization</li>
                        <li>Geothermal energy systems</li>
                        <li>Renewable energy certificates</li>
                        <li>Carbon offset automation</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Environmental Impact</h4>
                      <ul>
                        <li>100 tons CO₂ removed annually</li>
                        <li>Carbon credit generation</li>
                        <li>Reforestation automation</li>
                        <li>Ecosystem restoration</li>
                        <li>Ocean cleanup funding</li>
                        <li>Biodiversity protection</li>
                        <li>Waste reduction initiatives</li>
                        <li>Circular economy support</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Sustainable Economics</h4>
                      <ul>
                        <li>Green mining rewards</li>
                        <li>Carbon-negative incentives</li>
                        <li>Renewable energy bonuses</li>
                        <li>Environmental governance</li>
                        <li>Sustainability metrics</li>
                        <li>ESG compliance automation</li>
                        <li>Impact measurement</li>
                        <li>Transparent reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Performance Metrics with Comparisons */}
      <section className="performance-section">
        <div className="section-container">
          <h2>Performance Excellence</h2>
          <p className="section-subtitle">
            Numbers that demonstrate HyperLayer0's revolutionary performance and efficiency.
          </p>
          
          {/* Tab Navigation */}
          <div className="performance-tabs">
            <button 
              className={`perf-tab ${activeTab === 'speed' ? 'active' : ''}`}
              onClick={() => setActiveTab('speed')}
            >
              ⚡ Speed
            </button>
            <button 
              className={`perf-tab ${activeTab === 'efficiency' ? 'active' : ''}`}
              onClick={() => setActiveTab('efficiency')}
            >
              💎 Efficiency
            </button>
            <button 
              className={`perf-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="performance-content">
            {activeTab === 'speed' && (
              <div className="tab-content animate-in">
                <div className="metrics-grid">
                  {performanceMetrics.speed.metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                      <h3>{metric.value}</h3>
                      <p>{metric.label}</p>
                      <span className="metric-description">{metric.description}</span>
                    </div>
                  ))}
                </div>

                {/* Blockchain Comparison */}
                <div className="comparison-section">
                  <h3>Blockchain Speed Comparison</h3>
                  <div className="comparison-layout">
                    {/* HyperLayer0 on the left */}
                    <div className="hyperlayer0-highlight">
                      <div className="blockchain-logo">
                        <div className="hl0-icon">HL0</div>
                        <h4>HyperLayer0</h4>
                      </div>
                      <div className="highlight-stats">
                        <div className="stat-row">
                          <span className="stat-label">TPS</span>
                          <span className="stat-value highlight-value">∞</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Finality</span>
                          <span className="stat-value highlight-value">0.10s</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Cost/TX</span>
                          <span className="stat-value highlight-value">$0.01</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Energy/TX</span>
                          <span className="stat-value highlight-value">0.0001kWh</span>
                        </div>
                      </div>
                      <div className="superiority-badge">
                        Next Generation Layer 0
                      </div>
                    </div>

                    {/* Other blockchains on the right */}
                    <div className="other-blockchains">
                      <div className="comparison-card bitcoin-card">
                        <div className="blockchain-header">
                          <span className="blockchain-icon">₿</span>
                          <span className="blockchain-name">Bitcoin</span>
                        </div>
                        <div className="comparison-stats">
                          <div className="stat-item">
                            <span className="stat-label">TPS</span>
                            <span className="stat-value">7</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Finality</span>
                            <span className="stat-value">60min</span>
                          </div>
                        </div>
                      </div>

                      <div className="comparison-card ethereum-card">
                        <div className="blockchain-header">
                          <span className="blockchain-icon">Ξ</span>
                          <span className="blockchain-name">Ethereum</span>
                        </div>
                        <div className="comparison-stats">
                          <div className="stat-item">
                            <span className="stat-label">TPS</span>
                            <span className="stat-value">30</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Finality</span>
                            <span className="stat-value">6min</span>
                          </div>
                        </div>
                      </div>

                      <div className="comparison-card solana-card">
                        <div className="blockchain-header">
                          <span className="blockchain-icon">◎</span>
                          <span className="blockchain-name">Solana</span>
                        </div>
                        <div className="comparison-stats">
                          <div className="stat-item">
                            <span className="stat-label">TPS</span>
                            <span className="stat-value">65,000</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Finality</span>
                            <span className="stat-value">0.4s</span>
                          </div>
                        </div>
                      </div>

                      <div className="comparison-card polygon-card">
                        <div className="blockchain-header">
                          <span className="blockchain-icon">⬢</span>
                          <span className="blockchain-name">Polygon</span>
                        </div>
                        <div className="comparison-stats">
                          <div className="stat-item">
                            <span className="stat-label">TPS</span>
                            <span className="stat-value">7,000</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Finality</span>
                            <span className="stat-value">2s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'efficiency' && (
              <div className="tab-content animate-in">
                <div className="metrics-grid">
                  {performanceMetrics.efficiency.metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                      <h3>{metric.value}</h3>
                      <p>{metric.label}</p>
                      <span className="metric-description">{metric.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content animate-in">
                <div className="metrics-grid">
                  {performanceMetrics.security.metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                      <h3>{metric.value}</h3>
                      <p>{metric.label}</p>
                      <span className="metric-description">{metric.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="developer-resources">
        <div className="section-container">
          <h2>Developer Resources</h2>
          <p className="section-subtitle">
            Everything you need to build on HyperLayer0's revolutionary infrastructure.
          </p>

          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Documentation</h3>
              <p>Comprehensive guides and API references for developers.</p>
              <ul>
                <li>Getting Started Guide</li>
                <li>API Reference</li>
                <li>Smart Contract Templates</li>
                <li>Best Practices</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">🛠️</div>
              <h3>SDKs & Tools</h3>
              <p>Development kits for all major programming languages.</p>
              <ul>
                <li>JavaScript/TypeScript SDK</li>
                <li>Python SDK</li>
                <li>Rust SDK</li>
                <li>CLI Tools</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">🚀</div>
              <h3>Integration Guide</h3>
              <p>Step-by-step instructions for blockchain integration.</p>
              <ul>
                <li>Universal Bridge Setup</li>
                <li>Cross-chain Messaging</li>
                <li>Smart Contract Migration</li>
                <li>Security Audits</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">💡</div>
              <h3>Use Case Examples</h3>
              <p>Real-world implementations and code samples.</p>
              <ul>
                <li>DeFi Protocols</li>
                <li>NFT Marketplaces</li>
                <li>Gaming Applications</li>
                <li>Enterprise Solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pure Utility Model */}
      <section className="zero-burns-section">
        <div className="section-container">
          <h2>Pure Utility Model</h2>
          <p className="section-subtitle">
            HyperLayer0's revolutionary approach: No burns, no penalties, no pressure. 
            Just pure utility and sustainable growth.
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