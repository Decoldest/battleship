import {
  BOARD_SIZE,
  initiatePlayers,
  placeShipOnBoard,
  switchCurrentPlayer,
  isSecondPlayerComputer,
  setComputerShips,
  playerAttack,
  isOver,
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
const output = document.querySelector(".output");
const error = document.querySelector(".error");

const ships = document.querySelectorAll(".ship");
let draggedShip;
let draggedShipLength;
let draggedPartValue;
let playerOneShipsPlaced = false;
let secondPlayerTurn;

//Clicking start will draw the board and add listeners
startButton.addEventListener("click", intializeGame);

//Draws grid and adds necessary listeners
function intializeGame() {
  initiatePlayers(
    document.querySelector('input[name="player-option"]:checked').value
  );
  setSecondPlayerTurn();
  showPlayerGrids();
  setSquares(playerOneContainer);
  setSquares(playerTwoContainer);

  const playerOneGridSpaces = playerOneContainer.querySelectorAll(".grid-item");

  addGridDragListeners(playerOneGridSpaces);
  toggleVisibility(
    playerOneShips,
    playerOneText,
    "Player One, place your ships"
  );
  output.classList.remove("hidden");
}

function toggleVisibility(shipsElement, textElement, text) {
  shipsElement.classList.toggle("hidden");
  textElement.classList.toggle("hidden");
  output.textContent = text;
}

//Draw grid and add listener
const setSquares = (container) => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const element = document.createElement("button");
      element.classList.add("grid-item");
      element.value = `${i},${j}`;
      container.appendChild(element);
    }
  }
};

//Adds grid coordinate to grid element
function addGridButtonListener(grid) {
  grid.addEventListener("click", (event) => {
    const gridItem = event.target.closest(".grid-item");
    if (
      !gridItem ||
      gridItem.classList.contains("hit") ||
      gridItem.classList.contains("miss")
    ) {
      showError("Invalid coordinate. Please try again");

      return;
    }
    if (gridItem) {
      const [y, x] = gridItem.value.split(",");
      const attack = playerAttack(y, x);
      handleAttack(attack, gridItem);
      output.textContent = `${switchCurrentPlayer()}'s Turn`;
      secondPlayerTurn();
      handleGameOver();
    }
  });
}

function handleAttack(attack, gridItem) {
  if (attack) {
    gridItem.classList.add("hit");
  } else {
    gridItem.classList.add("miss");
  }
}

function setSecondPlayerTurn() {
  if (isSecondPlayerComputer()) {
    secondPlayerTurn = () => {
      output.textContent = "Computer's Turn";
      let computerTurn = playerAttack(null, null);
      const [y, x] = computerTurn.coordinates.split(",");
      const gridItem = playerOneContainer.querySelector(
        `button[value="${y},${x}"]`
      );
      setTimeout(() => {
        handleAttack(computerTurn.didMoveHit, gridItem);
        switchCurrentPlayer();
        output.textContent = "Player One's Turn";
      }, 250);
    };
  } else {
    secondPlayerTurn = toggleCovers;
  }
}

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
  } else {
    showError("Invalid placement. Please place ships carefully");
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
  Array.from(grid.querySelectorAll(".ship-placed")).forEach((gridItem) => {
    gridItem.classList.remove("ship-placed");
  });
}

function toggleCovers() {
  playerOneCover.classList.toggle("hidden");
  playerTwoCover.classList.toggle("hidden");
}

function handleAllShipsPlaced() {
  if (!playerOneShipsPlaced && !playerOneShips.querySelector(".ship")) {
    playerOneShipsPlaced = true;
    const playerOneGridSpaces =
      playerOneContainer.querySelectorAll(".grid-item");

    removeGridDragListeners(playerOneGridSpaces);
    toggleVisibility(playerOneShips, playerOneText);

    if (!isSecondPlayerComputer()) {
      toggleCovers();
      const playerTwoGridSpaces =
        playerTwoContainer.querySelectorAll(".grid-item");
      addGridDragListeners(playerTwoGridSpaces);
      toggleVisibility(
        playerTwoShips,
        playerTwoText,
        "Player Two, place your ships"
      );
      removeShipsFromGrid(playerOneContainer);
      switchCurrentPlayer();
    } else {
      setComputerShips();
      playerTwoCover.classList.toggle("hidden");
      output.textContent = "Beat the computer";
      addGridButtonListener(playerTwoContainer);
    }
  }

  if (!playerTwoShips.querySelector(".ship")) {
    toggleVisibility(
      playerTwoShips,
      playerTwoText,
      "Fight to the death. Player One shoots first"
    );
    removeShipsFromGrid(playerTwoContainer);
    switchCurrentPlayer();
    addGridButtonListener(playerTwoContainer);
    addGridButtonListener(playerOneContainer);
  }
}

function handleGameOver() {
  const gameWinner = isOver();
  if (gameWinner) {
    playerOneCover.classList.remove("hidden");
    playerTwoCover.classList.remove("hidden");
    output.textContent = `${gameWinner} wins`;
  }
}

function showError(text) {
  error.textContent = text;
  error.classList.remove("hidden");
  setTimeout(hideError, 2000);
}

function hideError() {
  error.classList.add("hidden");
}
