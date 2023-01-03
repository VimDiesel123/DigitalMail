import React from 'react';
import { Table, Form, Dropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faTrashAlt,
  faEllipsisVertical,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function MailItemRow() {
  return (
    <tr>
      <td>
        <div
          className="d-inline-flex justify-content-between align-items-center"
          style={{ width: '35%' }}
        >
          <Form>
            <Form.Group>
              <Form.Check type="checkbox" />
            </Form.Group>
          </Form>
          <FontAwesomeIcon icon={faStarRegular} />
          <Badge bg="info" className="p-1 rounded-circle border border-light">
            <span className="visually-hidden">Unread</span>
          </Badge>
          <a href="#" className="text-body">
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
        </div>
      </td>
      <td>Sender</td>
      <td>Date Recieved</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle as={FontAwesomeIcon} icon={faEllipsisVertical} role="button" />
          <Dropdown.Menu>
            <Dropdown.Header>Actions</Dropdown.Header>
            <Dropdown.Item>Take an action</Dropdown.Item>
            <Dropdown.Item className="text-bg-danger">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <span className="me-3">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <span>Delete</span>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default function MailTable() {
  return (
    <Table hover>
      <th className="p-0">
        <Form>
          <Form.Group>
            <Form.Check type="checkbox" id="actionBarCheckBox" className="d-inline-block" />
            <Dropdown className="d-inline-block px-2">
              <Dropdown.Toggle as={FontAwesomeIcon} icon={faEllipsis} role="button" />
              <Dropdown.Menu>
                <Dropdown.Header>Actions</Dropdown.Header>
                <Dropdown.Item>Take an action</Dropdown.Item>
                <Dropdown.Item className="text-bg-danger">
                  <div className="d-flex w-100 justify-content-start align-items-center">
                    <span className="me-3">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                    <span>Delete</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Form>
      </th>
      <tbody>
        <MailItemRow />
        <MailItemRow />
        <MailItemRow />
      </tbody>
    </Table>
  );
}
