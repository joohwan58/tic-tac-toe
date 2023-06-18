const squareFactory = () => {
    let filled = false;
    let marking = 'icons/empty.png';
    return { filled, marking };
};

const playerFactory = (marking, name) => {
    return { marking, name };
};

const message = document.querySelector('.message');
const boardElement = document.querySelectorAll('.square');

const gameboard = (() => {
    let board = [[squareFactory(), squareFactory(), squareFactory()],
    [squareFactory(), squareFactory(), squareFactory()],
    [squareFactory(), squareFactory(), squareFactory()]];

    const render = () => {
        boardElement.forEach(square => {
            let coordinates = square.classList[2].toString().split('-');
            let posx = coordinates[0];
            let posy = coordinates[1];
            let marking = board[posx][posy].marking;
            square.firstChild.src = marking;
        });
    }

    const reset = () => {
        board.forEach((element) => {
            element.forEach((element) => {
                element.marking = 'icons/empty.png';
                element.filled = false;
            });
        });
    }

    const mark = (posx, posy, marking) => {
        let sucess = false;
        if (board[posx][posy].filled == false) {
            sucess = true;
            board[posx][posy].filled = true;
            board[posx][posy].marking = marking;
        }
        return sucess;
    }
    return { render, reset, mark }
})();

const game = (() => {
    let player1;
    let player2;
    let turnPlayer;
    let playingGame = false;

    const reset = () => {
        gameboard.reset();
        gameboard.render();
        player1 = null;
        player2 = null;
        playingGame = false;
    }

    const start = () => {
        playingGame = true;
        //get user input for name
        player1 = playerFactory('icons/x.svg', 'player1')
        //get user input for name
        player2 = playerFactory('icons/o.svg', 'player2');
        turnPlayer = player1;
    }

    const switchTurn = () => {
        if (turnPlayer == player1) {
            turnPlayer = player2;
        } else {
            turnPlayer = player1;
        }
    }

    const playTurn = (posx, posy) => {
        if (playingGame) {
            let sucess = gameboard.mark(posx, posy, turnPlayer.marking);
            if (sucess) {
                switchTurn();
            }
        }
        gameboard.render();
        detectVictory();
    }

    const detectVictory = () => {
        if (gameboard.board[0][0].marking == gameboard.board[0][1].marking) {
            if (gameboard.board[0][1].marking == gameboard.board[0][2].marking) {
                console.log('win');
            }
        }
    }

    return { reset, start, playTurn, detectVictory };
})();

console.log(gameboard.board);

boardElement.forEach((square) => {
    let coordinates = square.classList[2].toString().split('-');
    let posx = coordinates[0];
    let posy = coordinates[1];
    square.addEventListener('click', () => {
        game.playTurn(posx, posy);
    })
});


const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
    message.textContent = 'Game start!'
    game.start();
});

const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    message.textContent = 'Get ready...';
    game.reset();
});
