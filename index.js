var Board = function(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.board = new Array(sizeX);
    for (var i = 0; i < this.board.length; ++i) {
        this.board[i] = new Array(sizeY);
    }
    return this.board;
};

var Game = function(board) {
    this.tick = 0;
    this.board = board;
    this.step = function() {
        var cellsToKill = [];
        var cellsToCreate = [];
        
        for (var y = 0; y < this.board.length; y++) {
            var row = this.board[y];
            if(row) {
                for (var x = 0; x < row.length; x++) {
                    var cell =row[x];
                    var neighbours = 0;
                    if(row[x-1]) neighbours++;
                    if(row[x+1]) neighbours++;
                    
                    var rowAbove = this.board[y-1];
                    var rowBelow = this.board[y+1];
                    if(rowAbove) {
                        if(rowAbove[x]) neighbours++;
                        if(rowAbove[x-1]) neighbours++;
                        if(rowAbove[x+1]) neighbours++;
                    }
                    if(rowBelow) {
                        if(rowBelow[x]) neighbours++;
                        if(rowBelow[x-1]) neighbours++;
                        if(rowBelow[x+1]) neighbours++;
                    }

                    if(cell) {
                        if(cell === "A") {
                            if(neighbours > 0) {
                                if(neighbours == 1 || neighbours == 4) {
                                    //One or four neighbours means die
                                    cellsToKill.push([x,y]);
                                    
                                }
                                else if(neighbours == 2 ||neighbours == 3) {
                                    //do nothing
                                    
                                }
                            }
                            else {
                                //No neighbours means die
                                cellsToKill.push([x,y]);
                                
                            }
                        }
                        else if(cell === "D") {
                            //Dead cell revial
                            if(neighbours == 3) {
                                cellsToCreate.push([x,y]);
                            }
                        }
                    }
                    else {
                        //Empty cell creation
                        if(neighbours == 3) {
                            cellsToCreate.push([x,y]);
                        }
                    }
                }
                
            }
        }
        
        if(cellsToCreate.length > 0) {
            for (var z = 0; z < cellsToCreate.length; ++z) {
                this.board[cellsToCreate[z][1]][cellsToCreate[z][0]] = "A";
            }
        }
        
        if(cellsToKill.length > 0) {
            for (var a = 0; a < cellsToKill.length; ++a) {
                this.board[cellsToKill[a][1]][cellsToKill[a][0]] = undefined;
            }
        }
        
        this.tick++;
    };

    this.printBoard = function() {
        for (var x = 0; x < this.board.length; ++x) {
            var row = this.board[x];
            var rowText = "";
            for (var y = 0; y < row.length; ++y) {
                if(typeof(this.board[x][y]) == "undefined") {
                    rowText += "-";
                }
                else {
                    rowText += (this.board[x][y]);
                }
            }
            console.log(rowText);
        }
    };
};

var b = new Board(30,30)
b[1][3] = "A";
b[2][1] = "A";
b[2][3] = "A";
b[3][2] = "A";
b[3][3] = "A";

var g = new Game(b);

var util = require('util');

var steps = process.argv[2] ? process.argv[2] : 1;

var stepsTaken = 0;
var interval;

var stepGame = function() {
    util.print("\u001b[2J\u001b[0;0H");
    g.step();
    console.log("GAME OF LIFE - step:",stepsTaken)
    g.printBoard();
    if(stepsTaken == steps) {
      clearInterval(interval);
    }
    stepsTaken++;
}

interval = setInterval(stepGame, 200);

module.exports.Board = Board;
module.exports.Game = Game;