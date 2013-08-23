class window.ClickableCard
  constructor: (card, number) ->
    @name = card.name
    @number = number

class window.CardOption
  constructor: (name) ->
    @name = name

class window.Player
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

class window.Board
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
    $('#board div.flipper').each( (index, e) =>
      $(e).find('span.imageId').html(index.toString())
      $(e).find('div.back div.image').addClass(@cards[index].name))

class window.Game
  constructor: (player, cards, possibleMatches) ->
    @turns = 0
    @player = player
    @board = new Board(cards, possibleMatches)
    @firstChoice = null
    @secondChoice = null
    @matches = 0
    @possibleMatches = possibleMatches
    @locked = false

  checkForMatch: =>
    if (@firstChoice == @secondChoice)
      # Match!
      $('#board').find('.flipped').each ->
        if (!$(this).hasClass('matched'))
          $(this).addClass('matched')
      @matches += 1
    else
      # No Match!
      $('#board').find('.flipped').each ->
        if (!$(this).hasClass('matched'))
          $(this).removeClass('flipped')

    if (@matches == @possibleMatches)
      @player.updateHighScore(@turns)
      $('#turns').html(@turns)
      $('#highScore').html(@player.highScore)
      $('.gameboard').addClass('dim')
      $('.scoreboard').fadeIn(1000)

    @firstChoice = null
    @secondChoice = null
    @locked = false

  updateChoices: (imageClass) =>
    if (!@firstChoice)
      @firstChoice = imageClass
    else if (!@secondChoice)
      @secondChoice = imageClass
