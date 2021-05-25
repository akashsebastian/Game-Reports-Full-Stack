import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../css/style.css";

// Navbar Component
const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Film Room Analytics</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/game-report">
              <Nav.Link>Game Reports</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/player-report">
              <Nav.Link>Player Reports</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/team-report">
              <Nav.Link>Team Reports</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
