const judgeStatus = (snake, food) =>  {
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
export default judgeStatus;