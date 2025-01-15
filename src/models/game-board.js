"use strict";

import {
  BOARD_DIMENSION,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from "../globals/constants.js";

export default class GameBoard {
  constructor() {
    const board = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      const row = [];
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        row.push({
          ship: null,
          isHit: false,
          index: null,
          orientation: null,
        });
      }
      board.push(row);
    }

    this.board = board;
  }

  clear() {
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        this.board[i][j].ship = null;
        this.board[i][j].isHit = false;
        this.board[i][j].index = null;
        this.board[i][j].orientation = null;
      }
    }
  }

  placeShip(ship, startPos, endPos) {
    if (
      startPos[0] > endPos[0] ||
      startPos[1] > endPos[1] ||
      endPos[0] >= BOARD_DIMENSION ||
      endPos[1] >= BOARD_DIMENSION ||
      startPos[0] < 0 ||
      startPos[1] < 0
    ) {
      throw new Error("Invalid start and end positions");
    }

    let index = 0;

    if (startPos[0] === endPos[0]) {
      if (ship.dimension !== endPos[1] - startPos[1] + 1) {
        throw new Error("Incompatible ship and positions");
      }

      for (let i = startPos[1]; i <= endPos[1]; i++) {
        this.board[startPos[0]][i].ship = ship;
        this.board[startPos[0]][i].index = index++;
        this.board[startPos[0]][i].orientation = HORIZONTAL_ORIENTATION;
      }
    } else if (startPos[1] === endPos[1]) {
      if (ship.dimension !== endPos[0] - startPos[0] + 1) {
        throw new Error("Incompatible ship and positions");
      }

      for (let i = startPos[0]; i <= endPos[0]; i++) {
        this.board[i][startPos[1]].ship = ship;
        this.board[i][startPos[1]].index = index++;
        this.board[i][startPos[1]].orientation = VERTICAL_ORIENTATION;
      }
    }
  }

  removeShip(ship) {
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        if (this.board[i][j].ship === ship) {
          this.board[i][j].ship = null;
          this.board[i][j].index = null;
          this.board[i][j].orientation = null;
        }
      }
    }
  }

  getPlaceablePositions(ship) {
    const positions = [];
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        const cell = this.board[i][j];
        if (
          !(
            (cell.ship && cell.ship !== ship) ||
            (this.board[i][j + 1]?.ship &&
              this.board[i][j + 1]?.ship !== ship) ||
            (this.board[i][j - 1]?.ship &&
              this.board[i][j - 1]?.ship !== ship) ||
            (this.board[i + 1] &&
              this.board[i + 1][j].ship &&
              this.board[i + 1][j].ship !== ship) ||
            (this.board[i - 1] &&
              this.board[i - 1][j].ship &&
              this.board[i - 1][j].ship !== ship) ||
            (this.board[i + 1] &&
              this.board[i + 1][j + 1]?.ship &&
              this.board[i + 1][j + 1]?.ship !== ship) ||
            (this.board[i + 1] &&
              this.board[i + 1][j - 1]?.ship &&
              this.board[i + 1][j - 1]?.ship !== ship) ||
            (this.board[i - 1] &&
              this.board[i - 1][j + 1]?.ship &&
              this.board[i - 1][j + 1]?.ship !== ship) ||
            (this.board[i - 1] &&
              this.board[i - 1][j - 1]?.ship &&
              this.board[i - 1][j - 1]?.ship !== ship)
          )
        ) {
          positions.push(JSON.stringify([i, j]));
        }
      }
    }
    return positions;
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
