"use strict";

import Ship from "../src/models/ship.js";

test("hit method", () => {
  const shipInstance = new Ship(4);
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.numHits).toBe(3);
});

test("isSunk method (1)", () => {
  const shipInstance = new Ship(4);
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk()).toBe(false);
});

test("isSunk method (2)", () => {
  const shipInstance = new Ship(4);
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();
  shipInstance.hit();

  expect(shipInstance.isSunk()).toBe(true);
});
