import React, { useEffect } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={0} ref={ref} variant='filled' {...props} />;
});

export const AlertMessage: React.FC<any> = ({ severity = 'success', icon, ...props }) => {
  const [open, setOpen] = React.useState(props.open || true);
  let sx = {};
  if (severity == 'error') {
    sx = {
      bgcolor: '#FFE7EC',
      color: '#F84948',
    };
  }

  useEffect(() => {
    setOpen(true);
  }, [props.id]);

  return (
    <>
      <Collapse in={open}>
        <Fade in={open}>
          <Alert
            severity={severity}
            icon={icon}
            onClose={() => {
              setOpen(false);
            }}
            sx={sx}
          >
            {props.children}
          </Alert>
        </Fade>
      </Collapse>
    </>
  );
};
