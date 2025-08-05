import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../Landing";
import SelectMode from "../pages/SelectMode";
import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const Routes: RouteObject[] = [
    {
        path: "/",
        element: <Landing/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },
    {
        path: "/mode",
        element: (
            <ProtectedRoute>
                <SelectMode/>
            </ProtectedRoute>
        )
    }
];

export default Routes;
