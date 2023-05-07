import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  styled,
} from '@mui/material';
import { FC } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

interface CheckBox {
  name: string;
  value: string | boolean | number;
  id: string | number;
}

interface CheckboxGroupProps {
  name: string;
  label?: string;
  row?: boolean;
  data: CheckBox[];
  control?: Control<FieldValues>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  valueKey?: string;
}

const Icon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: '#1CBED2',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const FormRadio: FC<CheckboxGroupProps> = ({
  label,
  row = false,
  data,
  name,
  control,
  rules,
  valueKey = 'value',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={data?.[0]}
      render={({ field, fieldState: { error } }) => (
        <FormControl required error={!!error?.message} component='fieldset'>
          {label && <FormLabel component='legend'>{label}</FormLabel>}
          <FormGroup row={row}>
            {data.length > 0 &&
              data.map((d) => {
                return (
                  <FormControlLabel
                    key={d.id ?? d.name}
                    checked={field.value === d.value}
                    onChange={() =>
                      field.onChange(
                        Object.prototype.hasOwnProperty.call(d, valueKey)
                          ? d[valueKey as keyof CheckBox]
                          : d,
                      )
                    }
                    control={<Radio checkedIcon={<CheckedIcon />} icon={<Icon />} name={d.name} />}
                    label={d.name}
                  />
                );
              })}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadio;
