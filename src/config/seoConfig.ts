// src/config/seoConfig.ts

export const SEO_CONFIG = {
  siteName: 'HyperLayer0',
  siteUrl: 'https://hyperlayer0.com',
  defaultOgImage: 'https://hyperlayer0.com/images/hyperlayer0-og-image.jpg',
  twitterHandle: '@hyperlayer0',
  
  pages: {
    home: {
      title: 'HyperLayer0 - Revolutionary Layer 0 Infrastructure | Zero Burns Forever',
      description: 'Experience the future of blockchain with HyperLayer0\'s Pure Utility model. Zero burns, infinite scalability, and revolutionary tokenomics. Join the presale now!',
      keywords: 'hyperlayer0, layer 0, blockchain, presale, zero burns, pure utility, infinite scalability, web3, cryptocurrency, defi',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HyperLayer0',
        url: 'https://hyperlayer0.com',
        logo: 'https://hyperlayer0.com/logo.png',
        description: 'Revolutionary Layer 0 blockchain infrastructure with Pure Utility tokenomics',
        sameAs: [
          'https://twitter.com/hyperlayer0',
          'https://github.com/hyperlayer0',
          'https://discord.gg/hyperlayer0'
        ]
      }
    },
    about: {
      title: 'About HyperLayer0 - The Future of Web3 Infrastructure',
      description: 'Learn about HyperLayer0\'s mission to revolutionize Web3 with Pure Utility tokenomics, quantum-safe security, and the Internet of Everything.',
      keywords: 'hyperlayer0 about, web3 infrastructure, blockchain technology, pure utility model, team, mission, vision',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About HyperLayer0',
        description: 'Learn about HyperLayer0\'s mission and vision'
      }
    },
    tokenomics: {
      title: 'HyperLayer0 Tokenomics - 9.9B Supply with Zero Burns Forever',
      description: 'Discover HyperLayer0\'s revolutionary tokenomics: 9.9B total supply, zero burns forever, sustainable staking rewards, and pure utility value creation.',
      keywords: 'hyperlayer0 tokenomics, 9.9 billion supply, zero burns, pure utility, staking rewards, hl0 token, presale',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'HL0 Token',
        description: 'HyperLayer0 native token with revolutionary tokenomics',
        offers: {
          '@type': 'Offer',
          price: '0.0001',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    architecture: {
      title: 'HyperLayer0 Architecture - Revolutionary Layer 0 Technology',
      description: 'Explore HyperLayer0\'s cutting-edge architecture: quantum-safe security, infinite scalability, neural consensus, and universal bridge protocol.',
      keywords: 'hyperlayer0 architecture, layer 0 technology, quantum safe, infinite scalability, neural consensus, universal bridge',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'HyperLayer0 Architecture',
        description: 'Technical overview of HyperLayer0\'s revolutionary architecture'
      }
    },
    'use-cases': {
      title: 'HyperLayer0 Use Cases - 111+ Real-World Applications',
      description: 'Discover 111+ revolutionary use cases across DeFi, Gaming, Enterprise, Government, IoT, and more. HyperLayer0 powers the Internet of Everything.',
      keywords: 'hyperlayer0 use cases, defi, gaming, enterprise, government, iot, real world applications, blockchain solutions',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'HyperLayer0 Use Cases',
        description: '111+ real-world applications powered by HyperLayer0'
      }
    },
    roadmap: {
      title: 'HyperLayer0 Roadmap - Building the Future of Web3',
      description: 'Follow HyperLayer0\'s comprehensive roadmap from foundation to global adoption. 75+ solutions across 6 development phases.',
      keywords: 'hyperlayer0 roadmap, development phases, milestones, web3 future, blockchain development, timeline',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'HyperLayer0 Development Roadmap',
        description: 'Comprehensive roadmap for HyperLayer0\'s development phases'
      }
    },
    docs: {
      title: 'HyperLayer0 Documentation - Developer Resources',
      description: 'Complete documentation for developers building on HyperLayer0. APIs, SDKs, guides, and technical resources.',
      keywords: 'hyperlayer0 docs, developer resources, api documentation, sdk, technical guides',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'HyperLayer0 Developer Documentation',
        description: 'Complete technical documentation for HyperLayer0'
      }
    },
    solutions: {
      title: 'HyperLayer0 Solutions - Enterprise & Business Applications',
      description: 'Explore HyperLayer0\'s enterprise solutions for businesses. Custom implementations, partnerships, and B2B services.',
      keywords: 'hyperlayer0 solutions, enterprise blockchain, business applications, custom implementations',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'HyperLayer0 Enterprise Solutions',
        description: 'Blockchain solutions for enterprise and business applications'
      }
    }
  }
};