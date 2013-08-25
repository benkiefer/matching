(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.ClickableCard = (function() {
    function ClickableCard(name, number) {
      this.name = name;
      this.number = number;
    }

    return ClickableCard;

  })();

  window.Player = (function() {
    function Player() {
      this.updateHighScore = __bind(this.updateHighScore, this);
      this.determineHighScore = __bind(this.determineHighScore, this);
      this.highScore = this.determineHighScore();
    }

    Player.prototype.determineHighScore = function() {
      var score;
      score = localStorage.getItem("matching.highScore");
      if (score) {
        console.log("found highscore: " + score);
        return parseInt(score);
      } else {
        return 0;
      }
    };

    Player.prototype.updateHighScore = function(turns) {
      if (this.highScore === 0 || turns < this.highScore) {
        this.highScore = turns;
        return localStorage.setItem("matching.highScore", this.highScore);
      }
    };

    return Player;

  })();

  window.Board = (function() {
    function Board(possibleCards, possibleMatches) {
      this.setUpBoard = __bind(this.setUpBoard, this);
      this.prepareCards = __bind(this.prepareCards, this);
      this.possibleMatches = possibleMatches;
      this.cards = this.prepareCards(possibleCards);
      this.setUpBoard();
    }

    Board.prototype.prepareCards = function(possibleCards) {
      var card, clickableCards, index, shuffledPossibleCards, sliced, _i, _len;
      console.log('preparing cards');
      sliced = possibleCards.slice(0, this.possibleMatches);
      shuffledPossibleCards = sliced.concat(sliced).shuffle();
      clickableCards = [];
      for (index = _i = 0, _len = shuffledPossibleCards.length; _i < _len; index = ++_i) {
        card = shuffledPossibleCards[index];
        clickableCards.push(new ClickableCard(card, index));
      }
      return clickableCards;
    };

    Board.prototype.setUpBoard = function() {
      var _this = this;
      console.log('setting up the board');
      return $('#board div.flipper').each(function(index, e) {
        $(e).find('span.imageId').html(index.toString());
        return $(e).find('div.back div.image').addClass(_this.cards[index].name);
      });
    };

    return Board;

  })();

  window.Game = (function() {
    function Game(player, cards, possibleMatches) {
      this.updateChoices = __bind(this.updateChoices, this);
      this.checkForMatch = __bind(this.checkForMatch, this);
      this.turns = 0;
      this.player = player;
      this.board = new Board(cards, possibleMatches);
      this.firstChoice = null;
      this.secondChoice = null;
      this.matches = 0;
      this.possibleMatches = possibleMatches;
      this.locked = false;
    }

    Game.prototype.checkForMatch = function() {
      if (this.firstChoice === this.secondChoice) {
        $('#board').find('.flipped').each(function() {
          if (!$(this).hasClass('matched')) {
            return $(this).addClass('matched');
          }
        });
        this.matches += 1;
      } else {
        $('#board').find('.flipped').each(function() {
          if (!$(this).hasClass('matched')) {
            return $(this).removeClass('flipped');
          }
        });
      }
      if (this.matches === this.possibleMatches) {
        this.player.updateHighScore(this.turns);
        $('#turns').html(this.turns);
        $('#highScore').html(this.player.highScore);
        $('.gameboard').addClass('dim');
        $('.scoreboard').fadeIn(1000);
      }
      this.firstChoice = null;
      this.secondChoice = null;
      return this.locked = false;
    };

    Game.prototype.updateChoices = function(imageClass) {
      if (!this.firstChoice) {
        return this.firstChoice = imageClass;
      } else if (!this.secondChoice) {
        return this.secondChoice = imageClass;
      }
    };

    return Game;

  })();

}).call(this);
