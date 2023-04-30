
import { useState, useEffect, useRef } from 'react';
import './Bird.css';

// eslint-disable-next-line react/prop-types
function Bird({ gameOver, onScore }) {
  const [position, setPosition] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const birdRef = useRef(null);

  const GRAVITY = 0.4;
  const JUMP_HEIGHT = 6.5;

  const jump = () => {
    setVelocity(-JUMP_HEIGHT);
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setVelocity((velocity) => velocity + GRAVITY);
      setPosition((position) => position + velocity);
    }, 16);

    const handleKeyDown = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [velocity]);

  useEffect(() => {
    const birdTop = birdRef.current.getBoundingClientRect().top;
    const pipes = document.querySelectorAll('.pipe');

    pipes.forEach((pipe) => {
      const pipeTop = pipe.getBoundingClientRect().top;
      const pipeLeft = pipe.getBoundingClientRect().left;
      const pipeRight = pipe.getBoundingClientRect().right;

      if (
        birdTop < pipeTop + 320 &&
        birdTop + 32 > pipeTop &&
        pipeLeft < 150 &&
        pipeRight > 50
      ) {
        gameOver();
      }
    });
  }, [gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      onScore();
    }, 2000);

    return () => clearInterval(interval);
  }, [onScore]);

  return (
    <div
      className="bird"
      style={{ top: `${position}px`, transition: 'top 0.16s linear' }}
      ref={birdRef}
    ></div>
  );
}

export default Bird;