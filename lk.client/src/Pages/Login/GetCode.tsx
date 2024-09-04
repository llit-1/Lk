import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from "@mui/material";
import OTPInput from '../../Components/OTP';
import {useAppSelector, useAppDispatch} from "../../hooks/hook"
import SnackBarCustom from "../../Components/SnackBarCustom";
import axios from 'axios';
import { login } from '../../store/authSlice';

interface GetCodeProps {
  onSwitchForm: (x: number) => void;
  setGetCodeRequest : React.Dispatch<React.SetStateAction<number>>;
}

const GetCode: React.FC<GetCodeProps> = ({ onSwitchForm, setGetCodeRequest}) => {
  const [buttonText, setButtonText] = useState<string>("Подтвердить");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonBlocked, setButtonBlocked] = useState<boolean>(true);
  const [codeFromSMS, setCodeFromSMS] = useState<string>('');  // Храним OTP как строку
  const phone = useAppSelector((state) => state.auth.phone);
  const [snackbarProps, setSnackbarProps] = useState<{ isOpen: boolean, isGood: boolean, message: string }>({ isOpen: false, isGood: false, message: '' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setButtonBlocked(prev => !prev)
  }, 30000);
  }, [])


  const sendCodeToBack = async(e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("")
    setIsLoading(prev => !prev)
    
    try {
      const response = await axios.post("https://localhost:7026/api/Authorization/check-phone-code", {
        Phone: phone,
        Password: "",
        Code: codeFromSMS
      });

      if(response.status === 200)
      {
        dispatch(login({ token: "", phone: phone, code: codeFromSMS }));
        setSnackbarProps({ isOpen: true, isGood: true, message: 'Код принят' });
        setGetCodeRequest(2)
      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Код неверный!' });
      }
      

    } catch (error) {
      console.error("Ошибка:", error);
      setSnackbarProps({ isOpen: true, isGood: false, message: 'Ошибка при отправке данных' });

    } finally {
      setButtonText("Отправить код");
      setIsLoading(false);
    }


    
  };

  const handleCloseSnackbar = () => {
    setSnackbarProps(prevState => ({ ...prevState, isOpen: false }));
  };

  return (
    <form onSubmit={(e) => sendCodeToBack(e)}>
      <OTPInput value={codeFromSMS} setValue={setCodeFromSMS} />

      <Button
        className={"buttonInput"}
        size="medium"
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#F47920", fontFamily: 'Roboto, sans-serif',
        }}
        disabled={codeFromSMS.length < 4}
      >
        {buttonText}

        {isLoading && <CircularProgress sx={{ color: "orange" }} size={26} />}
      </Button>

      <Button
        variant="outlined"
        className={"buttonInput"}
        size="small"
        disabled={buttonBlocked}
        onClick={() => onSwitchForm(0)}
        sx={{
          color: "#6d6d6d", fontFamily: 'Roboto, sans-serif',
        }}
      >
        Отправить код повторно
      </Button>

      <Button
        className={"buttonInput"}
        size="small"
        onClick={() => onSwitchForm(0)}
        sx={{
          color: "#6d6d6d", fontFamily: 'Roboto, sans-serif',
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

export default GetCode;
