import React, { useState } from 'react';
import { Button, TextField, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import SnackBarCustom from "../../Components/SnackBarCustom";
import { login } from '../../store/authSlice';
import {useAppSelector, useAppDispatch} from "../../hooks/hook"
import { Navigate } from "react-router";

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

    try {

      const response = await axios.post("https://localhost:7026/api/Authorization/set-password", {
        Phone: phone,
        Password: password,
        Code: code
      });

      if(response.status === 200)
      {
        const response = await axios.post("https://localhost:7026/api/Authorization/login", {
          Phone: phone,
          Password: password,
          Code: code
        });
        if (response.status === 200) {
          setSnackbarProps({ isOpen: true, isGood: true, message: 'Вы успешно авторизовались!' });
          localStorage.setItem("authToken", response.data);
          dispatch(login({ token: response.data, phone: phone, code: code }));
          setIsAuth(true)
        } else {
          setSnackbarProps({ isOpen: true, isGood: false, message: 'Неправильный номер телефона или пароль' });
        }

      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при смене пароля' });
      }
      

    } catch (error) {
      console.error("Ошибка:", error);
      setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при отправке данных' });

    } finally {
      setButtonText("Войти");
      setIsLoading(false);
    }
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
          fontFamily: 'Roboto, sans-serif',
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
          fontFamily: 'Roboto, sans-serif',
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

      <SnackBarCustom
        isOpen={snackbarProps.isOpen}
        isGood={snackbarProps.isGood}
        message={snackbarProps.message}
        onClose={handleCloseSnackbar}
      />

    {isAuth && <Navigate to="/MainPage" />}
    </form>
  );
};

export default GetPassword;
