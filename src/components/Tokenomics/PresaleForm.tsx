import React, { useState } from 'react';
import './PresaleForm.css';

const Tokenomics: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const tokenomicsData = [
    {
      id: 'development',
      label: 'Development',
      percentage: 30,
      color: '#4f46e5',
      description: 'Alocação para desenvolvimento contínuo do ecossistema BitFlow e novas funcionalidades.',
      details: [
        'Desenvolvimento de protocolos',
        'Infraestrutura de rede',
        'Pesquisa e inovação',
        'Expansão do ecossistema'
      ]
    },
    {
      id: 'rewards',
      label: 'Rewards',
      percentage: 25,
      color: '#10b981',
      description: 'Recompensas para early adopters e participantes ativos da rede BitFlow.',
      details: [
        'Staking rewards',
        'Incentivos de liquidez',
        'Early adopter benefits',
        'Community rewards'
      ]
    },
    {
      id: 'treasury',
      label: 'Treasury',
      percentage: 20,
      color: '#7c3aed',
      description: 'Reserva do projeto mantida para estabilidade e crescimento futuro.',
      details: [
        'Reserva estratégica',
        'Parcerias futuras',
        'Desenvolvimento de longo prazo',
        'Estabilidade do protocolo'
      ]
    },
    {
      id: 'marketing',
      label: 'Marketing',
      percentage: 15,
      color: '#f59e0b',
      description: 'Fundos de marketing para divulgação e crescimento da comunidade BitFlow.',
      details: [
        'Campanhas de marketing',
        'Parcerias estratégicas',
        'Community building',
        'Brand awareness'
      ]
    },
    {
      id: 'listings',
      label: 'Listings',
      percentage: 10,
      color: '#ef4444',
      description: 'Alocação dedicada para listagem do BITFLOW em diversas exchanges.',
      details: [
        'Exchange listings',
        'Market making',
        'Liquidez inicial',
        'Trading pairs'
      ]
    }
  ];

  const totalSupply = '1,000,000,000,000';

  // Calcular o ângulo para cada segmento do gráfico de pizza
  const calculateSegments = () => {
    let currentAngle = 0;
    return tokenomicsData.map(item => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + (item.percentage / 100) * 360;
      currentAngle = endAngle;
      
      return {
        ...item,
        startAngle,
        endAngle,
        path: createArcPath(200, 200, 150, startAngle, endAngle)
      };
    });
  };

  // Criar path SVG para o arco
  const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY, 
      "L", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  // Converter coordenadas polares para cartesianas
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const segments = calculateSegments();

  return (
    <section className="tokenomics-section">
      <div className="tokenomics-container">
        <div className="tokenomics-header">
          <h2 className="tokenomics-title">Tokenomics</h2>
          <p className="tokenomics-subtitle">
            Distribuição estratégica do BITFLOW para sustentabilidade e crescimento do ecossistema
          </p>
          <div className="total-supply">
            <span className="supply-label">Total Supply:</span>
            <span className="supply-value">{totalSupply} BITFLOW</span>
          </div>
        </div>

        <div className="tokenomics-content">
          <div className="chart-container">
            <svg viewBox="0 0 400 400" className="pie-chart">
              {segments.map((segment, index) => (
                <path
                  key={segment.id}
                  d={segment.path}
                  fill={segment.color}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2"
                  className={`chart-segment ${hoveredSegment === segment.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredSegment(segment.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{
                    filter: hoveredSegment === segment.id ? 'brightness(1.2)' : 'brightness(1)',
                    transform: hoveredSegment === segment.id ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: '200px 200px'
                  }}
                />
              ))}
              
              {/* Centro do gráfico */}
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              
              {/* Logo ou texto central */}
              <text
                x="200"
                y="190"
                textAnchor="middle"
                className="chart-center-text"
                fill="white"
                fontSize="16"
                fontWeight="bold"
              >
                BITFLOW
              </text>
              <text
                x="200"
                y="210"
                textAnchor="middle"
                className="chart-center-subtext"
                fill="rgba(255, 255, 255, 0.7)"
                fontSize="12"
              >
                Token
              </text>
            </svg>
          </div>

          <div className="distribution-list">
            {tokenomicsData.map(item => (
              <div
                key={item.id}
                className={`distribution-item ${hoveredSegment === item.id ? 'highlighted' : ''}`}
                onMouseEnter={() => setHoveredSegment(item.id)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="item-header">
                  <div className="item-indicator">
                    <div 
                      className="color-dot"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="item-percentage">{item.percentage}%</span>
                  </div>
                  <h3 className="item-title">{item.label}</h3>
                </div>
                
                <p className="item-description">{item.description}</p>
                
                <div className="item-details">
                  {item.details.map((detail, index) => (
                    <span key={index} className="detail-tag">
                      {detail}
                    </span>
                  ))}
                </div>

                <div className="item-amount">
                  <span className="amount-value">
                    {(parseInt(totalSupply.replace(/,/g, '')) * item.percentage / 100).toLocaleString()}
                  </span>
                  <span className="amount-label">BITFLOW</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tokenomics-stats">
          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <h4>Locked Tokens</h4>
              <p>50% dos tokens de desenvolvimento e treasury ficam bloqueados por 2 anos</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h4>Vesting Schedule</h4>
              <p>Liberação gradual de tokens ao longo de 4 anos para sustentabilidade</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h4>Burn Mechanism</h4>
              <p>0.1% de cada transação é queimada, reduzindo o supply total</p>
            </div>
          </div>
        </div>

        <div className="tokenomics-cta">
          <h3>Interessado em participar?</h3>
          <p>Junte-se à pré-venda e garanta seus tokens BITFLOW com benefícios exclusivos</p>
          <div className="cta-buttons">
            <button className="primary-button">
              💎 Participar da Pré-venda
            </button>
            <button className="secondary-button">
              📊 Ver Roadmap
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;