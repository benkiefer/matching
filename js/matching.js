var imageMap = {
    1: 'spidey',
    2: 'waldo',
    3: 'megaman',
    4: 'rainbowdash',
    5: 'ironman',
    6: 'mario',
    7: 'link',
    8: 'scarlet',
    9: 'wolverine',
    10: 'trooper',
    11: 'ninja',
    12: 'aidorucat',
    13: 'audrey',
    14: 'kimono',
    15: 'mardigras',
    16: 'mom'
}

var possibleMatches = 8;

function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

function prepareGameBoard() {
    var keys = shuffle(Object.keys(imageMap));
    var sliced = keys.slice(0, possibleMatches);
    var items = shuffle(sliced.concat(sliced));

    $('#board').find('span.imageId').each(function (index) {
        $(this).html(items[index]);
    });
}

$(document).ready(function () {
    var highscore = 0;

    var storedScore = localStorage.getItem("matching.highScore");
    if (storedScore != null){
        highscore = parseInt(storedScore);
        console.log("found highscore: " + highscore);
    }

    $('.scoreboard').fadeOut(1000);

    prepareGameBoard();

    $('#playAgain').click(
        function () {
            turns = 0;
            matchCount = 0;
            $('.flipper').delay(1000).removeClass('flipped matched');
            prepareGameBoard();
            $('.scoreboard').hide();
            $('.gameboard').removeClass('dim');
        }
    );

    var locked = false;
    var firstChoice = null;
    var secondChoice = null;
    var matchCount = 0;
    var turns = 0;

    $('.flipper').click(function () {
        if (!locked) {
            var card = $(this);
            if (!card.hasClass('flipped')) {
                locked = true;
                var imageId = parseInt(card.find('span.imageId').text());
                var imageClass = imageMap[imageId];

                var backSide = card.find('.back').find('.image');
                backSide.addClass(imageClass);
                card.addClass('flipped');

                updateChoices(imageId);

                if (firstChoice != null && secondChoice != null) {
                    // check matches and wait a couple of seconds so user can see results
                    turns += 1;
                    setTimeout(checkForMatch, 1000);
                } else {
                    locked = false;
                }
            }
        }
    });

    function updateChoices(imageId) {
        if (firstChoice == null) {
            firstChoice = imageId;
        } else if (secondChoice == null) {
            secondChoice = imageId;
        }
    }

    function checkForMatch() {
        if (firstChoice == secondChoice) {
            // Match!
            $('#board').find('.flipped').each(function () {
                if (!$(this).hasClass('matched')) {
                    $(this).addClass('matched');
                }
            });
            matchCount += 1;
            checkForGameOver();
        } else {
            // No Match!
            $('#board').find('.flipped').each(function () {
                if (!$(this).hasClass('matched')) {
                    $(this).removeClass('flipped');
                }
            });
        }

        firstChoice = null;
        secondChoice = null;
        locked = false;
    }

    function updateHighScore() {
        if (highscore == 0 || turns < highscore) {
            highscore = turns;
            localStorage.setItem("matching.highScore", highscore);
        }
    }

    function checkForGameOver() {
        if (matchCount == possibleMatches) {
            updateHighScore();
            $('#turns').html(turns);
            $('#highScore').html(highscore);
            $('.gameboard').addClass('dim');
            $('.scoreboard').fadeIn(1000);
        }
    }
});