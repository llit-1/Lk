import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import Main from "./Pages/MainPage/Main.tsx";
import {useAppDispatch, useAppSelector} from './hooks/hook.ts'
import SnackBarCustom from "./Components/SnackBarCustom.tsx"
import { hideNotification } from './store/notificationSlice';
import MenuTiles from "./Pages/MainPage/MenuTiles.tsx"
import { IncomeLevelCards } from "./Pages/Shifts/IncomeLevelCards.tsx";
import Profile from "./Pages/Profile/Profile.tsx"

function App() {
    const storedToken = localStorage.getItem("authToken");

    // 
    const dispatch = useAppDispatch();
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
                {storedToken ? <Route path="/" element={<Navigate to="/Main/Tiles" />} /> : <Route path="/" element={<Navigate to="/Login" />} />}
                <Route path="/Login" element={<Login />} />
                <Route path="/Main" element={<Main />}>
                    <Route path="Tiles" element={<MenuTiles />} />
                    <Route path="SalaryLevel" element={<IncomeLevelCards />} />
                    <Route path="Profile" element={<Profile />} />
                </Route>
                
            </Routes>
        </>
    );
}

export default App;
