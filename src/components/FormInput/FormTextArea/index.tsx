import { TextareaAutosize, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, ControllerProps, FieldError, Path } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { CSSProperties } from 'react';

export type FormTextAreaProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'type'
> & {
  rules?: ControllerProps['rules'];
  name: Path<T>;
  parseError?: (error: FieldError) => string;
  control?: Control<T>;
  resizeStyle?: CSSProperties['resize'];
};

const FormTextArea = <TFieldValues extends FieldValues = FieldValues>({
  rules = {},
  required,
  name,
  control,
  rows,
  resizeStyle,
  ...rest
}: FormTextAreaProps<TFieldValues>): JSX.Element => {
  if (required && !rules.required) {
    rules.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={rules}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <TextField
          {...rest}
          name={name}
          value={value ?? ''}
          onChange={(e) => {
            onChange(e.target.value);
            if (typeof rest.onChange === 'function') {
              rest.onChange(e);
            }
          }}
          onBlur={onBlur}
          required={required}
          error={!!error}
          helperText={error?.message || rest.helperText}
          FormHelperTextProps={{
            classes: { root: 'form-helper-text' },
          }}
          inputRef={ref}
          multiline
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              minRows: rows,
              style: {
                resize: resizeStyle || 'both',
              },
            },
          }}
        />
      )}
    />
  );
};

export default FormTextArea;
