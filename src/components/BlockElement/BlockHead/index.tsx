import React from 'react';
import clsx from 'clsx';

const BlockHead: React.FC<any> = ({ className, title, ...props }) => {
  const blockHeadClass = clsx(
    'tw-flex tw-pt-[24px] tw-pb-[20px] tw-justify-between tw-items-center',
    {
      [`${className}`]: className,
    },
  );
  return (
    <div className={blockHeadClass}>
      {title && <h6 className='tw-et-text-heading-20'>{title}</h6>}
      <div className='tw-flex tw-flex-row tw-gap-x-2'>{props.children}</div>
    </div>
  );
};

export default BlockHead;
