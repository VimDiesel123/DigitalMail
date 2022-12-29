import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <div className="d-block col-2 bg-dark text-white min-vh-100" style={{ width: '230px' }}>
      <ListGroup>
        <ListGroupItem className="d-flex text-bg-dark text-muted align-items-center">
          <small>MAIN MENU</small>
        </ListGroupItem>
        <ListGroupItem action className="bg-dark">
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="text-bg-dark me-3">
              <FontAwesomeIcon icon={faInbox} />
            </span>
            <span className="text-bg-dark">
              Inbox{' '}
              <Badge pill bg="primary" className="ms-2">
                2
              </Badge>
            </span>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
