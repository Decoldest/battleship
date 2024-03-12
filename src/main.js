import Gameboard from "./gameboard";
import Player from "./player";
//const prompt = require("prompt-sync")({ sigint: true });

export const BOARD_SIZE = 10;
const playerOneBoard = Gameboard(BOARD_SIZE);
const playerTwoBoard = Gameboard(BOARD_SIZE);

let playerOne;
let playerTwo;
let currentPlayer;

export function initiatePlayers(playerTwoOption) {
  //Player one is always regular
  playerOne = Player(playerTwoBoard);

  //Player two is either computer or human
  playerTwo =
    playerTwoOption === "player"
      ? Player(playerOneBoard)
      : Player(playerOneBoard, true);

  currentPlayer = playerOne;

  console.log(playerOne);
  console.log(playerTwo);
}

export function placeShipOnBoard(y, x, length, orientation) {
  console.log(`y: ${y}, x: ${x}, length:${length}, orientation: ${orientation}`);
  if (currentPlayer === playerOne) {
    return playerOneBoard.placeShip(y, x, length, orientation);
  } else {
    return playerTwoBoard.placeShip(y, x, length, orientation);
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

export function switchCurrentPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

const startGame = () => {
  playRound();
};

function isOver(playerOneBoard, playerTwoBoard) {
  return playerOneBoard.areAllSunk() || playerTwoBoard.areAllSunk();
}

//startGame();
