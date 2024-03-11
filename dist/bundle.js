/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ (() => {

eval("const playerOneContainer = document.getElementById(\"player1-container\");\nconst playerTwoContainer = document.getElementById(\"player2-container\");\nconst container = document.querySelector(\".container\");\nconst startButton = document.getElementById(\"start\");\nconst startContainer = document.querySelector(\".start-container\");\nconst BOARD_SIZE = 10;\n\n//import { BOARD_SIZE, placeShipOnBoard } from \"./main.js\";\n\n//Draw grid and add listener\nconst setSquares = (container) => {\n  for (let i = 0; i < BOARD_SIZE; i++) {\n    for (let j = 0; j < BOARD_SIZE; j++) {\n      const element = document.createElement(\"button\");\n      element.classList.add(\"grid-item\");\n      element.value = `${i},${j}`;\n      addGridButtonListener(element);\n      container.appendChild(element);\n    }\n  }\n};\n\n//Adds grid coordinate to grid element\nfunction addGridButtonListener(element) {\n  element.addEventListener(\"click\", () => {\n    console.log(element.value);\n  });\n}\n\n//Clicking start will draw the board\nstartButton.addEventListener(\"click\", () => {\n  console.log(\n    document.querySelector('input[name=\"player-option\"]:checked').value\n  );\n  showPlayerGrids();\n  setSquares(playerOneContainer);\n  setSquares(playerTwoContainer);\n\n  const playerOneGridSpaces = playerOneContainer.querySelectorAll(\".grid-item\");\n\n  addGridDragListeners(playerOneGridSpaces);\n});\n\nconst showPlayerGrids = () => {\n  startContainer.classList.toggle(\"hidden\");\n  container.classList.toggle(\"hidden\");\n  playerOneContainer.style.display = \"grid\";\n  playerTwoContainer.style.display = \"grid\";\n};\n\n//Add event listeners for grid\nfunction addGridDragListeners(playerGrid) {\n  playerGrid.forEach((gridSpace) => {\n    gridSpace.addEventListener(\"dragover\", dragOver);\n    gridSpace.addEventListener(\"dragenter\", dragEnter);\n    gridSpace.addEventListener(\"drop\", dropShip);\n  });\n}\n\nconst ships = document.querySelectorAll(\".ship\");\nlet draggedShipLength;\nlet draggedPartValue;\n\n//Add event listeners for ships\nships.forEach((ship) => {\n  ship.addEventListener(\"dragstart\", dragStart);\n  ship.addEventListener(\"mousedown\", (e) => {\n    draggedPartValue = e.target.id;\n    console.log(draggedPartValue);\n  });\n});\n\nfunction dragStart() {\n  draggedShip = this;\n  console.log(draggedShip.classList[3]);\n  draggedShipLength = this.children.length;\n}\n\nfunction dragOver(e) {\n  e.preventDefault();\n}\n\nfunction dragEnter(e) {\n  e.preventDefault();\n}\n\nfunction dropShip(e) {\n  console.log(draggedShip);\n  let [y, x] = e.target.value.split(\",\");\n  console.log(y, x);\n}\n\n\n//# sourceURL=webpack://battleship/./src/UI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/UI.js"]();
/******/ 	
/******/ })()
;