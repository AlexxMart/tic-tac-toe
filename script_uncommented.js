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

grid.innerHTML = boardSize.value;
boardSize.addEventListener("change", function () {
	grid.innerHTML = boardSize.value;
});

sizeBtn.addEventListener("click", gameStart)

function gameStart() {
	if (boardSize.value < 3 || boardSize.value > 15) return;
	let counter = 1;
	winningCombos = [];
	cellsAvailable = boardSize.value * boardSize.value;
	board.innerHTML = '';

	playerO = [];
	playerX = [];

	for (let i = 1; i <= boardSize.value; i++) {
		for (let j = 1; j <= boardSize.value; j++) {
			let cell = document.createElement("div");
			cell.className = "boardCell";
			cell.id = (counter++);
			board.appendChild(cell);
		}
		board.style.width = 54 * boardSize.value + "px";
		board.classList.add("border");
	}

	const blocks = document.querySelectorAll(".boardCell");
	blocks.forEach(block => block.addEventListener("click", handleClick))

	for (let i = 1; i <= cellsAvailable; i++) {
		hash.push(i);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}

	for (let k = 0; k < boardSize.value; k++) {
		for (let j = 0; j < boardSize.value; j++) {
			hash.push(winningCombos[j][k]);
			if (hash.length == boardSize.value) {
				winningCombos.push(hash);
				hash = [];
			}
		}
	}

	for (let i = 0; i < boardSize.value; i++) {
		hash.push(winningCombos[i][i]);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}

	for (let a = 0; a < boardSize.value; a++) {
		hash.push(winningCombos[a][(boardSize.value - 1) - a]);
		if (hash.length == boardSize.value) {
			winningCombos.push(hash);
			hash = [];
		}
	}
}

let symbolsToggle = "X";

function handleClick() {
	if (symbolsToggle == "X") {
		turn.innerHTML = "<p>O</p>";
		this.innerHTML = "<p>X</p>";
		this.classList.add("used");
		playerX.push(Number(this.id));
		this.removeEventListener("click", handleClick);
		symbolsToggle = "O";
		checkX();
	} else {
		turn.innerHTML = "<p>X</p>";
		this.innerHTML = "<p>O</p>";;
		playerO.push(Number(this.id));
		this.classList.add("used");
		this.removeEventListener("click", handleClick);
		symbolsToggle = "X";
		checkO();
	}
}

function checkX() {
	for (let [index, win] of winningCombos.entries()) {
		if (win.every(elem => playerX.indexOf(elem) > -1)) {
			xWon++;
			alert("X WON!");
			gameStart();
			scoreX.innerHTML = xWon;
		}
	}
	if (playerX.length + playerO.length == cellsAvailable) {
		alert("It's a draw ya'll!")
		gameStart();
	}
}

function checkO() {
	for (let [index, win] of winningCombos.entries()) {
		if (win.every(elem => playerO.indexOf(elem) > -1)) {
			oWon++;
			alert("O WON!");
			gameStart();
			scoreO.innerHTML = oWon;
		}
	}
	if (playerX.length + playerO.length == cellsAvailable) {
		alert("It's a draw ya'll!")
		gameStart();
	}
}
