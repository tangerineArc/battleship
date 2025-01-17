"use strict";

import { BOARD_DIMENSION } from "../globals/constants.js";

const horizontalHits = [];
const verticalHits = [];

export default function generateAttackPosition(board, cells_DOM, gameInstance) {
  if (gameInstance.doCleanUp) {
    horizontalHits.length = 0;
    verticalHits.length = 0;
  }

  if (horizontalHits.length !== 0) {
    const [i, j] = horizontalHits.at(-1);

    if (!board[i][j].ship.isSunk()) {
      if (
        j + 1 < BOARD_DIMENSION &&
        !board[i][j + 1].isHit &&
        !cells_DOM[i][j + 1].classList.contains("disabled-cell")
      ) {
        if (cells_DOM[i][j + 1].classList.contains("ship-cell")) {
          horizontalHits.push([i, j + 1]);
        } else {
          horizontalHits.length = 1;
        }
        return [i, j + 1];
      }

      if (
        j - 1 >= 0 &&
        !board[i][j - 1].isHit &&
        !cells_DOM[i][j - 1].classList.contains("disabled-cell")
      ) {
        if (cells_DOM[i][j - 1].classList.contains("ship-cell")) {
          horizontalHits.push([i, j - 1]);
        } else {
          horizontalHits.length = 1;
        }
        return [i, j - 1];
      }
    } else {
      horizontalHits.length = 0;
    }
  }

  if (verticalHits.length !== 0) {
    const [i, j] = verticalHits.at(-1);

    if (!board[i][j].ship.isSunk()) {
      if (
        i + 1 < BOARD_DIMENSION &&
        !board[i + 1][j].isHit &&
        !cells_DOM[i + 1][j].classList.contains("disabled-cell")
      ) {
        if (cells_DOM[i + 1][j].classList.contains("ship-cell")) {
          verticalHits.push([i + 1, j]);
        } else {
          verticalHits.length = 1;
        }
        return [i + 1, j];
      }

      if (
        i - 1 >= 0 &&
        !board[i - 1][j].isHit &&
        !cells_DOM[i - 1][j].classList.contains("disabled-cell")
      ) {
        if (cells_DOM[i - 1][j].classList.contains("ship-cell")) {
          verticalHits.push([i - 1, j]);
        } else {
          verticalHits.length = 1;
        }
        return [i - 1, j];
      }
    } else {
      verticalHits.length = 0;
    }
  }

  while (true) {
    const i = Math.floor(Math.random() * BOARD_DIMENSION);
    const j = Math.floor(Math.random() * BOARD_DIMENSION);

    if (
      board[i][j].isHit ||
      cells_DOM[i][j].classList.contains("disabled-cell")
    )
      continue;

    if (cells_DOM[i][j].classList.contains("ship-cell")) {
      horizontalHits.push([i, j]);
      verticalHits.push([i, j]);
    }
    return [i, j];
  }
}
