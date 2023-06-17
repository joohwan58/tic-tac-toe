const squareFactory = () => {
    let filled = false;
    let marking = '';
    return { filled, marking };
};

const playerFactory = (marking, name) => {
    return { marking, name };
};

const gameboard = (() => {
    let board = [[squareFactory(), squareFactory(), squareFactory()],
    [squareFactory(), squareFactory(), squareFactory()],
    [squareFactory(), squareFactory(), squareFactory()]];

    const render = () => {
        //replace with real function later
        console.log('rendering');
        console.table(board);
    }

    const reset = () => {
        board.forEach((element) => {
            element.forEach((element) => {
                element = squareFactory();
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
    const reset = () => {
        gameboard.reset();
        gameboard.render();
        player1 = null;
        player2 = null;
    }

    let player1;
    let player2;
    let turn = true;

    const start = () => {
        reset();
        //get user input for name
        player1 = playerFactory('x', 'player1')
        //get user input for name
        player2 = playerFactory('o', 'player2');

    }

    const playTurn = (posx, posy, marking) => {
        gameboard.mark(posx, posy, marking);
    }


})();