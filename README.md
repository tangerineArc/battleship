# Battleship

Battleship is a strategy type guessing game for two players. It is played on ruled grids on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

Here, you play against an intelligent (you may loose, no kidding) bot.

## Features

- Option to randomize fleet generation and positioning
- Nice draggable UI to re-orient and re-position ships
- Cool sound effects
- Continuosly adjusting grid cells so that it does not become too clear that you are dumb

## Tech Stack

- **JavaScript** - the one and only scripting language supported by all browsers
- **Webpack** - module bundler for JavaScript and frontend assets
- **Jest** - JavaScript testing framework
- **HTML & CSS** - the markup and stylesheet languages that the web can't do without
- **ESLint & Prettier** - (dev) JavaScript linter and prettier respectively

## Repo Structure

- `src/`
  - `dom-cache/`
    - `game-screen.js` - query and cache game screen DOM nodes
    - `starting-screen.js` - query and cache start screen DOM nodes
  - `globals/constants.js` - global constant values for the game environment
  - `images/loading.svg` - animation asset for loading state
  - `models/*.js` - data models for game entities: _game_, _player_, _ship_, _game-board_
  - `sounds/*.mp3` - sound effect files
  - `utils/`
    - `attack-loci.js` - calculate bot's next attack location
    - `ships-loci.js` - generate initial ship positions
  - `index.js` - main driver file
  - `style.css` - CSS stylesheet
  - `template.html` - HTML markup
- `unit-tests/*.test.js` - test suite for different functions

## Snapshots

| [![battleship-1.png](https://i.postimg.cc/bwckF4cn/battleship-1.png)](https://postimg.cc/GHK447p3) | [![battleship-2.png](https://i.postimg.cc/854swndh/battleship-2.png)](https://postimg.cc/8JF1z405) |
| --- | --- |
| [![battleship-3.png](https://i.postimg.cc/023kPJ8R/battleship-3.png)](https://postimg.cc/qzsVGqhj) | [![battleship-4.png](https://i.postimg.cc/RCLdkcLh/battleship-4.png)](https://postimg.cc/mhh7M1qW) |

