import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary } from './components/ErrorBoundary';

import App from './app';

const root = document.getElementById('root');

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  root
);
