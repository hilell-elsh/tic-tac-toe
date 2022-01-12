const games = {};

const createGame = (playerA, playerB) => {
    const game = {
        id: (Buffer.from(Math.random().toString())).toString("base64"),
        players: {
            x: playerA,
            o: playerB
        },
        board: getNewBoard(),
        turn: "x",
        state: "running",
        winner: null
    }
    games[game.id] = game;
    return game
}

const getGame = (gameId) => {
    return games[gameId]
}

const removeGame = (gameId) => {
    delete games[gameId]
}

const getNewBoard = () => {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

module.exports = {
    createGame,
    getGame,
    removeGame
}
