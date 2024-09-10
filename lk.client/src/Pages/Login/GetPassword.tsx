import React, { useState } from 'react';
import { Button, TextField, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import SnackBarCustom from "../../Components/SnackBarCustom";
import {useAppSelector, useAppDispatch} from "../../hooks/hook"
import { Navigate } from "react-router";
import {setPasswordAndLogin} from "../Requests"

interface GetPasswordProps {
  onSwitchForm: (x: number) => void;
}

const GetPassword: React.FC<GetPasswordProps> = ({ onSwitchForm }) => {
  const [buttonText, setButtonText] = useState<string>('Подтвердить');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [secondPassword, setSecondPassword] = useState<string>('');
  const [snackbarProps, setSnackbarProps] = useState<{ isOpen: boolean, isGood: boolean, message: string }>({ isOpen: false, isGood: false, message: '' });
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const phone = useAppSelector(state => state.auth.phone);
  const code = useAppSelector(state => state.auth.code)
  

  const sendPasswordToBack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== secondPassword) {
      setSnackbarProps({ isOpen: true, isGood: false, message: 'Пароли не совпадают' });
      return;
    }

    setButtonText('');
    setIsLoading(true);

    const isAuthSuccessful = await setPasswordAndLogin(phone, password, code, dispatch); // Используем API функцию

    if (isAuthSuccessful) {
      setSnackbarProps({ isOpen: true, isGood: true, message: 'Вы успешно авторизовались!' });
      setIsAuth(prev => !prev)
    } else {
      setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при авторизации' });
    }

    setButtonText('Войти');
    setIsLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarProps(prevState => ({ ...prevState, isOpen: false }));
  };

  return (
    <form onSubmit={sendPasswordToBack}>
      <TextField
        required
        autoComplete={"new-password"}
        className={'textInput'}
        type={'password'}
        value={password}
        label="Пароль"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim())}
        variant="outlined"
        size="medium"
        sx={{
          fontFamily: 'Akrobat',
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
          backgroundColor: 'white',
        }}
      />

      <TextField
        required
        autoComplete={"new-password"}
        className={'textInput'}
        type={'password'}
        value={secondPassword}
        label="Повторите пароль"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPassword(e.target.value.trim())}
        variant="outlined"
        size="medium"
        sx={{
          fontFamily: 'Akrobat',
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
          backgroundColor: 'white',
        }}
      />

      <FormControlLabel sx={{ color: "#6d6d6d" }} required control={<Checkbox sx={{ color: "orange" }} />} label="с условиями ознакомлен" />

      <Button
        className={'buttonInput'}
        size="medium"
        variant="contained"
        type="submit"
        disabled={isLoading}
        sx={{
          backgroundColor: '#F47920',
          fontFamily: 'Akrobat',
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
          fontFamily: 'Akrobat',
        }}
      >
        Уже зарегистрированы?
      </Button>

      <SnackBarCustom
        isOpen={snackbarProps.isOpen}
        isGood={snackbarProps.isGood}
        message={snackbarProps.message}
        onClose={handleCloseSnackbar}
      />

    {isAuth && <Navigate to="/Main/Tiles" />}
    </form>
  );
};

export default GetPassword;
