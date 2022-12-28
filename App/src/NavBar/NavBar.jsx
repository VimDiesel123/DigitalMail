import React from 'react';
import { Navbar, Container, Form, Nav, NavItem, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar() {
  return (
    <Navbar bg="primary" variant="light" fixed="top">
      <Container>
        <Navbar.Brand className="col-2">Digital Mail</Navbar.Brand>
        <Nav fill>
          <Nav.Item>
            <Form>
              <Form.Control type="search" placeholder="Search" />
            </Form>
          </Nav.Item>
          <NavItem>
            <NavLink>
              <FontAwesomeIcon icon="inbox" />
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
