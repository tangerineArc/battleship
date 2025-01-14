"use strict";

const gameScreen = document.querySelector("#game-screen");

const board1 = gameScreen.querySelector(":scope > #board-1");
const board1Rows = board1.querySelectorAll(":scope > .row");
const board1Cells = [];
board1Rows.forEach((row) => {
  board1Cells.push(row.querySelectorAll(":scope > .cell"));
});

export { gameScreen, board1Cells };
