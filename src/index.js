"use strict";

import "./style.css";

import {
  gameScreen,
  board1Cells as board1Cells_DOM,
} from "./dom-cache/game-screen.js";
import { startingScreen, startButton } from "./dom-cache/startingScreen.js";

import GameBoard from "./models/game-board.js";
import Ship from "./models/ship.js";

import {
  BOARD_DIMENSION,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from "./globals/constants.js";

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

renderBoard1();

for (let i = 0; i < BOARD_DIMENSION; i++) {
  for (let j = 0; j < BOARD_DIMENSION; j++) {
    board1Cells_DOM[i][j].addEventListener("click", () => {
      if (!player1Board.board[i][j].ship) return;

      let startPos = [i, j];
      let idx = player1Board.board[i][j].index;
      while (idx--) {
        if (player1Board.board[i][j].orientation === HORIZONTAL_ORIENTATION) {
          startPos[1]--;
        } else {
          startPos[0]--;
        }
      }

      let viablePositions = player1Board.getPlaceablePositions(player1Board.board[i][j].ship);

      if (player1Board.board[i][j].orientation === HORIZONTAL_ORIENTATION) {
        for (
          let a = startPos[0] + 1;
          a < startPos[0] + player1Board.board[i][j].ship.dimension;
          a++
        ) {
          if (!viablePositions.includes(JSON.stringify([a, startPos[1]]))) {
            return;
          }
        }

        const ship = player1Board.board[i][j].ship;
        player1Board.removeShip(ship);
        player1Board.placeShip(
          ship,
          startPos,
          [startPos[0] + ship.dimension - 1, startPos[1]],
        );
        renderBoard1();

        player1Board.board[i][j].orientation = VERTICAL_ORIENTATION;
      } else {
        for (
          let a = startPos[1] + 1;
          a < startPos[1] + player1Board.board[i][j].ship.dimension;
          a++
        ) {
          if (!viablePositions.includes(JSON.stringify([startPos[0], a]))) {
            return;
          }
        }

        const ship = player1Board.board[i][j].ship;
        player1Board.removeShip(ship);
        player1Board.placeShip(
          ship,
          startPos,
          [startPos[0], startPos[1] + ship.dimension - 1],
        );
        renderBoard1();

        player1Board.board[i][j].orientation = HORIZONTAL_ORIENTATION;
      }
    });
  }
}

function renderBoard1() {
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (player1Board.board[i][j].ship) {
        board1Cells_DOM[i][j].classList.add("ship-cell");
      } else {
        board1Cells_DOM[i][j].classList.remove("ship-cell");
      }
    }
  }
}
