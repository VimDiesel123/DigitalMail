import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FilterMenu from './FilterMenu.jsx';
import ProfileMenu from './ProfileMenu.jsx';

export default function Sidebar() {
  return (
    <div className="col-2 d-flex flex-column">
      <ListGroup className="flex-fill">
        <ListGroupItem className="d-flex text-muted align-items-center">
          <small>MAIN MENU</small>
        </ListGroupItem>
        <ListGroupItem action as={Link} to="inbox">
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="me-3">
              <FontAwesomeIcon icon={faInbox} />
            </span>
            <span>
              Inbox{' '}
              <Badge pill bg="primary" className="ms-2">
                2
              </Badge>
            </span>
          </div>
        </ListGroupItem>
        <FilterMenu />
        <ListGroupItem action as={Link} to="trash">
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="me-3">
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span>Trash</span>
          </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex text-muted align-items-center">
          <small>SETTINGS</small>
        </ListGroupItem>
        <ProfileMenu />
        <ListGroupItem action variant="info" as={Link} to="help">
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="me-3">
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <span>Help</span>
          </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex text-muted align-items-center flex-fill" />
      </ListGroup>
    </div>
  );
}
