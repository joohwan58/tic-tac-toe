const squareFactory = () => {
    let filled = false;
    let marking = 'icons/empty.png';
    return { filled, marking };
};

const playerFactory = (marking, name) => {
    return { marking, name };
};

const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');
const boardElement = document.querySelectorAll('.square');
const player1Form = document.querySelector('#player1');
const player2Form = document.querySelector('#player2');

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
    return { board, render, reset, mark }
})();

const game = (() => {
    let player1;
    let player2;
    let turnPlayer;
    let playingGame = false;

    const getPlayer1 = () => {
        return player1;
    }

    const getPlayer2 = () => {
        return player2;
    }

    const getTurnPlayer = () => {
        return turnPlayer;
    }

    const reset = () => {
        gameboard.reset();
        gameboard.render();
        message1.textContent = 'Get ready...';
        message2.textContent = 'Press start button to start game'
        player1 = null;
        player2 = null;
        playingGame = false;
    }

    const start = () => {
        reset();
        message1.textContent = 'Game started';
        playingGame = true;
        let player1Name = (player1Form.value == "") ? 'Player 1' : player1Form.value;
        player1 = playerFactory('icons/x.svg', player1Name);
        let player2Name = (player2Form.value == "") ? 'Player 2' : player2Form.value;
        player2 = playerFactory('icons/o.svg', player2Name);
        turnPlayer = getPlayer1();
        message2.textContent = `${getTurnPlayer().name}'s turn`;
    }

    const finish = () => {
        message1.textContent = `${turnPlayer.name} wins!`;
        playingGame = false;
        turnPlayer = null;
        player1Form.value = '';
        player2Form.value = '';
    }

    const switchTurn = () => {
        if (getTurnPlayer() == getPlayer1()) {
            turnPlayer = getPlayer2();
        } else {
            turnPlayer = getPlayer1();
        }
        message2.textContent = `${getTurnPlayer().name}'s turn`;
    }

    const playTurn = (posx, posy) => {
        if (playingGame) {
            let sucess = gameboard.mark(posx, posy, getTurnPlayer().marking);
            gameboard.render();
            let finished = detectVictory();
            if (finished) {
                finish();
                return;
            }
            if (sucess) {
                switchTurn();
            }
        }
    }

    const detectVictory = () => {
        if ((turnPlayer.marking == gameboard.board[0][0].marking) && (turnPlayer.marking == gameboard.board[0][1].marking) && (turnPlayer.marking == gameboard.board[0][2].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[1][0].marking) && (turnPlayer.marking == gameboard.board[1][1].marking) && (turnPlayer.marking == gameboard.board[1][2].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[2][0].marking) && (turnPlayer.marking == gameboard.board[2][1].marking) && (turnPlayer.marking == gameboard.board[2][2].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[0][0].marking) && (turnPlayer.marking == gameboard.board[1][0].marking) && (turnPlayer.marking == gameboard.board[2][0].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[0][1].marking) && (turnPlayer.marking == gameboard.board[1][1].marking) && (turnPlayer.marking == gameboard.board[2][1].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[0][2].marking) && (turnPlayer.marking == gameboard.board[1][2].marking) && (turnPlayer.marking == gameboard.board[2][2].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[0][0].marking) && (turnPlayer.marking == gameboard.board[1][1].marking) && (turnPlayer.marking == gameboard.board[2][2].marking)) {
            return true;
        }
        if ((turnPlayer.marking == gameboard.board[0][2].marking) && (turnPlayer.marking == gameboard.board[1][1].marking) && (turnPlayer.marking == gameboard.board[2][0].marking)) {
            return true;
        }
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


const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
    game.start();
});

const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    game.reset();
});
