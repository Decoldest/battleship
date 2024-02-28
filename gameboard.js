const Ship = require("./ship");

let Gameboard = function (dimension) {
  let gameboard = {};
  gameboard.board = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(null));

  gameboard.missedShots = [];
  gameboard.shipList = [];

  gameboard.placeShip = function (y, x, length, orientation) {
    if (!isValidCoordinate(y, x, length)) {
      return false;
    }

    if (!coordinatesFree(y, x, length, orientation)) {
      return false;
    }
    const newShip = Ship(length);
    gameboard.shipList.push(newShip);

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

  function isValidCoordinate(y, x, length) {
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

  gameboard.receiveAttack = function (y, x) {
    const shipThere = gameboard.board[y][x];

    if (!shipThere) {
      gameboard.missedShots.push({ y, x });
      return false;
    }

    shipThere.hit();
  };

  gameboard.areAllSunk = function () {
    return gameboard.shipList.every((ship) => ship.isSunk());
  };

  return gameboard;
};


module.exports = Gameboard;
