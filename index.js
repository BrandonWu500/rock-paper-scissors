const OPTIONS = [
  {
    name: 'rock',
    emoji: '🪨',
    beats: 'scissors',
  },
  {
    name: 'paper',
    emoji: '🧻',
    beats: 'rock',
  },
  {
    name: 'scissors',
    emoji: '✂️',
    beats: 'paper',
  },
];

const optionsDiv = document.querySelector('.options');
const optionBtns = [...optionsDiv.children];
const results = document.querySelector('.results');

optionBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => makeSelection(e.target.dataset.option));
});

function makeSelection(option) {
  const userOption = OPTIONS.find((o) => option === o.name);
  const randIdx = randomSelection();
  const compOption = OPTIONS[randIdx];
  const userWinner = isWinner(userOption, compOption);
  const compWinner = isWinner(compOption, userOption);
  if (userWinner) {
    addResult(userOption.emoji, compOption.emoji, 'user');
    addScore('user');
  } else if (compWinner) {
    addResult(userOption.emoji, compOption.emoji, 'comp');
    addScore('comp');
  } else {
    addResult(userOption.emoji, compOption.emoji, '');
    addScore('');
  }
}

function randomSelection() {
  return Math.floor(Math.random() * OPTIONS.length);
}

function isWinner(option, opponentOption) {
  return option.beats === opponentOption.name;
}

function addResult(userEmoji, compEmoji, winner) {
  const wrapper = document.createElement('div');
  const userChoice = document.createElement('div');
  const compChoice = document.createElement('div');

  userChoice.textContent = userEmoji;
  compChoice.textContent = compEmoji;

  wrapper.append(userChoice, compChoice);
  results.append(wrapper);

  userChoice.classList.add('history');
  compChoice.classList.add('history');
  userChoice.classList.remove('winner');
  compChoice.classList.remove('winner');
  wrapper.classList.add('wrapper');

  if (winner === 'user') {
    userChoice.classList.add('winner');
  } else if (winner === 'comp') {
    compChoice.classList.add('winner');
  }
}

function addScore(winner) {
  const userScore = document.querySelector('[data-user]');
  const compScore = document.querySelector('[data-comp]');
  switch (winner) {
    case 'user':
      userScore.textContent = parseInt(userScore.textContent) + 1;
      break;
    case 'comp':
      compScore.textContent = parseInt(compScore.textContent) + 1;
      break;
    default:
      break;
  }
}
