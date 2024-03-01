const Gameboard = require("./gameboard");
const Player = require("./player");
const prompt = require("prompt-sync")({ sigint: true });

const BOARD_SIZE = 10;
const playerOneBoard = Gameboard(BOARD_SIZE);
const playerTwoBoard = Gameboard(BOARD_SIZE);

const playerOne = Player(playerTwoBoard);
const computer = Player(playerOneBoard, true);

placeShipsOnBoards();


const startGame = () => {

  while (!isOver(playerOneBoard, playerTwoBoard)) {
    getPlayerMove();
    computer.computerAttack();
  }
};

function placeShipsOnBoards() {
  playerOneBoard.placeShip(4, 6, 2, "horizontal");
  playerOneBoard.placeShip(5, 5, 3, "vertical");
  playerTwoBoard.placeShip(0, 0, 2, "horizontal");
  playerTwoBoard.placeShip(3, 3, 3, "vertical");
}

function getPlayerMove() {
  const y = prompt("Y: ");
  const x = prompt("X: ");
  playerOne.attackEnemy(y, x);
}

function isOver(playerOneBoard, playerTwoBoard) {
  return playerOneBoard.areAllSunk() || playerTwoBoard.areAllSunk();
}

startGame();
