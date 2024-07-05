import React, { useState, useEffect } from "react";
import "../stylesheets/GameOfLife.css";

function GameOfLife() {
  const [world, setWorld] = useState([]);

  const createWorld = (numberRows, numberCol) => {
    const newWorld = [];
    for (let row = 0; row < numberRows; row++) {
      const newRow = [];
      for (let col = 0; col < numberCol; col++) {
        newRow.push({ id: `${row}-${col}`, alive: false });
      }
      newWorld.push(newRow);
    }
    setWorld(newWorld);
  };

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleCellHold = (rowIndex, colIndex, ev) => {
    
    if(isMouseDown){
      setWorld((prevWorld) => {
        const newWorld = [...prevWorld];
        newWorld[rowIndex][colIndex].alive = true;

        return newWorld;
      });
    }
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const newWorld = [...world]

    newWorld[rowIndex][colIndex].alive = !newWorld[rowIndex][colIndex].alive

    setWorld(newWorld)
  }

  useEffect(() => {
    const numberRows = 30;
    const numberCol = 30;
    createWorld(numberRows, numberCol);
  }, []);

  return (
    <div className="app">
      <div id="board-container">
        <table onMouseLeave={() => setIsMouseDown(false)}>
          <tbody>
            {world.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={cell.id}
                    id={`cell-${rowIndex}-${colIndex}`}
                    className={cell.alive ? "alive" : "dead"}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onMouseDown={() => handleMouseDown()}
                    onMouseUp={() => handleMouseUp()}
                    onMouseEnter={(ev) => handleCellHold(rowIndex, colIndex,ev)}
                  >
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameOfLife;
