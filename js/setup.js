// Player class
function Player() {
   this.name = "Player 1";
   this.isPlayerX = true;
   this.moves = [];

   this.getName = function() {
        return this.name;
   }

   this.setName = function(newName) {
        this.name = newName;
   }

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

//AI class extends player
function AIPlayer(difficulty) {
    this.diff = difficulty;

    this.makeMove = function(remainingSquares) {
        console.log(remainingSquares);

        if (this.diff == 2) {
            // Hard mode
        } else if (this.diff == 1) {
            // Normal
            // Priotize the center, then corners
            // Try to make 3
        } else {
            // Easy, random move
            let move = remainingSquares[Math.floor(Math.random() * remainingSquares.length)];
            console.log(move);
            let position = remainingSquares.indexOf(move);
            remainingSquares.splice(position, 1);
            return move;
        }

    }
}

AIPlayer.prototype = new Player();

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
    var squaresRemaining = [];

    var resetButton = $("<input>").attr("type", "button").attr("value","Reset").addClass("reset").addClass("topRow");
    var changeSidesButton = $("<input>").attr("type", "button").attr("value", "Change sides").addClass("controls").addClass("topRow");
    var instructionsDiv = $("<div>").text("X player moves first").addClass("instructions").addClass("topRow");
    var playerSideDiv = $("<div>").text("Playing as X's").addClass("playerSide").addClass("topRow");
    $("#TicTacToe").append(resetButton);
    $("#TicTacToe").append(changeSidesButton);
    $("#TicTacToe").append(instructionsDiv);
    $("#TicTacToe").append(playerSideDiv);

    var playerOne = new Player();
    var AI = new AIPlayer(0);
    AI.changeSides();
    AI.setName("AI");

    // Add squares to the game
    for(var index = 1; index < 10; index += 1) {
        var className = "box" + index;
        var square = $("<div>").addClass(className).attr("id", index);
        squares.push(square);
        squaresRemaining.push(index);
        gameContainer.append(square); 
        addSquareSelect(square);
    }

    function removeSquareFromRemaing(playerMove) {
        let position = squaresRemaining.indexOf(playerMove);
        squaresRemaining.splice(position, 1);
    }

    // Function to add square onclick events
    function addSquareSelect(square) {
        square.on("click", function(event) {
            square.addClass("userChoice");
            let playerMove = Number.parseInt(this.id);
            playerOne.addMove(playerMove);
            /*
            // If two players, not sure if I will use.
            if (playerOne.getPlayerSide()) {
                instructionsDiv.text("O's player turn");
            } else {
                instructionsDiv.text("X's player turn")
            }
            */
            removeSquareFromRemaing(playerMove);
            if (checkWin(playerOne)) {
                gameOver(playerOne);
                console.log("Found a winner");
            } else {
                $(document).off(event);
            }

            if (AI) {
                // TODO AI stuff
                let aiMove = AI.makeMove(squaresRemaining);
                console.log("AI move: " + aiMove);
                squares[aiMove - 1].addClass("aiChoice").off("click");
                AI.addMove(aiMove);
                if (checkWin(AI)) {
                    gameOver(AI);
                }
            }
        });
    }

    $("#TicTacToe").append(gameContainer);

    function gameOver(player) {
        instructionsDiv.text(player.getName() + " won! Hit reset to start a new game!");
        for (var index = 0; index < squares.length; index += 1) {
            squares[index].off("click");
        }
    }

    function resetAllSquares() {
        console.log("the right spot");
        // TODO jquery has a way to find out if an object has a click event attached to it already
        for (var i = 0; i < squares.length; i++) {
            squares[i].off("click");
            addSquareSelect(squares[i]);
            if (squares[i].hasClass("userChoice")) {
                squares[i].removeClass("userChoice");
            } else if (squares[i].hasClass("aiChoice")) {
                squares[i].removeClass("aiChoice");
            }
        }
        
    }

    function reset() {
        resetAllSquares();
        playerOne.resetMoves();
        AI.resetMoves();
        squaresRemaining = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        instructionsDiv.text("X player moves first");
    }

    resetButton.on("click", function() {
        reset();
    });

    changeSidesButton.on("click", function() {
        if (playerOne.getPlayerSide()) {
            playerSideDiv.text("Playing as O's");
        } else {
            playerSideDiv.text("Playing as X's");
        }
        playerOne.changeSides();
        reset();
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