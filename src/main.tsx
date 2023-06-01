import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "overlayscrollbars/overlayscrollbars.css";

import { OverlayScrollbars } from "overlayscrollbars";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

OverlayScrollbars(document.querySelector("body")!, {
  scrollbars: { theme: "os-theme-light" },
});
