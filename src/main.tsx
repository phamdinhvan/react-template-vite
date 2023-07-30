import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import { Provider } from 'react-redux';
import { store } from './store';

// styles
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>,
);
