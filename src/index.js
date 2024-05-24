import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import store from "./store";
import App from "./App";
import GlobalStyle from "./globalStyles";
import theme from "./theme";
import worker from "./setupMocks";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
