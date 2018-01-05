# tictactoe
A javascript based Tic Tac Toe game made for fun.

# Requirements
jQuery is required as this is a jQuery plugin. I would use version 3.x though it likely works on older versions, I have not tested this.
The tictactoe.js file is the only javascript file that needs to be included. The CSS file must be included as well as it contains the classes which are used for sizing and images. Finally, the images within the image directory are needed as well.

# Installation
Begin by copying this repository either through a fork of your own or just cloning the code.
Being a jQuery plugin, utilizing this code very simple. Simply declare a div element with an id of your choosing. Use `$("#TicTacToeId").tictactoe()` to call the plugin.
Current optional settings:
```
size:   "sm" - small
        "md" - medium
        "lg" - large

aiDiff: 0 - easy
        1 - medium
        2 - hard
```
The default options are small size and easy difficulty.

# Example
```
    $("#TicTacToe").tictactoe({"aiDiff": 2});
```
This will create a small version of the game with the AI set to hard difficulty.

# Implementation
First, the AI is hard coded. No machine learning or fancy algorithms used for decision making. At it's hardest difficulty it makes a move based on the following: if the middle square is open and it is not first, if it can win with the move, if the opponent can win it will block, if there are still corners to, and finally a random move based on the squares left.

Second, the images I created are very simple and can be changed quite easily. Simply delete the old image and replace it with an image of your choosing. The name must match the old example or it won't be found.