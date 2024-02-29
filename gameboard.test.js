const Gameboard = require("./gameboard");

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard(4);
  });
  //Test creating gameboard
  test("gameboard of given dimension", () => {
    expect(gameboard.board).toStrictEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });

  test("place ships on gameboard vertically and horizontally", () => {

    //Should not be null at horizontally placed coordinates
    gameboard.placeShip(0, 0, 2, "horizontal");
    expect(gameboard.board[0][0]).toBeDefined();
    expect(gameboard.board[0][1]).toBeDefined();

    //Should have objects at gameboard.board[1][1] and gameboard.board[2][1]
    gameboard.placeShip(1, 1, 2, "vertical");
    expect(gameboard.board[1][1]).toEqual(
      expect.objectContaining({
        length: 2,
        hitsNumber: 0,
        isSunk: expect.any(Function),
        hit: expect.any(Function),
      })
    );
    expect(gameboard.board[2][1]).toEqual(
      expect.objectContaining({
        length: 2,
        hitsNumber: 0,
        isSunk: expect.any(Function),
        hit: expect.any(Function),
      })
    );
  });

  //isValidCoordinate testing
  test("do not allow ship placement if invalid coordinate or length", () => {

    //Invalid x
    expect(gameboard.placeShip(-1, 0, 1, "horizontal")).toBe(false);
    //No length
    expect(gameboard.placeShip(2, 0, 0, "vertical")).toBe(false);
    //Invalid y
    expect(gameboard.placeShip(2, 4, 1, "vertical")).toBe(false);
    //Out of bounds
    expect(gameboard.placeShip(2, 2, 4, "horizontal")).toBe(false);
  });

  //coordinatesFree check
  test("ship cannot be placed where ship already exists", () => {
    gameboard.placeShip(1, 0, 2, "horizontal");
    expect(gameboard.placeShip(0, 1, 2, "vertical")).toBe(false);
  });

  //Attacks on board
  test("check if ship hit and take damage if true", () => {
    gameboard.placeShip(1, 1, 2, "horizontal");
    //Missed shot
    expect(gameboard.receiveAttack(2, 2)).toBe(false);
    expect(gameboard.missedAttacks).toEqual([{ y: 2, x: 2 }]);

    //Hit check
    gameboard.receiveAttack(1, 1);
    expect(gameboard.board[1][1].hitsNumber).toBe(1);
  });

  test("gameboard returns true if all ships sunk", () => {
    gameboard.placeShip(0, 0, 1, "horizontal");
    gameboard.placeShip(1, 1, 1, "horizontal");
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 1);
    expect(gameboard.areAllSunk()).toBe(true);
  });
});
