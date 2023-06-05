import ReactDOM from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@aws-amplify/ui-react/styles.css";
import "overlayscrollbars/overlayscrollbars.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { OverlayScrollbars } from "overlayscrollbars";
import { AppWithAuth } from "./AppWithAuth";

const theme = createTheme({ palette: { mode: "dark" } });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <AppWithAuth />
    </CssBaseline>
  </ThemeProvider>
);

OverlayScrollbars(document.querySelector("body")!, {
  scrollbars: { theme: "os-theme-light" },
});
