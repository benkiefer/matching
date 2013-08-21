jQuery ->
  $('.flipper').not('.flipped').hover(
    (ev) -> ($(@).find('.front, .back').removeClass('card').addClass('selected-card'))
    (ev) -> ($(@).find('.front, .back').removeClass('selected-card').addClass('card'))
  )