const playerOneContainer = document.getElementById("player1-container");
const playerTwoContainer = document.getElementById("player2-container");
const container = document.querySelector(".container");
const startButton = document.getElementById("start");
const startContainer = document.querySelector(".start-container");

const BOARD_SIZE = 10;

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
});

const showPlayerGrids = () => {
  startContainer.classList.toggle("hidden");
  container.classList.toggle("hidden");
  playerOneContainer.style.display = "grid";
  playerTwoContainer.style.display = "grid";
};
