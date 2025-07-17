import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Home.css';
import './PoweredBy.css';
import { 
  switchToNetwork, 
  getWalletBalance, 
  getTokenBalance,
  sendNativeTransaction,
  sendTokenTransaction,
  getProviderErrorMessage,
  analyzeProvider
} from '../../utils/providerUtils';

// CountdownTimer Component - Enhanced for Pre-Sale Launch
interface CountdownTimerProps {
  targetDate: Date;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  onComplete
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeRemaining(0);
        onComplete();
        return;
      }
      
      setTimeRemaining(Math.floor(difference / 1000));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);
  
  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;
  
  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  const totalSeconds = Math.floor((targetDate.getTime() - new Date('2025-07-14').getTime()) / 1000);
  const progressPercentage = totalSeconds > 0 ? (100 - (timeRemaining / totalSeconds * 100)) : 0;
  
  const isUrgent = days <= 3;
  const isCritical = days <= 1;
  
  return (
    <div className={`countdown-timer-wrapper ${isUrgent ? 'countdown-urgent' : ''} ${isCritical ? 'countdown-critical' : ''}`}>
      <div className="countdown-display-main">
        <div className="time-segment">
          <div className="time-value">{formattedDays}</div>
          <div className="time-label">Days</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedHours}</div>
          <div className="time-label">Hours</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedMinutes}</div>
          <div className="time-label">Min</div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-segment">
          <div className="time-value">{formattedSeconds}</div>
          <div className="time-label">Sec</div>
        </div>
      </div>
      
      <div className="progress-container-compact">
        <div 
          className="progress-bar-compact" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="apy-info-compact">
        <span className="apy-current">Pre-Sale Starts: <strong>July 29, 2025</strong></span>
        <span className="apy-warning">Tuesday 00:00 Monaco Time</span>
      </div>
      
      {isCritical && (
        <div className="critical-badge">
          <span className="critical-icon">🚨</span>
          <span className="critical-text">FINAL HOURS!</span>
        </div>
      )}
      
      {isUrgent && !isCritical && (
        <div className="urgent-badge">
          <span className="urgent-icon">⚡</span>
          <span className="urgent-text">FINAL DAYS!</span>
        </div>
      )}
    </div>
  );
};

// Enhanced Types
interface HomeProps {
  isConnected: boolean;
  walletAddress: string | null;
  provider: any;
  currentAPY: number;
  onCountdownComplete: () => void;
  onConnect: () => void;
  onPurchase: (method: 'card' | 'crypto', amount: number, currency: string) => void;
}

interface BonusStructure {
  minUSD: number;
  bonusPercent: number;
  label: string;
  icon: string;
  color: string;
  description: string;
}

interface CurrentBatch {
  batchNumber: number;
  priceUSD: number;
  phase: string;
  basePrice: number;
  tokensTotal: number;
  tokensSold: number;
  daysElapsed: number;
  maxBonus: number;
  apyRate: number;
  nextBatchPrice: number;
  endDate: Date;
}

// Enhanced Bonus structure - CORRECTED & SUSTAINABLE
const BONUS_STRUCTURE: BonusStructure[] = [
  { 
    minUSD: 50000, 
    bonusPercent: 100, 
    label: "Blue Whale Tier", 
    icon: "🐋", 
    color: "#1E40AF",
    description: "Institutional level - Maximum rewards"
  },
  { 
    minUSD: 25000, 
    bonusPercent: 80, 
    label: "Orca Tier", 
    icon: "🐋", 
    color: "#2563EB",
    description: "High-volume investor benefits"
  },
  { 
    minUSD: 10000, 
    bonusPercent: 60, 
    label: "Whale Tier", 
    icon: "🐋", 
    color: "#3B82F6",
    description: "Premium investor package"
  },
  { 
    minUSD: 5000, 
    bonusPercent: 45, 
    label: "Shark Tier", 
    icon: "🦈", 
    color: "#10B981",
    description: "Advanced investor level"
  },
  { 
    minUSD: 2000, 
    bonusPercent: 30, 
    label: "Dolphin Tier", 
    icon: "🐬", 
    color: "#059669",
    description: "Standard bonus package"
  },
  { 
    minUSD: 500, 
    bonusPercent: 15, 
    label: "Fish Tier", 
    icon: "🐟", 
    color: "#0D9488",
    description: "Entry level bonus"
  },
  { 
    minUSD: 0, 
    bonusPercent: 5, 
    label: "Shrimp Tier", 
    icon: "🦐", 
    color: "#6B7280",
    description: "Starter bonus"
  }
];

// Enhanced batch data for pre-sale
const INITIAL_BATCH_DATA: CurrentBatch = {
  batchNumber: 1,
  priceUSD: 0.0090000,
  phase: "Early Innovation",
  basePrice: 0.0090000,
  tokensTotal: 200000000,
  tokensSold: 0,
  daysElapsed: 0,
  maxBonus: 100,
  apyRate: 1000,
  nextBatchPrice: 0.0150000,
  endDate: new Date('2025-07-29T00:00:00+02:00') // Monaco timezone
};

// Enhanced constants
const TELEGRAM_BOT_URL = 'https://t.me/HyperLayer0';

// Enhanced utility functions
const formatNumber = (num: number) => num.toString().padStart(2, '0');
const formatTokens = (tokens: number) => tokens.toLocaleString('en-US', { 
  maximumFractionDigits: 2,
  minimumFractionDigits: 0
});

const formatUSD = (amount: number, precision?: number) => {
  const defaultPrecision = amount < 0.01 ? 7 : 2;
  const fractionDigits = precision !== undefined ? precision : defaultPrecision;
  
  return `$${amount.toLocaleString('en-US', { 
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: amount < 0.01 ? 5 : 2
  })}`;
};

// Enhanced Main Component
const Home: React.FC<HomeProps> = ({
  isConnected,
  walletAddress,
  provider,
  currentAPY,
  onCountdownComplete,
  onConnect,
  onPurchase
}) => {
  // Enhanced State Management
  const [currentBatch, setCurrentBatch] = useState(INITIAL_BATCH_DATA);
  const [notifications, setNotifications] = useState<Array<{id: string, type: 'success' | 'error' | 'info', message: string, timestamp: number}>>([]);

  // Pre-sale launch date - July 29, 2025 00:00 Monaco Time
  const preSaleLaunchDate = useMemo(() => {
    return new Date('2025-07-29T00:00:00+02:00'); // Monaco timezone (UTC+2)
  }, []);

  // Enhanced notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message, timestamp: Date.now() }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  // Calculate days until pre-sale
  const daysUntilPreSale = useMemo(() => {
    const now = new Date();
    const diffTime = preSaleLaunchDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [preSaleLaunchDate]);

  return (
    <>
      {/* Powered by Banner */}
      <div className="powered-by-banner">
        <div className="powered-by-content">
          <span className="powered-by-text">Powered by</span>
          <img 
            src="/beset.png" 
            alt="Beset" 
            className="beset-logo" 
          />
        </div>
      </div>

      <main className="main-purchase-section">
        {/* Enhanced Notifications */}
        <div className="notifications-container">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification notification-${notification.type}`}
              onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            >
              <span className="notification-message">{notification.message}</span>
              <button className="notification-close">×</button>
            </div>
          ))}
        </div>

        <div className="purchase-container">
          <div className="main-layout">
            {/* Left Side - Enhanced Text Content */}
            <div className="text-side">
              {/* Enhanced Pre-Sale Announcement Banner */}
              <div className="guaranteed-returns-banner enhanced">
                <div className="banner-content">
                  <div className="banner-icon animated">🚀</div>
                  <div className="banner-text">
                    <span className="banner-title">PRE-SALE STARTING SOON!</span>
                    <span className="banner-title">PREPARE FOR 10000%+ RETURNS!</span>
                    <span className="banner-subtitle">
                      {formatUSD(0.0090000, 7)} → {formatUSD(1.20)} Launch • 100x Minimum Guaranteed
                    </span>
                  </div>
                  <div className="banner-stats">
                    <div className="stat-item">
                      <span className="stat-number">{daysUntilPreSale}</span>
                      <span className="stat-label">Days Left</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{currentBatch.maxBonus}%</span>
                      <span className="stat-label">Max Bonus</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1>
                The Future of <span className="highlight">Pure Utility</span> Infrastructure
              </h1>
              
              <p>
                <strong>HyperLayer0</strong> introduces the revolutionary "Pure Utility" model - 
                the first Layer 0 with ZERO burns on everything. Your tokens, your choice, forever. 
                Value through genuine utility, not artificial scarcity.
              </p>

              <div className="features-grid enhanced">
                <div className="feature-item">
                  <div className="feature-icon">🆓</div>
                  <div className="feature-text">
                    <h4>Zero Burns Forever</h4>
                    <p>No transaction burns, no bridge burns, no staking penalties - never!</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">💎</div>
                  <div className="feature-text">
                    <h4>Your Tokens = Eternal</h4>
                    <p>9.9B tokens forever - no artificial scarcity, just pure utility</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-text">
                    <h4>Infinite Freedom</h4>
                    <p>Use, trade, bridge, stake or hold - zero pressure, maximum choice</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">🚀</div>
                  <div className="feature-text">
                    <h4>Value = Utility</h4>
                    <p>Price grows with real adoption and genuine ecosystem value</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Section */}
              <div className="stats-section enhanced">
                <div className="stat">
                  <div className="stat-number">0%</div>
                  <div className="stat-label">Total Burns</div>
                </div>
                <div className="stat">
                  <div className="stat-number">9.9B</div>
                  <div className="stat-label">Eternal Supply</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">User Freedom</div>
                </div>
                <div className="stat">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Possibilities</div>
                </div>
              </div>

              {/* Enhanced Bonus Structure Section */}
              <div className="bonus-structure-section enhanced">
                <h3>🎁 Bonus Structure - Batch {currentBatch.batchNumber}</h3>
                <p className="bonus-subtitle">Higher investment = Higher bonus percentage</p>
                
                <div className="bonus-tiers enhanced">
                  {BONUS_STRUCTURE.map((tier, index) => (
                    <div key={index} className="bonus-tier" style={{ borderLeftColor: tier.color }}>
                      <div className="tier-icon" style={{ color: tier.color }}>{tier.icon}</div>
                      <div className="tier-info">
                        <div className="tier-name" style={{ color: tier.color }}>{tier.label}</div>
                        <div className="tier-requirement">
                          {tier.minUSD > 0 ? `${formatUSD(tier.minUSD)}+` : 'Any amount'}
                        </div>
                        <div className="tier-bonus">+{tier.bonusPercent}% Bonus</div>
                        <div className="tier-description">{tier.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bonus-example enhanced">
                  <h4>💡 Return Examples (at $1.20 launch):</h4>
                  <div className="example-grid enhanced">
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(50000)}</span>
                      <span className="example-bonus">🐋 +100% = 2.0x tokens</span>
                      <span className="example-roi">ROI: +26,500%</span>
                    </div>
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(25000)}</span>
                      <span className="example-bonus">🐋 +80% = 1.8x tokens</span>
                      <span className="example-roi">ROI: +23,900%</span>
                    </div>
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(10000)}</span>
                      <span className="example-bonus">🐋 +60% = 1.6x tokens</span>
                      <span className="example-roi">ROI: +21,200%</span>
                    </div>
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(5000)}</span>
                      <span className="example-bonus">🦈 +45% = 1.45x tokens</span>
                      <span className="example-roi">ROI: +19,200%</span>
                    </div>
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(2000)}</span>
                      <span className="example-bonus">🐬 +30% = 1.3x tokens</span>
                      <span className="example-roi">ROI: +17,200%</span>
                    </div>
                    <div className="example-item">
                      <span className="example-amount">{formatUSD(500)}</span>
                      <span className="example-bonus">🐟 +15% = 1.15x tokens</span>
                      <span className="example-roi">ROI: +15,200%</span>
                    </div>
                  </div>
                  <div className="guarantee-note">
                    <strong>🎯 GUARANTEE:</strong> All values assume minimum launch price of $1.20
                  </div>
                </div>
              </div>

              {/* Pre-Sale Information */}
              <div className="portfolio-section">
                <h3>📅 Pre-Sale Information</h3>
                <div className="portfolio-stats">
                  <div className="portfolio-stat">
                    <span className="stat-label">Launch Date</span>
                    <span className="stat-value">July 29, 2025</span>
                    <span className="stat-detail">Tuesday 00:00 Monaco Time</span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Starting Price</span>
                    <span className="stat-value">{formatUSD(0.0090000, 7)}</span>
                    <span className="stat-detail">Batch 1 - Early Innovation</span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Launch Target</span>
                    <span className="stat-value">{formatUSD(1.20)}</span>
                    <span className="stat-detail">133x minimum guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Pre-Sale Widget */}
            <div className="card-side">
              <div className="purchase-widget enhanced">
                {/* Enhanced Countdown Section */}
                <div className="countdown-section enhanced">
                  <div className="batch-header">
                    <h2>🎯 Pre-Sale Countdown</h2>
                    <div className="price-display">
                      <span className="current-price">Starting at {formatUSD(currentBatch.priceUSD, 7)}</span>
                    </div>
                  </div>
                  
                  <div className="countdown-timer-container">
                    <h3>🚀 Pre-Sale Starts In:</h3>
                    <CountdownTimer 
                      targetDate={preSaleLaunchDate}
                      onComplete={onCountdownComplete}
                    />
                    <div className="price-increase-info">
                      <div className="price-info-item">
                        <span>Launch Date:</span>
                        <strong>July 29, 2025</strong>
                      </div>
                      <div className="price-info-item">
                        <span>Monaco Time:</span>
                        <strong>00:00 Tuesday</strong>
                      </div>
                      <div className="price-info-item">
                        <span>Starting APY:</span>
                        <strong>{currentBatch.apyRate}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="batch-quick-info">
                    <div className="quick-stat">
                      <span className="stat-icon">🎁</span>
                      <span>Max Bonus: <strong>{currentBatch.maxBonus}% 🐋</strong></span>
                    </div>
                    <div className="quick-stat">
                      <span className="stat-icon">🔮</span>
                      <span>Launch APY: <strong>{currentBatch.apyRate}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Pre-Sale Info Section */}
                <div className="progress-section enhanced">
                  <div className="raised-amount">
                    <span className="batch-info">
                      Pre-Sale: Ready for Launch
                    </span>
                    <span className="usd-raised">
                      20 Epic Batches Planned
                    </span>
                  </div>
                  <div className="progress-bar enhanced">
                    <div 
                      className="progress-fill" 
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span>0% Complete</span>
                    <span>All 200M Tokens Available</span>
                  </div>
                  
                  {/* Enhanced Launch Alert */}
                  <div className="next-batch-info enhanced">
                    <div className="next-batch-alert">
                      <span className="alert-icon">🚀</span>
                      <div className="alert-content">
                        <div className="batch-warning-line">
                          <strong>Batch 1:</strong> Starts at <strong>{formatUSD(0.0090000, 7)}</strong>
                        </div>
                        <div className="batch-warning-line">
                          <strong>Batch 2:</strong> Price jumps to <strong>{formatUSD(0.015, 3)}</strong> (+67%)
                        </div>
                        <div className="batch-warning-line">
                          <strong>Launch Target:</strong> <strong>{formatUSD(1.20)}</strong> (133x from Batch 1)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Coming Soon Buttons */}
                <div className="form-section enhanced">
                  <div className="purchase-buttons">
                    <button 
                      className="purchase-btn primary"
                      disabled={true}
                    >
                      <span className="button-content">
                        <span className="button-icon">🔜</span>
                        Coming Soon
                      </span>
                    </button>

                    <button 
                      className="purchase-btn staking"
                      disabled={true}
                    >
                      <span className="button-content">
                        <span className="button-icon">🔜</span>
                        Coming Soon
                      </span>
                    </button>
                  </div>

                  {/* Enhanced Pre-Sale Info */}
                  <div className="staking-info enhanced">
                    <div className="staking-benefit">
                      <span className="staking-icon">⏰</span>
                      <div className="staking-text">
                        <div className="staking-title">
                          <strong>Get Ready for the Pre-Sale:</strong>
                        </div>
                        <div className="staking-description">
                          Pre-sale launches on <strong>July 29, 2025</strong> at midnight Monaco time!
                          <br/>
                          <strong>Be Ready:</strong> 20 batches, massive bonuses, and the chance to secure 
                          your position in the next 133x opportunity!
                        </div>
                        <div className="staking-benefits-list">
                          <div className="benefit-item">
                            <span className="benefit-icon">🎯</span>
                            <span>Starting Price: {formatUSD(0.0090000, 7)}</span>
                          </div>
                          <div className="benefit-item">
                            <span className="benefit-icon">🚀</span>
                            <span>Target: {formatUSD(1.20)} (133x)</span>
                          </div>
                          <div className="benefit-item">
                            <span className="benefit-icon">🎁</span>
                            <span>Max Bonus: 100% (Blue Whale)</span>
                          </div>
                          <div className="benefit-item">
                            <span className="benefit-icon">🔒</span>
                            <span>Staking: 1000% APY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help & Support Section */}
                <div className="help-section">
                  <h4>💬 Get Notified When We Launch</h4>
                  <div className="help-buttons">
                    <button 
                      className="help-btn"
                      onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                    >
                      <span className="help-icon">✈️</span>
                      Join Telegram
                    </button>
                  </div>
                  <div className="help-info">
                    <p>
                      Join our Telegram for instant notifications when the pre-sale goes live!
                      Be the first to secure your position in Batch 1.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;