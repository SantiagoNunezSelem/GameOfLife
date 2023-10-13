import React,{useEffect} from "react";
import "../stylesheets/GameOfLife.css";

function GameOfLife(){

  const createWorld = (numberRows,numberCol) => {
    let html = "<table>"
    for(let rows=0;rows<numberRows;rows++){
      html += "<tr>"
      for(let col=0;col<numberCol;col++){
        html += "<td id=cell>"
        html += "</td>"
        /*addCell(uuidv4(),i)
        console.log()*/
      }
      html += "</tr>"
    }
    html += "</table>"
    let container = document.getElementById("board-container")
    container.innerHTML = html
  }

  useEffect(() => {
    const numberRows = 20;
    const numberCol = 20;
    createWorld(numberRows,numberCol);
  },[])



  return(
    <div className="app">

      <div id="board-container">

      </div>

    </div>
  );
}

export default GameOfLife;