import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../src/Pages/Login/Login"
import MainPage from "./Pages/MainPage/MainPage"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/MainPage" />} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/MainPage" element={<MainPage/>} />
            </Routes>
        </>
    )
}

export default App;