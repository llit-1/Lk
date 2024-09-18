import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import { login } from '../../store/authSlice';
import { Button, CircularProgress } from '@mui/material';
import PhoneNumberInput from '../../Components/InputPhone';
import { showNotification } from '../../store/notificationSlice';
import { setPhoneCode } from "../Requests"

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
    setButtonText("")
    setIsLoading(true);
    const phoneDigits = phone.replace(/\D/g, '').substring(1);
    if (phoneDigits.length !== 10) {
       return dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
    }
    dispatch(login({ token: "", phone: phoneDigits}));

    const result = await setPhoneCode(phoneDigits, dispatch);

    if (result === 1) {
      setGetCodeRequest(1);
    }

    setButtonText("Отправить код")
    setIsLoading(false);

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
          fontFamily: 'Akrobat',
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
          fontFamily: 'Akrobat',
        }}
      >
        Уже зарегистрированы?
      </Button>
    </form>
  );
}

export default GetPhone;
