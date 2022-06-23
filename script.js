"use strict"

const board_border = '#FFFFFF'
const board_background = '#DABE09'
const snake_col = '#FFFFFF'
const snake_border = 'black'

let snake = []
let currentLength = 0

let foodX = 100
let foodY = 100

let score = 0

let head = {x:200, y:200, dx:0, dy:-10}
const canvas = document.getElementById("snakeboard")
const snakeboard_ctx = canvas.getContext("2d")
setInterval(cycle, 100)

function cycle() {
    snake.push({x:head.x,y:head.y})
    head.x+=head.dx
    head.y+=head.dy
    clearScreen()
    checkFoodEaten()
    drawFood()
    drawSnake()
    checkCollision()
    if(head.x>canvas.width){
        dead()
        currentLength = 0
    }
    if(head.y>canvas.height){
        dead()
        currentLength = 0
    }
    if(head.x<-10){
        dead()
        currentLength = 0
    }
    if(head.y<-10){
        dead()
        currentLength = 0
    }
    
    if(snake.length>currentLength)
    snake.shift()
}

function dead(){
    alert("Game Over")
    head.x = 200
    head.y = 200
    snake = []
    score = 0
    showScore()
}

function clearScreen() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, canvas.width, canvas.height)
    snakeboard_ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function drawSnake()
{
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) 
{
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10)
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}

function drawFood(){
    snakeboard_ctx.fillStyle = "green"
    snakeboard_ctx.fillRect(foodX, foodY, 10, 10)
}

function checkFoodEaten(){
    if(foodX === head.x && foodY === head.y){
        foodX = Math.floor(Math.random() * canvas.width/10) * 10
        foodY = Math.floor(Math.random() * canvas.height/10) * 10
        currentLength++;
        score+= 1
        showScore()
    }
}

function showScore(){
    document.getElementById("gameScore").innerHTML = score;
}

function checkCollision(){
    for(let i = 0; i < snake.length; i++) {
        let snakeBody = snake[i]
    if(snakeBody.x === head.x && snakeBody.y === head.y){
        dead()
        currentLength = 0
        break;
    }
}
}

document.body.addEventListener('keydown', changeDirection)

function changeDirection(event){

    //up arrow key
    if(event.keyCode == 38){
        if(head.dy == 10)
            return;
        head.dy = -10
        head.dx = 0
    }

    //down arrow key
    if(event.keyCode == 40){
        if(head.dy == -10)
            return;
        head.dy = 10
        head.dx = 0
    }

    //left arrow key
    if(event.keyCode == 37){
        if(head.dx == 10)
        return;
        head.dy = 0
        head.dx = -10
    }

    //right arrow key
    if(event.keyCode == 39){
        if(head.dx == -10)
        return;
        head.dy = 0
        head.dx = 10
    }
}