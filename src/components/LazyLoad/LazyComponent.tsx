import React, { Suspense } from 'react'

const LazyComponent: React.FC<any> = ({ ...props }) => {
  return <Suspense fallback={<div>Loading ...</div>}>{props.children}</Suspense>
}
export default LazyComponent
