import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./rtkstore/store.js";
import { PrimeReactProvider } from "primereact/api";
import { Header } from "./Layout/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <div className="font-poppins">
          {/* <Header /> */}
        <App />
        </div>
      </PrimeReactProvider>
    </Provider>
  </StrictMode>
);
