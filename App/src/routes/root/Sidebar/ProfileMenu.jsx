import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListGroupItem action onClick={() => setOpen(!open)}>
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="me-3">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span>Profile</span>
          <span className="ms-auto">
            {open ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </span>
        </div>
      </ListGroupItem>
      <Collapse in={open}>
        <ListGroup>
          <ListGroupItem action>
            <span>Account</span>
          </ListGroupItem>
          <ListGroupItem action>
            <span>Settings</span>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </>
  );
}
