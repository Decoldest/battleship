const Gameboard = require("./gameboard");

let Player = function (gameboard, ai = false) {
  const player = {};

  const enemyBoard = gameboard;
  const boardDimension = gameboard.board.length;
  const computerAttackList = ai ? new Set() : null;
  //Queue to search adjacent spaces in case of a hit
  let targetQueue = [];
  //If ship has been hit, target until sunk
  let targetedShip = null;

  //Get coordinates and send attack to enemy
  player.attackEnemy = function (y, x) {
    enemyBoard.receiveAttack(y, x);
  };

  //Computer chooses between random or logical attack
  player.computerAttack = function () {
    let { y, x } = !targetQueue.length ? randomMove() : attackSpacesNear();

    computerAttackList.add(`${y},${x}`);
    console.log(computerAttackList);
    let didMoveHit = enemyBoard.receiveAttack(y, x);
    if (didMoveHit) {
      handleHit(y, x);
    }
  };

  //Attacks at random with bias towards the middle of the board
  function randomMove() {
    const minCol = Math.max(0, Math.floor(boardDimension / 2) - 1);
    const maxCol = Math.min(
      boardDimension - 1,
      Math.floor(boardDimension / 2) + 1
    );
    const minRow = Math.max(0, Math.floor(boardDimension / 2) - 1);
    const maxRow = Math.min(
      boardDimension - 1,
      Math.floor(boardDimension / 2) + 1
    );

    let y = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;
    let x = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;

    while (computerAttackList.has(`${y},${x}`)) {
      y = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;
      x = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;
    }
    return { y, x };
  }

  function handleHit(y, x) {
    //Clear queue since targeted ship sunk
    if (targetedShip.isSunk()) {
      targetQueue = [];
    } else {
      targetedShip = gameboard.board[y][x]; //Update the current targeted ship and queue
      addSurroundingToQueue(y, x);
    }
  }

  function isValidAttack(y, x) {
    return (
      x >= 0 &&
      x < gameboard.board[0].length &&
      y >= 0 &&
      y < gameboard.board.length &&
      !computerAttackList.has(`${y},${x}`)
    );
  }

  function attackSpacesNear() {
    return targetQueue.shift();
  }

  //Check all spaces around hit, add to queue if valid
  function addSurroundingToQueue(y, x) {
    for (let [dy, dx] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      let newY = y + dy;
      let newX = x + dx;
      if (isValidAttack(newY, newX)) {
        targetQueue.push({ newY, newX });
      }
    }
  }

  return player;
};


module.exports = Player;
