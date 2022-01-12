const {joinToGame} = require('../players')
const {createGame} = require('../games')
const { disconnectPlayer } = require('../players-sockets')

let randomWaitingPlayer = null



const useWaitingRoom = (player) => {

    switch (player.connectionOption) {
        case 'random':
            if (randomWaitingPlayer && randomWaitingPlayer !== player.id) {
                const game = createGame(player.id, randomWaitingPlayer)

                joinToGame(player.id, game.id)
                joinToGame(randomWaitingPlayer, game.id)
                disconnectPlayer(player.id)
                disconnectPlayer(randomWaitingPlayer)
            } else {
                randomWaitingPlayer = player.id
            }
            break;
        case 'join':
            socket.on('findGame', () => {
        
            })
            break;
        case 'create':
            break;
    }

}

module.exports = useWaitingRoom