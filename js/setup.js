// For creating the UI display
$(document).ready(function() {
    let size = 1;   // Will be abstracted out eventually.
    let side = 400;
    let width = size * side;
    let height = size * side;
    var squares = []

    for(var index = 1; index < 10; index += 1) {
        var className = "box" + index;
        var square = $("<div>").addClass(className);
        /*
        square.on("click", function(box) {
            this.className += " userChoice";
            squares.push(square);
            console.log(box);
        });
        */
        squares.push(square);
        $("#TicTacToe").append(square); 
        /*           
        square.on("click", function(event) {
            console.log(this);
            $(document).off(event);
        });
        */addSquareSelect(square);

    }


    function addSquareSelect(square) {
        square.on("click", function(event) {
            console.log(this);
            $(document).off(event);
        });
    }

    //$("#TicTacToe");
    /*
        Create 9 div tags
        Add class 'box' + number (start at 1)
        Append the divs to the TicTacToe object
        Add an event listener for each (changing background color is fine for now)
    */
});