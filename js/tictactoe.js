(function($) { 
    $(document).ready(function() {
        
        var init = function(caller, options) {
            var settings;
            if (options) {
                settings = $.extend({
                    size: "sm",
                    aiDiff: 0
                }, options );
            } else {
                settings = {size: "sm", aiDiff: 0}
            }

            var sizeFactor;
            switch (settings.size) {
                case "md":
                        sizeFactor = 1;
                        break;
                case "lg":
                        sizeFactor = 2;
                        break;
                default:
                        sizeFactor = 0;
                        break;
            }

            let side = 500 + sizeFactor * 200;
            let width = side;
            let height = side;
            function Player(name, isXSide, playerClass) {
               this.name = name;
               this.isPlayerX = isXSide;
               this.moves = [];
               this.playerClass = playerClass;

               this.getName = function() {
                    return this.name;
               }

               this.setName = function(newName) {
                    this.name = newName;
               }

               this.getIsXPlayer = function() {
                    return this.isPlayerX;
               }

               this.setIsXPlayer = function(xSide) {
                    this.isPlayerX = xSide;
               }

               this.changeSides = function(size) {
                    if (this.isPlayerX) {
                        this.isPlayerX = false;
                        this.playerClass = "oChoice-" + size; 
                    } else {
                        this.isPlayerX = true;
                        this.playerClass = "xChoice-" + size; 
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

               this.getPlayerClass = function() {
                    return this.playerClass;
               }

               this.setPlayerClass = function(newClass) {
                    this.playerClass = newClass;
               }
            }

            function AIPlayer(difficulty, name, isPlayerX, playerClass) {
                this.diff = difficulty;
                this.opponentMoves;
                this.openSpaces;

                Player.call(this, name, isPlayerX, playerClass);

                this.makeMove = function(game) {
                    if (this.diff === 2) {
                        if (!this.isPlayerX && this.openSpaces.includes(5)) {
                            this.moveCleanUp(5, game);
                            return 5;
                        }

                        let cornerMoves = this.makeCornerArray();
                        var move;

                        move = this.selectedMove(this.moves);

                        if (move != 0) {
                            this.moveCleanUp(move, game);
                            return move;
                        }


                        move = this.selectedMove(this.opponentMoves);
                        if (move != 0) {
                            this.moveCleanUp(move, game);
                            return move;
                        }

                        if (cornerMoves.length > 1) {
                            move = cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
                            this.moveCleanUp(move, game);
                            return move;
                        }

                        move = this.randomMove();
                        this.moveCleanUp(move, game);

                        return move;
                    } else if (this.diff === 1) {
                        if (this.openSpaces.includes(5)) {
                            this.moveCleanUp(5, game);
                            return 5;
                        }
                        var move = this.selectedMove(this.moves);

                        if (move != 0) {
                            this.moveCleanUp(move, game);
                            return move;
                        }

                        move = this.randomMove();
                        this.moveCleanUp(move, game);
                        return move;

                    } else {
                        let move = this.randomMove();
                        this.moveCleanUp(move, game);
                        return move;
                    }
                }

                this.moveCleanUp = function(move, game) {
                    this.addMove(move);
                    game.addClassToSquare(move, this.playerClass);
                }

                this.getOpponentMoves = function() {
                    return this.opponentMoves;
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

                this.makeCornerArray = function() {
                    let corners = [];
                    if (this.openSpaces.includes(1)) {
                        corners.push(1);
                    }
                    if (this.openSpaces.includes(3)) {
                        corners.push(3);
                    }

                    if (this.openSpaces.includes(7)) {
                        corners.push(7);
                    }

                    if (this.openSpaces.includes(9)) {
                        corners.push(9);
                    }

                    return corners;
                }

                this.selectedMove = function(setOfMoves) {
                    for (var i = this.openSpaces.length - 1; i >= 0; i--) {
                        switch (this.openSpaces[i]) {
                            case 1:
                                    if (setOfMoves.includes(2) && setOfMoves.includes(3)) {
                                        return 1;
                                    }

                                    if (setOfMoves.includes(4) && setOfMoves.includes(7)) {
                                        return 1;
                                    }

                                    if (setOfMoves.includes(5) && setOfMoves.includes(9)) {
                                        return 1;
                                    }
                                    break;
                            case 2:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(3)) {
                                        return 2;
                                    }

                                    if (setOfMoves.includes(5) && setOfMoves.includes(8)) {
                                        return 2;
                                    }
                                    break;
                            case 3:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(2)) {
                                        return 3;
                                    }
                                    if (setOfMoves.includes(5) && setOfMoves.includes(7)) {
                                        return 3;
                                    }

                                    if (setOfMoves.includes(6) && setOfMoves.includes(9)) {
                                        return 3;
                                    }
                                    break;
                            case 4:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(7)) {
                                        return 4;
                                    }

                                    if (setOfMoves.includes(5) && setOfMoves.includes(6)) {
                                        return 4;
                                    }
                                    break;
                            case 5:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(9)) {
                                        return 5;
                                    }

                                    if (setOfMoves.includes(2) && setOfMoves.includes(8)) {
                                        return 5;
                                    }

                                    if (setOfMoves.includes(3) && setOfMoves.includes(7)) {
                                        return 5;
                                    }

                                    if (setOfMoves.includes(4) && setOfMoves.includes(6)) {
                                        return 5;
                                    }

                                    break;
                            case 6:
                                    if (setOfMoves.includes(3) && setOfMoves.includes(9)) {
                                        return 6;
                                    }

                                    if (setOfMoves.includes(4) && setOfMoves.includes(5)) {
                                        return 6;
                                    }
                                    break;
                            case 7:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(4)) {
                                        return 7;
                                    }
                                    if (setOfMoves.includes(5) && setOfMoves.includes(3)) {
                                        return 7;
                                    }
                                    if (setOfMoves.includes(8) && setOfMoves.includes(9)) {
                                        return 7;
                                    }
                                    break;
                            case 8:
                                    if (setOfMoves.includes(5) && setOfMoves.includes(2)) {
                                        return 8;
                                    }
                                    if (setOfMoves.includes(7) && setOfMoves.includes(9)) {
                                        return 8;
                                    }
                                    break;
                            case 9:
                                    if (setOfMoves.includes(1) && setOfMoves.includes(5)) {
                                        return 9;
                                    }

                                    if (setOfMoves.includes(7) && setOfMoves.includes(8)) {
                                        return 9;
                                    }

                                    if (setOfMoves.includes(3) && setOfMoves.includes(6)) {
                                        return 9;
                                    }
                                    break;
                            default:
                                    return 0;
                        }
                    }
                    return 0;            
                }

                this.randomMove = function() {
                    return this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
                }

            }
            AIPlayer.prototype = Object.create(Player.prototype);
            AIPlayer.prototype.constructor = AIPlayer;


            function Game(resetButton, changeSidesButton, messageContainer, playerSideDiv, size) {
                this.players = [];
                this.AIPlayer;
                this.gameOver = false;
                this.squareObjects = [];
                this.openSpaces = [];
                this.resetButton = resetButton;
                this.changeSidesButton = changeSidesButton;
                this.playerSideDiv = playerSideDiv;
                let topRow = [1, 2, 3];
                let middleRow = [4, 5, 6];
                let bottomRow = [7, 8, 9];
                let leftColumn = [1, 4, 7];
                let middleColumn = [2, 5, 8];
                let rightColumn = [3, 6, 9];
                let diagonalTopToBottom = [1, 5, 9];
                let diagonalBottomToTop = [7, 5, 3];
                let xSide = "xChoice-" + size;
                let oSide = "oChoice-" + size;
                let resetSize = "reset-" + size;
                let controlSize = "controls-" + size;
                let xWin = "xWin-" + size;
                let oWin = "oWin-" + size;
                let font = "font-" + size;
                this.size = size;
                this.winConditions = [topRow, middleRow, bottomRow, leftColumn, 
                        middleColumn, rightColumn, diagonalTopToBottom,
                        diagonalBottomToTop];
                this.messageDiv = messageContainer;
                this.isGameOver = false;

                this.resetButton.addClass(resetSize).addClass(font);
                this.changeSidesButton.addClass(controlSize).addClass(font);
                this.messageDiv.addClass(font);
                this.playerSideDiv.addClass(font);



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
                    for (var i = 0; i < this.squareObjects.length; i++) {
                        this.squareObjects[i].off("click");
                        addSquareSelect(this.squareObjects[i]);
                        if (this.squareObjects[i].hasClass(xSide)) {
                            this.squareObjects[i].removeClass(xSide);
                        } else if (this.squareObjects[i].hasClass(oSide)) {
                            this.squareObjects[i].removeClass(oSide);
                        } else if (this.squareObjects[i].hasClass(xWin)) {
                            this.squareObjects[i].removeClass(xWin);
                        } else if (this.squareObjects[i].hasClass(oWin)) {
                            this.squareObjects[i].removeClass(oWin);
                        }
                    }
                    for (var i = 0; i < this.players.length; i++) {
                        this.players[i].resetMoves();
                    }
                    let spacesLeft = this.openSpaces.length;
                    for (var i = 0; i < spacesLeft; i++) {
                        this.openSpaces.pop();
                    }
                    for (var i = 1; i < 10; i++) {
                        this.openSpaces.push(i);
                    }
                    instructionsDiv.text("X player moves first");

                    if (AI.getIsXPlayer() === true) {
                        game.takeTurn(AI.makeMove(game));
                    }

                    this.isGameOver = false;

                    this.AIPlayer.setOpponentMoves(this.players[0].getMoves());
                }

                this.checkGameOver = function(player) {
                    let playerMoves = player.getMoves();
                    var success = false;
                    var threeSquares = [];
                    for (var i = 0; i < this.winConditions.length; i++) {
                        let singleWinCondition = this.winConditions[i];
                        success = $.grep(singleWinCondition, function(v, i) {
                            return $.inArray(v, playerMoves) !== -1;
                        }).length === singleWinCondition.length;
                        if (success) {
                            threeSquares = singleWinCondition;
                            break;
                        }
                    }

                    if (success) {
                        this.isGameOver = true;
                        this.disableAllSquares();
                        this.messageDiv.text(player.getName() + " has won! Press reset to restart the game").parent().removeClass("instructions-wrapper").addClass("instructions-wrapper-win");

                        let winSide;
                        if (player.getIsXPlayer()) {
                            winSide = xWin;
                        } else {
                            winSide = oWin;
                        }
                        for (var i = threeSquares.length - 1; i >= 0; i--) {
                            this.squareObjects[threeSquares[i] - 1].addClass(winSide).removeClass(player.getPlayerClass());
                        }
                    }
                    if (this.openSpaces.length === 0) {
                        this.isGameOver = true;
                        this.disableAllSquares();
                        this.messageDiv.text("Tie! Press reset to restart the game.");
                    }
                }



                this.setAI = function(AI) {
                    this.AIPlayer = AI;
                }

                this.removeSquareFromOpenSpace = function(move) {
                    let position = this.openSpaces.indexOf(move);
                    this.openSpaces.splice(position, 1);
                }

                this.disableAllSquares = function() {
                    for (var i = 0; i < this.squareObjects.length; i += 1) {
                        this.squareObjects[i].off("click");
                    }
                }

                this.disableSquare = function(squareNumber) {
                    this.squareObjects[squareNumber - 1].off("click");
                }

                this.swapSides = function() {
                    for (var i = this.players.length - 1; i >= 0; i--) {
                        this.players[i].changeSides(this.size);
                    }
                }

                this.addClassToSquare = function(squareNumber, playerClass) {
                    this.squareObjects[squareNumber - 1].addClass(playerClass);
                }

                this.takeTurn = function(move) {
                    this.removeSquareFromOpenSpace(move);
                    this.disableSquare(move);
                }

                this.getGameState = function() {
                    return this.isGameOver;
                }
            }


            var squareEvents = [];
            //var gameObject = $("<div>");
            caller.addClass("game");
            var gameContainer = $("<div>").addClass("gameContainer").css("width", width).css("height", height);

            var resetButton = $("<input>").attr("type", "button").attr("value","Reset").addClass("reset").addClass("topRow");
            var changeSidesButton = $("<input>").attr("type", "button").attr("value", "Change sides").addClass("controls").addClass("topRow");
            var instructionsWrapper = $("<div>").addClass("instructions-wrapper");
            var instructionsDiv = $("<div>").text("X player moves first").addClass("instructions").addClass("topRow");
            var playerSideDiv = $("<div>").text("You are X's").addClass("playerSide").addClass("topRow");
            instructionsWrapper.append(instructionsDiv);
            caller.append(resetButton);
            caller.append(changeSidesButton);
            caller.append(instructionsWrapper);
            caller.append(playerSideDiv);

            var playerOne = new Player("Player 1", true, "xChoice-" + settings.size);
            var AI = new AIPlayer(settings.aiDiff, "AI", false, "oChoice-" + settings.size);
            var game = new Game(resetButton, changeSidesButton, instructionsDiv, playerSideDiv,settings.size);
            game.addPlayer(playerOne);
            game.addPlayer(AI);
            game.setAI(AI);
            AI.setOpenSpaces(game.getOpenSpaces());
            AI.setOpponentMoves(playerOne.getMoves());
           
            for(var index = 1; index < 10; index += 1) {
                var className = "box" + index;
                var square = $("<div>").addClass(className).attr("id", index);
                game.addSquare(square);
                game.addOpenSpace(index);
                gameContainer.append(square); 
                addSquareSelect(square);
            }
            function addSquareSelect(square) {
                square.on("click", function(event) {
                    square.addClass(playerOne.getPlayerClass());
                    let playerMove = Number.parseInt(this.id);
                    playerOne.addMove(playerMove);
                    game.takeTurn(playerMove);
                    game.checkGameOver(playerOne);
                    if (game.getGameState() == false) {
                        game.takeTurn(AI.makeMove(game));
                        game.checkGameOver(AI);
                    }
                });
            }


            caller.append(gameContainer);

            resetButton.on("click", function() {
                game.reset();
            });

            changeSidesButton.on("click", function() {
                if (playerOne.getIsXPlayer()) {
                    playerSideDiv.text("You are O's");
                } else {
                    playerSideDiv.text("You are X's");
                }
                game.swapSides();
                game.reset();
            });

            return caller;
        }
        
        $.fn.tictactoe = function(options) {
            return init(this, options);
        }
        
    });

})(jQuery);