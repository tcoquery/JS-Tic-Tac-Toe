const btn = document.querySelector("#btn");

const player = (name, marker) => {
    return {name, marker};
};

const gameBoard = (() => {
    let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let player1 = {};
    let player2 = {};
    const displayBoard = () => {
        for (let i = 1; i < 10; i++) {
            let grid = document.getElementById(i);
            grid.textContent = board[i-1];
        }
    }
    const updateBoard = (n) => {
        if(gameFlow.round == 1) {
            if(board[n-1] == "X" || board[n-1] == "O") {
                alert("This cell is already occupied !");
            } else { 
                board[n-1] = gameBoard.player1.marker;
                gameFlow.round++;
                displayBoard();
            }            
        } else {
            if(board[n-1] == "X" || board[n-1] == "O") {
                alert("This cell is already occupied !");
            } else {
                board[n-1] = gameBoard.player2.marker;
                gameFlow.round--;
                displayBoard();
            }
        }
    }
    return {board, player1, player2, displayBoard, updateBoard};
})();

const gameFlow = (() => {
    let round = 1; 
    return {round};
})();

let grid = document.querySelectorAll(".grid-cell")
grid.forEach(cell =>{
    cell.addEventListener("click", function() {
        gameBoard.updateBoard(cell.getAttribute('data-value'));
    });
});

btn.addEventListener("click", () => {
    if(document.getElementById('player-1').value == "" || document.getElementById('player-2').value == "") {
        alert("Player's names cannot be empty.");
        return;
    } else {
        gameBoard.player1 = player(document.getElementById('player-1').value, "X"); 
        gameBoard.player2 = player(document.getElementById('player-2').value, "O");
        document.querySelector(".player-info").style.visibility = "hidden";
        
    }
});

gameBoard.displayBoard();
console.log(gameBoard.board)