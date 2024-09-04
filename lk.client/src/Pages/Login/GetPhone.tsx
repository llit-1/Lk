import React, {useState} from 'react'
import { Button, CircularProgress } from "@mui/material";
import PhoneNumberInput from "../../Components/InputPhone";
import { useAppDispatch } from '../../hooks/hook';
import { login } from '../../store/authSlice';
import SnackBarCustom from "../../Components/SnackBarCustom";
import axios from 'axios';

interface GetPhoneProps {
  onSwitchForm: (x: number) => void;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setGetCodeRequest : React.Dispatch<React.SetStateAction<number>>;
}

const GetPhone: React.FC<GetPhoneProps> = ({ onSwitchForm, phone, setPhone, setGetCodeRequest }) => {
    const [buttonText, setButtonText] = useState<string>("Отправить код")
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
      const response = await axios.patch("https://localhost:7026/api/Authorization/set-phone-code?phone=" + phoneDigits)

      console.log(response)

      if(response.status === 200)
      {
        setSnackbarProps({ isOpen: true, isGood: true, message: 'Ожидайте звонка!' });
        setGetCodeRequest(1);
      } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Введите корректный номер телефона!' });
      }
      

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Проверяем, если ли строка "Attempts are over" в сообщении ошибки
        if (error.response && error.response.data === "Attempts are over") {
            setSnackbarProps({ isOpen: true, isGood: false, message: "Превышено количество попыток."});
            // Здесь можно вывести сообщение пользователю или предпринять другие действия
        } else {
            console.log(error);
        }
    } else {
        setSnackbarProps({ isOpen: true, isGood: false, message: 'Произошла непредвиденная ошибка:' +  error});
    }
      

    } finally {
      setButtonText("Отправить код");
      setIsLoading(false);
    }

    setButtonText("");
    setIsLoading(prev => !prev);
  };


    const handleCloseSnackbar = () => {
      setSnackbarProps(prevState => ({ ...prevState, isOpen: false }));
    };
  return (
    <form onSubmit={(e) => getCode(e)}>
      <PhoneNumberInput
        value={phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
      />

      <Button
        className={"buttonInput"}
        size="medium"
        variant="contained"
        type="submit"
        disabled={isLoading}
        sx={{
          backgroundColor: "#F47920", fontFamily: 'Roboto, sans-serif',
        }}
      >
        {buttonText}

        {isLoading && <CircularProgress sx = {{color: "orange"}} size={26}/>}
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

export default GetPhone;
