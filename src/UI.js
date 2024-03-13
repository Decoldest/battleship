import {
  BOARD_SIZE,
  initiatePlayers,
  placeShipOnBoard,
  switchCurrentPlayer,
  isSecondPlayerComputer,
  setComputerShips,
  currentPlayer,
} from "./main";

const playerOneContainer = document.getElementById("player1-container");
const playerTwoContainer = document.getElementById("player2-container");
const playerOneShips = document.querySelector(".player1-ships");
const playerTwoShips = document.querySelector(".player2-ships");
const container = document.querySelector(".container");
const startButton = document.getElementById("start");
const startContainer = document.querySelector(".start-container");
const playerOneText = document.querySelector(".player1-ships-text");
const playerTwoText = document.querySelector(".player2-ships-text");
const playerOneCover = document.querySelector(".player1-cover");
const playerTwoCover = document.querySelector(".player2-cover");

const ships = document.querySelectorAll(".ship");
let draggedShip;
let draggedShipLength;
let draggedPartValue;
let playerOneShipsPlaced = false;

//Clicking start will draw the board and add listeners
startButton.addEventListener("click", intializeGame);

function intializeGame() {
  initiatePlayers(
    document.querySelector('input[name="player-option"]:checked').value
  );
  showPlayerGrids();
  setSquares(playerOneContainer);
  setSquares(playerTwoContainer);

  const playerOneGridSpaces = playerOneContainer.querySelectorAll(".grid-item");

  addGridDragListeners(playerOneGridSpaces);
  toggleVisibility(playerOneShips, playerOneText);
}

function toggleVisibility(shipsElement, textElement) {
  shipsElement.classList.toggle("hidden");
  textElement.classList.toggle("hidden");
}

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
    var button = grid.querySelector(selector);
    button.classList.add("ship-placed");
  });
}

function removeShipsFromGrid(grid) {
  Array.from(grid.querySelectorAll(".ship-placed")).forEach((gridItem) =>
    gridItem.classList.remove("ship-placed")
  );
}

function toggleCover(cover) {
  cover.classList.toggle("hidden");
}

function handleAllShipsPlaced() {
  if (!playerOneShipsPlaced && !playerOneShips.querySelector(".ship")) {
    playerOneShipsPlaced = true;
    const playerOneGridSpaces =
      playerOneContainer.querySelectorAll(".grid-item");

    removeGridDragListeners(playerOneGridSpaces);
    toggleVisibility(playerOneShips, playerOneText);

    if (!isSecondPlayerComputer()) {
      const playerTwoGridSpaces =
        playerTwoContainer.querySelectorAll(".grid-item");
      addGridDragListeners(playerTwoGridSpaces);
      toggleVisibility(playerTwoShips, playerTwoText);
      removeShipsFromGrid(playerOneContainer);
      switchCurrentPlayer();
    } else {
      console.log("player One done");
      setComputerShips();
    }
  }

  if (!playerTwoShips.querySelector(".ship")) {
    toggleVisibility(playerTwoShips, playerTwoText);
    removeShipsFromGrid(playerTwoContainer);
    console.log("starting game");
    console.log(currentPlayer);
  }
}
