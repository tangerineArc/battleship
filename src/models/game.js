"use strict";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.allowRepositioning = true;
    this.isPaused = false;
  }

  start() {
    this.isRunning = true;
  }

  end() {
    this.isRunning = false;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }
}
