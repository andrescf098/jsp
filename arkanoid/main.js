const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 448;
canvas.height = 400;

// Global variables
let counter = 0;
const ballRadius = 4;
let x = canvas.width / 2; // ball x position
let y = canvas.height - 30; // ball y position
let dx = 2; // ball speed in x direction
let dy = -2; // ball speed in y direction
const paddleHeight = 10; // paddle height
const paddleWidth = 50; // paddle width
let paddleX = (canvas.width - paddleWidth) / 2; // paddle x position
let paddleY = canvas.height - paddleHeight - 10; // paddle y position
let rightPressed = false; // right key pressed
let leftPressed = false; // left key pressed
const PADDLE_SPEED = 7; // paddle speed
const briwckRowCount = 6; // number of rows of bricks
const brickColumnCount = 13; // number of columns of bricks
const brickWidth = 32; // brick width
const brickHeight = 16; // brick height
const brickPadding = 0; // padding between bricks
const brickOffsetTop = 80; // offset from top
const brickOffsetLeft = 16; // offset from left
const bricks = []; // array of bricks
const BRICKS_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < briwckRowCount; r++) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    const randomColor = Math.floor(Math.random() * 8);
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      status: BRICKS_STATUS.ACTIVE,
      color: randomColor,
    };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.drawImage(
    $sprite,
    29,
    174,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight,
  );
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < briwckRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICKS_STATUS.DESTROYED) continue;
      const isBallSameXAsBrick =
        x > currentBrick.x && x < currentBrick.x + brickWidth;
      const isBallSameYAsBrick =
        y > currentBrick.y && y < currentBrick.y + brickHeight;
      if (isBallSameXAsBrick && isBallSameYAsBrick) {
        dy = -dy;
        currentBrick.status = BRICKS_STATUS.DESTROYED;
        counter++;
        if (counter === brickColumnCount * briwckRowCount) {
          alert("YOU WIN, CONGRATULATIONS!");
          document.location.reload();
        }
      }
    }
  }
}
function ballMovement() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  const isBallSameXasPaddle = x > paddleX && x < paddleX + paddleWidth;
  const isBallTouchingPaddle =
    y + dy > paddleY && y + dy < paddleY + paddleHeight;

  if (isBallSameXasPaddle && isBallTouchingPaddle) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    document.location.reload();
  }
  x += dx;
  y += dy;
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < briwckRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICKS_STATUS.DESTROYED) {
        continue;
      }
      const clipX = currentBrick.color * 32;
      ctx.drawImage(
        $bricks,
        clipX,
        0,
        brickWidth,
        brickHeight,
        currentBrick.x,
        currentBrick.y,
        brickWidth,
        brickHeight,
      );
    }
  }
}
function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SPEED;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SPEED;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvent() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
      leftPressed = false;
    }
  }
}

function draw() {
  cleanCanvas();

  drawBall();
  drawPaddle();
  drawBricks();

  collisionDetection();
  ballMovement();
  paddleMovement();

  initEvent();
  window.requestAnimationFrame(draw);
}

draw();
