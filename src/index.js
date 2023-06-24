import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

// import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";

import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  // <Router>
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>

  // </Router>,
  );
