const Gameboard = require("./gameboard");

describe("Gameboard", () => {
  //Test creating gameboard
  test("gameboard of given dimension", () => {
    const gameboard = Gameboard(4);
    expect(gameboard.board).toStrictEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });

  test("place ships on gameboard vertically and horizontally", () => {
    const gameboard = Gameboard(4);

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
    const gameboard = Gameboard(4);

    //Invalid x
    expect(gameboard.placeShip(-1, 0, 1, "horizontal")).toEqual(false);
    //No length
    expect(gameboard.placeShip(2, 0, 0, "vertical")).toEqual(false);
    //Invalid y
    expect(gameboard.placeShip(2, 4, 1, "vertical")).toEqual(false);
    //Out of bounds
    expect(gameboard.placeShip(2, 2, 4, "horizontal")).toEqual(false);
  });

  //coordinatesFree check 
  test("ship cannot be placed where ship already exists", () => {
    const gameboard = Gameboard(4);
    gameboard.placeShip(1, 0, 2, "horizontal");
    expect(gameboard.placeShip(0, 1, 2, "vertical")).toEqual(false);
  });
});
