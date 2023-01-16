import React, { useContext, useState } from 'react';
import { Card, CloseButton, Collapse } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import UnreadContext from '../../UnreadContext.jsx';

export default function GreetingCard() {
  const [visible, setVisible] = useState(true);

  const { unreadCount } = useContext(UnreadContext);
  const { user } = useAuth0();

  console.log(user);

  return (
    <Collapse timeout={250} appear in={visible}>
      <div>
        <Card bg="dark" border="info" text="light" className="w-75 my-3 mx-auto position-relative">
          <Card.Body>
            <Card.Title>
              Welcome Back <b>{user.nickname.toUpperCase()}!</b>
            </Card.Title>
            <Card.Text className="text-info">
              You have <b>{unreadCount}</b> unread mails.
            </Card.Text>
          </Card.Body>
          <CloseButton
            variant="white"
            className="position-absolute top-0 end-0 m-1"
            onClick={() => setVisible(false)}
          />
        </Card>
      </div>
    </Collapse>
  );
}
