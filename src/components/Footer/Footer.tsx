import React, { useState } from 'react';
import { X, FileText, Shield, Cookie, Download, Search, BookOpen, ChevronRight, Copy, Check } from 'lucide-react';

const Footer = () => {
  const [activeDocument, setActiveDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
  const currentYear = new Date().getFullYear();

  const handleNavigate = (page) => {
    const event = new CustomEvent('navigate', { detail: page });
    window.dispatchEvent(event);
  };

  // Função para copiar código
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Dados dos documentos legais realistas
  const documents = {
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      lastUpdated: 'July 14, 2025',
      description: 'How we collect, use, and protect your personal data on the HyperLayer0 platform',
      sections: [
        {
          id: 'intro',
          title: '1. Introduction',
          content: 'HyperLayer0 ("we", "our", "company") is committed to protecting the privacy and personal data of users of our blockchain platform and related services. This Privacy Policy describes how we collect, use, store, and protect your personal information in accordance with applicable data protection laws.'
        },
        {
          id: 'data-collection',
          title: '2. Information We Collect',
          content: 'We collect registration data (name, email, contact information), identity verification data for regulatory compliance, communication data, blockchain transaction data, platform usage analytics, technical data (IP address, browser type, device information), and system logs for security and performance monitoring.'
        },
        {
          id: 'data-usage',
          title: '3. How We Use Your Information',
          content: 'We use your information to: operate the HyperLayer0 platform, process blockchain transactions, maintain security and system integrity, provide customer support, comply with legal and regulatory requirements, prevent fraud and abuse, verify user identity for KYC/AML purposes, analyze platform performance, and improve our services.'
        },
        {
          id: 'data-sharing',
          title: '4. Information Sharing',
          content: 'We share information only with: authorized service providers under strict confidentiality agreements, regulatory authorities when required by law, verified partners with your explicit consent, and legal successors in case of merger or acquisition. We follow data minimization principles and use anonymization techniques when possible.'
        },
        {
          id: 'data-security',
          title: '5. Data Security',
          content: 'We implement industry-standard security measures including: encryption for data in transit and at rest, multi-factor authentication systems, secure and monitored infrastructure, regular security audits, employee training on data protection, role-based access controls, and incident response procedures.'
        },
        {
          id: 'user-rights',
          title: '6. Your Rights',
          content: 'Under applicable data protection laws, you have the right to: access your personal data, correct inaccurate information, request deletion of your data, data portability, withdraw consent, object to certain processing, request processing limitations, and receive transparent information about our data processing activities.'
        },
        {
          id: 'blockchain-privacy',
          title: '7. Blockchain and Privacy',
          content: 'Blockchain technology has unique characteristics including immutability, transparency, and decentralization. We implement privacy protections through: separation of personal data from blockchain records, use of cryptographic hashing, privacy-enhancing technologies, and granular access controls where technically feasible.'
        },
        {
          id: 'contact',
          title: '8. Contact Information',
          content: 'For privacy-related inquiries, please contact us at: hyperlayer0@gmail.com. You also have the right to file a complaint with the relevant data protection authority in your jurisdiction if you believe your privacy rights have been violated.'
        }
      ]
    },
    terms: {
      id: 'terms',
      title: 'Terms of Service',
      icon: FileText,
      lastUpdated: 'July 14, 2025',
      description: 'Terms and conditions for using the HyperLayer0 platform and blockchain services',
      sections: [
        {
          id: 'acceptance',
          title: '1. Acceptance of Terms',
          content: 'By accessing or using HyperLayer0 services, you agree to comply with and be bound by these Terms of Service. If you do not agree with these Terms, please do not use our platform or services.'
        },
        {
          id: 'services',
          title: '2. Service Description',
          content: 'HyperLayer0 provides: blockchain infrastructure services, smart contract development and deployment tools, APIs and SDKs for developers, cross-chain connectivity solutions, staking and governance platforms, and related blockchain services. Our services are designed to be interoperable with existing blockchain networks.'
        },
        {
          id: 'eligibility',
          title: '3. Eligibility and Registration',
          content: 'To use our services, you must: be at least 18 years old, have legal capacity to enter into contracts, comply with all applicable laws in your jurisdiction, and not be listed on any prohibited persons lists. Registration requires accurate information and may include identity verification for regulatory compliance.'
        },
        {
          id: 'acceptable-use',
          title: '4. Acceptable Use',
          content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. Prohibited activities include: illegal activities, fraud or deception, security violations, spam or unsolicited communications, market manipulation, money laundering, distribution of harmful content, and attempts to damage or disrupt our systems.'
        },
        {
          id: 'transactions',
          title: '5. Transactions and Fees',
          content: 'Blockchain transactions are generally irreversible once confirmed. Our current fee structure includes: network transaction fees, premium service fees, and staking rewards. Users are responsible for: verifying transaction details, maintaining secure access to their accounts, and understanding the risks associated with blockchain technology.'
        },
        {
          id: 'intellectual-property',
          title: '6. Intellectual Property',
          content: 'HyperLayer0 retains ownership of our platform, software, technology, trademarks, and documentation. Users receive a limited license to use our services and maintain ownership of content they create. All users must respect third-party intellectual property rights.'
        },
        {
          id: 'security',
          title: '7. Security and Responsibilities',
          content: 'We implement security best practices, continuous monitoring, and incident response procedures. Users are responsible for: using secure practices, protecting their account credentials, keeping software updated, and reporting security vulnerabilities. We cannot guarantee absolute security and users assume certain risks.'
        },
        {
          id: 'termination',
          title: '8. Suspension and Termination',
          content: 'We may suspend or terminate accounts for: violation of these Terms, suspicious or fraudulent activity, regulatory requirements, or to protect the platform. Users may close their accounts at any time while maintaining responsibility for any outstanding obligations.'
        },
        {
          id: 'compliance',
          title: '9. Regulatory Compliance',
          content: 'We strive to comply with applicable laws and regulations in jurisdictions where we operate. This includes implementing Know Your Customer (KYC) and Anti-Money Laundering (AML) procedures where required. We may adjust our services to comply with changing regulatory requirements.'
        },
        {
          id: 'contact',
          title: '10. Contact Information',
          content: 'For questions about these Terms of Service, please contact us at: hyperlayer0@gmail.com. For legal matters: hyperlayer0@gmail.com. For compliance-related inquiries: hyperlayer0@gmail.com'
        }
      ]
    },
    documentation: {
      id: 'documentation',
      title: 'Technical Documentation',
      icon: BookOpen,
      lastUpdated: 'July 14, 2025',
      description: 'Complete technical documentation for developers and integrators',
      sections: [
        {
          id: 'introduction',
          title: '1. Introduction',
          content: 'HyperLayer0 is a Layer 0 blockchain infrastructure designed to provide efficient cross-chain connectivity and scalable transaction processing. This documentation provides comprehensive technical guidance for developers, enterprises, and integrators looking to build on our platform.',
          code: `// Core Features
- Layer 0 Architecture: Base layer blockchain infrastructure
- Cross-Chain Connectivity: Universal bridge protocol
- Scalable Processing: Up to 100,000 TPS capacity
- Fixed Fee Model: Predictable $0.00001 transaction cost
- EVM Compatibility: Standard smart contract support

// System Requirements
- Node.js: 16.x or later
- Memory: 8GB RAM minimum
- Storage: 500GB SSD recommended
- Network: Stable internet connection`
        },
        {
          id: 'getting-started',
          title: '2. Getting Started',
          content: 'Begin developing with HyperLayer0 by setting up your development environment and connecting to our testnet. Our SDK provides familiar interfaces for developers coming from other blockchain platforms.',
          code: `# Install HyperLayer0 SDK
npm install @hyperlayer0/sdk

# Initialize new project
npx create-hl0-app my-project

# Basic connection setup
import { HyperLayer0 } from '@hyperlayer0/sdk';

const hl0 = new HyperLayer0({
  network: 'testnet',
  rpcUrl: 'https://testnet-rpc.hyperlayer0.io'
});

// Send transaction
const tx = await hl0.sendTransaction({
  to: '0x742d35Cc6634C0532925a3b8D93C68c34C1b7e3E',
  value: hl0.utils.parseHL0('1.0')
});`
        },
        {
          id: 'api-reference',
          title: '3. API Reference',
          content: 'Complete API documentation for HyperLayer0 SDK. The API follows standard patterns familiar to Ethereum developers while adding Layer 0 specific functionality.',
          code: `// SDK Initialization
const hl0 = new HyperLayer0({
  network: 'mainnet', // or 'testnet'
  rpcUrl: 'https://rpc.hyperlayer0.io'
});

// Account Operations
const balance = await hl0.getBalance(address);
const nonce = await hl0.getTransactionCount(address);

// Transaction Operations
const tx = await hl0.sendTransaction({
  to: recipientAddress,
  value: amount,
  gasLimit: 21000
});

// Smart Contract Interaction
const contract = new hl0.Contract(contractAddress, abi);
const result = await contract.methods.methodName().call();`
        },
        {
          id: 'smart-contracts',
          title: '4. Smart Contracts',
          content: 'Deploy and interact with smart contracts on HyperLayer0. Our platform supports standard Solidity contracts with enhanced features for cross-chain functionality.',
          code: `// Standard Solidity contract
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
    
    // Cross-chain transfer function
    function crossChainTransfer(
        address to,
        uint256 amount,
        uint256 targetChain
    ) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        emit CrossChainTransfer(msg.sender, to, amount, targetChain);
    }
}`
        },
        {
          id: 'security',
          title: '5. Security Best Practices',
          content: 'Security guidelines for developing on HyperLayer0, including smart contract security, key management, and operational security practices.',
          code: `// Security checklist
- Use established patterns and libraries
- Implement proper access controls
- Validate all inputs and parameters
- Use secure random number generation
- Implement emergency pause mechanisms
- Regular security audits and testing

// Key management best practices
- Never hardcode private keys
- Use environment variables for sensitive data
- Implement multi-signature for critical operations
- Regular key rotation where appropriate`
        },
        {
          id: 'deployment',
          title: '6. Deployment Guide',
          content: 'Deploy your applications to HyperLayer0 testnet and mainnet. This guide covers build optimization, deployment strategies, and monitoring setup.',
          code: `# Build and deploy process
npx hardhat compile
npx hardhat test
npx hardhat deploy --network hyperlayer0-testnet

# Verify contract
npx hardhat verify --network hyperlayer0-testnet CONTRACT_ADDRESS

# Production deployment configuration
module.exports = {
  networks: {
    'hyperlayer0-mainnet': {
      url: 'https://rpc.hyperlayer0.io',
      gasPrice: 1000000000,
      gasLimit: 8000000
    }
  }
};`
        },
        {
          id: 'support',
          title: '7. Support & Resources',
          content: 'Get help from our community and access professional support resources for HyperLayer0 development.',
          code: `// Community Resources
- Discord: https://discord.gg/hyperlayer0
- Telegram: https://t.me/hyperlayer0
- GitHub: https://github.com/hyperlayer0
- Email: hyperlayer0@gmail.com

// Professional Support
- Technical support for enterprise customers
- Developer workshops and training
- Custom integration assistance
- Priority support channels`
        }
      ]
    },
    whitepaper: {
      id: 'whitepaper',
      title: 'Technical Whitepaper',
      icon: FileText,
      lastUpdated: 'July 14, 2025',
      description: 'Technical whitepaper for HyperLayer0 Layer 0 blockchain infrastructure',
      sections: [
        {
          id: 'abstract',
          title: 'Abstract',
          content: 'HyperLayer0 presents a Layer 0 blockchain infrastructure designed to address scalability and interoperability challenges in the current blockchain ecosystem. Through optimized consensus mechanisms, efficient cross-chain protocols, and sustainable tokenomics, HyperLayer0 provides a practical foundation for next-generation decentralized applications.',
          code: `Technical Specifications:
• Transaction Throughput: Up to 100,000 TPS
• Block Time: 2 seconds
• Finality: 6 seconds (3 block confirmations)
• Cross-Chain Support: Ethereum, Bitcoin, Polygon, BSC
• Consensus: Delegated Proof of Stake (DPoS)
• Smart Contract VM: EVM-compatible
• Network Fees: Fixed $0.00001 per transaction`
        },
        {
          id: 'introduction',
          title: '1. Introduction',
          content: 'The blockchain ecosystem faces significant challenges including network fragmentation, high transaction costs, and limited scalability. HyperLayer0 addresses these issues through a Layer 0 approach that provides unified infrastructure for existing blockchain networks while maintaining security and decentralization.',
          code: `Current Challenges:
• Network Fragmentation: Isolated blockchain ecosystems
• High Transaction Costs: Unpredictable gas fees
• Limited Scalability: TPS bottlenecks
• Poor User Experience: Complex cross-chain interactions
• Energy Consumption: Proof-of-Work limitations

HyperLayer0 Solutions:
• Unified Layer 0 infrastructure
• Fixed transaction fees
• Horizontal scaling through sharding
• Seamless cross-chain connectivity
• Energy-efficient consensus`
        },
        {
          id: 'tokenomics',
          title: '2. Tokenomics',
          content: 'HyperLayer0 implements a utility-focused tokenomics model with a total supply of 9.9 billion HL0 tokens. The model prioritizes network utility and long-term sustainability through a balanced distribution mechanism.',
          code: `Token Distribution:
• Total Supply: 9,900,000,000 HL0
• Presale: 4,455,000,000 HL0 (45%)
• Staking Rewards: 2,475,000,000 HL0 (25%)
• Liquidity: 1,188,000,000 HL0 (12%)
• Development: 693,000,000 HL0 (7%)
• Team: 495,000,000 HL0 (5%)
• Marketing: 297,000,000 HL0 (3%)
• Advisors: 79,200,000 HL0 (0.8%)
• Burn Mechanism: 198,000,000 HL0 (2%)
• Airdrops: 19,800,000 HL0 (0.2%)

Utility Features:
• Network transaction fees
• Staking rewards (5-25% APR)
• Governance participation
• Cross-chain bridge operations`
        },
        {
          id: 'architecture',
          title: '3. Technical Architecture',
          content: 'HyperLayer0 uses a modular architecture combining Delegated Proof of Stake consensus with sharding techniques. The system includes a universal bridge protocol for cross-chain communication and an EVM-compatible execution layer.',
          code: `System Architecture:
┌─────────────────────────────────────────┐
│         Application Layer               │
├─────────────────────────────────────────┤
│         Smart Contract Layer           │
├─────────────────────────────────────────┤
│         Consensus Layer (DPoS)         │
├─────────────────────────────────────────┤
│         Network Layer                  │
├─────────────────────────────────────────┤
│         Bridge Protocol                │
├─────────────────────────────────────────┤
│  Bitcoin │ Ethereum │ Polygon │ BSC    │
└─────────────────────────────────────────┘

Key Components:
• Validator Network: 101 active validators
• Sharding System: 16 shards with load balancing
• Bridge Protocol: Multi-signature validation
• Virtual Machine: EVM-compatible execution
• Storage: Distributed state management`
        },
        {
          id: 'consensus',
          title: '4. Consensus Mechanism',
          content: 'HyperLayer0 implements Delegated Proof of Stake (DPoS) with Byzantine Fault Tolerance. This mechanism provides fast finality, energy efficiency, and security while maintaining decentralization through stake-based voting.',
          code: `DPoS Consensus Features:
• Validator Set: 101 active validators
• Block Time: 2 seconds
• Finality: 6 seconds (3 confirmations)
• Energy Efficiency: 99% less than Proof-of-Work
• Stake Requirements: Minimum 1,000,000 HL0
• Delegation: Token holders can delegate voting power

Security Properties:
• Byzantine Fault Tolerance: Up to 33% malicious nodes
• Economic Security: High cost of attack
• Slashing Conditions: Penalties for malicious behavior
• Validator Rotation: Dynamic validator selection`
        },
        {
          id: 'use-cases',
          title: '5. Use Cases',
          content: 'HyperLayer0 enables various applications across different sectors including DeFi, enterprise solutions, and cross-chain services through its scalable and interoperable infrastructure.',
          code: `Primary Applications:
• DeFi Protocols: DEXs, lending, yield farming
• Cross-Chain Bridges: Asset transfers between networks
• Enterprise Solutions: Supply chain, digital identity
• Payment Systems: Fast, low-cost transactions
• Gaming: NFTs, in-game economies
• Governance: DAO operations and voting

Benefits:
• Reduced transaction costs
• Faster settlement times
• Improved user experience
• Enhanced security through validation
• Seamless cross-chain interactions`
        },
        {
          id: 'roadmap',
          title: '6. Development Roadmap',
          content: 'HyperLayer0 development follows a structured approach with clearly defined phases, from core infrastructure development to ecosystem expansion and enterprise adoption.',
          code: `Development Phases:

Phase 1: Foundation (Q1-Q2 2025)
• Core blockchain implementation
• Basic consensus mechanism
• EVM compatibility layer
• SDK development and testing
• Testnet launch and validation

Phase 2: Scaling (Q3-Q4 2025)
• Sharding implementation
• Cross-chain bridge deployment
• Mainnet launch
• Validator network activation
• Initial dApp ecosystem

Phase 3: Expansion (2026)
• Advanced DeFi protocols
• Enterprise partnerships
• Mobile applications
• Regulatory compliance
• Global market expansion

Phase 4: Maturity (2027+)
• Advanced features and optimizations
• Governance improvements
• Industry standard establishment
• Ecosystem sustainability`
        }
      ]
    },
    cookies: {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: Cookie,
      lastUpdated: 'July 14, 2025',
      description: 'How we use cookies and similar technologies on our platform',
      sections: [
        {
          id: 'intro',
          title: '1. Introduction',
          content: 'This Cookie Policy explains how HyperLayer0 uses cookies and similar technologies on our website and platform. This policy should be read together with our Privacy Policy and Terms of Service.'
        },
        {
          id: 'what-are-cookies',
          title: '2. What Are Cookies',
          content: 'Cookies are small text files stored on your device when you visit our website. We also use similar technologies including Local Storage, Session Storage, and other web technologies to enhance your experience and provide our services effectively.'
        },
        {
          id: 'types-of-cookies',
          title: '3. Types of Cookies We Use',
          content: 'We use both session cookies (expire when you close your browser) and persistent cookies (remain for a set period). We also use first-party cookies (set by hyperlayer0.com) and third-party cookies (set by our partners and service providers).'
        },
        {
          id: 'cookie-categories',
          title: '4. Cookie Categories',
          content: 'Essential cookies (necessary for basic functionality), functional cookies (enhance features and personalization), performance cookies (help us analyze usage and improve our services), and marketing cookies (used for advertising and communication personalization).'
        },
        {
          id: 'platform-cookies',
          title: '5. Platform-Specific Cookies',
          content: 'We use cookies for wallet connections, network preferences, user authentication, dashboard settings, API configurations, and other platform-specific features that enhance your experience with HyperLayer0 services.'
        },
        {
          id: 'third-party-cookies',
          title: '6. Third-Party Cookies',
          content: 'We may use third-party services that set cookies, including analytics providers, customer support tools, and marketing platforms. These third parties have their own privacy policies and cookie practices.'
        },
        {
          id: 'cookie-management',
          title: '7. Managing Cookies',
          content: 'You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or receive notifications when cookies are set. Note that disabling cookies may affect website functionality.'
        },
        {
          id: 'mobile-devices',
          title: '8. Mobile Devices',
          content: 'On mobile devices, we may use device identifiers and mobile-specific technologies. You can control these through your device settings and app permissions.'
        },
        {
          id: 'updates',
          title: '9. Policy Updates',
          content: 'We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes and update the "last updated" date at the top of this policy.'
        },
        {
          id: 'contact',
          title: '10. Contact Information',
          content: 'For questions about this Cookie Policy or our cookie practices, please contact us at: hyperlayer0@gmail.com. You can also contact us regarding your cookie preferences and rights.'
        }
      ]
    }
  };

  const openDocument = (docId) => {
    setActiveDocument(docId);
    setIsModalOpen(true);
    setSearchTerm('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveDocument(null);
    setSearchTerm('');
  };

  const downloadDocument = (docId) => {
    const doc = documents[docId];
    const content = `${doc.title}\n\nLast updated: ${doc.lastUpdated}\n\n${doc.sections.map(section => `${section.title}\n${section.content}\n\n`).join('')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_')}_HyperLayer0.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = activeDocument 
    ? documents[activeDocument].sections.filter(section => 
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.code && section.code.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Top Section */}
          <div className="footer-top">
            <div className="footer-brand">
              <h3 className="footer-logo">HyperLayer0</h3>
              <p className="footer-tagline">
                Layer 0 blockchain infrastructure for efficient cross-chain connectivity
                and scalable transaction processing.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('about'); }}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('tokenomics'); }}>
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('architecture'); }}>
                    Architecture
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-section">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('use-cases'); }}>
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('roadmap'); }}>
                    Roadmap
                  </a>
                </li>
                <li>
                  <button 
                    className="footer-link-button"
                    onClick={() => openDocument('documentation')}
                  >
                    Documentation
                  </button>
                </li>
                <li>
                  <button 
                    className="footer-link-button"
                    onClick={() => openDocument('whitepaper')}
                  >
                    Whitepaper
                  </button>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="footer-section">
              <h4>Community</h4>
              <div className="social-links">
                <a href="https://twitter.com/hyperlayer0" target="_blank" rel="noopener noreferrer" 
                   className="social-link" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/bh2Kckuu" target="_blank" rel="noopener noreferrer" 
                   className="social-link" aria-label="Discord">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="https://t.me/hyperlayer0" target="_blank" rel="noopener noreferrer" 
                   className="social-link" aria-label="Telegram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <p className="copyright">
                © {currentYear} HyperLayer0. All rights reserved.
              </p>
              <div className="footer-legal">
                <button 
                  className="legal-button"
                  onClick={() => openDocument('privacy')}
                >
                  Privacy Policy
                </button>
                <span className="separator">•</span>
                <button 
                  className="legal-button"
                  onClick={() => openDocument('terms')}
                >
                  Terms of Service
                </button>
                <span className="separator">•</span>
                <button 
                  className="legal-button"
                  onClick={() => openDocument('cookies')}
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal para documentos legais */}
      {isModalOpen && activeDocument && (
        <div className="legal-modal-overlay" onClick={closeModal}>
          <div className="legal-modal-content" onClick={e => e.stopPropagation()}>
            <div className="legal-modal-header">
              <div className="legal-modal-title-section">
                <div className="legal-modal-icon">
                  {React.createElement(documents[activeDocument].icon, { size: 24 })}
                </div>
                <div className="legal-modal-title-text">
                  <h2>{documents[activeDocument].title}</h2>
                  <p className="legal-modal-subtitle">
                    Last updated: {documents[activeDocument].lastUpdated}
                  </p>
                </div>
              </div>
              <div className="legal-modal-actions">
                <button 
                  className="legal-action-button"
                  onClick={() => downloadDocument(activeDocument)}
                  title="Download"
                >
                  <Download size={18} />
                </button>
                <button 
                  className="legal-action-button"
                  onClick={closeModal}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="legal-modal-description">
              <p>{documents[activeDocument].description}</p>
            </div>

            <div className="legal-modal-search">
              <div className="legal-search-input-container">
                <Search size={18} className="legal-search-icon" />
                <input
                  type="text"
                  placeholder="Search in document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="legal-search-input"
                />
              </div>
            </div>

            <div className="legal-modal-body">
              <div className="legal-document-sections">
                {filteredSections.map((section, index) => (
                  <div key={section.id} className="legal-document-section">
                    <h3 className="legal-section-title">{section.title}</h3>
                    <p className="legal-section-content">{section.content}</p>
                    
                    {/* Renderizar código se existir */}
                    {section.code && (
                      <div className="code-block">
                        <div className="code-header">
                          <span className="code-language">
                            {activeDocument === 'documentation' ? 'javascript' : 'text'}
                          </span>
                          <button 
                            className="copy-button"
                            onClick={() => copyToClipboard(section.code)}
                            title="Copy code"
                          >
                            {copiedCode === section.code ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        <pre className="code-content">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
                {filteredSections.length === 0 && searchTerm && (
                  <div className="legal-no-results">
                    <p>No results found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="legal-modal-footer">
              <div className="legal-footer-info">
                <p>For more information, contact us: <a href="mailto:hyperlayer0@gmail.com">hyperlayer0@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style >{`
        /* Footer Styles */
        .footer {
          background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
          color: #ffffff;
          padding: 60px 0 20px;
          margin-top: 100px;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            #00ff88 20%, 
            #00ff88 80%, 
            transparent
          );
          opacity: 0.5;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        @media (max-width: 968px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          line-height: 1.6;
        }

        .footer-section h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #00ff88;
          transform: translateX(5px);
        }

        .footer-links a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ff88;
          transition: width 0.3s ease;
        }

        .footer-links a:hover::after {
          width: 100%;
        }

        .footer-link-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
          text-align: left;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }

        .footer-link-button:hover {
          color: #00ff88;
          transform: translateX(5px);
        }

        .footer-link-button::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ff88;
          transition: width 0.3s ease;
        }

        .footer-link-button:hover::after {
          width: 100%;
        }

        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, #00ff88 0%, transparent 70%);
          transition: all 0.3s ease;
          transform: translate(-50%, -50%);
        }

        .social-link:hover {
          color: #00ff88;
          border-color: #00ff88;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }

        .social-link:hover::before {
          width: 100px;
          height: 100px;
        }

        .social-link svg {
          width: 20px;
          height: 20px;
          z-index: 1;
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.1) 20%, 
            rgba(255, 255, 255, 0.1) 80%, 
            transparent
          );
          margin-bottom: 20px;
        }

        .footer-bottom {
          padding-top: 20px;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        @media (max-width: 600px) {
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }

        .copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          margin: 0;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .legal-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
          font-family: inherit;
        }

        .legal-button:hover {
          color: #00ff88;
        }

        .separator {
          color: rgba(255, 255, 255, 0.3);
        }

        .footer::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
          animation: pulse 10s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.2) translate(-10%, -10%);
          }
        }

        /* Legal Modal Styles */
        .legal-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .legal-modal-content {
          background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%);
          border-radius: 20px;
          border: 1px solid rgba(0, 255, 136, 0.3);
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .legal-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 30px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legal-modal-title-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .legal-modal-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
        }

        .legal-modal-title-text h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .legal-modal-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin: 5px 0 0;
        }

        .legal-modal-actions {
          display: flex;
          gap: 10px;
        }

        .legal-action-button {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .legal-action-button:hover {
          background: rgba(0, 255, 136, 0.2);
          transform: translateY(-2px);
        }

        .legal-modal-description {
          padding: 0 30px;
          color: rgba(255, 255, 255, 0.8);
        }

        .legal-modal-search {
          padding: 20px 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legal-search-input-container {
          position: relative;
        }

        .legal-search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .legal-search-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-size: 0.95rem;
        }

        .legal-search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .legal-search-input:focus {
          outline: none;
          border-color: #00ff88;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }

        .legal-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }

        .legal-document-sections {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .legal-document-section {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .legal-document-section:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 136, 0.3);
        }

        .legal-section-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #00ff88;
          margin: 0 0 15px;
        }

        .legal-section-content {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
          margin: 0;
        }

        /* Code block styles */
        .code-block {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          margin-top: 15px;
          overflow: hidden;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-language {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          font-weight: 500;
        }

        .copy-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .copy-button:hover {
          color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
        }

        .code-content {
          padding: 15px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }

        .code-content::-webkit-scrollbar {
          height: 8px;
        }

        .code-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .code-content::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 136, 0.3);
          border-radius: 4px;
        }

        .code-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 136, 0.5);
        }

        .legal-no-results {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.6);
        }

        .legal-modal-footer {
          padding: 20px 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }

        .legal-footer-info {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .legal-footer-info a {
          color: #00ff88;
          text-decoration: none;
        }

        .legal-footer-info a:hover {
          text-decoration: underline;
        }

        /* Responsive for modal */
        @media (max-width: 768px) {
          .legal-modal-content {
            margin: 10px;
            max-height: 95vh;
          }

          .legal-modal-header {
            padding: 20px;
          }

          .legal-modal-title-text h2 {
            font-size: 1.4rem;
          }

          .legal-modal-body {
            padding: 20px;
          }

          .legal-document-section {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
            margin-top: 60px;
          }

          .footer-logo {
            font-size: 24px;
          }

          .footer-section h4 {
            font-size: 16px;
          }

          .social-links {
            gap: 12px;
          }

          .social-link {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;