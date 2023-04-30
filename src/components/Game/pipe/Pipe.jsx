import  { useState, useEffect } from 'react';
import './Pipe.css';

function Pipe({ gameOver }) {
  const [pipes, setPipes] = useState([]);

  const WIDTH = 70;
  const GAP = 200;
  const SPEED = 2;
  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 350;

  const generatePipe = () => {
    const height = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT)) + MIN_HEIGHT;
    const topPipe = { height };
    const bottomPipe = { height: window.innerHeight - height - GAP };
    setPipes((pipes) => [...pipes, { topPipe, bottomPipe }]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generatePipe();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pipeInterval = setInterval(() => {
      setPipes((pipes) =>
        pipes.map((pipe) => {
          const newPipe = { ...pipe };
          newPipe.topPipe.left -= SPEED;
          newPipe.bottomPipe.left -= SPEED;
          return newPipe;
        })
      );
    }, 16);

    const birdRect = document.querySelector('.bird').getBoundingClientRect();

    const checkCollision = () => {
      pipes.forEach((pipe) => {
        const topPipeRect = document.querySelector(`#top-pipe-${pipe.id}`).getBoundingClientRect();
        const bottomPipeRect = document.querySelector(`#bottom-pipe-${pipe.id}`).getBoundingClientRect();

        if (
          birdRect.right >= topPipeRect.left &&
          birdRect.left <= topPipeRect.right &&
          (birdRect.top <= topPipeRect.bottom || birdRect.bottom >= bottomPipeRect.top)
        ) {
          gameOver();
        }
      });
    };

    const collisionInterval = setInterval(() => {
      checkCollision();
    }, 16);

    return () => {
      clearInterval(pipeInterval);
      clearInterval(collisionInterval);
    };
  }, [pipes, gameOver]);

  return (
    <>
      {pipes.map((pipe, index) => (
        <div className="pipe" key={index}>
          <div
            className="pipe-section top-pipe"
            id={`top-pipe-${index}`}
            style={{ height: `${pipe.topPipe.height}px`, left: `${pipe.topPipe.left}px` }}
          ></div>
          <div
            className="pipe-section bottom-pipe"
            id={`bottom-pipe-${index}`}
            style={{ height: `${pipe.bottomPipe.height}px`, left: `${pipe.bottomPipe.left}px` }}
          ></div>
        </div>
      ))}
    </>
  );
}

export default Pipe;