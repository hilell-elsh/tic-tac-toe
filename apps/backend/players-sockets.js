const { emit } = require("nodemon")

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

function emitToPlayer(playerId, eventName, data) {
    const socket = getPlayerSocket(playerId)
    if (socket) {
        socket.emit(eventName, data);
    }
}

module.exports = {
    setPlayerSocket,
    getPlayerSocket,
    removePlayerSocket,
    disconnectPlayer,
    emitToPlayer
}