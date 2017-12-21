// For creating the UI display
(function() { 
    $(document).ready(function() {
    let size = 1;   // Will be abstracted out eventually.
    let side = 400;
    let width = size * side;
    let height = size * side;
    var squares = []
    var gameContainer = $("<div>").addClass("gameContainer");


    // Player definition
    function Player() {
       this.isPlayerX = true;
       this.isPlayerTurn = true;
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
        playerOne.resetMoves();
    });

    changeSidesButton.on("click", function() {
        if (playerOne.getPlayerSide()) {
            playerSideDiv.text("Playing as O's");
        } else {
            playerSideDiv.text("Playing as X's");
        }
        playerOne.changeSides();
    });

    function sortMoves(firstMove, secondMove) {
        return firstMove - secondMove;
    }

    function checkWin(player) {
        var movesToCheck = player.getMoves();
        movesToCheck.sort();

        // Check all possibilities
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