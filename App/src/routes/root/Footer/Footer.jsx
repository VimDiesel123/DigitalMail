import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Footer() {
  return (
    <Container fluid>
      <Row className="g-0">
        <footer className="d-flex justify-content-between align-items-center py-3 border-top fixed-bottom">
          <Col md={4} className="mx-5 px-5 text-muted">
            <a href="#" className="me-2 text-muted text-decoration-none lh-1">
              <FontAwesomeIcon icon={faCow} size="lg" />
            </a>
            <span>© 2023 David is Awesome, Inc</span>
          </Col>
          <Col md={4} as="ul" className="mx-5 px-5 d-flex justify-content-end list-unstyled">
            <li className="ms-3">
              <a href="#" className="text-muted">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </li>
            <li className="ms-3">
              <a href="#" className="text-muted">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </li>
            <li className="ms-3">
              <a href="#" className="text-muted">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
            </li>
          </Col>
        </footer>
      </Row>
    </Container>
  );
}
