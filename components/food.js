export default class Food {
  constructor(x, y, centerDx, r=5) {
    this.x = x + centerDx;
    this.y = y + centerDx;
    this.centerDx = centerDx; // used to center pellet in square
    this.r = r;
  }

  set positionX(newX) {
    this.x = newX + this.centerDx;
  }

  set positionY(newY) {
    this.y = newY + this.centerDx;
  }
}
