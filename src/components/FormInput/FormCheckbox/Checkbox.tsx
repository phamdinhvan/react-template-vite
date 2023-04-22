import { Checkbox, TextFieldProps } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import clsx from 'clsx';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

export type FormCheckBoxProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'size'
> & {
  rules?: ControllerProps['rules'];
  name: Path<T>;
  size?: 'medium' | 'small';
  parseError?: (error: FieldError) => string;
  control?: Control<T>;
  checked?: boolean;
  disabled?: boolean;
  validation?: any;
  onChecked?: any;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const FormCheckBox = <TFieldValues extends FieldValues = FieldValues>({
  label,
  required,
  validation = {},
  name,
  control,
  rules,
  checked = false,
  disabled = false,
  size = 'medium',
  onChecked,
  className = '',
}: FormCheckBoxProps<TFieldValues>) => {
  if (required && !validation.required) {
    validation.required = 'This field is required';
  }

  let handleOnChange: ((...event: any[]) => void) | null = null;
  const handleChange = (event: any) => {
    if (onChecked) {
      onChecked(event.target.checked);
    }
    //setCheckedState(event.target.checked)
    if (handleOnChange) {
      handleOnChange(event);
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ ...validation, ...rules }}
        render={({ field: { value, onChange } }) => {
          handleOnChange = onChange;
          const _w = size == 'small' ? 20 : 24;
          return (
            <FormControlLabel
              label={label}
              className={clsx('tw-et-text-label-14')}
              control={
                <>
                  <Checkbox
                    className={className}
                    checked={Boolean(value ?? checked)}
                    disabled={Boolean(disabled)}
                    size={size}
                    checkedIcon={
                      <svg
                        width={_w}
                        height={_w}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z' />
                        <path
                          d='M6 12L10 16L18 8'
                          stroke='white'
                          strokeWidth='2.4'
                          strokeLinecap='round'
                        />
                      </svg>
                    }
                    onChange={handleChange}
                  />
                </>
              }
            />
          );
        }}
      />
    </div>
  );
};
export default FormCheckBox;
