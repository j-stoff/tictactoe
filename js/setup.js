// For creating the UI display
(function() { 
    $(document).ready(function() {
    let size = 1;   // Will be abstracted out eventually.
    let side = 400;
    let width = size * side;
    let height = size * side;
    var squares = []
    var gameContainer = $("<div>").addClass("gameContainer");
    var playerIsX = true;

    // Add squares to the game
    for(var index = 1; index < 10; index += 1) {
        var className = "box" + index;
        var square = $("<div>").addClass(className);
        squares.push(square);
        gameContainer.append(square); 
        addSquareSelect(square);
    }

    // Function to add square onclick events
    function addSquareSelect(square) {
        square.on("click", function(event) {
            console.log(this);
            square.addClass("userChoice");
            $(document).off(event);
        });
    }

    $("#TicTacToe").append(gameContainer);


    var resetButton = $("<input>").attr("type", "button").attr("value","Reset").addClass("reset");
    var changeSidesButton = $("<input>").attr("type", "button").attr("value", "Change sides").addClass("controls");
    var instructionsDiv = $("<div>").text("X player moves first").addClass("instructions");
    var playerSideDiv = $("<div>").text("Playing as X's").addClass("playerSide");
    $("#TicTacToe").append(resetButton);
    $("#TicTacToe").append(changeSidesButton);
    $("#TicTacToe").append(instructionsDiv);
    $("#TicTacToe").append(playerSideDiv);

    function resetAllSquares() {
        console.log("the right spot");
        // TODO jquery has a way to find out if an object has a click event attached to it already
        for (var i = 0; i < squares.length; i++) {
            squares[i].off("click");
            addSquareSelect(squares[i]);
            if (squares[i].hasClass("userChoice")) {
                squares[i].removeClass("userChoice");
            } else if (squares[i].hasClass("AIChoice")) {
                squares[i].removeClass("AIChoice");
            }
        }
        
    }

    resetButton.on("click", function() {
        resetAllSquares();
    });

    changeSidesButton.on("click", function() {
        if (playerIsX) {
            playerIsX = false;
            playerSideDiv.text("Playing as O's");
        } else {
            playerIsX = true;
            playerSideDiv.text("Playing as X's");
        }
    })

    /*
        TODO
            Reset button
                Remove old event handlers
                Reset game board
                Reset instructions in top
            Change sides
                X goes first
            Rules
                Win condition
                    Check after each player move
                AI move after player and not victory
                    Check for win after AI move
                If all spots taken
                    Game is tie, must reset
    */
    })
})(jQuery);