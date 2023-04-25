import React, { useState } from 'react'
import clsx from 'clsx'
import SimpleBar from 'simplebar-react'
import Logo from '@/layouts/logo/Logo'
import SidebarFooter from './SidebarFooter'
import Toggle from './Toggle'
import Menu from '@/layouts/menu/Menu'
import FarmMenu from '@/layouts/menu/FarmMenu'
import MenuCollapse from '@/assets/icons/menu/menu-collapse.svg'
import MenuExpand from '@/assets/icons/menu/menu-expand.svg'
import { ETSVG } from '@/components/Svg/ETSVG'

interface Props {
  fixed: boolean
  className: any
  sidebarToggle: object
  theme: string
}

const Sidebar: React.FC<Props> = ({ fixed, className, sidebarToggle }) => {
  const [collapseSidebar, setSidebar] = useState(false)
  const [mouseEnter, _setMouseEnter] = useState(false)
  const [theme, setTheme] = useState('dark')

  const toggleCollapse = () => {
    setSidebar(!collapseSidebar)
  }

  const classes = clsx({
    'et-sidebar': true,
    'et-sidebar-fixed': fixed,
    'is-compact': collapseSidebar,
    'has-hover': collapseSidebar && mouseEnter,
    [`is-light`]: theme === 'white',
    [`is-${theme}`]: theme !== 'white' && theme !== 'light',
    [`${className}`]: className,
  })

  console.log('Sidebar updated: ' + collapseSidebar)

  return (
    <div className={classes}>
      <div
        className="et-sidebar-element et-sidebar-head tw-flex tw-justify-center"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <div className="et-sidebar-brand">
          <Logo collapseSidebar={collapseSidebar} />
        </div>

        <div className="et-sidebar-trigger tw-mr-n2 tw-flex tw-items-center tw-justify-center">
          <Toggle
            className="et-nav-toggle et-quick-nav-icon mr-n2 max_sm:tw-hidden"
            icon="arrow-left"
            click={sidebarToggle}
            // collapseSidebar={collapseSidebar}
          >
            <ETSVG path={MenuExpand} />
          </Toggle>
          <Toggle
            className={`et-nav-compact et-quick-nav-icon tw-hidden xl:tw-inline-flex ${
              collapseSidebar ? 'compact-active' : ''
            }`}
            collapseSidebar={collapseSidebar}
            click={toggleCollapse}
          />
        </div>
      </div>
      <div className="et-sidebar-content tw-relative">
        <SimpleBar className="et-sidebar-menu" autoHide={false}>
          {window.location.pathname.split('/')[1] === 'farm' ? (
            <FarmMenu collapseSidebar={collapseSidebar} />
          ) : (
            <Menu collapseSidebar={collapseSidebar} />
          )}
        </SimpleBar>
      </div>
      <SidebarFooter collapseSidebar={collapseSidebar} setTheme={setTheme} />
    </div>
  )
}
export default React.memo(Sidebar)
