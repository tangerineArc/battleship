"use strict";

import { BOARD_DIMENSION } from "../globals/constants.js";

export default function generateAttackPosition(board, cells_DOM) {
  while (true) {
    const i = Math.floor(Math.random() * BOARD_DIMENSION);
    const j = Math.floor(Math.random() * BOARD_DIMENSION);

    if (
      board[i][j].isHit ||
      cells_DOM[i][j].classList.contains("disabled-cell")
    )
      continue;
    return [i, j];
  }
}
