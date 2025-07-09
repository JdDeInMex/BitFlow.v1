import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              About <span className="highlight">HyperLayer0</span>
            </h1>
            <p className="hero-subtitle">
              Revolutionizing Web3 with the first Layer 0 infrastructure 
              that adopts the "Pure Utility" model - ZERO burns, maximum freedom, 
              value through genuine utility.
            </p>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="element element-1"></div>
              <div className="element element-2"></div>
              <div className="element element-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Our Mission</h2>
              <p>
                HyperLayer0 was born from the need to create a truly free and 
                user-centric Web3 infrastructure. Our mission is to democratize 
                access to blockchain technology through a revolutionary model that offers:
              </p>
              <ul className="mission-list">
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Zero Burns Forever:</strong> No token burns, ever
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Infinite Scalability:</strong> ∞ TPS with sub-second finality
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Total Freedom:</strong> Use, stake, trade or hold - your choice
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Value = Utility:</strong> Growth through real adoption
                  </div>
                </li>
              </ul>
            </div>
            <div className="content-visual">
              <div className="mission-graphic">
                <div className="central-node">
                  <span>HyperLayer0</span>
                </div>
                <div className="orbit orbit-1">
                  <div className="satellite">Zero Burns</div>
                </div>
                <div className="orbit orbit-2">
                  <div className="satellite">Pure Utility</div>
                </div>
                <div className="orbit orbit-3">
                  <div className="satellite">User Freedom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="section-container">
          <div className="vision-header">
            <h2>Our Vision</h2>
            <p>
              Build the definitive infrastructure for the Internet of Value
            </p>
          </div>
          
          <div className="vision-cards">
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon global"></div>
              </div>
              <h3>Internet of Everything</h3>
              <p>
                Connect billions of people and trillions of devices in a 
                unified network where value flows freely without borders.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon innovation"></div>
              </div>
              <h3>Genuine Utility</h3>
              <p>
                Create value through real utility, not artificiality. 
                Sustainable growth based on adoption and effective use.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon ecosystem"></div>
              </div>
              <h3>Absolute Freedom</h3>
              <p>
                Ensure users have 100% control over their tokens, 
                without pressure or penalties for any action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solution */}
      <section className="problem-solution">
        <div className="section-container">
          <div className="section-header">
            <h2>The Problem We Solve</h2>
            <p>
              Current blockchains suffer from fragmentation, artificiality and 
              penalize users for using their own networks.
            </p>
          </div>
          
          <div className="comparison-grid">
            <div className="comparison-side problems">
              <h3>Current Issues</h3>
              <div className="comparison-items">
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Punitive Burns</h4>
                  </div>
                  <p>Users lose tokens just for using the network</p>
                  <div className="metric">
                    <span className="metric-value red">2-10% per transaction</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Artificiality</h4>
                  </div>
                  <p>Value based on artificial scarcity, not utility</p>
                  <div className="metric">
                    <span className="metric-value red">Supply Manipulation</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Fragmentation</h4>
                  </div>
                  <p>Isolated blockchains without real interoperability</p>
                  <div className="metric">
                    <span className="metric-value red">100+ isolated chains</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="comparison-divider">
              <div className="arrow-icon">→</div>
            </div>
            
            <div className="comparison-side solutions">
              <h3>HyperLayer0 Solution</h3>
              <div className="comparison-items">
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Zero Burns Forever</h4>
                  </div>
                  <p>Use the network freely without losing tokens</p>
                  <div className="metric">
                    <span className="metric-value green">0% burns on everything</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Pure Utility</h4>
                  </div>
                  <p>Value based on real utility and genuine adoption</p>
                  <div className="metric">
                    <span className="metric-value green">9.9B stable tokens</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Universal Bridge</h4>
                  </div>
                  <p>Connects ALL blockchains in unified infrastructure</p>
                  <div className="metric">
                    <span className="metric-value green">∞ blockchains connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="problem-solution-cta">
          <button 
            className="primary-button large"
            onClick={() => {
              if (window.location.pathname === '/') {
                const event = new CustomEvent('navigate', { detail: 'use-cases' });
                window.dispatchEvent(event);
              } else {
                window.location.href = '/use-cases';
              }
            }}
          >
            Explore All Solutions
          </button>
          <p className="cta-description">
            Discover all use cases and practical applications of HyperLayer0
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Revolutionary Technology</h2>
            <p>
              We combine the best practices in blockchain with proprietary 
              innovations to create a unique solution.
            </p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon zk-proof"></div>
              <h3>Quantum Mesh Network (QMN)</h3>
              <p>
                Quantum network that instantly synchronizes all connected 
                blockchains using quantum entanglement for sub-second finality.
              </p>
              <div className="tech-benefit">
                Instant Synchronization
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon sequencer"></div>
              <h3>Neural Consensus (NeuCon)</h3>
              <p>
                AI-driven intelligent consensus that predicts and automatically 
                optimizes the network in real-time with self-healing capabilities.
              </p>
              <div className="tech-benefit">
                Self-Optimizing AI
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon state-channels"></div>
              <h3>Universal Bridge Protocol</h3>
              <p>
                Protocol that connects any existing or future blockchain 
                without modifications to the original code, enabling true interoperability.
              </p>
              <div className="tech-benefit">
                Total Interoperability
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon virtual-machine"></div>
              <h3>Smart Contracts 3.0</h3>
              <p>
                Self-evolving contracts with integrated AI that learn 
                and optimize themselves automatically for maximum efficiency.
              </p>
              <div className="tech-benefit">
                Automatic Evolution
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon quantum-safe"></div>
              <h3>Quantum-Safe Security</h3>
              <p>
                Post-quantum cryptography with multidimensional signatures 
                and homomorphic encryption that resists quantum computers.
              </p>
              <div className="tech-benefit">
                Future-Proof Security
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon carbon-negative"></div>
              <h3>Carbon Negative Infrastructure</h3>
              <p>
                Infrastructure that removes 100 tons of CO₂ per year 
                through renewable energy harvesting and automated reforestation.
              </p>
              <div className="tech-benefit">
                Heals the Planet
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon hyperspeed"></div>
              <h3>HyperSpeed Engine</h3>
              <p>
                Parallel processing with 1M+ simultaneous threads, 
                AI-optimized routing and zero-knowledge proofs for infinite TPS.
              </p>
              <div className="tech-benefit">
                Infinite Scalability
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon dynamic-sharding"></div>
              <h3>Dynamic Sharding Matrix</h3>
              <p>
                Self-adjusting shards with elastic compute resources 
                and state channels for on-demand scaling without limits.
              </p>
              <div className="tech-benefit">
                Limitless Growth
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon universal-tokenization"></div>
              <h3>Universal Asset Tokenization</h3>
              <p>
                Tokenize any real-world asset: real estate, vehicles, art, 
                commodities, IP, energy, and data with fractional ownership.
              </p>
              <div className="tech-benefit">
                Real World Bridge
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon metaverse-native"></div>
              <h3>Metaverse Native Infrastructure</h3>
              <p>
                Distributed rendering, on-chain physics engine, 
                avatar persistence, and cross-metaverse asset portability.
              </p>
              <div className="tech-benefit">
                Virtual Reality Ready
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon quantum-computing"></div>
              <h3>Quantum Computing Integration</h3>
              <p>
                Quantum Computing as a Service (QCaaS) for optimization, 
                simulation, ML training, and solving NP-complete problems.
              </p>
              <div className="tech-benefit">
                Quantum Advantage
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon iot-world"></div>
              <h3>IoT & Real World Connectivity</h3>
              <p>
                Connect 100B+ devices with machine-to-machine micro-payments, 
                molecular supply chain tracking, and smart city infrastructure.
              </p>
              <div className="tech-benefit">
                Everything Connected
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon gamefi-revolution"></div>
              <h3>GameFi Revolution Engine</h3>
              <p>
                Zero latency gaming, truly owned NFT assets, 
                cross-game economy, and Play-to-Earn 2.0 infrastructure.
              </p>
              <div className="tech-benefit">
                Gaming Evolved
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon financial-bridge"></div>
              <h3>Total Financial Bridge</h3>
              <p>
                Native crypto cards, on-chain bank accounts, 
                24/7 tokenized stocks, automatic compliance, and real-time auditing.
              </p>
              <div className="tech-benefit">
                TradFi Integration
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon analytics-ai"></div>
              <h3>Real-Time Analytics & BI</h3>
              <p>
                On-chain analytics, predictive AI models, 
                market intelligence, and continuous risk assessment with custom dashboards.
              </p>
              <div className="tech-benefit">
                Data Intelligence
              </div>
            </div>

            <div className="tech-card">
              <div className="tech-icon creative-economy"></div>
              <h3>Complete Creative Economy</h3>
              <p>
                Dynamic evolving NFTs, perpetual royalties, 
                global collaboration rewards, and automated IP protection.
              </p>
              <div className="tech-benefit">
                Creator Empowerment
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Visionaries and Builders</h2>
            <p>
              Brilliant minds united to build the future of humanity
            </p>
          </div>
          
          <div className="team-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Years Combined Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Web3 Specialists</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">PhDs in Quantum Computing</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1B+</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
          </div>
          
          <div className="expertise-areas">
            <h3>Areas of Expertise</h3>
            <div className="expertise-grid">
              <div className="expertise-item">
                <div className="expertise-icon crypto"></div>
                <span>Quantum Computing</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon blockchain"></div>
                <span>Artificial Intelligence</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon security"></div>
                <span>Post-Quantum Cryptography</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon scaling"></div>
                <span>Network Theory</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon defi"></div>
                <span>Distributed Systems</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon gamefi"></div>
                <span>Behavioral Economics</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon nft"></div>
                <span>Sustainability</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon tokenization"></div>
                <span>Incentive Design</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon metaverse"></div>
                <span>Decentralized Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="section-container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2>Our Philosophy: Pure Utility</h2>
              <p>
                We believe that true value in blockchain should come from 
                <strong> genuine utility</strong>, not artificial manipulation of supply 
                or penalizing users.
              </p>
              
              <div className="philosophy-principles">
                <div className="principle-item">
                  <span className="principle-icon">🆓</span>
                  <div>
                    <h4>Absolute Freedom</h4>
                    <p>Your tokens are yours. Use them however you want, whenever you want, without penalties.</p>
                  </div>
                </div>
                
                <div className="principle-item">
                  <span className="principle-icon">💎</span>
                  <div>
                    <h4>Total Transparency</h4>
                    <p>No tricks, hidden burns or manipulations. What you see is what you get.</p>
                  </div>
                </div>
                
                <div className="principle-item">
                  <span className="principle-icon">🌱</span>
                  <div>
                    <h4>Sustainable Growth</h4>
                    <p>Value that grows with real adoption, not speculation based on artificial scarcity.</p>
                  </div>
                </div>
                
                <div className="principle-item">
                  <span className="principle-icon">🤝</span>
                  <div>
                    <h4>User-Centric</h4>
                    <p>Every technical decision is made thinking about the benefit of the end user.</p>
                  </div>
                </div>
              </div>
              
              <div className="philosophy-quote">
                <blockquote>
                  "We're not just building technology - we're building 
                  a future where people have total control over their digital value."
                </blockquote>
                <cite>— HyperLayer0 Team</cite>
              </div>
            </div>
            
            <div className="philosophy-visual">
              <div className="philosophy-diagram">
                <div className="diagram-center">
                  <span>Pure Utility</span>
                </div>
                <div className="value-flow value-1">
                  <span>Real Utility</span>
                </div>
                <div className="value-flow value-2">
                  <span>Genuine Adoption</span>
                </div>
                <div className="value-flow value-3">
                  <span>Sustainable Value</span>
                </div>
                <div className="value-flow value-4">
                  <span>Organic Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="section-container">
          <div className="community-content">
            <div className="community-text">
              <h2>The Internet of Everything Community</h2>
              <p>
                HyperLayer0 is more than a technological solution - it's a global 
                movement of people who believe in a freer, fairer and 
                more user-centric digital future.
              </p>
              
              <div className="community-features">
                <div className="feature-item">
                  <span className="feature-icon">🌍</span>
                  <div>
                    <h4>Global Movement</h4>
                    <p>Active community on all continents working for the Web3 future</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🧠</span>
                  <div>
                    <h4>Education and Innovation</h4>
                    <p>Workshops, hackathons and resources to train the next generation</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🚀</span>
                  <div>
                    <h4>Building Together</h4>
                    <p>Developers, users and visionaries united by the same goal</p>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="community-visual">
              <div className="community-network">
                <div className="network-node central">HyperLayer0</div>
                <div className="network-node node-1">Developers</div>
                <div className="network-node node-2">Users</div>
                <div className="network-node node-3">Visionaries</div>
                <div className="network-node node-4">Builders</div>
                <div className="connection con-1"></div>
                <div className="connection con-2"></div>
                <div className="connection con-3"></div>
                <div className="connection con-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="innovation-timeline">
        <div className="section-container">
          <div className="section-header">
            <h2>Innovation Journey</h2>
            <p>
              From concept to reality: our path to the future
            </p>
          </div>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2024 - Genesis</h3>
                <p>
                  Initial concept of Pure Utility model. First blockchain 
                  with zero burns on any operation.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2025 - Foundation</h3>
                <p>
                  Mainnet launch. First inter-blockchain connections. 
                  Beginning of the era of true interoperability.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2026-2027 - Expansion</h3>
                <p>
                  Integration of AI and quantum computing. Self-evolving 
                  smart contracts in production.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker active"></div>
              <div className="timeline-content">
                <h3>2028-2030 - The Internet of Everything</h3>
                <p>
                  Complete realization of the vision: billions of users, 
                  trillions of devices, value flowing freely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Join the Revolution</h2>
            <p>
              Be part of building the future. HyperLayer0 is not just 
              technology - it's the next step in human evolution.
            </p>
            <div className="cta-buttons">
              <button 
                className="primary-button large"
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
                className="secondary-button large"
                onClick={() => {
                  if (window.location.pathname === '/') {
                    const event = new CustomEvent('navigate', { detail: 'roadmap' });
                    window.dispatchEvent(event);
                  } else {
                    window.location.href = '/roadmap';
                  }
                }}
              >
                View Roadmap
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;