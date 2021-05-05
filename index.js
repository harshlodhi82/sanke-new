const canvas =  document.getElementById("my_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';
const ctx = canvas.getContext("2d");
const snake = new Snake(ctx);
const food = new Food(ctx);
const increaseSpeed = 0.2;
let moveSpeed = 5;
let direction = 'right';

food.updatePos(canvas.width, canvas.height, moveSpeed)
keyboardSetDetection();
draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(tookFood()){
        snake.tailLength++;
        moveSpeed+=increaseSpeed;
        food.updatePos(canvas.width, canvas.height, moveSpeed);
    }

    noGameOver();

    snake.draw();
    food.draw();

    updatePosition();

    window.requestAnimationFrame(draw);
}


function tookFood() {
    return (snake.x < food.x + food.w &&
   snake.x + snake.w > food.x &&
   snake.y < food.y + food.h &&
   snake.y + snake.h > food.y)
}

function isGameOver() {
    return snake.x > canvas.width - snake.w - moveSpeed || snake.x < moveSpeed || snake.y > canvas.height - snake.h - moveSpeed || snake.y < moveSpeed;
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
