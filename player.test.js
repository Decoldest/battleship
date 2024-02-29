const Gameboard = require("./gameboard");
const Player = require("./player");

describe("Player", () => {
  let player;
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard(4);
    player = Player(gameboard);
    gameboard.placeShip(0, 0, 2, "horizontal");
  });

  //Player can attack Enemy
  test("player with enemy gameboard", () => {
    player.attackEnemy(0, 0);
    expect(gameboard.board[0][0].hitsNumber).toBe(1);
  });

  test("computerAttack attacks the enemy", () => {
    gameboardComputerTest = Gameboard(4);
    let computer = Player(gameboardComputerTest, true);

    // Call computerAttack method
    computer.computerAttack();
    expect(gameboardComputerTest.missedAttacks).toBeInstanceOf(Array);
    expect(gameboardComputerTest.missedAttacks.length).toBeGreaterThan(0);
  });
});
