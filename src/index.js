"use strict";

import "./style.css";

import {
  gameScreen,
  board1Cells as board1Cells_DOM
} from "./dom-cache/game-screen.js";
import { startingScreen, startButton } from "./dom-cache/startingScreen.js";

import GameBoard from "./models/game-board.js";
import Ship from "./models/ship.js";

import { BOARD_DIMENSION } from "./globals/constants.js";

startButton.addEventListener("click", () => {
  startingScreen.style.display = "none";
  gameScreen.style.display = "flex";
});

const player1Ships = [
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

const player1Board = new GameBoard();

for (let i = 0; i < player1Ships.length; i++) {
  player1Board.placeShip(
    player1Ships[i].ship,
    player1Ships[i].startPos,
    player1Ships[i].endPos,
  );
}

for (let i = 0; i < BOARD_DIMENSION; i++) {
  for (let j = 0; j < BOARD_DIMENSION; j++) {
    if (player1Board.board[i][j].ship) {
      board1Cells_DOM[i][j].classList.add("ship-cell");
    }
  }
}
