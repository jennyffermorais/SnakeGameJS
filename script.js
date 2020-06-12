let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

//desenhando a área do jogo
function criarBG() {
  context.fillStyle = "lightpink";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

//definindo a cor e o tamanho da cobrinha
function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "darkmagenta";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//definindo cor e tamanho da comida
function drawFood() {
  context.fillStyle = "magenta";
  context.fillRect(food.x, food.y, box, box);
}

//dando direções com as setas do teclado
document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

//quando atravessar a parede, ela surge do outro lado
function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  //se a posição da cabeça se chocar com a posição do corpo, encerra o jogo
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("GAME OVER 😭");
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  //definindo o ponto de partida
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //definindo o que acontece em cada direção
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  //somente vai adicionar 1 ao corpo, de a cobrinha passar pela comida
  //quando passa pela comida, ela vai para outra posição aleatória
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //acrescenta 1 ao primeiro elemento
  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
