const Ship = require("./ship");

let Gameboard = function (dimension) {
  let gameboard = {};
  gameboard.board = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(null));

  gameboard.placeShip = function (
    x,
    y,
    length,
    orientation
  ) {
    const newShip = Ship(length);

    if (orientation === "horizontal") {
      for (let i = x; i < length; i++) {
        gameboard.board[y][i] = newShip;
      }
    } else {
      for (let i = y; i < length; i++) {
        gameboard.board[i][x] = newShip;
      }
    }
  };

  return gameboard;
};

module.exports = Gameboard;