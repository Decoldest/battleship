let Player = function (gameboard, ai = false) {
  const player = {};

  const enemyBoard = gameboard;
  const boardDimension = gameboard.board.length;
  const computerAttackList = ai ? new Set() : null;
  const computerShips = [5, 4, 3, 3, 2];

  //Queue to search adjacent spaces in case of a hit
  let targetQueue = [];
  //If ship has been hit, target until sunk
  let targetedShip = null;

  //Get coordinates and send attack to enemy
  player.attackEnemy = function (y, x) {
    return enemyBoard.receiveAttack(y, x);
  };

  //Computer chooses between random or logical attack
  player.computerAttack = function () {
    let { y, x } = !targetQueue.length ? randomMove() : attackSpacesNear();

    computerAttackList.add(`${y},${x}`);
    let didMoveHit = enemyBoard.receiveAttack(y, x);
    if (didMoveHit) {
      handleHit(y, x);
    }
    return { coordinates: `${y},${x}`, didMoveHit };
  };

  function randomMove() {
    let y = Math.floor(Math.random() * boardDimension);
    let x = Math.floor(Math.random() * boardDimension);
  
    // Ensure that the generated position is not already attacked
    while (computerAttackList.has(`${y},${x}`)) {
      // Generate new random coordinates
      y = Math.floor(Math.random() * boardDimension);
      x = Math.floor(Math.random() * boardDimension);
    }
    
    return { y, x };
  }
  

  function handleHit(y, x) {
    targetedShip = gameboard.board[y][x]; //Update the current targeted ship and queue
    addSurroundingToQueue(y, x);

    if (targetedShip.isSunk()) {
      targetQueue = [];
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
        targetQueue.push({ y: newY, x: newX });
      }
    }
  }

  player.computerAddShips = function () {
    console.log("LEN ", computerShips.length);

    while (computerShips.length) {
      const shipLength = computerShips.pop();
      let isValidPlacement = false;
      console.log(shipLength);
      // Continue trying to place the ship until a valid placement is found
      while (!isValidPlacement) {
        // Generate random coordinates for the ship
        const y = Math.floor(Math.random() * boardDimension);
        const x = Math.floor(Math.random() * boardDimension);

        // Generate random orientation for the ship
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

        // Attempt to place the ship on the gameboard
        isValidPlacement = gameboard.placeShip(y, x, shipLength, orientation);
      }
    }
  };

  player.isAi = ai;

  return player;
};

export default Player;
