import Board from "./board.js";

let board = new Board(); // creates a new game board
console.log(board);
// Examine the grid of the game board in the browser console.

// Your code here
document.addEventListener("DOMContentLoaded", () => {
 
    startGame()
 
})



function createTable() {
    const tableForBattleShip = document.createElement("table");
    for (let i = 0; i < board.grid.length; i++) {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("data-rowId", i)
        tableForBattleShip.appendChild(tableRow)
        for (let j = 0; j < board.grid[i].length; j++) {
            let tableCol = document.createElement("td");
            tableCol.setAttribute("data-col-id", j)
            tableCol.setAttribute("data-row-id", i)
            tableCol.setAttribute("data-value", board.grid[i][j]);
            tableRow.appendChild(tableCol);
        }
    }
    document.body.appendChild(tableForBattleShip);
}

function clickingASqaure() {
  const gridCells =  document.querySelectorAll("td");
    gridCells.forEach(gridCell => {
        gridCell.addEventListener("click", updateGridCell)
  
    })
}  

function updateGridCell(event){
    const clickedCell = event.target;
    if (clickedCell.dataset.value !== "null") {
        if(clickedCell.style.backgroundColor !== "green"){
        clickedCell.style.backgroundColor = "green"
        console.log(clickedCell.dataset.rowId)
        console.log(clickedCell.dataset.colId)
        clickedCell.innerText = board.makeHit(Number(clickedCell.dataset.rowId), Number(clickedCell.dataset.colId))
        console.log("hit");
      
        console.log(board);
        isGameOver();
        }
    } else {
        console.log("miss");
        clickedCell.style.backgroundColor = "red";
    }
}


function isGameOver(){
    if(board.isGameOver()){
        const gridCells = document.querySelectorAll("td");
        gridCells.forEach(gridCell => {
            gridCell.removeEventListener("click", updateGridCell)
        })
        console.log("Game over");
        const gameOverTag =  document.createElement("p");
        gameOverTag.innerText=`GAME OVER`
        document.body.appendChild(gameOverTag);
        resetGame()
    }
}
 
function resetGame() {
    const resetGameButton = document.createElement("button");
    resetGameButton.setAttribute("data-function","reset-game")
    resetGameButton.innerText=`Reset Game`
    const gridBody = document.querySelector("table");
    document.body.insertBefore(resetGameButton,gridBody);
    
    resetGameButton.addEventListener("click",() => {
      
        const gameOverTag = document.querySelector("p");
        gridBody.remove()
        gameOverTag.remove()
        resetGameButton.remove()
        startGame()
    })

}



function startGame() {
    board = new Board();
    createTable();
    clickingASqaure()
}