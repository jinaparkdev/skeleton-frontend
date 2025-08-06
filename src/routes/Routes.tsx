import {RouteObject} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../Landing";
import SelectMode from "../pages/SelectMode";
import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PasswordFinder from "../pages/PasswordFinder";
import PasswordSetter from "../pages/PasswordSetter";
import NotFound from "../pages/NotFond";

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
    },
    {
        path: "/recovery/password",
        element: <PasswordFinder/>,
    },
    {
        path: "/recovery/password/:token",
        element: <PasswordSetter/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    }
];

export default Routes;
