const boardSize = document.getElementById("boardSize");
const sizeBtn = document.getElementById("inputSize");
const grid = document.getElementById("grid");
const board = document.querySelector(".board");
const turn = document.getElementById("turn");

//these variables will have an array with the IDs of the items that have been played and that info will be used with the formula to determine the winner
let x = [];
let o = [];

let cellsAvailable = boardSize.value * boardSize.value;

//*********** Event Listeners **********

boardSize.addEventListener("change", function() {
	grid.innerHTML = boardSize.value;
});

sizeBtn.addEventListener("click", gameStart)

//********** Functions *************

function gameStart () {
		let counter = 1;
//clears the board from any existing grid to prevent them from piling up
	board.innerHTML = '';
	
//these two lines remove the array inside the o and x variables to start the winning calculation from scratch on each new game
	o = [];
	x = [];
	
//the for loops are there just to repeat the cell creation process the amount of times we need
	for(let i = 1; i <= boardSize.value; i++){
		for(let j = 1; j <= boardSize.value; j++){
			let cell = document.createElement("div");
			cell.className = "boardCell";
			cell.id = (counter++);
			board.appendChild(cell);
	}
//this makes the parent DIV just big enough to hold an specific amount of cells and force the rest to wrap on a different line
 	board.style.width = 55 * boardSize.value + "px";
	}
	
//add event listener to every block in the board
const blocks = document.querySelectorAll(".boardCell");

blocks.forEach(block => block.addEventListener("click", handleClick))
}

//this will add 1 after every turn and will be used to toggle who's turn is it with the function "handleClick"
let symbolsToggle = 0;

function handleClick () {
	symbolsToggle++;
	if(symbolsToggle % 2 == 0){
		turn.innerHTML = "X"
		this.innerHTML = "O";
		o.push(this.id);
		this.removeEventListener("click", handleClick)
	} else {
		turn.innerHTML = "O"
		this.innerHTML = "X";
		x.push(this.id);
		this.removeEventListener("click", handleClick)
	}
	console.log("X " + x);
	console.log("O " + o);
	checkWinner();
}

//i 1 based index
//j all numbers in array

function checkWinner () {
	for(let i = 1; i <= boardSize.value; i++){
		for(let j = 1; j <= boardSize.value; j++){
			
		}		
	}
	
	if(x.length + o.length == cellsAvailable){
		alert("It's a draw ya'll");
		gameStart();
	}
}
