import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import { login } from '../../store/authSlice';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress } from '@mui/material';
import PhoneNumberInput from '../../Components/InputPhone';
import SnackBarCustom from '../../Components/SnackBarCustom';

// Интерфейс для данных ошибки
interface ErrorResponse {
  message: string;
}

interface GetPhoneProps {
  onSwitchForm: (x: number) => void;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setGetCodeRequest: React.Dispatch<React.SetStateAction<number>>;
}

const GetPhone: React.FC<GetPhoneProps> = ({ onSwitchForm, phone, setPhone, setGetCodeRequest }) => {
  const [buttonText, setButtonText] = useState<string>("Отправить код");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [snackbarProps, setSnackbarProps] = useState<{ isOpen: boolean, isGood: boolean, message: string }>({ isOpen: false, isGood: false, message: '' });

  const getCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/\D/g, '').substring(1);
    if (phoneDigits.length !== 10) {
      return setSnackbarProps({ isOpen: true, isGood: false, message: 'Введите корректный номер телефона!' });
    }

    dispatch(login({ token: "", phone: phoneDigits, code: null }));

    try {
      const response = await axios.patch(`https://localhost:7026/api/Authorization/set-phone-code?phone=${phoneDigits}`);

      if (response.status === 200) {
        setSnackbarProps({ isOpen: true, isGood: true, message: 'Ожидайте звонка!' });
        setGetCodeRequest(1);
      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Введите корректный номер телефона!' });
      }

    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
        let messageFromBack: string = 'Неизвестная ошибка';

        switch (axiosError.response.data.message) {
          case "Attempts are over":
            messageFromBack = "Вы слишком часто восстанавливали пароль, попробуйте позже";
            break;
          case "Phone is empty":
            messageFromBack = "Введите корректный номер телефона";
            break;
          case "No phone in DB":
            messageFromBack = "Пользователь не найден, обратитесь к руководителю";
            break;
          default:
            messageFromBack = "Произошла неизвестная ошибка";
        }

        setButtonText("Отправить код");
        setIsLoading(false);
        setSnackbarProps({ isOpen: true, isGood: false, message: messageFromBack });

      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при отправке данных' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarProps(prevState => ({ ...prevState, isOpen: false }));
  };

  return (
    <form onSubmit={getCode}>
      <PhoneNumberInput
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
      />

      <Button
        className="buttonInput"
        size="medium"
        variant="contained"
        type="submit"
        disabled={isLoading}
        sx={{
          backgroundColor: "#F47920",
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {buttonText}
        {isLoading && <CircularProgress sx={{ color: "orange" }} size={26} />}
      </Button>

      <Button
        className="buttonInput"
        size="small"
        onClick={() => onSwitchForm(0)}
        sx={{
          color: "#6d6d6d",
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
    </form>
  );
}

export default GetPhone;
