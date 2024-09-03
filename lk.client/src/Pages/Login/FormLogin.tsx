import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress } from "@mui/material";
import "./Login.css"
import PhoneNumberInput from "../../Components/InputPhone";
// import { login } from '../../store/authSlice';
// import { useAppSelector, useAppDispatch } from '../../hooks/hook';
// import { RootState } from '../../store/index';
import { Navigate } from "react-router"
import axios from 'axios';

function FormLogin({ onSwitchForm }: { onSwitchForm: (x : number) => void }) {
    const [password, setPassword] = useState<string>("")
    const [phone, setPhone] = useState<string>("");
    //const { loading, error } = useAppSelector((state: RootState) => state.auth);
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [text, setText] = useState<string>("Войти")


    //const dispatch = useAppDispatch();

    useEffect(() => setIsLoading(prev => !prev), [text])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setText("")

        try {
            const response = await axios.post("https://localhost:7026/api/Authorization/login", {
                phone: phone.replace(/\D/g, '').substring(1),
                password: password
            });

            localStorage.setItem("authToken", response.data);
            setIsAuth(true);

        } catch (error) {
            console.error("Ошибка:", error);
        } finally {
            setText("Войти");
        }
        
        //dispatch(login({ phone, password }));
    };


    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <PhoneNumberInput
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
            <TextField
                required
                className={"textInput"}
                type={"password"}
                autoComplete='current-password'
                value={password}
                id="passowrd"
                label="Пароль"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                variant="outlined"
                size="medium"
                sx={
                    {
                        fontFamily: 'Roboto, sans-serif',
                        '& .MuiOutlinedInput-root': { borderRadius: 0, },
                        backgroundColor: 'white',
                    }
                }
            />

            <Button
                className={"buttonInput"}
                size="medium"
                variant="contained"
                type="submit"
                sx={
                    {
                        backgroundColor: "#F47920", fontFamily: 'Roboto, sans-serif',
                    }
                }
            >
                {isLoading && <CircularProgress sx = {{color: "orange"}} size={26}/>}
                {text}
            </Button>

            <Button
                className={"buttonInput"}
                size="small"
                onClick={() => onSwitchForm(1)}
                sx={
                    {
                        color: "#6d6d6d", fontFamily: 'Roboto, sans-serif',
                    }
                }
            >
                Зарегистрироваться \ Забыли пароль?
            </Button>

            {isAuth && <Navigate to="/MainPage" />}
            
        </form>
    )

}

export default FormLogin;