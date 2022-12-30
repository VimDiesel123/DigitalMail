import React from 'react';
import { Navbar, Container, Form, Nav, NavItem, NavLink, FormControl } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Digital Mail</Navbar.Brand>
        <Form>
          <FormControl type="search" placeholder="Search" />
        </Form>
        <Nav>
          <NavItem>
            <NavLink className="text-white">Inbox</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white">Profile</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
