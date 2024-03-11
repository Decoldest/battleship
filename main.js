const Gameboard = require("./gameboard").default;
const Player = require("./player");
const prompt = require("prompt-sync")({ sigint: true });

export const BOARD_SIZE = 10;
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

export function placeShipOnBoard(currentPlayer, y, x, length, orientation) {
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

const playerOneContainer = document.getElementById("player1-container");
const playerTwoContainer = document.getElementById("player2-container");
const container = document.querySelector(".container");
const startButton = document.getElementById("start");
const startContainer = document.querySelector(".start-container");

import { BOARD_SIZE, placeShipOnBoard } from "./main.js";

//Draw grid and add listener
const setSquares = (container) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const element = document.createElement("button");
      element.classList.add("grid-item");
      element.value = `${i},${j}`;
      addGridButtonListener(element);
      container.appendChild(element);
    }
  }
};

//Adds grid coordinate to grid element
function addGridButtonListener(element) {
  element.addEventListener("click", () => {
    console.log(element.value);
  });
}

//Clicking start will draw the board
startButton.addEventListener("click", () => {
  console.log(
    document.querySelector('input[name="player-option"]:checked').value
  );
  showPlayerGrids();
  setSquares(playerOneContainer);
  setSquares(playerTwoContainer);

  const playerOneGridSpaces = playerOneContainer.querySelectorAll(".grid-item");

  addGridDragListeners(playerOneGridSpaces);
});

const showPlayerGrids = () => {
  startContainer.classList.toggle("hidden");
  container.classList.toggle("hidden");
  playerOneContainer.style.display = "grid";
  playerTwoContainer.style.display = "grid";
};

//Add event listeners for grid
function addGridDragListeners(playerGrid) {
  playerGrid.forEach((gridSpace) => {
    gridSpace.addEventListener("dragover", dragOver);
    gridSpace.addEventListener("dragenter", dragEnter);
    gridSpace.addEventListener("drop", dropShip);
  });
}

const ships = document.querySelectorAll(".ship");
let draggedShipLength;
let draggedPartValue;

//Add event listeners for ships
ships.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("mousedown", (e) => {
    draggedPartValue = e.target.id;
    console.log(draggedPartValue);
  });
});

function dragStart() {
  draggedShip = this;
  console.log(draggedShip.classList[3]);
  draggedShipLength = this.children.length;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dropShip(e) {
  console.log(draggedShip);
  let [y, x] = e.target.value.split(",");
  console.log(y, x);
}
