//Factory to create and manage gameboard
function GameBoard() {
    
    const rows = 3;
    const columns = 3;
    const board = [];




    let selectedMove;
    let validMove;

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++){
            board[r].push(0);
        }
    }
    console.log(board);

    const printBoard = () => {
        console.table(board);
    } 

    const playMove = (player, move) => {
            let locX;
            let locY;
        switch (move) {
            case 1: locX = 0; locY = 0; break;
            case 2: locX = 0; locY = 1; break;
            case 3: locX = 0; locY = 2; break;
            case 4: locX = 1; locY = 0; break;
            case 5: locX = 1; locY = 1; break;
            case 6: locX = 1; locY = 2; break;
            case 7: locX = 2; locY = 0; break;
            case 8: locX = 2; locY = 1; break;
            case 9: locX = 2; locY = 2; break;
        }
        console.log(locX, locY);
        let isValid = selectLocation(locX, locY, player);
        if (isValid === false){
            return false;
        } return true;
    }



    const selectLocation = (x, y, player) => {
                    
        let rowX = board[x];
        
        
        if ((rowX[y]) === 0) {
            rowX.splice(y, 1, player.token);
            return true;
        } else {
            console.log(`invalid move`);
            return false;
            }
        }
     

 

    const moveHandler = (player, move) => {
         
        let isValid = playMove(player, move)
        if (isValid === false){
            return false;
        } return true;







    }

    const getBoard = () => {
        return board;
    }

    return { printBoard, selectLocation, getBoard, moveHandler }

}



// Factory for game flow and outcome
function GameLogic() {
    
    let gamemoves = 0;
    let players;

    const makePlayers = (p1, p2) => {
        const player1Div = document.createElement("div");
        const player2Div = document.createElement("div");
        const playersDiv = document.querySelector("#players");

        players = [
        {
            name: p1,
            token: 1
        },
        {
            name: p2,
            token: -1
        }
    ]
        console.log(players.name);
        activePlayer = players[0];

        player1Div.textContent = `Player 1 (X): ${p1}`
        player1Div.classList.add = (`player-label`)
        playersDiv.appendChild(player1Div);
        player2Div.textContent = `Player 2 (O): ${p2}`
        player1Div.classList.add = (`player-label`)
        playersDiv.appendChild(player2Div);


    };
    
    const switchPlayer = () => {
        let a = players.shift()
        players.push(a);
        activePlayer = players[0];
    }

    const getActivePlayer = () => {
        return activePlayer;
    }


    const outcomeCheck = (board) => {
        let win = false;
        let checkBoard = board;
        checkBoard = [...checkBoard];


        const winner = (value) => {
            if ((value === 3) || (value === -3)){
                console.log(`win detected`);
                win = true;
            } 
        }
        
        const sum = (arr) => {
            return arr.reduce((num, a) => num + a, 0);
        }


        const coulmnCheck = (coulmnNum) => {
            while (coulmnNum > -1) {
            let coulmn = checkBoard.map(x => x[coulmnNum]);
            coulmn = sum(coulmn);
            winner(coulmn);
            coulmnNum--;
            }
        }

        const rowCheck = (rowNum) => {
            while (rowNum > -1) {
            let row = checkBoard[rowNum];
            row = sum(row);
            winner(row);
            rowNum--;
            }
        }

        //decontruct arrays into array of just diagonal numbers to sum 
        const diagCheck = (diagNum) => {
                      
            diag = checkBoard.map((arr, index) => arr[index]);
            diag = sum(diag);
            winner(diag);

            diag = checkBoard.map((arr, index) => arr[diagNum - 1 - index])
            diag = sum(diag);
            winner(diag);

        }

        coulmnCheck(2);
        rowCheck(2);
        diagCheck(3);
        if (win === true){
            return true;
        }
        gamemoves++;
        return false;
    }
    
        const drawCheck = () => {
            if (gamemoves > 8)
                return true;
        }

    return {outcomeCheck, switchPlayer, makePlayers, getActivePlayer, drawCheck}
}





//Controls Game and DOM
function GameController(p1, p2) {
    const board = GameBoard();
    const logic = GameLogic();
    let gameOver = false;

    const displayedBoard = document.querySelector("#game-board");

    const playRound = (move) => {
        console.log(`${activePlayer.name}'s turn.`)

        let isValid = board.moveHandler(activePlayer, move);
        if (isValid === false){

        } else {
        updateBoard(move, activePlayer);
        gameOver = logic.outcomeCheck(board.getBoard());
        if (gameOver === true){
            return true;
        } else{
        logic.switchPlayer();
        return false
        }
        }
    }

    const updateBoard = (move, player) => {
        const img = document.createElement("img");

        if (player.token === 1){
        img.setAttribute(`src`, `assets/x.svg`);
        } else {
        img.setAttribute(`src`, `assets/o.svg`);
        }
        stringMove = move.toString();
        const selectedCell = document.querySelector(`[loc="${stringMove}"]`);

        selectedCell.appendChild(img);
        console.log(`Board Updated.`);
        
    }

    const createCells = () => {
        console.log(`Creating Cells...`)
        
        let loc = 1;
        let numCells = 0;

        while (numCells < 9) {

            const cell = document.createElement("div");

            cell.classList.add(`cell`);
            cell.setAttribute(`id`, `cell`)
            cell.setAttribute(`loc`, loc)
            
            cell.addEventListener(`click`, (e) => {
                if (e.target.id === `cell`){
                    let selectedMove = e.target.getAttribute("loc");
                    let player = logic.getActivePlayer();
                    let winCheck = playRound(parseInt(selectedMove));
                    board.printBoard();
                    
                    if (winCheck === true){
                        window.alert(`${player.name} has won!`)
                        const dialogEnd = document.querySelector("#game-over");
                        dialogEnd.showModal();
                    }
                    let drawCheck = logic.drawCheck();
                    if (drawCheck === true) {
                        window.alert(`Game Over! It's a draw!`)
                        const dialogEnd = document.querySelector("#game-over");
                        dialogEnd.showModal();
                    }
                }
            })

            displayedBoard.appendChild(cell);
            loc++;
            numCells++;
        }
    }

    createCells();
    logic.makePlayers(p1, p2);


}

function GameMaker() {
    const playBtn = document.querySelector("#playBtn")
    const dialogStart = document.querySelector("#start-game");
    const dialogEnd = document.querySelector("#game-over");
    const newGameBtn = document.querySelector("#new-game");
    const yesBtn = document.querySelector("#yes");


    let game;

    const startGame = (p1, p2) => {
        game = GameController(p1, p2);
        
    }

    const cleanGame = () => {
        const playersDiv = document.querySelector("#players");
        const gameBoard = document.querySelector("#game-board");

        delete game;

        if (playersDiv) {
            while (playersDiv.firstChild) {
                playersDiv.removeChild(playersDiv.firstChild);
            }
        }

        if (gameBoard) {
            while (gameBoard.firstChild) {
                gameBoard.removeChild(gameBoard.firstChild);
            }
        }
}

    playBtn.addEventListener("click", (e) => {
        
        dialogStart.close();
        e.preventDefault();

        console.log(`Pressed!`)
        let player1 = document.getElementById('player1').value;
        let player2 = document.getElementById(`player2`).value;
        
        
        startGame(player1, player2);
    })


    newGameBtn.addEventListener("click", (e) => {
        
        dialogEnd.close();
        e.preventDefault();

        cleanGame();

        dialogStart.showModal();
    })

}


const game = GameMaker();