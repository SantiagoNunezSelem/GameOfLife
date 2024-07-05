import React, { useState, useEffect } from "react";
import "../stylesheets/GameOfLife.css";

function GameOfLife() {
  const [world, setWorld] = useState([]);

  const createWorld = (numberRows, numberCol) => {
    const newWorld = [];
    for (let row = 0; row < numberRows; row++) {
      const newRow = [];
      for (let col = 0; col < numberCol; col++) {
        newRow.push({ id: `${row}-${col}`, alive: false});
      }
      newWorld.push(newRow);
    }
    setWorld(newWorld);
  };

  const [gameRunning,setGameRunning] = useState(false)

  /* game running */
  useEffect(() => {
    let intervalId;

    if (gameRunning) {
      intervalId = setInterval(() => {
        nextTurn()
      }, 1000);
    }

    // Limpiar el intervalo cuando `gameRunning` cambie o el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };
  }, [gameRunning]);

  const nextTurn = () => {
    /*
    1.	Si un cuadrado de la grilla está rodeado por tres células vecinas entonces se crea vida, agregándose una célula en ese sitio.
    2.	Si una célula tiene menos de 2 células vecinas, muere por aislamiento y la casilla de la grilla correspondiente queda vacía, y si tiene más de 3 células vecinas, muere por sofocación y también se libera el cuadrado de la grilla que le correspondía.
    3.	Una célula que tiene exactamente dos o tres vecinas sobrevive una instancia más en el juego.
    */
    const newWorld = [...world]
    
    world.map((row,index1) => {
      row.map((col,index2) => {
        if(world[index1][index2].alive == false){
          const numberLivingNeighborCells = numberOfLivingNeighborCells(index1,index2)

          if(numberLivingNeighborCells == 3)
            newWorld[index1][index2].alive = true
        }
        else{
          const numberLivingNeighborCells = numberOfLivingNeighborCells(index1,index2)
          console.log(numberLivingNeighborCells)
          if(numberLivingNeighborCells < 2 || numberLivingNeighborCells > 3)
            newWorld[index1][index2].alive = false
          else
            newWorld[index1][index2].alive = true
        }
      })
    })
    
    setWorld(newWorld)
  }

  const numberOfLivingNeighborCells = (x,y) => {
    let numberLivingNeighborCells = 0

    for(let row=x-1; row<=x+1; row++){
      for(let col=y-1; col<=y+1; col++){
        if(row === x && col === y) continue;

        if(validCoordinates(row,col) && world[row][col].alive == true)
          numberLivingNeighborCells++
      }
    }
    return numberLivingNeighborCells
  }

  const validCoordinates = (x,y) => {
    if(x<0 || x>49 || y<0 || y>49)
      return false
    else
      return true
  }

  /* Click handlers */
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
    setIsMouseDown(true)
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
    const numberRows = 50;
    const numberCol = 50;
    createWorld(numberRows, numberCol);
  }, []);

  return (
    <div className="app">
      <button onClick={() => setGameRunning(true)}>start</button>
      <button onClick={() => setGameRunning(false)}>finish</button>
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
