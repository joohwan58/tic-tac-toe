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
        player1 = playerFactory('icons/x.svg', 'player1')
        //get user input for name
        player2 = playerFactory('icons/o.svg', 'player2');

    }

    const playTurn = (posx, posy, marking) => {
        gameboard.mark(posx, posy, marking);
    }


})();