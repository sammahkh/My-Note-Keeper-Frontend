import React from "react";
import Header from "./components/Header/Header";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className='container'>
      <Header handleToggleDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default App;
