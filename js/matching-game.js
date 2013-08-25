(function() {
  $(function() {
    var cards, defaultDifficulty, game, player;
    cards = ['spidey', 'waldo', 'megaman', 'rainbowdash', 'ironman', 'mario', 'link', 'scarlet', 'wolverine', 'trooper', 'ninja', 'aidorucat', 'audrey', 'kimono', 'mardigras', 'mom'];
    defaultDifficulty = 8;
    player = new Player();
    game = new Game(player, cards, defaultDifficulty);
    $('#playAgain').click(function() {
      $('.flipper').delay(1000).removeClass('flipped matched');
      $('div.back.card div.image').attr('class', 'image');
      game = new Game(player, cards, defaultDifficulty);
      $('.scoreboard').hide();
      return $('.gameboard').removeClass('dim');
    });
    return $('.flipper').click(function() {
      var card, clickedCard, imageClass, imageId, _i, _len, _ref;
      clickedCard = $(this);
      if (!game.locked && !clickedCard.hasClass('flipped')) {
        game.locked = true;
        imageId = parseInt(clickedCard.find('span.imageId').text());
        imageClass = null;
        _ref = game.board.cards;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          card = _ref[_i];
          if (card.number === imageId) {
            imageClass = card.name;
            break;
          }
        }
        clickedCard.addClass('flipped');
        game.updateChoices(imageClass);
        if (game.firstChoice && game.secondChoice) {
          game.turns += 1;
          return setTimeout((function() {
            return game.checkForMatch();
          }), 1000);
        } else {
          return game.locked = false;
        }
      }
    });
  });

}).call(this);
