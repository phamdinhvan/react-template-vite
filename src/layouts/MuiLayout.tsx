import React from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
// import ErrorBoundaryComponent from '@/components/error-boundary-component/ErrorBoundaryComponent';
// import { UserSessionContext } from '@/contexts/UserSessionContext'
// import { saveSessionData } from '@/utils/sessionData'
// import { useQueryClient } from 'react-query'

// Components
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

interface Props {
  route?: React.ReactNode;
}

const MuiLayout: React.FC<Props> = ({ route }) => {
  //const user = React.useContext(UserSessionContext)

  //const qc = useQueryClient()
  //const navigate = useNavigate()
  //const setMenuLv = (data: any) => saveSessionData({ curLevel: data }, qc)
  //const _menuProps = { navigate, setMenuLv }

  // NEW SIDE MENU REFACTOR
  const [mobileView, setMobileView] = useState(window.innerWidth < 1280);
  const [visibility, setVisibility] = useState(false);

  const toggleSidebar = (e: any) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  const [themeState] = useState({
    main: 'default',
    sidebar: 'white',
    header: 'white',
    skin: 'light',
  });

  const sidebarClass = clsx({
    'et-sidebar-mobile': mobileView,
    'et-sidebar-active': visibility && mobileView,
  });

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 1280) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };
  window.addEventListener('load', viewChange);
  window.addEventListener('resize', viewChange);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={clsx('et-app-root')}>
        <div className='et-main'>
          <Sidebar
            sidebarToggle={toggleSidebar}
            fixed
            theme={themeState.sidebar}
            className={sidebarClass}
          />
          {visibility && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className='et-sidebar-overlay' onClick={toggleSidebar} />
          )}
          <div className='et-wrap'>
            {/* <Header sidebarToggle={toggleSidebar} fixed theme={themeState.header} /> */}
            {/* <ErrorBoundaryComponent> */}
            <Outlet />
            {route}
            {/* </ErrorBoundaryComponent> */}
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default MuiLayout;
