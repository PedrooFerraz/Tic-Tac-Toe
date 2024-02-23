
var squares = document.querySelectorAll(".sqr")
var symbols = ["x", "o"]
var playerTime = 0;
var winSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var board = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

var sqrID = [];

for (let x = 0; x < squares.length; x++) {
    sqrID.push(squares[x].id)
}

for (let x = 0; x < squares.length; x++) {
    if (board[x] == -1) {
        squares[x].addEventListener("mousedown", makeAMove)
    }
}

function makeAMove(event) {
    var clickedSquareId = event.target.id
    var square = document.getElementById(clickedSquareId)
    if (board[clickedSquareId - 1] == -1) {
        board[clickedSquareId - 1] = playerTime;
        changePlayerTime();
        addSymbol(square)
        isWin()
        if (isWin() == true) {
            gameOver()
        }
        else{
        if(!board.includes(-1)){
            isDraw()
        }
        }
    }

}

function changePlayerTime() {

    if (playerTime == 0) {
        playerTime = 1;
    }
    else if (playerTime == 1) {
        playerTime = 0;
    }

}

function addSymbol(x) {
    var s = x;
    s.innerHTML = `<div class="${symbols[playerTime]}"</div>`
}

function isWin() {
    for (let i = 0; i < winSet.length; i++) {
        let seq = winSet[i];

        let symbol = board[seq[0]];
        if (symbol != -1 &&
            symbol == board[seq[1]] &&
            symbol == board[seq[2]]) {
            return true;
        }
    }

    return false;
}

function isDraw() {

    let results = document.getElementById("results")
    results.innerHTML = `<h3>Jogo terminado em EMPATE</h3>`

    let restart = document.getElementById("restart")

    setTimeout(() => {
        restart.style.display = 'flex'
    }, 1000)

    restart.addEventListener("click", () => {

        window.location.reload()

    })

}


function gameOver() {

    for (let x = 0; x < squares.length; x++) {
        if (board[x] == -1) {
            squares[x].removeEventListener("mousedown", makeAMove)
        }
    }
    let results = document.getElementById("results")
    results.innerHTML = `<h3>O vencedor é o Player ${playerTime + 1}</h3>`

    let restart = document.getElementById("restart")

    setTimeout(() => {
        restart.style.display = 'flex'
    }, 1000)

    restart.addEventListener("click", () => {

        window.location.reload()

    })

}

