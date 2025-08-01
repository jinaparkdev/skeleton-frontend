import React from 'react';
import { RouteObject } from 'react-router-dom';
import Landing from './Landing';
import Login from './page/Login';

const Routes: RouteObject[] = [
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/login',
        element: <Login />,
    },
];

export default Routes;
