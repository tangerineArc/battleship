"use strict";

import "./style.css";

import {
  gameScreen,
  board1Cells as board1Cells_DOM,
  randomizeButton,
} from "./dom-cache/game-screen.js";
import { startingScreen, startButton } from "./dom-cache/startingScreen.js";

import GameBoard from "./models/game-board.js";

import {
  BOARD_DIMENSION,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from "./globals/constants.js";

import generateShips from "./utils/ships-loci.js";

const player1Board = new GameBoard();

const player1Ships = generateShips();

for (let i = 0; i < player1Ships.length; i++) {
  player1Board.placeShip(
    player1Ships[i].ship,
    player1Ships[i].startPos,
    player1Ships[i].endPos,
  );
}

renderBoard1();

startButton.addEventListener("click", () => {
  startingScreen.style.display = "none";
  gameScreen.style.display = "flex";
});

randomizeButton.addEventListener("click", () => {
  const player1Ships = generateShips();

  player1Board.clear();
  for (let i = 0; i < player1Ships.length; i++) {
    player1Board.placeShip(
      player1Ships[i].ship,
      player1Ships[i].startPos,
      player1Ships[i].endPos,
    );
  }

  renderBoard1();
});

for (let i = 0; i < BOARD_DIMENSION; i++) {
  for (let j = 0; j < BOARD_DIMENSION; j++) {
    board1Cells_DOM[i][j].addEventListener("dragstart", (event) => {
      if (!player1Board.board[i][j].ship) return;

      const viablePositions = player1Board.getPlaceablePositions(
        player1Board.board[i][j].ship,
      );

      for (let a = 0; a < BOARD_DIMENSION; a++) {
        for (let b = 0; b < BOARD_DIMENSION; b++) {
          if (
            !viablePositions.includes(JSON.stringify([a, b])) &&
            player1Board.board[i][j].ship
          ) {
            board1Cells_DOM[a][b].classList.add("non-viable-cell");
          }
        }
      }

      event.dataTransfer.setData("text/plain", JSON.stringify([i, j]));
    });

    board1Cells_DOM[i][j].addEventListener("dragend", () => {
      for (let a = 0; a < BOARD_DIMENSION; a++) {
        for (let b = 0; b < BOARD_DIMENSION; b++) {
          board1Cells_DOM[a][b].classList.remove("non-viable-cell");
        }
      }
    });

    board1Cells_DOM[i][j].addEventListener("dragenter", (event) => {
      if (player1Board.board[i][j].ship) return;

      event.preventDefault();
      event.target.classList.add("drag-over");
    });

    board1Cells_DOM[i][j].addEventListener("dragover", (event) => {
      if (player1Board.board[i][j].ship) return;

      event.preventDefault();
      event.target.classList.add("drag-over");
    });

    board1Cells_DOM[i][j].addEventListener("dragleave", (event) => {
      if (player1Board.board[i][j].ship) return;

      event.target.classList.remove("drag-over");
    });

    board1Cells_DOM[i][j].addEventListener("drop", (event) => {
      if (player1Board.board[i][j].ship) return;

      event.target.classList.remove("drag-over");

      const currPos = JSON.parse(event.dataTransfer.getData("text/plain"));
      const startPos = getStartPos(currPos[0], currPos[1]);

      const ship = player1Board.board[currPos[0]][currPos[1]].ship;
      const orientation =
        player1Board.board[currPos[0]][currPos[1]].orientation;
      const index = player1Board.board[currPos[0]][currPos[1]].index;

      const viablePositions = player1Board.getPlaceablePositions(ship);

      if (orientation === VERTICAL_ORIENTATION) {
        for (let a = i - index; a <= i - index + ship.dimension - 1; a++) {
          if (!viablePositions.includes(JSON.stringify([a, j]))) {
            return;
          }
        }
      } else {
        for (let a = j - index; a <= j - index + ship.dimension - 1; a++) {
          if (!viablePositions.includes(JSON.stringify([i, a]))) {
            return;
          }
        }
      }

      try {
        if (orientation === VERTICAL_ORIENTATION) {
          player1Board.removeShip(ship);
          player1Board.placeShip(
            ship,
            [i - index, j],
            [i - index + ship.dimension - 1, j],
          );
        } else {
          player1Board.removeShip(ship);
          player1Board.placeShip(
            ship,
            [i, j - index],
            [i, j - index + ship.dimension - 1],
          );
        }
        renderBoard1();
      } catch {
        if (orientation === VERTICAL_ORIENTATION) {
          player1Board.placeShip(ship, startPos, [
            startPos[0] + ship.dimension - 1,
            startPos[1],
          ]);
        } else {
          player1Board.removeShip(ship);
          player1Board.placeShip(ship, startPos, [
            startPos[0],
            startPos[1] + ship.dimension - 1,
          ]);
        }
      }
    });

    board1Cells_DOM[i][j].addEventListener("click", () => {
      if (!player1Board.board[i][j].ship) return;
      changeShipOrientation(i, j);
    });
  }
}

function changeShipOrientation(i, j) {
  const startPos = getStartPos(i, j);

  const viablePositions = player1Board.getPlaceablePositions(
    player1Board.board[i][j].ship,
  );

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
    player1Board.placeShip(ship, startPos, [
      startPos[0] + ship.dimension - 1,
      startPos[1],
    ]);
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
    player1Board.placeShip(ship, startPos, [
      startPos[0],
      startPos[1] + ship.dimension - 1,
    ]);
    renderBoard1();

    player1Board.board[i][j].orientation = HORIZONTAL_ORIENTATION;
  }
}

function getStartPos(i, j) {
  const startPos = [i, j];
  let idx = player1Board.board[i][j].index;
  while (idx--) {
    if (player1Board.board[i][j].orientation === HORIZONTAL_ORIENTATION) {
      startPos[1]--;
    } else {
      startPos[0]--;
    }
  }
  return startPos;
}

function renderBoard1() {
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (player1Board.board[i][j].ship) {
        board1Cells_DOM[i][j].classList.add("ship-cell");
        board1Cells_DOM[i][j].draggable = true;
      } else {
        board1Cells_DOM[i][j].classList.remove("ship-cell");
        board1Cells_DOM[i][j].draggable = false;
      }
    }
  }
}
