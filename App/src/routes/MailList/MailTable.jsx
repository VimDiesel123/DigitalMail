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
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/anchor-is-valid */

function MailItemRow({ id, unread, favorited, link, sender, dateRecieved, onLinkClicked }) {
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
          <FontAwesomeIcon
            icon={faStarRegular}
            className={favorited ? 'text-warning' : 'text-body'}
          />
          <Badge
            bg="info"
            className={`${unread ? 'visible' : 'invisible'} p-1 rounded-circle border border-light`}
          >
            <span className="visually-hidden">Unread</span>
          </Badge>
          <a
            href={link}
            onClick={() => {
              onLinkClicked(id);
            }}
            className="text-body"
            target="_blank"
            rel="noreferrer"
          >
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
  id: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  unread: PropTypes.bool,
  link: PropTypes.string.isRequired,
  sender: PropTypes.string,
  dateRecieved: PropTypes.string,
  onLinkClicked: PropTypes.func.isRequired,
};

MailItemRow.defaultProps = {
  favorited: false,
  unread: false,
  sender: 'Uknown',
  dateRecieved: 'Uknown',
};

export default function MailTable({ mail, markMailAsRead }) {
  const mailRows = mail
    ? mail.map((item) => (
        <MailItemRow
          key={item.id}
          id={item.id}
          unread={item.unread}
          link={item.signedUrl}
          sender={item.sender}
          dateRecieved={new Date(item.date_recieved).toLocaleDateString()}
          onLinkClicked={markMailAsRead}
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
  // eslint-disable-next-line react/forbid-prop-types
  mail: PropTypes.array,
  markMailAsRead: PropTypes.func.isRequired,
};

MailTable.defaultProps = {
  mail: [],
};
