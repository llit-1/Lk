import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage.tsx";

function App() {
    //const storedToken = localStorage.getItem("authToken");


    return (
        <Routes>
                    <Route path="/" element={<Navigate to="/Login" />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/MainPage" element={<MainPage/>} />
        </Routes>
    );
}

export default App;
