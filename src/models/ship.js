"use strict";

import { ALLOWED_SHIP_DIMENSIONS } from "../globals/constants.js";

export default class Ship {
  constructor(dimension) {
    if (
      !Number.isInteger(dimension) ||
      !ALLOWED_SHIP_DIMENSIONS.includes(dimension)
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
