import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function FilterMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListGroupItem action onClick={() => setOpen(!open)}>
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="me-3">
            <FontAwesomeIcon icon={faFilter} />
          </span>
          <span>Filter</span>
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
            <span>Important</span>
          </ListGroupItem>
          <ListGroupItem action>
            <span>Scan Complete</span>
          </ListGroupItem>
          <ListGroupItem action>
            <span>Scan Pending</span>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </>
  );
}
