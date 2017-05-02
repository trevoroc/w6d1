/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length == 0) {
        return true;
      } else {
        const topStartDisc = startTower[startTower.length - 1];
        const topEndDisc = endTower[endTower.length - 1];
        return topStartDisc < topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx)
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class HanoiView {
  constructor(game, $rootEl) {
    this.game = game;
    this.$rootEl = $rootEl;
    this.fromPileIdx = null;

    this.setupTowers();
    this.bindEvents();
  }

  setupTowers() {
    let $pile;
    for (let i = 0; i < 3; i++) {
      $pile = $("<ul></ul>");
      $pile.data("index", i);
      this.$rootEl.append($pile);
    }

    let $disk;
    for (let i = 0; i < 3; i++) {
      $disk = $("<li></li>");
      $disk.data("size", 2 - i);

      switch ($disk.data("size")) {
        case 0:
          $disk.addClass("small");
          break;
        case 1:
          $disk.addClass("medium");
          break;
        case 2:
          $disk.addClass("large");
          break;
        default:
          throw("Something went horribly wrong");
      }

      $("figure ul").eq(0).prepend($disk);
    }
  }

  render(toPileIdx) {
    const $fromPile = $("figure ul").eq(this.fromPileIdx);
    console.log($fromPile);
    const $disk = $fromPile.children().first();
    const $toPile = $("figure ul").eq(toPileIdx);
    $toPile.prepend($disk);
    $fromPile.remove("figure ul li:first-child");

    if (this.game.isWon()) {
      alert("You win!");
      this.$rootEl.off("click", "ul");
    }
  }

  bindEvents() {
    this.$rootEl.on("click", "ul", (event) => {
      this.clickTower(event);
    });
  }

  clickTower(event) {

    if (this.fromPileIdx !== null) {
      const $pile = $("figure ul").eq(this.fromPileIdx);
      const $disk = $pile.eq(0);
      const $toPile = $(event.currentTarget);
      const toPileIdx = $toPile.data("index");

      if (this.game.move(this.fromPileIdx, toPileIdx)) {
        this.render(toPileIdx);
      } else {
        alert("Invalid move, imbecile");
      }

      this.fromPileIdx = null;
      $pile.removeClass("clicked");

    } else {
      this.fromPileIdx = $(event.currentTarget).data("index");
      $(event.currentTarget).addClass("clicked");
    }
  }
}

module.exports = HanoiView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const HanoiView = __webpack_require__(1);

$( () => {
  const $rootEl = $('.hanoi');
  const game = new Game();
  new HanoiView(game, $rootEl);
});


/***/ })
/******/ ]);