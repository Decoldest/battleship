const Ship = require("./ship");

describe("Ship", () => {
  //Test creating ship
  test("creates a ship with length", () => {
    const ship = Ship(2);
    expect(ship.hitsNumber).toBe(0);
    expect(ship.length).toBe(2);
  });

  test("hitsNumber is decremented when ship is it", () => {
    const ship = Ship(4);
    ship.hit();
    expect(ship.hitsNumber).toBe(1);
  });

  test("ship is sunk if hitsNumber equals length", () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
