import React from 'react';
import { Outlet } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar/NavBar.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Footer from './Footer/Footer.jsx';

function Root() {
  return (
    <>
      <NavBar />
      <Container fluid className="g-0">
        <Row className="g-0">
          <Sidebar />
          <Col>
            <Outlet />
            {/* <GreetingCard />
            <MailList /> */}
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
}

export default withAuthenticationRequired(Root, {
  onRedirecting: () => <div>Redirecting...</div>,
});
