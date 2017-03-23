export default class Block {
  constructor(x, y, height, width, next=null, prev=null) {
    this.x = x;
    this.y = y;
    this.next = next;
    this.prev = prev;
    this.height = height;
    this.width = width;
    this.lastX = 0;
    this.lastY = 0;
  }

  set positionX(newX) {
    this.lastX = this.x;
    this.x = newX;
  }

  set positionY(newY) {
    this.lastY = this.y;
    this.y = newY;
  }

  set nextBlock(next) {
    this.next = next;
  }

  set prevBlock(prev) {
    this.prev = prev;
  }
}
