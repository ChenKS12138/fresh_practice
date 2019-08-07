import Snake from './components/Snake.js';
import Food from './components/Food.js';
import Grid from './components/Grid.js';
import judgeStatus from './components/judgeStatus.js';
import 'jquery';
import Materialize from 'materialize-css/dist/js/materialize.js';


(function() {
  const myGrid = new Grid(document.querySelector("#cav"));
  const mySnake = new Snake(myGrid.canvasWidth);
  const myFood = new Food(myGrid.canvasWidth);
  let isPause = true;

  myGrid.render(mySnake.body, myFood.position);
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
          Materialize.toast({html:"HAHAHAHAHA 你输了!",displayLength:2500});
        }, 200);
        mySnake.live = false;
        return false;
      }
      if (statusCode === 3) {
        Materialize.toast({html:"太棒了鸭！",displayLength: 800});
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