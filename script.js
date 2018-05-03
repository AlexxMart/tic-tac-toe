	const boardSize = document.getElementById("boardSize");
	const sizeBtn = document.getElementById("inputSize");
	const grid = document.getElementById("grid");
	const board = document.querySelector(".board");
	const turn = document.getElementById("turn");
	const scoreX = document.getElementById("scoreX");
	const scoreO = document.getElementById("scoreO");

	//these variables will have an array with the IDs of the items that have been played and that info will be used with the formula to determine the winner
	let playerX = [];
	let playerO = [];

	let cellsAvailable = 0;

//winningCombos will end up containing a hash table with all the winning combinations, hash is there just to accumulate values and push arrays to winningCombos
	let winningCombos = [];
	let hash = [];

/*each cell has an index number in the winningCombos table, the number of indexes will change depending on the board's size, the indexes will be summed and stored in "pointsNeeded". The functions at the bottom will compare if the needed score has been reached*/

let pointsNeeded = 0;
	//*********** Event Listeners **********

	boardSize.addEventListener("change", function() {
		grid.innerHTML = boardSize.value;
	});

	sizeBtn.addEventListener("click", gameStart)

	//********** Functions *************

	function gameStart () {
		if(boardSize.value < 3 || boardSize.value > 15) return;
		pointsNeeded = 0;
//counter will keep track of the incremental ID value for each DIV
		let counter = 1;
		winningCombos = [];
		
//calculates how many cells are in the grid
		cellsAvailable = boardSize.value * boardSize.value;
		
//clears the board from any existing grid to prevent them from piling up
		board.innerHTML = '';
		
//these two lines remove the array inside the o and x variables to start the winning calculation from scratch on each new game
		playerO = [];
		playerX = [];

//the for loops are there just to repeat the cell creation process the amount of times we need
		for(let i = 1; i <= boardSize.value; i++){
			for(let j = 1; j <= boardSize.value; j++){
				let cell = document.createElement("div");
				cell.className = "boardCell";
				cell.id = (counter++);
				board.appendChild(cell);
		}
			pointsNeeded += (i - 1);
//this makes the parent DIV just big enough to hold an specific amount of cells and force the rest to wrap on a different line
		board.style.width = 55 * boardSize.value + "px";
		}
		console.log(pointsNeeded);
		
		const blocks = document.querySelectorAll(".boardCell");
		
		blocks.forEach(block => block.addEventListener("click", 				handleClick))
		
//creates the winning combinations for rows
		for(let i = 1; i <= cellsAvailable; i++){
			hash.push(i);
			if(hash.length == boardSize.value){
				winningCombos.push(hash);
				hash = [];
		  }
		}
		
//creates the winning combinations for columns
		for(let k = 0; k < boardSize.value; k++){
			for(let j = 0; j < boardSize.value; j++){
				hash.push(winningCombos[j][k]);
				if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			  }
			}
		}
		
//creates the winning combination for diagonals
		for(let i = 0; i < boardSize.value; i++){
			hash.push(winningCombos[i][i]);
			if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			}
		}
		
//creates the winning combination for anti-diagonals
	for(let a = 0; a < boardSize.value; a++){
			hash.push(winningCombos[a][(boardSize.value - 1) - a]);
			if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			}
		}
	console.log(winningCombos);
}
	
let symbolsToggle = "X";

function handleClick () {
	if(symbolsToggle == "X"){
		turn.innerHTML = "O";
		this.innerHTML = symbolsToggle;
		playerX.push(this.id);
		this.removeEventListener("click", handleClick);
		symbolsToggle = "O";
		console.log(playerX);
	} else {
		turn.innerHTML = "X";
		this.innerHTML = symbolsToggle;
		playerO.push(this.id);
		this.removeEventListener("click", handleClick);
		symbolsToggle = "X";
		console.log(playerO);
	}
}

function checkWinner () {
  
}
