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
        console.log(rowX[locationY]);
        
        
        if ((rowX[locationY]) === 0) {
            rowX.splice(locationY, 1, player.token);
            valid = true;
        } else {
            console.log(`invalid move`);
        }
    }
    } 

    return { printBoard, selectLocation }

}


function GameController() {
    const player1 = `Justin`// prompt(`What is Player 1's name?`);
    const player2 = `Jacob`// prompt(`What is Player 2's name?`);
    console.log(`${player1} will be "Xs". ${player2} will be "Os".`);

    const board = GameBoard();

    let gameOver = false;

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
        switchPlayer();
    }
    
    const switchPlayer = () => {
        a = players.shift()
        players.push(a);
        activePlayer = players[0];
    }

    const outcomeCheck = () => {

    }
    
    while (gameOver != true) {
        playRound();
    }
}

const game = GameController();