import { useState, useEffect } from 'react'
import {socket} from './socket'
import {EnterGame} from './EnterGame'

function App() {
  const [playState, setPlayState] = useState(localStorage.userToken ? null : 'enter');
  const [gameStatus, setgameStatus] = useState(null);

  useEffect(() => {
    socket.on('status', (gameStatus) => {
      setgameStatus(gameStatus);
      setPlayState(gameStatus.status)
    })

    socket.on('connect', () => setPlayState('identify'))

    socket.on('disconnect', () => {
      socket.connect()
    })
  }, [])

  useEffect(() => {
    if (playState === 'identify') {
      socket.emit('identify', localStorage.userToken)
    }
  }, [playState])


  
  if (playState === 'enter') {
    // login page
    return (
      <EnterGame onEnterGame={(playerId) => {
        localStorage.setItem('userToken', playerId)
        setPlayState('identify')
      }}/>
    )
  }
  return (
    <>
      {playState === 'enter' && <EnterGame onEnterGame={(playerId) => {
        localStorage.setItem('userToken', playerId)
        setPlayState('identify')
      }}/>}

      {playState === 'wait' && <div>Wait</div>}
      {playState === 'running' && <div>game</div>}
      {playState === 'ended' && <div>finish</div>}
    </>
  )
}

export default App
