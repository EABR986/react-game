import  { useState, useEffect } from 'react';
import Bird from './bird/Bird';
import Pipe from './pipe/Pipe';
import Button from '../Button/Button';
import './Game.css';

// eslint-disable-next-line react/prop-types
function Game({ onGameRestart }) {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleScore = () => {
    setScore((score) => score + 1);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <div className="game">
      <div className="game-header">
        <div className="game-title">Flappy Bird Clone</div>
        <div className="game-scores">
          <div className="game-current-score">Score: {score}</div>
          <div className="game-high-score">High Score: {highScore}</div>
        </div>
      </div>
      <div className="game-container">
        <Bird gameOver={handleGameOver} onScore={handleScore} />
        <Pipe onScore={handleScore} />
        <Pipe onScore={handleScore} />
        <Pipe onScore={handleScore} />
        {gameOver && <Button text="Restart" onClick={onGameRestart} />}
      </div>
    </div>
  );
}

export default Game;