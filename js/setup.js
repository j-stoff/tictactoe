// For creating the UI display
(function() { 
    $(document).ready(function() {
    let size = 1;   // Will be abstracted out eventually.
    let side = 400;
    let width = size * side;
    let height = size * side;
    var squares = [];
    var squareEvents = [];
    var gameContainer = $("<div>").addClass("gameContainer");

    var resetButton = $("<input>").attr("type", "button").attr("value","Reset").addClass("reset");
    var changeSidesButton = $("<input>").attr("type", "button").attr("value", "Change sides").addClass("controls");
    var instructionsDiv = $("<div>").text("X player moves first").addClass("instructions");
    var playerSideDiv = $("<div>").text("Playing as X's").addClass("playerSide");
    $("#TicTacToe").append(resetButton);
    $("#TicTacToe").append(changeSidesButton);
    $("#TicTacToe").append(instructionsDiv);
    $("#TicTacToe").append(playerSideDiv);


    // Player definition
    function Player() {
       this.isPlayerX = true;
       this.moves = [];

       this.getPlayerSide = function() {
            return this.isPlayerX;
       }

       this.changeSides = function() {
            if (this.isPlayerX) {
                this.isPlayerX = false;
            } else {
                this.isPlayerX = true;
            }
       }

       this.addMove = function(squareNumber) {
            this.moves.push(squareNumber);
       }

       this.resetMoves = function() {
            this.moves = [];
       }

       this.getMoves = function() {
            return this.moves;
       }
    }

    var playerOne = new Player();
    var AI = new Player();
    AI.changeSides();

    // Add squares to the game
    for(var index = 1; index < 10; index += 1) {
        var className = "box" + index;
        var square = $("<div>").addClass(className).attr("id", index);
        squares.push(square);
        gameContainer.append(square); 
        addSquareSelect(square);
    }

    // Function to add square onclick events
    function addSquareSelect(square) {
        square.on("click", function(event) {
            square.addClass("userChoice");
            playerOne.addMove(Number.parseInt(this.id));
            /*
            // If two players, not sure if I will use.
            if (playerOne.getPlayerSide()) {
                instructionsDiv.text("O's player turn");
            } else {
                instructionsDiv.text("X's player turn")
            }
            */
            if (checkWin(playerOne)) {
                instructionsDiv.text("You win! Hit reset to start a new game!");
                for (var index = 0; index < squares.length; index += 1) {
                    squares[index].off("click");
                }
                console.log("Found a winner");
            } else {
                $(document).off(event);
            }
        });
    }

    $("#TicTacToe").append(gameContainer);

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
        playerOne.resetMoves();
        instructionsDiv.text("X player moves first");
    });

    changeSidesButton.on("click", function() {
        if (playerOne.getPlayerSide()) {
            playerSideDiv.text("Playing as O's");
        } else {
            playerSideDiv.text("Playing as X's");
        }
        playerOne.changeSides();
    });


    function checkWin(player) {
        var movesToCheck = player.getMoves();

        if (movesToCheck.includes(1)) {
            if (movesToCheck.includes(2) && movesToCheck.includes(3)) {
                return true;
            }
            if (movesToCheck.includes(4) && movesToCheck.includes(7)) {
                return true;
            }
            if (movesToCheck.includes(5) && movesToCheck.includes(9)) {
                return true;
            }
        } else if (movesToCheck.includes(2) && movesToCheck.includes(5)
                && movesToCheck.includes(8)) {
            return true;
        } else if (movesToCheck.includes(3)) {
            if (movesToCheck.includes(5) && movesToCheck.includes(7)) {
                return true;
            }

            if (movesToCheck.includes(6) && movesToCheck.includes(9)) {
                return true;
            }
        } else if (movesToCheck.includes(4)) {
            if (movesToCheck.includes(5) && movesToCheck.includes(6)) {
                return true;
            }
        } else if (movesToCheck.includes(7)) {
            if (movesToCheck.includes(8) && movesToCheck.includes(9)) {
                return true;
            }
        }

        return false;
    }


    // Add Rules
    // Add check win condition
    // Takes in either player or AI 'objects'

    /*
        TODO
            Reset button
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