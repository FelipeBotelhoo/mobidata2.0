import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import './toasts.style.css';
import Logo from '../../img/logoMenu.png';

export const Toasts = ({ show, onClose, message }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onClose();
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div className="toast-container">
      <Toast 
        show={show} 
        onClose={onClose}
        className="elegant-toast"
        autohide={false}
        delay={4000}
      >
        <Toast.Header className="toast-header-elegant" closeButton={true}>
          <div className="logo-container">
            <img src={Logo} alt="MobiData" className="toast-logo-elegant" />
          </div>
          <div className="toast-title-container">
            <strong className="me-auto toast-title-elegant">MobiData</strong>
            <small className="toast-subtitle">Notificação</small>
          </div>
        </Toast.Header>
        <Toast.Body className="toast-body-elegant">
          <div className="message-content">
            <div className="message-icon">✓</div>
            <p className="message-text">{message}</p>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};