import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import MailTable from './MailTable.jsx';
import GreetingCard from './GreetingCard.jsx';

export default function MailList() {
  const active = 1;

  // Creates an array of num digits start at 1.
  const range = (num) => [...Array(num).keys()].map((i) => i + 1);

  const paginationItems = range(5).map((number) => (
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  ));

  const [mails, setMail] = useState();
  const { getAccessTokenSilently } = useAuth0();

  const fetchMail = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`/api/user/mail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { mail } = await response.json();
    return mail;
  };

  const markMailAsRead = async (mailId) => {
    const accessToken = await getAccessTokenSilently();

    const baseUrl = window.location.origin;
    const url = new URL(`api/user/mail/${mailId}`, baseUrl);
    url.searchParams.append('read', 'true');

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // TODO: (David) This is really inefficient and could cause problems. I'm refetching all the mail when only one is updated.
    const updatedMail = await fetchMail();
    setMail(updatedMail);

    console.log(response);
  };

  useEffect(() => {
    async function updateMail() {
      const mail = await fetchMail();
      setMail(mail);
    }
    updateMail();
  }, []);

  return (
    <div className="d-flex flex-column">
      <GreetingCard />
      <MailTable mail={mails} markMailAsRead={markMailAsRead} />
      <div className="d-flex align-items-center border border-top-0 rounded-bottom">
        <Pagination className="ms-auto my-0 py-1">
          <Pagination.First />
          <Pagination.Prev />
          {paginationItems}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
}
