import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-letter">B</span>
              <span className="logo-text">BitFlow</span>
            </div>
            <p className="footer-tagline">
              Solução Layer 2 Avançada para Bitcoin com alta escalabilidade, baixo custo e funcionalidades avançadas.
            </p>
            <div className="social-links">
              <a href="https://twitter.com/bitflow" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="icon-twitter"></i>
              </a>
              <a href="https://t.me/bitflow" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="icon-telegram"></i>
              </a>
              <a href="https://discord.gg/bitflow" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="icon-discord"></i>
              </a>
              <a href="https://github.com/bitflow" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="icon-github"></i>
              </a>
              <a href="https://medium.com/bitflow" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="icon-medium"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Projeto</h4>
              <ul>
                <li><a href="/about">Sobre</a></li>
                <li><a href="/architecture">Arquitetura</a></li>
                <li><a href="/use-cases">Casos de Uso</a></li>
                <li><a href="/roadmap">Roadmap</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Recursos</h4>
              <ul>
                <li><a href="/docs">Documentação</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/demo">Demo</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacidade</a></li>
                <li><a href="/terms">Termos</a></li>
                <li><a href="/cookies">Cookies</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h4>Fique por dentro</h4>
            <p>Inscreva-se para receber as últimas notícias e atualizações do BitFlow.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Seu e-mail" required />
              <button type="submit">Inscrever</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 BitFlow. Todos os direitos reservados.</p>
          <div className="language-selector">
            <select>
              <option value="pt-br">Português (BR)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
