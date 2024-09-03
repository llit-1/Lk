import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Snackbar, Alert, Slide, FormControlLabel, Checkbox, SlideProps} from '@mui/material';

interface GetPasswordProps {
  onSwitchForm: (x: number) => void;
}

const GetPassword: React.FC<GetPasswordProps> = ({ onSwitchForm }) => {
  const [buttonText, setButtonText] = useState<string>('Подтвердить');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [secondPassword, setSecondPassword] = useState<string>('');
  const [openGoodSnackbar, setOpenGoodSnackbar] = useState<boolean>(false);
  const [openBadSnackbar, setOpenBadSnackbar] = useState<boolean>(false);

  const sendPasswordToBack = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password);
    console.log(secondPassword);
    if(password !== secondPassword)
    {
        return setOpenBadSnackbar(true);
    }

    // const result = await fetch("")
    setButtonText('');
    setIsLoading(true);
    
    setOpenGoodSnackbar(true);
  };

  const handleCloseGoodSnackbar = () => {
    setOpenGoodSnackbar(false);
  };

  const handleCloseBadSnackbar = () => {
    setOpenBadSnackbar(false);
  };

  function TransitionDown(props : SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <form onSubmit={(e) => sendPasswordToBack(e)}>
      <TextField
        required
        className={'textInput'}
        type={'password'}
        value={password}
        label="Пароль"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim())}
        variant="outlined"
        size="medium"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
          backgroundColor: 'white',
        }}
      />

      <TextField
        required
        className={'textInput'}
        type={'password'}
        value={secondPassword}
        label="Повторите пароль"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPassword(e.target.value.trim())}
        variant="outlined"
        size="medium"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
          backgroundColor: 'white',
        }}
      />

      <FormControlLabel sx={{color: "#6d6d6d"}} required control={<Checkbox sx={{color: "orange"}}/>} label="с условиями ознакомлен" />

      <Button
        className={'buttonInput'}
        size="medium"
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: '#F47920',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {buttonText}
        {isLoading && <CircularProgress sx={{ color: 'orange' }} size={26} />}
      </Button>

      <Button
        className={'buttonInput'}
        size="small"
        onClick={() => onSwitchForm(0)}
        sx={{
          color: '#6d6d6d',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Уже зарегистрированы?
      </Button>

      <Snackbar
        open={openGoodSnackbar}
        TransitionComponent = {TransitionDown}
        autoHideDuration={6000}
        anchorOrigin={{vertical : "top", horizontal : "right"}}
        onClose={handleCloseGoodSnackbar}
        message="Регистрация прошла успешно!"
      >
        <Alert onClose={handleCloseGoodSnackbar} severity="success" sx={{ width: '100%' }}>
          Регистрация прошла успешно
        </Alert>
      </Snackbar>

      <Snackbar
        open={openBadSnackbar}
        TransitionComponent = {TransitionDown}
        autoHideDuration={6000}
        anchorOrigin={{vertical : "top", horizontal : "right"}}
        onClose={handleCloseBadSnackbar}
        message="Пароли не совпадают!"
      >
        <Alert onClose={handleCloseBadSnackbar} severity="error" sx={{ width: '100%' }}>
          Пароли не совпадают
        </Alert>
      </Snackbar>
    </form>
  );
};

export default GetPassword;
