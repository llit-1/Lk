import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import { useState, useEffect } from "react";

function App() {
    const storedToken = localStorage.getItem("authToken");

    return (
        <>
            <Routes>
                {!storedToken ? (
                    <Route path="/" element={<Navigate to="/Login" />} />
                ) : (
                    <Route path="/" element={<Navigate to="/MainPage" />} />
                )}

                <Route path="/Login" element={<Login />} />
                <Route path="/MainPage" element={<MainPage />} />

                <Route path="*" element={<Navigate to="/Login" />} />
            </Routes>
        </>
    );
}

export default App;
