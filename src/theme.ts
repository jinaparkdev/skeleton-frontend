import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#FFD740",
            light: "#FFFF72",
            dark: "#C6A700",
            contrastText: "#000000",
        },
        secondary: {
            main: "#212121",
            light: "#424242",
            dark: "#0A0A0A",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff",
        },
        text: {
            primary: "#212121",
            secondary: "#424242",
        },
    },
    typography: {
        fontFamily: "'Pretendard', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#212121",
                    color: "#ffffff",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                },
            },
        },
        MuiPaper:{
            styleOverrides: {
                root: {
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow: "none",
                    backgroundColor: "#ffffff",
                },
            },
        }
    },
});
