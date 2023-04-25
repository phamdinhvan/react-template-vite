import React, { useEffect } from 'react';

import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './index.scss';
import clsx from 'clsx';

export const TabsItem: React.FC<any> = ({ className, ...props }) => {
  const blockClass = clsx('et-tab-item btn--shiny', {
    [`${className}`]: className,
  });
  return (
    <Tab
      {...props}
      component='span'
      disableRipple
      label={<span>{props.label}</span>}
      icon={props.icon}
      iconPosition='start'
      className={blockClass}
    />
  );
};

export const TabsContent: React.FC<any> = ({ ...props }) => {
  return (
    <TabPanel value={props.value} sx={{ p: 0 }} {...props}>
      {props.children}
    </TabPanel>
  );
};

export const ETTabsItems: React.FC<any> = ({ className, ...props }) => {
  const blockClass = clsx('et-tab-list', {
    [`${className}`]: className,
  });

  useEffect(() => {
    const element = document.getElementsByClassName('et-content-header-menu')[0];
    const scrollUp = 'scroll-up';
    const scrollDown = 'scroll-down';
    let lastScroll = 0;

    if (!element) return;

    document.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const pixelToCollase = element.clientHeight;

      if (currentScroll <= 0) {
        element.classList.remove(scrollUp);
        return;
      }

      if (
        currentScroll > lastScroll &&
        currentScroll > pixelToCollase &&
        !element.classList.contains(scrollDown)
      ) {
        // down
        element.classList.remove(scrollUp);
        element.classList.add(scrollDown);
      } else if (currentScroll < lastScroll && element.classList.contains(scrollDown)) {
        // up
        element.classList.remove(scrollDown);
        element.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
    });
  }, []);

  return (
    <TabContext value={props.state}>
      <TabList onChange={props.handleChange} className={blockClass} sx={{ root: 'et-tab-list' }}>
        {props.children}
      </TabList>
    </TabContext>
  );
};

export const ETabsContents: React.FC<any> = ({ className, title, ...props }) => {
  return <TabContext value={props.state}>{props.children}</TabContext>;
};
