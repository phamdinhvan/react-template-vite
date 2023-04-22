import { Drawer as MuiDrawer } from '@mui/material';
import React, { CSSProperties } from 'react';
import FormFooter from '../FormFooter';
import FormHeader from '../FormHeader';

interface FormModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: any) => void;
  children?: React.ReactNode;
  sx?: CSSProperties;
  title: string;
}

const FormModal: React.FC<FormModal> = ({
  isOpen,
  onClose,
  children,
  onSubmit,
  sx,
  title,
  ...props
}) => {
  return (
    <MuiDrawer
      PaperProps={{
        sx: {
          width: sx?.width || '50%',
          ...sx,
        },
      }}
      anchor='right'
      open={isOpen}
      onClose={onClose}
      className='tw-flex tw-flex-col overflow-hidden'
      {...props}
    >
      <FormHeader onClose={onClose} title={title} />
      <div className='tw-flex-grow tw-overflow-auto tw-px-[20px]'>{children}</div>
      <FormFooter handleCancelAction={onClose} handleSubmit={onSubmit} />
    </MuiDrawer>
  );
};

export default FormModal;
