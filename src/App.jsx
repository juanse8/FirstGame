import { useState } from "react";
import confetti from "canvas-confetti"

const TURN = {
  X: "x",
  O: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? "is-selected" : ``}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  //null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);
  //El useSteat Es una forma sencilla de crear y actualizar variables de estado en un componente de React sin tener que escribir una clase completa.

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }

  const resetTie = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    //no actualizamos esta posicion porque ya hay algo
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambio de turno
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetTie}>Reset del juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? `Empate` : `Gano: `}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
