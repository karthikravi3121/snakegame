// script.js
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score-value');

const snake = [{x: 10, y: 10}];
let dx = 0;
let dy = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
let intervalId;
let intervalTime = 200; // Initial interval time in milliseconds
let speedIncreaseRate = 0.95; // Rate at which speed increases
let isPaused = false;

document.addEventListener('keydown', changeDirection);

function startGame() {
    intervalId = setInterval(moveSnake, intervalTime);
}

function moveSnake() {
    if (isPaused) return; // Exit function if game is paused

    const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Check if the snake hits the walls
    if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 30) {
        gameOver();
        return;
    }

    // Check if the snake eats the apple
    if (newHead.x === appleX && newHead.y === appleY) {
        score++;
        scoreDisplay.textContent = score;
        generateApple();
        increaseSpeed();
    } else {
        // Check if the new head position overlaps with any part of the snake's body
        for (let i = 1; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                // Reduce the size of the snake and the score by half
                const newSize = Math.ceil(snake.length / 2);
                snake.splice(newSize);
                score = Math.ceil(score / 2);
                scoreDisplay.textContent = score;
                break;
            }
        }
        snake.pop(); // Remove the tail
    }
    
    snake.unshift(newHead); // Add new head

    render();
}

function render() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.classList.add('snake');
        snakeSegment.style.left = segment.x * 20 + 'px';
        snakeSegment.style.top = segment.y * 20 + 'px';
        gameBoard.appendChild(snakeSegment);
    });

    const apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.left = appleX * 20 + 'px';
    apple.style.top = appleY * 20 + 'px';
    gameBoard.appendChild(apple);
}

function generateApple() {
    appleX = Math.floor(Math.random() * 30);
    appleY = Math.floor(Math.random() * 30);
}

function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === ' ') {
        isPaused = !isPaused; // Toggle pause state
        if (isPaused) {
            clearInterval(intervalId); // Pause game
        } else {
            startGame(); // Resume game
        }
        return;
    }

    if (!isPaused) { // Only change direction if game is not paused
        if (keyPressed === 'ArrowUp' || keyPressed === 'w' || keyPressed === 'W' && dy !== 1) {
            dx = 0;
            dy = -1;
        }
        if (keyPressed === 'ArrowDown' || keyPressed === 's' || keyPressed === 'S' && dy !== -1) {
            dx = 0;
            dy = 1;
        }
        if (keyPressed === 'ArrowLeft' || keyPressed === 'a' || keyPressed === 'A' && dx !== 1) {
            dx = -1;
            dy = 0;
        }
        if (keyPressed === 'ArrowRight' || keyPressed === 'd' || keyPressed === 'D' && dx !== -1) {
            dx = 1;
            dy = 0;
        }
    }
}

function gameOver() {
    clearInterval(intervalId);
    alert('Game Over! Your score: ' + score);
    resetGame();
}

function resetGame() {
    snake.length = 1;
    snake[0] = {x: 10, y: 10};
    dx = 0;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    generateApple();
    intervalTime = 200; // Reset interval time
    isPaused = false; // Reset pause state
    startGame();
}

function increaseSpeed() {
    intervalTime *= speedIncreaseRate;
    clearInterval(intervalId);
    startGame();
}

startGame();
function moveSnake() {
    if (isPaused) return; // Exit function if game is paused

    let newHeadX = snake[0].x + dx;
    let newHeadY = snake[0].y + dy;

    // Wrap the snake around if it reaches the borders
    if (newHeadX < 0) {
        newHeadX = 29; // Move to the right side
    } else if (newHeadX >= 30) {
        newHeadX = 0; // Move to the left side
    }

    if (newHeadY < 0) {
        newHeadY = 29; // Move to the bottom side
    } else if (newHeadY >= 30) {
        newHeadY = 0; // Move to the top side
    }

    const newHead = {x: newHeadX, y: newHeadY};

    // Check if the new head position overlaps with any part of the snake's body
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            // Reduce the size of the snake and the score by half
            const newSize = Math.ceil(snake.length / 2);
            snake.splice(newSize);
            score = Math.ceil(score / 2);
            scoreDisplay.textContent = score;
            break;
        }
    }

    // Check if the snake eats the apple
    if (newHead.x === appleX && newHead.y === appleY) {
        score++;
        scoreDisplay.textContent = score;
        generateApple();
        increaseSpeed();
    } else {
        snake.pop(); // Remove the tail
    }

    snake.unshift(newHead); // Add new head

    render();
}
