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
import PropTypes, { bool, string } from 'prop-types';

/* eslint-disable jsx-a11y/anchor-is-valid */

function MailItemRow({ link, sender, dateRecieved }) {
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
          <FontAwesomeIcon icon={faStarRegular} className="text-body" />
          <Badge bg="info" className="p-1 rounded-circle border border-light">
            <span className="visually-hidden">Unread</span>
          </Badge>
          <a href={link} className="text-body" target="_blank" rel="noreferrer noopener">
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
        </div>
      </td>
      <td>{sender}</td>
      <td>{dateRecieved}</td>
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

MailItemRow.propTypes = {
  link: PropTypes.string.isRequired,
  sender: PropTypes.string,
  dateRecieved: PropTypes.string,
};

MailItemRow.defaultProps = {
  sender: 'Uknown',
  dateRecieved: 'Uknown',
};

export default function MailTable({ mail }) {
  const mailRows = mail
    ? mail.map((item) => (
        <MailItemRow
          key={item.id}
          link={item.signedUrl}
          sender={item.sender}
          dateRecieved={new Date(item.date_recieved).toLocaleDateString()}
        />
      ))
    : null;
  return (
    <Table hover className="mt-3 mb-0" striped>
      <thead className="text-bg-primary p-1">
        <tr>
          <th>
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
          <th>Sender</th>
          <th>Date Recieved</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>{mailRows}</tbody>
    </Table>
  );
}

MailTable.propTypes = {
  mail: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      signedUrl: PropTypes.string.isRequired,
      unread: PropTypes.bool.isRequired,
      favorited: PropTypes.bool.isRequired,
      dateRecieved: PropTypes.string,
      sender: PropTypes.string,
    })
  ),
};

MailTable.defaultProps = {
  mail: [],
};
