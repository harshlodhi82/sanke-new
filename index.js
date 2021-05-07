const canvas =  document.getElementById("my_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';
const ctx = canvas.getContext("2d");
const snake = new Snake(ctx);
const food = new Food(ctx);
const increaseSpeed = 0.05;
const maxSpeed = 20;
let moveSpeed = 6;
let direction = 'right';
let score = 0;

food.updatePos(canvas.width, canvas.height, moveSpeed)
keyboardSetDetection();
draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(tookFood()){
        score++;
        snake.tailLength++;
        if(moveSpeed <= maxSpeed) moveSpeed+=increaseSpeed;
        food.updatePos(canvas.width, canvas.height, moveSpeed);
    }
    
    addText();
    noGameOver();
    snake.draw();
    food.draw();
    updatePosition();

    window.requestAnimationFrame(draw);
}

function addText(){
    ctx.fillStyle = "grey";
    ctx.font = "50px Arial";
    ctx.textAlign = 'center'
    ctx.fillText("<H4R5/>", canvas.width/2, canvas.height/2);
    ctx.font = "30px Arial";
    ctx.fillText(`Score : ${score}`, canvas.width/2, canvas.height/2+ 50);
}

function tookFood() {
    return (snake.x < food.x + food.w &&
   snake.x + snake.w > food.x &&
   snake.y < food.y + food.h &&
   snake.y + snake.h > food.y)
}

function noGameOver(){
    if(snake.x > canvas.width){
        snake.x = -snake.w;
    }else if(snake.x < - snake.w){
        snake.x = canvas.width;
    }else if(snake.y > canvas.height){
        snake.y = -snake.h;
    }else if(snake.y < - snake.h){
        snake.y = canvas.height;
    }
}

function keyboardSetDetection() {
    document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 40://down
                if (direction !== 'up') direction = "down";
                break;
            case 38://up
                if (direction !== 'down') direction = "up";
                break;
            case 39://right
                if (direction !== 'left') direction = "right";
                break;
            case 37://left
                if (direction !== 'right') direction = "left";
                break;
        }
    });
}

function updatePosition() {
    tailHandler();
    switch (direction) {
        case "down"://down
            snake.y += moveSpeed;
            break;
        case "up"://up
            snake.y -= moveSpeed;
            break;
        case "right"://right
            snake.x += moveSpeed;
            break;
        case "left"://left
            snake.x -= moveSpeed;
            break;
    }
}

function tailHandler(){
    snake.tails.unshift({ x:snake.x, y:snake.y });
    snake.tails = snake.tails.slice(0, snake.tailLength);
}
