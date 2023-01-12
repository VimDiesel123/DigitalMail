import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SearchContext from './SearchContext.jsx';

export default function useMail() {
  // const [loading, setLoading] = useState();
  const [mails, setMail] = useState();
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const fetchMail = async () => {
    setLoading(true);
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`/api/user/mail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { mail } = await response.json();
    // This is to simulate long load times from the api.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
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

    const updatedMail = mails.find((mailItem) => mailItem.id === mailId);

    console.log(updatedMail);

    // // TODO: (David) This is really inefficient and could cause problems. I'm refetching all the mail when only one is updated.
    // const updatedMail = await fetchMail();
    // setMail(updatedMail);

    console.log(response);
  };

  const setFavorite = async (mailId, value) => {
    const accessToken = await getAccessTokenSilently();

    const baseUrl = window.location.origin;
    const url = new URL(`api/user/mail/${mailId}`, baseUrl);
    url.searchParams.append('favorite', value);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const updatedMail = mails.find((mailItem) => mailItem.id === mailId);

    console.log(updatedMail);

    // TODO: (David) This is really inefficient and could cause problems. I'm refetching all the mail when only one is updated.
    // const updatedMail = await fetchMail();
    // setMail(updatedMail);

    // console.log(response);
  };

  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    async function updateMail() {
      const mail = await fetchMail();
      if (mail) setMail(mail.filter((mailItem) => mailItem.sender.includes(searchTerm)));
    }
    updateMail();
  }, [searchTerm]);

  return { loading, mail: mails, markMailAsRead, setFavorite };
}
