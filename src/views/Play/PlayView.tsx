import React, { useContext, useEffect } from 'react'
import { Spacer, Box, Container, Wrapper, Popup, Button, Text } from '3oilerplate'
import ReactGA from 'react-ga4'
import { PlayerDetails, Map } from '../../components'
import { GameContext } from '../../context'
import ReactGA4 from 'react-ga4'
import { useKeyboardBindings } from '../../helpers/keyboard'

const PlayView = () => {
  const {
    onStartGame,
    gameOver,
    score
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
          <PlayerDetails />
        </Spacer>
      </Container>
      { gameOver && (
        <Popup
          actions={[
            <Button onClick={() => onStartGame({})}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>You lost! Click restart to play again!</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
