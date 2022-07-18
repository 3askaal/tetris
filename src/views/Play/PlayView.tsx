import React, { useContext, useEffect } from 'react'
import { Box, Container, Wrapper, Popup, Text, Button } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Controls, Map, Score } from '../../components'
import { GameContext } from '../../context'
import { useKeyboardBindings } from '../../helpers/keyboard'

const PlayView = () => {
  const {
    onStartGame,
    gameOver,
    gamePaused,
    setGamePaused,
  } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
    onStartGame()
  }, [])

  return (
    <Wrapper s={{ p: ['s', 'm', 'l'] }}>
      <Container s={{ p: 0 }}>
        <Box s={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Box s={{ display: 'flex', alignItems: 'flex-end' }}>
            <Score />
          </Box>
          <Map />
          <Box s={{
            display: 'flex',
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            mt: 's'
          }}>
            <Controls />
          </Box>
        </Box>
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button data-testid="restart" onClick={() => onStartGame()}>Restart</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game over! Click restart to play again.</Text>
        </Popup>
      ) }
      { gamePaused && (
        <Popup
          actions={[
            <Button data-testid="resume" onClick={() => setGamePaused(false)}>Resume</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game paused! Click resume to continue playing.</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
