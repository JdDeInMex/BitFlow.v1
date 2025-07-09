import React, { useState, useEffect } from 'react';
import './UseCases.css';

type CategoryType = 'defi' | 'realworld' | 'metaverse' | 'enterprise' | 'sustainability' | 'innovation';

interface UseCase {
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  realWorldExample?: string;
  marketSize?: string;
  potential?: string;
}

const UseCases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('defi');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation on component mount
  useEffect(() => {
    const cards = document.querySelectorAll('.use-case-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }, [activeCategory]);

  const categories = [
    { id: 'defi', label: 'DeFi Revolution', icon: '🏦', color: 'primary-green' },
    { id: 'realworld', label: 'Real World Assets', icon: '🏠', color: 'primary-blue' },
    { id: 'metaverse', label: 'Metaverse & Gaming', icon: '🌐', color: 'accent-pink' },
    { id: 'enterprise', label: 'Enterprise Solutions', icon: '🏢', color: 'gradient-secondary' },
    { id: 'sustainability', label: 'Sustainability', icon: '🌱', color: 'primary-green' },
    { id: 'innovation', label: 'Future Innovation', icon: '🚀', color: 'gradient-primary' }
  ];

  const useCasesData: Record<CategoryType, UseCase[]> = {
    defi: [
      {
        title: 'Native DEX with Infinite Liquidity',
        description: 'Revolutionary decentralized exchange with cross-chain liquidity aggregation and zero-slippage trading',
        icon: '🔄',
        features: [
          'Zero-slippage trading through quantum liquidity pools',
          'Cross-chain order books with instant settlement',
          'AI-powered market making and liquidity optimization',
          'Advanced derivatives and perpetual contracts',
          'Yield farming with 100-1000% APR sustainably'
        ],
        benefits: [
          'Traders save 99.9% on fees compared to centralized exchanges',
          'Liquidity providers earn consistent yields',
          'No impermanent loss through smart rebalancing',
          'Access to global liquidity from any blockchain'
        ],
        marketSize: '$2.5 Trillion DEX Market',
        potential: '1000x current volume capacity'
      },
      {
        title: 'Lending Protocol with Real Assets',
        description: 'Collateralized lending using real-world assets as backing, enabling unprecedented capital efficiency',
        icon: '💰',
        features: [
          'Real estate as collateral for crypto loans',
          'Fractional property ownership through NFTs',
          'Dynamic interest rates based on AI risk assessment',
          'Insurance protocols for loan protection',
          'Instant liquidation with fair market pricing'
        ],
        benefits: [
          'Unlock liquidity from illiquid real assets',
          'Lower interest rates through better collateral',
          'Global access to real estate markets',
          'Automated risk management and compliance'
        ],
        marketSize: '$11 Trillion Real Estate + $4T Lending',
        potential: 'First true RWA lending at scale'
      },
      {
        title: 'Algorithmic Stablecoins 2.0',
        description: 'Next-generation algorithmic stablecoins backed by diversified real assets and AI-managed reserves',
        icon: '💎',
        features: [
          'Multi-asset backing including real estate, commodities',
          'AI-powered reserve management and rebalancing',
          'Elastic supply based on demand and market conditions',
          'Integration with global payment systems',
          'Carbon credit backing for sustainability'
        ],
        benefits: [
          'True stability through diversified backing',
          'Scalable without centralized reserves',
          'Environmentally positive through carbon credits',
          'Global adoption through payment integration'
        ],
        marketSize: '$180 Billion Stablecoin Market',
        potential: 'First truly stable algorithmic coin'
      },
      {
        title: 'Decentralized Insurance Platform',
        description: 'Comprehensive insurance covering crypto, real-world assets, and even climate risks through parametric contracts',
        icon: '🛡️',
        features: [
          'Smart contract-based parametric insurance',
          'Real-time risk assessment using IoT and AI',
          'Coverage for crypto assets, DeFi protocols, real estate',
          'Climate insurance using weather data oracles',
          'Community-driven risk pools and governance'
        ],
        benefits: [
          'Instant payouts through automated triggers',
          'Lower premiums through efficient risk pooling',
          'Coverage for previously uninsurable risks',
          'Transparent and trustless claim processing'
        ],
        marketSize: '$1.3 Trillion Insurance Market',
        potential: 'Disrupt traditional insurance completely'
      }
    ],
    realworld: [
      {
        title: 'Universal Asset Tokenization',
        description: 'Tokenize any real-world asset: real estate, vehicles, art, commodities, IP, and more with fractional ownership',
        icon: '🏠',
        features: [
          'Real estate tokenization with legal compliance',
          'Vehicle ownership and sharing through NFTs',
          'Art and collectibles with provenance tracking',
          'Commodity tokenization for global trading',
          'Intellectual property licensing automation'
        ],
        benefits: [
          'Fractional ownership of expensive assets',
          'Global liquidity for traditionally illiquid assets',
          '24/7 trading of real-world assets',
          'Reduced barriers to investment'
        ],
        realWorldExample: 'Buy 0.1% of a Manhattan apartment for $1,000',
        marketSize: '$400 Trillion Global Assets',
        potential: 'Unlock liquidity for all assets'
      },
      {
        title: 'Supply Chain Revolution',
        description: 'Complete supply chain transparency from raw materials to consumer, with automated payments and compliance',
        icon: '📦',
        features: [
          'End-to-end product tracking with IoT integration',
          'Automated payments based on delivery milestones',
          'Quality verification through sensor networks',
          'Sustainability scoring and carbon tracking',
          'Consumer transparency through QR codes'
        ],
        benefits: [
          'Eliminate counterfeit products',
          'Reduce supply chain friction and costs',
          'Enable sustainable consumption choices',
          'Automate compliance and auditing'
        ],
        realWorldExample: 'Track coffee from farm to cup with quality guarantees',
        marketSize: '$24 Trillion Global Trade',
        potential: 'Revolutionize global commerce'
      },
      {
        title: 'Healthcare Data & Identity',
        description: 'Secure, portable health records with patient control and AI-powered insights for better outcomes',
        icon: '🏥',
        features: [
          'Patient-controlled health records with privacy',
          'AI analysis for personalized treatment recommendations',
          'Secure sharing between healthcare providers',
          'Research data monetization for patients',
          'Telemedicine integration with automated payments'
        ],
        benefits: [
          'Patients own and control their health data',
          'Better health outcomes through AI insights',
          'Reduced medical errors through complete records',
          'New revenue streams for health data'
        ],
        realWorldExample: 'Earn $100/month sharing anonymized health data for research',
        marketSize: '$8 Trillion Healthcare Market',
        potential: 'Transform healthcare globally'
      },
      {
        title: 'Energy Trading & Carbon Credits',
        description: 'Peer-to-peer energy trading with automated carbon credit generation and renewable energy incentives',
        icon: '⚡',
        features: [
          'P2P energy trading between prosumers',
          'Automated carbon credit generation and trading',
          'Smart grid integration with demand response',
          'Renewable energy certificate automation',
          'Electric vehicle charging and grid services'
        ],
        benefits: [
          'Lower energy costs through direct trading',
          'Accelerate renewable energy adoption',
          'Monetize environmental benefits',
          'Optimize grid efficiency and stability'
        ],
        realWorldExample: 'Sell excess solar power directly to neighbors automatically',
        marketSize: '$6 Trillion Energy Market',
        potential: 'Accelerate clean energy transition'
      }
    ],
    metaverse: [
      {
        title: 'Universal Metaverse Infrastructure',
        description: 'Cross-platform metaverse infrastructure with persistent avatars and interoperable assets',
        icon: '🌐',
        features: [
          'Avatar persistence across all virtual worlds',
          'Asset portability between metaverse platforms',
          'Decentralized rendering and physics computation',
          'Virtual real estate with true ownership',
          'Social and economic systems integration'
        ],
        benefits: [
          'Use the same avatar everywhere',
          'Items work across all games and platforms',
          'True ownership of virtual assets',
          'Seamless experience between worlds'
        ],
        realWorldExample: 'Buy a sword in one game, use it in 100 others',
        marketSize: '$800 Billion Gaming + Metaverse',
        potential: 'Create the unified metaverse'
      },
      {
        title: 'Next-Gen GameFi Platform',
        description: 'Revolutionary gaming platform with play-to-earn 2.0, NFT integration, and esports infrastructure',
        icon: '🎮',
        features: [
          'Sub-millisecond transaction processing for gaming',
          'True asset ownership with cross-game compatibility',
          'Automated esports tournaments and prize distribution',
          'Player-driven economies with governance tokens',
          'AI-powered game balancing and anti-cheat'
        ],
        benefits: [
          'Earn real income playing games',
          'Own valuable in-game assets permanently',
          'Participate in decentralized game governance',
          'Access global competitive gaming'
        ],
        realWorldExample: 'Professional gamers earning $10K+/month in tournaments',
        marketSize: '$200 Billion Gaming Market',
        potential: 'Transform gaming into careers'
      },
      {
        title: 'Creative Economy Platform',
        description: 'Comprehensive platform for digital creators with NFTs, royalties, collaboration tools, and monetization',
        icon: '🎨',
        features: [
          'Dynamic NFTs that evolve based on engagement',
          'Perpetual royalty distribution to creators',
          'Collaborative creation tools with revenue sharing',
          'Global IP protection and licensing automation',
          'Fan engagement and patronage systems'
        ],
        benefits: [
          'Creators earn forever from their work',
          'Fans can invest in creators they love',
          'Global reach without intermediaries',
          'Automatic IP protection and licensing'
        ],
        realWorldExample: 'Artists earning $50K+/year from collector royalties',
        marketSize: '$100 Billion Creator Economy',
        potential: 'Empower 1 billion creators globally'
      },
      {
        title: 'Virtual Events & Experiences',
        description: 'Immersive virtual events platform with ticketing, merchandise, and social features',
        icon: '🎪',
        features: [
          'Immersive 3D event spaces with unlimited capacity',
          'NFT-based ticketing with resale protection',
          'Virtual merchandise and collectibles',
          'Social networking and community building',
          'Hybrid physical-virtual event integration'
        ],
        benefits: [
          'Attend any event globally without travel',
          'Unlimited venue capacity and creativity',
          'New revenue streams for event organizers',
          'Reduced environmental impact'
        ],
        realWorldExample: 'Attend concerts by deceased artists through AI recreation',
        marketSize: '$1.1 Trillion Events Industry',
        potential: 'Revolutionize how we gather and connect'
      }
    ],
    enterprise: [
      {
        title: 'Enterprise Blockchain Integration',
        description: 'Seamless integration of blockchain technology into existing enterprise systems and workflows',
        icon: '🏢',
        features: [
          'API-first integration with existing ERP systems',
          'Compliance automation for multiple jurisdictions',
          'Private and permissioned network options',
          'Enterprise-grade security and audit trails',
          'Scalable infrastructure with SLA guarantees'
        ],
        benefits: [
          'Reduce operational costs by 30-50%',
          'Improve transparency and trust',
          'Automate compliance and reporting',
          'Enable new business models'
        ],
        realWorldExample: 'Fortune 500 companies saving $10M+ annually on processes',
        marketSize: '$500 Billion Enterprise Software',
        potential: 'Transform how businesses operate'
      },
      {
        title: 'Government Services Platform',
        description: 'Comprehensive platform for government services with citizen identity, voting, and service delivery',
        icon: '🏛️',
        features: [
          'Secure digital identity for all citizens',
          'Transparent and verifiable voting systems',
          'Streamlined government service delivery',
          'Public spending transparency and tracking',
          'Cross-border identity and credential verification'
        ],
        benefits: [
          'Reduce government operational costs',
          'Increase citizen trust through transparency',
          'Eliminate fraud and corruption',
          'Enable new forms of democratic participation'
        ],
        realWorldExample: 'Estonia-style digital citizenship for every country',
        marketSize: '$15 Trillion Government Spending',
        potential: 'Revolutionize governance globally'
      },
      {
        title: 'Financial Services Infrastructure',
        description: 'Complete financial infrastructure for banks and fintech with CBDCs, payments, and compliance',
        icon: '🏦',
        features: [
          'Central Bank Digital Currency (CBDC) infrastructure',
          'Cross-border payment settlement network',
          'Automated compliance and risk management',
          'Real-time audit trails and reporting',
          'Integration with traditional banking systems'
        ],
        benefits: [
          'Reduce settlement times from days to seconds',
          'Lower cross-border payment costs by 90%',
          'Improve financial inclusion globally',
          'Enhance monetary policy effectiveness'
        ],
        realWorldExample: 'Central banks issuing digital currencies on HyperLayer0',
        marketSize: '$25 Trillion Banking Assets',
        potential: 'Rebuild the global financial system'
      },
      {
        title: 'Professional Services Automation',
        description: 'Automation platform for legal, accounting, consulting, and other professional services',
        icon: '⚖️',
        features: [
          'Smart contract templates for legal agreements',
          'Automated accounting and tax compliance',
          'Professional credential verification',
          'Client relationship and billing automation',
          'Cross-border professional service delivery'
        ],
        benefits: [
          'Reduce legal and accounting costs by 70%',
          'Ensure compliance across jurisdictions',
          'Enable global professional service access',
          'Automate routine professional tasks'
        ],
        realWorldExample: 'Small businesses accessing Fortune 500 legal services affordably',
        marketSize: '$2 Trillion Professional Services',
        potential: 'Democratize professional expertise'
      }
    ],
    sustainability: [
      {
        title: 'Carbon Negative Infrastructure',
        description: 'Infrastructure that actively removes CO₂ from the atmosphere while powering the decentralized future',
        icon: '🌱',
        features: [
          'Direct air capture integration with mining',
          'Renewable energy harvesting and storage',
          'Automated reforestation and ecosystem restoration',
          'Carbon credit generation and trading automation',
          'Environmental impact tracking and verification'
        ],
        benefits: [
          'Actually reverse climate change while operating',
          'Generate revenue from environmental benefits',
          'Meet ESG requirements automatically',
          'Create positive environmental impact'
        ],
        realWorldExample: 'Remove 1 million tons CO₂/year while processing transactions',
        marketSize: '$100 Billion Carbon Market',
        potential: 'Reverse climate change through technology'
      },
      {
        title: 'Circular Economy Platform',
        description: 'Platform for circular economy with waste tracking, recycling incentives, and resource optimization',
        icon: '♻️',
        features: [
          'Product lifecycle tracking from creation to disposal',
          'Incentivized recycling and waste reduction programs',
          'Resource sharing and optimization networks',
          'Sustainability scoring and certification',
          'Circular design and manufacturing integration'
        ],
        benefits: [
          'Reduce waste by 80% through optimization',
          'Create new revenue from waste streams',
          'Enable truly sustainable business models',
          'Incentivize environmental behavior'
        ],
        realWorldExample: 'Earn tokens for recycling and choosing sustainable products',
        marketSize: '$4.5 Trillion Circular Economy',
        potential: 'Eliminate waste through incentives'
      },
      {
        title: 'Biodiversity Conservation Network',
        description: 'Global network for biodiversity conservation with monitoring, funding, and ecosystem services',
        icon: '🦋',
        features: [
          'Real-time biodiversity monitoring using IoT sensors',
          'Conservation funding through tokenized ecosystems',
          'Ecosystem service valuation and trading',
          'Community-based conservation incentives',
          'Species protection and habitat restoration tracking'
        ],
        benefits: [
          'Protect endangered species and habitats',
          'Create economic value from conservation',
          'Enable community-led conservation efforts',
          'Track and verify conservation impact'
        ],
        realWorldExample: 'Communities earning income for protecting rainforests',
        marketSize: '$125 Billion Conservation Funding',
        potential: 'Save biodiversity through economics'
      },
      {
        title: 'Sustainable Agriculture Network',
        description: 'Platform connecting farmers, consumers, and supply chains with sustainability tracking and fair trade',
        icon: '🌾',
        features: [
          'Sustainable farming practice verification',
          'Direct farmer-to-consumer marketplace',
          'Soil health and carbon sequestration tracking',
          'Fair trade pricing and payment automation',
          'Climate-smart agriculture knowledge sharing'
        ],
        benefits: [
          'Increase farmer income through fair pricing',
          'Improve food security and nutrition',
          'Sequester carbon in agricultural soils',
          'Reduce environmental impact of agriculture'
        ],
        realWorldExample: 'Farmers earning 3x more through direct sales and carbon credits',
        marketSize: '$12 Trillion Food System',
        potential: 'Transform agriculture sustainably'
      }
    ],
    innovation: [
      {
        title: 'Quantum Computing Integration',
        description: 'Quantum Computing as a Service (QCaaS) for optimization, simulation, and cryptographic applications',
        icon: '⚛️',
        features: [
          'On-demand quantum computing resources',
          'Quantum optimization for complex problems',
          'Molecular simulation for drug discovery',
          'Quantum machine learning acceleration',
          'Post-quantum cryptography implementation'
        ],
        benefits: [
          'Solve previously impossible problems',
          'Accelerate scientific discovery',
          'Enable quantum-safe security',
          'Democratize quantum computing access'
        ],
        realWorldExample: 'Discover new drugs 1000x faster using quantum simulation',
        marketSize: '$65 Billion Quantum Computing',
        potential: 'Accelerate human scientific progress'
      },
      {
        title: 'AI Autonomous Agents Economy',
        description: 'Economy of AI agents that can transact, negotiate, and provide services autonomously',
        icon: '🤖',
        features: [
          'Autonomous AI agents with economic capabilities',
          'Agent-to-agent negotiation and contracting',
          'Decentralized AI service marketplace',
          'Multi-agent collaborative problem solving',
          'AI governance and ethical frameworks'
        ],
        benefits: [
          'Access to 24/7 AI services',
          'Automated optimization of complex systems',
          'New economic models with AI participation',
          'Democratized access to AI capabilities'
        ],
        realWorldExample: 'AI agents managing your investments and optimizing your life',
        marketSize: '$15 Trillion AI Economy',
        potential: 'Create the first AI-human hybrid economy'
      },
      {
        title: 'Space Economy Infrastructure',
        description: 'Infrastructure for the space economy with satellite networks, asteroid mining, and interplanetary commerce',
        icon: '🚀',
        features: [
          'Satellite constellation for global connectivity',
          'Asteroid mining rights and resource trading',
          'Interplanetary payment and commerce systems',
          'Space-based manufacturing and services',
          'Earth-space logistics and transportation'
        ],
        benefits: [
          'Enable the trillion-dollar space economy',
          'Provide global internet access',
          'Access unlimited space resources',
          'Enable human expansion beyond Earth'
        ],
        realWorldExample: 'Trade asteroid platinum for Earth-based services',
        marketSize: '$400 Billion Space Economy',
        potential: 'Enable human expansion to the stars'
      },
      {
        title: 'Consciousness & Digital Immortality',
        description: 'Experimental platform for consciousness research, digital identity preservation, and life extension',
        icon: '🧠',
        features: [
          'Consciousness pattern recognition and storage',
          'Digital identity preservation and continuity',
          'Memory and experience tokenization',
          'Life extension research coordination',
          'Ethical frameworks for digital consciousness'
        ],
        benefits: [
          'Preserve human knowledge and experience',
          'Advance consciousness research',
          'Enable new forms of human existence',
          'Solve the ultimate human challenge'
        ],
        realWorldExample: 'Preserve the mind of a genius for future generations',
        marketSize: '$1 Trillion Life Extension',
        potential: 'Solve mortality itself'
      }
    ]
  };

  const openModal = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUseCase(null);
  };

  return (
    <div className="use-cases-page">
      {/* Hero Section */}
      <section className="use-cases-hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Infinite <span className="highlight">Possibilities</span> Unleashed
          </h1>
          <p className="hero-subtitle">
            Discover the revolutionary applications that HyperLayer0 enables - 
            from DeFi innovations to real-world transformation, metaverse experiences to sustainable solutions.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Use Cases</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$400T</div>
              <div className="stat-label">Addressable Market</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1B+</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="categories-section">
        <div className="categories-container">
          <h2>Explore Revolutionary Applications</h2>
          <div className="categories-nav">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''} ${category.color}`}
                onClick={() => setActiveCategory(category.id as CategoryType)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Content */}
      <section className="use-cases-content">
        <div className="content-container">
          <div className="use-cases-grid">
            {useCasesData[activeCategory].map((useCase, index) => (
              <div 
                key={index} 
                className="use-case-card"
                onClick={() => openModal(useCase)}
              >
                <div className="card-header">
                  <div className="use-case-icon">{useCase.icon}</div>
                  <div className="card-market-info">
                    {useCase.marketSize && (
                      <div className="market-size">{useCase.marketSize}</div>
                    )}
                  </div>
                </div>
                
                <h3 className="use-case-title">{useCase.title}</h3>
                <p className="use-case-description">{useCase.description}</p>
                
                <ul className="use-case-features">
                  {useCase.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="use-case-feature">
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="card-footer">
                  <button className="explore-button">
                    Explore Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Modal */}
      {isModalOpen && selectedUseCase && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">{selectedUseCase.icon}</div>
              <h2>{selectedUseCase.title}</h2>
              <button className="close-button" onClick={closeModal}>✕</button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedUseCase.description}</p>
              
              {selectedUseCase.realWorldExample && (
                <div className="real-world-example">
                  <h4>💡 Real World Example</h4>
                  <p>{selectedUseCase.realWorldExample}</p>
                </div>
              )}
              
              <div className="modal-sections">
                <div className="modal-section">
                  <h4>⚡ Key Features</h4>
                  <ul>
                    {selectedUseCase.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h4>🎯 Benefits</h4>
                  <ul>
                    {selectedUseCase.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="modal-stats">
                {selectedUseCase.marketSize && (
                  <div className="modal-stat">
                    <div className="stat-label">Market Size</div>
                    <div className="stat-value">{selectedUseCase.marketSize}</div>
                  </div>
                )}
                {selectedUseCase.potential && (
                  <div className="modal-stat">
                    <div className="stat-label">Potential Impact</div>
                    <div className="stat-value">{selectedUseCase.potential}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="primary-button large"
                onClick={() => {
                  const event = new CustomEvent('navigate', { detail: 'home' });
                  window.dispatchEvent(event);
                }}
              >
                🚀 Join the Revolution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="use-cases-cta">
        <div className="cta-container">
          <h2>Ready to Build the Future?</h2>
          <p>
            These use cases are just the beginning. With HyperLayer0's infinite scalability, 
            zero burns, and revolutionary architecture, the possibilities are truly limitless.
          </p>
          <div className="cta-buttons">
            <button 
              className="primary-button large"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'home' });
                window.dispatchEvent(event);
              }}
            >
              🚀 Join the Presale
            </button>
            <button 
              className="secondary-button large"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'architecture' });
                window.dispatchEvent(event);
              }}
            >
              🏗️ Explore Architecture
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;