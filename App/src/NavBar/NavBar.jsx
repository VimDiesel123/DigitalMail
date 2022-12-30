import React from 'react';
import { Navbar, Container, Form, Nav, NavItem, NavLink, FormControl } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Digital Mail</Navbar.Brand>
        <Form>
          <FormControl type="search" placeholder="Search" />
        </Form>
        <Nav>
          <NavItem>
            <NavLink active>Inbox</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Profile</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
