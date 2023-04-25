import React from 'react'
import clsx from 'clsx'

interface Props {
  page?: React.ReactNode
  children?: React.ReactNode
  floating?: React.ReactNode
  className?: string
}

const Content: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className="et-content">
      <div className="container-fluid">
        <div className="et-content-inner">
          <div
            className={clsx('et-content-body', {
              [`${className}`]: className,
            })}
          >
            {!props.page ? props.children : null}
            {props.page === 'component' ? (
              <div className="components-preview wide-md mx-auto">
                {props.children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Content
