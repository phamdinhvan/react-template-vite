import React from 'react';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '@/utils';

// Aviable sizes {xs,sm,md,lg,xl}
const UserAvatar: React.FC<any> = ({ className, size = 'xs', ...props }) => {
  const blockClass = clsx('user-avatar tw-bg-clip-content', {
    [`user-avatar-${size}`]: size,
    [`${className}`]: className,
  });
  const avatarObj = props.title ? stringAvatar(props.title, props.sx) : null;
  return (
    <Avatar className={blockClass} src={props.src} {...props} {...avatarObj}>
      {avatarObj?.children}
    </Avatar>
  );
};

export default UserAvatar;
