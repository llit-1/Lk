import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from "@mui/material";
import OTPInput from '../../Components/OTP';

interface GetCodeProps {
  onSwitchForm: (x: number) => void;
  setGetCodeRequest : React.Dispatch<React.SetStateAction<number>>;
}

const GetCode: React.FC<GetCodeProps> = ({ onSwitchForm, setGetCodeRequest}) => {
  const [buttonText, setButtonText] = useState<string>("Подтвердить");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonBlocked, setButtonBlocked] = useState<boolean>(true);
  const [codeFromSMS, setCodeFromSMS] = useState<string>('');  // Храним OTP как строку

  useEffect(() => {
    setTimeout(() => {
      setButtonBlocked(prev => !prev)
  }, 30000);
  }, [])


  const sendCodeToBack = async(e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("")
    setIsLoading(prev => !prev)
    //const result = await fetch("")
    setGetCodeRequest(2)
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
        disabled={codeFromSMS.length < 5}
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
