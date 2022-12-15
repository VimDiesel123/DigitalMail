import React from 'react';
import { createRoot } from 'react-dom/client';
import Greeting from './Greeting.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Greeting />);

console.log('ESlint should warn about me here but not in the server.');
