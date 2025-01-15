"use strict";

const gameScreen = document.querySelector("#game-screen");

const boardsContainer = gameScreen.querySelector(":scope > #boards-container");
const board1 = boardsContainer.querySelector(":scope > #board-1");
const board1Rows = board1.querySelectorAll(":scope > .row");
const board1Cells = [];
board1Rows.forEach((row) => {
  board1Cells.push(row.querySelectorAll(":scope > .cell"));
});

const randomizeButton = gameScreen.querySelector("#randomize-button");

export { gameScreen, board1Cells, randomizeButton };
