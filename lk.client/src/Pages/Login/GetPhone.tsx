import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import { login } from '../../store/authSlice';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress } from '@mui/material';
import PhoneNumberInput from '../../Components/InputPhone';
import { showNotification } from '../../store/notificationSlice';

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

  const getCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/\D/g, '').substring(1);
    if (phoneDigits.length !== 10) {
       return dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
    }

    dispatch(login({ token: "", phone: phoneDigits, code: null }));

    try {
        const response = await axios.patch(`https://localhost:44300/api/Authorization/set-phone-code?phone=${phoneDigits}`);
      console.log(response)
      if (response.status === 200) {
        dispatch(showNotification({ isGood: true, message: 'Ожидайте звонка!' }));
        return setGetCodeRequest(1);
      } else {
        return dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
      }
    } catch (error : unknown) {
      const axiosError = error as AxiosError<{message: string}>;
      if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
        setButtonText("Отправить код");
        setIsLoading(false);
        return dispatch(showNotification({ isGood: false, message: axiosError.response.data.message }));
      } else {
        return dispatch(showNotification({ isGood: false, message: 'Сервис временно недоступен, попробуйте позже' }));
      }
    }
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
    </form>
  );
}

export default GetPhone;
