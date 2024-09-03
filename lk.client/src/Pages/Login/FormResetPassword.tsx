import { useState } from 'react';
import { Button } from "@mui/material";
import "./Login.css"
import PhoneNumberInput from "../../Components/InputPhone";
import { FaAngleLeft } from "react-icons/fa6";

function FormResetPassword({ onSwitchForm }: { onSwitchForm: (x : number) => void }) {
    const [phone, setPhone] = useState<string>("");


    return (
        <form>
            <PhoneNumberInput
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />

            <Button
                className={"buttonInput"}
                size="medium"
                variant="contained"
                sx={
                    {
                        backgroundColor: "#F47920", fontFamily: 'Roboto, sans-serif',
                    }
                }
            >
                Восстановить пароль
            </Button>

            <Button
                className={"buttonInput"}
                size="small"
                onClick={() => onSwitchForm(0)}
                sx={
                    {
                        color: "#6d6d6d", fontFamily: 'Roboto, sans-serif',
                    }
                }
            >
                <FaAngleLeft size={20}/>
            </Button>
        </form>
    )

}

export default FormResetPassword;