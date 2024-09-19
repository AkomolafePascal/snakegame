const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 160, y: 160 }];
let direction = { x: 0, y: 0 };
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;

function gameLoop() {
    update();
    draw();
}

function update() {
    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop(); // Remove the last piece if not eating
    }

    // Check collision with walls or itself
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision(head)) {
        resetGame();
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the snake
    ctx.fillStyle = "green";
    snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function getRandomPosition() {
    return Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = { x: getRandomPosition(), y: getRandomPosition() };
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

// Run the game
setInterval(gameLoop, 100);
