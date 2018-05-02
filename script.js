const boardSize = document.getElementById("boardSize");
const sizeBtn = document.getElementById("inputSize");
const grid = document.getElementById("grid");
const board = document.querySelector(".board");
const turn = document.getElementById("turn");

//these variables will have an array with the IDs of the items that have been played and that info will be used with the formula to determine the winner
let x = [].sort();
let o = [].sort();

let cellsAvailable = 0;

//winningCombos will end up containing a hash table with all the winning combinations, hash is there just to accumulate values and push arrays to winningCombos
let winningCombos = [];
let hash = [];

//*********** Event Listeners **********

boardSize.addEventListener("change", function () {
	grid.innerHTML = boardSize.value;
});

sizeBtn.addEventListener("click", gameStart)

//********** Functions *************

function gameStart() {
	if (boardSize.value < 3 || boardSize.value > 15) return;

	let counter = 1;
	winningCombos = [];

	//calculates how many cells are in the grid
	cellsAvailable = boardSize.value * boardSize.value;

	//clears the board from any existing grid to prevent them from piling up
	board.innerHTML = '';

	//these two lines remove the array inside the o and x variables to start the winning calculation from scratch on each new game
	o = [];
	x = [];

	//the for loops are there just to repeat the cell creation process the amount of times we need
	for (let i = 1; i <= boardSize.value; i++) {
		for (let j = 1; j <= boardSize.value; j++) {
			let cell = document.createElement("div");
			cell.className = "boardCell";
			cell.id = (counter++);
			board.appendChild(cell);
		}
		//this makes the parent DIV just big enough to hold an specific amount of cells and force the rest to wrap on a different line
		board.style.width = 55 * boardSize.value + "px";
	}

	const blocks = document.querySelectorAll(".boardCell");

	blocks.forEach(block => block.addEventListener("click", handleClick))

	//creates the winning combinations for rows
	for (let i = 1; i <= cellsAvailable; i++) {
		hash.push(i);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}

	//creates the winning combinations for columns
	for (let k = 0; k < boardSize.value; k++) {
		for (let j = 0; j < boardSize.value; j++) {
			hash.push(winningCombos[j][k]);
			if (hash.length == boardSize.value) {
				winningCombos.push(hash);
				hash = [];
			}
		}
	}

	//creates the winning combination for diagonals
	for (let i = 0; i < boardSize.value; i++) {
		hash.push(winningCombos[i][i]);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}

	//creates the winning combination for anti-diagonals
	for (let a = boardSize.value - 1; a >= 0; a--) {
		hash.push(winningCombos[a][a]);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}
}

//this will add 1 after every turn and will be used to toggle who's turn is it with the function "handleClick"
let symbolsToggle = 0;

function handleClick() {
	symbolsToggle++;
	if (symbolsToggle % 2 == 0) {
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

function checkWinner() {

	console.log(winningCombos);

	if (x.length + o.length == cellsAvailable) {
		alert("It's a draw ya'll");
		gameStart();
	}
}
