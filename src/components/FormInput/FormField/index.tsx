// component overhaul
// uncontrolled component take ref, meaning cannot display as 1,234 and get value 1234
import { DEFAULT_EMAIL_ERROR_MESSAGE, DEFAULT_ERROR_MESSAGE, SEARCH_TIMEOUT } from '@/constants';
import useDebounce from '@/hooks/useDebounce';
import { preventCharacter } from '@/utils';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
  useFormContext,
} from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { NumericFormat } from 'react-number-format';

export type FormFieldProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'size'
> & {
  rules?: ControllerProps['rules'];
  name: Path<T>;
  typeInput?: 'password' | 'text' | 'currency' | 'number' | 'email' | 'phone';
  size?: 'large' | 'medium' | 'small';
  parseError?: (error: FieldError) => string;
  control?: Control<T>;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onReceiveResult?: (text: string) => void;
  defaultValue?: any;
  onKeyDown?: (event: any) => void;
};

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: any) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator={','}
    />
  );
}

export default function FormField<TFieldValues extends FieldValues = FieldValues>({
  rules = {},
  typeInput = 'text',
  required,
  name,
  control,
  disabled,
  placeholder,
  startAdornment,
  endAdornment,
  size = 'medium',
  className = '',
  onReceiveResult,
  defaultValue = null,
  onKeyDown,
  ...rest
}: FormFieldProps<TFieldValues>): JSX.Element {
  const { resetField, setValue } = useFormContext();
  const [searchValue, setSearchValue] = useState('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const debouncedTextSearch = useDebounce(searchValue, SEARCH_TIMEOUT);

  useEffect(() => {
    if (onReceiveResult) {
      onReceiveResult(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTextSearch]);

  if (required && !rules.required) {
    rules.required = DEFAULT_ERROR_MESSAGE;
  }

  if (typeInput === 'email' && !rules.pattern) {
    rules.pattern = {
      value:
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: DEFAULT_EMAIL_ERROR_MESSAGE,
    };
  }

  const classes = clsx('form-text-field', {
    [`${size}`]: true,
    [`has-rule`]: Object.keys(rules).length > 0,
    [`${className}`]: className,
  });

  const defaultStartAdornment = () => {
    if (typeInput === 'password')
      //TODO Enhance icon component
      return <InputAdornment position='start'>{/*icon */}</InputAdornment>;
    return null;
  };

  const defaultEndAdornment = () => {
    if (typeInput === 'currency') <InputAdornment position='end'>VND</InputAdornment>;
    if (typeInput === 'number') <InputAdornment position='end'>Unit</InputAdornment>;
    if (typeInput === 'password')
      return (
        <InputAdornment position='end'>
          <IconButton onClick={toggleVisiblePassword}>
            {visiblePassword ? (
              <VisibilityOutlinedIcon className='tw-text-xl' />
            ) : (
              <VisibilityOffOutlinedIcon className='tw-text-xl' />
            )}
          </IconButton>
        </InputAdornment>
      );
    return null;
  };

  const numberProps = (typeInput: string) => {
    if (typeInput === 'number' || typeInput === 'currency')
      return { inputComponent: NumberFormatCustom };
  };

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <div className={'search-form'}>
          <TextField
            {...rest}
            name={name}
            value={value ?? ''}
            autoComplete='off'
            className={classes}
            placeholder={placeholder || '00'}
            onChange={(e) => {
              onChange(e.target.value);
              if (typeof rest.onChange === 'function') {
                rest.onChange(e);
              }
              if (typeof onReceiveResult === 'function') {
                setSearchValue(e.target.value);
              }
            }}
            onBlur={onBlur}
            required={required}
            type={typeInput === 'password' ? (visiblePassword ? 'text' : 'password') : 'text'}
            error={!!error}
            helperText={error ? error.message : rest.helperText}
            inputRef={ref}
            FormHelperTextProps={{
              classes: { root: 'form-helper-text' },
            }}
            onKeyDown={(e) => {
              if (typeInput === 'phone') preventCharacter(e);
            }}
            InputProps={{
              ...numberProps(typeInput),
              disabled: disabled,
              startAdornment: startAdornment ? startAdornment : defaultStartAdornment(),
              endAdornment: (
                <>
                  {(searchValue != '' || value) && onReceiveResult ? (
                    <div className='search-btn'>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className='search-btn-clear'
                        //sx={{ visibility: searchValue ? 'visible' : 'hidden' }}
                        href='#'
                        onClick={(e) => {
                          setSearchValue('');
                          resetField(name);
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          setValue(name, '');
                          if (onReceiveResult) {
                            onReceiveResult('');
                          }
                          e.preventDefault();
                        }}
                      >
                        {/*//TODO Enhance icon component*/}
                        {/*icon */}
                      </a>
                    </div>
                  ) : null}
                  {endAdornment ? endAdornment : defaultEndAdornment()}
                </>
              ),
              //endAdornment: endAdornment ? endAdornment : defaultEndAdornment(),
              onKeyDown: onKeyDown
                ? onKeyDown
                : (e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  },
            }}
          ></TextField>
        </div>
      )}
    />
  );
}
