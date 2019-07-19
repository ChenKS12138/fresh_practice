/**
 * 这个文件主要由 Snake类，Food类，Grid类,一个judgeStatus函数以及若干代码组成
 * 学习类的概念对编程很有帮助鸭~
 * 我们操作的对象其实是一个20X20的网格
 */
import Food from './components/Food.js';
import Snake from './components/Snake.js';
import Grid from './components/Grid.js';

/**
 * judgeStatus是个用于判断蛇当前状态的函数，这个函数不需要变更
 * 返回1表示吃到自己了，返回2表示撞到墙了，返回3表示吃到果实,返回0表示什么都没发生
 */
function judgeStatus(snake, food) {
  const canvasWidth = snake.canvasWidth;
  if (snake.body.includes(snake.nextHead)) return 1;
  if (snake.currentHead < canvasWidth && snake.directionCode === 1) return 2;
  if (snake.currentHead < Math.pow(canvasWidth, 2) && snake.currentHead > canvasWidth * (canvasWidth - 1) && snake.directionCode === 2)
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
document.querySelector("#up").addEventListener("click", () => mySnake.directionCode = 1);
document.querySelector("#down").addEventListener("click", () => mySnake.directionCode = 2);
document.querySelector("#left").addEventListener("click", () => mySnake.directionCode = 3);
document.querySelector("#right").addEventListener("click", () => mySnake.directionCode = 4);
document.querySelector("#sp-button").addEventListener("click", () => {
  if(mySnake.live){
    document.querySelector("#sp-text").innerText = isPause ? "PAUSE" : "CONTINUE";
    isPause = !isPause;
  }
});
document.addEventListener('keydown',function(e){
  switch(e.keyCode){
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
      document.querySelector("#cav-container").classList.add("shake","faster");
      setTimeout(() => {
        Materialize.toast("HAHAHAHAHA 你输了!", 2500);
      }, 200);
      mySnake.live = false;
      return false;
    }
    if(statusCode===3){
      /**
       * 这里可是是显示分数和产生小蛇食物的关键所在鸭，在下面补充上你的答案吧~~~
       */
      setTimeout(() => {
        Materialize.toast("好奇怪鸭~怎么吃不到", 2500);
      }, 200);
    }
    mySnake.move();
    myGrid.render(mySnake.body, myFood.position);
  }
}, 200);