$ ->
  class Card
    constructor: (name) ->
      @name = name

  class Player
    constructor: () ->
      @highScore = @determineHighScore()

    determineHighScore: =>
      score = localStorage.getItem("matching.highScore")
      if (score)
        console.log("found highscore: #{score}");
        return parseInt(score)
      else
        return 0

  class Board
    constructor: (possibleCards, possibleMatches) ->
      @possibleMatches = possibleMatches
      @cards = @prepareCards(possibleCards)
      @setUpBoard()

    prepareCards: (possibleCards) =>
      console.log('preparing cards')
      sliced = cards.slice(0, @possibleMatches)
      return sliced.concat(sliced).shuffle()

    setUpBoard: =>
      console.log('setting up the board')
      $('#board').find('span.imageId').each (index) =>
          $(this).html(@cards[index].name)

  class Game
    constructor: (player, cards, difficulty) ->
      @player = player
      @board = new Board(cards, difficulty)

  cards = [
    new Card('spidey'),
    new Card('waldo'),
    new Card('megaman'),
    new Card('rainbowdash'),
    new Card('ironman'),
    new Card('mario'),
    new Card('link'),
    new Card('scarlet'),
    new Card('wolverine'),
    new Card('trooper'),
    new Card('ninja'),
    new Card('aidorucat'),
    new Card('audrey'),
    new Card('kimono'),
    new Card('mardigras'),
    new Card('mom')
  ]

  defaultDifficulty = 8

  player = new Player()
  game = new Game(player, cards, defaultDifficulty)

  for card in game.board.cards
    console.log card.name