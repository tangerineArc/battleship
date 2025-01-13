"use strict";

const minDimension = 1;
const maxDimension = 4;

export default class Ship {
  constructor(dimension) {
    if (
      !Number.isInteger(dimension) ||
      dimension < minDimension ||
      dimension > maxDimension
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
