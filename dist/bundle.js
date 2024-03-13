/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ \"./src/main.js\");\n\n\nconst playerOneContainer = document.getElementById(\"player1-container\");\nconst playerTwoContainer = document.getElementById(\"player2-container\");\nconst playerOneShips = document.querySelector(\".player1-ships\");\nconst playerTwoShips = document.querySelector(\".player2-ships\");\nconst container = document.querySelector(\".container\");\nconst startButton = document.getElementById(\"start\");\nconst startContainer = document.querySelector(\".start-container\");\nconst playerOneText = document.querySelector(\".player1-ships-text\");\nconst playerTwoText = document.querySelector(\".player2-ships-text\");\nconst playerOneCover = document.querySelector(\".player1-cover\");\nconst playerTwoCover = document.querySelector(\".player2-cover\");\nconst output = document.querySelector(\".output\");\nconst error = document.querySelector(\".error\");\n\nconst ships = document.querySelectorAll(\".ship\");\nlet draggedShip;\nlet draggedShipLength;\nlet draggedPartValue;\nlet playerOneShipsPlaced = false;\nlet secondPlayerTurn;\n\n//Clicking start will draw the board and add listeners\nstartButton.addEventListener(\"click\", intializeGame);\n\n//Draws grid and adds necessary listeners\nfunction intializeGame() {\n  (0,_main__WEBPACK_IMPORTED_MODULE_0__.initiatePlayers)(\n    document.querySelector('input[name=\"player-option\"]:checked').value\n  );\n  setSecondPlayerTurn();\n  showPlayerGrids();\n  setSquares(playerOneContainer);\n  setSquares(playerTwoContainer);\n\n  const playerOneGridSpaces = playerOneContainer.querySelectorAll(\".grid-item\");\n\n  addGridDragListeners(playerOneGridSpaces);\n  toggleVisibility(\n    playerOneShips,\n    playerOneText,\n    \"Player One, place your ships\"\n  );\n  output.classList.remove(\"hidden\");\n}\n\nfunction toggleVisibility(shipsElement, textElement, text) {\n  shipsElement.classList.toggle(\"hidden\");\n  textElement.classList.toggle(\"hidden\");\n  output.textContent = text;\n}\n\n//Draw grid and add listener\nconst setSquares = (container) => {\n  for (let i = 0; i < _main__WEBPACK_IMPORTED_MODULE_0__.BOARD_SIZE; i++) {\n    for (let j = 0; j < _main__WEBPACK_IMPORTED_MODULE_0__.BOARD_SIZE; j++) {\n      const element = document.createElement(\"button\");\n      element.classList.add(\"grid-item\");\n      element.value = `${i},${j}`;\n      container.appendChild(element);\n    }\n  }\n};\n\n//Adds grid coordinate to grid element\nfunction addGridButtonListener(grid) {\n  grid.addEventListener(\"click\", (event) => {\n    const gridItem = event.target.closest(\".grid-item\");\n    if (\n      !gridItem ||\n      gridItem.classList.contains(\"hit\") ||\n      gridItem.classList.contains(\"miss\")\n    ) {\n      showError(\"Invalid coordinate. Please try again\");\n\n      return;\n    }\n    if (gridItem) {\n      const [y, x] = gridItem.value.split(\",\");\n      const attack = (0,_main__WEBPACK_IMPORTED_MODULE_0__.playerAttack)(y, x);\n      handleAttack(attack, gridItem);\n      (0,_main__WEBPACK_IMPORTED_MODULE_0__.switchCurrentPlayer)();\n      secondPlayerTurn();\n    }\n  });\n}\n\nfunction handleAttack(attack, gridItem) {\n  if (attack) {\n    gridItem.classList.add(\"hit\");\n  } else {\n    gridItem.classList.add(\"miss\");\n  }\n  handleGameOver();\n}\n\nfunction setSecondPlayerTurn() {\n  if ((0,_main__WEBPACK_IMPORTED_MODULE_0__.isSecondPlayerComputer)()) {\n    secondPlayerTurn = () => {\n      output.textContent = \"Computer's Turn\";\n      let computerTurn = (0,_main__WEBPACK_IMPORTED_MODULE_0__.playerAttack)(null, null);\n      const [y, x] = computerTurn.coordinates.split(\",\");\n      const gridItem = playerOneContainer.querySelector(\n        `button[value=\"${y},${x}\"]`\n      );\n      handleAttack(computerTurn.didMoveHit, gridItem);\n      (0,_main__WEBPACK_IMPORTED_MODULE_0__.switchCurrentPlayer)();\n    };\n  } else {\n    secondPlayerTurn = toggleCovers;\n  }\n}\n\nconst showPlayerGrids = () => {\n  startContainer.classList.toggle(\"hidden\");\n  container.classList.toggle(\"hidden\");\n  playerOneContainer.style.display = \"grid\";\n  playerTwoContainer.style.display = \"grid\";\n};\n\n//Add event listeners for grid\nfunction addGridDragListeners(playerGrid) {\n  playerGrid.forEach((gridSpace) => {\n    gridSpace.addEventListener(\"dragover\", dragOver);\n    gridSpace.addEventListener(\"dragenter\", dragEnter);\n    gridSpace.addEventListener(\"drop\", dropShip);\n  });\n}\n\nfunction removeGridDragListeners(playerGrid) {\n  playerGrid.forEach((gridSpace) => {\n    gridSpace.removeEventListener(\"dragover\", dragOver);\n    gridSpace.removeEventListener(\"dragenter\", dragEnter);\n    gridSpace.removeEventListener(\"drop\", dropShip);\n  });\n}\n\n//Add event listeners for ships\nships.forEach((ship) => {\n  ship.addEventListener(\"dragstart\", dragStart);\n  ship.addEventListener(\"mousedown\", (e) => {\n    draggedPartValue = e.target.id;\n  });\n  ship.addEventListener(\"dblclick\", function () {\n    ship.style.flexDirection = ship.classList.contains(\"horizontal\")\n      ? \"column\"\n      : \"row\";\n    ship.classList.toggle(\"horizontal\");\n  });\n});\n\nfunction dragStart() {\n  draggedShip = this;\n  draggedShipLength = this.children.length;\n}\n\nfunction dragOver(e) {\n  e.preventDefault();\n}\n\nfunction dragEnter(e) {\n  e.preventDefault();\n}\n\nfunction dropShip(e) {\n  let [y, x] = e.target.value.split(\",\");\n  const orientation = getShipOrientation(draggedShip);\n  if (orientation === \"horizontal\") {\n    x = +x - draggedPartValue;\n  } else {\n    y = +y - draggedPartValue;\n  }\n\n  const checkPlaced = (0,_main__WEBPACK_IMPORTED_MODULE_0__.placeShipOnBoard)(y, x, draggedShipLength, orientation);\n\n  handleAddShip(\n    checkPlaced,\n    e.target.parentNode,\n    y,\n    x,\n    draggedShipLength,\n    orientation\n  );\n  handleAllShipsPlaced();\n}\n\nfunction getShipOrientation(draggedShip) {\n  return draggedShip.classList.contains(\"horizontal\")\n    ? \"horizontal\"\n    : \"vertical\";\n}\n\n//Draws the placed ship on the grid\nfunction handleAddShip(checkPlaced, grid, y, x, length, orientation) {\n  if (checkPlaced) {\n    draggedShip.remove();\n    drawShipOnGrid(grid, y, x, length, orientation);\n  } else {\n    showError(\"Invalid placement. Please place ships carefully\");\n  }\n}\n\nfunction drawShipOnGrid(grid, y, x, length, orientation) {\n  let selectedButtons = [];\n  if (orientation === \"horizontal\") {\n    for (let i = x; i < x + length; i++) {\n      selectedButtons.push(`button[value=\"${y},${i}\"]`);\n    }\n  } else {\n    for (let i = y; i < y + length; i++) {\n      selectedButtons.push(`button[value=\"${i},${x}\"]`);\n    }\n  }\n  selectedButtons.forEach(function (selector) {\n    var button = grid.querySelector(selector);\n    button.classList.add(\"ship-placed\");\n  });\n}\n\nfunction removeShipsFromGrid(grid) {\n  Array.from(grid.querySelectorAll(\".ship-placed\")).forEach((gridItem) => {\n    gridItem.classList.remove(\"ship-placed\");\n  });\n}\n\nfunction toggleCovers() {\n  playerOneCover.classList.toggle(\"hidden\");\n  playerTwoCover.classList.toggle(\"hidden\");\n}\n\nfunction handleAllShipsPlaced() {\n  if (!playerOneShipsPlaced && !playerOneShips.querySelector(\".ship\")) {\n    playerOneShipsPlaced = true;\n    const playerOneGridSpaces =\n      playerOneContainer.querySelectorAll(\".grid-item\");\n\n    removeGridDragListeners(playerOneGridSpaces);\n    toggleVisibility(playerOneShips, playerOneText);\n\n    if (!(0,_main__WEBPACK_IMPORTED_MODULE_0__.isSecondPlayerComputer)()) {\n      toggleCovers();\n      const playerTwoGridSpaces =\n        playerTwoContainer.querySelectorAll(\".grid-item\");\n      addGridDragListeners(playerTwoGridSpaces);\n      toggleVisibility(\n        playerTwoShips,\n        playerTwoText,\n        \"Player Two, place your ships\"\n      );\n      removeShipsFromGrid(playerOneContainer);\n      (0,_main__WEBPACK_IMPORTED_MODULE_0__.switchCurrentPlayer)();\n    } else {\n      (0,_main__WEBPACK_IMPORTED_MODULE_0__.setComputerShips)();\n      playerTwoCover.classList.toggle(\"hidden\");\n      output.textContent = \"Beat the computer\";\n      addGridButtonListener(playerTwoContainer);\n    }\n  }\n\n  if (!playerTwoShips.querySelector(\".ship\")) {\n    toggleVisibility(playerTwoShips, playerTwoText, \"Fight to the death\");\n    removeShipsFromGrid(playerTwoContainer);\n    (0,_main__WEBPACK_IMPORTED_MODULE_0__.switchCurrentPlayer)();\n    addGridButtonListener(playerTwoContainer);\n    addGridButtonListener(playerOneContainer);\n  }\n}\n\nfunction handleGameOver() {\n  const gameWinner = (0,_main__WEBPACK_IMPORTED_MODULE_0__.isOver)();\n  if (gameWinner) {\n    playerOneCover.classList.remove(\"hidden\");\n    playerTwoCover.classList.remove(\"hidden\");\n    output.textContent = `${gameWinner} wins`;\n  }\n}\n\nfunction showError(text) {\n  error.textContent = text;\n  error.classList.remove(\"hidden\");\n  setTimeout(hideError, 3000);\n}\n\nfunction hideError() {\n  error.classList.add(\"hidden\");\n}\n\n\n//# sourceURL=webpack://battleship/./src/UI.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nlet Gameboard = function (dimension) {\n  const gameboard = {};\n  gameboard.board = new Array(dimension)\n    .fill(null)\n    .map(() => new Array(dimension).fill(null));\n\n  gameboard.missedAttacks = [];\n  gameboard.hitAttacks = [];\n  gameboard.shipList = [];\n  const boardLength = gameboard.board.length;\n\n  //Place ship if coordinates are valid\n  gameboard.placeShip = function (y, x, length, orientation) {\n    if (\n      !isValidCoordinate(y, x, length, orientation) ||\n      !coordinatesFree(y, x, length, orientation)\n    ) {\n      return false;\n    }\n\n    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n    gameboard.shipList.push(newShip);\n\n    if (orientation === \"horizontal\") {\n      placeShipHorizontally(y, x, length, newShip);\n    } else {\n      placeShipVertically(y, x, length, newShip);\n    }\n    console.log(this.board);\n    return true;\n  };\n\n  function isValidCoordinate(y, x, length, orientation) {\n    if (x < 0 || y < 0 || length <= 0) {\n      return false;\n    }\n\n    if (orientation === \"horizontal\") {\n      return x + length <= boardLength;\n    } else if (orientation === \"vertical\") {\n      return y + length <= boardLength;\n    }\n    return false;\n  }\n\n  function coordinatesFree(y, x, length, orientation) {\n    if (orientation === \"horizontal\") {\n      for (let i = x; i < x + length; i++) {\n        if (gameboard.board[y][i] !== null) {\n          return false;\n        }\n      }\n    } else {\n      for (let i = y; i < y + length; i++) {\n        if (gameboard.board[i][x] !== null) {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n\n  function placeShipHorizontally(y, x, length, newShip) {\n    for (let i = x; i < x + length; i++) {\n      gameboard.board[y][i] = newShip;\n    }\n  }\n\n  function placeShipVertically(y, x, length, newShip) {\n    for (let i = y; i < y + length; i++) {\n      gameboard.board[i][x] = newShip;\n    }\n  }\n\n  //Returns false if missed, true if hit\n  gameboard.receiveAttack = function (y, x) {\n    const shipThere = gameboard.board[y][x];\n\n    if (!shipThere) {\n      gameboard.missedAttacks.push({ y, x });\n      return false;\n    }\n\n    shipThere.hit();\n    console.log(\"hit\");\n    gameboard.hitAttacks.push({ y, x });\n    return true;\n  };\n\n  gameboard.areAllSunk = function () {\n    return gameboard.shipList.every((ship) => ship.isSunk());\n  };\n\n  return gameboard;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BOARD_SIZE: () => (/* binding */ BOARD_SIZE),\n/* harmony export */   currentPlayer: () => (/* binding */ currentPlayer),\n/* harmony export */   initiatePlayers: () => (/* binding */ initiatePlayers),\n/* harmony export */   isOver: () => (/* binding */ isOver),\n/* harmony export */   isSecondPlayerComputer: () => (/* binding */ isSecondPlayerComputer),\n/* harmony export */   placeShipOnBoard: () => (/* binding */ placeShipOnBoard),\n/* harmony export */   playerAttack: () => (/* binding */ playerAttack),\n/* harmony export */   setComputerShips: () => (/* binding */ setComputerShips),\n/* harmony export */   switchCurrentPlayer: () => (/* binding */ switchCurrentPlayer)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n//const prompt = require(\"prompt-sync\")({ sigint: true });\n\nconst BOARD_SIZE = 10;\nconst playerOneBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(BOARD_SIZE);\nconst playerTwoBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(BOARD_SIZE);\n\nlet playerOne;\nlet playerTwo;\nlet currentPlayer;\n\nfunction initiatePlayers(playerTwoOption) {\n  //Player one is always regular\n  playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(playerTwoBoard);\n\n  //Player two is either computer or human\n  playerTwo =\n    playerTwoOption === \"player\"\n      ? (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(playerOneBoard)\n      : (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(playerOneBoard, true);\n\n  currentPlayer = playerOne;\n}\n\nfunction placeShipOnBoard(y, x, length, orientation) {\n  console.log(`y: ${y}, x: ${x}, length:${length}, orientation: ${orientation}`);\n  if (currentPlayer === playerOne) {\n    return playerOneBoard.placeShip(y, x, length, orientation);\n  } else {\n    return playerTwoBoard.placeShip(y, x, length, orientation);\n  }\n}\n\n//playerOne sets computer ships since computer is the enemy\nfunction setComputerShips(shipLengths) {\n  playerOne.computerAddShips();\n}\n\nfunction playerAttack(y, x) {\n  if (currentPlayer.isAi) {\n    return currentPlayer.computerAttack();\n  } else {\n    return currentPlayer.attackEnemy(y, x);\n  }\n}\n\nfunction playRound() {\n  while (!isOver(playerOneBoard, playerTwoBoard)) {\n    playerAttack(currentPlayer);\n    switchCurrentPlayer();\n  }\n}\n\nfunction switchCurrentPlayer() {\n  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;\n}\n\nconst startGame = () => {\n  playRound();\n};\n\nfunction isOver() {\n  console.log(playerOneBoard);\n  console.log(playerTwoBoard);\n  if (playerOneBoard.areAllSunk()) {\n    return playerTwo.isAi ? \"Computer\" : \"Player Two\";\n  }\n  if (playerTwoBoard.areAllSunk()) {\n    return \"Player One\"\n  }\n  return false;\n}\n\nfunction isSecondPlayerComputer() {\n  return playerTwo.isAi;\n}\n\n//startGame();\n\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Player = function (gameboard, ai = false) {\n  const player = {};\n\n  const enemyBoard = gameboard;\n  const boardDimension = gameboard.board.length;\n  const computerAttackList = ai ? new Set() : null;\n  const computerShips = [5, 4, 3, 3, 2];\n\n  //Queue to search adjacent spaces in case of a hit\n  let targetQueue = [];\n  //If ship has been hit, target until sunk\n  let targetedShip = null;\n\n  //Get coordinates and send attack to enemy\n  player.attackEnemy = function (y, x) {\n    return enemyBoard.receiveAttack(y, x);\n  };\n\n  //Computer chooses between random or logical attack\n  player.computerAttack = function () {\n    let { y, x } = !targetQueue.length ? randomMove() : attackSpacesNear();\n\n    computerAttackList.add(`${y},${x}`);\n    let didMoveHit = enemyBoard.receiveAttack(y, x);\n    if (didMoveHit) {\n      handleHit(y, x);\n    }\n    return { coordinates: `${y},${x}`, didMoveHit };\n  };\n\n  //Attacks at random with bias towards the middle of the board\n  function randomMove() {\n    const sigma = 1;\n\n    // Function to generate random number with Gaussian distribution\n    function randn_bm() {\n      let u = 0,\n        v = 0;\n      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)\n      while (v === 0) v = Math.random();\n      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);\n    }\n\n    // Calculate mean for Gaussian distribution (middle of the board)\n    const middle = Math.floor(boardDimension / 2);\n\n    // Generate random numbers with Gaussian distribution for row and column\n    let y = Math.round(middle + randn_bm() * sigma);\n    let x = Math.round(middle + randn_bm() * sigma);\n\n    // Ensure that the generated position is within the board boundaries\n    y = Math.min(boardDimension - 1, Math.max(0, y));\n    x = Math.min(boardDimension - 1, Math.max(0, x));\n\n    // Ensure that the generated position is not already attacked\n    while (computerAttackList.has(`${y},${x}`)) {\n      // Generate new random numbers with Gaussian distribution\n      y = Math.round(middle + randn_bm() * sigma);\n      x = Math.round(middle + randn_bm() * sigma);\n      // Ensure that the new position is within the board boundaries\n      y = Math.min(boardDimension - 1, Math.max(0, y));\n      x = Math.min(boardDimension - 1, Math.max(0, x));\n    }\n    return { y, x };\n  }\n\n  function handleHit(y, x) {\n    targetedShip = gameboard.board[y][x]; //Update the current targeted ship and queue\n    addSurroundingToQueue(y, x);\n\n    if (targetedShip.isSunk()) {\n      targetQueue = [];\n    }\n  }\n\n  function isValidAttack(y, x) {\n    return (\n      x >= 0 &&\n      x < gameboard.board[0].length &&\n      y >= 0 &&\n      y < gameboard.board.length &&\n      !computerAttackList.has(`${y},${x}`)\n    );\n  }\n\n  function attackSpacesNear() {\n    return targetQueue.shift();\n  }\n\n  //Check all spaces around hit, add to queue if valid\n  function addSurroundingToQueue(y, x) {\n    for (let [dy, dx] of [\n      [0, 1],\n      [1, 0],\n      [0, -1],\n      [-1, 0],\n    ]) {\n      let newY = y + dy;\n      let newX = x + dx;\n      if (isValidAttack(newY, newX)) {\n        targetQueue.push({ y: newY, x: newX });\n      }\n    }\n  }\n\n  player.computerAddShips = function () {\n    console.log(\"LEN \", computerShips.length);\n\n    while (computerShips.length) {\n      const shipLength = computerShips.pop();\n      let isValidPlacement = false;\n      console.log(shipLength);\n      // Continue trying to place the ship until a valid placement is found\n      while (!isValidPlacement) {\n        // Generate random coordinates for the ship\n        const y = Math.floor(Math.random() * boardDimension);\n        const x = Math.floor(Math.random() * boardDimension);\n\n        // Generate random orientation for the ship\n        const orientation = Math.random() < 0.5 ? \"horizontal\" : \"vertical\";\n\n        // Attempt to place the ship on the gameboard\n        isValidPlacement = gameboard.placeShip(y, x, shipLength, orientation);\n      }\n    }\n  };\n\n  player.isAi = ai;\n\n  return player;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nlet Ship = function (length) {  const ship = {};\n\n  ship.length = length;\n  ship.hitsNumber = 0;\n  ship.isSunk = function () {\n    return this.hitsNumber >= this.length;\n  };\n  ship.hit = function () {\n    if (!this.isSunk()) {\n      this.hitsNumber++;\n    }\n  };\n\n  return ship;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/UI.js");
/******/ 	
/******/ })()
;