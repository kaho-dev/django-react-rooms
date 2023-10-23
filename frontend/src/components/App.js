import React from 'react'
import {createRoot} from "react-dom/client";
import HomePage from './HomePage';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  )
}

export default App

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App tab="home" />);