const btn = document.querySelector("#btn");
const restart = document.querySelector("#restart");
const playerInfo = document.querySelector(".player-info");

window.onload = function() {
    playerInfo.style.display = "flex";
}

const player = (name, marker) => {
    return {name, marker};
};

const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    let winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3]];
    const displayBoard = () => {
        for (let i = 1; i < 10; i++) {
            let grid = document.getElementById(i);
            grid.textContent = board[i-1];
        }
    }

    const updateBoard = (n) => {      
        if(gameFlow.round % 2 != 0) {
            if(board[n-1] == "X" || board[n-1] == "O") {
                alert("This cell is already occupied !");
            } else { 
                board[n-1] = gameFlow.player1.marker;
                gameFlow.round++;
                winningBoard(n, gameFlow.player1.marker);
                displayBoard();
                checkWinner();
            }            
        } else {
            if(board[n-1] == "X" || board[n-1] == "O") {
                alert("This cell is already occupied !");
            } else {
                board[n-1] = gameFlow.player2.marker;
                gameFlow.round++;
                winningBoard(n, gameFlow.player2.marker);
                displayBoard();
                checkWinner();
            }
        }
    }

    const winningBoard = (num, marker) => {
        num.toString();
        for (let i = 0; i < 8; i++) { 
            for (let j = 0; j < 3; j++) {
                if(winningCombinations[i][j] == num) {
                    winningCombinations[i][j] = marker
                }
            }
        }
    }  

    const checkWinner = () => {
        for (let i = 0; i < 8; i++) {
            if (winningCombinations[i].every(elem => elem == "X")) {
                alert(`${gameFlow.player1.name} has won!`);
            } else if (winningCombinations[i].every(elem => elem == "O")) {
                alert(`${gameFlow.player2.name} has won!`);
            }  
        } if (gameFlow.round == 10) {
            alert("it's a draw!");
            return
        }
    }

    const restart = () => {
        winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3]];
        board = ["","","","","","","","",""];
        gameFlow.round = 1;
        for (let i = 1; i < 10; i++) {
            let grid = document.getElementById(i);
            grid.textContent = '';
        }
    }

    return {winningCombinations, restart, displayBoard, updateBoard};
})();

const gameFlow = (() => {
    let round = 1; 
    let player1 = {};
    let player2 = {};

    return {round, player1, player2};
    
})();


let grid = document.querySelectorAll(".grid-cell")
grid.forEach(cell =>{
        cell.addEventListener("click", function() {
            if(gameFlow.player1.marker === undefined) {
                alert("You must enter players' name");
                return; 
            } else {
                gameBoard.updateBoard(cell.getAttribute('data-value'));
            }
    })
});

btn.addEventListener("click", () => {
    if(document.getElementById('player-1').value == "" || document.getElementById('player-2').value == "") {
        alert("Players' names cannot be empty.");
        return;
    } else {
        gameFlow.player1 = player(document.getElementById('player-1').value, "X"); 
        gameFlow.player2 = player(document.getElementById('player-2').value, "O");
        playerInfo.style.display = "none";
    }
});

restart.addEventListener("click", () => {
    gameBoard.restart();
})

gameBoard.displayBoard();


