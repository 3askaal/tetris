import React, { useContext, useEffect } from 'react'
import { Spacer, Box, Container, Wrapper, Popup, Text, Button } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Controls, Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import { useKeyboardBindings } from '../../helpers/keyboard'

const PlayView = () => {
  const {
    onStartGame,
    gameOver,
    gamePaused,
    setGamePaused,
    score,
  } = useContext(GameContext)

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
    onStartGame()
  }, [])

  useEffect(() => {
    if (gameOver) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
      });
    }
  }, [gameOver])

  return (
    <Wrapper s={{ py: 'm' }}>
      <Container s={{ p: 0 }}>
        <Spacer size="xs" s={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <Box>
            <Spacer size="m" s={{ flexDirection: 'row' }}>
              <span>Level: { score.level }</span>
              <span>Score: { score.score }</span>
              <span>Rows: { score.rows }</span>
            </Spacer>
          </Box>
          <Map />
          <Controls />
        </Spacer>
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({})}>Restart</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game over! Click restart to play again.</Text>
        </Popup>
      ) }
      { gamePaused && (
        <Popup
          actions={[
            <Button onClick={() => setGamePaused(false)}>Resume</Button>
          ]}
        >
          <Text s={{ width: '100%', textAlign: 'center' }}>Game paused! Click resume to continue playing.</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
