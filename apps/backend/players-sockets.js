const platersSockets = {}

function setPlayerSocket(playerId, socket) {
    platersSockets[playerId] = socket
}

function getPlayerSocket(playerId) {
    return platersSockets[playerId]
}

function removePlayerSocket(playerId) {
    delete platersSockets[playerId]
}

function disconnectPlayer(playerId) {
    const socket = getPlayerSocket(playerId)
    if (socket) {
        socket.disconnect()
        removePlayerSocket(playerId)
    }
}

module.exports = {
    setPlayerSocket,
    getPlayerSocket,
    removePlayerSocket,
    disconnectPlayer
}