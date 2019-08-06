export default class Snake {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.body = [22, 21];
    this._directionCode = 2; // 1为上，2为下，3为左，4为右
    this.live = true;
    this._directionLock = false;
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