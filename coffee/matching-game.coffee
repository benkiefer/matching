$ ->
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
    $('div.back.card div.image').attr('class', 'image')
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

        game.updateChoices(imageClass)

        if (game.firstChoice != null && game.secondChoice != null)
          game.turns += 1
          setTimeout ( ->
            game.checkForMatch()
          ), 1000
        else
          game.locked = false
