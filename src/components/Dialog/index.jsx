import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './dialog.style.css';

export const Dialog = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      dialogClassName="premium-dialog"
    >
      <div className="dialog-header">
        <Modal.Title className="dialog-title">
          <span className="warning-icon">!</span>
          CONFIRMAÇÃO
        </Modal.Title>
      </div>
      
      <Modal.Body className="dialog-body">
        <p className="dialog-message">{message}</p>
      </Modal.Body>
      
      <Modal.Footer className="dialog-footer">
        <Button 
          variant="outline-danger" 
          className="dialog-btn dialog-btn-cancel"
          onClick={onHide}
        >
          CANCELAR
        </Button>
        <Button 
          variant="danger" 
          className="dialog-btn dialog-btn-confirm"
          onClick={onConfirm}
        >
          CONFIRMAR
        </Button>
      </Modal.Footer>
    </Modal>
  );
};