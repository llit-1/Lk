import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from "@mui/material";
import "./Login.css";
import PhoneNumberInput from "../../Components/InputPhone";
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { setLogin } from "../Requests";

interface FormLoginProps {
  onSwitchForm: (index: number) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSwitchForm }) => {
  const dispatch = useAppDispatch();
  
  // Состояние полей и логина
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Войти");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // Очистка токена только при загрузке компонента
  React.useEffect(() => {
    localStorage.removeItem('authToken');
  }, []);

  // Обработка отправки формы
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setButtonText(""); // Очистка текста кнопки
    setIsLoading(true); // Включение индикатора загрузки

    const authToken = await setLogin(phone, password, dispatch); // Использование вынесенной функции для логина

    if (authToken) {
      setIsAuth(true); // Успешная авторизация
    } else {
      setButtonText("Войти"); // Восстановление текста кнопки при ошибке
      setIsLoading(false); // Отключение индикатора загрузки при ошибке
    }
  };

  // Перенаправление после успешного логина
  if (isAuth) {
    return <Navigate to="/Main/Tiles" replace={true} />;
  }

  return (
    <form onSubmit={handleLogin}>
      <PhoneNumberInput 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      
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
          fontFamily: 'Akrobat',
          fontSize: "14px"
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
          fontFamily: 'Akrobat',
          fontSize: "14px"
        }}
      >
        Зарегистрироваться / Забыли пароль?
      </Button>
    </form>
  );
}

export default FormLogin;
