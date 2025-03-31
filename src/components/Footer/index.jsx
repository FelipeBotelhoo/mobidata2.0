import React from 'react';
import './footer.style.css';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="footer-content">
      <div className="footer-particles"></div>
        <div className="footer-logo">MOBIDATA</div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-info">
          <p className="footer-copyright">© 2024 Todos os direitos reservados</p>
          <p className="footer-version">Versão 1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;