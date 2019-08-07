export default class Snake {
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
  get length() {
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
  set nextTail(value) {
    this.body.push(value);
  }
  move() {
    this.body.pop();
    this.body.unshift(this.nextHead);
    this._directionLock = false;
  }
}