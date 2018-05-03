	const boardSize = document.getElementById("boardSize");
	const sizeBtn = document.getElementById("inputSize");
	const grid = document.getElementById("grid");
	const board = document.querySelector(".board");
	const turn = document.getElementById("turn");
	let scoreX = document.getElementById("scoreX");
	let scoreO = document.getElementById("scoreO");
	let xWon = 0;
	let oWon = 0;
	let playerX = [];
	let playerO = [];
	let cellsAvailable = 0;
	let winningCombos = [];
	let hash = [];

	boardSize.addEventListener("change", function() {
		grid.innerHTML = boardSize.value;
	});

	sizeBtn.addEventListener("click", gameStart)

	function gameStart () {
		let counter = 1;
		winningCombos = [];
		cellsAvailable = boardSize.value * boardSize.value;
		board.innerHTML = '';
		playerO = [];
		playerX = [];

    for(let i = 1; i <= boardSize.value; i++){
			for(let j = 1; j <= boardSize.value; j++){
				let cell = document.createElement("div");
				cell.className = "boardCell";
				cell.id = (counter++);
				board.appendChild(cell);
		}
		board.style.width = 55 * boardSize.value + "px";
		}
		
		
		blocks.forEach(block => block.addEventListener("click", handleClick))

    for(let i = 1; i <= cellsAvailable; i++){
			hash.push(i);
			if(hash.length == boardSize.value){
				winningCombos.push(hash);
				hash = [];
		  }
		}
		
		for(let k = 0; k < boardSize.value; k++){
			for(let j = 0; j < boardSize.value; j++){
				hash.push(winningCombos[j][k]);
				if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			  }
			}
		}
		
		for(let i = 0; i < boardSize.value; i++){
			hash.push(winningCombos[i][i]);
			if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			}
		}
		
	for(let a = 0; a < boardSize.value; a++){
			hash.push(winningCombos[a][(boardSize.value - 1) - a]);
			if(hash.length == boardSize.value){
					winningCombos.push(hash);
					hash = [];
			}
		}
}
	
let symbolsToggle = "X";

function handleClick () {
	if(symbolsToggle == "X"){
		turn.innerHTML = "O";
		this.innerHTML = symbolsToggle;
		playerX.push(Number(this.id));
		this.removeEventListener("click", handleClick);
		symbolsToggle = "O";
		checkX();
	} else {
		turn.innerHTML = "X";
		this.innerHTML = symbolsToggle;
		playerO.push(Number(this.id));
		this.removeEventListener("click", handleClick);
		symbolsToggle = "X";
		checkO();
	}
}

function checkX () {
	if(playerX.length + playerO.length == cellsAvailable){
		alert("It's a draw ya'll!")
		gameStart();
	}
	
	for(let [index, win] of winningCombos.entries()){
		if(win.every(elem => playerX.indexOf(elem) > -1)){
			xWon++;
			alert("X WON!");
			gameStart();
			scoreX.innerHTML = xWon;
		}
	}
}

function checkO () {
	if(playerX.length + playerO.length == cellsAvailable){
		alert("It's a draw ya'll!")
		gameStart();
	}
	
	for(let [index, win] of winningCombos.entries()){
		if(win.every(elem => playerO.indexOf(elem) > -1)){
			oWon++;
			alert("O WON!");
			gameStart();
			scoreO.innerHTML = oWon;
		}
	}
}