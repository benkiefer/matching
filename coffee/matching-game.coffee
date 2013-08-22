$ ->
  class ClickableCard
    constructor: (card, number) ->
      @name = card.name
      @number = number

  class CardOption
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

    updateHighScore: (turns) =>
      if (@highScore == 0 || turns < @highScore)
        @highScore = turns;
        localStorage.setItem("matching.highScore", @highScore);

  class Board
    constructor: (possibleCards, possibleMatches) ->
      @possibleMatches = possibleMatches
      @cards = @prepareCards(possibleCards)
      @setUpBoard()

    prepareCards: (possibleCards) =>
      console.log('preparing cards')
      sliced = possibleCards.slice(0, @possibleMatches)
      shuffledPossibleCards = sliced.concat(sliced).shuffle()

      clickableCards = []
      for card, index in shuffledPossibleCards
        clickableCards.push(new ClickableCard(card, index))
      return clickableCards

    setUpBoard: =>
      console.log('setting up the board')
      $('#board').find('span.imageId').each (index, e) =>
        $(e).html(index.toString())

  class Game
    constructor: (player, cards, possibleMatches) ->
      @turns = 0
      @player = player
      @board = new Board(cards, possibleMatches)
      @firstChoice = null
      @secondChoice = null
      @matches = 0
      @possibleMatches = possibleMatches
      @locked = false

    checkForGameOver: =>
      if (@matches == @possibleMatches)
        @player.updateHighScore(@turns)
        $('#turns').html(@turns)
        $('#highScore').html(@player.highScore)
        $('.gameboard').addClass('dim')
        $('.scoreboard').fadeIn(1000)

    checkForMatch: =>
      if (@firstChoice == @secondChoice)
        # Match!
        console.log 'match!'
        $('#board').find('.flipped').each ->
          if (!$(this).hasClass('matched'))
            $(this).addClass('matched')
        @matches += 1
        @checkForGameOver()
      else
        # No Match!
        console.log('no match!')
        $('#board').find('.flipped').each ->
          if (!$(this).hasClass('matched'))
            $(this).removeClass('flipped')
      @firstChoice = null
      @secondChoice = null
      @locked = false

  cards = [
    new CardOption('spidey'),
    new CardOption('waldo'),
    new CardOption('megaman'),
    new CardOption('rainbowdash'),
    new CardOption('ironman'),
    new CardOption('mario'),
    new CardOption('link'),
    new CardOption('scarlet'),
    new CardOption('wolverine'),
    new CardOption('trooper'),
    new CardOption('ninja'),
    new CardOption('aidorucat'),
    new CardOption('audrey'),
    new CardOption('kimono'),
    new CardOption('mardigras'),
    new CardOption('mom')
  ]

  defaultDifficulty = 8

  player = new Player()
  game = new Game(player, cards, defaultDifficulty)

  $('#playAgain').click ->
    $('.flipper').delay(1000).removeClass('flipped matched')
    game = new Game(player, cards, defaultDifficulty)
    $('.scoreboard').hide()
    $('.gameboard').removeClass('dim')

  $('.flipper').click ->
    if (!game.locked)
      clickedCard = $(this)
      if (!clickedCard.hasClass('flipped'))
        game.locked = true
        imageId = parseInt(clickedCard.find('span.imageId').text())
        imageClass = null

        # extract to method?
        for card in game.board.cards
          if (card.number == imageId)
            imageClass = card.name
            break

        # can I do this up front?
        backSide = clickedCard.find('.back').find('.image')
        backSide.addClass(imageClass)

        clickedCard.addClass('flipped')

        if (game.firstChoice == null)
          game.firstChoice = imageClass
        else if (game.secondChoice == null)
          game.secondChoice = imageClass;

      # push all of this into check for match?
      if (game.firstChoice != null && game.secondChoice != null)
        # check matches and wait a couple of seconds so user can see results
        # change this to wait for a second, then fire the function. It's too damn fast.
        game.turns += 1
        setTimeout(game.checkForMatch(), 1000)
      else
        game.locked = false
