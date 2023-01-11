import React from 'react';
import { Table, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import MailItemRow from './MailItemRow.jsx';

export default function MailTable({ mail, markMailAsRead, setFavorite }) {
  const mailRows = mail
    ? mail.map((item) => (
        <MailItemRow
          key={item.id}
          item={item}
          markMailAsRead={markMailAsRead}
          setFavorite={setFavorite}
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
  setFavorite: PropTypes.func.isRequired,
};

MailTable.defaultProps = {
  mail: [],
};
