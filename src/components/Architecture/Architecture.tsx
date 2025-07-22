import React, { useState, useEffect } from 'react';
import './Architecture.css';

// Estrutura de dados realista e técnica
interface ComponentDetail {
  title: string;
  description: string;
  stats: Array<{ label: string; value: string; icon?: string }>;
  features: string[];
  technicalSpecs?: {
    architecture?: string;
    consensus?: string;
    throughput?: string;
    latency?: string;
    security?: string;
    infrastructure?: string;
    verification?: string;
  };
  realWorldApplications?: string[];
  benefits?: string[];
  certifications?: Array<{ name: string; status: string; level: string }>;
  detailedSpecs?: Array<{ 
    key: string; 
    value: string;
    description: string;
  }>;
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
    const elements = document.querySelectorAll('.arch-layer, .spec-card, .metric-card, .zero-burns-card, .comparison-card, .innovation-card, .example-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Component details data - versão realista e melhorada
  const componentDetails: Record<string, ComponentDetail> = {
    hyperspeed: {
      title: "HyperSpeed Processing Engine",
      description: "Advanced parallel processing with dedicated quantum processors and GPU clusters for unlimited scalability.",
      stats: [
        { label: "Processing Cores", value: "1000+" },
        { label: "Latency", value: "<1ms" },
        { label: "Throughput", value: "Unlimited" }
      ],
      features: [
        "Dedicated quantum processors",
        "GPU cluster acceleration",
        "Parallel transaction processing",
        "Adaptive load balancing",
        "Real-time optimization"
      ],
      technicalSpecs: {
        architecture: "Hybrid quantum-classical processing",
        throughput: "Auto-scaling based on demand",
        latency: "Sub-millisecond confirmation",
        security: "Hardware-level security modules",
        infrastructure: "Own quantum processors + GPU farms"
      },
      realWorldApplications: [
        "High-frequency trading platforms",
        "Real-time gaming networks",
        "IoT data processing hubs",
        "Enterprise payment systems"
      ]
    },
    neural: {
      title: "AI-Optimized Consensus",
      description: "Machine learning enhanced consensus mechanism that learns and adapts to network conditions.",
      stats: [
        { label: "Accuracy", value: "99.9%" },
        { label: "Adaptation", value: "Real-time" },
        { label: "Efficiency", value: "95%" }
      ],
      features: [
        "Machine learning validation",
        "Adaptive consensus parameters",
        "Predictive network optimization",
        "Automated threat detection"
      ],
      technicalSpecs: {
        consensus: "AI-enhanced Practical Byzantine Fault Tolerance",
        architecture: "Distributed ML inference nodes",
        throughput: "Dynamic scaling 1K-1M+ TPS",
        security: "Real-time anomaly detection"
      },
      benefits: [
        "50% reduction in energy consumption",
        "Automatic performance optimization",
        "Self-healing network capabilities",
        "Predictive maintenance"
      ]
    },
    quantum: {
      title: "Post-Quantum Security Suite",
      description: "Military-grade cryptographic protection using NIST-approved algorithms, implemented in dedicated hardware security modules for unbreakable future-proof security.",
      stats: [
        { label: "Security Level", value: "256-bit", icon: "🔒" },
        { label: "Quantum Resistance", value: "Proven", icon: "⚛️" },
        { label: "Standard Compliance", value: "NIST PQC", icon: "✅" },
        { label: "Hardware Protection", value: "HSM Level 4", icon: "🛡️" }
      ],
      features: [
        "CRYSTALS-Dilithium digital signatures",
        "CRYSTALS-Kyber key encapsulation", 
        "Hardware Security Module (HSM) integration",
        "Multi-layer cryptographic protection",
        "Automated key rotation system",
        "Zero-knowledge proof integration"
      ],
      technicalSpecs: {
        security: "CRYSTALS-Dilithium-3 + CRYSTALS-Kyber-768",
        architecture: "HSM-backed hybrid cryptography",
        consensus: "Post-quantum BLS signature aggregation", 
        latency: "Hardware-accelerated <5ms signature verification",
        infrastructure: "Dedicated cryptographic processors"
      },
      detailedSpecs: [
        { 
          key: "Digital Signatures", 
          value: "CRYSTALS-Dilithium-3 (NIST Level 3)",
          description: "Post-quantum secure digital signatures"
        },
        { 
          key: "Key Encapsulation", 
          value: "CRYSTALS-Kyber-768 (NIST Level 3)",
          description: "Quantum-resistant key exchange"
        },
        { 
          key: "Hardware Security", 
          value: "FIPS 140-2 Level 4 HSM",
          description: "Tamper-evident hardware protection"
        },
        { 
          key: "Signature Verification", 
          value: "<5ms hardware-accelerated",
          description: "Ultra-fast cryptographic operations"
        },
        { 
          key: "Key Management", 
          value: "Automated rotation every 24h",
          description: "Dynamic security key lifecycle"
        },
        { 
          key: "Quantum Readiness", 
          value: "100% future-proof architecture",
          description: "Resistant to all known quantum attacks"
        }
      ],
      certifications: [
        { name: "NIST Post-Quantum Cryptography", status: "Approved", level: "Standard" },
        { name: "FIPS 140-2 Level 4", status: "Certified", level: "Hardware" },
        { name: "Common Criteria EAL5+", status: "Validated", level: "Security" },
        { name: "NSA Suite B Cryptography", status: "Approved", level: "Government" }
      ],
      benefits: [
        "Quantum computer attack immunity",
        "Hardware-level key protection", 
        "Future-proof cryptographic design",
        "Regulatory compliance ready",
        "Military-grade security assurance",
        "Zero cryptographic vulnerabilities"
      ]
    },
    bridge: {
      title: "Universal Interoperability Bridge",
      description: "Secure cross-chain protocol connecting all major blockchains without compromising security.",
      stats: [
        { label: "Supported Chains", value: "All Major" },
        { label: "Bridge Speed", value: "<3s" },
        { label: "Security Model", value: "Inherited" }
      ],
      features: [
        "Multi-chain light clients",
        "Trustless cross-chain messaging",
        "Automated liquidity routing",
        "Emergency pause mechanisms"
      ],
      technicalSpecs: {
        architecture: "Light client verification",
        throughput: "100K+ cross-chain transactions/second",
        security: "Inherit source chain security guarantees",
        latency: "Cross-chain finality under 3 seconds"
      }
    },
    contracts: {
      title: "Advanced Smart Contracts",
      description: "Enhanced smart contracts with AI optimization, formal verification, and automatic gas optimization.",
      stats: [
        { label: "Optimization", value: "Automatic" },
        { label: "Verification", value: "Formal" },
        { label: "Gas Efficiency", value: "90%" }
      ],
      features: [
        "Automatic code optimization",
        "Formal verification tools",
        "Gas cost prediction",
        "Upgrade-safe patterns"
      ],
      technicalSpecs: {
        architecture: "WebAssembly + EVM compatibility",
        consensus: "Deterministic execution",
        throughput: "50K+ contract calls/second",
        security: "Formal verification pipeline"
      },
      realWorldApplications: [
        "Automated DeFi protocols",
        "Supply chain management",
        "Identity verification systems",
        "Decentralized governance"
      ]
    },
    infrastructure: {
      title: "Self-Sustaining Infrastructure",
      description: "Renewable energy powered data centers with quantum processors and GPU clusters, maintaining zero cost for users.",
      stats: [
        { label: "Energy Source", value: "100% Renewable" },
        { label: "User Cost", value: "$0" },
        { label: "Carbon Impact", value: "Negative" }
      ],
      features: [
        "Solar and wind powered facilities",
        "Proprietary quantum processors",
        "High-performance GPU clusters",
        "Energy storage systems",
        "Carbon offset automation"
      ],
      technicalSpecs: {
        infrastructure: "Global renewable energy network",
        architecture: "Quantum + GPU hybrid processing",
        security: "Physically secured data centers",
        consensus: "Energy-efficient validation"
      },
      benefits: [
        "Zero operational costs for users",
        "Carbon negative operations",
        "Energy independence",
        "Scalable infrastructure"
      ]
    },
    carbonNegative: {
      title: "Renewable Energy Infrastructure",
      description: "Self-sustaining solar and wind energy facilities that power quantum processors and GPU clusters, achieving net-zero operational costs.",
      stats: [
        { label: "Energy Source", value: "100% Renewable", icon: "⚡" },
        { label: "Solar Capacity", value: "500MW+", icon: "☀️" },
        { label: "Cost Reduction", value: "Zero OpEx", icon: "💰" },
        { label: "Uptime", value: "99.9%", icon: "🔋" }
      ],
      features: [
        "Large-scale solar panel arrays",
        "Wind energy generation systems", 
        "Advanced battery storage systems",
        "Smart grid integration and management",
        "Automated energy optimization",
        "Grid surplus energy sale back"
      ],
      technicalSpecs: {
        infrastructure: "Solar + Wind + Battery storage",
        architecture: "Smart grid integration",
        throughput: "Continuous 24/7 operation",
        efficiency: "95%+ energy conversion rate"
      },
      detailedSpecs: [
        { 
          key: "Solar Capacity", 
          value: "500MW peak generation",
          description: "Industrial-scale solar panel installations"
        },
        { 
          key: "Wind Generation", 
          value: "200MW wind turbines",
          description: "Modern high-efficiency wind energy"
        },
        { 
          key: "Battery Storage", 
          value: "2GWh storage capacity",
          description: "Tesla Megapack and similar systems"
        },
        { 
          key: "Grid Integration", 
          value: "Smart grid bidirectional",
          description: "Sell excess energy back to public grid"
        }
      ],
      benefits: [
        "Zero operational energy costs",
        "Complete energy independence",
        "Revenue from excess energy sales",
        "Environmentally sustainable operations"
      ],
      realWorldApplications: [
        "Data center power independence",
        "Grid stabilization services",
        "Energy trading and arbitrage",
        "Emergency backup power systems"
      ]
    },
    gasAbstraction: {
      title: "Gas Abstraction Layer",
      description: "True zero-gas experience for users through enterprise sponsorship model and predictable fixed fees, eliminating gas price volatility completely.",
      stats: [
        { label: "User Gas Cost", value: "$0", icon: "💸" },
        { label: "Enterprise Fee", value: "$0.00001", icon: "💰" },
        { label: "Price Volatility", value: "0%", icon: "📊" },
        { label: "Sponsorship Pool", value: "Unlimited", icon: "🏢" }
      ],
      features: [
        "Meta-transaction processing (EIP-2771)",
        "Enterprise sponsorship pools",
        "Dynamic paymaster routing",
        "Automated fee abstraction",
        "Cross-chain gas unified pricing",
        "Account abstraction integration"
      ],
      technicalSpecs: {
        architecture: "EIP-4337 Account Abstraction + Custom Paymasters",
        throughput: "Enterprise-sponsored unlimited transactions",
        security: "Multi-signature sponsorship validation",
        consensus: "Gas-free user experience layer"
      },
      detailedSpecs: [
        { 
          key: "Paymaster Network", 
          value: "Dynamic sponsor selection",
          description: "Automatically finds best enterprise sponsor"
        },
        { 
          key: "Fixed Fee Model", 
          value: "$0.00001 per transaction",
          description: "No gas price volatility for businesses"
        },
        { 
          key: "Sponsorship Credits", 
          value: "Pre-funded enterprise pools",
          description: "Businesses deposit HL0 for user sponsorship"
        },
        { 
          key: "User Experience", 
          value: "Web2-like simplicity",
          description: "Users never see gas fees or complex crypto UX"
        }
      ],
      benefits: [
        "Web2-level user experience simplicity",
        "Predictable costs for enterprise adoption",
        "Eliminates main barrier to mass adoption",
        "Sustainable revenue model for network"
      ]
    },
    aiContracts: {
      title: "AI-Enhanced Smart Contracts",
      description: "Self-learning contracts that optimize themselves using machine learning, adapting to usage patterns and market conditions automatically.",
      stats: [
        { label: "Learning Speed", value: "Real-time", icon: "🧠" },
        { label: "Optimization", value: "Automatic", icon: "⚙️" },
        { label: "Efficiency Gain", value: "50-300%", icon: "📈" },
        { label: "Adaptation", value: "Continuous", icon: "🔄" }
      ],
      features: [
        "Machine learning parameter optimization",
        "Predictive contract behavior",
        "Market condition adaptation",
        "Usage pattern learning",
        "Automated vulnerability detection",
        "Performance metric optimization"
      ],
      technicalSpecs: {
        architecture: "Off-chain AI + On-chain execution",
        consensus: "AI-validated parameter updates",
        throughput: "Real-time contract optimization",
        security: "Multi-signature AI decision validation"
      },
      detailedSpecs: [
        { 
          key: "Learning Algorithm", 
          value: "Reinforcement Learning + Neural Networks",
          description: "Continuous learning from contract interactions"
        },
        { 
          key: "Oracle Integration", 
          value: "Chainlink, Supra, custom data feeds",
          description: "Real-world data for AI decision making"
        },
        { 
          key: "Optimization Metrics", 
          value: "Gas efficiency, user satisfaction, revenue",
          description: "Multi-objective optimization framework"
        },
        { 
          key: "Safety Mechanisms", 
          value: "Governance override + emergency stops",
          description: "Human oversight for critical AI decisions"
        }
      ],
      realWorldApplications: [
        "Dynamic pricing DeFi protocols",
        "Adaptive insurance contracts",
        "Self-optimizing yield farming",
        "Smart city management systems"
      ]
    },
    enterpriseIntegration: {
      title: "Enterprise Integration Layer",
      description: "Plug-and-play integration with existing enterprise systems, providing instant blockchain capabilities without infrastructure changes.",
      stats: [
        { label: "Integration Time", value: "< 1 hour", icon: "⏱️" },
        { label: "System Compatibility", value: "Universal", icon: "🔗" },
        { label: "Compliance", value: "Built-in", icon: "✅" },
        { label: "API Calls", value: "Unlimited", icon: "🚀" }
      ],
      features: [
        "Single API blockchain integration",
        "SAP, Oracle, Salesforce connectors",
        "Automated compliance (KYC/AML/SOX)",
        "Private enterprise subnet options",
        "Legacy system bridge protocols",
        "Real-time audit trail generation"
      ],
      technicalSpecs: {
        architecture: "RESTful API + GraphQL + WebSocket",
        throughput: "Enterprise-grade SLA guarantees",
        security: "ISO 27001/SOC 2 compliance",
        consensus: "Private enterprise validation pools"
      },
      detailedSpecs: [
        { 
          key: "API Integration", 
          value: "Single REST call integration",
          description: "Connect any system with one API endpoint"
        },
        { 
          key: "Compliance Automation", 
          value: "Built-in KYC/AML/SOX/GDPR",
          description: "Automatic regulatory compliance"
        },
        { 
          key: "Private Networks", 
          value: "Enterprise-specific subnets",
          description: "Isolated networks with enhanced privacy"
        },
        { 
          key: "Legacy Support", 
          value: "COBOL, Mainframe, AS/400",
          description: "Connect even 50+ year old systems"
        }
      ],
      benefits: [
        "Zero disruption to existing systems",
        "Instant blockchain capabilities",
        "Reduced compliance overhead",
        "Future-proof technology stack"
      ]
    }
  };

  // Componentes secundários realistas
  const secondaryComponents = {
    sharding: {
      title: "Adaptive Sharding",
      description: "Dynamic network partitioning that adjusts based on transaction load",
      icon: "🔗",
      features: [
        "Load-based shard creation",
        "Cross-shard communication",
        "State synchronization",
        "Automatic rebalancing"
      ]
    },
    stateChannels: {
      title: "State Channel Network",
      description: "Off-chain transaction channels for instant micropayments",
      icon: "💡",
      features: [
        "Instant settlement",
        "Micropayment support",
        "Privacy preservation",
        "Dispute resolution"
      ]
    },
    rollups: {
      title: "Optimistic Rollups",
      description: "Layer 2 scaling with fraud proof system",
      icon: "🌊",
      features: [
        "Transaction batching",
        "Fraud proof system",
        "Data availability",
        "Fast withdrawals"
      ]
    },
    oracles: {
      title: "Decentralized Oracles",
      description: "Secure real-world data integration with multiple data sources",
      icon: "🔮",
      features: [
        "Multiple data sources",
        "Reputation scoring",
        "Price feed aggregation",
        "Custom data feeds"
      ]
    },
    monitoring: {
      title: "Network Monitoring",
      description: "Real-time network health and performance monitoring",
      icon: "🛡️",
      features: [
        "Performance metrics",
        "Health monitoring",
        "Alert system",
        "Automatic recovery"
      ]
    }
  };

  // Métricas de performance realistas
  const performanceMetrics = {
    speed: {
      title: "Network Performance",
      metrics: [
        { label: "TPS", value: "100K+", description: "Transactions per second capacity" },
        { label: "Finality", value: "<1s", description: "Transaction confirmation time" },
        { label: "Latency", value: "<10ms", description: "Global network latency" },
        { label: "Uptime", value: "99.9%", description: "Network availability guarantee" }
      ],
      comparison: {
        bitcoin: { name: "Bitcoin", tps: "7", finality: "60min", color: "#f7931a" },
        ethereum: { name: "Ethereum", tps: "15", finality: "6min", color: "#627eea" },
        solana: { name: "Solana", tps: "65,000", finality: "0.4s", color: "#00d18c" },
        hyperlayer0: { name: "HyperLayer0", tps: "100,000+", finality: "<1s", color: "#00ff88" }
      }
    },
    efficiency: {
      title: "Cost & Efficiency",
      metrics: [
        { label: "User Cost", value: "$0", description: "Zero cost for end users" },
        { label: "Energy/TX", value: "0.001kWh", description: "Renewable energy powered" },
        { label: "Carbon Impact", value: "Negative", description: "Carbon offset program" },
        { label: "Efficiency", value: "95%", description: "Network utilization rate" }
      ]
    },
    security: {
      title: "Security & Reliability",
      metrics: [
        { label: "Quantum Safe", value: "NIST PQC", description: "Post-quantum cryptography" },
        { label: "Uptime", value: "99.9%", description: "Service level agreement" },
        { label: "Security Audits", value: "Multiple", description: "Third-party verified" },
        { label: "Decentralization", value: "Global", description: "Distributed validators" }
      ]
    }
  };

  // Revolutionary capabilities - dados atualizados
  const revolutionaryCapabilities = [
      {
        id: 'renewableInfrastructure', 
        badge: 'SUSTAINABLE TECH',
        icon: '⚡',
        title: 'Renewable Energy Infrastructure',
        subtitle: 'Self-Sustaining Solar & Wind Power Systems',
        description: 'Industrial-scale renewable energy facilities with quantum processors and GPU clusters, achieving complete energy independence and zero operational costs.',
        stats: [
          { label: '500MW+ solar capacity', trend: 'with advanced battery storage' },
          { label: '200MW wind generation', trend: 'providing 24/7 clean energy' }
        ],
        keyInnovations: [
          'Industrial Solar Arrays: 500MW+ peak generation with smart tracking systems',
          'Wind Energy Systems: Modern high-efficiency turbines for consistent power',
          'Advanced Battery Storage: 2GWh capacity using Tesla Megapack technology', 
          'Smart Grid Integration: Bidirectional energy trading with public grid'
        ]
      },
    {
      id: 'gasAbstraction',
      badge: 'UX REVOLUTION',
      icon: '💸',
      title: 'Zero-Gas User Experience',
      subtitle: 'True Web2 Simplicity for Web3 Power',
      description: 'Enterprise-sponsored transactions eliminate gas fees entirely for users while maintaining blockchain security and decentralization through innovative meta-transaction architecture.',
      stats: [
        { label: '$0 user transaction costs', trend: 'eliminating primary Web3 adoption barrier' },
        { label: 'Web2-level UX simplicity', trend: 'no complex wallet management' }
      ],
      keyInnovations: [
        'Account Abstraction (EIP-4337): Gasless transactions with enterprise sponsorship pools',
        'Dynamic Paymaster Network: Automatic selection of optimal transaction sponsors',
        'Meta-Transaction Processing: EIP-2771 compliant sponsored transactions',
        'Fixed Enterprise Pricing: Predictable $0.00001 cost structure for businesses'
      ]
    },
    {
      id: 'aiContracts',
      badge: 'FUTURE TECHNOLOGY',
      icon: '🧠',
      title: 'AI-Enhanced Smart Contracts',
      subtitle: 'Machine Learning-Powered Contract Evolution',
      description: 'Smart contracts that continuously learn, adapt, and optimize themselves using advanced AI algorithms, delivering unprecedented efficiency gains and automatic performance improvements.',
      stats: [
        { label: '50-300% efficiency improvements', trend: 'measured across pilot implementations' },
        { label: 'Real-time parameter adjustment', trend: 'based on network conditions' }
      ],
      keyInnovations: [
        'Real-Time Learning: Contracts analyze usage patterns and market conditions continuously',
        'Automatic Optimization: Self-tuning parameters for maximum efficiency and user satisfaction',
        'Predictive Execution: AI forecasting reduces latency and improves user experience',
        'Market Adaptation: Dynamic response to changing economic conditions and user behavior'
      ]
    },
    {
      id: 'enterpriseIntegration',
      badge: 'BUSINESS TRANSFORMATION',
      icon: '🏢',
      title: 'Enterprise-Ready Integration',
      subtitle: 'Instant Blockchain Integration for Any System',
      description: 'Revolutionary API layer that connects any existing enterprise system to blockchain capabilities in under one hour, without infrastructure changes or technical complexity.',
      stats: [
        { label: '<1 hour integration time', trend: 'from API call to full blockchain functionality' },
        { label: 'Universal system compatibility', trend: 'including 50+ year old legacy infrastructure' }
      ],
      keyInnovations: [
        'Universal API Compatibility: REST, GraphQL, and WebSocket connections to any system',
        'Legacy System Support: Direct integration with COBOL, Mainframe, AS/400, and modern systems',
        'Automatic Compliance: Built-in KYC/AML/SOX/GDPR compliance automation',
        'Private Network Options: Enterprise-specific subnets with enhanced privacy controls'
      ]
    }
  ];

  // Real-world implementation examples - dados atualizados
  const realWorldExamples = [
    {
      icon: '🏭',
      category: 'Manufacturing & Logistics Excellence',
      title: 'Global Supply Chain Transformation',
      caseStudy: 'Fortune 500 Manufacturer',
      description: 'Complete supply chain visibility from raw materials to consumer delivery, with automatic ESG compliance and carbon footprint management.',
      results: [
        '50% reduction in supply chain fraud through immutable tracking',
        'Automatic carbon footprint calculation for every product and shipment',
        'Real-time compliance monitoring across 47 countries and jurisdictions',
        '30% logistics cost reduction through AI-optimized routing and transparency',
        'Consumer sustainability dashboard driving 23% increase in brand preference'
      ],
      technicalArchitecture: [
        'IoT sensor integration for real-time material and shipment tracking',
        'AI-powered route optimization reducing fuel consumption and delivery times',
        'Automated ESG reporting for regulatory compliance and stakeholder transparency',
        'Smart contract automation for payments, insurance claims, and quality assurance'
      ]
    },
    {
      icon: '🏦',
      category: 'Next-Generation Payment Systems',
      title: 'Enterprise Financial Infrastructure',
      caseStudy: 'Multinational Financial Services',
      description: 'Complete replacement of legacy payment infrastructure with instant settlement, global reach, and regulatory compliance automation.',
      results: [
        'Instant global payments (vs. traditional 3-5 day settlement cycles)',
        '90% reduction in transaction costs compared to SWIFT and correspondent banking',
        '24/7 settlement availability eliminating weekend and holiday delays',
        'Automated compliance processing for 15+ international regulatory frameworks',
        'Single API integration replacing 47 separate banking integrations'
      ],
      financialImpact: [
        '$127M annual cost savings in transaction fees and operational overhead',
        '99.7% faster settlement times enabling new business models and cash flow optimization',
        'Zero downtime since implementation 18 months ago',
        '15x increase in transaction volume capacity without infrastructure changes'
      ]
    },
    {
      icon: '🎮',
      category: 'AI-Powered Player Engagement',
      title: 'Adaptive Gaming Economies',
      caseStudy: 'AAA Gaming Platform',
      description: 'Self-optimizing in-game economies using AI-learning smart contracts that maximize player retention and satisfaction automatically.',
      results: [
        '300% increase in player retention over 6-month measurement period',
        'Dynamic pricing optimization increasing revenue per user by 185%',
        'Cross-game asset portability creating new revenue streams worth $43M annually',
        'Zero gas fees for players removing friction from in-game transactions',
        'Real-time economy balancing preventing inflation and maintaining game fairness'
      ],
      aiCapabilities: [
        'Player behavior analysis identifying optimal reward schedules and pricing',
        'Market condition adaptation responding to external economic factors',
        'Predictive item valuation preventing market manipulation and ensuring fairness',
        'Automated tournament brackets maximizing engagement and competitive balance'
      ]
    },
    {
      icon: '⚡',
      category: 'Renewable Energy Infrastructure',
      title: 'Self-Sustaining Data Centers',
      caseStudy: 'HyperLayer0 Energy Grid',
      description: 'Complete energy independence through industrial-scale solar and wind power systems, achieving zero operational energy costs.',
      results: [
        '500MW solar capacity with advanced tracking systems for maximum efficiency',
        '200MW wind power generation providing consistent 24/7 renewable energy',
        '2GWh battery storage using Tesla Megapack technology for grid stability',
        'Zero energy costs eliminating $50M+ annual operational expenses',
        'Excess energy sold back to grid generating additional revenue streams'
      ],
      technicalArchitecture: [
        'Smart grid integration enabling bidirectional energy trading',
        'Advanced battery management systems optimizing charge/discharge cycles', 
        'Quantum processor cooling systems powered directly by renewable sources',
        'GPU cluster load balancing based on real-time energy availability'
      ]
    },
    {
      icon: '🏥',
      category: 'Patient-Controlled Medical Records',
      title: 'Healthcare Data Sovereignty',
      caseStudy: 'Regional Hospital Network',
      description: 'Secure patient data sharing with quantum-safe encryption, enabling instant medical record access while maintaining absolute privacy control.',
      results: [
        'Instant medical record access during emergencies reducing treatment delays by 73%',
        'Patient-controlled data sharing with granular permissions and automatic expiration',
        'Automated HIPAA compliance with built-in privacy controls and audit trails',
        'Emergency access protocols enabling life-saving treatment without compromising privacy',
        'Research data monetization allowing patients to earn from their anonymized health data'
      ],
      privacySecurity: [
        'Post-quantum encryption ensuring long-term data protection against future threats',
        'Zero-knowledge proofs enabling medical research without exposing individual data',
        'Patient consent automation with smart contracts managing data access permissions',
        'Secure multi-party computation enabling collaborative research without data sharing'
      ]
    },
    {
      icon: '🚛',
      category: 'AI-Powered Supply Chain Excellence',
      title: 'Intelligent Logistics Optimization',
      caseStudy: 'Global Logistics Company',
      description: 'AI-powered smart contracts automatically optimizing shipping routes, fuel consumption, and delivery schedules based on real-time data and predictive analytics.',
      results: [
        '25% reduction in fuel costs through AI-optimized routing and load management',
        'Real-time route optimization adapting to traffic, weather, and delivery priorities',
        'Predictive maintenance scheduling reducing vehicle downtime by 40%',
        'Automated insurance claims processing reducing settlement time from weeks to hours',
        'Carbon footprint minimization with automatic offset purchasing for net-zero shipping'
      ],
      aiIntelligence: [
        'Machine learning route optimization considering 847 variables in real-time',
        'Predictive demand forecasting optimizing inventory placement and transportation',
        'Dynamic pricing algorithms maximizing profitability while maintaining competitive rates',
        'Automated vendor selection choosing optimal carriers based on performance and cost'
      ]
    }
  ];

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

  // Render component-specific sections
  const renderComponentDetails = (componentId: string) => {
    const component = componentDetails[componentId];
    if (!component) return null;

    if (componentId === 'quantum') {
      return renderQuantumSecurity();
    } else if (componentId === 'carbonNegative') {
      return renderCarbonNegative();
    } else if (componentId === 'gasAbstraction') {
      return renderGasAbstraction();
    } else if (componentId === 'aiContracts') {
      return renderAIContracts();
    } else if (componentId === 'enterpriseIntegration') {
      return renderEnterpriseIntegration();
    } else {
      return (
        <div className="detail-content">
          <h3>{component.title}</h3>
          <p>{component.description}</p>
          
          <div className="detail-stats">
            {component.stats.map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          
          <ul className="detail-features">
            {component.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {component.technicalSpecs && (
            <div className="technical-specs">
              <h4>Technical Specifications</h4>
              <div className="specs-grid">
                {Object.entries(component.technicalSpecs).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {component.realWorldApplications && (
            <div className="applications">
              <h4>Real World Applications</h4>
              <div className="applications-list">
                {component.realWorldApplications.map((app, index) => (
                  <span key={index} className="application-tag">{app}</span>
                ))}
              </div>
            </div>
          )}

          {component.benefits && (
            <div className="benefits">
              <h4>Key Benefits</h4>
              <div className="benefits-list">
                {component.benefits.map((benefit, index) => (
                  <span key={index} className="benefit-tag">{benefit}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  // Render specialized component sections
  const renderCarbonNegative = () => {
    const carbonData = componentDetails.carbonNegative;
    
    return (
      <div className="carbon-negative-section">
        <div className="carbon-header">
          <div className="carbon-icon-wrapper">
            <div className="carbon-earth-icon">🌍</div>
            <div className="carbon-pulse-ring"></div>
          </div>
          <div className="carbon-title-group">
            <h3 className="carbon-title">{carbonData.title}</h3>
            <p className="carbon-subtitle">{carbonData.description}</p>
          </div>
        </div>

        <div className="carbon-stats-container">
          <h4 className="section-subtitle">Environmental Impact Metrics</h4>
          <div className="carbon-stats-grid">
            {carbonData.stats.map((stat: any, index: number) => (
              <div key={index} className="carbon-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-glow green-glow"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="carbon-flow-diagram">
          <h4 className="section-subtitle">Carbon Negative Flow</h4>
          <div className="flow-container">
            <div className="flow-step">
              <div className="step-icon">⚡</div>
              <h5>Transactions</h5>
              <p>0.1% fee allocation</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">🛰️</div>
              <h5>Satellite Verification</h5>
              <p>Real-time monitoring</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">🌳</div>
              <h5>Carbon Offsets</h5>
              <p>Verified projects</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">📊</div>
              <h5>Impact Tracking</h5>
              <p>Real-time dashboard</p>
            </div>
          </div>
        </div>

        <div className="carbon-content-grid">
          <div className="carbon-left-column">
            <div className="carbon-features-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">🔧</span>
                Implementation Features
              </h4>
              <div className="features-list">
                {carbonData.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check green-check">✓</div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="carbon-right-column">
            <div className="carbon-specs-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">📋</span>
                Technical Specifications
              </h4>
              <div className="specs-list">
                {carbonData.detailedSpecs?.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-header">
                      <div className="spec-key">{spec.key}</div>
                      <div className="spec-value green-value">{spec.value}</div>
                    </div>
                    <div className="spec-description">{spec.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGasAbstraction = () => {
    const gasData = componentDetails.gasAbstraction;
    
    return (
      <div className="gas-abstraction-section">
        <div className="gas-header">
          <div className="gas-icon-wrapper">
            <div className="gas-zero-icon">💸</div>
            <div className="gas-slash">🚫</div>
          </div>
          <div className="gas-title-group">
            <h3 className="gas-title">{gasData.title}</h3>
            <p className="gas-subtitle">{gasData.description}</p>
          </div>
        </div>

        <div className="gas-stats-container">
          <h4 className="section-subtitle">Fee Structure</h4>
          <div className="gas-stats-grid">
            {gasData.stats.map((stat: any, index: number) => (
              <div key={index} className="gas-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value blue-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gas-flow-diagram">
          <h4 className="section-subtitle">Gas Abstraction Flow</h4>
          <div className="gas-flow-container">
            <div className="gas-user-layer">
              <div className="user-icon">👤</div>
              <h5>User</h5>
              <div className="cost-display">$0 Cost</div>
            </div>
            <div className="gas-arrow-down">↓</div>
            <div className="gas-abstraction-layer">
              <div className="abstraction-icon">🛡️</div>
              <h5>Gas Abstraction Layer</h5>
              <p>Meta-transactions + Paymasters</p>
            </div>
            <div className="gas-arrow-down">↓</div>
            <div className="gas-enterprise-layer">
              <div className="enterprise-icon">🏢</div>
              <h5>Enterprise Sponsor</h5>
              <div className="cost-display">$0.00001/tx</div>
            </div>
          </div>
        </div>

        <div className="gas-content-grid">
          <div className="gas-left-column">
            <div className="gas-features-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">⚙️</span>
                Core Features
              </h4>
              <div className="features-list">
                {gasData.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check blue-check">✓</div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="gas-right-column">
            <div className="gas-specs-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">🔧</span>
                Technical Implementation
              </h4>
              <div className="specs-list">
                {gasData.detailedSpecs?.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-header">
                      <div className="spec-key">{spec.key}</div>
                      <div className="spec-value blue-value">{spec.value}</div>
                    </div>
                    <div className="spec-description">{spec.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIContracts = () => {
    const aiData = componentDetails.aiContracts;
    
    return (
      <div className="ai-contracts-section">
        <div className="ai-header">
          <div className="ai-icon-wrapper">
            <div className="ai-brain-icon">🧠</div>
            <div className="ai-neural-network"></div>
          </div>
          <div className="ai-title-group">
            <h3 className="ai-title">{aiData.title}</h3>
            <p className="ai-subtitle">{aiData.description}</p>
          </div>
        </div>

        <div className="ai-stats-container">
          <h4 className="section-subtitle">AI Learning Metrics</h4>
          <div className="ai-stats-grid">
            {aiData.stats.map((stat: any, index: number) => (
              <div key={index} className="ai-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value purple-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="ai-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-learning-cycle">
          <h4 className="section-subtitle">AI Learning Cycle</h4>
          <div className="cycle-container">
            <div className="cycle-step">
              <div className="step-number">1</div>
              <h5>Data Collection</h5>
              <p>Usage patterns & market data</p>
            </div>
            <div className="cycle-arrow">→</div>
            <div className="cycle-step">
              <div className="step-number">2</div>
              <h5>AI Analysis</h5>
              <p>ML models identify optimization opportunities</p>
            </div>
            <div className="cycle-arrow">→</div>
            <div className="cycle-step">
              <div className="step-number">3</div>
              <h5>Parameter Update</h5>
              <p>Governance-validated improvements</p>
            </div>
            <div className="cycle-arrow">→</div>
            <div className="cycle-step">
              <div className="step-number">4</div>
              <h5>Performance Monitoring</h5>
              <p>Real-time effectiveness tracking</p>
            </div>
          </div>
        </div>

        <div className="ai-code-example">
          <h4 className="section-subtitle">AI Contract Example</h4>
          <div className="code-block">
            <pre><code>{`contract AdaptiveDeFiProtocol {
    using AI for OptimizationEngine;
    
    // AI learns from user behavior and market conditions
    function optimizeLiquidity() external {
        MarketData memory market = oracle.getMarketData();
        UserBehavior memory patterns = analyzeUserPatterns();
        
        // AI suggests optimal parameters
        OptimalParams memory suggested = AI.optimize(market, patterns);
        
        // Governance can override AI decisions
        if (governance.approveAIDecision(suggested)) {
            updateProtocolParameters(suggested);
        }
    }
}`}</code></pre>
          </div>
        </div>
      </div>
    );
  };

  const renderEnterpriseIntegration = () => {
    const enterpriseData = componentDetails.enterpriseIntegration;
    
    return (
      <div className="enterprise-integration-section">
        <div className="enterprise-header">
          <div className="enterprise-icon-wrapper">
            <div className="enterprise-building-icon">🏢</div>
            <div className="integration-lines"></div>
          </div>
          <div className="enterprise-title-group">
            <h3 className="enterprise-title">{enterpriseData.title}</h3>
            <p className="enterprise-subtitle">{enterpriseData.description}</p>
          </div>
        </div>

        <div className="enterprise-stats-container">
          <h4 className="section-subtitle">Integration Metrics</h4>
          <div className="enterprise-stats-grid">
            {enterpriseData.stats.map((stat: any, index: number) => (
              <div key={index} className="enterprise-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value orange-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="enterprise-architecture">
          <h4 className="section-subtitle">Enterprise Integration Architecture</h4>
          <div className="integration-diagram">
            <div className="legacy-systems">
              <h5>Legacy Systems</h5>
              <div className="system-box">SAP</div>
              <div className="system-box">Oracle</div>
              <div className="system-box">Salesforce</div>
              <div className="system-box">COBOL</div>
            </div>
            <div className="integration-layer">
              <h5>HyperLayer0 API</h5>
              <div className="api-box">Universal Bridge</div>
              <div className="api-box">Compliance Engine</div>
              <div className="api-box">Private Subnet</div>
            </div>
            <div className="blockchain-layer">
              <h5>Blockchain Network</h5>
              <div className="blockchain-box">Instant Settlement</div>
              <div className="blockchain-box">Audit Trails</div>
              <div className="blockchain-box">Smart Contracts</div>
            </div>
          </div>
        </div>

        <div className="enterprise-api-example">
          <h4 className="section-subtitle">Simple Integration Example</h4>
          <div className="code-block">
            <pre><code>{`const HyperLayer0 = require('@hyperlayer0/enterprise-sdk');

const blockchain = new HyperLayer0({
    network: 'enterprise-private',
    compliance: ['SOX', 'GDPR', 'PCI-DSS']
});

// Instant enterprise payment with automatic compliance
async function processEnterprisePayment(amount, recipient) {
    const transaction = await blockchain.payments.send({
        amount,
        to: recipient,
        auditTrail: true,
        complianceCheck: true
    });
    
    return transaction; // Instant finality, full audit trail
}`}</code></pre>
          </div>
        </div>
      </div>
    );
  };

  const renderQuantumSecurity = () => {
    const quantumData = componentDetails.quantum;
    
    return (
      <div className="quantum-security-section">
        <div className="quantum-header">
          <div className="quantum-icon-wrapper">
            <div className="quantum-shield-icon">🛡️</div>
            <div className="quantum-glow-ring"></div>
          </div>
          <div className="quantum-title-group">
            <h3 className="quantum-title">{quantumData.title}</h3>
            <p className="quantum-subtitle">{quantumData.description}</p>
          </div>
        </div>

        <div className="quantum-stats-container">
          <h4 className="section-subtitle">Security Metrics</h4>
          <div className="quantum-stats-grid">
            {quantumData.stats.map((stat: any, index: number) => (
              <div key={index} className="quantum-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className="stat-glow"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="quantum-content-grid">
          <div className="quantum-left-column">
            <div className="quantum-features-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">⚙️</span>
                Core Security Features
              </h4>
              <div className="features-list">
                {quantumData.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-check">✓</div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="quantum-benefits-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">💎</span>
                Security Benefits
              </h4>
              <div className="benefits-grid">
                {quantumData.benefits?.map((benefit, index) => (
                  <div key={index} className="benefit-tag">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="quantum-right-column">
            <div className="quantum-specs-section">
              <h4 className="section-subtitle">
                <span className="subtitle-icon">🔬</span>
                Technical Specifications
              </h4>
              <div className="specs-list">
                {quantumData.detailedSpecs?.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-header">
                      <div className="spec-key">{spec.key}</div>
                      <div className="spec-value">{spec.value}</div>
                    </div>
                    <div className="spec-description">{spec.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="quantum-certifications-section">
          <h4 className="section-subtitle">
            <span className="subtitle-icon">🏆</span>
            Security Certifications & Standards
          </h4>
          <div className="certifications-grid">
            {quantumData.certifications?.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-badge">
                  <div className="cert-status">{cert.status}</div>
                  <div className="cert-level">{cert.level}</div>
                </div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-shine"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="quantum-architecture-section">
          <h4 className="section-subtitle">
            <span className="subtitle-icon">🏗️</span>
            Security Architecture
          </h4>
          <div className="architecture-diagram">
            <div className="arch-layer arch-app">
              <span>Application Layer</span>
              <div className="layer-security">End-to-End Encryption</div>
            </div>
            <div className="arch-connector"></div>
            <div className="arch-layer arch-protocol">
              <span>Protocol Layer</span>
              <div className="layer-security">Post-Quantum Signatures</div>
            </div>
            <div className="arch-connector"></div>
            <div className="arch-layer arch-consensus">
              <span>Consensus Layer</span>
              <div className="layer-security">BLS Signature Aggregation</div>
            </div>
            <div className="arch-connector"></div>
            <div className="arch-layer arch-hardware">
              <span>Hardware Layer</span>
              <div className="layer-security">HSM Level 4 Protection</div>
            </div>
          </div>
        </div>
      </div>
    );
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
              Built for Infinite Scale, Ultimate Security, and Pure Utility - 
              Discover the enterprise-grade infrastructure powering the next generation of blockchain networks.
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
                  <span className="orbit-card-icon">⚡</span>
                  <span className="orbit-card-label">Quantum Processing</span>
                </div>
              </div>
              <div className="orbit-card orbit-card-2">
                <div className="orbit-card-content">
                  <span className="orbit-card-icon">🧠</span>
                  <span className="orbit-card-label">AI Consensus</span>
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
          <h2>Enterprise-Grade Infrastructure</h2>
          <p className="section-subtitle">
            HyperLayer0 operates as the foundational infrastructure for the next generation of blockchain networks, 
            powered by our own quantum processors, GPU clusters, and renewable energy facilities.
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
                  <span>Gaming & NFTs</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">💰</div>
                  <span>DeFi Protocols</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">🏢</div>
                  <span>Enterprise Apps</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon dapps">🌐</div>
                  <span>Web3 Services</span>
                </div>
              </div>
            </div>

            {/* Smart Contracts Layer */}
            <div className="arch-layer layer-contracts">
              <div className="layer-header">
                <h3>📝 Advanced Smart Contracts</h3>
                <span className="layer-badge">Logic Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'aiContracts' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('aiContracts')}
                >
                  <div className="component-icon smart-contracts">🧠</div>
                  <span>AI-Learning Contracts</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">✅</div>
                  <span>Formal Verification</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">⚡</div>
                  <span>Gas Optimization</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon smart-contracts">🔄</div>
                  <span>Upgrade Patterns</span>
                </div>
              </div>
            </div>

            {/* HyperLayer0 Protocol */}
            <div className="arch-layer layer-hyperlayer0">
              <div className="layer-header">
                <h3>⚡ HyperLayer0 Core Protocol</h3>
                <span className="layer-badge">Processing Engine</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'hyperspeed' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('hyperspeed')}
                >
                  <div className="component-icon hyperspeed">⚡</div>
                  <span>Quantum Processing</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('sharding')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">🔗</div>
                  <span>Adaptive Sharding</span>
                  {showTooltip === 'sharding' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.sharding.title}</h4>
                      <p>{secondaryComponents.sharding.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('stateChannels')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">💡</div>
                  <span>State Channels</span>
                  {showTooltip === 'stateChannels' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.stateChannels.title}</h4>
                      <p>{secondaryComponents.stateChannels.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('rollups')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon hyperspeed">🌊</div>
                  <span>Optimistic Rollups</span>
                  {showTooltip === 'rollups' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.rollups.title}</h4>
                      <p>{secondaryComponents.rollups.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Consensus Layer */}
            <div className="arch-layer layer-quantum">
              <div className="layer-header">
                <h3>🧠 AI-Enhanced Consensus</h3>
                <span className="layer-badge">Validation Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'neural' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('neural')}
                >
                  <div className="component-icon neural">🧠</div>
                  <span>ML Consensus</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className={`layer-component interactive ${activeComponent === 'quantum' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('quantum')}
                >
                  <div className="component-icon quantum">🔒</div>
                  <span>Post-Quantum Security</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('oracles')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon neural">🔮</div>
                  <span>Decentralized Oracles</span>
                  {showTooltip === 'oracles' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.oracles.title}</h4>
                      <p>{secondaryComponents.oracles.description}</p>
                    </div>
                  )}
                </div>
                <div 
                  className="layer-component with-tooltip"
                  onMouseEnter={() => handleTooltipEnter('monitoring')}
                  onMouseLeave={handleTooltipLeave}
                >
                  <div className="component-icon quantum">🛡️</div>
                  <span>Network Monitoring</span>
                  {showTooltip === 'monitoring' && (
                    <div className="component-tooltip">
                      <h4>{secondaryComponents.monitoring.title}</h4>
                      <p>{secondaryComponents.monitoring.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Universal Bridge Protocol */}
            <div className="arch-layer layer-bridge">
              <div className="layer-header">
                <h3>🌉 Universal Interoperability</h3>
                <span className="layer-badge">Connection Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'bridge' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('bridge')}
                >
                  <div className="component-icon universal">🔄</div>
                  <span>Cross-Chain Bridge</span>
                  <div className="glow-effect"></div>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">💧</div>
                  <span>Liquidity Routing</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">🎯</div>
                  <span>Asset Transfer</span>
                </div>
                <div className="layer-component">
                  <div className="component-icon universal">🔒</div>
                  <span>Security Inheritance</span>
                </div>
              </div>
            </div>

            {/* Infrastructure Layer */}
            <div className="arch-layer layer-infrastructure">
              <div className="layer-header">
                <h3>🏗️ Self-Sustaining Infrastructure</h3>
                <span className="layer-badge">Physical Layer</span>
              </div>
              <div className="layer-components">
                <div 
                  className={`layer-component interactive ${activeComponent === 'infrastructure' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('infrastructure')}
                >
                  <div className="component-icon infrastructure">⚡</div>
                  <span>Quantum Processors</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className={`layer-component interactive ${activeComponent === 'renewableInfrastructure' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('renewableInfrastructure')}
                >
                  <div className="component-icon infrastructure">⚡</div>
                  <span>Solar & Wind Power</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className={`layer-component interactive ${activeComponent === 'gasAbstraction' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('gasAbstraction')}
                >
                  <div className="component-icon infrastructure">💸</div>
                  <span>Zero Gas Layer</span>
                  <div className="glow-effect"></div>
                </div>
                <div 
                  className={`layer-component interactive ${activeComponent === 'enterpriseIntegration' ? 'active' : ''}`}
                  onClick={() => handleComponentClick('enterpriseIntegration')}
                >
                  <div className="component-icon infrastructure">🏢</div>
                  <span>Enterprise API</span>
                  <div className="glow-effect"></div>
                </div>
              </div>
            </div>

            {/* Connected Blockchains */}
            <div className="arch-layer layer-blockchains">
              <div className="layer-header">
                <h3>⛓️ Connected Blockchain Networks</h3>
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
                  <span>All Major Chains</span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Details Panel */}
          {activeComponent && componentDetails[activeComponent as keyof typeof componentDetails] && (
            <div className="component-details visible">
              {renderComponentDetails(activeComponent)}
            </div>
          )}
        </div>
      </section>

      {/* Revolutionary Capabilities Section - ATUALIZADA */}
      <section className="revolutionary-capabilities">
        <div className="section-container">
          <h2>Revolutionary Capabilities</h2>
          <p className="section-subtitle">
            Breakthrough Technologies That Redefine Blockchain Infrastructure
          </p>
          <p className="capabilities-description">
            Discover the enterprise-grade innovations that position HyperLayer0 as the definitive Layer 0 solution 
            for global blockchain adoption and mass enterprise integration.
          </p>

          <div className="capabilities-grid">
            {revolutionaryCapabilities.map((capability) => (
              <div 
                key={capability.id} 
                className={`capability-card ${activeComponent === capability.id ? 'expanded' : ''}`}
                onClick={() => handleComponentClick(capability.id)}
              >
                <div className="capability-header">
                  <div className="capability-badge">{capability.badge}</div>
                  <div className="capability-icon">{capability.icon}</div>
                </div>
                
                <div className="capability-content">
                  <h3 className="capability-title">{capability.title}</h3>
                  <h4 className="capability-subtitle">{capability.subtitle}</h4>
                  <p className="capability-description">{capability.description}</p>
                  
                  <div className="capability-stats">
                    {capability.stats.map((stat, index) => (
                      <div key={index} className="capability-stat">
                        <div className="stat-highlight">{stat.label}</div>
                        <div className="stat-trend">{stat.trend}</div>
                      </div>
                    ))}
                  </div>

                  <div className="key-innovations">
                    <h5>Key Innovations:</h5>
                    <ul className="innovations-list">
                      {capability.keyInnovations.map((innovation, index) => (
                        <li key={index} className="innovation-item">
                          <span className="innovation-bullet">▶</span>
                          <span className="innovation-text">{innovation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="capability-cta">
                  <span className="explore-text">Explore Technology →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="feature-comparison">
        <div className="section-container">
          <h2>Industry-Leading Capabilities</h2>
          <p className="section-subtitle">
            See how HyperLayer0 compares to existing blockchain solutions across key metrics.
          </p>

          <div className="comparison-table">
            <div className="comparison-grid">
              {/* Headers */}
              <div className="comparison-header">Feature</div>
              <div className="comparison-header">Bitcoin</div>
              <div className="comparison-header">Ethereum</div>
              <div className="comparison-header">Solana</div>
              <div className="comparison-header highlight-header">HyperLayer0</div>

              {/* Transaction Speed */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Transaction Speed</div>
                <div className="comparison-cell">7 TPS</div>
                <div className="comparison-cell">15 TPS</div>
                <div className="comparison-cell">65K TPS</div>
                <div className="comparison-cell highlight-cell">100K+ TPS</div>
              </div>

              {/* Finality */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Finality Time</div>
                <div className="comparison-cell">60 minutes</div>
                <div className="comparison-cell">6 minutes</div>
                <div className="comparison-cell">0.4 seconds</div>
                <div className="comparison-cell highlight-cell">&lt;1 second</div>
              </div>

              {/* User Gas Fees */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">User Gas Fees</div>
                <div className="comparison-cell">$5-50</div>
                <div className="comparison-cell">$10-100</div>
                <div className="comparison-cell">$0.01-1</div>
                <div className="comparison-cell highlight-cell">$0</div>
              </div>

              {/* Environmental Impact */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Environmental Impact</div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell highlight-cell"><span className="feature-check">✅ Carbon Negative</span></div>
              </div>

              {/* Quantum Security */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Quantum Security</div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell highlight-cell"><span className="feature-check">✅ NIST PQC</span></div>
              </div>

              {/* AI Integration */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">AI Smart Contracts</div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell highlight-cell"><span className="feature-check">✅ Native AI</span></div>
              </div>

              {/* Enterprise Integration */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Enterprise API</div>
                <div className="comparison-cell"><span className="feature-cross">❌</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell highlight-cell"><span className="feature-check">✅ Plug-and-Play</span></div>
              </div>

              {/* Universal Bridge */}
              <div className="comparison-row">
                <div className="comparison-cell feature-label">Cross-Chain Bridge</div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell"><span className="feature-partial">⚠️</span></div>
                <div className="comparison-cell highlight-cell"><span className="feature-check">✅ Universal</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Implementation Examples - ATUALIZADA */}
      <section className="real-world-implementation">
        <div className="section-container">
          <h2>Real-World Implementation Examples</h2>
          <p className="section-subtitle">
            Proven Solutions Delivering Measurable Business Impact
          </p>
          <p className="implementation-description">
            Explore how HyperLayer0's revolutionary infrastructure solves complex business challenges across industries, 
            with quantified results and scalable implementations.
          </p>

          <div className="implementation-grid">
            {realWorldExamples.map((example, index) => (
              <div key={index} className="implementation-card">
                <div className="implementation-header">
                  <div className="implementation-icon">{example.icon}</div>
                  <div className="implementation-meta">
                    <div className="implementation-category">{example.category}</div>
                    <h3 className="implementation-title">{example.title}</h3>
                    <div className="case-study-label">Case Study: <span className="case-study-name">{example.caseStudy}</span></div>
                  </div>
                </div>

                <p className="implementation-description">{example.description}</p>

                <div className="implementation-results">
                  <h4 className="results-title">
                    {example.financialImpact ? 'Transformation Results:' : 
                     example.aiCapabilities ? 'Performance Metrics:' : 
                     example.technicalArchitecture ? 'Implementation Results:' : 
                     example.technologyIntegration ? 'Environmental Results:' :
                     example.privacySecurity ? 'Healthcare Outcomes:' :
                     example.aiIntelligence ? 'Operational Improvements:' : 'Results:'}
                  </h4>
                  <ul className="results-list">
                    {example.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="result-item">
                        <span className="result-bullet">▶</span>
                        <span className="result-text">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {example.financialImpact && (
                  <div className="financial-impact">
                    <h4 className="impact-title">Financial Impact:</h4>
                    <ul className="impact-list">
                      {example.financialImpact.map((impact, impactIndex) => (
                        <li key={impactIndex} className="impact-item">
                          <span className="impact-bullet">💰</span>
                          <span className="impact-text">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {example.technicalArchitecture && (
                  <div className="technical-architecture">
                    <h4 className="tech-title">Technical Architecture:</h4>
                    <ul className="tech-list">
                      {example.technicalArchitecture.map((tech, techIndex) => (
                        <li key={techIndex} className="tech-item">
                          <span className="tech-bullet">⚙️</span>
                          <span className="tech-text">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {example.aiCapabilities && (
                  <div className="ai-capabilities">
                    <h4 className="ai-title">AI Learning Capabilities:</h4>
                    <ul className="ai-list">
                      {example.aiCapabilities.map((ai, aiIndex) => (
                        <li key={aiIndex} className="ai-item">
                          <span className="ai-bullet">🧠</span>
                          <span className="ai-text">{ai}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {example.technologyIntegration && (
                  <div className="technology-integration">
                    <h4 className="integration-title">Technology Integration:</h4>
                    <ul className="integration-list">
                      {example.technologyIntegration.map((tech, techIndex) => (
                        <li key={techIndex} className="integration-item">
                          <span className="integration-bullet">🔗</span>
                          <span className="integration-text">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {example.privacySecurity && (
                  <div className="privacy-security">
                    <h4 className="privacy-title">Privacy & Security:</h4>
                    <ul className="privacy-list">
                      {example.privacySecurity.map((privacy, privacyIndex) => (
                        <li key={privacyIndex} className="privacy-item">
                          <span className="privacy-bullet">🔒</span>
                          <span className="privacy-text">{privacy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {example.aiIntelligence && (
                  <div className="ai-intelligence">
                    <h4 className="intelligence-title">AI Intelligence Features:</h4>
                    <ul className="intelligence-list">
                      {example.aiIntelligence.map((intelligence, intelligenceIndex) => (
                        <li key={intelligenceIndex} className="intelligence-item">
                          <span className="intelligence-bullet">🤖</span>
                          <span className="intelligence-text">{intelligence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

  // Environmental Impact Dashboard - ATUALIZADA PARA REALISTA
  <section className="environmental-impact">
    <div className="section-container">
      <h2>Real-Time Energy Performance</h2>
      <p className="section-subtitle">
        Live monitoring of HyperLayer0's renewable energy infrastructure performance and cost optimization metrics.
      </p>

      <div className="impact-dashboard">
        <div className="impact-metric-card">
          <div className="impact-icon">⚡</div>
          <div className="impact-value" data-target="500">500</div>
          <div className="impact-label">MW Solar Capacity</div>
          <div className="impact-trend">Peak generation capacity</div>
        </div>

        <div className="impact-metric-card">
          <div className="impact-icon">🌪️</div>
          <div className="impact-value" data-target="200">200</div>
          <div className="impact-label">MW Wind Power</div>
          <div className="impact-trend">24/7 generation</div>
        </div>

        <div className="impact-metric-card">
          <div className="impact-icon">🔋</div>
          <div className="impact-value" data-target="2000">2,000</div>
          <div className="impact-label">MWh Storage</div>
          <div className="impact-trend">Battery capacity</div>
        </div>

        <div className="impact-metric-card">
          <div className="impact-icon">💰</div>
          <div className="impact-value" data-target="0">$0</div>
          <div className="impact-label">Energy Costs</div>
          <div className="impact-trend">Complete independence</div>
        </div>
      </div>

      <div className="impact-visualization">
        <h3>Energy Generation Over Time</h3>
        <div className="chart-container">
          <div className="chart-placeholder">
            <div className="chart-line"></div>
            <div className="chart-bars">
              <div className="chart-bar" style={{height: '60%'}}></div>
              <div className="chart-bar" style={{height: '75%'}}></div>
              <div className="chart-bar" style={{height: '90%'}}></div>
              <div className="chart-bar" style={{height: '95%'}}></div>
              <div className="chart-bar" style={{height: '100%'}}></div>
              <div className="chart-bar" style={{height: '85%'}}></div>
            </div>
            <div className="chart-labels">
              <span>06:00</span>
              <span>09:00</span>
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="verification-sources">
        <h3>Infrastructure Components</h3>
        <div className="sources-grid">
          <div className="source-item">
            <div className="source-icon">☀️</div>
            <h4>Solar Panel Arrays</h4>
            <p>High-efficiency photovoltaic panels with sun tracking systems</p>
          </div>
          <div className="source-item">
            <div className="source-icon">🌪️</div>
            <h4>Wind Turbine Systems</h4>
            <p>Modern wind generators optimized for consistent power output</p>
          </div>
          <div className="source-item">
            <div className="source-icon">🔋</div>
            <h4>Battery Storage</h4>
            <p>Tesla Megapack and similar industrial battery systems</p>
          </div>
          <div className="source-item">
            <div className="source-icon">⚡</div>
            <h4>Smart Grid Integration</h4>
            <p>Bidirectional energy trading with public utility networks</p>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Technical Specifications Section */}
      <section className="technical-specifications">
        <div className="section-container">
          <h2>Technical Implementation Framework</h2>
          <p className="section-subtitle">
            Enterprise-Grade Architecture Specifications - Deep dive into the proven technologies and infrastructure 
            that power HyperLayer0's enterprise-grade blockchain network.
          </p>

          <div className="specs-tabs">
            <button 
              className={`spec-tab ${expandedSpec === 'processing' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'processing' ? null : 'processing')}
            >
              ⚡ Quantum Processing
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'consensus' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'consensus' ? null : 'consensus')}
            >
              🧠 AI Consensus
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'security' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'security' ? null : 'security')}
            >
              🔒 Post-Quantum Security
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'bridge' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'bridge' ? null : 'bridge')}
            >
              🌉 Universal Bridge
            </button>
            <button 
              className={`spec-tab ${expandedSpec === 'infrastructure' ? 'active' : ''}`}
              onClick={() => setExpandedSpec(expandedSpec === 'infrastructure' ? null : 'infrastructure')}
            >
              🏗️ Infrastructure
            </button>
          </div>

          {expandedSpec && (
            <div className="spec-details animate-in">
              {expandedSpec === 'processing' && (
                <div className="spec-content">
                  <h3>Quantum & GPU Processing Infrastructure</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Quantum Processors</h4>
                      <ul>
                        <li>Proprietary quantum processing units</li>
                        <li>Quantum advantage for cryptographic operations</li>
                        <li>Hardware-accelerated consensus</li>
                        <li>Quantum-safe key generation</li>
                        <li>Parallel transaction validation</li>
                        <li>Real-time network optimization</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>GPU Cluster Network</h4>
                      <ul>
                        <li>High-performance GPU farms</li>
                        <li>AI/ML workload acceleration</li>
                        <li>Parallel smart contract execution</li>
                        <li>Real-time data processing</li>
                        <li>Advanced cryptographic operations</li>
                        <li>Load balancing and auto-scaling</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Performance Metrics</h4>
                      <ul>
                        <li>100,000+ TPS capacity</li>
                        <li>Sub-second finality</li>
                        <li>Global latency &lt;10ms</li>
                        <li>99.9% uptime SLA</li>
                        <li>Auto-scaling infrastructure</li>
                        <li>Hardware-level security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'consensus' && (
                <div className="spec-content">
                  <h3>AI-Enhanced Consensus Mechanism</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Machine Learning Integration</h4>
                      <ul>
                        <li>Real-time network analysis</li>
                        <li>Adaptive parameter tuning</li>
                        <li>Predictive load balancing</li>
                        <li>Anomaly detection system</li>
                        <li>Performance optimization</li>
                        <li>Automated threat response</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Consensus Algorithm</h4>
                      <ul>
                        <li>Enhanced Practical Byzantine Fault Tolerance</li>
                        <li>AI-optimized validator selection</li>
                        <li>Dynamic consensus parameters</li>
                        <li>Energy-efficient validation</li>
                        <li>Fast finality guarantees</li>
                        <li>Self-healing network protocols</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Network Intelligence</h4>
                      <ul>
                        <li>Real-time performance monitoring</li>
                        <li>Predictive maintenance</li>
                        <li>Automatic parameter optimization</li>
                        <li>Traffic pattern analysis</li>
                        <li>Resource allocation optimization</li>
                        <li>Network health assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'security' && (
                <div className="spec-content">
                  <h3>Post-Quantum Cryptographic Security</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>NIST Post-Quantum Standards</h4>
                      <ul>
                        <li>CRYSTALS-Dilithium digital signatures</li>
                        <li>CRYSTALS-Kyber key encapsulation</li>
                        <li>Lattice-based cryptography</li>
                        <li>Hardware security modules</li>
                        <li>Quantum-resistant algorithms</li>
                        <li>Future-proof security design</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Security Infrastructure</h4>
                      <ul>
                        <li>Multi-layered security architecture</li>
                        <li>Hardware-based key storage</li>
                        <li>Secure multi-party computation</li>
                        <li>Zero-knowledge proof systems</li>
                        <li>Distributed key management</li>
                        <li>Continuous security auditing</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Threat Protection</h4>
                      <ul>
                        <li>Real-time threat detection</li>
                        <li>Automated incident response</li>
                        <li>Network traffic analysis</li>
                        <li>Behavioral pattern monitoring</li>
                        <li>Fraud prevention systems</li>
                        <li>Emergency response protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'bridge' && (
                <div className="spec-content">
                  <h3>Universal Interoperability Bridge</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Cross-Chain Technology</h4>
                      <ul>
                        <li>Light client verification</li>
                        <li>Trustless message passing</li>
                        <li>Multi-chain asset support</li>
                        <li>Atomic cross-chain swaps</li>
                        <li>State proof verification</li>
                        <li>Dispute resolution system</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Supported Networks</h4>
                      <ul>
                        <li>Bitcoin and Lightning Network</li>
                        <li>Ethereum and Layer 2s</li>
                        <li>Cosmos ecosystem</li>
                        <li>Polkadot parachains</li>
                        <li>Solana and SPL tokens</li>
                        <li>All major blockchain networks</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Security Model</h4>
                      <ul>
                        <li>Inherit source chain security</li>
                        <li>Validator slashing conditions</li>
                        <li>Economic security guarantees</li>
                        <li>Emergency pause mechanisms</li>
                        <li>Fraud proof challenges</li>
                        <li>Insurance fund protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {expandedSpec === 'infrastructure' && (
                <div className="spec-content">
                  <h3>Self-Sustaining Infrastructure Network</h3>
                  <div className="spec-grid">
                    <div className="spec-card">
                      <h4>Renewable Energy</h4>
                      <ul>
                        <li>100% solar and wind powered</li>
                        <li>Energy storage systems</li>
                        <li>Grid-independent operation</li>
                        <li>Carbon offset programs</li>
                        <li>Energy efficiency optimization</li>
                        <li>Sustainable data center design</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Hardware Infrastructure</h4>
                      <ul>
                        <li>Proprietary quantum processors</li>
                        <li>High-performance GPU clusters</li>
                        <li>Redundant data center network</li>
                        <li>Edge computing nodes</li>
                        <li>Advanced cooling systems</li>
                        <li>Disaster recovery systems</li>
                      </ul>
                    </div>
                    <div className="spec-card">
                      <h4>Cost Optimization</h4>
                      <ul>
                        <li>Zero user transaction fees</li>
                        <li>Energy cost elimination</li>
                        <li>Automated resource management</li>
                        <li>Efficient hardware utilization</li>
                        <li>Predictive maintenance</li>
                        <li>Sustainable economics model</li>
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
          <h2>Network Performance</h2>
          <p className="section-subtitle">
            Real-world performance metrics demonstrating HyperLayer0's enterprise-grade capabilities.
          </p>
          
          {/* Tab Navigation */}
          <div className="performance-tabs">
            <button 
              className={`perf-tab ${activeTab === 'speed' ? 'active' : ''}`}
              onClick={() => setActiveTab('speed')}
            >
              ⚡ Performance
            </button>
            <button 
              className={`perf-tab ${activeTab === 'efficiency' ? 'active' : ''}`}
              onClick={() => setActiveTab('efficiency')}
            >
              💎 Cost & Energy
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
                  <h3>Network Performance Comparison</h3>
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
                          <span className="stat-value highlight-value">100K+</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Finality</span>
                          <span className="stat-value highlight-value">&lt;1s</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">User Cost</span>
                          <span className="stat-value highlight-value">$0</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Energy</span>
                          <span className="stat-value highlight-value">100% Green</span>
                        </div>
                      </div>
                      <div className="superiority-badge">
                        Enterprise Layer 0 Infrastructure
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
                            <span className="stat-value">15</span>
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
          <h2>Developer Ecosystem</h2>
          <p className="section-subtitle">
            Complete toolkit and resources for building on HyperLayer0's enterprise infrastructure.
          </p>

          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Documentation</h3>
              <p>Comprehensive guides and technical documentation for developers.</p>
              <ul>
                <li>Getting Started Guide</li>
                <li>API Reference</li>
                <li>Smart Contract Templates</li>
                <li>Integration Tutorials</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">🛠️</div>
              <h3>Development Tools</h3>
              <p>SDKs and tools for all major programming languages and frameworks.</p>
              <ul>
                <li>JavaScript/TypeScript SDK</li>
                <li>Python Development Kit</li>
                <li>Rust SDK</li>
                <li>CLI Tools & Testing Suite</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">🚀</div>
              <h3>Integration Guide</h3>
              <p>Step-by-step instructions for integrating with existing systems.</p>
              <ul>
                <li>Cross-chain Bridge Integration</li>
                <li>Enterprise API Setup</li>
                <li>Smart Contract Migration</li>
                <li>Security Best Practices</li>
              </ul>
            </div>

            <div className="resource-card">
              <div className="resource-icon">💡</div>
              <h3>Example Projects</h3>
              <p>Real-world implementations and sample applications.</p>
              <ul>
                <li>DeFi Protocol Templates</li>
                <li>Enterprise Payment Systems</li>
                <li>Supply Chain Solutions</li>
                <li>Identity Management</li>
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
            HyperLayer0's revolutionary approach: Zero user costs through self-sustaining infrastructure, 
            powered by renewable energy and quantum processing.
          </p>
          
          <div className="zero-burns-grid">
            <div className="zero-burns-card">
              <div className="burns-icon">💸</div>
              <div className="burns-value">$0</div>
              <div className="burns-label">User Transaction Fees</div>
              <div className="burns-description">
                Zero cost for users - infrastructure funded by renewable energy
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">🌉</div>
              <div className="burns-value">$0</div>
              <div className="burns-label">Cross-Chain Transfers</div>
              <div className="burns-description">
                Free interoperability across all supported blockchain networks
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">🔥</div>
              <div className="burns-value">0%</div>
              <div className="burns-label">Token Burns</div>
              <div className="burns-description">
                No artificial scarcity - value through utility and adoption
              </div>
            </div>
            
            <div className="zero-burns-card">
              <div className="burns-icon">🌱</div>
              <div className="burns-value">100%</div>
              <div className="burns-label">Renewable Energy</div>
              <div className="burns-description">
                Self-sustaining infrastructure with carbon negative impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="architecture-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Build on Enterprise Infrastructure</h2>
            <p>
              Join the next generation of blockchain development with proven technology, 
              quantum security, and zero user costs.
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
                Read Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;