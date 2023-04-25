import React from 'react'

// Image
import MenuCollapse from '@/assets/icons/menu/menu-collapse.svg'
import MenuExpand from '@/assets/icons/menu/menu-expand.svg'
import { ETSVG } from '@/components/Svg/ETSVG'

const Toggle: React.FC<any> = ({
  icon,
  className,
  collapseSidebar,
  click,
  ...props
}) => {
  return (
    <a
      href="#toggle"
      className={className ? className : ''}
      onClick={(ev) => {
        ev.preventDefault()
        click(ev)
      }}
    >
      {props.children ? (
        props.children
      ) : (
        <ETSVG
          path={collapseSidebar ? MenuCollapse : MenuExpand}
          svgClassName="!tw-fill-white"
        />
      )}
    </a>
  )
}
export default Toggle
