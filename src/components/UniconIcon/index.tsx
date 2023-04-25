import clsx from 'clsx';
import React from 'react';

const UniconIcon = ({ name, id, className, style, ...props }: any) => {
  const iconClass = clsx({
    [`${className}`]: className,
    icon: true,
    uil: true,
    [`uil-${name}`]: true,
  });
  return <em className={iconClass} id={id} style={style} {...props}></em>;
};
export default React.memo(UniconIcon);
