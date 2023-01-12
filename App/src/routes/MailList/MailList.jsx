import React from 'react';
import { Pagination } from 'react-bootstrap';
import MailTable from './MailTable.jsx';
import GreetingCard from './GreetingCard.jsx';
import useMail from '../../useMail.js';

export default function MailList() {
  const active = 1;

  // Creates an array of num digits starting at 1.
  const range = (num) => [...Array(num).keys()].map((i) => i + 1);

  const paginationItems = range(5).map((number) => (
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  ));

  const { mail, loading, markMailAsRead, setFavorite } = useMail();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column">
      <GreetingCard />
      <MailTable mail={mail} markMailAsRead={markMailAsRead} setFavorite={setFavorite} />
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
