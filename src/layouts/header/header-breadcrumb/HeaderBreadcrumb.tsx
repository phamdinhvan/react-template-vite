import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material'

const HeaderBreadcrumb: React.FC<any> = ({ menuData }) => {
  const location = useLocation()

  const getBreadcrumbName = (pathname: string) => {
    const checkLink = (menuLink: any) => {
      const currentUrlSplit = pathname.split('/')
      const linkSplit = menuLink.split('/')
      return linkSplit.every((item: any, index: number) => {
        if (item.includes(':')) return true
        return item === currentUrlSplit[index]
      })
    }

    const findMenuActive = (menu: any, parentItem = []) => {
      let arr: any = []
      for (let i = 0, length = menu.length; i < length; i++) {
        const item = menu[i]
        if (!item) return

        if (item.subMenu) {
          const sub = findMenuActive(item.subMenu, [])
          arr = arr.concat(sub)
        }

        if (item.link && checkLink(item.link)) {
          arr = arr.concat(parentItem).concat(item)
          break
        }
      }

      return arr
    }
    return findMenuActive(menuData, [])?.reverse()
  }

  const menuItems = useMemo(
    () => getBreadcrumbName(location.pathname),
    [location.pathname]
  )

  return (
    <React.Fragment>
      <div className="tw-flex tw-items-center tw-relative tw-z-[1003]">
        <Breadcrumbs>
          {menuItems?.map((item: any, index: number) => {
            return (
              <span
                key={index}
                className="tw-et-text-heading-24 tw-text-ink-light tw-normal-case"
              >
                {item?.text}
              </span>
            )
          })}
        </Breadcrumbs>
      </div>
    </React.Fragment>
  )
}

export default React.memo(HeaderBreadcrumb)
