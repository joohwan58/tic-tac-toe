const playerFactory = (marking, name) => {
    return { marking, name };
};

let test = playerFactory('test', 'name');
console.log(test); //logs {marking: 'test', name: 'name'}

const game = (() => {
    let player1;
    let player2;

    const start = () => {
        player1 = playerFactory('test1', 'player1');
        player2 = playerFactory('test2', 'player2');
    }

    return { player1, player2, start };
})();

game.start();
console.log(game.player1); //shows undefined
console.log(game.player2); //shows undefined