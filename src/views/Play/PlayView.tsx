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
    <Wrapper>
      <Container s={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Spacer size="xs" s={{ flexDirection: 'row' }}>
            <span>Level: { score.level }</span>
            <span>Score: { score.score }</span>
            <span>Rows: { score.rows }</span>
          </Spacer>
        </Box>
        <Map />
        <PlayerDetails s={{ display: ['none', 'flex'] }} />
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
