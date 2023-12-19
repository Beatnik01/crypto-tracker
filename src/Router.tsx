import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./screens/components/Header";

function Router() {
  return <BrowserRouter>
    <Header/>
    <Routes></Routes>
  </BrowserRouter>;
}

export Router;
