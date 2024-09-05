import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from "@mui/material";
import "./Login.css";
import PhoneNumberInput from "../../Components/InputPhone";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { showNotification } from '../../store/notificationSlice';

interface FormLoginProps {
  onSwitchForm: (index: number) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSwitchForm }) => {
  localStorage.removeItem('authToken');
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Войти");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("");
    setIsLoading(true);

    try {
      const response = await axios.post("https://localhost:7026/api/Authorization/login", {
        phone: phone.replace(/\D/g, '').substring(1),
        password: password,
        code: ""
      });

      if (response.status === 200) {
        dispatch(showNotification({ isGood: true, message: 'Вы успешно авторизовались!' }));
        localStorage.setItem("authToken", response.data);
        setIsAuth(true);
      } else {
        dispatch(showNotification({ isGood: false, message: 'Неправильный номер телефона или пароль!' }));
      }
    } catch {
      dispatch(showNotification({ isGood: false, message: 'Ошибка при отправке данных!' }));
    } finally {
      setButtonText("Войти");
      setIsLoading(false);
    }
  };

  if (isAuth) {
    return <Navigate to="/MainPage" replace={true} />;
  }

  return (
    <form onSubmit={handleLogin}>
      <PhoneNumberInput value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField
        required
        className="textInput"
        type="password"
        autoComplete="current-password"
        value={password}
        id="password"
        label="Пароль"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          '& .MuiOutlinedInput-root': { borderRadius: 0 },
          backgroundColor: 'white',
        }}
      />

      <Button
        className="buttonInput"
        size="medium"
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#F47920",
          fontFamily: 'Roboto, sans-serif',
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress sx={{ color: "orange" }} size={26} /> : buttonText}
      </Button>

      <Button
        className="buttonInput"
        size="small"
        onClick={() => onSwitchForm(1)}
        sx={{
          color: "#6d6d6d",
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Зарегистрироваться / Забыли пароль?
      </Button>
    </form>
  );
}

export default FormLogin;
