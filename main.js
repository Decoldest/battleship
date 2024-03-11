const Gameboard = require("./gameboard").default;
const Player = require("./player");
const prompt = require("prompt-sync")({ sigint: true });

const BOARD_SIZE = 10;
const playerOneBoard = Gameboard(BOARD_SIZE);
const playerTwoBoard = Gameboard(BOARD_SIZE);

let playerOne;
let playerTwo;
let currentPlayer;

function initiatePlayers(playerTwoOption) {
  //Player one is always regular
  playerOne = Player(playerTwoBoard);

  //Player two is either computer or human
  playerTwo =
    playerTwoOption === "player"
      ? Player(playerOneBoard)
      : Player(playerOneBoard, true);

  currentPlayer = playerOne;
}

export function placeShipOnBoards(currentPlayer, y, x, length, orientation) {
  if (currentPlayer === playerOne) {
    playerOneBoard.placeShip(y, x, length, orientation);
  } else {
    playerTwoBoard.placeShip(y, x, length, orientation);
  }
}

function playerAttack(player) {
  if (player.isAi) {
    player.computerAttack();
  } else {
    const y = prompt("Y: ");
    const x = prompt("X: ");
    player.attackEnemy(y, x);
  }
}

function playRound() {
  while (!isOver(playerOneBoard, playerTwoBoard)) {
    playerAttack(currentPlayer);
    switchCurrentPlayer();
  }
}

function switchCurrentPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

const startGame = () => {
  playRound();
};

function isOver(playerOneBoard, playerTwoBoard) {
  return playerOneBoard.areAllSunk() || playerTwoBoard.areAllSunk();
}

initiatePlayers("player");

startGame();

//module.exports = Main;
