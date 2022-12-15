import React from 'react';
import { createRoot } from 'react-dom/client';
import Greeting from './Greeting.jsx';
import PDFLink from './PDFLink.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

const page = (
  <div>
    <Greeting />
    <PDFLink />
  </div>
);
root.render(page);

console.log('ESlint should warn about me here but not in the server.');
