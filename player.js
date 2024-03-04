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
    const sigma = 1;

    // Function to generate random number with Gaussian distribution
    function randn_bm() {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    // Calculate mean for Gaussian distribution (middle of the board)
    const middle = Math.floor(boardDimension / 2);

    // Generate random numbers with Gaussian distribution for row and column
    let y = Math.round(middle + randn_bm() * sigma);
    let x = Math.round(middle + randn_bm() * sigma);

    // Ensure that the generated position is within the board boundaries
    y = Math.min(boardDimension - 1, Math.max(0, y));
    x = Math.min(boardDimension - 1, Math.max(0, x));

    // Ensure that the generated position is not already attacked
    while (computerAttackList.has(`${y},${x}`)) {
      // Generate new random numbers with Gaussian distribution
      y = Math.round(middle + randn_bm() * sigma);
      x = Math.round(middle + randn_bm() * sigma);
      // Ensure that the new position is within the board boundaries
      y = Math.min(boardDimension - 1, Math.max(0, y));
      x = Math.min(boardDimension - 1, Math.max(0, x));
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
  player.isAi = ai;

  return player;
};

module.exports = Player;
