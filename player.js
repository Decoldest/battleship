const Gameboard = require("./gameboard");

let Player = function (gameboard, ai = false) {
  const player = {};

  const enemyBoard = gameboard;
  const boardDimension = gameboard.board.length;
  const computerAttackList = ai ? new Set() : null;
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
    let didMoveHit = enemyBoard.receiveAttack(y, x);
    if (didMoveHit) {
      addHitToSearchQueue(y, x);
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
  return player;

  function addHitToSearchQueue(y, x) {
    for (let [dy, dx] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      let newY = y + dy;
      let newX = x + dx;
      if (isValidAttack(newY, newX)) {
        targetQueue.push({newY, newX});
      }
  }
  }
};

gameboardComputerTest = Gameboard(10);
let computer = Player(gameboardComputerTest, true);
computer.computerAttack();
console.log(computer.computerAttackList);

module.exports = Player;
