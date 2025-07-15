import React, { useState, useEffect } from 'react';
import { Search, BookOpen, FileText, Download, Copy, Check, ChevronRight, ChevronLeft, Home } from 'lucide-react';

const DocumentViewer = ({ documentType = 'documentation', onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(0);
  const [copiedCode, setCopiedCode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dados realistas baseados no projeto
  const documentData = {
    documentation: {
      title: 'HyperLayer0 Documentation',
      icon: BookOpen,
      description: 'Technical documentation for Layer 0 blockchain infrastructure',
      sections: [
        {
          id: 'introduction',
          title: 'Introduction',
          content: 'HyperLayer0 is a Layer 0 blockchain infrastructure designed to provide efficient cross-chain connectivity and scalable transaction processing. Our approach focuses on practical solutions for real-world blockchain challenges through proven technologies and sustainable tokenomics.',
          code: `// Core Features
- Layer 0 Architecture: Base layer blockchain infrastructure
- Cross-Chain Connectivity: Universal bridge protocol
- Scalable Transaction Processing: Up to 100,000 TPS
- Fixed Fee Model: Predictable $0.00001 transaction cost
- ERC-20 Compatible: Standard token implementation

// System Requirements
- Node.js: 16.x or later
- Memory: 8GB RAM minimum
- Storage: 500GB SSD recommended
- Network: Stable internet connection`
        },
        {
          id: 'getting-started',
          title: 'Getting Started',
          content: 'Begin developing with HyperLayer0 by setting up your development environment and connecting to our testnet. Our SDK provides familiar interfaces for developers coming from other blockchain platforms.',
          code: `# Install HyperLayer0 SDK
npm install @hyperlayer0/sdk

# Initialize project
npx create-hl0-app my-project

# Basic connection setup
import { HyperLayer0 } from '@hyperlayer0/sdk';

const hl0 = new HyperLayer0({
  network: 'testnet',
  rpcUrl: 'https://testnet-rpc.hyperlayer0.io',
  privateKey: process.env.PRIVATE_KEY
});

// Send transaction
const tx = await hl0.sendTransaction({
  to: '0x742d35Cc6634C0532925a3b8D93C68c34C1b7e3E',
  value: hl0.utils.parseHL0('1.0'),
  gasLimit: 21000
});

console.log('Transaction hash:', tx.hash);`
        },
        {
          id: 'api-reference',
          title: 'API Reference',
          content: 'Complete API documentation for HyperLayer0 SDK. The API follows standard patterns familiar to Ethereum developers while adding Layer 0 specific functionality.',
          code: `// SDK Initialization
const hl0 = new HyperLayer0({
  network: 'mainnet', // or 'testnet'
  rpcUrl: 'https://rpc.hyperlayer0.io',
  privateKey: 'your-private-key'
});

// Account Operations
const balance = await hl0.getBalance(address);
const nonce = await hl0.getTransactionCount(address);

// Transaction Operations
const tx = await hl0.sendTransaction({
  to: recipientAddress,
  value: amount,
  gasLimit: 21000,
  gasPrice: 1000000000 // 1 gwei
});

// Smart Contract Interaction
const contract = new hl0.Contract(contractAddress, abi);
const result = await contract.methods.methodName().call();

// Event Monitoring
hl0.on('block', (blockNumber) => {
  console.log('New block:', blockNumber);
});`
        },
        {
          id: 'smart-contracts',
          title: 'Smart Contracts',
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
        
        // Emit cross-chain event
        emit CrossChainTransfer(msg.sender, to, amount, targetChain);
    }
    
    event CrossChainTransfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 targetChain
    );
}`
        },
        {
          id: 'deployment',
          title: 'Deployment Guide',
          content: 'Deploy your applications to HyperLayer0 testnet and mainnet. This guide covers build optimization, deployment strategies, and monitoring setup.',
          code: `# Build and deploy process
npx hardhat compile
npx hardhat test
npx hardhat deploy --network hyperlayer0-testnet

# Verify contract
npx hardhat verify --network hyperlayer0-testnet CONTRACT_ADDRESS "constructor_arg"

# Production deployment configuration
module.exports = {
  networks: {
    'hyperlayer0-mainnet': {
      url: 'https://rpc.hyperlayer0.io',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
      gasLimit: 8000000
    },
    'hyperlayer0-testnet': {
      url: 'https://testnet-rpc.hyperlayer0.io',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
      gasLimit: 8000000
    }
  }
};`
        }
      ]
    },
    whitepaper: {
      title: 'HyperLayer0 Whitepaper',
      icon: FileText,
      description: 'Technical whitepaper for Layer 0 blockchain infrastructure',
      sections: [
        {
          id: 'abstract',
          title: 'Abstract',
          content: 'HyperLayer0 presents a Layer 0 blockchain infrastructure designed to address scalability and interoperability challenges in the current blockchain ecosystem. Through optimized consensus mechanisms, efficient cross-chain protocols, and sustainable tokenomics, HyperLayer0 provides a foundation for next-generation decentralized applications.',
          code: `Technical Specifications:
• Transaction Throughput: Up to 100,000 TPS
• Block Time: 2 seconds
• Finality: 6 seconds (3 block confirmations)
• Network Latency: <500ms globally
• Cross-Chain Support: Ethereum, Bitcoin, Polygon, BSC
• Consensus: Delegated Proof of Stake (DPoS)
• Smart Contract VM: EVM-compatible`
        },
        {
          id: 'vision',
          title: 'Vision & Problem Statement',
          content: 'The current blockchain landscape suffers from fragmentation, high fees, and scalability limitations. HyperLayer0 addresses these issues by providing a unified Layer 0 foundation that connects existing blockchains while offering improved performance and predictable costs.',
          code: `Current Blockchain Challenges:
• High and unpredictable transaction fees
• Limited cross-chain interoperability
• Scalability bottlenecks (TPS limitations)
• Complex multi-chain user experience
• Fragmented liquidity across networks

HyperLayer0 Solutions:
• Fixed fee model: $0.00001 per transaction
• Universal bridge protocol for seamless transfers
• Horizontal scaling through sharding
• Unified SDK for multi-chain development
• Consolidated liquidity pools`
        },
        {
          id: 'tokenomics',
          title: 'Tokenomics',
          content: 'HyperLayer0 implements a utility-focused tokenomics model with a total supply of 9.9 billion HL0 tokens. The model prioritizes network utility and long-term sustainability without deflationary mechanisms that could harm usability.',
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
• Cross-chain bridge fees
• Validator node requirements`
        },
        {
          id: 'architecture',
          title: 'Technical Architecture',
          content: 'HyperLayer0 uses a modular architecture combining Delegated Proof of Stake consensus with advanced sharding techniques. The system includes a universal bridge protocol for cross-chain communication and an EVM-compatible execution layer.',
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
• Sharding System: 16 shards with automatic rebalancing
• Bridge Protocol: Multi-signature validation
• Virtual Machine: EVM-compatible execution
• Storage: Distributed state management`
        },
        {
          id: 'consensus',
          title: 'Consensus Mechanism',
          content: 'HyperLayer0 implements Delegated Proof of Stake (DPoS) with Byzantine Fault Tolerance (BFT). This consensus mechanism provides fast finality, energy efficiency, and strong security guarantees while maintaining decentralization.',
          code: `DPoS Consensus Features:
• Validator Set: 101 active validators
• Block Time: 2 seconds
• Finality: 6 seconds (3 confirmations)
• Voting Power: Stake-weighted delegation
• Slashing: Penalties for malicious behavior
• Rewards: Block rewards distributed to validators

Security Properties:
• Byzantine Fault Tolerance: 33% malicious nodes tolerated
• Stake Requirements: Minimum 1,000,000 HL0 to validate
• Delegation: Token holders can delegate to validators
• Slashing Conditions: Double-signing, unavailability
• Economic Security: High cost of attack`
        },
        {
          id: 'roadmap',
          title: 'Development Roadmap',
          content: 'HyperLayer0 development follows a phased approach focusing on core infrastructure first, then expanding to advanced features and ecosystem growth. Each phase includes specific milestones and deliverables.',
          code: `Phase 1: Foundation (Q1-Q2 2025)
• Core blockchain implementation
• Basic consensus mechanism
• EVM compatibility layer
• SDK development
• Testnet launch

Phase 2: Scaling (Q3-Q4 2025)
• Sharding implementation
• Cross-chain bridge protocol
• Mainnet launch
• Validator network activation
• Basic dApp ecosystem

Phase 3: Ecosystem (2026)
• Advanced DeFi protocols
• NFT marketplace
• Gaming integrations
• Enterprise partnerships
• Mobile wallet application

Phase 4: Advanced Features (2027+)
• Layer 2 solutions
• Privacy enhancements
• Governance improvements
• IoT integrations
• Institutional adoption`
        }
      ]
    }
  };

  const currentDoc = documentData[documentType];
  const currentSection = currentDoc.sections[activeSection];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadDocument = () => {
    const content = `${currentDoc.title}\n\n${currentDoc.sections.map(section => 
      `${section.title}\n${section.content}\n${section.code ? `\n${section.code}\n` : ''}\n`
    ).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDoc.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = currentDoc.sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (section.code && section.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const goToSection = (index) => {
    setActiveSection(index);
    setIsMenuOpen(false);
  };

  return (
    <div className="document-viewer">
      {/* Header */}
      <div className="document-header">
        <div className="document-nav">
          <button 
            className="nav-button home-button"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <ChevronRight size={16} className="nav-separator" />
          <span className="nav-current">{currentDoc.title}</span>
        </div>
        
        <div className="document-actions">
          <button 
            className="action-button"
            onClick={downloadDocument}
            title="Download Document"
          >
            <Download size={18} />
          </button>
          <button 
            className="action-button mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <currentDoc.icon size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="document-search">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search in document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="document-layout">
        {/* Sidebar */}
        <div className={`document-sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <currentDoc.icon size={24} className="sidebar-icon" />
            <h3 className="sidebar-title">{currentDoc.title}</h3>
          </div>
          
          <div className="sidebar-description">
            <p>{currentDoc.description}</p>
          </div>

          <nav className="sidebar-nav">
            {currentDoc.sections.map((section, index) => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === index ? 'active' : ''}`}
                onClick={() => goToSection(index)}
              >
                <span className="nav-number">{index + 1}</span>
                <span className="nav-title">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="document-content">
          <div className="content-header">
            <h1 className="content-title">{currentSection.title}</h1>
            <div className="content-progress">
              <span>{activeSection + 1} of {currentDoc.sections.length}</span>
            </div>
          </div>

          <div className="content-body">
            <p className="content-text">{currentSection.content}</p>
            
            {currentSection.code && (
              <div className="code-block">
                <div className="code-header">
                  <span className="code-language">
                    {documentType === 'documentation' ? 'javascript' : 'text'}
                  </span>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard(currentSection.code)}
                    title="Copy code"
                  >
                    {copiedCode === currentSection.code ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="code-content">
                  <code>{currentSection.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="content-navigation">
            <button 
              className="nav-button prev-button"
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            
            <button 
              className="nav-button next-button"
              onClick={() => setActiveSection(Math.min(currentDoc.sections.length - 1, activeSection + 1))}
              disabled={activeSection === currentDoc.sections.length - 1}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .document-viewer {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .document-header {
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .document-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-button:hover {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-separator {
          color: rgba(255, 255, 255, 0.3);
        }

        .nav-current {
          color: #00ff88;
          font-weight: 600;
        }

        .document-actions {
          display: flex;
          gap: 10px;
        }

        .action-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          padding: 8px 12px;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background: rgba(0, 255, 136, 0.2);
          border-color: #00ff88;
        }

        .mobile-menu-toggle {
          display: none;
        }

        .document-search {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 40px;
        }

        .search-container {
          position: relative;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-size: 0.95rem;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          outline: none;
          border-color: #00ff88;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }

        .document-layout {
          display: flex;
          min-height: calc(100vh - 140px);
        }

        .document-sidebar {
          width: 300px;
          background: rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 30px 20px;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .sidebar-icon {
          color: #00ff88;
        }

        .sidebar-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .sidebar-description {
          margin-bottom: 30px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .sidebar-description p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .nav-item.active {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .nav-number {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .nav-item.active .nav-number {
          background: #00ff88;
          color: #000;
        }

        .nav-title {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .document-content {
          flex: 1;
          padding: 40px;
          max-width: 800px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .content-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .content-progress {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .content-body {
          margin-bottom: 50px;
        }

        .content-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
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
          padding: 20px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }

        .content-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prev-button, .next-button {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          color: #000;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .prev-button:hover, .next-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }

        .prev-button:disabled, .next-button:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .document-header {
            padding: 15px 20px;
          }

          .document-search {
            padding: 15px 20px;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .document-sidebar {
            position: fixed;
            top: 0;
            left: -300px;
            width: 300px;
            height: 100vh;
            z-index: 200;
            transition: left 0.3s ease;
            background: rgba(15, 20, 25, 0.95);
            backdrop-filter: blur(10px);
          }

          .document-sidebar.mobile-open {
            left: 0;
          }

          .document-content {
            padding: 20px;
          }

          .content-title {
            font-size: 2rem;
          }

          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .content-navigation {
            flex-direction: column;
            gap: 15px;
          }

          .prev-button, .next-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default DocumentViewer;