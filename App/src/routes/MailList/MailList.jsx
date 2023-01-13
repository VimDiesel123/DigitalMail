import React, { useContext, useEffect } from 'react';
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

  const { setUnreadCount } = useContext(UnreadContext);

  useEffect(() => {
    /* TODO: (David) This fixes a bug with useState hooks being called in different orders on different renders.
    but I don't underestnad why yet:
    https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning */
    setUnreadCount(mail ? mail.filter((mailItem) => mailItem.unread).length : 0);
  }, [mail]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

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
