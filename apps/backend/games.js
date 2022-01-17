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
        status: "running",
        winner: null,
        restarted: []
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

const resetGame = (gameId) => {
    const game = getGame(gameId);
    Object.assign(game, {
        board: getNewBoard(),
        restarted: [],
        winner: null,
        status: 'running'
    })
}

module.exports = {
    createGame,
    getGame,
    removeGame,
    resetGame
}
