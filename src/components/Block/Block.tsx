import React from 'react';
import clsx from 'clsx';

export const Block: React.FC<any> = ({ className, size, ...props }) => {
  const blockClass = clsx('tw-flex', {
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};

export const BlockHead: React.FC<any> = ({ className, title, ...props }) => {
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

export const BlockHeadContent: React.FC<any> = ({ className, ...props }) => {
  const blockHeadContentClass = clsx({
    [`${className}`]: className,
  });
  return <div className={blockHeadContentClass}>{props.children}</div>;
};
