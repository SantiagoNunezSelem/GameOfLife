import React, { useState, useEffect } from "react"
import "../stylesheets/GameOfLife.css"

function GameOfLife() {
  const [numberRows, setNumberRows] = useState(50)
  const [numberCol, setNumberCol] = useState(50)
  const [world, setWorld] = useState([])
  const [generation, setGeneration] = useState(0)
  const [livingCells, setLivingCells] = useState(0)

  const [restart,setRestart] = useState(false)

  useEffect(() => {
    createWorld(numberRows, numberCol)

    setGameRunning(false)
    setGeneration(0)
    setLivingCells(0)

    if(restart)
      setRestart(false)

  }, [,restart])

  const createWorld = (numberRows, numberCol) => {
    const newWorld = []
    for (let row = 0; row < numberRows; row++) {
      const newRow = []
      for (let col = 0; col < numberCol; col++) {
        newRow.push({ id: `${row}-${col}`, alive: false})
      }
      newWorld.push(newRow)
    }
    setWorld(newWorld)
  };

  const [gameRunning,setGameRunning] = useState(false)

  /* game running */
  useEffect(() => {
    let intervalId

    if (gameRunning) {
      intervalId = setInterval(() => {
        nextGeneration()
      }, 100)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [gameRunning,world])

  const nextGeneration = () => {
    /*
    1.	Si un cuadrado de la grilla está rodeado por tres células vecinas entonces se crea vida, agregándose una célula en ese sitio.
    2.	Si una célula tiene menos de 2 células vecinas, muere por aislamiento y la casilla de la grilla correspondiente queda vacía, y si tiene más de 3 células vecinas, muere por sofocación y también se libera el cuadrado de la grilla que le correspondía.
    3.	Una célula que tiene exactamente dos o tres vecinas sobrevive una instancia más en el juego.
    */
    let livingCells = 0 

    const newWorld = world.map((row,index1) => {
      return row.map((cell,index2) => {
        const numberLivingNeighborCells = numberOfLivingNeighborCells(index1,index2)
        if(cell.alive === false){
          if(numberLivingNeighborCells === 3){
            livingCells++
            return {...cell, alive: true}
          }
          else
            return {...cell, alive: false}
        }
        else{
          if(numberLivingNeighborCells < 2 || numberLivingNeighborCells > 3)
            return {...cell, alive: false}
          else{
            livingCells++
            return {...cell, alive: true}
          }
        }
      })
    })

    setGeneration((prevGeneration) => {return prevGeneration+1})
    setLivingCells(livingCells)
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
    if(x < 0 || x > numberRows-1 || y < 0 || y > numberCol-1)
      return false
    else
      return true
  }

  /* Click handlers */
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleCellHold = (rowIndex, colIndex, ev) => {
    
    if(isMouseDown){
      setWorld((prevWorld) => {
        const newWorld = [...prevWorld]
        newWorld[rowIndex][colIndex].alive = true

        return newWorld
      })
    }
  }

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleCellClick = (rowIndex, colIndex) => {
    const newWorld = [...world]

    newWorld[rowIndex][colIndex].alive = !newWorld[rowIndex][colIndex].alive

    setWorld(newWorld)
  }

  return (
    <div className="game-of-life-container">
      <div id="info-container">
        <button onClick={() => setGameRunning(true)}>Start</button>
        <button onClick={() => setGameRunning(false)}>Stop</button>
        <p className="text-info">Generación: {generation}</p>
        <p className="text-info">Celulas Vivas: {livingCells}</p>
        <div>
          <button onClick={() => setRestart(true)}>Restart</button>
        </div>
      </div>
      
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
