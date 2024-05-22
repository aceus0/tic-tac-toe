function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

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

    const selectLocation = (player) => {
        
        valid = false;
        while (valid === false){
        
        locationX = prompt(`What row would you like to go?`)
        locationY = prompt(`What coulmn would you like to go?`)
            
        rowX = board[locationX];
        // console.log(rowX[locationY]);
        
        
        if ((rowX[locationY]) === 0) {
            rowX.splice(locationY, 1, player.token);
            valid = true;
        } else {
            console.log(`invalid move`);
            }
        }
    } 

    const getBoard = () => {
        return board;
    }

    return { printBoard, selectLocation, getBoard }

}



function GameController() {
    const player1 = `Justin`// prompt(`What is Player 1's name?`);
    const player2 = `Jacob`// prompt(`What is Player 2's name?`);
    console.log(`${player1} will be "Xs". ${player2} will be "Os".`);

    const board = GameBoard();

    let gameOver = false;
    let winningPlayer = undefined;

    const players = [
        {
            name: player1,
            token: 1
        },
        {
            name: player2,
            token: -1
        }
    ];

    let activePlayer = players[0];

    const playRound = () => {
        console.log(`${activePlayer.name}'s turn.`)

        board.selectLocation(activePlayer);
        board.printBoard();
    }
    
    const switchPlayer = () => {
        a = players.shift()
        players.push(a);
        activePlayer = players[0];
    }

    const outcomeCheck = () => {
        checkBoard = board.getBoard();
        checkBoard = [...checkBoard];


        const winner = (value) => {
            if ((value === 3) || (value === -3)){
                console.log(`win detected`);
                winningPlayer = activePlayer;
            } 
            return
        }
        
        const sum = (arr) => {
            return arr.reduce((num, a) => num + a, 0);
        }


        const coulmnCheck = (coulmnNum) => {
            while (coulmnNum > -1) {
            coulmn = checkBoard.map(x => x[coulmnNum]);
            coulmn = sum(coulmn);
            winner(coulmn);
            coulmnNum--;
            }
        }

        const rowCheck = (rowNum) => {
            while (rowNum > -1) {
            row = checkBoard[rowNum];
            row = sum(row);
            winner(row);
            rowNum--;
            }
        }

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
        

    }
    
    while (gameOver != true) {
        playRound();
        outcomeCheck();
        if (activePlayer === winningPlayer){
            console.log(`${winningPlayer.name} has won!`);
            gameOver = true;
        }
        switchPlayer();
    }
    
}

const game = GameController();