import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import state from './state/configureMutation';

// styles
import '@/assets/styles/index.scss';
import { QueryClientProvider } from 'react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={state}>
        <MainApp />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
