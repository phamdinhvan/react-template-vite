import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';

// styles
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
