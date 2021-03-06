const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', reStartGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true })
})
  setBoardHoverClass()
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeCharacter(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
    
  } 
  else if (isDraw()) {
    endGame(true)
  } 
  
  else {
  swapTurns()
  setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!"
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!` 
  }
  winningMessageElement.classList.add('show');
  
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeCharacter(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function reStartGame() {
  winningMessageElement.classList.remove('show')
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
  })
  startGame()
  
}

// setting up the scoreboard

document.getElementById('playerOneButton').onclick = function() {
  var playerOneId = document.getElementById('playerOne').value
  console.log(playerOneId)
  document.getElementById('playerOne').value = ''
}
document.getElementById('playerTwoButton').onclick = function() {
  var playerTwoId = document.getElementById('playerTwo').value
  console.log(playerTwoId)
  document.getElementById('playerTwo').value = ''
}



  // playerOneId.addEventListener('click', handlePOne, { once: true })
  // playerTwoId.addEventListener('click', handlePTwo, {once: true })

  // function handlePOne() {
  //   console.log('playerone')
  // }

  // function handlePTwo() {
  //   console.log('playertwo')
  // }
