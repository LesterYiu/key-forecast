import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";

// Component Imports
import FrontPage from './FrontPage';
import Home from './Home';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function App() {

    const [userUID, setUserUID] = useState<string>("");
    const [isAuth, setIsAuth] = useState<boolean>(false)

    return (
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/signup"
                element={
                    <SignUpPage
                        userUID={userUID}
                        setUserUID={setUserUID}
                        setIsAuth={setIsAuth}
                        isAuth={isAuth}
                    />
                }
            />
            <Route path="/home" element={<Home />}/>
        </Routes>
    );
}

export default App;
