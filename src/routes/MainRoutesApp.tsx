import LazyComponent from '@/components/LazyLoad';
import MuiLayout from '@/layouts/MuiLayout';
import { Route, Routes, ScrollRestoration } from 'react-router-dom';
import { APP_ROUTES } from '.';
import Home from '@/pages/Home';

const MainRoutesApp = () => {
  return (
    // <SuspenseView>
    // break cache, causes screen flashing, causes all components rerendering
    <>
      <Routes>
        <Route element={<MuiLayout />}>
          <Route
            path={APP_ROUTES.HOME}
            element={
              <LazyComponent>
                <Home />
              </LazyComponent>
            }
          />
        </Route>
        {/* <Route path='farm/*' element={<MuiLayout route={<RouterApp />} />}></Route> */}
      </Routes>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
    </>
    // </SuspenseView>
  );
};
export default MainRoutesApp;
