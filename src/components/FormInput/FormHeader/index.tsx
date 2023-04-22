import React from 'react';
import { Clear as ClearIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  title: React.ReactNode;
  onClose?: () => void;
}

const FormHeader = ({ title, onClose }: Props) => {
  return (
    <div className='tw-flex-none tw-top-0 tw-bg-white tw-w-full tw-h-14 tw-flex tw-items-center tw-border-b-[1px] tw-border-[#bdc6d7]'>
      <div className='tw-my-6 tw-mx-auto tw-font-bold tw-text-2xl tw-et-text-heading-24'>
        {title}
      </div>
      <IconButton onClick={onClose} className='!tw-mr-6'>
        <ClearIcon className='tw-text-[22px]' />
      </IconButton>
    </div>
  );
};

export default FormHeader;
