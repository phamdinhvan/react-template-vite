import clsx from 'clsx';
import React from 'react';

const BlockHeadContent: React.FC<any> = ({ className, ...props }) => {
  const blockHeadContentClass = clsx({
    [`${className}`]: className,
  });
  return <div className={blockHeadContentClass}>{props.children}</div>;
};

export default BlockHeadContent;
