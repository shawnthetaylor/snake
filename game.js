import Snake from './snake.js';

const Keycodes = {
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  SPACE: 32
};

document.addEventListener('DOMContentLoaded', () => {
  const snake = new Snake();
  const overlay = document.getElementById('directions-overlay');
  let gameStarted = false;

  // Start game when button clicked
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', () => {
    gameStarted = true;
    overlay.classList.toggle('show');
    snake.updateGameState();
  });

  // Bind event listeners to keys
  document.addEventListener('keydown',  ({ keyCode }) => {
    if (gameStarted) {
      switch(keyCode) {
        case Keycodes.SPACE : {
          snake.updateGameState();
          overlay.classList.toggle('hide');
          break;
        }
        case Keycodes.RIGHT_ARROW: {
          snake.updateDirection(1, 0);
          break;
        }
        case Keycodes.LEFT_ARROW: {
          snake.updateDirection(-1, 0);
          break;
        }
        case Keycodes.DOWN_ARROW: {
          snake.updateDirection(0, 1);
          break;
        }
        case Keycodes.UP_ARROW: {
          snake.updateDirection(0, -1);
          break;
        }
      };
    }
  });
});
