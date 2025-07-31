/* eslint react/jsx-key: off */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Landing from "./Landing";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const App = () => {
    return <Landing/>;
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
