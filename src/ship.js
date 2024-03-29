let Ship = function (length) {  const ship = {};

  ship.length = length;
  ship.hitsNumber = 0;
  ship.isSunk = function () {
    return this.hitsNumber >= this.length;
  };
  ship.hit = function () {
    if (!this.isSunk()) {
      this.hitsNumber++;
    }
  };

  return ship;
};

export default Ship;

