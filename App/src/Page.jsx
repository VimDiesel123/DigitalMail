import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import GreetingCard from './GreetingCard.jsx';
import PDFLink from './PDFLinks.jsx';
import NavBar from './NavBar/NavBar.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

function Page() {
  return (
    <div>
      <NavBar />
      <Container fluid className="p-0">
        <Row>
          <Sidebar />
          <Col className="py-3">
            <GreetingCard />
            <PDFLink />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <div>Redirecting...</div>,
});
