import { TextField, TextFieldProps } from '@mui/material';
import { DatePickerProps, DesktopDatePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { add } from 'date-fns';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import './index.scss';

export type FormDatePickerProps<T extends FieldValues, TInputDate, TDate = TInputDate> = Omit<
  DatePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: Path<T>;
  rules?: RegisterOptions<FieldValues, string> | undefined;
  isDate?: boolean;
  onChange?: (value: TDate, keyboardInputValue?: string) => void;
  validation?: ControllerProps['rules'];
  control?: Control<T>;
  helperText?: TextFieldProps['helperText'];
  placeholder?: string;
  size?: 'large' | 'medium' | 'small';
  defaultValue?: any;
  disablePast?: boolean;
  disableFuture?: boolean;
};

const FormDatePicker = <TFieldValues extends FieldValues>({
  name,
  validation = {},
  size = 'medium',
  control,
  placeholder,
  rules,
  defaultValue,
  disableFuture = false,
  disablePast = false,
  ...rest
}: FormDatePickerProps<TFieldValues, any, any>) => {
  const classes = clsx('form-text-field', {
    [`${size}`]: true,
    [`has-rule`]: rules != null,
  });

  return (
    <div className='date-picker'>
      <Controller
        name={name}
        rules={{ ...validation, ...rules }}
        control={control as Control<FieldValues>}
        defaultValue={defaultValue ?? new Date().toISOString()}
        render={({ field, fieldState: { error } }) => (
          <DesktopDatePicker
            {...rest}
            {...field}
            inputFormat='dd/MM/yyyy'
            value={field.value}
            disableFuture={disableFuture}
            disablePast={disablePast}
            onChange={(newValue: Date) => {
              // if (typeof newValue !== 'number') {
              //   return
              // }
              try {
                // temp - BE cannot use UTC time because it won't take hours and minutes
                field.onChange(add(newValue, { hours: 7 }).toISOString());
              } catch (e) {
                /* empty */
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  error={Boolean(error)}
                  helperText={error?.message || rest.helperText}
                  FormHelperTextProps={{
                    classes: { root: 'form-helper-text' },
                  }}
                  fullWidth
                  autoComplete='off'
                  className={classes}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder,
                  }}
                  InputProps={params.InputProps}
                  ref={params.ref}
                  inputRef={params.inputRef}
                />
              );
            }}
            // components={{
            //   OpenPickerIcon: CalendarIcon,
            // }}
          />
        )}
      />
    </div>
  );
};
export default FormDatePicker;
