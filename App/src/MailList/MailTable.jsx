import React from 'react';
import { Table, Form, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';

function MailItemRow() {
  return (
    <tr>
      <td>
        <Form>
          <Form.Group className="d-inline-block">
            <Form.Check type="checkbox" />
          </Form.Group>
          <FontAwesomeIcon icon={faStar} className="mx-3" />
        </Form>
      </td>

      <td>Sender</td>
      <td>Date Recieved</td>
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
