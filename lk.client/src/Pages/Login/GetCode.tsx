import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from "@mui/material";
import OTPInput from '../../Components/OTP';
import { useAppSelector, useAppDispatch } from "../../hooks/hook"
import {checkPhoneCode, setPhoneCode} from "../Requests"


interface GetCodeProps {
  onSwitchForm: (x: number) => void;
  setGetCodeRequest: React.Dispatch<React.SetStateAction<number>>;
}

const GetCode: React.FC<GetCodeProps> = ({ onSwitchForm, setGetCodeRequest }) => {
  const [buttonText, setButtonText] = useState<string>("Подтвердить");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonBlocked, setButtonBlocked] = useState<boolean>(true);
  const [codeFromSMS, setCodeFromSMS] = useState<string>('');
  const [timerForCallAgain, setTimerForCallAgain] = useState<number>(30);

  const phone = useAppSelector((state) => state.auth.phone);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if(timerForCallAgain === 0)
      {
        setButtonBlocked(false);
      }
  }, [timerForCallAgain]);

  useEffect(() => {
    if (timerForCallAgain !== 0) {
      const interval = setInterval(() => {
        setTimerForCallAgain((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerForCallAgain]);

  const sendCodeToBack = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("");
    setIsLoading(true);

    const result = await checkPhoneCode(phone, codeFromSMS, dispatch); // Используем API функцию

    if (result !== null) {
      setGetCodeRequest(result);
    }

    setButtonText("Отправить код");
    setIsLoading(false);
  };

  const getCodeAgain = async () => {
    if(phone)
    {
      return await setPhoneCode(phone, dispatch);
    }
  }

  return (
      <form onSubmit={sendCodeToBack}>
        <Typography variant="subtitle1" component="div" sx={{
          color: "#6d6d6d",
          fontFamily: 'Akrobat',
          textAlign: "center"
        }}>
          Введите последние 4 цифры входящего звонка
        </Typography>

      <OTPInput value={codeFromSMS} setValue={setCodeFromSMS} />

      <Button
        className={"buttonInput"}
        size="medium"
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#F47920", fontFamily: 'Akrobat',
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
        onClick={() => {
          setTimerForCallAgain(60);
          setButtonBlocked(true);
          getCodeAgain();
        }}
        sx={{
          color: "#6d6d6d", fontFamily: 'Akrobat',
        }}
      >
        {timerForCallAgain === 0 ? "Запросить звонок повторно" : "Запросить звонок повторно " + timerForCallAgain } 
      </Button>

      <Button
        className={"buttonInput"}
        size="small"
        onClick={() => onSwitchForm(0)}
        sx={{
          color: "#6d6d6d", fontFamily: 'Akrobat',
        }}
      >
        Уже зарегистрированы?
      </Button>
    </form>
  );
}

export default GetCode;
