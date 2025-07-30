/* eslint react/jsx-key: off */
import * as React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const App = () => {
    return <div>hello world</div>
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
