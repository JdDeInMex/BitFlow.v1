import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Sobre o <span className="highlight">BitFlow</span>
            </h1>
            <p className="hero-subtitle">
              Revolucionando o Bitcoin com uma solução Layer 2 que combina 
              escalabilidade extrema, segurança herdada e funcionalidades avançadas
            </p>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="element element-1"></div>
              <div className="element element-2"></div>
              <div className="element element-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Nossa Missão</h2>
              <p>
                O BitFlow nasceu da necessidade de superar as limitações fundamentais 
                do Bitcoin sem comprometer sua segurança e descentralização. Nossa 
                missão é democratizar o acesso às finanças descentralizadas através 
                de uma infraestrutura Layer 2 que oferece:
              </p>
              <ul className="mission-list">
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Escalabilidade Massiva:</strong> Mais de 50.000 TPS
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Custos Mínimos:</strong> Taxas a partir de 0.001 sats
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Finalidade Instantânea:</strong> Confirmações em menos de 1 segundo
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Funcionalidades Avançadas:</strong> Smart contracts, DeFi e NFTs
                  </div>
                </li>
              </ul>
            </div>
            <div className="content-visual">
              <div className="mission-graphic">
                <div className="central-node">
                  <span>BitFlow</span>
                </div>
                <div className="orbit orbit-1">
                  <div className="satellite">Escalabilidade</div>
                </div>
                <div className="orbit orbit-2">
                  <div className="satellite">Segurança</div>
                </div>
                <div className="orbit orbit-3">
                  <div className="satellite">Funcionalidade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="section-container">
          <div className="vision-header">
            <h2>Nossa Visão</h2>
            <p>
              Transformar o Bitcoin na infraestrutura financeira global do futuro
            </p>
          </div>
          
          <div className="vision-cards">
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon global"></div>
              </div>
              <h3>Adoção Global</h3>
              <p>
                Facilitar a adoção massiva do Bitcoin através de uma experiência 
                de usuário superior e custos acessíveis.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon innovation"></div>
              </div>
              <h3>Inovação Contínua</h3>
              <p>
                Liderar o desenvolvimento de tecnologias que expandem as 
                capacidades do Bitcoin de forma segura.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">
                <div className="icon ecosystem"></div>
              </div>
              <h3>Ecossistema Robusto</h3>
              <p>
                Construir um ecossistema próspero que suporte aplicações 
                descentralizadas de próxima geração.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solution */}
      <section className="problem-solution">
        <div className="section-container">
          <div className="section-header">
            <h2>O Problema que Resolvemos</h2>
            <p>
              O Bitcoin, embora revolucionário, enfrenta desafios de escalabilidade 
              que limitam seu potencial como sistema de pagamento global.
            </p>
          </div>
          
          <div className="comparison-grid">
            <div className="comparison-side problems">
              <h3>Limitações Atuais</h3>
              <div className="comparison-items">
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Escalabilidade Limitada</h4>
                  </div>
                  <p>~7 transações por segundo na mainnet</p>
                  <div className="metric">
                    <span className="metric-value red">7 TPS</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Taxas Elevadas</h4>
                  </div>
                  <p>Custos que podem inviabilizar micropagamentos</p>
                  <div className="metric">
                    <span className="metric-value red">$5-50 por transação</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="negative-icon">✗</span>
                    <h4>Confirmação Lenta</h4>
                  </div>
                  <p>Tempo de espera inadequado para pagamentos instantâneos</p>
                  <div className="metric">
                    <span className="metric-value red">10-60 minutos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="comparison-divider">
              <div className="arrow-icon">→</div>
            </div>
            
            <div className="comparison-side solutions">
              <h3>Solução BitFlow</h3>
              <div className="comparison-items">
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Escalabilidade Massiva</h4>
                  </div>
                  <p>Processamento paralelo e batching inteligente</p>
                  <div className="metric">
                    <span className="metric-value green">50,000+ TPS</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Taxas Mínimas</h4>
                  </div>
                  <p>Viabiliza micropagamentos e aplicações de massa</p>
                  <div className="metric">
                    <span className="metric-value green">0.001 sats</span>
                  </div>
                </div>
                
                <div className="comparison-item">
                  <div className="item-header">
                    <span className="positive-icon">✓</span>
                    <h4>Finalidade Instantânea</h4>
                  </div>
                  <p>Experiência de usuário semelhante a pagamentos tradicionais</p>
                  <div className="metric">
                    <span className="metric-value green">&lt;1 segundo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
          <div className="problem-solution-cta">
            <button 
              className="primary-button large"
              onClick={() => {
                // Se estiver usando navegação simples
                if (window.location.pathname === '/') {
                  const event = new CustomEvent('navigate', { detail: 'use-cases' });
                  window.dispatchEvent(event);
                } else {
                  // Para navegação futura com React Router
                  window.location.href = '/use-cases';
                }
              }}
            >
              Ver Todas as Soluções
            </button>
            <p className="cta-description">
              Explore todos os casos de uso e aplicações práticas do BitFlow
            </p>
          </div>

      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Tecnologia de Ponta</h2>
            <p>
              Combinamos as melhores práticas em blockchain com inovações 
              proprietárias para criar uma solução única.
            </p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon zk-proof"></div>
              <h3>ZK-STARK Proofs</h3>
              <p>
                Provas de conhecimento zero que garantem privacidade 
                e verificação eficiente de grandes volumes de transações.
              </p>
              <div className="tech-benefit">
                Escalabilidade + Privacidade
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon sequencer"></div>
              <h3>BitFlow Sequencer</h3>
              <p>
                Sistema de ordenação de transações altamente otimizado 
                que processa milhares de operações por segundo.
              </p>
              <div className="tech-benefit">
                Performance Máxima
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon state-channels"></div>
              <h3>State Channels</h3>
              <p>
                Canais de estado para transações instantâneas entre 
                partes com liquidação na Layer 1.
              </p>
              <div className="tech-benefit">
                Transações Instantâneas
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon virtual-machine"></div>
              <h3>BitScript VM</h3>
              <p>
                Máquina virtual compatível que estende as capacidades 
                do Bitcoin Script para smart contracts complexos.
              </p>
              <div className="tech-benefit">
                Funcionalidades Avançadas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Equipe de Especialistas</h2>
            <p>
              Profissionais experientes em blockchain, criptografia e 
              desenvolvimento de sistemas distribuídos.
            </p>
          </div>
          
          <div className="team-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Anos de Experiência Combinada</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Especialistas em Blockchain</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8+</div>
              <div className="stat-label">PhDs em Criptografia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100M+</div>
              <div className="stat-label">Usuários Atendidos</div>
            </div>
          </div>
          
          <div className="expertise-areas">
            <h3>Áreas de Especialização</h3>
            <div className="expertise-grid">
              <div className="expertise-item">
                <div className="expertise-icon crypto"></div>
                <span>Criptografia Avançada</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon blockchain"></div>
                <span>Desenvolvimento Blockchain</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon security"></div>
                <span>Segurança de Sistemas</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon scaling"></div>
                <span>Soluções de Escalabilidade</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon defi"></div>
                <span>Protocolos DeFi</span>
              </div>
                <div className="expertise-item">
                <div className="expertise-icon scaling"></div>
                <span>GameFi Infrastructure</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon defi"></div>
                <span>NFT Marketplace</span>
              </div>
              <div className="expertise-item">
                <div className="expertise-icon ui-ux"></div>
                <span>Tokenização de Ativos</span>
              </div>
                            <div className="expertise-item">
                <div className="expertise-icon ui-ux"></div>
                <span>Metaverso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="section-container">
          <div className="community-content">
            <div className="community-text">
              <h2>Construindo o Futuro Juntos</h2>
              <p>
                O BitFlow é mais que uma solução tecnológica - é uma comunidade 
                global de desenvolvedores, usuários e entusiastas do Bitcoin 
                trabalhando para construir o futuro das finanças descentralizadas.
              </p>
              
              <div className="community-features">
                <div className="feature-item">
                  <span className="feature-icon">🌍</span>
                  <div>
                    <h4>Comunidade Global</h4>
                    <p>Membros ativos em vários países</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">📚</span>
                  <div>
                    <h4>Educação Contínua</h4>
                    <p>Recursos educacionais e workshops regulares</p>
                  </div>
                </div>
              </div>
              
            
            </div>
            
            <div className="community-visual">
              <div className="community-network">
                <div className="network-node central">BitFlow</div>
                <div className="network-node node-1">Desenvolvedores</div>
                <div className="network-node node-2">Usuários</div>
                <div className="network-node node-3">Validadores</div>
                <div className="network-node node-4">Parceiros</div>
                <div className="connection con-1"></div>
                <div className="connection con-2"></div>
                <div className="connection con-3"></div>
                <div className="connection con-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Pronto para Começar?</h2>
            <p>
              Junte-se à revolução Layer 2 do Bitcoin e faça parte do futuro 
              das finanças descentralizadas.
            </p>
            <div className="cta-buttons">
              <button className="primary-button large">
                Conectar Carteira
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;