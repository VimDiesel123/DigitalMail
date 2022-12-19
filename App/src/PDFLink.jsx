import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function PDFLink() {
  const [link, setLink] = useState('');

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const accessToken = await getAccessTokenSilently();

      console.log('Access token: ', accessToken);

      const response = await fetch(`/api/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);
      const { pdfUrl } = await response.json();
      setLink(pdfUrl);
    }
    fetchData();
  }, [getAccessTokenSilently]);
  return (
    <a href={link} target="_blank" rel="noreferrer">
      I am a pdf on the cloud
    </a>
  );
}
