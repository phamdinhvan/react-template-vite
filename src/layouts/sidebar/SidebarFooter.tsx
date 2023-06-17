import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import FeatureSettings from '@/assets/icons/settings.svg';
import { ETSVG } from '@/components/Svg/ETSVG';

interface Props {
  collapseSidebar?: any;
  setTheme: any;
}

const SidebarFooter: React.FC<Props> = ({ collapseSidebar, setTheme }) => {
  const [_checked, setChecked] = useState(false);
  const getTheme = localStorage.getItem('theme');

  useEffect(() => {
    if (getTheme) {
      setChecked(getTheme === 'white' ? false : true);
      setTheme(getTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTheme]);

  return (
    <div className={clsx('et-sidebar-footer')}>
      <Link to={`/settings`} className={clsx('tw-text-white')}>
        <ETSVG
          path={FeatureSettings}
          className={clsx('tw-text-xl tw-mx-2', {
            ['group-hover:tw-text-lg tw-text-2xl']: collapseSidebar,
          })}
          style={{ width: 26, height: 26 }}
        />
        <span
          className={clsx('tw-ml-[1rem] tw-whitespace-nowrap tw-et-text-label-16', {
            'group-hover:tw-opacity-100 tw-opacity-0': collapseSidebar,
          })}
        >
          Cài đặt
        </span>
      </Link>
      {/* {!collapseSidebar && (
        <span className='tw-et-text-paragraph-12 tw-text-[#AFCDEA] tw-line-clamp-1'>
         Version 1.1
        </span>
      )} */}
    </div>
  );
};
export default SidebarFooter;
