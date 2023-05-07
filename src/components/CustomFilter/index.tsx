import { Clear as ClearIcon } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';

type CheckboxOption = {
  label: string;
  value: any;
};
type WithAccordionOption = {
  title: string;
  checkboxes: CheckboxOption[];
};

type P_Props = {
  title?: string;
  checkAllTitle?: string;
  open: boolean;
  onClose: () => void;
  dataFilter: WithAccordionOption[];
  onSave: (...args: any) => void;
};

const CustomFilter: React.FC<P_Props> = ({
  dataFilter,
  onSave,
  open,
  onClose,
  title,
  checkAllTitle,
}) => {
  const [checkboxStates, setCheckboxStates] = useState<boolean[][]>(
    dataFilter.map((data) => data.checkboxes.map(() => false)),
  );

  const handleToggleCheckbox = (dataIndex: number, checkboxIndex: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[dataIndex][checkboxIndex] = !checkboxStates[dataIndex][checkboxIndex];
    setCheckboxStates(newCheckboxStates);
  };

  const handleToggleAll = (dataIndex: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[dataIndex] = newCheckboxStates[dataIndex].map((state) => !state);
    setCheckboxStates(newCheckboxStates);
  };

  const handleSave = () => {
    const result = dataFilter.map((data, index) => {
      const checkedValues = data.checkboxes
        .filter((_, checkboxIndex) => checkboxStates[index][checkboxIndex])
        .map((checkbox) => checkbox.value);
      return checkedValues;
    });

    onSave(result);
    onClose();
  };

  const handleCancel = () => {
    setCheckboxStates(dataFilter.map((data) => data.checkboxes.map(() => false)));
    onSave([]);
    onClose();
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: '390px',
        },
      }}
      anchor='right'
      open={open}
      onClose={onClose}
      className='tw-flex tw-flex-col overflow-hidden'
    >
      <div className='tw-flex-grow tw-overflow-auto'>
        <div className='tw-h-14 tw-flex tw-items-center'>
          <div className='tw-my-6 tw-mx-auto tw-font-bold tw-text-2xl tw-et-example'>
            {title ?? 'Bộ lọc'}
          </div>
          <IconButton onClick={onClose} className='!tw-mr-6'>
            <ClearIcon className='tw-text-[22px]' />
          </IconButton>
        </div>
        {dataFilter.map((data, index) => (
          <div key={index} className='tw-px-8 tw-py-6 tw-text-ink-80'>
            <span className='tw-et-example'>{data.title}</span>
            <div className='tw-et-example tw-py-2'>
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#10BED2',
                  },
                }}
                checked={checkboxStates[index].every((state) => state)}
                onChange={() => handleToggleAll(index)}
              />
              {checkAllTitle ?? 'Tất cả'} ({data.checkboxes.length})
              <Divider className='tw-py-1' />
              {data.checkboxes.map((option, checkboxIndex) => (
                <div key={checkboxIndex}>
                  <Checkbox
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: '#10BED2',
                      },
                    }}
                    checked={checkboxStates[index][checkboxIndex]}
                    onChange={() => handleToggleCheckbox(index, checkboxIndex)}
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='tw-flex tw-justify-around tw-bg-white tw-h-[78px] tw-w-full tw-p-4 tw-shadow-[6px_5px_21px_rgba(108,72,58,0.2)]'>
        <button type='reset' className='btn-cancel-border' onClick={handleCancel}>
          Huỷ
        </button>
        <button type='submit' className='btn-confirm-secondary btn--shiny' onClick={handleSave}>
          Áp dụng
        </button>
      </div>
    </Drawer>
  );
};

export default CustomFilter;
