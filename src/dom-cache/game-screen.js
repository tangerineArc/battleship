"use strict";

const gameScreen = document.querySelector("#game-screen");

const boardsContainer = gameScreen.querySelector(":scope > #boards-container");

const board1 = boardsContainer.querySelector("#board-1");
const board1Rows = board1.querySelectorAll(":scope > .row");
const board1Cells = [];
board1Rows.forEach((row) => {
  board1Cells.push(row.querySelectorAll(":scope > .cell"));
});

const board2 = boardsContainer.querySelector("#board-2");
const board2Rows = board2.querySelectorAll(":scope > .row");
const board2Cells = [];
board2Rows.forEach((row) => {
  board2Cells.push(row.querySelectorAll(":scope > .cell"));
});

const randomizeButton = gameScreen.querySelector("#randomize-button");

const resetButton = gameScreen.querySelector("#reset-button");

export { gameScreen, board1Cells, board2Cells, randomizeButton, resetButton };
