import UniconIcon from '@/components/UniconIcon';
import clsx from 'clsx';
import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';

// components

interface PropsBasic {
  title?: string;
  className?: any;
  children?: React.ReactNode;
}

interface Props {
  width: number;
  fixed: boolean;
  className: any;
  sidebarToggle: object;
  theme: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
}

const DrawerToggle: React.FC<any> = ({ className, collapseSidebar, click }) => {
  return (
    <a
      href='#toggle'
      className={clsx('', {
        'et-drawer-toggle': collapseSidebar,
        [`${className}`]: className,
      })}
      onClick={(ev) => {
        ev.preventDefault();
        click(ev);
      }}
    >
      <UniconIcon
        name={!collapseSidebar ? 'angle-double-left' : 'angle-double-right'}
        className='tw-text-2xl tw-text-ink-60'
      />
    </a>
  );
};

export const DrawerHeader: React.FC<PropsBasic> = ({ className, ...props }) => {
  const classes = clsx(
    'et-drawer-content-heading tw-et-text-heading-20 tw-pl-[18px] tw-pr-[25px] tw-pb-[16px] tw-pt-[26px]',
    {
      [`${className}`]: className,
    },
  );
  return <div className={classes}>{props.title ?? <h4>{props.children}</h4>}</div>;
};

export const DrawerMenuContent: React.FC<PropsBasic> = ({ className, ...props }) => {
  const classes = clsx({
    [`${className}`]: className,
  });
  return (
    <SimpleBar className='et-drawer-sidebar-menu' autoHide={true}>
      <div className={classes}>{props.children}</div>
    </SimpleBar>
  );
};

const Drawer: React.FC<Props> = ({ width, fixed, className, ...props }) => {
  const [collapseSidebar, setSidebar] = useState(false);

  const toggleCollapse = () => {
    setSidebar(!collapseSidebar);
  };

  return (
    <div className='et-drawer'>
      <div
        className={clsx(`et-drawer-menu`, {
          'et-drawer-animated': true,
          'et-drawer-fixed': fixed,
          'et-drawer-compact': collapseSidebar,
          [`${className}`]: className,
        })}
        style={{
          width: width + 'px',
        }}
      >
        <div className='et-drawer-sticky'>
          {props.sidebarToggle && (
            <div className='et-drawer-head tw-flex'>
              <DrawerToggle
                className={clsx(`et-drawer-toggle`, {
                  'et-drawer-animated': true,
                  'et-drawer-compact': collapseSidebar,
                })}
                collapseSidebar={collapseSidebar}
                click={toggleCollapse}
                icon='menu'
              />
            </div>
          )}
          <div className={clsx('et-drawer-menu-content', {})}>{props.children}</div>
        </div>
      </div>

      <div
        className={clsx(`et-drawer-wrap et-content-body`, {
          'et-drawer-animated': true,
          'et-drawer-compact': collapseSidebar,
        })}
        style={{
          paddingLeft: width + 'px',
        }}
      >
        {props.content}
      </div>
    </div>
  );
};
export default React.memo(Drawer);
