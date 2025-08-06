import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/system";

import Routes from "./routes/Routes";
import {theme} from "./theme";

const App = () => {
    const AppContent = (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={createBrowserRouter(Routes)}/>
            </ThemeProvider>
        </RecoilRoot>
    );

    return import.meta.env.MODE === "production" ? AppContent :
        <React.StrictMode>{AppContent}</React.StrictMode>;
};

export default App;
