import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header.jsx";

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => { });

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      Works!
      <button onClick={onClose}>Закрыть</button>
      <Header />
    </div>
  ); /*  */
}

export default App;
