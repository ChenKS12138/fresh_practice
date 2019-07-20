/**
 * 这个文件主要由 Snake类，Food类，Grid类,一个judgeStatus函数以及若干代码组成
 * 学习类的概念对编程很有帮助鸭~
 * 我们操作的对象其实是一个20X20的网格
 */
class Snake {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.body = [23, 22, 21]; // 我们是用
    this._directionCode = 2; // 约定1为上，2为下，3为左，4为右
    this.live = true;
    this._directionLock = false;
  }
  /**
   * 为啥有的函数是用get和set开头呢?这是个很有意思的东西,它们是存值函数和取值函数
   * 好好使用它们可以使代码更优雅
   */
  get score() {
    return this.body.length - 3;
  }
  get nextHead() {
    switch (this._directionCode) {
      case 1:
        return -this.canvasWidth + this.currentHead;
      case 2:
        return this.canvasWidth + this.currentHead;
      case 3:
        return -1 + this.currentHead;
      case 4:
        return 1 + this.currentHead;
      default:
        return this.currentHead;
    }
  }
  get currentHead() {
    return this.body[0];
  }
  get currentTail() {
    return this.body[this.body.length - 1];
  }
  get directionCode() {
    return this._directionCode;
  }
  set directionCode(value) {
    const codeSum = value + this._directionCode;
    if (codeSum !== 3 && codeSum !== 7 && !this._directionLock) {
      this._directionCode = value;
      this._directionLock = true;
    }
  }

  set nextTail(value) {
    /**
     * 这里加上什么能让小蛇吃到食物后长度增加呢...?
     */
  }
  move() {
    this.body.pop();
    this.body.unshift(this.nextHead);
    this._directionLock = false;
  }
}

class Food {
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

class Grid {
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
    this.canvasContext.fillRect(
      (pixelPosition % this.canvasWidth) * (480 / this.canvasWidth) + 1,
      ~~(pixelPosition / this.canvasWidth) * (480 / this.canvasWidth) + -0.0001,
      480 / this.canvasWidth - 2 * -0.0001,
      480 / this.canvasWidth - 2 * -0.0001
    );
  }
  render(snakeBody, foodPosition) {
    this.pixel.fill(this.canvasBackgroundColor);
    this.pixel[foodPosition] = this.foodColor;
    snakeBody.forEach(bodyItem => (this.pixel[bodyItem] = this.snakeColor));
    this.pixel.forEach((color, index) => this.draw(index, color));
  }
}

/**
 * judgeStatus是个用于判断蛇当前状态的函数，这个函数不需要变更
 * 返回1表示吃到自己了，返回2表示撞到墙了，返回3表示吃到果实,返回0表示什么都没发生
 */
function judgeStatus(snake, food) {
  const canvasWidth = snake.canvasWidth;
  if (snake.body.includes(snake.nextHead)) return 1;
  if (snake.currentHead < canvasWidth && snake.directionCode === 1) return 2;
  if (
    snake.currentHead < Math.pow(canvasWidth, 2) &&
    snake.currentHead > canvasWidth * (canvasWidth - 1) &&
    snake.directionCode === 2
  )
    return 2;
  if (snake.currentHead % canvasWidth === 0 && snake.directionCode === 3)
    return 2;
  if ((snake.currentHead + 1) % canvasWidth === 0 && snake.directionCode === 4)
    return 2;
  if (snake.nextHead === food.position) return 3;
  return 0;
}

const myGrid = new Grid(document.querySelector("#cav"));
const mySnake = new Snake(myGrid.canvasWidth);
const myFood = new Food(myGrid.canvasWidth);
let isPause = true;

myGrid.render(mySnake.body, myFood.position);
/**
 * 这里加上点东西就能让重置按钮生效啦，尝试一下吧~~~
 */
document
  .querySelector("#up")
  .addEventListener("click", () => (mySnake.directionCode = 1));
document
  .querySelector("#down")
  .addEventListener("click", () => (mySnake.directionCode = 2));
document
  .querySelector("#left")
  .addEventListener("click", () => (mySnake.directionCode = 3));
document
  .querySelector("#right")
  .addEventListener("click", () => (mySnake.directionCode = 4));
document.querySelector("#sp-button").addEventListener("click", () => {
  if (mySnake.live) {
    document.querySelector("#sp-text").innerText = isPause
      ? "PAUSE"
      : "CONTINUE";
    isPause = !isPause;
  }
});

/**
 * 这里对↑ ↓ ← → 的监听已经写好啦，
 * 再添加上对W A S D 的监听吧！
 */
document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 38:
      mySnake.directionCode = 1;
      e.returnValue = false;
      break;
    case 40:
      mySnake.directionCode = 2;
      e.returnValue = false;
      break;
    case 37:
      mySnake.directionCode = 3;
      e.returnValue = false;
      break;
    case 39:
      mySnake.directionCode = 4;
      e.returnValue = false;
      break;
  }
});

setInterval(() => {
  if (!isPause && mySnake.live) {
    const statusCode = judgeStatus(mySnake, myFood);
    if (statusCode === 1 || statusCode === 2) {
      document.querySelector("#cav-container").classList.remove("jackInTheBox");
      document.querySelector("#cav-container").classList.add("shake", "faster");
      setTimeout(() => {
        Materialize.toast("HAHAHAHAHA 你输了!", 2500);
      }, 200);
      mySnake.live = false;
      return false;
    }
    if (statusCode === 3) {
      /**
       * 这里可是是显示分数和产生小蛇食物的关键所在鸭，
       * 也可以让小蛇从视觉上长度增加哦
       * 在下面补充上你的答案吧~~~
       */
      setTimeout(() => {
        Materialize.toast("好奇怪鸭~怎么吃不到", 2500);
      }, 200);
    }
    mySnake.move();
    myGrid.render(mySnake.body, myFood.position);
  }
}, 200);
