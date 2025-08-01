import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Landing from './Landing';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const App = () => {
    return <Landing />;
};

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);
