"use strict";

import { BOARD_DIMENSION } from "../globals/constants.js";

export default class GameBoard {
  constructor() {
    const board = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      const row = [];
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        row.push({ ship: null, isHit: false });
      }
      board.push(row);
    }

    this.board = board;
  }

  placeShip(ship, startPos, endPos) {
    if (startPos[0] > endPos[0] || startPos[1] > endPos[1]) {
      throw new Error("Invalid start and end positions");
    }

    if (startPos[0] === endPos[0]) {
      if (ship.dimension !== endPos[1] - startPos[1] + 1) {
        throw new Error("Incompatible ship and positions");
      }

      for (let i = startPos[1]; i <= endPos[1]; i++) {
        this.board[startPos[0]][i].ship = ship;
      }
    } else if (startPos[1] === endPos[1]) {
      if (ship.dimension !== endPos[0] - startPos[0] + 1) {
        throw new Error("Incompatible ship and positions");
      }

      for (let i = startPos[0]; i <= endPos[0]; i++) {
        this.board[i][startPos[1]].ship = ship;
      }
    }
  }

  receiveAttack([i, j]) {
    const pos = this.board[i][j];
    if (!pos.isHit) {
      if (pos.ship) this.board[i][j].ship.hit();
      this.board[i][j].isHit = true;
    }
  }

  getMissedAttackPositions() {
    const positions = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        if (this.board[i][j].ship === null && this.board[i][j].isHit) {
          positions.push([i, j]);
        }
      }
    }
    return positions;
  }

  areAllShipsSunk() {
    let res = true;
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        if (this.board[i][j].ship !== null && !this.board[i][j].isHit) {
          res = false;
          break;
        }
      }
    }
    return res;
  }
}
