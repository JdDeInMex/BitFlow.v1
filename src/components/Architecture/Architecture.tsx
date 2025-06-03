import React, { useState } from 'react';
import './Architecture.css';

const Architecture: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(0);

  return (
    <div className="architecture-page">
      {/* Hero Section */}
      <section className="architecture-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Revolutionary<span className="highlight">   Architecture</span>
            </h1>
            <p className="hero-subtitle">
Learn about the components that make BitFlow the most advanced and scalable Layer 2 solution for Bitcoin
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-diagram">
              <div className="central-core">
                <span>BitFlow</span>
                <div className="pulse-ring"></div>
              </div>
              <div className="orbit-layer layer-1">
                <div className="orbit-item">Sequencer</div>
              </div>
              <div className="orbit-layer layer-2">
                <div className="orbit-item">State Channels</div>
              </div>
              <div className="orbit-layer layer-3">
                <div className="orbit-item">ZK-STARKs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <section className="interactive-diagram">
        <div className="section-container">
          <h2>Interactive Architecture</h2>
          <p className="section-subtitle">
            Explore each component of the BitFlow solution by clicking on the elements below
          </p>
          
          <div className="diagram-wrapper">
            <div className="architecture-stack">
              {/* Bitcoin Layer */}
              <div className="arch-layer bitcoin-layer">
                <div className="layer-header">
                  <h3>Bitcoin Mainnet (L1)</h3>
                  <span className="layer-badge">Settlement Layer</span>
                </div>
                <div className="layer-components">
                  <div className="layer-component">
                    <div className="component-icon bitcoin"></div>
                    <span>Bitcoin Network</span>
                  </div>
                  <div className="layer-component">
                    <div className="component-icon security"></div>
                    <span>Security & Finality</span>
                  </div>
                </div>
              </div>

              {/* BitFlow Layer */}
              <div className="arch-layer bitflow-layer">
                <div className="layer-header">
                  <h3>BitFlow Layer 2</h3>
                  <span className="layer-badge">Execution Layer</span>
                </div>
                <div className="layer-components">
                  <div 
                    className={`layer-component interactive ${activeComponent === 'sequencer' ? 'active' : ''}`}
                    onClick={() => setActiveComponent(activeComponent === 'sequencer' ? null : 'sequencer')}
                  >
                    <div className="component-icon sequencer"></div>
                    <span>BitFlow Sequencer</span>
                    <div className="glow-effect"></div>
                  </div>
                  <div 
                    className={`layer-component interactive ${activeComponent === 'channels' ? 'active' : ''}`}
                    onClick={() => setActiveComponent(activeComponent === 'channels' ? null : 'channels')}
                  >
                    <div className="component-icon channels"></div>
                    <span>State Channels</span>
                    <div className="glow-effect"></div>
                  </div>
                  <div 
                    className={`layer-component interactive ${activeComponent === 'zk' ? 'active' : ''}`}
                    onClick={() => setActiveComponent(activeComponent === 'zk' ? null : 'zk')}
                  >
                    <div className="component-icon zk"></div>
                    <span>ZK-STARKs</span>
                    <div className="glow-effect"></div>
                  </div>
                </div>
              </div>

              {/* Application Layer */}
              <div className="arch-layer app-layer">
                <div className="layer-header">
                  <h3>Application Layer</h3>
                  <span className="layer-badge">dApps & Protocols</span>
                </div>
                <div className="layer-components">
                  <div className="layer-component">
                    <div className="component-icon defi"></div>
                    <span>DeFi Protocols</span>
                  </div>
                  <div className="layer-component">
                    <div className="component-icon gaming"></div>
                    <span>Gaming dApps</span>
                  </div>
                  <div className="layer-component">
                    <div className="component-icon nft"></div>
                    <span>NFT Platforms</span>
                  </div>
                  <div className="layer-component">
                    <div className="component-icon metaverse"></div>
                    <span>Metaverse</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Details Panel */}
            <div className={`component-details ${activeComponent ? 'visible' : ''}`}>
              {activeComponent === 'sequencer' && (
                <div className="detail-content">
                  <h3>BitFlow Sequencer</h3>
                  <p>The heart of the system that orders and processes transactions</p>
                  <div className="detail-stats">
                    <div className="stat">
                      <span className="stat-number">50,000+</span>
                      <span className="stat-label">TPS</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">&lt;100ms</span>
                      <span className="stat-label">Latency</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">99.9%</span>
                      <span className="stat-label">Uptime</span>
                    </div>
                  </div>
                  <ul className="detail-features">
                    <li>Optimized Proof-of-Stake consensus</li>
                    <li>Parallel transaction processing</li>
                    <li>Censorship resistance</li>
                    <li>Deterministic finality</li>
                  </ul>
                </div>
              )}
              
              {activeComponent === 'channels' && (
                <div className="detail-content">
                  <h3>State Channels Network</h3>
                  <p>Channel network for instant transactions</p>
                  <div className="detail-stats">
                    <div className="stat">
                      <span className="stat-number">Instant</span>
                      <span className="stat-label">Settlement</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">0.001</span>
                      <span className="stat-label">Sats Fee</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">∞</span>
                      <span className="stat-label">Scalability</span>
                    </div>
                  </div>
                  <ul className="detail-features">
                    <li>Viable micropayments</li>
                    <li>Automatic payment routing</li>
                    <li>Shared liquidity pool</li>
                    <li>Secure channel closure</li>
                  </ul>
                </div>
              )}
              
              {activeComponent === 'zk' && (
                <div className="detail-content">
                  <h3>ZK-STARK Proofs</h3>
                  <p>Zero-knowledge proofs for maximum security</p>
                  <div className="detail-stats">
                    <div className="stat">
                      <span className="stat-number">Zero</span>
                      <span className="stat-label">Knowledge</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">Quantum</span>
                      <span className="stat-label">Resistant</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">100%</span>
                      <span className="stat-label">Verified</span>
                    </div>
                  </div>
                  <ul className="detail-features">
                    <li>Mathematical verification of transactions</li>
                    <li>Optional privacy preserved</li>
                    <li>Quantum attack resistance</li>
                    <li>Efficient data compression</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Flow */}
      <section className="transaction-flow">
        <div className="section-container">
          <h2>Transaction Flow</h2>
          <p className="section-subtitle">
            Follow the path of a transaction from submission to finalization
          </p>
          
          <div className="flow-timeline">
            {[
              {
                title: "Submission",
                description: "User sends transaction",
                time: "✓",
                details: "The transaction is sent to the BitFlow Sequencer through the user interface"
              },
              {
                title: "Validation",
                description: "Signature and balance verification",
                time: "✓",
                details: "The Sequencer validates the digital signature and verifies sufficient balance"
              },
              {
                title: "Batching",
                description: "Grouping with other transactions",
                time: "✓",
                details: "The transaction is grouped with others in a batch for maximum efficiency"
              },
              {
                title: "ZK Proof",
                description: "Mathematical proof generation",
                time: "✓",
                details: "ZK-STARK system generates cryptographic proof of batch validity"
              },
              {
                title: "L2 Finality",
                description: "Layer 2 confirmation",
                time: "✓",
                details: "Transaction is confirmed on BitFlow L2 with cryptographic guarantees"
              },
              {
                title: "L1 Settlement",
                description: "Bitcoin mainnet settlement",
                time: "✓",
                details: "Proofs are periodically submitted to the main Bitcoin network"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className={`flow-step ${selectedStep === index ? 'active' : ''}`}
                onClick={() => setSelectedStep(index)}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <span className="step-time">{step.time}</span>
                </div>
                <div className="step-details">
                  {step.details}
                </div>
                {index < 5 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="performance-metrics">
        <div className="section-container">
          <h2>Performance in Numbers</h2>
          <p className="section-subtitle">
            Metrics that demonstrate BitFlow's technical superiority
          </p>
          
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon throughput"></div>
              <div className="metric-value">50,000+</div>
              <div className="metric-label">Transactions per Second</div>
              <div className="metric-comparison">
                vs. Bitcoin: <span className="improvement">7,142x</span> faster
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon cost"></div>
              <div className="metric-value">0.001</div>
              <div className="metric-label">Sats per Transaction</div>
              <div className="metric-comparison">
                vs. Bitcoin: <span className="improvement">99.9%</span> cheaper
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon finality"></div>
              <div className="metric-value">&lt;1s</div>
              <div className="metric-label">Finality Time</div>
              <div className="metric-comparison">
                vs. Bitcoin: <span className="improvement">3,600x</span> faster
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon energy"></div>
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Energy Reduction</div>
              <div className="metric-comparison">
                <span className="improvement">Sustainable</span> efficiency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Model */}
      <section className="security-model">
        <div className="section-container">
          <h2>Security Model</h2>
          <p className="section-subtitle">
            Multiple layers of protection ensure the security of your funds
          </p>
          
          <div className="security-layers">
            <div className="security-layer">
              <div className="security-icon bitcoin-security"></div>
              <h3>Bitcoin Inheritance</h3>
              <p>Base security from the Bitcoin network with over 15 years of uninterrupted operation</p>
              <ul>
                <li>Proof-of-Work with 400+ EH/s</li>
                <li>Global decentralization</li>
                <li>Proven immutability</li>
                <li>Censorship resistance</li>
              </ul>
            </div>
            
            <div className="security-layer">
              <div className="security-icon cryptographic"></div>
              <h3>Cryptographic Proofs</h3>
              <p>ZK-STARKs provide mathematical verification without revealing private information</p>
              <ul>
                <li>Zero-knowledge proofs</li>
                <li>Deterministic verification</li>
                <li>Quantum resistance</li>
                <li>Logarithmic scalability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Architecture;