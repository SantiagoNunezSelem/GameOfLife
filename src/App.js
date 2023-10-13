import React from "react";
import "./App.css";
import GameOfLife from "./components/GameOfLife";


function App(){

  return(
    <div className="App">

      <div id="container">
        <GameOfLife/>
      </div>

    </div>
  );
}

export default App;