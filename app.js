const squareFactory = () => {
    let filled = false;
    let marking = 'icons/empty.png';
    return { filled, marking };
};

const playerFactory = (marking, name) => {
    return { marking, name };
};

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
            });
        });
    }

    const mark = (posx, posy, marking) => {
        board[posx][posy].filled = true;
        board[posx][posy].marking = marking;
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
        reset();
        playingGame = true;
        //get user input for name
        player1 = playerFactory('icons/x.svg', 'player1')
        //get user input for name
        player2 = playerFactory('icons/o.svg', 'player2');
        turnPlayer = player1;
    }

    const playTurn = (posx, posy) => {
        if (playingGame) {
            gameboard.mark(posx, posy, turnPlayer.marking);
            if (turnPlayer == player1) {
                turnPlayer = player2;
            } else {
                turnPlayer = player1;
            }
        }
        gameboard.render();
    }

    return { reset, start, playTurn };
})();

boardElement.forEach((square) => {
    let coordinates = square.classList[2].toString().split('-');
    let posx = coordinates[0];
    let posy = coordinates[1];
    square.addEventListener('click', () => {
        game.playTurn(posx, posy);
    })
});

game.start();
game.playTurn(0, 0);
game.playTurn(0, 1);