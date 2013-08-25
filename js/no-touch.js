(function() {
  jQuery(function() {
    return $('.flipper').not('.flipped').hover(function(ev) {
      return $(this).find('.front, .back').removeClass('card').addClass('selected-card');
    }, function(ev) {
      return $(this).find('.front, .back').removeClass('selected-card').addClass('card');
    });
  });

}).call(this);
