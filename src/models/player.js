"use strict";

export default class Player {
  constructor(type) {
    if (type !== "BOT" && type !== "HUMAN") {
      throw new Error("Invalid player type");
    }

    this.type = type;
    this.gameBoard = null;
  }

  setGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
  }
}
