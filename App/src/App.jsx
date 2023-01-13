import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
} from 'react-router-dom';
import Root from './routes/root/Root.jsx';
import MailList from './routes/MailList/MailList.jsx';
import Help from './routes/Help.jsx';

import './scss/styles.scss';
import Trash from './routes/Trash.jsx';
import SearchContext from './SearchContext.jsx';

library.add(fas);

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index loader={() => redirect('inbox')} />
      <Route path="inbox" element={<MailList />} />
      <Route path="help" element={<Help />} />
      <Route path="trash" element={<Trash />} />
    </Route>
  )
);

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return { searchTerm, setSearchTerm };
};

function App() {
  const search = useSearch();
  return (
    <Auth0Provider
      domain="dev-6xzvx6amw4huzdgq.us.auth0.com"
      clientId="rcemq97nBaT1z5qWiuzy2JzeuE2qXoNI"
      redirectUri="https://digitalmail.herokuapp.com/inbox"
      audience="https://digitalmail.com/api"
    >
      <SearchContext.Provider value={search}>
        <RouterProvider router={router} />
      </SearchContext.Provider>
    </Auth0Provider>
  );
}

root.render(<App />);

console.log('ESlint should warn about me here but not in the server.');
