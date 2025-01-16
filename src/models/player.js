"use strict";

import { ALLOWED_PLAYER_TYPES } from "../globals/constants.js";

export default class Player {
  constructor(type) {
    if (!ALLOWED_PLAYER_TYPES.includes(type)) {
      throw new Error("Invalid player type");
    }

    this.type = type;
    this.gameBoard = null;
    this.ships = null;
    this.hitAudioContext = null;
    this.missAudioContext = null;
  }

  setGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
  }

  setShips(ships) {
    this.ships = ships;
  }

  placeAllShips() {
    const ships = this.ships;
    for (let i = 0; i < ships.length; i++) {
      this.gameBoard.placeShip(
        ships[i].ship,
        ships[i].startPos,
        ships[i].endPos,
      );
    }
  }

  setAudioContext(hitAudio, missAudio) {
    this.hitAudioContext = hitAudio;
    this.missAudioContext = missAudio;
  }
}
