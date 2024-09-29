// Initialize variables
let player;
let defenders = [];
let gameInterval;
let isGameActive = false;

const playerPosition = { top: 350, left: 280 };
const gollaPosition = { top: 10, left: 270 };
const defenderPositions = [
  { top: 100, left: 100 },
  { top: 200, left: 400 },
  { top: 150, left: 250 },
  
];
const playerSpeed = 10;
const defenderSpeed = 20;

const statusDisplay = document.getElementById('status');

// Start game event
document.getElementById('start-btn').addEventListener('click', startGame);

// Handle player movement
document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
  if (!isGameActive) return;

  if (event.key === 'ArrowUp' && playerPosition.top > 0) {
    playerPosition.top -= playerSpeed;
  } else if (event.key === 'ArrowDown' && playerPosition.top < 360) {
    playerPosition.top += playerSpeed;
  } else if (event.key === 'ArrowLeft' && playerPosition.left > 0) {
    playerPosition.left -= playerSpeed;
  } else if (event.key === 'ArrowRight' && playerPosition.left < 560) {
    playerPosition.left += playerSpeed;
  }
  updatePlayerPosition();
  checkWin();
}

function updatePlayerPosition() {
  player.style.top = `${playerPosition.top}px`;
  player.style.left = `${playerPosition.left}px`;
}

function moveDefenders() {
  defenderPositions.forEach((defender, index) => {
    const randomDirection = Math.floor(Math.random() * 4);

    if (randomDirection === 0 && defender.top > 0) {
      defender.top -= defenderSpeed; // Move up
    } else if (randomDirection === 1 && defender.top < 360) {
      defender.top += defenderSpeed; // Move down
    } else if (randomDirection === 2 && defender.left > 0) {
      defender.left -= defenderSpeed; // Move left
    } else if (randomDirection === 3 && defender.left < 560) {
      defender.left += defenderSpeed; // Move right
    }

    document.getElementById(`defender${index + 1}`).style.top = `${defender.top}px`;
    document.getElementById(`defender${index + 1}`).style.left = `${defender.left}px`;
  });
}

function startDefenderMovement() {
  setInterval(moveDefenders, 500);
}

function detectCollision() {
  defenderPositions.forEach((defender) => {
    if (!(playerPosition.left > defender.left + 40 ||
          playerPosition.left + 40 < defender.left ||
          playerPosition.top > defender.top + 40 ||
          playerPosition.top + 40 < defender.top)) {
      endGame(false);
    }
  });
}

function checkWin() {
  if (playerPosition.top <= gollaPosition.top + 60 &&
      playerPosition.left >= gollaPosition.left &&
      playerPosition.left <= gollaPosition.left + 60) {
    endGame(true);
  }
}

function startGame() {
  player = document.getElementById('player');
  isGameActive = true;
  statusDisplay.textContent = 'Avoid the defenders and reach the Golla!';
  gameInterval = setInterval(() => {
    moveDefenders();
    detectCollision();
  }, 100);
}

function endGame(won) {
  clearInterval(gameInterval);
  isGameActive = false;
  if (won) {
    statusDisplay.textContent = 'You Win! You reached the Golla!';
    alert("You Won");
    window.location.href = './';
    
  } else {
    statusDisplay.textContent = 'Game Over! You were caught!';
    window.location.href = './';
    alert("You Fail");
  }
}
