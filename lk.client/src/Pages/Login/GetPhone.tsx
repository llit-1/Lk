import React, {useState} from 'react'
import { Button, CircularProgress, Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import PhoneNumberInput from "../../Components/InputPhone";

interface GetPhoneProps {
  onSwitchForm: (x: number) => void;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setGetCodeRequest : React.Dispatch<React.SetStateAction<number>>;
}

const GetPhone: React.FC<GetPhoneProps> = ({ onSwitchForm, phone, setPhone, setGetCodeRequest }) => {
    const [buttonText, setButtonText] = useState<string>("Отправить код")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openBadSnackbar, setOpenBadSnackbar] = useState<boolean>(false);

    const getCode = async (e : React.FormEvent) => {
        e.preventDefault()
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) {
          return setOpenBadSnackbar(true);
         }
        console.log(phoneDigits)
        setButtonText("")
        setIsLoading(prev => !prev)
        setGetCodeRequest(1)
        //const result = await fetch("https://localhost:7085/api/auth/getMessageOnPhone")
    }

    const handleCloseBadSnackbar = () => {
      setOpenBadSnackbar(false);
    };

    function TransitionDown(props : SlideProps) {
      return <Slide {...props} direction="down" />;
    }

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

      <Snackbar
        open={openBadSnackbar}
        TransitionComponent = {TransitionDown}
        autoHideDuration={6000}
        anchorOrigin={{vertical : "top", horizontal : "right"}}
        onClose={handleCloseBadSnackbar}
        message="Телефон заполнен некорректно!"
      >
        <Alert onClose={handleCloseBadSnackbar} severity="error" sx={{ width: '100%' }}>
          Телефон заполнен некорректно!
        </Alert>
      </Snackbar>
    </form>
  );
}

export default GetPhone;
