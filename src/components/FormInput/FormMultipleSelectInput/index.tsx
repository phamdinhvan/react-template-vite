import { TEXT_HOLDER } from '@/constants';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputAdornment,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type Options = {
  value: string;
  label: string;
};

type P_Props<T extends FieldValues> = {
  options: Options[];
  onSearch: (e: any) => void;
  name: string;
  control: Control<T>;
  rules: any;
  error: any;
  defaultValue?: FieldValues | Options;
};

const FormMultipleSelectInput = <TFieldValues extends FieldValues = FieldValues>({
  options,
  onSearch,
  name,
  rules,
  control,
  error,
  defaultValue,
}: P_Props<TFieldValues>) => {
  return (
    <FormControl fullWidth error={error}>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          const data = Array.isArray(value) ? [...value] : [];
          return (
            <Select
              value={value ?? []}
              defaultValue={defaultValue}
              multiple
              fullWidth
              variant='outlined'
              renderValue={(selected) => {
                const selectedValue = options
                  ?.map((so) => {
                    if (selected.some((s: any) => s === so.value)) return so.label;
                  })
                  .filter(Boolean);

                if (value?.length > 0)
                  if (value?.length === options?.length) return 'Tất cả';
                  else return selectedValue?.join(', ');
                return <span className='tw-text-ink-40'>Chọn...</span>;
              }}
              displayEmpty
              className='tw-bg-white tw-h-[48px]'
              MenuProps={{
                className: 'select-menu-list tw-max-h-[300px]',
                autoFocus: false,
                disableScrollLock: true,
              }}
            >
              <ListSubheader className='!tw-w-full tw-pt-2 !tw-z-10'>
                <TextField
                  placeholder='Tìm kiếm...'
                  variant='outlined'
                  className='form-text-field small tw-p-2'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      //TODO Enhance icon component
                      <InputAdornment position='start'>{/*Icon search */}</InputAdornment>
                    ),
                  }}
                  onChange={(e) => onSearch(e.target.value)}
                  onKeyDown={(event) => event.stopPropagation()}
                />
                <div className='tw-flex tw-items-center tw-justify-between'>
                  <div className='tw-et-text-paragraph-16 tw-text-primary-light'>Chọn tất cả</div>
                  <Checkbox
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: '#10BED2',
                      },
                    }}
                    checked={value?.length === options.length ?? false}
                    onChange={(e: any, checked: boolean) => {
                      e.stopPropagation();
                      if (checked) {
                        const checkedData = options?.map((a) => a.value) || [];
                        onChange(checkedData);
                      } else onChange([]);
                    }}
                  />
                </div>
              </ListSubheader>
              {options.map((type, index: number) => {
                return (
                  <MenuItem key={index} value={type.label}>
                    <ListItemText
                      className='tw-et-text-paragraph-16 tw-text-primary-light'
                      primary={type.label || TEXT_HOLDER}
                    />
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': {
                          color: '#10BED2',
                        },
                      }}
                      checked={value?.some((some: any) => some === type.value) ?? false}
                      onChange={(_, value) => {
                        if (value) {
                          data.push(type.value);
                          onChange(data);
                        } else
                          onChange(
                            data.filter((id) => {
                              return id !== type.value;
                            }),
                          );
                      }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          );
        }}
      />

      {error && (
        <FormHelperText className='tw-et-text-paragraph-14 !tw-text-[#f84948] !tw-ml-0 !tw-mt-[11px]'>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default React.memo(FormMultipleSelectInput);
