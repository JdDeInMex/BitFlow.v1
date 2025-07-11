import React, { useState, useEffect } from "react";
import "./UseCases.css";

// Definição de tipos
type CategoryType =
  | "defi"
  | "realworld"
  | "metaverse"
  | "enterprise"
  | "sustainability"
  | "innovation"
  | "healthcare"
  | "education"
  | "governance"
  | "agriculture"
  | "space";

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
  const [activeCategory, setActiveCategory] = useState<CategoryType>("defi");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation on component mount
  useEffect(() => {
    const cards = document.querySelectorAll(".use-case-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-in");
      }, index * 100);
    });
  }, [activeCategory]);

  const openModal = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Categorias expandidas para incluir todas as 11 categorias principais
  const categories = [
    {
      id: "defi",
      label: "DeFi Revolution",
      icon: "🏦",
      color: "primary-green",
    },
    {
      id: "realworld",
      label: "Real World Assets",
      icon: "🏠",
      color: "primary-blue",
    },
    {
      id: "metaverse",
      label: "Metaverse & Gaming",
      icon: "🌐",
      color: "accent-pink",
    },
    {
      id: "enterprise",
      label: "Enterprise Solutions",
      icon: "🏢",
      color: "gradient-secondary",
    },
    {
      id: "sustainability",
      label: "Sustainability",
      icon: "🌱",
      color: "primary-green",
    },
    {
      id: "innovation",
      label: "Future Innovation",
      icon: "🚀",
      color: "gradient-primary",
    },
    {
      id: "healthcare",
      label: "Healthcare",
      icon: "🏥",
      color: "primary-blue",
    },
    { id: "education", label: "Education", icon: "🎓", color: "accent-pink" },
    {
      id: "governance",
      label: "Governance",
      icon: "🏛️",
      color: "gradient-secondary",
    },
    {
      id: "agriculture",
      label: "Agriculture",
      icon: "🌾",
      color: "primary-green",
    },
    {
      id: "space",
      label: "Space Exploration",
      icon: "🛰️",
      color: "gradient-primary",
    },
  ];

  // Implementação das 111 soluções organizadas por categoria
  const useCasesData: Record<CategoryType, UseCase[]> = {
    defi: [
      {
        title: "Native DEX with Infinite Liquidity",
        description:
          "Revolutionary decentralized exchange with cross-chain liquidity aggregation and zero-slippage trading",
        icon: "🔄",
        features: [
          "Zero-slippage trading through quantum liquidity pools",
          "Cross-chain order books with instant settlement",
          "AI-powered market making and liquidity optimization",
          "Advanced derivatives and perpetual contracts",
          "Yield farming with 100-1000% APR sustainably",
        ],
        benefits: [
          "Traders save 99.9% on fees compared to centralized exchanges",
          "Liquidity providers earn consistent yields",
          "No impermanent loss through smart rebalancing",
          "Access to global liquidity from any blockchain",
        ],
        realWorldExample:
          "Trade any asset on any blockchain with zero slippage and 0.01% fees",
        marketSize: "$2.5 Trillion DEX Market",
        potential: "1000x current volume capacity",
      },
      {
        title: "Lending Protocol with Real Assets",
        description:
          "Collateralized lending using real-world assets as backing, enabling unprecedented capital efficiency",
        icon: "💰",
        features: [
          "Real estate as collateral for crypto loans",
          "Fractional property ownership through NFTs",
          "Dynamic interest rates based on risk assessment",
          "Cross-chain collateral utilization",
          "Instant loan approval and disbursement",
        ],
        benefits: [
          "Access loans using your physical assets as collateral",
          "Earn yield on traditionally illiquid assets",
          "Higher loan-to-value ratios than traditional banks",
          "Global access to lending markets",
        ],
        realWorldExample:
          "Get a $100k loan in 5 minutes using your house as collateral",
        marketSize: "$300 Trillion Real Estate Market",
        potential: "Unlock trillions in dormant capital",
      },
      {
        title: "Decentralized Insurance Protocol",
        description:
          "Risk-sharing pools for crypto, real-world assets, and parametric insurance with instant claims",
        icon: "🛡️",
        features: [
          "Smart contract coverage for DeFi protocols",
          "Parametric insurance for real-world events",
          "Oracle-based automatic claim verification",
          "Fractional insurance underwriting",
          "Cross-chain coverage for all assets",
        ],
        benefits: [
          "Instant claims payment through oracles",
          "Lower premiums through disintermediation",
          "Global risk diversification",
          "Insurance for previously uninsurable risks",
        ],
        realWorldExample:
          "Crop insurance that pays automatically during drought",
        marketSize: "$6 Trillion Insurance Market",
        potential: "Insure the uninsurable globally",
      },
      {
        title: "Quantum-Secured Staking",
        description:
          "Next-generation staking platform with quantum-secured rewards and dynamic APR",
        icon: "⚛️",
        features: [
          "Quantum-secured staking contracts",
          "Dynamic APR based on network utilization",
          "Multi-asset staking pools",
          "Instant unstaking with no penalty",
          "Compounding rewards automation",
        ],
        benefits: [
          "Earn 100-1000% APR sustainably",
          "No lockup periods required",
          "Rewards in multiple currencies",
          "Zero risk of slashing or penalties",
        ],
        realWorldExample:
          "Stake multiple assets and earn 200% APR with instant withdrawal",
        marketSize: "$300 Billion Staking Market",
        potential: "10x growth in staking participation",
      },
      {
        title: "Universal Liquidity Protocol",
        description:
          "Unified liquidity pools across all blockchains with zero fragmentation and maximum capital efficiency",
        icon: "🌊",
        features: [
          "Cross-chain AMM with unified liquidity",
          "Zero-slippage swaps for any token pair",
          "Impermanent loss protection",
          "MEV-resistant trade execution",
          "Liquidity position NFTs with boosted rewards",
        ],
        benefits: [
          "Provide liquidity once, earn from all chains",
          "Maximum capital efficiency for traders",
          "Protected from front-running and MEV",
          "Higher yields than traditional LPs",
        ],
        realWorldExample:
          "Provide liquidity once, earn from 100+ blockchains simultaneously",
        marketSize: "$100 Billion TVL Opportunity",
        potential: "Unify all blockchain liquidity",
      },
      {
        title: "AI-Driven Yield Optimizer",
        description:
          "Intelligent yield farming protocol that maximizes returns across all DeFi protocols",
        icon: "🤖",
        features: [
          "AI that predicts optimal yield strategies",
          "Cross-chain yield aggregation",
          "Risk-adjusted return optimization",
          "Gas-free rebalancing",
          "One-click diversification",
        ],
        benefits: [
          "Outperform manual yield farming by 300%",
          "Automatic risk management",
          "One deposit for complete DeFi exposure",
          "Set-and-forget passive income",
        ],
        realWorldExample:
          "Deposit stablecoins once, AI manages yield across 50+ protocols",
        marketSize: "$50 Billion Yield Farming Market",
        potential: "Make yield farming accessible to everyone",
      },
      {
        title: "Decentralized Derivatives Platform",
        description:
          "Advanced financial derivatives with cross-chain collateral and oracle-free pricing",
        icon: "📈",
        features: [
          "Options, futures, and swaps on any asset",
          "Cross-chain collateral acceptance",
          "Oracle-free pricing through consensus",
          "Zero liquidation risk through smart hedging",
          "Synthetic exposure to traditional markets",
        ],
        benefits: [
          "Trade derivatives with minimal capital requirements",
          "No counterparty risk or centralized control",
          "Access to global financial markets 24/7",
          "Create custom financial instruments",
        ],
        realWorldExample: "Trade S&P 500 options with crypto as collateral",
        marketSize: "$1 Quadrillion Derivatives Market",
        potential: "Revolutionize global financial markets",
      },
      {
        title: "Flash Loan Aggregator",
        description:
          "Zero-collateral loans for instant arbitrage, liquidations, and complex financial operations",
        icon: "⚡",
        features: [
          "Cross-chain flash loans with no collateral",
          "Pre-built arbitrage strategies",
          "MEV opportunity detection",
          "Liquidation automation",
          "Complex transaction building",
        ],
        benefits: [
          "Execute arbitrage without capital",
          "Capture MEV opportunities instantly",
          "Perform complex financial operations",
          "No capital requirements for strategies",
        ],
        realWorldExample: "Execute a $10M arbitrage with $0 starting capital",
        marketSize: "$10 Billion Daily Arbitrage",
        potential: "Democratize arbitrage opportunities",
      },
      {
        title: "Prediction Markets 2.0",
        description:
          "Advanced prediction markets for any future event with oracle-free resolution",
        icon: "🔮",
        features: [
          "Markets for any future event or outcome",
          "AI-based dispute resolution",
          "Zero fee market creation",
          "Conditional markets and combinatorial betting",
          "Automated market making for any market",
        ],
        benefits: [
          "Trade on any future outcome with deep liquidity",
          "Create markets without fees or restrictions",
          "Earn from market making and resolution",
          "Access global prediction markets",
        ],
        realWorldExample:
          "Create and trade on custom prediction markets in seconds",
        marketSize: "$100 Billion Prediction Market Potential",
        potential: "Harness the wisdom of crowds globally",
      },
      {
        title: "Decentralized Identity & Credit",
        description:
          "Universal identity and credit scoring system with privacy and global portability",
        icon: "🪪",
        features: [
          "Self-sovereign identity verification",
          "On-chain credit scoring",
          "Privacy-preserving credentials",
          "Cross-chain reputation tracking",
          "Soulbound tokens for achievements",
        ],
        benefits: [
          "Portable identity across all platforms",
          "Access credit without traditional banks",
          "Control your own data and credentials",
          "Build reputation across platforms",
        ],
        realWorldExample:
          "Get a loan based on your on-chain reputation and activity",
        marketSize: "$500 Billion Identity Market",
        potential: "Digital identity for 8 billion humans",
      },
    ],
    realworld: [
      {
        title: "Universal Asset Tokenization",
        description:
          "Tokenize any real-world asset: real estate, vehicles, art, commodities, IP, and more with fractional ownership",
        icon: "🏠",
        features: [
          "Real estate tokenization with legal compliance",
          "Vehicle ownership and sharing through NFTs",
          "Art and collectibles with provenance tracking",
          "Commodity tokenization for global trading",
          "Intellectual property licensing automation",
        ],
        benefits: [
          "Fractional ownership of expensive assets",
          "Global liquidity for traditionally illiquid assets",
          "24/7 trading of real-world assets",
          "Reduced barriers to investment",
        ],
        realWorldExample: "Buy 0.1% of a Manhattan apartment for $1,000",
        marketSize: "$400 Trillion Global Assets",
        potential: "Unlock liquidity for all assets",
      },
      {
        title: "Supply Chain Revolution",
        description:
          "Complete supply chain transparency from raw materials to consumer, with automated payments and compliance",
        icon: "📦",
        features: [
          "End-to-end product tracking with IoT integration",
          "Automated payments based on delivery milestones",
          "Quality verification through sensor networks",
          "Sustainability scoring and carbon tracking",
          "Consumer transparency through QR codes",
        ],
        benefits: [
          "Eliminate counterfeit products",
          "Reduce supply chain friction and costs",
          "Enable sustainable consumption choices",
          "Automate compliance and auditing",
        ],
        realWorldExample:
          "Track coffee from farm to cup with quality guarantees",
        marketSize: "$24 Trillion Global Trade",
        potential: "Revolutionize global commerce",
      },
      {
        title: "Digital Identity Ecosystem",
        description:
          "Self-sovereign identity system with privacy-preserving verification and cross-border recognition",
        icon: "🆔",
        features: [
          "Self-sovereign identity with zero-knowledge proofs",
          "Selective disclosure of personal information",
          "Cross-border identity verification",
          "Biometric authentication with privacy",
          "Credential issuance and verification",
        ],
        benefits: [
          "Control your own identity and data",
          "Verify identity without revealing personal info",
          "One identity recognized globally",
          "Prevent identity theft and fraud",
        ],
        realWorldExample: "Prove your age without revealing your birthdate",
        marketSize: "$100 Billion Identity Market",
        potential: "Digital identity for everyone",
      },
      {
        title: "Real Estate Tokenization Platform",
        description:
          "Comprehensive platform for tokenizing, trading, and managing real estate investments with fractional ownership",
        icon: "🏢",
        features: [
          "Legal-compliant property tokenization",
          "Fractional ownership with automated dividends",
          "Property management automation",
          "Rental income distribution",
          "Real estate development crowdfunding",
        ],
        benefits: [
          "Invest in real estate with just $100",
          "Instant liquidity for property investments",
          "Diversify across global properties easily",
          "Automated rental income payments",
        ],
        realWorldExample: "Own parts of 100 properties worldwide with $10,000",
        marketSize: "$250 Trillion Real Estate Market",
        potential: "Democratize real estate investing globally",
      },
      {
        title: "Smart City Infrastructure",
        description:
          "Decentralized infrastructure for smart cities with IoT integration, governance, and utility management",
        icon: "🏙️",
        features: [
          "IoT sensor networks with on-chain data",
          "Decentralized utility management",
          "Citizen governance and voting systems",
          "Automated public services",
          "Smart city resource optimization",
        ],
        benefits: [
          "Reduce city operational costs by 30%",
          "Increase transparency in city management",
          "Improve resource allocation efficiency",
          "Enable citizen participation in governance",
        ],
        realWorldExample: "Citizens vote on resource allocation in real-time",
        marketSize: "$2.5 Trillion Smart City Market",
        potential: "Transform urban living globally",
      },
      {
        title: "Intellectual Property Management",
        description:
          "Platform for creating, licensing, and monetizing intellectual property with automated royalty payments",
        icon: "©️",
        features: [
          "Verifiable IP registration and ownership",
          "Automated licensing and royalty payments",
          "Fractional IP ownership and funding",
          "Usage tracking and analytics",
          "IP valuation and marketplace",
        ],
        benefits: [
          "Protect and monetize your creations globally",
          "Receive royalties instantly when used",
          "Fund development through fractional sales",
          "Transparent usage tracking",
        ],
        realWorldExample:
          "Musicians receive royalties instantly when songs play",
        marketSize: "$5 Trillion IP Market",
        potential: "Revolutionize creative industries",
      },
      {
        title: "Decentralized Energy Grid",
        description:
          "Peer-to-peer energy trading platform with renewable incentives and grid optimization",
        icon: "⚡",
        features: [
          "P2P energy trading between producers and consumers",
          "Renewable energy certificate tokenization",
          "Grid stability incentives and management",
          "Automated microgrid operations",
          "Carbon credit generation and trading",
        ],
        benefits: [
          "Sell excess solar energy directly to neighbors",
          "Reduce energy costs through direct trading",
          "Incentivize renewable energy production",
          "Create resilient local energy systems",
        ],
        realWorldExample: "Neighborhood solar sharing reduces bills by 50%",
        marketSize: "$2.4 Trillion Energy Market",
        potential: "Decentralize global energy infrastructure",
      },
      {
        title: "Tokenized Securities Platform",
        description:
          "Compliant platform for issuing, trading, and managing tokenized securities with global access",
        icon: "📊",
        features: [
          "Regulatory-compliant security token issuance",
          "24/7 trading with global accessibility",
          "Automated dividend and interest payments",
          "Corporate action automation",
          "Cross-border securities market",
        ],
        benefits: [
          "Reduce issuance costs by 95%",
          "Access global capital markets instantly",
          "Eliminate intermediaries and settlements",
          "Automate compliance and reporting",
        ],
        realWorldExample: "Small businesses raise capital globally within days",
        marketSize: "$100 Trillion Securities Market",
        potential: "Rebuild global capital markets",
      },
      {
        title: "Social Impact Tracking",
        description:
          "Platform for measuring, verifying, and rewarding social impact with transparent funding and results",
        icon: "🌍",
        features: [
          "Impact verification through data and oracles",
          "Outcome-based funding models",
          "Social impact tokens and rewards",
          "Transparent charity operations",
          "Sustainable Development Goal tracking",
        ],
        benefits: [
          "Fund projects based on verified outcomes",
          "Track impact of donations transparently",
          "Incentivize social good through rewards",
          "Eliminate fraud in charitable activities",
        ],
        realWorldExample: "Donors only pay when education outcomes improve",
        marketSize: "$1 Trillion Philanthropy Market",
        potential: "Transform global development",
      },
      {
        title: "Alternative Asset Marketplace",
        description:
          "Platform for tokenizing and trading alternative assets like collectibles, wine, watches, and rare items",
        icon: "🏆",
        features: [
          "Authentication and provenance tracking",
          "Fractional ownership of rare items",
          "Storage and insurance integration",
          "Asset-backed lending",
          "Curation and discovery marketplace",
        ],
        benefits: [
          "Invest in rare collectibles with small amounts",
          "Instant liquidity for collectors",
          "Verifiable authenticity and provenance",
          "Access previously inaccessible asset classes",
        ],
        realWorldExample: "Own 0.01% of a rare Ferrari for $250",
        marketSize: "$700 Billion Alternative Assets",
        potential: "Democratize collecting and investing",
      },
    ],
    metaverse: [
      {
        title: "Universal Metaverse Infrastructure",
        description:
          "Cross-platform metaverse infrastructure with persistent avatars and interoperable assets",
        icon: "🌐",
        features: [
          "Avatar persistence across all virtual worlds",
          "Asset portability between metaverse platforms",
          "Decentralized rendering and physics computation",
          "Virtual real estate with true ownership",
          "Social and economic systems integration",
        ],
        benefits: [
          "Use the same avatar everywhere",
          "Items work across all games and platforms",
          "True ownership of virtual assets",
          "Seamless experience between worlds",
        ],
        realWorldExample: "Buy a sword in one game, use it in 100 others",
        marketSize: "$800 Billion Gaming + Metaverse",
        potential: "Create the unified metaverse",
      },
      {
        title: "Next-Gen GameFi Platform",
        description:
          "Revolutionary gaming platform with play-to-earn 2.0, NFT integration, and esports infrastructure",
        icon: "🎮",
        features: [
          "Sub-millisecond transaction confirmation",
          "Cross-game asset portability",
          "Play-to-earn mechanics with sustainable economics",
          "Esports tournaments with instant payouts",
          "In-game NFT creation and trading",
        ],
        benefits: [
          "Earn real money while gaming",
          "Own your in-game items permanently",
          "True skill-based rewards",
          "Zero-fee asset trading",
        ],
        realWorldExample:
          "Pro gamers earning $10k+ monthly from skill-based rewards",
        marketSize: "$300 Billion Gaming Market",
        potential: "Revolutionize the gaming industry",
      },
      {
        title: "Decentralized Virtual Reality",
        description:
          "Open VR ecosystem with decentralized hosting, rendering, and content creation",
        icon: "🥽",
        features: [
          "Distributed rendering using shared GPU power",
          "Open standards for VR content and worlds",
          "Creator economy with instant monetization",
          "Physical world integration through AR",
          "Social VR with privacy and security",
        ],
        benefits: [
          "Create and monetize VR content easily",
          "High-quality VR on lightweight devices",
          "Open and interoperable VR ecosystem",
          "True ownership of virtual spaces",
        ],
        realWorldExample:
          "Build a VR business reaching millions without central platforms",
        marketSize: "$100 Billion VR/AR Market",
        potential: "Democratize spatial computing",
      },
      {
        title: "Metaverse Identity System",
        description:
          "Universal identity framework for the metaverse with privacy, reputation, and social connections",
        icon: "👤",
        features: [
          "Cross-platform identity verification",
          "Privacy-preserving avatar representation",
          "Reputation and achievement tracking",
          "Social graph portability",
          "Identity recovery and security",
        ],
        benefits: [
          "One identity across the entire metaverse",
          "Control your data and appearance",
          "Bring your friends and connections everywhere",
          "Secure and private online interactions",
        ],
        realWorldExample:
          "One avatar with consistent reputation across all platforms",
        marketSize: "$50 Billion Digital Identity Market",
        potential: "Create the social layer of the metaverse",
      },
      {
        title: "Decentralized Virtual Land",
        description:
          "Infinite, scalable virtual land system with true ownership and cross-platform compatibility",
        icon: "🏞️",
        features: [
          "Unlimited land generation with physical properties",
          "Interoperable building and creation tools",
          "Land monetization through activities and traffic",
          "Governance systems for land management",
          "Physical world location anchoring",
        ],
        benefits: [
          "Own virtual land that works everywhere",
          "Create and monetize spaces without limits",
          "Participate in virtual land governance",
          "Build once, deploy everywhere",
        ],
        realWorldExample:
          "Create a virtual business district used across 50+ platforms",
        marketSize: "$200 Billion Virtual Real Estate",
        potential: "Create the spatial internet",
      },
      {
        title: "AI-Powered NPCs",
        description:
          "Ultra-realistic non-player characters with advanced AI, evolving personalities, and cross-game presence",
        icon: "🧠",
        features: [
          "Natural language conversation with any NPC",
          "Persistent memory and relationship building",
          "Emotional intelligence and realistic reactions",
          "Cross-game presence and continuity",
          "Creator economy for AI character development",
        ],
        benefits: [
          "Truly immersive world with realistic characters",
          "NPCs that remember and evolve with you",
          "Create and monetize AI personalities",
          "Enhanced storytelling and world building",
        ],
        realWorldExample:
          "NPCs that remember you across games and develop relationships",
        marketSize: "$50 Billion NPC Market",
        potential: "Bring virtual worlds to life",
      },
      {
        title: "Metaverse Commerce System",
        description:
          "Universal commerce framework for the metaverse with instant payments, marketplace, and creator economy",
        icon: "🛒",
        features: [
          "One-click purchases across all platforms",
          "Cross-metaverse marketplace and discovery",
          "Creator royalties and revenue sharing",
          "Virtual goods with physical twins",
          "NFT-powered ownership and trading",
        ],
        benefits: [
          "Buy and sell anywhere in the metaverse",
          "Creators earn fair compensation automatically",
          "Discover relevant items across all platforms",
          "Bridge virtual and physical commerce",
        ],
        realWorldExample:
          "Buy virtual shoes that arrive physically at your door",
        marketSize: "$100 Billion Metaverse Commerce",
        potential: "Create the economic layer of the metaverse",
      },
      {
        title: "Virtual Events Platform",
        description:
          "Scalable platform for hosting immersive virtual events, concerts, conferences, and experiences",
        icon: "🎭",
        features: [
          "Million-user concurrent events without lag",
          "Interactive and immersive experiences",
          "Virtual ticketing and access control",
          "Creator tools for custom event spaces",
          "Mixed reality integration for hybrid events",
        ],
        benefits: [
          "Attend events from anywhere in the world",
          "Create and monetize custom event experiences",
          "Interactive engagement beyond physical limitations",
          "Data-driven event optimization",
        ],
        realWorldExample: "Concert with 1 million live attendees globally",
        marketSize: "$1.1 Trillion Events Industry",
        potential: "Revolutionize how we gather and connect",
      },
      {
        title: "Decentralized Content Distribution",
        description:
          "Platform for distributing 3D content, experiences, and assets across the entire metaverse",
        icon: "📱",
        features: [
          "Create once, distribute everywhere system",
          "Fair revenue sharing with creators",
          "Decentralized content hosting and delivery",
          "Compatibility layer for all platforms",
          "Version control and rights management",
        ],
        benefits: [
          "Reach users on any metaverse platform",
          "Retain ownership and control of your content",
          "Earn revenue from all platforms automatically",
          "Reduce development and distribution costs",
        ],
        realWorldExample: "Create content once, reach users on 100+ platforms",
        marketSize: "$300 Billion Digital Content Market",
        potential: "Power the content layer of the metaverse",
      },
      {
        title: "Virtual to Physical Bridge",
        description:
          "System connecting virtual metaverse assets with physical world items, services, and experiences",
        icon: "🌉",
        features: [
          "NFTs with physical item redemption",
          "Virtual services with physical fulfillment",
          "Location-based metaverse experiences",
          "Digital twins of physical locations",
          "IoT integration with virtual spaces",
        ],
        benefits: [
          "Seamless transition between virtual and physical",
          "New business models bridging both worlds",
          "Enhanced real-world experiences through virtual layers",
          "Increased utility for digital assets",
        ],
        realWorldExample:
          "Virtual furniture that arrives physically at your home",
        marketSize: "$500 Billion Phygital Market",
        potential: "Blend digital and physical reality",
      },
    ],
    enterprise: [
      {
        title: "Enterprise Blockchain Integration",
        description:
          "Seamless integration of blockchain technology into existing enterprise systems and workflows",
        icon: "🏢",
        features: [
          "API-first integration with existing ERP systems",
          "Compliance automation for multiple jurisdictions",
          "Private and permissioned network options",
          "Enterprise-grade security and audit trails",
          "Scalable infrastructure with SLA guarantees",
        ],
        benefits: [
          "Reduce operational costs by 30-50%",
          "Improve transparency and trust",
          "Automate compliance and reporting",
          "Enable new business models",
        ],
        realWorldExample:
          "Fortune 500 companies saving $10M+ annually on processes",
        marketSize: "$500 Billion Enterprise Software",
        potential: "Transform how businesses operate",
      },
      {
        title: "Government Services Platform",
        description:
          "Comprehensive platform for government services with citizen identity, voting, and service delivery",
        icon: "🏛️",
        features: [
          "Secure digital identity for all citizens",
          "Transparent and verifiable voting systems",
          "Streamlined government service delivery",
          "Public spending transparency and tracking",
          "Cross-border identity and credential verification",
        ],
        benefits: [
          "Reduce government operational costs",
          "Increase citizen trust through transparency",
          "Eliminate fraud and corruption",
          "Enable new forms of democratic participation",
        ],
        realWorldExample: "Estonia-style digital citizenship for every country",
        marketSize: "$15 Trillion Government Spending",
        potential: "Revolutionize governance globally",
      },
      {
        title: "Financial Services Infrastructure",
        description:
          "Complete financial infrastructure for banks and fintech with CBDCs, payments, and compliance",
        icon: "🏦",
        features: [
          "Central Bank Digital Currency (CBDC) infrastructure",
          "Cross-border payment settlement network",
          "Automated compliance and risk management",
          "Real-time audit trails and reporting",
          "Integration with traditional banking systems",
        ],
        benefits: [
          "Reduce settlement times from days to seconds",
          "Lower cross-border payment costs by 90%",
          "Improve financial inclusion globally",
          "Enhance monetary policy effectiveness",
        ],
        realWorldExample:
          "Central banks issuing digital currencies on HyperLayer0",
        marketSize: "$25 Trillion Banking Assets",
        potential: "Rebuild the global financial system",
      },
      {
        title: "Professional Services Automation",
        description:
          "Automation platform for legal, accounting, consulting, and other professional services",
        icon: "⚖️",
        features: [
          "Smart contract templates for legal agreements",
          "Automated accounting and tax compliance",
          "Professional credential verification",
          "Client relationship and billing automation",
          "Cross-border professional service delivery",
        ],
        benefits: [
          "Reduce legal and accounting costs by 70%",
          "Ensure compliance across jurisdictions",
          "Enable global professional service access",
          "Automate routine professional tasks",
        ],
        realWorldExample:
          "Small businesses accessing Fortune 500 legal services affordably",
        marketSize: "$2 Trillion Professional Services",
        potential: "Democratize professional expertise",
      },
      {
        title: "Supply Chain Management",
        description:
          "End-to-end supply chain management with IoT integration, provenance tracking, and payment automation",
        icon: "📦",
        features: [
          "Raw material to consumer product tracking",
          "IoT sensor integration for quality assurance",
          "Automated payment on delivery milestones",
          "Supplier reputation and certification",
          "Predictive supply chain optimization",
        ],
        benefits: [
          "Eliminate counterfeit products",
          "Reduce supply chain financing costs",
          "Increase transparency for consumers",
          "Optimize inventory and logistics",
        ],
        realWorldExample:
          "Track pharmaceuticals from factory to patient with quality assurance",
        marketSize: "$15 Trillion Supply Chain Market",
        potential: "Reinvent global supply chains",
      },
      {
        title: "Enterprise Data Management",
        description:
          "Secure, compliant data sharing and monetization platform for enterprise data",
        icon: "📊",
        features: [
          "Privacy-preserving data sharing",
          "Secure multi-party computation",
          "Data monetization marketplace",
          "Compliance and audit automation",
          "Federated analytics capabilities",
        ],
        benefits: [
          "Share data without revealing sensitive information",
          "Create new revenue streams from data assets",
          "Maintain regulatory compliance automatically",
          "Enable cross-organization collaboration",
        ],
        realWorldExample:
          "Pharmaceutical companies sharing clinical data without privacy risks",
        marketSize: "$100 Billion Data Market",
        potential: "Unlock the value of enterprise data",
      },
      {
        title: "Decentralized Autonomous Organizations",
        description:
          "Complete infrastructure for creating, managing, and growing decentralized organizations",
        icon: "🤝",
        features: [
          "Customizable governance frameworks",
          "Treasury management and budgeting",
          "Member reputation and contribution tracking",
          "Proposal and voting systems",
          "Legal compliance automation",
        ],
        benefits: [
          "Create global organizations without borders",
          "Reduce organizational overhead costs",
          "Enable transparent decision-making",
          "Align incentives among stakeholders",
        ],
        realWorldExample:
          "Global organization with 10,000 members and no central authority",
        marketSize: "$10 Trillion Corporate Governance",
        potential: "Redefine how organizations operate",
      },
      {
        title: "Customer Loyalty Revolution",
        description:
          "Next-generation loyalty and rewards platform with cross-brand compatibility and real value",
        icon: "🎁",
        features: [
          "Interoperable loyalty points across brands",
          "NFT-based rewards with real utility",
          "Dynamic personalization through AI",
          "Secondary market for loyalty rewards",
          "Gamified engagement mechanics",
        ],
        benefits: [
          "Increase customer retention by 40%",
          "Create new revenue streams from loyalty programs",
          "Reduce marketing costs through targeting",
          "Build deeper customer relationships",
        ],
        realWorldExample: "Airline miles that work at any business globally",
        marketSize: "$200 Billion Loyalty Market",
        potential: "Transform customer relationships",
      },
      {
        title: "Enterprise NFT Platform",
        description:
          "Corporate NFT infrastructure for products, loyalty, authentication, and digital twins",
        icon: "🏷️",
        features: [
          "Product authentication and anti-counterfeit",
          "Digital twin creation for physical products",
          "Limited edition product drops",
          "Customer engagement and loyalty",
          "Brand storytelling and heritage tracking",
        ],
        benefits: [
          "Eliminate counterfeit products",
          "Create new revenue streams",
          "Deepen customer relationships",
          "Enable resale royalties for brands",
        ],
        realWorldExample:
          "Luxury brands verifying authenticity with permanent digital certificates",
        marketSize: "$300 Billion Luxury Goods",
        potential: "Reinvent brand-consumer relationships",
      },
      {
        title: "Business Intelligence Platform",
        description:
          "Advanced analytics and intelligence platform with blockchain data integration and predictive insights",
        icon: "📈",
        features: [
          "Real-time blockchain data analytics",
          "Cross-chain business intelligence",
          "AI-driven predictive analytics",
          "Competitive intelligence gathering",
          "Custom dashboard and visualization creation",
        ],
        benefits: [
          "Make data-driven decisions with real-time insights",
          "Identify market opportunities ahead of competitors",
          "Understand on-chain behavior patterns",
          "Measure and optimize business performance",
        ],
        realWorldExample:
          "Predict market movements before they happen with 85% accuracy",
        marketSize: "$50 Billion Business Intelligence",
        potential: "Transform business decision-making",
      },
    ],
    sustainability: [
      {
        title: "Carbon Negative Infrastructure",
        description:
          "Infrastructure that actively removes CO₂ from the atmosphere while powering the decentralized future",
        icon: "🌱",
        features: [
          "Direct air capture integration with mining",
          "Renewable energy harvesting and storage",
          "Automated reforestation and ecosystem restoration",
          "Carbon credit generation and trading",
          "Environmental impact tracking and verification",
        ],
        benefits: [
          "Actually reverse climate change while operating",
          "Generate revenue from environmental benefits",
          "Meet ESG requirements automatically",
          "Create positive environmental impact",
        ],
        realWorldExample:
          "Remove 1 million tons CO₂/year while processing transactions",
        marketSize: "$100 Billion Carbon Market",
        potential: "Reverse climate change through tech",
      },
      {
        title: "Climate Finance Platform",
        description:
          "Financial infrastructure for climate projects with carbon credits, green bonds, and impact investing",
        icon: "🌍",
        features: [
          "Carbon credit generation and verification",
          "Green bond issuance and trading",
          "Climate impact investment marketplace",
          "Environmental outcome tracking",
          "Automated climate project funding",
        ],
        benefits: [
          "Finance climate projects efficiently",
          "Verify and monetize environmental benefits",
          "Connect investors with impact opportunities",
          "Automate environmental compliance",
        ],
        realWorldExample:
          "Fund reforestation with automated carbon credit generation",
        marketSize: "$10 Trillion Climate Finance",
        potential: "Channel capital to save the planet",
      },
      {
        title: "Circular Economy Marketplace",
        description:
          "Platform enabling circular economy with material tracking, reuse incentives, and waste reduction",
        icon: "♻️",
        features: [
          "Material passport for product components",
          "Recycling incentives and rewards",
          "Waste reduction analytics and optimization",
          "Secondary material marketplace",
          "Circular design collaboration tools",
        ],
        benefits: [
          "Reduce waste by 90% through circular design",
          "Lower production costs with material reuse",
          "Create new markets for recycled materials",
          "Meet sustainability regulations automatically",
        ],
        realWorldExample:
          "Manufacturers sharing and reusing materials, reducing costs by 30%",
        marketSize: "$4.5 Trillion Circular Economy",
        potential: "Eliminate the concept of waste",
      },
      {
        title: "Renewable Energy Trading",
        description:
          "Peer-to-peer renewable energy trading with grid optimization and automated carbon credits",
        icon: "☀️",
        features: [
          "P2P trading between energy producers and consumers",
          "Renewable energy certificate creation and trading",
          "Grid stability incentives and management",
          "Energy storage optimization",
          "Carbon credit generation from clean energy",
        ],
        benefits: [
          "Maximize renewable energy utilization",
          "Reduce energy costs through direct trading",
          "Create new revenue streams from clean energy",
          "Support grid resilience and stability",
        ],
        realWorldExample:
          "Neighborhood solar network reducing power bills by 60%",
        marketSize: "$2 Trillion Renewable Energy",
        potential: "Accelerate the clean energy transition",
      },
      {
        title: "Sustainable Supply Chain Platform",
        description:
          "Complete supply chain sustainability tracking with ESG metrics, carbon footprint, and circular design",
        icon: "📊",
        features: [
          "End-to-end carbon footprint tracking",
          "ESG compliance automation",
          "Circular material flow optimization",
          "Sustainable supplier discovery and verification",
          "Consumer-facing sustainability transparency",
        ],
        benefits: [
          "Reduce carbon footprint by 50%+",
          "Automatic compliance with sustainability regulations",
          "Meet consumer demand for transparency",
          "Identify optimization opportunities",
        ],
        realWorldExample:
          "Companies reducing emissions while saving on compliance costs",
        marketSize: "$5 Trillion Sustainable Business",
        potential: "Make sustainability profitable",
      },
      {
        title: "Ocean & Biodiversity Protection",
        description:
          "Platform for funding, tracking, and verifying ocean conservation and biodiversity projects",
        icon: "🌊",
        features: [
          "Marine protected area monitoring",
          "Biodiversity credit generation and trading",
          "Ocean plastic cleanup tracking and rewards",
          "Sustainable fishing verification",
          "Coral reef restoration funding",
        ],
        benefits: [
          "Finance ocean conservation projects",
          "Verify and reward biodiversity protection",
          "Create economic incentives for conservation",
          "Connect consumers with impact initiatives",
        ],
        realWorldExample:
          "Fund coral reef restoration with verified impact tracking",
        marketSize: "$3 Trillion Ocean Economy",
        potential: "Save marine ecosystems through incentives",
      },
      {
        title: "Sustainable Development Platform",
        description:
          "Framework for funding, implementing, and verifying sustainable development projects worldwide",
        icon: "🏗️",
        features: [
          "SDG-aligned project marketplace",
          "Impact verification and reporting",
          "Outcome-based funding mechanisms",
          "Community participation and feedback",
          "Cross-border development collaboration",
        ],
        benefits: [
          "Channel funds to high-impact projects",
          "Verify development outcomes transparently",
          "Engage local communities in development",
          "Eliminate corruption in aid distribution",
        ],
        realWorldExample:
          "Fund water access projects with verified impact metrics",
        marketSize: "$500 Billion Development Aid",
        potential: "Revolutionize international development",
      },
      {
        title: "Green Building Certification",
        description:
          "Decentralized green building certification with IoT monitoring, incentives, and materials tracking",
        icon: "🏢",
        features: [
          "Automated green building certification",
          "IoT energy and resource monitoring",
          "Sustainable material verification",
          "Energy efficiency incentives",
          "Building carbon footprint tracking",
        ],
        benefits: [
          "Reduce certification costs by 90%",
          "Automate compliance with building codes",
          "Create financial incentives for green construction",
          "Enable transparent building sustainability metrics",
        ],
        realWorldExample:
          "Buildings automatically earning credits for energy efficiency",
        marketSize: "$1 Trillion Green Building",
        potential: "Transform the construction industry",
      },
      {
        title: "Conservation Financing Platform",
        description:
          "Financial infrastructure for conservation projects with impact investing, carbon credits, and community benefits",
        icon: "🌳",
        features: [
          "Conservation project marketplace",
          "Biodiversity impact measurement",
          "Community benefit sharing mechanisms",
          "Long-term conservation financing",
          "Indigenous land protection support",
        ],
        benefits: [
          "Finance conservation at unprecedented scale",
          "Ensure equitable benefit distribution",
          "Verify long-term conservation outcomes",
          "Create sustainable livelihoods through conservation",
        ],
        realWorldExample:
          "Protect rainforest while creating economic opportunities for locals",
        marketSize: "$200 Billion Conservation Finance",
        potential: "Save endangered ecosystems globally",
      },
      {
        title: "Sustainable Mobility Platform",
        description:
          "Infrastructure for sustainable transportation with EV charging, sharing economy, and carbon tracking",
        icon: "🚲",
        features: [
          "EV charging network with P2P payments",
          "Vehicle sharing and optimization",
          "Carbon-negative transportation rewards",
          "Sustainable mobility analytics",
          "Last-mile solution integration",
        ],
        benefits: [
          "Reduce transportation emissions by 80%",
          "Lower mobility costs through optimization",
          "Create incentives for sustainable choices",
          "Enable efficient multi-modal transport",
        ],
        realWorldExample:
          "Get paid to choose sustainable transportation options",
        marketSize: "$7 Trillion Transportation",
        potential: "Reinvent how humanity moves",
      },
    ],
    innovation: [
      {
        title: "Quantum Computing Network",
        description:
          "Decentralized quantum computing network with secure access, algorithm marketplace, and collaborative research",
        icon: "⚛️",
        features: [
          "Quantum computing as a service (QCaaS)",
          "Quantum-resistant cryptography",
          "Distributed quantum algorithm marketplace",
          "Quantum machine learning platform",
          "Collaborative quantum research network",
        ],
        benefits: [
          "Access quantum computing without hardware",
          "Solve previously impossible problems",
          "Monetize quantum algorithms and research",
          "Secure against quantum threats",
        ],
        realWorldExample:
          "Optimize complex supply chains with quantum algorithms",
        marketSize: "$50 Billion Quantum Computing",
        potential: "Quantum advantage for everyone",
      },
      {
        title: "AI Smart Contract Platform",
        description:
          "Revolutionary smart contracts with embedded AI for self-optimization, adaptation, and intelligence",
        icon: "🤖",
        features: [
          "Self-optimizing smart contracts",
          "Neural network integration",
          "Predictive contract execution",
          "Natural language contract creation",
          "Adaptive contract behavior",
        ],
        benefits: [
          "Contracts that improve themselves over time",
          "Eliminate smart contract vulnerabilities",
          "Create intelligent autonomous systems",
          "Enable complex conditional logic",
        ],
        realWorldExample:
          "Insurance contracts that adapt to real-world risk conditions",
        marketSize: "$100 Billion Smart Contract Market",
        potential: "Self-evolving digital agreements",
      },
      {
        title: "Autonomous AI Agents",
        description:
          "Framework for creating, deploying, and managing autonomous AI agents with blockchain-based governance",
        icon: "🦾",
        features: [
          "Autonomous agent creation and deployment",
          "Multi-agent coordination systems",
          "On-chain agent governance",
          "Economic models for agent services",
          "Agent reputation and verification",
        ],
        benefits: [
          "Deploy AI agents that work for you 24/7",
          "Create decentralized autonomous organizations",
          "Enable complex coordination between agents",
          "Monetize AI capabilities securely",
        ],
        realWorldExample:
          "AI agents managing investment portfolios autonomously",
        marketSize: "$200 Billion AI Agent Market",
        potential: "Revolution in autonomous systems",
      },
      {
        title: "Brain-Computer Interface Platform",
        description:
          "Secure platform for brain-computer interfaces with data ownership, neural marketplaces, and applications",
        icon: "🧠",
        features: [
          "Neural data ownership and privacy",
          "Thought-to-action interface protocols",
          "Neural marketplace for applications",
          "Mental health and cognitive enhancement",
          "Neural security and protection",
        ],
        benefits: [
          "Own and control your neural data",
          "Access applications with thought alone",
          "Enhance cognitive capabilities securely",
          "Enable new forms of human-computer interaction",
        ],
        realWorldExample: "Control smart home and devices with thoughts alone",
        marketSize: "$50 Billion BCI Market",
        potential: "Bridge human and digital consciousness",
      },
      {
        title: "Space Economy Platform",
        description:
          "Economic infrastructure for space exploration with asset tokenization, governance, and resource utilization",
        icon: "🚀",
        features: [
          "Space asset tokenization and investment",
          "Off-planet resource rights and utilization",
          "Interplanetary communication protocol",
          "Space mission coordination and funding",
          "Multi-planetary governance systems",
        ],
        benefits: [
          "Invest in space assets and missions",
          "Participate in space resource utilization",
          "Support space exploration and development",
          "Build economic foundations for space colonization",
        ],
        realWorldExample: "Own shares in asteroid mining operations",
        marketSize: "$1 Trillion Space Economy",
        potential: "Economic infrastructure for becoming multiplanetary",
      },
      {
        title: "Biotech Research Network",
        description:
          "Decentralized platform for biotech research, funding, collaboration, and IP management",
        icon: "🧬",
        features: [
          "Decentralized research funding and grants",
          "Collaborative research data sharing",
          "Genetic sequence ownership and licensing",
          "Clinical trial recruitment and management",
          "Biotech IP management and monetization",
        ],
        benefits: [
          "Accelerate biotech research and development",
          "Enable collaborative global research",
          "Fairly compensate data and IP contributors",
          "Democratize access to biotech advances",
        ],
        realWorldExample:
          "Crowdfunded cancer research with equitable IP sharing",
        marketSize: "$2 Trillion Biotech Market",
        potential: "Revolutionize how humanity advances medicine",
      },
      {
        title: "Human Augmentation Platform",
        description:
          "Infrastructure for human enhancement technologies with security, ethics, and accessibility",
        icon: "⚕️",
        features: [
          "Augmentation technology marketplace",
          "Enhancement data security and ownership",
          "Ethical governance frameworks",
          "Medical verification and safety standards",
          "Augmentation financing and accessibility",
        ],
        benefits: [
          "Access enhancement technologies safely",
          "Control your augmentation data",
          "Ensure ethical deployment of enhancements",
          "Democratize access to human advancement",
        ],
        realWorldExample: "Cognitive enhancement with full data ownership",
        marketSize: "$100 Billion Human Enhancement",
        potential: "Ethical framework for human evolution",
      },
      {
        title: "Digital Consciousness Platform",
        description:
          "Secure infrastructure for digital consciousness with identity continuity, rights, and governance",
        icon: "✨",
        features: [
          "Consciousness backup and storage",
          "Digital identity continuity",
          "Rights and protections framework",
          "Governance systems for digital entities",
          "Experience sharing and collaboration",
        ],
        benefits: [
          "Secure storage of consciousness data",
          "Ensure rights protection for digital entities",
          "Enable new forms of existence and collaboration",
          "Create ethical frameworks for consciousness",
        ],
        realWorldExample: "Secure storage of personality and memory patterns",
        marketSize: "$50 Billion Future Market",
        potential: "Infrastructure for the future of consciousness",
      },
      {
        title: "Holographic Internet Protocol",
        description:
          "Next-generation protocol for holographic communication, presence, and shared experiences",
        icon: "👓",
        features: [
          "Holographic presence and communication",
          "Distributed rendering and transmission",
          "Haptic feedback integration",
          "Shared experience coordination",
          "Holographic content creation tools",
        ],
        benefits: [
          "Communicate with full presence remotely",
          "Create shared holographic experiences",
          "Enable new forms of entertainment and collaboration",
          "Reduce need for physical travel",
        ],
        realWorldExample:
          "Full holographic business meetings with haptic interaction",
        marketSize: "$200 Billion Holographic Market",
        potential: "Transform human communication",
      },
      {
        title: "Synthetic Biology Platform",
        description:
          "Infrastructure for synthetic biology with design tools, safety protocols, and IP management",
        icon: "🦠",
        features: [
          "Biological design and simulation tools",
          "DNA synthesis verification and safety",
          "Biological IP registration and licensing",
          "Collaborative research and development",
          "Bioethical governance frameworks",
        ],
        benefits: [
          "Accelerate synthetic biology innovation",
          "Ensure safety and ethical compliance",
          "Enable fair compensation for bio-innovation",
          "Democratize access to biological engineering",
        ],
        realWorldExample: "Collaborative development of sustainable biofuels",
        marketSize: "$30 Billion Synthetic Biology",
        potential: "Revolutionize how we engineer life",
      },
    ],
    healthcare: [
      {
        title: "Global Health Records",
        description:
          "Universal health records system with patient control, cross-border accessibility, and privacy",
        icon: "📋",
        features: [
          "Patient-owned health records",
          "Cross-border medical data access",
          "Zero-knowledge proof sharing with providers",
          "Emergency access protocols",
          "Health data monetization options",
        ],
        benefits: [
          "Access your complete health data anywhere",
          "Share specific data with providers without privacy loss",
          "Receive emergency care with instant record access",
          "Earn from anonymized data contributions",
        ],
        realWorldExample:
          "Access your complete medical history while traveling internationally",
        marketSize: "$100 Billion Health Records Market",
        potential: "Transform global healthcare access",
      },
      {
        title: "Decentralized Telemedicine",
        description:
          "Global telemedicine platform with provider verification, payment integration, and data security",
        icon: "👨‍⚕️",
        features: [
          "Global provider network with credential verification",
          "Instant cross-border payments",
          "Secure medical data sharing",
          "AI-assisted diagnostics",
          "Decentralized provider reputation system",
        ],
        benefits: [
          "Access specialists globally without intermediaries",
          "Pay for healthcare services directly",
          "Maintain complete privacy of consultations",
          "Receive care from top providers regardless of location",
        ],
        realWorldExample:
          "Consult with specialists worldwide and pay instantly",
        marketSize: "$500 Billion Telemedicine Market",
        potential: "Healthcare without borders",
      },
      {
        title: "Medical Research Collaboration",
        description:
          "Platform for collaborative medical research with data sharing, funding, and IP management",
        icon: "🔬",
        features: [
          "Secure medical data sharing for research",
          "Collaborative research funding and grants",
          "Fair IP distribution for contributions",
          "Patient recruitment for clinical trials",
          "Research result verification and publication",
        ],
        benefits: [
          "Accelerate medical research through collaboration",
          "Enable patients to contribute data securely",
          "Ensure fair compensation for contributions",
          "Reduce research costs and duplication",
        ],
        realWorldExample:
          "Accelerate cancer research through global data sharing",
        marketSize: "$200 Billion Medical Research Market",
        potential: "Revolutionary medical breakthroughs",
      },
      {
        title: "Automated Pharmacy System",
        description:
          "Decentralized pharmacy network with prescription verification, delivery, and medication tracking",
        icon: "💊",
        features: [
          "Secure digital prescriptions",
          "Automated medication dispensing",
          "Home delivery coordination",
          "Medication tracking and authentication",
          "Personalized medication management",
        ],
        benefits: [
          "Eliminate counterfeit medications",
          "Ensure medication adherence",
          "Automatic refills and management",
          "Verify drug authenticity and sourcing",
        ],
        realWorldExample:
          "Prescription automatically filled and delivered to your door",
        marketSize: "$1.3 Trillion Pharmaceutical Market",
        potential: "Revolutionize pharmaceutical access",
      },
      {
        title: "Health Insurance Revolution",
        description:
          "Decentralized health insurance with personalized policies, instant claims, and prevention incentives",
        icon: "🛡️",
        features: [
          "Personalized insurance policy creation",
          "Automated claims processing",
          "Preventive care incentives",
          "Health data integration",
          "Cross-border coverage",
        ],
        benefits: [
          "Receive instant claim payments",
          "Pay lower premiums for healthy behaviors",
          "Customize coverage to your exact needs",
          "Maintain coverage across countries",
        ],
        realWorldExample:
          "Insurance that pays claims instantly and rewards prevention",
        marketSize: "$2 Trillion Health Insurance Market",
        potential: "Redefine health insurance globally",
      },
      {
        title: "Precision Medicine Platform",
        description:
          "Infrastructure for personalized medicine with genetic analysis, treatment matching, and outcomes tracking",
        icon: "🧬",
        features: [
          "Secure genetic data ownership and storage",
          "Personalized treatment matching",
          "Clinical trial recruitment",
          "Treatment outcome tracking",
          "Genetic research collaboration",
        ],
        benefits: [
          "Receive treatments matched to your genetics",
          "Contribute to research while maintaining data ownership",
          "Track effectiveness of personalized treatments",
          "Access cutting-edge precision therapies",
        ],
        realWorldExample:
          "Cancer treatments personalized to your genetic profile",
        marketSize: "$140 Billion Precision Medicine Market",
        potential: "Healthcare customized to individual biology",
      },
      {
        title: "Medical Device Integration",
        description:
          "Platform connecting medical devices with health records, providers, and emergency services",
        icon: "📱",
        features: [
          "IoT medical device data integration",
          "Real-time monitoring and alerts",
          "Emergency response automation",
          "Device authentication and security",
          "Preventive health insights",
        ],
        benefits: [
          "Automatic health monitoring with privacy",
          "Immediate emergency response when needed",
          "Early detection of health issues",
          "Secure sharing of device data with providers",
        ],
        realWorldExample:
          "Heart monitor that alerts emergency services automatically",
        marketSize: "$500 Billion Medical Devices Market",
        potential: "Connected healthcare ecosystem",
      },
      {
        title: "Mental Health Support Network",
        description:
          "Decentralized mental health platform with provider matching, secure therapy, and support communities",
        icon: "🧠",
        features: [
          "Anonymous therapy and counseling",
          "Therapist verification and matching",
          "Secure support communities",
          "Mental health tracking tools",
          "Crisis intervention protocols",
        ],
        benefits: [
          "Access mental health support anonymously",
          "Connect with verified therapists globally",
          "Join supportive communities securely",
          "Track and improve mental wellbeing",
        ],
        realWorldExample:
          "Access therapy anonymously from anywhere in the world",
        marketSize: "$300 Billion Mental Health Market",
        potential: "Mental healthcare for everyone",
      },
      {
        title: "Healthcare Marketplace",
        description:
          "Global marketplace for healthcare services with price transparency, quality verification, and direct payment",
        icon: "🏥",
        features: [
          "Global provider listings with verification",
          "Price transparency and comparison",
          "Quality ratings and outcome tracking",
          "Direct provider-patient payment",
          "Medical tourism facilitation",
        ],
        benefits: [
          "Compare healthcare costs transparently",
          "Access services globally at best prices",
          "Verify provider quality before treatment",
          "Pay providers directly without intermediaries",
        ],
        realWorldExample:
          "Find and book medical procedures globally at transparent prices",
        marketSize: "$8 Trillion Healthcare Services Market",
        potential: "Global healthcare marketplace",
      },
      {
        title: "Health Data Analytics Platform",
        description:
          "Secure platform for health data analytics with privacy, research applications, and population insights",
        icon: "📊",
        features: [
          "Privacy-preserving health analytics",
          "Population health insights",
          "Predictive health modeling",
          "Research collaboration tools",
          "Personalized health recommendations",
        ],
        benefits: [
          "Gain insights from health data without privacy loss",
          "Improve public health through data",
          "Enable research without exposing personal information",
          "Receive personalized health guidance",
        ],
        realWorldExample:
          "Predict disease outbreaks while preserving individual privacy",
        marketSize: "$50 Billion Health Analytics Market",
        potential: "Transform healthcare through data",
      },
    ],
    education: [
      {
        title: "Immutable Credentials Platform",
        description:
          "Universal system for educational credentials with verification, portability, and lifelong learning tracking",
        icon: "🎓",
        features: [
          "Tamper-proof academic credentials",
          "Global verification system",
          "Skill and competency certification",
          "Lifelong learning portfolio",
          "Credential sharing controls",
        ],
        benefits: [
          "Instantly verify educational credentials globally",
          "Maintain complete academic record in one place",
          "Share specific credentials with employers",
          "Eliminate credential fraud",
        ],
        realWorldExample:
          "Instantly verify degrees from any institution worldwide",
        marketSize: "$10 Trillion Education Market",
        potential: "Universal credential verification",
      },
      {
        title: "Learn-to-Earn Platform",
        description:
          "Revolutionary platform that rewards learning with tokens, opportunities, and recognition",
        icon: "💰",
        features: [
          "Skill acquisition with token rewards",
          "Knowledge verification through challenges",
          "Learning pathway customization",
          "Employer-sponsored learning incentives",
          "Knowledge contribution rewards",
        ],
        benefits: [
          "Earn while learning new skills",
          "Get rewarded for knowledge sharing",
          "Access opportunities based on verified skills",
          "Incentivize continuous education",
        ],
        realWorldExample: "Earn $5,000 while learning programming skills",
        marketSize: "$100 Billion E-Learning Market",
        potential: "Monetize learning for everyone",
      },
      {
        title: "Global Mentorship Network",
        description:
          "Platform connecting learners with mentors worldwide with verification, scheduling, and fair compensation",
        icon: "👨‍🏫",
        features: [
          "Global mentor marketplace with verification",
          "Skill-based mentor matching",
          "Direct mentor compensation",
          "Session scheduling and management",
          "Mentorship quality tracking",
        ],
        benefits: [
          "Access top mentors globally in any field",
          "Receive personalized guidance and knowledge",
          "Compensate mentors fairly for expertise",
          "Build valuable professional relationships",
        ],
        realWorldExample:
          "Learn directly from industry leaders regardless of location",
        marketSize: "$15 Billion Mentorship Market",
        potential: "Expert guidance for everyone",
      },
      {
        title: "Universal Library Access",
        description:
          "Decentralized system for accessing educational content with fair creator compensation and global availability",
        icon: "📚",
        features: [
          "Global content access with fair licensing",
          "Creator compensation through microtransactions",
          "Translation and localization automation",
          "Personalized content recommendations",
          "Collaborative annotation and discussion",
        ],
        benefits: [
          "Access educational materials from anywhere",
          "Compensate creators fairly for content use",
          "Collaborate on educational materials globally",
          "Personalize learning materials to needs",
        ],
        realWorldExample:
          "Access any textbook globally with per-page micropayments to authors",
        marketSize: "$20 Billion Educational Content Market",
        potential: "Democratize knowledge access globally",
      },
      {
        title: "Decentralized Education Marketplace",
        description:
          "Global marketplace for courses, tutoring, and educational services with quality verification",
        icon: "🛒",
        features: [
          "Course and educator verification",
          "Direct student-educator payments",
          "Quality rating and review system",
          "Personalized course recommendations",
          "Outcome tracking and guarantees",
        ],
        benefits: [
          "Access quality education regardless of location",
          "Pay educators directly without intermediaries",
          "Choose courses based on verified outcomes",
          "Learn exactly what you need efficiently",
        ],
        realWorldExample:
          "Take courses from top global educators at fair prices",
        marketSize: "$350 Billion Online Education Market",
        potential: "Education marketplace without borders",
      },
      {
        title: "Collaborative Research Platform",
        description:
          "Infrastructure for collaborative research with funding, publication, and recognition",
        icon: "🔬",
        features: [
          "Decentralized research funding",
          "Collaborative research tools",
          "Open peer review and publication",
          "Recognition and citation tracking",
          "Research data sharing and ownership",
        ],
        benefits: [
          "Fund research directly without intermediaries",
          "Collaborate globally on research projects",
          "Publish findings with transparent peer review",
          "Receive fair recognition for contributions",
        ],
        realWorldExample:
          "Crowdfund research and collaborate with global experts",
        marketSize: "$2 Trillion Research Market",
        potential: "Democratize scientific advancement",
      },
      {
        title: "Educational DAO Framework",
        description:
          "Infrastructure for creating and managing decentralized educational organizations and institutions",
        icon: "🏛️",
        features: [
          "Educational institution governance",
          "Curriculum development collaboration",
          "Teacher and student participation",
          "Resource allocation and management",
          "Credential issuance and verification",
        ],
        benefits: [
          "Create community-governed educational institutions",
          "Ensure fair resource allocation",
          "Enable democratic educational governance",
          "Build transparent, accountable institutions",
        ],
        realWorldExample:
          "Community-governed university with transparent operations",
        marketSize: "$5 Trillion Educational Institutions Market",
        potential: "Reinvent educational institutions",
      },
      {
        title: "Skill Verification Network",
        description:
          "System for verifying and certifying skills through challenges, peer assessment, and practical demonstration",
        icon: "✅",
        features: [
          "Skill verification through practical challenges",
          "Peer and expert assessment",
          "Skill credential issuance",
          "Employer skill verification",
          "Continuous skill assessment",
        ],
        benefits: [
          "Verify skills regardless of how they were acquired",
          "Demonstrate abilities to employers directly",
          "Receive recognition for self-taught skills",
          "Continuously validate and update skill profiles",
        ],
        realWorldExample:
          "Prove programming skills through verified challenges instead of degrees",
        marketSize: "$100 Billion Skills Assessment Market",
        potential: "Skills-based global economy",
      },
      {
        title: "Educational Funding Platform",
        description:
          "Platform for funding education through scholarships, income share agreements, and crowdfunding",
        icon: "💵",
        features: [
          "Scholarship marketplace and matching",
          "Income share agreement infrastructure",
          "Educational crowdfunding tools",
          "Outcome-based funding models",
          "Educational loan alternatives",
        ],
        benefits: [
          "Access education funding based on potential",
          "Fund education without traditional loans",
          "Connect directly with educational sponsors",
          "Pay for education based on outcomes",
        ],
        realWorldExample:
          "Fund education through future earnings instead of debt",
        marketSize: "$200 Billion Education Financing Market",
        potential: "Education without financial barriers",
      },
      {
        title: "Lifelong Learning Passport",
        description:
          "Comprehensive system for tracking learning, skills, and achievements throughout life",
        icon: "🗺️",
        features: [
          "Lifelong learning record",
          "Skill acquisition tracking",
          "Achievement verification",
          "Learning recommendation engine",
          "Personal growth analytics",
        ],
        benefits: [
          "Maintain complete record of learning and skills",
          "Receive personalized learning recommendations",
          "Track and showcase continuous development",
          "Identify skill gaps and opportunities",
        ],
        realWorldExample:
          "Comprehensive learning record with personalized recommendations",
        marketSize: "$500 Billion Lifelong Learning Market",
        potential: "Learning optimization for everyone",
      },
    ],
    governance: [
      {
        title: "Secure Voting Infrastructure",
        description:
          "Tamper-proof voting system with privacy, verification, and universal accessibility",
        icon: "🗳️",
        features: [
          "Anonymous yet verifiable voting",
          "Tamper-proof election results",
          "Universal voter access with identity verification",
          "Real-time tallying and transparency",
          "Multi-level governance support",
        ],
        benefits: [
          "Eliminate election fraud and manipulation",
          "Verify your vote was counted correctly",
          "Participate in governance from anywhere",
          "Increase trust in democratic processes",
        ],
        realWorldExample:
          "National elections with 100% verifiable results and zero fraud",
        marketSize: "$50 Billion Election Systems Market",
        potential: "Incorruptible democracy globally",
      },
      {
        title: "Participatory Budgeting Platform",
        description:
          "System for community decision-making on budget allocation with transparency and accountability",
        icon: "💼",
        features: [
          "Transparent budget proposal and voting",
          "Real-time fund allocation tracking",
          "Impact measurement and reporting",
          "Community feedback mechanisms",
          "Automated fund distribution",
        ],
        benefits: [
          "Direct say in how community funds are spent",
          "Complete transparency in budget allocation",
          "Accountability for fund usage",
          "Community-driven priority setting",
        ],
        realWorldExample:
          "Citizens directly deciding how city infrastructure budget is spent",
        marketSize: "$20 Trillion Government Spending",
        potential: "Democratic control of public resources",
      },
      {
        title: "Transparent Government Spending",
        description:
          "Complete tracking system for government expenditures with real-time visibility and auditing",
        icon: "📈",
        features: [
          "Real-time government spending tracking",
          "Public fund flow visualization",
          "Automated auditing and compliance",
          "Contract and procurement transparency",
          "Performance metrics for spending",
        ],
        benefits: [
          "Complete visibility into government spending",
          "Eliminate corruption and misuse of funds",
          "Hold officials accountable for expenditures",
          "Optimize public resource allocation",
        ],
        realWorldExample:
          "Track every dollar of government spending in real-time",
        marketSize: "$30 Trillion Government Expenditures",
        potential: "Eliminate government corruption",
      },
      {
        title: "Sovereign Digital Identity",
        description:
          "Self-sovereign identity system for citizens with privacy, security, and government service integration",
        icon: "🪪",
        features: [
          "Self-sovereign citizen identity",
          "Privacy-preserving credential sharing",
          "Government service integration",
          "Cross-border identity recognition",
          "Identity recovery mechanisms",
        ],
        benefits: [
          "Control your own identity and data",
          "Access government services seamlessly",
          "Maintain privacy while verifying identity",
          "Use one identity across borders",
        ],
        realWorldExample:
          "Access all government services with self-controlled digital ID",
        marketSize: "$15 Billion Digital Identity Market",
        potential: "Digital citizenship for everyone",
      },
      {
        title: "Policy Development Platform",
        description:
          "Collaborative platform for creating, debating, and refining policy with expert and citizen input",
        icon: "📝",
        features: [
          "Collaborative policy drafting tools",
          "Expert and citizen input mechanisms",
          "Impact assessment and modeling",
          "Policy versioning and tracking",
          "Implementation monitoring",
        ],
        benefits: [
          "Participate directly in policy development",
          "Access expertise in policy creation",
          "Understand potential policy impacts",
          "Hold lawmakers accountable for implementation",
        ],
        realWorldExample:
          "Citizens and experts collaborating on environmental policy",
        marketSize: "$10 Billion Policy Development Market",
        potential: "Crowdsourced governance",
      },
      {
        title: "Government Service Automation",
        description:
          "Infrastructure for automating government services with efficiency, accessibility, and personalization",
        icon: "⚙️",
        features: [
          "Automated permit and license issuance",
          "Paperless documentation management",
          "Service eligibility determination",
          "Cross-department service integration",
          "Personalized citizen service portals",
        ],
        benefits: [
          "Access government services instantly 24/7",
          "Eliminate bureaucracy and waiting times",
          "Reduce costs of government operations",
          "Personalize services to individual needs",
        ],
        realWorldExample:
          "Business permits issued automatically in minutes instead of months",
        marketSize: "$5 Trillion Government Services Market",
        potential: "Efficient, responsive governance",
      },
      {
        title: "Civic Engagement Platform",
        description:
          "System for connecting citizens with governance through feedback, participation, and collaboration",
        icon: "🤝",
        features: [
          "Issue reporting and tracking",
          "Public consultation management",
          "Citizen proposal submission",
          "Community organization tools",
          "Representative communication channels",
        ],
        benefits: [
          "Direct communication with representatives",
          "Track response to community issues",
          "Collaborate on local problem-solving",
          "Increase accountability of officials",
        ],
        realWorldExample:
          "Report local issues and track resolution progress transparently",
        marketSize: "$10 Billion Civic Tech Market",
        potential: "Connected, responsive communities",
      },
      {
        title: "Legal System Automation",
        description:
          "Platform for streamlining legal processes with case management, document automation, and dispute resolution",
        icon: "⚖️",
        features: [
          "Smart contract legal frameworks",
          "Automated document preparation",
          "Case tracking and management",
          "Alternative dispute resolution",
          "Legal compliance automation",
        ],
        benefits: [
          "Access legal services affordably",
          "Resolve disputes efficiently",
          "Automate routine legal processes",
          "Increase transparency in legal system",
        ],
        realWorldExample:
          "Resolve commercial disputes in days instead of years",
        marketSize: "$800 Billion Legal Services Market",
        potential: "Justice system transformation",
      },
      {
        title: "Decentralized Autonomous Cities",
        description:
          "Framework for city governance through decentralized autonomous organizations with citizen control",
        icon: "🏙️",
        features: [
          "City service management DAO",
          "Citizen voting and proposal systems",
          "Resource allocation optimization",
          "Transparent operations and financials",
          "Cross-department coordination",
        ],
        benefits: [
          "Direct citizen control of city management",
          "Efficient resource allocation through data",
          "Transparent city operations",
          "Responsive urban governance",
        ],
        realWorldExample:
          "Smart city with services managed by citizen governance",
        marketSize: "$10 Trillion Urban Governance Market",
        potential: "Reinvent how cities function",
      },
      {
        title: "Global Governance Framework",
        description:
          "Infrastructure for global coordination on shared challenges with fair representation and transparency",
        icon: "🌍",
        features: [
          "Global issue coordination system",
          "Fair representation mechanisms",
          "Cross-border policy alignment",
          "International resource management",
          "Global public goods governance",
        ],
        benefits: [
          "Address global challenges collectively",
          "Ensure fair representation in global decisions",
          "Coordinate cross-border policies efficiently",
          "Manage shared resources sustainably",
        ],
        realWorldExample:
          "Coordinated climate action with fair contribution mechanisms",
        marketSize: "$100 Trillion Global Governance Impact",
        potential: "Effective governance for global challenges",
      },
    ],
    agriculture: [
      {
        title: "Farm-to-Table Traceability",
        description:
          "Complete food supply chain tracking from farm to consumer with quality verification and transparency",
        icon: "🧑‍🌾",
        features: [
          "End-to-end food product tracking",
          "Quality verification through IoT sensors",
          "Automated fair payment to farmers",
          "Consumer transparency through QR codes",
          "Sustainability metrics and certification",
        ],
        benefits: [
          "Verify food quality and origin instantly",
          "Ensure fair compensation to producers",
          "Eliminate middleman markups",
          "Make informed consumption choices",
        ],
        realWorldExample:
          "Scan a code to see the exact farm where your vegetables were grown",
        marketSize: "$8 Trillion Food Industry",
        potential: "Transparent global food systems",
      },
      {
        title: "Direct Producer Marketplace",
        description:
          "Platform connecting farmers directly with consumers for fair pricing, quality products, and local sourcing",
        icon: "🛒",
        features: [
          "Producer-consumer direct connection",
          "Fair price discovery mechanisms",
          "Quality verification and reviews",
          "Local food hub coordination",
          "Group buying and logistics optimization",
        ],
        benefits: [
          "Farmers receive fair prices for produce",
          "Consumers access fresher food at better prices",
          "Reduce food miles and environmental impact",
          "Support local agricultural communities",
        ],
        realWorldExample:
          "Buy directly from farmers at 40% lower than retail prices",
        marketSize: "$1 Trillion Direct-to-Consumer Market",
        potential: "Disintermediate global food supply",
      },
      {
        title: "Parametric Crop Insurance",
        description:
          "Automated insurance for farmers with instant payouts based on weather data and crop conditions",
        icon: "🌧️",
        features: [
          "Weather-based automatic claim payouts",
          "Satellite and IoT crop monitoring",
          "Microinsurance for small farmers",
          "Peer-to-peer risk sharing pools",
          "Premium financing options",
        ],
        benefits: [
          "Instant payouts during adverse weather events",
          "No paperwork or claims process required",
          "Affordable coverage for small farmers",
          "Financial stability despite climate uncertainty",
        ],
        realWorldExample:
          "Farmers receive automatic payments during drought conditions",
        marketSize: "$200 Billion Agricultural Insurance Market",
        potential: "Financial stability for global agriculture",
      },
      {
        title: "Resource Optimization Platform",
        description:
          "AI-driven platform for optimizing farm resources including water, fertilizer, energy, and labor",
        icon: "💧",
        features: [
          "Precision irrigation management",
          "Fertilizer optimization through soil sensing",
          "Energy usage monitoring and efficiency",
          "Labor allocation and task optimization",
          "Machine learning crop recommendations",
        ],
        benefits: [
          "Reduce water usage by 40% through precision",
          "Minimize fertilizer costs and environmental impact",
          "Optimize energy consumption on farm",
          "Maximize yield while minimizing inputs",
        ],
        realWorldExample:
          "Increase crop yields by 30% while using 50% less water",
        marketSize: "$150 Billion Precision Agriculture Market",
        potential: "Sustainable intensification of agriculture",
      },
      {
        title: "Agricultural Data Marketplace",
        description:
          "Platform for monetizing and sharing agricultural data with privacy, ownership, and fair compensation",
        icon: "📊",
        features: [
          "Farm data ownership and control",
          "Anonymized data sharing and monetization",
          "Agricultural insights marketplace",
          "Research collaboration opportunities",
          "Data-backed financing options",
        ],
        benefits: [
          "Earn revenue from farm data",
          "Access insights from aggregated data",
          "Maintain control over sensitive information",
          "Collaborate on agricultural research",
        ],
        realWorldExample:
          "Farmers earning $5,000/year from anonymized farm data",
        marketSize: "$10 Billion Agricultural Data Market",
        potential: "Data-driven agricultural revolution",
      },
      {
        title: "Collaborative Equipment Network",
        description:
          "System for sharing, managing, and optimizing agricultural equipment usage across farms",
        icon: "🚜",
        features: [
          "Equipment sharing marketplace",
          "Automated scheduling and logistics",
          "Usage-based payment systems",
          "Maintenance tracking and alerts",
          "Optimal equipment routing",
        ],
        benefits: [
          "Access equipment without capital investment",
          "Maximize equipment utilization efficiency",
          "Reduce overall capital requirements",
          "Access modern technology at lower cost",
        ],
        realWorldExample:
          "Small farms accessing advanced harvesting equipment through sharing",
        marketSize: "$150 Billion Farm Equipment Market",
        potential: "Democratize access to agricultural technology",
      },
      {
        title: "Regenerative Agriculture Certification",
        description:
          "Verification system for regenerative agriculture practices with incentives and market premiums",
        icon: "🌱",
        features: [
          "Practice verification and certification",
          "Carbon sequestration measurement",
          "Biodiversity impact assessment",
          "Soil health tracking over time",
          "Premium market access for certified farms",
        ],
        benefits: [
          "Earn premiums for sustainable practices",
          "Access carbon credit markets",
          "Verify environmental benefits of farming",
          "Connect with conscious consumers",
        ],
        realWorldExample:
          "Farmers earning 30% premium plus carbon credits for regenerative practices",
        marketSize: "$50 Billion Sustainable Agriculture Market",
        potential: "Transform agriculture into carbon sink",
      },
      {
        title: "Agricultural Knowledge Network",
        description:
          "Platform for sharing farming knowledge, techniques, and innovations across global communities",
        icon: "🧠",
        features: [
          "Peer-to-peer knowledge sharing",
          "Localized technique adaptation",
          "Traditional knowledge preservation",
          "Translation and cultural context",
          "Practical training and verification",
        ],
        benefits: [
          "Access global agricultural knowledge",
          "Preserve and share traditional farming wisdom",
          "Adapt techniques to local conditions",
          "Accelerate adoption of innovations",
        ],
        realWorldExample:
          "Small farmers increasing yields through indigenous techniques shared globally",
        marketSize: "$20 Billion Agricultural Education Market",
        potential: "Global democratization of farming knowledge",
      },
      {
        title: "Smart Farming Infrastructure",
        description:
          "Complete smart farming ecosystem with IoT sensors, automation, and management systems",
        icon: "📡",
        features: [
          "IoT sensor networks for farms",
          "Automated irrigation and feeding systems",
          "Drone and robot integration",
          "Climate-controlled environments",
          "Centralized farm management dashboard",
        ],
        benefits: [
          "Automate routine farming operations",
          "Monitor all aspects of farm in real-time",
          "Make data-driven farming decisions",
          "Reduce labor requirements while improving outcomes",
        ],
        realWorldExample: "Fully automated farm management from smartphone app",
        marketSize: "$100 Billion Smart Agriculture Market",
        potential: "Digitize and automate global agriculture",
      },
      {
        title: "Agricultural Financing Platform",
        description:
          "Alternative financing for farmers with harvest-based repayment, risk sharing, and fair terms",
        icon: "💰",
        features: [
          "Harvest-based loan repayment",
          "Crowdfunded farm financing",
          "Risk-sharing investment models",
          "Equipment leasing and financing",
          "Microfinance for small producers",
        ],
        benefits: [
          "Access capital without traditional collateral",
          "Align repayment with harvest cycles",
          "Share risk with investors rather than bear it alone",
          "Finance equipment through use rather than ownership",
        ],
        realWorldExample:
          "Farmers accessing financing repaid only after successful harvest",
        marketSize: "$300 Billion Agricultural Finance Market",
        potential: "Financial inclusion for global farmers",
      },
    ],
    space: [
      {
        title: "Interplanetary Economy",
        description:
          "Economic infrastructure for commerce between Earth, Moon, Mars, and beyond with currency and contracts",
        icon: "🚀",
        features: [
          "Interplanetary transaction settlement",
          "Cross-planetary smart contracts",
          "Light-speed optimized consensus",
          "Resource rights management",
          "Autonomous space commerce",
        ],
        benefits: [
          "Conduct business across planetary boundaries",
          "Manage resources and rights in space",
          "Enable autonomous space commerce",
          "Create foundation for space colonization",
        ],
        realWorldExample:
          "Lunar mining operation selling resources to Mars colony",
        marketSize: "$1 Trillion Future Space Economy",
        potential: "Economic infrastructure for becoming multiplanetary",
      },
      {
        title: "Asteroid Mining Tokenization",
        description:
          "Platform for funding, managing, and trading asteroid mining operations with resource rights",
        icon: "☄️",
        features: [
          "Asteroid ownership and rights tokenization",
          "Mining operation investment platform",
          "Resource trading marketplace",
          "Automated profit distribution",
          "Mining operation management",
        ],
        benefits: [
          "Invest in space resources without being SpaceX",
          "Trade future resource rights",
          "Participate in space mining economy",
          "Receive automated profits from operations",
        ],
        realWorldExample:
          "Own shares in asteroid mining worth billions in resources",
        marketSize: "$100 Trillion Asteroid Resources",
        potential: "Unlock space resources for humanity",
      },
      {
        title: "Quantum Space Communication",
        description:
          "Ultra-secure, low-latency communication protocol for space operations and interplanetary internet",
        icon: "📡",
        features: [
          "Quantum-secured communication channels",
          "Latency-optimized data transmission",
          "Interplanetary mesh network",
          "Automated communication relays",
          "Data compression and prioritization",
        ],
        benefits: [
          "Secure communications across space",
          "Minimize communication delays between planets",
          "Enable autonomous space operations",
          "Create interplanetary internet infrastructure",
        ],
        realWorldExample:
          "Near-instant secure communication between Earth and Mars",
        marketSize: "$50 Billion Space Communication Market",
        potential: "Connect the solar system",
      },
      {
        title: "Space Governance DAOs",
        description:
          "Decentralized governance systems for space operations, colonies, and resource management",
        icon: "🏛️",
        features: [
          "Space colony governance framework",
          "Resource allocation systems",
          "Dispute resolution mechanisms",
          "Interplanetary cooperation protocols",
          "Space law enforcement",
        ],
        benefits: [
          "Self-governance for space settlements",
          "Fair resource allocation in space",
          "Peaceful dispute resolution framework",
          "Coordinate across space settlements",
        ],
        realWorldExample:
          "Mars colony self-governing through decentralized consensus",
        marketSize: "$10 Trillion Future Space Governance",
        potential: "Governance framework for space civilization",
      },
      {
        title: "Space Mission Funding Platform",
        description:
          "Decentralized platform for funding space missions through crowdfunding, investment, and grants",
        icon: "💸",
        features: [
          "Mission crowdfunding infrastructure",
          "Investment tokenization for space ventures",
          "Mission milestone tracking",
          "Return distribution mechanisms",
          "Collaboration tools for mission planning",
        ],
        benefits: [
          "Fund space missions without government/billionaires",
          "Invest in space ventures with any budget",
          "Track mission progress transparently",
          "Collaborate on mission development",
        ],
        realWorldExample:
          "Crowdfunded satellite mission with tokenized ownership",
        marketSize: "$500 Billion Space Mission Market",
        potential: "Democratize access to space",
      },
      {
        title: "Orbital Asset Management",
        description:
          "System for tracking, managing, and coordinating assets in Earth orbit with collision avoidance",
        icon: "🛰️",
        features: [
          "Satellite tracking and management",
          "Collision avoidance coordination",
          "Orbital slot rights marketplace",
          "Space debris monitoring",
          "Satellite service coordination",
        ],
        benefits: [
          "Prevent orbital collisions automatically",
          "Manage orbital assets efficiently",
          "Trade orbital rights and access",
          "Coordinate satellite services",
        ],
        realWorldExample:
          "Automated collision avoidance for thousands of satellites",
        marketSize: "$300 Billion Satellite Market",
        potential: "Sustainable management of Earth orbit",
      },
      {
        title: "Space Research Collaboration",
        description:
          "Platform for collaborative space research with funding, data sharing, and credit attribution",
        icon: "🔭",
        features: [
          "Research funding and grants",
          "Space data sharing infrastructure",
          "Collaborative research tools",
          "Credit and recognition systems",
          "Research outcome commercialization",
        ],
        benefits: [
          "Access space research funding",
          "Collaborate across organizations globally",
          "Share and access space research data",
          "Receive recognition for contributions",
        ],
        realWorldExample:
          "Global collaborative research analyzing Mars soil samples",
        marketSize: "$100 Billion Space Research Market",
        potential: "Accelerate space science advancement",
      },
      {
        title: "Space Tourism Platform",
        description:
          "Marketplace for space tourism experiences with bookings, training, and experience sharing",
        icon: "🧑‍🚀",
        features: [
          "Space flight booking and management",
          "Training program coordination",
          "Experience tokenization and trading",
          "Space tourism insurance",
          "Experience sharing and community",
        ],
        benefits: [
          "Book and prepare for space tourism",
          "Trade space tourism reservations",
          "Access comprehensive training",
          "Share experiences with community",
        ],
        realWorldExample:
          "Book suborbital flights with transferable reservations",
        marketSize: "$50 Billion Space Tourism Market",
        potential: "Make space accessible to everyone",
      },
      {
        title: "Space Manufacturing Network",
        description:
          "Infrastructure for coordinating, operating, and monetizing manufacturing in space environments",
        icon: "🏭",
        features: [
          "Space manufacturing coordination",
          "Microgravity production management",
          "Product specification and ordering",
          "Earth-to-space logistics",
          "Manufacturing rights and licensing",
        ],
        benefits: [
          "Access unique space manufacturing capabilities",
          "Produce materials impossible on Earth",
          "Coordinate complex space production",
          "Manage space manufacturing intellectual property",
        ],
        realWorldExample:
          "Order custom pharmaceuticals made in orbital zero-gravity",
        marketSize: "$200 Billion Space Manufacturing Potential",
        potential: "Industrial revolution in space",
      },
      {
        title: "Deep Space Exploration DAO",
        description:
          "Decentralized organization for funding, managing, and conducting deep space exploration missions",
        icon: "🌌",
        features: [
          "Mission planning and management",
          "Decentralized funding mechanisms",
          "Scientific objective setting",
          "Data collection and analysis",
          "Discovery rights and recognition",
        ],
        benefits: [
          "Participate in deep space exploration",
          "Fund missions aligned with your interests",
          "Access data from exploration missions",
          "Receive recognition for contributions",
        ],
        realWorldExample: "Community-funded mission to explore Saturn's moons",
        marketSize: "$100 Billion Deep Space Exploration Market",
        potential: "Democratize solar system exploration",
      },
    ],
  };

  return (
    <div className="use-cases-page">
      {/* Hero Section */}
      <section className="use-cases-hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Infinite Possibilities,{" "}
            <span className="highlight">Zero Limitations</span>
          </h1>
          <p className="hero-subtitle">
            Explore 111+ revolutionary use cases across all industries.
            HyperLayer0 is rebuilding the foundations of human civilization with
            Pure Utility.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">111+</div>
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
                className={`category-tab ${
                  activeCategory === category.id ? "active" : ""
                } ${category.color}`}
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
                  <button className="explore-button">Explore Details →</button>
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
              <button className="close-button" onClick={closeModal}>
                ✕
              </button>
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
                  <h4>💰 Benefits</h4>
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
                    <div className="stat-value">
                      {selectedUseCase.marketSize}
                    </div>
                  </div>
                )}

                {selectedUseCase.potential && (
                  <div className="modal-stat">
                    <div className="stat-label">Potential Impact</div>
                    <div className="stat-value">
                      {selectedUseCase.potential}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="primary-button large scroll-enabled"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Optional: Explicitly enable scrolling if needed
                  document.body.style.overflow = "auto";

                  const event = new CustomEvent("navigate", { detail: "home" });
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
          <h2>Join the Revolution</h2>
          <p>
            HyperLayer0 is building the foundation for the next era of human
            civilization. Be part of the movement that will transform how the
            world works.
          </p>
          <div className="cta-buttons">
            <button className="primary-button large">Join Presale</button>
            <button className="secondary-button large">Read Whitepaper</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
