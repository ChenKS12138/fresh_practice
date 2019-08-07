class Snake {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.body = [];
    this._directionCode = 2; // 1为上，2为下，3为左，4为右
    this.live = true;
    this._directionLock = false;
    this.body[0] = parseInt(Math.random()*Math.pow(canvasWidth,2));
    let i = 0 ;
    while(this.length<4){
      this.directionCode = [1,2,3,4][parseInt(Math.random()*4)];
      if(this.body.includes(this.nextHead)||(this.nextHead+1)%canvasWidth === 0||this.nextHead>Math.pow(canvasWidth,2)||this.nextHead<0) return;
      this.body.unshift(this.nextHead);
      this._directionLock = false;
      if(i++>10){
        this.body[0] = parseInt(Math.random()*Math.pow(canvasWidth,2));
        i=0;
      }
    }
  }
  get length(){
    return this.body.length;
  }
  get score() {
    return this.body.length - 2;
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
  /**
   * 这里加上什么能让小蛇吃到食物后长度增加呢...?
   */
  set nextTail(value) {
    this.body.push(value);
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
    this.canvasWidth = 20; // canvas 中一行的格子数  20吧
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
 * judgeStatus是个用于判断蛇当前状态的函数
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

(function() {
  const myGrid = new Grid(document.querySelector("#cav"));
  const mySnake = new Snake(myGrid.canvasWidth);
  const myFood = new Food(myGrid.canvasWidth);
  let isPause = true;

  myGrid.render(mySnake.body, myFood.position);
  /**
   * 这里加上点东西就能让重置按钮生效啦，尝试一下吧~~~
   */
  document
    .querySelector("#reset-button")
    .addEventListener("click", () => (window.location.reload()));
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
    if(mySnake.live){
      document.querySelector("#sp-text").innerText = isPause ? "PAUSE" : "CONTINUE";
      isPause = !isPause;
    }
  });

  /*  请在这里添加对键盘 WASD, ↑ ↓ ← → 按键的监听哦~~~  */

  document.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 38:case 87:
        mySnake.directionCode = 1;
        e.returnValue = false;
        break;
      case 40:case 83:
        mySnake.directionCode = 2;
        e.returnValue = false;
        break;
      case 37:case 65:
        mySnake.directionCode = 3;
        e.returnValue = false;
        break;
      case 39:case 68:
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
        document.querySelector("#cav-container").classList.add("shake","faster");
        setTimeout(() => {
          Materialize.toast("HAHAHAHAHA 你输了!", 2500);
        }, 200);
        mySnake.live = false;
        return false;
      }
      /**
       * 这里可是是显示分数和产生小蛇食物的关键所在鸭，在下面补充上你的答案吧~~~
       */
      if (statusCode === 3) {
        Materialize.toast("太棒了鸭！", 800);
        const oldTail = mySnake.currentTail;
        myFood.create();
        mySnake.move();
        mySnake.nextTail = oldTail;
        document.querySelector("#score-number").innerText = mySnake.score;
      } else {
        mySnake.move();
      }
      myGrid.render(mySnake.body, myFood.position);
    }
  }, 200);
})();