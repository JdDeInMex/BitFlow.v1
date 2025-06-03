import React, { useState } from 'react';
import './UseCases.css';

type CategoryType = 'defi' | 'payments' | 'enterprise' | 'gaming';

const UseCases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('defi');

  const categories = [
    { id: 'defi', label: 'DeFi', icon: '🏦' },
    { id: 'payments', label: 'Pagamentos', icon: '💳' },
    { id: 'enterprise', label: 'Empresarial', icon: '🏢' },
    { id: 'gaming', label: 'Gaming & NFTs', icon: '🎮' }
  ];

  const useCasesData = {
    defi: [
      {
        title: 'Exchange Descentralizada',
        description: 'Plataformas de trading descentralizadas que permitem a troca de Bitcoin e outros ativos com alta velocidade e baixo custo.',
        icon: '🔄',
        features: [
          'Trading de alta frequência com taxas mínimas',
          'Liquidez compartilhada entre múltiplos pares',
          'Orderbooks on-chain com execução instantânea'
        ]
      },
      {
        title: 'Protocolos de Empréstimo',
        description: 'Plataformas que permitem empréstimos garantidos por Bitcoin, com taxas de juros determinadas pelo mercado.',
        icon: '💰',
        features: [
          'Empréstimos garantidos por Bitcoin',
          'Taxas de juros determinadas pelo mercado',
          'Liquidações eficientes e transparentes'
        ]
      },
      {
        title: 'Yield Farming',
        description: 'Estratégias de farming de rendimento com Bitcoin, permitindo que usuários maximizem seus retornos.',
        icon: '🌱',
        features: [
          'Staking de Bitcoin para ganhar rendimentos',
          'Fornecimento de liquidez com recompensas',
          'Estratégias automatizadas de yield'
        ]
      },
      {
        title: 'Ativos Sintéticos',
        description: 'Criação e negociação de ativos sintéticos baseados em Bitcoin, permitindo exposição a diversos mercados.',
        icon: '🔗',
        features: [
          'Derivativos baseados em Bitcoin',
          'Exposição a ativos tradicionais via sintéticos',
          'Oráculos descentralizados para preços'
        ]
      }
    ],
    payments: [
      {
        title: 'Micropagamentos',
        description: 'Pagamentos menores que 1 centavo, viabilizando novos modelos de negócio como conteúdo pay-per-view.',
        icon: '🪙',
        features: [
          'Transações de frações de centavo',
          'Pagamento por conteúdo consumido',
          'Modelos de negócio inovadores'
        ]
      },
      {
        title: 'Streaming Payments',
        description: 'Pagamentos contínuos por segundo, permitindo modelos de assinatura granulares e pagamento por uso.',
        icon: '📡',
        features: [
          'Fluxo contínuo de pagamentos',
          'Assinaturas por segundo de uso',
          'Pagamentos em tempo real'
        ]
      },
      {
        title: 'Remessas Globais',
        description: 'Transferências internacionais instantâneas e de baixo custo, revolucionando o mercado de remessas.',
        icon: '🌍',
        features: [
          'Transferências internacionais instantâneas',
          'Taxas mínimas comparadas a serviços tradicionais',
          'Sem intermediários ou restrições'
        ]
      },
      {
        title: 'Point of Sale',
        description: 'Sistema de pagamento para comerciantes com confirmações instantâneas e taxas mínimas.',
        icon: '🛒',
        features: [
          'Confirmações instantâneas para comerciantes',
          'Taxas mínimas por transação',
          'Integração com sistemas de PDV existentes'
        ]
      }
    ],
    enterprise: [
      {
        title: 'Supply Chain',
        description: 'Rastreamento de produtos e gestão de cadeia de suprimentos com registros imutáveis e verificáveis.',
        icon: '📦',
        features: [
          'Rastreamento de origem a destino',
          'Verificação de autenticidade de produtos',
          'Pagamentos automáticos baseados em eventos'
        ]
      },
      {
        title: 'Gestão de Identidade',
        description: 'Soluções de identidade descentralizada que permitem controle total sobre dados pessoais.',
        icon: '🆔',
        features: [
          'Identidades auto-soberanas',
          'Verificação de credenciais sem intermediários',
          'Integração com sistemas existentes'
        ]
      },
      {
        title: 'Verificação de Documentos',
        description: 'Sistemas para verificação e autenticação de documentos com registro imutável.',
        icon: '📋',
        features: [
          'Prova de existência de documentos',
          'Verificação de autenticidade',
          'Controle de versões e histórico'
        ]
      },
      {
        title: 'Trilhas de Auditoria',
        description: 'Registros imutáveis para auditoria e compliance, garantindo transparência e integridade.',
        icon: '🔍',
        features: [
          'Registros imutáveis de eventos',
          'Verificação independente',
          'Compliance automatizado'
        ]
      }
    ],
    gaming: [
      {
        title: 'GameFi Infrastructure',
        description: 'Infraestrutura para jogos blockchain com transações rápidas e de baixo custo.',
        icon: '🎯',
        features: [
          'Transações in-game instantâneas',
          'Economias de jogo transparentes',
          'Itens verdadeiramente possuídos pelos jogadores'
        ]
      },
      {
        title: 'NFT Marketplace',
        description: 'Marketplace nativo para criação, compra e venda de NFTs com taxas mínimas.',
        icon: '🖼️',
        features: [
          'Criação e mint de NFTs com baixo custo',
          'Marketplace com taxas mínimas',
          'Experiência de usuário fluida'
        ]
      },
      {
        title: 'Metaverse Ready',
        description: 'Suporte para aplicações metaverso com transações de alta frequência e baixa latência.',
        icon: '🌐',
        features: [
          'Transações de alta frequência',
          'Baixa latência para experiências imersivas',
          'Interoperabilidade entre mundos virtuais'
        ]
      },
      {
        title: 'Tokenização de Ativos',
        description: 'Tokenização de ativos do mundo real, permitindo fracionamento e liquidez global.',
        icon: '💎',
        features: [
          'Fracionamento de ativos de alto valor',
          'Liquidez para ativos tradicionalmente ilíquidos',
          'Negociação global 24/7'
        ]
      }
    ]
  };

  return (
    <section className="use-cases-section">
      <div className="section-header">
        <h2 className="section-title">Possibilidades Ilimitadas com BitFlow</h2>
        <p className="section-subtitle">
          Descubra as diversas aplicações e possibilidades que o BitFlow oferece para revolucionar o ecossistema Bitcoin
        </p>
      </div>
      
      <div className="use-cases-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id as CategoryType)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>
      
      <div className="use-cases-content">
        <div className="use-case-grid">
          {useCasesData[activeCategory].map((useCase, index) => (
            <div key={index} className="use-case-card">
              <div className="use-case-icon">
                {useCase.icon}
              </div>
              <h3 className="use-case-title">{useCase.title}</h3>
              <p className="use-case-description">{useCase.description}</p>
              <ul className="use-case-features">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="use-case-feature">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default UseCases;