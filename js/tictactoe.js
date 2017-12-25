// For creating the UI display
(function() { 
    $(document).ready(function() {
    // Player class
    function Player(name, isXSide) {
       this.name = name;
       this.isPlayerX = isXSide;
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
        this.opponentMoves;
        this.openSpaces;

        this.makeMove = function() {
            // The big function
            if (this.diff === 2) {

            } else if (this.diff === 1) {

            } else {
                let move = this.randomMove();
                removeSquareFromRemaing(move, this.openSpaces);
                return move;
            }
        }

        this.setOpponentMoves = function(opponentSquares) {
            this.opponentMoves = opponentSquares;
        }
        this.setOpenSpaces = function(remainingSquares) {
            this.openSpaces = remainingSquares;
        }

        this.getOpenSpaces = function() {
            return this.openSpaces;
        }

        // Private methods
        this.blockMove = function() {

        }
        this.cornerMove = function() {

        }
        this.winMove = function() {

        }
        this.randomMove = function() {
            return this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
        }

    }
    AIPlayer.prototype = new Player();


    function Game() {
        this.players = [];
        this.gameOver = false;
        this.squareObjects = [];
        this.openSpaces = [];
        let topRow = [1, 2, 3];
        let middleRow = [4, 5, 6];
        let bottomRow = [7, 8, 9];
        let leftColumn = [1, 4, 7];
        let middleColumn = [2, 5, 8];
        let rightColumn = [3, 6, 9];
        let diagonalTopToBottom = [1, 5, 9];
        let diagonalBottomToTop = [7, 5, 3];
        this.winConditions = [topRow, middleRow, bottomRow, leftColumn, 
                middleColumn, rightColumn, diagonalTopToBottom,
                diagonalBottomToTop];

        this.addPlayer = function(player) {
            this.players.push(player);
        }

        this.addSquare = function(square) {
            this.squareObjects.push(square);
        }

        this.getOpenSpaces = function() {
            return this.openSpaces;
        }

        this.getSquareObjects = function() {
            return this.squareObjects;
        }

        this.addOpenSpace = function(squareNumber) {
            this.openSpaces.push(squareNumber);
        }

        this.reset = function() {
            removeClickFromAllSquares();
            for (var i = 0; i < players.length; i++) {
                players[i].resetMoves();
            }
            let spacesLeft = this.openSpaces.length;
            for (var i = 0; i < spacesLeft; i++) {
                this.openSpaces.pop();
            }
            for (var i = 1; i < 10; i++) {
                this.openSpaces.push(i);
            }
            instructionsDiv.text("X player moves first");
        }

        this.checkGameOver = function(player) {
            // check for a win
            console.log(this.winConditions);
            let playerMoves = player.getMoves();
            var success = false;
            var threeSquares = [];
            // TODO still needs work.
            for (var i = 0; i < this.winConditions.length; i++) {
                let singleWinCondition = this.winConditions[i];
                success = $.each(singleWinCondition, function(v, i) {
                    return $.inArray(v, playerMoves) !== -1;
                }).length === singleWinCondition.length;
                if (success) {
                    console.log("works");
                    break;
                }
            }
            // check if squares remainining is 0
        }

        function winCheckHelper(firstSquare, secondSquare, thirdSquare) {
            if (true) {}
        }

        this.removeSquareFromOpenSpace = function(move) {
            let position = this.openSpaces.indexOf(move);
            this.openSpaces.splice(position, 1);
        }

        this.isGameOver = function() {
            return this.gameOver;
        }
    }

    /*
    function removeSquareFromRemaing(playerMove, array) {
        let position = array.indexOf(playerMove);
        array.splice(position, 1);
    }
    */

    let size = 1;   // Will be abstracted out eventually.
    let side = 400;
    let width = size * side;
    let height = size * side;
    //var squares = [];
    var squareEvents = [];
    var gameContainer = $("<div>").addClass("gameContainer");
    //var squaresRemaining = [];

    var resetButton = $("<input>").attr("type", "button").attr("value","Reset").addClass("reset").addClass("topRow");
    var changeSidesButton = $("<input>").attr("type", "button").attr("value", "Change sides").addClass("controls").addClass("topRow");
    var instructionsDiv = $("<div>").text("X player moves first").addClass("instructions").addClass("topRow");
    var playerSideDiv = $("<div>").text("Playing as X's").addClass("playerSide").addClass("topRow");
    $("#TicTacToe").append(resetButton);
    $("#TicTacToe").append(changeSidesButton);
    $("#TicTacToe").append(instructionsDiv);
    $("#TicTacToe").append(playerSideDiv);

    var playerOne = new Player("Player 1", true);
    var AI = new AIPlayer(0);
    AI.changeSides();
    var game = new Game();
    game.addPlayer(playerOne);
    game.addPlayer(AI);
    AI.setName("AI");
    AI.setOpenSpaces(game.getOpenSpaces);
    AI.setOpponentMoves(playerOne.getMoves());
    
    // Add squares to the game
    for(var index = 1; index < 10; index += 1) {
        var className = "box" + index;
        var square = $("<div>").addClass(className).attr("id", index);
        game.addSquare(square);
        game.addOpenSpace(index);
        gameContainer.append(square); 
        addSquareSelect(square);
    }

    // Function to add square onclick events
    function addSquareSelect(square) {
        square.on("click", function(event) {
            square.addClass("userChoice");
            let playerMove = Number.parseInt(this.id);
            playerOne.addMove(playerMove);
            game.removeSquareFromOpenSpace(playerMove);
            console.log(game.getOpenSpaces());
            game.checkGameOver(playerOne);
            if (game.isGameOver()) {
                // change text to who won
                game.reset();
            }
            /*
            // If two players, not sure if I will use.
            if (playerOne.getPlayerSide()) {
                instructionsDiv.text("O's player turn");
            } else {
                instructionsDiv.text("X's player turn")
            }
            */

            /*
            removeSquareFromRemaing(playerMove, squaresRemaining);
            
            if (squaresRemaining.length === 0) {
               instructionsDiv.text("Tie! Press reset to restart");               
            } else 
            if (checkWin(playerOne)) {
                winGame(playerOne);
                console.log("Found a winner");
            } else {
                $(document).off(event);
                if (AI) {
                // TODO AI stuff
                let aiMove = AI.makeMove(game.getOpenSpaces(), playerOne.getMoves());
                squares[aiMove - 1].addClass("aiChoice").off("click");
                AI.addMove(aiMove);
                console.log(AI.getOpenSpaces());
                if (checkWin(AI)) {
                    winGame(AI);
                }
            }
            }
            */
        });
    }

    $("#TicTacToe").append(gameContainer);

    function winGame(player) {
        instructionsDiv.text(player.getName() + " won! Hit reset to start a new game!");
        for (var index = 0; index < squares.length; index += 1) {
            squares[index].off("click");
        }
    }

    function removeClickFromAllSquares() {
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
        let spacesLeft = squaresRemaining.length;
        for (var i = 0; i < spacesLeft; i++) {
            squaresRemaining.pop();
        }
        for (var i = 1; i < 10; i++) {
            squaresRemaining.push(i);
        }
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