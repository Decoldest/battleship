const playerOneContainer = document.getElementById("player1-container");
const playerTwoContainer = document.getElementById("player2-container");
const playerOneShips = document.querySelector(".player1-ships");
const playerTwoShips = document.querySelector(".player2-ships");
const container = document.querySelector(".container");
const startButton = document.getElementById("start");
const startContainer = document.querySelector(".start-container");
import {
  BOARD_SIZE,
  initiatePlayers,
  placeShipOnBoard,
  switchCurrentPlayer,
} from "./main";

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

//Clicking start will draw the board and add listeners
startButton.addEventListener("click", () => {
  initiatePlayers(
    document.querySelector('input[name="player-option"]:checked').value
  );
  showPlayerGrids();
  setSquares(playerOneContainer);
  setSquares(playerTwoContainer);

  const playerOneGridSpaces = playerOneContainer.querySelectorAll(".grid-item");

  addGridDragListeners(playerOneGridSpaces);
  playerOneShips.classList.toggle("hidden");
});

function setPlayerShips(playerShips) {}

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

function removeGridDragListeners(playerGrid) {
  playerGrid.forEach((gridSpace) => {
    gridSpace.removeEventListener("dragover", dragOver);
    gridSpace.removeEventListener("dragenter", dragEnter);
    gridSpace.removeEventListener("drop", dropShip);
  });
}

const ships = document.querySelectorAll(".ship");
let draggedShip;
let draggedShipLength;
let draggedPartValue;
let playerOneShipsPlaced = false;

//Add event listeners for ships
ships.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("mousedown", (e) => {
    draggedPartValue = e.target.id;
  });
  ship.addEventListener("dblclick", function () {
    ship.style.flexDirection = ship.classList.contains("horizontal")
      ? "column"
      : "row";
    ship.classList.toggle("horizontal");
  });
});

function dragStart() {
  draggedShip = this;
  draggedShipLength = this.children.length;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dropShip(e) {
  let [y, x] = e.target.value.split(",");
  const orientation = getShipOrientation(draggedShip);
  if (orientation === "horizontal") {
    x = +x - draggedPartValue;
  } else {
    y = +y - draggedPartValue;
  }

  const checkPlaced = placeShipOnBoard(y, x, draggedShipLength, orientation);

  handleAddShip(
    checkPlaced,
    e.target.parentNode,
    y,
    x,
    draggedShipLength,
    orientation
  );
  handleAllShipsPlaced();
}

function getShipOrientation(draggedShip) {
  return draggedShip.classList.contains("horizontal")
    ? "horizontal"
    : "vertical";
}

//Draws the placed ship on the grid
function handleAddShip(checkPlaced, grid, y, x, length, orientation) {
  if (checkPlaced) {
    draggedShip.remove();
    drawShipOnGrid(grid, y, x, length, orientation);
  }
}

function drawShipOnGrid(grid, y, x, length, orientation) {
  let selectedButtons = [];
  if (orientation === "horizontal") {
    for (let i = x; i < x + length; i++) {
      selectedButtons.push(`button[value="${y},${i}"]`);
    }
  } else {
    for (let i = y; i < y + length; i++) {
      selectedButtons.push(`button[value="${i},${x}"]`);
    }
  }
  selectedButtons.forEach(function (selector) {
    var button = document.querySelector(selector);
    button.classList.add("ship-placed");
  });
}

function handleAllShipsPlaced() {
  if (!playerOneShipsPlaced && !playerOneShips.querySelector(".ship")) {
    playerOneShipsPlaced = true;
    removeGridDragListeners(playerOneContainer.querySelectorAll(".grid-item"));

    const playerTwoGridSpaces =
      playerTwoContainer.querySelectorAll(".grid-item");
    addGridDragListeners(playerTwoGridSpaces);
    playerTwoShips.classList.toggle("hidden");
    switchCurrentPlayer();
  }
}
