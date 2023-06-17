import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LazyComponent from './components/LazyLoad';
import './i18n';
import PrivateRoute from './routes/PrivateRoute';

const MainApp = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path='/*'
          element={
            <LazyComponent>
              <PrivateRoute />
            </LazyComponent>
          }
        />
      </Route>,
    ),
    {
      basename: '/',
    },
  );
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default MainApp;
