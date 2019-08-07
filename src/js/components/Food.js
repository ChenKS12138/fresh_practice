export default class Food {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.position = 13;
    this.create();
  }
  create() {
    this.position = parseInt(
      (Math.random() * 1000) % Math.pow(this.canvasWidth, 2)
    );
  }
}