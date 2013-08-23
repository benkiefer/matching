$ ->
  cards = [
    'spidey', 'waldo', 'megaman',
    'rainbowdash', 'ironman', 'mario',
    'link', 'scarlet', 'wolverine',
    'trooper', 'ninja', 'aidorucat',
    'audrey', 'kimono', 'mardigras',
    'mom'
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
    clickedCard = $(this)

    if (!game.locked && !clickedCard.hasClass('flipped'))
      game.locked = true

      imageId = parseInt(clickedCard.find('span.imageId').text())
      imageClass = null

      for card in game.board.cards
        if (card.number == imageId)
          imageClass = card.name
          break

      clickedCard.addClass('flipped')

      game.updateChoices(imageClass)

      if (game.firstChoice && game.secondChoice)
        game.turns += 1
        setTimeout ( ->
          game.checkForMatch()
        ), 1000
      else
        game.locked = false
