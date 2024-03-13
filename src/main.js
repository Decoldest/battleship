import Gameboard from "./gameboard";
import Player from "./player";
//const prompt = require("prompt-sync")({ sigint: true });

export const BOARD_SIZE = 10;
const playerOneBoard = Gameboard(BOARD_SIZE);
const playerTwoBoard = Gameboard(BOARD_SIZE);

let playerOne;
let playerTwo;
export let currentPlayer;

export function initiatePlayers(playerTwoOption) {
  //Player one is always regular
  playerOne = Player(playerTwoBoard);

  //Player two is either computer or human
  playerTwo =
    playerTwoOption === "player"
      ? Player(playerOneBoard)
      : Player(playerOneBoard, true);

  currentPlayer = playerOne;
}

export function placeShipOnBoard(y, x, length, orientation) {
  console.log(`y: ${y}, x: ${x}, length:${length}, orientation: ${orientation}`);
  if (currentPlayer === playerOne) {
    return playerOneBoard.placeShip(y, x, length, orientation);
  } else {
    return playerTwoBoard.placeShip(y, x, length, orientation);
  }
}

//playerOne sets computer ships since computer is the enemy
export function setComputerShips(shipLengths) {
  playerOne.computerAddShips();
}

export function playerAttack(y, x) {
  if (currentPlayer.isAi) {
    return currentPlayer.computerAttack();
  } else {
    return currentPlayer.attackEnemy(y, x);
  }
}

function playRound() {
  while (!isOver(playerOneBoard, playerTwoBoard)) {
    playerAttack(currentPlayer);
    switchCurrentPlayer();
  }
}

export function switchCurrentPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

const startGame = () => {
  playRound();
};

export function isOver() {
  console.log(playerOneBoard);
  console.log(playerTwoBoard);
  if (playerOneBoard.areAllSunk()) {
    return playerTwo.isAi ? "Computer" : "Player Two";
  }
  if (playerTwoBoard.areAllSunk()) {
    return "Player One"
  }
  return false;
}

export function isSecondPlayerComputer() {
  return playerTwo.isAi;
}

//startGame();
