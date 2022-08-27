import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Error from "../../pages/NotFound/NotFound";
import Login from "../../pages/User/Login";
import Register from "../../pages/User/SignUp";
import RouterApp from "../RouterApp/RouterApp";

function PublicRouterApp(props) {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tunnel" element={<RouterApp/>} />
            <Route path="*" element={<Error/>} />
        </Routes>
        </BrowserRouter>
    )
}


export default PublicRouterApp;
