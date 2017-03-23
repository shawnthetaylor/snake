import Block from './components/block';
import Food from './components/food';

export default class Snake {
  constructor(snakeHeight=20, snakeWidth=20, speed=1) {
    this.snakeHeight = snakeHeight;
    this.snakeWidth = snakeWidth;
    this.speed = speed; // incomplete feature

    this.food = new Food(300, 200, this.snakeWidth / 2);

    this.paused = true;
    this.gameRunner;

    // Controls direction of snakeHead
    this.dx = 1;
    this.dy = 0;

    this.snakeHead = new Block(200, 200, this.snakeWidth, this.snakeHeight);

    this.canvas = document.getElementById('snake');
    this.ctx = this.canvas.getContext('2d');
  }

  // Lifecycle control methods
  start() {
    this.gameRunner = setInterval(this.draw.bind(this), 100);
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paused = true;
    this.gameRunner = null;
    this.dx = 1;
    this.dy = 0;
    this.snakeHead = new Block(200, 200, this.snakeWidth, this.snakeHeight);
  }

  // Keybinding methods
  updateGameState() {
    if (this.paused) {
      this.start();
    } else {
      clearInterval(this.gameRunner);
    }
    this.paused = !this.paused;
  }

  updateDirection(dx, dy) {
    if (this.dx === 0 && dx !== 0 || this.dy === 0 && dy !== 0) {
      this.dx = dx;
      this.dy = dy;
    }
  }

  // Helper methods
  hasEaten(block) {
    const nearestX = this.food.x - (this.snakeWidth / 2);
    const nearestY = this.food.y - (this.snakeHeight / 2);
    if (nearestX === block.x && nearestY === block.y) {
      return true;
    }
    return false;
  }

  wallCollision(block) {
    const { x, y } = block;
    const { snakeHeight, snakeWidth } = this;
    if (x === 500 || x === -1*snakeWidth || y === 500 || y === -1*snakeHeight) {
      return true;
    }
    return false;
  }

  generateFood() {
    const { canvas, snakeHeight, snakeWidth } = this;
    const randomX = Math.random();
    const randomY = Math.random();

    this.food = new Food(
      Math.floor((randomX * canvas.width) / snakeWidth) * snakeWidth,
      Math.floor((randomY * canvas.height) / snakeHeight) * snakeHeight,
      snakeWidth / 2
    )
  }

  bodyCollision(x, y) {
    const head = this.snakeHead;
    if (x === head.x && y === head.y) {
      return true;
    }
    return false;
  }

  updateBlock(block) {
    const { snakeHead, snakeHeight, snakeWidth, dx, dy } = this;
    const { next } = block;

    // Head block coordinates
    let newX = snakeHead.x + (snakeWidth * dx);
    let newY = snakeHead.y + (snakeHeight * dy);
    if (next) {
      // This block isn't the head
      newX = next.lastX;
      newY = next.lastY;
    }

    block.positionX = newX;
    block.positionY = newY;
  }

  drawBlock(block) {
    const { ctx, snakeHeight, snakeWidth } = this;

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.rect(block.x, block.y, snakeWidth, snakeHeight);
    ctx.fill();
  }

  drawFood(food) {
    const { ctx } = this;

    ctx.beginPath()
    ctx.arc(food.x, food.y, food.r, 0, 2*Math.PI, false);
    ctx.fill();
  }

  draw() {
    if (!this.paused) {
      const { snakeHead } = this;

      let ateFood = false;
      // Clear board for redraw
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Manage head of snake first
      this.updateBlock(snakeHead);
      if (this.wallCollision(snakeHead)) {
        this.reset();
        alert('Whoops! Game Over!');
        return;
      }
      this.drawBlock(snakeHead);

      // Check if the head hit food
      if (this.hasEaten(snakeHead)) {
        this.generateFood();
        ateFood = true;
      }

      // Draw food
      this.drawFood(this.food);

      let block = snakeHead.prev;
      if (block) {
        while (true) {
          if (this.bodyCollision(block.next.lastX, block.next.lastY)) {
            this.reset();
            alert('Whoops! Game Over!');
            return;
          }
          block.positionX = block.next.lastX;
          block.positionY = block.next.lastY;

          this.drawBlock(block);

          // This is the tail of the snake
          if (!block.prev) {
            break;
          }
          block = block.prev;
        }
      }

      // Extend the snake as food was eaten
      if (ateFood) {
        block = block || snakeHead;
        block.prevBlock = new Block(200, 200, this.snakeWidth, this.snakeHeight, block);
      }
    }
  }
};
