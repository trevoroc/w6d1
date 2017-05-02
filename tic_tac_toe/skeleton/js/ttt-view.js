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

  removeEvents() {
    this.$el.off("click", "li");
  }

  getPos($square) {
    return posSeqs[$square.data("index")];
  }

  makeMove($square) {
    const mark = this.game.currentPlayer;

    try {
      this.game.playMove(this.getPos($square));
      $square.text(mark);
      $square.addClass("clicked");
      $square.addClass(mark);
    } catch (e) {
      alert(e.msg);
    }

    if (this.game.isOver()) {
      this.game.winner() ? alert(`${this.game.winner()}`) : alert("Cat's game");
      this.removeEvents();
    }
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
