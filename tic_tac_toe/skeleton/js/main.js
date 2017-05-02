const View = require('./ttt-view.js');
const Game = require('../../solution/game.js');

$( () => {
  const view = new View(new Game(), $('.ttt'));
  view.setupBoard();
  view.bindEvents();
});
