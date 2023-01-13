import React from 'react';
import { Navbar, Container, Nav, NavItem, NavLink, Badge, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faInbox, faGear, faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';
import Search from './Search.jsx';

export default function NavBar() {
  const { logout } = useAuth0();
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <FontAwesomeIcon icon={faCow} size="xl" />
          <span className="ms-3 display-4 fs-4">Digital Mail</span>
        </Navbar.Brand>
        <div className="w-25">
          <Search />
        </div>
        <Nav>
          <NavItem>
            <NavLink active>
              <div className="position-relative">
                <FontAwesomeIcon icon={faInbox} size="lg" />
                <Badge
                  bg="warning"
                  className="rounded-circle position-absolute top-0 end-0"
                  style={{ marginTop: '-1px', marginRight: '-2px', padding: '.3rem' }}
                >
                  <span className="visually-hidden">Unread</span>
                </Badge>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <FontAwesomeIcon icon={faGear} size="lg" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <FontAwesomeIcon icon={faCircleInfo} size="lg" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <div className="d-flex">
                <Dropdown align="end">
                  <Dropdown.Toggle as="span" className="ms-1">
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>User</Dropdown.Header>
                    <Dropdown.Item
                      onClick={() => {
                        console.log('Logging out.');
                        logout({ returnTo: `${window.location.origin}` });
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}
