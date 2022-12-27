import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function PDFLinks() {
  const [links, setLinks] = useState([]);

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
      const { pdfs } = await response.json();
      setLinks(pdfs);
    }
    fetchData();
  }, [getAccessTokenSilently]);
  return (
    <div>
      {links.map((link) => (
        <div>
          <a href={link} target="_blank" key={link} rel="noreferrer">
            This is a link to a pdf on google cloud!
          </a>
          <hr />
        </div>
      ))}
    </div>
  );
}
