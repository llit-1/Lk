import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage.tsx";
import {useAppDispatch, useAppSelector} from './hooks/hook.ts'
import SnackBarCustom from "./Components/SnackBarCustom.tsx"
import { hideNotification } from './store/notificationSlice';

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
                {storedToken ? <Route path="/" element={<Navigate to="/MainPage" />} /> : <Route path="/" element={<Navigate to="/Login" />} />}
                <Route path="/Login" element={<Login />} />
                <Route path="/MainPage" element={<MainPage/>} />
            </Routes>
        </>
    );
}

export default App;
