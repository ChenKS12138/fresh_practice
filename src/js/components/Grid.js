export default class Grid {
  constructor(canvasDomElement) {
    this.canvasWidth = 20; // canvas 中一行的格子数
    this.canvasBackgroundColor = "snow";
    this.snakeColor = "#008B00";
    this.foodColor = "#FFD700";
    this.canvasContext = canvasDomElement.getContext("2d");
    this.pixel = new Array(Math.pow(this.canvasWidth, 2));
    cav.width = 480;
    cav.height = 480;
    cav.style.backgroundColor = "snow";
  }
  draw(pixelPosition, pixelColor) {
    this.canvasContext.fillStyle = pixelColor;
    this.canvasContext.fillRect((pixelPosition % this.canvasWidth) * (480 / this.canvasWidth) + 1,~~(pixelPosition / this.canvasWidth) * (480 / this.canvasWidth) + -0.0001,480 / this.canvasWidth - 2 * -0.0001,480 / this.canvasWidth - 2 * -0.0001);
  }
  render(snakeBody, foodPosition) {
    this.pixel.fill(this.canvasBackgroundColor);
    this.pixel[foodPosition] = this.foodColor;
    snakeBody.forEach(bodyItem => (this.pixel[bodyItem] = this.snakeColor));
    this.pixel.forEach((color, index) => this.draw(index, color));
  }
}
