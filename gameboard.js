const Ship = require("./ship");

let Gameboard = function (dimension) {
  let gameboard = {};
  gameboard.board = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(null));

  gameboard.placeShip = function (y, x, length, orientation) {
    if (!isValidCoordinate(y, x, length, orientation)) {
      return false;
    }

    if (!coordinatesFree(y, x, length, orientation)) {
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

  function isValidCoordinate(y, x, length, orientation) {
    return (
      x >= 0 &&
      x + length < gameboard.board[0].length &&
      y >= 0 &&
      y + length < gameboard.board.length &&
      length > 0
    );
  }

  function coordinatesFree(y, x, length, orientation) {
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

  return gameboard;
};

const gameboard = Gameboard(4);
gameboard.placeShip(1, 0, 2, "horizontal");
gameboard.placeShip(0, 1, 2, "vertical");

console.log(gameboard.board);
module.exports = Gameboard;
