"use strict";

import {
  BOARD_DIMENSION,
  ALLOWED_SHIP_DIMENSIONS,
} from "../globals/constants.js";

import Ship from "../models/ship.js";
import GameBoard from "../models/game-board.js";

export default function generateShips() {
  const temporaryBoard = new GameBoard();
  const ships = [];

  let idx = 0;
  let runs = 0;
  while (idx < ALLOWED_SHIP_DIMENSIONS.length && runs < 100) {
    runs++;

    const dimension = ALLOWED_SHIP_DIMENSIONS[idx];
    const ship = new Ship(dimension);

    const viablePositions = temporaryBoard.getPlaceablePositions(ship);
    let rerun = false;

    const orientationFactor = Math.floor(Math.random() * 2);
    if (orientationFactor === 1) {
      // vertical
      const i = Math.floor(Math.random() * (BOARD_DIMENSION - dimension + 1));
      const j = Math.floor(Math.random() * BOARD_DIMENSION);

      const startPos = [i, j];
      const endPos = [i + dimension - 1, j];

      for (let k = startPos[0]; k <= endPos[0]; k++) {
        if (!viablePositions.includes(JSON.stringify([k, j]))) {
          rerun = true;
          break;
        }
      }

      if (rerun) continue;

      ships.push({ ship, startPos, endPos });
      temporaryBoard.placeShip(ship, startPos, endPos);
      idx++;
    } else {
      // horizontal
      const i = Math.floor(Math.random() * BOARD_DIMENSION);
      const j = Math.floor(Math.random() * (BOARD_DIMENSION - dimension + 1));

      const startPos = [i, j];
      const endPos = [i, j + dimension - 1];

      for (let k = startPos[1]; k <= endPos[1]; k++) {
        if (!viablePositions.includes(JSON.stringify([i, k]))) {
          rerun = true;
          break;
        }
      }

      if (rerun) continue;

      ships.push({ ship, startPos, endPos });
      temporaryBoard.placeShip(ship, startPos, endPos);
      idx++;
    }
  }

  if (runs >= 100) {
    return [
      {
        ship: new Ship(5),
        startPos: [0, 5],
        endPos: [0, 9],
      },
      {
        ship: new Ship(4),
        startPos: [5, 8],
        endPos: [8, 8],
      },
      {
        ship: new Ship(3),
        startPos: [7, 5],
        endPos: [9, 5],
      },
      {
        ship: new Ship(3),
        startPos: [2, 5],
        endPos: [2, 7],
      },
      {
        ship: new Ship(2),
        startPos: [2, 2],
        endPos: [3, 2],
      },
    ];
  }

  return ships;
}
