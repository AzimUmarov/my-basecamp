import './App.css';
import MyNavbar from "../component/navbar/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import RouterApp from "../component/router/RouterApp/RouterApp";
import {BrowserRouter} from "react-router-dom";
import {useContext} from "react";
import UserCredentialsContext from "../context/Credentials/UserCredentialsContext";
import PublicRouter from "../component/router/PublicRouter/PublicRouter";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const {userCredentials} = useContext(UserCredentialsContext);
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            { userCredentials?.token
                ? <BrowserRouter>
                    <MyNavbar/>
                    <RouterApp/>
                </BrowserRouter>
                : <PublicRouter/>
            }
        </ThemeProvider>
    );
}


export default App;
