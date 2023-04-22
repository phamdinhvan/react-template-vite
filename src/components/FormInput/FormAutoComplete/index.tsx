import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { Control, FieldValues } from 'react-hook-form';
import clsx from 'clsx';
import { CSSProperties } from 'react';

interface SelectOptions {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  placeHolder: string;
  name: string;
  required?: boolean;
  control?: Control<T>;
  options: FieldValues[] | SelectOptions[];
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  validation?: ControllerProps['rules'];
  noDataText?: string;
  multiple?: boolean;
  limitTags?: number;
  disableCloseOnSelect?: boolean;
  getOptionLabel?: (opt: FieldValues) => string;
  renderInput?: (params: any, data?: any) => React.ReactNode;
  onInputChange?: (_: any, value: string) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state?: any,
  ) => React.ReactNode;
  valueAsNumber?: boolean;
  helperText?: TextFieldProps['helperText'];
  //select value type to get data
  fieldValue?: keyof FieldValues;
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  defaultValue?: FieldValues | SelectOptions;
  sx?: CSSProperties;
}
const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  placeHolder,
  required,
  validation = {},
  name,
  control,
  rules,
  options,
  noDataText,
  multiple,
  limitTags,
  getOptionLabel,
  renderInput,
  onInputChange,
  renderOption,
  disableCloseOnSelect,
  valueAsNumber = false,
  fieldValue = 'value',
  size = 'medium',
  disabled = false,
  defaultValue,
  sx,
  ...rest
}: Props<TFieldValues>) => {
  const toNum = (bool: boolean, el: string) => (bool ? +el : el);
  if (required && !validation.required) {
    validation.required = 'This field is required';
  }
  const classes = clsx('form-text-field', {
    [`${size}`]: true,
    [`has-rule`]: rules != null,
  });
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={{ ...validation, ...rules }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          defaultValue={defaultValue}
          noOptionsText={noDataText || 'Không có dữ liệu'}
          getOptionLabel={getOptionLabel}
          multiple={multiple || false}
          limitTags={limitTags}
          onInputChange={onInputChange}
          disablePortal={true}
          disableCloseOnSelect={disableCloseOnSelect}
          disabled={disabled}
          sx={{
            width: sx?.width || '100%',
            ...sx,
          }}
          className='form-autocomplete-select-field form-text-field'
          onChange={(_, newValue) => {
            onChange(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // newValue,
              toNum(valueAsNumber, newValue ? newValue?.[fieldValue] : ''),
            );
          }}
          isOptionEqualToValue={(option: any, value: any) =>
            value.value == '' ||
            value.id === '' ||
            value === undefined ||
            value === '' ||
            option?.[fieldValue] === value?.[fieldValue]
          }
          fullWidth
          renderInput={
            renderInput
              ? renderInput
              : (params) => {
                  return (
                    <TextField
                      error={Boolean(error)}
                      helperText={error?.message || rest.helperText}
                      FormHelperTextProps={{
                        classes: { root: 'form-helper-text' },
                      }}
                      {...params}
                      disabled={disabled}
                      className={classes}
                      placeholder={placeHolder}
                      variant='outlined'
                    />
                  );
                }
          }
          renderOption={renderOption}
        />
      )}
    />
  );
};
export default FormSelect;
