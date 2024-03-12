const playerOneContainer = document.getElementById("player1-container");
const playerTwoContainer = document.getElementById("player2-container");
const container = document.querySelector(".container");
const startButton = document.getElementById("start");
const startContainer = document.querySelector(".start-container");
import { BOARD_SIZE, initiatePlayers, placeShipOnBoard } from "./main";

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
  initiatePlayers(
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
let draggedShip;
let draggedShipLength;
let draggedPartValue;

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
  console.log(y, x);
  console.log("Part: ", draggedPartValue);
  console.log("Length: ", draggedShipLength);
  const orientation = getShipOrientation(draggedShip);
  if (orientation === "horizontal") {
    x = +x - draggedPartValue;
  } else {
    y = +y - draggedPartValue;
  }

  const checkPlaced = placeShipOnBoard(y, x, draggedShipLength, orientation);

  handleRemoveShip(checkPlaced);
}

function getShipOrientation(draggedShip) {
  return draggedShip.classList.contains("horizontal")
    ? "horizontal"
    : "vertical";
}

function handleRemoveShip (checkPlaced) {
  if (checkPlaced) {
    draggedShip.remove();
  }
}
