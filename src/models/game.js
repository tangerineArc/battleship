"use strict";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.allowRepositioning = true;
  }

  start() {
    this.isRunning = true;
  }

  end() {
    this.isRunning = false;
  }
}
