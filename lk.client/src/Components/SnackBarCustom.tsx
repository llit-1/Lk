import React from 'react';
import { Snackbar, Alert, Slide, SlideProps, Button } from '@mui/material';

type SnackBarCustomProps = {
  isOpen: boolean;
  isGood: boolean;
  message: string;
  onClose: () => void;
}

const SnackBarCustom: React.FC<SnackBarCustomProps> = ({ isOpen, isGood, message, onClose }) => {

  function TransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
  <Snackbar
    key={message}
    open={isOpen}
    TransitionComponent={TransitionDown}
    autoHideDuration={4000}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    onClose={onClose}
    message={message}
    action={
    <React.Fragment>
      <Button color="inherit" onClick={onClose}>
        Close
      </Button>
    </React.Fragment>
  }
>
  <Alert onClose={onClose} severity={isGood ? "success" : "error"} sx={{ width: '100%' }}>
    {message}
  </Alert>
</Snackbar>

  );
};

export default SnackBarCustom;
