import React from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';

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
      open={isOpen}
      TransitionComponent={TransitionDown}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
      message={message}
    >
      <Alert onClose={onClose} severity={isGood ? "success" : "error"} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarCustom;
