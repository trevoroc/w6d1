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
