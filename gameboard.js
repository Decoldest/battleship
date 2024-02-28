const Ship = require("./ship");

let Gameboard = function (dimension) {
  let gameboard = {};
  gameboard.board = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(null));

  gameboard.placeShip = function (x, y, length, orientation) {
    if (!isValidCoordinate(x, y, length, orientation)) {
      return false;
    }

    if (!coordinatesFree(x, y, length, orientation)) {
      return false;
    }
    const newShip = Ship(length);

    if (orientation === "horizontal") {
      for (let i = x; i < x + length; i++) {
        gameboard.board[y][i] = newShip;
      }
    } else {
      for (let i = y; i < y + length; i++) {
        gameboard.board[i][x] = newShip;
      }
    }
  };

  function coordinatesFree(x, y, length, orientation) {
    if (orientation === "horizontal") {
      for (let i = x; i < x + length; i++) {
        if (gameboard.board[y][i] !== null) {
          return false;
        }
      }
    } else {
      for (let i = y; i < y + length; i++) {
        if (gameboard.board[i][x] !== null) {
          return false;
        }
      }
    }
    return true;
  }
  function isValidCoordinate(x, y, length, orientation) {
    if (orientation === "horizontal") {
      return x >= 0 && x + length < gameboard.board[0].length && length > 0;
    } else {
      return y >= 0 && y + length < gameboard.board.length && length > 0;
    }
  }

  return gameboard;
};

module.exports = Gameboard;
