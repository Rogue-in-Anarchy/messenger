import { useState } from "react";
import { configureWeb3Modal } from "./connection";
import '@radix-ui/themes/styles.css';
import Header from './components/Header'
import Register from "./components/Register";

configureWeb3Modal();
function App() {
    return (
    <>
    <Header />
    <Register />
     
    </>
  );
}

export default App
