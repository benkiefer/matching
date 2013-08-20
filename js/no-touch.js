$(document).ready(function () {
    $('.flipper').not('.flipped').hover(
            function () {
                $(this).find('.front, .back').removeClass('card').addClass('selected-card');
            },
            function () {
                $(this).find('.front, .back').removeClass('selected-card').addClass('card');
            }
        );
})
