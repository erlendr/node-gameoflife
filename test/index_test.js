var assert = require("assert");
var index = require("../index");

describe('Board', function(){
  describe('constructor', function(){
    it('should return an array of correct size', function(){
      var x = 10;
      var y = 10;
      var sut = new index.Board(x, x);
      assert.equal(sut.length, x, "Board x size shoudl equal "+ x);
      assert.equal(sut.length, y, "Board x size shoudl equal "+ y);
    })
  })
})

describe('Game', function(){
  describe('constructor', function(){
    it('should create board and set board property', function(){
      var x = 10;
      var y = 10;
      var board = new index.Board(x, x);
      var sut = new index.Game(board);
      assert.equal(typeof(board), typeof(sut.board));
    })
  })
  describe('#step', function(){
    it('should increment tick', function(){
      var sut = new index.Game(new index.Board(1,1));
      sut.step();
      assert(sut.tick == 1);
    })
  })
  describe('block seed', function(){
    it('block seed should remain alive in period 2', function(){
      var blockBoard = new index.Board(4,4);
      blockBoard[1][1] = "A";
      blockBoard[1][2] = "A";
      blockBoard[2][1] = "A";
      blockBoard[2][2] = "A";
      var sut = new index.Game(blockBoard);
      sut.printBoard();
      console.log("====")
      sut.step();
      assert(sut.board[1][1] == "A");
      assert(sut.board[1][2] == "A");
      assert(sut.board[2][1] == "A");
      assert(sut.board[2][2] == "A");
      sut.printBoard();
    })
  })
  describe('blinker seed', function(){
    it('blinker seed should rotate in period 2', function(){
      var blockBoard = new index.Board(5,5);
      blockBoard[2][1] = "A";
      blockBoard[2][2] = "A";
      blockBoard[2][3] = "A";
      var sut = new index.Game(blockBoard);
      sut.printBoard();
      console.log("=====")
      sut.step();
      sut.printBoard();
      assert(sut.board[2][1] === undefined);
      assert(sut.board[2][2] === "A");
      assert(sut.board[2][3] === undefined);
      assert(sut.board[1][2] === "A");
      assert(sut.board[3][2] === "A");

    })
    it('blinker seed should rotate in period 3', function(){
      var blockBoard = new index.Board(5,5);
      blockBoard[2][1] = "A";
      blockBoard[2][2] = "A";
      blockBoard[2][3] = "A";
      var sut = new index.Game(blockBoard);
      sut.printBoard();
      console.log("=====")
      sut.step();
      sut.step();
      sut.printBoard();
      assert(sut.board[2][1] === "A");
      assert(sut.board[2][2] === "A");
      assert(sut.board[2][3] === "A");
      assert(sut.board[1][2] === undefined);
      assert(sut.board[3][2] === undefined);
    })
  })
  describe('toad seed', function() {
    it('toad seed should change in period 2', function () {
      var blockBoard = new index.Board(6,6);
      blockBoard[2][2] = "A";
      blockBoard[2][3] = "A";
      blockBoard[2][4] = "A";
      blockBoard[3][1] = "A";
      blockBoard[3][2] = "A";
      blockBoard[3][3] = "A";
      var sut = new index.Game(blockBoard);
      sut.printBoard();
      sut.step();
      console.log("======");
      sut.printBoard();
      assert(sut.board[1][3] === "A");
      assert(sut.board[2][1] === "A");
      assert(sut.board[2][4] === "A");
      assert(sut.board[3][4] === "A");
      assert(sut.board[3][4] === "A");
      assert(sut.board[4][2] === "A");
      assert(sut.board[2][2] === undefined);
      assert(sut.board[2][3] === undefined);
    })
  })
describe('toad seed', function() {
    it('toad seed should change back in period 3', function () {
      var blockBoard = new index.Board(6,6);
      blockBoard[2][2] = "A";
      blockBoard[2][3] = "A";
      blockBoard[2][4] = "A";
      blockBoard[3][1] = "A";
      blockBoard[3][2] = "A";
      blockBoard[3][3] = "A";
      var sut = new index.Game(blockBoard);
      sut.printBoard();
      sut.step();
      sut.step();
      console.log("======");
      sut.printBoard();
      assert(sut.board[2][2] === "A");
      assert(sut.board[2][3] === "A");
      assert(sut.board[2][4] === "A");
      assert(sut.board[3][1] === "A");
      assert(sut.board[3][2] === "A");
      assert(sut.board[3][3] === "A");
    })
  })
})