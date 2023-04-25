import React from 'react';
import clsx from 'clsx';
import { Box } from '@mui/material';

export const PreviewCard: React.FC<any> = ({ className, size, ...props }) => {
  const blockClass = clsx('box-preview', {
    [`${className}`]: className,
  });
  return <Box className={blockClass}>{props.children}</Box>;
};
