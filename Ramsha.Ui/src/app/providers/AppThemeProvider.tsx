import { GlobalStyles } from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { ReactNode, createContext, useMemo, useState } from "react";

type ThemeContextType = {
  switchColorMode: () => void;
  mode: "light" | "dark";
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => { },
  mode: 'light'
});

export function AppThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };


  //E64833   --orange
  //D8BFD8   --pink
  //3aafa9   --modern
  //e57373   --modern-secondary

  //802bb1   --purple
  //c50900   --red
  //ffe400   --yellow
  //86c232    --green

  //efc100   --gold
  //f4a460   --gold-secondary



  let theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),

        },
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: {
                main: '#3aafa9',  // Teal Green
              },
              secondary: {
                main: '#e57373',  // Cool Slate
              },
              divider: '#ECEFF1',  // Light Grey Blue
              text: {
                primary: '#1C1C1C',  // Soft Black
                secondary: '#607D8B',  // Blue Grey
              },
            }
            : {
              // palette values for dark mode
              primary: {
                main: '#3aafa9',  // Neon Green
              },
              secondary: {
                main: '#e57373',  // Deep Aqua Blue
              },
              divider: '#37474F',  // Dark Blue Grey
              background: {
                default: '#232730',
                paper: '#232730',
              },
              text: {
                primary: '#fff',  // Cool Light Grey
                secondary: '#B0BEC5',  // Pale Blue Grey
              },
            }),
        },



        // palette: {
        //   mode,
        //   ...(mode === 'light'
        //     ? {
        //       // palette values for light mode
        //       primary: {
        //         main: '#F295A7'
        //       },
        //       secondary: {
        //         main: '#565656'
        //       },
        //       divider: '#BDBDBD',
        //       text: {
        //         primary: colors.grey[900],
        //         secondary: colors.grey[800]
        //       },
        //     }
        //     : {
        //       // palette values for dark mode
        //       //4DB6AC good like blue
        //       //D8A7A0 pink good
        //       primary: {
        //         main: '#F295A7'
        //       },
        //       secondary: {
        //         main: '#B0BEC5'
        //       },
        //       divider: colors.grey[400],
        //       background: {
        //         default: '#1E1E1E',
        //         paper: '#292929',
        //       },
        //       text: {
        //         primary: '#fff',
        //         secondary: colors.grey[400]
        //       },
        //     }),
        // },
      }),
    [mode]
  );
  theme = responsiveFontSizes(theme)
  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode, mode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
            },

          }}
        />
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
