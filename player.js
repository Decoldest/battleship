const Gameboard = require("./gameboard");

let Player = function (gameboard) {
  const player = {};

  const enemyBoard = gameboard;

  player.attackEnemy = function (y, x) {
    enemyBoard.receiveAttack(y, x);
  }

  // player.computerAttack = function () {
    
  // }

  return player;
}

module.exports = Player;

let gameboard = Gameboard(4);
let player = Player(gameboard);
console.log(player);