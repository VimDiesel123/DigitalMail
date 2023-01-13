import React, { useContext } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import MailTable from './MailTable.jsx';
import GreetingCard from './GreetingCard.jsx';
import useMail from '../../useMail.js';
import UnreadContext from '../../UnreadContext.jsx';

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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  const { setUnreadCount } = useContext(UnreadContext);
  setUnreadCount(mail.filter((mailItem) => mailItem.unread).length);

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
