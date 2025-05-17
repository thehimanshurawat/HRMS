// import React from 'react'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer  position="top-center"/>
      <App />
    </Provider>
  </React.StrictMode>
);
