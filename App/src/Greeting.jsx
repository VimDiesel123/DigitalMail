import React, { useEffect, useState } from 'react';

export default function Greeting() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/greeting`, {
        method: 'GET',
      });
      const greeting = await response.text();
      setMessage(greeting);
    }
    fetchData();
  });

  return <h1>{message}</h1>;
}
