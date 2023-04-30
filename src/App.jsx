import { useState } from 'react';
import Game from './components/Game/Game';
import Button from './components/Button/Button';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handleGameRestart = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      {!gameStarted && <Button text="Start Game" onClick={handleGameStart} />}
      {gameStarted && <Game onGameRestart={handleGameRestart} />}
    </div>
  );
}

export default App;