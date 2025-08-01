import React from 'react';
import {RouteObject} from 'react-router-dom';
import Landing from './Landing';
import Login from './page/Login';
import SelectMode from "./page/SelectMode";

const Routes: RouteObject[] = [
    {
        path: '/',
        element: <Landing/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/mode',
        element: <SelectMode/>
    }
];

export default Routes;
