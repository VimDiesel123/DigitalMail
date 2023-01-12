import React, { useState } from 'react';
import { Card, CloseButton, Collapse } from 'react-bootstrap';

export default function GreetingCard() {
  const [visible, setVisible] = useState(true);

  return (
    <Collapse timeout={250} appear in={visible}>
      <div>
        <Card bg="dark" border="info" text="light" className="w-75 my-3 mx-auto position-relative">
          <Card.Body>
            <Card.Title>
              Welcome Back <b>BRO!</b>
            </Card.Title>
            <Card.Text className="text-info">
              You have <b>2</b> unread mails.
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
