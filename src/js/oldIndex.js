function draw(point,color){
  // point 取值0-624
  //  每行有25个格子
  // 0-24 为第一行,以此类推
  box.fillStyle=color;
  box.fillRect((point%cellNum)*(size/cellNum)+1,(~~(point/cellNum))*(size/cellNum)+edgeSize,(size/cellNum)-2*edgeSize,(size/cellNum)-2*edgeSize);
}

function randomElement(arr){
  return arr[~~(Math.random()*10%arr.length)];
}


function Snake() {
  let body= new Array();//第一个元素为蛇的头
  let direction=1;// 1为向右，-1为向左，cellNum为向下，-cellNum为向上
  let live=true;
  let length=3;
  let direcList=[1,-1,cellNum,-cellNum];

  (function initialPosition(lastOne,lastDir){
      let temp;
      // let direc=direcList[~~(Math.random()*10%4)];
      let direc=randomElement(direcList);
      if(!lastOne){
          temp=~~(Math.random()*1000%(cellNum*cellNum-2));
      }
      else{
          while(direc===-lastDir){
              direc=randomElement(direcList);
          }
          temp=lastOne+direc;
      }
      if(body.length<length){
          if(!inDangerZone(temp)){
              body.unshift(temp);
              initialPosition(temp,direc);
          }
          else{
              initialPosition(lastOne,lastDir);
          }
      }
      else{
          direction=lastDir;
      }
  })()

  function move(){
      let body=this.body;
      let direction=this.direction;
      let point=body[0];
      this.pop=body.pop();
      body.unshift(point+direction);
      this.point=body[0];
      return this.pop;
  }
  function inDangerZone(target,direction){
      let point=target;
      let resc=0;
      if(point>-1&&point<cellNum){
          resc=-cellNum;
      }
      else if(point>(cellNum*cellNum-1-cellNum)&&point<cellNum*cellNum){
          resc=cellNum;
      }
      else if(point%cellNum===0){
          resc=-1;
      }
      else if((point+1)%cellNum===0){
          resc=1;
      }
      if(!direction){
          return resc; 
      }
      else{
          if(direction===resc){
              return 1;
          }
          else{
              if((point===0||point===cellNum*cellNum-cellNum)&&direction==-1){
                  return 1;
              }
              else if((point===cellNum-1||point===cellNum*cellNum-1)&&direction===1){
                  return 1;
              }
              else{
                  return 0;
              }
          }
      }
  }
  function crash(target){
      let body=this.body;
      let point=body[0];
      let direction=this.direction;
      if(inDangerZone(body[0],direction)){
          return 2;
      }
      if(body.lastIndexOf(point)!==0){
          return 1; 
      }
      else{
          if(target){
              if(target.indexOf(point)!==-1){
                  return 3;
              }
          }
          else{
              return 0;
          }
      }
  }
  function getFood(position){
      let body=this.body;
      let pop=this.pop;
      let point=body[0];
      if(position===point){
          body.push(pop);
          return 1;
      }
      else{
          return 0;
      }
  }

  return {
      body:body,
      direction:direction,
      move:move,
      crash:crash,
      getFood:getFood,
      length:length,
      live:live,
  }
}


function Food(){
  let foodExist;
  let position;
  function createFood(snakeBody,foodColor){
      foodExist=this.foodExist;
      let randPosition=(~~(Math.random()*1000)%(cellNum*cellNum-2));
      while(snakeBody.indexOf(randPosition)!==-1){
          randPosition=(~~(Math.random()*1000)%(cellNum*cellNum-2));
      }
      this.position=randPosition;
      draw(this.position,foodColor);
  }
  return{
      foodExist:foodExist,
      createFood:createFood,
      position:position,
  }
}



function Controller(configObject,isInitialize){
  const snackColor=configObject.snackColor;
  const foodColor=configObject.foodColor;
  
  let snake=new Snake();
  let food=new Food();
  let competitorController;
  let work=true;
  let score=0;
  let pop;
  let t;
  let speed=200;
  function pause(changeContent){
      if(snake.live){
          work=!work;
          if(!changeContent){
              spText.innerText=spTextContent[~~work];
          }
      }
  }
  function direction(direc){
      if(work){
          switch(direc){
              case 'up': 
                  if(snake.direction!==cellNum){
                      snake.direction=-cellNum;
                  };
                  break;
              case 'down':
                  if(snake.direction!==-cellNum){
                      snake.direction=cellNum;
                  }
                  break;
              case 'left':
                  if(snake.direction!==1){
                      snake.direction=-1;
                  }
                  break;
              case 'right':
                  if(snake.direction!==-1){
                      snake.direction=1;
                  }
                  break;
          }
      }
  }
  function Speed(value){
      if(value){
          speed=value;
      }
      return speed;
  }
  function Render(){
      draw(pop,backGroundColor);
      snake.body.map(function(value,index){
          draw(value,snackColor);
      });
  }
  function action(){
      if(work){
          if(0){
              clearTimeout(t);
              work=!work;
              snake.live=false;
              setTimeout(function(){
                  Materialize.toast('HAHAHAHAHA 你输了!', 2500,'',function(){
                      Materialize.toast('点击RESET或R以重新开始',300000);
                  });
              },200);
          }
          else{
              Render();
              pop=snake.move();
          }
          if(!food.foodExist){
              food.createFood(snake.body,foodColor);
              food.foodExist=true;
          }
          if(snake.getFood(food.position)){
              score++;
              speed=Speed(speed*0.97);
              food.foodExist=false;
              scoreText.innerText=scoreRowText+String(score);
              let toastList=['得分啦!','加油鸭!','太棒啦!'];
              Materialize.toast(randomElement(toastList), 1000);
          }
      }
      Render();
      t=setTimeout(action,Speed());        
  }
  function initialize(){
      food.foodExist=false;
      scoreText.innerText=scoreRowText+String(score);
      t=setTimeout(action,Speed());
      pause(true);
  }
  if(isInitialize){
      initialize();
  }
  function setCompetitorController(target){
      competitorController=target;
  }
  return{
      initialize:initialize,
      pause:pause,
      direction:direction,
      Speed:Speed,
      score:score,
      body:snake.body,
      foodPosition:food.position,
      setCompetitorController:setCompetitorController,
  }
}




const cav=document.querySelector('#cav');
const up=document.querySelector('#up');
const right=document.querySelector('#right');
const down=document.querySelector('#down');
const left=document.querySelector('#left');
const spButton=document.querySelector('#sp-button');
const spText=document.querySelector('#sp-text');
const spTextContent=['CONTINUE','STOP'];
const resetButton=document.querySelector('#reset-button');
const resetText=document.querySelector('#reset-text');
const scoreText=document.querySelector('#score');
const box=cav.getContext('2d');
const scoreRowText="SCORE:";
const backGroundColor="Snow";
const canvasBackGroundColor="snow";

let size=480;//canvas的宽度和长度
let cellNum=20;//canvas 中一行的格子数
let edgeSize=-0.0001;//格子间的缝的大小

(function (){
    (function init(){
        let width = window.innerWidth;
        if (width < 600) {
            size = 300;
            cellNum = 20;
        }
        else{
            size = 480;
            cellNum=20;
        }

        cav.width = size;
        cav.height = size;

        spText.innerText = 'START';
        resetText.innerText = 'RESET';
        window.onresize=init;
    })();
    (function ready(){
        cav.style.backgroundColor=canvasBackGroundColor;
        for(let i=0;i<cellNum*cellNum;i++){
            draw(i,backGroundColor);
        }
    })();
}
)();



let controller=new Controller({
  snackColor:"#008B00",
  foodColor:"#FFD700",
});

(function main(){
  controller.initialize();
  document.addEventListener('keydown',function(e){
      switch(e.keyCode){
          case 38:
          case 87:
              controller.direction('up');
              e.returnValue=false;
          case 40:
          case 83:
              controller.direction('down');
              e.returnValue=false;
              break;
          case 37:
          case 65:
              controller.direction('left');
              e.returnValue=false;
              break;
          case 39:
          case 68: 
              controller.direction('right');
              e.returnValue=false;
              break;
          case 80:
          case 32:
          case 13:
              spButton.click();
              e.returnValue=false;
              break;
          case 82:
              resetButton.click();
              e.returnValue=false;
      }
  });
  
  up.addEventListener('click',function(){
      controller.direction('up');
  });
  right.addEventListener('click',function(){
      controller.direction('right');
  });
  down.addEventListener('click',function(){
      controller.direction('down');
  });
  left.addEventListener('click',function(){
      controller.direction('left');
  });

  spButton.addEventListener('click',function(){
      controller.pause();
  })
  resetButton.addEventListener('click',function(){
      window.location.reload();
  })
})();

(function dev(){
  let li=document.querySelectorAll('li');
  li.forEach(function(value,index){
      if(index!==0){
          value.addEventListener('click',function(){
              alert('开发中!\n敬请期待');
          })
      }
  })
})();
