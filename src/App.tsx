import React, { useEffect, useState } from 'react';
import './App.css'
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';


const App = () => {
  const [board, setBoard] = useState(new Board()) // eslint-disable-next-line
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE)) // eslint-disable-next-line
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    setCurrentPlayer(whitePlayer)
    restart() // eslint-disable-next-line
  }, [])
  
  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setCurrentPlayer(whitePlayer)
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }


  return (
    <div className='app'>
      <div className='flex-container'>
      <Timer restart={restart} currentPlayer={currentPlayer} />
        <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />
      </div>
      <div>
        <LostFigures title={"Black figures"} figures={board.lostBlackFigures} />
        <LostFigures title={"White figures"} figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
