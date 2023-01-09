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

  useEffect(() => {
    async function fetchData() {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`/api/user/pdfs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { mail } = await response.json();
      setMail(mail);
    }
    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div className="d-flex flex-column">
      <GreetingCard />
      <MailTable mail={mails} />
      <div className="d-flex align-items-center border border-top-0 rounded-bottom">
        <Pagination className="ms-auto my-0 py-1">
          <Pagination.First />
          <Pagination.Prev />
          {paginationItems}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
      {/* <PDFLinks /> */}
    </div>
  );
}
