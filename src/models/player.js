"use strict";

import { ALLOWED_PLAYER_TYPES } from "../globals/constants.js";

export default class Player {
  constructor(type) {
    if (ALLOWED_PLAYER_TYPES.includes(type)) {
      throw new Error("Invalid player type");
    }

    this.type = type;
    this.gameBoard = null;
  }

  setGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
  }
}
