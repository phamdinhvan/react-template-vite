import { FormHelperText } from '@mui/material';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type FormSwitchProps<T extends FieldValues> = Omit<FormControlLabelProps, 'control' | 'label'> & {
  name: Path<T>;
  control?: Control<T>;
  label: string[];
  defaultValue?: boolean;
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(19px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#10BED2' : '#10BED2',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#10BED2',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
  },
  '& .MuiSwitch-track': {
    borderRadius: 32 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function FormSwitch<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  ...rest
}: FormSwitchProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <FormControlLabel
              label={
                field.value ? (
                  <span className='tw-text-[#2AC769]'>{label[1]}</span>
                ) : (
                  <span className='tw-text-[#F84948]'>{label[0]}</span>
                )
              }
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  {...field}
                  checked={!!field.value}
                  defaultValue={defaultValue}
                />
              }
              {...rest}
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </>
        );
      }}
    />
  );
}

export default FormSwitch;
