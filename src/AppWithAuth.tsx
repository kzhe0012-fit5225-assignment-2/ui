import App from "./App.tsx";
import logo from "./assets/vite.svg";
import {
  withAuthenticator,
  ThemeProvider,
  createTheme,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { config } from "./config.ts";
import { Box, Typography } from "@mui/material";
import "./amplify.css";

Amplify.configure(config);

const AppWithAuthBase = withAuthenticator(App, {
  socialProviders: ["google"],
  variation: "default",
  components: {
    Header() {
      return (
        <Box p={8}>
          <img style={{ width: 64 }} src={logo} />
          <Typography sx={{ pt: 2 }} variant="h3">
            Enlighten
          </Typography>
        </Box>
      );
    },
  },
});

console.log(defaultDarkModeOverride);

const theme = createTheme({
  name: "dark",
  overrides: [defaultDarkModeOverride],
  tokens: defaultDarkModeOverride.tokens as any,
});

export function AppWithAuth() {
  return (
    <ThemeProvider theme={theme}>
      <AppWithAuthBase />
    </ThemeProvider>
  );
}
