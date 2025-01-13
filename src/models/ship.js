"use strict";

const allowableDImensions = [5, 4, 3, 3, 2];

export default class Ship {
  constructor(dimension) {
    if (
      !Number.isInteger(dimension) ||
      !allowableDImensions.includes(dimension)
    ) {
      throw new Error("Invalid argument for 'dimension' parameter");
    }

    this.dimension = dimension;
    this.numHits = 0;
  }

  hit() {
    this.numHits++;
  }

  isSunk() {
    if (this.numHits >= this.dimension) return true;
    return false;
  }
}
