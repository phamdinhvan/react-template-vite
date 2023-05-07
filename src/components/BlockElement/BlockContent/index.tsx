import React from 'react';
import clsx from 'clsx';

const BlockContent: React.FC<any> = ({ className, ...props }) => {
  const blockClass = clsx('tw-flex', {
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};

export default BlockContent;
