import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from "@mui/material";
import OTPInput from '../../Components/OTP';
import {useAppSelector, useAppDispatch} from "../../hooks/hook"
import axios, { AxiosError } from 'axios';
import { login } from '../../store/authSlice';
import { showNotification } from '../../store/notificationSlice';

interface GetCodeProps {
  onSwitchForm: (x: number) => void;
  setGetCodeRequest : React.Dispatch<React.SetStateAction<number>>;
}

const GetCode: React.FC<GetCodeProps> = ({ onSwitchForm, setGetCodeRequest}) => {
  const [buttonText, setButtonText] = useState<string>("Подтвердить");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonBlocked, setButtonBlocked] = useState<boolean>(true);
  const [codeFromSMS, setCodeFromSMS] = useState<string>('');
  const phone = useAppSelector((state) => state.auth.phone);
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
        const response = await axios.post("https://localhost:44300/api/Authorization/check-phone-code", {
        Phone: phone,
        Password: "",
        Code: codeFromSMS
      });

      if(response.status === 200)
      {
        dispatch(login({ token: "", phone: phone, code: codeFromSMS }));
        dispatch(showNotification({ isGood: true, message: 'Код принят' }));
        return setGetCodeRequest(2)
      } else {
        return dispatch(showNotification({ isGood: false, message: 'Код неверный!' }));
      }
      

    } catch (error : unknown) {
      const axiosError = error as AxiosError<{message: string}>;
      dispatch(showNotification({ isGood: false, message: axiosError.response!.data.message }));
    } finally {
      setButtonText("Отправить код");
      setIsLoading(false);
    }


    
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
    </form>
  );
}

export default GetCode;
