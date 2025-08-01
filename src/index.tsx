import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import Routes from "./Routes";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const router = createBrowserRouter(Routes);

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>
);
