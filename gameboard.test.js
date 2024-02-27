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

  test("place ship on gameboard", () => {
    const gameboard = Gameboard(2);
    gameboard.placeShip(0, 0, 2, 'horizontal');
    expect(gameboard.board[0][0]).toBeDefined();
    expect(gameboard.board[0][1]).toBeDefined();
  });
});
