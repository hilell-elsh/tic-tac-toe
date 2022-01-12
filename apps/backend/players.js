const players = {

}

const getPlayer = (playerId) => {
    return players[playerId]
}

const createPlayer = (nickname, connectionOption) => {
    const newId = (Buffer.from(Math.random().toString()+nickname)).toString("base64")
    players[newId] = {
        id: newId,
        nickname,
        connectionOption,
        status: 'wait'
    }
}

const removePlayer = (playerId) => {
    delete players[playerId]
}

const joinToGame = (playerId, gameId) => {
    const player = getPlayer(playerId)
    player.gameId = gameId;
    player.status = 'in-play';

}

module.exports = {
    getPlayer,
    createPlayer,
    removePlayer,
    joinToGame
};