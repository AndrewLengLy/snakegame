import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 12;
const snakeBody = [{ x : 11, y : 11}];
let newSegments = 0;

export function update(){
    const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i>=0; i--){
    snakeBody[i + 1] = {...snakeBody[i] }
  }
   addSegments()
   snakeBody[0].x += inputDirection.y;
   snakeBody[0].y += inputDirection.x;
}
export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.x;
    snakeElement.style.gridColumnStart = segment.y;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  })
}
// the three functions below expand the snake 
export function expandSnake(amount){
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position) 
    })
}

function equalPositions(pos1, pos2) {
    return  pos1.x === pos2.x && pos1.y === pos2.y
    
}

//adds to the body of the snake
function addSegments(){
  for ( let i = 0; i < newSegments; i++){
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0;
}

export function getSnakeHead(){ 
    return snakeBody[0];
}

//if snake head has touched itself you lose
export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead : true})
}