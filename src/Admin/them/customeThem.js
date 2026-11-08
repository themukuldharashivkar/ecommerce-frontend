import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "dark", // Set the custom color mode name here
    primary: {
      main: '#9155FD',
    },
    secondary: {
      main: '#f48fb1',
    },
    white:{
      main:"#fff"
    },
    orange:{
      main:"#ffdb0f"
    },
    
    background: {
      default: '',
      // paper: '#121019',
      paper:"rgb(0, 0, 22)"
    },
  },
 
  
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9155FD',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const customerTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0E0E10", contrastText: "#fff" },
    secondary: { main: "#5B35F0" },
    white: { main: "#fff" },
    orange: { main: "#ffdb0f" },
    background: { default: "#FAFAF8", paper: "#fff" },
    text: { primary: "#0E0E10", secondary: "#6b6b70" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12, backgroundColor: "#fff" } },
    },
    MuiPaginationItem: {
      styleOverrides: { root: { fontWeight: 600 } },
    },
    MuiStepIcon: {
      styleOverrides: { root: { "&.Mui-active, &.Mui-completed": { color: "#0E0E10" } } },
    },
  },
});

export {customTheme,darkTheme,customerTheme};
