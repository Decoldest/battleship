import Ship from './ship'
let Gameboard = function (dimension) {
  const gameboard = {};
  gameboard.board = new Array(dimension)
    .fill(null)
    .map(() => new Array(dimension).fill(null));

  gameboard.missedAttacks = [];
  gameboard.hitAttacks = [];
  gameboard.shipList = [];

  //Place ship if coordinates are valid
  gameboard.placeShip = function (y, x, length, orientation) {
    if (
      !isValidCoordinate(y, x, length) ||
      !coordinatesFree(y, x, length, orientation)
    ) {
      return false;
    }

    const newShip = Ship(length);
    gameboard.shipList.push(newShip);

    if (orientation === "horizontal") {
      placeShipHorizontally(y, x, length, newShip);
    } else {
      placeShipVertically(y, x, length, newShip);
    }
    console.log(this.board);
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

  function placeShipHorizontally(y, x, length, newShip) {
    for (let i = x; i < x + length; i++) {
      gameboard.board[y][i] = newShip;
    }
  }

  function placeShipVertically(y, x, length, newShip) {
    for (let i = y; i < y + length; i++) {
      gameboard.board[i][x] = newShip;
    }
  }

  //Returns false if missed, true if hit
  gameboard.receiveAttack = function (y, x) {
    const shipThere = gameboard.board[y][x];

    if (!shipThere) {
      gameboard.missedAttacks.push({ y, x });
      return false;
    }

    shipThere.hit();
    console.log("hit");
    gameboard.hitAttacks.push({ y, x });
    return true;
  };

  gameboard.areAllSunk = function () {
    return gameboard.shipList.every((ship) => ship.isSunk());
  };

  gameboard.getBoard = function () {
    return gameboard.board;
  }

  return gameboard;
};

export default Gameboard;
