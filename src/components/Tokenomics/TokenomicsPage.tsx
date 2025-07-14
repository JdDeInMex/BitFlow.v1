// src/components/Tokenomics/TokenomicsPage.tsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tokenomics Page Component
const TokenomicsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [animatedValues, setAnimatedValues] = useState({
    totalSupply: 0,
    presaleTarget: 0,
    currentPrice: 0
  });
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Animate numbers on mount
  useEffect(() => {
    const targets = {
      totalSupply: 9900000000,
      presaleTarget: 100,
      currentPrice: 0.009120
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        totalSupply: Math.floor(targets.totalSupply * easeProgress),
        presaleTarget: Math.floor(targets.presaleTarget * easeProgress),
        currentPrice: targets.currentPrice * easeProgress
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return num.toLocaleString();
  };

  const distributionData = [
    { category: 'Presale (Base)', percentage: 35, tokens: 3465000000, color: '#00ff88', description: 'Main fundraising allocation' },
    { category: 'Presale Bonus', percentage: 10, tokens: 990000000, color: '#00ccff', description: 'Incentive bonuses for early supporters' },
    { category: 'Staking Rewards', percentage: 25, tokens: 2475000000, color: '#ff6b35', description: '100-1000% APR rewards pool' },
    { category: 'Liquidity', percentage: 12, tokens: 1188000000, color: '#8b5cf6', description: 'DEX/CEX market making' },
    { category: 'Development', percentage: 7, tokens: 693000000, color: '#f59e0b', description: 'Ecosystem development' },
    { category: 'Team', percentage: 5, tokens: 495000000, color: '#ef4444', description: '4-year vesting with 1-year cliff' },
    { category: 'Marketing', percentage: 3, tokens: 297000000, color: '#06b6d4', description: '2-year vesting for growth' },
    { category: 'Initial Burn', percentage: 2, tokens: 198000000, color: '#6b7280', description: 'Day 1 deflation mechanism' },
    { category: 'Advisors', percentage: 0.8, tokens: 79200000, color: '#ec4899', description: '2-year vesting for expertise' },
    { category: 'Airdrops', percentage: 0.2, tokens: 19800000, color: '#10b981', description: '1-year community rewards' }
  ];

  const presalePhases = [
    {
      phase: 'Phase 1: Early Innovation',
      priceRange: '$0.009 - $0.090',
      batches: '1-7',
      totalTokens: '1,918,250,000',
      maxBonus: '100%',
      description: 'Foundation builders with maximum rewards'
    },
    {
      phase: 'Phase 2: Growth Phase', 
      priceRange: '$0.120 - $0.400',
      batches: '8-13',
      totalTokens: '791,200,000',
      maxBonus: '40%',
      description: 'Scaling adoption with strong incentives'
    },
    {
      phase: 'Phase 3: Institutional',
      priceRange: '$0.500 - $0.900',
      batches: '14-20',
      totalTokens: '1,454,700,000',
      maxBonus: '15%',
      description: 'Enterprise adoption and mainstream launch'
    }
  ];

  const priceProjections = [
    { period: 'Presale End', supply: '4.2B', price: '$0.90', marketCap: '$3.78B', roi: '100x' },
    { period: 'Listing', supply: '4.5B', price: '$1.35', marketCap: '$6.08B', roi: '150x' },
    { period: '3 Months', supply: '5B', price: '$3.60', marketCap: '$18B', roi: '400x' },
    { period: '6 Months', supply: '5.2B', price: '$9.00', marketCap: '$46.8B', roi: '1,000x' },
    { period: '1 Year', supply: '5B', price: '$18.00', marketCap: '$90B', roi: '2,000x' },
    { period: '2 Years', supply: '4.5B', price: '$45.00', marketCap: '$202.5B', roi: '5,000x' },
    { period: '5 Years', supply: '3.5B', price: '$90.00', marketCap: '$315B', roi: '10,000x' }
  ];

  const stakingBreakdown = [
    { year: 1, tokens: '900,000,000', aprRange: '200-500%', description: 'High early rewards' },
    { year: 2, tokens: '600,000,000', aprRange: '100-200%', description: 'Gradual reduction' },
    { year: 3, tokens: '400,000,000', aprRange: '50-100%', description: 'Stabilization phase' },
    { year: 4, tokens: '300,000,000', aprRange: '30-50%', description: 'Maturity phase' },
    { year: 5, tokens: '275,000,000', aprRange: '20-30%', description: 'Long-term sustainability' }
  ];

  const renderOverview = () => (
    <div className="tkn-section">
      <div className="tkn-hero-stats">
        <div className="tkn-stat-card tkn-pure-utility">
          <div className="tkn-stat-icon">💎</div>
          <div className="tkn-stat-content">
            <div className="tkn-stat-number">{formatNumber(animatedValues.totalSupply)}</div>
            <div className="tkn-stat-label">Total Supply Forever</div>
            <div className="tkn-stat-subtitle">ZERO Burns - Pure Utility Model</div>
          </div>
        </div>
        
        <div className="tkn-stat-card">
          <div className="tkn-stat-icon">🚀</div>
          <div className="tkn-stat-content">
            <div className="tkn-stat-number">+{formatNumber(animatedValues.presaleTarget)}x</div>
            <div className="tkn-stat-label">Presale Target</div>
            <div className="tkn-stat-subtitle">20 Batches: $0.009 → $0.90 - $1.20</div>
          </div>
        </div>
        
        <div className="tkn-stat-card tkn-current-price">
          <div className="tkn-stat-icon">💰</div>
          <div className="tkn-stat-content">
            <div className="tkn-stat-number">${animatedValues.currentPrice.toFixed(6)}</div>
            <div className="tkn-stat-label">Current Price</div>
            <div className="tkn-stat-subtitle">+$0.00001 daily increase</div>
          </div>
        </div>
      </div>

      <div className="tkn-pure-utility-banner">
        <div className="tkn-banner-content">
          <h2>🌟 Revolutionary Pure Utility Model</h2>
          <div className="tkn-utility-benefits">
            <div className="tkn-benefit">
              <span className="tkn-benefit-icon">🆓</span>
              <div>
                <strong>ZERO Burns Forever</strong>
                <p>No transaction burns, no bridge burns, no penalties</p>
              </div>
            </div>
            <div className="tkn-benefit">
              <span className="tkn-benefit-icon">♾️</span>
              <div>
                <strong>Infinite Freedom</strong>
                <p>Use, trade, stake, or hold - your choice, no pressure</p>
              </div>
            </div>
            <div className="tkn-benefit">
              <span className="tkn-benefit-icon">💎</span>
              <div>
                <strong>Value = Utility</strong>
                <p>Price grows through adoption, not artificial scarcity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Função para labels externos
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight={700}
        style={{ pointerEvents: 'none' }}
      >
        {`${distributionData[index].category}: ${distributionData[index].percentage}%`}
      </text>
    );
  };

  const renderDistribution = () => (
    <div className="tkn-section">
      <h2>Token Distribution</h2>
      <div className="tkn-distribution-main" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '3rem' }}>
        {/* Pie Chart */}
        <div style={{ width: 480, height: 480, minWidth: 340, padding: 10, boxSizing: 'border-box' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="percentage"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={highlightedIndex !== null ? 155 : 140}
                labelLine={false}
                isAnimationActive={true}
                onMouseLeave={() => setHighlightedIndex(null)}
              >
                {distributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={highlightedIndex === index ? "#fff" : entry.color}
                    strokeWidth={highlightedIndex === index ? 4 : 1}
                    cursor="pointer"
                    onMouseEnter={() => setHighlightedIndex(index)}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Percent']} />
            
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="tkn-distribution-legend-grid">
          {distributionData.map((item, index) => (
            <div
              key={item.category}
              className={`tkn-legend-item-grid${highlightedIndex === index ? ' tkn-legend-highlight' : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
              style={{
                boxShadow: highlightedIndex === index ? '0 0 0 3px ' + item.color : undefined,
                borderColor: highlightedIndex === index ? item.color : undefined,
                transition: 'box-shadow 0.2s, border-color 0.2s'
              }}
            >
              <div className="tkn-legend-color-large" style={{ backgroundColor: item.color }}></div>
              <div className="tkn-legend-content-grid">
                <div className="tkn-legend-header-grid">
                  <span className="tkn-legend-category-grid">{item.category}</span>
                  <span className="tkn-legend-percentage-grid">{item.percentage}%</span>
                </div>
                <div className="tkn-legend-tokens-grid">{formatNumber(item.tokens)} tokens</div>
                <div className="tkn-legend-description-grid">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPresale = () => (
    <div className="tkn-section">
      <h2>Presale Structure</h2>
      <div className="tkn-presale-overview">
        <div className="tkn-presale-stat">
          <span className="tkn-presale-number">20</span>
          <span className="tkn-presale-label">Total Batches</span>
        </div>
        <div className="tkn-presale-stat">
          <span className="tkn-presale-number">100x</span>
          <span className="tkn-presale-label">Price Range</span>
        </div>
        <div className="tkn-presale-stat">
          <span className="tkn-presale-number">3</span>
          <span className="tkn-presale-label">Phases</span>
        </div>
      </div>

      <div className="tkn-phases-container">
        {presalePhases.map((phase, index) => (
          <div key={index} className="tkn-phase-card">
            <div className="tkn-phase-header">
              <h3>{phase.phase}</h3>
              <span className="tkn-phase-batches">Batches {phase.batches}</span>
            </div>
            <div className="tkn-phase-content">
              <div className="tkn-phase-stat">
                <span className="tkn-stat-label">Price Range</span>
                <span className="tkn-stat-value">{phase.priceRange}</span>
              </div>
              <div className="tkn-phase-stat">
                <span className="tkn-stat-label">Total Tokens</span>
                <span className="tkn-stat-value">{phase.totalTokens}</span>
              </div>
              <div className="tkn-phase-stat">
                <span className="tkn-stat-label">Max Bonus</span>
                <span className="tkn-stat-value tkn-highlight">{phase.maxBonus}</span>
              </div>
            </div>
            <div className="tkn-phase-description">{phase.description}</div>
          </div>
        ))}
      </div>

      <div className="tkn-daily-increase-info">
        <div className="tkn-increase-card">
          <h3>📈 Daily Price Increases Between Batches</h3>
          <div className="tkn-increase-details">
            <div className="tkn-increase-stat">
              <span className="tkn-increase-amount">+$0.00001</span>
              <span className="tkn-increase-label">Every 24 Hours</span>
            </div>
            <div className="tkn-increase-benefits">
              <div className="tkn-benefit-point">✅ Predictable growth within batches</div>
              <div className="tkn-benefit-point">✅ Fair pricing for all participants</div>
              <div className="tkn-benefit-point">✅ Creates healthy FOMO</div>
              <div className="tkn-benefit-point">✅ Rewards early entry in each batch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaking = () => (
    <div className="tkn-section">
      <h2>Staking Rewards</h2>
      <div className="tkn-staking-overview">
        <div className="tkn-staking-stat">
          <span className="tkn-staking-number">2.475B</span>
          <span className="tkn-staking-label">Total Rewards Pool</span>
        </div>
        <div className="tkn-staking-stat">
          <span className="tkn-staking-number">100-1000%</span>
          <span className="tkn-staking-label">APR Range</span>
        </div>
        <div className="tkn-staking-stat">
          <span className="tkn-staking-number">5</span>
          <span className="tkn-staking-label">Years Distribution</span>
        </div>
      </div>

      <div className="tkn-staking-breakdown">
        <h3>Annual Distribution Schedule</h3>
        <div className="tkn-staking-timeline">
          {stakingBreakdown.map((year, index) => (
            <div key={index} className="tkn-year-card">
              <div className="tkn-year-header">
                <span className="tkn-year-number">Year {year.year}</span>
                <span className="tkn-year-apr">{year.aprRange} APR</span>
              </div>
              <div className="tkn-year-tokens">{year.tokens} tokens</div>
              <div className="tkn-year-description">{year.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="tkn-dynamic-apr-info">
        <h3>🎯 Dynamic APR System</h3>
        <div className="tkn-apr-batch-system">
          <div className="tkn-apr-batch">
            <span className="tkn-batch-number">Batch 1</span>
            <span className="tkn-batch-apr">1000% APR</span>
          </div>
          <div className="tkn-apr-batch">
            <span className="tkn-batch-number">Batch 2</span>
            <span className="tkn-batch-apr">560% APR</span>
          </div>
          <div className="tkn-apr-batch">
            <span className="tkn-batch-number">Batch 3</span>
            <span className="tkn-batch-apr">314% APR</span>
          </div>
          <div className="tkn-apr-batch">
            <span className="tkn-batch-number">Batch 4</span>
            <span className="tkn-batch-apr">176% APR</span>
          </div>
          <div className="tkn-apr-batch">
            <span className="tkn-batch-number">Batch 5+</span>
            <span className="tkn-batch-apr">100% APR</span>
          </div>
        </div>
        <div className="tkn-apr-note">
          <strong>Formula:</strong> Each batch APR = Previous batch × 0.56 (-44% reduction)
        </div>
        <div className="tkn-apr-explanation">
          <p>The earlier you join, the higher your staking rewards! APR is locked based on your purchase batch.</p>
        </div>
      </div>
    </div>
  );

  const renderProjections = () => (
    <div className="tkn-section">
      <h2>Price Projections</h2>
      <div className="tkn-projections-table">
        <div className="tkn-table-header">
          <div>Period</div>
          <div>Circulating Supply</div>
          <div>Price</div>
          <div>Market Cap</div>
          <div>ROI (Batch 1)</div>
        </div>
        {priceProjections.map((projection, index) => (
          <div key={index} className="tkn-table-row">
            <div className="tkn-projection-period">{projection.period}</div>
            <div className="tkn-projection-supply">{projection.supply}</div>
            <div className="tkn-projection-price">{projection.price}</div>
            <div className="tkn-projection-mcap">{projection.marketCap}</div>
            <div className="tkn-projection-roi tkn-highlight">{projection.roi}</div>
          </div>
        ))}
      </div>

      <div className="tkn-projection-notes">
        <div className="tkn-note-card">
          <h4>📊 Projection Methodology</h4>
          <ul>
            <li>Based on comparable Layer 1 protocols</li>
            <li>Conservative adoption estimates</li>
            <li>Market cycle considerations</li>
            <li>Technology advancement timeline</li>
          </ul>
        </div>
        <div className="tkn-note-card">
          <h4>⚠️ Important Disclaimer</h4>
          <ul>
            <li>Projections are estimates, not guarantees</li>
            <li>Cryptocurrency markets are highly volatile</li>
            <li>Past performance doesn't predict future results</li>
            <li>Invest only what you can afford to lose</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderUtility = () => (
    <div className="tkn-section">
      <h2>Token Utility</h2>
      <div className="tkn-utility-grid">
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">⛽</div>
          <h3>Gas Fees</h3>
          <p>Pay for all network transactions with HL0 tokens at ultra-low costs</p>
        </div>
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">🔒</div>
          <h3>Staking Rewards</h3>
          <p>Lock tokens to earn 100-1000% APR with no penalties for unstaking</p>
        </div>
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">🗳️</div>
          <h3>Governance</h3>
          <p>Vote on protocol upgrades, parameter changes, and ecosystem decisions</p>
        </div>
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">🎫</div>
          <h3>Premium Access</h3>
          <p>Unlock advanced features, priority support, and exclusive services</p>
        </div>
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">💰</div>
          <h3>Service Discounts</h3>
          <p>Get up to 50% discounts on all HyperLayer0 ecosystem services</p>
        </div>
        <div className="tkn-utility-card">
          <div className="tkn-utility-icon">🌉</div>
          <h3>Cross-Chain Bridge</h3>
          <p>Seamlessly move assets across all connected blockchains</p>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'distribution', label: 'Distribution', icon: '🥧' },
    { id: 'presale', label: 'Presale', icon: '🚀' },
    { id: 'staking', label: 'Staking', icon: '🔒' },
    { id: 'projections', label: 'Projections', icon: '📈' },
    { id: 'utility', label: 'Utility', icon: '⚡' }
  ];

  // Inject styles when component mounts
  useEffect(() => {
    const tokenomicsStyles = `
/* Tokenomics Page - Isolated Styles with tkn- prefix */
.tkn-page-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  isolation: isolate;
}

.tkn-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  color: white;
  font-family: 'Inter', sans-serif;
  padding-top: 80px;
  position: relative;
  z-index: 1;
}

.tkn-header {
  text-align: center;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 2;
}

.tkn-header .tkn-header-content h1 {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.tkn-header .tkn-header-content p {
  font-size: 1.2rem;
  color: #888;
  margin: 0;
}

.tkn-pure-utility-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-top: 1.5rem;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.tkn-badge-icon {
  font-size: 1.2rem;
}

.tkn-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.tkn-nav .tkn-nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.tkn-nav .tkn-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
  color: white;
}

.tkn-nav .tkn-nav-item.active {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 204, 255, 0.2));
  border-color: #00ff88;
  color: white;
}

.tkn-nav-icon {
  font-size: 1.2rem;
}

.tkn-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  position: relative;
  z-index: 2;
}

.tkn-section {
  margin-bottom: 4rem;
}

.tkn-section h2 {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hero Stats */
.tkn-hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.tkn-stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.tkn-stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.1);
}

.tkn-stat-card.tkn-pure-utility {
  border-color: rgba(255, 107, 53, 0.3);
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 26, 0.1));
}

.tkn-stat-card.tkn-current-price {
  border-color: rgba(0, 204, 255, 0.3);
  background: linear-gradient(135deg, rgba(0, 204, 255, 0.1), rgba(0, 255, 136, 0.1));
}

.tkn-stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tkn-stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #00ff88;
  margin-bottom: 0.5rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-stat-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.tkn-stat-subtitle {
  font-size: 0.9rem;
  color: #888;
}

/* Pure Utility Banner */
.tkn-pure-utility-banner {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
}

.tkn-banner-content h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
}

.tkn-utility-benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tkn-benefit {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
}

.tkn-benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tkn-benefit strong {
  color: #00ff88;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
}

.tkn-benefit p {
  color: #ccc;
  margin: 0;
}

/* Distribution - Large Pie Chart */
.tkn-distribution-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

.tkn-pie-chart-large {
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 255, 136, 0.2);
}

.tkn-pie-slice-large {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.tkn-pie-center-large {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #0a0a0f, #1a1a2e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid rgba(0, 255, 136, 0.3);
}

.tkn-center-text-large {
  text-align: center;
}

.tkn-total-supply-large {
  font-size: 3rem;
  font-weight: 900;
  color: #00ff88;
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-center-label-large {
  font-size: 1.2rem;
  color: #888;
  display: block;
  margin-bottom: 0.25rem;
}

.tkn-center-subtitle {
  font-size: 0.9rem;
  color: #00ccff;
  font-style: italic;
}

.tkn-distribution-legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
}

.tkn-legend-item-grid {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tkn-legend-item-grid:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.1);
}

.tkn-legend-color-large {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tkn-legend-content-grid {
  flex: 1;
}

.tkn-legend-header-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.tkn-legend-category-grid {
  font-weight: 700;
  color: white;
  font-size: 1rem;
}

.tkn-legend-percentage-grid {
  font-weight: 900;
  color: #00ff88;
  font-size: 1.1rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-legend-tokens-grid {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.25rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-legend-description-grid {
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
}

/* Presale */
.tkn-presale-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.tkn-presale-stat {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.tkn-presale-number {
  font-size: 2rem;
  font-weight: 900;
  color: #00ff88;
  display: block;
  margin-bottom: 0.5rem;
}

.tkn-presale-label {
  color: #888;
  font-weight: 600;
}

.tkn-phases-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.tkn-phase-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.tkn-phase-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.tkn-phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tkn-phase-header h3 {
  color: #00ff88;
  margin: 0;
  font-size: 1.3rem;
}

.tkn-phase-batches {
  background: rgba(0, 204, 255, 0.2);
  color: #00ccff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tkn-phase-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tkn-phase-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tkn-stat-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tkn-stat-value {
  font-weight: 700;
  color: white;
  font-family: 'Roboto Mono', monospace;
}

.tkn-stat-value.tkn-highlight {
  color: #00ff88;
}

.tkn-phase-description {
  color: #ccc;
  font-style: italic;
}

.tkn-daily-increase-info {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 204, 255, 0.1));
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 2rem;
}

.tkn-increase-card h3 {
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.tkn-increase-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
}

.tkn-increase-stat {
  text-align: center;
}

.tkn-increase-amount {
  font-size: 2.5rem;
  font-weight: 900;
  color: #00ff88;
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-increase-label {
  color: #888;
  font-weight: 600;
}

.tkn-increase-benefits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.tkn-benefit-point {
  color: #ccc;
  font-size: 0.9rem;
}

/* Staking */
.tkn-staking-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.tkn-staking-stat {
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.tkn-staking-number {
  font-size: 2rem;
  font-weight: 900;
  color: #ff6b35;
  display: block;
  margin-bottom: 0.5rem;
}

.tkn-staking-label {
  color: #888;
  font-weight: 600;
}

.tkn-staking-breakdown h3 {
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.tkn-staking-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tkn-year-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.tkn-year-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tkn-year-number {
  font-weight: 700;
  color: white;
}

.tkn-year-apr {
  background: rgba(255, 107, 53, 0.2);
  color: #ff6b35;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tkn-year-tokens {
  font-family: 'Roboto Mono', monospace;
  color: #00ff88;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tkn-year-description {
  font-size: 0.8rem;
  color: #888;
}

.tkn-dynamic-apr-info {
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 16px;
  padding: 2rem;
}

.tkn-dynamic-apr-info h3 {
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.tkn-apr-batch-system {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.tkn-apr-batch {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 2px solid rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
}

.tkn-apr-batch:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 107, 53, 0.6);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
}

.tkn-batch-number {
  color: #ff6b35;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tkn-batch-apr {
  color: white;
  font-weight: 900;
  font-size: 1.5rem;
  font-family: 'Roboto Mono', monospace;
}

.tkn-apr-explanation {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
}

.tkn-apr-explanation p {
  color: #ccc;
  margin: 0;
  text-align: center;
  font-style: italic;
}

.tkn-apr-note {
  text-align: center;
  color: #888;
  font-style: italic;
}

/* Projections */
.tkn-projections-table {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.tkn-table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background: rgba(0, 255, 136, 0.1);
  padding: 1rem;
  font-weight: 700;
  color: #00ff88;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tkn-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.tkn-table-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tkn-table-row:last-child {
  border-bottom: none;
}

.tkn-projection-period {
  font-weight: 600;
  color: white;
}

.tkn-projection-supply,
.tkn-projection-price,
.tkn-projection-mcap {
  font-family: 'Roboto Mono', monospace;
  color: #ccc;
}

.tkn-projection-roi {
  font-weight: 700;
  color: #00ff88;
}

.tkn-projection-notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.tkn-note-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.tkn-note-card h4 {
  color: white;
  margin-bottom: 1rem;
}

.tkn-note-card ul {
  margin: 0;
  padding-left: 1.5rem;
}

.tkn-note-card li {
  color: #ccc;
  margin-bottom: 0.5rem;
}

/* Utility */
.tkn-utility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tkn-utility-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.tkn-utility-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.tkn-utility-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tkn-utility-card h3 {
  color: #00ff88;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.tkn-utility-card p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .tkn-distribution-main {
    gap: 3rem;
  }
  
  .tkn-pie-chart-large {
    width: 400px;
    height: 400px;
  }
  
  .tkn-pie-center-large {
    width: 160px;
    height: 160px;
  }
  
  .tkn-total-supply-large {
    font-size: 2.5rem;
  }
  
  .tkn-distribution-legend-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .tkn-increase-details {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .tkn-increase-benefits {
    grid-template-columns: 1fr;
  }
  
  .tkn-projection-notes {
    grid-template-columns: 1fr;
  }
  
  .tkn-apr-batch-system {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .tkn-page {
    padding-top: 70px;
  }
  
  .tkn-header {
    padding: 2rem 1rem 1rem;
  }
  
  .tkn-header .tkn-header-content h1 {
    font-size: 2.5rem;
  }
  
  .tkn-nav {
    padding: 1rem;
    gap: 0.5rem;
  }
  
  .tkn-nav .tkn-nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .tkn-content {
    padding: 0 1rem 2rem;
  }
  
  .tkn-hero-stats {
    grid-template-columns: 1fr;
  }
  
  .tkn-utility-benefits {
    grid-template-columns: 1fr;
  }
  
  .tkn-phases-container {
    grid-template-columns: 1fr;
  }
  
  .tkn-phase-content {
    grid-template-columns: 1fr;
  }
  
  .tkn-table-header,
  .tkn-table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .tkn-table-header > div,
  .tkn-table-row > div {
    padding: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .tkn-pie-chart-large {
    width: 300px;
    height: 300px;
  }
  
  .tkn-pie-center-large {
    width: 120px;
    height: 120px;
  }
  
  .tkn-total-supply-large {
    font-size: 2rem;
  }
  
  .tkn-center-label-large {
    font-size: 1rem;
  }
  
  .tkn-center-subtitle {
    font-size: 0.8rem;
  }
  
  .tkn-distribution-legend-grid {
    grid-template-columns: 1fr;
  }
  
  .tkn-apr-batch-system {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .tkn-nav .tkn-nav-item .tkn-nav-label {
    display: none;
  }
  
  .tkn-stat-card {
    padding: 1.5rem;
  }
  
  .tkn-stat-number {
    font-size: 2rem;
  }
  
  .tkn-pure-utility-banner {
    padding: 2rem;
  }
  
  .tkn-banner-content h2 {
    font-size: 1.5rem;
  }
  
  .tkn-pie-chart-large {
    width: 250px;
    height: 250px;
  }
  
  .tkn-pie-center-large {
    width: 100px;
    height: 100px;
  }
  
  .tkn-total-supply-large {
    font-size: 1.5rem;
  }
  
  .tkn-center-label-large {
    font-size: 0.8rem;
  }
  
  .tkn-center-subtitle {
    font-size: 0.7rem;
  }
  
  .tkn-legend-item-grid {
    padding: 1rem;
  }
  
  .tkn-apr-batch {
    padding: 1rem;
  }
  
  .tkn-batch-apr {
    font-size: 1.2rem;
  }
}
`;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = tokenomicsStyles;
    styleSheet.setAttribute('data-tokenomics-styles', 'true');
    document.head.appendChild(styleSheet);

    return () => {
      const existingStyle = document.querySelector('[data-tokenomics-styles="true"]');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div className="tkn-page-wrapper">
      <div className="tkn-page">
        <div className="tkn-header">
          <div className="tkn-header-content">
            <h1>HyperLayer0 Tokenomics</h1>
            <p>Revolutionary Pure Utility Model - 9.9B tokens forever</p>
          </div>
          <div className="tkn-pure-utility-badge">
            <span className="tkn-badge-icon">💎</span>
            <span className="tkn-badge-text">ZERO Burns Model</span>
          </div>
        </div>

        <nav className="tkn-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`tkn-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="tkn-nav-icon">{section.icon}</span>
              <span className="tkn-nav-label">{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="tkn-content">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'distribution' && renderDistribution()}
          {activeSection === 'presale' && renderPresale()}
          {activeSection === 'staking' && renderStaking()}
          {activeSection === 'projections' && renderProjections()}
          {activeSection === 'utility' && renderUtility()}
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;