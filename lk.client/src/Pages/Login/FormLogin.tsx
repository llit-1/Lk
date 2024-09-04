import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from "@mui/material";
import "./Login.css";
import PhoneNumberInput from "../../Components/InputPhone";
import SnackBarCustom from "../../Components/SnackBarCustom";
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Импортируйте useNavigate

interface FormLoginProps {
  onSwitchForm: (index: number) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSwitchForm }) => {
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Войти");
  const [snackbarProps, setSnackbarProps] = useState<{ isOpen: boolean, isGood: boolean, message: string }>({
    isOpen: false,
    isGood: false,
    message: ''
  });
  const [isAuth, setIsAuth] = useState<boolean>(false)
  
  const handleCloseSnackbar = () => {
    setSnackbarProps(prevState => ({ ...prevState, isOpen: false }));
  };

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
        setSnackbarProps({ isOpen: true, isGood: true, message: 'Вы успешно авторизовались!' });
        localStorage.setItem("authToken", response.data);
        setIsAuth(prev => !prev)
      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Неправильный номер телефона или пароль' });
      }
    } catch {
      setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при отправке данных' });
    } finally {
      setButtonText("Войти");
      setIsLoading(false);
    }
  };

  if(isAuth)
  {
    return <Navigate to="/MainPage" replace={true}/>
  }

  return (
    <form onSubmit={handleLogin}>
      <PhoneNumberInput
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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

      <SnackBarCustom
        isOpen={snackbarProps.isOpen}
        isGood={snackbarProps.isGood}
        message={snackbarProps.message}
        onClose={handleCloseSnackbar}
      />
    </form>
  );
}

export default FormLogin;
