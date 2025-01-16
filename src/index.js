"use strict";

import "./style.css";

import {
  gameScreen,
  board1Cells as board1Cells_DOM,
  board2Cells as board2Cells_DOM,
  randomizeButton,
  resetButton,
} from "./dom-cache/game-screen.js";
import { startingScreen, startButton } from "./dom-cache/startingScreen.js";

import GameBoard from "./models/game-board.js";
import Game from "./models/game.js";

import {
  BOARD_DIMENSION,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from "./globals/constants.js";

import generateShips from "./utils/ships-loci.js";
import Player from "./models/player.js";

const player1 = new Player("HUMAN");
const player2 = new Player("BOT");

const game = new Game(player1, player2);
game.start();

player1.setGameBoard(new GameBoard());
player2.setGameBoard(new GameBoard());

player1.setShips(generateShips());
player2.setShips(generateShips());

player1.placeAllShips();
player2.placeAllShips();

renderBoard(player1, board1Cells_DOM);

startButton.addEventListener("click", () => {
  startingScreen.style.display = "none";
  gameScreen.style.display = "flex";
});

resetButton.addEventListener("click", () => {
  player1.gameBoard.clear();
  player1.setShips(generateShips());
  player1.placeAllShips();
  renderBoard(player1, board1Cells_DOM);

  player2.gameBoard.clear();
  player2.setShips(generateShips());
  player2.placeAllShips();
  clearBoard(board2Cells_DOM);
});

randomizeButton.addEventListener("click", () => {
  player1.gameBoard.clear();
  player1.setShips(generateShips());
  player1.placeAllShips();
  renderBoard(player1, board1Cells_DOM);
});

for (let i = 0; i < BOARD_DIMENSION; i++) {
  for (let j = 0; j < BOARD_DIMENSION; j++) {
    const cell_DOM = board1Cells_DOM[i][j];

    cell_DOM.addEventListener("dragstart", (event) => {
      const cell = player1.gameBoard.board[i][j];

      if (!cell.ship) return;

      const viablePositions = player1.gameBoard.getPlaceablePositions(
        cell.ship,
      );

      for (let a = 0; a < BOARD_DIMENSION; a++) {
        for (let b = 0; b < BOARD_DIMENSION; b++) {
          if (!viablePositions.includes(JSON.stringify([a, b])) && cell.ship) {
            board1Cells_DOM[a][b].classList.add("non-viable-cell");
          }
        }
      }

      event.dataTransfer.setData("text/plain", JSON.stringify([i, j]));
    });

    cell_DOM.addEventListener("dragend", () => {
      for (let a = 0; a < BOARD_DIMENSION; a++) {
        for (let b = 0; b < BOARD_DIMENSION; b++) {
          board1Cells_DOM[a][b].classList.remove("non-viable-cell");
        }
      }
    });

    cell_DOM.addEventListener("dragenter", (event) => {
      if (player1.gameBoard.board[i][j].ship) return;

      event.preventDefault();
      event.target.classList.add("drag-over");
    });

    cell_DOM.addEventListener("dragover", (event) => {
      if (player1.gameBoard.board[i][j].ship) return;

      event.preventDefault();
      event.target.classList.add("drag-over");
    });

    cell_DOM.addEventListener("dragleave", (event) => {
      if (player1.gameBoard.board[i][j].ship) return;

      event.target.classList.remove("drag-over");
    });

    cell_DOM.addEventListener("drop", (event) => {
      if (player1.gameBoard.board[i][j].ship) return;

      event.target.classList.remove("drag-over");

      let currPos;
      try {
        currPos = JSON.parse(event.dataTransfer.getData("text/plain"));

        if (!validatePosition(currPos)) {
          throw new Error("Invalid data");
        }
      } catch {
        return;
      }

      const startPos = getStartPos(currPos[0], currPos[1], player1.gameBoard);

      const ship = player1.gameBoard.board[currPos[0]][currPos[1]].ship;
      const orientation =
        player1.gameBoard.board[currPos[0]][currPos[1]].orientation;
      const index = player1.gameBoard.board[currPos[0]][currPos[1]].index;

      const viablePositions = player1.gameBoard.getPlaceablePositions(ship);

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
        let pos1, pos2;
        if (orientation === VERTICAL_ORIENTATION) {
          pos1 = [i - index, j];
          pos2 = [i - index + ship.dimension - 1, j];
        } else {
          pos1 = [i, j - index];
          pos2 = [i, j - index + ship.dimension - 1];
        }

        player1.gameBoard.removeShip(ship);
        player1.gameBoard.placeShip(ship, pos1, pos2);
        renderBoard(player1, board1Cells_DOM);
      } catch {
        const endPos = getEndPos(startPos, ship, orientation);
        player1.gameBoard.placeShip(ship, startPos, endPos);
      }
    });

    cell_DOM.addEventListener("click", () => {
      if (!player1.gameBoard.board[i][j].ship) return;
      changeShipOrientation(i, j);
    });
  }
}

for (let i = 0; i < BOARD_DIMENSION; i++) {
  for (let j = 0; j < BOARD_DIMENSION; j++) {
    board2Cells_DOM[i][j].addEventListener("click", (event) => {
      const classList = event.target.classList;
      const cell = player2.gameBoard.board[i][j];

      if (cell.isHit || classList.contains("disabled-cell")) return;

      player2.gameBoard.receiveAttack([i, j]);

      if (cell.ship) classList.add("dead-cell");
      else classList.add("missed-cell");

      if (cell.ship?.isSunk()) {
        const startPos = getStartPos(i, j, player2.gameBoard);
        const endPos = getEndPos(startPos, cell.ship, cell.orientation);
        markInvalidCells(startPos, endPos, player2.gameBoard);
      }
    });
  }
}

function markInvalidCells(startPos, endPos, boardInstance) {
  for (
    let i = Math.max(0, startPos[0] - 1);
    i <= Math.min(BOARD_DIMENSION - 1, endPos[0] + 1);
    i++
  ) {
    for (
      let j = Math.max(0, startPos[1] - 1);
      j <= Math.min(BOARD_DIMENSION - 1, endPos[1] + 1);
      j++
    ) {
      const cell = boardInstance.board[i][j];
      if (cell.ship || cell.isHit) continue;

      board2Cells_DOM[i][j].classList.add("disabled-cell");
    }
  }
}

function changeShipOrientation(i, j) {
  const cell = player1.gameBoard.board[i][j];
  const ship = cell.ship;

  const startPos = getStartPos(i, j, player1.gameBoard);

  const viablePositions = player1.gameBoard.getPlaceablePositions(ship);

  if (cell.orientation === HORIZONTAL_ORIENTATION) {
    for (let a = startPos[0] + 1; a < startPos[0] + ship.dimension; a++) {
      if (!viablePositions.includes(JSON.stringify([a, startPos[1]]))) return;
    }

    cell.orientation = VERTICAL_ORIENTATION;
  } else {
    for (let a = startPos[1] + 1; a < startPos[1] + ship.dimension; a++) {
      if (!viablePositions.includes(JSON.stringify([startPos[0], a]))) return;
    }

    cell.orientation = HORIZONTAL_ORIENTATION;
  }

  const endPos = getEndPos(startPos, ship, cell.orientation);

  player1.gameBoard.removeShip(ship);
  player1.gameBoard.placeShip(ship, startPos, endPos);

  renderBoard(player1, board1Cells_DOM);
}

function getStartPos(i, j, boardInstance) {
  const cell = boardInstance.board[i][j];
  return cell.orientation === VERTICAL_ORIENTATION
    ? [i - cell.index, j]
    : [i, j - cell.index];
}

function getEndPos(startPos, ship, orientation) {
  return orientation === VERTICAL_ORIENTATION
    ? [startPos[0] + ship.dimension - 1, startPos[1]]
    : [startPos[0], startPos[1] + ship.dimension - 1];
}

function renderBoard(playerInstance, boardCells_DOM) {
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (playerInstance.gameBoard.board[i][j].ship) {
        boardCells_DOM[i][j].classList.add("ship-cell");
        boardCells_DOM[i][j].draggable = true;
      } else {
        boardCells_DOM[i][j].classList.remove("ship-cell");
        boardCells_DOM[i][j].draggable = false;
      }
    }
  }
}

function clearBoard(boardCells_DOM) {
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      const classList = boardCells_DOM[i][j].classList;
      classList.remove("dead-cell");
      classList.remove("missed-cell");
      classList.remove("disabled-cell");
    }
  }
}

function validatePosition(pos) {
  if (!(pos instanceof Array)) return false;

  if (pos.length !== 2) return false;

  const [i, j] = pos;
  if (i < 0 || i >= BOARD_DIMENSION || j < 0 || j >= BOARD_DIMENSION)
    return false;

  return true;
}
