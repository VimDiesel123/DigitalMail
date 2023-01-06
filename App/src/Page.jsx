import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Container, Row, Col } from 'react-bootstrap';
import GreetingCard from './routes/MailList/GreetingCard.jsx';
import NavBar from './routes/root/NavBar/NavBar.jsx';
import Sidebar from './routes/root/Sidebar/Sidebar.jsx';
import MailList from './routes/MailList/MailList.jsx';
import Footer from './routes/root/Footer/Footer.jsx';

function Page() {
  return (
    <div>
      <NavBar />
      <Container fluid className="g-0">
        <Row className="g-0">
          <Sidebar />
          <Col>
            <GreetingCard />
            <MailList />
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
