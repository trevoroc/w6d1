const posSeqs = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2]
];

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    this.$el.on("click", "li", (event) => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    });
  }

  getPos($square) {
    return posSeqs[$square.data("index")];
  }

  makeMove($square) {
    const mark = this.game.currentPlayer;
    this.game.playMove(this.getPos($square));
    $square.text(mark);
  }

  setupBoard() {
    const $grid = $('<ul></ul>');
    let $cell;
    for (let i = 0; i < 9; i++) {
      $cell = $('<li></li>');
      $cell.data("index", i);
      $grid.append($cell);
    }

    this.$el.append($grid);
  }
}

module.exports = View;
