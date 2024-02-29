const Gameboard = require("./gameboard");

let Player = function (gameboard, ai = false) {
  const player = {};

  const enemyBoard = gameboard;
  const boardDimension = gameboard.length;
  const computerAttackList = ai ? new Set() : null;

  player.attackEnemy = function (y, x) {
    enemyBoard.receiveAttack(y, x);
  };

  player.computerAttack = function () {};

  //Targets the middle of the board
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
      let y = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;
      let x = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;
    }
    computerAttackList.add(`${y},${x}`);
    return { y, x };
  }

  return player;
};

module.exports = Player;

let gameboard = Gameboard(4);
let player = Player(gameboard);
console.log(player);
