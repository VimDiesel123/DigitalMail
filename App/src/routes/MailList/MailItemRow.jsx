import React from 'react';
import { Form, Badge, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faEllipsisVertical,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

export default function MailItemRow({
  item: { id, unread, favorited, signedUrl, sender, dateRecieved },
  markMailAsRead,
  setFavorite,
}) {
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
            onClick={() => setFavorite(id, !favorited)}
            role="button"
          />
          <Badge
            bg="info"
            className={`${unread ? 'visible' : 'invisible'} p-1 rounded-circle border border-light`}
          >
            <span className="visually-hidden">Unread</span>
          </Badge>
          <a
            href={signedUrl}
            onClick={() => {
              markMailAsRead(id);
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
      <td>{new Date(dateRecieved).toLocaleDateString()}</td>
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
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    favorited: PropTypes.bool,
    unread: PropTypes.bool,
    signedUrl: PropTypes.string.isRequired,
    sender: PropTypes.string,
    dateRecieved: PropTypes.string,
  }),
  markMailAsRead: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

MailItemRow.defaultProps = {
  item: {},
};
