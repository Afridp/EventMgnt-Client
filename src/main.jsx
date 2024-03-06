import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import { ThemeProvider } from "@material-tailwind/react";

import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider> */}
        {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
          <App />
          {/* </LocalizationProvider> */}
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
   </React.StrictMode>
);
