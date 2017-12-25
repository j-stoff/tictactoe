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

    this.makeMove = function(remainingSquares, opponentSquares) {

        if (this.diff == 2) {
            // Hard mode

            // check win
            var move = findWinMove(this.moves, remainingSquares);
            if (move != 0) {
                removeSquareFromRemaing(move, remainingSquares);
                return move;
            }
            move = blockOpponentMove(opponentSquares, remainingSquares, this.moves);
            if (move != 0) {
                removeSquareFromRemaing(move, remainingSquares);
                return move;
            }
            // block move
            // goto corner
            // random
            move = randomMove(remainingSquares);
            removeSquareFromRemaing(move, remainingSquares);
            return move;

        } else if (this.diff == 1) {
            // Normal
            // Priotize the center, then corners
            // Try to make 3

            // If the middle is not taken, do so
            if (remainingSquares.includes(5)) {
                removeSquareFromRemaing(5, remainingSquares);
                return 5;
            }

            var move = findWinMove(this.moves, remainingSquares);

            if (move == 0) {
                move = randomMove(remainingSquares);
            }

            removeSquareFromRemaing(move, remainingSquares);
            return move;

        } else {
            // Easy, random move
            let move = randomMove(remainingSquares);
            console.log(move);
            removeSquareFromRemaing(move, remainingSquares);
            return move;
        }

    }
}

AIPlayer.prototype = new Player();

function randomMove(remainingSquares) {
    return remainingSquares[Math.floor(Math.random() * remainingSquares.length)];
}

function blockOpponentMove(opponentSquares, remainingSquares, aiMoves) {
    // TODO include all possibilities, not just starting from the top left.
    if (opponentSquares.includes(1)) {
        if (opponentSquares.includes(2) && remainingSquares.includes(3) && !aiMoves.includes(3)) {
            return 3;
        }
        if (opponentSquares.includes(3) && remainingSquares.includes(2) && !aiMoves.includes(2)) {
            return 2;
        }
        if (opponentSquares.includes(4) && remainingSquares.includes(7) && !aiMoves.includes(7)) {
            return 7;
        }
        if (opponentSquares.includes(7) && remainingSquares.includes(4) && !aiMoves.includes(4)) {
            return 4;
        }
        if (opponentSquares.includes(5) && remainingSquares.includes(9) && !aiMoves.includes(9)) {
            return 9;
        }
        if (opponentSquares.includes(9) && remainingSquares.includes(5) && !aiMoves.includes(5)) {
            return 5;
        }
    }


    if (opponentSquares.includes(2)) {
        if (opponentSquares.includes(5) && remainingSquares.includes(8)) {
            return 8;
        }
        if (opponentSquares.includes(8) && remainingSquares.includes(5)) {
            return 5;
        }
    }

    if (opponentSquares.includes(3)) {
        if (opponentSquares.includes(5) && remainingSquares.includes(7)) {
            return 7;
        }
        if (opponentSquares.includes(7) && remainingSquares.includes(5)) {
            return 5;
        }
        if (opponentSquares.includes(6) && remainingSquares.includes(9)) {
            return 9;
        }
        if (opponentSquares.includes(9) && remainingSquares.includes(6)) {
            return 6;
        }
    }

    if (opponentSquares.includes(4)) {
        if (opponentSquares.includes(5) && remainingSquares.includes(6)) {
            return 6;
        }
        if (opponentSquares.includes(6) && remainingSquares.includes(5)) {
            return 5;
        }
    }

    if (opponentSquares.includes(5)) {
        if (opponentSquares.includes(4) && remainingSquares.includes(6)) {
            return 6;
        }

        if (opponentSquares.includes(6) && remainingSquares.includes(4)) {
            return 4;
        }

        if (opponentSquares.includes(2) && remainingSquares.includes(8)) {
            return 8;
        }

        if (opponentSquares.includes(8) && remainingSquares.includes(2)) {
            return 2;
        }

        if (opponentSquares.includes(9) && remainingSquares.includes(1)) {
            return 1;
        }
        if (opponentSquares.includes(7) && remainingSquares.includes(3)){
            return 3;
        }
    }

    if (opponentSquares.includes(6)) {
        if (opponentSquares.includes(9) && remainingSquares.includes(3)) {
            return 3;
        }
    }

    if (opponentSquares.includes(7)) {
        if (opponentSquares.includes(8) && remainingSquares.includes(9)) {
            return 9;
        }
        if (opponentSquares.includes(9) && remainingSquares.includes(8)) {
            return 8;
        }
    }

    if (opponentSquares.includes(9)) {
        if (opponentSquares.includes(7) && remainingSquares.includes(8)) {
            return 8;
        }
    }

    console.log("No block available");

    return 0;
}

function findWinMove(playerMoves, remainingSquares) {
                // Check for win first
            if (playerMoves.includes(1)) {

                // Across
                if (playerMoves.includes(2) && remainingSquares.includes(3)) {
                    return 3;
                }

                //Across
                if (playerMoves.includes(3) && remainingSquares.includes(2)) {
                    return 2;
                }

                // Down
                if (playerMoves.includes(4) && remainingSquares.includes(7)) {
                    return 7;
                }

                // Down
                if (playerMoves.includes(7) && remainingSquares.includes(4)) {
                    return 4;
                }

                // Diagonal
                if (playerMoves.includes(5) && remainingSquares.includes(9)) {
                    return 9;
                }

                //Diagonal
                if (playerMoves.includes(9) && remainingSquares.includes(5)) {
                    return 5;
                } 
            }

            if (playerMoves.includes(2)) {
                if (playerMoves.includes(5) && remainingSquares.includes(8)) {
                    return 8;
                }

                if (playerMoves.includes(8) && remainingSquares.includes(5)) {
                    return 5;
                }
            }

            if (playerMoves.includes(3)) {
                if (playerMoves.includes(5) && remainingSquares.includes(7)) {
                    return 7;
                }

                if (playerMoves.includes(7) && remainingSquares.includes(5)) {
                    return 5;
                }


                if (playerMoves.includes(6) && remainingSquares.includes(9)) {
                    return 9;
                }

                if (playerMoves.includes(9) && remainingSquares.includes(6)) {
                    return 6;
                }
            }

            if (playerMoves.includes(4)) {
                if (playerMoves.includes(5) && remainingSquares.includes(6)) {
                    return 6;
                }

                if (playerMoves.includes(6) && remainingSquares.includes(5)) {
                    return 5;
                }
            }

            if (playerMoves.includes(7)) {
                if (playerMoves.includes(8) && remainingSquares.includes(9)) {
                    return 9;
                }

                if (playerMoves.includes(9) && remainingSquares.includes(8)) {
                    return 8;
                }
            }


            return 0;

}



function removeSquareFromRemaing(playerMove, array) {
    let position = array.indexOf(playerMove);
    array.splice(position, 1);
}

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
            removeSquareFromRemaing(playerMove, squaresRemaining);

            if (squaresRemaining.length === 0) {
                instructionsDiv.text("Tie! Press reset to restart");               
            } else if (checkWin(playerOne)) {
                winGame(playerOne);
                console.log("Found a winner");
            } else {
                $(document).off(event);
                if (AI) {
                // TODO AI stuff
                let aiMove = AI.makeMove(squaresRemaining, playerOne.getMoves());
                squares[aiMove - 1].addClass("aiChoice").off("click");
                AI.addMove(aiMove);
                if (checkWin(AI)) {
                    winGame(AI);
                }
            }
            }
        });
    }

    $("#TicTacToe").append(gameContainer);

    function winGame(player) {
        instructionsDiv.text(player.getName() + " won! Hit reset to start a new game!");
        for (var index = 0; index < squares.length; index += 1) {
            squares[index].off("click");
        }
    }

    function resetAllSquares() {
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
        } 
        if (movesToCheck.includes(2) && movesToCheck.includes(5)
                && movesToCheck.includes(8)) {
            return true;
        }
        if (movesToCheck.includes(3)) {
            if (movesToCheck.includes(5) && movesToCheck.includes(7)) {
                return true;
            }

            if (movesToCheck.includes(6) && movesToCheck.includes(9)) {
                return true;
            }
        }
        if (movesToCheck.includes(4)) {
            if (movesToCheck.includes(5) && movesToCheck.includes(6)) {
                return true;
            }
        }
        if (movesToCheck.includes(7)) {
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