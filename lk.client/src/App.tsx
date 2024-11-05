import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import Main from "./Pages/MainPage/Main.tsx";
import MenuTiles from "./Pages/MainPage/MenuTiles.tsx";
import { IncomeLevelCards } from "./Pages/SalaryLevel/IncomeLevelCards.tsx";
import Profile from "./Pages/Profile/Profile.tsx";
import SnackBarCustom from "./Components/SnackBarCustom.tsx";
import { useAppDispatch, useAppSelector } from './hooks/hook.ts';
import { hideNotification } from './store/notificationSlice';
import { login } from './store/authSlice.ts';
import { checkToken } from './Pages/Requests.tsx';
import ExchangeSlots from "./Pages/ExchangeSlots/ExchangeSlots.tsx"
import Shifts from "./Pages/Shifts/Shifts.tsx";

function App() {
    const storedToken = localStorage.getItem("authToken");
    const phone = localStorage.getItem("phone");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const isValidToken = async (token: string) => {
        try {
            const result = await checkToken(token);
            return result;
        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    };

    // Используем useEffect для проверки токена и авторизации
    useEffect(() => {
        const authenticateUser = async () => {
            if (storedToken) {
                dispatch(login({ token: storedToken, phone: phone ?? undefined }));
                const valid = await isValidToken(storedToken);
                if (valid) {
                    setIsAuth(true);
                } else {
                    navigate('/Login');
                }
            } else {
                navigate('/Login');
            }
        };

        authenticateUser(); // Вызов асинхронной функции
    }, [dispatch, storedToken, phone, navigate]);

    const notification = useAppSelector(state => state.notification);

    const handleCloseSnackbar = () => {
        dispatch(hideNotification());
    };

    return (
        <>
            <SnackBarCustom
                isOpen={notification.isOpen}
                isGood={notification.isGood}
                message={notification.message}
                onClose={handleCloseSnackbar}
            />
            <Routes>
                <Route path="/Login" element={<Login />} />

                {isAuth ? (
                    <>
                        <Route path="/" element={<Navigate to="/Main/Tiles" />} />
                        <Route path="/Main" element={<Main />}>
                            <Route path="Tiles" element={<MenuTiles />} />
                            <Route path="SalaryLevel" element={<IncomeLevelCards />} />
                            <Route path="Profile" element={<Profile />} />
                            <Route path="Exchange" element={<ExchangeSlots />} />
                            <Route path="Shifts" element={<Shifts />} />
                        </Route>
                    </>
                ) : (
                    // Если не авторизован
                    <Route path="/" element={<Navigate to="/Login" />} />
                )}
            </Routes>
        </>
    );
}

export default App;
