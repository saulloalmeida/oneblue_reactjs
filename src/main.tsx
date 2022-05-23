import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Cadastro } from "./components/Cadastro";
import "./index.css";
import { Login } from "./components/Login";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="cadastro" element={<Cadastro />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
