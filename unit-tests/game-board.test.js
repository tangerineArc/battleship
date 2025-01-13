"use strict";

import GameBoard from "../src/models/game-board.js";
import Ship from "../src/models/ship.js";

const boardDimension = 10;

test("getMissedAttackPositions (1)", () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(5);

  const ocean = new GameBoard();
  ocean.placeShip(ship2, [1, 3], [1, 4]);
  ocean.placeShip(ship3, [4, 6], [6, 6]);
  ocean.placeShip(ship4, [6, 1], [9, 1]);
  ocean.placeShip(ship5, [0, 0], [0, 4]);

  ocean.receiveAttack([1, 1]);
  expect(ocean.getMissedAttackPositions()).toEqual([[1, 1]]);
});

test("getMissedAttackPositions (2)", () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(5);

  const ocean = new GameBoard();
  ocean.placeShip(ship2, [1, 3], [1, 4]);
  ocean.placeShip(ship3, [4, 6], [6, 6]);
  ocean.placeShip(ship4, [6, 1], [9, 1]);
  ocean.placeShip(ship5, [0, 0], [0, 4]);

  ocean.receiveAttack([1, 1]);
  ocean.receiveAttack([0, 0]);
  ocean.receiveAttack([5, 6]);
  expect(ocean.getMissedAttackPositions()).toEqual([[1, 1]]);
});

test("getMissedAttackPositions (3)", () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(5);

  const ocean = new GameBoard();
  ocean.placeShip(ship2, [1, 3], [1, 4]);
  ocean.placeShip(ship3, [4, 6], [6, 6]);
  ocean.placeShip(ship4, [6, 1], [9, 1]);
  ocean.placeShip(ship5, [0, 0], [0, 4]);

  ocean.receiveAttack([1, 1]);
  ocean.receiveAttack([0, 0]);
  ocean.receiveAttack([5, 6]);
  ocean.receiveAttack([2, 2]);
  expect(ocean.getMissedAttackPositions()).toEqual([
    [1, 1],
    [2, 2],
  ]);
});

test("areAllShipsSunk (1)", () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(5);

  const ocean = new GameBoard();
  ocean.placeShip(ship2, [1, 3], [1, 4]);
  ocean.placeShip(ship3, [4, 6], [6, 6]);
  ocean.placeShip(ship4, [6, 1], [9, 1]);
  ocean.placeShip(ship5, [0, 0], [0, 4]);

  ocean.receiveAttack([1, 1]);
  ocean.receiveAttack([0, 0]);
  ocean.receiveAttack([5, 6]);
  ocean.receiveAttack([2, 2]);
  expect(ocean.areAllShipsSunk()).toBe(false);
});

test("areAllShipsSunk (2)", () => {
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);
  const ship4 = new Ship(4);
  const ship5 = new Ship(5);

  const ocean = new GameBoard();
  ocean.placeShip(ship2, [1, 3], [1, 4]);
  ocean.placeShip(ship3, [4, 6], [6, 6]);
  ocean.placeShip(ship4, [6, 1], [9, 1]);
  ocean.placeShip(ship5, [0, 0], [0, 4]);

  for (let i = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++) {
      ocean.receiveAttack([i, j]);
    }
  }

  expect(ocean.areAllShipsSunk()).toBe(true);
});
