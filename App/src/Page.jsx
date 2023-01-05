import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import GreetingCard from './GreetingCard.jsx';
import NavBar from './NavBar/NavBar.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import MailList from './MailList/MailList.jsx';
import Footer from './Footer/Footer.jsx';

function Page() {
  return (
    <div>
      <NavBar />
      <Container fluid className="p-0">
        <Row className="g-0">
          <Sidebar />
          <Col>
            <GreetingCard />
            <MailList />
            {/* <PDFLink /> */}
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}

export default withAuthenticationRequired(Page, {
  onRedirecting: () => <div>Redirecting...</div>,
});
