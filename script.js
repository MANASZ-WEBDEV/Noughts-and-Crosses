let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let currentTurnDisplay = document.querySelector('#current-turn');
let xScoreDisplay = document.querySelector('#x-score');
let oScoreDisplay = document.querySelector('#o-score');
let drawScoreDisplay = document.querySelector('#draw-score');

let turnO = true;
let moveCount = 0;
let gameActive = true;
let scores = {
  x: 0,
  o: 0,
  draws: 0
};

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const updateTurnDisplay = () => {
  currentTurnDisplay.innerText = turnO ? 'O' : 'X'
  currentTurnDisplay.className = turnO
    ? 'info-value o-color'
    : 'info-value x-color'
};

const updateScoreDisplay = () => {
  xScoreDisplay.innerText = scores.x
  oScoreDisplay.innerText = scores.o
  drawScoreDisplay.innerText = scores.draws
};

const resetGame = () => {
  turnO = true
  moveCount = 0
  gameActive = true
  enableBoxes()
  msgContainer.classList.add('hide')
  updateTurnDisplay()
  boxes.forEach(box => {
    box.classList.remove('winning')
  });
};

const disableBoxes = () => {
  gameActive = false
  boxes.forEach(box => (box.disabled = true))
};

const enableBoxes = () => {
  gameActive = true
  boxes.forEach(box => {
    box.disabled = false
    box.innerText = ''
    box.classList.remove('x', 'o', 'winning')
  });
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Player ${winner} Wins!`
  msg.className = winner === 'X' ? 'winner-x' : 'winner-o'

  if (pattern) {
    pattern.forEach(index => {
      boxes[index].classList.add('winning')
    });
  }

  scores[winner.toLowerCase()]++;
  updateScoreDisplay();

  setTimeout(() => {
    msgContainer.classList.remove('hide')
  }, 500);

  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "🤝 It's a Draw!";
  msg.className = 'draw';
  scores.draws++;
  updateScoreDisplay();

  setTimeout(() => {
    msgContainer.classList.remove('hide')
  }, 300);

  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== '' && pos2 !== '' && pos3 !== '') {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1, pattern)
        return true
      }
    };
  };

  if (moveCount === 9) {
    showDraw()
    return true
  };

  return false
};

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (!gameActive || box.innerText !== '') return;

    const currentPlayer = turnO ? 'O' : 'X';
    box.innerText = currentPlayer;
    box.classList.add(currentPlayer.toLowerCase());

    turnO = !turnO;
    moveCount++;

    if (!checkWinner()) {
      updateTurnDisplay();
    }
  });
});

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

updateTurnDisplay();