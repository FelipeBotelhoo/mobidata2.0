import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.style.css';
import Logo from '../../img/logoMenu.png';

function Menu() {
  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src={Logo}
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
          <Nav className="ms-md-auto mx-auto"> 
            <Nav.Link href="#dashboard" className="nav-link-custom">Dashboard</Nav.Link> {/* futura implementação */}
            <Nav.Link href="#users" className="nav-link-custom">Usuários</Nav.Link>   {/* futura implementação */}
            <Nav.Link href="#settings" className="nav-link-custom">Configurações</Nav.Link>   {/* futura implementação */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;